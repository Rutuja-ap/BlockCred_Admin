require("dotenv").config();

const {
  getCertificateFromBlockchain,
} = require("./src/services/blockchainService");

const test = async () => {
  try {
    const certificateId = "CERT001"; // blockchain वर registered actual ID इथे दे

    const certificate =
      await getCertificateFromBlockchain(certificateId);

    console.log("\n✅ Certificate found:");
    console.log(certificate);

  } catch (error) {
    console.error("\n❌ Error:");
    console.error(error.message);
  }
};

test();