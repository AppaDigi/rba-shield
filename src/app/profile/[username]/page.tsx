"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    MapPin, Calendar, Edit3, UserPlus,
    Flame, Award, Star, TrendingUp, Users, MessageSquare, Loader2, Plus, Package, ImagePlus, Trash2,
} from "lucide-react";
import { getTier, getLevelProgress } from "@/lib/connoisseur";
import FollowButton from "@/components/FollowButton";
import DesktopLayout from "@/components/DesktopLayout";
import styles from "./page.module.css";

interface ProfileData {
    id: string;
    username: string;
    name: string | null;
    bio: string | null;
    avatar: string | null;
    location: string | null;
    xp: number;
    cigarsLogged: number;
    reviewCount: number;
    tradeCount: number;
    createdAt: string;
    _count: { followers: number; following: number };
    humidorItems: {
        id: string;
        name: string;
        brand: string | null;
        size: string | null;
        wrapper: string | null;
        origin: string | null;
        quantity: number;
        notes: string | null;
        imageUrl: string | null;
        createdAt: string;
    }[];
}

export default function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { data: session } = useSession();
    const router = useRouter();
    const humidorImageInputRef = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [activeTab, setActiveTab] = useState<"posts" | "reviews" | "humidor" | "trades">("posts");
    const [showHumidorForm, setShowHumidorForm] = useState(false);
    const [savingHumidorItem, setSavingHumidorItem] = useState(false);
    const [humidorImageError, setHumidorImageError] = useState("");
    const [humidorForm, setHumidorForm] = useState({
        name: "",
        brand: "",
        size: "",
        wrapper: "",
        origin: "",
        quantity: "1",
        notes: "",
        imageUrl: "",
    });

    const isOwnProfile = session?.user?.username === username;

    useEffect(() => {
        fetch(`/api/profile/${username}`)
            .then((r) => {
                if (r.status === 404) { setNotFound(true); return null; }
                return r.json();
            })
            .then((data) => data && setProfile(data));
    }, [username]);

    if (notFound) {
        return (
            <DesktopLayout>
                <div className={styles.notFound}>
                    <h2>User not found</h2>
                    <p>@{username} doesn&apos;t exist or has been removed.</p>
                    <Link href="/" className={styles.homeLink}>Back to Cigar Swap</Link>
                </div>
            </DesktopLayout>
        );
    }

    if (!profile) {
        return (
            <DesktopLayout>
                <div className={styles.loading}>
                    <Loader2 size={32} className={styles.spinner} />
                    <p>Loading profile...</p>
                </div>
            </DesktopLayout>
        );
    }

    const tier = getTier(profile.xp);
    const progress = getLevelProgress(profile.xp);
    const joinDate = new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });

    const stats = [
        { label: "Cigars Logged", value: profile.cigarsLogged, icon: Flame },
        { label: "Reviews", value: profile.reviewCount, icon: Star },
        { label: "Trades", value: profile.tradeCount, icon: TrendingUp },
        { label: "Followers", value: profile._count.followers, icon: Users },
        { label: "Following", value: profile._count.following, icon: Users },
    ];

    const tabs = [
        { key: "posts", label: "Posts" },
        { key: "reviews", label: "Reviews" },
        { key: "humidor", label: "Humidor" },
        { key: "trades", label: "Trades" },
    ] as const;

    function updateHumidorForm(field: keyof typeof humidorForm, value: string) {
        setHumidorForm((current) => ({ ...current, [field]: value }));
    }

    function resetHumidorForm() {
        setHumidorForm({
            name: "",
            brand: "",
            size: "",
            wrapper: "",
            origin: "",
            quantity: "1",
            notes: "",
            imageUrl: "",
        });
        setHumidorImageError("");
        if (humidorImageInputRef.current) humidorImageInputRef.current.value = "";
    }

    function handleHumidorPhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setHumidorImageError("Use a PNG, JPG, or WebP image.");
            e.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setHumidorImageError("Photo must be under 2MB.");
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            const result = ev.target?.result;
            if (typeof result === "string") {
                updateHumidorForm("imageUrl", result);
                setHumidorImageError("");
            }
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    }

    async function addHumidorItem(e: React.FormEvent) {
        e.preventDefault();
        if (!humidorForm.name.trim() || savingHumidorItem || !isOwnProfile) return;

        setSavingHumidorItem(true);

        try {
            const res = await fetch("/api/humidor", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: humidorForm.name.trim(),
                    brand: humidorForm.brand,
                    size: humidorForm.size,
                    wrapper: humidorForm.wrapper,
                    origin: humidorForm.origin,
                    quantity: parseInt(humidorForm.quantity, 10) || 1,
                    notes: humidorForm.notes,
                    imageUrl: humidorForm.imageUrl,
                }),
            });

            if (!res.ok) return;

            const item = await res.json();
            setProfile((current) => current ? {
                ...current,
                humidorItems: [item, ...current.humidorItems],
                cigarsLogged: current.cigarsLogged + item.quantity,
            } : current);
            resetHumidorForm();
            setShowHumidorForm(false);
        } finally {
            setSavingHumidorItem(false);
        }
    }

    return (
        <DesktopLayout>
            <div className={styles.page}>
                {/* Cover */}
                <div className={styles.cover}>
                    <div className={styles.coverOverlay} />
                </div>

                <div className={styles.container}>
                    {/* Header */}
                    <div className={styles.header}>
                        <motion.div
                            className={styles.avatarWrapper}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            {/* Level ring glow */}
                            <div
                                className={styles.avatarRing}
                                style={{ boxShadow: `0 0 0 3px ${tier.color}, 0 0 20px ${tier.color}44` }}
                            />
                            {profile.avatar ? (
                                <img src={profile.avatar} alt={profile.name ?? username} className={styles.avatar} />
                            ) : (
                                <div className={styles.avatarPlaceholder}>
                                    {(profile.name ?? username).charAt(0).toUpperCase()}
                                </div>
                            )}
                            {/* Level badge */}
                            <div className={styles.levelBadge} style={{ background: tier.color }}>
                                {tier.level}
                            </div>
                        </motion.div>

                        {/* Actions */}
                        <div className={styles.actions}>
                            {isOwnProfile ? (
                                <button
                                    className={styles.editBtn}
                                    onClick={() => router.push("/profile/edit")}
                                >
                                    <Edit3 size={16} />
                                    Edit Profile
                                </button>
                            ) : session?.user ? (
                                <FollowButton targetUserId={profile.id} />
                            ) : (
                                <Link href="/auth/login" className={styles.followLink}>
                                    <UserPlus size={16} />
                                    Follow
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Identity */}
                    <motion.div
                        className={styles.identity}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className={styles.displayName}>{profile.name ?? username}</h1>
                        <span className={styles.username}>@{username}</span>

                        {profile.bio && <p className={styles.bio}>{profile.bio}</p>}

                        <div className={styles.meta}>
                            {profile.location && (
                                <span><MapPin size={13} /> {profile.location}</span>
                            )}
                            <span><Calendar size={13} /> Joined {joinDate}</span>
                        </div>
                    </motion.div>

                    {/* ─── Connoisseur Level Card ─── */}
                    <motion.div
                        className={styles.levelCard}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className={styles.levelHeader}>
                            <Award size={18} style={{ color: tier.color }} />
                            <span className={styles.levelTitle} style={{ color: tier.color }}>{tier.title}</span>
                            <span className={styles.levelNum}>Level {tier.level}</span>
                        </div>
                        <p className={styles.levelDesc}>{tier.description}</p>
                        <div className={styles.xpBar}>
                            <motion.div
                                className={styles.xpFill}
                                style={{ background: `linear-gradient(90deg, ${tier.color}88, ${tier.color})` }}
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                            />
                        </div>
                        <div className={styles.xpLabel}>
                            <span>{profile.xp.toLocaleString()} XP</span>
                            <span>{progress}% to next level</span>
                        </div>
                    </motion.div>

                    {/* ─── Stats Row ─── */}
                    <motion.div
                        className={styles.statsRow}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {stats.map((stat) => (
                            <div key={stat.label} className={styles.stat}>
                                <stat.icon size={16} className={styles.statIcon} />
                                <span className={styles.statValue}>{stat.value.toLocaleString()}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* ─── Tab Bar ─── */}
                    <div className={styles.tabs}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                className={`${styles.tab} ${activeTab === tab.key ? styles.tabActive : ""}`}
                                onClick={() => setActiveTab(tab.key)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* ─── Tab Content Placeholder ─── */}
                    <div className={styles.tabContent}>
                        {activeTab === "posts" && (
                            <div className={styles.emptyState}>
                                <MessageSquare size={40} />
                                <h3>No posts yet</h3>
                                <p>{isOwnProfile ? "Start sharing your latest smokes" : `${profile.name ?? username} hasn’t posted yet`}</p>
                            </div>
                        )}
                        {activeTab === "reviews" && (
                            <div className={styles.emptyState}>
                                <Star size={40} />
                                <h3>No reviews yet</h3>
                                <p>Reviews written here will appear here</p>
                            </div>
                        )}
                        {activeTab === "humidor" && (
                            <div className={styles.humidorSection}>
                                <div className={styles.humidorHeader}>
                                    <div>
                                        <h3 className={styles.sectionHeading}>Humidor Collection</h3>
                                        <p className={styles.sectionCopy}>
                                            {profile.humidorItems.length === 0
                                                ? "No cigars logged yet."
                                                : `${profile.humidorItems.reduce((sum, item) => sum + item.quantity, 0)} cigars across ${profile.humidorItems.length} listing${profile.humidorItems.length === 1 ? "" : "s"}.`}
                                        </p>
                                    </div>
                                    {isOwnProfile && (
                                        <button className={styles.addHumidorBtn} onClick={() => setShowHumidorForm((value) => !value)}>
                                            <Plus size={14} />
                                            Add Cigar
                                        </button>
                                    )}
                                </div>

                                {isOwnProfile && showHumidorForm && (
                                    <motion.form
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={styles.humidorForm}
                                        onSubmit={addHumidorItem}
                                    >
                                        <div className={styles.humidorFormGrid}>
                                            <div className={styles.formField}>
                                                <label className={styles.formLabel}>Cigar Name *</label>
                                                <input className={styles.formInput} value={humidorForm.name} onChange={(e) => updateHumidorForm("name", e.target.value)} placeholder="e.g., Padrón 1964 Anniversary Maduro" required />
                                            </div>
                                            <div className={styles.formField}>
                                                <label className={styles.formLabel}>Brand</label>
                                                <input className={styles.formInput} value={humidorForm.brand} onChange={(e) => updateHumidorForm("brand", e.target.value)} placeholder="e.g., Padrón" />
                                            </div>
                                            <div className={styles.formField}>
                                                <label className={styles.formLabel}>Size / Vitola</label>
                                                <input className={styles.formInput} value={humidorForm.size} onChange={(e) => updateHumidorForm("size", e.target.value)} placeholder="e.g., Toro" />
                                            </div>
                                            <div className={styles.formField}>
                                                <label className={styles.formLabel}>Quantity</label>
                                                <input className={styles.formInput} value={humidorForm.quantity} onChange={(e) => updateHumidorForm("quantity", e.target.value)} type="number" min="1" max="500" />
                                            </div>
                                            <div className={styles.formField}>
                                                <label className={styles.formLabel}>Wrapper</label>
                                                <input className={styles.formInput} value={humidorForm.wrapper} onChange={(e) => updateHumidorForm("wrapper", e.target.value)} placeholder="e.g., Maduro" />
                                            </div>
                                            <div className={styles.formField}>
                                                <label className={styles.formLabel}>Origin</label>
                                                <input className={styles.formInput} value={humidorForm.origin} onChange={(e) => updateHumidorForm("origin", e.target.value)} placeholder="e.g., Nicaragua" />
                                            </div>
                                            <div className={styles.humidorFormFull}>
                                                <label className={styles.formLabel}>Photo</label>
                                                <input
                                                    ref={humidorImageInputRef}
                                                    type="file"
                                                    accept="image/png,image/jpeg,image/webp"
                                                    className={styles.hiddenInput}
                                                    onChange={handleHumidorPhotoUpload}
                                                />
                                                {humidorForm.imageUrl ? (
                                                    <div className={styles.humidorImageRow}>
                                                        <img src={humidorForm.imageUrl} alt="Humidor preview" className={styles.humidorPreviewImage} />
                                                        <div className={styles.humidorImageMeta}>
                                                            <span className={styles.humidorImageTitle}>Photo attached</span>
                                                            <span className={styles.humidorImageHint}>This image will appear in your humidor collection.</span>
                                                        </div>
                                                        <button type="button" className={styles.secondaryAction} onClick={() => updateHumidorForm("imageUrl", "")}>
                                                            <Trash2 size={14} />
                                                            Remove
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button type="button" className={styles.secondaryAction} onClick={() => humidorImageInputRef.current?.click()}>
                                                        <ImagePlus size={14} />
                                                        Upload Photo
                                                    </button>
                                                )}
                                                <input
                                                    className={styles.formInput}
                                                    placeholder="Or paste an image URL"
                                                    value={humidorForm.imageUrl.startsWith("data:image/") ? "" : humidorForm.imageUrl}
                                                    onChange={(e) => { updateHumidorForm("imageUrl", e.target.value); setHumidorImageError(""); }}
                                                />
                                                <span className={styles.formHint}>PNG, JPG, or WebP up to 2MB.</span>
                                                {humidorImageError && <span className={styles.formError}>{humidorImageError}</span>}
                                            </div>
                                            <div className={styles.humidorFormFull}>
                                                <label className={styles.formLabel}>Personal Notes</label>
                                                <textarea className={styles.formTextarea} rows={3} value={humidorForm.notes} onChange={(e) => updateHumidorForm("notes", e.target.value)} placeholder="Year purchased, storage conditions, tasting notes..." />
                                            </div>
                                        </div>
                                        <div className={styles.humidorFormActions}>
                                            <button type="button" className={styles.secondaryAction} onClick={() => { setShowHumidorForm(false); resetHumidorForm(); }}>
                                                Cancel
                                            </button>
                                            <button type="submit" className={styles.addHumidorBtn} disabled={!humidorForm.name.trim() || savingHumidorItem}>
                                                {savingHumidorItem ? <Loader2 size={14} className={styles.spinner} /> : <Plus size={14} />}
                                                Add to Humidor
                                            </button>
                                        </div>
                                    </motion.form>
                                )}

                                {profile.humidorItems.length === 0 ? (
                                    <div className={styles.emptyState}>
                                        <Package size={40} />
                                        <h3>Humidor is empty</h3>
                                        <p>{isOwnProfile ? "Add cigars with photos to build your collection." : "No cigars have been shared yet."}</p>
                                    </div>
                                ) : (
                                    <div className={styles.humidorGrid}>
                                        {profile.humidorItems.map((item) => (
                                            <div key={item.id} className={styles.humidorCard}>
                                                {item.imageUrl ? (
                                                    <img src={item.imageUrl} alt={item.name} className={styles.humidorCardImage} />
                                                ) : (
                                                    <div className={styles.humidorCardPlaceholder}>
                                                        <Flame size={20} />
                                                    </div>
                                                )}
                                                <div className={styles.humidorCardBody}>
                                                    <div className={styles.humidorCardTop}>
                                                        <h4 className={styles.humidorCardName}>{item.name}</h4>
                                                        <span className={styles.humidorQty}>x{item.quantity}</span>
                                                    </div>
                                                    <div className={styles.humidorTags}>
                                                        {item.brand && <span className={styles.humidorTag}>{item.brand}</span>}
                                                        {item.size && <span className={styles.humidorTag}>{item.size}</span>}
                                                        {item.wrapper && <span className={styles.humidorTag}>{item.wrapper}</span>}
                                                        {item.origin && <span className={styles.humidorTag}>{item.origin}</span>}
                                                    </div>
                                                    {item.notes && <p className={styles.humidorNotes}>{item.notes}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "trades" && (
                            <div className={styles.emptyState}>
                                <TrendingUp size={40} />
                                <h3>No trades yet</h3>
                                <p>Completed trades will appear here</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DesktopLayout>
    );
}
