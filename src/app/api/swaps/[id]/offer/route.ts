import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// POST /api/swaps/[id]/offer  — make a trade offer on a listing
export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Sign in to make offers" }, { status: 401 });

    const { id: listingId } = await params;
    const { offeringName, message } = await req.json();
    if (!offeringName?.trim()) return NextResponse.json({ error: "Offering name is required" }, { status: 400 });

    const listing = await prisma.swapListing.findUnique({ where: { id: listingId } });
    if (!listing) return NextResponse.json({ error: "Listing not found" }, { status: 404 });
    if (listing.status !== "OPEN") return NextResponse.json({ error: "This listing is no longer open" }, { status: 400 });
    if (listing.authorId === session.user.id) return NextResponse.json({ error: "Cannot offer on your own listing" }, { status: 400 });

    // One pending offer per user per listing
    const existing = await prisma.tradeOffer.findFirst({
        where: { listingId, offererId: session.user.id, status: "PENDING" },
    });
    if (existing) return NextResponse.json({ error: "You already have a pending offer on this listing" }, { status: 400 });

    const offer = await prisma.tradeOffer.create({
        data: {
            listingId,
            offererId: session.user.id,
            offeringName: offeringName.trim(),
            message: message?.trim() || null,
        },
        include: {
            offerer: { select: { id: true, name: true, username: true, avatar: true } },
        },
    });

    // Move listing to IN_NEGOTIATION
    await prisma.swapListing.update({ where: { id: listingId }, data: { status: "IN_NEGOTIATION" } });

    return NextResponse.json(offer, { status: 201 });
}
