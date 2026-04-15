import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/stories — active stories grouped by author (expires in 24h)
export async function GET() {
    const now = new Date();

    const stories = await prisma.story.findMany({
        where: { expiresAt: { gt: now } },
        orderBy: { createdAt: "desc" },
        take: 50,
        include: {
            author: { select: { id: true, name: true, username: true, avatar: true } },
        },
    });

    // Group by author, deduplicate (first story per user)
    const seen = new Set<string>();
    const grouped = stories.filter(s => {
        if (seen.has(s.authorId)) return false;
        seen.add(s.authorId);
        return true;
    });

    return NextResponse.json(grouped);
}

// POST /api/stories — create a story (24hr expiry)
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { imageUrl, caption } = await req.json();
    if (!imageUrl?.trim()) return NextResponse.json({ error: "imageUrl required" }, { status: 400 });

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const story = await prisma.story.create({
        data: {
            authorId: session.user.id,
            imageUrl: imageUrl.trim(),
            caption: caption?.trim() || null,
            expiresAt,
        },
        include: { author: { select: { id: true, name: true, username: true, avatar: true } } },
    });

    return NextResponse.json(story, { status: 201 });
}
