# BlockCred AI — Certificate Verification Portal

A standalone, responsive React + Vite portal for checking academic certificate IDs against the existing BlockCred verification API. This project is independent of the BlockCred AI dashboard and does not start or modify it.

## Run locally

```powershell
cd "D:\Sem project\BlockCred-Verification-Portal"
npm install
npm run dev -- --port 5174
```

Open [http://localhost:5174](http://localhost:5174). Vite is configured to use port 5174 and will report an error rather than silently selecting a different port.

## API configuration

Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to the **origin** of the API server (for example, `http://localhost:5000`). The portal requests:

```text
GET {VITE_API_BASE_URL}/api/credentials/verify/{URL-encoded-certificate-id}
```

The existing BlockCred frontend calls `GET http://localhost:5000/api/credentials/verify/:credentialId` and expects a JSON response containing `success`, `credential`, and `verified`. This portal uses that route and response shape. The backend source was not present in the inspected frontend project, so blockchain validation behavior must be confirmed with the API maintainers before presenting a response as on-chain verified.

### Response contract

The existing response shape is supported:

```json
{
  "success": true,
  "verified": true,
  "credential": {
    "credentialId": "BC-AI-2026-8F29",
    "studentName": "Backend-provided name",
    "title": "Backend-provided degree",
    "issuer": "Backend-provided institute",
    "issueDate": "2026-01-15",
    "blockchainHash": "backend-provided-hash"
  },
  "message": "Backend-provided status message",
  "hashMatch": true,
  "blockchainTransactionId": "backend-provided-transaction-id",
  "blockchainExplorerUrl": "https://explorer.example/tx/...",
  "verificationTimestamp": "2026-01-16T10:30:00Z"
}
```

Only fields actually returned by the API are displayed. Optional metadata can be omitted. To distinguish outcomes reliably:

- **Verified:** `success: true`, `verified: true`; return `hashMatch: true` only after comparing the submitted certificate's hash with the trusted registered hash and validating the corresponding blockchain record where applicable.
- **Integrity mismatch:** return `success: true`, `verified: false`, and `integrityMatch: false` (or a credential `status` explicitly set to `rejected`, `tampered`, or `mismatch`).
- **Not found:** return HTTP `404`, preferably with `{ "success": false, "code": "CERTIFICATE_NOT_FOUND", "message": "..." }`. A missing record is not itself proof of forgery.
- **Unavailable:** use a server error or allow connection failures to surface; the portal offers retry.

An ambiguous `verified: false` response is shown as **Verification Incomplete**, not misrepresented as tampering. The frontend does not calculate or attest to blockchain validity.

### CORS

When the API uses a different origin, configure its server to allow `http://localhost:5174` for `GET` requests (and the headers it requires). For an Express API using the `cors` package:

```js
app.use(cors({ origin: "http://localhost:5174", methods: ["GET"] }));
```

Apply the policy in the API server; this standalone portal does not change the existing backend.

## QR scanner and browser support

The camera scanner requests permission only after the user selects **Scan QR code**. It uses the browser's `BarcodeDetector` QR support when available (commonly current Chromium browsers). If the browser does not support QR detection, the portal displays a clear message and the certificate ID can still be entered manually.

## Checks

```powershell
npm test
npm run build
```

No mock certificate records or mock blockchain responses are bundled. With no API configured or available, verification returns an explicit unavailable state.
