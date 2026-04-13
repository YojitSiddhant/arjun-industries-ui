"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/content";
import type { Enquiry } from "@/lib/enquiries";
import { toPhoneHref } from "@/lib/format";

type Status = { type: "idle" | "saving" | "success" | "error"; message?: string };
type Field = { key: string; label: string; type?: "text" | "textarea" | "lines" };
type EditableValue = string | string[] | undefined;
type AdminTab =
  | "home"
  | "about"
  | "services"
  | "gallery"
  | "contact"
  | "enquiries"
  | "settings";

const toLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const fromLines = (value: string[] | undefined) => (value ? value.join("\n") : "");

const prepareLogoFile = async (file: File): Promise<File> => {
  const bitmap =
    "createImageBitmap" in window
      ? await createImageBitmap(file)
      : await new Promise<ImageBitmap>((resolve, reject) => {
          const img = new Image();
          const url = URL.createObjectURL(file);
          img.onload = () => {
            URL.revokeObjectURL(url);
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("Canvas not supported."));
              return;
            }
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
              if (!blob) {
                reject(new Error("Image processing failed."));
                return;
              }
              createImageBitmap(blob).then(resolve).catch(reject);
            });
          };
          img.onerror = () => reject(new Error("Image load failed."));
          img.src = url;
        });

  const canvas = document.createElement("canvas");
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return file;
  }
  ctx.drawImage(bitmap, 0, 0);
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  let found = false;

  const whiteThreshold = 245;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const alpha = data[idx + 3];
      const isOpaque = alpha > 10;
      const isNearWhite = r >= whiteThreshold && g >= whiteThreshold && b >= whiteThreshold;
      if (isOpaque && !isNearWhite) {
        found = true;
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (!found) {
    const fallbackSize = Math.min(width, height);
    const fallbackX = Math.floor((width - fallbackSize) / 2);
    const fallbackY = Math.floor((height - fallbackSize) / 2);
    const outputSize = 512;
    const outputCanvas = document.createElement("canvas");
    outputCanvas.width = outputSize;
    outputCanvas.height = outputSize;
    const outCtx = outputCanvas.getContext("2d");
    if (!outCtx) return file;
    outCtx.drawImage(
      canvas,
      fallbackX,
      fallbackY,
      fallbackSize,
      fallbackSize,
      0,
      0,
      outputSize,
      outputSize
    );
    const blob = await new Promise<Blob | null>((resolve) =>
      outputCanvas.toBlob(resolve, "image/png", 0.92)
    );
    if (!blob) return file;
    return new File([blob], `logo-${Date.now()}.png`, { type: "image/png" });
  }

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;
  const size = Math.max(cropW, cropH);
  let cropX = minX - Math.floor((size - cropW) / 2);
  let cropY = minY - Math.floor((size - cropH) / 2);

  if (cropX < 0) cropX = 0;
  if (cropY < 0) cropY = 0;
  if (cropX + size > width) cropX = Math.max(0, width - size);
  if (cropY + size > height) cropY = Math.max(0, height - size);

  const outputSize = 512;
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = outputSize;
  outputCanvas.height = outputSize;
  const outCtx = outputCanvas.getContext("2d");
  if (!outCtx) {
    return file;
  }
  outCtx.drawImage(canvas, cropX, cropY, size, size, 0, 0, outputSize, outputSize);

  const blob = await new Promise<Blob | null>((resolve) =>
    outputCanvas.toBlob(resolve, "image/png", 0.92)
  );
  if (!blob) {
    return file;
  }
  return new File([blob], `logo-${Date.now()}.png`, { type: "image/png" });
};

const setByPath = (obj: SiteContent, path: string, value: unknown): SiteContent => {
  const parts = path.split(".");
  const next = structuredClone(obj);
  let cursor = next as unknown as Record<string, unknown>;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i];
    const current = cursor[key];
    cursor[key] = Array.isArray(current)
      ? [...current]
      : { ...(current as Record<string, unknown>) };
    cursor = cursor[key] as Record<string, unknown>;
  }
  cursor[parts[parts.length - 1]] = value;
  return next;
};

const editorTabs: Array<{
  id: AdminTab;
  label: string;
  description: string;
}> = [
  {
    id: "home",
    label: "Home",
    description: "Hero slider, intro section, quick stats, testimonials, and homepage CTA.",
  },
  {
    id: "about",
    label: "About",
    description: "Company overview, focus cards, and capabilities list.",
  },
  {
    id: "services",
    label: "Services",
    description: "Service categories, descriptions, and service page call-to-action.",
  },
  {
    id: "gallery",
    label: "Gallery",
    description: "Gallery title, categories, and all website gallery images.",
  },
  {
    id: "contact",
    label: "Contact",
    description: "Phone, WhatsApp, address, working hours, and map coordinates.",
  },
  {
    id: "enquiries",
    label: "Enquiries",
    description: "Recent website enquiries submitted from the contact form.",
  },
  {
    id: "settings",
    label: "Settings",
    description: "Business name, logos, and footer branding details.",
  },
];

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none focus:border-accent-400 focus:ring-4 focus:ring-[color:var(--accent-100)]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <textarea
        className="min-h-[112px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none focus:border-accent-400 focus:ring-4 focus:ring-[color:var(--accent-100)]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ObjectListEditor<T extends Record<string, EditableValue>>({
  title,
  items,
  fields,
  onChange,
  createItem,
  renderPreview,
}: {
  title: string;
  items: T[];
  fields: Field[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  renderPreview?: (item: T) => React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            Add, edit, or remove items in this section.
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          {items.length} item{items.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div
            key={`${title}-${index}`}
            className="rounded-3xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-800">
                {title} {index + 1}
              </p>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                Editable
              </span>
            </div>
            {renderPreview ? (
              <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                {renderPreview(item)}
              </div>
            ) : null}
            <div className="grid gap-3 md:grid-cols-2">
              {fields.map((field) => {
                const value = item[field.key];
                if (field.type === "textarea") {
                  return (
                    <TextAreaField
                      key={field.key}
                      label={field.label}
                      value={String(value ?? "")}
                      onChange={(nextValue) => {
                        const next = [...items];
                        next[index] = { ...next[index], [field.key]: nextValue };
                        onChange(next);
                      }}
                    />
                  );
                }
                if (field.type === "lines") {
                  return (
                    <TextAreaField
                      key={field.key}
                      label={`${field.label} (one per line)`}
                      value={fromLines(Array.isArray(value) ? value : [])}
                      onChange={(nextValue) => {
                        const next = [...items];
                        next[index] = { ...next[index], [field.key]: toLines(nextValue) };
                        onChange(next);
                      }}
                    />
                  );
                }
                return (
                  <TextField
                    key={field.key}
                    label={field.label}
                    value={String(value ?? "")}
                    onChange={(nextValue) => {
                      const next = [...items];
                      next[index] = { ...next[index], [field.key]: nextValue };
                      onChange(next);
                    }}
                  />
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, i) => i !== index))}
              className="mt-3 rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-semibold text-rose-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, createItem()])}
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm"
        >
          Add item
        </button>
      </div>
    </section>
  );
}

export default function AdminEditor({
  initialContent,
  initialEnquiries,
}: {
  initialContent: SiteContent;
  initialEnquiries: Enquiry[];
}) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [uploading, setUploading] = useState<string | null>(null);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("home");
  const [savedSnapshot, setSavedSnapshot] = useState(() =>
    JSON.stringify(initialContent)
  );
  const hasUnsavedChanges = JSON.stringify(content) !== savedSnapshot;
  const activeTabMeta =
    editorTabs.find((tab) => tab.id === activeTab) ?? editorTabs[0];

  const saveContent = async () => {
    setStatus({ type: "saving" });
    const response = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setStatus({
        type: "error",
        message: data?.message ?? "Could not save content.",
      });
      return;
    }

    setStatus({ type: "success", message: "Content saved successfully." });
    setSavedSnapshot(JSON.stringify(content));
    setTimeout(() => setStatus({ type: "idle" }), 2000);
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    setUploading("Uploading image...");
    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      setUploading(null);
      const data = await response.json().catch(() => ({}));
      throw new Error(data?.message ?? "Upload failed.");
    }
    const data = await response.json();
    setUploading(null);
    return data.path as string;
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    window.location.href = "/admin/login";
  };

  const refreshEnquiries = async () => {
    setLoadingEnquiries(true);
    const response = await fetch("/api/admin/enquiries");
    if (!response.ok) {
      setLoadingEnquiries(false);
      setStatus({ type: "error", message: "Could not load enquiries." });
      return;
    }

    const data = (await response.json()) as Enquiry[];
    setEnquiries(data);
    setLoadingEnquiries(false);
  };

  const deleteEnquiry = async (id: string) => {
    const confirmed = window.confirm("Delete this enquiry?");
    if (!confirmed) return;

    const response = await fetch("/api/admin/enquiries", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setStatus({
        type: "error",
        message: data?.message ?? "Could not delete enquiry.",
      });
      return;
    }

    setEnquiries((prev) => prev.filter((enquiry) => enquiry.id !== id));
    setStatus({ type: "success", message: "Enquiry deleted successfully." });
    setTimeout(() => setStatus({ type: "idle" }), 2000);
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[32px] border border-slate-200/80 bg-[linear-gradient(135deg,#ffffff_0%,#eef2ff_48%,#ecfeff_100%)] p-6 shadow-[0_22px_60px_rgba(15,23,42,0.10)] sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 shadow-sm">
              Website Owner Panel
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Website Content Manager
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Update text, images, contact details, and branding from one place.
              Open a section on the left, make your changes, and click save when you are done.
            </p>
          </div>
          <div className="grid min-w-[260px] gap-3 rounded-3xl border border-white/70 bg-white/75 p-4 shadow-sm backdrop-blur">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Slider Images
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {content.home.hero.slides.length}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Gallery Images
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {content.gallery.items.length}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Enquiries
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">
                  {enquiries.length}
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              <span
                className={`mr-2 inline-block h-2.5 w-2.5 rounded-full ${
                  hasUnsavedChanges ? "bg-amber-500" : "bg-emerald-500"
                }`}
              />
              {hasUnsavedChanges
                ? "You have unsaved edits."
                : "All changes are saved."}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={saveContent}
            className="rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover-bg-accent-600 disabled-bg-accent-300"
            disabled={status.type === "saving"}
          >
            {status.type === "saving" ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-600"
          >
            Log Out
          </button>
        </div>
      </section>

      {status.type === "error" ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">
          {status.message}
        </div>
      ) : null}
      {status.type === "success" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 shadow-sm">
          {status.message}
        </div>
      ) : null}
      {uploading ? (
        <div className="rounded-2xl border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-700 shadow-sm">
          {uploading}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[280px,1fr]">
        <aside className="xl:sticky xl:top-6 xl:self-start">
          <div className="rounded-[28px] border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="px-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              Sections
            </p>
            <div className="mt-4 space-y-2">
              {editorTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full rounded-2xl border px-4 py-4 text-left transition ${
                    activeTab === tab.id
                      ? "border-accent-300 bg-accent-50 text-accent-700 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover-border-accent-300 hover-text-accent-700"
                  }`}
                >
                  <div className="text-sm font-semibold">{tab.label}</div>
                  <div className="mt-1 text-xs leading-5 text-inherit/80">
                    {tab.description}
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-800">How to use</p>
              <p className="mt-2 leading-6">
                Upload new images inside Home or Gallery, review the preview cards, then save once.
              </p>
            </div>
          </div>
        </aside>

        <div className="space-y-6">
          <section className="rounded-[28px] border border-slate-200/80 bg-white/90 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
                  Current Section
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  {activeTabMeta.label}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  {activeTabMeta.description}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Save after making all edits in this section.
              </div>
            </div>
          </section>

      {activeTab === "settings" ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">Branding</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TextField
              label="Business name"
              value={content.globals.businessName}
              onChange={(value) =>
                setContent((prev) => setByPath(prev, "globals.businessName", value))
              }
            />
            <TextField
              label="Tagline"
              value={content.globals.tagline}
              onChange={(value) =>
                setContent((prev) => setByPath(prev, "globals.tagline", value))
              }
            />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TextAreaField
              label="Footer blurb"
              value={content.globals.footerBlurb}
              onChange={(value) =>
                setContent((prev) => setByPath(prev, "globals.footerBlurb", value))
              }
            />
            <TextAreaField
              label="Footer note"
              value={content.globals.footerNote}
              onChange={(value) =>
                setContent((prev) => setByPath(prev, "globals.footerNote", value))
              }
            />
          </div>
          <div className="mt-4">
            <TextField
              label="Copyright"
              value={content.globals.copyright}
              onChange={(value) =>
                setContent((prev) => setByPath(prev, "globals.copyright", value))
              }
            />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              { label: "Navbar logo", key: "globals.logoNavbar" },
              { label: "Footer logo", key: "globals.logoFooter" },
            ].map((logo) => {
              const value =
                logo.key === "globals.logoNavbar"
                  ? content.globals.logoNavbar
                  : content.globals.logoFooter;
              return (
                <div
                  key={logo.key}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <p className="text-sm font-semibold text-slate-800">
                    {logo.label}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="flex h-14 w-14 items-center justify-center border border-slate-200 bg-white">
                      {value ? (
                        <img
                          src={value}
                          alt={`${content.globals.businessName} logo`}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-slate-400">No logo</span>
                      )}
                    </span>
                    <input
                      className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-xs text-slate-500"
                      value={value ?? ""}
                      readOnly
                    />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <label className="inline-flex h-9 cursor-pointer items-center justify-center rounded-full border border-slate-200 px-4 text-xs font-semibold text-slate-600 transition hover-border-accent-300 hover-text-accent-700">
                      Upload logo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          try {
                            const prepared = await prepareLogoFile(file);
                            const path = await uploadImage(prepared);
                            setContent((prev) => setByPath(prev, logo.key, path));
                          } catch (error) {
                            setStatus({
                              type: "error",
                              message:
                                error instanceof Error
                                  ? error.message
                                  : "Upload failed.",
                            });
                          } finally {
                            event.target.value = "";
                          }
                        }}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setContent((prev) => setByPath(prev, logo.key, ""))}
                      className="inline-flex h-9 items-center justify-center rounded-full border border-rose-200 px-4 text-xs font-semibold text-rose-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {activeTab === "home" ? (
        <>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Home Hero</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <TextField
                label="Eyebrow"
                value={content.home.hero.eyebrow}
                onChange={(value) =>
                  setContent((prev) => setByPath(prev, "home.hero.eyebrow", value))
                }
              />
              <TextField
                label="Title"
                value={content.home.hero.title}
                onChange={(value) =>
                  setContent((prev) => setByPath(prev, "home.hero.title", value))
                }
              />
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <TextAreaField
                label="Subtitle"
                value={content.home.hero.subtitle}
                onChange={(value) =>
                  setContent((prev) => setByPath(prev, "home.hero.subtitle", value))
                }
              />
              <div className="grid gap-4">
                <TextField
                  label="Phone CTA label"
                  value={content.home.hero.ctaPhoneLabel}
                  onChange={(value) =>
                    setContent((prev) => setByPath(prev, "home.hero.ctaPhoneLabel", value))
                  }
                />
                <TextField
                  label="WhatsApp CTA label"
                  value={content.home.hero.ctaWhatsappLabel}
                  onChange={(value) =>
                    setContent((prev) =>
                      setByPath(prev, "home.hero.ctaWhatsappLabel", value)
                    )
                  }
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Hero Slider Images</h2>
            <div className="mt-4 space-y-4">
              {content.home.hero.slides.map((slide, index) => (
                <div
                  key={`${slide.src}-${index}`}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <img
                      src={slide.src}
                      alt={slide.alt || "Hero slide"}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                  <div className="mt-3 grid gap-3 md:grid-cols-[1fr,1fr,auto]">
                    <TextField
                      label="Alt text"
                      value={slide.alt}
                      onChange={(value) =>
                        setContent((prev) => {
                          const next = [...prev.home.hero.slides];
                          next[index] = { ...next[index], alt: value };
                          return setByPath(prev, "home.hero.slides", next);
                        })
                      }
                    />
                    <div className="space-y-2 text-sm text-slate-600">
                      Image path
                      <input
                        className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
                        value={slide.src}
                        readOnly
                      />
                    </div>
                    <label className="mt-6 inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 px-4 text-xs font-semibold text-slate-600 transition hover-border-accent-300 hover-text-accent-700">
                      Replace image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          try {
                            const path = await uploadImage(file);
                            setContent((prev) => {
                              const next = [...prev.home.hero.slides];
                              next[index] = {
                                ...next[index],
                                src: path,
                                alt: file.name || slide.alt,
                              };
                              return setByPath(prev, "home.hero.slides", next);
                            });
                          } catch (error) {
                            setStatus({
                              type: "error",
                              message:
                                error instanceof Error ? error.message : "Upload failed.",
                            });
                          } finally {
                            event.target.value = "";
                          }
                        }}
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => {
                        const next = prev.home.hero.slides.filter((_, i) => i !== index);
                        return setByPath(prev, "home.hero.slides", next);
                      })
                    }
                    className="mt-3 rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    home: {
                      ...prev.home,
                      hero: {
                        ...prev.home.hero,
                        slides: [
                          ...prev.home.hero.slides,
                          { src: "/uploads/new.jpg", alt: "New slide" },
                        ],
                      },
                    },
                  }))
                }
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Add slide
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Home Intro Card</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <TextField
                label="Eyebrow"
                value={content.home.intro.eyebrow}
                onChange={(value) =>
                  setContent((prev) => setByPath(prev, "home.intro.eyebrow", value))
                }
              />
              <TextField
                label="Title"
                value={content.home.intro.title}
                onChange={(value) =>
                  setContent((prev) => setByPath(prev, "home.intro.title", value))
                }
              />
            </div>
            <div className="mt-4">
              <TextAreaField
                label="Subtitle"
                value={content.home.intro.subtitle}
                onChange={(value) =>
                  setContent((prev) => setByPath(prev, "home.intro.subtitle", value))
                }
              />
            </div>
          </section>

          <ObjectListEditor
            title="Quick Stats"
            items={content.home.quickStats}
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description" },
            ]}
            onChange={(items) =>
              setContent((prev) => setByPath(prev, "home.quickStats", items))
            }
            createItem={() => ({ title: "New title", description: "New description" })}
          />

          <ObjectListEditor
            title="Services Teaser"
            items={content.home.servicesTeaser}
            fields={[
              { key: "label", label: "Label" },
              { key: "title", label: "Title" },
              { key: "points", label: "Points", type: "lines" },
            ]}
            onChange={(items) =>
              setContent((prev) => setByPath(prev, "home.servicesTeaser", items))
            }
            createItem={() => ({ label: "New", title: "New service", points: ["New point"] })}
          />

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Coverage Areas</h2>
            <TextAreaField
              label="Areas (one per line)"
              value={fromLines(content.home.coverageAreas)}
              onChange={(value) =>
                setContent((prev) => setByPath(prev, "home.coverageAreas", toLines(value)))
              }
            />
          </section>

          <ObjectListEditor
            title="Testimonials"
            items={content.home.testimonials}
            fields={[
              { key: "name", label: "Name" },
              { key: "role", label: "Role" },
              { key: "quote", label: "Quote", type: "textarea" },
            ]}
            onChange={(items) =>
              setContent((prev) => setByPath(prev, "home.testimonials", items))
            }
            createItem={() => ({ name: "New client", role: "Role", quote: "New testimonial" })}
          />

          <ObjectListEditor
            title="Stats"
            items={content.home.stats}
            fields={[
              { key: "value", label: "Value" },
              { key: "label", label: "Label" },
            ]}
            onChange={(items) => setContent((prev) => setByPath(prev, "home.stats", items))}
            createItem={() => ({ value: "0+", label: "New stat" })}
          />

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Home CTA</h2>
            <TextAreaField
              label="CTA line"
              value={content.home.cta}
              onChange={(value) => setContent((prev) => setByPath(prev, "home.cta", value))}
            />
          </section>
        </>
      ) : null}

      {activeTab === "about" ? (
        <>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">About Page</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <TextField
                label="Title"
                value={content.about.title}
                onChange={(value) => setContent((prev) => setByPath(prev, "about.title", value))}
              />
              <TextAreaField
                label="Intro"
                value={content.about.intro}
                onChange={(value) => setContent((prev) => setByPath(prev, "about.intro", value))}
              />
            </div>
            <div className="mt-4">
              <TextAreaField
                label="Body"
                value={content.about.body}
                onChange={(value) => setContent((prev) => setByPath(prev, "about.body", value))}
              />
            </div>
          </section>

          <ObjectListEditor
            title="About Focus Cards"
            items={content.about.focusCards}
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description" },
            ]}
            onChange={(items) => setContent((prev) => setByPath(prev, "about.focusCards", items))}
            createItem={() => ({ title: "New focus", description: "New description" })}
          />

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Capabilities</h2>
            <TextAreaField
              label="Capabilities (one per line)"
              value={fromLines(content.about.capabilities)}
              onChange={(value) =>
                setContent((prev) => setByPath(prev, "about.capabilities", toLines(value)))
              }
            />
          </section>
        </>
      ) : null}

      {activeTab === "services" ? (
        <>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Services Page</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <TextField
                label="Title"
                value={content.services.title}
                onChange={(value) => setContent((prev) => setByPath(prev, "services.title", value))}
              />
              <TextAreaField
                label="Subtitle"
                value={content.services.subtitle}
                onChange={(value) =>
                  setContent((prev) => setByPath(prev, "services.subtitle", value))
                }
              />
            </div>
          </section>

          <ObjectListEditor
            title="Services Items"
            items={content.services.items}
            fields={[
              { key: "category", label: "Category" },
              { key: "title", label: "Title" },
              { key: "details", label: "Details", type: "lines" },
            ]}
            onChange={(items) => setContent((prev) => setByPath(prev, "services.items", items))}
            createItem={() => ({
              category: "New",
              title: "New service",
              details: ["New detail"],
            })}
          />

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <TextAreaField
              label="Services CTA line"
              value={content.services.cta}
              onChange={(value) => setContent((prev) => setByPath(prev, "services.cta", value))}
            />
          </section>
        </>
      ) : null}

      {activeTab === "gallery" ? (
        <>
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Gallery Page</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <TextField
                label="Title"
                value={content.gallery.title}
                onChange={(value) => setContent((prev) => setByPath(prev, "gallery.title", value))}
              />
              <TextAreaField
                label="Subtitle"
                value={content.gallery.subtitle}
                onChange={(value) =>
                  setContent((prev) => setByPath(prev, "gallery.subtitle", value))
                }
              />
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Gallery Items</h2>
            <div className="mt-4 space-y-4">
              {content.gallery.items.map((item, index) => (
                <div
                  key={`${item.image}-${index}`}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <img
                      src={item.image}
                      alt={item.title || "Gallery image"}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                  <div className="mt-3 grid gap-3 md:grid-cols-[1fr,1fr,auto]">
                    <TextField
                      label="Title"
                      value={item.title}
                      onChange={(value) =>
                        setContent((prev) => {
                          const next = [...prev.gallery.items];
                          next[index] = { ...next[index], title: value };
                          return setByPath(prev, "gallery.items", next);
                        })
                      }
                    />
                    <TextField
                      label="Category"
                      value={item.category}
                      onChange={(value) =>
                        setContent((prev) => {
                          const next = [...prev.gallery.items];
                          next[index] = { ...next[index], category: value };
                          return setByPath(prev, "gallery.items", next);
                        })
                      }
                    />
                    <label className="mt-6 inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 px-4 text-xs font-semibold text-slate-600 transition hover-border-accent-300 hover-text-accent-700">
                      Replace image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (event) => {
                          const file = event.target.files?.[0];
                          if (!file) return;
                          try {
                            const path = await uploadImage(file);
                            setContent((prev) => {
                              const next = [...prev.gallery.items];
                              next[index] = {
                                ...next[index],
                                image: path,
                                title: item.title || file.name || "New image",
                              };
                              return setByPath(prev, "gallery.items", next);
                            });
                          } catch (error) {
                            setStatus({
                              type: "error",
                              message:
                                error instanceof Error ? error.message : "Upload failed.",
                            });
                          } finally {
                            event.target.value = "";
                          }
                        }}
                      />
                    </label>
                  </div>
                  <div className="mt-3 text-xs text-slate-500">{item.image}</div>
                  <button
                    type="button"
                    onClick={() =>
                      setContent((prev) => {
                        const next = prev.gallery.items.filter((_, i) => i !== index);
                        return setByPath(prev, "gallery.items", next);
                      })
                    }
                    className="mt-3 rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    gallery: {
                      ...prev.gallery,
                      items: [
                        ...prev.gallery.items,
                        { title: "New image", category: "Other", image: "/uploads/new.jpg" },
                      ],
                    },
                  }))
                }
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Add gallery item
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-800">Upload Gallery Image</h2>
            <p className="mt-2 text-sm text-slate-600">
              Upload a new image and it will be added to the gallery list.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-[1fr,auto]">
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-slate-600"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  try {
                    const path = await uploadImage(file);
                    setContent((prev) => ({
                      ...prev,
                      gallery: {
                        ...prev.gallery,
                        items: [
                          ...prev.gallery.items,
                          { title: file.name || "New image", category: "Other", image: path },
                        ],
                      },
                    }));
                  } catch (error) {
                    setStatus({
                      type: "error",
                      message: error instanceof Error ? error.message : "Upload failed.",
                    });
                  } finally {
                    event.target.value = "";
                  }
                }}
              />
              <button
                type="button"
                onClick={() =>
                  setContent((prev) => ({
                    ...prev,
                    gallery: {
                      ...prev.gallery,
                      items: [
                        ...prev.gallery.items,
                        { title: "New image", category: "Other", image: "/uploads/new.jpg" },
                      ],
                    },
                  }))
                }
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
              >
                Add empty item
              </button>
            </div>
          </section>
        </>
      ) : null}

      {activeTab === "contact" ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">Contact Page</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TextField
              label="Title"
              value={content.contact.title}
              onChange={(value) => setContent((prev) => setByPath(prev, "contact.title", value))}
            />
            <TextAreaField
              label="Subtitle"
              value={content.contact.subtitle}
              onChange={(value) => setContent((prev) => setByPath(prev, "contact.subtitle", value))}
            />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TextField
              label="Phone"
              value={content.contact.phone}
              onChange={(value) => setContent((prev) => setByPath(prev, "contact.phone", value))}
            />
            <TextField
              label="WhatsApp"
              value={content.contact.whatsapp}
              onChange={(value) => setContent((prev) => setByPath(prev, "contact.whatsapp", value))}
            />
          </div>
          <div className="mt-4">
            <TextAreaField
              label="Address"
              value={content.contact.address}
              onChange={(value) => setContent((prev) => setByPath(prev, "contact.address", value))}
            />
          </div>
          <div className="mt-4">
            <TextAreaField
              label="Working hours (one per line)"
              value={fromLines(content.contact.hours)}
              onChange={(value) => setContent((prev) => setByPath(prev, "contact.hours", toLines(value)))}
            />
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <TextField
              label="Map latitude"
              value={content.contact.mapLat}
              onChange={(value) => setContent((prev) => setByPath(prev, "contact.mapLat", value))}
            />
            <TextField
              label="Map longitude"
              value={content.contact.mapLng}
              onChange={(value) => setContent((prev) => setByPath(prev, "contact.mapLng", value))}
            />
          </div>
        </section>
      ) : null}
      {activeTab === "enquiries" ? (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-slate-800">Website Enquiries</h2>
              <p className="mt-1 text-sm text-slate-500">
                Every contact form submission appears here for the website owner.
              </p>
            </div>
            <button
              type="button"
              onClick={refreshEnquiries}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm"
            >
              {loadingEnquiries ? "Refreshing..." : "Refresh list"}
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {enquiries.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center text-sm text-slate-500">
                No enquiries yet.
              </div>
            ) : (
              enquiries.map((enquiry) => (
                <article
                  key={enquiry.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        {enquiry.name}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <p className="text-sm text-slate-500">{enquiry.phone}</p>
                        <a
                          href={toPhoneHref(enquiry.phone)}
                          className="inline-flex min-h-10 items-center justify-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 transition hover:border-emerald-300 hover:bg-emerald-50"
                        >
                          Call
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        {new Date(enquiry.createdAt).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteEnquiry(enquiry.id)}
                        aria-label={`Delete enquiry from ${enquiry.name}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rose-200 bg-white text-sm font-semibold text-rose-600 transition hover:border-rose-300 hover:bg-rose-50"
                      >
                        ×
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Project Type
                      </p>
                      <p className="mt-2 text-sm text-slate-800">{enquiry.projectType}</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Location
                      </p>
                      <p className="mt-2 text-sm text-slate-800">
                        {enquiry.location || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 rounded-2xl bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Message
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-800">
                      {enquiry.message || "No extra message provided."}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      ) : null}
        </div>
      </div>
    </div>
  );
}

