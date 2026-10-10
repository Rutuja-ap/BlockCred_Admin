import { Layers3, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <a className="brand footer-brand" href="#home" aria-label="BlockCred AI home">
          <span className="brand-mark">
            <Layers3 size={20} />
          </span>
          <span className="brand-copy">
            <strong>BlockCred<span> AI</span></strong>
            <small>TRUST, VERIFIED.</small>
          </span>
        </a>
        <p>Blockchain-Based Certificate Verification System</p>
        <a className="footer-link" href="#verify">
          Verify a certificate <ShieldCheck size={16} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} BlockCred AI. All rights reserved.</span>
        <span>Built for trust. Designed for confidence.</span>
      </div>
    </footer>
  );
}
