"use client";

import styles from "./Sidebar.module.css";
import { Home, User, Users, Compass, Zap, Gavel, Settings, Inbox, LogIn, LogOut, Crown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { getTier } from "@/lib/connoisseur";

export default function SidebarLeft() {
    const pathname = usePathname();
    const { data: session } = useSession();

    const navItems = [
        { label: "Feed", icon: Home, href: "/" },
        { label: "Profile", icon: User, href: session?.user?.username ? `/profile/${session.user.username}` : "/auth/login" },
        { label: "Societies", icon: Users, href: "/groups" },
        { label: "Live Hub", icon: Zap, href: "/live" },
        { label: "The Exchange", icon: Compass, href: "/swaps" },
    ];

    const quickLinks = [
        { label: "Messages", icon: Inbox, href: "/messages" },
        { label: "My Auctions", icon: Gavel, href: "/live/auctions" },
        { label: "Settings", icon: Settings, href: "/settings" },
    ];

    const tier = session?.user?.xp !== undefined ? getTier(session.user.xp) : null;

    return (
        <nav className={styles.sidebarContainer}>
            {/* ─── Auth User Profile ─── */}
            {session?.user ? (
                <Link href={`/profile/${session.user.username}`} className={styles.userProfile}>
                    <div className={styles.sidebarAvatar}>
                        {session.user.image ? (
                            <img src={session.user.image} alt={session.user.name ?? "Me"} className={styles.sidebarAvatarImg} />
                        ) : (
                            <div className={styles.sidebarAvatarPlaceholder}>
                                {(session.user.name ?? session.user.username ?? "U").charAt(0).toUpperCase()}
                            </div>
                        )}
                        {tier && (
                            <div
                                className={styles.sidebarAvatarRing}
                                style={{ boxShadow: `0 0 0 2px ${tier.color}` }}
                            />
                        )}
                    </div>
                    <div className={styles.sidebarUserInfo}>
                        <span className={styles.sidebarUserName}>{session.user.name ?? session.user.username}</span>
                        <span className={styles.sidebarUserLevel} style={{ color: tier?.color }}>
                            {tier?.title ?? "Novice"}
                        </span>
                    </div>
                </Link>
            ) : (
                <Link href="/auth/login" className={styles.signInBanner}>
                    <LogIn size={18} />
                    <span>Sign In to The Lounge</span>
                </Link>
            )}

            <div className={styles.sectionTitle}>Main Menu</div>
            {navItems.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.navItem} ${pathname === item.href ? styles.navItemActive : ""}`}
                >
                    <item.icon size={22} />
                    <span className="font-medium text-sm">{item.label}</span>
                </Link>
            ))}

            <div className={styles.sectionTitle}>Personal</div>
            {quickLinks.map((item) => (
                <Link key={item.href} href={item.href} className={`${styles.navItem} ${pathname === item.href ? styles.navItemActive : ""}`}>
                    <item.icon size={22} />
                    <span className="font-medium text-sm">{item.label}</span>
                </Link>
            ))}

            {session?.user ? (
                <button
                    className={styles.signOutBtn}
                    onClick={() => signOut({ callbackUrl: "/auth/login" })}
                >
                    <LogOut size={16} />
                    Sign Out
                </button>
            ) : null}

            <Link href="/upgrade" className="mt-8 mx-6 block">
                <div className="bg-[#1A120B] p-4 rounded-lg border border-[#3E3228] hover:border-[#D4AF37] transition-colors">
                    <div className="flex items-center gap-2 mb-1">
                        <Crown size={14} className="text-gold" />
                        <h4 className="text-gold font-bold text-sm">Connoisseur Pro</h4>
                    </div>
                    <p className="text-gray-400 text-xs mb-3">Upgrade to access exclusive auctions and verified trading.</p>
                    <div className="w-full bg-gold text-black text-xs font-bold py-2 rounded text-center">View Plans</div>
                </div>
            </Link>
        </nav>
    );
}
