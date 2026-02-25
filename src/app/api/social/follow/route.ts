import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// POST /api/social/follow  — toggle follow/unfollow
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetUserId } = await req.json();
    if (!targetUserId || targetUserId === session.user.id) {
        return NextResponse.json({ error: "Invalid target" }, { status: 400 });
    }

    const existing = await prisma.follow.findUnique({
        where: {
            followerId_followingId: {
                followerId: session.user.id,
                followingId: targetUserId,
            },
        },
    });

    if (existing) {
        // Unfollow
        await prisma.follow.delete({
            where: { id: existing.id },
        });
        const count = await prisma.follow.count({ where: { followingId: targetUserId } });
        return NextResponse.json({ following: false, followerCount: count });
    } else {
        // Follow
        await prisma.follow.create({
            data: {
                followerId: session.user.id,
                followingId: targetUserId,
            },
        });
        // Reward XP for gaining a new follower
        await prisma.user.update({
            where: { id: targetUserId },
            data: { xp: { increment: 10 } },
        });
        const count = await prisma.follow.count({ where: { followingId: targetUserId } });
        return NextResponse.json({ following: true, followerCount: count });
    }
}

// GET /api/social/follow?targetUserId=xxx  — check follow status
export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ following: false, followerCount: 0 });
    }

    const targetUserId = req.nextUrl.searchParams.get("targetUserId");
    if (!targetUserId) {
        return NextResponse.json({ error: "Missing targetUserId" }, { status: 400 });
    }

    const [existing, count] = await Promise.all([
        prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: session.user.id,
                    followingId: targetUserId,
                },
            },
        }),
        prisma.follow.count({ where: { followingId: targetUserId } }),
    ]);

    return NextResponse.json({ following: !!existing, followerCount: count });
}
