import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Users, Target } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { programs, type ProgramProcessStep, type ProgramCoverageRow } from "@/data/programs";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const program = programs.find((p) => p.slug === params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.program;
    if (!p) return { meta: [{ title: "Program — aT New York Center" }] };
    return {
      meta: [
        { title: `${p.title} — aT New York Center` },
        { name: "description", content: p.summary.slice(0, 160) },
        { property: "og:title", content: `${p.title} — aT New York Center` },
        { property: "og:description", content: p.tagline },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="container-page py-32 text-center">
        <h1 className="font-display text-3xl font-bold text-navy">Program not found</h1>
        <Link to="/programs" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy">
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
      {/* Header */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-14 sm:py-20">
          <Link to="/programs" className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-navy">
            ← All Support Programs
          </Link>
          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
              <Icon className="h-7 w-7" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">{program.tagline}</div>
              <h1 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">{program.title}</h1>
            </div>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground">{program.summary}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
                <Users className="h-4 w-4" /> For
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{program.forWho}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
                <Target className="h-4 w-4" /> Why it matters
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/80">{program.whyMatters}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">What the program includes</h2>
            <ul className="mt-6 space-y-3">
              {program.highlights.map((h: string) => (
                <li key={h} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 shadow-card">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  <span className="text-sm leading-relaxed text-foreground/80">{h}</span>
                </li>
              ))}
            </ul>

            {/* Process steps */}
            {program.process && program.process.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">How the program works</h2>
                <ol className="mt-6 space-y-4">
                  {program.process.map((step: ProgramProcessStep) => (
                    <li
                      key={step.step}
                      className="flex gap-4 rounded-xl border border-border bg-card p-5 shadow-card"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-navy text-sm font-semibold text-navy-foreground">
                        {step.step}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-display text-base font-semibold text-navy">{step.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Coverage table */}
            {program.coverage && program.coverage.length > 0 && (
              <div className="mt-12">
                <h2 className="font-display text-xl font-semibold text-navy sm:text-2xl">Coverage</h2>
                <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-card">
                  {/* Mobile-friendly definition list */}
                  <dl className="divide-y divide-border">
                    {program.coverage.map((row: ProgramCoverageRow) => (
                      <div
                        key={row.area}
                        className="grid gap-1 p-4 sm:grid-cols-[12rem_1fr] sm:gap-6 sm:p-5"
                      >
                        <dt className="font-display text-sm font-semibold text-navy">{row.area}</dt>
                        <dd className="text-sm leading-relaxed text-foreground/80">{row.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl bg-gradient-hero p-7 text-navy-foreground shadow-elegant">
              <h3 className="font-display text-lg font-bold">Interested in this program?</h3>
              <p className="mt-2 text-sm text-white/75">
                Reach out to the {program.title.includes("Logistics") ? "office" : "New York"} team —
                we typically respond within 48 business hours.
              </p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-navy transition hover:bg-white/90">
                Contact the Office <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-20">
          <h2 className="font-display text-xl font-semibold text-navy">Other programs</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/programs/$slug"
                params={{ slug: o.slug }}
                className="group rounded-xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
              >
                <o.icon className="h-5 w-5 text-brand-green" />
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
