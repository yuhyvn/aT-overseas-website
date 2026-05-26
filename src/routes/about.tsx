import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  ChefHat,
  ClipboardList,
  Eye,
  Languages,
  Mail,
  MapPin,
  Package,
  Phone,
  Target,
  Users,
  Warehouse,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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

const services: { label: string; icon: LucideIcon }[] = [
  { label: "Agricultural & Fishery Product", icon: Package },
  { label: "BKF (Buy Korean Food) B2B Meeting", icon: Users },
  { label: "Broker Service", icon: ClipboardList },
  { label: "Food Show Support", icon: CalendarCheck },
  { label: "Localization", icon: Languages },
  { label: "Food Demonstrations", icon: ChefHat },
  { label: "Overseas Logistics & Warehouse", icon: Warehouse },
];

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
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <section>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
              <Building2 className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold text-navy">Who We Are</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                aT AMERICA is the U.S. regional headquarters of Korea Agro-Fisheries & Food Trade
                Corporation in Republic of Korea with branch offices in New York, Los Angeles, and
                Sao Paulo (Brazil).
              </p>
              <p>
                Korea Agro-Fisheries & Food Trade Corp. is the government agency that was founded
                in 1967 entrusted with the promotion of trade, exportation, and marketing of Korean
                foods and beverages around the world.
              </p>
              <p>
                Through participation in major exhibitions, improving packaging design, advertising,
                and other initiatives, the Korea Agro-Fisheries & Food Trade Corp. increases
                familiarity of Korean foods and products and caters to the global consumer market.
                It also builds and fosters relationships between manufacturers and exporters with
                importers and distributors.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <h2 className="font-display text-xl font-bold text-navy">Office Information</h2>
            <ul className="mt-5 space-y-4 text-sm text-foreground/85">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.address}</li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.phone}</li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.email}</li>
            </ul>
            <Link to="/contact" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green">
              Contact this office <ArrowRight className="h-4 w-4" />
            </Link>
          </section>
        </div>

        <section className="mt-16 border-t border-border pt-14">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">What We Do</h2>
          <div className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {services.map((service) => (
              <div key={service.label} className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground/70">
                  <service.icon className="h-5 w-5" />
                </div>
                <span className="text-base font-medium text-foreground/80">{service.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-10 border-t border-border pt-14 md:grid-cols-2">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-brand-green">
              <Target className="h-11 w-11" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold text-navy">Mission</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              To ensure food safety for people and contribute to the improvement of life quality
              through promotion of the agro-fishery food industry.
            </p>
          </div>
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full text-brand-green">
              <Eye className="h-11 w-11" />
            </div>
            <h2 className="mt-5 font-display text-3xl font-bold text-navy">Vision</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              A trusted-by-citizens public enterprise specializing in fostering a global
              agro-fishery food industry.
            </p>
          </div>
        </section>
      </section>
    </SiteLayout>
  );
}
