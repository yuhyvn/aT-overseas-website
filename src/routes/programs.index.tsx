import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { programs } from "@/data/programs";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Support Programs — aT New York K-Food Trade Platform" },
      {
        name: "description",
        content:
          "BKF B2B meetings, localization support, food demonstrations, and overseas logistics and warehouse support for Korean food exports.",
      },
      { property: "og:title", content: "Support Programs — aT New York" },
      {
        property: "og:description",
        content: "Support programs for Korean food exporters and U.S. trade partners.",
      },
    ],
  }),
  component: ProgramsIndex,
});

function ProgramsIndex() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/35">
        <div className="container-page py-16 sm:py-20">
          <div>
            <div className="eyebrow">
              <span className="h-px w-8 bg-brand-green" /> Support Programs
            </div>
            <h1 className="mt-3 max-w-5xl font-display text-4xl font-bold leading-tight text-navy sm:text-5xl">
              Practical support for Korean food exports in the U.S. market.
            </h1>
            <p className="mt-6 max-w-4xl text-base leading-7 text-muted-foreground">
              Browse core programs for buyer meetings, localization, retail exposure, and logistics
              support. Each page explains who the program is for and how the support works.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          {programs.map((p, i) => (
            <Link
              key={p.slug}
              to="/programs/$slug"
              params={{ slug: p.slug }}
              className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-0.5 hover:border-brand-green/30 hover:shadow-elegant animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-brand-green/80" />
              <div className="flex h-20 items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green transition group-hover:bg-brand-green group-hover:text-white">
                  <p.icon className="h-8 w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-display text-2xl font-bold leading-tight text-navy">
                    {p.title}
                  </h2>
                </div>
              </div>

              <p className="mt-6 min-h-[154px] text-sm leading-7 text-muted-foreground">
                {p.summary}
              </p>

              <div className="pt-6">
                <p className="border-t border-border pt-4 text-xs leading-5 text-foreground/70">
                  <span className="font-semibold text-navy">Best for:</span> {p.audience}
                </p>
              </div>

              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-navy transition group-hover:gap-2 group-hover:text-brand-green">
                View program details <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
