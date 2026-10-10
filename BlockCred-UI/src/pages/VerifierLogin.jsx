import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function VerifierLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === "verifierEmail" ? "email" : "password"]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your official email and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/verifiers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid verifier credentials.");
      }

      login(data.token, data.verifier, rememberMe);
      setSuccess("Verifier verified! Redirecting to dashboard...");

      setTimeout(() => {
        navigate("/verifier/dashboard");
      }, 500);
    } catch (err) {
      console.error("Verifier login error:", err);
      setError(err.message || "Unable to connect to verification services.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
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

          <Link
            to="/"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-6 py-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl lg:grid-cols-2">

          {/* Left */}
          <div className="hidden border-r border-slate-800 bg-indigo-500/5 p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold">
                V
              </div>

              <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-indigo-400">
                Verifier Portal
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight">
                Verify credentials.
                <span className="block text-indigo-400">
                  Build digital trust.
                </span>
              </h2>

              <p className="mt-6 max-w-md leading-7 text-slate-400">
                Verify academic credentials using secure records and
                blockchain-backed verification.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  ✓
                </span>
                Instant credential verification
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  ✓
                </span>
                Blockchain-backed records
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  ✓
                </span>
                Tamper-resistant verification
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="p-7 sm:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-8 lg:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 font-bold">
                  V
                </div>
              </div>

              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                Authorized Access
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                Verifier Login
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Sign in to verify academic credentials and review
                verification records.
              </p>

              {/* Error Message */}
              {error && (
                <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="verifierEmail"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Official Email
                  </label>

                  <input
                    id="verifierEmail"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="verifier@organization.com"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="verifierPassword"
                      className="text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() => setError("Contact your organization administrator for password recovery.")}
                      className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="verifierPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 accent-indigo-600"
                  />
                  Remember this device
                </label>

                {/* Login */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Authenticating..." : "Sign In as Verifier"}
                </button>
              </form>

              <div className="mt-7 rounded-xl border border-amber-500/10 bg-amber-500/5 p-4">
                <p className="text-xs leading-5 text-slate-500">
                  <span className="font-medium text-amber-400">
                    Authorized users only.
                  </span>{" "}
                  Demo access: <span className="font-mono text-indigo-300">verifier@organization.com</span> / <span className="font-mono text-indigo-300">Verifier@123</span>
                </p>
              </div>

              <div className="mt-7 flex justify-center gap-2 text-xs text-slate-600">
                🔒 Secure verifier authentication
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VerifierLogin;