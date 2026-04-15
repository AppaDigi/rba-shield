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
        const [post, actor] = await Promise.all([
            prisma.post.findUnique({ where: { id: postId }, select: { authorId: true } }),
            prisma.user.findUnique({ where: { id: userId }, select: { name: true, username: true, avatar: true } }),
            prisma.like.create({ data: { userId, postId } }),
        ]);

        // Notify post author (not self-likes)
        if (post && post.authorId !== userId) {
            prisma.notification.create({
                data: {
                    userId: post.authorId,
                    type: "LIKE",
                    actorName: actor?.name ?? actor?.username ?? null,
                    actorAvatar: actor?.avatar ?? null,
                    body: `${actor?.name ?? actor?.username ?? "Someone"} liked your post.`,
                    entityUrl: "/",
                },
            }).catch(() => {});
        }
    }

    const likeCount = await prisma.like.count({ where: { postId } });
    return NextResponse.json({ liked: !existing, likeCount });
}
