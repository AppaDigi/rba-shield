import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// PATCH /api/humidor/[id]
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const item = await prisma.humidorItem.findUnique({ where: { id } });
    if (!item || item.userId !== session.user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });

    const { name, brand, size, wrapper, origin, quantity, notes } = await req.json();
    const updated = await prisma.humidorItem.update({
        where: { id },
        data: {
            name: name?.trim() || item.name,
            brand: brand?.trim() || null,
            size: size?.trim() || null,
            wrapper: wrapper?.trim() || null,
            origin: origin?.trim() || null,
            quantity: quantity ? Math.max(1, parseInt(quantity)) : item.quantity,
            notes: notes?.trim() || null,
        },
    });
    return NextResponse.json(updated);
}

// DELETE /api/humidor/[id]
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = await params;
    const item = await prisma.humidorItem.findUnique({ where: { id } });
    if (!item || item.userId !== session.user.id) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await prisma.humidorItem.delete({ where: { id } });
    return NextResponse.json({ success: true });
}
