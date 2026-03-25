"use client";

import { useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import { toWhatsAppHref } from "@/lib/format";

type ContactLeadFormProps = {
  whatsappNumber: string;
};

type FormState = {
  name: string;
  phone: string;
  projectType: string;
  location: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  projectType: "Shed/Structure",
  location: "",
  message: "",
};

export default function ContactLeadForm({ whatsappNumber }: ContactLeadFormProps) {
  const [form, setForm] = useState<FormState>(initialState);

  const whatsappLink = useMemo(() => toWhatsAppHref(whatsappNumber), [whatsappNumber]);

  const updateField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const lines = [
      "New enquiry from website",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Project: ${form.projectType}`,
      `Location: ${form.location || "Not provided"}`,
      `Details: ${form.message || "Not provided"}`,
    ];
    const text = encodeURIComponent(lines.join("\n"));
    const url = `${whatsappLink}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm transition duration-200 hover:shadow-md glass-soft sm:p-6">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent-600">
          Quick Enquiry
        </p>
        <h2 className="text-2xl font-semibold text-slate-800">
          Send your requirement on WhatsApp
        </h2>
        <p className="text-sm text-slate-600">
          Fill the details and we will reply with a quick estimate.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          Name
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm outline-none transition focus-border-accent-400"
            value={form.name}
            onChange={(event) => updateField("name", event.target.value)}
            placeholder="Your full name"
            required
          />
        </label>
        <label className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          Phone
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm outline-none transition focus-border-accent-400"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </label>
        <label className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          Project Type
          <select
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm outline-none transition focus-border-accent-400"
            value={form.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
          >
            <option>Shed/Structure</option>
            <option>Gate/Grill</option>
            <option>Farm Equipment</option>
            <option>Repair/Modification</option>
            <option>Other</option>
          </select>
        </label>
        <label className="text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          Location
          <input
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm outline-none transition focus-border-accent-400"
            value={form.location}
            onChange={(event) => updateField("location", event.target.value)}
            placeholder="City or site location"
          />
        </label>
        <label className="md:col-span-2 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
          Message
          <textarea
            className="mt-2 min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm outline-none transition focus-border-accent-400"
            value={form.message}
            onChange={(event) => updateField("message", event.target.value)}
            placeholder="Share measurements or details"
          />
        </label>
        <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition duration-200 hover-bg-accent-600 sm:w-auto"
          >
            <FaWhatsapp className="mr-2 h-4 w-4" />
            Send on WhatsApp
          </button>
          <button
            type="button"
            onClick={() => setForm(initialState)}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover-border-accent-300 hover-text-accent-700 sm:w-auto"
          >
            <FiRefreshCw className="mr-2 h-4 w-4" />
            Reset
          </button>
        </div>
      </form>
    </section>
  );
}
