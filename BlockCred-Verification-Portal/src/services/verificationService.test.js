import { afterEach, describe, expect, it, vi } from "vitest";
import { verifyCertificate } from "./verificationService.js";

function jsonResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: vi.fn().mockResolvedValue(body),
  };
}

describe("verifyCertificate", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns only a verified result received from the API", async () => {
    const credential = { credentialId: "BC-AI-2026-8F29" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({ success: true, verified: true, credential, hashMatch: true }),
      ),
    );

    await expect(verifyCertificate("BC-AI-2026-8F29")).resolves.toMatchObject({
      status: "verified",
      credential,
      hashMatch: true,
    });
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/credentials/verify/BC-AI-2026-8F29",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("does not call an unregistered ID fake", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({}, 404)));

    await expect(verifyCertificate("unknown-id")).resolves.toMatchObject({
      status: "not_found",
    });
  });

  it("identifies an explicit integrity mismatch", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          verified: false,
          integrityMatch: false,
          credential: { credentialId: "BC-123" },
        }),
      ),
    );

    await expect(verifyCertificate("BC-123")).resolves.toMatchObject({
      status: "integrity_mismatch",
    });
  });

  it("does not report verified when the API says the hash does not match", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          verified: true,
          hashMatch: false,
          credential: { credentialId: "BC-123" },
        }),
      ),
    );

    await expect(verifyCertificate("BC-123")).resolves.toMatchObject({
      status: "integrity_mismatch",
    });
  });

  it("does not infer tampering from an ambiguous false verification", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        jsonResponse({
          success: true,
          verified: false,
          credential: { credentialId: "BC-123", status: "pending" },
        }),
      ),
    );

    await expect(verifyCertificate("BC-123")).resolves.toMatchObject({
      status: "incomplete",
    });
  });

  it("surfaces network failures as retryable service errors", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    await expect(verifyCertificate("BC-123")).rejects.toMatchObject({
      status: "unavailable",
    });
  });
});
