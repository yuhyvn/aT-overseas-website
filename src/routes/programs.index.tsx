import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { programs } from "@/data/programs";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Programs — aT New York K-Food Trade Platform" },
      { name: "description", content: "BKF B2B meetings, localization support, food demonstrations, and overseas logistics & warehousing — programs that help Korean food exports succeed in the U.S." },
      { property: "og:title", content: "Programs — aT New York" },
      { property: "og:description", content: "Trade-promotion programs supporting Korean food exports to the United States." },
    ],
  }),
  component: ProgramsIndex,
});

function ProgramsIndex() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-20">
          <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Programs</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-navy sm:text-5xl">
            Trade-promotion programs that move Korean food into U.S. shelves.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            From curated buyer matchmaking to localization, in-store activations, and bonded logistics —
            our programs are designed to remove every operational barrier between Korean producers and the U.S. market.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((p, i) => (
            <Link
              key={p.slug}
              to="/programs/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col rounded-xl border border-border bg-card p-8 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <p.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <h2 className="mt-6 font-display text-xl font-semibold text-navy">{p.title}</h2>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-green">{p.tagline}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition group-hover:gap-2">
                Learn more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
