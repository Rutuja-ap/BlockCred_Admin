import { Link } from "react-router-dom";

function AdminSettings() {
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

            <Link
              to="/admin/activity-logs"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>◷</span>
              Activity Logs
            </Link>

            <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400">
              <span>⚙</span>
              Settings
            </button>
          </nav>

          {/* System Status */}
          <div className="mt-10 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <p className="text-xs font-semibold text-emerald-400">
                All Systems Operational
              </p>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              BlockCred AI services are running normally.
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          {/* Heading */}
          <div>
            <p className="text-sm text-slate-500">
              Administration / Settings
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              System Settings
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage administrator preferences, platform configuration,
              and security controls.
            </p>
          </div>

          {/* Profile */}
          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="border-b border-slate-800 p-6">
              <h2 className="font-semibold">
                Administrator Profile
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Manage your administrator account information.
              </p>
            </div>

            <div className="p-6">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-2xl font-bold text-indigo-300">
                  AD
                </div>

                <div className="grid flex-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="text-xs text-slate-500">
                      Full Name
                    </label>

                    <input
                      type="text"
                      defaultValue="System Administrator"
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500">
                      Email Address
                    </label>

                    <input
                      type="email"
                      defaultValue="admin@blockcred.ai"
                      className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500">
                      Role
                    </label>

                    <input
                      type="text"
                      defaultValue="Super Administrator"
                      disabled
                      className="mt-2 w-full cursor-not-allowed rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-500">
                      Last Login
                    </label>

                    <input
                      type="text"
                      defaultValue="Today, 10:42 AM"
                      disabled
                      className="mt-2 w-full cursor-not-allowed rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500">
                  Save Profile
                </button>
              </div>
            </div>
          </section>

          {/* Platform Settings */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="border-b border-slate-800 p-6">
              <h2 className="font-semibold">
                Platform Configuration
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                General BlockCred AI platform settings.
              </p>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              <div>
                <label className="text-xs text-slate-500">
                  Platform Name
                </label>

                <input
                  type="text"
                  defaultValue="BlockCred AI"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500">
                  Environment
                </label>

                <select className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-indigo-500">
                  <option>Production</option>
                  <option>Development</option>
                  <option>Testing</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500">
                  Default Credential Validity
                </label>

                <select className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-indigo-500">
                  <option>Permanent</option>
                  <option>1 Year</option>
                  <option>3 Years</option>
                  <option>5 Years</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500">
                  Default Language
                </label>

                <select className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-indigo-500">
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Marathi</option>
                </select>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="border-b border-slate-800 p-6">
              <h2 className="font-semibold">
                Security Controls
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Configure administrator and platform security policies.
              </p>
            </div>

            <div className="divide-y divide-slate-800">
              {/* 2FA */}
              <div className="flex items-center justify-between gap-5 p-6">
                <div>
                  <p className="text-sm font-medium">
                    Two-Factor Authentication
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Require administrators to use an additional
                    authentication method.
                  </p>
                </div>

                <button className="relative h-6 w-11 shrink-0 rounded-full bg-indigo-600">
                  <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                </button>
              </div>

              {/* Login alerts */}
              <div className="flex items-center justify-between gap-5 p-6">
                <div>
                  <p className="text-sm font-medium">
                    Login Security Alerts
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Receive notifications when suspicious login activity
                    is detected.
                  </p>
                </div>

                <button className="relative h-6 w-11 shrink-0 rounded-full bg-indigo-600">
                  <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                </button>
              </div>

              {/* Credential monitoring */}
              <div className="flex items-center justify-between gap-5 p-6">
                <div>
                  <p className="text-sm font-medium">
                    Credential Integrity Monitoring
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Automatically monitor credential hashes and blockchain
                    integrity.
                  </p>
                </div>

                <button className="relative h-6 w-11 shrink-0 rounded-full bg-indigo-600">
                  <span className="absolute right-1 top-1 h-4 w-4 rounded-full bg-white" />
                </button>
              </div>

              {/* Maintenance */}
              <div className="flex items-center justify-between gap-5 p-6">
                <div>
                  <p className="text-sm font-medium">
                    Maintenance Mode
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Temporarily disable platform access during maintenance.
                  </p>
                </div>

                <button className="relative h-6 w-11 shrink-0 rounded-full bg-slate-700">
                  <span className="absolute left-1 top-1 h-4 w-4 rounded-full bg-slate-400" />
                </button>
              </div>
            </div>
          </section>

          {/* Blockchain */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="border-b border-slate-800 p-6">
              <h2 className="font-semibold">
                Blockchain Configuration
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Configure the blockchain network used for credential
                verification.
              </p>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
              <div>
                <label className="text-xs text-slate-500">
                  Network
                </label>

                <select className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none focus:border-indigo-500">
                  <option>Ethereum Testnet</option>
                  <option>Polygon Testnet</option>
                  <option>Ethereum Mainnet</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500">
                  Network Status
                </label>

                <div className="mt-2 flex h-11 items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />

                  <span className="text-sm text-emerald-400">
                    Connected
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500">
                  Contract Address
                </label>

                <input
                  type="text"
                  defaultValue="0x8F29...A72C"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-xs text-slate-300 outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500">
                  Chain ID
                </label>

                <input
                  type="text"
                  defaultValue="11155111"
                  className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm text-slate-300 outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-800 p-6">
              <button className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500">
                Save Blockchain Settings
              </button>
            </div>
          </section>

          {/* Notifications */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="border-b border-slate-800 p-6">
              <h2 className="font-semibold">
                Notification Preferences
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Choose which system events should generate notifications.
              </p>
            </div>

            <div className="divide-y divide-slate-800">
              <div className="flex items-center justify-between gap-5 p-6">
                <div>
                  <p className="text-sm font-medium">
                    New Verifier Requests
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Notify administrators when a verifier requests access.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between gap-5 p-6">
                <div>
                  <p className="text-sm font-medium">
                    Flagged Credentials
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Notify administrators about suspicious credentials.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between gap-5 p-6">
                <div>
                  <p className="text-sm font-medium">
                    Security Events
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Receive alerts for important security events.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 accent-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between gap-5 p-6">
                <div>
                  <p className="text-sm font-medium">
                    Weekly Platform Report
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Receive a weekly summary of platform activity.
                  </p>
                </div>

                <input
                  type="checkbox"
                  className="h-4 w-4 accent-indigo-600"
                />
              </div>
            </div>
          </section>

          {/* System status */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  System Status
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Current BlockCred AI service health.
                </p>
              </div>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                Operational
              </span>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs text-slate-600">
                  API
                </p>

                <p className="mt-2 text-sm text-emerald-400">
                  ● Operational
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs text-slate-600">
                  Database
                </p>

                <p className="mt-2 text-sm text-emerald-400">
                  ● Operational
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs text-slate-600">
                  Blockchain
                </p>

                <p className="mt-2 text-sm text-emerald-400">
                  ● Operational
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <p className="text-xs text-slate-600">
                  AI Engine
                </p>

                <p className="mt-2 text-sm text-emerald-400">
                  ● Operational
                </p>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/5">
            <div className="border-b border-red-500/10 p-6">
              <h2 className="font-semibold text-red-300">
                Danger Zone
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                These actions can affect the entire platform.
              </p>
            </div>

            <div className="flex flex-col justify-between gap-5 p-6 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-medium">
                  Reset Platform Configuration
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Restore configuration values to their default settings.
                </p>
              </div>

              <button className="rounded-xl border border-red-500/30 px-5 py-3 text-sm text-red-400 transition hover:bg-red-500/10">
                Reset Configuration
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default AdminSettings;