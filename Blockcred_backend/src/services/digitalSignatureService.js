const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const privateKeyPath = path.join(
  __dirname,
  "../digital-signature-private.pem"
);

const publicKeyPath = path.join(
  __dirname,
  "../digital-signature-public.pem"
);

// H1 → Digital Signature using Private Key
const signHash = (hash) => {
  const privateKey = fs.readFileSync(privateKeyPath, "utf8");

  const signature = crypto.privateEncrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(hash, "utf8")
  );

  return signature.toString("base64");
};

// Digital Signature → H1 using Public Key
const extractHashFromSignature = (signature) => {
  const publicKey = fs.readFileSync(publicKeyPath, "utf8");

  const hashBuffer = crypto.publicDecrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_PADDING,
    },
    Buffer.from(signature, "base64")
  );

  return hashBuffer.toString("utf8");
};

module.exports = {
  signHash,
  extractHashFromSignature,
};