import ramen from "@/assets/cat-ramen.jpg";
import kimchi from "@/assets/cat-kimchi.jpg";
import snacks from "@/assets/cat-snacks.jpg";
import frozen from "@/assets/cat-frozen.jpg";
import beverages from "@/assets/cat-beverages.jpg";
import sauces from "@/assets/cat-sauces.jpg";
import health from "@/assets/cat-health.jpg";

export type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  availability: "In stock" | "Seasonal" | "Pre-order";
  certifications: ("FDA" | "HACCP" | "Halal" | "Organic")[];
};

export const products: Product[] = [
  {
    slug: "ramen",
    name: "Premium Korean Ramen",
    category: "Ramen",
    image: ramen,
    description: "Top-selling instant noodle brands shipped from leading Korean manufacturers with full U.S. labeling support.",
    availability: "In stock",
    certifications: ["FDA", "HACCP", "Halal"],
  },
  {
    slug: "kimchi",
    name: "Traditional Napa Kimchi",
    category: "Kimchi",
    image: kimchi,
    description: "Artisan-fermented kimchi from certified producers, available in glass jar and food-service pouches.",
    availability: "In stock",
    certifications: ["FDA", "HACCP", "Organic"],
  },
  {
    slug: "snacks",
    name: "Korean Snack Assortment",
    category: "Snacks",
    image: snacks,
    description: "Curated assortment of Korea's most popular savory and sweet snacks — perfect for retail and gifting.",
    availability: "In stock",
    certifications: ["FDA", "HACCP"],
  },
  {
    slug: "beverages",
    name: "Korean Beverages & Soju",
    category: "Beverages",
    image: beverages,
    description: "Soju, traditional rice drinks, and functional teas — fully compliant with U.S. import regulations.",
    availability: "Seasonal",
    certifications: ["FDA"],
  },
  {
    slug: "frozen",
    name: "Frozen Mandu & Tteokbokki",
    category: "Frozen Foods",
    image: frozen,
    description: "Cold-chain certified frozen dumplings, rice cakes, and ready meals with consistent U.S. distribution.",
    availability: "In stock",
    certifications: ["FDA", "HACCP"],
  },
  {
    slug: "sauces",
    name: "Sauces & Seasonings",
    category: "Sauces & Seasonings",
    image: sauces,
    description: "Gochujang, doenjang, soy sauces, and BBQ marinades — the building blocks of authentic Korean cuisine.",
    availability: "In stock",
    certifications: ["FDA", "HACCP", "Halal"],
  },
  {
    slug: "health",
    name: "Korean Health Foods",
    category: "Health Foods",
    image: health,
    description: "Red ginseng, honey citron tea, omija tonics, and traditional Korean functional foods for the wellness market.",
    availability: "In stock",
    certifications: ["FDA", "Organic"],
  },
];
