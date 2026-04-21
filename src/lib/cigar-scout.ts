import { prisma } from "@/lib/prisma";
import { z } from "zod";

const identifySchema = z.object({
    displayName: z.string().min(1),
    brand: z.string().nullable().optional(),
    line: z.string().nullable().optional(),
    vitola: z.string().nullable().optional(),
    wrapper: z.string().nullable().optional(),
    bandText: z.array(z.string()).default([]),
    confidence: z.number().min(0).max(1),
    notes: z.string().nullable().optional(),
    alternateCandidates: z.array(
        z.object({
            displayName: z.string(),
            reason: z.string(),
        })
    ).default([]),
});

const externalResultsSchema = z.object({
    summary: z.string().default(""),
    retailers: z.array(
        z.object({
            name: z.string(),
            url: z.string().url(),
            price: z.string().nullable().optional(),
            availability: z.string().nullable().optional(),
            notes: z.string().nullable().optional(),
        })
    ).default([]),
    localShops: z.array(
        z.object({
            name: z.string(),
            url: z.string().url().nullable().optional(),
            address: z.string().nullable().optional(),
            phone: z.string().nullable().optional(),
            notes: z.string().nullable().optional(),
        })
    ).default([]),
});

const identifyJsonSchema = {
    name: "cigar_identification",
    strict: true,
    schema: {
        type: "object",
        additionalProperties: false,
        properties: {
            displayName: { type: "string", description: "Best full cigar name guess." },
            brand: { type: ["string", "null"] },
            line: { type: ["string", "null"] },
            vitola: { type: ["string", "null"] },
            wrapper: { type: ["string", "null"] },
            bandText: {
                type: "array",
                items: { type: "string" },
            },
            confidence: { type: "number", minimum: 0, maximum: 1 },
            notes: { type: ["string", "null"] },
            alternateCandidates: {
                type: "array",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        displayName: { type: "string" },
                        reason: { type: "string" },
                    },
                    required: ["displayName", "reason"],
                },
            },
        },
        required: [
            "displayName",
            "brand",
            "line",
            "vitola",
            "wrapper",
            "bandText",
            "confidence",
            "notes",
            "alternateCandidates",
        ],
    },
} as const;

const externalResultsJsonSchema = {
    name: "cigar_buy_options",
    strict: true,
    schema: {
        type: "object",
        additionalProperties: false,
        properties: {
            summary: { type: "string" },
            retailers: {
                type: "array",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        name: { type: "string" },
                        url: { type: "string" },
                        price: { type: ["string", "null"] },
                        availability: { type: ["string", "null"] },
                        notes: { type: ["string", "null"] },
                    },
                    required: ["name", "url", "price", "availability", "notes"],
                },
            },
            localShops: {
                type: "array",
                items: {
                    type: "object",
                    additionalProperties: false,
                    properties: {
                        name: { type: "string" },
                        url: { type: ["string", "null"] },
                        address: { type: ["string", "null"] },
                        phone: { type: ["string", "null"] },
                        notes: { type: ["string", "null"] },
                    },
                    required: ["name", "url", "address", "phone", "notes"],
                },
            },
        },
        required: ["summary", "retailers", "localShops"],
    },
} as const;

type OpenRouterResponse = {
    choices?: Array<{
        message?: {
            content?: string | Array<{ type?: string; text?: string }>;
            annotations?: Array<{
                type?: string;
                url_citation?: {
                    title?: string;
                    url?: string;
                };
            }>;
        };
    }>;
};

export type CigarIdentification = z.infer<typeof identifySchema>;
export type ExternalBuyOptions = z.infer<typeof externalResultsSchema> & {
    sources: { title: string; url: string }[];
};
export type SwapMatchResults = {
    directMatches: Awaited<ReturnType<typeof prisma.swapListing.findMany>>;
    suggestedMatches: Awaited<ReturnType<typeof prisma.swapListing.findMany>>;
};

export function hasCigarAiKey() {
    return Boolean(process.env.OPENROUTER_API_KEY);
}

function getOpenRouterKey() {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY is not configured on the server.");
    }
    return apiKey;
}

async function createChatCompletion(body: object) {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getOpenRouterKey()}`,
            "HTTP-Referer": "https://cigarswap.app",
            "X-Title": "Cigar Swap",
        },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`OpenRouter request failed (${res.status}): ${errorText}`);
    }

    return (await res.json()) as OpenRouterResponse;
}

function extractMessageContent(response: OpenRouterResponse) {
    const content = response.choices?.[0]?.message?.content;
    if (typeof content === "string") {
        return content.trim();
    }

    if (!Array.isArray(content)) {
        return "";
    }

    return content
        .map((part) => (part?.type === "text" && typeof part.text === "string" ? part.text : ""))
        .join("\n")
        .trim();
}

function parseJson<T>(raw: string) {
    const trimmed = raw.trim();
    const withoutFence = trimmed
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/i, "")
        .trim();

    try {
        return JSON.parse(withoutFence) as T;
    } catch {
        const start = withoutFence.indexOf("{");
        const end = withoutFence.lastIndexOf("}");
        if (start >= 0 && end > start) {
            return JSON.parse(withoutFence.slice(start, end + 1)) as T;
        }
        throw new Error("Model response was not valid JSON.");
    }
}

function uniqueTerms(input: Array<string | null | undefined>) {
    return Array.from(
        new Set(
            input
                .flatMap((value) => (value ?? "").split(/[|,/]+/))
                .map((value) => value.trim().toLowerCase())
                .filter((value) => value.length >= 3)
        )
    );
}

function buildSearchTerms(identification: CigarIdentification) {
    const lineName = [identification.brand, identification.line, identification.vitola]
        .filter(Boolean)
        .join(" ")
        .trim();

    return uniqueTerms([
        identification.displayName,
        lineName,
        identification.brand,
        identification.line,
        identification.vitola,
        identification.wrapper,
        ...identification.bandText,
    ]).slice(0, 8);
}

function scoreTextMatch(text: string, terms: string[]) {
    const haystack = text.toLowerCase();
    return terms.reduce((score, term) => score + (haystack.includes(term) ? term.length : 0), 0);
}

function includesTerm(text: string, value?: string | null) {
    const term = value?.trim().toLowerCase();
    if (!term) return false;
    return text.includes(term);
}

function extractSources(response: OpenRouterResponse) {
    const annotations = response.choices?.[0]?.message?.annotations ?? [];
    const sources = annotations
        .filter((annotation) => annotation?.type === "url_citation" && annotation.url_citation?.url)
        .map((annotation) => ({
            title: annotation.url_citation?.title?.trim() || new URL(annotation.url_citation!.url!).hostname,
            url: annotation.url_citation!.url!,
        }));

    return Array.from(new Map(sources.map((source) => [source.url, source])).values()).slice(0, 8);
}

function coerceExternalUrl(url: string | null | undefined) {
    if (!url) return null;

    try {
        return new URL(url).toString();
    } catch {
        if (url.startsWith("www.")) {
            return `https://${url}`;
        }

        return null;
    }
}

export async function identifyCigarFromImages(images: string[]) {
    const identifyResponse = await createChatCompletion({
        model: process.env.OPENROUTER_CIGAR_IDENTIFY_MODEL ?? "google/gemini-2.5-pro",
        temperature: 0.1,
        response_format: {
            type: "json_schema",
            json_schema: identifyJsonSchema,
        },
        plugins: [{ id: "response-healing" }],
        messages: [
            {
                role: "system",
                content:
                    "You are a cigar identification expert. Your job is to read the band and packaging in photos and match them to real, commercially available cigars. You must NEVER invent, fabricate, or guess a brand or product name. Every brand and line you return must be a real cigar brand that actually exists and is sold commercially. If you cannot read the band text clearly, say so in notes and set confidence below 0.4. If the image is blurry, too dark, or the band is not visible, set confidence to 0.1 and explain what you can see. Do not fill in fields you cannot directly read from the image.",
            },
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text:
                            "Identify the cigar in these photos. Rules: (1) Only use brand and line names you can READ from the band or packaging text — do not guess or invent names. (2) bandText must contain only text you can literally see on the band or box — copy it exactly as written. (3) brand must exactly match a real cigar brand (e.g. Padron, Arturo Fuente, Rocky Patel, Liga Privada, Oliva, Cohiba, Montecristo, Romeo y Julieta, CAO, Davidoff, etc.). (4) If you cannot confirm the brand from visible text, set brand to null and confidence below 0.4. (5) alternateCandidates should only list real brands you genuinely considered based on visual evidence. (6) Never fabricate a company name — if you are not sure, use null. Return JSON with keys: displayName, brand, line, vitola, wrapper, bandText, confidence, notes, alternateCandidates.",
                    },
                    ...images.map((image) => ({
                        type: "image_url",
                        image_url: {
                            url: image,
                        },
                    })),
                ],
            },
        ],
    });

    return identifySchema.parse(parseJson<CigarIdentification>(extractMessageContent(identifyResponse)));
}

export function identifyCigarFromQuery(query: string) {
    const cleaned = query.trim().replace(/\s+/g, " ");
    const parts = cleaned.split(" ").filter(Boolean);
    const brand = parts[0] ?? cleaned;
    const line = parts.length > 1 ? parts.slice(1, Math.min(parts.length, 4)).join(" ") : null;

    return identifySchema.parse({
        displayName: cleaned,
        brand,
        line,
        vitola: null,
        wrapper: null,
        bandText: [],
        confidence: 0.38,
        notes: "Manual search mode was used, so this result is based on your text query rather than image analysis.",
        alternateCandidates: [],
    });
}

export async function findSwapMatches(identification: CigarIdentification): Promise<SwapMatchResults> {
    const terms = buildSearchTerms(identification);
    if (terms.length === 0) {
        return {
            directMatches: [],
            suggestedMatches: [],
        };
    }

    const orFilters = terms.flatMap((term) => [
        { offeringName: { contains: term, mode: "insensitive" as const } },
        { wantDescription: { contains: term, mode: "insensitive" as const } },
    ]);

    const listings = await prisma.swapListing.findMany({
        where: {
            status: "OPEN",
            OR: orFilters,
        },
        take: 24,
        include: {
            author: { select: { id: true, name: true, username: true, avatar: true, xp: true } },
            _count: { select: { offers: true } },
        },
        orderBy: { createdAt: "desc" },
    });

    const scoredListings = listings
        .map((listing) => ({
            listing,
            offeringNameLower: listing.offeringName.toLowerCase(),
            wantDescriptionLower: listing.wantDescription.toLowerCase(),
            score:
                scoreTextMatch(listing.offeringName, terms) * 2 +
                scoreTextMatch(listing.wantDescription, terms) +
                (listing.offeringImage ? 4 : 0),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((entry) => ({
            ...entry,
            mentionsBrand:
                includesTerm(entry.offeringNameLower, identification.brand) ||
                includesTerm(entry.wantDescriptionLower, identification.brand),
            mentionsLine:
                includesTerm(entry.offeringNameLower, identification.line) ||
                includesTerm(entry.wantDescriptionLower, identification.line),
            mentionsVitola:
                includesTerm(entry.offeringNameLower, identification.vitola) ||
                includesTerm(entry.wantDescriptionLower, identification.vitola),
            mentionsWrapper:
                includesTerm(entry.offeringNameLower, identification.wrapper) ||
                includesTerm(entry.wantDescriptionLower, identification.wrapper),
        }));

    const directMatches = scoredListings
        .filter(
            (entry) =>
                (entry.mentionsBrand && entry.mentionsLine) ||
                (entry.mentionsBrand && entry.mentionsVitola) ||
                entry.score >= 20
        )
        .slice(0, 4)
        .map((entry) => entry.listing);

    const takenIds = new Set(directMatches.map((listing) => listing.id));

    const suggestedMatches = scoredListings
        .filter(
            (entry) =>
                !takenIds.has(entry.listing.id) &&
                (entry.score >= 8 || (entry.mentionsBrand && entry.mentionsWrapper) || entry.mentionsLine)
        )
        .slice(0, 4)
        .map((entry) => entry.listing);

    return {
        directMatches,
        suggestedMatches,
    };
}

export async function findExternalBuyOptions(identification: CigarIdentification, location?: string) {
    const searchResponse = await createChatCompletion({
        model: process.env.OPENROUTER_CIGAR_SEARCH_MODEL ?? "google/gemini-2.5-pro",
        temperature: 0.2,
        response_format: {
            type: "json_schema",
            json_schema: externalResultsJsonSchema,
        },
        plugins: [
            { id: "web", max_results: 5 },
            { id: "response-healing" },
        ],
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: [
                            `Find reputable current buying options for this cigar: ${identification.displayName}.`,
                            identification.brand ? `Brand: ${identification.brand}.` : "",
                            identification.line ? `Line: ${identification.line}.` : "",
                            identification.vitola ? `Vitola: ${identification.vitola}.` : "",
                            identification.wrapper ? `Wrapper: ${identification.wrapper}.` : "",
                            location
                                ? `Also find nearby cigar shops for this location: ${location}.`
                                : "No location was provided, so skip local shops.",
                            "Return JSON only with keys summary, retailers, localShops.",
                            "retailers should be an array of up to 4 objects with name, url, price, availability, notes.",
                            "localShops should be an array of up to 4 objects with name, url, address, phone, notes.",
                            "Use direct retailer or shop links when possible and prefer trusted cigar merchants over generic marketplaces.",
                        ]
                            .filter(Boolean)
                            .join(" "),
                    },
                ],
            },
        ],
    });

    const parsed = parseJson<z.infer<typeof externalResultsSchema>>(extractMessageContent(searchResponse));
    const normalized = {
        ...parsed,
        retailers: (parsed.retailers ?? [])
            .map((retailer) => ({
                ...retailer,
                url: coerceExternalUrl(retailer.url),
            }))
            .filter((retailer): retailer is z.infer<typeof externalResultsSchema>["retailers"][number] => Boolean(retailer.url)),
        localShops: (parsed.localShops ?? []).map((shop) => ({
            ...shop,
            url: coerceExternalUrl(shop.url),
        })),
    };

    return {
        ...externalResultsSchema.parse(normalized),
        sources: extractSources(searchResponse),
    };
}

export function buildManualBuyOptions(identification: CigarIdentification, location?: string): ExternalBuyOptions {
    const cigarName = identification.displayName;
    const encodedName = encodeURIComponent(cigarName);
    const encodedLocation = encodeURIComponent(location?.trim() || "");

    const retailers = [
        {
            name: "Small Batch Cigars search",
            url: `https://www.smallbatchcigar.com/search?type=product&q=${encodedName}`,
            price: null,
            availability: null,
            notes: "Search this retailer directly for live inventory.",
        },
        {
            name: "Cigars International search",
            url: `https://www.cigarsinternational.com/shop/?q=${encodedName}`,
            price: null,
            availability: null,
            notes: "Search this retailer directly for current listings.",
        },
        {
            name: "Famous Smoke search",
            url: `https://www.famous-smoke.com/search/${encodedName}`,
            price: null,
            availability: null,
            notes: "Search this retailer directly for matching cigars.",
        },
    ];

    const localShops = location?.trim()
        ? [
              {
                  name: "Google Maps cigar shop search",
                  url: `https://www.google.com/maps/search/cigar+shop+${encodedLocation}`,
                  address: location.trim(),
                  phone: null,
                  notes: `Open nearby cigar shops around ${location.trim()} and call ahead for ${cigarName}.`,
              },
          ]
        : [];

    const sources = [
        { title: "Small Batch Cigars", url: retailers[0].url },
        { title: "Cigars International", url: retailers[1].url },
        { title: "Famous Smoke", url: retailers[2].url },
        ...(localShops[0]?.url ? [{ title: "Google Maps", url: localShops[0].url }] : []),
    ];

    return {
        summary: "Manual search mode is active. Open the retailer or map links below to continue your search.",
        retailers,
        localShops,
        sources,
    };
}
