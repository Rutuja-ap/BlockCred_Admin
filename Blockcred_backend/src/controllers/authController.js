const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");


// =======================
// ADMIN SIGNUP
// =======================

const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // const existingAdmin = await Admin.findOne({
    //   email: email.toLowerCase().trim(),
    // });

    const adminAlreadyExists = await Admin.findOne();

    if (adminAlreadyExists) {
      return res.status(409).json({
        message: "Admin account already exists. Only one admin is allowed.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      message: "Admin account created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error("Signup error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


// =======================
// ADMIN LOGIN
// =======================

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Find admin from MongoDB
    const admin = await Admin.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid administrative credentials.",
      });
    }

    // 3. Compare entered password
    // with hashed password stored in MongoDB
    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid administrative credentials.",
      });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    // 4. Generate JWT
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // 5. Send response
    res.status(200).json({
      message: "Admin login successful",

      token,

      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getRegistrationStatus = async (req, res) => {
  try {
    const adminExists = await Admin.exists({});

    res.status(200).json({
      registrationOpen: !adminExists,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to check admin registration status",
    });
  }
};


module.exports = {
  adminSignup,
  adminLogin,
  getRegistrationStatus,
};