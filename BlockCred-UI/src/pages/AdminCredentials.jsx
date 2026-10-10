import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminLayout, { Modal, Toast } from "../components/AdminLayout";
import { useAuth } from "../context/AuthContext";
import { API, fmtDate, friendlyError, openCertificatePdf } from "../lib/api";

const inputCls =
  "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-indigo-500";

const MAX_MB = 5;

const newCertificateId = () => `CERT-${Date.now().toString().slice(-8)}`;

function AdminCredentials() {
  const { token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [certs, setCerts] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);

  const [showUpload, setShowUpload] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [form, setForm] = useState({
    studentId: "",
    certificateId: "",
    certificateName: "",
    file: null,
  });

  const authHeaders = useMemo(() => ({ Authorization: `Bearer ${token}` }), [token]);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const [cRes, sRes] = await Promise.all([
        fetch(`${API}/certificates`, { headers: authHeaders }),
        fetch(`${API}/students`, { headers: authHeaders }),
      ]);
      const cData = await cRes.json();
      const sData = await sRes.json();
      if (!cRes.ok) throw new Error(cData.message || "Failed to load certificates.");
      if (!sRes.ok) throw new Error(sData.message || "Failed to load students.");
      setCerts(cData.certificates || []);
      setStudents(sData.students || []);
    } catch (err) {
      setError(friendlyError(err));
    } finally {
      setLoading(false);
    }
  }, [authHeaders]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  const openUpload = useCallback((studentMongoId = "") => {
    setForm({
      studentId: studentMongoId,
      certificateId: newCertificateId(),
      certificateName: "",
      file: null,
    });
    setUploadError("");
    setShowUpload(true);
  }, []);

  // Coming from Students page ("Upload certificate" button)
  useEffect(() => {
    const target = location.state?.uploadForStudent;
    if (target) {
      openUpload(target);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate, openUpload]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return certs;
    return certs.filter((c) =>
      [
        c.certificateId,
        c.certificateName,
        c.studentId?.name,
        c.studentId?.studentId,
        c.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [certs, search]);

  const onFile = (e) => {
    const file = e.target.files?.[0] || null;
    setUploadError("");
    if (file) {
      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      if (!isPdf) {
        setUploadError("Only PDF files are allowed.");
        e.target.value = "";
        return setForm((f) => ({ ...f, file: null }));
      }
      if (file.size > MAX_MB * 1024 * 1024) {
        setUploadError(`File is too large. Maximum size is ${MAX_MB} MB.`);
        e.target.value = "";
        return setForm((f) => ({ ...f, file: null }));
      }
    }
    setForm((f) => ({ ...f, file }));
  };

  const submitUpload = async (e) => {
    e.preventDefault();
    setUploadError("");

    if (!form.studentId) return setUploadError("Select a student.");
    if (!form.certificateId.trim()) return setUploadError("Certificate ID is required.");
    if (!form.certificateName.trim()) return setUploadError("Certificate name is required.");
    if (!form.file) return setUploadError("Choose the certificate PDF.");

    const body = new FormData();
    body.append("studentId", form.studentId);
    body.append("certificateId", form.certificateId.trim());
    body.append("certificateName", form.certificateName.trim());
    body.append("certificate", form.file);

    try {
      setUploading(true);
      const res = await fetch(`${API}/certificates`, {
        method: "POST",
        headers: authHeaders, // do NOT set Content-Type: the browser adds the multipart boundary
        body,
      });
      const data = await res.json();
      if (!res.ok) {
        const extra = data.error ? ` (${String(data.error).split("\n")[0]})` : "";
        throw new Error((data.message || "Certificate upload failed.") + extra);
      }

      setShowUpload(false);
      setToast({
        type: "success",
        text: `Certificate ${data.certificate?.certificateId || ""} issued and registered on the blockchain.`,
      });
      await load();
    } catch (err) {
      setUploadError(friendlyError(err));
    } finally {
      setUploading(false);
    }
  };

  const viewPdf = async (c) => {
    try {
      await openCertificatePdf(c._id, token);
    } catch (err) {
      setToast({ type: "error", text: friendlyError(err) });
    }
  };

  const copyId = async (id) => {
    try {
      await navigator.clipboard.writeText(id);
      setToast({ type: "success", text: `Copied ${id}` });
    } catch {
      setToast({ type: "error", text: "Could not copy to clipboard." });
    }
  };

  const selectedStudent = students.find((s) => s._id === form.studentId);

  return (
    <AdminLayout
      active="credentials"
      breadcrumb="Administration / Certificates"
      title="Certificates"
      subtitle="Upload a certificate for a registered student. It is hashed, signed and registered on the blockchain."
      actions={
        <button
          onClick={() => openUpload("")}
          className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium transition hover:bg-indigo-500"
        >
          + Upload Certificate
        </button>
      }
    >
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          ["Total certificates", certs.length],
          ["Valid", certs.filter((c) => c.status === "valid").length],
          ["Revoked", certs.filter((c) => c.status === "revoked").length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60">
        <div className="flex flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="font-semibold">Issued Certificates</h3>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by certificate ID, name, student..."
            className={`${inputCls} sm:max-w-xs`}
          />
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-slate-400">Loading certificates...</div>
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
            {certs.length === 0
              ? "No certificates yet. Click “Upload Certificate” to issue the first one."
              : "No certificates match your search."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Certificate</th>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Issued</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Blockchain TX</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-900">
                    <td className="px-5 py-4">
                      <p className="font-medium">{c.certificateName}</p>
                      <p className="text-xs text-slate-500">{c.certificateId}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-300">
                      {c.studentId?.name || "-"}
                      <p className="text-xs text-slate-500">{c.studentId?.studentId || ""}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-300">{fmtDate(c.issuedAt)}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          c.status === "valid"
                            ? "bg-emerald-500/10 text-emerald-300"
                            : "bg-red-500/10 text-red-300"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-400">
                      {c.blockchainTxHash
                        ? `${c.blockchainTxHash.slice(0, 10)}…${c.blockchainTxHash.slice(-6)}`
                        : "-"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => viewPdf(c)}
                          className="rounded-lg bg-indigo-600/20 px-3 py-2 text-xs text-indigo-300 hover:bg-indigo-600/30"
                        >
                          View PDF
                        </button>
                        <button
                          onClick={() => copyId(c.certificateId)}
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 hover:text-white"
                        >
                          Copy ID
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

      {showUpload && (
        <Modal title="Upload Certificate" onClose={() => !uploading && setShowUpload(false)}>
          <form onSubmit={submitUpload} className="space-y-4">
            {uploadError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {uploadError}
              </div>
            )}

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">Student</label>
              <select
                value={form.studentId}
                onChange={(e) => setForm({ ...form, studentId: e.target.value })}
                className={inputCls}
              >
                <option value="">Select a student...</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} — {s.studentId}
                  </option>
                ))}
              </select>
              {students.length === 0 && (
                <p className="mt-2 text-xs text-amber-300">
                  No students found. Add a student first from the Students page.
                </p>
              )}
              {selectedStudent && (
                <p className="mt-2 text-xs text-slate-500">
                  {selectedStudent.course} • {selectedStudent.department} • {selectedStudent.year} •{" "}
                  {selectedStudent.email}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">Certificate ID</label>
              <div className="flex gap-2">
                <input
                  value={form.certificateId}
                  onChange={(e) => setForm({ ...form, certificateId: e.target.value })}
                  placeholder="e.g. CERT-12345678"
                  className={inputCls}
                />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, certificateId: newCertificateId() })}
                  className="shrink-0 rounded-xl border border-slate-700 px-4 text-xs text-slate-300 hover:text-white"
                >
                  Generate
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">Certificate name</label>
              <input
                value={form.certificateName}
                onChange={(e) => setForm({ ...form, certificateName: e.target.value })}
                placeholder="e.g. Bachelor of Technology — Degree Certificate"
                className={inputCls}
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-medium text-slate-400">
                Certificate PDF (max {MAX_MB} MB)
              </label>
              <input
                ref={fileRef}
                type="file"
                accept="application/pdf,.pdf"
                onChange={onFile}
                className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-indigo-500"
              />
              {form.file && (
                <p className="mt-2 text-xs text-slate-500">
                  {form.file.name} • {(form.file.size / 1024).toFixed(0)} KB
                </p>
              )}
            </div>

            {uploading && (
              <p className="text-xs text-slate-400">
                Hashing, signing and registering on the blockchain. This can take a few seconds...
              </p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowUpload(false)}
                disabled={uploading}
                className="rounded-xl border border-slate-700 px-5 py-3 text-sm text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium hover:bg-indigo-500 disabled:opacity-60"
              >
                {uploading ? "Uploading..." : "Upload & Register"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
}

export default AdminCredentials;