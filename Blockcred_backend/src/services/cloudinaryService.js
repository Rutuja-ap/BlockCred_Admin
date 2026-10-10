const cloudinary = require("../config/cloudinary");

const uploadCertificateToCloudinary = async (
  buffer,
  certificateId
) => {
  try {
    console.log("☁️ Starting Cloudinary PDF upload...");
    console.log("📦 Buffer size:", buffer.length);

    const base64PDF = buffer.toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:application/pdf;base64,${base64PDF}`,
      {
        resource_type: "raw",
        public_id: `blockcred/certificates/${certificateId}-${Date.now()}`,
      }
    );

    console.log("✅ PDF uploaded to Cloudinary");
    console.log("☁️ URL:", result.secure_url);

    return result;

  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);
    throw error;
  }
};

module.exports = {
  uploadCertificateToCloudinary,
};