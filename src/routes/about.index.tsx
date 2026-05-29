import { createFileRoute } from "@tanstack/react-router";
import { Building2, Compass, Target, Eye, Handshake, Languages, ChefHat, Warehouse, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { branch } from "@/data/branch";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: `About Office — ${branch.displayName}` },
      { name: "description", content: `About ${branch.displayName}: who we are, what we do, our mission and vision in supporting Korean agri-food exports to the ${branch.market} market.` },
      { property: "og:title", content: `About — ${branch.displayName}` },
      { property: "og:description", content: `Official ${branch.market} office of ${branch.organization}.` },
    ],
  }),
  component: AboutOfficePage,
});

const whatWeDo = [
  { icon: Handshake, title: "Buyer–Supplier Support", desc: "Curated introductions between U.S. buyers and Korean exporters." },
  { icon: Languages, title: "Localization Assistance", desc: "U.S. labeling, compliance, and packaging adaptation guidance." },
  { icon: ChefHat, title: "Food Demonstrations", desc: "In-store sampling and chef-led activations at U.S. retailers." },
  { icon: Warehouse, title: "Logistics & Warehousing", desc: "Cold-chain, bonded storage, and distribution coordination." },
];

function AboutOfficePage() {
  return (
    <SiteLayout>
      {/* Header */}
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-16 sm:py-20">
          <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> About Office</div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
            {branch.displayName}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Official {branch.market} overseas office of {branch.organization} ({branch.organizationShort}).
            Established in {branch.branchName} in {branch.establishedYear} to support
            Korean agri-food exports and {branch.market} market partners.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Building2 className="h-6 w-6 text-brand-green" />
            <h2 className="mt-4 font-display text-2xl font-bold text-navy sm:text-3xl">Who We Are</h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
            <p>
              {branch.organization} ({branch.organizationShort}) is the public agency
              entrusted with the promotion of trade, exportation, and marketing of
              Korean agri-food and beverage products worldwide.
            </p>
            <p>
              The {branch.displayName} office serves as {branch.organizationShort}'s
              official overseas branch in the {branch.market} market — operating from
              {" "}{branch.branchName} to support Korean producers and {branch.market}
              {" "}buyers, distributors, retailers, and food-service operators.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-secondary/50">
        <div className="container-page py-16 sm:py-20">
          <div className="max-w-2xl">
            <Compass className="h-6 w-6 text-brand-green" />
            <h2 className="mt-4 font-display text-2xl font-bold text-navy sm:text-3xl">What We Do</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              The office runs four core programs designed to remove operational
              barriers between Korean producers and the {branch.market} market.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {whatWeDo.map((w) => (
              <div
                key={w.title}
                className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-navy">{w.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link to="/programs" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green">
              View all support programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-card sm:p-10">
            <Target className="h-6 w-6 text-brand-green" />
            <h2 className="mt-4 font-display text-xl font-bold text-navy sm:text-2xl">Mission</h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
              Promote Korean agri-food exports through trade infrastructure,
              buyer support, and producer development — strengthening Korea's
              position as a trusted global food origin in the {branch.market} market.
            </p>
          </div>
          <div className="rounded-2xl bg-gradient-hero p-8 text-navy-foreground shadow-elegant sm:p-10">
            <Eye className="h-6 w-6 text-brand-green" />
            <h2 className="mt-4 font-display text-xl font-bold sm:text-2xl">Vision</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">
              A future where Korean food is broadly available across {branch.market}
              {" "}retail and food-service — sourced from a transparent, certified,
              and resilient supply chain that benefits Korean producers and
              {" "}{branch.market} consumers alike.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
