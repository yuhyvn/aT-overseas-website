import type { LucideIcon } from "lucide-react";
import { Handshake, Languages, ChefHat, Warehouse } from "lucide-react";

export type ProgramProcessStep = { step: string; title: string; desc: string };
export type ProgramCoverageRow = { area: string; detail: string };

export type Program = {
  slug: string;
  title: string;
  shortName: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  /** Plain-language "what it is" */
  whatItIs: string;
  /** Who the program is intended for */
  forWho: string;
  /** Why the program matters / business value */
  whyMatters: string;
  highlights: string[];
  audience: string;
  /** Optional process steps (used in detail pages) */
  process?: ProgramProcessStep[];
  /** Optional coverage table (e.g. localization scope) */
  coverage?: ProgramCoverageRow[];
};

export const programs: Program[] = [
  {
    slug: "bkf-b2b-meetings",
    title: "BKF B2B Meeting",
    shortName: "BKF B2B Meeting",
    icon: Handshake,
    tagline: "Curated buyer–supplier matchmaking",
    summary:
      "The Buy Korean Food (BKF) program connects pre-qualified U.S. buyers with vetted Korean exporters through structured one-on-one meetings, sample tastings, and category-focused trade sessions.",
    whatItIs:
      "A scheduled B2B meeting program that pairs U.S. buyers with Korean food and beverage suppliers across selected categories.",
    forWho:
      "Distributors, importers, retail buyers, and Korean restaurant groups looking to source from Korea.",
    whyMatters:
      "Reduces sourcing risk and time by replacing cold outreach with pre-qualified, category-matched introductions.",
    highlights: [
      "Pre-screened supplier shortlists by category and volume",
      "On-site and virtual meeting facilitation",
      "Sample logistics and translation support",
      "Post-meeting follow-through with aT trade officers",
    ],
    audience: "Distributors, importers, retail buyers, restaurant groups.",
  },
  {
    slug: "localization-support",
    title: "Localization",
    shortName: "Localization",
    icon: Languages,
    tagline: "U.S. labeling, compliance, and brand adaptation",
    summary:
      "Helps Korean producers tailor packaging, nutrition labels, and brand messaging to U.S. regulatory and consumer expectations — from FDA-compliant labeling to retailer-ready SKUs.",
    whatItIs:
      "Hands-on packaging, labeling, and compliance adaptation service that prepares Korean products for U.S. retail and food-service shelves.",
    forWho:
      "Korean manufacturers entering the U.S. market or expanding into national retail and food-service accounts.",
    whyMatters:
      "Most U.S. retailers and importers require fully localized, compliant packaging before listing — this program closes that gap.",
    highlights: [
      "FDA nutrition facts panel preparation",
      "Bilingual packaging and ingredient translation",
      "U.S. retail planogram and pricing consultation",
      "Allergen, kosher, and halal certification guidance",
    ],
    audience: "Korean manufacturers entering or scaling in the U.S. market.",
    process: [
      { step: "01", title: "Intake & assessment", desc: "Review current packaging, ingredient list, and target U.S. channel." },
      { step: "02", title: "Compliance gap analysis", desc: "Map gaps against FDA labeling, allergen, and FSVP requirements." },
      { step: "03", title: "Label & artwork adaptation", desc: "Prepare U.S.-ready nutrition facts panels and bilingual artwork." },
      { step: "04", title: "Buyer-ready handoff", desc: "Deliver retail- and importer-ready files with supporting documentation." },
    ],
    coverage: [
      { area: "Regulatory labeling", detail: "FDA nutrition facts panel, ingredient declaration, allergen statements." },
      { area: "Language & translation", detail: "Korean ↔ English ingredient, claim, and marketing copy translation." },
      { area: "Packaging design", detail: "Front-of-pack adaptation, claims hierarchy, and retail-shelf readability." },
      { area: "Certification guidance", detail: "Kosher, halal, organic, and non-GMO pathway advisory." },
      { area: "Channel fit", detail: "Retail, food-service, and e-commerce SKU configuration." },
    ],
  },
  {
    slug: "food-demonstration-programs",
    title: "Food Demonstrations",
    shortName: "Food Demonstrations",
    icon: ChefHat,
    tagline: "In-store sampling and chef-led activations",
    summary:
      "Drives trial and sell-through with professional in-store demonstrations, chef-led tastings, and influencer-supported activations at U.S. retailers and food-service shows.",
    whatItIs:
      "Field marketing program covering in-store sampling, live cooking demonstrations, and chef partnerships at U.S. retail and trade-show venues.",
    forWho:
      "Korean brands launching or expanding U.S. retail presence and seeking velocity at point-of-sale.",
    whyMatters:
      "First-time trial is the single biggest barrier for unfamiliar Korean products — demonstrations convert curiosity into repeat purchase.",
    highlights: [
      "In-store sampling at major U.S. retail partners",
      "Trade-show live cooking stations",
      "Chef partnerships and recipe development",
      "Performance reporting and sell-through analytics",
    ],
    audience: "Brands launching or expanding U.S. retail presence.",
  },
  {
    slug: "overseas-logistics-warehousing",
    title: "Overseas Logistics & Warehouse",
    shortName: "Logistics & Warehouse",
    icon: Warehouse,
    tagline: "Cold-chain, bonded storage, and distribution",
    summary:
      "Provides access to aT-supported logistics partners across the U.S. for consolidated container shipping, FDA-bonded warehousing, cold-chain storage, and last-mile distribution.",
    whatItIs:
      "A network of aT-supported logistics partners offering bonded warehousing, cold-chain storage, and consolidated container programs in the U.S.",
    forWho:
      "Korean exporters scaling shipment frequency, expanding U.S. coverage, or shipping frozen and chilled SKUs.",
    whyMatters:
      "Shared infrastructure lowers entry cost and enables smaller producers to ship reliably into U.S. retail and food-service.",
    highlights: [
      "West-coast and east-coast bonded warehouses",
      "Frozen and ambient consolidated container programs",
      "Customs brokerage and FSVP guidance",
      "Direct retailer DC delivery coordination",
    ],
    audience: "Exporters scaling shipment frequency and U.S. coverage.",
  },
];
