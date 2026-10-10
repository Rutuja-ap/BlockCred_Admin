import { Link } from "react-router-dom";

function VerifierVerifyCredential() {
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

            <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400">
              <span>✓</span>
              Verify Credential
            </button>

            <Link
              to="/verifier/credential-result"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>▣</span>
              Verification Result
            </Link>
          </nav>

          <div className="mt-10 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-4">
            <p className="text-xs font-semibold text-indigo-300">
              Secure Verification
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Verify academic credentials using their unique credential
              ID.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-400">
                Verification System Active
              </span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <div className="mx-auto max-w-4xl">
            {/* Heading */}
            <div>
              <p className="text-sm text-slate-500">
                Verifier Portal / Verify Credential
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                Verify Academic Credential
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                Enter a credential ID to verify its authenticity,
                issuer information, student details, and blockchain
                verification status.
              </p>
            </div>

            {/* Verification Card */}
            <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-500/10 text-xl text-indigo-400">
                  ✓
                </div>

                <div>
                  <h2 className="font-semibold">
                    Credential Verification
                  </h2>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Use the credential ID provided by the student or
                    institution.
                  </p>
                </div>
              </div>

              {/* Input */}
              <div className="mt-8">
                <label className="text-sm font-medium text-slate-300">
                  Credential ID
                </label>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    placeholder="Example: BC-AI-2026-8F29"
                    className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                  />

                  <button
                    type="button"
                    className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold transition hover:bg-indigo-500"
                  >
                    Verify Credential
                  </button>
                </div>

                <p className="mt-3 text-xs text-slate-600">
                  Enter the complete credential ID without spaces.
                </p>
              </div>
            </section>

            {/* How it works */}
            <section className="mt-6">
              <h2 className="text-lg font-semibold">
                How Verification Works
              </h2>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-sm text-indigo-400">
                    01
                  </div>

                  <h3 className="mt-4 text-sm font-semibold">
                    Enter Credential ID
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Enter the unique credential ID provided by the
                    student.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/10 text-sm text-purple-400">
                    02
                  </div>

                  <h3 className="mt-4 text-sm font-semibold">
                    AI & Blockchain Check
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    The system checks the credential data and blockchain
                    record.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-sm text-emerald-400">
                    03
                  </div>

                  <h3 className="mt-4 text-sm font-semibold">
                    Get Verification Result
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    View whether the academic credential is authentic
                    and valid.
                  </p>
                </div>
              </div>
            </section>

            {/* Security Notice */}
            <section className="mt-6 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-5">
              <div className="flex gap-3">
                <span className="text-lg">🔐</span>

                <div>
                  <p className="text-sm font-medium text-emerald-300">
                    Trusted Verification
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    BlockCred AI helps organizations verify academic
                    credentials through secure, tamper-resistant
                    records.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default VerifierVerifyCredential;