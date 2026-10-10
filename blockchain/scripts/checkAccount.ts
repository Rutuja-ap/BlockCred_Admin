import dotenv from "dotenv";

dotenv.config({
  path: "../../Blockcred_backend/.env",
});
import { createPublicClient, http } from "viem";
import { defineChain } from "viem";
import { privateKeyToAccount } from "viem/accounts";

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

  const privateKey = process.env.BLOCKCHAIN_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error("BLOCKCHAIN_PRIVATE_KEY is missing in .env");
  }

  const account = privateKeyToAccount(
    privateKey as `0x${string}`
  );

  console.log("Address from private key:");
  console.log(account.address);

  const client = createPublicClient({
    chain: ganache,
    transport: http("http://127.0.0.1:8545"),
  });

  const balance = await client.getBalance({
    address: account.address,
  });

  console.log("\nBalance:");
  console.log(balance.toString());

  console.log("\nBalance in ETH:");
  console.log(Number(balance) / 1e18);

  const chainId = await client.getChainId();

  console.log("\nChain ID:");
  console.log(chainId);
}

main().catch(console.error);