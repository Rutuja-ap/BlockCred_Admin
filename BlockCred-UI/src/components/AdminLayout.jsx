import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV = [
  { key: "dashboard", to: "/admin/dashboard", icon: "▦", label: "Dashboard" },
  { key: "students", to: "/admin/students", icon: "👥", label: "Students" },
  { key: "credentials", to: "/admin/credentials", icon: "▣", label: "Certificates" },
];

export function Modal({ title, onClose, children, wide = false }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:items-center">
      <div
        className={`w-full ${wide ? "max-w-2xl" : "max-w-lg"} rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

export function Toast({ toast, onClose }) {
  if (!toast) return null;
  const color =
    toast.type === "error"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";
  return (
    <div className={`mb-6 flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-sm ${color}`}>
      <div className="break-words">{toast.text}</div>
      <button onClick={onClose} className="shrink-0 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

function AdminLayout({ active, breadcrumb, title, subtitle, actions, children }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = (user?.name || "AD")
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="flex h-16 items-center justify-between px-6">
          <Link to="/admin/dashboard" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold">B</div>
            <div>
              <h1 className="font-bold">
                BlockCred <span className="text-indigo-400">AI</span>
              </h1>
              <p className="text-[9px] tracking-wider text-slate-500">ADMIN PORTAL</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{user?.name || "System Administrator"}</p>
              <p className="text-xs text-slate-500">{user?.email || "Full Access"}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300">
              {initials}
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-slate-600 hover:text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 shrink-0 border-r border-slate-800 bg-slate-950 p-5 md:block">
          <nav className="space-y-2">
            {NAV.map((item) => (
              <Link
                key={item.key}
                to={item.to}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                  active === item.key
                    ? "bg-indigo-600/10 font-medium text-indigo-400"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm text-slate-500">{breadcrumb}</p>
              <h2 className="mt-2 text-3xl font-bold">{title}</h2>
              {subtitle && <p className="mt-2 text-sm text-slate-400">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
          </div>

          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;