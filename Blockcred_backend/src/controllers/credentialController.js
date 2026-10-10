const Certificate = require("../models/certificate");
const Student = require("../models/Student");
const crypto = require("crypto");
// const { verifySignature } = require("../services/digitalSignatureService");

const fs = require("fs");
const path = require("path");

const verifySignature = (hash, signature) => {
  const publicKey = fs.readFileSync(
    path.join(__dirname, "../digital-signature-public.pem"),
    "utf8"
  );
  const verifier = crypto.createVerify("SHA256");
  verifier.update(hash);
  verifier.end();
  return verifier.verify(publicKey, signature, "base64");
};
const { getCertificateFromBlockchain } = require("../services/blockchainService");

const ISSUER = process.env.ISSUER_NAME || "University";

// GET /api/credentials/student/:email   (student token, own email only)
// Response shape matches what StudentCredentials.jsx already expects.
const getStudentCredentials = async (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email).toLowerCase().trim();

    if (email !== String(req.student.email).toLowerCase()) {
      return res.status(403).json({
        success: false,
        message: "You can only view your own credentials.",
      });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    const certificates = await Certificate.find({ studentId: student._id }).sort({
      issuedAt: -1,
    });

    const credentials = certificates.map((c) => ({
      id: c._id,
      credentialId: c.certificateId,
      title: c.certificateName,
      type: "Academic Certificate",
      issuer: ISSUER,
      status: c.status === "valid" ? "Verified" : "Rejected",
      createdAt: c.issuedAt,
      blockchainHash: c.certificateHash,
      blockchainTxHash: c.blockchainTxHash,
      certificateUrl: c.certificateUrl,
    }));

    return res.status(200).json({ success: true, credentials });
  } catch (error) {
    console.error("Get student credentials error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET /api/credentials/public/:certificateId   (no login: used after QR scan)
// Returns what a verifier is allowed to see BEFORE pressing Verify.
const getPublicCredential = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.certificateId.trim(),
    }).populate("studentId", "studentId name course department year");

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    return res.status(200).json({
      success: true,
      certificate: {
        certificateId: certificate.certificateId,
        certificateName: certificate.certificateName,
        issuedAt: certificate.issuedAt,
        status: certificate.status,
        issuer: ISSUER,
        certificateUrl: certificate.certificateUrl,
        student: certificate.studentId
          ? {
              studentId: certificate.studentId.studentId,
              name: certificate.studentId.name,
              course: certificate.studentId.course,
              department: certificate.studentId.department,
              year: certificate.studentId.year,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Get public credential error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
// GET /api/credentials/verify/:certificateId  (public, portal uses this)
const verifyForPortal = async (req, res) => {
  try {
    const certificateId = req.params.certificateId.trim();
    const cert = await Certificate.findOne({ certificateId }).populate("studentId", "name studentId");
    if (!cert) {
      return res.status(404).json({ success: false, code: "not_found", message: "Certificate not found" });
    }
    if (cert.status !== "valid") {
      return res.json({
        success: true, verified: false, status: "rejected",
        credential: { credentialId: cert.certificateId },
        message: "This certificate has been revoked",
      });
    }

    const pdf = await fetch(cert.certificateUrl);
    if (!pdf.ok) throw new Error("Unable to fetch certificate PDF");
    const H2 = crypto.createHash("sha256").update(Buffer.from(await pdf.arrayBuffer())).digest("hex");

    const chain = await getCertificateFromBlockchain(cert.certificateId);
    const H1 = chain.certificateHash;

    const hashOk = H1 === H2;
    const sigOk = verifySignature(H1, cert.digitalSignature);
    const verified = hashOk && sigOk;

    return res.json({
      success: true,
      verified,
      hashMatch: verified,
      message: verified ? "Certificate verified successfully" : "Certificate verification failed",
      credential: {
        credentialId: cert.certificateId,
        studentName: cert.studentId?.name,
        degree: cert.certificateName,
        issuer: ISSUER,
        issuedAt: cert.issuedAt,
        certificateHash: H1,
      },
      blockchainTransactionId: cert.blockchainTxHash,
      verificationTimestamp: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Portal verify error:", e);
    return res.status(500).json({ success: false, message: "Verification service error: " + e.message });
  }
};

module.exports = {getStudentCredentials, getPublicCredential, verifyForPortal  };