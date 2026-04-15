"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./MentionDropdown.module.css";
import type { MentionUser } from "@/lib/useMentionSearch";

interface MentionDropdownProps {
    open: boolean;
    results: MentionUser[];
    selectedIndex: number;
    onSelect: (user: MentionUser) => void;
    onDismiss: () => void;
}

export default function MentionDropdown({ open, results, selectedIndex, onSelect, onDismiss }: MentionDropdownProps) {
    const listRef = useRef<HTMLDivElement>(null);

    // Scroll active item into view when selection changes via keyboard
    useEffect(() => {
        if (!listRef.current) return;
        const active = listRef.current.querySelector<HTMLButtonElement>(`[data-idx="${selectedIndex}"]`);
        active?.scrollIntoView({ block: "nearest" });
    }, [selectedIndex]);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        function handler(e: MouseEvent) {
            if (listRef.current && !listRef.current.contains(e.target as Node)) {
                onDismiss();
            }
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [open, onDismiss]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    ref={listRef}
                    className={styles.container}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                >
                    {results.map((user, idx) => (
                        <button
                            key={user.id}
                            type="button"
                            data-idx={idx}
                            className={`${styles.item} ${idx === selectedIndex ? styles.itemActive : ""}`}
                            onMouseDown={(e) => {
                                e.preventDefault(); // Prevents input blur before insertion
                                onSelect(user);
                            }}
                            tabIndex={-1}
                        >
                            {user.avatar ? (
                                <img src={user.avatar} alt={user.username} className={styles.avatar} />
                            ) : (
                                <div className={styles.avatarPlaceholder}>
                                    {(user.name ?? user.username).charAt(0).toUpperCase()}
                                </div>
                            )}
                            <div className={styles.info}>
                                {user.name && <span className={styles.name}>{user.name}</span>}
                                <span className={styles.username}>@{user.username}</span>
                            </div>
                        </button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
