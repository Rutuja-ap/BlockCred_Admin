import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { useAuth } from "../context/AuthContext";
import { API, fmtDate, friendlyError } from "../lib/api";

function AdminDashboard() {
  const { token, user } = useAuth();
  const [students, setStudents] = useState([]);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    const headers = { Authorization: `Bearer ${token}` };

    (async () => {
      try {
        setLoading(true);
        setError("");
        const [sRes, cRes] = await Promise.all([
          fetch(`${API}/students`, { headers }),
          fetch(`${API}/certificates`, { headers }),
        ]);
        const sData = await sRes.json();
        const cData = await cRes.json();
        if (!sRes.ok) throw new Error(sData.message || "Failed to load students.");
        if (!cRes.ok) throw new Error(cData.message || "Failed to load certificates.");
        setStudents(sData.students || []);
        setCerts(cData.certificates || []);
      } catch (err) {
        setError(friendlyError(err));
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const stats = useMemo(
    () => [
      { label: "Total students", value: students.length, to: "/admin/students" },
      {
        label: "App accounts created",
        value: students.filter((s) => s.registered).length,
        to: "/admin/students",
      },
      { label: "Certificates issued", value: certs.length, to: "/admin/credentials" },
      {
        label: "Revoked",
        value: certs.filter((c) => c.status === "revoked").length,
        to: "/admin/credentials",
      },
    ],
    [students, certs]
  );

  const recent = certs.slice(0, 5);
  const withoutCert = students.filter(
    (s) => !certs.some((c) => (c.studentId?._id || c.studentId) === s._id)
  );

  return (
    <AdminLayout
      active="dashboard"
      breadcrumb="Administration / Dashboard"
      title={`Welcome${user?.name ? `, ${user.name}` : ""}`}
      subtitle="Manage students and issue blockchain-verified certificates."
      actions={
        <>
          <Link
            to="/admin/students"
            className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 transition hover:text-white"
          >
            Manage Students
          </Link>
          <Link
            to="/admin/credentials"
            className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium transition hover:bg-indigo-500"
          >
            + Upload Certificate
          </Link>
        </>
      }
    >
      {error && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition hover:border-indigo-500/30"
          >
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="mt-2 text-3xl font-bold">{loading ? "…" : s.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-800 p-5">
            <h3 className="font-semibold">Recent certificates</h3>
            <Link to="/admin/credentials" className="text-xs text-indigo-400 hover:text-indigo-300">
              View all
            </Link>
          </div>
          {loading ? (
            <p className="p-8 text-center text-sm text-slate-400">Loading...</p>
          ) : recent.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-400">No certificates issued yet.</p>
          ) : (
            <div className="divide-y divide-slate-800">
              {recent.map((c) => (
                <div key={c._id} className="flex items-center justify-between gap-4 px-5 py-4">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{c.certificateName}</p>
                    <p className="text-xs text-slate-500">
                      {c.certificateId} • {c.studentId?.name || "-"} • {fmtDate(c.issuedAt)}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs ${
                      c.status === "valid"
                        ? "bg-emerald-500/10 text-emerald-300"
                        : "bg-red-500/10 text-red-300"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60">
          <div className="border-b border-slate-800 p-5">
            <h3 className="font-semibold">Students without a certificate</h3>
          </div>
          {loading ? (
            <p className="p-8 text-center text-sm text-slate-400">Loading...</p>
          ) : withoutCert.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-400">
              Every student has at least one certificate.
            </p>
          ) : (
            <div className="divide-y divide-slate-800">
              {withoutCert.slice(0, 6).map((s) => (
                <div key={s._id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.studentId}</p>
                  </div>
                  <Link
                    to="/admin/credentials"
                    state={{ uploadForStudent: s._id }}
                    className="shrink-0 rounded-lg bg-indigo-600/20 px-3 py-2 text-xs text-indigo-300 hover:bg-indigo-600/30"
                  >
                    Upload
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;