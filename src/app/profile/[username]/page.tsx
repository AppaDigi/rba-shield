"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
    MapPin, Calendar, Edit3, UserPlus,
    Flame, Award, Star, TrendingUp, Users, MessageSquare, Loader2,
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
}

export default function ProfilePage() {
    const { username } = useParams<{ username: string }>();
    const { data: session } = useSession();
    const router = useRouter();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [notFound, setNotFound] = useState(false);
    const [activeTab, setActiveTab] = useState<"posts" | "reviews" | "humidor" | "trades">("posts");

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
                    <Link href="/" className={styles.homeLink}>Back to The Lounge</Link>
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
                            <div className={styles.emptyState}>
                                <Flame size={40} />
                                <h3>Humidor is empty</h3>
                                <p>Log cigars to build your collection</p>
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
