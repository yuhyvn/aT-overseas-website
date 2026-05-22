import { createFileRoute } from "@tanstack/react-router";
import { AboutSubpage } from "@/components/about/AboutSubpage";

export const Route = createFileRoute("/about/our-role")({
  head: () => ({
    meta: [
      { title: "Our Role — aT New York" },
      { name: "description", content: "How aT New York connects Korean food producers with U.S. buyers, distributors, retailers, and food-service operators." },
      { property: "og:title", content: "Our Role — aT New York" },
      { property: "og:description", content: "Trade promotion, buyer matchmaking, market intelligence, and producer support." },
    ],
  }),
  component: () => (
    <AboutSubpage
      eyebrow="Our Role"
      title="The bridge between Korean producers and the U.S. market."
      lead="aT New York acts as a neutral trade facilitator — providing the introductions, infrastructure, and intelligence required for Korean exporters to succeed in the U.S., and for U.S. buyers to source reliably from Korea."
      sections={[
        {
          heading: "Buyer–supplier matchmaking",
          body: "We curate qualified introductions through the BKF program, trade missions, and category-focused trade events at venues including Fancy Food, NRA Show, and the K-Food Fair.",
        },
        {
          heading: "Market intelligence",
          body: "Our team publishes quarterly reports on U.S. retail trends, consumer behavior, channel performance, and regulatory updates — distributed to Korean exporters and policy stakeholders.",
        },
        {
          heading: "Compliance and localization",
          body: "We provide hands-on support for FDA registration, U.S. nutrition labeling, allergen disclosure, and packaging adaptation — helping producers ship retail-ready SKUs.",
        },
        {
          heading: "Logistics and distribution support",
          body: "Through partner warehouses, consolidated container programs, and customs guidance, we lower the operating cost of U.S. market entry for small and mid-sized Korean exporters.",
        },
      ]}
      stats={[
        { v: "200+", l: "Buyer meetings / yr" },
        { v: "12", l: "Trade shows / yr" },
        { v: "48hr", l: "Buyer-inquiry response" },
        { v: "50", l: "U.S. states served" },
      ]}
    />
  ),
});
