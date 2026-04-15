"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";
import { Users, Search, Plus, Trophy, Zap, MapPin, Globe, X, Loader2, ImagePlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import DesktopLayout from "@/components/DesktopLayout";
import { useSession } from "next-auth/react";

type FilterMode = "all" | "mine" | "regional" | "brand";

interface Society {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    coverImage: string | null;
    category: string;
    createdAt: string;
    creatorId: string;
    _count?: { members: number };
}

const categoryIcons: Record<string, typeof Trophy> = {
    Exclusive: Trophy,
    Regional: MapPin,
    Vintage: Globe,
    Social: Users,
    Educational: Zap,
    Pairing: Trophy,
    "Brand Specific": Globe,
};

const demoGroups: Society[] = [
    {
        id: "1",
        slug: "the-gentry-club",
        name: "The Gentry Club",
        description: "An exclusive society for the modern gentleman. Focused on rare vintages and high-stakes auctions.",
        coverImage: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1200",
        category: "Exclusive",
        createdAt: new Date().toISOString(),
        creatorId: "demo",
        _count: { members: 12500 },
    },
    {
        id: "2",
        slug: "new-world-smokers",
        name: "New World Smokers",
        description: "Celebrating the finest tobacco from Nicaragua, the Dominican Republic, and Honduras.",
        coverImage: "https://images.unsplash.com/photo-1510009653068-07b489a20078?w=1200",
        category: "Regional",
        createdAt: new Date().toISOString(),
        creatorId: "demo",
        _count: { members: 8200 },
    },
    {
        id: "3",
        slug: "cuban-aficionados",
        name: "Cuban Aficionados",
        description: "Dedicated to Habanos releases, provenance, and the timeless rituals around Cuban leaf.",
        coverImage: "https://images.unsplash.com/photo-1623157879673-10821b066316?w=1200",
        category: "Brand Specific",
        createdAt: new Date().toISOString(),
        creatorId: "demo",
        _count: { members: 5400 },
    },
];

const createCategories = ["Social", "Exclusive", "Regional", "Educational", "Pairing", "Brand Specific"];

export default function GroupsPage() {
    const { data: session } = useSession();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [societies, setSocieties] = useState<Society[]>([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<FilterMode>("all");
    const [showCreate, setShowCreate] = useState(false);
    const [creating, setCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("Social");
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [imageError, setImageError] = useState("");

    useEffect(() => {
        fetch("/api/societies")
            .then((res) => res.ok ? res.json() : [])
            .then((data: Society[]) => {
                setSocieties(data);
            })
            .finally(() => setLoading(false));
    }, []);

    const groups = societies.length > 0 ? societies : demoGroups;

    const filteredGroups = useMemo(() => {
        const query = search.trim().toLowerCase();
        return groups.filter((group) => {
            const matchesSearch =
                !query ||
                group.name.toLowerCase().includes(query) ||
                group.description?.toLowerCase().includes(query) ||
                group.category.toLowerCase().includes(query);

            if (!matchesSearch) return false;

            if (filter === "mine") return session?.user?.id ? group.creatorId === session.user.id : false;
            if (filter === "regional") return group.category === "Regional";
            if (filter === "brand") return group.category === "Brand Specific";
            return true;
        });
    }, [groups, search, filter, session?.user?.id]);

    async function handleCreateSociety(e: React.FormEvent) {
        e.preventDefault();
        if (!name.trim() || creating) return;
        setCreating(true);
        setError("");
        try {
            const res = await fetch("/api/societies", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name.trim(),
                    category,
                    description: description.trim() || null,
                    coverImage: coverImage.trim() || null,
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error ?? "Unable to create society.");
                return;
            }

            setSocieties((prev) => [data, ...prev]);
            setShowCreate(false);
            setName("");
            setCategory("Social");
            setDescription("");
            setCoverImage("");
            setImageError("");
        } finally {
            setCreating(false);
        }
    }

    function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setImageError("Use a PNG, JPG, or WebP image.");
            e.target.value = "";
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            setImageError("Cover image must be under 2MB.");
            e.target.value = "";
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result;
            if (typeof result === "string") {
                setCoverImage(result);
                setImageError("");
            }
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    }

    return (
        <DesktopLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headingBlock}>
                        <h1 className={styles.pageTitle}>Cigar Societies</h1>
                        <p className={styles.pageSubtitle}>Find your table, build a chapter, and gather around the leaf.</p>
                    </div>

                    <div className={styles.controls}>
                        <div className={styles.searchBar}>
                            <Search className={styles.searchIcon} size={18} />
                            <input
                                type="text"
                                placeholder="Find a society..."
                                className={styles.searchInput}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button className={styles.createBtn} onClick={() => setShowCreate(true)} disabled={!session}>
                            <Plus size={18} />
                            <span>Create Society</span>
                        </button>
                    </div>
                </div>

                <div className={styles.filters}>
                    <button className={`${styles.filterBtn} ${filter === "all" ? styles.activeFilter : ""}`} onClick={() => setFilter("all")}>All Societies</button>
                    <button className={`${styles.filterBtn} ${filter === "mine" ? styles.activeFilter : ""}`} onClick={() => setFilter("mine")}>My Groups</button>
                    <button className={`${styles.filterBtn} ${filter === "regional" ? styles.activeFilter : ""}`} onClick={() => setFilter("regional")}>Local Chapters</button>
                    <button className={`${styles.filterBtn} ${filter === "brand" ? styles.activeFilter : ""}`} onClick={() => setFilter("brand")}>Brand Specific</button>
                </div>

                <AnimatePresence>
                    {showCreate && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className={styles.createPanel}
                            onSubmit={handleCreateSociety}
                        >
                            <div className={styles.createPanelHeader}>
                                <div>
                                    <h2 className={styles.createPanelTitle}>Create a Society</h2>
                                    <p className={styles.createPanelSubtitle}>Start a club around a region, ritual, brand, or local chapter.</p>
                                </div>
                                <button type="button" className={styles.closeBtn} onClick={() => setShowCreate(false)}>
                                    <X size={16} />
                                </button>
                            </div>

                            <div className={styles.createGrid}>
                                <div className={styles.field}>
                                    <label className={styles.label}>Society Name *</label>
                                    <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Atlanta Maduro Society" required />
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label}>Category</label>
                                    <select className={styles.input} value={category} onChange={(e) => setCategory(e.target.value)}>
                                        {createCategories.map((option) => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                </div>
                                <div className={`${styles.field} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Cover Image</label>
                                    <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp" className={styles.hiddenInput} onChange={handleCoverUpload} />
                                    {coverImage ? (
                                        <div className={styles.coverPreviewRow}>
                                            <img src={coverImage} alt="Society cover preview" className={styles.coverPreview} />
                                            <div className={styles.coverPreviewMeta}>
                                                <span className={styles.coverPreviewTitle}>Cover ready</span>
                                                <span className={styles.coverPreviewHint}>This image will headline the society card and page.</span>
                                            </div>
                                            <button type="button" className={styles.secondaryBtn} onClick={() => setCoverImage("")}>
                                                <X size={14} />
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <button type="button" className={styles.secondaryBtn} onClick={() => fileInputRef.current?.click()}>
                                            <ImagePlus size={14} />
                                            Upload Cover
                                        </button>
                                    )}
                                    <input
                                        className={styles.input}
                                        placeholder="Or paste an image URL"
                                        value={coverImage.startsWith("data:image/") ? "" : coverImage}
                                        onChange={(e) => { setCoverImage(e.target.value); setImageError(""); }}
                                    />
                                    <span className={styles.fieldHint}>PNG, JPG, or WebP up to 2MB.</span>
                                    {imageError && <span className={styles.fieldError}>{imageError}</span>}
                                </div>
                                <div className={`${styles.field} ${styles.fullWidth}`}>
                                    <label className={styles.label}>Description</label>
                                    <textarea className={styles.textarea} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What kind of smokers, rituals, and gatherings is this society for?" maxLength={280} />
                                </div>
                            </div>

                            {error && <div className={styles.errorBanner}>{error}</div>}

                            <div className={styles.createPanelFooter}>
                                <button type="button" className={styles.secondaryBtn} onClick={() => setShowCreate(false)}>Cancel</button>
                                <button type="submit" className={styles.createBtn} disabled={!name.trim() || creating}>
                                    {creating ? <Loader2 size={16} className={styles.spin} /> : <Plus size={16} />}
                                    Create Society
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {loading ? (
                    <div className={styles.loadingState}><Loader2 size={28} className={styles.spin} /></div>
                ) : filteredGroups.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Users size={36} />
                        <h2>No societies match yet</h2>
                        <p>Try another filter or start the first society for this niche.</p>
                    </div>
                ) : (
                    <div className={styles.grid}>
                        {filteredGroups.map((group, index) => {
                            const Icon = categoryIcons[group.category] ?? Users;
                            const memberCount = group._count?.members ?? 0;
                            return (
                                <motion.div
                                    key={group.id}
                                    className={styles.card}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05, duration: 0.35 }}
                                >
                                    <div
                                        className={styles.cardCover}
                                        style={group.coverImage ? { backgroundImage: `url(${group.coverImage})` } : undefined}
                                    >
                                        <div className={styles.coverScrim} />
                                        <span className={styles.groupCategory}>{group.category}</span>
                                    </div>
                                    <div className={styles.cardContent}>
                                        <div className={styles.groupIcon}>
                                            <Icon size={22} className={styles.goldIcon} />
                                        </div>
                                        <div className={styles.cardCopy}>
                                            <h3 className={styles.groupName}>{group.name}</h3>
                                            <p className={styles.groupDescription}>
                                                {group.description ?? "A fresh table for tasting notes, pairings, and society conversation."}
                                            </p>
                                            <div className={styles.groupMeta}>
                                                <Users size={14} />
                                                <span>{memberCount.toLocaleString()} Members</span>
                                            </div>
                                        </div>
                                        <Link href={`/groups/${group.slug || group.id}`} className={styles.joinBtn}>
                                            View Society
                                        </Link>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}

                <div className="lg:hidden">
                    <Navbar />
                </div>
            </div>
        </DesktopLayout>
    );
}
