import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout, { Modal, Toast } from "../components/AdminLayout";
import { useAuth } from "../context/AuthContext";
import { API, fmtDate, friendlyError, openCertificatePdf } from "../lib/api";

const EMPTY = { studentId: "", name: "", email: "", course: "", department: "", year: "" };

const inputCls =
  "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500";

function AdminStudents() {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const [formMode, setFormMode] = useState(null); // "add" | "edit" | null
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const [details, setDetails] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [sRes, cRes] = await Promise.all([
        fetch(`${API}/students`, { headers: authHeaders }),
        fetch(`${API}/certificates`, { headers: authHeaders }),
      ]);
      const sData = await sRes.json();
      const cData = await cRes.json().catch(() => ({}));
      if (!sRes.ok) throw new Error(sData.message || "Failed to load students.");
      setStudents(sData.students || []);
      setCerts(cRes.ok ? cData.certificates || [] : []);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }, [authHeaders]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  const certsByStudent = useMemo(() => {
    const map = {};
    certs.forEach((c) => {
      const id = c.studentId?._id || c.studentId;
      if (!id) return;
      (map[id] = map[id] || []).push(c);
    });
    return map;
  }, [certs]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) =>
      [s.name, s.email, s.studentId, s.course, s.department]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [students, search]);

  const openAdd = () => {
    setForm(EMPTY);
    setEditingId(null);
    setFormError("");
    setFormMode("add");
  };

  const openEdit = (s) => {
    setForm({
      studentId: s.studentId || "",
      name: s.name || "",
      email: s.email || "",
      course: s.course || "",
      department: s.department || "",
      year: s.year || "",
    });
    setEditingId(s._id);
    setFormError("");
    setDetails(null);
    setFormMode("edit");
  };

  const closeForm = () => {
    if (saving) return;
    setFormMode(null);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setFormError("");

    const payload = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, String(v).trim()])
    );

    if (Object.values(payload).some((v) => !v)) {
      return setFormError("All fields are required.");
    }
    if (!/^\S+@\S+\.\S+$/.test(payload.email)) {
      return setFormError("Enter a valid email address.");
    }

    try {
      setSaving(true);
      const isAdd = formMode === "add";
      const res = await fetch(isAdd ? `${API}/students` : `${API}/students/${editingId}`, {
        method: isAdd ? "POST" : "PUT",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to save student.");

      setFormMode(null);
      setToast({
        type: "success",
        text: isAdd ? `Student ${payload.name} added.` : `Student ${payload.name} updated.`,
      });
      await load();
    } catch (err) {
      setFormError(friendlyError(err));
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      const res = await fetch(`${API}/students/${toDelete._id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete student.");
      setToast({ type: "success", text: `Student ${toDelete.name} deleted.` });
      setToDelete(null);
      await load();
    } catch (err) {
      setToast({ type: "error", text: friendlyError(err) });
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  const goUpload = (s) => {
    navigate("/admin/credentials", { state: { uploadForStudent: s._id } });
  };

  const viewPdf = async (c) => {
    try {
      await openCertificatePdf(c._id, token);
    } catch (err) {
      setToast({ type: "error", text: friendlyError(err) });
    }
  };

  const field = (key, label, placeholder, type = "text") => (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">{label}</label>
      <input
        type={type}
        value={form[key]}
        placeholder={placeholder}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        className={inputCls}
      />
    </div>
  );

  const registeredCount = students.filter((s) => s.registered).length;

  return (
    <AdminLayout
      active="students"
      breadcrumb="Administration / Students"
      title="Student Management"
      subtitle="Add students, review their details, edit records and issue certificates."
      actions={
        <button
          onClick={openAdd}
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium transition hover:bg-indigo-500"
        >
          + Add Student
        </button>
      }
    >
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Total students", students.length],
          ["App account created", registeredCount],
          ["Certificates issued", certs.length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="flex flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-semibold">All Students</h3>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, ID, course..."
            className={`${inputCls} sm:max-w-xs`}
          />
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-slate-400">Loading students...</div>
        ) : error ? (
          <div className="p-10 text-center">
            <p className="text-sm text-red-300">{error}</p>
            <button
              onClick={load}
              className="mt-4 rounded-lg border border-slate-700 px-4 py-2 text-xs text-slate-300 hover:text-white"
            >
              Retry
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-sm text-slate-400">
            {students.length === 0
              ? "No students yet. Click “Add Student” to register the first one."
              : "No students match your search."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Student ID</th>
                  <th className="px-5 py-3">Course / Dept</th>
                  <th className="px-5 py-3">Certificates</th>
                  <th className="px-5 py-3">App account</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-900">
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setDetails(s)}
                        className="text-left font-medium text-white hover:text-indigo-300"
                      >
                        {s.name}
                      </button>
                      <p className="text-xs text-slate-500">{s.email}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-300">{s.studentId}</td>
                    <td className="px-5 py-4 text-slate-300">
                      {s.course}
                      <p className="text-xs text-slate-500">
                        {s.department} • {s.year}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {(certsByStudent[s._id] || []).length}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          s.registered
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-amber-500/10 text-amber-300"
                        }`}
                      >
                        {s.registered ? "Registered" : "Not registered"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => goUpload(s)}
                          className="rounded-lg bg-indigo-600/20 px-3 py-2 text-xs text-indigo-300 hover:bg-indigo-600/30"
                        >
                          Upload certificate
                        </button>
                        <button
                          onClick={() => openEdit(s)}
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setToDelete(s)}
                          className="rounded-lg border border-red-500/30 px-3 py-2 text-xs text-red-300 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit */}
      {formMode && (
        <Modal
          title={formMode === "add" ? "Add Student" : "Edit Student"}
          onClose={closeForm}
        >
          <form onSubmit={submitForm} className="space-y-4">
            {formError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {formError}
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {field("studentId", "Student ID", "e.g. ST014")}
              {field("name", "Full name", "Student name")}
            </div>
            {field("email", "Email", "student@college.edu", "email")}
            <div className="grid gap-4 sm:grid-cols-2">
              {field("course", "Course", "e.g. B.Tech")}
              {field("department", "Department", "e.g. Computer Engineering")}
            </div>
            {field("year", "Year", "e.g. 2026")}

            {formMode === "add" && (
              <p className="text-xs text-slate-500">
                The student can then create their app login using this Student ID and email.
              </p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeForm}
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium hover:bg-indigo-500 disabled:opacity-60"
              >
                {saving ? "Saving..." : formMode === "add" ? "Add Student" : "Save Changes"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Details */}
      {details && (
        <Modal title="Student Details" onClose={() => setDetails(null)} wide>
          <div className="grid gap-4 text-sm sm:grid-cols-2">
            {[
              ["Name", details.name],
              ["Student ID", details.studentId],
              ["Email", details.email],
              ["Course", details.course],
              ["Department", details.department],
              ["Year", details.year],
              ["Phone", details.phone || "-"],
              ["Institution", details.institution || "-"],
              ["App account", details.registered ? "Registered" : "Not registered"],
              ["Added on", fmtDate(details.createdAt)],
            ].map(([k, v]) => (
              <div key={k} className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3">
                <p className="text-xs text-slate-500">{k}</p>
                <p className="mt-1 break-words text-slate-200">{v}</p>
              </div>
            ))}
          </div>

          <h4 className="mt-6 text-sm font-semibold">
            Certificates ({(certsByStudent[details._id] || []).length})
          </h4>
          <div className="mt-3 space-y-2">
            {(certsByStudent[details._id] || []).length === 0 && (
              <p className="text-sm text-slate-500">No certificates issued yet.</p>
            )}
            {(certsByStudent[details._id] || []).map((c) => (
              <div
                key={c._id}
                className="flex items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{c.certificateName}</p>
                  <p className="text-xs text-slate-500">
                    {c.certificateId} • {fmtDate(c.issuedAt)} • {c.status}
                  </p>
                </div>
                <button
                  onClick={() => viewPdf(c)}
                  className="shrink-0 rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:text-white"
                >
                  View PDF
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => openEdit(details)}
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:text-white"
            >
              Edit
            </button>
            <button
              onClick={() => goUpload(details)}
              className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium hover:bg-indigo-500"
            >
              Upload certificate
            </button>
          </div>
        </Modal>
      )}

      {/* Delete */}
      {toDelete && (
        <Modal title="Delete student?" onClose={() => !deleting && setToDelete(null)}>
          <p className="text-sm text-slate-300">
            This will permanently delete <b>{toDelete.name}</b> ({toDelete.studentId}). A student
            who already has certificates cannot be deleted.
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={() => setToDelete(null)}
              disabled={deleting}
              className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              disabled={deleting}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium hover:bg-red-500 disabled:opacity-60"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
}

export default AdminStudents;