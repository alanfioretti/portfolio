import { useEffect, useRef, useState } from "react";

export default function ScrollablePane({ children, resetKey, onHintState }) {
    const paneRef = useRef(null);
    const [hasOverflow, setHasOverflow] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const userInteractedRef = useRef(false);
    const scrollTimeoutRef = useRef(null);

    /* --------------------------------------------------
        Scroll + intent detection (mount only)
    -------------------------------------------------- */
    useEffect(() => {
        const pane = paneRef.current;
        if (!pane) return;

        const markScrollIntent = () => {
            userInteractedRef.current = true;
        };

        const handleScroll = () => {
            // Only dismiss after the user has clearly intended to scroll
            if (!userInteractedRef.current) return;
            if (pane.scrollTop <= 8) return;

            if (!scrollTimeoutRef.current) {
                scrollTimeoutRef.current = setTimeout(() => {
                    setHasScrolled(true);
                }, 400);
            }
        };

        pane.addEventListener("wheel", markScrollIntent, { passive: true });
        pane.addEventListener("touchstart", markScrollIntent, { passive: true });
        pane.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(scrollTimeoutRef.current);
            scrollTimeoutRef.current = null;

            pane.removeEventListener("wheel", markScrollIntent);
            pane.removeEventListener("touchstart", markScrollIntent);
            pane.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /* --------------------------------------------------
        Navigation reset (new section = fresh scroll)
    -------------------------------------------------- */
    useEffect(() => {
        setHasScrolled(false);
        userInteractedRef.current = false;
        scrollTimeoutRef.current = null;

        const pane = paneRef.current;
        if (pane) pane.scrollTop = 0;
    }, [resetKey]);

    /* --------------------------------------------------
        Overflow detection (after layout settles)
        Uses scroll RANGE, not raw height comparison.
    -------------------------------------------------- */
    useEffect(() => {
        const pane = paneRef.current;
        if (!pane) return;

        let settleTimer = null;

        const measure = () => {
            const maxScrollTop = pane.scrollHeight - pane.clientHeight;
            const canScroll = maxScrollTop > 2;
            setHasOverflow(canScroll);
        };

        const observer = new ResizeObserver(() => {
            // Layout is changing - wait for it to settle
            clearTimeout(settleTimer);
            settleTimer = setTimeout(measure, 120);
        });

        observer.observe(pane);

        // Initial delayed measurement (after first render)
        settleTimer = setTimeout(measure, 120);

        return () => {
            clearTimeout(settleTimer);
            observer.disconnect();
        };
    }, [children, resetKey]);

    /* --------------------------------------------------
        Report state upward (FileExplorer owns chrome)
    -------------------------------------------------- */
    useEffect(() => {
        onHintState?.({ hasOverflow, hasScrolled });
    }, [hasOverflow, hasScrolled, onHintState]);

    return (
        <div ref={paneRef} className="ScrollablePane scrollable-pane">
            {children}
        </div>
    );
}