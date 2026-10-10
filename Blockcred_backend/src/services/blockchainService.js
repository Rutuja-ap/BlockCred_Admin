// ==============================
// BLOCKCHAIN CONFIG
// ==============================

const RPC_URL =
  process.env.BLOCKCHAIN_RPC_URL || "http://127.0.0.1:8545";

const CONTRACT_ADDRESS =
  process.env.BLOCKCHAIN_CONTRACT_ADDRESS;

// Address of the contract owner. Ganache signs for it because
// start-ganache.bat unlocks this address (no private key needed).
const OWNER_ADDRESS =
  process.env.BLOCKCHAIN_OWNER_ADDRESS;

if (!OWNER_ADDRESS) {
  throw new Error("BLOCKCHAIN_OWNER_ADDRESS is missing in .env");
}

if (!CONTRACT_ADDRESS) {
  throw new Error("BLOCKCHAIN_CONTRACT_ADDRESS is missing in .env");
}

const account = OWNER_ADDRESS;

// ==============================
// CONTRACT ABI
// ==============================

const contractABI = [
  {
    type: "function",
    name: "registerCertificate",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "certificateId",
        type: "string",
      },
      {
        name: "studentId",
        type: "string",
      },
      {
        name: "certificateHash",
        type: "string",
      },
    ],
    outputs: [],
  },

  {
    type: "function",
    name: "getCertificate",
    stateMutability: "view",
    inputs: [
      {
        name: "certificateId",
        type: "string",
      },
    ],
    outputs: [
      {
        name: "certificateId",
        type: "string",
      },
      {
        name: "studentId",
        type: "string",
      },
      {
        name: "certificateHash",
        type: "string",
      },
      {
        name: "timestamp",
        type: "uint256",
      },
      {
        name: "exists",
        type: "bool",
      },
    ],
  },
];

// ==============================
// CLIENTS
// ==============================

let publicClient;
let walletClient;

// Initialize Viem clients
const initializeBlockchain = async () => {
  if (publicClient && walletClient) {
    return;
  }

  const {
    createPublicClient,
    createWalletClient,
    http,
    defineChain,
  } = await import("viem");

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
        http: [RPC_URL],
      },
    },
  });

  publicClient = createPublicClient({
    chain: ganache,
    transport: http(RPC_URL),
  });

  walletClient = createWalletClient({
    account,
    chain: ganache,
    transport: http(RPC_URL),
  });

  console.log("========== BLOCKCHAIN DEBUG ==========");
  console.log("RPC:", RPC_URL);
  console.log("Contract:", CONTRACT_ADDRESS);
  console.log("Account:", account);

  const balance = await publicClient.getBalance({
    address: account,
  });

  console.log(
    "💰 Backend account balance:",
    Number(balance) / 1e18,
    "ETH"
  );

  console.log("======================================");
};

// ==============================
// REGISTER CERTIFICATE
// ==============================

const registerCertificateOnBlockchain = async ({
  certificateId,
  studentId,
  certificateHash,
}) => {
  await initializeBlockchain();

  console.log("\n⛓️ Registering certificate on blockchain...");

  console.log("Certificate ID:", certificateId);
  console.log("Student ID:", studentId);
  console.log("Hash:", certificateHash);
  console.log("Account:", account);
  console.log("Contract:", CONTRACT_ADDRESS);

  // ==========================================
  // SIMULATE TRANSACTION FIRST
  // ==========================================

  console.log("\n🧪 Simulating blockchain transaction...");

  try {
    const { request } =
      await publicClient.simulateContract({
        address: CONTRACT_ADDRESS,
        abi: contractABI,
        functionName: "registerCertificate",
        account: account,
        args: [
          certificateId,
          studentId,
          certificateHash,
        ],
      });

    console.log("✅ Simulation successful");

    console.log("🧾 TX REQUEST:", request);

    // ==========================================
    // SEND TRANSACTION
    // ==========================================

    const txHash =
      await walletClient.writeContract({
        ...request,
        gas: 500000n,
      });

    console.log("📤 Transaction sent:", txHash);

    // ==========================================
    // WAIT FOR CONFIRMATION
    // ==========================================

    const receipt =
      await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

    console.log("✅ Blockchain transaction confirmed");
    console.log(
      "Transaction hash:",
      receipt.transactionHash
    );

    return {
      transactionHash: receipt.transactionHash,
    };

  } catch (error) {
    console.error("\n❌ BLOCKCHAIN ERROR");
    console.error("Short message:", error.shortMessage);
    console.error("Message:", error.message);
    console.error("Details:", error.details);
    console.error("Cause:", error.cause);

    throw error;
  }
};

// ==============================
// GET CERTIFICATE
// ==============================

const getCertificateFromBlockchain = async (
  certificateId
) => {
  await initializeBlockchain();

  console.log("\n🔍 Reading certificate from blockchain...");
  console.log("Certificate ID:", certificateId);

  const certificate =
    await publicClient.readContract({
      address: CONTRACT_ADDRESS,
      abi: contractABI,
      functionName: "getCertificate",
      args: [certificateId],
    });

  return {
    certificateId: certificate[0],
    studentId: certificate[1],
    certificateHash: certificate[2],
    timestamp: certificate[3].toString(),
    exists: certificate[4],
  };
};

// ==============================
// EXPORTS
// ==============================

module.exports = {
  registerCertificateOnBlockchain,
  getCertificateFromBlockchain,
};