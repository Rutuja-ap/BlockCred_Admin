import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function StudentProfile() {
  const navigate = useNavigate();
  const { user, token, updateUser, logout } = useAuth();

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

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    institution: user?.institution || "",
    department: user?.department || "",
    studentId: user?.studentId || "",
    graduationYear: "2027",
    cgpa: "8.50",
  });

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        institution: user.institution || prev.institution,
        department: user.department || prev.department,
        studentId: user.studentId || prev.studentId,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setMessage({ text: "", type: "" });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("http://localhost:5000/api/students/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          department: formData.department,
          institution: formData.institution,
          studentId: formData.studentId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      updateUser(data.student);
      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (err) {
      setMessage({ text: err.message || "Error saving profile.", type: "error" });
    } finally {
      setSaving(false);
    }
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

            <Link
              to="/student/verify"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>✓</span>
              Verify Credential
            </Link>

            <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400">
              <span>◉</span>
              My Profile
            </button>

            <Link
              to="/student/settings"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>⚙</span>
              Settings
            </Link>
          </nav>

          <div className="mt-10 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-4">
            <p className="text-xs font-semibold text-indigo-300">
              Profile Completion
            </p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-full rounded-full bg-indigo-500" />
            </div>

            <p className="mt-2 text-xs text-slate-500">
              Your profile is verified and active.
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          {/* Heading */}
          <div>
            <p className="text-sm text-slate-500">
              Student Portal / My Profile
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage your personal and academic information.
            </p>
          </div>

          {/* Feedback banner */}
          {message.text && (
            <div
              className={`mt-6 rounded-xl border px-4 py-3 text-sm ${
                message.type === "success"
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  : "border-red-500/20 bg-red-500/10 text-red-400"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Profile Hero */}
          <section className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60">
            <div className="h-28 bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-slate-900" />

            <div className="px-6 pb-6 lg:px-8">
              <div className="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-4">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-slate-900 bg-indigo-600 text-2xl font-bold shadow-xl">
                    {getInitials(formData.name)}
                  </div>

                  <div className="pb-1">
                    <h2 className="text-xl font-bold">
                      {formData.name || "Student"}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {formData.department || formData.institution || "Enrolled Student"}
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-emerald-500/10 px-4 py-2 text-xs font-medium text-emerald-400">
                  ✓ Verified Student
                </span>
              </div>
            </div>
          </section>

          <form onSubmit={handleSave}>
            {/* Personal Information */}
            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="border-b border-slate-800 p-6">
                <h2 className="font-semibold">
                  Personal Information
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your basic personal details.
                </p>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-2 lg:p-8">
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-500 outline-none cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Student ID
                  </label>

                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    placeholder="STU-2026-001"
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* Academic Information */}
            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="border-b border-slate-800 p-6">
                <h2 className="font-semibold">
                  Academic Information
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your educational details used for credential verification.
                </p>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-2 lg:p-8">
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    College / Institution
                  </label>

                  <input
                    type="text"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    placeholder="University or College Name"
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Branch / Department
                  </label>

                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Department or Major"
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </section>

            {/* Verification Identity */}
            <section className="mt-6 rounded-2xl border border-slate-800 bg-slate-900/60">
              <div className="border-b border-slate-800 p-6">
                <h2 className="font-semibold">
                  Verification Identity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Information used to associate credentials with your verified identity.
                </p>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-2 lg:p-8">
                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Internal Identifier
                  </label>

                  <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="font-mono text-xs text-slate-300">
                      {user?.id || "STU-SYSTEM"}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-400">
                    Verification Status
                  </label>

                  <div className="mt-2 flex items-center gap-2 rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-3">
                    <span className="text-emerald-400">✓</span>
                    <span className="text-xs text-emerald-400">
                      Active Student Identity
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Save Button */}
            <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row">
              <Link
                to="/student/dashboard"
                className="rounded-xl border border-slate-700 px-5 py-3 text-center text-sm text-slate-400 transition hover:border-slate-600 hover:text-white"
              >
                Back to Dashboard
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold transition hover:bg-indigo-500 disabled:opacity-50"
              >
                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </div>
          </form>

          {/* Privacy note */}
          <div className="mt-6 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-5">
            <div className="flex gap-3">
              <span className="text-lg">🔐</span>

              <div>
                <p className="text-sm font-medium text-indigo-300">
                  Your information is protected
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your personal and academic information is securely
                  associated with your BlockCred AI identity. Only
                  authorized credential verification processes can access
                  protected records.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentProfile;