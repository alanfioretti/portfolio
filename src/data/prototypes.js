// src/data/prototypes.js

export const PROTOTYPES = [
    {
        slug: "rook-glitch-switcher",
        name: "Rook Glitch Switcher",
        icon: "📂",
        screenshots: [
            "/screens/rook-glitch.png",
        ],
        links: {
            live: "https://rook-glitch-switcher.netlify.app",
            repo: "https://github.com/alanfioretti/rook-glitch-switcher",
        },
        blurb: "A React/Vite UI experiment exploring theme state, visual feedback, and intentional glitch-styled transitions.",
        stack: ["React", "Vite", "CSS"],
        isLocked: false,
        isCorrupted: false,
        isFolder: false,
    },

    {
        slug: "rook-card-sorter",
        name: "Rook Card Sorter",
        icon: "📂",
        screenshots: [
            "/screens/rook-sort.png",
        ],
        links: {
            live: "https://rook-card-sorter.netlify.app",
            repo: "https://github.com/alanfioretti/rook-card-sorter",
        },
        blurb: "An interactive card-based interface demonstrating sorting logic, UI state transitions, and constraint-driven layout behavior.",
        stack: ["React", "Vite", "CSS"],
        isLocked: false,
        isCorrupted: false,
        isFolder: false,
    },

    {
        slug: "rook-task-list",
        name: "Rook Task List",
        icon: "📂",
        screenshots: [
            "/screens/rook-task.png",
        ],
        links: {
            live: "https://rook-task-list.netlify.app",
            repo: "https://github.com/alanfioretti/rook-task-list",
        },
        blurb: "A terminal-inspired task manager exploring state management, user feedback, and personality-driven UI responses.",
        stack: ["React", "Vite", "CSS"],
        isLocked: false,
        isCorrupted: false,
        isFolder: false,
    },

    {
        slug: "corrupted",
        name: "Corrupted",
        icon: "📂",
        isLocked: false,
        isCorrupted: true,
        isFolder: false,
    },
];

// Helper
export const findPrototype = (slug) =>
    PROTOTYPES.find((p) => p.slug === slug) || null;