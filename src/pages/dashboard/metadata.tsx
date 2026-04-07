import { useEffect, useMemo, useState } from "react";
import {
  useCreateMetaDataMutation,
  useGetMetaDataQuery,
  useUpdateMetaDataMutation,
} from "../../redux/api";
import { handleError } from "../../utils/helper";
import { toast } from "react-toastify";

type MetaDataForm = {
  maxSubmissionsPerSession?: number | "";
  maxCharactersPerSubmission?: number | "";
  sessionCooldownSeconds?: number | "";
  backgroundResetSeconds?: number | "";
  idleResetSeconds?: number | "";
  systemPrompt?: string;
};

const NumberField = ({
  label,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  value: number | "";
  placeholder?: string;
  onChange: (value: number | "") => void;
}) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-[color:var(--color4A4740)]">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => {
          const next = e.target.value;
          onChange(next === "" ? "" : Number(next));
        }}
        type="number"
        inputMode="numeric"
        step="1"
        placeholder={placeholder || "—"}
        className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
      />
    </div>
  );
};

const numberOrEmpty = (v: any) => {
  if (v === null || v === undefined) return "";
  if (typeof v === "number") return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : "";
};

const MetaDataPage = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMetaDataQuery();

  const [createMetaData, createState] = useCreateMetaDataMutation();
  const [updateMetaData, updateState] = useUpdateMetaDataMutation();

  const metaData = data?.metaData;

  const [form, setForm] = useState<MetaDataForm>({
    maxSubmissionsPerSession: "",
    maxCharactersPerSubmission: "",
    sessionCooldownSeconds: "",
    backgroundResetSeconds: "",
    idleResetSeconds: "",
    systemPrompt: "",
  });

  useEffect(() => {
    if (metaData) {
      setForm({
        maxSubmissionsPerSession: numberOrEmpty(metaData.maxSubmissionsPerSession),
        maxCharactersPerSubmission: numberOrEmpty(metaData.maxCharactersPerSubmission),
        sessionCooldownSeconds: numberOrEmpty(metaData.sessionCooldownSeconds),
        backgroundResetSeconds: numberOrEmpty(metaData.backgroundResetSeconds),
        idleResetSeconds: numberOrEmpty(metaData.idleResetSeconds),
        systemPrompt: metaData.systemPrompt || "",
      });
    }
  }, [metaData]);

  useEffect(() => {
    if (isError) {
      const msg = error as any;
      if (msg?.status !== 404) handleError(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (createState.isError) handleError(createState.error);
    if (updateState.isError) handleError(updateState.error);
  }, [createState.isError, updateState.isError]);

  const isBusy =
    isLoading ||
    createState.isLoading ||
    updateState.isLoading;

  const payload = useMemo(() => {
    const out: any = {};
    ([
      "maxSubmissionsPerSession",
      "maxCharactersPerSubmission",
      "sessionCooldownSeconds",
      "backgroundResetSeconds",
      "idleResetSeconds",
    ] as const).forEach((k) => {
      const v = (form as any)[k];
      if (v !== "" && v !== undefined) out[k] = Number(v);
    });
    if (form.systemPrompt !== undefined) out.systemPrompt = form.systemPrompt;
    return out;
  }, [form]);

  const save = async () => {
    if (!metaData) {
      const res: any = await createMetaData(payload);
      if (res?.data?.metaData) toast.success("MetaData created.");
      await refetch();
      return;
    }

    const res: any = await updateMetaData(payload);
    if (res?.data?.metaData) toast.success("MetaData updated.");
    await refetch();
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-[color:var(--textPrimary)]">
            MetaData
          </h2>
          {/* <p className="mt-1 text-sm text-[color:var(--color6B675F)]">
            Single record used by the app runtime.
          </p> */}
        </div>
        <div className="flex gap-2">
          <button
            onClick={save}
            disabled={isBusy}
            className="rounded-xl bg-[color:var(--color4A4740)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isBusy ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 rounded-2xl border border-black/5 bg-white p-5">
        <div className="grid gap-4 md:grid-cols-2">
          <NumberField
            label="Max Submissions Per Session"
            value={form.maxSubmissionsPerSession ?? ""}
            onChange={(value) =>
              setForm((p) => ({ ...p, maxSubmissionsPerSession: value }))
            }
            placeholder="10"
          />
          <NumberField
            label="Max Characters Per Submission"
            value={form.maxCharactersPerSubmission ?? ""}
            onChange={(value) =>
              setForm((p) => ({ ...p, maxCharactersPerSubmission: value }))
            }
            placeholder="100"
          />
          <NumberField
            label="Session Cooldown Seconds"
            value={form.sessionCooldownSeconds ?? ""}
            onChange={(value) =>
              setForm((p) => ({ ...p, sessionCooldownSeconds: value }))
            }
            placeholder="10"
          />
          <NumberField
            label="Background Reset Seconds"
            value={form.backgroundResetSeconds ?? ""}
            onChange={(value) =>
              setForm((p) => ({ ...p, backgroundResetSeconds: value }))
            }
            placeholder="10"
          />
          <NumberField
            label="Idle Reset Seconds"
            value={form.idleResetSeconds ?? ""}
            onChange={(value) => setForm((p) => ({ ...p, idleResetSeconds: value }))}
            placeholder="300"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[color:var(--color4A4740)]">
            System Prompt
          </label>
          <textarea
            value={form.systemPrompt || ""}
            onChange={(e) => setForm((p) => ({ ...p, systemPrompt: e.target.value }))}
            rows={10}
            placeholder="Prompt text"
            className="w-full resize-y rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
          />
        </div>
      </div>
    </div>
  );
};

export default MetaDataPage;

