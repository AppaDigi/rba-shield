import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ id: string }>;

// GET /api/societies/[id]/posts — paginated posts for a society
export async function GET(req: NextRequest, { params }: { params: Params }) {
    const session = await auth();
    const { id } = await params;
    const cursor = req.nextUrl.searchParams.get("cursor");

    const society = await prisma.society.findFirst({
        where: { OR: [{ id }, { slug: id }] },
    });
    if (!society) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const posts = await prisma.post.findMany({
        where: { societyId: society.id },
        orderBy: { createdAt: "desc" },
        take: 11,
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        include: {
            author: { select: { id: true, name: true, username: true, avatar: true } },
            _count: { select: { likes: true, comments: true } },
            ...(session?.user?.id
                ? { likes: { where: { userId: session.user.id }, select: { id: true } } }
                : {}),
        },
    });

    const hasMore = posts.length > 10;
    const items = hasMore ? posts.slice(0, 10) : posts;

    return NextResponse.json({
        posts: items.map(p => ({
            ...p,
            likeCount: p._count.likes,
            commentCount: p._count.comments,
            likedByMe: ((p as { likes?: { id: string }[] }).likes?.length ?? 0) > 0,
            _count: undefined,
            likes: undefined,
        })),
        nextCursor: hasMore ? items[items.length - 1].id : null,
    });
}

// POST /api/societies/[id]/posts — create a post in the society
export async function POST(req: NextRequest, { params }: { params: Params }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;

    const society = await prisma.society.findFirst({
        where: { OR: [{ id }, { slug: id }] },
    });
    if (!society) return NextResponse.json({ error: "Not found" }, { status: 404 });

    // Must be a member
    const membership = await prisma.societyMember.findUnique({
        where: { societyId_userId: { societyId: society.id, userId: session.user.id } },
    });
    if (!membership) return NextResponse.json({ error: "Join the society to post" }, { status: 403 });

    const { content } = await req.json();
    if (!content?.trim()) return NextResponse.json({ error: "Content required" }, { status: 400 });

    const post = await prisma.post.create({
        data: { authorId: session.user.id, societyId: society.id, content: content.trim() },
        include: {
            author: { select: { id: true, name: true, username: true, avatar: true } },
            _count: { select: { likes: true, comments: true } },
        },
    });

    return NextResponse.json({
        ...post,
        likeCount: post._count.likes,
        commentCount: post._count.comments,
        likedByMe: false,
        _count: undefined,
    }, { status: 201 });
}
