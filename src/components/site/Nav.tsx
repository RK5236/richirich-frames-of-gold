import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Magnetic } from "./Magnetic";

const items = [
  { label: "WORK", to: "/#work" },
  { label: "ABOUT", to: "/#about" },
  { label: "SERVICES", to: "/#services" },
  { label: "CONTACT", to: "/#contact" },
];

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > last && y > 240 && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 edge transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${scrolled ? "bg-background/60 backdrop-blur-xl" : ""}`}
      >
        <nav className="flex items-center justify-between py-5">
          <Link
            to="/"
            className="font-display text-sm font-extrabold uppercase tracking-[0.28em]"
            data-cursor="HOME"
          >
            Richi Rich
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {items.map((i) => (
              <a
                key={i.label}
                href={i.to}
                className="label link-underline text-foreground/70 transition-colors hover:text-foreground"
              >
                {i.label}
              </a>
            ))}
            <Magnetic>
              <a
                href="/#contact"
                data-cursor="LET'S TALK"
                className="group inline-flex items-center gap-2 border border-foreground/40 px-5 py-2.5 text-[11px] font-mono uppercase tracking-[0.22em] transition-colors duration-500 hover:bg-foreground hover:text-primary-foreground"
              >
                Let's Talk
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </a>
            </Magnetic>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[7px] md:hidden"
          >
            <span
              className={`block h-px w-7 bg-foreground transition-transform duration-500 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-7 bg-foreground transition-transform duration-500 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 grain bg-background transition-[clip-path] duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open ? "[clip-path:inset(0_0_0%_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <div className="edge flex h-full flex-col justify-between pb-12 pt-28">
          <div className="flex flex-col gap-2">
            {items.map((i, n) => (
              <a
                key={i.label}
                href={i.to}
                onClick={() => setOpen(false)}
                className="font-display text-[13vw] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] transition-opacity"
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(24px)",
                  transition: `all .7s cubic-bezier(.16,1,.3,1) ${n * 70 + 120}ms`,
                }}
              >
                {i.label}
              </a>
            ))}
          </div>
          <div className="space-y-2">
            <p className="label">Noida / India</p>
            <a href="mailto:richirichhq@gmail.com" className="block text-sm text-smoke">
              richirichhq@gmail.com
            </a>
            <a href="tel:+917999229700" className="block text-sm text-smoke">
              +91 79992 29700
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
