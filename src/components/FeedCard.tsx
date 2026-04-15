"use client";

import { useState, useRef } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal, Check, Bookmark, Trash2, Send } from "lucide-react";
import styles from "./FeedCard.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface Author {
    id: string;
    name: string | null;
    username: string;
    avatar: string | null;
    xp: number;
}

interface CommentData {
    id: string;
    content: string;
    createdAt: string;
    user: {
        id: string;
        name: string | null;
        username: string;
        avatar: string | null;
    };
}

export interface FeedPost {
    id: string;
    content: string;
    mediaUrls: string[];
    createdAt: string;
    author: Author;
    likeCount: number;
    commentCount: number;
    likedByMe: boolean;
}

interface FeedCardProps {
    post: FeedPost;
    onDelete?: (id: string) => void;
}

export default function FeedCard({ post, onDelete }: FeedCardProps) {
    const { data: session } = useSession();
    const [liked, setLiked] = useState(post.likedByMe);
    const [likeCount, setLikeCount] = useState(post.likeCount);
    const [commentCount, setCommentCount] = useState(post.commentCount);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState<CommentData[]>([]);
    const [commentText, setCommentText] = useState("");
    const [loadingComments, setLoadingComments] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const commentInputRef = useRef<HTMLInputElement>(null);

    const isOwner = session?.user?.id === post.author.id;

    async function toggleLike() {
        if (!session) return;
        const prev = liked;
        setLiked(!prev);
        setLikeCount((c) => (prev ? c - 1 : c + 1));
        try {
            const res = await fetch(`/api/posts/${post.id}/like`, { method: "POST" });
            const data = await res.json();
            setLiked(data.liked);
            setLikeCount(data.likeCount);
        } catch {
            setLiked(prev);
            setLikeCount((c) => (prev ? c + 1 : c - 1));
        }
    }

    async function openComments() {
        const next = !showComments;
        setShowComments(next);
        if (next && comments.length === 0) {
            setLoadingComments(true);
            try {
                const res = await fetch(`/api/posts/${post.id}/comments`);
                const data = await res.json();
                setComments(data.comments ?? []);
            } finally {
                setLoadingComments(false);
            }
        }
        if (next) setTimeout(() => commentInputRef.current?.focus(), 150);
    }

    async function submitComment(e: React.FormEvent) {
        e.preventDefault();
        if (!session || !commentText.trim() || submitting) return;
        setSubmitting(true);
        try {
            const res = await fetch(`/api/posts/${post.id}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: commentText.trim() }),
            });
            if (res.ok) {
                const newComment: CommentData = await res.json();
                setComments((prev) => [...prev, newComment]);
                setCommentCount((c) => c + 1);
                setCommentText("");
            }
        } finally {
            setSubmitting(false);
        }
    }

    async function deletePost() {
        if (!isOwner) return;
        await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
        onDelete?.(post.id);
    }

    const timeAgo = formatDistanceToNow(new Date(post.createdAt), { addSuffix: true });

    return (
        <div className={styles.card}>
            {/* Header */}
            <div className={styles.header}>
                <Link href={`/profile/${post.author.username}`} className={styles.userInfo}>
                    <img
                        src={post.author.avatar ?? `https://api.dicebear.com/7.x/initials/svg?seed=${post.author.name}`}
                        alt={post.author.name ?? post.author.username}
                        className={styles.avatar}
                    />
                    <div className={styles.meta}>
                        <div className={styles.userName}>
                            {post.author.name ?? post.author.username}
                            <Check size={14} className={styles.verified} strokeWidth={3} />
                        </div>
                        <div className={styles.time}>{timeAgo}</div>
                    </div>
                </Link>
                <div style={{ position: "relative" }}>
                    <button className={styles.moreBtn} onClick={() => setShowMenu((v) => !v)}>
                        <MoreHorizontal size={20} />
                    </button>
                    <AnimatePresence>
                        {showMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: -4 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -4 }}
                                transition={{ duration: 0.15 }}
                                className={styles.dropdownMenu}
                                onMouseLeave={() => setShowMenu(false)}
                            >
                                {isOwner && (
                                    <button className={styles.menuItem} onClick={deletePost}>
                                        <Trash2 size={14} />
                                        Delete Post
                                    </button>
                                )}
                                <button className={styles.menuItem} onClick={() => setShowMenu(false)}>
                                    <Bookmark size={14} />
                                    Save Post
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Text */}
            <div className={styles.text}>{post.content}</div>

            {/* Media Grid */}
            {post.mediaUrls.length > 0 && (
                <div className={styles.mediaGrid} data-count={Math.min(post.mediaUrls.length, 4)}>
                    {post.mediaUrls.slice(0, 4).map((url, i) => (
                        <div key={i} className={styles.mediaItem}>
                            <img src={url} alt={`Post media ${i + 1}`} className={styles.postImage} />
                        </div>
                    ))}
                </div>
            )}

            {/* Stats */}
            <div className={styles.stats}>
                {likeCount > 0 && (
                    <>
                        <Heart size={16} className={styles.statsHeart} />
                        <span>{likeCount} {likeCount === 1 ? "like" : "likes"}</span>
                    </>
                )}
                {commentCount > 0 && (
                    <span
                        className={styles.commentCountLink}
                        onClick={openComments}
                        style={{ marginLeft: likeCount > 0 ? "auto" : undefined, cursor: "pointer" }}
                    >
                        {commentCount} {commentCount === 1 ? "comment" : "comments"}
                    </span>
                )}
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <div className={styles.actionGroup}>
                    <motion.button
                        className={`${styles.actionBtn} ${styles.likeBtn} ${liked ? styles.liked : ""}`}
                        onClick={toggleLike}
                        whileTap={{ scale: 0.85 }}
                    >
                        <Heart size={20} className={liked ? styles.heartFilled : ""} />
                        <span>{liked ? "Liked" : "Like"}</span>
                    </motion.button>
                    <button className={`${styles.actionBtn} ${styles.commentBtn}`} onClick={openComments}>
                        <MessageCircle size={20} />
                        <span>Comment</span>
                    </button>
                    <button className={styles.actionBtn}>
                        <Share2 size={20} />
                        <span>Share</span>
                    </button>
                </div>
                <button className={styles.actionBtn}>
                    <Bookmark size={20} />
                </button>
            </div>

            {/* Comments Section */}
            <AnimatePresence>
                {showComments && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className={styles.commentsSection}
                    >
                        {loadingComments ? (
                            <div className={styles.commentsLoading}>Loading comments...</div>
                        ) : (
                            <div className={styles.commentsList}>
                                {comments.length === 0 && (
                                    <p className={styles.noComments}>Be the first to comment.</p>
                                )}
                                {comments.map((c) => (
                                    <div key={c.id} className={styles.comment}>
                                        <img
                                            src={c.user.avatar ?? `https://api.dicebear.com/7.x/initials/svg?seed=${c.user.name}`}
                                            alt={c.user.name ?? c.user.username}
                                            className={styles.commentAvatar}
                                        />
                                        <div className={styles.commentBody}>
                                            <span className={styles.commentUser}>{c.user.name ?? c.user.username}</span>
                                            <span className={styles.commentText}>{c.content}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {session && (
                            <form className={styles.commentForm} onSubmit={submitComment}>
                                <img
                                    src={session.user?.image ?? `https://api.dicebear.com/7.x/initials/svg?seed=${session.user?.name}`}
                                    alt="You"
                                    className={styles.commentAvatar}
                                />
                                <input
                                    ref={commentInputRef}
                                    className={styles.commentInput}
                                    placeholder="Write a comment..."
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    maxLength={500}
                                    disabled={submitting}
                                />
                                <button
                                    type="submit"
                                    className={styles.commentSubmit}
                                    disabled={!commentText.trim() || submitting}
                                >
                                    <Send size={16} />
                                </button>
                            </form>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
