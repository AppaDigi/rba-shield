"use client";

import { Armchair, Users, Gavel, Repeat, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./Navbar.module.css";
import clsx from "clsx";

const NavItem = ({ href, icon: Icon, label, isActive }: { href: string; icon: any; label: string; isActive: boolean }) => {
    return (
        <Link href={href} className={clsx(styles.navItem, isActive && styles.navItemActive)}>
            {isActive && (
                <motion.div
                    layoutId="nav-indicator"
                    className={styles.navIndicator}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
            )}
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className={styles.navLabel}>{label}</span>
        </Link>
    );
};

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={styles.navInitial}>
            <NavItem href="/" icon={Armchair} label="Lounge" isActive={pathname === "/"} />
            <NavItem href="/groups" icon={Users} label="Groups" isActive={pathname === "/groups"} />

            {/* Center Action Button - Duck Races/Live */}
            <div className={styles.liveButtonWrapper}>
                <Link href="/live" className={styles.liveButton}>
                    <Gavel size={28} strokeWidth={2.5} />
                </Link>
                <span className={styles.liveLabel}>Live</span>
            </div>

            <NavItem href="/swaps" icon={Repeat} label="Swaps" isActive={pathname === "/swaps"} />
            <NavItem href="/profile" icon={User} label="Profile" isActive={pathname === "/profile"} />
        </nav>
    );
}
