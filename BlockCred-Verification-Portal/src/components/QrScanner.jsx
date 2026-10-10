import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, LoaderCircle, X } from "lucide-react";

export default function QrScanner({ onScan, onClose }) {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    let stream;
    let animationFrame;
    let detector;
    let active = true;

    async function startScanner() {
      if (!("BarcodeDetector" in window)) {
        setError(
          "QR scanning is not supported by this browser. Enter the certificate ID manually instead.",
        );
        setScanning(false);
        return;
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Camera access is not available in this browser or context.");
        setScanning(false);
        return;
      }

      try {
        const formats = await window.BarcodeDetector.getSupportedFormats();
        if (!formats.includes("qr_code")) {
          throw new Error("This browser does not support QR code detection.");
        }

        detector = new window.BarcodeDetector({ formats: ["qr_code"] });
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: { ideal: "environment" } },
        });
        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        async function scanFrame() {
          if (!active || !videoRef.current || videoRef.current.readyState < 2) {
            if (active) animationFrame = requestAnimationFrame(scanFrame);
            return;
          }

          try {
            const codes = await detector.detect(videoRef.current);
            const value = codes.find((code) => code.rawValue)?.rawValue?.trim();
            if (value) {
              onScan(value);
              return;
            }
          } catch {
            setError("The camera could not read that QR code. Try adjusting the lighting.");
          }
          if (active) animationFrame = requestAnimationFrame(scanFrame);
        }

        animationFrame = requestAnimationFrame(scanFrame);
      } catch (scanError) {
        if (active) {
          const permissionDenied = scanError?.name === "NotAllowedError";
          setError(
            permissionDenied
              ? "Camera permission was denied. Allow camera access in your browser settings, or enter the ID manually."
              : scanError?.message ?? "The camera could not be started.",
          );
          setScanning(false);
        }
      }
    }

    startScanner();

    return () => {
      active = false;
      cancelAnimationFrame(animationFrame);
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [onScan]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="scanner-title"
        aria-modal="true"
        className="scanner-modal"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="scanner-heading">
          <div>
            <span className="section-kicker">CAMERA SCANNER</span>
            <h2 id="scanner-title">Scan your certificate</h2>
          </div>
          <button className="icon-button" type="button" aria-label="Close scanner" onClick={onClose}>
            <X size={19} />
          </button>
        </div>
        <div className="scanner-preview">
          {scanning && <video ref={videoRef} aria-label="Live camera preview" muted playsInline />}
          {!scanning && (
            <div className="scanner-placeholder">
              {error ? <CameraOff size={30} /> : <Camera size={30} />}
              <span>{error ? "Camera unavailable" : "Preparing camera…"}</span>
            </div>
          )}
          {scanning && <span className="scan-frame" aria-hidden="true" />}
        </div>
        <div className={`scanner-message${error ? " has-error" : ""}`} aria-live="polite">
          {error ? (
            error
          ) : (
            <>
              <LoaderCircle className="spin" size={16} /> Point your camera at the certificate QR code.
            </>
          )}
        </div>
        <button className="button button-secondary scanner-close" type="button" onClick={onClose}>
          Close scanner
        </button>
      </section>
    </div>
  );
}
