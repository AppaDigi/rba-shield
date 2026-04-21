import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users/search?q=partial — returns up to 6 matching users for @mention autocomplete
export async function GET(req: NextRequest) {
    const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
    if (!q) return NextResponse.json([]);

    const users = await prisma.user.findMany({
        where: {
            OR: [
                { username: { startsWith: q, mode: "insensitive" } },
                { name: { contains: q, mode: "insensitive" } },
            ],
        },
        select: { id: true, username: true, name: true, avatar: true },
        take: 6,
        orderBy: { username: "asc" },
    });

    return NextResponse.json(users);
}
