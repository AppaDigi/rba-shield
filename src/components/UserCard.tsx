"use client";

import Link from "next/link";
import { getTier } from "@/lib/connoisseur";
import FollowButton from "./FollowButton";
import styles from "./UserCard.module.css";

interface UserCardData {
    id: string;
    username: string;
    name: string | null;
    avatar: string | null;
    xp: number;
    _count?: { followers: number };
}

interface Props {
    user: UserCardData;
    showFollow?: boolean;
}

export default function UserCard({ user, showFollow = true }: Props) {
    const tier = getTier(user.xp);

    return (
        <div className={styles.card}>
            <Link href={`/profile/${user.username}`} className={styles.userInfo}>
                <div className={styles.avatarWrapper}>
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name ?? user.username} className={styles.avatar} />
                    ) : (
                        <div className={styles.avatarPlaceholder}>
                            {(user.name ?? user.username).charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div
                        className={styles.levelDot}
                        style={{ background: tier.color, boxShadow: `0 0 6px ${tier.color}88` }}
                    />
                </div>
                <div className={styles.info}>
                    <span className={styles.name}>{user.name ?? user.username}</span>
                    <span className={styles.username}>@{user.username}</span>
                    <span className={styles.tier} style={{ color: tier.color }}>
                        {tier.title}
                    </span>
                </div>
            </Link>
            {showFollow && (
                <FollowButton targetUserId={user.id} />
            )}
        </div>
    );
}
