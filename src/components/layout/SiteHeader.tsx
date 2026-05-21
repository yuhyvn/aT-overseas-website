import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Globe2 } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/trends", label: "Market Trends" },
  { to: "/inquiry", label: "Buyer Inquiry" },
  { to: "/about", label: "About aT NY" },
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
            <span className="font-display text-[15px] font-bold tracking-tight text-navy">aT New York</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">K-Food Trade Platform</span>
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
            to="/inquiry"
            className="inline-flex items-center rounded-md bg-navy px-4 py-2 text-sm font-semibold text-navy-foreground shadow-card transition hover:bg-navy-deep"
          >
            Contact a Supplier
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
          <nav className="container-page flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium text-foreground/80"
                activeProps={{ className: "text-navy font-semibold" }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/inquiry"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-navy-foreground"
            >
              Contact a Supplier
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
