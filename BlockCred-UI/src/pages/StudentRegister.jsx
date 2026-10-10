
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function StudentRegister() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  studentId: "",
  institution: "",
  course: "",
  year: "",
  password: "",
});

  const [agreeTerms, setAgreeTerms] = useState(false);
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

if (
  !formData.fullName.trim() ||
  !formData.email.trim() ||
  !formData.studentId.trim() ||
  !formData.institution.trim() ||
  !formData.course.trim() ||
  !formData.year.trim() ||
  !formData.password
) {
      setError("Please fill in all fields.");
      return;
    }

    if (!agreeTerms) {
      setError("Please accept the terms before creating your account.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/students/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
            phone: "",
            department: formData.institution.trim(),
            studentId: formData.studentId.trim(),
            institution: formData.institution.trim(),
            course: formData.course.trim(),
            year: formData.year,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Student registration failed."
        );
      }

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setFormData({
        fullName: "",
        email: "",
        studentId: "",
        institution: "",
        course: "",
        year: "",
        password: "",
      });

      setAgreeTerms(false);

      setTimeout(() => {
        navigate("/student/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

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
      {/* Header */}
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
            to="/student/login"
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to Login
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="relative flex min-h-[calc(100vh-64px)] items-center justify-center overflow-hidden px-6 py-12">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative w-full max-w-2xl rounded-3xl border border-slate-800 bg-slate-900/70 p-7 shadow-2xl sm:p-10">
          <div className="mx-auto max-w-xl">

            {/* Heading */}
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 font-bold">
                B
              </div>

              <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-indigo-400">
                Student Portal
              </p>

              <h1 className="mt-2 text-3xl font-bold">
                Create your account
              </h1>

              <p className="mt-3 text-sm text-slate-400">
                Create your BlockCred AI student account to manage
                your academic credentials.
              </p>
            </div>

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

            {/* Registration Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Full Name
                </label>

                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  disabled={loading}
                  autoComplete="name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              {/* Email + Student ID */}
              <div className="grid gap-5 sm:grid-cols-2">

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
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {/* Student ID */}
                <div>
                  <label
                    htmlFor="studentId"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Student ID
                  </label>

                  <input
                    id="studentId"
                    type="text"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="STU-2026-001"
                    disabled={loading}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Institution */}
              <div>
                <label
                  htmlFor="institution"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Institution
                </label>

                <input
                  id="institution"
                  type="text"
                  value={formData.institution}
                  onChange={handleChange}
                  placeholder="Enter your college or university"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              
{/* Course */}
<div>
  <label
    htmlFor="course"
    className="mb-2 block text-sm font-medium text-slate-300"
  >
    Course
  </label>

  <input
    id="course"
    type="text"
    value={formData.course}
    onChange={handleChange}
    placeholder="e.g. B.Tech Computer Engineering"
    disabled={loading}
    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
  />
</div>

{/* Year */}
<div>
  <label
    htmlFor="year"
    className="mb-2 block text-sm font-medium text-slate-300"
  >
    Current Year
  </label>

  <select
    id="year"
    value={formData.year}
    onChange={handleChange}
    disabled={loading}
    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 disabled:opacity-50"
  >
    <option value="">Select your year</option>
    <option value="1st Year">1st Year</option>
    <option value="2nd Year">2nd Year</option>
    <option value="3rd Year">3rd Year</option>
    <option value="4th Year">4th Year</option>
  </select>
</div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    disabled={loading}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-500 hover:text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-600">
                  Password must contain at least 6 characters.
                </p>
              </div>

              {/* Terms */}
              <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-400">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(event) =>
                    setAgreeTerms(event.target.checked)
                  }
                  disabled={loading}
                  className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-950 accent-indigo-600"
                />

                <span>
                  I agree to the BlockCred AI terms and understand
                  that my credentials will be securely managed.
                </span>
              </label>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Creating Account..."
                  : "Create Student Account"}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-7 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/student/login"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Sign in
              </Link>
            </div>

            {/* Security */}
            <div className="mt-8 flex justify-center gap-2 text-xs text-slate-600">
              🔒 Secure account registration
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentRegister;
