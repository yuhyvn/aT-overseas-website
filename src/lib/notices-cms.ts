import { updates, type Update, type UpdateCategory } from "@/data/updates";

type SanityNotice = {
  _id: string;
  title?: string;
  summary?: string;
  date?: string;
  category?: UpdateCategory;
  location?: string;
  actionLabel?: string;
  actionHref?: string;
};

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
const dataset = import.meta.env.VITE_SANITY_DATASET ?? "production";
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION ?? "2026-05-26";

const noticeQuery = `*[_type == "notice" && defined(title)] | order(date desc) {
  _id,
  title,
  summary,
  date,
  category,
  location,
  actionLabel,
  actionHref
}`;

export function hasCmsConfig() {
  return Boolean(projectId && dataset);
}

export async function fetchNotices(): Promise<Update[]> {
  if (!hasCmsConfig()) return updates;

  const url = new URL(`https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`);
  url.searchParams.set("query", noticeQuery);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Sanity request failed: ${response.status}`);
    const data = (await response.json()) as { result?: SanityNotice[] };
    const notices = (data.result ?? []).map(toUpdate).filter(Boolean) as Update[];
    return notices.length > 0 ? notices : updates;
  } catch (error) {
    console.warn("Using local notice fallback because CMS notices could not be loaded.", error);
    return updates;
  }
}

function toUpdate(item: SanityNotice): Update | null {
  if (!item.title || !item.summary || !item.date || !item.category) return null;

  return {
    id: item._id,
    title: item.title,
    summary: item.summary,
    date: item.date,
    category: item.category,
    location: item.location,
    actionLabel: item.actionLabel,
    actionHref: item.actionHref,
  };
}
