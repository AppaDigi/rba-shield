import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET /api/humidor  — current user's inventory
export async function GET() {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const items = await prisma.humidorItem.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
}

// POST /api/humidor  — add a cigar to the humidor
export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, brand, size, wrapper, origin, quantity, notes, imageUrl } = await req.json();
    if (!name?.trim()) return NextResponse.json({ error: "Name is required" }, { status: 400 });

    const item = await prisma.humidorItem.create({
        data: {
            userId: session.user.id,
            name: name.trim(),
            brand: brand?.trim() || null,
            size: size?.trim() || null,
            wrapper: wrapper?.trim() || null,
            origin: origin?.trim() || null,
            quantity: Math.max(1, parseInt(quantity) || 1),
            notes: notes?.trim() || null,
            imageUrl: imageUrl?.trim() || null,
        },
    });

    // Award XP for first cigar logged
    await prisma.user.update({
        where: { id: session.user.id },
        data: { xp: { increment: 10 }, cigarsLogged: { increment: quantity || 1 } },
    });

    return NextResponse.json(item, { status: 201 });
}
