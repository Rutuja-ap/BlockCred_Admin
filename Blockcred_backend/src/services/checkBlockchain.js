require("dotenv").config();

const { createPublicClient, http } = require("viem");

const client = createPublicClient({
  chain: {
    id: 1337,
    name: "Ganache",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: { default: { http: ["http://127.0.0.1:8545"] } },
  },
  transport: http(process.env.BLOCKCHAIN_RPC_URL),
});

const abi = [
  { type: "function", name: "owner", stateMutability: "view", inputs: [], outputs: [{ type: "address" }] },
];

(async () => {
  const configured = process.env.BLOCKCHAIN_OWNER_ADDRESS;
  const owner = await client.readContract({
    address: process.env.BLOCKCHAIN_CONTRACT_ADDRESS,
    abi,
    functionName: "owner",
  });
  console.log("Owner in .env     :", configured);
  console.log("Owner in contract :", owner);
  console.log(
    configured && configured.toLowerCase() === owner.toLowerCase()
      ? "✅ SUCCESS: .env owner matches contract owner"
      : "❌ ERROR: owner mismatch"
  );
})().catch((e) => console.log("❌ ERROR:", e.shortMessage || e.message));