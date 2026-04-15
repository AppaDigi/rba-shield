import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding live events...");

    // Clean up existing live data
    await prisma.auctionBid.deleteMany();
    await prisma.liveMessage.deleteMany();
    await prisma.auctionItem.deleteMany();
    await prisma.liveEvent.deleteMany();

    // ─── The Great Duck Race (LIVE) ───────────────────────────────────────────
    const duckRace = await prisma.liveEvent.create({
        data: {
            title: "The Great Annual Duck Race",
            description:
                "The Metropolitan Cigar Society's most prestigious annual event. Rare lots auctioned live as our famed rubber duck armada races to glory.",
            youtubeId: "P4uAvBXYNDA",
            status: "LIVE",
            viewerCount: 1247,
            hostName: "The Metropolitan Cigar Society",
            startedAt: new Date(),
            items: {
                create: [
                    {
                        title: "Padrón 1964 Anniversary Maduro – Full Box of 25",
                        description:
                            "A masterpiece from the Padrón family. Rich, complex, with notes of dark chocolate and espresso.",
                        imageUrl:
                            "https://images.unsplash.com/photo-1510009653068-07b489a20078?q=80&w=800",
                        startingBid: 45000,  // $450
                        currentBid: 65000,   // $650
                        currentLeaderName: "Col. Pemberton",
                        status: "ACTIVE",
                        sortOrder: 1,
                    },
                    {
                        title: "Cohiba Behike 52 – Box of 10",
                        description:
                            "The crown jewel of Cuban production. Medio Tiempo leaf gives unparalleled complexity.",
                        imageUrl:
                            "https://images.unsplash.com/photo-1623157879673-10821b066316?w=800",
                        startingBid: 80000,  // $800
                        currentBid: 0,
                        status: "UPCOMING",
                        sortOrder: 2,
                    },
                    {
                        title: "Arturo Fuente Opus X Limited Reserve Sampler",
                        description:
                            "Six of the rarest Dominican puros ever produced. A once-in-a-decade offering.",
                        imageUrl:
                            "https://images.unsplash.com/photo-1533633310034-716914565780?w=800",
                        startingBid: 30000,  // $300
                        currentBid: 0,
                        status: "UPCOMING",
                        sortOrder: 3,
                    },
                ],
            },
            messages: {
                create: [
                    { guestName: "J.P. Morgan III", content: "Stunning selection this year.", type: "CHAT" },
                    { guestName: "Winston C.", content: "I'll take the lot.", type: "CHAT" },
                    { guestName: "Lady Ashford", content: "That Padron is extraordinary.", type: "CHAT" },
                    {
                        type: "SYSTEM",
                        content: "Col. Pemberton placed a bid of $650 on \"Padrón 1964 Anniversary Maduro – Full Box of 25\"",
                    },
                    { guestName: "The General", content: "Go number 4!", type: "CHAT" },
                    { guestName: "Anonymous", content: "Raise the stakes!", type: "CHAT" },
                ],
            },
        },
    });

    console.log(`Created LIVE event: "${duckRace.title}" (${duckRace.id})`);

    // ─── Davidoff Late Night Lounge (SCHEDULED) ───────────────────────────────
    const davidoff = await prisma.liveEvent.create({
        data: {
            title: "Davidoff Late Night Lounge",
            description: "An intimate evening with Davidoff Master Blender Henke Kelner. Limited to 200 viewers.",
            youtubeId: null,
            status: "SCHEDULED",
            viewerCount: 0,
            hostName: "Davidoff of Geneva",
            items: {
                create: [
                    {
                        title: "Davidoff Millennium Blend Toro – Box of 20",
                        description: "Soft, creamy Connecticut wrapper with exceptional construction.",
                        startingBid: 25000,
                        currentBid: 0,
                        status: "UPCOMING",
                        sortOrder: 1,
                    },
                    {
                        title: "Davidoff Year of the Rabbit – Sealed Box",
                        description: "Rare limited-edition lunar new year release. Highly sought after.",
                        startingBid: 120000,
                        currentBid: 0,
                        status: "UPCOMING",
                        sortOrder: 2,
                    },
                ],
            },
        },
    });

    console.log(`Created SCHEDULED event: "${davidoff.title}" (${davidoff.id})`);

    // ─── Padron Anniversary Release (SCHEDULED) ───────────────────────────────
    const padron = await prisma.liveEvent.create({
        data: {
            title: "Padrón 50th Anniversary Release Party",
            description: "Celebrating five decades of excellence. The 50th Anniversary blend unveiled live.",
            status: "SCHEDULED",
            hostName: "Padrón Cigars",
            viewerCount: 0,
            items: {
                create: [
                    {
                        title: "Padrón 50th Anniversary – Premiere Collector's Box",
                        description: "The first 50 boxes of the anniversary release. Numbered and signed.",
                        startingBid: 200000,
                        currentBid: 0,
                        status: "UPCOMING",
                        sortOrder: 1,
                    },
                ],
            },
        },
    });

    console.log(`Created SCHEDULED event: "${padron.title}" (${padron.id})`);
    console.log("\nSeed complete. LIVE event ID:", duckRace.id);
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
