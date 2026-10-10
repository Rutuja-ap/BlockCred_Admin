
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function StudentDashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedStudent = localStorage.getItem("student");

    if (!storedStudent) {
      navigate("/student/login");
      return;
    }

    try {
      const parsedStudent = JSON.parse(storedStudent);
      setStudent(parsedStudent);
    } catch (error) {
      console.error("Unable to load student data:", error);
      localStorage.removeItem("student");
      navigate("/student/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("studentToken");
    sessionStorage.removeItem("studentToken");

    navigate("/student/login");
  };

  if (!student) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />
          <p className="mt-4 text-sm text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  const studentName = student.name || "Student";
  const department =
    student.department || "Computer Engineering";

  const initials = studentName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="flex h-16 items-center justify-between px-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold">
              B
            </div>

            <div>
              <h1 className="font-bold">
                BlockCred{" "}
                <span className="text-indigo-400">
                  AI
                </span>
              </h1>

              <p className="text-[9px] tracking-wider text-slate-500">
                STUDENT PORTAL
              </p>
            </div>
          </Link>

          {/* Student information */}
          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                {studentName}
              </p>

              <p className="text-xs text-slate-500">
                {department}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 text-sm font-semibold text-indigo-300">
              {initials || "ST"}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-red-500/40 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">

        {/* =====================================================
            SIDEBAR
        ====================================================== */}
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 border-r border-slate-800 bg-slate-950 p-5 md:block">

          <nav className="space-y-2">

            {/* Dashboard */}
            <Link
              to="/student/dashboard"
              className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400"
            >
              <span>▦</span>
              Dashboard
            </Link>

            {/* Credentials */}
            <Link
              to="/student/credentials"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>▣</span>
              My Credentials
            </Link>

            {/* Verify */}
            <Link
              to="/student/verify-credential"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>✓</span>
              Verify Credential
            </Link>

            {/* Upload */}
            <Link
              to="/student/upload-credential"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>↑</span>
              Upload Credential
            </Link>

            {/* Profile */}
            <Link
              to="/student/profile"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>◉</span>
              My Profile
            </Link>

            {/* Settings */}
            <Link
              to="/student/settings"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>⚙</span>
              Settings
            </Link>
          </nav>

          {/* System status */}
          <div className="mt-10 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <p className="text-xs font-semibold text-emerald-400">
                System Online
              </p>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-500">
              Credential verification services are operational.
            </p>
          </div>
        </aside>

        {/* =====================================================
            MAIN CONTENT
        ====================================================== */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">

          {/* Welcome */}
          <section>
            <p className="text-sm text-slate-500">
              Student Portal / Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold">
              Welcome, {studentName.split(" ")[0]} 👋
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Manage your academic credentials, verify documents,
              and access your blockchain-backed credential records.
            </p>
          </section>

          {/* =====================================================
              STUDENT PROFILE CARD
          ====================================================== */}
          <section className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-lg font-bold text-indigo-400">
                  {initials || "ST"}
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    {studentName}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {student.email}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-emerald-500/10 bg-emerald-500/5 px-4 py-3">
                <p className="text-xs text-slate-600">
                  Account Status
                </p>

                <p className="mt-1 flex items-center gap-2 text-sm font-medium text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Active
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 border-t border-slate-800 pt-6 sm:grid-cols-3">

              <div>
                <p className="text-xs text-slate-600">
                  Student ID
                </p>

                <p className="mt-1 font-mono text-sm text-indigo-400">
                  {student.studentId || student.id || "Not assigned"}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-600">
                  Department
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {department}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-600">
                  Institution
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {student.institution || "Not provided"}
                </p>
              </div>
            </div>
          </section>

          {/* =====================================================
              STATISTICS
          ====================================================== */}
          <section className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            {/* Credentials */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Credentials
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  ▣
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold">
                0
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Uploaded credentials
              </p>
            </div>

            {/* Verified */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Verified
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  ✓
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold">
                0
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Blockchain verified
              </p>
            </div>

            {/* Pending */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Pending
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  ◷
                </span>
              </div>

              <p className="mt-5 text-3xl font-bold">
                0
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Awaiting verification
              </p>
            </div>

            {/* Account */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                  Account
                </span>

                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  ✓
                </span>
              </div>

              <p className="mt-5 text-xl font-bold text-emerald-400">
                Active
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Student account status
              </p>
            </div>
          </section>

          {/* =====================================================
              QUICK ACTIONS
          ====================================================== */}
          <section className="mt-8">

            <div>
              <h2 className="text-lg font-semibold">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your credentials from here.
              </p>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-3">

              {/* Upload */}
              <Link
                to="/student/upload-credential"
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-indigo-500/40 hover:bg-indigo-500/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-400 transition group-hover:bg-indigo-500/20">
                  ↑
                </div>

                <h3 className="mt-5 font-semibold">
                  Upload Credential
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Upload your academic certificate for AI analysis
                  and verification.
                </p>

                <p className="mt-4 text-xs font-medium text-indigo-400">
                  Upload now →
                </p>
              </Link>

              {/* Credentials */}
              <Link
                to="/student/credentials"
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-indigo-500/40 hover:bg-indigo-500/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-400 transition group-hover:bg-indigo-500/20">
                  ▣
                </div>

                <h3 className="mt-5 font-semibold">
                  My Credentials
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  View and manage all your uploaded academic
                  credentials.
                </p>

                <p className="mt-4 text-xs font-medium text-indigo-400">
                  View credentials →
                </p>
              </Link>

              {/* Verify */}
              <Link
                to="/student/verify-credential"
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-emerald-500/30 hover:bg-emerald-500/5"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-xl text-emerald-400 transition group-hover:bg-emerald-500/20">
                  ✓
                </div>

                <h3 className="mt-5 font-semibold">
                  Verify Credential
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Verify a credential using its unique credential
                  ID.
                </p>

                <p className="mt-4 text-xs font-medium text-emerald-400">
                  Verify now →
                </p>
              </Link>
            </div>
          </section>

          {/* =====================================================
              RECENT ACTIVITY
          ====================================================== */}
          <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">

            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">
                  Recent Activity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Your latest credential activity
                </p>
              </div>

              <Link
                to="/student/credentials"
                className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
              >
                View all
              </Link>
            </div>

            {/* Empty state */}
            <div className="mt-6 rounded-xl border border-dashed border-slate-800 bg-slate-950/50 px-6 py-10 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-lg text-slate-600">
                ▣
              </div>

              <h3 className="mt-4 text-sm font-medium text-slate-400">
                No credential activity yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-600">
                Once you upload a credential, your analysis,
                verification, and blockchain activity will appear
                here.
              </p>

              <Link
                to="/student/upload-credential"
                className="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-indigo-500"
              >
                Upload Your First Credential
              </Link>
            </div>
          </section>

          {/* =====================================================
              SECURITY NOTICE
          ====================================================== */}
          <section className="mt-6 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-5">

            <div className="flex gap-3">
              <span className="text-lg">
                🔐
              </span>

              <div>
                <p className="text-sm font-medium text-indigo-300">
                  Your credentials are protected
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  BlockCred AI uses secure authentication and
                  blockchain-backed verification to help maintain
                  the integrity of your academic credentials.
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

export default StudentDashboard;