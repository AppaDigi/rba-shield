import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be under 20 characters")
        .regex(/^[a-z0-9_]+$/, "Username can only contain lowercase letters, numbers, and underscores"),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number"),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.issues[0].message },
                { status: 400 }
            );
        }

        const { name, username, email, password } = parsed.data;

        // Check uniqueness
        const existingEmail = await prisma.user.findUnique({ where: { email } });
        if (existingEmail) {
            return NextResponse.json({ error: "Email already in use" }, { status: 409 });
        }

        const existingUsername = await prisma.user.findUnique({ where: { username } });
        if (existingUsername) {
            return NextResponse.json({ error: "Username already taken" }, { status: 409 });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                username,
                email,
                passwordHash,
                xp: 0,
            },
            select: { id: true, username: true, email: true },
        });

        return NextResponse.json({ success: true, user }, { status: 201 });
    } catch (error) {
        console.error("[REGISTER]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
