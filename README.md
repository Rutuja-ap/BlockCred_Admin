# BlockCred: Blockchain-Based Certificate Verification System

BlockCred lets a university issue tamper-proof academic certificates and lets anyone verify them by scanning a QR code.

This repository contains the **admin side and the public verification portal**. The student mobile app lives in separate repositories (`student-wallet-app` for the Expo frontend and its backend).

## How it works

**Issuing (admin)**
1. Admin uploads the certificate PDF, student and certificate ID.
2. Backend computes the SHA-256 hash of the PDF (**H1**).
3. H1 is signed with the university's RSA private key (digital signature).
4. H1 is stored on the blockchain through the `CertificateRegistry` smart contract (Solidity).
5. The PDF goes to Cloudinary. Student details, signature and the blockchain transaction hash go to MongoDB.

**Verifying (portal)**
1. A verifier scans the certificate QR code from the student app. It opens the portal with the certificate ID.
2. The backend downloads the PDF and computes a fresh hash (**H2**).
3. It reads H1 from the blockchain and checks **H1 == H2** (tamper-proof check).
4. It verifies the digital signature with the public key (authenticity: issued by the university).
5. The portal shows **Verified** only if both checks pass.

## Repository structure

| Folder | What it is | Default port |
|---|---|---|
| `Blockcred_backend` | Admin API (Node.js, Express, MongoDB, viem). Also serves the portal's verify endpoint | 5000 |
| `BlockCred-UI` | Admin web app (React, Vite) | 5173 |
| `blockchain` | Hardhat project with the `CertificateRegistry` Solidity contract and deploy scripts | n/a |
| `BlockCred-Verification-Portal` | Public verification website (React, Vite, Tailwind) | 5174 |

## Prerequisites

- Node.js 18 or newer
- A MongoDB Atlas database
- A Cloudinary account
- Ganache (`npm install -g ganache`) for the local blockchain

## Setup

### 1. Install dependencies

```bash
cd Blockcred_backend && npm install
cd ../BlockCred-UI && npm install
cd ../blockchain && npm install
cd ../BlockCred-Verification-Portal && npm install
```

### 2. Configure the backend

```bash
cd Blockcred_backend
copy .env.example .env      # on macOS/Linux: cp .env.example .env
```

Fill in `.env`. `BLOCKCHAIN_PRIVATE_KEY` is the private key of a Ganache account, `BLOCKCHAIN_CONTRACT_ADDRESS` is filled after step 4.

### 3. Generate the digital signature keys

```bash
cd Blockcred_backend
node generateSignatureKeys.js
move digital-signature-*.pem src\     # on macOS/Linux: mv digital-signature-*.pem src/
```

The private key must never be committed or shared. Certificates signed with an old key will not verify with a new one.

### 4. Start Ganache and deploy the contract

```bash
ganache --database.dbPath ./ganache-data --chain.chainId 1337 --server.port 8545
```

In another terminal:

```bash
cd blockchain
npx hardhat run scripts/deploy.ts --network ganache
```

Copy the printed `CertificateRegistry deployed to: 0x...` address into `BLOCKCHAIN_CONTRACT_ADDRESS` in `Blockcred_backend/.env`.

### 5. Run everything

| Terminal | Folder | Command |
|---|---|---|
| 1 | (anywhere) | Ganache command from step 4 |
| 2 | `Blockcred_backend` | `npm run dev` |
| 3 | `BlockCred-UI` | `npm run dev` |
| 4 | `BlockCred-Verification-Portal` | `npm run dev` |

### 6. Verify the setup

- `http://localhost:5000` returns `BlockCred Admin Backend is running`.
- Log in to the admin UI, add a student and upload a certificate.
- Open `http://localhost:5000/api/credentials/verify/<certificateId>`. The JSON should contain `"verified": true`.
- Open the portal with `http://<your-ip>:5174/?certId=<certificateId>` to see the result page.

## Verification API

`GET /api/credentials/verify/:certificateId` (public)

Returns `success`, `verified`, `hashMatch`, `message`, `credential` (ID, student name, title, issuer, issue date) and `verificationTimestamp`. Returns `404` with `code: "not_found"` for unknown IDs.

## Using it from a phone (QR scan)

The phone and the laptop must be on the same Wi-Fi. The QR code in the student app encodes `http://<laptop-ip>:5174/?certId=<certificateId>`. Allow ports 5000, 5002 and 5174 in the Windows firewall.

## Tech stack

Node.js, Express, MongoDB (Mongoose), JWT, bcrypt, Cloudinary, React, Vite, Tailwind CSS, Solidity 0.8.19, Hardhat, viem, Ganache, SHA-256 and RSA digital signatures.

## Security notes

- `.env` files and `digital-signature-private.pem` are git-ignored. Never commit them.
- Keep the blockchain private key for a test account only.
- Ganache is for local development. A production deployment would use a public network such as Polygon.
