import { Link } from "react-router-dom";

function CredentialResult() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950/90">
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
                CREDENTIAL VERIFICATION
              </p>
            </div>
          </Link>

          <Link
            to="/student/dashboard"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      <main className="px-6 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Heading */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Verification Result
            </p>

            <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">
                  Credential Verified
                </h1>

                <p className="mt-2 text-slate-400">
                  Your academic credential has successfully passed the
                  verification process.
                </p>
              </div>

              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Verified
              </span>
            </div>
          </div>

          {/* Score + Summary */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Score */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <p className="text-sm text-slate-500">
                Authenticity Score
              </p>

              <div className="mt-6 flex items-center justify-center">
                <div className="flex h-40 w-40 items-center justify-center rounded-full border-[10px] border-emerald-500/20">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-emerald-400">
                      98%
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      High Confidence
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl bg-emerald-500/5 p-4 text-center">
                <p className="text-sm font-medium text-emerald-300">
                  Credential appears authentic
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  AI analysis completed successfully
                </p>
              </div>
            </section>

            {/* Credential information */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 lg:col-span-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Extracted Information
                  </p>

                  <h2 className="mt-1 text-xl font-semibold">
                    Credential Details
                  </h2>
                </div>

                <span className="rounded-lg bg-indigo-500/10 px-3 py-1 text-xs text-indigo-400">
                  AI Analyzed
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-slate-500">Student Name</p>
                  <p className="mt-1 text-sm font-medium">
                    Verified Student
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Credential Type
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    Bachelor of Computer Engineering
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Institution
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    R. C. Patel Institute of Technology
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Graduation Year
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    2027
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Credential ID
                  </p>
                  <p className="mt-1 font-mono text-sm text-indigo-300">
                    BC-AI-2026-8F29
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Verification Date
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    August 13, 2026
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* AI Analysis */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                AI Validation
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                Analysis Results
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Document Integrity
                  </p>

                  <span className="text-emerald-400">✓</span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  No obvious document manipulation detected.
                </p>

                <div className="mt-4 h-1.5 rounded-full bg-slate-800">
                  <div className="h-1.5 w-[98%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Data Consistency
                  </p>

                  <span className="text-emerald-400">✓</span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Extracted information is internally consistent.
                </p>

                <div className="mt-4 h-1.5 rounded-full bg-slate-800">
                  <div className="h-1.5 w-[96%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Verification Confidence
                  </p>

                  <span className="text-emerald-400">✓</span>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  AI confidence indicates a highly likely authentic
                  credential.
                </p>

                <div className="mt-4 h-1.5 rounded-full bg-slate-800">
                  <div className="h-1.5 w-[98%] rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
          </section>

          {/* Blockchain */}
          <section className="mt-6 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 p-6">
            <div className="flex flex-col justify-between gap-6 lg:flex-row">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                  Blockchain Record
                </p>

                <h2 className="mt-2 text-xl font-semibold">
                  Credential integrity secured
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  A cryptographic record has been associated with this
                  credential to help detect unauthorized modifications.
                </p>
              </div>

              <div className="min-w-0 lg:w-[420px]">
                <p className="text-xs text-slate-500">
                  Transaction Hash
                </p>

                <div className="mt-2 rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="truncate font-mono text-xs text-indigo-300">
                    0x7f29a83c91e2d8b4c62a91f0e7b829a91c62f8d9
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Blockchain record confirmed
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
              Verification Timeline
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <span className="text-emerald-400">✓</span>
                <p className="mt-3 text-sm font-medium">
                  Credential Uploaded
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Document received
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <span className="text-emerald-400">✓</span>
                <p className="mt-3 text-sm font-medium">
                  AI Analysis
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Analysis completed
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <span className="text-emerald-400">✓</span>
                <p className="mt-3 text-sm font-medium">
                  Verification
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Credential authenticated
                </p>
              </div>

              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                <span className="text-emerald-400">✓</span>
                <p className="mt-3 text-sm font-medium">
                  Blockchain
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Record confirmed
                </p>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/student/upload-credential"
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Upload Another Credential
            </Link>

            <Link
              to="/student/dashboard"
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-slate-600 hover:text-white"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CredentialResult;