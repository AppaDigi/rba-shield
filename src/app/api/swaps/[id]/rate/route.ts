import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// POST /api/swaps/[id]/rate  — rate the trade partner after completion
// Body: { ratedUserId: string, score: 1-5, comment?: string }
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id: listingId } = await params;
    const { ratedUserId, score, comment } = await req.json();

    if (!ratedUserId) return NextResponse.json({ error: "ratedUserId required" }, { status: 400 });
    if (typeof score !== "number" || score < 1 || score > 5) return NextResponse.json({ error: "Score must be 1–5" }, { status: 400 });
    if (ratedUserId === session.user.id) return NextResponse.json({ error: "Cannot rate yourself" }, { status: 400 });

    const listing = await prisma.swapListing.findUnique({
        where: { id: listingId },
        include: { offers: { where: { status: "ACCEPTED" } } },
    });
    if (!listing || listing.status !== "COMPLETED") return NextResponse.json({ error: "Trade not completed" }, { status: 400 });

    // Ensure the caller was part of this trade
    const acceptedOffer = listing.offers[0];
    const isAuthor = listing.authorId === session.user.id;
    const isOfferer = acceptedOffer?.offererId === session.user.id;
    if (!isAuthor && !isOfferer) return NextResponse.json({ error: "Not a party to this trade" }, { status: 403 });

    const rating = await prisma.tradeRating.create({
        data: { listingId, raterId: session.user.id, ratedUserId, score, comment: comment?.trim() || null },
    });

    return NextResponse.json(rating, { status: 201 });
}
