"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileRedirectPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (session?.user?.username) {
            router.replace(`/profile/${session.user.username}`);
        } else {
            router.replace("/auth/login?callbackUrl=/profile");
        }
    }, [session, status, router]);

    return null;
}
