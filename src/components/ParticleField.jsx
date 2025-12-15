// src/components/ParticleField.jsx
import { useEffect, useState } from "react";
import "../styles/ParticleField.css";

// Convenience RNG helper
const random = (min, max) => Math.random() * (max - min) + min;

/*
    ParticleField
    -------------
        Responsible for the “warp transition” effect between:
            DialogueBox → FileExplorer

        Behavior:
            - When `active`, the component spawns short-lived glowing particles.
            - Particles animate outward / fade (handled via CSS).
            - After a fixed delay, notifies parent via `onFieldComplete`.

        Notes:
            - The particle list is capped at 80 for performance.
            - This component intentionally runs only once per activation cycle.
*/

export default function ParticleField({
    active = false,
    color = "rgba(219,15,175,0.8)",
    onFieldComplete,
}) {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (!active) return;

        // Spawn particles at a steady cadence
        const interval = setInterval(() => {
            const id = Math.random().toString(36).slice(2);

            setParticles((prev) => {
                const next = [
                    ...prev,
                    {
                        id,
                        x: random(0, window.innerWidth),
                        y: random(0, window.innerHeight),
                        size: random(2, 6),
                        duration: random(2000, 5000),
                        delay: random(0, 1000),
                    },
                ];

                // keep only the most recent 80
                return next.length > 80 ? next.slice(-80) : next;
            });
        }, 150);

        // Wait before signaling “field complete”
        // 500ms is very short — if intentional, leave it.
        const done = setTimeout(() => {
            if (typeof onFieldComplete === "function") {
                onFieldComplete();
            }
        }, 500);

        return () => {
            clearInterval(interval);
            clearTimeout(done);
        };
    }, [active, onFieldComplete]);

    return (
        <div className="particle-field">
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="particle"
                    style={{
                        left: p.x,
                        top: p.y,
                        width: p.size,
                        height: p.size,
                        animationDuration: `${p.duration}ms`,
                        animationDelay: `${p.delay}ms`,
                        background: color,
                        boxShadow: `0 0 ${p.size * 4}px ${color}`,
                    }}
                />
            ))}
        </div>
    );
}
