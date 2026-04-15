"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import DesktopLayout from "@/components/DesktopLayout";
import { Loader2, Inbox, SendHorizontal } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import styles from "./page.module.css";

interface ConversationSummary {
    id: string;
    updatedAt: string;
    other: {
        id: string;
        name: string | null;
        username: string;
        avatar: string | null;
    } | null;
    lastMessage: {
        body: string;
        createdAt: string;
    } | null;
}

interface MessageItem {
    id: string;
    body: string;
    createdAt: string;
    senderId: string;
    sender: {
        id: string;
        name: string | null;
        username: string;
        avatar: string | null;
    };
}

export default function MessagesPage() {
    const { data: session, status } = useSession();
    const [conversations, setConversations] = useState<ConversationSummary[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<MessageItem[]>([]);
    const [messageBody, setMessageBody] = useState("");
    const [loadingConversations, setLoadingConversations] = useState(true);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        if (status !== "authenticated") return;
        setLoadingConversations(true);
        fetch("/api/messages")
            .then((res) => res.json())
            .then((data: ConversationSummary[]) => {
                setConversations(data);
                setActiveConversationId((current) => current ?? data[0]?.id ?? null);
            })
            .finally(() => setLoadingConversations(false));
    }, [status]);

    useEffect(() => {
        if (!activeConversationId || status !== "authenticated") {
            setMessages([]);
            return;
        }

        setLoadingMessages(true);
        fetch(`/api/messages/${activeConversationId}`)
            .then((res) => res.json())
            .then((data: MessageItem[]) => setMessages(data))
            .finally(() => setLoadingMessages(false));
    }, [activeConversationId, status]);

    const activeConversation = useMemo(
        () => conversations.find((conversation) => conversation.id === activeConversationId) ?? null,
        [conversations, activeConversationId]
    );

    async function sendMessage(e: React.FormEvent) {
        e.preventDefault();
        if (!activeConversationId || !messageBody.trim() || sending) return;

        setSending(true);
        try {
            const res = await fetch(`/api/messages/${activeConversationId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ body: messageBody.trim() }),
            });

            if (!res.ok) return;

            const message: MessageItem = await res.json();
            setMessages((prev) => [...prev, message]);
            setMessageBody("");
            setConversations((prev) =>
                prev.map((conversation) =>
                    conversation.id === activeConversationId
                        ? {
                              ...conversation,
                              updatedAt: new Date().toISOString(),
                              lastMessage: { body: message.body, createdAt: message.createdAt },
                          }
                        : conversation
                )
            );
        } finally {
            setSending(false);
        }
    }

    return (
        <DesktopLayout>
            <div className={styles.page}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Messages</h1>
                    <p className={styles.subtitle}>Private conversations with other members of the lounge.</p>
                </header>

                {status === "loading" || loadingConversations ? (
                    <div className={styles.loadingState}>
                        <Loader2 size={28} className={styles.spinner} />
                        <p>Loading conversations…</p>
                    </div>
                ) : conversations.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Inbox size={36} />
                        <h2>No conversations yet</h2>
                        <p>Start following people and engaging in the lounge to open your first private thread.</p>
                    </div>
                ) : (
                    <div className={styles.shell}>
                        <aside className={styles.sidebar}>
                            {conversations.map((conversation) => {
                                const other = conversation.other;
                                const isActive = conversation.id === activeConversationId;
                                return (
                                    <button
                                        key={conversation.id}
                                        type="button"
                                        className={`${styles.threadButton} ${isActive ? styles.threadButtonActive : ""}`}
                                        onClick={() => setActiveConversationId(conversation.id)}
                                    >
                                        <div className={styles.threadAvatar}>
                                            {other?.avatar ? (
                                                <img src={other.avatar} alt={other.name ?? other.username} className={styles.threadAvatarImage} />
                                            ) : (
                                                <div className={styles.threadAvatarFallback}>
                                                    {(other?.name ?? other?.username ?? "?").charAt(0).toUpperCase()}
                                                </div>
                                            )}
                                        </div>
                                        <div className={styles.threadCopy}>
                                            <div className={styles.threadTopRow}>
                                                <span className={styles.threadName}>{other?.name ?? other?.username ?? "Unknown user"}</span>
                                                <span className={styles.threadTime}>
                                                    {formatDistanceToNow(new Date(conversation.updatedAt), { addSuffix: true })}
                                                </span>
                                            </div>
                                            <span className={styles.threadSnippet}>
                                                {conversation.lastMessage?.body ?? "No messages yet"}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </aside>

                        <section className={styles.conversation}>
                            <div className={styles.conversationHeader}>
                                <h2>{activeConversation?.other?.name ?? activeConversation?.other?.username ?? "Conversation"}</h2>
                                <span>@{activeConversation?.other?.username ?? "member"}</span>
                            </div>

                            <div className={styles.messageList}>
                                {loadingMessages ? (
                                    <div className={styles.messageLoading}>
                                        <Loader2 size={22} className={styles.spinner} />
                                    </div>
                                ) : (
                                    messages.map((message) => {
                                        const isOwn = message.senderId === session?.user?.id;
                                        return (
                                            <div
                                                key={message.id}
                                                className={`${styles.messageRow} ${isOwn ? styles.messageRowOwn : ""}`}
                                            >
                                                <div className={`${styles.messageBubble} ${isOwn ? styles.messageBubbleOwn : ""}`}>
                                                    <p>{message.body}</p>
                                                    <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            <form className={styles.composer} onSubmit={sendMessage}>
                                <textarea
                                    className={styles.composerInput}
                                    value={messageBody}
                                    onChange={(e) => setMessageBody(e.target.value)}
                                    placeholder="Write a message…"
                                    rows={2}
                                    maxLength={1000}
                                />
                                <button
                                    type="submit"
                                    className={styles.sendButton}
                                    disabled={!messageBody.trim() || sending}
                                >
                                    {sending ? <Loader2 size={16} className={styles.spinner} /> : <SendHorizontal size={16} />}
                                    Send
                                </button>
                            </form>
                        </section>
                    </div>
                )}
            </div>
        </DesktopLayout>
    );
}
