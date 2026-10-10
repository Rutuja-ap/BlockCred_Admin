const express = require("express");

const router = express.Router();

const {
  adminSignup,
  adminLogin,
  getRegistrationStatus,
} = require("../controllers/authController");

const protectAdmin = require("../middleware/authMiddleware");


// ==========================
// PUBLIC ROUTES
// ==========================

// Signup
router.post("/signup", adminSignup);

// Login
router.post("/login", adminLogin);


// ==========================
// PROTECTED ROUTE
// ==========================

router.get("/profile", protectAdmin, async (req, res) => {
  res.status(200).json({
    message: "Admin authentication successful",
    admin: req.admin,
  });
});
router.get("/registration-status", getRegistrationStatus);

module.exports = router;