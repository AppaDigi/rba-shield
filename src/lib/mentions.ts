import { prisma } from "@/lib/prisma";

const MENTION_REGEX = /(^|[^a-z0-9_])@([a-z0-9_]{3,20})/gi;

export function extractMentionUsernames(text: string) {
    const usernames = new Set<string>();

    for (const match of text.matchAll(MENTION_REGEX)) {
        const username = match[2]?.toLowerCase();
        if (username) usernames.add(username);
    }

    return Array.from(usernames);
}

interface MentionNotificationArgs {
    actorId: string;
    content: string;
    entityUrl: string;
    contextLabel?: string;
}

export async function createMentionNotifications({
    actorId,
    content,
    entityUrl,
    contextLabel = "in The Lounge",
}: MentionNotificationArgs) {
    const usernames = extractMentionUsernames(content);
    if (usernames.length === 0) return;

    const actor = await prisma.user.findUnique({
        where: { id: actorId },
        select: { id: true, name: true, username: true, avatar: true },
    });

    if (!actor) return;

    const mentionedUsers = await prisma.user.findMany({
        where: {
            username: { in: usernames },
            NOT: { id: actorId },
        },
        select: { id: true },
    });

    if (mentionedUsers.length === 0) return;

    await prisma.notification.createMany({
        data: mentionedUsers.map((user) => ({
            userId: user.id,
            type: "MENTION",
            actorName: actor.name ?? actor.username,
            actorAvatar: actor.avatar,
            body: `${actor.name ?? actor.username} mentioned you ${contextLabel}.`,
            entityUrl,
        })),
    });
}
