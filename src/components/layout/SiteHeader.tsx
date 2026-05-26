import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Globe2, ChevronDown } from "lucide-react";
import { branch } from "@/data/branch";

type NavItem =
  | { to: string; label: string }
  | { label: string; children: { to: string; label: string; description?: string }[] };

const nav: NavItem[] = [
  { to: "/", label: "Home" },
  {
    label: "About",
    children: [
      { to: "/about/who-we-are", label: "Who We Are", description: "aT and its New York branch" },
      { to: "/about/our-role", label: "Our Role", description: "Connecting K-food to U.S. trade" },
      { to: "/about/mission-vision", label: "Mission & Vision", description: "What guides our work" },
    ],
  },
  {
    label: "Programs",
    children: [
      { to: "/programs/bkf-b2b-meetings", label: "BKF B2B Meetings", description: "Curated buyer matchmaking" },
      { to: "/programs/localization-support", label: "Localization Support", description: "U.S. labeling & compliance" },
      { to: "/programs/food-demonstration-programs", label: "Food Demonstration", description: "Sampling & chef activations" },
      { to: "/programs/overseas-logistics-warehousing", label: "Logistics & Warehousing", description: "Cold-chain & distribution" },
    ],
  },
  { to: "/products", label: "Products" },
  { to: "/notifications", label: "Notifications" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-hero text-navy-foreground">
            <Globe2 className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[15px] font-bold tracking-tight text-navy">{branch.displayName}</span>
            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">{branch.tagline}</span>
          </div>
        </Link>

        <nav ref={dropdownRef} className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => {
            if ("to" in item) {
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="text-sm font-medium text-foreground/75 transition-colors hover:text-navy"
                  activeProps={{ className: "text-navy font-semibold" }}
                >
                  {item.label}
                </Link>
              );
            }
            const isOpen = openDropdown === item.label;
            return (
              <div key={item.label} className="relative">
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  className="inline-flex items-center gap-1 text-sm font-medium text-foreground/75 transition-colors hover:text-navy"
                >
                  {item.label}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 animate-fade-in rounded-xl border border-border bg-card p-2 shadow-elegant">
                    {item.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        onClick={() => setOpenDropdown(null)}
                        className="block rounded-md px-3 py-2.5 transition hover:bg-secondary"
                      >
                        <div className="text-sm font-semibold text-navy">{c.label}</div>
                        {c.description && (
                          <div className="mt-0.5 text-xs text-muted-foreground">{c.description}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="hidden lg:flex">
          <Link
            to="/contact"
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
            {nav.map((item) => {
              if ("to" in item) {
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="py-2.5 text-sm font-medium text-foreground/80"
                    activeProps={{ className: "text-navy font-semibold" }}
                  >
                    {item.label}
                  </Link>
                );
              }
              const isOpen = mobileOpen === item.label;
              return (
                <div key={item.label} className="border-b border-border/50 last:border-0">
                  <button
                    onClick={() => setMobileOpen(isOpen ? null : item.label)}
                    className="flex w-full items-center justify-between py-2.5 text-sm font-medium text-foreground/80"
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="pb-2 pl-3">
                      {item.children.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          onClick={() => setOpen(false)}
                          className="block py-2 text-sm text-foreground/75"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-md bg-navy px-4 py-2.5 text-sm font-semibold text-navy-foreground"
            >
              Contact a Supplier
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
