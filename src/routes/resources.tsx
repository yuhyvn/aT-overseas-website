import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { branch } from "@/data/branch";
import { products } from "@/data/products";
import { programs } from "@/data/programs";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: `Resources — ${branch.displayName}` },
      { name: "description", content: `Useful resources for Korean food trade in the ${branch.market} market: K-Food categories, trade programs offered by ${branch.displayName}, and links to related agencies.` },
      { property: "og:title", content: `Resources — ${branch.displayName}` },
      { property: "og:description", content: `K-Food categories, programs, and useful links.` },
    ],
  }),
  component: ResourcesPage,
});

const usefulLinks = [
  { label: "Korea Agro-Fisheries & Food Trade Corporation (aT)", href: "https://www.at.or.kr" },
  { label: "Ministry of Agriculture, Food and Rural Affairs (MAFRA)", href: "https://www.mafra.go.kr" },
  { label: "U.S. Food and Drug Administration (FDA)", href: "https://www.fda.gov" },
  { label: "U.S. Department of Agriculture (USDA)", href: "https://www.usda.gov" },
];

function ResourcesPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-16 sm:py-20">
          <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Resources</div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold text-navy sm:text-4xl">
            Information for Korean food trade in the {branch.market} market.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A simple reference of Korean food categories, programs supported by this office,
            and useful links to related public agencies.
          </p>
        </div>
      </section>

      {/* K-Food Categories */}
      <section className="container-page py-14">
        <h2 className="font-display text-2xl font-bold text-navy">K-Food Categories</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Representative Korean food categories of interest to overseas buyers.
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p.slug} className="overflow-hidden rounded-xl border border-border bg-card shadow-card">
              <div className="aspect-[5/3] overflow-hidden bg-secondary">
                <img src={p.image} alt={p.category} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <div className="p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">{p.category}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Programs */}
      <section className="bg-secondary/40">
        <div className="container-page py-14">
          <h2 className="font-display text-2xl font-bold text-navy">Programs</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Trade-support programs offered by {branch.displayName}. Contact the office for
            participation details.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {programs.map((p) => (
              <div key={p.slug} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-navy">{p.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.summary}</p>
                <p className="mt-3 text-xs text-muted-foreground"><span className="font-semibold text-foreground/80">For:</span> {p.audience}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green">
              Inquire about a program <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Useful links */}
      <section className="container-page py-14">
        <h2 className="font-display text-2xl font-bold text-navy">Useful links</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {usefulLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-4 rounded-lg border border-border bg-card px-5 py-4 text-sm font-medium text-foreground/85 shadow-card transition hover:border-navy/30 hover:text-navy"
              >
                <span>{l.label}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </SiteLayout>
  );
}
