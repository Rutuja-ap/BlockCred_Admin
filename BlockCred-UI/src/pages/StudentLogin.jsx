
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function StudentLogin() {
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

  const handleChange = (event) => {
    const { id, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [id]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/students/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password."
        );
      }

      /*
       * Save logged-in student information via AuthContext.
       */
      login(data.token, data.student, rememberMe);

      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/student/dashboard");
      }, 500);
    } catch (error) {
      console.error("Student login error:", error);

      setError(
        error.message ||
          "Unable to connect to the backend server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Top bar */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold">
              B
            </div>

            <div>
              <h1 className="font-bold">
                BlockCred{" "}
                <span className="text-indigo-400">AI</span>
              </h1>

              <p className="text-[9px] tracking-wider text-slate-500">
                CREDENTIAL VERIFICATION
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

      {/* Login area */}
      <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-6 py-12">
        {/* Background glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl lg:grid-cols-2">

          {/* Left panel */}
          <div className="hidden border-r border-slate-800 bg-indigo-600/5 p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl font-bold">
                B
              </div>

              <p className="mt-10 text-sm font-semibold uppercase tracking-widest text-indigo-400">
                Student Portal
              </p>

              <h2 className="mt-4 text-4xl font-bold leading-tight">
                Your credentials.
                <span className="block text-indigo-400">
                  Your digital trust.
                </span>
              </h2>

              <p className="mt-6 max-w-md leading-7 text-slate-400">
                Manage your academic credentials securely and access
                blockchain-powered verification from one place.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                  ✓
                </span>
                Secure credential management
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  ✓
                </span>
                Blockchain-backed verification
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                  ✓
                </span>
                Easy access to your credentials
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="p-7 sm:p-10">
            <div className="mx-auto max-w-md">

              {/* Mobile logo */}
              <div className="mb-8 lg:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 font-bold">
                  B
                </div>
              </div>

              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-400">
                Welcome back
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                Student Login
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Sign in to manage and verify your academic credentials.
              </p>

              {/* Error */}
              {error && (
                <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                  {success}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="student@example.com"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        setError(
                          "Forgot password functionality will be added later."
                        );
                      }}
                      className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      disabled={loading}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-50"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 transition hover:text-white"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-400">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                    disabled={loading}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 accent-indigo-600"
                  />

                  Remember me
                </label>

                {/* Login */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>

              {/* Register */}
              <div className="mt-7 text-center text-sm text-slate-500">
                Don't have a student account?{" "}
                <Link
                  to="/student/register"
                  className="font-medium text-indigo-400 transition hover:text-indigo-300"
                >
                  Create account
                </Link>
              </div>

              {/* Security */}
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-600">
                <span>🔒</span>
                Secure authentication
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentLogin;

