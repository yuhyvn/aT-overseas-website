import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { branch } from "@/data/branch";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${branch.displayName}` },
      { name: "description", content: `Contact ${branch.displayName}. Office address, phone, email, hours, and inquiry form. Responses ${branch.officeHours.responseTime.toLowerCase()}.` },
      { property: "og:title", content: `Contact — ${branch.displayName}` },
      { property: "og:description", content: `Inquiries to the ${branch.branchName} branch of ${branch.organization}.` },
    ],
  }),
  component: ContactPage,
});

const topics = [
  "General inquiry",
  "Korean food sourcing",
  "Program participation",
  "Market information",
  "Other",
];

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  organization: z.string().trim().min(2, "Organization is required").max(120),
  email: z.string().trim().email("Valid email required").max(160),
  topic: z.string().min(1, "Select a topic"),
  message: z.string().trim().min(10, "Please share a few details").max(1500),
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
        <div className="container-page py-16 sm:py-20">
          <div className="eyebrow"><span className="h-px w-8 bg-brand-green" /> Contact</div>
          <h1 className="mt-3 max-w-3xl font-display text-3xl font-bold text-navy sm:text-4xl">
            Contact {branch.displayName}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            For inquiries, please use the form below or the contact information on this page.
            Responses are typically sent {branch.officeHours.responseTime.toLowerCase()}.
          </p>
        </div>
      </section>

      <section className="container-page grid gap-10 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-border bg-card p-7 shadow-card sm:p-9">
          {sent ? (
            <div className="flex flex-col items-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/15 text-brand-green">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-bold text-navy">Inquiry received</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Thank you. {branch.displayName} will respond to your message at the email
                provided {branch.officeHours.responseTime.toLowerCase()}.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" error={errors.name} />
                <Field label="Organization" name="organization" error={errors.organization} />
              </div>
              <Field label="Email" name="email" type="email" error={errors.email} />

              <div>
                <Label>Topic</Label>
                <select
                  name="topic"
                  defaultValue=""
                  className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15"
                >
                  <option value="" disabled>Select a topic…</option>
                  {topics.map((c) => <option key={c}>{c}</option>)}
                </select>
                {errors.topic && <p className="mt-1 text-xs text-destructive">{errors.topic}</p>}
              </div>

              <div>
                <Label>Message</Label>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={1500}
                  className="mt-1.5 w-full resize-none rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/15"
                />
                {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-md bg-navy px-6 py-3 text-sm font-semibold text-navy-foreground shadow-card transition hover:bg-navy-deep"
              >
                Send inquiry
              </button>
              <p className="text-xs text-muted-foreground">
                By submitting, you consent to {branch.displayName} contacting you regarding your inquiry.
              </p>
            </form>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{branch.branchName} Office</div>
            <h2 className="mt-2 font-display text-xl font-bold text-navy">{branch.displayName}</h2>
            <ul className="mt-5 space-y-4 text-sm text-foreground/85">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.address}</li>
              <li className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.phone}</li>
              <li className="flex gap-3"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.email}</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
            <h3 className="font-display text-base font-bold text-navy">Office hours</h3>
            <dl className="mt-4 grid gap-2 text-sm">
              <Row k="Mon – Fri" v={branch.officeHours.weekday} />
              <Row k="Sat – Sun" v={branch.officeHours.weekend} />
              <Row k="Response" v={branch.officeHours.responseTime} />
            </dl>
          </div>
        </aside>
      </section>
    </SiteLayout>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70">{children}</label>;
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
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
