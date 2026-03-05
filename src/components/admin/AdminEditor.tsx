"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/content";

type Status = { type: "idle" | "saving" | "success" | "error"; message?: string };
type Field = { key: string; label: string; type?: "text" | "textarea" | "lines" };

const toLines = (value: string) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const fromLines = (value: string[] | undefined) => (value ? value.join("\n") : "");

const setByPath = (obj: SiteContent, path: string, value: unknown): SiteContent => {
  const parts = path.split(".");
  const next: any = Array.isArray(obj) ? [...obj] : { ...obj };
  let cursor: any = next;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = parts[i];
    cursor[key] = Array.isArray(cursor[key]) ? [...cursor[key]] : { ...cursor[key] };
    cursor = cursor[key];
  }
  cursor[parts[parts.length - 1]] = value;
  return next as SiteContent;
};

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
    <label className="space-y-2 text-sm text-slate-600">
      {label}
      <input
        className="w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
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
    <label className="space-y-2 text-sm text-slate-600">
      {label}
      <textarea
        className="min-h-[96px] w-full rounded-2xl border border-slate-200 px-4 py-2 text-sm"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ObjectListEditor<T extends Record<string, any>>({
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
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      <div className="mt-4 space-y-4">
        {items.map((item, index) => (
          <div key={`${title}-${index}`} className="rounded-2xl border border-slate-200 p-4">
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
                      value={fromLines(value)}
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
              className="mt-3 rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold text-rose-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, createItem()])}
          className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600"
        >
          Add item
        </button>
      </div>
    </section>
  );
}

export default function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [uploading, setUploading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "home" | "about" | "services" | "gallery" | "contact" | "settings"
  >("home");

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

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Website Content Manager
          </h1>
          <p className="text-sm text-slate-600">
            Update text, services, gallery, and contact details without touching code.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={saveContent}
            className="rounded-full bg-sky-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-sky-600"
          >
            {status.type === "saving" ? "Saving..." : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-200 px-6 py-2 text-sm font-semibold text-slate-600 transition hover:border-rose-300 hover:text-rose-600"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { id: "home", label: "Home" },
          { id: "about", label: "About" },
          { id: "services", label: "Services" },
          { id: "gallery", label: "Gallery" },
          { id: "contact", label: "Contact" },
          { id: "settings", label: "Settings" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === tab.id
                ? "bg-sky-500 text-white"
                : "border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {status.type === "error" ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {status.message}
        </div>
      ) : null}
      {status.type === "success" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {status.message}
        </div>
      ) : null}
      {uploading ? (
        <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-700">
          {uploading}
        </div>
      ) : null}

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
                    <label className="mt-6 inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 px-4 text-xs font-semibold text-slate-600 transition hover:border-sky-300 hover:text-sky-700">
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
                    <label className="mt-6 inline-flex h-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 px-4 text-xs font-semibold text-slate-600 transition hover:border-sky-300 hover:text-sky-700">
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
    </div>
  );
}
