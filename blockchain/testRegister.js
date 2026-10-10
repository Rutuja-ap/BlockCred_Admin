import { network } from "hardhat";

async function main() {
  const { ethers } = await network.create();

  const contractAddress = "0xC07e261db6cE1aD461e77a8260dE0B14E33a139e";

  const CertificateRegistry =
    await ethers.getContractAt(
      "CertificateRegistry",
      contractAddress
    );

  const tx =
    await CertificateRegistry.registerCertificate(
      "TEST999",
      "ST01",
      "abc123hash"
    );

  console.log("TX:", tx.hash);

  await tx.wait();

  console.log("✅ TEST999 registered");

  const cert =
    await CertificateRegistry.getCertificate("TEST999");

  console.log("Certificate:", cert);
}

main().catch((error) => {
  console.error("❌ ERROR:");
  console.error(error);
  process.exitCode = 1;
});