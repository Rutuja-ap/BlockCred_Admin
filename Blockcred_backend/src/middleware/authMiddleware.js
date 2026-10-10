const jwt = require("jsonwebtoken");

const readToken = (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({
      message: "Access denied. No token provided.",
    });
    return null;
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    res.status(401).json({
      message: "Invalid authorization format.",
    });
    return null;
  }

  if (!process.env.JWT_SECRET) {
    res.status(500).json({
      message: "JWT_SECRET is not configured.",
    });
    return null;
  }

  try {
    return jwt.verify(parts[1], process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token.",
    });
    return null;
  }
};

// Admin-only APIs
const protectAdmin = (req, res, next) => {
  const decoded = readToken(req, res);

  if (!decoded) return;

  if (decoded.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only.",
    });
  }

  req.admin = decoded;
  next();
};

// Student-only APIs
const protectStudent = (req, res, next) => {
  const decoded = readToken(req, res);

  if (!decoded) return;

  if (decoded.role !== "student") {
    return res.status(403).json({
      message: "Student access only.",
    });
  }

  req.student = decoded;
  next();
};

// Preserve existing import style
module.exports = protectAdmin;
module.exports.protectAdmin = protectAdmin;
module.exports.protectStudent = protectStudent;
