"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserPlus, UserCheck, UserMinus, Loader2 } from "lucide-react";
import styles from "./FollowButton.module.css";

interface Props {
    targetUserId: string;
    initialFollowing?: boolean;
    initialCount?: number;
    showCount?: boolean;
    onCountChange?: (count: number) => void;
}

export default function FollowButton({
    targetUserId,
    initialFollowing,
    initialCount,
    showCount = false,
    onCountChange,
}: Props) {
    const { data: session } = useSession();
    const [following, setFollowing] = useState(initialFollowing ?? false);
    const [count, setCount] = useState(initialCount ?? 0);
    const [loading, setLoading] = useState(initialFollowing === undefined);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        if (!session?.user?.id || initialFollowing !== undefined) return;
        fetch(`/api/social/follow?targetUserId=${targetUserId}`)
            .then((r) => r.json())
            .then((data) => {
                setFollowing(data.following);
                setCount(data.followerCount);
                setLoading(false);
            });
    }, [targetUserId, session, initialFollowing]);

    async function toggle() {
        if (!session?.user) return;
        setLoading(true);
        const res = await fetch("/api/social/follow", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ targetUserId }),
        });
        const data = await res.json();
        setFollowing(data.following);
        setCount(data.followerCount);
        onCountChange?.(data.followerCount);
        setLoading(false);
    }

    const isUnfollowing = following && hovered;

    return (
        <button
            className={`${styles.btn} ${following ? styles.following : styles.notFollowing} ${isUnfollowing ? styles.unfollowing : ""}`}
            onClick={toggle}
            disabled={loading || !session?.user}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {loading ? (
                <Loader2 size={15} className={styles.spinner} />
            ) : following ? (
                isUnfollowing ? <UserMinus size={15} /> : <UserCheck size={15} />
            ) : (
                <UserPlus size={15} />
            )}
            {loading ? "Loading" : following ? (isUnfollowing ? "Unfollow" : "Following") : "Follow"}
            {showCount && <span className={styles.count}>{count.toLocaleString()}</span>}
        </button>
    );
}
