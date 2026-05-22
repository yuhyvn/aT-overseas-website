import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin, CalendarDays } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { updates, updateCategoryMeta, type UpdateCategory } from "@/data/updates";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — aT New York K-Food Platform" },
      { name: "description", content: "Latest announcements from aT New York: export support, trade exhibitions, buyer matching events, K-food industry updates, and import regulation changes." },
      { property: "og:title", content: "Notifications — aT New York" },
      { property: "og:description", content: "Trade announcements, events, and regulatory updates for U.S.–Korea food trade." },
    ],
  }),
  component: NotificationsPage,
});

const filters: { value: "all" | UpdateCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "export-support", label: "Export Support" },
  { value: "trade-exhibition", label: "Trade Exhibitions" },
  { value: "buyer-matching", label: "Buyer Matching" },
  { value: "industry-update", label: "Industry" },
  { value: "import-regulation", label: "Regulations" },
];

function NotificationsPage() {
  const [active, setActive] = useState<"all" | UpdateCategory>("all");
  const filtered = active === "all" ? updates : updates.filter((u) => u.category === active);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-20">
          <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Notifications</div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-navy sm:text-5xl">
            Announcements, events, and updates from the K-Food trade desk.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A live channel of export-support announcements, trade exhibitions, buyer-matching
            programs, industry insights, and U.S. import-regulation changes — curated by aT New York.
          </p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-6">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                active === f.value
                  ? "bg-navy text-navy-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-navy"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((u, i) => {
            const meta = updateCategoryMeta[u.category];
            const Icon = meta.icon;
            return (
              <article
                key={u.id}
                className="group flex flex-col rounded-xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    <Icon className={`h-3.5 w-3.5 ${meta.accent}`} />
                    {meta.label}
                  </div>
                  <span className="text-xs text-muted-foreground">{u.date}</span>
                </div>
                <h2 className="mt-4 font-display text-lg font-semibold leading-snug text-navy">{u.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">{u.summary}</p>
                {u.location && (
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {u.location}
                  </div>
                )}
                {u.actionLabel && u.actionHref && (
                  <div className="mt-5 border-t border-border pt-4">
                    {u.actionHref.startsWith("/") ? (
                      <Link to={u.actionHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition group-hover:gap-2">
                        {u.actionLabel} <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <a href={u.actionHref} className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition group-hover:gap-2">
                        {u.actionLabel} <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-12 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4" />
          <span>Last updated: May 20, 2026</span>
        </div>
      </section>
    </SiteLayout>
  );
}
