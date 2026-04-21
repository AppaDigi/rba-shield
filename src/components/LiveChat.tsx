"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Send, Users, Gavel } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./LiveChat.module.css";
import type { SSEMessage } from "@/lib/liveEmitter";

interface ChatMessage {
    id: string;
    content: string;
    type: string;
    createdAt: string;
    guestName: string | null;
    user: { id: string; name: string | null; username: string; avatar: string | null } | null;
}

interface LiveChatProps {
    eventId: string;
    viewerCount: number;
    onMessage?: (msg: ChatMessage) => void;
    onBid?: (data: SSEMessage["data"]) => void;
    onViewerChange?: (count: number) => void;
}

export default function LiveChat({
    eventId,
    viewerCount: initialViewerCount,
    onBid,
    onViewerChange,
}: LiveChatProps) {
    const { data: session } = useSession();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [viewerCount, setViewerCount] = useState(initialViewerCount);
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);
    const [connected, setConnected] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const eventSourceRef = useRef<EventSource | null>(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        const el = scrollRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [messages]);

    // SSE connection
    useEffect(() => {
        const es = new EventSource(`/api/live/events/${eventId}/sse`);
        eventSourceRef.current = es;

        es.onopen = () => setConnected(true);
        es.onerror = () => setConnected(false);

        es.onmessage = (e) => {
            const payload: SSEMessage = JSON.parse(e.data);

            if (payload.type === "init") {
                setMessages(payload.data.messages ?? []);
                const count = payload.data.viewerCount ?? initialViewerCount;
                setViewerCount(count);
                onViewerChange?.(count);
            } else if (payload.type === "message") {
                setMessages((prev) => [...prev.slice(-99), payload.data]);
            } else if (payload.type === "bid") {
                // Append the system message from the bid
                if (payload.data.systemMessage) {
                    setMessages((prev) => [...prev.slice(-99), payload.data.systemMessage]);
                }
                onBid?.(payload.data);
            } else if (payload.type === "viewer_count") {
                setViewerCount(payload.data.count);
                onViewerChange?.(payload.data.count);
            }
        };

        return () => {
            es.close();
            setConnected(false);
        };
    }, [eventId]); // eslint-disable-line react-hooks/exhaustive-deps

    async function sendMessage(e: React.FormEvent) {
        e.preventDefault();
        if (!text.trim() || sending) return;
        setSending(true);
        try {
            await fetch(`/api/live/events/${eventId}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: text.trim() }),
            });
            setText("");
        } finally {
            setSending(false);
        }
    }

    const displayName = (msg: ChatMessage) =>
        msg.user?.name ?? msg.user?.username ?? msg.guestName ?? "Guest";

    return (
        <div className={styles.panel}>
            <div className={styles.header}>
                <span className={styles.headerTitle}>Live Chat</span>
                <div className={styles.headerRight}>
                    <span className={`${styles.connDot} ${connected ? styles.connDotLive : ""}`} />
                    <Users size={14} />
                    <span>{viewerCount.toLocaleString()}</span>
                </div>
            </div>

            <div className={styles.stream} ref={scrollRef}>
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2 }}
                            className={msg.type === "SYSTEM" ? styles.systemMessage : styles.chatMessage}
                        >
                            {msg.type === "SYSTEM" ? (
                                <div className={styles.systemContent}>
                                    <Gavel size={12} className={styles.gavel} />
                                    <span>{msg.content}</span>
                                </div>
                            ) : (
                                <>
                                    <span className={styles.chatUser}>{displayName(msg)}: </span>
                                    <span className={styles.chatText}>{msg.content}</span>
                                </>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
                {messages.length === 0 && (
                    <p className={styles.empty}>Chat will appear here once the event starts.</p>
                )}
            </div>

            <form className={styles.inputRow} onSubmit={sendMessage}>
                <input
                    className={styles.input}
                    placeholder={session ? "Say something…" : "Sign in to chat"}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    maxLength={300}
                    disabled={!session || sending}
                />
                <button
                    type="submit"
                    className={styles.sendBtn}
                    disabled={!session || !text.trim() || sending}
                >
                    <Send size={16} />
                </button>
            </form>
        </div>
    );
}
