import {
  AlertCircle,
  ArrowUpRight,
  Check,
  CircleHelp,
  FileCheck2,
  Printer,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
  Copy,
} from "lucide-react";

function present(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function safeExplorerUrl(value) {
  if (!present(value)) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function ResultField({ label, value, copyable = false, onCopy }) {
  if (!present(value)) return null;
  return (
    <div className="result-field">
      <span>{label}</span>
      <div className="result-field-value">
        <strong title={value}>{value}</strong>
        {copyable && (
          <button
            aria-label={`Copy ${label.toLowerCase()}`}
            className="copy-button"
            onClick={() => onCopy(value, label)}
            type="button"
          >
            <Copy size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

function formatDate(value) {
  if (!present(value)) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeZone: "UTC",
      }).format(date);
}

function formatDateTime(value) {
  if (!present(value)) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(date);
}

export default function VerificationResult({ result, certificateId, onCopy, onRetry }) {
  const credential = result.credential ?? {};
  const mismatch = result.status === "integrity_mismatch";
  const verified = result.status === "verified";
  const unavailable = result.status === "unavailable";
  const titles = {
    verified: "Certificate Verified",
    integrity_mismatch: "Integrity Mismatch",
    not_found: "Certificate Record Not Found",
    unavailable: "Verification Temporarily Unavailable",
    incomplete: "Verification Incomplete",
  };
  const title = titles[result.status] ?? "Verification Result";
  const statusIcon = verified ? (
    <ShieldCheck size={22} />
  ) : mismatch ? (
    <ShieldAlert size={22} />
  ) : unavailable ? (
    <AlertCircle size={22} />
  ) : (
    <ShieldQuestion size={22} />
  );
  const transactionUrl = safeExplorerUrl(result.transactionUrl);
  const hashMatch = result.hashMatch === true;

  return (
    <section
      aria-live="polite"
      aria-labelledby="result-title"
      className={`result-card result-${result.status}`}
      id="verification-result"
    >
      <div className="result-header">
        <div className="result-status-icon">{statusIcon}</div>
        <div>
          <span className="section-kicker">VERIFICATION RESULT</span>
          <h2 id="result-title">{title}</h2>
          <p>
            {result.message ||
              (verified
                ? "The verification service confirmed this certificate."
                : mismatch
                  ? "The certificate does not match the trusted record."
                  : result.status === "not_found"
                    ? "No registered record was found. This does not automatically mean the certificate is fake."
                    : unavailable
                      ? "The verification service could not complete your request."
                      : "The service did not provide enough information to determine certificate integrity.")}
          </p>
        </div>
      </div>

      {verified && (
        <>
          <div className="result-divider" />
          <div className="result-fields">
            <ResultField label="Certificate ID" value={credential.credentialId || certificateId} onCopy={onCopy} copyable />
            <ResultField
              label="Student name"
              value={credential.studentName || credential.fullName}
              onCopy={onCopy}
            />
            <ResultField label="Degree" value={credential.degree || credential.title} />
            <ResultField
              label="Issuing institute"
              value={
                credential.issuingInstitute ||
                credential.instituteName ||
                credential.institutionName ||
                credential.issuer
              }
            />
            <ResultField
              label="Issue date"
              value={formatDate(credential.issueDate || credential.issuedAt)}
            />
           
            
            <ResultField
              label="Verification timestamp"
              value={formatDateTime(result.verificationTimestamp)}
            />
          </div>
          {(hashMatch || transactionUrl) && (
            <div className="integrity-confirmation">
              {hashMatch && (
                <span>
                  <Check size={16} /> Hash matches the trusted record
                </span>
              )}
              {transactionUrl && (
                <a href={transactionUrl} rel="noreferrer" target="_blank">
                  View blockchain transaction <ArrowUpRight size={15} />
                </a>
              )}
            </div>
          )}
        </>
      )}

      {(mismatch || result.status === "not_found" || result.status === "incomplete") && (
        <div className="result-note">
          <CircleHelp size={17} />
          {mismatch
            ? "Do not rely on this copy as authentic. Contact the issuing institution to review the trusted record."
            : result.status === "not_found"
              ? "Check the certificate ID for typing errors, or contact the issuing institution to confirm registration."
              : "No integrity conclusion has been provided. Contact the issuer or try again later."}
        </div>
      )}

      <div className="result-actions">
        {(unavailable || result.status === "incomplete") && (
          <button className="button button-primary button-small" onClick={onRetry} type="button">
            <FileCheck2 size={16} /> Try again
          </button>
        )}
        {verified && (
          <button className="button button-secondary button-small print-button" onClick={() => window.print()} type="button">
            <Printer size={16} /> Print report
          </button>
        )}
      </div>
      <div className="print-report-footer">
        BlockCred AI · Blockchain-Based Certificate Verification System
      </div>
    </section>
  );
}
