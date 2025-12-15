// src/components/DialogueBox.jsx
import { useState, useEffect } from "react";
import "../styles/DialogueBox.css";

/*
    Simple two-line intro dialogue with typewriter effect.
    User can:
        - click to skip current line typing
        - click again to advance to next line
        - trigger onComplete after final message

    All dialogue timing + progression handled locally.
*/

const messages = [
    { speaker: "rook", text: "Hey. Wake up." },
    { speaker: "grackle", text: "Ugh... fine. Activating the node." },
];

export default function DialogueBox({ onComplete = () => { } }) {
    const [current, setCurrent] = useState(0);       // which message index
    const [displayed, setDisplayed] = useState(""); // visible portion of text
    const [charIndex, setCharIndex] = useState(0);   // typewriter position

    // Typewriter effect
    useEffect(() => {
        const fullText = messages[current].text;

        if (charIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayed((prev) => prev + fullText.charAt(charIndex));
                setCharIndex((i) => i + 1);
            }, 40);

            return () => clearTimeout(timeout);
        }
    }, [charIndex, current]);

    // Handles skipping typing or advancing dialogue
    const handleClick = () => {
        const fullText = messages[current].text;

        // Skip to full line if still typing
        if (charIndex < fullText.length) {
            setDisplayed(fullText);
            setCharIndex(fullText.length);
            return;
        }

        // Move to next message
        if (current < messages.length - 1) {
            setCurrent((c) => c + 1);
            setDisplayed("");
            setCharIndex(0);
            return;
        }

        // Finished dialogue
        onComplete();
    };

    const speaker = messages[current].speaker;

    return (
        <div className={`dialogue-box ${speaker}`} onClick={handleClick}>
            <p>{displayed}</p>

            {/* click hint appears only after line finishes typing */}
            {charIndex >= messages[current].text.length && (
                <span className="click-hint">[ ... ]</span>
            )}
        </div>
    );
}
