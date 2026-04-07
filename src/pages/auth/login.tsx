import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import nhoruLogo from "../../assets/nhoru-logo.png";
import { useLoginMutation } from "../../redux/api";
import { handleError, setToken } from "../../utils/helper";

const Login = () => {
  const navigate = useNavigate();
  const [login, { isLoading, isError, error, data }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isDisabled = useMemo(() => {
    return !email.trim() || !password.trim() || isLoading;
  }, [email, password, isLoading]);

  useEffect(() => {
    if (isError) handleError(error);
  }, [isError, error]);

  useEffect(() => {
    if (data?.token) {
      setToken(data.token);
      navigate("/", { replace: true });
    }
  }, [data, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-black/5 bg-white p-6 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col items-center">
          <img src={nhoruLogo} alt="nhōru" className="h-10 w-auto" />
          <h1 className="mt-4 text-xl font-semibold text-[color:var(--textPrimary)]">
            Admin login
          </h1>
          <p className="mt-1 text-sm text-[color:var(--color6B675F)]">
            Sign in to view and update metadata
          </p>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-[color:var(--color4A4740)]">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="admin@example.com"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[color:var(--color4A4740)]">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-black/20"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="w-full rounded-xl bg-[color:var(--color4A4740)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

