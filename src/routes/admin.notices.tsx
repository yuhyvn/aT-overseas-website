import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  LogOut,
  Pencil,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { updateCategoryMeta, type UpdateCategory } from "@/data/updates";
import {
  clearStoredSession,
  createNotice,
  deleteNotice,
  fetchAdminNotices,
  getActiveSession,
  getStoredSession,
  hasSupabaseConfig,
  type NoticeInput,
  type NoticeRow,
  type SupabaseSession,
  updateNotice,
  uploadNoticeFile,
} from "@/lib/supabase";

export const Route = createFileRoute("/admin/notices")({
  component: AdminNoticesPage,
});

const categories = Object.entries(updateCategoryMeta).map(([value, meta]) => ({
  value: value as UpdateCategory,
  label: meta.label,
}));

const emptyForm: NoticeInput = {
  title: "",
  content: "",
  date: new Date().toISOString().slice(0, 10),
  category: "bidding",
  location: "",
  attachments: [],
};

function AdminNoticesPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState(() => getStoredSession());
  const [notices, setNotices] = useState<NoticeRow[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState<NoticeInput>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);

  const selectedNotice = useMemo(
    () => notices.find((notice) => notice.id === selectedId) ?? null,
    [notices, selectedId],
  );

  useEffect(() => {
    if (!hasSupabaseConfig()) {
      setLoading(false);
      return;
    }

    void loadNotices();
  }, []);

  async function requireActiveAdminSession() {
    const activeSession = await getActiveSession();
    setSession(activeSession);

    if (!activeSession) {
      throw new Error("Your admin session expired. Please sign in again.");
    }

    return activeSession;
  }

  async function loadNotices(activeSession?: SupabaseSession) {
    setLoading(true);
    setError("");

    try {
      const freshSession = activeSession ?? (await requireActiveAdminSession());
      setNotices(await fetchAdminNotices(freshSession));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not load notices.");
    } finally {
      setLoading(false);
    }
  }

  function startCreate() {
    setSelectedId(null);
    setForm({ ...emptyForm, date: new Date().toISOString().slice(0, 10) });
    setAttachmentFiles([]);
    setMessage("");
    setError("");
  }

  function startEdit(notice: NoticeRow) {
    setSelectedId(notice.id);
    setForm({
      title: notice.title,
      content: notice.content ?? "",
      date: notice.date,
      category: notice.category,
      location: notice.location ?? "",
      attachments: notice.attachments ?? [],
    });
    setAttachmentFiles([]);
    setMessage("");
    setError("");
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const activeSession = await requireActiveAdminSession();
      const uploadedAttachments = [];

      for (const file of attachmentFiles) {
        uploadedAttachments.push(await uploadNoticeFile(file, activeSession));
      }

      const noticeInput = {
        ...form,
        attachments: [...(form.attachments ?? []), ...uploadedAttachments],
      };

      if (selectedNotice) {
        await updateNotice(selectedNotice.id, noticeInput, activeSession);
        await loadNotices(activeSession);
        startCreate();
        setMessage("Notice updated.");
      } else {
        await createNotice(noticeInput, activeSession);
        await loadNotices(activeSession);
        startCreate();
        setMessage("Notice created.");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not save the notice.");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(notice: NoticeRow) {
    if (!window.confirm(`Delete "${notice.title}"?`)) return;

    setError("");
    setMessage("");

    try {
      const activeSession = await requireActiveAdminSession();
      await deleteNotice(notice.id, activeSession);
      setMessage("Notice deleted.");
      await loadNotices(activeSession);
      if (selectedId === notice.id) startCreate();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Could not delete the notice.");
    }
  }

  async function signOut() {
    clearStoredSession();
    setSession(null);
    await navigate({ to: "/admin/login" });
  }

  if (!hasSupabaseConfig()) {
    return (
      <AdminGate
        title="Supabase is not connected yet"
        body="Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local first."
      />
    );
  }

  if (!session) {
    return (
      <AdminGate
        title="Admin login required"
        body="Sign in before managing notices."
        action={
          <Link
            to="/admin/login"
            className="mt-6 inline-flex items-center rounded-md bg-navy px-5 py-3 text-sm font-semibold text-navy-foreground"
          >
            Go to login
          </Link>
        }
      />
    );
  }

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/35">
        <div className="container-page py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <Link
                to="/notifications"
                className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-navy"
              >
                <ArrowLeft className="h-4 w-4" /> Public notices
              </Link>
              <h1 className="mt-4 font-display text-3xl font-bold text-navy">Manage Notices</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Signed in as {session.user?.email ?? "admin"}
              </p>
            </div>
            <button
              type="button"
              onClick={signOut}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold text-navy transition hover:bg-secondary"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-8 py-12 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-lg font-bold text-navy">Notice list</h2>
            <button
              type="button"
              onClick={startCreate}
              className="inline-flex items-center gap-1.5 rounded-md bg-brand-green px-3 py-2 text-xs font-semibold text-white"
            >
              <Plus className="h-3.5 w-3.5" /> New
            </button>
          </div>

          {loading ? (
            <p className="mt-6 text-sm text-muted-foreground">Loading notices...</p>
          ) : notices.length === 0 ? (
            <p className="mt-6 text-sm text-muted-foreground">No notices yet.</p>
          ) : (
            <ul className="mt-5 space-y-3">
              {notices.map((notice) => (
                <li
                  key={notice.id}
                  className={`rounded-xl border p-4 ${
                    selectedId === notice.id
                      ? "border-brand-green bg-brand-green/5"
                      : "border-border bg-background"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => startEdit(notice)}
                    className="block w-full text-left"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-green">
                      {updateCategoryMeta[notice.category].label}
                    </span>
                    <span className="mt-1 block font-medium leading-snug text-navy">
                      {notice.title}
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">{notice.date}</span>
                  </button>
                  <div className="mt-3 flex gap-2">
                    <Link
                      to="/notifications/$id"
                      params={{ id: notice.id }}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold text-navy"
                    >
                      <ExternalLink className="h-3.5 w-3.5" /> View
                    </Link>
                    <button
                      type="button"
                      onClick={() => startEdit(notice)}
                      className="inline-flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold text-navy"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(notice)}
                      className="inline-flex items-center gap-1 rounded-md border border-destructive/25 px-2.5 py-1.5 text-xs font-semibold text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-card p-6 shadow-card"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-green">
                {selectedNotice ? "Edit notice" : "New notice"}
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold text-navy">
                {selectedNotice ? selectedNotice.title : "Create a notice"}
              </h2>
            </div>
            {selectedNotice && (
              <button
                type="button"
                onClick={startCreate}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-semibold text-navy"
              >
                <X className="h-3.5 w-3.5" /> Cancel edit
              </button>
            )}
          </div>

          <div className="mt-6 grid gap-5">
            <Field label="Title">
              <input
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                required
                className="field-input"
              />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Category">
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value as UpdateCategory })
                  }
                  className="field-input"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Date">
                <input
                  value={form.date}
                  onChange={(event) => setForm({ ...form, date: event.target.value })}
                  type="date"
                  required
                  className="field-input"
                />
              </Field>
            </div>

            <Field label="Full content">
              <textarea
                value={form.content}
                onChange={(event) => setForm({ ...form, content: event.target.value })}
                rows={8}
                placeholder="Write the full notice content."
                className="field-textarea"
              />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Location">
                <input
                  value={form.location}
                  onChange={(event) => setForm({ ...form, location: event.target.value })}
                  className="field-input"
                />
              </Field>
              <Field label="Attachment">
                <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-md border border-dashed border-input bg-background px-3 py-2 text-sm text-muted-foreground transition hover:border-brand-green hover:bg-brand-green/5">
                  <Upload className="h-4 w-4 shrink-0 text-brand-green" />
                  <span className="truncate">
                    {attachmentFiles.length > 0
                      ? `${attachmentFiles.length} file(s) selected`
                      : "Upload reference files"}
                  </span>
                  <input
                    type="file"
                    multiple
                    className="sr-only"
                    onChange={(event) =>
                      setAttachmentFiles(Array.from(event.target.files ?? []))
                    }
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.png,.jpg,.jpeg"
                  />
                </label>
              </Field>
            </div>

            {((form.attachments?.length ?? 0) > 0 || attachmentFiles.length > 0) && (
              <div className="space-y-2 rounded-lg border border-border bg-secondary/35 p-3 text-sm">
                {form.attachments?.map((attachment, index) => (
                  <div
                    key={`${attachment.url}-${index}`}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-card px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-2 text-navy">
                      <FileText className="h-4 w-4 shrink-0 text-brand-green" />
                      <span className="truncate">{attachment.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setForm({
                          ...form,
                          attachments: form.attachments?.filter((_, itemIndex) => itemIndex !== index),
                        })
                      }
                      className="text-xs font-semibold text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                ))}

                {attachmentFiles.map((file, index) => (
                  <div
                    key={`${file.name}-${file.lastModified}-${index}`}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-card px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-2 text-navy">
                      <FileText className="h-4 w-4 shrink-0 text-brand-green" />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setAttachmentFiles((files) =>
                          files.filter((_, itemIndex) => itemIndex !== index),
                        )
                      }
                      className="text-xs font-semibold text-destructive"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {message && (
            <div className="mt-5 rounded-lg border border-brand-green/25 bg-brand-green/5 p-3 text-sm text-brand-green">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-navy px-5 py-3 text-sm font-semibold text-navy-foreground transition hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save notice"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}

function AdminGate({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <SiteLayout>
      <section className="container-page py-20">
        <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-card">
          <h1 className="font-display text-2xl font-bold text-navy">{title}</h1>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p>
          {action}
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-navy">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
