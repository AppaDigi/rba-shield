"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import DesktopLayout from "@/components/DesktopLayout";
import { ChevronRight, UserCircle2, Bell, Inbox, BookOpen, LogOut, Shield } from "lucide-react";
import styles from "./page.module.css";

const settingsLinks = [
    {
        title: "Edit Profile",
        description: "Update your avatar, bio, and location.",
        href: "/profile/edit",
        icon: UserCircle2,
    },
    {
        title: "Notifications",
        description: "Check your mentions and recent activity.",
        href: "/notifications",
        icon: Bell,
    },
    {
        title: "Messages",
        description: "Jump back into your conversations.",
        href: "/messages",
        icon: Inbox,
    },
    {
        title: "My Humidor",
        description: "Manage the cigars you’ve logged and listed.",
        href: "/swaps/humidor",
        icon: BookOpen,
    },
];

export default function SettingsPage() {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/auth/login?callbackUrl=/settings");
        }
    }, [router, status]);

    if (status !== "authenticated") {
        return null;
    }

    return (
        <DesktopLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Settings</h1>
                        <p className={styles.subtitle}>Manage your account, notifications, and humidor tools.</p>
                    </div>
                    <div className={styles.badge}>
                        <Shield size={16} />
                        Account
                    </div>
                </div>

                <div className={styles.grid}>
                    {settingsLinks.map((item) => (
                        <Link key={item.href} href={item.href} className={styles.card}>
                            <div className={styles.cardIcon}>
                                <item.icon size={18} />
                            </div>
                            <div className={styles.cardCopy}>
                                <h2 className={styles.cardTitle}>{item.title}</h2>
                                <p className={styles.cardDesc}>{item.description}</p>
                            </div>
                            <ChevronRight size={16} className={styles.chevron} />
                        </Link>
                    ))}
                </div>

                <button className={styles.signOutBtn} onClick={() => signOut({ callbackUrl: "/auth/login" })}>
                    <LogOut size={16} />
                    Sign Out
                </button>
            </div>
        </DesktopLayout>
    );
}
