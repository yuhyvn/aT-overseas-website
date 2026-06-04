import type { LucideIcon } from "lucide-react";
import { BriefcaseBusiness, CalendarDays, CircleEllipsis, ClipboardList } from "lucide-react";

export type UpdateCategory = "bidding" | "careers" | "exhibitions" | "others";

export type NoticeAttachment = {
  name: string;
  url: string;
  path?: string;
};

export interface Update {
  id: string;
  category: UpdateCategory;
  title: string;
  summary: string;
  content?: string;
  date: string; // ISO 8601 date string (YYYY-MM-DD)
  location?: string; // e.g., "New York, NY" or "Virtual"
  attachments?: NoticeAttachment[];
  attachmentName?: string;
  attachmentUrl?: string;
  attachmentPath?: string;
}

export const updateCategoryMeta: Record<
  UpdateCategory,
  { label: string; icon: LucideIcon; accent: string }
> = {
  bidding: {
    label: "Bidding",
    icon: ClipboardList,
    accent: "text-navy",
  },
  careers: {
    label: "Careers",
    icon: BriefcaseBusiness,
    accent: "text-navy",
  },
  exhibitions: {
    label: "Exhibitions",
    icon: CalendarDays,
    accent: "text-gold",
  },
  others: {
    label: "Others",
    icon: CircleEllipsis,
    accent: "text-navy",
  },
};

export const updates: Update[] = [
  {
    id: "up-001",
    category: "bidding",
    title: "Sample Bidding Notice",
    summary:
      "This is a sample bidding notice. Replace it with official procurement or vendor announcement content.",
    date: "2026-05-15",
    location: "New York, NY",
  },
  {
    id: "up-002",
    category: "exhibitions",
    title: "Sample Exhibition Notice",
    summary:
      "This is a sample exhibition notice. Replace it with event participation, booth, or trade show information.",
    date: "2026-05-10",
    location: "Seoul / Los Angeles",
  },
  {
    id: "up-003",
    category: "careers",
    title: "Sample Careers Notice",
    summary:
      "This is a sample careers notice. Replace it with hiring, internship, or recruitment information.",
    date: "2026-05-05",
    location: "Virtual / New York, NY",
  },
  {
    id: "up-004",
    category: "others",
    title: "Sample General Notice",
    summary: "This is a sample general notice. Replace it with other office announcements.",
    date: "2026-04-20",
  },
];
