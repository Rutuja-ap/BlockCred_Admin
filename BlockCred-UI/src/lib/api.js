
export const API =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export function friendlyError(error) {
  if (error instanceof Error) {
    return error.message;
  }
  return "Something went wrong. Please try again.";
}

export async function openCertificatePdf(id, token) {
  const response = await fetch(`${API}/certificates/${id}/view`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error("Unable to open certificate PDF");
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const newWindow = window.open(url, "_blank");

  if (!newWindow) {
    URL.revokeObjectURL(url);
    throw new Error("Allow pop-ups to view the certificate PDF.");
  }

  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

export function fmtDate(value) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
