const express = require("express");
const router = express.Router();

const {
  createCertificate,
  getAllCertificates,
  getCertificateById,
  viewCertificate,
  
  verifyCertificate,
} = require("../controllers/certificateController");

const protectAdmin = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// PUBLIC VERIFICATION
router.post("/verify", verifyCertificate);

// ADMIN PROTECTED ROUTES
router.use(protectAdmin);

router.post("/", upload.single("certificate"), createCertificate);

router.get("/", getAllCertificates);

router.get("/:id/view", viewCertificate);

router.get("/:id", getCertificateById);

module.exports = router;