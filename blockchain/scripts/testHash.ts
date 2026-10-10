import fs from "fs";
import path from "path";
import { generateSHA256 } from "../utils/hashUtils";

const pdfPath = path.join(
  process.cwd(),
  "test-files",
  "Cyber_Future_Skill.pdf"
);

const pdfBuffer = fs.readFileSync(pdfPath);

const hash = generateSHA256(pdfBuffer);

console.log("PDF:", pdfPath);
console.log("SHA-256 Hash (H1):");
console.log(hash);