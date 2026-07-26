"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, LoaderCircle, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { lockPageScroll, unlockPageScroll } from "@/lib/scrollLock";

type ChatMessage = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Who is Keerthi?",
  "How do I book a meeting?",
  "What is JENDO?",
  "Latest awards & fellowships",
] as const;

const WELCOME =
  "Hi — I'm Keerthi's site assistant. Ask about his work, JENDO, MindDrone, awards, or how to book an appointment.";

export function ChatBot() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: WELCOME },
  ]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(max-width: 767px)");
    if (mq.matches) {
      lockPageScroll();
      return () => unlockPageScroll();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 220);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [messages, sending, open, reduce]);

  async function sendMessage(raw: string) {
    const content = raw.trim();
    if (!content || sending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply! }]);
    } catch (error) {
      const fallback =
        error instanceof Error
          ? error.message
          : "I could not answer just now. Please try Get Appointment.";
      setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className="pointer-events-none fixed right-3 z-[90] flex flex-col items-end gap-3 sm:right-6"
      style={{
        // Closed: sit clear of page content. Open: drop lower so the panel fits on screen.
        bottom: open
          ? "max(1rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))"
          : "max(6.75rem, calc(env(safe-area-inset-bottom, 0px) + 5.75rem))",
      }}
    >
      <AnimatePresence>
        {open ? (
          <motion.section
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Chat with Keerthi's assistant"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex h-[min(34rem,calc(100dvh-7.5rem))] w-[min(100vw-1.5rem,24rem)] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-[28px] border border-kk-border bg-white shadow-[0_28px_80px_rgba(12,14,10,0.22)]"
          >
            <header className="relative shrink-0 overflow-hidden border-b border-white/10 bg-[#12150f] px-4 py-4 text-white">
              <div
                className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_20%_0%,rgba(241,130,0,0.35),transparent_55%)]"
                aria-hidden
              />
              <div className="relative flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="relative size-11 overflow-hidden rounded-2xl ring-1 ring-white/20">
                    <Image
                      src="/media/brand/logo.png"
                      alt=""
                      fill
                      className="object-cover"
                      sizes="44px"
                    />
                  </span>
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-kk-accent">
                      Site assistant
                    </p>
                    <h2 className="font-display text-xl leading-tight">Ask Keerthi</h2>
                    <p className="mt-0.5 text-xs text-white/65">
                      Work · products · appointments
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-kk-accent/50 hover:bg-kk-accent"
                >
                  <X className="size-4" />
                </button>
              </div>
            </header>

            <div
              ref={listRef}
              className="flex-1 space-y-3 overflow-y-auto bg-kk-soft/70 px-4 py-4"
              data-lenis-prevent
            >
              {messages.map((message, index) => {
                const mine = message.role === "user";
                return (
                  <div
                    key={`${message.role}-${index}`}
                    className={`flex ${mine ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        mine
                          ? "rounded-br-md bg-kk-accent text-white"
                          : "rounded-bl-md border border-kk-border bg-white text-kk-ink shadow-sm"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                );
              })}
              {sending ? (
                <div className="flex justify-start">
                  <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-kk-border bg-white px-3.5 py-2.5 text-sm text-kk-muted shadow-sm">
                    <LoaderCircle className="size-3.5 animate-spin text-kk-accent" />
                    Thinking…
                  </div>
                </div>
              ) : null}
            </div>

            {messages.length <= 2 ? (
              <div className="flex flex-wrap gap-2 border-t border-kk-border bg-white px-4 py-3">
                {SUGGESTIONS.map((item) => (
                  <button
                    key={item}
                    type="button"
                    disabled={sending}
                    onClick={() => sendMessage(item)}
                    className="rounded-full border border-kk-border bg-kk-surface px-3 py-1.5 text-xs font-semibold text-kk-ink transition hover:border-kk-accent/40 hover:text-kk-accent disabled:opacity-60"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}

            <form
              className="shrink-0 border-t border-kk-border bg-white p-3"
              onSubmit={(e) => {
                e.preventDefault();
                void sendMessage(input);
              }}
            >
              <div className="flex items-end gap-2">
                <label className="sr-only" htmlFor="kk-chat-input">
                  Your message
                </label>
                <input
                  ref={inputRef}
                  id="kk-chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Keerthi…"
                  maxLength={1000}
                  disabled={sending}
                  className="min-h-11 flex-1 rounded-2xl border border-kk-border bg-kk-bg/50 px-3.5 py-2.5 text-sm outline-none transition focus:border-kk-accent focus:bg-white disabled:opacity-70"
                />
                <button
                  type="submit"
                  disabled={sending || !input.trim()}
                  aria-label="Send message"
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-kk-accent text-white transition hover:bg-kk-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? (
                    <LoaderCircle className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </button>
              </div>
              <div className="mt-2.5 flex items-center justify-between gap-2 px-0.5">
                <p className="text-[0.68rem] text-kk-muted">
                  Answers from Keerthi&apos;s site knowledge
                </p>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center gap-0.5 text-[0.68rem] font-semibold text-kk-accent hover:text-kk-accent-hover"
                >
                  Book
                  <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Close chat" : "Open chat assistant"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        whileHover={reduce ? undefined : { scale: 1.04 }}
        whileTap={reduce ? undefined : { scale: 0.97 }}
        className="pointer-events-auto group relative inline-flex h-14 items-center gap-2.5 rounded-full bg-[#12150f] pl-1.5 pr-4 text-white shadow-[0_16px_40px_rgba(12,14,10,0.35)] ring-1 ring-white/10 transition hover:bg-[#1a1f16]"
      >
        <span className="relative size-11 overflow-hidden rounded-full ring-2 ring-kk-accent/80">
          <Image
            src="/media/brand/logo.png"
            alt=""
            fill
            className="object-cover"
            sizes="44px"
            priority
          />
        </span>
        <span className="hidden flex-col text-left sm:flex">
          <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-kk-accent">
            Ask
          </span>
          <span className="text-sm font-semibold leading-none">Keerthi</span>
        </span>
        <span className="inline-flex size-8 items-center justify-center rounded-full bg-kk-accent text-white sm:ml-0.5">
          {open ? <X className="size-4" /> : <MessageCircle className="size-4" />}
        </span>
      </motion.button>
    </div>
  );
}
