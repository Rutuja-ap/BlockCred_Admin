const DEFAULT_API_BASE_URL = "http://localhost:5000";

export class VerificationServiceError extends Error {
  constructor(message, status = "unavailable") {
    super(message);
    this.name = "VerificationServiceError";
    this.status = status;
  }
}

function apiBaseUrl() {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  return (configuredUrl || window.location.origin).replace(/\/+$/, "");
}


function isNotFound(payload, httpStatus) {
  if (httpStatus === 404) return true;

  const code = String(payload?.code ?? payload?.status ?? "").toLowerCase();
  return (
    code === "not_found" ||
    code === "certificate_not_found" ||
    code === "credential_not_found"
  );
}

function isIntegrityMismatch(payload) {
  const credential = payload?.credential ?? {};
  const explicitStatus = String(
    credential.verificationStatus ?? credential.status ?? payload?.status ?? "",
  ).toLowerCase();

  return (
    payload?.integrityMatch === false ||
    payload?.hashMatch === false ||
    ["rejected", "tampered", "mismatch", "integrity_mismatch"].includes(
      explicitStatus,
    )
  );
}

export async function verifyCertificate(certificateId) {
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(() => controller.abort(), 15000);
  const endpoint = `${apiBaseUrl()}/api/credentials/verify/${encodeURIComponent(certificateId)}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });

    let payload;
    try {
      payload = await response.json();
    } catch {
      payload = null;
    }

    if (isNotFound(payload, response.status)) {
      return {
        status: "not_found",
        message:
          payload?.message ??
          "No certificate record was found for this ID. An unregistered ID is not, by itself, evidence of a fake certificate.",
      };
    }

    if (!response.ok) {
      throw new VerificationServiceError(
        payload?.message ??
          `The verification service returned an error (HTTP ${response.status}).`,
      );
    }

    if (!payload || payload.success !== true || !payload.credential) {
      throw new VerificationServiceError(
        payload?.message ??
          "The verification service returned an incomplete response. Please try again.",
      );
    }

    const status = isIntegrityMismatch(payload)
      ? "integrity_mismatch"
      : payload.verified === true
        ? "verified"
        : "incomplete";

    return {
      status,
      message: payload.message ?? "",
      credential: payload.credential,
      hashMatch: payload.hashMatch ?? payload.integrityMatch,
      transactionId:
        payload.blockchainTransactionId ??
        payload.transactionId ??
        payload.txHash ??
        null,
      transactionUrl:
        payload.blockchainExplorerUrl ?? payload.transactionUrl ?? null,
      verificationTimestamp:
        payload.verificationTimestamp ?? payload.verifiedAt ?? null,
    };
  } catch (error) {
    if (error instanceof VerificationServiceError) throw error;

    if (error?.name === "AbortError") {
      throw new VerificationServiceError(
        "The verification request took too long. Check your connection and try again.",
      );
    }

    throw new VerificationServiceError(
      "We could not reach the verification service. Check your connection and try again.",
    );
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}
