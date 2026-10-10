
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-slate-800 bg-slate-950/95">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
            B
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              BlockCred
            </h1>
            <p className="text-[10px] tracking-wider text-slate-500">
              ACADEMIC CREDENTIALS
            </p>
          </div>
        </Link>

        <Link
          to="/admin/login"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Admin Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
