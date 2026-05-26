import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Globe2 } from "lucide-react";
import { branch } from "@/data/branch";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Office" },
  { to: "/notifications", label: "Notices" },
  { to: "/products", label: "Resources" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-hero text-navy-foreground">
            <Globe2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[15px] font-bold tracking-tight text-navy">
              {branch.displayName}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              {branch.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="text-sm font-medium text-foreground/75 transition-colors hover:text-navy"
              activeProps={{ className: "text-navy font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <Link
            to="/contact"
            className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-semibold text-navy-foreground shadow-card transition hover:bg-navy-deep"
          >
            Contact
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                className="border-b border-border/40 py-3 text-sm font-medium text-foreground/80 last:border-0"
                activeProps={{ className: "text-navy font-semibold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
