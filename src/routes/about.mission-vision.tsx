import { createFileRoute } from "@tanstack/react-router";
import { AboutSubpage } from "@/components/about/AboutSubpage";

export const Route = createFileRoute("/about/mission-vision")({
  head: () => ({
    meta: [
      { title: "Mission & Vision — aT New York" },
      { name: "description", content: "The mission and long-term vision guiding aT New York's work in U.S.–Korea food trade." },
      { property: "og:title", content: "Mission & Vision — aT New York" },
      { property: "og:description", content: "Trusted, sustainable global growth for Korean food." },
    ],
  }),
  component: () => (
    <AboutSubpage
      eyebrow="Mission & Vision"
      title="Building a trusted, sustainable global market for Korean food."
      lead="Our mission is to make Korean food accessible, commercially successful, and reliably sourced across the U.S. — and to ensure every producer we represent meets the highest standards of safety, quality, and consistency."
      sections={[
        {
          heading: "Our mission",
          body: "Promote Korean agri-food exports through trade infrastructure, buyer support, and producer development — strengthening Korea's position as a leading global food origin.",
        },
        {
          heading: "Our vision",
          body: "A future where K-food is a mainstream U.S. retail category, sourced from a transparent, certified, and resilient supply chain that benefits Korean producers and American consumers alike.",
        },
        {
          heading: "Our principles",
          body: "Neutrality, transparency, long-term partnership, and respect for the regulatory standards of every market we serve.",
        },
      ]}
      stats={[
        { v: "$2B", l: "Target U.S. export ceiling" },
        { v: "100%", l: "FDA-registered suppliers" },
        { v: "0", l: "Commercial intermediation fees" },
        { v: "35yr", l: "Track record in the U.S." },
      ]}
    />
  ),
});
