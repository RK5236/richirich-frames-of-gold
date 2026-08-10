import { Link } from "@tanstack/react-router";
import { Marquee } from "./Marquee";

export function Footer() {
  return (
    <footer className="hairline-t edge grain relative overflow-hidden pb-10 pt-20">
      <Marquee
        items={["SEE YOU ON THE NEXT FRAME", "TRY US ONCE. YOU'LL STICK AROUND"]}
        className="label mb-16 -mx-5 md:-mx-10 xl:-mx-16"
        duration={44}
      />

      <h2 className="text-[16vw] leading-[0.82] md:text-[13vw]">Richi Rich</h2>

      <div className="mt-12 grid gap-10 md:grid-cols-4">
        <div>
          <p className="label mb-3">Studio</p>
          <p className="text-sm text-smoke">Creative Production</p>
          <p className="text-sm text-smoke">Noida, India</p>
          <p className="text-sm text-smoke">richirichhq.in</p>
        </div>
        <div>
          <p className="label mb-3">Menu</p>
          {["WORK", "ABOUT", "SERVICES", "CONTACT"].map((l) => (
            <a
              key={l}
              href={`/#${l.toLowerCase()}`}
              className="block text-sm text-smoke transition-colors hover:text-foreground"
            >
              {l}
            </a>
          ))}
        </div>
        <div>
          <p className="label mb-3">Elsewhere</p>
          <a
            href="https://www.instagram.com/richirich.hq/"
            target="_blank"
            rel="noreferrer"
            className="block text-sm text-smoke transition-colors hover:text-foreground"
          >
            INSTAGRAM
          </a>
          <a
            href="https://wa.me/917999229700"
            target="_blank"
            rel="noreferrer"
            className="block text-sm text-smoke transition-colors hover:text-foreground"
          >
            WHATSAPP
          </a>
          <a
            href="mailto:richirichhq@gmail.com"
            className="block text-sm text-smoke transition-colors hover:text-foreground"
          >
            EMAIL
          </a>
        </div>
        <div className="md:text-right">
          <p className="label mb-3">Index</p>
          <Link to="/" className="text-sm text-smoke transition-colors hover:text-foreground">
            Home
          </Link>
        </div>
      </div>

      <div className="hairline-t mt-14 flex flex-col gap-2 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="label">Richi Rich HQ © 2026</p>
        <p className="label">See you on the next frame.</p>
      </div>
    </footer>
  );
}
