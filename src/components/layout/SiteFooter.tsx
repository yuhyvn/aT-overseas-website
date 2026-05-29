import { Link } from "@tanstack/react-router";
import { Globe2, Mail, MapPin, Phone, Printer } from "lucide-react";
import { branch } from "@/data/branch";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy-deep text-navy-foreground">
      <div className="container-page grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-3">
        <div>
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
            {branch.organization} ({branch.organizationShort}) — official overseas office
            supporting Korean agri-food exports to the {branch.market} market since {branch.establishedYear}.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Navigation</div>
          <ul className="mt-4 grid grid-cols-2 gap-y-2.5 text-sm">
            <li><Link to="/" className="text-white/80 hover:text-white">Home</Link></li>
            <li><Link to="/about" className="text-white/80 hover:text-white">About Office</Link></li>
            <li><Link to="/notifications" className="text-white/80 hover:text-white">Notices</Link></li>
            <li><Link to="/programs" className="text-white/80 hover:text-white">Support Programs</Link></li>
            <li><Link to="/contact" className="text-white/80 hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">{branch.branchName} Office</div>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> <span className="break-words">{branch.address}</span></li>
            <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.phone}</li>
            <li className="flex gap-2.5"><Printer className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.fax}</li>
            <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> <span className="break-all">{branch.email}</span></li>
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
