import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CustomCursor } from "@/components/site/CustomCursor";
import { MaskLines, Reveal } from "@/components/site/Reveal";
import { DrivePlayer } from "@/components/site/DrivePlayer";
import { getProject, nextProject } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project, next: nextProject(params.slug) };
  },
  head: ({ loaderData }) => {
    const canonicalBase = "https://richirichhq.in";
    const title = loaderData
      ? `${loaderData.project.title} — Richi Rich`
      : "Project — Richi Rich";
    const description = loaderData
      ? `${loaderData.project.title}: ${loaderData.project.description}`
      : "Selected film work by Richi Rich, filmmaker and cinematographer in Noida.";
    const slug = loaderData?.project.slug;
    const canonicalUrl = slug ? `${canonicalBase}/work/${slug}` : `${canonicalBase}/work`;
    const ogImageUrl = loaderData?.project.still
      ? `${canonicalBase}${loaderData.project.still}`
      : `${canonicalBase}/og-image.jpg`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: canonicalUrl },
        { property: "og:image", content: ogImageUrl },
        {
          property: "og:image:alt",
          content: loaderData
            ? `${loaderData.project.title} cinematic project still by Richi Rich`
            : "Cinematic project still by Richi Rich",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: ogImageUrl },
      ],
      links: [{ rel: "canonical", href: canonicalUrl }],
    };
  },
  component: ProjectPage,
});

function ProjectPage() {
  const { project, next } = Route.useLoaderData();

  return (
    <>
      <CustomCursor />
      <Nav />
      <main className="pt-28 md:pt-32">
        <section className="edge">
          <Link to="/" className="label link-underline">
            ← All work
          </Link>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <MaskLines
              lines={project.title.split(" ")}
              className="text-[13vw] leading-[0.86] md:text-[8vw]"
            />
            <p className="label md:text-right">{project.kicker}</p>
          </div>
        </section>

        <section className="edge mt-12">
          <DrivePlayer
            driveId={project.driveId}
            poster={project.still}
            title={project.title}
            ratio="aspect-[16/9]"
          />
        </section>

        <section className="edge mt-14 grid gap-10 md:grid-cols-12">
          <div className="col-span-12 grid grid-cols-2 gap-8 md:col-span-5 md:grid-cols-1">
            <div className="border-t border-hairline pt-4">
              <p className="label mb-2">Role</p>
              <p className="text-sm">{project.role}</p>
            </div>
            <div className="border-t border-hairline pt-4">
              <p className="label mb-2">Category</p>
              <p className="text-sm">{project.categories.join(" / ")}</p>
            </div>
            <div className="border-t border-hairline pt-4">
              <p className="label mb-2">Studio</p>
              <p className="text-sm">Richi Rich HQ — Noida, India</p>
            </div>
          </div>
          <Reveal className="col-span-12 md:col-span-6 md:col-start-7">
            <p className="text-xl leading-relaxed text-smoke md:text-2xl">{project.description}</p>
          </Reveal>
        </section>

        <section className="edge mt-20">
          <Reveal>
            <img
              src={project.still}
              alt={`${project.title} cinematic still from Richi Rich portfolio`}
              loading="lazy"
              width={1600}
              height={1000}
              className="aspect-[21/9] w-full object-cover grayscale"
            />
            <p className="label mt-4">Still — {project.title}</p>
          </Reveal>
        </section>

        <section className="edge mt-24 border-t border-hairline pt-10">
          <p className="label mb-6">Next project</p>
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            data-cursor="OPEN"
            className="group flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <h2 className="text-[11vw] leading-[0.88] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 md:text-[6.5vw]">
              {next.title}
            </h2>
            <span className="label">{next.kicker} →</span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
