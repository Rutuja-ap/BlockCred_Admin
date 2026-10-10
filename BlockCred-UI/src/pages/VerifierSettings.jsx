import { Link } from "react-router-dom";

function VerifierSettings() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950">
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
              <p className="text-sm font-medium">Verifier Account</p>
              <p className="text-xs text-slate-500">
                Authorized Verifier
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300">
              VA
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
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 shrink-0 border-r border-slate-800 bg-slate-950 p-5 md:block">
          <nav className="space-y-2">
            <Link
              to="/verifier/dashboard"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>▦</span>
              Dashboard
            </Link>

            <Link
              to="/verifier/verify"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>✓</span>
              Verify Credential
            </Link>

            <Link
              to="/verifier/credential-result"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>▣</span>
              Verification Result
            </Link>

            <Link
              to="/verifier/profile"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>◉</span>
              My Profile
            </Link>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400"
            >
              <span>⚙</span>
              Settings
            </button>
          </nav>

          <div className="mt-10 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-4">
            <p className="text-xs font-semibold text-indigo-300">
              Security Settings
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Manage your verifier account security and notification
              preferences.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-400">
                Account Secure
              </span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            {/* Heading */}
            <div>
              <p className="text-sm text-slate-500">
                Verifier Portal / Settings
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                Settings
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Manage your account preferences, notifications, and
                security options.
              </p>
            </div>

            {/* Account Settings */}
            <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="border-b border-slate-800 p-6">
                <h2 className="font-semibold">
                  Account Settings
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Manage basic verifier account preferences.
                </p>
              </div>

              <div className="divide-y divide-slate-800">
                <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-medium">
                      Account Status
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Current status of your verifier account.
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Active
                  </span>
                </div>

                <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-sm font-medium">
                      Two-Factor Authentication
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Add an additional security layer to your account.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="w-fit rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 text-xs text-emerald-400"
                  >
                    Enabled
                  </button>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="border-b border-slate-800 p-6">
                <h2 className="font-semibold">
                  Notifications
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Choose which notifications you want to receive.
                </p>
              </div>

              <div className="divide-y divide-slate-800">
                <div className="flex items-center justify-between gap-5 p-6">
                  <div>
                    <p className="text-sm font-medium">
                      Verification Alerts
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Receive notifications about credential verification
                      activities.
                    </p>
                  </div>

                  <div className="h-6 w-11 rounded-full bg-indigo-600 p-1">
                    <div className="ml-auto h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 p-6">
                  <div>
                    <p className="text-sm font-medium">
                      Security Alerts
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Get notified about important account security events.
                    </p>
                  </div>

                  <div className="h-6 w-11 rounded-full bg-indigo-600 p-1">
                    <div className="ml-auto h-4 w-4 rounded-full bg-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-5 p-6">
                  <div>
                    <p className="text-sm font-medium">
                      System Updates
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Receive important BlockCred AI system updates.
                    </p>
                  </div>

                  <div className="h-6 w-11 rounded-full bg-slate-700 p-1">
                    <div className="h-4 w-4 rounded-full bg-slate-400" />
                  </div>
                </div>
              </div>
            </section>

            {/* Verification Preferences */}
            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="border-b border-slate-800 p-6">
                <h2 className="font-semibold">
                  Verification Preferences
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Configure how credential verification is handled.
                </p>
              </div>

              <div className="divide-y divide-slate-800">
                <div className="flex items-center justify-between gap-5 p-6">
                  <div>
                    <p className="text-sm font-medium">
                      Blockchain Validation
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Validate credentials against blockchain records.
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 p-6">
                  <div>
                    <p className="text-sm font-medium">
                      AI Document Analysis
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Use AI-assisted analysis when reviewing credentials.
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Enabled
                  </span>
                </div>
              </div>
            </section>

            {/* Password */}
            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="border-b border-slate-800 p-6">
                <h2 className="font-semibold">
                  Password & Security
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Manage your account password and security.
                </p>
              </div>

              <div className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium">
                    Password
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Last changed 30 days ago.
                  </p>
                </div>

                <button
                  type="button"
                  className="w-fit rounded-xl border border-slate-700 px-5 py-2.5 text-xs font-medium text-slate-300 transition hover:border-indigo-500/40 hover:text-white"
                >
                  Change Password
                </button>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="mt-6 rounded-2xl border border-red-500/10 bg-red-500/5">
              <div className="border-b border-red-500/10 p-6">
                <h2 className="font-semibold text-red-300">
                  Danger Zone
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Actions in this section may affect your verifier access.
                </p>
              </div>

              <div className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium">
                    Sign out from all devices
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    End all active verifier sessions.
                  </p>
                </div>

                <button
                  type="button"
                  className="w-fit rounded-xl border border-red-500/20 px-5 py-2.5 text-xs text-red-400 transition hover:bg-red-500/10"
                >
                  Sign Out All
                </button>
              </div>
            </section>

            {/* Footer Actions */}
            <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <Link
                to="/verifier/dashboard"
                className="text-sm text-slate-500 transition hover:text-white"
              >
                ← Back to Dashboard
              </Link>

              <Link
                to="/verifier/verify"
                className="rounded-xl bg-indigo-600 px-5 py-3 text-center text-sm font-semibold transition hover:bg-indigo-500"
              >
                Verify a Credential →
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VerifierSettings;