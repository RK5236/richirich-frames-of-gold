import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let cx = x;
    let cy = y;
    let raf = 0;

    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(target?.dataset["cursor"] ?? null);
    };

    const loop = () => {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseleave", () => setVisible(false));
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .3s" }}
    >
      <div
        className="flex items-center justify-center rounded-full bg-foreground text-primary-foreground transition-all duration-300 ease-out"
        style={{
          width: label ? 92 : 12,
          height: label ? 92 : 12,
          fontSize: 10,
          letterSpacing: "0.18em",
          fontFamily: "var(--font-mono)",
        }}
      >
        {label}
      </div>
    </div>
  );
}
