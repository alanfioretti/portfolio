// src/components/cursed/SkraaProtocol.jsx
import { useEffect, useRef, useState } from "react";
import "../../styles/CorruptedPrototypeView.css";

/*
    SKRAA_SHELL.v1rc (SAFE UPGRADE)
    -------------------------------
    Fake command shell featuring:
        • minimal command parser
        • randomized avian responses
        • auto-scroll behavior
        • real “clear” wipe
        • input sanitization to avoid HTML weirdness

    Still absolutely not a real shell.
*/

export default function SkraaProtocol({ onBack }) {
    const [lines, setLines] = useState([
        "> booting skraa shell...",
        "> establishing avian uplink...",
        "> connection: unstable",
        ""
    ]);

    const [cmd, setCmd] = useState("");
    const terminalRef = useRef(null);

    // --- Safety: sanitize input -----------------------------------
    const sanitize = (s = "") =>
        s.replace(/[<>]/g, "")
            .replace(/script/gi, "")
            .replace(/javascript:/gi, "");

    // --- Auto-scroll to bottom whenever lines update --------------
    useEffect(() => {
        const el = terminalRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [lines]);

    // --- Response map ----------------------------------------------
    const responses = {
        help: [
            "> available commands:",
            "  help    - list commands",
            "  ping    - test connection",
            "  skraa   - ???",
            "  clear   - wipe buffer",
            ""
        ],

        ping: [
            "> sending packet...",
            `> response: caw // latency ${Math.floor(Math.random() * 20) + 5}ms // integrity ${Math.floor(Math.random() * 60) + 20}%`,
            ""
        ],

        skraa: [
            "> SKRAA??",
            "> SKRAAAAAAAAAAAAAAAAAA",
            "> warning: user provoked bird",
            ""
        ],

        clear: []
    };

    const fallback = [
        "> unknown command",
        "> consult help (if brave)",
        ""
    ];

    // --- Command Execution -----------------------------------------
    const run = () => {
        const clean = sanitize(cmd.trim().toLowerCase());
        if (!clean) return;

        // CLEAR: wipe entire buffer
        if (clean === "clear") {
            setLines(["-- buffer cleared --", ""]);
            setCmd("");
            return;
        }

        const out = responses[clean] || fallback;

        setLines((prev) => [...prev, `> ${clean}`, ...out]);
        setCmd("");
    };

    // ------------------------------------------------------------------
    // Render
    // ------------------------------------------------------------------
    return (
        <div className="cp-prototype-view">

            <div className="cp-prototype-title">SKRAA_SHELL.v1rc</div>

            <div className="cp-prototype-subtext">
                STATUS: <span className="ok">Volatile</span>
            </div>

            <div className="cp-terminal" ref={terminalRef}>
                {lines.map((l, i) => (
                    <pre key={i}>{l}</pre>
                ))}
            </div>

            <input
                className="cp-terminal-input"
                value={cmd}
                onChange={(e) => setCmd(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && run()}
                placeholder="enter command"
                autoFocus
            />

            <button className="cp-back-btn" onClick={onBack}>
                ← return to prototype index
            </button>
        </div>
    );
}
