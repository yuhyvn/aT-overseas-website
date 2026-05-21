import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, TrendingUp, Globe2, Award, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import heroImg from "@/assets/hero-kfood.jpg";
import { products } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "aT New York — Connecting Korean Food to the U.S. Market" },
      { name: "description", content: "B2B trade platform by Korea Agro-Fisheries & Food Trade Corporation New York. Discover certified Korean food products, suppliers, and U.S. market insights." },
      { property: "og:title", content: "aT New York — K-Food Trade Platform" },
      { property: "og:description", content: "Connecting Korean food to the U.S. market. Trusted by buyers, distributors, retailers, and restaurants." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-navy-foreground">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <img src={heroImg} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/85 via-navy-deep/60 to-transparent" />
        <div className="container-page relative grid gap-12 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7">
            <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/85 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-brand-green" /> Official B2B Platform — aT New York Branch
            </div>
            <h1 className="animate-fade-up mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Connecting Korean Food <br />
              <span className="text-brand-green">to the U.S. Market.</span>
            </h1>
            <p className="animate-fade-up mt-6 max-w-xl text-lg leading-relaxed text-white/80" style={{ animationDelay: "80ms" }}>
              A trusted gateway for U.S. buyers, distributors, retailers, and Korean restaurants
              to discover certified Korean food products and verified suppliers.
            </p>
            <div className="animate-fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "160ms" }}>
              <Link to="/products" className="group inline-flex items-center gap-2 rounded-md bg-brand-green px-6 py-3.5 text-sm font-semibold text-white shadow-elegant transition hover:brightness-110">
                Explore Products <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link to="/inquiry" className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
                Contact a Supplier
              </Link>
            </div>

            <div className="animate-fade-up mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-8" style={{ animationDelay: "240ms" }}>
              {[
                { v: "$1.6B", l: "K-food exports to U.S. (2024)" },
                { v: "850+", l: "Verified Korean suppliers" },
                { v: "35yr", l: "aT NY supporting U.S. trade" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-2xl font-bold text-white">{s.v}</div>
                  <div className="mt-1 text-xs leading-relaxed text-white/65">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="border-y border-border bg-secondary/40">
        <div className="container-page flex flex-wrap items-center justify-between gap-6 py-6 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          <span>Trusted partners across the U.S.</span>
          <div className="flex flex-wrap gap-x-10 gap-y-3 text-foreground/60">
            <span>H Mart</span><span>Costco</span><span>Whole Foods</span><span>Amazon Fresh</span><span>Weee!</span><span>Sysco</span>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Featured Categories</div>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
              Discover Korea's most exported food categories.
            </h2>
          </div>
          <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green">
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <Link
              key={p.slug}
              to="/products"
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                <img src={p.image} alt={p.name} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">{p.category}</div>
                <h3 className="mt-2 font-display text-lg font-semibold text-navy">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">{p.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* K-food intro */}
      <section className="bg-secondary/50">
        <div className="container-page grid gap-16 py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> K-Food in America</div>
            <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
              A cultural movement turning into a $2B export market.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Driven by K-pop, K-drama, and a new generation of curious eaters, Korean food has moved from
              niche to mainstream across U.S. retail and food service. aT New York bridges that demand with
              vetted suppliers, regulatory expertise, and trade-show access.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: TrendingUp, t: "+78%", s: "K-food retail growth (2020–2024)" },
                { icon: Globe2, t: "50 States", s: "Distribution coverage" },
                { icon: ShieldCheck, t: "FDA / HACCP", s: "Certified suppliers only" },
                { icon: Award, t: "K-Food Fair", s: "Annual NY trade event" },
              ].map((c) => (
                <div key={c.t} className="rounded-lg border border-border bg-card p-5 shadow-card">
                  <c.icon className="h-5 w-5 text-brand-green" />
                  <div className="mt-3 font-display text-xl font-bold text-navy">{c.t}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.s}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-brand-green/20 blur-2xl" />
            <div className="absolute -bottom-8 -right-4 h-32 w-32 rounded-full bg-navy/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-elegant">
              <img src={heroImg} alt="Korean food export selection" loading="lazy" width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-24">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-hero p-12 text-navy-foreground sm:p-16">
          <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-brand-green/30 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl">
                Ready to source from Korea's leading producers?
              </h2>
              <p className="mt-4 max-w-2xl text-white/75">
                Submit a buyer inquiry and our New York team will match you with verified suppliers
                that fit your category, volume, and certification requirements — usually within 48 hours.
              </p>
            </div>
            <Link to="/inquiry" className="inline-flex items-center gap-2 self-start rounded-md bg-white px-7 py-3.5 text-sm font-semibold text-navy transition hover:bg-white/90 lg:self-end">
              Start a Buyer Inquiry <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
