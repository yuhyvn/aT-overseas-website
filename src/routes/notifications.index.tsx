import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, MapPin, Plus, Search } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { updateCategoryMeta, type UpdateCategory } from "@/data/updates";
import { useNotices } from "@/hooks/use-notices";
import { getActiveSession, hasSupabaseConfig } from "@/lib/supabase";

export const Route = createFileRoute("/notifications/")({
  head: () => ({
    meta: [
      { title: "Notifications — aT New York K-Food Platform" },
      {
        name: "description",
        content:
          "Latest announcements from aT New York: export support, trade exhibitions, buyer matching events, K-food industry updates, and import regulation changes.",
      },
      { property: "og:title", content: "Notifications — aT New York" },
      {
        property: "og:description",
        content: "Trade announcements, events, and regulatory updates for U.S.–Korea food trade.",
      },
    ],
  }),
  component: NotificationsPage,
});

const filters: { value: "all" | UpdateCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "bidding", label: "Bidding" },
  { value: "careers", label: "Careers" },
  { value: "exhibitions", label: "Exhibitions" },
  { value: "others", label: "Others" },
];

function NotificationsPage() {
  const [active, setActive] = useState<"all" | UpdateCategory>("all");
  const [query, setQuery] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const { notices, loading } = useNotices();
  const normalizedQuery = query.trim().toLowerCase();
  const filtered = notices.filter((u) => {
    const matchesCategory = active === "all" || u.category === active;
    const matchesQuery =
      !normalizedQuery ||
      [u.title, u.summary, u.location, updateCategoryMeta[u.category].label]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery));

    return matchesCategory && matchesQuery;
  });

  useEffect(() => {
    if (!hasSupabaseConfig()) return;

    let cancelled = false;

    async function checkSession() {
      try {
        const session = await getActiveSession();
        if (!cancelled) setIsSignedIn(Boolean(session));
      } catch {
        if (!cancelled) setIsSignedIn(false);
      }
    }

    void checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="eyebrow">
                <span className="h-px w-8 bg-brand-green" /> Notifications
              </div>
              <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-navy sm:text-5xl">
                Announcements, events, and updates from the K-Food trade desk.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
                A live channel for bidding opportunities, career announcements, exhibition updates,
                and other official notices from aT New York.
              </p>
            </div>

            {hasSupabaseConfig() && isSignedIn && (
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  to="/admin/notices"
                  className="inline-flex items-center gap-2 rounded-md bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-brand-green-dark"
                >
                  <Plus className="h-4 w-4" /> Register notice
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-5 border-b border-border pb-6 lg:grid-cols-[1fr_320px] lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
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
          <label className="relative block">
            <span className="sr-only">Search notices</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search notices"
              className="h-10 w-full rounded-md border border-input bg-card pl-9 pr-3 text-sm text-foreground outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/15"
            />
          </label>
        </div>

        {loading ? (
          <div className="mt-10 rounded-xl border border-border bg-card p-10 text-center shadow-card">
            <h2 className="font-display text-lg font-semibold text-navy">Loading notices...</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fetching the latest notices from Supabase.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((u, i) => {
              const meta = updateCategoryMeta[u.category];
              const Icon = meta.icon;
              return (
                <Link
                  key={u.id}
                  to="/notifications/$id"
                  params={{ id: u.id }}
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
                  <h2 className="mt-4 font-display text-lg font-semibold leading-snug text-navy">
                    {u.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-4">
                    {u.summary}
                  </p>
                  {u.location && (
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {u.location}
                    </div>
                  )}
                  <span className="mt-5 inline-flex items-center gap-1.5 border-t border-border pt-4 text-sm font-semibold text-navy transition group-hover:gap-2">
                    Read notice <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="mt-10 rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <h2 className="font-display text-lg font-semibold text-navy">No notices found</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Try another keyword or choose a different category.
            </p>
          </div>
        )}
      </section>
    </SiteLayout>
  );
}
