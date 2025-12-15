// src/components/cursed/Experiment003.jsx
import { useState } from "react";
import "../../styles/CorruptedPrototypeView.css";

/*
    SIGNAL_PARSER_Δ07 (SAFE EDITION)
    --------------------------------
    A cursed text transformer that:
        • corrupts text for fun
        • never executes or evaluates input
        • never injects HTML
        • displays everything as literal text

    This version includes:
        ✓ input sanitization (strip HTML-like tags)
        ✓ safe text rendering
        ✓ toggle between original + corrupted output
*/

export default function Experiment003({ onBack }) {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    const [original, setOriginal] = useState("");
    const [showOriginal, setShowOriginal] = useState(false);

    // --- sanitization / safety guard -------------------------
    function sanitize(str = "") {
        // remove angle brackets & common injection triggers
        return str
            .replace(/[<>]/g, "")         // no tags
            .replace(/script/gi, "")      // no funny business
            .replace(/javascript:/gi, "") // no protocol tricks
            .replace(/&/g, "&amp;")       // escape entities
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    // random unicode noise (safe)
    const noise = () =>
        String.fromCharCode(0x2500 + Math.floor(Math.random() * 80));

    // transformation pipeline (safe & unchanged)
    const transform = (text) => {
        if (!text.trim()) return "";

        // base64 layer
        let t = btoa(text);

        // random rot-ish shift
        const shift = Math.floor(Math.random() * 13) + 1;
        t = t
            .split("")
            .map((c) =>
                /[A-Za-z]/.test(c)
                    ? String.fromCharCode(
                        c.charCodeAt(0) +
                        shift +
                        (Math.random() < 0.2 ? -2 : 0)
                    )
                    : c
            )
            .join("");

        // sprinkle noise
        t = t
            .split("")
            .map((c) => (Math.random() < 0.1 ? noise() : c))
            .join("");

        return t;
    };

    function runTransform() {
        if (!input.trim()) return;

        const safe = sanitize(input);
        setOriginal(safe);                  // store safe text
        const corrupted = transform(safe);  // corrupt safe version
        setOutput(corrupted);
        setShowOriginal(false);
    }

    return (
        <div className="cp-prototype-view">

            <div className="cp-prototype-title">SIGNAL_PARSER_Δ07</div>

            <div className="cp-prototype-subtext">
                STATUS: <span className="ok">Operational, safely cursed</span>
            </div>

            <textarea
                className="cp-input"
                placeholder="enter signal..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
            />

            <div className="cp-action-row">
                <button className="cp-action-btn" onClick={runTransform}>
                    run transform
                </button>

                <button
                    className="cp-action-btn"
                    disabled={!original}
                    onClick={() => setShowOriginal((v) => !v)}
                >
                    {showOriginal ? "show corrupted" : "show original"}
                </button>
            </div>

            {output && (
                <div className="cp-output-block">
                    <pre>{showOriginal ? original : output}</pre>
                </div>
            )}

            <br />

            <button className="cp-back-btn" onClick={onBack}>
                ← return to prototype index
            </button>
        </div>
    );
}
