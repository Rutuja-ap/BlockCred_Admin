import { Link } from "react-router-dom";

function VerifierProfile() {
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

            <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400">
              <span>◉</span>
              My Profile
            </button>
          </nav>

          <div className="mt-10 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-4">
            <p className="text-xs font-semibold text-indigo-300">
              Verifier Account
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Your verifier identity is authorized to validate academic
              credentials.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-400">
                Account Verified
              </span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <div className="mx-auto max-w-5xl">
            {/* Heading */}
            <div>
              <p className="text-sm text-slate-500">
                Verifier Portal / My Profile
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                My Profile
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                View your verifier identity, organization details, and
                verification permissions.
              </p>
            </div>

            {/* Profile Header */}
            <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 lg:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-indigo-500/10 text-2xl font-bold text-indigo-400">
                  VA
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold">
                      Verifier Account
                    </h2>

                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                      ✓ Verified
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-400">
                    Authorized Academic Credential Verifier
                  </p>

                  <p className="mt-2 text-xs text-slate-600">
                    Verifier ID: VRF-2026-00482
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-xl border border-slate-700 px-5 py-3 text-xs font-medium text-slate-300 transition hover:border-indigo-500/40 hover:text-white"
                >
                  Edit Profile
                </button>
              </div>
            </section>

            {/* Personal Information */}
            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="border-b border-slate-800 p-6">
                <h2 className="font-semibold">
                  Personal Information
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your registered verifier account information.
                </p>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">
                    Full Name
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    Authorized Verifier
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Email Address
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    verifier@blockcred.ai
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Contact Number
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    +91 XXXXX XXXXX
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Account Type
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    Credential Verifier
                  </p>
                </div>
              </div>
            </section>

            {/* Organization */}
            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="border-b border-slate-800 p-6">
                <h2 className="font-semibold">
                  Organization Information
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Institution associated with this verifier account.
                </p>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">
                    Organization
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    RCP Institute of Technology
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Department
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    Academic Verification
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Organization ID
                  </p>

                  <p className="mt-2 font-mono text-sm text-indigo-400">
                    ORG-RCP-2026
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Verification Status
                  </p>

                  <p className="mt-2 text-sm font-medium text-emerald-400">
                    Active
                  </p>
                </div>
              </div>
            </section>

            {/* Permissions */}
            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="border-b border-slate-800 p-6">
                <h2 className="font-semibold">
                  Verification Permissions
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Access granted to your verifier account.
                </p>
              </div>

              <div className="divide-y divide-slate-800">
                <div className="flex items-center justify-between gap-5 p-6">
                  <div>
                    <p className="text-sm font-medium">
                      Credential Verification
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Verify academic credentials using their unique ID.
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 p-6">
                  <div>
                    <p className="text-sm font-medium">
                      Blockchain Validation
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Validate credential records against blockchain data.
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Enabled
                  </span>
                </div>

                <div className="flex items-center justify-between gap-5 p-6">
                  <div>
                    <p className="text-sm font-medium">
                      Verification History
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Access your previous credential verification records.
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Enabled
                  </span>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="mt-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-6">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  🔐
                </div>

                <div>
                  <h2 className="text-sm font-semibold text-emerald-300">
                    Verified Verifier Identity
                  </h2>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Your verifier account is authorized to validate
                    academic credentials. Verification activity can be
                    securely tracked through BlockCred AI.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <span className="rounded-full border border-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400">
                      ✓ Identity Verified
                    </span>

                    <span className="rounded-full border border-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400">
                      ✓ Organization Verified
                    </span>

                    <span className="rounded-full border border-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400">
                      ✓ Access Active
                    </span>
                  </div>
                </div>
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

export default VerifierProfile;