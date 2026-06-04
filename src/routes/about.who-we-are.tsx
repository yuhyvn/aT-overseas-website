import { createFileRoute } from "@tanstack/react-router";
import { AboutSubpage } from "@/components/about/AboutSubpage";

export const Route = createFileRoute("/about/who-we-are")({
  head: () => ({
    meta: [
      { title: "Who We Are — aT New York" },
      {
        name: "description",
        content:
          "aT Center New York — overview of Korea Agro-Fisheries & Food Trade Corporation and its North American operations.",
      },
      { property: "og:title", content: "Who We Are — aT New York" },
      {
        property: "og:description",
        content:
          "Korea's national agricultural trade promotion agency, operating in New York since 1989.",
      },
    ],
  }),
  component: () => (
    <AboutSubpage
      eyebrow="Who We Are"
      title="A national trade agency built to grow Korean food globally."
      lead="Korea Agro-Fisheries & Food Trade Corporation (aT) is the Korean government's official agency for agricultural and food trade. aT Center New York is one of more than 15 overseas offices working to scale Korean food exports."
      sections={[
        {
          heading: "Established 1989 in New York",
          body: "Our office has served as Korea's primary food-trade gateway to North America for more than three decades, working with importers, distributors, and retailers across all 50 states.",
        },
        {
          heading: "Part of a global network",
          body: "aT operates branches across the Americas, Europe, Asia, and the Middle East. Each office shares a common trade infrastructure while focusing on local market dynamics.",
        },
        {
          heading: "Trade infrastructure, not commerce",
          body: "We are a public-interest organization. We do not sell or distribute products — we connect, support, and promote Korean exporters and their qualified overseas trade partners.",
        },
      ]}
      stats={[
        { v: "1989", l: "NY Center established" },
        { v: "15+", l: "Overseas branches" },
        { v: "850+", l: "Suppliers represented" },
        { v: "$1.6B", l: "K-food exports to U.S." },
      ]}
    />
  ),
});
