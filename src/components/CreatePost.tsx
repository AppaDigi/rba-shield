"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Image as ImageIcon, X, Plus, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CreatePost.module.css";
import type { FeedPost } from "./FeedCard";
import { useMentionSearch } from "@/lib/useMentionSearch";
import MentionDropdown from "./MentionDropdown";

interface CreatePostProps {
    onPostCreated: (post: FeedPost) => void;
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
    const { data: session } = useSession();
    const [expanded, setExpanded] = useState(false);
    const [content, setContent] = useState("");
    const [mediaUrls, setMediaUrls] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const mention = useMentionSearch();

    if (!session) return null;

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const files = Array.from(e.target.files ?? []);
        if (files.length === 0) return;
        if (mediaUrls.length + files.length > 4) {
            alert("Maximum 4 images per post.");
            return;
        }
        setUploading(true);
        try {
            const uploaded: string[] = [];
            for (const file of files) {
                const form = new FormData();
                form.append("file", file);
                const res = await fetch("/api/posts/upload", { method: "POST", body: form });
                if (res.ok) {
                    const { url } = await res.json();
                    uploaded.push(url);
                }
            }
            setMediaUrls((prev) => [...prev, ...uploaded]);
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    }

    function removeMedia(index: number) {
        setMediaUrls((prev) => prev.filter((_, i) => i !== index));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!content.trim() || submitting) return;
        setSubmitting(true);
        try {
            const res = await fetch("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content: content.trim(), mediaUrls }),
            });
            if (res.ok) {
                const newPost: FeedPost = await res.json();
                onPostCreated(newPost);
                setContent("");
                setMediaUrls([]);
                setExpanded(false);
            }
        } finally {
            setSubmitting(false);
        }
    }

    function handleFocus() {
        setExpanded(true);
        setTimeout(() => textareaRef.current?.focus(), 50);
    }

    const canSubmit = content.trim().length > 0 && !submitting && !uploading;

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <img
                src={session.user?.image ?? `https://api.dicebear.com/7.x/initials/svg?seed=${session.user?.name}`}
                alt="You"
                className={styles.avatar}
            />
            <div className={styles.inputArea}>
                {!expanded ? (
                    <div className={styles.placeholder} onClick={handleFocus}>
                        Share your latest smoke...
                    </div>
                ) : (
                    <>
                        <div style={{ position: "relative" }}>
                        <textarea
                            ref={textareaRef}
                            className={styles.textarea}
                            placeholder="Share your latest smoke... Try tagging someone with @username"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                mention.detect(e.target.value, e.target.selectionStart ?? e.target.value.length);
                            }}
                            onKeyDown={(e) => {
                                if (!mention.open) return;
                                if (e.key === "ArrowDown") {
                                    e.preventDefault();
                                    mention.setSelectedIndex((i) => Math.min(i + 1, mention.results.length - 1));
                                } else if (e.key === "ArrowUp") {
                                    e.preventDefault();
                                    mention.setSelectedIndex((i) => Math.max(i - 1, 0));
                                } else if (e.key === "Enter" || e.key === "Tab") {
                                    e.preventDefault();
                                    const user = mention.results[mention.selectedIndex];
                                    if (user && mention.query !== null) {
                                        const { newValue, newCursor } = mention.insert(content, user.username, mention.query, mention.mentionStart);
                                        setContent(newValue);
                                        mention.dismiss();
                                        setTimeout(() => {
                                            if (textareaRef.current) {
                                                textareaRef.current.selectionStart = newCursor;
                                                textareaRef.current.selectionEnd = newCursor;
                                            }
                                        }, 0);
                                    }
                                } else if (e.key === "Escape") {
                                    mention.dismiss();
                                }
                            }}
                            maxLength={2000}
                            rows={3}
                        />
                        <MentionDropdown
                            open={mention.open}
                            results={mention.results}
                            selectedIndex={mention.selectedIndex}
                            onSelect={(user) => {
                                if (mention.query !== null) {
                                    const { newValue, newCursor } = mention.insert(content, user.username, mention.query, mention.mentionStart);
                                    setContent(newValue);
                                    mention.dismiss();
                                    setTimeout(() => {
                                        if (textareaRef.current) {
                                            textareaRef.current.selectionStart = newCursor;
                                            textareaRef.current.selectionEnd = newCursor;
                                            textareaRef.current.focus();
                                        }
                                    }, 0);
                                }
                            }}
                            onDismiss={mention.dismiss}
                        />
                        </div>

                        {/* Media Previews */}
                        <AnimatePresence>
                            {mediaUrls.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={styles.mediaPreviews}
                                >
                                    {mediaUrls.map((url, i) => (
                                        <div key={i} className={styles.previewItem}>
                                            <img src={url} alt={`Upload ${i + 1}`} className={styles.previewImage} />
                                            <button
                                                type="button"
                                                className={styles.removeMedia}
                                                onClick={() => removeMedia(i)}
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className={styles.toolbar}>
                            <div className={styles.toolbarLeft}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    multiple
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="button"
                                    className={styles.toolBtn}
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading || mediaUrls.length >= 4}
                                    title="Add photos"
                                >
                                    {uploading ? <Loader2 size={18} className={styles.spin} /> : <ImageIcon size={18} />}
                                </button>
                                <span className={styles.charCount}>{content.length}/2000</span>
                            </div>
                            <div className={styles.toolbarRight}>
                                <button
                                    type="button"
                                    className={styles.cancelBtn}
                                    onClick={() => { setExpanded(false); setContent(""); setMediaUrls([]); }}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className={styles.postBtn} disabled={!canSubmit}>
                                    {submitting ? <Loader2 size={16} className={styles.spin} /> : <Plus size={16} />}
                                    Post
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </form>
    );
}
