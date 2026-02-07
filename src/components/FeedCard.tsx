"use client";

import { Heart, MessageCircle, Share2, MoreHorizontal, Check, Bookmark } from "lucide-react";
import Image from "next/image";
import styles from "./FeedCard.module.css";
import { motion } from "framer-motion";

interface FeedCardProps {
    name: string;
    avatar: string;
    time: string;
    text: string;
    image?: string;
    likes: number;
    comments: number;
}

export default function FeedCard({ name, avatar, time, text, image, likes, comments }: FeedCardProps) {
    return (
        <div className={styles.card}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.userInfo}>
                    <img src={avatar} alt={name} className={styles.avatar} />
                    <div className={styles.meta}>
                        <div className={styles.userName}>
                            {name}
                            <Check size={14} className={styles.verified} strokeWidth={3} />
                        </div>
                        <div className={styles.time}>{time}</div>
                    </div>
                </div>
                <button className={styles.moreBtn}>
                    <MoreHorizontal size={20} />
                </button>
            </div>

            {/* Media or Text first? Usually Text first in Facebook style, Media first in Insta. Let's do Text, THEN Media */}
            <div className={styles.text}>{text}</div>

            {/* Media (Conditional) */}
            {image && (
                <div className={styles.imageWrapper}>
                    <img src={image} alt="Post content" className={styles.postImage} />
                </div>
            )}

            {/* Stats/Actions Bar */}
            <div className={styles.stats}>
                <Heart size={16} className="text-red-500 fill-red-500" />
                <span>Liked by <span className={styles.likedBy}>Geneva Cigar Society</span> and <span className={styles.likedBy}>{likes} others</span></span>
            </div>

            <div className={styles.actions}>
                <div className={styles.actionGroup}>
                    <button className={`${styles.actionBtn} ${styles.likeBtn}`}>
                        <Heart size={20} />
                        <span>Like</span>
                    </button>
                    <button className={`${styles.actionBtn} ${styles.commentBtn}`}>
                        <MessageCircle size={20} />
                        <span>Comment ({comments})</span>
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
        </div>
    );
}
