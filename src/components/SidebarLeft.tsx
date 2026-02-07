"use client";

import styles from "./Sidebar.module.css";
import { Home, User, Users, Compass, Zap, Gavel, Settings, Inbox } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLeft() {
    const pathname = usePathname();

    const navItems = [
        { label: "Feed", icon: Home, href: "/" },
        { label: "Profile", icon: User, href: "/profile" },
        { label: "Societies", icon: Users, href: "/groups" },
        { label: "Live Hub", icon: Zap, href: "/live" },
        { label: "The Exchange", icon: Compass, href: "/swaps" },
    ];

    const quickLinks = [
        { label: "Messages", icon: Inbox, href: "/messages" },
        { label: "My Auctions", icon: Gavel, href: "/live/auctions" },
        { label: "Settings", icon: Settings, href: "/settings" },
    ];

    return (
        <nav className={styles.sidebarContainer}>
            <div className={styles.sectionTitle}>Main Menu</div>
            {navItems.map((item) => (
                <Link key={item.href} href={item.href} className={`${styles.navItem} ${pathname === item.href ? styles.navItemActive : ''}`}>
                    <item.icon size={22} />
                    <span className="font-medium text-sm">{item.label}</span>
                </Link>
            ))}

            <div className={styles.sectionTitle}>Personal</div>
            {quickLinks.map((item) => (
                <Link key={item.href} href={item.href} className={styles.navItem}>
                    <item.icon size={22} className="text-gray-400" />
                    <span className="font-medium text-sm text-gray-400">{item.label}</span>
                </Link>
            ))}

            <div className="mt-8 px-6">
                <div className="bg-[#1A120B] p-4 rounded-lg border border-[#3E3228]">
                    <h4 className="text-gold font-bold text-sm mb-2">Connoisseur Pro</h4>
                    <p className="text-gray-400 text-xs mb-3">Upgrade to access exclusive auctions and verified trading.</p>
                    <button className="w-full bg-gold text-black text-xs font-bold py-2 rounded">Upgrade Plan</button>
                </div>
            </div>
        </nav>
    );
}
