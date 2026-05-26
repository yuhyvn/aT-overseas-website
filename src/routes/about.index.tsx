import { createFileRoute } from "@tanstack/react-router";
import {
  ClipboardList,
  Crosshair,
  Eye,
  Handshake,
  Languages,
  PackageCheck,
  Presentation,
  Ship,
  Store,
  Utensils,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About Office — aT New York" },
      {
        name: "description",
        content:
          "Learn about the aT New York branch site, adapted from the broader aT Center America regional content.",
      },
      { property: "og:title", content: "About Office — aT New York" },
      {
        property: "og:description",
        content:
          "An individual overseas branch site for aT New York, with regional aT Center America content used as reference.",
      },
    ],
  }),
  component: AboutIndex,
});

const services = [
  { icon: PackageCheck, label: "Agricultural & Fishery Product" },
  { icon: Handshake, label: "BKF (Buy Korean Food) B2B Meeting" },
  { icon: ClipboardList, label: "Broker Service" },
  { icon: Presentation, label: "Food Show Support" },
  { icon: Languages, label: "Localization" },
  { icon: Utensils, label: "Food Demonstrations" },
  { icon: Ship, label: "Overseas Logistics & Warehouse" },
] as const;

function AboutIndex() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-16 sm:py-20">
          <div className="eyebrow">
            <span className="h-px w-8 bg-brand-green" /> About Office
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold text-navy sm:text-4xl">
            aT New York is an individual branch site based on the aT Center America regional model.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The existing aT Center America website represents the broader regional network,
            including New York, Los Angeles, and Sao Paulo. This project separates that regional
            content into individual overseas branch sites, starting with New York.
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <h2 className="font-display text-2xl font-bold text-navy">Who We Are</h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                This page keeps the core institutional information from the regional aT Center
                America content, but presents it through the lens of the New York office. The same
                format can later be reused for Los Angeles, Houston, Sao Paulo, and other branches.
              </p>
              <p>
                Korea Agro-Fisheries &amp; Food Trade Corp. is the government agency that was
                founded in 1967 entrusted with the promotion of trade, exportation, and marketing of
                Korean foods and beverages around the world.
              </p>
              <p>
                Through participation in major exhibitions, improving packaging design, advertising,
                and other initiatives, Korea Agro-Fisheries &amp; Food Trade Corp. increases
                familiarity of Korean foods and products and caters to the global consumer market.
              </p>
              <p>
                It also builds and fosters relationships between manufacturers, exporters with
                importers, and distributors.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                <Store className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-lg font-semibold text-navy">Site Structure</h2>
                <p className="text-sm text-muted-foreground">
                  Regional reference, individual branch site
                </p>
              </div>
            </div>
            <dl className="mt-6 grid gap-3 text-sm">
              <InfoRow label="Current Site" value="New York Branch" />
              <InfoRow label="Reference" value="aT Center America regional content" />
              <InfoRow label="Future Sites" value="Los Angeles, Houston, Sao Paulo, and others" />
            </dl>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="container-page py-14 sm:py-16">
          <h2 className="font-display text-2xl font-bold text-navy">What We Do</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-lg bg-card p-4 shadow-card"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <item.icon className="h-5 w-5" />
                </div>
                <div className="text-sm font-medium text-foreground/85">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <Statement icon={Crosshair} title="Mission">
            To ensure food safety for people and contribute to the improvement of life quality
            through promotion of the agro-fishery food industry.
          </Statement>
          <Statement icon={Eye} title="Vision">
            A trusted-by-citizens public enterprise specializing in fostering a global agro-fishery
            food industry.
          </Statement>
        </div>
      </section>
    </SiteLayout>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-border/70 pb-3 last:border-0 last:pb-0">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-medium text-foreground">{value}</dd>
    </div>
  );
}

function Statement({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Crosshair;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
        <Icon className="h-7 w-7" />
      </div>
      <h2 className="mt-5 font-display text-2xl font-bold text-navy">{title}</h2>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
        {children}
      </p>
    </div>
  );
}
