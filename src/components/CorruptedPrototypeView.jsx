// src/components/CorruptedPrototypeView.jsx
import { useEffect, useState } from "react";
import EchoLog7B from "./cursed/EchoLog7B";
import Experiment003 from "./cursed/Experiment003";
import SkraaProtocol from "./cursed/SkraaProtocol";
import ConverterLog from "./cursed/ConverterLog";
import "../styles/CorruptedPrototypeView.css";
import "../styles/FileExplorer.css";

/*
    Corrupted prototype intro window.
    Implements a 5-phase sequence:

        1. glitch      - scrambled text reveal
        2. title       - static corrupted title
        3. lore        - autoplaying lore subtitles
        4. links       - list of corrupted buttons w/ random glitching
        5. repairing   - Win95-style repair bar before returning to main UI

    The parent registers a repair callback via 'registerRepair'.
*/

const TITLE_TEXT = "CORRUPTED :: SYSTEM BREACH";

const loreLines = [
    "Initializing corrupted file header…",
    "Crosslinking orphaned memory sectors…",
    "ACCESS GRANTED TO: P0RTF0LIO//C0RRUPTED",
    "CORRUPTION LEVEL: 87% - STABLE(ISH)",
];

export default function CorruptedPrototypeView({
    onRepair,
    registerRepair,
}) {
    const [phase, setPhase] = useState("glitch"); // glitch → title → lore → links → repairing
    const [glitchText, setGlitchText] = useState("ACCESSING...");
    const [loreIndex, setLoreIndex] = useState(0);
    const [cursedSection, setCursedSection] = useState(null);

    // Corrupted entries
    const corruptedLinks = [
        {
            label: "SIGNAL_PARSER_Δ07",
            section: "cursed_experiment_003",
            description: "Cursed text transformer"
        },
        {
            label: "THREADMAP_Fracture",
            section: "cursed_echo_log_7B",
            description: "Mini graph visualizer"
        },
        {
            label: "SKRAA_SHELL.v1rc",
            section: "cursed_skraa_protocol",
            description: "Fake command shell"
        },
        {
            label: "scry_docs//converter_v2.log",
            section: "cursed_converter",
            description: "CORRUPTED: iCloud Note Migrator → Obsidian Engine - stable-ish"
        }
    ];

    /* -------------------------------------
        Register repair trigger with parent
    ------------------------------------- */
    useEffect(() => {
        if (registerRepair) registerRepair(startRepair);
    }, [registerRepair]);

    /* -------------------------------------
        Phase 1: Glitch → Title
    ------------------------------------- */
    useEffect(() => {
        if (phase !== "glitch") return;

        const base = TITLE_TEXT;
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/?!%$@*";
        let frame = 0;

        const interval = setInterval(() => {
            frame++;

            // reveal half the characters gradually, scramble the rest
            const scrambled = base
                .split("")
                .map((char, i) =>
                    i < frame / 2
                        ? char
                        : charset[Math.floor(Math.random() * charset.length)]
                )
                .join("");

            setGlitchText(scrambled);

            // multiplier slows the tail-end for "organic" reveal
            if (frame > base.length * 1.8) {
                clearInterval(interval);
                setPhase("title");
            }
        }, 40);

        return () => clearInterval(interval);
    }, [phase]);

    /* -------------------------------------
        Phase 2: Title → Lore
    ------------------------------------- */
    useEffect(() => {
        if (phase !== "title") return;

        const timeout = setTimeout(() => setPhase("lore"), 1200);
        return () => clearTimeout(timeout);
    }, [phase]);

    /* -------------------------------------
        Phase 3: Lore autoplay sequence
    ------------------------------------- */
    useEffect(() => {
        if (phase !== "lore") return;

        // Still more lore lines to show
        if (loreIndex < loreLines.length - 1) {
            const timeout = setTimeout(() => {
                setLoreIndex((i) => i + 1);
            }, 1400);
            return () => clearTimeout(timeout);
        }

        // Finished → move to links
        const timeout = setTimeout(() => setPhase("links"), 1200);
        return () => clearTimeout(timeout);
    }, [phase, loreIndex]);

    /* -------------------------------------
        Phase 4: Intermittent button glitches
    ------------------------------------- */
    useEffect(() => {
        if (phase !== "links") return;

        let lastIndex = null;
        let startTimeout;
        let nextGlitchTimeout;

        const triggerGlitch = () => {
            const nodes = document.querySelectorAll(".cursed-link-btn");
            if (!nodes.length) return;

            // choose a random link, avoiding repeat
            let idx;
            do {
                idx = Math.floor(Math.random() * nodes.length);
            } while (idx === lastIndex && nodes.length > 1);

            lastIndex = idx;

            const target = nodes[idx];
            target.classList.add("cp-jitter");

            setTimeout(() => {
                target.classList.remove("cp-jitter");

                // schedule next glitch (2-7s)
                const delay = 2000 + Math.random() * 5000;
                nextGlitchTimeout = setTimeout(triggerGlitch, delay);
            }, 250);
        };

        // Start after a slightly random delay for "chaos"
        const initialDelay = 500 + Math.random() * 2000;
        startTimeout = setTimeout(triggerGlitch, initialDelay);

        return () => {
            clearTimeout(startTimeout);
            clearTimeout(nextGlitchTimeout);
        };
    }, [phase]);

    /* -------------------------------------
        Phase 5: Repairing animation
    ------------------------------------- */
    function startRepair() {
        setPhase("repairing");
        setTimeout(() => onRepair(), 2200);
    }

    /* -------------------------------------
        Render
    ------------------------------------- */
    return (
        <div className="corrupted-prototype-window">
            <div className={`corrupted-prototype ${phase}`}>

                {/* 1 - glitch animation */}
                {phase === "glitch" && (
                    <pre className="cp-glitch-text">{glitchText}</pre>
                )}

                {/* 2 - static corrupted title */}
                {phase === "title" && (
                    <pre className="cp-title-text">{TITLE_TEXT}</pre>
                )}

                {/* 3 - lore display */}
                {phase === "lore" && (
                    <pre className="cp-lore-text">
                        {loreLines[loreIndex]}
                    </pre>
                )}

{/* 4 - Corrupted index and corrupted detail views */}
{phase === "links" && (
    <div className="cp-links">

        {/* Header only when NOT inside a corrupted file */}
        {!cursedSection && (
            <div className="cp-links-title">AVAILABLE FILES:</div>
        )}

        {/* Corrupted view */}
        {cursedSection ? (
            <div className="cp-corrupted-container">
                {cursedSection === "cursed_experiment_003" && (
                    <Experiment003 onBack={() => setCursedSection(null)} />
                )}

                {cursedSection === "cursed_echo_log_7B" && (
                    <EchoLog7B onBack={() => setCursedSection(null)} />
                )}

                {cursedSection === "cursed_skraa_protocol" && (
                    <SkraaProtocol onBack={() => setCursedSection(null)} />
                )}

                {cursedSection === "cursed_converter" && (
                    <ConverterLog onBack={() => setCursedSection(null)} />
                )}
            </div>
        ) : (
            /* Corrupted INDEX */
            <ul className="corrupted-links">
                {corruptedLinks.map((link, i) => (
                    <li key={i}>
                        <button
                            className="cursed-link-btn"
                            onClick={(e) => {
                                setCursedSection(link.section);

                                e.target.classList.add("pending-glitch");
                                setTimeout(() => {
                                    e.target.classList.remove("pending-glitch");
                                }, 700);
                            }}
                        >
                            {link.label}
                        </button>
                    </li>
                ))}
            </ul>
        )}
    </div>
)}

                {/* 5 - Win95-style repair */}
                {phase === "repairing" && (
                    <div className="cp-repairing">
                        <div className="cp-repair-title">Scanning system integrity…</div>

                        <div className="cp-progress-bar">
                            <div className="cp-progress-fill" />
                        </div>

                        <div className="cp-repair-subtext">Applying fixes…</div>
                    </div>
                )}

            </div>
        </div>
    );
}
