import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { branch } from "@/data/branch";
import { updates, updateCategoryMeta, type UpdateCategory } from "@/data/updates";

export const Route = createFileRoute("/notices")({
  head: () => ({
    meta: [
      { title: `Notices — ${branch.displayName}` },
      { name: "description", content: `Announcements and notices from ${branch.displayName}: export support, trade exhibitions, buyer matching, industry updates, and import regulation information.` },
      { property: "og:title", content: `Notices — ${branch.displayName}` },
      { property: "og:description", content: `Official notices from the ${branch.branchName} branch.` },
    ],
  }),
  component: NoticesPage,
});

const filters: { value: "all" | UpdateCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "export-support", label: "Export Support" },
  { value: "trade-exhibition", label: "Trade Exhibitions" },
  { value: "buyer-matching", label: "Buyer Matching" },
  { value: "industry-update", label: "Industry" },
  { value: "import-regulation", label: "Regulations" },
];

function NoticesPage() {
  const [active, setActive] = useState<"all" | UpdateCategory>("all");
  const filtered = active === "all" ? updates : updates.filter((u) => u.category === active);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-16 sm:py-20">
          <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Notices</div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold text-navy sm:text-4xl">
            Announcements from {branch.displayName}.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Official notices on export support, trade exhibitions, buyer-matching programs,
            industry information, and import-regulation updates for the {branch.market} market.
          </p>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-5">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                active === f.value
                  ? "bg-navy text-navy-foreground"
                  : "border border-border bg-card text-muted-foreground hover:text-navy"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
          {filtered.map((u) => {
            const meta = updateCategoryMeta[u.category];
            const Icon = meta.icon;
            const content = (
              <div className="flex flex-col gap-2 px-5 py-5 sm:flex-row sm:items-start sm:gap-6">
                <div className="flex shrink-0 items-center gap-2 sm:w-44">
                  <Icon className={`h-4 w-4 ${meta.accent}`} />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{meta.label}</span>
                </div>
                <div className="flex-1">
                  <h2 className="font-display text-base font-semibold text-navy">{u.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{u.summary}</p>
                  {u.location && (
                    <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" /> {u.location}
                    </div>
                  )}
                </div>
                <div className="shrink-0 text-xs text-muted-foreground sm:w-24 sm:text-right">{u.date}</div>
              </div>
            );
            return (
              <li key={u.id} className="group transition hover:bg-secondary/40">
                {u.actionHref?.startsWith("/") ? (
                  <Link to={u.actionHref}>{content}</Link>
                ) : (
                  <div>{content}</div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center text-sm text-muted-foreground">
          For inquiries about a notice, please <Link to="/contact" className="font-semibold text-navy hover:text-brand-green">contact this office <ArrowRight className="ml-0.5 inline h-3.5 w-3.5" /></Link>.
        </div>
      </section>
    </SiteLayout>
  );
}
