"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import {
  WEBSITE_CHAT_STORAGE_KEY,
  getWebsiteMessages,
  openWebsiteSession,
  sendWebsiteMessage,
  type WebsiteChatMessage,
} from "~/lib/website-chat";

type ChatRole = "bot" | "user";
type TransportState = "idle" | "loading" | "connected" | "error";

interface RenderMessage {
  id: string;
  role: ChatRole;
  text: string;
  time: string;
}

function currentTimeLabel() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function formatTime(value: string) {
  const hasExplicitTimezone = /([zZ]|[+\-]\d{2}:?\d{2})$/.test(value);
  const normalized = hasExplicitTimezone
    ? value
    : value.includes("T")
      ? `${value}Z`
      : `${value.replace(" ", "T")}Z`;
  const date = new Date(normalized);
  if (Number.isNaN(date.getTime())) {
    return currentTimeLabel();
  }

  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
}

function summarizeError(message: string) {
  if (!message) return "Message failed. Try again.";
  const firstLine = message.split("\n")[0].trim();
  if (firstLine.length <= 90) return firstLine;
  return `${firstLine.slice(0, 90)}...`;
}

function mergeMessages(current: WebsiteChatMessage[], incoming: WebsiteChatMessage[]) {
  const byId = new Map<number, WebsiteChatMessage>();
  for (const message of current) {
    byId.set(message.id, message);
  }
  for (const message of incoming) {
    byId.set(message.id, message);
  }

  return Array.from(byId.values()).sort((a, b) => {
    const left = Date.parse(a.created_at);
    const right = Date.parse(b.created_at);

    if (Number.isNaN(left) && Number.isNaN(right)) {
      return a.id - b.id;
    }
    if (Number.isNaN(left)) {
      return -1;
    }
    if (Number.isNaN(right)) {
      return 1;
    }

    if (left === right) {
      return a.id - b.id;
    }

    return left - right;
  });
}

function ManAvatar({ className = "h-10 w-10" }: { className?: string }) {
  const avatarSrc = "/Alisher.png";

  return (
    <div className={`relative overflow-hidden rounded-full ring-2 ring-white/30 ${className}`}>
      <Image
        src={avatarSrc}
        alt="Alisher"
        fill
        sizes="48px"
        className="object-cover object-[68%_28%]"
        priority={false}
      />
    </div>
  );
}

function DotsChatIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-8 w-8" aria-hidden="true">
      <path
        d="M32 8c-12.7 0-23 9.2-23 20.7 0 6.2 3 11.7 7.9 15.5L14 56l12.4-4.2c1.8.3 3.7.5 5.6.5 12.7 0 23-9.2 23-20.6C55 17.2 44.7 8 32 8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="31" r="3.3" fill="currentColor" />
      <circle cx="32" cy="31" r="3.3" fill="currentColor" />
      <circle cx="40" cy="31" r="3.3" fill="currentColor" />
    </svg>
  );
}

function WaveHeader({
  title,
  subtitle,
  onClose,
  onlineLabel,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  onlineLabel: string;
}) {
  return (
    <div className="overflow-hidden text-white">
      <div className="bg-[#1d4ed8]">
        <div className="flex items-center justify-between px-4 pt-3">
          <div className="flex items-center gap-3">
            <ManAvatar className="h-10 w-10" />
            <div>
              <p className="text-[25px] leading-tight font-semibold">{title}</p>
              <p className="text-xs text-blue-100">{subtitle}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer rounded-md p-1 text-blue-100 transition-colors hover:bg-white/15"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-1 px-4 pb-2 text-xs text-blue-100">
          <span className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-white" />
            {onlineLabel}
          </span>
        </div>
      </div>

      <svg
        className="block h-10 w-full bg-[#eef2ff]"
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 H400 V16 Q200,78 0,16 Z"
          fill="#1d4ed8"
        />
      </svg>
    </div>
  );
}

export default function SalesChatWidget() {
  const POLL_INTERVAL_MS = 3000;

  const t = useTranslations("SalesChatWidget");

  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [transportState, setTransportState] = useState<TransportState>("idle");
  const [transportError, setTransportError] = useState<string>("");
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<WebsiteChatMessage[]>([]);
  const [fixedGreetingTime] = useState(() => currentTimeLabel());

  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);

  const unreadCount = useMemo(() => (isOpen || hasOpenedOnce ? 0 : 1), [hasOpenedOnce, isOpen]);

  const clearPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  const applyPayload = useCallback((payload: { session_id: string; messages: WebsiteChatMessage[] }) => {
    setSessionId(payload.session_id);
    setMessages((prev) => mergeMessages(prev, payload.messages));

    if (typeof window !== "undefined") {
      localStorage.setItem(WEBSITE_CHAT_STORAGE_KEY, payload.session_id);
    }
  }, []);

  const syncHistory = useCallback(
    async (activeSessionId: string) => {
      try {
        const response = await getWebsiteMessages(activeSessionId);
        applyPayload(response);
        setTransportState("connected");
      } catch (error) {
        setTransportState("error");
        if (error instanceof Error) {
          setTransportError(summarizeError(error.message));
        }
      }
    },
    [applyPayload]
  );

  const startPolling = useCallback(
    (activeSessionId: string) => {
      clearPolling();
      pollTimerRef.current = setInterval(() => {
        void syncHistory(activeSessionId);
      }, POLL_INTERVAL_MS);
    },
    [clearPolling, syncHistory]
  );

  const initializeChat = useCallback(async () => {
    let storedSessionId: string | null = null;

    if (typeof window !== "undefined") {
      storedSessionId = localStorage.getItem(WEBSITE_CHAT_STORAGE_KEY);
    }

    setTransportState("loading");

    try {
      const response = await openWebsiteSession(storedSessionId);
      applyPayload(response);
      setTransportState("connected");
      setTransportError("");
      startPolling(response.session_id);
      return;
    } catch (error) {
      if (!storedSessionId) {
        setTransportState("error");
        if (error instanceof Error) {
          setTransportError(summarizeError(error.message));
        }
        return;
      }
    }

    try {
      const fallbackResponse = await openWebsiteSession();
      applyPayload(fallbackResponse);
      setTransportState("connected");
      setTransportError("");
      startPolling(fallbackResponse.session_id);
    } catch (error) {
      setTransportState("error");
      if (error instanceof Error) {
        setTransportError(summarizeError(error.message));
      }
    }
  }, [applyPayload, startPolling]);

  useEffect(() => {
    void initializeChat();

    return () => {
      clearPolling();
    };
  }, [clearPolling, initializeChat]);

  const toggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    setHasOpenedOnce(true);
    setIsOpen(true);
  };

  const onSend = async () => {
    const text = draft.trim();
    if (!text || !sessionId || isSending) return;

    setIsSending(true);
    try {
      const response = await sendWebsiteMessage(sessionId, text);
      applyPayload(response);
      setTransportState("connected");
      setTransportError("");
      setDraft("");
    } catch (error) {
      setTransportState("error");
      if (error instanceof Error) {
        setTransportError(summarizeError(error.message));
      } else {
        setTransportError("Message failed. Try again.");
      }
    } finally {
      setIsSending(false);
    }
  };

  const allMessages: RenderMessage[] = useMemo(() => {
    if (messages.length === 0) {
      return [
        {
          id: "fixed-greeting",
          role: "bot",
          text: t("fixedGreeting"),
          time: fixedGreetingTime,
        },
      ];
    }

    return messages.map((message) => {
      const role: ChatRole = message.sender_type === "client" ? "user" : "bot";
      return {
        id: `message-${message.id}`,
        role,
        text: message.text,
        time: formatTime(message.created_at),
      };
    });
  }, [fixedGreetingTime, messages, t]);

  const canSend = !!sessionId && draft.trim().length > 0 && !isSending;
  const placeholder =
    transportState === "error" && transportError
      ? transportError
      : transportState === "loading"
        ? "Connecting..."
        : t("inputPlaceholder");

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      scrollToBottom("auto");
    }, 460);
    return () => window.clearTimeout(timer);
  }, [isOpen, scrollToBottom]);

  useEffect(() => {
    if (!isOpen) return;
    scrollToBottom("smooth");
  }, [allMessages.length, isOpen, scrollToBottom]);

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (panelRef.current?.contains(target)) return;
      if (launcherRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [isOpen]);

  return (
    <div className="fixed bottom-5 right-4 z-[70] flex flex-col items-end gap-3 sm:right-6">
      {!isOpen && !hasOpenedOnce && (
        <div className="text-left">
          <div className="flex flex-col items-start gap-2">
            <div className="ml-12 rotate-[-3deg] rounded-xl border border-cyan-500/20 bg-[#f7f9ff] px-4 py-2.5 shadow-lg">
              <p className="font-semibold text-[#0d1f38]">{t("discountLabel")}</p>
              <div className="ml-10 mt-1 h-0 w-0 border-l-[7px] border-r-[7px] border-t-[10px] border-l-transparent border-r-transparent border-t-[#f7f9ff]" />
            </div>
            <div className="flex items-end gap-2">
              <ManAvatar className="h-10 w-10" />
              <div className="max-w-[290px] rounded-2xl rounded-bl-md border border-white/20 bg-[#f5f7ff] px-4 py-3 text-[#1b2640] shadow-xl">
                <p>{t("fixedGreeting")}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.2, x: 24, y: 68 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.2, x: 24, y: 68 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "right bottom" }}
            className="w-[min(94vw,380px)] overflow-hidden rounded-3xl border border-cyan-500/20 bg-[#eef2ff] shadow-2xl"
          >
            <WaveHeader
              title={t("agentName")}
              subtitle={t("agentRole")}
              onlineLabel={t("onlineLabel")}
              onClose={() => setIsOpen(false)}
            />

            <div
              ref={scrollContainerRef}
              className="-mt-px chat-scroll h-[min(52vh,360px)] min-h-[220px] space-y-3 overflow-y-auto overscroll-contain px-3 py-4"
            >
              {allMessages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  {message.role === "bot" ? (
                    <div className="flex max-w-[90%] items-end gap-2">
                      <ManAvatar className="h-8 w-8" />
                      <div className="max-w-[82%] rounded-2xl rounded-bl-md bg-white px-4 py-3 text-[#1b2640]">
                        <p>{message.text}</p>
                        <p className="mt-1 text-right text-xs text-[#6a789b]">{message.time}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="max-w-[82%] rounded-2xl rounded-br-md bg-[#c9d4ff] px-4 py-3 text-[#1b2640]">
                      <p>{message.text}</p>
                      <p className="mt-1 text-right text-xs text-[#6a789b]">{message.time}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-cyan-500/20 bg-white/80 p-3">
              <div className="flex items-center gap-2 rounded-xl border border-[#0949A7]/40 bg-white p-2">
                <input
                  type="text"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      void onSend();
                    }
                  }}
                  placeholder={placeholder}
                  className="h-9 flex-1 bg-transparent px-2 text-sm text-[#0d1f38] outline-none placeholder:text-[#7b88a8]"
                  disabled={!sessionId || isSending || transportState === "loading"}
                />
                <button
                  onClick={() => {
                    void onSend();
                  }}
                  aria-label={t("sendAria")}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#0949A7] text-white hover:bg-[#0b5ed7] disabled:opacity-60"
                  disabled={!canSend}
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={launcherRef}
        type="button"
        onClick={toggleChat}
        aria-label={isOpen ? t("closeAria") : t("openAria")}
        className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-2xl bg-[#1d4ed8] text-white shadow-xl ring-1 ring-blue-300/40 transition-transform hover:scale-105"
      >
        <DotsChatIcon />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-xs font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
