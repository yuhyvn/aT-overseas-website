import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Globe2, Handshake, Users } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About aT New York — Korea Agro-Fisheries & Food Trade Corp." },
      { name: "description", content: "The New York branch of aT promotes Korean food exports to the United States through trade promotion, market research, and buyer matchmaking." },
      { property: "og:title", content: "About aT New York" },
      { property: "og:description", content: "Korea's official agricultural trade promotion office in the United States." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-20">
          <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> About aT New York</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-navy sm:text-5xl">
            Korea's official agricultural trade promotion office in the United States.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            The New York branch of Korea Agro-Fisheries &amp; Food Trade Corporation (aT) has supported
            Korean food exports to the U.S. since 1989. We connect Korean producers with American buyers,
            provide market intelligence, and lead trade-promotion programs across North America.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Handshake, t: "Buyer matchmaking", s: "Vetted introductions between U.S. buyers and Korean manufacturers." },
            { icon: Globe2, t: "Trade missions", s: "Annual K-Food Fairs, NRA Show, Fancy Food, and regional trade visits." },
            { icon: Building2, t: "Market intelligence", s: "Quarterly reports on retail trends, consumer behavior, and regulations." },
            { icon: Users, t: "Producer support", s: "U.S. labeling, FDA registration, and logistics guidance for exporters." },
          ].map((c) => (
            <div key={c.t} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <c.icon className="h-5 w-5 text-brand-green" />
              <h3 className="mt-4 font-display text-base font-semibold text-navy">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.s}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-12 rounded-2xl bg-navy p-10 text-navy-foreground shadow-elegant sm:p-14 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight">Our mission</h2>
            <p className="mt-5 text-white/75">
              To make Korean food accessible, trusted, and commercially successful across the U.S. market —
              and to ensure every Korean producer we represent meets the highest standards of quality,
              safety, and reliability.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-y-8 self-center">
            {[
              ["1989", "Established"],
              ["35+", "Years in NY"],
              ["850+", "Suppliers represented"],
              ["$1.6B", "K-food exports / yr"],
            ].map(([v, l]) => (
              <div key={l}>
                <dt className="font-display text-3xl font-bold text-brand-green">{v}</dt>
                <dd className="mt-1 text-sm text-white/70">{l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-card p-10 shadow-card lg:flex-row lg:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold text-navy">Looking to source from Korea?</h3>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Submit a buyer inquiry and our New York team will follow up within 48 hours.
            </p>
          </div>
          <Link to="/inquiry" className="inline-flex items-center gap-2 rounded-md bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground transition hover:bg-navy-deep">
            Start an Inquiry <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
