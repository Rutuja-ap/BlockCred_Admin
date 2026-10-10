import { useCallback, useState , useEffect} from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ChevronRight,
  ClipboardCheck,
  Fingerprint,
  LockKeyhole,
  QrCode,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Check,
} from "lucide-react";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import QrScanner from "./components/QrScanner.jsx";
import VerificationResult from "./components/VerificationResult.jsx";
import { VerificationServiceError, verifyCertificate } from "./services/verificationService.js";

const exampleId = "BC-AI-2026-8F29";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Submit a certificate ID",
    description:
      "Enter the unique ID printed on a certificate, or scan its QR code to get started.",
  },
  {
    number: "02",
    icon: Fingerprint,
    title: "Compare trusted records",
    description:
      "The verification service checks the registered certificate record and its integrity.",
  },
  {
    number: "03",
    icon: BadgeCheck,
    title: "Review the result",
    description:
      "See the result returned by the service, with available record details and proof.",
  },
];

export default function App() {
  const [certificateId, setCertificateId] = useState("");
  const [inputError, setInputError] = useState("");
  const [result, setResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [notification, setNotification] = useState("");

  const notify = useCallback((message) => {
    setNotification(message);
    window.setTimeout(() => setNotification(""), 2200);
  }, []);

  const performVerification = useCallback(async (value) => {
    const trimmedId = value.trim();
    if (!trimmedId) {
      setInputError("Enter a certificate ID to continue.");
      return;
    }
    if (!/^[A-Za-z0-9][A-Za-z0-9_-]{2,119}$/.test(trimmedId)) {
      setInputError("Use 3–120 letters, numbers, hyphens, or underscores.");
      return;
    }

    setCertificateId(trimmedId);
    setInputError("");
    setResult(null);
    setIsVerifying(true);

    try {
      const verification = await verifyCertificate(trimmedId);
      setResult(verification);
    } catch (error) {
      const message =
        error instanceof VerificationServiceError
          ? error.message
          : "We could not complete verification. Please try again.";
      setResult({ status: "unavailable", message });
    } finally {
      setIsVerifying(false);
    }
  }, []);
  useEffect(() => {
  const id = new URLSearchParams(window.location.search).get("certId");
  if (id) {
    performVerification(id);
    document.getElementById("verify")?.scrollIntoView();
  }
}, [performVerification]);

  function handleSubmit(event) {
    event.preventDefault();
    performVerification(certificateId);
  }

  function handleReset() {
    setCertificateId("");
    setInputError("");
    setResult(null);
    setIsVerifying(false);
  }

  async function handleCopy(value, label) {
    try {
      await navigator.clipboard.writeText(value);
      notify(`${label} copied`);
    } catch {
      notify("Clipboard access is unavailable in this browser");
    }
  }

  const handleScan = useCallback((value) => {
     let id = value;
  try { id = new URL(value).searchParams.get("certId") || value; } catch {}
    setCertificateId(value);
    setInputError("");
    setResult(null);
    setScannerOpen(false);
    notify("QR code scanned. Review the ID, then verify.");
  }, [notify]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="hero-section" id="home">
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="hero-grid page-container">
            <div className="hero-content">
              <div className="hero-eyebrow">
                <span className="eyebrow-pulse" />
                A MORE TRUSTED WAY TO VERIFY
              </div>
              <h1>
                Verify academic credentials with <span>confidence.</span>
              </h1>
              <p className="hero-description">
                Make informed decisions with certificate records checked against trusted
                verification data. Clear results, without the guesswork.
              </p>
              <div className="hero-proof">
                <span><ShieldCheck size={16} /> Integrity-led</span>
                <span><LockKeyhole size={15} /> Privacy-conscious</span>
              </div>
              <a className="hero-scroll-link" href="#verify">
                Start a verification <ArrowDown size={15} />
              </a>
            </div>

            <div className="hero-visual" aria-label="Illustration of certificate integrity verification">
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="visual-dot dot-one" />
              <div className="visual-dot dot-two" />
              <div className="visual-card visual-card-back" />
              <div className="credential-visual-card">
                <div className="credential-visual-top">
                  <span className="mini-brand-mark"><Fingerprint size={18} /></span>
                  <span className="visual-card-label">CREDENTIAL RECORD</span>
                  <span className="visual-record-tag"><Fingerprint size={11} /> ID LOOKUP</span>
                </div>
                <div className="visual-seal"><ShieldCheck size={34} /></div>
                <div className="visual-lines">
                  <span className="visual-line line-long" />
                  <span className="visual-line line-medium" />
                  <span className="visual-line line-short" />
                </div>
                <div className="visual-card-footer">
                  <span>CRYPTOGRAPHIC INTEGRITY</span>
                  <span className="visual-wave" aria-hidden="true">
                    <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
                  </span>
                </div>
              </div>
              <div className="visual-float visual-float-top">
                <span className="float-icon"><Fingerprint size={17} /></span>
                <span><b>Hash comparison</b><small>Trusted record check</small></span>
                <ChevronRight size={15} />
              </div>
              <div className="visual-float visual-float-bottom">
                <span className="float-record"><Fingerprint size={16} /></span>
                <span><b>Only reported details</b><small>No assumed outcomes</small></span>
              </div>
              <span className="visual-caption"><Sparkles size={13} /> SECURITY BY DESIGN</span>
            </div>
          </div>
          <div className="hero-bottom-rule" />
        </section>

        <section className="verify-section section-pad" id="verify">
          <div className="page-container verify-layout">
            <div className="verify-intro">
              <span className="section-kicker"><span /> INSTANT CREDENTIAL CHECK</span>
              <h2>Good decisions start with <span>trusted proof.</span></h2>
              <p>
                Enter the certificate ID exactly as it appears on the document. We’ll
                securely request its verification status from the connected service.
              </p>
              <div className="privacy-note">
                <span className="privacy-icon"><LockKeyhole size={16} /></span>
                <span><b>Your search stays focused.</b> We only send the certificate ID needed for this check.</span>
              </div>
            </div>

            <div className="verification-column">
              <div className="verification-card">
                <div className="verification-card-heading">
                  <div>
                    <span className="section-kicker">CERTIFICATE LOOKUP</span>
                    <h2>Verify a certificate</h2>
                  </div>
                  <span className="card-shield"><ShieldCheck size={21} /></span>
                </div>
                <form onSubmit={handleSubmit} noValidate>
                  <label className="input-label" htmlFor="certificate-id">
                    Certificate ID
                  </label>
                  <div className={`certificate-input-wrap${inputError ? " input-invalid" : ""}`}>
                    <Fingerprint size={19} aria-hidden="true" />
                    <input
                      autoComplete="off"
                      aria-describedby={inputError ? "certificate-error certificate-hint" : "certificate-hint"}
                      aria-invalid={Boolean(inputError)}
                      id="certificate-id"
                      maxLength={120}
                      onChange={(event) => {
                        setCertificateId(event.target.value);
                        setResult(null);
                        if (inputError) setInputError("");
                      }}
                      disabled={isVerifying}
                      placeholder="e.g. BC-AI-2026-8F29"
                      spellCheck="false"
                      value={certificateId}
                    />
                    {certificateId && (
                      <button
                        aria-label="Clear certificate ID"
                        className="clear-input-button"
                        onClick={() => {
                          setCertificateId("");
                          setInputError("");
                          setResult(null);
                        }}
                        disabled={isVerifying}
                        type="button"
                      >
                        <RotateCcw size={15} />
                      </button>
                    )}
                  </div>
                  <div className="input-helper-row">
                    <span id="certificate-hint">Find the ID on the certificate or its QR code.</span>
                    <button
                      className="example-button"
                      onClick={() => {
                        setCertificateId(exampleId);
                        setInputError("");
                        setResult(null);
                      }}
                      disabled={isVerifying}
                      type="button"
                    >
                      Use example
                    </button>
                  </div>
                  {inputError && <p className="input-error" id="certificate-error" role="alert">{inputError}</p>}
                  <div className="form-actions">
                    <button className="button button-primary verify-button" disabled={isVerifying} type="submit">
                      {isVerifying ? (
                        <><span className="button-spinner" /> Checking record…</>
                      ) : (
                        <>Verify certificate <ArrowRight size={17} /></>
                      )}
                    </button>
                    <button
                      className="button button-quiet"
                      disabled={isVerifying || (!certificateId && !result)}
                      onClick={handleReset}
                      type="button"
                    >
                      <RotateCcw size={15} /> Reset
                    </button>
                  </div>
                  <div className="form-divider"><span>OR</span></div>
                  <button
                    className="button button-scan"
                    disabled={isVerifying}
                    onClick={() => setScannerOpen(true)}
                    type="button"
                  >
                    <QrCode size={17} /> Scan certificate QR code <ArrowUpRight size={14} />
                  </button>
                </form>
                <div className="verification-card-foot">
                  <LockKeyhole size={13} />
                  <span>Your ID is sent securely to the verification service.</span>
                </div>
              </div>

              {isVerifying && (
                <div className="loading-state" role="status" aria-live="polite">
                  <div className="loading-spinner" />
                  <div><b>Checking certificate record</b><span>Comparing against trusted verification data…</span></div>
                </div>
              )}

              {result && !isVerifying && (
                <VerificationResult
                  certificateId={certificateId}
                  onCopy={handleCopy}
                  onRetry={() => performVerification(certificateId)}
                  result={result}
                />
              )}
            </div>
          </div>
        </section>

        <section className="process-section section-pad" id="how-it-works">
          <div className="page-container">
            <div className="section-heading">
              <span className="section-kicker"><span /> CLEAR BY DESIGN</span>
              <h2>Confidence in <span>three simple steps.</span></h2>
              <p>Designed to make verification straightforward, transparent, and easy to understand.</p>
            </div>
            <div className="steps-grid">
              {steps.map(({ number, icon: Icon, title, description }) => (
                <article className="step-card" key={number}>
                  <div className="step-card-top">
                    <span className="step-icon"><Icon size={21} /></span>
                    <span className="step-number">{number}</span>
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <span className="step-bottom-line" />
                </article>
              ))}
            </div>
            <div className="process-footnote">
              <LockKeyhole size={15} />
              <span>Integrity checks are performed by the connected verification service—not by this page.</span>
            </div>
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="page-container about-card">
            <div className="about-icon"><ShieldCheck size={24} /></div>
            <div>
              <span className="section-kicker">BLOCKCRED AI</span>
              <h2>Credentials you can count on.</h2>
              <p>
                BlockCred AI is a blockchain-based certificate verification system built
                to help institutions and employers review academic credentials with
                greater confidence. This portal presents the result provided by the
                connected verification service.
              </p>
            </div>
            <a className="about-link" href="#verify" aria-label="Go to certificate verification">
              Verify now <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>
      <Footer />

      {scannerOpen && <QrScanner onClose={() => setScannerOpen(false)} onScan={handleScan} />}
      {notification && <div className="toast-notification" role="status"><Check size={16} /> {notification}</div>}
    </>
  );
}
