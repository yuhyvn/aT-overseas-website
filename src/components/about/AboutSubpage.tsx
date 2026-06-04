import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { branch } from "@/data/branch";

type Section = { heading: string; body: string };
type Stat = { v: string; l: string };

export function AboutSubpage({
  eyebrow,
  title,
  lead,
  sections,
  stats,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  sections: Section[];
  stats?: Stat[];
}) {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-20">
          <div className="eyebrow">
            <span className="h-px w-8 bg-brand-green" /> {eyebrow}
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-navy sm:text-5xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">{lead}</p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-10">
            {sections.map((s) => (
              <div key={s.heading} className="border-l-2 border-brand-green/40 pl-6">
                <h2 className="font-display text-xl font-semibold text-navy">{s.heading}</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">{s.body}</p>
              </div>
            ))}
          </div>

          {stats && (
            <aside className="self-start rounded-2xl bg-gradient-hero p-8 text-navy-foreground shadow-elegant">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
                By the numbers
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-y-8">
                {stats.map((s) => (
                  <div key={s.l}>
                    <dt className="font-display text-2xl font-bold text-white">{s.v}</dt>
                    <dd className="mt-1 text-xs leading-relaxed text-white/70">{s.l}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          )}
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-card p-10 shadow-card lg:flex-row lg:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold text-navy">
              Looking to source from Korea?
            </h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Submit a buyer inquiry and our New York team will respond within 48 business hours.
            </p>
          </div>
          <a
            href={`mailto:${branch.email}`}
            className="inline-flex items-center gap-2 rounded-md bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground transition hover:bg-navy-deep"
          >
            Email aT NY <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}
