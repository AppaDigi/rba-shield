import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { Provider } from "next-auth/providers";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

const googleClientId = process.env.GOOGLE_CLIENT_ID ?? process.env.AUTH_GOOGLE_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET ?? process.env.AUTH_GOOGLE_SECRET;

const providers: Provider[] = [
    CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "email" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            try {
                const parsed = loginSchema.safeParse(credentials);
                if (!parsed.success) return null;

                const { email, password } = parsed.data;
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user || !user.passwordHash) return null;

                const passwordsMatch = await bcrypt.compare(password, user.passwordHash);
                if (!passwordsMatch) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    xp: user.xp,
                    image: user.avatar ?? undefined,
                };
            } catch (error) {
                console.error("[AUTH_AUTHORIZE]", error);
                return null;
            }
        },
    }),
];

if (googleClientId && googleClientSecret) {
    providers.push(
        GoogleProvider({
            clientId: googleClientId,
            clientSecret: googleClientSecret,
            profile(profile) {
                // Auto-generate username from Google display name
                const rawUsername = (profile.name ?? profile.email.split("@")[0])
                    .toLowerCase()
                    .replace(/\s+/g, "_")
                    .replace(/[^a-z0-9_]/g, "")
                    .slice(0, 20);
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    username: `${rawUsername}_${profile.sub.slice(-4)}`,
                };
            },
        })
    );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
    providers,
    // Apple provider - scaffold, disabled until credentials are provided
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID!,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET!,
    // }),
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.username = user.username ?? token.username ?? "";
                token.xp = user.xp ?? token.xp ?? 0;
                token.avatar = user.image ?? token.avatar ?? "";

                // OAuth users may not include our app-specific fields on the user object.
                if (!user.username || user.xp == null || !user.image) {
                    try {
                        const dbUser = await prisma.user.findUnique({
                            where: { id: user.id as string },
                            select: { username: true, xp: true, avatar: true },
                        });
                        token.username = dbUser?.username ?? token.username;
                        token.xp = dbUser?.xp ?? token.xp;
                        token.avatar = dbUser?.avatar ?? token.avatar;
                    } catch (error) {
                        console.error("[AUTH_JWT]", error);
                    }
                }
            }
            if (trigger === "update" && session) {
                token.username = session.username ?? token.username;
                token.avatar = session.avatar ?? token.avatar;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.xp = token.xp as number;
                session.user.image = (token.avatar as string) || session.user.image;
            }
            return session;
        },
    },
    events: {
        async createUser({ user }) {
            // Ensure every new OAuth user gets a username
            if (!user.email) return;
            const existing = await prisma.user.findUnique({ where: { id: user.id } });
            if (existing && !existing.username) {
                const base = user.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "_");
                const username = `${base}_${(user.id ?? "xxxx").slice(-4)}`;
                await prisma.user.update({ where: { id: user.id }, data: { username } });
            }
        },
    },
});
