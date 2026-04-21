"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// /live/demo → redirect to the first LIVE event
export default function LiveDemoRedirect() {
    const router = useRouter();

    useEffect(() => {
        fetch("/api/live/events")
            .then((r) => r.json())
            .then((events: { id: string; status: string }[]) => {
                const live = events.find((e) => e.status === "LIVE") ?? events[0];
                if (live) {
                    router.replace(`/live/${live.id}`);
                } else {
                    router.replace("/live");
                }
            })
            .catch(() => router.replace("/live"));
    }, [router]);

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
            <Loader2 size={28} style={{ animation: "spin 0.7s linear infinite", color: "var(--accent-primary)" }} />
        </div>
    );
}
