import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, FileText, Megaphone, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { branch } from "@/data/branch";
import { programs } from "@/data/programs";
import { updates, updateCategoryMeta } from "@/data/updates";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${branch.displayName} — ${branch.organization}` },
      {
        name: "description",
        content: `Official website of ${branch.displayName}, the ${branch.branchName} overseas office of ${branch.organization} (${branch.organizationShort}) supporting Korean agri-food exports to the ${branch.market} market.`,
      },
      { property: "og:title", content: `${branch.displayName} — Official Overseas Office` },
      { property: "og:description", content: `Official ${branch.market} office of ${branch.organization}.` },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const recent = updates.slice(0, 3);

  return (
    <SiteLayout>
      {/* Hero — solid navy, official tone */}
      <section className="relative overflow-hidden bg-navy-deep text-navy-foreground">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-green/10 blur-3xl" />
        <div className="container-page relative py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
              Official Overseas Office — {branch.organizationShort} {branch.branchName} Center
            </div>
            <h1 className="animate-fade-up mt-6 font-display text-3xl font-bold leading-[1.1] sm:text-5xl lg:text-[3.4rem]">
              {branch.displayName}
              <span className="mt-3 block text-white/85 text-2xl font-semibold sm:text-3xl lg:text-4xl">
                Supporting Korean agri-food exports to the {branch.market} market.
              </span>
            </h1>
            <p className="animate-fade-up mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg" style={{ animationDelay: "80ms" }}>
              {branch.organization}'s overseas office in {branch.branchName} —
              providing trade promotion, market information, and buyer–supplier
              support for Korean food and beverage products in the United States.
            </p>
            <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ animationDelay: "160ms" }}>
              <Link
                to="/about"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-brand-green px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:opacity-90"
              >
                About the Office <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/programs"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-navy-deep transition hover:bg-white/90"
              >
                Support Programs
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Office
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links — three calm cards */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { to: "/about", icon: Building2, label: "About Office", desc: "Who we are, our role, mission, and vision." },
            { to: "/notifications", icon: Megaphone, label: "Latest Notices", desc: "Announcements, events, and regulatory updates." },
            { to: "/programs", icon: FileText, label: "Support Programs", desc: "Trade-promotion programs available to U.S. partners." },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-base font-semibold text-navy">{c.label}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-navy transition group-hover:gap-1.5">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Office intro */}
      <section className="bg-secondary/50">
        <div className="container-page py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> About the Office</div>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
                Korea's official agri-food trade office in {branch.branchName}.
              </h2>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Established in {branch.establishedYear}, the {branch.displayName} office
                supports Korean producers and {branch.market} buyers through trade-promotion programs,
                market intelligence, and on-the-ground assistance across the {branch.market} market.
              </p>
              <Link to="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green">
                Learn more about the office <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {programs.slice(0, 4).map((p) => (
                <Link
                  key={p.slug}
                  to="/programs/$slug"
                  params={{ slug: p.slug }}
                  className="group rounded-xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-green/10 text-brand-green">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-display text-sm font-semibold text-navy">{p.shortName}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">{p.tagline}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent notices — simple list */}
      <section className="container-page py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Recent Notices</div>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
              Latest announcements from the office.
            </h2>
          </div>
          <Link to="/notifications" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green">
            View all notices <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-8 divide-y divide-border rounded-xl border border-border bg-card shadow-card">
          {recent.map((u) => {
            const meta = updateCategoryMeta[u.category];
            const Icon = meta.icon;
            return (
              <li key={u.id}>
                <Link
                  to="/notifications"
                  className="group flex flex-col gap-3 p-5 transition hover:bg-secondary/40 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
                >
                  <div className="flex items-center gap-3 sm:w-56 sm:shrink-0">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      <Icon className={`h-3.5 w-3.5 ${meta.accent}`} />
                      {meta.label}
                    </div>
                    <span className="text-xs text-muted-foreground">{u.date}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold leading-snug text-navy">{u.title}</h3>
                    {u.location && (
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {u.location}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="hidden h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-navy sm:block" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Contact CTA */}
      <section className="container-page pb-24">
        <div className="rounded-2xl bg-gradient-hero p-10 text-navy-foreground shadow-elegant sm:p-14">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">
                Have a question for the {branch.branchName} office?
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
                Our team responds to buyer, supplier, and general inquiries
                {" "}{branch.officeHours.responseTime.toLowerCase()}.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:bg-white/90 lg:self-end"
            >
              Contact the Office <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
