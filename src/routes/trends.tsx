import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, TrendingUp, DollarSign, ShoppingBag, Globe2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/trends")({
  head: () => ({
    meta: [
      { title: "Market Trends — K-Food in the U.S. | aT New York" },
      { name: "description", content: "Latest K-food trends, U.S. import data, retail growth, and Korean food market insights from aT New York." },
      { property: "og:title", content: "K-Food Market Trends — aT New York" },
      { property: "og:description", content: "Insights on Korean food growth across U.S. retail and food service." },
    ],
  }),
  component: TrendsPage,
});

const kpis = [
  { icon: DollarSign, label: "K-food exports to U.S.", value: "$1.62B", change: "+18.4%", note: "YoY 2024" },
  { icon: ShoppingBag, label: "Retail SKU growth", value: "+2,140", change: "+31%", note: "New listings 2024" },
  { icon: TrendingUp, label: "Avg. category growth", value: "12.8%", change: "Top: Frozen", note: "Last 12 months" },
  { icon: Globe2, label: "Distribution states", value: "50/50", change: "Nationwide", note: "Major chains" },
];

const categoryGrowth = [
  { name: "Ramen", pct: 86 },
  { name: "Frozen Mandu", pct: 74 },
  { name: "Sauces", pct: 62 },
  { name: "Snacks", pct: 58 },
  { name: "Kimchi", pct: 49 },
  { name: "Beverages", pct: 38 },
];

const news = [
  { tag: "Retail", title: "H Mart expands to 100+ U.S. locations, doubling shelf space for Korean SKUs", date: "May 12, 2026" },
  { tag: "Policy", title: "FDA updates fermented-food labeling guidance — aT NY publishes compliance brief", date: "Apr 28, 2026" },
  { tag: "Trade", title: "K-Food Fair New York 2026 returns to Javits Center with 200+ Korean exhibitors", date: "Apr 04, 2026" },
  { tag: "Insight", title: "Frozen Korean meals overtake sushi in U.S. grocery growth rate for Q1", date: "Mar 19, 2026" },
];

function TrendsPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-20">
          <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Market Trends Dashboard</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-navy sm:text-5xl">
            U.S. Korean food market — live insights for buyers.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Updated quarterly by the aT New York research team using customs data, Nielsen retail panels,
            and direct importer reporting.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <div className="flex items-center justify-between">
                <k.icon className="h-5 w-5 text-brand-green" />
                <span className="text-xs font-semibold text-brand-green">{k.change}</span>
              </div>
              <div className="mt-5 font-display text-3xl font-bold text-navy">{k.value}</div>
              <div className="mt-1 text-sm font-medium text-foreground/80">{k.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{k.note}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-5">
          {/* Chart card */}
          <div className="rounded-xl border border-border bg-card p-7 shadow-card lg:col-span-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-bold text-navy">Category retail growth — 12 months</h2>
                <p className="mt-1 text-sm text-muted-foreground">% change in U.S. retail dollar sales vs. prior year.</p>
              </div>
              <span className="rounded-md bg-brand-green/15 px-2.5 py-1 text-xs font-semibold text-brand-green">2024–2025</span>
            </div>
            <div className="mt-8 space-y-5">
              {categoryGrowth.map((c) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground/85">{c.name}</span>
                    <span className="font-display font-bold text-navy">+{c.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-gradient-accent transition-all" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular categories */}
          <div className="rounded-xl border border-border bg-navy p-7 text-navy-foreground shadow-elegant lg:col-span-2">
            <h2 className="font-display text-xl font-bold">Top categories — buyer demand</h2>
            <p className="mt-1 text-sm text-white/65">Most-requested via aT NY buyer inquiry portal.</p>
            <ul className="mt-7 divide-y divide-white/10">
              {[
                ["01", "Frozen meals & mandu", "32% of inquiries"],
                ["02", "Premium ramen", "21%"],
                ["03", "Sauces & gochujang", "16%"],
                ["04", "Functional drinks", "11%"],
                ["05", "Kimchi & ferments", "9%"],
              ].map(([i, t, s]) => (
                <li key={i} className="flex items-center justify-between py-3.5">
                  <div className="flex items-center gap-4">
                    <span className="font-display text-sm text-brand-green">{i}</span>
                    <span className="text-sm font-medium">{t}</span>
                  </div>
                  <span className="text-xs text-white/60">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* News */}
        <div className="mt-16">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-navy">Recent insights & news</h2>
            <span className="text-sm text-muted-foreground">Curated by aT NY research</span>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {news.map((n) => (
              <a key={n.title} href="#" className="group block rounded-xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant">
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-navy">{n.tag}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-brand-green" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold leading-snug text-navy group-hover:text-navy-deep">{n.title}</h3>
                <div className="mt-3 text-xs text-muted-foreground">{n.date}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
