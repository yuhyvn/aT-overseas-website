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
    title: "2026 Export Support Programs for Korean Food Producers",
    summary:
      "aT New York is now accepting applications from Korean food producers seeking support for entry into the U.S. market, including labeling, certification guidance, and market information.",
    date: "2026-05-15",
    location: "New York, NY",
    actionLabel: "Inquire",
    actionHref: "/contact",
  },
  {
    id: "up-002",
    category: "trade-exhibition",
    title: "K-Food Trade Exhibition — Participation Guide",
    summary:
      "Information for U.S. buyers and Korean exporters interested in upcoming K-food trade exhibitions in the United States and Korea.",
    date: "2026-05-10",
    location: "New York, NY",
    actionLabel: "Read notice",
    actionHref: "#",
  },
  {
    id: "up-003",
    category: "buyer-matching",
    title: "Buyer Matching Program — Applications Open",
    summary:
      "U.S. buyers can apply to be matched with Korean suppliers across snacks, beverages, sauces, and frozen categories. Please contact this office for details.",
    date: "2026-05-05",
    location: "Virtual / New York, NY",
    actionLabel: "Apply",
    actionHref: "/contact",
  },
  {
    id: "up-004",
    category: "industry-update",
    title: "K-Food Industry Trends in the U.S. Market",
    summary:
      "Overview of recent trends in Korean food categories — including ramen, kimchi, sauces, and frozen meals — in the U.S. retail and food-service market.",
    date: "2026-04-28",
    actionLabel: "Read notice",
    actionHref: "#",
  },
  {
    id: "up-005",
    category: "import-regulation",
    title: "FDA Guidance on Fermented Food Imports",
    summary:
      "Summary of FDA labeling and documentation considerations for fermented Korean products imported into the United States. Please consult the FDA for the most current requirements.",
    date: "2026-04-20",
    location: "Webinar",
    actionLabel: "Read notice",
    actionHref: "#",
  },
];
