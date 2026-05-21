import type { LucideIcon } from "lucide-react";
import { Megaphone, Building2, Handshake, TrendingUp, Scale } from "lucide-react";

export type UpdateCategory =
  | "export-support"
  | "trade-exhibition"
  | "buyer-matching"
  | "industry-update"
  | "import-regulation";

export interface Update {
  id: string;
  category: UpdateCategory;
  title: string;
  summary: string;
  date: string; // ISO 8601 date string (YYYY-MM-DD)
  location?: string; // e.g., "New York, NY" or "Virtual"
  actionLabel?: string;
  actionHref?: string;
}

export const updateCategoryMeta: Record<
  UpdateCategory,
  { label: string; icon: LucideIcon; accent: string }
> = {
  "export-support": {
    label: "Export Support",
    icon: Megaphone,
    accent: "text-brand-green",
  },
  "trade-exhibition": {
    label: "Trade Exhibition",
    icon: Building2,
    accent: "text-navy",
  },
  "buyer-matching": {
    label: "Buyer Matching",
    icon: Handshake,
    accent: "text-gold",
  },
  "industry-update": {
    label: "Industry Update",
    icon: TrendingUp,
    accent: "text-brand-green",
  },
  "import-regulation": {
    label: "Import Regulation",
    icon: Scale,
    accent: "text-navy",
  },
};

export const updates: Update[] = [
  {
    id: "up-001",
    category: "export-support",
    title: "New USDA Certification Fast-Track for Korean Processors",
    summary:
      "aT New York has partnered with the USDA to establish an expedited certification channel for eligible Korean food manufacturers, reducing approval timelines by up to 40%.",
    date: "2026-05-15",
    location: "New York, NY",
    actionLabel: "Learn more",
    actionHref: "#",
  },
  {
    id: "up-002",
    category: "trade-exhibition",
    title: "K-Food Expo 2026 — Seoul & Los Angeles Roadshow",
    summary:
      "The annual K-Food Expo expands to a dual-city format this year. U.S. buyers can connect with 200+ Korean exhibitors in Seoul (June) and Los Angeles (August).",
    date: "2026-05-10",
    location: "Seoul / Los Angeles",
    actionLabel: "Register interest",
    actionHref: "#",
  },
  {
    id: "up-003",
    category: "buyer-matching",
    title: "Spring 2026 Buyer Matching Program Now Open",
    summary:
      "Apply by June 30 to be matched with pre-qualified Korean suppliers across snacks, beverages, sauces, and frozen categories. Curated introductions begin July 15.",
    date: "2026-05-05",
    location: "Virtual / New York, NY",
    actionLabel: "Apply now",
    actionHref: "/inquiry",
  },
  {
    id: "up-004",
    category: "industry-update",
    title: "K-Ramen Reaches $450M in U.S. Retail Sales",
    summary:
      "2025 retail data shows Korean instant noodles growing 22% year-over-year, driven by premium broth varieties and vegan options now carried by Costco and Whole Foods.",
    date: "2026-04-28",
    actionLabel: "Read report",
    actionHref: "#",
  },
  {
    id: "up-005",
    category: "import-regulation",
    title: "Updated FDA Guidance on Fermented Food Imports",
    summary:
      "New labeling and documentation requirements for fermented Korean products take effect July 1, 2026. aT NY is hosting a compliance webinar on June 10.",
    date: "2026-04-20",
    location: "Webinar",
    actionLabel: "Join webinar",
    actionHref: "#",
  },
];
