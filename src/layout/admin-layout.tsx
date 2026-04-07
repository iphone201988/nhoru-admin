import { Outlet, useNavigate } from "react-router-dom";
import { removeToken } from "../utils/helper";
import nhoruLogo from "../assets/nhoru-logo.png";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[color:var(--textPrimary)]">
      <header className="sticky top-0 z-10 border-b border-black/5 bg-[#F8F7F4]/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <img src={nhoruLogo} alt="nhōru" className="h-8 w-auto" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">
                nhōru admin
              </div>
              {/* <div className="text-xs text-[color:var(--color6B675F)]">
                MetaData control panel
              </div> */}
            </div>
          </div>
          <button
            onClick={logout}
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-medium text-[color:var(--color4A4740)] hover:bg-black/5"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

