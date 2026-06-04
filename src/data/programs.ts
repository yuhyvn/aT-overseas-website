import type { LucideIcon } from "lucide-react";
import { ChefHat, Globe2, Handshake, Warehouse } from "lucide-react";

export type Program = {
  slug: string;
  title: string;
  shortName: string;
  icon: LucideIcon;
  tagline: string;
  summary: string;
  highlights: string[];
  audience: string;
  sections?: {
    heading: string;
    paragraphs: string[];
  }[];
  processSteps?: string[];
  coverageRows?: {
    title: string;
    support: string;
    description: string;
    countries: string;
  }[];
};

export const programs: Program[] = [
  {
    slug: "bkf-b2b-meetings",
    title: "BKF (Buy Korean Food) B2B Meeting",
    shortName: "BKF B2B Meeting",
    icon: Handshake,
    tagline: "Biannual Korean agricultural and fishery products trade show",
    summary:
      "BKF is an agricultural and fishery products trade show held biannually in Seoul, Korea. About 300 major food and agricultural companies in Korea join the trade show with their best fresh produce and processed food products.",
    highlights: [
      "Experience quality Korean food products and explore business opportunities with Korean companies.",
      "A tour program is included for participants who want to see Korean food companies and factories at first hand.",
      "aT looks forward to meeting buyers and partners at the trade show in Korea.",
    ],
    audience: "Buyers, importers, distributors, and partners interested in Korean food products.",
    sections: [
      {
        heading: "About BKF",
        paragraphs: [
          "This trade show allows participants to experience quality Korean food products and explore business opportunities with Korean companies.",
          "A tour program is included for those who want to see and experience Korean food companies and their factories at first hand.",
        ],
      },
    ],
  },
  {
    slug: "localization-support",
    title: "Localization",
    shortName: "Localization",
    icon: Globe2,
    tagline: "Legal, customs, labeling, and localization consulting",
    summary:
      "We provide legal and customs consulting, including labeling support in cooperation with local experts, to help resolve export and import difficulties.",
    highlights: [
      "21 countries supported across Asia, America, Europe, the Middle East, Turkey, and India.",
      "Asia: China (Hong Kong), Taiwan, Japan, and ASEAN markets including Vietnam, Thailand, and Indonesia.",
      "America: USA, Canada, and South America.",
      "Other regions: EU, Middle East (UAE), Turkey, and India.",
      "Applicant: Agriculture and fisheries export companies.",
      "Period: All year round, until December 7.",
      "Method: aT overseas branch application through http://global.at.or.kr.",
      "Covered categories include non-tariff barriers consultation, labeling support, food hygiene inspection, packaging localization, and buyer-specialized support.",
    ],
    audience: "Agriculture and fisheries export companies facing export or import difficulties.",
    sections: [
      {
        heading: "Apply Now",
        paragraphs: [
          "Applicant: Agriculture and fisheries export companies.",
          "Period: All year round, until December 7.",
          "Method: aT overseas branch application through http://global.at.or.kr.",
        ],
      },
    ],
    processSteps: [
      "Export companies submit application",
      "aT inquires with local professional agency",
      "Local professionals resolve export problems and difficulties",
      "Feedback is shared with export companies",
    ],
    coverageRows: [
      {
        title: "Non-Tariff Barriers Consultation",
        support: "80% support",
        description:
          "[Legal] Contract, employment, corporate.\n[Customs clearance] Customs clearance and quarantine review.\n[Tariff] HS code, tariff rate.",
        countries: "USA, Canada, Latin America (limited)",
      },
      {
        title: "Labeling Support",
        support: "80% support",
        description:
          "Labeling production and registration support (excluding stickers and printing fees).",
        countries: "USA, Canada, Latin America (limited)",
      },
      {
        title: "Food Hygiene Inspection",
        support: "80% support",
        description: "Nutrition, allergy, and safety tests for labeling production.",
        countries: "USA, Canada, Latin America (limited)",
      },
      {
        title: "Packaging Localization",
        support: "80% support",
        description:
          "Package design improvement and development (importing country or Korean design company).",
        countries: "USA, Canada, Latin America (limited)",
      },
      {
        title: "Buyer-Specialized Support",
        support: "80% support",
        description:
          "Buyer consulting for market and consumer analysis. Food registration and additional fees for each country. Local inspection fees and quarantine inspection fee.",
        countries: "USA, Canada, Latin America (limited)",
      },
    ],
  },
  {
    slug: "food-demonstration-programs",
    title: "Food Demonstrations",
    shortName: "Food Demonstrations",
    icon: ChefHat,
    tagline: "In-store exposure and direct consumer feedback",
    summary:
      "Gain exposure for Korean food import products through this program. Getting people to experience Korean food import products is one of the best ways to increase sales and build awareness for your brand.",
    highlights: [
      "The demo program supports Korean food importers and distributors and helps build relationships with customers who shop in stores.",
      "The program provides direct customer feedback on packaging, product awareness, visual appeal, value, and taste.",
      "Applications are accepted twice a year in May and November.",
      "Once approved, participants submit a detailed demo plan one month before scheduled demonstrations.",
      "All demo application requests must be submitted on a Demo Request Form by the deadline indicated in the instructions.",
      "The demo program is viewed as a partnership between stores, importers, and distributors.",
    ],
    audience: "Korean food importers and distributors seeking retail exposure.",
    sections: [
      {
        heading: "About our food demonstrations",
        paragraphs: [
          "Our demo program currently supports Korean food importers and distributors and helps build relationships with customers who shop in stores.",
          "It provides direct, customer-specific feedback on items including packaging, product awareness, visual appeal, value, and most importantly, taste.",
        ],
      },
      {
        heading: "How to participate",
        paragraphs: [
          "We accept applications twice a year in May and November.",
          "Once your demo application is approved, you need to submit a detailed demo plan one month before your scheduled demonstrations.",
          "All demo application requests must be submitted on a Demo Request Form by the deadline indicated on the instructions.",
        ],
      },
    ],
  },
  {
    slug: "overseas-logistics-warehousing",
    title: "Overseas Logistics & Warehouse",
    shortName: "Logistics & Warehouse",
    icon: Warehouse,
    tagline: "Storage and logistics support for Korean food imports",
    summary:
      "Since North America requires high storage costs, importers can struggle to import new products. To reduce this difficulty and promote Korean food across the U.S., aT supports importers of Korean food from Korea through this program.",
    highlights: [
      "Supports importers who bring Korean food products from Korea into the U.S.",
      "Designed to reduce the burden of high North American storage costs.",
      "Applicants must meet certain requirements to be approved for this program.",
      "Application details and more information are provided upon request.",
    ],
    audience: "Importers bringing Korean food products from Korea into the U.S. market.",
    sections: [
      {
        heading: "Application Guidelines",
        paragraphs: [
          "Applicants must meet certain requirements to be approved for this program.",
          "Application details and more information will be provided upon request.",
        ],
      },
    ],
  },
];
