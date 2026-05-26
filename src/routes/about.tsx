import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Compass, Target, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { branch } from "@/data/branch";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Office — ${branch.displayName}` },
      { name: "description", content: `Introduction to the ${branch.displayName} branch of ${branch.organization} (${branch.organizationShort}) and its role in supporting Korean agri-food exports to the ${branch.market} market.` },
      { property: "og:title", content: `About Office — ${branch.displayName}` },
      { property: "og:description", content: `Official overseas branch of ${branch.organization} in ${branch.branchName}.` },
    ],
  }),
  component: AboutOffice,
});

function AboutOffice() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-16 sm:py-20">
          <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> About Office</div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold text-navy sm:text-4xl">
            {branch.displayName} Branch
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            The {branch.branchName} branch of {branch.organization} ({branch.organizationShort}) serves
            as the official overseas office supporting Korean agri-food exports and providing trade
            information for the {branch.market} market.
          </p>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-3">
          <Block icon={Building2} title="Who We Are">
            <p>
              {branch.organization} ({branch.organizationShort}) is a public corporation under the
              Korean Ministry of Agriculture, Food and Rural Affairs. The {branch.branchName} branch
              has supported Korean agri-food exports to the {branch.market} market since
              {" "}{branch.establishedYear}.
            </p>
          </Block>
          <Block icon={Compass} title="Our Role">
            <p>
              We provide market information, support Korean food suppliers entering the
              {" "}{branch.market} market, and assist {branch.market} buyers, distributors, retailers,
              and Korean restaurants in sourcing Korean food products through verified channels.
            </p>
          </Block>
          <Block icon={Target} title="Mission &amp; Vision">
            <p>
              To expand the global presence of Korean agri-food products by acting as a reliable
              bridge between Korean producers and overseas trade partners — guided by transparency,
              long-term partnership, and public service.
            </p>
          </Block>
        </div>

        <div className="mt-16 grid gap-8 rounded-2xl border border-border bg-card p-8 shadow-card sm:p-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Office introduction</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              The {branch.branchName} branch operates as a contact point for {branch.market} buyers
              interested in Korean food products, and supports Korean exporters with local market
              information, trade programs, and on-the-ground assistance.
            </p>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green">
              Contact this office <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="space-y-3 text-sm text-foreground/85">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.address}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.phone}</li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.email}</li>
          </ul>
        </div>
      </section>
    </SiteLayout>
  );
}

function Block({ icon: Icon, title, children }: { icon: typeof Building2; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
        <Icon className="h-5 w-5" />
      </div>
      <h2 className="mt-5 font-display text-lg font-semibold text-navy">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}
