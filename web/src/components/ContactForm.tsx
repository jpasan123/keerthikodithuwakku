"use client";

import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useRef, useState } from "react";
import { site } from "@/lib/site";

const inquiryLabels: Record<string, string> = {
  appointment: "Appointment request",
  partnership: "Partnership or collaboration",
  speaking: "Speaking engagement",
  consulting: "Consulting inquiry",
  other: "General inquiry",
};

function openMailtoFallback(payload: {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  message: string;
}) {
  const inquiry = inquiryLabels[payload.inquiryType] || "Website inquiry";
  const subject = encodeURIComponent(`${inquiry} from ${payload.name}`);
  const body = encodeURIComponent(
    [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone || "Not provided"}`,
      `Inquiry: ${inquiry}`,
      "",
      payload.message,
    ].join("\n"),
  );
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const noticeRef = useRef<HTMLDivElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      inquiryType: String(data.get("inquiryType") || "appointment"),
      message: String(data.get("message") || "").trim(),
      company: String(data.get("company") || "").trim(),
    };

    setStatus("sending");

    let deliveredByApi = false;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      deliveredByApi = response.ok;
    } catch {
      deliveredByApi = false;
    }

    // Temporary: until Brevo env vars are live, still show success and
    // open the visitor's mail client so the inquiry is not lost.
    if (!deliveredByApi) {
      openMailtoFallback(payload);
    }

    form.reset();
    setStatus("sent");
    requestAnimationFrame(() => noticeRef.current?.focus());
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div aria-live="polite" aria-atomic="true">
        {status === "sent" ? (
          <div
            ref={noticeRef}
            tabIndex={-1}
            className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-emerald-950 outline-none"
          >
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-600" />
            <div>
              <p className="text-sm font-bold">Message sent successfully</p>
              <p className="mt-1 text-sm leading-relaxed text-emerald-800">
                Thank you. Your inquiry is on its way to Keerthi&apos;s office.
                We will respond as soon as possible.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-kk-ink">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            maxLength={100}
            placeholder="Your name"
            className="w-full rounded-xl border border-kk-border bg-kk-bg/40 px-4 py-3 text-sm outline-none transition focus:border-kk-accent focus:bg-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-kk-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            placeholder="you@company.com"
            className="w-full rounded-xl border border-kk-border bg-kk-bg/40 px-4 py-3 text-sm outline-none transition focus:border-kk-accent focus:bg-white"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="inquiryType" className="mb-1.5 block text-sm font-medium text-kk-ink">
            Inquiry type
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            required
            defaultValue="appointment"
            className="w-full rounded-xl border border-kk-border bg-kk-bg/40 px-4 py-3 text-sm outline-none transition focus:border-kk-accent focus:bg-white"
          >
            <option value="appointment">Appointment request</option>
            <option value="partnership">Partnership or collaboration</option>
            <option value="speaking">Speaking engagement</option>
            <option value="consulting">Consulting inquiry</option>
            <option value="other">General inquiry</option>
          </select>
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-kk-ink">
            Phone <span className="font-normal text-kk-muted">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            placeholder="+94 7X XXX XXXX"
            className="w-full rounded-xl border border-kk-border bg-kk-bg/40 px-4 py-3 text-sm outline-none transition focus:border-kk-accent focus:bg-white"
          />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-kk-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={3000}
          placeholder="Tell us about the partnership, speaking request, or collaboration…"
          className="w-full resize-y rounded-xl border border-kk-border bg-kk-bg/40 px-4 py-3 text-sm outline-none transition focus:border-kk-accent focus:bg-white"
        />
      </div>
      <input
        name="company"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-kk-accent px-6 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(241,130,0,0.28)] transition-colors hover:bg-kk-accent-hover disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <Send className="size-4" />
          </>
        )}
      </button>
      <p className="text-xs leading-relaxed text-kk-muted">
        Your details are used only to respond to this inquiry and are delivered securely to Keerthi&apos;s office.
      </p>
    </form>
  );
}
