import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

// GET /api/profile/[username]
export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ username: string }> }
) {
    const { username } = await params;
    const user = await prisma.user.findUnique({
        where: { username },
        select: {
            id: true,
            username: true,
            name: true,
            bio: true,
            avatar: true,
            location: true,
            xp: true,
            cigarsLogged: true,
            reviewCount: true,
            tradeCount: true,
            createdAt: true,
            _count: {
                select: { followers: true, following: true },
            },
        },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
}

const updateSchema = z.object({
    name: z.string().min(2).max(60).optional(),
    bio: z.string().max(300).optional(),
    location: z.string().max(60).optional(),
    avatar: z.string().optional(),
});

// PATCH /api/profile/[username]
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ username: string }> }
) {
    const session = await auth();
    const { username } = await params;

    if (!session?.user || session.user.username !== username) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = updateSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
    }

    const updated = await prisma.user.update({
        where: { username },
        data: parsed.data,
        select: { username: true, name: true, bio: true, avatar: true, location: true },
    });

    return NextResponse.json(updated);
}
