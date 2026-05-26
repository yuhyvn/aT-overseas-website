import { createFileRoute } from "@tanstack/react-router";
import { AboutSubpage } from "@/components/about/AboutSubpage";

export const Route = createFileRoute("/about/who-we-are")({
  head: () => ({
    meta: [
      { title: "Who We Are — aT New York" },
      { name: "description", content: "aT AMERICA is the U.S. regional headquarters of Korea Agro-Fisheries & Food Trade Corporation, with branch offices in New York, Los Angeles, and Sao Paulo." },
      { property: "og:title", content: "Who We Are — aT New York" },
      { property: "og:description", content: "U.S. regional headquarters for Korean food and beverage trade promotion." },
    ],
  }),
  component: () => (
    <AboutSubpage
      eyebrow="Who We Are"
      title="aT AMERICA connects Korean food and beverage producers with global markets."
      lead="aT AMERICA is the U.S. regional headquarters of Korea Agro-Fisheries & Food Trade Corporation in Republic of Korea, with branch offices in New York, Los Angeles, and Sao Paulo, Brazil."
      sections={[
        {
          heading: "Government agency for Korean food trade",
          body: "Korea Agro-Fisheries & Food Trade Corp. is the government agency founded in 1967 and entrusted with the promotion of trade, exportation, and marketing of Korean foods and beverages around the world.",
        },
        {
          heading: "Promoting Korean food globally",
          body: "Through participation in major exhibitions, improving packaging design, advertising, and other initiatives, Korea Agro-Fisheries & Food Trade Corp. increases familiarity of Korean foods and products and caters to the global consumer market.",
        },
        {
          heading: "Building trade relationships",
          body: "aT builds and fosters relationships between manufacturers and exporters with importers and distributors, helping Korean food and beverage products reach overseas markets.",
        },
      ]}
      stats={[
        { v: "1967", l: "Agency founded" },
        { v: "3", l: "aT AMERICA branch offices" },
        { v: "NY", l: "New York office" },
        { v: "LA", l: "Los Angeles office" },
      ]}
    />
  ),
});
