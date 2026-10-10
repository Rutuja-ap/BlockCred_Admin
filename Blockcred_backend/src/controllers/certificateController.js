const crypto = require("crypto");

const Certificate = require("../models/Certificate");
const Student = require("../models/Student");

const {
  signHash,
   verifySignature,
} = require("../services/digitalSignatureService");

const {
  registerCertificateOnBlockchain,
  getCertificateFromBlockchain,
} = require("../services/blockchainService");

const {
  uploadCertificateToCloudinary,
} = require("../services/cloudinaryService");


// ==========================================
// CREATE CERTIFICATE
// ==========================================

const createCertificate = async (req, res) => {
  try {
    const {
      certificateId,
      studentId,
      certificateName,
    } = req.body;

    // ==========================================
    // VALIDATE INPUT
    // ==========================================

    if (!certificateId || !studentId || !certificateName) {
      return res.status(400).json({
        message:
          "Certificate ID, student ID and certificate name are required",
      });
    }

    // ==========================================
    // CHECK PDF
    // ==========================================

    if (!req.file) {
      return res.status(400).json({
        message: "Certificate PDF is required",
      });
    }

    // ==========================================
    // CHECK STUDENT
    // ==========================================

    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // ==========================================
    // CHECK CERTIFICATE ID
    // ==========================================

    const existingCertificate = await Certificate.findOne({
      certificateId: certificateId.trim(),
    });

    if (existingCertificate) {
      return res.status(409).json({
        message: "Certificate ID already exists",
      });
    }

    // ==========================================
    // GENERATE SHA-256 HASH
    // FROM ORIGINAL PDF BUFFER
    // ==========================================

    const certificateHash = crypto
      .createHash("sha256")
      .update(req.file.buffer)
      .digest("hex");

    console.log("📄 Certificate Hash:", certificateHash);

    const digitalSignature = signHash(certificateHash);

    console.log("🔐 Digital Signature generated");

    // ==========================================
    // REGISTER ON BLOCKCHAIN
    // ==========================================

    let blockchainTransactionHash;

    try {
      const blockchainResult =
        await registerCertificateOnBlockchain({
          certificateId: certificateId.trim(),
          studentId: student.studentId,
          certificateHash,
        });

      blockchainTransactionHash =
        blockchainResult.transactionHash;

      console.log(
        "⛓️ Blockchain TX:",
        blockchainTransactionHash
      );

    } catch (blockchainError) {
      console.error(
        "❌ Blockchain registration failed:",
        blockchainError
      );

      return res.status(500).json({
        message:
          "Certificate could not be registered on blockchain",
        error:
          blockchainError.shortMessage ||
          blockchainError.message,
      });
    }

    // ==========================================
    // UPLOAD PDF TO CLOUDINARY
    // ==========================================

    let cloudinaryResult;

    try {
      cloudinaryResult =
        await uploadCertificateToCloudinary(
          req.file.buffer,
          certificateId.trim()
        );

      console.log(
        "☁️ Cloudinary URL:",
        cloudinaryResult.secure_url
      );

    } catch (cloudinaryError) {
      console.error(
        "❌ Cloudinary upload failed:",
        cloudinaryError
      );

      return res.status(500).json({
        message: "Certificate upload to Cloudinary failed",
        error: cloudinaryError.message,
      });
    }

    // ==========================================
    // SAVE IN MONGODB
    // ==========================================

    const certificate = await Certificate.create({
      certificateId: certificateId.trim(),

      studentId: student._id,

      certificateHash,

      digitalSignature,

      certificateName: certificateName.trim(),

      certificateUrl: cloudinaryResult.secure_url,

      blockchainTxHash: blockchainTransactionHash,

      blockchainCertificateId: certificateId.trim(),

      issuedAt: new Date(),

      status: "valid",
    });

    // ==========================================
    // RESPONSE
    // ==========================================

    return res.status(201).json({
      message:
        "Certificate uploaded and registered successfully",

      certificate: {
        id: certificate._id,

        certificateId:
          certificate.certificateId,

        studentId:
          certificate.studentId,

        certificateName:
          certificate.certificateName,

        certificateHash:
          certificate.certificateHash,

        certificateUrl:
          certificate.certificateUrl,

        blockchainTxHash:
          certificate.blockchainTxHash,

        blockchainCertificateId:
          certificate.blockchainCertificateId,

        issuedAt:
          certificate.issuedAt,

        status:
          certificate.status,
      },
    });

  } catch (error) {
    console.error(
      "❌ Create certificate error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ==========================================
// GET ALL CERTIFICATES
// ==========================================

const getAllCertificates = async (req, res) => {
  try {
    const certificates =
      await Certificate.find()
        .populate(
          "studentId",
          "studentId name email course department year"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      count: certificates.length,
      certificates,
    });

  } catch (error) {
    console.error(
      "❌ Get certificates error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// ==========================================
// GET CERTIFICATE BY MONGODB ID
// ==========================================

const getCertificateById = async (req, res) => {
  try {
    const certificate =
      await Certificate.findById(
        req.params.id
      ).populate(
        "studentId",
        "studentId name email course department year"
      );

    if (!certificate) {
      return res.status(404).json({
        message: "Certificate not found",
      });
    }

    return res.status(200).json({
      certificate,
    });

  } catch (error) {
    console.error(
      "❌ Get certificate error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};



const viewCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return res.status(404).json({
        message: "Certificate not found",
      });
    }

    if (!certificate.certificateUrl) {
      return res.status(404).json({
        message: "Certificate file URL not found",
      });
    }

    // Download PDF from Cloudinary
    const response = await fetch(certificate.certificateUrl);

    if (!response.ok) {
      return res.status(500).json({
        message: "Unable to fetch certificate from Cloudinary",
        status: response.status,
      });
    }

    const pdfBuffer = Buffer.from(await response.arrayBuffer());

    // Tell browser to DISPLAY PDF instead of downloading it
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="${certificate.certificateId}.pdf"`
    );

    res.setHeader("Content-Length", pdfBuffer.length);

    res.send(pdfBuffer);

  } catch (error) {
    console.error("View certificate error:", error);

    res.status(500).json({
      message: "Failed to display certificate",
      error: error.message,
    });
  }
};
const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.body;

    if (!certificateId) {
      return res.status(400).json({
        verified: false,
        message: "Certificate ID is required",
      });
    }

    // 1) Find certificate in MongoDB
    const certificate = await Certificate.findOne({
      certificateId: String(certificateId).trim(),
    }).populate("studentId", "studentId name course department year");

    if (!certificate) {
      return res.status(404).json({
        verified: false,
        message: "Certificate not found",
      });
    }

    // Only safe details are returned (no email)
    const student = certificate.studentId
      ? {
          studentId: certificate.studentId.studentId,
          name: certificate.studentId.name,
          course: certificate.studentId.course,
          department: certificate.studentId.department,
          year: certificate.studentId.year,
        }
      : null;

    const base = {
      certificateId: certificate.certificateId,
      certificateName: certificate.certificateName,
      issuedAt: certificate.issuedAt,
      status: certificate.status,
      student,
    };

    // 2) Revoked certificates are never valid
    if (certificate.status !== "valid") {
      return res.status(200).json({
        ...base,
        verified: false,
        verification: { tamperProof: false, digitalSignature: false, onBlockchain: true },
        message: "Certificate has been revoked",
      });
    }

    // 3) PDF must exist
    if (!certificate.certificateUrl) {
      return res.status(404).json({
        ...base,
        verified: false,
        message: "Certificate file not found",
      });
    }

    // 4) Fetch original PDF from Cloudinary and hash it -> H2
    const response = await fetch(certificate.certificateUrl);

    if (!response.ok) {
      return res.status(500).json({
        ...base,
        verified: false,
        message: "Unable to fetch certificate PDF",
      });
    }

    const pdfBuffer = Buffer.from(await response.arrayBuffer());

    const H2 = crypto.createHash("sha256").update(pdfBuffer).digest("hex");

    // 5) Read H1 from the blockchain
    let blockchainCertificate = null;
    try {
      blockchainCertificate = await getCertificateFromBlockchain(
        certificate.certificateId
      );
    } catch (chainError) {
      console.error("Blockchain read failed:", chainError.shortMessage || chainError.message);
    }

    if (!blockchainCertificate || !blockchainCertificate.exists) {
      return res.status(200).json({
        ...base,
        verified: false,
        verification: { tamperProof: false, digitalSignature: false, onBlockchain: false },
        message: "Certificate was not found on the blockchain",
      });
    }

    const blockchainH1 = blockchainCertificate.certificateHash;

    console.log("Blockchain H1:", blockchainH1);
    console.log("Newly generated H2:", H2);

    // 6) Step 2 of workflow: H1 (blockchain) == H2 (PDF now)  -> tamper-proof
    const hashVerified = blockchainH1 === H2;

    // 7) Step 1 of workflow: digital signature over H1 (public key) -> authenticity
    let signatureVerified = false;
    try {
      signatureVerified = verifySignature(blockchainH1, certificate.digitalSignature);
    } catch (sigError) {
      console.error("Signature check failed:", sigError.message);
    }

    const verified = hashVerified && signatureVerified;

    return res.status(200).json({
      ...base,
      verified,
      verification: {
        tamperProof: hashVerified,
        digitalSignature: signatureVerified,
        onBlockchain: true,
      },
      message: verified
        ? "Certificate verified successfully"
        : "Certificate verification failed",
    });
  } catch (error) {
    console.error("Certificate verification error:", error);

    return res.status(500).json({
      verified: false,
      message: "Verification failed",
      error: error.message,
    });
  }
};


// ==========================================
// EXPORT
// ==========================================

module.exports = {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  viewCertificate,
  verifyCertificate,
};