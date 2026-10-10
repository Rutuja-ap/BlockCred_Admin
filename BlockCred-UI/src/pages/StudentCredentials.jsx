
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function StudentCredentials() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [credentials, setCredentials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  // --------------------------------------------------
  // Load logged-in student
  // --------------------------------------------------
  useEffect(() => {
    const storedStudent = localStorage.getItem("student");

    if (!storedStudent) {
      navigate("/student/login");
      return;
    }

    try {
      const parsedStudent = JSON.parse(storedStudent);

      setStudent(parsedStudent);

      fetchCredentials(parsedStudent.email);
    } catch (err) {
      console.error("Student data error:", err);

      localStorage.removeItem("student");
      navigate("/student/login");
    }
  }, [navigate]);

  // --------------------------------------------------
  // Fetch credentials from backend
  // --------------------------------------------------
  const fetchCredentials = async (email) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/credentials/student/${encodeURIComponent(
          email
        )}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load credentials."
        );
      }

      setCredentials(data.credentials || []);
    } catch (err) {
      console.error("Credential fetch error:", err);

      setError(
        "Unable to load credentials. Please make sure the backend is running."
      );

      setCredentials([]);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Logout
  // --------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("student");
    localStorage.removeItem("studentToken");

    sessionStorage.removeItem("studentToken");

    navigate("/student/login");
  };

  // --------------------------------------------------
  // Search
  // --------------------------------------------------
  const filteredCredentials = credentials.filter(
    (credential) => {
      const searchText = search.toLowerCase();

      return (
        credential.title
          ?.toLowerCase()
          .includes(searchText) ||
        credential.type
          ?.toLowerCase()
          .includes(searchText) ||
        credential.credentialId
          ?.toLowerCase()
          .includes(searchText) ||
        credential.issuer
          ?.toLowerCase()
          .includes(searchText)
      );
    }
  );

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />

          <p className="mt-4 text-sm text-slate-500">
            Loading credentials...
          </p>
        </div>
      </div>
    );
  }

  if (!student) {
    return null;
  }

  const studentName = student.name || "Student";

  const initials = studentName
    .split(" ")
    .filter(Boolean)
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // --------------------------------------------------
  // Statistics
  // --------------------------------------------------
  const verifiedCount = credentials.filter(
    (credential) =>
      credential.status === "Verified" ||
      credential.status === "Authentic"
  ).length;

  const pendingCount = credentials.filter(
    (credential) =>
      credential.status === "Pending"
  ).length;

  const rejectedCount = credentials.filter(
    (credential) =>
      credential.status === "Rejected"
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ==================================================
          HEADER
      ================================================== */}
      <header className="border-b border-slate-800 bg-slate-950/95">
        <div className="flex h-16 items-center justify-between px-6">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
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

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                {studentName}
              </p>

              <p className="text-xs text-slate-500">
                {student.department || "Student"}
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

        {/* ==================================================
            SIDEBAR
        ================================================== */}
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
              className="flex w-full items-center gap-3 rounded-xl bg-indigo-600/10 px-4 py-3 text-sm font-medium text-indigo-400"
            >
              <span>▣</span>
              My Credentials
            </Link>

            <Link
              to="/student/verify-credential"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>✓</span>
              Verify Credential
            </Link>

            <Link
              to="/student/upload-credential"
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
            >
              <span>↑</span>
              Upload Credential
            </Link>

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

        {/* ==================================================
            MAIN
        ================================================== */}
        <main className="min-w-0 flex-1 px-6 py-8 lg:px-10">

          {/* Heading */}
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>
              <p className="text-sm text-slate-500">
                Student Portal / My Credentials
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                My Credentials
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                View, manage, and verify your academic credentials.
              </p>
            </div>

            <Link
              to="/student/upload-credential"
              className="inline-flex w-fit items-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              + Upload Credential
            </Link>
          </div>

          {/* ==================================================
              ERROR
          ================================================== */}
          {error && (
            <div className="mt-6 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
              {error}

              <button
                type="button"
                onClick={() =>
                  fetchCredentials(student.email)
                }
                className="ml-3 underline hover:text-red-300"
              >
                Retry
              </button>
            </div>
          )}

          {/* ==================================================
              STATISTICS
          ================================================== */}
          <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Total Credentials
              </p>

              <p className="mt-3 text-3xl font-bold">
                {credentials.length}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Uploaded credentials
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Verified
              </p>

              <p className="mt-3 text-3xl font-bold text-emerald-400">
                {verifiedCount}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Blockchain verified
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <p className="mt-3 text-3xl font-bold text-amber-400">
                {pendingCount}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Awaiting verification
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <p className="text-sm text-slate-500">
                Rejected
              </p>

              <p className="mt-3 text-3xl font-bold text-red-400">
                {rejectedCount}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Requires attention
              </p>
            </div>
          </section>

          {/* ==================================================
              SEARCH
          ================================================== */}
          <section className="mt-8">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search credentials by name, ID, type or issuer..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />

            </div>
          </section>

          {/* ==================================================
              CREDENTIALS
          ================================================== */}
          <section className="mt-6">

            {filteredCredentials.length > 0 ? (

              <div className="space-y-4">

                {filteredCredentials.map(
                  (credential, index) => {

                    const status =
                      credential.status || "Pending";

                    const verified =
                      status === "Verified" ||
                      status === "Authentic";

                    const rejected =
                      status === "Rejected";

                    return (
                      <div
                        key={
                          credential.id ||
                          credential.credentialId ||
                          index
                        }
                        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition hover:border-slate-700"
                      >

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                          {/* Left */}
                          <div className="flex items-start gap-4">

                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-xl text-indigo-400">
                              ▣
                            </div>

                            <div className="min-w-0">

                              <h2 className="font-semibold">
                                {credential.title ||
                                  "Academic Credential"}
                              </h2>

                              <p className="mt-1 text-sm text-slate-500">
                                {credential.type ||
                                  "Academic Credential"}
                              </p>

                              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-600">

                                <span>
                                  ID:{" "}
                                  <span className="font-mono text-indigo-400">
                                    {credential.credentialId ||
                                      credential.id}
                                  </span>
                                </span>

                                <span>
                                  Issuer:{" "}
                                  <span className="text-slate-400">
                                    {credential.issuer ||
                                      "Not provided"}
                                  </span>
                                </span>

                                {credential.createdAt && (
                                  <span>
                                    Date:{" "}
                                    <span className="text-slate-400">
                                      {new Date(
                                        credential.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Right */}
                          <div className="flex items-center gap-4 lg:shrink-0">

                            <span
                              className={`rounded-full px-3 py-1 text-xs ${
                                verified
                                  ? "bg-emerald-500/10 text-emerald-400"
                                  : rejected
                                  ? "bg-red-500/10 text-red-400"
                                  : "bg-amber-500/10 text-amber-400"
                              }`}
                            >
                              {verified
                                ? "✓ Verified"
                                : rejected
                                ? "Rejected"
                                : "Pending"}
                            </span>

                            <button
                              type="button"
                              onClick={() => {
                                const id =
                                  credential.credentialId ||
                                  credential.id;

                                if (id) {
                                  navigate(
                                    `/student/credential-result?id=${encodeURIComponent(
                                      id
                                    )}`
                                  );
                                }
                              }}
                              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-indigo-500/40 hover:text-white"
                            >
                              View
                            </button>

                          </div>
                        </div>

                        {/* Blockchain hash */}
                        {credential.blockchainHash && (
                          <div className="mt-5 rounded-xl border border-slate-800 bg-slate-950/60 p-4">

                            <p className="text-xs text-slate-600">
                              Blockchain Hash
                            </p>

                            <p className="mt-2 break-all font-mono text-xs text-slate-400">
                              {credential.blockchainHash}
                            </p>
                          </div>
                        )}

                      </div>
                    );
                  }
                )}

              </div>

            ) : (

              /* ==================================================
                 EMPTY STATE
              ================================================== */
              <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 px-6 py-16 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl text-indigo-400">
                  ▣
                </div>

                <h2 className="mt-5 text-lg font-semibold">
                  {search
                    ? "No credentials found"
                    : "No credentials yet"}
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  {search
                    ? "Try another search term."
                    : "Upload your first academic credential to see it here."}
                </p>

                {!search && (
                  <Link
                    to="/student/upload-credential"
                    className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                  >
                    Upload Credential
                  </Link>
                )}

              </div>
            )}

          </section>

          {/* ==================================================
              SECURITY
          ================================================== */}
          <div className="mt-8 rounded-2xl border border-indigo-500/10 bg-indigo-500/5 p-5">

            <div className="flex gap-3">

              <span className="text-lg">
                🔐
              </span>

              <div>
                <p className="text-sm font-medium text-indigo-300">
                  Secure Credential Management
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Credentials displayed here are loaded from your
                  authenticated student account.
                </p>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  );
}

export default StudentCredentials;
