import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            username: string;
            xp: number;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }

    interface User {
        username?: string;
        xp?: number;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id?: string;
        username?: string;
        xp?: number;
        avatar?: string;
    }
}
