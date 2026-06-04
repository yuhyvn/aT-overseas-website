import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { getActiveSession, hasSupabaseConfig, signInAdmin } from "@/lib/supabase";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasSupabaseConfig()) return;

    async function redirectSignedInAdmin() {
      try {
        const session = await getActiveSession();
        if (session) await navigate({ to: "/admin/notices" });
      } catch {
        // The login form below will handle a fresh sign-in.
      }
    }

    void redirectSignedInAdmin();
  }, [navigate]);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInAdmin(email, password);
      await navigate({ to: "/admin/notices" });
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SiteLayout>
      <section className="container-page py-16 sm:py-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-navy"
        >
          <ArrowLeft className="h-4 w-4" /> Back to website
        </Link>

        <div className="mx-auto mt-10 max-w-md rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
            <LockKeyhole className="h-6 w-6" />
          </div>
          <h1 className="mt-5 font-display text-3xl font-bold text-navy">Admin Login</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Use a Supabase Auth admin account to manage notices. This browser will stay signed in
            until you sign out or clear browser data.
          </p>

          {!hasSupabaseConfig() && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              Supabase is not connected yet. Add <code>VITE_SUPABASE_URL</code> and{" "}
              <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env.local</code>.
            </div>
          )}

          <form onSubmit={onSubmit} className="mt-7 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-navy">Email</span>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/15"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-navy">Password</span>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
                className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/15"
              />
            </label>

            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !hasSupabaseConfig()}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-navy px-5 text-sm font-semibold text-navy-foreground transition hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
