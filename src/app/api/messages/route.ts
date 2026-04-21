import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/messages — list conversations for current user
export async function GET() {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const conversations = await prisma.conversation.findMany({
        where: { participants: { some: { userId: session.user.id } } },
        orderBy: { updatedAt: "desc" },
        include: {
            participants: {
                where: { userId: { not: session.user.id } },
                include: { user: { select: { id: true, name: true, username: true, avatar: true } } },
            },
            messages: {
                orderBy: { createdAt: "desc" },
                take: 1,
            },
        },
    });

    const result = conversations.map(c => ({
        id: c.id,
        updatedAt: c.updatedAt,
        other: c.participants[0]?.user ?? null,
        lastMessage: c.messages[0] ?? null,
    }));

    return NextResponse.json(result);
}

// POST /api/messages — start or find existing conversation with a user
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { userId } = await req.json();
    if (!userId || userId === session.user.id) {
        return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }

    // Find existing conversation between these two users
    const existing = await prisma.conversation.findFirst({
        where: {
            AND: [
                { participants: { some: { userId: session.user.id } } },
                { participants: { some: { userId } } },
            ],
        },
    });

    if (existing) return NextResponse.json({ id: existing.id });

    const conversation = await prisma.conversation.create({
        data: {
            participants: {
                create: [{ userId: session.user.id }, { userId }],
            },
        },
    });

    return NextResponse.json({ id: conversation.id });
}
