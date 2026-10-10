
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoutes");
const certificateRoutes = require("./routes/certificateRoutes");
const credentialRoutes = require("./routes/credentialRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Backend health check
app.get("/", (req, res) => {
  res.json({
    message: "BlockCred Admin Backend is running",
  });
});

// API routes
app.use("/api/admin", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/credentials", credentialRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("Upload/API Error:", err);

  res.status(500).json({
    message: "File upload failed",
    error: err.message || err,
  });
});

// Connect DB and start server
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});