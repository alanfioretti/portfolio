// src/components/FileExplorer.jsx
import { useState, useRef, useEffect, useCallback } from "react";
import ProjectFolder from "./ProjectFolder";
import ProjectInfo from "./ProjectInfo";
import PrototypeFolder from "./PrototypeFolder";
import PrototypeInfo from "./PrototypeInfo";
import AboutSection from "./AboutSection";
import ContactMailApp from "./ContactMailApp";
import CorruptedPrototypeView from "./CorruptedPrototypeView";
import { PROJECTS, findProject } from "../data/projects";
import { PROTOTYPES, findPrototype } from "../data/prototypes";
import ScrollablePane from "./ScrollablePane";
import "../styles/FileExplorer.css";

/*
    Main OS-style file explorer.
        Controls:
        - top-level section navigation (root / about / projects / contact)
        - project selection inside the Projects folder
        - prototype selection inside Projects > Prototypes
        - corrupted prototype flow and repair sequence

    UI mode is defined by 'activeSection', 'activeProject' and 'activePrototype'.
*/

const SECTION_TITLES = {
    null: "portfolio.exe",
    about: "About Me.txt",
    projects: "Projects",
    resume: "Resume.pdf",
    contact: "Contact.exe",
    prototypes: "Prototypes",
    corrupted: "System Fault",
};

const SECTION_ICONS = {
    null: "💾",
    about: "📄",
    projects: "📁",
    resume: "📄",
    contact: "✉️",
    prototypes: "🧪",
    corrupted: "⚠"
};

export default function FileExplorer() {
    const [activeSection, setActiveSection] = useState(null);
    const [activeProject, setActiveProject] = useState(null);
    const [activePrototype, setActivePrototype] = useState(null);
    const [parentProject, setParentProject] = useState(null);
    const [resumeOpen, setResumeOpen] = useState(false);

    const [view, setView] = useState("root");
    // "root" | "projects" | "project" | "prototypes" | "prototype" | "about" | "contact"

    // callback provided by CorruptedPrototypeView for triggering its repair animation
    const repairRef = useRef(null);

    const title =
        activePrototype?.isCorrupted
            ? SECTION_TITLES.corrupted
            : activePrototype?.name ??
            activeProject?.name ??
            SECTION_TITLES[activeSection] ??
            "portfolio.exe";

    const icon =
        activePrototype?.isCorrupted
            ? "⚠"
            : SECTION_ICONS[activeSection] ?? "💾";

    const openSection = (section) => {
        setActiveProject(null);
        setActivePrototype(null);

        if (!section) {
            setActiveSection(null);
            setView("root");
            return;
        }

        setActiveSection(section);
        setView(section);
    };

    const openProject = (slug) => {
        const project = findProject(slug);
        if (!project) return;

        setActiveProject(project);
        setActivePrototype(null);

        if (project.isPrototypeContainer) {
            setParentProject(project);   // remember where we came from
            setActiveSection("prototypes");
            setView("prototypes");
        } else {
            setView("project");
        }
    };

    const openPrototype = (slug) => {
        const prototype = findPrototype(slug);
        if (!prototype) return;

        setActivePrototype(prototype);
        setView("prototype");
    };

    const handleBack = () => {
        if (activePrototype?.isCorrupted) {
            repairRef.current?.();
            return;
        }

        switch (view) {
            case "prototype":
                setActivePrototype(null);
                setView("prototypes");
                break;

            case "prototypes":
                setActiveProject(null); // restore project context
                setActiveSection("projects");
                setView("projects");
                break;

            case "project":
                setActiveProject(null);
                setView("projects");
                break;

            case "projects":
            case "about":
            case "contact":
                openSection(null);
                break;

            default:
                openSection(null);
        }
    };

    const [scrollHint, setScrollHint] = useState({
        hasOverflow: false,
        hasScrolled: false,
    });

    const [showHint, setShowHint] = useState(false);
    const [fadeHint, setFadeHint] = useState(false);

    const handleHintState = useCallback(
        (state) => {
            if (view === "root") return;
            setScrollHint(state);
        },
        [view]
    );

    // Hard reset hint state on every view change to prevent "ghost hint"
    useEffect(() => {

        setScrollHint({ hasOverflow: false, hasScrolled: false });
        setShowHint(false);
        setFadeHint(false);
    }, [view]);

    useEffect(() => {
        // Hint should be visible
        if (scrollHint.hasOverflow && !scrollHint.hasScrolled) {
            setShowHint(true);
            setFadeHint(false);
            return;
        }

        // Hint should fade out
        if (showHint) {
            setFadeHint(true);

            const t = setTimeout(() => {
                setShowHint(false);
            }, 600);

            return () => clearTimeout(t);
        }
    }, [scrollHint.hasOverflow, scrollHint.hasScrolled, showHint]);



    return (
        <div
            className={`file-explorer ${activePrototype?.isCorrupted ? "corrupted-mode" : ""
                } ${activeSection ? "expanded" : ""}`}
        >

            {/* Window Title Bar */}
            <div className="window-title">
                <span className="window-title-text">
                    {icon} {title}
                </span>

                {activeSection && (
                    <button
                        className="back-btn"
                        type="button"
                        onClick={handleBack}
                    >
                        {activePrototype?.isCorrupted ? "🔧 Scan & Fix" : "← Back"}
                    </button>
                )}
            </div>
            <ScrollablePane resetKey={view} onHintState={handleHintState}>

                {/* ROOT DIRECTORY */}
                {view === "root" && (
                    <ul className="root-list">
                        <li>
                            <button className="tree-item" onClick={() => openSection("about")}>
                                About Me.txt
                            </button>
                        </li>

                        <li>
                            <button className="tree-item" onClick={() => openSection("projects")}>
                                Projects
                            </button>
                        </li>

                        <li>
                            <button
                                type="button"
                                className="tree-item"
                                onClick={() => setResumeOpen((v) => !v)}
                            >
                                Resume.pdf
                            </button>

                            {resumeOpen && (
                                <ul className="child-list">
                                    <li>
                                        <a className="child-link" href="Alan_Fioretti_Resume.pdf" target="_blank">
                                            Open
                                        </a>
                                    </li>
                                    <li>
                                        <a className="child-link" href="Alan_Fioretti_Resume.pdf" download>
                                            Download
                                        </a>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li>
                            <button className="tree-item" onClick={() => openSection("contact")}>
                                Contact.exe
                            </button>
                        </li>
                    </ul>
                )}

                {/* PROJECT LIST */}
                {view === "projects" && !activeProject && (
                    <div className="folder-tile-view">
                        {PROJECTS.map((p) => (
                            <ProjectFolder
                                key={p.slug}
                                name={p.name}
                                icon={p.icon}
                                isLocked={p.isLocked}
                                isCorrupted={p.isCorrupted}
                                onOpen={() => openProject(p.slug)}
                            />
                        ))}
                    </div>
                )}

                {/* PROJECT DETAIL */}
                {view === "project" && activeProject && (
                    activeProject.slug === "projects" ? (
                        <ProjectFolder
                            folder={activeProject}
                            onOpen={openProject}
                        />
                    ) : (
                        <ProjectInfo project={activeProject} />
                    )
                )}

                {/* PROTOTYPE LIST */}
                {view === "prototypes" && !activePrototype && (
                    <div className="folder-tile-view">
                        {PROTOTYPES.map((p) => (
                            <PrototypeFolder
                                key={p.slug}
                                name={p.name}
                                icon={p.icon}
                                isLocked={p.isLocked}
                                isCorrupted={p.isCorrupted}
                                onOpen={() => openPrototype(p.slug)}
                            />
                        ))}
                    </div>
                )}

                {/* PROTOTYPE DETAIL */}
                {view === "prototype" && activePrototype && (
                    activePrototype.isCorrupted ? (
                        <CorruptedPrototypeView
                            registerRepair={(fn) => (repairRef.current = fn)}
                            onRepair={() => {
                                setActivePrototype(null);
                                setView("prototypes");
                            }}
                        />
                    ) : (
                        <PrototypeInfo prototype={activePrototype} />
                    )
                )}

                {/* ABOUT */}
                {activeSection === "about" && <AboutSection />}

                {/* CONTACT */}
                {activeSection === "contact" && <ContactMailApp />}

            </ScrollablePane>

            {showHint && (
                <div className={`scroll-hint-overlay ${fadeHint ? "fade-out" : ""}`}>
                    <div className="scroll-gutter-hint">
                        ▼ scroll for more
                    </div>
                </div>
            )}
        </div>

    );
}
