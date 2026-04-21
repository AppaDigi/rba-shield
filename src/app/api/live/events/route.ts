import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/live/events  — list LIVE then SCHEDULED events
export async function GET() {
    const events = await prisma.liveEvent.findMany({
        where: { status: { in: ["LIVE", "SCHEDULED"] } },
        orderBy: [
            { status: "asc" }, // LIVE comes before SCHEDULED alphabetically — handled in sort below
            { createdAt: "desc" },
        ],
        include: {
            _count: { select: { items: true } },
        },
    });

    // Put LIVE first
    const sorted = [...events].sort((a, b) => {
        if (a.status === "LIVE" && b.status !== "LIVE") return -1;
        if (b.status === "LIVE" && a.status !== "LIVE") return 1;
        return 0;
    });

    return NextResponse.json(sorted);
}
