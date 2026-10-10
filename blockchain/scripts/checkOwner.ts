import { createPublicClient, http } from "viem";
import { defineChain } from "viem";

async function main() {

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

  const client = createPublicClient({
    chain: ganache,
    transport: http(),
  });

  const contractAddress =
    "0xb4889925875458DABb5Bb52cbB87275779BD5A25" as `0x${string}`;

  const owner = await client.readContract({
    address: contractAddress,
    abi: [
      {
        type: "function",
        name: "owner",
        stateMutability: "view",
        inputs: [],
        outputs: [
          {
            type: "address",
          },
        ],
      },
    ],
    functionName: "owner",
  });

  console.log("Contract owner:", owner);

}

main().catch(console.error);