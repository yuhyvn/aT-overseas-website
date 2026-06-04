import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Users } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { branch } from "@/data/branch";
import { programs } from "@/data/programs";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const program = programs.find((p) => p.slug === params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.program;
    if (!p) return { meta: [{ title: "Program — aT New York" }] };
    return {
      meta: [
        { title: `${p.title} — aT New York` },
        { name: "description", content: p.summary.slice(0, 160) },
        { property: "og:title", content: `${p.title} — aT New York` },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-page py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-navy">Program not found</h1>
        <Link
          to="/programs"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy"
        >
          Back to Support Programs <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="container-page py-32 text-center text-navy">Something went wrong.</div>
    </SiteLayout>
  ),
  component: ProgramDetailPage,
});

function ProgramDetailPage() {
  const { program } = Route.useLoaderData();
  const Icon = program.icon;
  const others = programs.filter((p) => p.slug !== program.slug);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-20">
          <Link
            to="/programs"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-navy"
          >
            ← All Support Programs
          </Link>
          <div className="mt-6 max-w-4xl">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green sm:h-12 sm:w-12">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <h1 className="min-w-0 truncate font-display text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-[34px]">
                {program.title}
              </h1>
            </div>
            <div className="sm:pl-[68px]">
              <p className="mt-5 text-base leading-7 text-muted-foreground">{program.summary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {program.sections && (
              <div className="space-y-6">
                {program.sections.map((section) => (
                  <section
                    key={section.heading}
                    className="rounded-2xl border border-border bg-card p-7 shadow-card"
                  >
                    <h2 className="font-display text-xl font-semibold leading-tight text-navy">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-3">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-sm leading-7 text-foreground/80">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {!program.sections && (
              <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <h2 className="font-display text-xl font-semibold text-navy">Program overview</h2>
                <div className="mt-4 space-y-3 text-sm leading-7 text-foreground/80">
                  {program.highlights.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            )}

            {program.processSteps && (
              <div className="mt-10 rounded-xl border border-border bg-secondary/40 p-6">
                <h2 className="text-center font-display text-xl font-semibold text-navy">
                  Process
                </h2>
                <div className="mt-6 grid gap-3 md:grid-cols-4">
                  {program.processSteps.map((step, index) => (
                    <div
                      key={step}
                      className="rounded-lg border border-border bg-card p-4 text-center shadow-card"
                    >
                      <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-brand-green text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {program.coverageRows && (
              <div className="mt-10">
                <h2 className="font-display text-xl font-semibold text-navy">
                  What's covered for each category?
                </h2>
                <div className="mt-5 overflow-x-auto rounded-xl border border-border bg-card shadow-card">
                  <table className="min-w-[760px] text-left text-sm">
                    <thead className="bg-brand-green/10 text-navy">
                      <tr>
                        <th className="px-5 py-4 font-semibold">Title</th>
                        <th className="px-5 py-4 font-semibold">Support</th>
                        <th className="px-5 py-4 font-semibold">Descriptions</th>
                        <th className="px-5 py-4 font-semibold">Countries</th>
                      </tr>
                    </thead>
                    <tbody>
                      {program.coverageRows.map((row) => (
                        <tr key={row.title} className="border-t border-border align-top">
                          <td className="px-5 py-4 font-medium text-navy">{row.title}</td>
                          <td className="px-5 py-4 font-semibold text-brand-green">
                            {row.support}
                          </td>
                          <td className="whitespace-pre-line px-5 py-4 leading-relaxed text-foreground/80">
                            {row.description}
                          </td>
                          <td className="px-5 py-4 leading-relaxed text-foreground/80">
                            {row.countries}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6 self-start">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
                <Users className="h-4 w-4" /> Intended for
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{program.audience}</p>
            </div>
            <div className="rounded-2xl bg-gradient-hero p-7 text-navy-foreground shadow-elegant">
              <h3 className="font-display text-lg font-bold">Interested in this program?</h3>
              <p className="mt-2 text-sm text-white/75">
                Reach out to aT Center New York — we typically respond within 48 business hours.
              </p>
              <a
                href={`mailto:${branch.email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-white/90"
              >
                Email aT NY <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </aside>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-xl font-semibold text-navy">Other support programs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/programs/$slug"
                params={{ slug: o.slug }}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <o.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-navy">{o.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{o.tagline}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-navy transition group-hover:gap-1.5">
                  Learn more <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
