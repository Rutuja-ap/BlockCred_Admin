
require("dotenv").config();


const connectDB = require("./src/config/db");
require("./src/models/Student");

const Certificate = require("./src/models/certificate");

const {
  registerCertificateOnBlockchain,
} = require("./src/services/blockchainService");

const migrateCertificates = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    console.log("✅ MongoDB connected");

    // Get existing certificates
    const certificates = await Certificate.find({
      certificateId: {
        $in: ["CERT001", "CERT002", "CERT003", "CERT004"],
      },
    }).populate("studentId");

    console.log(
      `📋 Found ${certificates.length} certificates`
    );

    if (certificates.length === 0) {
      console.log("❌ No certificates found");
      process.exit(0);
    }

    // Register each certificate
    for (const certificate of certificates) {
      console.log(
        `\n⛓️ Registering ${certificate.certificateId}...`
      );

      const result =
        await registerCertificateOnBlockchain({
          certificateId: certificate.certificateId,
          studentId: certificate.studentId.studentId,
          certificateHash: certificate.certificateHash,
        });

      // Update MongoDB
      certificate.blockchainTxHash =
        result.transactionHash;

      certificate.blockchainCertificateId =
        certificate.certificateId;

      await certificate.save();

      console.log(
        `✅ ${certificate.certificateId} registered successfully`
      );

      console.log(
        `🔗 New TX Hash: ${result.transactionHash}`
      );
    }

    console.log(
      "\n🎉 All certificates migrated successfully!"
    );

    process.exit(0);

  } catch (error) {
    console.error("\n❌ Migration failed:");

    console.error(
      error.shortMessage ||
      error.message ||
      error
    );

    process.exit(1);
  }
};

migrateCertificates();