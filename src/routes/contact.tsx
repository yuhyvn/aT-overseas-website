import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Mail, MapPin, Phone, Printer } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { branch } from "@/data/branch";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${branch.displayName} K-Food Platform` },
      {
        name: "description",
        content: `Contact ${branch.displayName} to source verified Korean food suppliers, join trade programs, or get ${branch.market} market guidance. Response ${branch.officeHours.responseTime.toLowerCase()}.`,
      },
      { property: "og:title", content: `Contact — ${branch.displayName}` },
      {
        property: "og:description",
        content: `Get in touch with Korea's official agri-food trade office in ${branch.market}.`,
      },
    ],
  }),
  component: ContactPage,
});

const categories = [
  "Ramen",
  "Kimchi",
  "Snacks",
  "Frozen Foods",
  "Beverages",
  "Sauces & Seasonings",
  "Health Foods",
  "Programs / General",
  "Other",
];

const schema = z.object({
  company: z.string().trim().min(2, "Company name is required").max(120),
  contact: z.string().trim().min(2, "Contact person is required").max(80),
  email: z.string().trim().email("Valid email required").max(160),
  region: z.string().trim().min(2, "Country/region is required").max(80),
  category: z.string().min(1, "Select a category"),
  details: z.string().trim().min(10, "Please share a few details").max(1500),
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(fd));
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      for (const issue of parsed.error.issues) errs[issue.path[0] as string] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setSent(true);
  }

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="container-page py-20">
          <div className="eyebrow">
            <span className="h-px w-8 bg-brand-green" /> Contact
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-navy sm:text-5xl">
            Get in touch with {branch.displayName}.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Whether you're sourcing Korean food products, joining a trade program, or seeking{" "}
            {branch.market} market guidance — our team responds{" "}
            {branch.officeHours.responseTime.toLowerCase()}.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-card sm:p-10">
          {sent ? (
            <div className="flex flex-col items-center py-14 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-navy">Message received</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Thank you. The aT New York team will review your request and follow up at your email
                within 48 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Company name" name="company" error={errors.company} />
                <Field label="Contact person" name="contact" error={errors.contact} />
                <Field label="Email" name="email" type="email" error={errors.email} />
                <Field label="Country / Region" name="region" error={errors.region} />
              </div>

              <div>
                <Label>Topic of interest</Label>
                <select
                  name="category"
                  defaultValue=""
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15"
                >
                  <option value="" disabled>
                    Select a topic…
                  </option>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-destructive">{errors.category}</p>
                )}
              </div>

              <div>
                <Label>Message</Label>
                <textarea
                  name="details"
                  rows={5}
                  maxLength={1500}
                  placeholder="Target volume, packaging, certifications, timeline…"
                  className="mt-1.5 w-full resize-none rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15"
                />
                {errors.details && (
                  <p className="mt-1 text-xs text-destructive">{errors.details}</p>
                )}
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-md bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground shadow-card transition hover:bg-navy-deep"
              >
                Send Message
              </button>
              <p className="text-xs text-muted-foreground">
                By submitting, you consent to aT New York contacting you regarding your inquiry.
              </p>
            </form>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl bg-gradient-hero p-8 text-navy-foreground shadow-elegant">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
              {branch.branchName} Office
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold">{branch.displayName} Branch</h2>
            <p className="mt-3 text-sm text-white/75">
              {branch.organization} — official trade promotion office for {branch.market}.
            </p>
            <ul className="mt-7 space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.address}
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.phone}
              </li>
              <li className="flex gap-3">
                <Printer className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.fax}
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.email}
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-display text-lg font-bold text-navy">Office hours</h3>
            <dl className="mt-4 grid gap-2 text-sm">
              <Row k="Mon – Fri" v={branch.officeHours.weekday} />
              <Row k="Sat – Sun" v={branch.officeHours.weekend} />
              <Row k="Response time" v={branch.officeHours.responseTime} />
            </dl>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">
      {children}
    </label>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-border/70 py-1.5 last:border-0">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium text-foreground">{v}</dd>
    </div>
  );
}
