import { Link } from "react-router-dom";

function AdminVerifiers() {
  const verifiers = [
    {
      id: "VER-2026-001",
      name: "Dr. Amit Kulkarni",
      organization: "RCP Institute",
      email: "amit@example.com",
      verifications: 842,
      status: "Active",
      joined: "Aug 08, 2026",
    },
    {
      id: "VER-2026-002",
      name: "Prof. Neha Sharma",
      organization: "Tech University",
      email: "neha@example.com",
      verifications: 617,
      status: "Active",
      joined: "Aug 05, 2026",
    },
    {
      id: "VER-2026-003",
      name: "Rahul Joshi",
      organization: "Digital Institute",
      email: "rahul@example.com",
      verifications: 0,
      status: "Pending",
      joined: "Aug 12, 2026",
    },
    {
      id: "VER-2026-004",
      name: "Sneha Patil",
      organization: "Engineering College",
      email: "sneha@example.com",
      verifications: 392,
      status: "Active",
      joined: "Jul 28, 2026",
    },
    {
      id: "VER-2026-005",
      name: "Vikas More",
      organization: "Education Trust",
      email: "vikas@example.com",
      verifications: 128,
      status: "Suspended",
      joined: "Jul 21, 2026",
    },
  ];

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
                ADMIN PORTAL
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                System Administrator
              </p>

              <p className="text-xs text-slate-500">
                Full Access
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300">
              AD
            </div>

            <Link
              to="/"
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-slate-600 hover:text-white"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 border-r border-slate-800 bg-slate-950 p-5 md:block">
          <nav className="space-y-2">
            <Link
              to="/admin/dashboard"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>▦</span>
              Dashboard
            </Link>

            <Link
              to="/admin/students"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>👥</span>
              Students
            </Link>

            <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400">
              <span>✓</span>
              Verifiers
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              <span>▣</span>
              Credentials
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              <span>◷</span>
              Activity Logs
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white">
              <span>⚙</span>
              Settings
            </button>
          </nav>

          <div className="mt-10 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <p className="text-xs font-semibold text-emerald-400">
                Verification Network Online
              </p>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Verifier services are operating normally.
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          {/* Heading */}
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm text-slate-500">
                Administration / Verifiers
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                Verifier Management
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Approve, monitor, and manage authorized credential verifiers.
              </p>
            </div>

            <button className="w-fit rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500">
              + Add Verifier
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Total Verifiers
              </p>

              <p className="mt-3 text-3xl font-bold">
                342
              </p>

              <p className="mt-2 text-xs text-indigo-400">
                Registered accounts
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Active
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-400">
                318
              </p>

              <p className="mt-2 text-xs text-emerald-400">
                Currently authorized
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Pending Approval
              </p>

              <p className="mt-3 text-3xl font-bold text-amber-400">
                17
              </p>

              <p className="mt-2 text-xs text-amber-400">
                Requires review
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Suspended
              </p>

              <p className="mt-3 text-3xl font-bold text-red-400">
                7
              </p>

              <p className="mt-2 text-xs text-red-400">
                Access restricted
              </p>
            </div>
          </div>

          {/* Search */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search by name, email, organization or verifier ID..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              <select className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-400 outline-none focus:border-indigo-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
                <option>Suspended</option>
              </select>

              <button className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-slate-600 hover:text-white">
                Export
              </button>
            </div>
          </section>

          {/* Table */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between border-b border-slate-800 p-6">
              <div>
                <h2 className="font-semibold">
                  Authorized Verifiers
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Showing 5 of 342 verifiers
                </p>
              </div>

              <button className="text-xs text-indigo-400 hover:text-indigo-300">
                Refresh
              </button>
            </div>

            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800 text-left">
                    <th className="px-6 py-4 text-xs font-medium text-slate-500">
                      Verifier
                    </th>

                    <th className="px-6 py-4 text-xs font-medium text-slate-500">
                      Verifier ID
                    </th>

                    <th className="px-6 py-4 text-xs font-medium text-slate-500">
                      Organization
                    </th>

                    <th className="px-6 py-4 text-xs font-medium text-slate-500">
                      Verifications
                    </th>

                    <th className="px-6 py-4 text-xs font-medium text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-medium text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {verifiers.map((verifier) => (
                    <tr
                      key={verifier.id}
                      className="border-b border-slate-800 last:border-0 hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-semibold text-indigo-300">
                            {verifier.name
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </div>

                          <div>
                            <p className="text-sm font-medium">
                              {verifier.name}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              {verifier.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span className="font-mono text-xs text-indigo-300">
                          {verifier.id}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-300">
                        {verifier.organization}
                      </td>

                      <td className="px-6 py-5 text-sm text-slate-300">
                        {verifier.verifications.toLocaleString()}
                      </td>

                      <td className="px-6 py-5">
                        {verifier.status === "Active" && (
                          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                            Active
                          </span>
                        )}

                        {verifier.status === "Pending" && (
                          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
                            Pending
                          </span>
                        )}

                        {verifier.status === "Suspended" && (
                          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                            Suspended
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-indigo-500/30 hover:text-white">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-slate-800 md:hidden">
              {verifiers.map((verifier) => (
                <div key={verifier.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-semibold text-indigo-300">
                        {verifier.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          {verifier.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {verifier.organization}
                        </p>
                      </div>
                    </div>

                    {verifier.status === "Active" && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-400">
                        Active
                      </span>
                    )}

                    {verifier.status === "Pending" && (
                      <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] text-amber-400">
                        Pending
                      </span>
                    )}

                    {verifier.status === "Suspended" && (
                      <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] text-red-400">
                        Suspended
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-600">
                        Verifier ID
                      </p>

                      <p className="mt-1 font-mono text-indigo-300">
                        {verifier.id}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-600">
                        Verifications
                      </p>

                      <p className="mt-1 text-slate-300">
                        {verifier.verifications.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <button className="mt-4 w-full rounded-lg border border-slate-700 py-2 text-xs text-slate-400">
                    View Verifier
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-4 border-t border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Showing 1–5 of 342 verifiers
              </p>

              <div className="flex items-center gap-2">
                <button className="rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-600">
                  Previous
                </button>

                <button className="rounded-lg bg-indigo-600 px-3 py-2 text-xs text-white">
                  1
                </button>

                <button className="rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-400">
                  2
                </button>

                <button className="rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-400">
                  3
                </button>

                <button className="rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-400">
                  Next
                </button>
              </div>
            </div>
          </section>

          {/* Security */}
          <div className="mt-6 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-5">
            <p className="text-xs leading-5 text-slate-500">
              🔐 Verifier approval and access changes are restricted to
              authorized administrators. All actions will be recorded in
              the platform activity logs.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminVerifiers;