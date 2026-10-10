import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function VerifierDashboard() {
  const [credentialId, setCredentialId] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (!credentialId.trim()) return;

    navigate("/verifier/credential-result", {
      state: { credentialId: credentialId.trim() },
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold">
              B
            </div>

            <div>
              <h1 className="font-bold">
                BlockCred <span className="text-indigo-400">AI</span>
              </h1>

              <p className="text-[9px] tracking-wider text-slate-500">
                VERIFIER PORTAL
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                {user?.name || "Verification Officer"}
              </p>

              <p className="text-xs text-slate-500">
                {user?.organization || "Authorized Verifier"}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300">
              VO
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
        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 border-r border-slate-800 bg-slate-950 p-5 md:block">
          <nav className="space-y-2">
            <Link
              to="/verifier/dashboard"
              className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400"
            >
              <span>▦</span>
              Dashboard
            </Link>

            <Link
              to="/verifier/verify-credential"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>⌕</span>
              Verify Credential
            </Link>

            <Link
              to="/verifier/profile"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>◉</span>
              Organization Profile
            </Link>

            <Link
              to="/verifier/settings"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>⚙</span>
              Settings
            </Link>
          </nav>

          {/* Network */}
          <div className="mt-10 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <p className="text-xs font-semibold text-emerald-400">
                Network Online
              </p>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Blockchain verification services are operational.
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          {/* Heading */}
          <div>
            <p className="text-sm text-slate-500">
              Verifier Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Credential Verification
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Search and verify academic credentials using a credential ID
              or blockchain record.
            </p>
          </div>

          {/* Search section */}
          <section className="relative mt-8 overflow-hidden rounded-3xl border border-indigo-500/20 bg-indigo-500/5 p-6 md:p-8">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Verify Credential
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Search by Credential ID
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Enter the unique credential ID provided by the student.
              </p>

              <form
                onSubmit={handleSearch}
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="text"
                  value={credentialId}
                  onChange={(event) =>
                    setCredentialId(event.target.value)
                  }
                  placeholder="Example: BC-AI-2026-8F29"
                  className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                >
                  Verify Credential
                </button>
              </form>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-xs text-slate-400 transition hover:border-slate-600 hover:text-white">
                  📷 Scan QR Code
                </button>

                <button className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-xs text-slate-400 transition hover:border-slate-600 hover:text-white">
                  Search Blockchain Hash
                </button>
              </div>
            </div>
          </section>

          {/* Stats */}
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Total Verifications
              </p>

              <p className="mt-3 text-3xl font-bold">
                1,284
              </p>

              <p className="mt-2 text-xs text-indigo-400">
                All time
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Verified
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-400">
                1,241
              </p>

              <p className="mt-2 text-xs text-emerald-400">
                96.6% success rate
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Flagged
              </p>

              <p className="mt-3 text-3xl font-bold text-red-400">
                43
              </p>

              <p className="mt-2 text-xs text-red-400">
                Requires review
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Network Status
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

                <p className="text-sm font-medium text-emerald-400">
                  Operational
                </p>
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Blockchain services active
              </p>
            </div>
          </div>

          {/* Main cards */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            {/* Recent history */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 xl:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-800 p-6">
                <div>
                  <h2 className="font-semibold">
                    Recent Verification Activity
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Latest credential verification requests
                  </p>
                </div>

                <button className="text-xs text-indigo-400 hover:text-indigo-300">
                  View All →
                </button>
              </div>

              <div className="divide-y divide-slate-800">
                {/* Item 1 */}
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-sm text-indigo-300">
                      BC-AI-2026-8F29
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Bachelor of Computer Engineering
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Verified 10 minutes ago
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Verified
                  </span>
                </div>

                {/* Item 2 */}
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-sm text-indigo-300">
                      BC-AI-2026-7A13
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      AWS Cloud Certification
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Verified 35 minutes ago
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Verified
                  </span>
                </div>

                {/* Item 3 */}
                <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-mono text-sm text-red-300">
                      BC-AI-2026-4D81
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Diploma Certificate
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Flagged 1 hour ago
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                    Flagged
                  </span>
                </div>
              </div>
            </section>

            {/* Quick actions */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                Quick Access
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Verification Tools
              </h2>

              <div className="mt-6 space-y-3">
                <button className="flex w-full items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-indigo-500/30">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                    🔍
                  </span>

                  <div>
                    <p className="text-sm font-medium">
                      Credential Search
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Search by credential ID
                    </p>
                  </div>
                </button>

                <button className="flex w-full items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-indigo-500/30">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                    📷
                  </span>

                  <div>
                    <p className="text-sm font-medium">
                      QR Verification
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Scan credential QR
                    </p>
                  </div>
                </button>

                <button className="flex w-full items-center gap-4 rounded-xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-indigo-500/30">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10">
                    ⛓
                  </span>

                  <div>
                    <p className="text-sm font-medium">
                      Blockchain Lookup
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Check transaction record
                    </p>
                  </div>
                </button>
              </div>
            </section>
          </div>

          {/* Security banner */}
          <section className="mt-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  🔐
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-emerald-300">
                    Secure Verification Environment
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    All verification requests are logged and protected
                    through the BlockCred AI verification network.
                  </p>
                </div>
              </div>

              <span className="whitespace-nowrap text-xs text-emerald-400">
                ● System Secure
              </span>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default VerifierDashboard;