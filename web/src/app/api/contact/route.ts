import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

const inquiryLabels = {
  appointment: "Appointment request",
  partnership: "Partnership or collaboration",
  speaking: "Speaking engagement",
  consulting: "Consulting inquiry",
  other: "General inquiry",
} as const;

type InquiryType = keyof typeof inquiryLabels;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isRateLimited(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const current = attempts.get(ip);

  if (!current || current.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  current.count += 1;
  if (attempts.size > 500) {
    for (const [key, value] of attempts) {
      if (value.resetAt <= now) attempts.delete(key);
    }
  }
  return current.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (clean(payload.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  // Best-effort burst protection per warm server instance; Brevo remains server-side only.
  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const name = clean(payload.name, 100);
  const email = clean(payload.email, 254).toLowerCase();
  const phone = clean(payload.phone, 40);
  const message = clean(payload.message, 3_000);
  const inquiryType = clean(payload.inquiryType, 40) as InquiryType;
  const inquiryLabel = inquiryLabels[inquiryType];

  if (!name || !isValidEmail(email) || !message || !inquiryLabel) {
    return NextResponse.json(
      { error: "Please complete all required fields with valid details." },
      { status: 400 },
    );
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Keerthi Kodithuwakku Website";
  const recipientEmail = process.env.BREVO_TO_EMAIL || site.email;

  if (!apiKey || !senderEmail) {
    console.error("Brevo contact form is missing server environment variables.");
    return NextResponse.json(
      { error: "The contact service is temporarily unavailable. Please email us directly." },
      { status: 503 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone || "Not provided");
  const safeInquiry = escapeHtml(inquiryLabel);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: { name: senderName, email: senderEmail },
      to: [{ name: "Keerthi Kodithuwakku", email: recipientEmail }],
      replyTo: { name, email },
      subject: `${inquiryLabel} from ${name}`,
      htmlContent: `
        <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0c0e0a">
          <div style="border-top:4px solid #f18200;padding:28px 0 12px">
            <p style="margin:0 0 8px;color:#f18200;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase">Website inquiry</p>
            <h1 style="margin:0;font-size:26px">${safeInquiry}</h1>
          </div>
          <div style="background:#f7f7f7;border:1px solid #e8e8e8;border-radius:16px;padding:22px;margin:18px 0">
            <p style="margin:0 0 10px"><strong>Name:</strong> ${safeName}</p>
            <p style="margin:0 0 10px"><strong>Email:</strong> ${safeEmail}</p>
            <p style="margin:0"><strong>Phone:</strong> ${safePhone}</p>
          </div>
          <div style="font-size:15px;line-height:1.7">${safeMessage}</div>
          <p style="margin-top:28px;color:#666;font-size:12px">Sent securely from ${escapeHtml(site.url)}</p>
        </div>
      `,
      textContent: [
        inquiryLabel,
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        "",
        message,
      ].join("\n"),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Brevo email request failed:", response.status, errorBody.slice(0, 500));
    return NextResponse.json(
      { error: "We could not send your message. Please try again or email us directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
