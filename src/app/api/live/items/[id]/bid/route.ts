import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { liveEmitter } from "@/lib/liveEmitter";

// POST /api/live/items/[id]/bid  — place a bid (amount in dollars, stored as cents)
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Sign in to place bids" }, { status: 401 });
    }

    const { id: itemId } = await params;
    const { amount } = await req.json(); // dollars

    if (!amount || typeof amount !== "number" || amount <= 0) {
        return NextResponse.json({ error: "Invalid bid amount" }, { status: 400 });
    }

    const amountCents = Math.round(amount * 100);

    const item = await prisma.auctionItem.findUnique({
        where: { id: itemId },
        include: { event: { select: { id: true, status: true } } },
    });

    if (!item) return NextResponse.json({ error: "Item not found" }, { status: 404 });
    if (item.status !== "ACTIVE") {
        return NextResponse.json({ error: "Bidding is not open for this item" }, { status: 400 });
    }
    if (item.event.status !== "LIVE") {
        return NextResponse.json({ error: "Event is not live" }, { status: 400 });
    }

    const minimumBid = item.currentBid > 0 ? item.currentBid + 1 : item.startingBid;
    if (amountCents < minimumBid) {
        return NextResponse.json(
            { error: `Minimum bid is $${(minimumBid / 100).toFixed(0)}` },
            { status: 400 }
        );
    }

    // Create bid + update item in a transaction
    const [bid, updatedItem] = await prisma.$transaction([
        prisma.auctionBid.create({
            data: { itemId, userId: session.user.id, amount: amountCents },
            include: { user: { select: { name: true, username: true, avatar: true } } },
        }),
        prisma.auctionItem.update({
            where: { id: itemId },
            data: {
                currentBid: amountCents,
                currentLeaderName: session.user.name ?? session.user.username ?? "Bidder",
            },
        }),
    ]);

    // Award XP for bidding
    await prisma.user.update({
        where: { id: session.user.id },
        data: { xp: { increment: 2 } },
    });

    // Also emit a system chat message about the bid
    const systemMessage = await prisma.liveMessage.create({
        data: {
            eventId: item.event.id,
            type: "SYSTEM",
            content: `${bid.user.name ?? bid.user.username} placed a bid of $${(amountCents / 100).toFixed(0)} on "${item.title}"`,
        },
    });

    liveEmitter.emit(`event:${item.event.id}`, {
        type: "bid",
        data: {
            itemId,
            currentBid: updatedItem.currentBid,
            currentLeaderName: updatedItem.currentLeaderName,
            bidderName: bid.user.name ?? bid.user.username,
            bidAmount: amountCents,
            systemMessage,
        },
    });

    return NextResponse.json({
        success: true,
        currentBid: updatedItem.currentBid,
        bidAmount: amountCents,
    });
}
