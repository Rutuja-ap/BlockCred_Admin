import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { defineChain } from "viem";
import fs from "fs";
import crypto from "crypto";

async function main() {

  // Ganache local chain
  const ganache = defineChain({
    id: 1337,
    name: "Ganache",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ["http://127.0.0.1:8545"],
      },
    },
  });

  // YOUR GANACHE PRIVATE KEY
  const privateKey =
    "0x828958fac8505feb6d838e91789b7ccf2396ae9c88514c47d78ebc757500beb7" as `0x${string}`;

  const account = privateKeyToAccount(privateKey);

  console.log("Using account:", account.address);

  // YOUR NEW CONTRACT ADDRESS
  const contractAddress =
    "0x6C7f6e9D5B6268ECB290d56C0041aB748988Ba4E" as `0x${string}`;

  // Contract ABI
  const abi = [
    {
      type: "function",
      name: "registerCertificate",
      stateMutability: "nonpayable",
      inputs: [
        { name: "certificateId", type: "string" },
        { name: "studentId", type: "string" },
        { name: "certificateHash", type: "string" },
      ],
      outputs: [],
    },
    {
      type: "function",
      name: "getCertificate",
      stateMutability: "view",
      inputs: [
        { name: "certificateId", type: "string" },
      ],
      outputs: [
        { type: "string" },
        { type: "string" },
        { type: "string" },
        { type: "uint256" },
        { type: "bool" },
      ],
    },
    {
      type: "function",
      name: "verifyCertificate",
      stateMutability: "view",
      inputs: [
        { name: "certificateId", type: "string" },
        { name: "certificateHash", type: "string" },
      ],
      outputs: [
        { type: "bool" },
      ],
    },
  ] as const;

  // Clients
  const publicClient = createPublicClient({
    chain: ganache,
    transport: http(),
  });

  const walletClient = createWalletClient({
    account,
    chain: ganache,
    transport: http(),
  });

  // Certificate details
  const certificateId = "CERT001";
  const studentId = "ST03";

  // Read actual PDF
  const pdfPath = "./test-files/Cyber_Future_Skill.pdf";

  const pdfBuffer = fs.readFileSync(pdfPath);

  // SHA-256
  const certificateHash = crypto
    .createHash("sha256")
    .update(pdfBuffer)
    .digest("hex");

  console.log("\nPDF Hash (H1):", certificateHash);

  // Register
  console.log("\nRegistering certificate on blockchain...");

  const txHash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "registerCertificate",
    args: [
      certificateId,
      studentId,
      certificateHash,
    ],
  });

  console.log("Transaction Hash:", txHash);

  await publicClient.waitForTransactionReceipt({
    hash: txHash,
  });

  console.log("✅ Certificate registered!");

  // Read certificate
  console.log("\nReading certificate from blockchain...");

  const result = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "getCertificate",
    args: [certificateId],
  });

  console.log("\nBlockchain Data:");
  console.log("Certificate ID:", result[0]);
  console.log("Student ID:", result[1]);
  console.log("Hash:", result[2]);
  console.log("Timestamp:", result[3].toString());
  console.log("Exists:", result[4]);

  // Verify
  const isValid = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "verifyCertificate",
    args: [certificateId, certificateHash],
  });

  console.log("\nVerification Result:", isValid);

  if (isValid) {
    console.log("✅ CERTIFICATE IS VALID");
  } else {
    console.log("❌ CERTIFICATE IS INVALID");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});