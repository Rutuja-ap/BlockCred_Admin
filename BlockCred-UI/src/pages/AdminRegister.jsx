
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function AdminRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const response = await fetch(
          `${API}/admin/registration-status`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to check registration status."
          );
        }

        setRegistrationOpen(data.registrationOpen === true);
      } catch (err) {
        setError(
          err.message || "Unable to connect to the server."
        );
      } finally {
        setChecking(false);
      }
    };

    checkRegistration();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name.trim() || !formData.email.trim()) {
      setError("Please enter your name and email.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API}/admin/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Admin registration failed."
        );
      }

      setSuccess("Admin registered successfully. Redirecting to login...");

      setTimeout(() => {
        navigate("/admin/login");
      }, 1000);
    } catch (err) {
      setError(
        err.message || "Unable to register admin."
      );
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Checking admin registration...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-5 py-10 text-white">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <Link
          to="/"
          className="text-sm text-slate-400 hover:text-white"
        >
          ← Back to Home
        </Link>

        <div className="mt-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-xl font-bold">
            B
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            Admin Registration
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Create the initial BlockCred administrator account.
          </p>
        </div>

        {error && (
          <div className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-5 rounded-lg border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-400">
            {success}
          </div>
        )}

        {!registrationOpen ? (
          <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
            <p className="font-semibold text-amber-300">
              Registration is closed
            </p>

            <p className="mt-2 text-sm text-slate-300">
              An administrator account already exists, or registration
              status could not be confirmed. Please sign in instead.
            </p>

            <Link
              to="/admin/login"
              className="mt-5 block rounded-lg bg-indigo-600 px-4 py-3 text-center font-semibold hover:bg-indigo-500"
            >
              Go to Admin Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-7 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={loading}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
                disabled={loading}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                minLength={6}
                required
                disabled={loading}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
                disabled={loading}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-semibold hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Registering..." : "Create Admin Account"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-400">
          Already registered?{" "}
          <Link
            to="/admin/login"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Admin Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminRegister;
