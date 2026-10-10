const express = require("express");
const router = express.Router();


const {
  getStudentCredentials,
  getPublicCredential,
    verifyForPortal,
} = require("../controllers/credentialController");

const { protectStudent } = require("../middleware/authMiddleware");

// Public (QR scan -> verifier page)
router.get("/public/:certificateId", getPublicCredential);

// Student only
router.get("/student/:email", protectStudent, getStudentCredentials);

router.get("/verify/:certificateId", verifyForPortal);

module.exports = router;