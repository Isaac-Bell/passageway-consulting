"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { CmsUser } from "@/app/lib/cms-auth";
import type { ContentCollection } from "@/app/lib/cms-data";

type Item = Record<string, unknown> & { id: number | string };
type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "checkbox" | "number" | "datetime-local" | "select" | "url";
  options?: string[];
  required?: boolean;
  wide?: boolean;
  upload?: "image" | "file";
  defaultValue?: string | number | boolean;
  hint?: string;
  disabled?: boolean;
};
type Definition = {
  label: string;
  singular: string;
  description: string;
  fields: Field[];
  titleField: string;
  statusField?: string;
  adminOnly?: boolean;
  singleton?: boolean;
};

const definitions: Record<ContentCollection, Definition> = {
  services: {
    label: "Services", singular: "service", titleField: "name",
    description: "Manage names, pricing, booking links, visibility, and the order of Passageway offerings.",
    fields: [
      field("name", "Service name", { required: true }), field("slug", "Page slug", { hint: "Used in links; leave blank to generate it." }),
      field("eyebrow", "Short label", { defaultValue: "Support" }), field("category", "Category", { defaultValue: "Consulting" }),
      field("summary", "Short description", { type: "textarea", wide: true }), field("description", "Full description", { type: "textarea", wide: true }),
      field("initialPrice", "Initial price"), field("followUpPrice", "Follow-up price"), field("priceNote", "Pricing note", { wide: true }),
      field("bookingUrl", "Booking link", { type: "url", wide: true, defaultValue: "https://passagewayconsulting.as.me/" }),
      field("sortOrder", "Display order", { type: "number", defaultValue: 0 }), field("active", "Visible on website", { type: "checkbox", defaultValue: true }),
      field("featured", "Feature this service", { type: "checkbox" }),
    ],
  },
  events: {
    label: "Events", singular: "event", titleField: "title", statusField: "status",
    description: "Create workshops and cohorts, publish them, and choose which one appears on the homepage.",
    fields: [
      field("title", "Event title", { required: true }), field("slug", "Page slug"), field("summary", "Short description", { type: "textarea", wide: true }),
      field("description", "Event details", { type: "textarea", wide: true }), field("startsAt", "Start date and time", { type: "datetime-local" }),
      field("endsAt", "End date and time", { type: "datetime-local" }), field("timezone", "Timezone", { defaultValue: "America/Chicago" }),
      field("format", "Format", { defaultValue: "Online" }), field("priceLabel", "Price or label"), field("capacityLabel", "Capacity note"),
      field("registrationUrl", "Registration link", { type: "url", wide: true, defaultValue: "https://passagewayconsulting.as.me/" }),
      field("imageUrl", "Event image", { type: "url", wide: true, upload: "image" }),
      field("status", "Status", { type: "select", options: ["draft", "published", "cancelled"], defaultValue: "draft" }),
      field("featured", "Show in homepage event banner", { type: "checkbox" }),
    ],
  },
  posts: {
    label: "Blog", singular: "post", titleField: "title", statusField: "status",
    description: "Write people-first articles with their own search title, description, author, and publish state.",
    fields: [
      field("title", "Post title", { required: true }), field("slug", "Page slug"), field("excerpt", "Excerpt", { type: "textarea", wide: true }),
      field("content", "Article", { type: "textarea", wide: true, hint: "Use blank lines between paragraphs. Headings can begin with ##." }),
      field("coverImageUrl", "Cover image", { type: "url", wide: true, upload: "image" }), field("authorName", "Author", { defaultValue: "Passageway Consulting" }),
      field("category", "Pillar or topic", { defaultValue: "Compassion" }), field("publishedAt", "Publish date", { type: "datetime-local" }),
      field("seoTitle", "Google title", { wide: true }), field("seoDescription", "Google description", { type: "textarea", wide: true }),
      field("status", "Status", { type: "select", options: ["draft", "published"], defaultValue: "draft" }),
    ],
  },
  resources: {
    label: "Resources", singular: "resource", titleField: "title",
    description: "Upload guides, worksheets, and images, then choose which resources are public or featured.",
    fields: [
      field("title", "Resource title", { required: true }), field("slug", "Page slug"), field("category", "Category", { defaultValue: "Guide" }),
      field("description", "Description", { type: "textarea", wide: true }), field("fileUrl", "Download file", { type: "url", wide: true, upload: "file" }),
      field("imageUrl", "Cover image", { type: "url", wide: true, upload: "image" }), field("requiresEmail", "Require newsletter signup", { type: "checkbox", disabled: true, hint: "Available once the approved Mailchimp signup is connected." }),
      field("active", "Visible on website", { type: "checkbox", defaultValue: true }), field("featured", "Feature this resource", { type: "checkbox" }),
    ],
  },
  testimonials: {
    label: "Testimonials", singular: "testimonial", titleField: "quote",
    description: "Keep client words private until they are approved, then choose what can be featured publicly.",
    fields: [
      field("quote", "Testimonial", { type: "textarea", wide: true, required: true }), field("name", "Display name"),
      field("attribution", "Attribution", { defaultValue: "Passageway client" }), field("sortOrder", "Display order", { type: "number", defaultValue: 0 }),
      field("approved", "Approved for public display", { type: "checkbox" }), field("featured", "Feature on homepage", { type: "checkbox" }),
    ],
  },
  team: {
    label: "Team", singular: "team member", titleField: "name",
    description: "Update profiles, photos, credentials, focus areas, and booking links for Hannah and Kimberly.",
    fields: [
      field("name", "Public name", { required: true }), field("slug", "Page slug"), field("title", "Role or title", { defaultValue: "Life Consultant" }),
      field("bio", "Biography", { type: "textarea", wide: true }), field("credentials", "Credentials", { type: "textarea", wide: true }),
      field("focusAreas", "Focus areas", { wide: true, hint: "Separate with commas." }), field("imageUrl", "Portrait", { type: "url", wide: true, upload: "image" }),
      field("bookingUrl", "Booking link", { type: "url", wide: true, defaultValue: "https://passagewayconsulting.as.me/" }),
      field("sortOrder", "Display order", { type: "number", defaultValue: 0 }), field("active", "Visible on website", { type: "checkbox", defaultValue: true }),
    ],
  },
  homepage: {
    label: "Homepage", singular: "homepage announcement", titleField: "announcementTitle", singleton: true,
    description: "Add a temporary announcement. Featured events are managed from the Events section.",
    fields: [
      field("announcementEnabled", "Show announcement", { type: "checkbox" }), field("announcementTitle", "Announcement title", { wide: true }),
      field("announcementBody", "Announcement message", { type: "textarea", wide: true }), field("announcementCtaLabel", "Button label"),
      field("announcementCtaUrl", "Button link", { type: "url", wide: true }),
    ],
  },
  users: {
    label: "Admin users", singular: "admin user", titleField: "name", statusField: "role", adminOnly: true,
    description: "Invite Passageway editors and choose who can manage technical settings and other users.",
    fields: [
      field("name", "Name", { required: true }), field("email", "ChatGPT account email", { required: true }),
      field("role", "Role", { type: "select", options: ["editor", "admin"], defaultValue: "editor" }), field("active", "Access enabled", { type: "checkbox", defaultValue: true }),
    ],
  },
};

const navOrder: ContentCollection[] = ["services", "events", "posts", "resources", "team", "testimonials", "homepage", "users"];

export default function AdminDashboard({ user, signOutUrl }: { user: CmsUser; signOutUrl: string }) {
  const available = useMemo(() => navOrder.filter((key) => !definitions[key].adminOnly || user.role === "admin"), [user.role]);
  const [collection, setCollection] = useState<ContentCollection>("services");
  const [items, setItems] = useState<Item[]>([]);
  const [counts, setCounts] = useState<Partial<Record<ContentCollection, number>>>({});
  const [editing, setEditing] = useState<Item | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const definition = definitions[collection];

  const load = useCallback(async (next: ContentCollection) => {
    setLoading(true); setMessage("");
    try {
      const response = await fetch(`/api/admin/content?collection=${next}`, { cache: "no-store" });
      const payload = await response.json() as { items?: Item[]; error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not load content");
      const nextItems = payload.items ?? [];
      setItems(nextItems); setCounts((current) => ({ ...current, [next]: nextItems.length }));
      if (definitions[next].singleton && nextItems[0]) {
        const config = definitions[next];
        const defaults = Object.fromEntries(config.fields.map((entry) => [entry.name, entry.defaultValue ?? (entry.type === "checkbox" ? false : "")]));
        setEditing(nextItems[0]);
        setForm({ ...defaults, ...nextItems[0] });
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not load content");
    } finally { setLoading(false); }
  }, []);

  // Loading is intentionally tied to the active navigation section.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(collection); }, [collection, load]);
  useEffect(() => {
    void Promise.all(available.filter((key) => key !== collection).map(async (key) => {
      try {
        const response = await fetch(`/api/admin/content?collection=${key}`, { cache: "no-store" });
        const payload = await response.json() as { items?: Item[] };
        if (response.ok) setCounts((current) => ({ ...current, [key]: payload.items?.length ?? 0 }));
      } catch { /* Counts are a convenience; section loading remains authoritative. */ }
    }));
  }, [available, collection]);

  function selectCollection(next: ContentCollection) {
    setCollection(next); setEditing(null); setForm({});
  }

  function openEditor(item?: Item) {
    const config = definitions[collection];
    const defaults = Object.fromEntries(config.fields.map((entry) => [entry.name, entry.defaultValue ?? (entry.type === "checkbox" ? false : "")]));
    setEditing(item ?? ({ id: "new" } as Item));
    setForm({ ...defaults, ...(item ?? {}) }); setMessage("");
  }

  async function save() {
    setSaving(true); setMessage("");
    try {
      const isNew = !editing || editing.id === "new";
      const response = await fetch("/api/admin/content", {
        method: isNew ? "POST" : "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ collection, id: editing?.id, data: form }),
      });
      const payload = await response.json() as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Could not save this item");
      setMessage(`${capitalize(definition.singular)} saved.`);
      if (!definition.singleton) { setEditing(null); setForm({}); }
      await load(collection);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save this item");
    } finally { setSaving(false); }
  }

  async function archive(item: Item) {
    if (!window.confirm(`Archive this ${definition.singular}? It will disappear from the website but remain recoverable in the database.`)) return;
    const response = await fetch("/api/admin/content", {
      method: "DELETE", headers: { "content-type": "application/json" },
      body: JSON.stringify({ collection, id: item.id, email: item.email }),
    });
    const payload = await response.json() as { error?: string };
    if (!response.ok) { setMessage(payload.error || "Could not archive this item"); return; }
    setMessage(`${capitalize(definition.singular)} archived.`); setEditing(null); await load(collection);
  }

  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="admin-logo" href="/" aria-label="View Passageway website"><img src="/images/passageway-logo.png" alt="" /></Link>
        <div className="admin-sidebar-heading"><span>Passageway</span><strong>Admin</strong></div>
        <nav aria-label="Admin sections">
          {available.map((key) => (
            <button key={key} className={collection === key ? "active" : ""} onClick={() => selectCollection(key)}>
              <span>{definitions[key].label}</span><small>{counts[key] ?? "—"}</small>
            </button>
          ))}
        </nav>
        <div className="admin-account">
          <div><strong>{user.name}</strong><span>{user.role}</span></div>
          <a href={signOutUrl}>Sign out</a>
        </div>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div><p className="admin-kicker">Content studio</p><h1>{definition.label}</h1><p>{definition.description}</p></div>
          {!definition.singleton && <button className="admin-primary-button" onClick={() => openEditor()}>Add {definition.singular}</button>}
        </header>

        {message && <div className="admin-message" role="status">{message}</div>}

        {editing ? (
          <Editor definition={definition} form={form} setForm={setForm} saving={saving} onSave={save} onCancel={definition.singleton ? undefined : () => setEditing(null)} />
        ) : loading ? (
          <div className="admin-empty">Loading {definition.label.toLowerCase()}…</div>
        ) : items.length === 0 ? (
          <div className="admin-empty"><span>✦</span><h2>No {definition.label.toLowerCase()} yet.</h2><p>Create the first {definition.singular} when you are ready.</p><button className="admin-primary-button" onClick={() => openEditor()}>Add {definition.singular}</button></div>
        ) : (
          <div className="admin-list">
            {items.map((item) => (
              <article key={String(item.id)}>
                <div className="admin-list-index">{String(items.indexOf(item) + 1).padStart(2, "0")}</div>
                <div><p>{String(item[definition.statusField ?? "category"] ?? definition.singular)}</p><h2>{truncate(String(item[definition.titleField] ?? definition.singular), 100)}</h2><span>{summary(item)}</span></div>
                <div className="admin-list-actions"><button onClick={() => openEditor(item)}>Edit</button><button className="danger" onClick={() => void archive(item)}>Archive</button></div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Editor({ definition, form, setForm, saving, onSave, onCancel }: {
  definition: Definition; form: Record<string, unknown>; setForm: (value: Record<string, unknown>) => void;
  saving: boolean; onSave: () => Promise<void>; onCancel?: () => void;
}) {
  const [uploading, setUploading] = useState("");

  async function upload(fieldEntry: Field, file?: File) {
    if (!file) return;
    setUploading(fieldEntry.name);
    try {
      const data = new FormData(); data.append("file", file);
      const response = await fetch("/api/admin/uploads", { method: "POST", body: data });
      const payload = await response.json() as { url?: string; error?: string };
      if (!response.ok || !payload.url) throw new Error(payload.error || "Upload failed");
      setForm({ ...form, [fieldEntry.name]: payload.url });
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "Upload failed");
    } finally { setUploading(""); }
  }

  return (
    <div className="admin-editor">
      <div className="admin-editor-heading"><div><p className="admin-kicker">Edit {definition.singular}</p><h2>Website content</h2></div><span>Changes become public when the item is published or visible.</span></div>
      <div className="admin-form-grid">
        {definition.fields.map((entry) => (
          <label key={entry.name} className={`${entry.wide ? "wide" : ""} ${entry.type === "checkbox" ? "checkbox" : ""}`}>
            {entry.type === "checkbox" ? (
              <><input type="checkbox" disabled={entry.disabled} checked={Boolean(form[entry.name])} onChange={(event) => setForm({ ...form, [entry.name]: event.target.checked })} /><span>{entry.label}</span></>
            ) : (
              <><span>{entry.label}{entry.required ? " *" : ""}</span>{inputFor(entry, form[entry.name], (value) => setForm({ ...form, [entry.name]: value }))}</>
            )}
            {entry.upload && <span className="admin-upload"><input type="file" accept={entry.upload === "image" ? "image/jpeg,image/png,image/webp" : "application/pdf"} onChange={(event) => void upload(entry, event.target.files?.[0])} />{uploading === entry.name ? "Uploading…" : `Upload ${entry.upload}`}</span>}
            {entry.hint && <small>{entry.hint}</small>}
          </label>
        ))}
      </div>
      <div className="admin-editor-actions">{onCancel && <button onClick={onCancel}>Cancel</button>}<button className="admin-primary-button" disabled={saving} onClick={() => void onSave()}>{saving ? "Saving…" : "Save changes"}</button></div>
    </div>
  );
}

function inputFor(entry: Field, value: unknown, onChange: (value: string | number) => void) {
  if (entry.type === "textarea") return <textarea disabled={entry.disabled} value={String(value ?? "")} rows={entry.name === "content" || entry.name === "bio" ? 12 : 5} required={entry.required} onChange={(event) => onChange(event.target.value)} />;
  if (entry.type === "select") return <select disabled={entry.disabled} value={String(value ?? "")} onChange={(event) => onChange(event.target.value)}>{entry.options?.map((option) => <option key={option} value={option}>{capitalize(option)}</option>)}</select>;
  return <input disabled={entry.disabled} type={entry.type ?? "text"} value={String(value ?? "")} required={entry.required} onChange={(event) => onChange(entry.type === "number" ? Number(event.target.value) : event.target.value)} />;
}

function field(name: string, label: string, options: Partial<Field> = {}): Field { return { name, label, ...options }; }
function capitalize(value: string) { return value.charAt(0).toUpperCase() + value.slice(1); }
function truncate(value: string, length: number) { return value.length > length ? `${value.slice(0, length)}…` : value; }
function summary(item: Item) { return truncate(String(item.summary ?? item.excerpt ?? item.description ?? item.bio ?? item.email ?? item.attribution ?? "Ready to edit"), 150); }
