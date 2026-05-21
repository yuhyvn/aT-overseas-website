import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { products } from "@/data/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Featured Products — aT New York K-Food Platform" },
      { name: "description", content: "Browse Korean food categories: ramen, kimchi, snacks, frozen foods, beverages, sauces. All suppliers FDA & HACCP certified." },
      { property: "og:title", content: "Featured Korean Food Products — aT NY" },
      { property: "og:description", content: "Certified Korean food categories ready for U.S. import." },
    ],
  }),
  component: ProductsPage,
});

const availBadge: Record<string, string> = {
  "In stock": "bg-brand-green/15 text-brand-green",
  "Seasonal": "bg-gold/20 text-foreground/70",
  "Pre-order": "bg-secondary text-muted-foreground",
};

function ProductsPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-20">
          <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Featured Products</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-navy sm:text-5xl">
            Certified Korean food categories ready for U.S. import.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Each product is sourced from verified Korean manufacturers and accompanied by full
            export documentation, U.S. labeling support, and certification records.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <article
              key={p.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant animate-fade-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img src={p.image} alt={p.name} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">{p.category}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${availBadge[p.availability]}`}>
                    {p.availability}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy">{p.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                  {p.certifications.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-[11px] font-semibold text-navy">
                      <ShieldCheck className="h-3 w-3 text-brand-green" /> {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-card p-8 shadow-card sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">All listings are pre-verified by aT New York</h2>
              <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {["Manufacturer audit & site visit","FDA registration verification","HACCP & cold-chain compliance","U.S. labeling & nutrition support"].map((t) => (
                  <li key={t} className="flex items-start gap-2 text-sm text-foreground/80">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
