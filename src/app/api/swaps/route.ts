import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/swaps?filter=all|mine|incoming&cursor=
export async function GET(req: NextRequest) {
    const session = await auth();
    const { searchParams } = req.nextUrl;
    const filter = searchParams.get("filter") ?? "all";
    const cursor = searchParams.get("cursor");
    const limit = 12;

    let where: Record<string, unknown> = { status: "OPEN" };
    if (filter === "mine" && session?.user?.id) {
        where = { authorId: session.user.id };
    } else if (filter === "incoming" && session?.user?.id) {
        // Listings where someone made an offer on yours
        where = {
            authorId: session.user.id,
            offers: { some: { status: "PENDING" } },
        };
    }

    const listings = await prisma.swapListing.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit + 1,
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        include: {
            author: { select: { id: true, name: true, username: true, avatar: true, xp: true } },
            _count: { select: { offers: true } },
        },
    });

    const hasMore = listings.length > limit;
    const items = hasMore ? listings.slice(0, limit) : listings;

    return NextResponse.json({
        listings: items,
        nextCursor: hasMore ? items[items.length - 1].id : null,
    });
}

// POST /api/swaps  — create a swap listing
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { offeringName, offeringImage, wantDescription, message, humidorItemId } = await req.json();
    if (!offeringName?.trim()) return NextResponse.json({ error: "Offering name is required" }, { status: 400 });
    if (!wantDescription?.trim()) return NextResponse.json({ error: "Want description is required" }, { status: 400 });

    // Validate humidorItemId if provided
    if (humidorItemId) {
        const item = await prisma.humidorItem.findUnique({ where: { id: humidorItemId } });
        if (!item || item.userId !== session.user.id) {
            return NextResponse.json({ error: "Invalid humidor item" }, { status: 400 });
        }
    }

    const listing = await prisma.swapListing.create({
        data: {
            authorId: session.user.id,
            offeringName: offeringName.trim(),
            offeringImage: offeringImage?.trim() || null,
            wantDescription: wantDescription.trim(),
            message: message?.trim() || null,
            humidorItemId: humidorItemId || null,
        },
        include: {
            author: { select: { id: true, name: true, username: true, avatar: true, xp: true } },
            _count: { select: { offers: true } },
        },
    });

    return NextResponse.json(listing, { status: 201 });
}
