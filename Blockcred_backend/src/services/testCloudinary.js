require("dotenv").config({
  path: "../../.env",
});

const fs = require("fs");
const path = require("path");

const cloudinary = require("../config/cloudinary");

async function test() {
  try {
    console.log("Testing Cloudinary API...");

    // 1. Check API
    const ping = await cloudinary.api.ping();

    console.log("✅ CLOUDINARY API WORKING");
    console.log(ping);

    // 2. PDF location
    const pdfPath = path.join(
      __dirname,
      "Java Problem solving (2).pdf"
    );

    console.log("📄 PDF path:", pdfPath);

    // 3. Check PDF exists
    if (!fs.existsSync(pdfPath)) {
      console.log("❌ Java Problem solving (2).pdf NOT FOUND");
      return;
    }

    const fileBuffer = fs.readFileSync(pdfPath);

    console.log(
      "📦 PDF size:",
      (fileBuffer.length / 1024).toFixed(2),
      "KB"
    );

    // 4. Upload PDF
    const result = await cloudinary.uploader.upload(
      `data:application/pdf;base64,${fileBuffer.toString("base64")}`,
      {
        resource_type: "raw",
        public_id: `blockcred/test-${Date.now()}`,
      }
    );

    console.log("================================");
    console.log("🎉 PDF UPLOAD SUCCESSFUL");
    console.log("☁️ URL:", result.secure_url);
    console.log("================================");

  } catch (error) {
    console.log("❌ PDF UPLOAD FAILED");
    console.log(error);
  }
}

test();