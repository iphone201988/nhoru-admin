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
  const [showPassword, setShowPassword] = useState(false);

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
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 pr-11 text-sm outline-none focus:border-black/20"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[color:var(--color6B675F)] hover:bg-black/5"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58" />
                    <path d="M9.88 4.24A10.94 10.94 0 0 1 12 4c6.5 0 10 8 10 8a18.6 18.6 0 0 1-2.16 3.19" />
                    <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3.5 8 10 8a10.94 10.94 0 0 0 4.24-.88" />
                    <path d="m2 2 20 20" />
                  </svg>
                )}
              </button>
            </div>
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

