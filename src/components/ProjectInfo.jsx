// src/components/ProjectInfo.jsx
import "../styles/FileExplorer.css";

/*
    Displays details for a single project inside the File Explorer.
    Pure presentational component — receives all data via props.

    Supports:
        - title
        - descriptive blurb
        - tech stack
        - screenshots
        - external links (live site / repo)
*/

export default function ProjectInfo({ project }) {
    if (!project) return null;

    const isLocked = project.status === "locked";
    const hasLiveLink = Boolean(project.links?.live);
    const hasRepoLink = Boolean(project.links?.repo);

    // Prefer explicit preview objects (e.g. redacted/system states);
    // fall back to raw screenshots if no previews are defined
    const visuals = project.previews ?? project.screenshots ?? [];


    return (
        <div className="file-info">
            {project.blurb && (
                <p className="file-blurb"><h3>{project.blurb}</h3></p>
            )}

            {project.stack?.length > 0 && (
                <div className="file-stack">
                    <span>Stack:</span>
                    <ul>
                        {project.stack.map((tech) => (
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
                            alt={`${project.name} interface preview`}
                            className="preview"
                        />
                    ))}
                </div>
            )}

            {isLocked ? (
                <div className="status-denied">
                    {project.statusLabel}
                </div>
            ) : (
                (hasLiveLink || hasRepoLink) && (
                    <div className="links">

                        {hasLiveLink && (
                            <a
                                href={project.links.live}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {project.name === "Portfolio"
                                    ? "🌀 Reboot System"
                                    : "🌐 Open Live Deployment"}
                            </a>
                        )}

                        {hasRepoLink && (
                            <a
                                href={project.links.repo}
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