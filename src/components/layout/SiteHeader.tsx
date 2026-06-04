import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logoUrl from "@/assets/at-new-york-logo.svg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Office" },
  { to: "/notifications", label: "Notices" },
  { to: "/programs", label: "Support Programs" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between">
        <Link to="/" className="flex min-w-0 items-center">
          <img
            src={logoUrl}
            alt="aT Center New York"
            className="h-10 w-auto max-w-[260px] sm:h-12 sm:max-w-[340px] lg:h-14 lg:max-w-[410px]"
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <nav className="flex items-center gap-8">
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

          <Link
            to="/admin/login"
            className="rounded-md border border-border/80 px-3 py-1.5 text-xs font-semibold text-foreground/65 transition hover:border-brand-green/60 hover:text-navy"
          >
            Login
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
            <Link
              to="/admin/login"
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-semibold text-foreground/70"
            >
              Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
