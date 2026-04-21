import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/live/my-bids — user's auction bid history, most recent bid per item
export async function GET() {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // Get the latest bid per item for this user
    const bids = await prisma.auctionBid.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: {
            item: {
                select: {
                    id: true,
                    title: true,
                    currentBid: true,
                    currentLeaderName: true,
                    status: true,
                    event: { select: { id: true, title: true, status: true } },
                },
            },
        },
    });

    // Deduplicate: one entry per item (already ordered desc, so first = latest)
    const seen = new Set<string>();
    const deduped = bids.filter(b => {
        if (seen.has(b.itemId)) return false;
        seen.add(b.itemId);
        return true;
    });

    return NextResponse.json(deduped);
}
