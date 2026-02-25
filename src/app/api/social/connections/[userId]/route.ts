import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/social/connections/[userId]
export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    const { userId } = await params;
    const type = req.nextUrl.searchParams.get("type") ?? "followers";

    const currentUserId = req.headers.get("x-user-id") ?? undefined;

    if (type === "followers") {
        const follows = await prisma.follow.findMany({
            where: { followingId: userId },
            include: {
                follower: {
                    select: {
                        id: true, username: true, name: true, avatar: true, xp: true,
                        _count: { select: { followers: true } }
                    },
                },
            },
            take: 50,
        });
        return NextResponse.json(follows.map((f: { follower: unknown }) => f.follower));
    }

    if (type === "following") {
        const follows = await prisma.follow.findMany({
            where: { followerId: userId },
            include: {
                following: {
                    select: {
                        id: true, username: true, name: true, avatar: true, xp: true,
                        _count: { select: { followers: true } }
                    },
                },
            },
            take: 50,
        });
        return NextResponse.json(follows.map((f: { following: unknown }) => f.following));
    }

    if (type === "mutual" && currentUserId) {
        // Mutual: people who the target follows AND who follow the current user
        const mutuals = await prisma.user.findMany({
            where: {
                followers: { some: { followerId: userId } },
                following: { some: { followingId: currentUserId } },
            },
            select: {
                id: true, username: true, name: true, avatar: true, xp: true,
                _count: { select: { followers: true } }
            },
            take: 10,
        });
        return NextResponse.json(mutuals);
    }

    if (type === "suggestions") {
        // Suggest users that userId is NOT already following, ordered by followers desc
        const following = await prisma.follow.findMany({
            where: { followerId: userId },
            select: { followingId: true },
        });
        const followingIds = following.map((f: { followingId: string }) => f.followingId);
        followingIds.push(userId); // exclude self

        const suggestions = await prisma.user.findMany({
            where: { id: { notIn: followingIds } },
            select: {
                id: true, username: true, name: true, avatar: true, xp: true,
                _count: { select: { followers: true } },
            },
            orderBy: { followers: { _count: "desc" } },
            take: 5,
        });
        return NextResponse.json(suggestions);
    }

    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}
