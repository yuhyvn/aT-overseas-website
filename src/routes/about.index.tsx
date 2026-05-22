import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Compass, Target } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "About aT New York — Korea Agro-Fisheries & Food Trade Corp." },
      { name: "description", content: "Learn about aT New York: who we are, our role in U.S.–Korea food trade, and the mission and vision guiding our work." },
      { property: "og:title", content: "About aT New York" },
      { property: "og:description", content: "Korea's official agricultural trade promotion office in the United States." },
    ],
  }),
  component: AboutIndex,
});

const sections = [
  { to: "/about/who-we-are", icon: Building2, label: "Who We Are", desc: "Korea's official agricultural trade promotion agency and its New York branch." },
  { to: "/about/our-role", icon: Compass, label: "Our Role", desc: "How we connect Korean producers with U.S. buyers, retailers, and food service." },
  { to: "/about/mission-vision", icon: Target, label: "Mission & Vision", desc: "What guides our long-term commitment to K-food in the global market." },
] as const;

function AboutIndex() {
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
            Korean food exports to the U.S. since 1989 — connecting producers with American buyers,
            shaping trade-promotion programs, and providing market intelligence across North America.
          </p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="group flex flex-col rounded-xl border border-border bg-card p-7 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <s.icon className="h-6 w-6 text-brand-green" />
              <h2 className="mt-5 font-display text-xl font-semibold text-navy">{s.label}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition group-hover:gap-2">
                Read more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
