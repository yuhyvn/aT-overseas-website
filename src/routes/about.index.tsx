import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  ChefHat,
  Crosshair,
  Eye,
  Globe2,
  Handshake,
  Store,
  MonitorPlay,
  Tractor,
  Warehouse,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About Office — aT New York" },
      {
        name: "description",
        content:
          "Learn about the aT Center New York site, adapted from the broader aT Center America regional content.",
      },
      { property: "og:title", content: "About Office — aT New York" },
      {
        property: "og:description",
        content:
          "An individual overseas center site for aT Center New York, with regional aT Center America content used as reference.",
      },
    ],
  }),
  component: AboutIndex,
});

const services = [
  { icon: Tractor, label: "Agricultural & Fishery Product" },
  { icon: Handshake, label: "BKF (Buy Korean Food) B2B Meeting" },
  { icon: BadgeCheck, label: "Broker Service" },
  { icon: Store, label: "Food Show Support" },
  { icon: Globe2, label: "Localization" },
  { icon: ChefHat, label: "Food Demonstrations" },
  { icon: Warehouse, label: "Overseas Logistics & Warehouse" },
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
            aT Center New York is an individual center site based on the aT Center America regional
            model.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground">
            The existing aT Center America website represents the broader regional network,
            including New York, Los Angeles, and Sao Paulo. This project separates that regional
            content into individual overseas center sites, starting with New York.
          </p>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="max-w-4xl">
          <h2 className="font-display text-2xl font-bold text-navy">Who We Are</h2>
          <div className="mt-5 space-y-3 text-base leading-relaxed text-muted-foreground">
            <p>
              This page keeps the core institutional information from the regional aT Center America
              content, but presents it through the lens of the New York office. The same format can
              later be reused for Los Angeles, Houston, Sao Paulo, and other centers.
            </p>
            <p>
              Korea Agro-Fisheries &amp; Food Trade Corp. is the government agency that was founded
              in 1967 entrusted with the promotion of trade, exportation, and marketing of Korean
              foods and beverages around the world.
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
