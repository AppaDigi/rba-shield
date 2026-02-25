import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// POST /api/social/friend-request
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { targetUserId, action } = await req.json();
    const myId = session.user.id;

    if (!targetUserId || targetUserId === myId) {
        return NextResponse.json({ error: "Invalid target" }, { status: 400 });
    }

    if (action === "send") {
        const existing = await prisma.friendRequest.findUnique({
            where: { senderId_receiverId: { senderId: myId, receiverId: targetUserId } },
        });
        if (existing) {
            return NextResponse.json({ status: existing.status });
        }
        const request = await prisma.friendRequest.create({
            data: { senderId: myId, receiverId: targetUserId },
        });
        return NextResponse.json({ status: request.status }, { status: 201 });
    }

    if (action === "accept" || action === "decline") {
        const request = await prisma.friendRequest.findUnique({
            where: { senderId_receiverId: { senderId: targetUserId, receiverId: myId } },
        });
        if (!request) {
            return NextResponse.json({ error: "Request not found" }, { status: 404 });
        }
        const updated = await prisma.friendRequest.update({
            where: { id: request.id },
            data: { status: action === "accept" ? "ACCEPTED" : "DECLINED" },
        });

        // If accepted, auto follow each other
        if (action === "accept") {
            await Promise.all([
                prisma.follow.upsert({
                    where: { followerId_followingId: { followerId: myId, followingId: targetUserId } },
                    update: {},
                    create: { followerId: myId, followingId: targetUserId },
                }),
                prisma.follow.upsert({
                    where: { followerId_followingId: { followerId: targetUserId, followingId: myId } },
                    update: {},
                    create: { followerId: targetUserId, followingId: myId },
                }),
            ]);
        }
        return NextResponse.json({ status: updated.status });
    }

    if (action === "cancel") {
        await prisma.friendRequest.deleteMany({
            where: { senderId: myId, receiverId: targetUserId },
        });
        return NextResponse.json({ status: "CANCELLED" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

// GET /api/social/friend-request?targetUserId=xxx
export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ status: null });
    }

    const targetUserId = req.nextUrl.searchParams.get("targetUserId");
    if (!targetUserId) return NextResponse.json({ status: null });

    const myId = session.user.id;
    const request = await prisma.friendRequest.findFirst({
        where: {
            OR: [
                { senderId: myId, receiverId: targetUserId },
                { senderId: targetUserId, receiverId: myId },
            ],
        },
    });

    return NextResponse.json({ status: request?.status ?? null, direction: request?.senderId === myId ? "sent" : "received" });
}
