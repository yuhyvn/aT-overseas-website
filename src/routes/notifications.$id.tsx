import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Download, Mail, MapPin, Paperclip } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { branch } from "@/data/branch";
import { updateCategoryMeta } from "@/data/updates";
import { useNotices } from "@/hooks/use-notices";

export const Route = createFileRoute("/notifications/$id")({
  head: () => ({
    meta: [
      { title: "Notice — aT New York" },
      {
        name: "description",
        content: "Notice detail from aT Center New York.",
      },
    ],
  }),
  component: NoticeDetailPage,
});

function NoticeDetailPage() {
  const { id } = Route.useParams();
  const { notices, loading } = useNotices();
  const notice = notices.find((item) => item.id === id);

  if (loading) {
    return (
      <SiteLayout>
        <section className="container-page py-28 text-center">
          <h1 className="font-display text-3xl font-bold text-navy">Loading notice...</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Please wait while the notice is loaded from Supabase.
          </p>
        </section>
      </SiteLayout>
    );
  }

  if (!notice) {
    return (
      <SiteLayout>
        <section className="container-page py-28 text-center">
          <h1 className="font-display text-3xl font-bold text-navy">Notice not found</h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            This notice may have been removed or is not available yet.
          </p>
          <Link
            to="/notifications"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-3 text-sm font-semibold text-navy-foreground transition hover:bg-navy-deep"
          >
            <ArrowLeft className="h-4 w-4" /> Back to notices
          </Link>
        </section>
      </SiteLayout>
    );
  }

  const meta = updateCategoryMeta[notice.category];
  const Icon = meta.icon;
  const attachments = notice.attachments ?? [];

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-16 sm:py-20">
          <Link
            to="/notifications"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" /> Back to notices
          </Link>
          <div className="mt-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground shadow-card">
              <Icon className={`h-3.5 w-3.5 ${meta.accent}`} />
              {meta.label}
            </div>
          </div>
          <h1 className="mt-5 max-w-4xl font-display text-2xl font-bold leading-snug text-navy sm:text-4xl">
            {notice.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" /> {notice.date}
            </span>
            {notice.location && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {notice.location}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <article className="rounded-2xl border border-border bg-card p-8 shadow-card sm:p-10">
            <div className="whitespace-break-spaces text-base leading-[1.65] text-foreground/80">
              {notice.content ?? notice.summary}
            </div>
          </article>

          <aside className="space-y-6 self-start">
            {attachments.length > 0 && (
              <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                  <Paperclip className="h-5 w-5" />
                </div>
                <h2 className="mt-4 font-display text-lg font-bold text-navy">Attachments</h2>
                <div className="mt-4 space-y-2">
                  {attachments.map((attachment, index) => (
                    <a
                      key={`${attachment.url}-${index}`}
                      href={attachment.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background px-3 py-2 text-sm text-navy transition hover:border-brand-green hover:bg-brand-green/5"
                    >
                      <span className="min-w-0 truncate">{attachment.name}</span>
                      <Download className="h-4 w-4 shrink-0 text-brand-green" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <h2 className="font-display text-lg font-bold text-navy">Need more information?</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Contact {branch.displayName} directly by email.
              </p>
              <a
                href={`mailto:${branch.email}`}
                className="mt-5 inline-flex items-center gap-2 rounded-md bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green/90"
              >
                <Mail className="h-4 w-4" /> Email aT NY
              </a>
            </div>

            <Link
              to="/programs"
              className="group block rounded-2xl bg-gradient-hero p-7 text-navy-foreground shadow-elegant"
            >
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
                Support Programs
              </div>
              <h2 className="mt-3 font-display text-lg font-bold">Explore related programs</h2>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition group-hover:gap-2">
                View programs <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}
