import { useRef, useState } from "react";

function selectNodeText(node) {
  const range = document.createRange();
  range.selectNodeContents(node);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}

export default function CodeBlock({ code, label, small = false }) {
  const [status, setStatus] = useState("idle"); // idle | copied | select-fallback
  const codeRef = useRef(null);

  async function handleCopy() {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(code);
        setStatus("copied");
        setTimeout(() => setStatus("idle"), 1500);
        return;
      } catch {
        // fall through to legacy/manual fallback
      }
    }

    // Fallback 1: hidden textarea + execCommand
    try {
      const textarea = document.createElement("textarea");
      textarea.value = code;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (ok) {
        setStatus("copied");
        setTimeout(() => setStatus("idle"), 1500);
        return;
      }
    } catch {
      // fall through to manual selection
    }

    // Fallback 2: select the visible text so the user can Cmd/Ctrl+C manually
    if (codeRef.current) selectNodeText(codeRef.current);
    setStatus("select-fallback");
    setTimeout(() => setStatus("idle"), 2500);
  }

  return (
    <div className={`code-block ${small ? "code-block-small" : ""}`}>
      {label && <div className="code-block-label">{label}</div>}
      <div className="code-block-row">
        <pre className="code-block-pre">
          <code ref={codeRef}>{code}</code>
        </pre>
        <button
          type="button"
          className="code-block-copy"
          onClick={handleCopy}
          aria-label="Copy command"
        >
          {status === "copied" ? "Copied!" : status === "select-fallback" ? "Selected — ⌘/Ctrl+C" : "Copy"}
        </button>
      </div>
    </div>
  );
}
