import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function StudentSettings() {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ text: "", type: "" });

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

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg({ text: "", type: "" });

    if (newPassword.length < 6) {
      setStatusMsg({ text: "New password must be at least 6 characters.", type: "error" });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatusMsg({ text: "Passwords do not match.", type: "error" });
      return;
    }

    try {
      setPasswordLoading(true);
      const res = await fetch("http://localhost:5000/api/students/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update password.");
      }

      setStatusMsg({ text: "Password changed successfully!", type: "success" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setShowPasswordModal(false), 1200);
    } catch (err) {
      setStatusMsg({ text: err.message || "An error occurred.", type: "error" });
    } finally {
      setPasswordLoading(false);
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

            <Link
              to="/student/profile"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>◉</span>
              My Profile
            </Link>

            <button className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400">
              <span>⚙</span>
              Settings
            </button>
          </nav>

          <div className="mt-10 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-4">
            <p className="text-xs font-semibold text-indigo-300">
              Account Security
            </p>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Keep your account and credential settings protected.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-400">
                JWT Auth Active
              </span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">
          <div>
            <p className="text-sm text-slate-500">
              Student Portal / Settings
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Account Settings
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Manage your preferences and security credentials.
            </p>
          </div>

          {/* Account Security Section */}
          <section className="mt-8 max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="border-b border-slate-800 p-6">
              <h2 className="font-semibold">
                Security & Authentication
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Manage your login credentials and security controls.
              </p>
            </div>

            <div className="divide-y divide-slate-800">
              <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium">
                    Primary Email
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {user?.email || "student@example.com"}
                  </p>
                </div>

                <span className="rounded-lg bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400">
                  ✓ Verified
                </span>
              </div>

              <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium">
                    Password
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Keep your password strong and secure.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowPasswordModal(true);
                    setStatusMsg({ text: "", type: "" });
                  }}
                  className="w-fit rounded-xl border border-slate-700 px-4 py-2 text-xs text-slate-300 transition hover:border-indigo-500 hover:text-white"
                >
                  Change Password
                </button>
              </div>

              <div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-medium">
                    Two-Factor Authentication
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Add an extra cryptographic verification step during login.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                    Protected
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="mt-6 max-w-5xl rounded-2xl border border-slate-800 bg-slate-900/60">
            <div className="border-b border-slate-800 p-6">
              <h2 className="font-semibold">
                Notification Preferences
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Choose which events you want to be notified about.
              </p>
            </div>

            <div className="divide-y divide-slate-800">
              <label className="flex cursor-pointer items-center justify-between gap-5 p-6">
                <div>
                  <p className="text-sm font-medium">
                    Credential Verification Alerts
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Receive instant notifications when an employer or institution verifies your credentials.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 rounded border-slate-700 bg-slate-950 accent-indigo-600"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between gap-5 p-6">
                <div>
                  <p className="text-sm font-medium">
                    Security Notices
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Get alerted on new logins or credential modification attempts.
                  </p>
                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 rounded border-slate-700 bg-slate-950 accent-indigo-600"
                />
              </label>
            </div>
          </section>
        </main>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {statusMsg.text && (
              <div
                className={`mt-4 rounded-xl border px-4 py-2.5 text-xs ${
                  statusMsg.type === "success"
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : "border-red-500/20 bg-red-500/10 text-red-400"
                }`}
              >
                {statusMsg.text}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="mt-4 space-y-4">
              <div>
                <label className="text-xs text-slate-400">Current Password</label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentSettings;