// src/components/PrototypeInfo.jsx
import "../styles/FileExplorer.css";

/*
    Displays details for a single prototype inside the File Explorer.
    Pure presentational component - receives all data via props.

    Supports:
        - title
        - descriptive blurb
        - tech stack
        - screenshots
        - external links (live demo / repo)
*/


export default function PrototypeInfo({ prototype }) {
    if (!prototype) return null;

    const isLocked = prototype.isLocked === true;
    const hasLiveLink = Boolean(prototype.links?.live);
    const hasRepoLink = Boolean(prototype.links?.repo);

    // Prefer explicit preview objects (e.g. redacted/system states);
    // fall back to raw screenshots if no previews are defined
    const visuals = prototype.previews ?? prototype.screenshots ?? [];


    return (
        <div className="file-info">
            {prototype.blurb && (
                <div className="file-blurb"><h3>{prototype.blurb}</h3></div>
            )}

            {prototype.stack?.length > 0 && (
                <div className="file-stack">
                    <span>Stack:</span>
                    <ul>
                        {prototype.stack.map((tech) => (
                            <li key={tech}>{tech}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Locked / redacted preview */}
            {isLocked && visuals.length > 0 && visuals[0]?.redacted && (
                <div
                    className="preview-redacted"
                    title="Access restricted"
                >
                    {visuals[0].label}
                </div>
            )}

            {/* Normal screenshot gallery */}
            {!isLocked && visuals.length > 0 && (
                <div className="file-visuals">
                    {visuals.map((item, index) => (
                        <img
                            key={index}
                            src={item}
                            alt={`${prototype.name} interface preview`}
                            className="preview"
                        />
                    ))}
                </div>
            )}

            {isLocked ? (
                <div className="status-denied">
                    {prototype.statusLabel}
                </div>
            ) : (
                (hasLiveLink || hasRepoLink) && (
                    <div className="links">

                        {hasLiveLink && (
                            <a
                                href={prototype.links.live}
                                target="_blank"
                                rel="noreferrer"
                            >
                                🌐 View Live Demo
                            </a>
                        )}

                        {hasRepoLink && (
                            <a
                                href={prototype.links.repo}
                                target="_blank"
                                rel="noreferrer"
                            >
                                💻 Inspect Source
                            </a>
                        )}

                    </div>
                )
            )}


        </div>
    )
}