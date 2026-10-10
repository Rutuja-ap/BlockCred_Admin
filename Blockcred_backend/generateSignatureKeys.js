const crypto = require("crypto");
const fs = require("fs");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

fs.writeFileSync("digital-signature-private.pem", privateKey);
fs.writeFileSync("digital-signature-public.pem", publicKey);

console.log("✅ Digital signature keys generated");
console.log("📁 digital-signature-private.pem");
console.log("📁 digital-signature-public.pem");