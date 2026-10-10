import { createPublicClient, createWalletClient, http, parseAbi } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import fs from "fs";
import path from "path";
import { generateSHA256 } from "../utils/hashUtils";

async function main() {

  // Ganache RPC
  const rpcUrl = "http://127.0.0.1:8545";

  // YOUR GANACHE PRIVATE KEY
  const privateKey =
    "0x65e8c50c65765045942ff78be1dcd1ef14811cf6fc89f4b4ca123c61567bf6d6";

  // YOUR DEPLOYED CONTRACT ADDRESS
  const contractAddress =
    "0x460f4eA49F4725B7424e7b73C5C5062ddB74786C" as `0x${string}`;

  // Create account
  const account = privateKeyToAccount(
    privateKey as `0x${string}`
  );

  // Public client = read blockchain
  const publicClient = createPublicClient({
    transport: http(rpcUrl),
  });

  // Wallet client = write blockchain
  const walletClient = createWalletClient({
    account,
    transport: http(rpcUrl),
  });

  console.log("Using account:", account.address);

  // Read PDF
  const pdfPath = path.join(
    process.cwd(),
    "test-files",
    "Cyber_Future_Skill.pdf"
  );

  const pdfBuffer = fs.readFileSync(pdfPath);

  // Generate SHA-256
  const certificateHash = generateSHA256(pdfBuffer);

  console.log("\nPDF Hash (H1):", certificateHash);

  // Smart contract ABI
  const abi = parseAbi([
    "function registerCertificate(string certificateId, string studentId, string certificateHash)",
    "function getCertificate(string certificateId) view returns (string, string, string, uint256)",
  ]);

  const certificateId = "CERT001";
  const studentId = "ST03";

  console.log("\nRegistering certificate on blockchain...");

  // Send transaction
  const hash = await walletClient.writeContract({
    address: contractAddress,
    abi,
    functionName: "registerCertificate",
    args: [
      certificateId,
      studentId,
      certificateHash,
    ],
  });

  console.log("Transaction Hash:", hash);

  // Wait for confirmation
  await publicClient.waitForTransactionReceipt({
    hash,
  });

  console.log("✅ Certificate stored on blockchain!");

  // Read from blockchain
  const certificate = await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "getCertificate",
    args: [certificateId],
  });

  console.log("\nCertificate from Blockchain:");

  console.log("Certificate ID:", certificate[0]);
  console.log("Student ID:", certificate[1]);
  console.log("Hash:", certificate[2]);
  console.log("Timestamp:", certificate[3].toString());

  console.log("\nHash comparison:");

  if (certificateHash === certificate[2]) {
    console.log("✅ H1 MATCHED");
  } else {
    console.log("❌ H1 NOT MATCHED");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});