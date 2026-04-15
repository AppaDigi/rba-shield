import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// POST /api/posts/[id]/like  — toggle like
export async function POST(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;
    const userId = session.user.id;

    const existing = await prisma.like.findUnique({
        where: { userId_postId: { userId, postId } },
    });

    if (existing) {
        await prisma.like.delete({ where: { id: existing.id } });
    } else {
        await prisma.like.create({ data: { userId, postId } });
    }

    const likeCount = await prisma.like.count({ where: { postId } });
    return NextResponse.json({ liked: !existing, likeCount });
}
