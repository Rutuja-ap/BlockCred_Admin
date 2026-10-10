import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function UploadCredential() {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!file) return;

    setIsAnalyzing(true);

    // Temporary frontend simulation.
    // Backend + AI + blockchain will be connected later.
    setTimeout(() => {
      setIsAnalyzing(false);
      navigate("/student/credential-result");
    }, 1500);
  };

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
                STUDENT PORTAL
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

      {/* Main */}
      <main className="relative px-6 py-12">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          {/* Heading */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
              Credential Management
            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Upload Academic Credential
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Upload your academic certificate for AI-assisted analysis and
              blockchain-backed verification.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {/* Upload area */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold">
                Credential Document
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Supported formats: PDF, JPG, JPEG, PNG
              </p>

              <label
                htmlFor="credential"
                className="mt-6 flex min-h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950/70 px-6 text-center transition hover:border-indigo-500/50 hover:bg-indigo-500/5"
              >
                <input
                  id="credential"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-3xl">
                  ↑
                </div>

                <h3 className="mt-5 font-semibold">
                  {file ? file.name : "Choose your credential"}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {file
                    ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
                    : "Click to browse or drag and drop your document"}
                </p>

                {!file && (
                  <span className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
                    Browse Files
                  </span>
                )}
              </label>

              {file && (
                <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Ready for analysis
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    disabled={isAnalyzing}
                    className="ml-4 text-xs text-red-400 hover:text-red-300 disabled:opacity-40"
                  >
                    Remove
                  </button>
                </div>
              )}

              <button
                type="button"
                disabled={!file || isAnalyzing}
                onClick={handleSubmit}
                className="mt-6 w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isAnalyzing
                  ? "Analyzing Credential..."
                  : "Analyze & Submit Credential"}
              </button>
            </section>

            {/* Information */}
            <aside className="space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
                  Verification Process
                </p>

                <div className="mt-6 space-y-5">
                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-sm text-indigo-400">
                      01
                    </span>

                    <div>
                      <p className="text-sm font-medium">Upload</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Submit your academic credential.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-sm text-indigo-400">
                      02
                    </span>

                    <div>
                      <p className="text-sm font-medium">AI Analysis</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Credential information is analyzed.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-sm text-indigo-400">
                      03
                    </span>

                    <div>
                      <p className="text-sm font-medium">Verification</p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Credential authenticity is checked.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-sm text-emerald-400">
                      ✓
                    </span>

                    <div>
                      <p className="text-sm font-medium">
                        Blockchain Record
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        A secure verification record is created.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-6">
                <div className="flex gap-3">
                  <span className="text-xl">🔒</span>

                  <div>
                    <h3 className="text-sm font-semibold text-emerald-300">
                      Your data is protected
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Credential processing is designed to maintain data
                      integrity and secure access.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UploadCredential;