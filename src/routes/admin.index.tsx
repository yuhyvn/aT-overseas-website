import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";

export const Route = createFileRoute("/admin/")({
  component: AdminIndexPage,
});

function AdminIndexPage() {
  return (
    <SiteLayout>
      <section className="container-page py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold text-navy">Admin</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            Sign in to manage notices for aT Center New York.
          </p>
          <Link
            to="/admin/login"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-3 text-sm font-semibold text-navy-foreground transition hover:bg-navy-deep"
          >
            Go to admin login <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
