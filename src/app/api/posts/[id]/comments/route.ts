import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { createMentionNotifications } from "@/lib/mentions";

// GET /api/posts/[id]/comments?cursor=<cuid>
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: postId } = await params;
    const cursor = req.nextUrl.searchParams.get("cursor");

    const comments = await prisma.comment.findMany({
        where: { postId },
        orderBy: { createdAt: "asc" },
        take: 21,
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        include: {
            user: { select: { id: true, name: true, username: true, avatar: true } },
        },
    });

    const hasMore = comments.length > 20;
    const items = hasMore ? comments.slice(0, 20) : comments;

    return NextResponse.json({
        comments: items,
        nextCursor: hasMore ? items[items.length - 1].id : null,
    });
}

// POST /api/posts/[id]/comments
export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: postId } = await params;
    const { content } = await req.json();

    if (!content || typeof content !== "string" || content.trim().length === 0) {
        return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }
    if (content.trim().length > 500) {
        return NextResponse.json({ error: "Comment too long (max 500 chars)" }, { status: 400 });
    }

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    const comment = await prisma.comment.create({
        data: { userId: session.user.id, postId, content: content.trim() },
        include: {
            user: { select: { id: true, name: true, username: true, avatar: true } },
        },
    });

    await createMentionNotifications({
        actorId: session.user.id,
        content: comment.content,
        entityUrl: `/#post-${postId}`,
        contextLabel: "in a comment in The Lounge",
    });

    return NextResponse.json(comment, { status: 201 });
}
