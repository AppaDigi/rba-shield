import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// POST /api/swaps/[id]/respond  — accept or decline an offer
// Body: { offerId: string, action: "ACCEPT" | "DECLINE" }
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: listingId } = await params;
    const { offerId, action } = await req.json();
    if (!["ACCEPT", "DECLINE"].includes(action)) return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    const listing = await prisma.swapListing.findUnique({ where: { id: listingId } });
    if (!listing || listing.authorId !== session.user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const offer = await prisma.tradeOffer.findUnique({ where: { id: offerId } });
    if (!offer || offer.listingId !== listingId) return NextResponse.json({ error: "Offer not found" }, { status: 404 });

    if (action === "ACCEPT") {
        await prisma.$transaction([
            // Accept the chosen offer
            prisma.tradeOffer.update({ where: { id: offerId }, data: { status: "ACCEPTED" } }),
            // Decline all other pending offers on the same listing
            prisma.tradeOffer.updateMany({
                where: { listingId, id: { not: offerId }, status: "PENDING" },
                data: { status: "DECLINED" },
            }),
            // Mark listing as completed
            prisma.swapListing.update({ where: { id: listingId }, data: { status: "COMPLETED" } }),
            // Award XP + tradeCount to both parties
            prisma.user.update({ where: { id: session.user.id }, data: { xp: { increment: 50 }, tradeCount: { increment: 1 } } }),
            prisma.user.update({ where: { id: offer.offererId }, data: { xp: { increment: 50 }, tradeCount: { increment: 1 } } }),
        ]);
    } else {
        await prisma.tradeOffer.update({ where: { id: offerId }, data: { status: "DECLINED" } });
        // If no more pending offers, reopen listing
        const pendingCount = await prisma.tradeOffer.count({ where: { listingId, status: "PENDING" } });
        if (pendingCount === 0) {
            await prisma.swapListing.update({ where: { id: listingId }, data: { status: "OPEN" } });
        }
    }

    return NextResponse.json({ success: true, action });
}
