import { NextResponse } from "next/server";
import { chatSystemPrompt } from "@/lib/chatKnowledge";
import { localChatReply } from "@/lib/localChat";

export const runtime = "nodejs";

type ChatMessage = { role: "user" | "assistant"; content: string };

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 30;
const attempts = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isRateLimited(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
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

function toGeminiContents(messages: ChatMessage[]) {
  // Gemini requires the first content turn to be from the user.
  const trimmed = messages
    .filter((m) => m.content.trim())
    .slice(-12)
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content.slice(0, 2_000) }],
    }));

  while (trimmed.length && trimmed[0].role !== "user") {
    trimmed.shift();
  }

  // Merge consecutive same-role turns (Gemini rejects user/user or model/model).
  const merged: typeof trimmed = [];
  for (const turn of trimmed) {
    const last = merged[merged.length - 1];
    if (last && last.role === turn.role) {
      last.parts[0].text = `${last.parts[0].text}\n\n${turn.parts[0].text}`;
    } else {
      merged.push(turn);
    }
  }
  return merged;
}

async function askGemini(apiKey: string, model: string, messages: ChatMessage[]) {
  const contents = toGeminiContents(messages);
  if (!contents.length) return null;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: chatSystemPrompt }],
        },
        contents,
        generationConfig: {
          temperature: 0.55,
          maxOutputTokens: 512,
        },
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Gemini chat failed:", response.status, errorBody.slice(0, 500));
    return null;
  }

  const data = (await response.json()) as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };

  return (
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || "")
      .join("")
      .trim() || null
  );
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 30_000) {
    return NextResponse.json({ error: "Request is too large." }, { status: 413 });
  }

  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && process.env.NODE_ENV === "production") {
    try {
      const originHost = new URL(origin).host;
      const normalize = (value: string) =>
        value.toLowerCase().replace(/^127\.0\.0\.1(?=[:/]|$)/, "localhost");
      const stripWww = (value: string) => value.replace(/^www\./, "");
      if (
        stripWww(normalize(originHost)) !== stripWww(normalize(host))
      ) {
        return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }
  }

  if (isRateLimited(request)) {
    return NextResponse.json(
      {
        error: "Too many messages. Please wait a few minutes and try again.",
        reply: "Please wait a few minutes and try again.",
        source: "local",
      },
      { status: 429 },
    );
  }

  let payload: { messages?: unknown };
  try {
    payload = (await request.json()) as { messages?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!Array.isArray(payload.messages) || payload.messages.length === 0) {
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
  }

  const messages: ChatMessage[] = payload.messages
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const role = row.role === "assistant" ? "assistant" : row.role === "user" ? "user" : null;
      const content = clean(row.content, 2_000);
      if (!role || !content) return null;
      return { role, content } as ChatMessage;
    })
    .filter((m): m is ChatMessage => Boolean(m));

  if (!messages.length || messages[messages.length - 1]?.role !== "user") {
    return NextResponse.json({ error: "Please enter a message." }, { status: 400 });
  }

  const lastUser = messages[messages.length - 1].content;
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const primaryModel =
    process.env.GEMINI_MODEL?.trim() || "gemini-2.0-flash-lite";
  const fallbackModel = "gemini-2.0-flash";

  if (apiKey) {
    try {
      let reply = await askGemini(apiKey, primaryModel, messages);
      if (!reply && primaryModel !== fallbackModel) {
        reply = await askGemini(apiKey, fallbackModel, messages);
      }
      if (reply) {
        return NextResponse.json({ reply, source: "gemini" });
      }
    } catch (error) {
      console.error("Gemini chat exception:", error);
    }
  }

  // Always answer from grounded site knowledge when Gemini is missing or fails.
  return NextResponse.json({
    reply: localChatReply(lastUser),
    source: "local",
  });
}
