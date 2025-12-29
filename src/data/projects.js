// src/data/projects.js
import {
    PROTOTYPES
} from "./prototypes";

export const PROJECTS = [{
        slug: "lunarose",
        name: "LunaRose Tarot",
        icon: "📂",
        screenshots: [
            "/screens/lunarose-1.png",
            "/screens/lunarose-2.png",
        ],
        links: {
            live: "https://lunarosetarot.vercel.app/",
            repo: "https://github.com/alanfioretti/luna-rose-tarot",
        },
        blurb: "A clean, mobile-friendly site for a tarot reader with live testimonials (Neon DB + Vercel) and a simple content flow.",
        stack: ["HTML", "CSS", "JavaScript", "Vercel", "Neon"],
        isLocked: false,
        isCorrupted: false,
        isFolder: false,
    },

    {
        slug: "rookos",
        name: "🔒 RookOS",
        icon: "📂",
        blurb: "A modular React-based operating environment exploring OS-inspired interfaces, state-driven interaction, and experimental UI design.",
        stack: ["React"],
        statusLabel: "SYSTEM LOCKED - PUBLIC ACCESS DISABLED",
        note: "RookOS is under active construction. Public deployment has been intentionally paused while core systems are refactored and hardened. Limited artifacts remain accessible.",
        previews: [{
            id: "redacted",
            label: "[ SYSTEM SNAPSHOT - REDACTED ]",
            redacted: true
        }],
        isLocked: true,
        isCorrupted: false,
        isFolder: false,
    },

    {
        slug: "portfolio",
        name: "Portfolio",
        icon: "📂",
        screenshots: [
            "/screens/portfolio-1.png",
            "/screens/portfolio-2.png",
        ],
        links: {
            live: "https://afioretti.dev",
            repo: "https://github.com/alanfioretti/portfolio",
        },
        blurb: "An interactive portfolio disguised as a tiny OS, complete with dialogue system and a retro file-explorer UI.",
        stack: ["React", "Vite", "CSS"],
        isLocked: false,
        isCorrupted: false,
        isFolder: false,
    },

    {
        slug: "prototypes",
        name: "Prototypes",
        icon: "📂",
        children: PROTOTYPES,
        isFolder: true,
        isLocked: false,
        isCorrupted: false,
        isPrototypeContainer: true,
    },
];

// Helper
export const findProject = (slug) =>
    PROJECTS.find((p) => p.slug === slug) || null;