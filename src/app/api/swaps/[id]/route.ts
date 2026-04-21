import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/swaps/[id]  — listing detail with all offers
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const listing = await prisma.swapListing.findUnique({
        where: { id },
        include: {
            author: { select: { id: true, name: true, username: true, avatar: true, xp: true } },
            offers: {
                orderBy: { createdAt: "asc" },
                include: {
                    offerer: { select: { id: true, name: true, username: true, avatar: true, xp: true } },
                },
            },
            ratings: {
                include: {
                    rater: { select: { name: true, username: true } },
                },
            },
        },
    });
    if (!listing) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(listing);
}

// DELETE /api/swaps/[id]  — cancel/remove listing (owner only)
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const listing = await prisma.swapListing.findUnique({ where: { id } });
    if (!listing || listing.authorId !== session.user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.swapListing.update({ where: { id }, data: { status: "CANCELLED" } });
    return NextResponse.json({ success: true });
}
