import { Link } from "@tanstack/react-router";
import { Globe2, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy-deep text-navy-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
              <Globe2 className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-base font-bold">aT New York</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-white/60">K-Food Trade Platform</div>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
            Korea Agro-Fisheries &amp; Food Trade Corporation — New York Branch. Connecting Korean food producers with the U.S. market since 1989.
          </p>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">About</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/about/who-we-are" className="text-white/80 hover:text-white">Who We Are</Link></li>
            <li><Link to="/about/our-role" className="text-white/80 hover:text-white">Our Role</Link></li>
            <li><Link to="/about/mission-vision" className="text-white/80 hover:text-white">Mission &amp; Vision</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">Programs</div>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/programs/bkf-b2b-meetings" className="text-white/80 hover:text-white">BKF B2B Meetings</Link></li>
            <li><Link to="/programs/localization-support" className="text-white/80 hover:text-white">Localization Support</Link></li>
            <li><Link to="/programs/food-demonstration-programs" className="text-white/80 hover:text-white">Food Demonstration</Link></li>
            <li><Link to="/programs/overseas-logistics-warehousing" className="text-white/80 hover:text-white">Logistics &amp; Warehousing</Link></li>
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">New York Office</div>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2.5"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> 460 Park Avenue, Suite 2401, New York, NY 10022</li>
            <li className="flex gap-2.5"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> +1 (212) 826-0019</li>
            <li className="flex gap-2.5"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> ny@at.or.kr</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-xs text-white/55 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Korea Agro-Fisheries &amp; Food Trade Corporation (aT). All rights reserved.</div>
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
