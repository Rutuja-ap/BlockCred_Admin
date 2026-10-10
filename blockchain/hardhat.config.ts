import dotenv from "dotenv";
import { defineConfig } from "hardhat/config";
import hardhatEthers from "@nomicfoundation/hardhat-ethers";

dotenv.config({
  path: "../Blockcred_backend/.env",
});

export default defineConfig({
  plugins: [hardhatEthers],

  solidity: {
    version: "0.8.19",
  },

  networks: {
    ganache: {
      type: "http",
      url: "http://127.0.0.1:8545",
      accounts: [process.env.BLOCKCHAIN_PRIVATE_KEY!],
      chainId: 1337,
    },
  },
});