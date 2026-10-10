import { Link } from "react-router-dom";

function AdminActivityLogs() {
  const activities = [
    {
      id: 1,
      type: "Credential Verified",
      description:
        "Credential BC-AI-2026-8F29 was successfully verified.",
      actor: "Dr. Amit Kulkarni",
      role: "Verifier",
      status: "Success",
      time: "5 minutes ago",
      ip: "192.168.1.21",
    },
    {
      id: 2,
      type: "Student Registered",
      description:
        "A new student account was created on the platform.",
      actor: "Aarav Sharma",
      role: "Student",
      status: "Success",
      time: "12 minutes ago",
      ip: "192.168.1.34",
    },
    {
      id: 3,
      type: "Credential Flagged",
      description:
        "Credential BC-AI-2026-9E17 was flagged for manual review.",
      actor: "System AI",
      role: "AI Engine",
      status: "Warning",
      time: "27 minutes ago",
      ip: "System",
    },
    {
      id: 4,
      type: "Verifier Approved",
      description:
        "Verifier VER-2026-004 was approved by the administrator.",
      actor: "System Administrator",
      role: "Admin",
      status: "Success",
      time: "42 minutes ago",
      ip: "192.168.1.10",
    },
    {
      id: 5,
      type: "Blockchain Record Created",
      description:
        "A new credential hash was recorded on the blockchain.",
      actor: "Blockchain Service",
      role: "System",
      status: "Success",
      time: "1 hour ago",
      ip: "Blockchain",
    },
    {
      id: 6,
      type: "Student Account Suspended",
      description:
        "Student account STU-2026-005 was temporarily suspended.",
      actor: "System Administrator",
      role: "Admin",
      status: "Warning",
      time: "2 hours ago",
      ip: "192.168.1.10",
    },
    {
      id: 7,
      type: "Credential Issued",
      description:
        "A new B.Tech Certificate was issued to a student.",
      actor: "RCP Institute",
      role: "Issuer",
      status: "Success",
      time: "3 hours ago",
      ip: "192.168.1.56",
    },
    {
      id: 8,
      type: "Failed Login Attempt",
      description:
        "Multiple unsuccessful login attempts were detected.",
      actor: "Unknown User",
      role: "Unknown",
      status: "Failed",
      time: "4 hours ago",
      ip: "103.24.52.19",
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

            <Link
              to="/admin/verifiers"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>✓</span>
              Verifiers
            </Link>

            <Link
              to="/admin/credentials"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>▣</span>
              Credentials
            </Link>

            <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400">
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
                Audit System Online
              </p>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Platform events are being recorded normally.
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          {/* Heading */}
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm text-slate-500">
                Administration / Activity Logs
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                Activity Logs
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Monitor security events, administrative actions, and
                platform activity.
              </p>
            </div>

            <button className="w-fit rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:border-slate-600 hover:text-white">
              Export Logs
            </button>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Total Events
              </p>

              <p className="mt-3 text-3xl font-bold">
                48,291
              </p>

              <p className="mt-2 text-xs text-indigo-400">
                All recorded events
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Successful
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-400">
                47,823
              </p>

              <p className="mt-2 text-xs text-emerald-400">
                99.0% of events
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Warnings
              </p>

              <p className="mt-3 text-3xl font-bold text-amber-400">
                341
              </p>

              <p className="mt-2 text-xs text-amber-400">
                Require monitoring
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Failed Events
              </p>

              <p className="mt-3 text-3xl font-bold text-red-400">
                127
              </p>

              <p className="mt-2 text-xs text-red-400">
                Security monitoring
              </p>
            </div>
          </div>

          {/* Filters */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <div className="grid gap-4 lg:grid-cols-4">
              <div className="relative lg:col-span-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search activity, user or IP address..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />
              </div>

              <select className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-400 outline-none focus:border-indigo-500">
                <option>All Event Types</option>
                <option>Credential Verified</option>
                <option>Credential Issued</option>
                <option>Credential Flagged</option>
                <option>Student Registered</option>
                <option>Verifier Approved</option>
                <option>Login Events</option>
              </select>

              <select className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-400 outline-none focus:border-indigo-500">
                <option>All Status</option>
                <option>Success</option>
                <option>Warning</option>
                <option>Failed</option>
              </select>
            </div>
          </section>

          {/* Logs */}
          <section className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="flex items-center justify-between border-b border-slate-800 p-6">
              <div>
                <h2 className="font-semibold">
                  Platform Activity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Latest events recorded by BlockCred AI
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs text-emerald-400">
                  Live
                </span>
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800 text-left">
                    <th className="px-6 py-4 text-xs font-medium text-slate-500">
                      Event
                    </th>

                    <th className="px-6 py-4 text-xs font-medium text-slate-500">
                      Actor
                    </th>

                    <th className="px-6 py-4 text-xs font-medium text-slate-500">
                      Role
                    </th>

                    <th className="px-6 py-4 text-xs font-medium text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-medium text-slate-500">
                      Time
                    </th>

                    <th className="px-6 py-4 text-xs font-medium text-slate-500">
                      IP / Source
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-medium text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {activities.map((activity) => (
                    <tr
                      key={activity.id}
                      className="border-b border-slate-800 last:border-0 hover:bg-slate-800/30"
                    >
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium">
                          {activity.type}
                        </p>

                        <p className="mt-1 max-w-xs text-xs leading-5 text-slate-500">
                          {activity.description}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm text-slate-300">
                          {activity.actor}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                          {activity.role}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        {activity.status === "Success" && (
                          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                            Success
                          </span>
                        )}

                        {activity.status === "Warning" && (
                          <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400">
                            Warning
                          </span>
                        )}

                        {activity.status === "Failed" && (
                          <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-400">
                            Failed
                          </span>
                        )}
                      </td>

                      <td className="whitespace-nowrap px-6 py-5 text-xs text-slate-500">
                        {activity.time}
                      </td>

                      <td className="px-6 py-5 font-mono text-xs text-slate-500">
                        {activity.ip}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-indigo-500/30 hover:text-white">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile */}
            <div className="divide-y divide-slate-800 md:hidden">
              {activities.map((activity) => (
                <div key={activity.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium">
                        {activity.type}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {activity.description}
                      </p>
                    </div>

                    {activity.status === "Success" && (
                      <span className="rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] text-emerald-400">
                        Success
                      </span>
                    )}

                    {activity.status === "Warning" && (
                      <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] text-amber-400">
                        Warning
                      </span>
                    )}

                    {activity.status === "Failed" && (
                      <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] text-red-400">
                        Failed
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-600">
                        Actor
                      </p>

                      <p className="mt-1 text-slate-300">
                        {activity.actor}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-600">
                        Role
                      </p>

                      <p className="mt-1 text-slate-300">
                        {activity.role}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-600">
                        Time
                      </p>

                      <p className="mt-1 text-slate-400">
                        {activity.time}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-600">
                        IP / Source
                      </p>

                      <p className="mt-1 font-mono text-slate-400">
                        {activity.ip}
                      </p>
                    </div>
                  </div>

                  <button className="mt-4 w-full rounded-lg border border-slate-700 py-2 text-xs text-slate-400">
                    View Details
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-4 border-t border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">
                Showing 1–8 of 48,291 events
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

          {/* Security information */}
          <div className="mt-6 rounded-2xl border border-amber-500/10 bg-amber-500/5 p-5">
            <div className="flex gap-3">
              <span className="text-lg">🔐</span>

              <div>
                <p className="text-sm font-medium text-amber-300">
                  Security Audit Trail
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Activity logs provide an immutable record of important
                  platform actions. Failed login attempts and suspicious
                  credential activity should be reviewed by an authorized
                  administrator.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminActivityLogs;