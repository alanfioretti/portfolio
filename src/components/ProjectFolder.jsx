// src/components/ProjectFolder.jsx
import "../styles/ProjectFolder.css";

/*
    Simple, accessible folder tile used in the Projects view.
    Parent controls all behavior; this component is purely presentational.
*/

export default function ProjectFolder({
    name,
    onOpen,
    icon = "📁",
    title = name,
    isLocked = false
}) {
    return (
        <button
            type="button"
            className={`folder-tile ${isLocked ? "folder-locked" : ""}`}
            onClick={onOpen}
            aria-label={`Open project ${title}`}
            title={title}
        >
            <div className="folder-icon">{icon}</div>
            <div className="folder-label">{name}</div>
        </button>
    );
}