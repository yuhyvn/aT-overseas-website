import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, Bell, Mail, MapPin, Phone, BookOpen } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import heroImg from "@/assets/hero-kfood.jpg";
import { branch } from "@/data/branch";
import { updates } from "@/data/updates";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${branch.displayName} — ${branch.organization}` },
      { name: "description", content: `Official website of the ${branch.branchName} branch of ${branch.organization} (${branch.organizationShort}). Supporting Korean agri-food exports and connecting Korean suppliers with ${branch.market} buyers.` },
      { property: "og:title", content: `${branch.displayName} — ${branch.tagline}` },
      { property: "og:description", content: `${branch.organization} — ${branch.branchName} branch.` },
    ],
  }),
  component: HomePage,
});

const quickLinks = [
  { to: "/about", icon: Building2, label: "About Office", desc: `Introduction to the ${branch.branchName} branch and its role.` },
  { to: "/notices", icon: Bell, label: "Notices", desc: "Announcements, events, and regulatory updates." },
  { to: "/contact", icon: Mail, label: "Contact", desc: "Office contact information and inquiry form." },
] as const;

function HomePage() {
  const recent = updates.slice(0, 3);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy-deep text-navy-foreground">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="h-full w-full object-cover opacity-45" width={1920} height={1080} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/85 to-navy-deep/50" />
        <div className="container-page relative py-20 sm:py-24 lg:py-28">
          <div className="max-w-3xl">
            <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green" /> {branch.organizationShort} {branch.branchName} Branch
            </div>
            <h1 className="animate-fade-up mt-6 font-display text-3xl font-bold leading-[1.1] sm:text-4xl lg:text-5xl">
              Welcome to {branch.displayName} Branch
            </h1>
            <p className="animate-fade-up mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg" style={{ animationDelay: "80ms" }}>
              {branch.displayName} supports Korean agri-food exports and connects Korean
              suppliers with {branch.market} buyers.
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: "160ms" }}>
              <Link to="/about" className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-navy-deep shadow-card transition hover:bg-white/90">
                About Office <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/5 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
                Contact this office
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick links */}
      <section className="container-page py-14 sm:py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {quickLinks.map((q) => (
            <Link
              key={q.to}
              to={q.to}
              className="group flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                <q.icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-base font-semibold text-navy">{q.label}</h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{q.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-navy transition group-hover:gap-1.5">
                  Open <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Office introduction */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container-page grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Office Introduction</div>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
              {branch.organization} ({branch.organizationShort})
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              {branch.organization} is a public corporation supporting Korea's agriculture, fisheries,
              and food sectors. The {branch.branchName} branch, established in {branch.establishedYear},
              serves as the official overseas office for the {branch.market} market — providing trade
              information, supporting Korean exporters, and assisting {branch.market} buyers in
              sourcing Korean food products.
            </p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green">
              Read more about this office <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <ul className="space-y-3 rounded-xl border border-border bg-card p-6 text-sm text-foreground/85 shadow-card">
            <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.address}</li>
            <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.phone}</li>
            <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.email}</li>
          </ul>
        </div>
      </section>

      {/* Recent notices */}
      <section className="container-page py-14 sm:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Recent Notices</div>
            <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">Latest announcements</h2>
          </div>
          <Link to="/notices" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green">
            View all notices <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-8 divide-y divide-border rounded-xl border border-border bg-card">
          {recent.map((u) => (
            <li key={u.id} className="px-5 py-4 transition hover:bg-secondary/40 sm:px-6">
              <Link to="/notices" className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-green">
                    {u.category.replace("-", " ")}
                  </div>
                  <div className="mt-1 truncate font-medium text-navy">{u.title}</div>
                </div>
                <div className="shrink-0 text-xs text-muted-foreground">{u.date}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Useful links / Resources */}
      <section className="bg-secondary/40 border-y border-border">
        <div className="container-page py-14 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Resources</div>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
                Useful information for Korean food trade
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                K-Food categories, trade programs supported by this office, and links to related
                public agencies.
              </p>
            </div>
            <Link to="/resources" className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy hover:text-brand-green">
              <BookOpen className="h-4 w-4" /> Go to Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Contact summary */}
      <section className="container-page py-16 sm:py-20">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Contact</div>
              <h2 className="mt-3 font-display text-2xl font-bold text-navy sm:text-3xl">
                Inquiries to {branch.displayName}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                For trade information, program participation, or general inquiries, please use the
                contact form. We respond {branch.officeHours.responseTime.toLowerCase()}.
              </p>
              <Link to="/contact" className="mt-5 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-3 text-sm font-semibold text-navy-foreground shadow-card transition hover:bg-navy-deep">
                Go to contact form <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <dl className="grid gap-3 text-sm">
              <Row k="Address" v={branch.address} />
              <Row k="Phone" v={branch.phone} />
              <Row k="Email" v={branch.email} />
              <Row k="Hours" v={`${branch.officeHours.weekday} (Mon–Fri)`} />
            </dl>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border/70 py-2 last:border-0 sm:flex-row sm:justify-between sm:gap-6">
      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">{k}</dt>
      <dd className="font-medium text-foreground sm:text-right">{v}</dd>
    </div>
  );
}
