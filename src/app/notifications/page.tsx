"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import DesktopLayout from "@/components/DesktopLayout";
import { Bell, Loader2, CheckCheck, AtSign, Heart, MessageSquare, UserPlus } from "lucide-react";
import styles from "./page.module.css";

interface NotificationItem {
    id: string;
    type: string;
    actorName: string | null;
    actorAvatar: string | null;
    body: string;
    entityUrl: string | null;
    read: boolean;
    createdAt: string;
}

const typeIcons = {
    MENTION: AtSign,
    LIKE: Heart,
    COMMENT: MessageSquare,
    FOLLOW: UserPlus,
};

export default function NotificationsPage() {
    const { status } = useSession();
    const router = useRouter();
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/login?callbackUrl=/notifications");
            return;
        }

        if (status !== "authenticated") return;

        fetch("/api/notifications")
            .then((res) => res.json())
            .then((data) => setNotifications(data.notifications ?? []))
            .finally(() => setLoading(false));
    }, [router, status]);

    async function markAllRead() {
        await fetch("/api/notifications", { method: "PATCH" });
        setNotifications((current) => current.map((notification) => ({ ...notification, read: true })));
    }

    async function openNotification(notification: NotificationItem) {
        if (!notification.read) {
            await fetch(`/api/notifications/${notification.id}`, { method: "PATCH" });
            setNotifications((current) =>
                current.map((item) => item.id === notification.id ? { ...item, read: true } : item)
            );
        }

        router.push(notification.entityUrl || "/");
    }

    return (
        <DesktopLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Notifications</h1>
                        <p className={styles.subtitle}>Mentions, reactions, and activity from around Cigar Swap.</p>
                    </div>
                    {notifications.length > 0 && (
                        <button className={styles.markAllBtn} onClick={markAllRead}>
                            <CheckCheck size={16} />
                            Mark all read
                        </button>
                    )}
                </div>

                {loading ? (
                    <div className={styles.state}>
                        <Loader2 size={28} className={styles.spin} />
                        <span>Loading notifications...</span>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className={styles.state}>
                        <Bell size={34} />
                        <h2>No notifications yet</h2>
                        <p>Your mentions and activity will show up here.</p>
                    </div>
                ) : (
                    <div className={styles.list}>
                        {notifications.map((notification) => {
                            const Icon = typeIcons[notification.type as keyof typeof typeIcons] ?? Bell;
                            return (
                                <button
                                    key={notification.id}
                                    className={`${styles.card} ${notification.read ? styles.readCard : styles.unreadCard}`}
                                    onClick={() => openNotification(notification)}
                                >
                                    <div className={styles.iconWrap}>
                                        <Icon size={18} />
                                    </div>
                                    <div className={styles.copy}>
                                        <div className={styles.body}>{notification.body}</div>
                                        <div className={styles.meta}>
                                            <span>{new Date(notification.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
                                            {notification.entityUrl && <span className={styles.linkHint}>Open</span>}
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                )}

                <Link href="/" className={styles.backLink}>Back to Cigar Swap</Link>
            </div>
        </DesktopLayout>
    );
}
