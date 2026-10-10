const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema(
  {
    certificateId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },

    certificateHash: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    digitalSignature: {
      type: String,
      required: true,
    },

    certificateName: {
      type: String,
      required: true,
      trim: true,
    },

    certificateUrl: {
      type: String,
      required: false,
    },

    blockchainTxHash: {
      type: String,
      required: false,
    },

    blockchainCertificateId: {
      type: String,
      required: false,
    },

    issuedAt: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["valid", "revoked"],
      default: "valid",
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Certificate ||
  mongoose.model("Certificate", certificateSchema);