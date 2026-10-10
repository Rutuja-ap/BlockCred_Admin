import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function StudentVerifyCredential() {
  const [credentialId, setCredentialId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const getInitials = (name) => {
    if (!name) return "ST";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleVerify = () => {
    const id = credentialId.trim();

    if (!id) {
      setError("Please enter a credential ID.");
      return;
    }

    setError("");
    setIsVerifying(true);

    // Temporary frontend simulation.
    // Real blockchain verification will be connected later.
    setTimeout(() => {
      setIsVerifying(false);

      navigate("/student/credential-result", {
        state: {
          credentialId: id,
          verified: true,
        },
      });
    }, 1500);
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
                STUDENT PORTAL
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{user?.name || "Student"}</p>

              <p className="text-xs text-slate-500">
                {user?.department || user?.institution || "Computer Engineering"}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300">
              {getInitials(user?.name)}
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
              to="/student/dashboard"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>▦</span>
              Dashboard
            </Link>

            <Link
              to="/student/credentials"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>▣</span>
              My Credentials
            </Link>

            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400"
            >
              <span>✓</span>
              Verify Credential
            </button>

            <Link
              to="/student/profile"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>◉</span>
              My Profile
            </Link>

            <Link
              to="/student/settings"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>⚙</span>
              Settings
            </Link>
          </nav>

          <div className="mt-10 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <p className="text-xs font-semibold text-emerald-400">
                Verification System Online
              </p>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Blockchain verification services are operational.
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <div>
            <p className="text-sm text-slate-500">
              Student Portal / Verify Credential
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Verify Credential
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Verify the authenticity and integrity of a BlockCred AI
              credential using its unique credential ID.
            </p>
          </div>

          {/* Verification Box */}
          <section className="mt-8 max-w-4xl rounded-3xl border border-slate-800 bg-slate-900/60 p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-400">
                ✓
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Credential Verification
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Enter the credential ID exactly as it appears on your
                  digital certificate.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <label
                htmlFor="credential-id"
                className="text-xs font-medium text-slate-400"
              >
                Credential ID
              </label>

              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="credential-id"
                  type="text"
                  value={credentialId}
                  onChange={(event) => {
                    setCredentialId(event.target.value);
                    setError("");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleVerify();
                    }
                  }}
                  placeholder="Example: BC-AI-2026-8F29"
                  className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
                />

                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isVerifying
                    ? "Verifying..."
                    : "Verify Credential"}
                </button>
              </div>

              {error && (
                <p className="mt-3 text-xs text-red-400">
                  {error}
                </p>
              )}

              <p className="mt-3 text-xs text-slate-600">
                Example credential ID:
                <span className="ml-1 font-mono text-indigo-400">
                  BC-AI-2026-8F29
                </span>
              </p>
            </div>
          </section>

          {/* Verification Methods */}
          <section className="mt-6 grid max-w-4xl gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                #
              </div>

              <h3 className="mt-4 font-semibold">
                Credential ID
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Enter the unique credential ID printed on the digital
                credential to verify its authenticity.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                🔗
              </div>

              <h3 className="mt-4 font-semibold">
                Blockchain Verification
              </h3>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                The credential hash is checked against its blockchain
                record to confirm that it has not been modified.
              </p>
            </div>
          </section>

          {/* What gets checked */}
          <section className="mt-8 max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h2 className="font-semibold">
              What gets verified?
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                [
                  "Credential Authenticity",
                  "Confirms that the credential was issued by a recognized institution.",
                ],
                [
                  "Credential Integrity",
                  "Confirms that credential information has not been modified.",
                ],
                [
                  "Issuer Verification",
                  "Checks the identity of the organization that issued the credential.",
                ],
                [
                  "Blockchain Record",
                  "Confirms that the credential hash matches the blockchain record.",
                ],
              ].map(([title, description]) => (
                <div key={title} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-xs text-emerald-400">
                    ✓
                  </div>

                  <div>
                    <p className="text-sm font-medium">{title}</p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Example Result */}
          <section className="mt-8 max-w-4xl rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-lg text-emerald-400">
                ✓
              </div>

              <div className="flex-1">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <div>
                    <p className="text-sm font-semibold text-emerald-300">
                      Verification Result
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Example successful verification result
                    </p>
                  </div>

                  <span className="h-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Authentic
                  </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-600">
                      Credential ID
                    </p>

                    <p className="mt-1 font-mono text-xs text-indigo-400">
                      BC-AI-2026-8F29
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600">
                      Status
                    </p>

                    <p className="mt-1 text-xs text-emerald-400">
                      ✓ Blockchain Verified
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600">
                      Issuer
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      RCP Institute of Technology
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-600">
                      Credential
                    </p>

                    <p className="mt-1 text-sm text-slate-300">
                      B.Tech Computer Engineering
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <p className="text-xs text-slate-600">
                    Blockchain Hash
                  </p>

                  <p className="mt-2 break-all font-mono text-xs text-slate-400">
                    0x8f29c7a21d4b8e91f72a0a3c9d81e7f2b45c6a10
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Security Note */}
          <div className="mt-6 max-w-4xl rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-5">
            <div className="flex gap-3">
              <span className="text-lg">🔐</span>

              <div>
                <p className="text-sm font-medium text-indigo-300">
                  Secure Verification
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Verification checks the credential against its
                  blockchain-backed record. No personal information is
                  modified during the verification process.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentVerifyCredential;