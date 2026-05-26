import { Link } from "@tanstack/react-router";
import { Globe2, Mail, MapPin, Phone } from "lucide-react";
import { branch } from "@/data/branch";

const footerNav = [
  { to: "/about", label: "About Office" },
  { to: "/notices", label: "Notices" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-navy-deep text-navy-foreground">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
              <Globe2 className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-bold">{branch.displayName}</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/60">{branch.tagline}</div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            {branch.organization} ({branch.organizationShort}) — {branch.branchName} Branch.
            Official overseas office for the {branch.market} market since {branch.establishedYear}.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Site map</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerNav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-white/80 hover:text-white">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{branch.branchName} Office</div>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.address}</li>
            <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.phone}</li>
            <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/55 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} {branch.organization} ({branch.organizationShort}). All rights reserved.</div>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
