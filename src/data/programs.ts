import type { LucideIcon } from "lucide-react";
import { Handshake, Languages, ChefHat, Warehouse } from "lucide-react";

export type Program = {
  slug: string;
  title: string;
  shortName: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  highlights: string[];
  audience: string;
};

export const programs: Program[] = [
  {
    slug: "bkf-b2b-meetings",
    title: "BKF B2B Meetings",
    shortName: "BKF B2B Meetings",
    icon: Handshake,
    tagline: "Curated buyer–supplier matchmaking",
    summary:
      "The Buy Korean Food (BKF) program connects pre-qualified U.S. buyers with vetted Korean exporters through structured one-on-one meetings, sample tastings, and category-focused trade sessions in New York and Seoul.",
    highlights: [
      "Pre-screened supplier shortlists by category and volume",
      "On-site and virtual meeting facilitation",
      "Sample logistics and translation support",
      "Post-meeting deal follow-through with aT trade officers",
    ],
    audience: "Distributors, importers, retail buyers, restaurant groups.",
  },
  {
    slug: "localization-support",
    title: "Localization Support",
    shortName: "Localization Support",
    icon: Languages,
    tagline: "U.S. labeling, compliance, and brand adaptation",
    summary:
      "We help Korean producers tailor packaging, nutrition labels, and brand messaging to U.S. regulatory and consumer expectations — from FDA-compliant labeling to retailer-ready SKUs.",
    highlights: [
      "FDA nutrition facts panel preparation",
      "Bilingual packaging and ingredient translation",
      "U.S. retail planogram and pricing consultation",
      "Allergen, kosher, and halal certification guidance",
    ],
    audience: "Korean manufacturers entering or scaling in the U.S. market.",
  },
  {
    slug: "food-demonstration-programs",
    title: "Food Demonstration Programs",
    shortName: "Food Demonstrations",
    icon: ChefHat,
    tagline: "In-store sampling and chef-led activations",
    summary:
      "Drive trial and velocity with professional in-store demonstrations, chef-led tastings, and influencer-supported activations at major U.S. retailers and food-service shows.",
    highlights: [
      "Retail in-store sampling at participating Korean and Asian grocery channels",
      "Trade-show live cooking stations",
      "Chef partnerships and recipe development",
      "Activity reporting after each program",
    ],
    audience: "Brands launching or expanding U.S. retail presence.",
  },
  {
    slug: "overseas-logistics-warehousing",
    title: "Overseas Logistics & Warehousing",
    shortName: "Logistics & Warehousing",
    icon: Warehouse,
    tagline: "Cold-chain, bonded storage, and distribution",
    summary:
      "Access aT-supported logistics partners across the U.S. for consolidated container shipping, FDA-bonded warehousing, cold-chain storage, and last-mile distribution to retailers and food-service operators.",
    highlights: [
      "West-coast and east-coast bonded warehouses",
      "Frozen and ambient consolidated container programs",
      "Customs brokerage and FSVP guidance",
      "Direct retailer DC delivery coordination",
    ],
    audience: "Exporters scaling shipment frequency and U.S. coverage.",
  },
];
