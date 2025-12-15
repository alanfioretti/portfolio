// src/components/AboutSection.jsx
import "../styles/FileExplorer.css";

/*
    Static "About Me" section displayed inside the File Explorer.
    Pure presentational component — no external props required.
*/

const Tag = ({ children }) => <span className="tag">{children}</span>;

export default function AboutSection() {
    return (
        <div className="about-wrap">
            <h2>Hi, I’m Alan.</h2>

            <p className="about-blurb">
                Full-stack developer and analyst who loves taking messy, human problems and
                turning them into clean, usable systems. I build expressive UIs, automate the
                boring stuff, and always dig into the "why" before touching code. Air Force
                veteran, dashboard gremlin, and unapologetic enjoyer of weird, narrative
                interfaces (see: the entire experience you’re standing inside right now).
            </p>

            <div className="about-columns">
                <div className="about-card">
                    <h3>What I’m good at</h3>
                    <ul className="about-list">
                        <li>Designing fast, accessible, user-focused interfaces (React, CSS architecture)</li>
                        <li>Full-stack web apps (JS/TS, PHP, SQL)</li>
                        <li>Dashboards, KPIs, and turning data into actual stories</li>
                        <li>De-spaghettifying legacy code & workflows without losing my sanity</li>
                        <li>Clear documentation & working smoothly with non-technical folks</li>
                    </ul>
                </div>

                <div className="about-card">
                    <h3>Recent builds</h3>
                    <ul className="about-list">
                        <li>
                            <strong>The Roost:</strong> an interactive portfolio disguised as a tiny OS,
                            complete with a dialogue system, glitch effects, and a retro file-explorer interface.
                        </li>
                        <li>
                            <strong>LunaRose Tarot:</strong> a client site with custom UI, smooth animations,
                            and live testimonial integration (Vercel + Neon).
                        </li>
                    </ul>
                </div>
            </div>

            <div className="about-cta">
                <a
                    href="https://github.com/alanfioretti"
                    className="abt-btn"
                    target="_blank"
                    rel="noreferrer"
                >
                    GitHub
                </a>
            </div>

            <div className="about-stack">
                <h3>Tech I reach for</h3>
                <div className="tags">
                    <Tag>React</Tag>
                    <Tag>JavaScript</Tag>
                    <Tag>PHP</Tag>
                    <Tag>HTML/CSS</Tag>
                    <Tag>SQL (MySQL/SQL Server)</Tag>
                    <Tag>Node</Tag>
                    <Tag>Vite</Tag>
                    <Tag>Tableau</Tag>
                    <Tag>REST/JSON</Tag>
                </div>
            </div>

            <div className="about-footnote">
                <p>
                    Bonus chaos: I like teaching myself new coding languages, gamifying chores for kids,
                    building tiny roguelikes, and sketching grackles.
                </p>
            </div>
        </div>
    );
}
