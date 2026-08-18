import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { programs } from "@/data/programs";

const BASE_URL = "https://www.atcenternewyork.workers.dev";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.7" },
          { path: "/about/who-we-are", changefreq: "monthly", priority: "0.6" },
          { path: "/about/our-role", changefreq: "monthly", priority: "0.6" },
          { path: "/about/mission-vision", changefreq: "monthly", priority: "0.6" },
          { path: "/programs", changefreq: "monthly", priority: "0.8" },
          ...programs.map((p) => ({
            path: `/programs/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
          { path: "/notifications", changefreq: "weekly", priority: "0.8" },
        ];
        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
