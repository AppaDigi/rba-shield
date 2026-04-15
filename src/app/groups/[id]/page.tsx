"use client";

import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import FeedCard, { type FeedPost } from "@/components/FeedCard";
import { Users, Trophy, MapPin, Globe, Zap, Loader2, Plus, LogIn } from "lucide-react";
import { use, useEffect, useState } from "react";
import DesktopLayout from "@/components/DesktopLayout";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface SocietyDetails {
    id: string;
    name: string;
    description: string | null;
    coverImage: string | null;
    category: string;
    creatorId: string;
    creator: { id: string; name: string | null; username: string; avatar: string | null };
    _count: { members: number; posts: number };
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

const FALLBACK_BANNER = "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=1200";

export default function GroupPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: session } = useSession();

    const [society, setSociety] = useState<SocietyDetails | null>(null);
    const [posts, setPosts] = useState<FeedPost[]>([]);
    const [joined, setJoined] = useState(false);
    const [memberCount, setMemberCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);
    const [postContent, setPostContent] = useState("");
    const [posting, setPosting] = useState(false);
    const [postCursor, setPostCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        setLoading(true);

        Promise.all([
            fetch(`/api/societies/${id}`).then(r => r.ok ? r.json() as Promise<SocietyDetails> : null),
            fetch(`/api/societies/${id}/posts`).then(r => r.ok ? r.json() : { posts: [], nextCursor: null }),
        ]).then(([societyData, postsData]) => {
            if (!societyData) { setNotFound(true); setLoading(false); return; }
            setSociety(societyData);
            setMemberCount(societyData._count.members);
            setPosts(postsData.posts ?? []);
            setPostCursor(postsData.nextCursor ?? null);
            setHasMore(!!postsData.nextCursor);
        }).finally(() => setLoading(false));
    }, [id]);

    // Check membership once session is ready
    useEffect(() => {
        if (!session?.user?.id || !society) return;
        fetch(`/api/societies/${id}/join`)
            .then(r => r.ok ? r.json() : null)
            .then(data => { if (data) setJoined(data.joined ?? false); })
            .catch(() => {});
    }, [session?.user?.id, society, id]);

    async function toggleJoin() {
        if (!session?.user?.id || joining) return;
        setJoining(true);
        try {
            const res = await fetch(`/api/societies/${id}/join`, { method: "POST" });
            if (res.ok) {
                const data = await res.json();
                setJoined(data.joined);
                setMemberCount(data.memberCount);
            }
        } finally {
            setJoining(false);
        }
    }

    async function loadMore() {
        if (!hasMore || loadingMore || !postCursor) return;
        setLoadingMore(true);
        const res = await fetch(`/api/societies/${id}/posts?cursor=${postCursor}`);
        if (res.ok) {
            const data = await res.json();
            setPosts(prev => [...prev, ...(data.posts ?? [])]);
            setPostCursor(data.nextCursor ?? null);
            setHasMore(!!data.nextCursor);
        }
        setLoadingMore(false);
    }

    async function submitPost(e: React.FormEvent) {
        e.preventDefault();
        if (!postContent.trim() || posting) return;
        setPosting(true);
        try {
            const res = await fetch(`/api/societies/${id}/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: postContent.trim() }),
            });
            if (res.ok) {
                const newPost: FeedPost = await res.json();
                setPosts(prev => [newPost, ...prev]);
                setPostContent("");
            }
        } finally {
            setPosting(false);
        }
    }

    if (loading) {
        return (
            <DesktopLayout>
                <div className={styles.container} style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "50vh" }}>
                    <Loader2 size={28} style={{ animation: "spin 0.7s linear infinite", color: "var(--accent-primary)" }} />
                </div>
            </DesktopLayout>
        );
    }

    if (notFound || !society) {
        return (
            <DesktopLayout>
                <div className={styles.container} style={{ textAlign: "center", padding: "4rem 1rem", color: "var(--text-secondary)" }}>
                    <p>Society not found.</p>
                    <Link href="/groups" style={{ color: "var(--accent-primary)", marginTop: "1rem", display: "inline-block" }}>← Back to Societies</Link>
                </div>
            </DesktopLayout>
        );
    }

    const Icon = categoryIcons[society.category] ?? Users;

    return (
        <DesktopLayout showRightSidebar={true}>
            <div className={styles.container}>
                {/* Banner */}
                <div className={styles.banner} style={{ backgroundImage: `url(${society.coverImage ?? FALLBACK_BANNER})` }}>
                    <div className={styles.bannerOverlay}>
                        <div className={styles.groupHeader}>
                            <div className={styles.groupAvatar}>
                                <Icon size={40} style={{ color: "var(--accent-primary)" }} />
                            </div>
                            <div>
                                <h1 className={styles.groupTitle}>{society.name}</h1>
                                <div className={styles.groupMeta}>
                                    <span>{society.category}</span>
                                    <span>·</span>
                                    <span>{memberCount.toLocaleString()} Members</span>
                                    <span>·</span>
                                    <span>{society._count.posts} Posts</span>
                                </div>
                            </div>
                            {session?.user?.id ? (
                                <button
                                    className={styles.joinBtn}
                                    onClick={toggleJoin}
                                    disabled={joining}
                                    style={joined ? { background: "var(--bg-card)", color: "var(--text-primary)", border: "1px solid var(--border-subtle)" } : undefined}
                                >
                                    {joining ? <Loader2 size={14} style={{ animation: "spin 0.7s linear infinite", display: "inline" }} /> : joined ? "✓ Joined" : "Join Society"}
                                </button>
                            ) : (
                                <Link href="/auth/login" className={styles.joinBtn}>
                                    <LogIn size={14} style={{ display: "inline", marginRight: "0.3rem" }} />
                                    Sign in to Join
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Layout */}
                <div className={styles.contentGrid}>

                    {/* Left Feed */}
                    <div className={styles.feed}>

                        {/* Post composer — members only */}
                        {session?.user?.id && joined && (
                            <form className={styles.createPost} onSubmit={submitPost}>
                                <div className={styles.userAvatar} style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-card)", color: "var(--accent-primary)", fontWeight: 700, fontSize: "1rem", borderRadius: "50%", width: 40, height: 40, flexShrink: 0 }}>
                                    {(session.user.name ?? session.user.email ?? "U").charAt(0).toUpperCase()}
                                </div>
                                <input
                                    className={styles.postInput}
                                    placeholder={`Post in ${society.name}...`}
                                    value={postContent}
                                    onChange={e => setPostContent(e.target.value)}
                                    maxLength={500}
                                />
                                <button
                                    type="submit"
                                    disabled={!postContent.trim() || posting}
                                    style={{ background: "var(--accent-primary)", color: "#000", border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
                                >
                                    {posting ? <Loader2 size={14} style={{ animation: "spin 0.7s linear infinite" }} /> : <Plus size={14} />}
                                </button>
                            </form>
                        )}

                        {!session?.user?.id && (
                            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "1.25rem", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                                <Link href="/auth/login" style={{ color: "var(--accent-primary)", fontWeight: 600 }}>Sign in</Link> and join this society to participate.
                            </div>
                        )}

                        {session?.user?.id && !joined && (
                            <div style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "1.25rem", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                                Join this society to post and participate in the conversation.
                            </div>
                        )}

                        {posts.length === 0 ? (
                            <div style={{ padding: "3rem 1rem", textAlign: "center", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                                No posts yet. {joined ? "Be the first to start a conversation!" : "Join to be the first to post."}
                            </div>
                        ) : (
                            posts.map(post => (
                                <FeedCard key={post.id} post={post} onDelete={postId => setPosts(prev => prev.filter(p => p.id !== postId))} />
                            ))
                        )}

                        {hasMore && (
                            <button
                                onClick={loadMore}
                                disabled={loadingMore}
                                style={{ background: "var(--bg-card)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)", padding: "0.6rem 1.5rem", borderRadius: 20, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.4rem", margin: "0 auto" }}
                            >
                                {loadingMore ? <><Loader2 size={14} style={{ animation: "spin 0.7s linear infinite" }} /> Loading...</> : "Load more"}
                            </button>
                        )}
                    </div>

                    {/* Right Sidebar */}
                    <div className={styles.sidebar}>
                        {/* About Widget */}
                        <div className={styles.widget}>
                            <div className={styles.widgetTitle}>About</div>
                            <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)", marginBottom: "1rem", lineHeight: 1.5 }}>
                                {society.description ?? "A society for cigar enthusiasts."}
                            </p>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                                    <Users size={14} /> {memberCount.toLocaleString()} Members
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                                    <MapPin size={14} /> Global · English
                                </div>
                            </div>
                        </div>

                        {/* Founded by */}
                        <div className={styles.widget}>
                            <div className={styles.widgetTitle}>Founded by</div>
                            <Link
                                href={`/profile/${society.creator.username}`}
                                style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none", color: "inherit" }}
                            >
                                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--bg-subtle)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "var(--accent-primary)", overflow: "hidden", flexShrink: 0 }}>
                                    {society.creator.avatar
                                        ? <img src={society.creator.avatar} alt={society.creator.name ?? society.creator.username} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                        : (society.creator.name ?? society.creator.username).charAt(0).toUpperCase()
                                    }
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>{society.creator.name ?? society.creator.username}</div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>@{society.creator.username}</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:hidden">
                    <Navbar />
                </div>
            </div>
        </DesktopLayout>
    );
}
