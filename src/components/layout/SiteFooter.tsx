import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Printer } from "lucide-react";
import footerLogoUrl from "@/assets/at-new-york-footer-logo.svg";
import { branch } from "@/data/branch";

const footerLinks = [
  { to: "/about", label: "About Office" },
  { to: "/notifications", label: "Notices" },
  { to: "/programs", label: "Support Programs" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-navy-deep text-navy-foreground">
      <div className="container-page grid items-center gap-10 py-14 md:grid-cols-[1.2fr_0.8fr_1fr]">
        <div className="flex items-center">
          <img
            src={footerLogoUrl}
            alt="aT Center New York"
            className="h-10 w-auto max-w-[260px] sm:h-12 sm:max-w-[340px] lg:h-14 lg:max-w-[410px]"
          />
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            Site
          </div>
          <ul className="mt-4 space-y-2.5 text-sm">
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            {branch.branchName}
          </div>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.address}
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.phone}
            </li>
            <li className="flex gap-2.5">
              <Printer className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.fax}
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" /> {branch.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-6 text-xs text-white/55">
          <div>
            © {new Date().getFullYear()} {branch.organization} ({branch.organizationShort}). All
            rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
