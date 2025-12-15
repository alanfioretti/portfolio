// src/components/cursed/MiniGraph.jsx
import { useEffect, useRef } from "react";
import "../../styles/CorruptedPrototypeView.css";

/*
    MiniGraph
    ----------
    A tiny chaotic graph visualizer that rebuilds itself every
    time the user clicks the canvas.

    Implementation notes:
        • Using a custom DOM event ("build") instead of React state
        to trigger redraws. This is intentionally cursed, consistent
        with the "broken lab prototype" aesthetic.
        • React mounts → effect attaches a listener → clicking canvas
        dispatches the "build" event → graph redraws.
*/

export default function MiniGraph({ onBack }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // tiny helper for RNG
        const random = (min, max) => Math.random() * (max - min) + min;

        // full draw cycle
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // random node cloud
            const nodes = Array.from({ length: 18 }, () => ({
                x: random(20, canvas.width - 20),
                y: random(20, canvas.height - 20),
            }));

            // light/delicate connections
            ctx.strokeStyle = "#ff44ee33";
            nodes.forEach((a) => {
                nodes.forEach((b) => {
                    if (Math.random() < 0.07) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                });
            });

            // nodes
            ctx.fillStyle = "#ff4aff";
            nodes.forEach((n) => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
                ctx.fill();
            });
        };

        // initial build
        draw();

        // redraw on custom "build" event
        const handler = () => draw();
        canvas.addEventListener("build", handler);

        return () => {
            canvas.removeEventListener("build", handler);
        };
    }, []);

    return (
        <div className="cp-prototype-view">

            <div className="cp-prototype-title">graph_seedling_visualizer</div>

            <div className="cp-prototype-subtext">
                STATUS: <span className="ok">Chaotic neutral</span>
                <br />
                click anywhere on the graph to regenerate
            </div>

            <canvas
                ref={canvasRef}
                width={360}
                height={220}
                className="cp-graph-canvas"
                onClick={() => {
                    // cursed redraw trigger
                    const evt = new Event("build");
                    canvasRef.current.dispatchEvent(evt);
                }}
            />

            <button className="cp-back-btn" onClick={onBack}>
                ← return to prototype index
            </button>
        </div>
    );
}
