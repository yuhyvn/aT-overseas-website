import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Users, Target } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { programs } from "@/data/programs";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Support Programs — aT New York Center" },
      { name: "description", content: "BKF B2B Meeting, Localization, Food Demonstrations, and Overseas Logistics & Warehouse — programs supporting Korean food exports to the U.S." },
      { property: "og:title", content: "Support Programs — aT New York Center" },
      { property: "og:description", content: "Trade-promotion programs supporting Korean food exports to the United States." },
    ],
  }),
  component: ProgramsIndex,
});

function ProgramsIndex() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-16 sm:py-20">
          <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Support Programs</div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
            Trade-promotion programs for Korean food in the U.S. market.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Four programs cover the full path from buyer introductions and
            U.S. labeling, to in-store demonstrations and bonded logistics.
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {programs.map((p, i) => (
            <Link
              key={p.slug}
              to="/programs/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col rounded-xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant sm:p-8"
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

              <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm leading-relaxed">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">What it is</dt>
                  <dd className="mt-1 text-foreground/80">{p.whatItIs}</dd>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <div>
                    <dt className="sr-only">For who</dt>
                    <dd className="text-foreground/80"><span className="font-semibold text-navy">For:</span> {p.forWho}</dd>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Target className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <div>
                    <dt className="sr-only">Why it matters</dt>
                    <dd className="text-foreground/80"><span className="font-semibold text-navy">Why it matters:</span> {p.whyMatters}</dd>
                  </div>
                </div>
              </dl>

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
