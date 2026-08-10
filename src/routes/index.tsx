import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CustomCursor } from "@/components/site/CustomCursor";
import { Reveal, MaskLines, useInView } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { Magnetic } from "@/components/site/Magnetic";
import { DrivePlayer } from "@/components/site/DrivePlayer";
import { projects, categories, type Category } from "@/lib/projects";
import heroStill from "@/assets/still-concert.jpg";
import portrait from "@/assets/portrait-richi.jpg";
import ctaStill from "@/assets/still-aerial.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Richi Rich — Filmmaker, Cinematographer & FPV Pilot, Noida" },
      {
        name: "description",
        content:
          "Richi Rich is a Noida-based filmmaker, cinematographer, editor and FPV drone pilot creating cinematic films, brand content, events, concerts, weddings and commercial visuals.",
      },
      { property: "og:title", content: "Richi Rich — Filmmaker, Cinematographer & Creative" },
      {
        property: "og:description",
        content:
          "Cinematic films, brand content, concerts, events and weddings. Noida, India. Try us once. You'll stick around.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return y;
}

function Hero() {
  const y = useScrollY();
  const [loaded, setLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    const move = (e: MouseEvent) =>
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 22,
        y: (e.clientY / window.innerHeight - 0.5) * 14,
      });
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  const p = Math.min(y, 900);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden grain">
      <div
        className="absolute inset-[-8%]"
        style={{
          transform: `translate3d(${tilt.x}px, ${tilt.y + p * 0.22}px, 0) scale(${1.06 + p * 0.00022})`,
          transition: "transform .6s cubic-bezier(.16,1,.3,1)",
        }}
      >
        <img
          src={heroStill}
          alt="Cinematic concert frame shot by Richi Rich"
          width={1600}
          height={1000}
          className="h-full w-full object-cover grayscale"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.8s ease-out",
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/25 to-background" />

      <div
        className="edge relative flex h-full flex-col justify-end pb-14 md:pb-16"
        style={{ transform: `translateY(${-p * 0.12}px)`, opacity: Math.max(0, 1 - p / 620) }}
      >
        <span className="label mb-6 block">Noida / India — Est. 4+ Years</span>

        <h1 className="text-[17vw] leading-[0.8] md:text-[15vw]">
          <span className="mask-line" data-shown={loaded}>
            <span style={{ transitionDelay: "150ms" }}>Richi</span>
          </span>
          <span className="mask-line" data-shown={loaded}>
            <span style={{ transitionDelay: "280ms" }}>Rich</span>
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 border-t border-hairline pt-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="label mb-3">Filmmaker · Cinematographer · Editor · FPV Pilot</p>
            <p className="text-lg text-smoke md:text-xl">
              Crafting films, visuals &amp; experiences that people remember.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Magnetic>
              <a
                href="#work"
                data-cursor="VIEW"
                className="group inline-flex items-center gap-3 bg-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-all duration-500 hover:gap-5"
              >
                View Work <span>→</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                data-cursor="LET'S TALK"
                className="group inline-flex items-center gap-3 border border-foreground/40 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] transition-all duration-500 hover:gap-5 hover:bg-foreground hover:text-primary-foreground"
              >
                Let's Work <span>→</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="edge py-28 md:py-40">
      <MaskLines
        lines={["We don't just", "shoot content.", "We craft how", "people see it."]}
        className="text-[10.5vw] leading-[0.88] md:text-[7.5vw]"
      />
      <Reveal delay={200} className="mt-12 max-w-2xl md:ml-auto">
        <p className="text-base leading-relaxed text-smoke md:text-lg">
          From cinematic brand films and high-energy concerts to weddings, events and FPV
          sequences, Richi Rich combines cinematography, editing, storytelling and creative
          direction to turn ideas into visuals that stay with people.
        </p>
      </Reveal>
    </section>
  );
}

function WorkCard({ project, i }: { project: (typeof projects)[number]; i: number }) {
  const { ref, shown } = useInView<HTMLAnchorElement>(0.12);
  const span =
    project.span === "full"
      ? "md:col-span-12"
      : project.span === "wide"
        ? "md:col-span-8"
        : project.span === "tall"
          ? "md:col-span-4"
          : "md:col-span-6";
  const ratio =
    project.span === "full"
      ? "aspect-[16/9] md:aspect-[21/8]"
      : project.span === "tall"
        ? "aspect-[3/4]"
        : "aspect-[4/3]";

  return (
    <Link
      ref={ref}
      to="/work/$slug"
      params={{ slug: project.slug }}
      data-shown={shown}
      data-cursor="OPEN"
      style={{ transitionDelay: `${(i % 3) * 90}ms` }}
      className={`reveal group col-span-1 ${span}`}
    >
      <div className={`relative overflow-hidden bg-card ${ratio}`}>
        <img
          src={project.still}
          alt={`${project.title} — ${project.kicker}`}
          loading="lazy"
          width={1600}
          height={1000}
          className="h-full w-full object-cover grayscale transition-all duration-[1600ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07] group-hover:grayscale-0"
        />
        <span className="absolute inset-0 bg-background/35 transition-opacity duration-700 group-hover:opacity-0" />
        <span className="absolute left-5 top-5 label text-foreground/80">{project.index}</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-6 border-t border-hairline pt-4">
        <div>
          <h3 className="text-2xl md:text-3xl">{project.title}</h3>
          <p className="label mt-2">{project.kicker}</p>
        </div>
        <span className="label whitespace-nowrap transition-transform duration-500 group-hover:-translate-y-1">
          View Project →
        </span>
      </div>
    </Link>
  );
}

function Work() {
  const [active, setActive] = useState<"ALL" | Category>("ALL");
  const list = useMemo(
    () => (active === "ALL" ? projects : projects.filter((p) => p.categories.includes(active))),
    [active],
  );

  return (
    <section id="work" className="edge scroll-mt-24 py-20 md:py-28">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <MaskLines
          lines={["Work that", "speaks louder."]}
          className="text-[11vw] leading-[0.88] md:text-[6.5vw]"
        />
        <p className="label max-w-xs md:text-right">
          Selected films — brands, concerts, institutions, sport, weddings.
        </p>
      </div>

      <div className="mt-12 flex flex-wrap gap-x-6 gap-y-3 border-y border-hairline py-5">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c as "ALL" | Category)}
            className={`label transition-colors duration-300 ${
              active === c ? "text-foreground" : "hover:text-foreground"
            }`}
            aria-pressed={active === c}
          >
            {c}
            {active === c && <span className="ml-2 text-foreground/50">({list.length})</span>}
          </button>
        ))}
      </div>

      <div key={active} className="mt-12 grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12">
        {list.map((p, i) => (
          <WorkCard key={p.slug} project={p} i={i} />
        ))}
      </div>
    </section>
  );
}

function Clients() {
  const names = [
    "FICCI",
    "KINGFISHER",
    "MOTHER DAIRY",
    "PAYTM",
    "EU EMBASSY",
    "KARAN AUJLA",
    "HONEY SINGH",
    "HYROX",
    "OCTALOOP",
  ];
  return (
    <section className="border-y border-hairline py-14">
      <p className="edge label mb-8">Trusted to create for</p>
      <Marquee
        items={names}
        duration={40}
        className="font-display text-4xl font-extrabold uppercase tracking-[-0.03em] text-foreground/45 md:text-6xl"
      />
    </section>
  );
}

const services = [
  {
    n: "01",
    t: "Videography",
    d: "Commercial shoots, events, weddings, concerts, hotels, campaigns and brand content.",
  },
  {
    n: "02",
    t: "Video Editing",
    d: "Commercial films, social media content, event films, reels, music videos and cinematic edits.",
  },
  {
    n: "03",
    t: "FPV / Drone",
    d: "FPV drone flying, dynamic sequences, aerial cinematography and immersive movement-based shots.",
  },
  {
    n: "04",
    t: "Design",
    d: "Creative visual design, social assets, campaign visuals and supporting brand communication.",
  },
  {
    n: "05",
    t: "Marketing",
    d: "Content strategy, trend-driven content, social-first creative and visual marketing.",
  },
];

function Services() {
  return (
    <section id="services" className="edge scroll-mt-24 py-28 md:py-40">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <MaskLines lines={["What we do"]} className="text-[13vw] leading-[0.88] md:text-[8vw]" />
        <p className="label max-w-xs md:text-right">
          From a single shoot to a complete production — we've got you covered.
        </p>
      </div>

      <div className="mt-16">
        {services.map((s, i) => (
          <Reveal key={s.n} delay={i * 60}>
            <div className="group grid grid-cols-12 items-baseline gap-4 border-t border-hairline py-8 transition-colors duration-500 hover:bg-foreground/[0.03] md:py-10">
              <span className="label col-span-2 md:col-span-1">{s.n}</span>
              <h3 className="col-span-10 text-3xl transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:col-span-5 md:text-5xl">
                {s.t}
              </h3>
              <p className="col-span-12 mt-3 text-sm leading-relaxed text-smoke md:col-span-6 md:mt-0">
                {s.d}
              </p>
            </div>
          </Reveal>
        ))}
        <div className="border-t border-hairline" />
      </div>
    </section>
  );
}

function Network() {
  const caps = [
    "Cinematographers",
    "Camera operators",
    "Editors",
    "Photographers",
    "Drone pilots",
    "Designers",
    "Creative specialists",
    "Production support",
  ];
  return (
    <section className="edge py-24 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <MaskLines
          lines={["One creative contact.", "An entire creative team."]}
          className="col-span-12 text-[8.5vw] leading-[0.9] md:col-span-7 md:text-[4.4vw]"
        />
        <Reveal delay={150} className="col-span-12 md:col-span-5">
          <p className="text-base leading-relaxed text-smoke">
            Need more than a camera operator? Richi Rich works with a dedicated network of
            freelance creatives who can be brought together based on the scale, style and
            requirements of each project.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
            {caps.map((c) => (
              <li key={c} className="label border-b border-hairline pb-2">
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  const y = useScrollY();
  const { ref, shown } = useInView<HTMLDivElement>(0.1);
  return (
    <section id="about" className="edge scroll-mt-24 py-24 md:py-32">
      <MaskLines
        lines={["Behind the camera."]}
        className="text-[11vw] leading-[0.88] md:text-[7vw]"
      />
      <div ref={ref} className="mt-14 grid gap-12 md:grid-cols-12">
        <div
          data-shown={shown}
          className="reveal col-span-12 overflow-hidden md:col-span-5"
          data-cursor="RICHI"
        >
          <img
            src={portrait}
            alt="Richi Rich, filmmaker and cinematographer based in Noida, holding a cinema camera"
            loading="lazy"
            width={1200}
            height={1500}
            className="aspect-[4/5] w-full object-cover grayscale"
            style={{ transform: `translateY(${Math.min(40, y * 0.012)}px) scale(1.04)` }}
          />
        </div>
        <div className="col-span-12 flex flex-col justify-between gap-10 md:col-span-6 md:col-start-7">
          <Reveal delay={120}>
            <p className="text-lg leading-relaxed text-smoke md:text-xl">
              I'm Richi Rich — a freelance videographer, cinematographer, editor and FPV drone
              pilot based in Noida.
            </p>
            <p className="mt-6 text-base leading-relaxed text-smoke">
              For 4+ years, I've been creating visual work across brands, hotels, weddings,
              concerts, events and commercial projects. I'm obsessed with the details — the frame,
              the movement, the edit, the sound and the story. And when the project needs more than
              one person, I have a dedicated network of freelancers ready to build the right team
              around it.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="grid grid-cols-2 gap-6 border-t border-hairline pt-6">
              <div>
                <p className="label mb-2">Experience</p>
                <p className="font-display text-4xl font-extrabold">4+ YRS</p>
              </div>
              <div>
                <p className="label mb-2">Education</p>
                <p className="text-sm text-smoke">B.Tech — Computer Science &amp; Engineering</p>
                <p className="text-sm text-smoke">Bennett University</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    "CINEMATOGRAPHY",
    "VIDEOGRAPHY",
    "EDITING",
    "FPV / DRONE",
    "DOP",
    "COLOR GRADING",
    "CREATIVE DIRECTION",
    "STORYTELLING",
    "DESIGN",
    "MARKETING",
    "TREND-DRIVEN CONTENT",
  ];
  return (
    <section className="border-y border-hairline py-16">
      <Marquee
        items={skills}
        duration={52}
        className="font-display text-[9vw] font-extrabold uppercase leading-none tracking-[-0.04em] md:text-[5.5vw]"
      />
      <Marquee
        items={[...skills].reverse()}
        duration={64}
        separator="/"
        className="mt-4 font-display text-[9vw] font-extrabold uppercase leading-none tracking-[-0.04em] text-foreground/25 md:text-[5.5vw]"
      />
    </section>
  );
}

function Philosophy() {
  return (
    <section className="edge py-28 md:py-40">
      <MaskLines
        lines={["Quality over quantity.", "Always."]}
        className="text-[12vw] leading-[0.86] md:text-[8vw]"
      />
      <div className="mt-14 grid gap-8 md:grid-cols-12">
        <Reveal delay={120} className="col-span-12 md:col-span-5 md:col-start-7">
          <p className="text-base leading-relaxed text-smoke">
            Trends change. Cameras change. Algorithms change. Good storytelling doesn't.
          </p>
          <p className="mt-6 text-base leading-relaxed text-foreground">
            The goal isn't to make another video. It's to make something worth watching twice.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ClosingCTA() {
  const y = useScrollY();
  return (
    <section className="relative overflow-hidden grain">
      <img
        src={ctaStill}
        alt="Aerial FPV frame over a city at dusk"
        loading="lazy"
        width={1600}
        height={1000}
        className="absolute inset-0 h-full w-full object-cover grayscale"
        style={{ transform: `translateY(${(y % 1200) * 0.03}px) scale(1.1)` }}
      />
      <div className="absolute inset-0 bg-background/80" />
      <div className="edge relative py-32 md:py-48">
        <MaskLines
          lines={["Got something", "worth shooting?"]}
          className="text-[11vw] leading-[0.88] md:text-[7vw]"
        />
        <MaskLines
          lines={["Let's make it", "unforgettable."]}
          className="mt-6 text-[11vw] leading-[0.88] text-foreground/40 md:text-[7vw]"
        />
        <div className="mt-14 flex flex-wrap gap-4">
          <Magnetic>
            <a
              href="#contact"
              data-cursor="LET'S TALK"
              className="inline-flex items-center gap-3 bg-foreground px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-all duration-500 hover:gap-6"
            >
              Start a Project <span>→</span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="https://www.instagram.com/richirich.hq/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 border border-foreground/40 px-8 py-5 font-mono text-[11px] uppercase tracking-[0.22em] transition-all duration-500 hover:gap-6 hover:bg-foreground hover:text-primary-foreground"
            >
              View Instagram <span>→</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const rows = [
    { k: "Email", v: "richirichhq@gmail.com", href: "mailto:richirichhq@gmail.com" },
    { k: "Phone / WhatsApp", v: "+91 79992 29700", href: "https://wa.me/917999229700" },
    { k: "Instagram", v: "@richirich.hq", href: "https://www.instagram.com/richirich.hq/" },
    { k: "Location", v: "Noida, India", href: null },
    { k: "Website", v: "richirichhq.in", href: "https://richirichhq.in" },
  ];
  return (
    <section id="contact" className="edge scroll-mt-24 py-28 md:py-36">
      <MaskLines
        lines={["Let's make", "something."]}
        className="text-[13vw] leading-[0.86] md:text-[8vw]"
      />
      <div className="mt-16 grid gap-10 md:grid-cols-12">
        <div className="col-span-12 md:col-span-7">
          {rows.map((r, i) => (
            <Reveal key={r.k} delay={i * 60}>
              <div className="grid grid-cols-12 items-baseline gap-4 border-t border-hairline py-5">
                <span className="label col-span-5 md:col-span-4">{r.k}</span>
                <span className="col-span-7 md:col-span-8">
                  {r.href ? (
                    <a
                      href={r.href}
                      target={r.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="link-underline text-lg md:text-2xl"
                    >
                      {r.v}
                    </a>
                  ) : (
                    <span className="text-lg md:text-2xl">{r.v}</span>
                  )}
                </span>
              </div>
            </Reveal>
          ))}
          <div className="border-t border-hairline" />
        </div>
        <Reveal delay={200} className="col-span-12 md:col-span-4 md:col-start-9">
          <p className="text-sm leading-relaxed text-smoke">
            Tell us the date, the place and the feeling you're after. We'll handle the rest —
            crew, camera, edit and delivery.
          </p>
          <p className="mt-6 font-display text-2xl font-extrabold uppercase leading-tight">
            Try us once.
            <br />
            You'll stick around.
          </p>
          <Magnetic>
            <a
              href="https://wa.me/917999229700"
              target="_blank"
              rel="noreferrer"
              data-cursor="LET'S TALK"
              className="mt-8 inline-flex items-center gap-3 bg-foreground px-7 py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition-all duration-500 hover:gap-5"
            >
              Start a Project <span>→</span>
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

function Showreel() {
  const featured = projects[6]!;
  return (
    <section className="edge py-8">
      <Reveal>
        <DrivePlayer
          driveId={featured.driveId}
          poster={featured.still}
          title={featured.title}
          ratio="aspect-[16/9] md:aspect-[21/9]"
        />
        <div className="mt-4 flex items-center justify-between border-t border-hairline pt-4">
          <p className="label">Featured film — {featured.title}</p>
          <p className="label">{featured.kicker}</p>
        </div>
      </Reveal>
    </section>
  );
}

function Home() {
  return (
    <>
      <CustomCursor />
      <Nav />
      <main>
        <h1 className="sr-only">
          Richi Rich — freelance filmmaker, cinematographer, editor and FPV drone pilot in Noida,
          India
        </h1>
        <Hero />
        <Statement />
        <Showreel />
        <Work />
        <Clients />
        <Services />
        <Network />
        <About />
        <Skills />
        <Philosophy />
        <ClosingCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
