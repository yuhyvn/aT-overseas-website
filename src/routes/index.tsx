import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bell, BookOpen, Building2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { branch } from "@/data/branch";
import { programs } from "@/data/programs";
import { updateCategoryMeta } from "@/data/updates";
import { useNotices } from "@/hooks/use-notices";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${branch.displayName} — ${branch.organization}` },
      {
        name: "description",
        content: `Official website of ${branch.displayName}, ${branch.organization}.`,
      },
      { property: "og:title", content: `${branch.displayName} — ${branch.tagline}` },
      {
        property: "og:description",
        content: `${branch.organization} ${branch.displayName}.`,
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { notices, loading } = useNotices();
  const recent = notices.slice(0, 3);
  const featuredPrograms = programs.slice(0, 4);
  const homeNav = [
    {
      to: "/about" as const,
      label: "About Office",
      description: "Office role and introduction",
      icon: Building2,
    },
    {
      to: "/notifications" as const,
      label: "Notices",
      description: "Latest announcements",
      icon: Bell,
    },
    {
      to: "/programs" as const,
      label: "Support Programs",
      description: "Program information",
      icon: BookOpen,
    },
  ];

  return (
    <SiteLayout>
      <section className="relative overflow-hidden bg-navy-deep text-navy-foreground">
        <div className="container-page py-20 sm:py-24 lg:py-28">
          <div className="max-w-4xl">
            <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" /> aT America
            </div>
            <h1 className="animate-fade-up mt-6 font-display text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
              {branch.displayName}
            </h1>
            <p
              className="animate-fade-up mt-5 max-w-3xl text-base leading-relaxed text-white/80 sm:text-lg"
              style={{ animationDelay: "80ms" }}
            >
              aT Center New York supports Korean agri-food exports and connects Korean suppliers
              with U.S. buyers, importers, and distributors.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container-page -mt-8 pb-14">
          <div className="relative grid overflow-hidden rounded-xl border border-border bg-card shadow-card md:grid-cols-3">
            {homeNav.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className="group flex items-center gap-4 border-b border-border p-5 transition hover:bg-secondary/60 md:border-b-0 md:border-r last:md:border-r-0"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green transition group-hover:bg-brand-green group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-base font-bold text-navy">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </span>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-brand-green" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/35">
        <div className="container-page py-14 sm:py-16">
          <div className="max-w-4xl">
            <div>
              <div className="eyebrow">
                <span className="h-px w-8 bg-brand-green" /> Office Information
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
                New York-specific trade support, separated from the regional site
              </h2>
              <div className="mt-5 grid gap-3 text-base leading-7 text-muted-foreground">
                <p>
                  This site is organized for {branch.displayName} as an individual overseas center,
                  while referencing the broader aT Center America regional content.
                </p>
                <p>
                  It focuses on office information, official notices, and support programs for the
                  U.S. market.
                </p>
              </div>
              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green"
              >
                Read more about this office <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow">
              <span className="h-px w-8 bg-brand-green" /> Recent Notices
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
              Latest announcements
            </h2>
          </div>
          <Link
            to="/notifications"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green"
          >
            View all notices <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {loading ? (
          <div className="mt-10 rounded-xl border border-border bg-card px-5 py-6 text-sm text-muted-foreground">
            Loading latest notices...
          </div>
        ) : recent.length > 0 ? (
          <ul className="mt-10 divide-y divide-border rounded-xl border border-border bg-card">
            {recent.map((u) => (
              <li key={u.id} className="px-5 py-4 transition hover:bg-secondary/40 sm:px-6">
                <Link
                  to="/notifications/$id"
                  params={{ id: u.id }}
                  className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-green">
                      {updateCategoryMeta[u.category].label}
                    </div>
                    <div className="mt-1 truncate font-medium text-navy">{u.title}</div>
                  </div>
                  <div className="shrink-0 text-xs text-muted-foreground">{u.date}</div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-card px-5 py-6 text-sm text-muted-foreground">
            No notices have been published yet.
          </div>
        )}
      </section>

      <section className="border-y border-border bg-secondary/35">
        <div className="container-page py-14 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow">
                <span className="h-px w-8 bg-brand-green" /> Support Programs
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
                Programs that support Korean food exports
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                Learn about BKF B2B meetings, localization support, food demonstrations, and
                overseas logistics programs.
              </p>
            </div>
            <Link
              to="/programs"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green"
            >
              <BookOpen className="h-4 w-4" /> Go to Support Programs
            </Link>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {featuredPrograms.map((program) => {
              const Icon = program.icon;

              return (
                <Link
                  key={program.slug}
                  to="/programs/$slug"
                  params={{ slug: program.slug }}
                  className="group rounded-xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
                >
                  <Icon className="h-6 w-6 text-brand-green" />
                  <h3 className="mt-4 font-display text-base font-bold text-navy">
                    {program.shortName}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{program.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-navy group-hover:text-brand-green">
                    View details <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
