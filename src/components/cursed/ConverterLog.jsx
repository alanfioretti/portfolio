// src/components/cursed/ConverterLog.jsx
import "../../styles/CorruptedPrototypeView.css";

/*
    scry_docs//converter_v2.log
    ---------------------------
    Display pane for the Python-based iCloud → Obsidian
    Markdown migration engine.

    Shows a summarized log + link to full script on GitHub.
*/

export default function ConverterLog({ onBack }) {
    return (
        <div className="cp-prototype-view">

            <div className="cp-prototype-title">scry_docs//converter_v2.log</div>

            <div className="cp-prototype-subtext">
                Obsidian Markdown Migration Engine - v2
                <br />
                STATUS: <span className="ok">Operational</span>
            </div>

            <div className="cp-log-snippet">
                {`> INIT   :: md_converter_v2
> SCAN   :: 142 files detected
> CLEAN  :: orphaned folder structures flattened
> TAGS   :: injected at EOF (multi-category)
> OUT    :: Conversion/*.md

process completed successfully.`}
            </div>

            <a
                className="cp-ext-link"
                href="https://github.com/alanfioretti/obsidian-markdown-migration"
                target="_blank"
                rel="noreferrer"
            >
                view full script on github →
            </a>
            <br />
            <button className="cp-back-btn" onClick={onBack}>
                ← return to prototype index
            </button>

        </div>
    );
}
