import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/posts?feed=latest|trending|friends&cursor=<cuid>&limit=10
export async function GET(req: NextRequest) {
    const session = await auth();
    const { searchParams } = req.nextUrl;
    const feed = searchParams.get("feed") ?? "latest"; // latest | trending | friends
    const cursor = searchParams.get("cursor");
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "10"), 50);

    const userId = session?.user?.id ?? null;

    // Build where clause
    let where: Record<string, unknown> = {};
    if (feed === "friends" && userId) {
        const following = await prisma.follow.findMany({
            where: { followerId: userId },
            select: { followingId: true },
        });
        const followingIds = following.map((f) => f.followingId);
        where = { authorId: { in: [...followingIds, userId] } };
    }

    // Build orderBy
    const orderBy =
        feed === "trending"
            ? [{ likes: { _count: "desc" as const } }, { createdAt: "desc" as const }]
            : [{ createdAt: "desc" as const }];

    const posts = await prisma.post.findMany({
        where,
        orderBy,
        take: limit + 1,
        ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
        include: {
            author: {
                select: { id: true, name: true, username: true, avatar: true, xp: true },
            },
            _count: { select: { likes: true, comments: true } },
            // Include current user's like status
            likes: userId
                ? { where: { userId }, select: { id: true } }
                : false,
        },
    });

    const hasMore = posts.length > limit;
    const items = hasMore ? posts.slice(0, limit) : posts;

    const formatted = items.map((post) => ({
        id: post.id,
        content: post.content,
        mediaUrls: post.mediaUrls ? (JSON.parse(post.mediaUrls) as string[]) : [],
        createdAt: post.createdAt,
        author: post.author,
        likeCount: post._count.likes,
        commentCount: post._count.comments,
        likedByMe: userId ? (post.likes as { id: string }[]).length > 0 : false,
    }));

    return NextResponse.json({
        posts: formatted,
        nextCursor: hasMore ? items[items.length - 1].id : null,
    });
}

// POST /api/posts  — create a post
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, mediaUrls } = await req.json();
    if (!content || typeof content !== "string" || content.trim().length === 0) {
        return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }
    if (content.trim().length > 2000) {
        return NextResponse.json({ error: "Content too long (max 2000 chars)" }, { status: 400 });
    }

    const urls: string[] = Array.isArray(mediaUrls) ? mediaUrls.slice(0, 4) : [];

    const post = await prisma.post.create({
        data: {
            authorId: session.user.id,
            content: content.trim(),
            mediaUrls: urls.length > 0 ? JSON.stringify(urls) : null,
        },
        include: {
            author: {
                select: { id: true, name: true, username: true, avatar: true, xp: true },
            },
            _count: { select: { likes: true, comments: true } },
        },
    });

    // Award XP for posting
    await prisma.user.update({
        where: { id: session.user.id },
        data: { xp: { increment: 5 } },
    });

    return NextResponse.json({
        id: post.id,
        content: post.content,
        mediaUrls: post.mediaUrls ? JSON.parse(post.mediaUrls) : [],
        createdAt: post.createdAt,
        author: post.author,
        likeCount: 0,
        commentCount: 0,
        likedByMe: false,
    });
}
