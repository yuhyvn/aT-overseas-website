import { updates, type NoticeAttachment, type Update, type UpdateCategory } from "@/data/updates";

const defaultSupabaseUrl = "https://zutmwxwzakauumavvhrq.supabase.co";
const defaultAnonKey = "sb_publishable_iMoCtLSHZZ0eLsYAfYPMiw_YZAbbjB1";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) ?? defaultSupabaseUrl;
const anonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? defaultAnonKey;

const sessionKey = "atny-supabase-session";
const refreshMarginSeconds = 60;
const noticeFilesBucket = "notice-files";

export type NoticeRow = {
  id: string;
  category: UpdateCategory;
  title: string;
  summary: string;
  content: string | null;
  date: string;
  location: string | null;
  attachment_name: string | null;
  attachment_url: string | null;
  attachment_path: string | null;
  attachments?: NoticeAttachment[] | null;
  created_at?: string;
  updated_at?: string;
};

export type NoticeInput = {
  category: UpdateCategory;
  title: string;
  content?: string;
  date: string;
  location?: string;
  attachments?: NoticeAttachment[];
};

export type SupabaseSession = {
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
  user?: {
    email?: string;
  };
};

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && anonKey);
}

export function getSupabaseEnv() {
  return {
    url: supabaseUrl,
    anonKey,
  };
}

export function getStoredSession(): SupabaseSession | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(sessionKey);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SupabaseSession;
  } catch {
    window.localStorage.removeItem(sessionKey);
    return null;
  }
}

export function storeSession(session: SupabaseSession) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(sessionKey, JSON.stringify(session));
}

export function clearStoredSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(sessionKey);
}

export async function getActiveSession() {
  const session = getStoredSession();
  if (!session) return null;

  return refreshSessionIfNeeded(session);
}

export async function signInAdmin(email: string, password: string) {
  const { url, anonKey } = requireSupabaseConfig();

  const response = await fetch(`${url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed. Please check the email and password.");
  }

  const session = toSession(await response.json());

  storeSession(session);
  return session;
}

export async function fetchNoticesFromSupabase(): Promise<Update[]> {
  if (!hasSupabaseConfig()) return updates;

  const { url, anonKey } = requireSupabaseConfig();

  try {
    const response = await fetch(
      `${url}/rest/v1/notices?select=*&order=date.desc&order=created_at.desc`,
      {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${anonKey}`,
        },
      },
    );

    if (!response.ok) throw new Error(`Supabase notices request failed: ${response.status}`);

    const rows = (await response.json()) as NoticeRow[];
    return rows.map(normalizeNoticeRow).map(toUpdate);
  } catch {
    console.warn("Supabase notices could not be loaded. Returning an empty notice list.");
    return [];
  }
}

export async function fetchAdminNotices(session: SupabaseSession): Promise<NoticeRow[]> {
  const { url, anonKey } = requireSupabaseConfig();
  const activeSession = await refreshSessionIfNeeded(session);
  const response = await fetch(
    `${url}/rest/v1/notices?select=*&order=date.desc&order=created_at.desc`,
    {
      headers: authHeaders(anonKey, activeSession.access_token),
    },
  );

  if (!response.ok) throw new Error(await getSupabaseError(response, "Could not load notices."));
  const rows = (await response.json()) as NoticeRow[];
  return rows.map(normalizeNoticeRow);
}

export async function createNotice(input: NoticeInput, session: SupabaseSession) {
  const { url, anonKey } = requireSupabaseConfig();
  const activeSession = await refreshSessionIfNeeded(session);
  const response = await fetch(`${url}/rest/v1/notices`, {
    method: "POST",
    headers: {
      ...authHeaders(anonKey, activeSession.access_token),
      Prefer: "return=representation",
    },
    body: JSON.stringify(toRowInput(input)),
  });

  if (!response.ok) {
    throw new Error(await getSupabaseError(response, "Could not create the notice."));
  }
  return ((await response.json()) as NoticeRow[])[0];
}

export async function updateNotice(id: string, input: NoticeInput, session: SupabaseSession) {
  const { url, anonKey } = requireSupabaseConfig();
  const activeSession = await refreshSessionIfNeeded(session);
  const response = await fetch(`${url}/rest/v1/notices?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: {
      ...authHeaders(anonKey, activeSession.access_token),
      Prefer: "return=representation",
    },
    body: JSON.stringify(toRowInput(input)),
  });

  if (!response.ok) {
    throw new Error(await getSupabaseError(response, "Could not update the notice."));
  }
  return ((await response.json()) as NoticeRow[])[0];
}

export async function deleteNotice(id: string, session: SupabaseSession) {
  const { url, anonKey } = requireSupabaseConfig();
  const activeSession = await refreshSessionIfNeeded(session);
  const response = await fetch(`${url}/rest/v1/notices?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: authHeaders(anonKey, activeSession.access_token),
  });

  if (!response.ok)
    throw new Error(await getSupabaseError(response, "Could not delete the notice."));
}

export async function uploadNoticeFile(file: File, session: SupabaseSession) {
  const { url, anonKey } = requireSupabaseConfig();
  const activeSession = await refreshSessionIfNeeded(session);
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const path = `${crypto.randomUUID()}-${safeName}`;
  const response = await fetch(
    `${url}/storage/v1/object/${noticeFilesBucket}/${encodeURIComponent(path)}`,
    {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${activeSession.access_token}`,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "false",
      },
      body: file,
    },
  );

  if (!response.ok) {
    throw new Error(await getSupabaseError(response, "Could not upload the attachment."));
  }

  return {
    name: file.name,
    path,
    url: `${url}/storage/v1/object/public/${noticeFilesBucket}/${encodeURIComponent(path)}`,
  };
}

async function refreshSessionIfNeeded(session: SupabaseSession) {
  if (!shouldRefreshSession(session)) return session;
  if (!session.refresh_token) {
    clearStoredSession();
    throw new Error("Your admin session expired. Please sign in again.");
  }

  const { url, anonKey } = requireSupabaseConfig();
  const response = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: {
      apikey: anonKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: session.refresh_token }),
  });

  if (!response.ok) {
    clearStoredSession();
    throw new Error("Your admin session expired. Please sign in again.");
  }

  const refreshedSession = toSession(await response.json());
  storeSession(refreshedSession);
  return refreshedSession;
}

function shouldRefreshSession(session: SupabaseSession) {
  if (!session.expires_at) return false;
  return session.expires_at <= Math.floor(Date.now() / 1000) + refreshMarginSeconds;
}

function toSession(data: unknown): SupabaseSession {
  const authData = data as {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
    user?: { email?: string };
  };

  return {
    access_token: authData.access_token,
    refresh_token: authData.refresh_token,
    expires_at: authData.expires_in
      ? Math.floor(Date.now() / 1000) + authData.expires_in
      : undefined,
    user: authData.user,
  };
}

function requireSupabaseConfig() {
  if (!supabaseUrl || !anonKey) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.",
    );
  }

  return { url: supabaseUrl.replace(/\/$/, ""), anonKey };
}

function authHeaders(key: string, token: string) {
  return {
    apikey: key,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

function toUpdate(row: NoticeRow): Update {
  const attachments = normalizeAttachments(row);

  return {
    id: row.id,
    category: normalizeCategory(row.category),
    title: row.title,
    summary: row.summary,
    content: row.content ?? undefined,
    date: row.date,
    location: row.location ?? undefined,
    attachments,
    attachmentName: attachments[0]?.name,
    attachmentUrl: attachments[0]?.url,
    attachmentPath: attachments[0]?.path,
  };
}

function normalizeNoticeRow(row: NoticeRow): NoticeRow {
  const attachments = normalizeAttachments(row);

  return {
    ...row,
    category: normalizeCategory(row.category),
    attachments,
    attachment_name: row.attachment_name ?? attachments[0]?.name ?? null,
    attachment_url: row.attachment_url ?? attachments[0]?.url ?? null,
    attachment_path: row.attachment_path ?? attachments[0]?.path ?? null,
  };
}

function normalizeAttachments(row: NoticeRow): NoticeAttachment[] {
  const attachments = Array.isArray(row.attachments) ? row.attachments : [];
  const cleanAttachments = attachments
    .map(normalizeAttachment)
    .filter((attachment): attachment is NoticeAttachment => Boolean(attachment));

  if (cleanAttachments.length > 0) return cleanAttachments;

  if (row.attachment_name && row.attachment_url) {
    const attachment = normalizeAttachment({
      name: row.attachment_name,
      url: row.attachment_url,
      path: row.attachment_path ?? undefined,
    });

    return attachment ? [attachment] : [];
  }

  return [];
}

function normalizeAttachment(attachment: NoticeAttachment): NoticeAttachment | null {
  const name = attachment.name.trim();
  const url = getAllowedAttachmentUrl(attachment.url);

  if (!name || !url) return null;

  return {
    name,
    url,
    path: attachment.path,
  };
}

function getAllowedAttachmentUrl(value: string) {
  try {
    const url = new URL(value);
    const storageBase = new URL(
      `/storage/v1/object/public/${noticeFilesBucket}/`,
      requireSupabaseConfig().url,
    );

    if (url.protocol !== "https:") return null;
    if (url.origin !== storageBase.origin) return null;
    if (!url.pathname.startsWith(storageBase.pathname)) return null;

    return url.toString();
  } catch {
    return null;
  }
}

function normalizeCategory(category: string): UpdateCategory {
  if (category === "bidding" || category === "careers" || category === "exhibitions") {
    return category;
  }

  if (category === "trade-exhibition") return "exhibitions";

  return "others";
}

function toRowInput(input: NoticeInput) {
  const content = input.content?.trim() || "";
  const attachments = (input.attachments ?? [])
    .map(normalizeAttachment)
    .filter((attachment): attachment is NoticeAttachment => Boolean(attachment));
  const firstAttachment = attachments[0];

  return {
    category: input.category,
    title: input.title,
    summary: makeSummary(content || input.title),
    content: content || null,
    date: input.date,
    location: input.location?.trim() || null,
    attachments,
    attachment_name: firstAttachment?.name ?? null,
    attachment_url: firstAttachment?.url ?? null,
    attachment_path: firstAttachment?.path ?? null,
  };
}

function makeSummary(value: string) {
  const compact = value.replace(/\s+/g, " ").trim();
  if (compact.length <= 180) return compact;
  return `${compact.slice(0, 177)}...`;
}

async function getSupabaseError(response: Response, fallback: string) {
  console.warn("Supabase admin request failed.", { status: response.status });
  return fallback;
}
