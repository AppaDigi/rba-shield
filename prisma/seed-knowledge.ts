import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ARTICLES = [
    {
        slug: "wrapper-selection-claro-to-oscuro",
        title: "The Lost Art of Wrapper Selection: Claro to Oscuro",
        excerpt: "Understanding the intricate fermentation process that gives a Maduro its sweetness and a Connecticut its creaminess.",
        category: "BLEND",
        coverImage: "https://images.unsplash.com/photo-1623157879673-10821b066316?w=1200&q=80",
        authorName: "Señor Maestro",
        readTime: 8,
        content: `<h2>The Wrapper: Soul of the Cigar</h2>
<p>Ask any master blender and they will tell you the same thing: the wrapper accounts for up to 60% of the flavor you taste. It is the most fermented, most processed, and most precious leaf on any cigar. A hand-selected wrapper takes years of cultivation and months of careful curing before it ever touches a rolling table.</p>

<h2>The Color Spectrum</h2>
<p>The wrapper color spectrum runs from the palest <strong>Claro</strong> — a golden, almost translucent Connecticut Shade leaf grown under cheesecloth to limit sun exposure — all the way to the near-black <strong>Oscuro</strong>, a double-fermented leaf that has been aged for three years or more before use.</p>
<p><strong>Claro (Natural/Candela)</strong> leaves produce a creamy, mild smoke with notes of hay, cedar, and cream. Connecticut Shade wrappers from the Hartford Valley are the gold standard. Davidoff and Fuente use them extensively.</p>
<p><strong>Colorado Claro</strong> leaves fall in the middle range — a rich, reddish-brown hue most associated with Nicaraguan and Dominican puros. Medium-bodied, with notes of leather, nuts, and dried fruit. The Padrón Serie lineup employs Colorado Claro wrappers to magnificent effect.</p>
<p><strong>Colorado Maduro</strong> is where the profile deepens significantly. Extended fermentation converts sugars and breaks down starches, producing natural sweetness without added flavor. The Ashton VSG wears this wrapper with authority.</p>
<p><strong>Maduro</strong> wrappers undergo the most dramatic transformation. At temperatures reaching 120°F in the pilón (fermentation pile), the leaf turns dark chocolate-brown and develops concentrated sugars. Great Maduros taste of espresso, dark chocolate, earth, and cedar. Illusione ~eccj~ 20th and Padrón 1964 Maduro are benchmarks.</p>
<p><strong>Oscuro</strong> is the final frontier — so dark it appears almost black. Mostly grown in Nicaragua and Cuba. Intensely flavored, requiring an experienced palate. Man O' War Ruination is among the finest examples.</p>

<h2>Fermentation: The Transformation</h2>
<p>All tobacco undergoes fermentation, but wrapper leaf is fermented more carefully than any other. The process drives off ammonia, which creates the harsh, acrid bite of uncured tobacco. Great wrapper leaf may undergo two or even three fermentation cycles over 18 months before it is deemed ready.</p>
<p>The master fermentador tests the pilón daily with a thermometer — too hot and the oils break down; too cool and fermentation stalls. It is as much art as science.</p>

<h2>A Practical Guide</h2>
<p>When selecting a cigar, start with the wrapper. If you prefer mild, creamy profiles, seek out Connecticut Shade. If you want complexity with natural sweetness, a well-made Maduro will reward you. And if you seek maximum intensity — the distillation of fine tobacco — an Oscuro from Nicaragua is your destination.</p>`,
    },
    {
        slug: "vuelta-abajo-cubas-sacred-valley",
        title: "Vuelta Abajo: Cuba's Sacred Valley",
        excerpt: "Why a 35-mile stretch of land in western Cuba produces what many consider the finest tobacco on earth.",
        category: "REGION",
        coverImage: "https://images.unsplash.com/photo-1510009653068-07b489a20078?q=80&w=1200",
        authorName: "Don Felipe Rojas",
        readTime: 7,
        content: `<h2>The Garden of the Gods</h2>
<p>In the Pinar del Río province of western Cuba lies a narrow valley that has produced the world's most celebrated tobacco for more than 400 years. Vuelta Abajo — loosely translated as "the lower turn" — is roughly 35 miles long and 10 miles wide, yet its output defines the benchmark by which all other tobacco is measured.</p>

<h2>Why Here?</h2>
<p>The answer lies in a confluence of geological fortune. The valley floor is covered in <em>tierra colorada</em> — red soil rich in iron oxide and humus, with exceptional drainage. The sub-soil contains calcium-rich limestone that feeds the tobacco roots with minerals unavailable in any other region. The Pinar del Río mountains to the north create a microclimate of precise humidity: not so wet that the leaf rots, not so dry that the plant stresses.</p>
<p>The combination produces tobacco leaves of extraordinary thinness, elasticity, and oil content. A Vuelta Abajo leaf can be stretched without tearing — a property that makes it uniquely suited to wrapper production. The oils trap and develop flavor compounds during fermentation in ways that simply cannot be replicated elsewhere.</p>

<h2>The Vegas</h2>
<p>Within Vuelta Abajo, the finest farms — <em>vegas</em> — are themselves stratified by quality. The Hoyo de Monterrey vega, the San Luis valley, and the Vegas de Robaina (owned by the legendary Alejandro Robaina until his death in 2010) produce leaf that commands prices multiples above ordinary Cuban tobacco. Robaina's farm was so renowned that Habanos S.A. named a brand after him — the only time a living Cuban farmer has been so honored.</p>

<h2>Shade vs. Sun</h2>
<p>Unlike Connecticut, where shade cloth is used primarily for wrappers, Vuelta Abajo grows both sun-grown and shade-grown (tapado) leaf. Sun-grown leaf develops thicker veins and more concentrated flavor — used primarily for filler and binder. Tapado wrapper leaf grown under muslin develops the legendary oiliness and fine texture that defines the Cohiba, Montecristo, and Romeo y Julieta wrappers.</p>

<h2>The Embargo's Irony</h2>
<p>The U.S. embargo, in force since 1962, has preserved Vuelta Abajo from industrialization. Without American capital or machinery, Cuban tobacco farming has remained largely hand-worked, with knowledge passed orally from father to son across generations. The methods of 1850 are, in many respects, the methods of today. In this case, restriction created preservation.</p>

<h2>Seeking Vuelta Abajo</h2>
<p>Every Habanos S.A. brand — Cohiba, Montecristo, H. Upmann, Partagás, Bolivar — draws from Vuelta Abajo for its top-of-line blends. When you smoke a Cohiba Behike, you are smoking leaf grown within a 35-mile valley that has no true equal on earth. That is worth pausing to appreciate.</p>`,
    },
    {
        slug: "nicaragua-new-world-order",
        title: "Nicaragua's New World Order",
        excerpt: "How the Jalapa, Estelí, and Ometepe regions toppled Cuba's monopoly on world-class tobacco.",
        category: "REGION",
        coverImage: "https://images.unsplash.com/photo-1533633310034-716914565780?w=1200",
        authorName: "Carlos Fuego",
        readTime: 6,
        content: `<h2>The Rise of Nicaragua</h2>
<p>Twenty years ago, Nicaragua was a footnote in the cigar world. Today, it is arguably the most important tobacco-producing nation on earth. The transformation has been extraordinary — driven by volcanic soil, entrepreneurial Cuban exiles, and a generation of American smokers hungry for full-bodied, complex cigars.</p>

<h2>Three Regions, Three Personalities</h2>
<p><strong>Jalapa Valley</strong> sits at 2,000 feet in the mountains of northern Nicaragua. The elevation and cool nights slow the tobacco's maturation, creating leaves of extraordinary complexity. Jalapa wrapper and filler is known for its refinement — earthy and sweet, with a distinctly Cuban character. Drew Estate's Liga Privada T52 uses Jalapa tobaccos to great effect.</p>
<p><strong>Estelí</strong> is the industry's workhorse. At a lower elevation with more direct sun, Estelí produces robust, intensely flavored leaf with a leathery, peppery profile that can sustain bold blends. Rocky Patel, Perdomo, and Padrón all rely heavily on Estelí tobacco. The city itself has become the cigar capital of Central America.</p>
<p><strong>Ometepe Island</strong> rises from Lake Nicaragua as a twin-volcano wonder. Its volcanic black soil — unlike anything elsewhere in tobacco country — produces leaf with a unique minerality and a deep, almost earthy sweetness. My Father Cigars' Le Bijou 1922 uses Ometepe leaf to justify its considerable price.</p>

<h2>The Cuban Connection</h2>
<p>Nicaragua's tobacco renaissance is inseparable from Cuba's political upheaval. After Castro nationalized the Havana industry in 1960, master rollers and blenders fled — many to Miami, others to Honduras and the Dominican Republic, and eventually to Nicaragua. These families — the Padróns, the Garcias, the Perdomo family — brought Havana seed, Cuban technique, and Cuban obsession with quality to their adopted country.</p>
<p>Don José Padrón, who founded Padrón Cigars in Miami in 1964, began growing in Estelí in the 1970s and never looked back. His family's 1964 Anniversary Series — made entirely of Nicaraguan leaf, aged five years before rolling — is today considered among the finest cigars ever made.</p>

<h2>The New Benchmark</h2>
<p>The cigar world's consensus has shifted. Blind tasting panels regularly rank Nicaraguan puros above Cuban counterparts in consistency, construction, and flavor complexity. The resources available to Nicaraguan producers — modern fermentation facilities, climate-controlled aging rooms, rigorous quality control — give them advantages that still-artisanal Cuban operations cannot match. Nicaragua is no longer the pretender. It is the champion.</p>`,
    },
    {
        slug: "robusto-revolution",
        title: "The Robusto Revolution: How a Format Changed Everything",
        excerpt: "The story of how a squat, 5×50 format from Cuba became the world's most popular cigar shape.",
        category: "SHAPE",
        coverImage: "https://images.unsplash.com/photo-1577908993883-fa4c0d087799?w=1200",
        authorName: "Victor Mendez",
        readTime: 5,
        content: `<h2>An Unlikely Champion</h2>
<p>The Robusto — 4¾ to 5 inches long with a 50 ring gauge — was, for most of the twentieth century, considered a working man's smoke. Short and fat, it lacked the elegance of the Churchill, the drama of the Lancero, and the prestige of the Double Corona. Cuban torcedores made them for themselves: a quick, intense smoke during a break. They were never exported in quantity.</p>

<h2>The 1990s Boom</h2>
<p>The American cigar boom of the 1990s changed everything. As a new generation of affluent professionals discovered premium cigars, they needed a format that fit their lives: flavorful enough to be satisfying, but short enough to smoke in 45 minutes between a dinner meeting and a cab. The Robusto was a perfect fit.</p>
<p>Cigar Aficionado magazine, launching in 1992, began rating cigars systematically — and the Robusto consistently scored well in blind tastings. Its shorter length concentrates tobacco oils at the foot; the wider ring gauge allows a complex blend of leaves that a thin lancero cannot accommodate. Reviewers discovered that a well-made Robusto delivered more flavor per minute than almost any other format.</p>

<h2>Why It Works</h2>
<p>The physics favor the Robusto. A wider ring gauge allows the blender to incorporate more binder and filler tobaccos in different proportions, creating complexity through contrast. The shorter length means you smoke closer to the mid-section where oils are most concentrated. And the slower burn of a wider ring gauge gives the smoker time to appreciate the evolution of the blend.</p>
<p>In contrast, the Churchill's length means the first third of the smoke — through cooler, less-developed tobacco — is often the weakest. The Lancero's narrow 38-ring gauge amplifies the wrapper's contribution, which is elegant but limiting for complex blends. The Robusto sits at the optimal intersection of time, flavor, and construction.</p>

<h2>The Benchmark Robustos</h2>
<p>The Padrón 1964 Anniversary Maduro Natural is widely regarded as the finest Robusto ever produced — an opinion reinforced by near-perfect ratings across thirty years of production. The Cohiba Robusto demonstrates the Cuban ideal: restrained complexity, impeccable construction. The Arturo Fuente Hemingway Short Story shows how a perfecto-shaped cigar can deliver the same experience with added construction drama.</p>

<h2>The Takeaway</h2>
<p>Today, the Robusto accounts for roughly 40% of all premium cigar sales globally. It is the starting point for most new smokers and the anchor of most master blenders' lines. Its rise from a worker's break smoke to the world's dominant premium format is one of the more unexpected stories in luxury goods. The working men who first rolled them, it turns out, knew what they were doing.</p>`,
    },
    {
        slug: "aging-cigars-when-to-smoke",
        title: "The Science of Aging: When to Light Up",
        excerpt: "Humidity, fermentation chemistry, and the case for patience — why the best cigars are rarely the youngest.",
        category: "AGING",
        coverImage: "https://images.unsplash.com/photo-1606771804928-854746f33967?w=1200",
        authorName: "Dr. Ernesto Velázquez",
        readTime: 9,
        content: `<h2>Why Cigars Improve With Age</h2>
<p>A freshly rolled cigar, even from the finest tobacco, is rarely at its best. The leaf — however well-fermented before rolling — continues to undergo chemical transformation after it leaves the rollers' hands. Oils migrate from the filler toward the binder and wrapper. Sugars continue to break down. Residual ammonia dissipates. The flavors of the individual tobaccos in the blend begin to marry, creating a unified profile that the individual components cannot produce on their own.</p>
<p>This process is called <em>marriage</em>, and it is the primary reason a master blender will hold inventory for six months to a year before release — and why a discerning smoker will age further still.</p>

<h2>The Chemistry of the Humidor</h2>
<p>Ideal aging conditions are consistent: <strong>65–70% relative humidity</strong> and <strong>65–70°F</strong>. These are not arbitrary numbers. At lower humidity, the leaf desiccates and becomes brittle; the essential oils — which carry flavor — volatilize and escape. At higher humidity, mold and tobacco beetles become risks.</p>
<p>Temperature is equally critical. At temperatures above 72°F, tobacco beetle eggs (present in virtually all tobacco) can hatch, devastating a collection. At lower temperatures, chemical transformation slows but does not stop. A wine cave is an excellent natural humidor for the same reason.</p>

<h2>What Happens Year by Year</h2>
<p><strong>0–6 months post-roll:</strong> The "sick" phase. Newly rolled cigars often smoke harsh and uneven as residual moisture and ammonia work their way out. This is why manufacturers hold inventory.</p>
<p><strong>6 months–2 years:</strong> The first marriage. Blend components begin to integrate. The harshest flavors soften. Most cigars reach their first plateau of quality here.</p>
<p><strong>2–5 years:</strong> The sweet spot for most premium cigars. The blend is fully integrated. Flavors are complex and layered. Construction has settled. The cigar smokes as the blender intended it to smoke.</p>
<p><strong>5–15 years:</strong> Reserved for exceptional tobaccos. Only cigars with sufficient oil content survive this long without becoming dull. Cuban pre-embargo cigars, Cohibas, and premium Padróns improve through this range. The flavors become more concentrated, more subtle, and more complex than any fresh cigar can achieve.</p>
<p><strong>15+ years:</strong> Rarefied territory. A 1968 Cohiba smoked at auction will taste unlike anything produced today — a different relationship between tobacco and time. Most modern cigars are not built for this.</p>

<h2>Practical Advice</h2>
<p>Buy multiples of cigars you love. Smoke one immediately. Set aside the rest for 2 years, then 5. The comparison will be revelatory. The fresh smoke will taste aggressive and one-dimensional against the aged version — even if you preferred the fresh one when you first smoked it.</p>
<p>Invest in a quality humidor with a calibrated digital hygrometer. A $40 hygrometer will pay for itself many times over in cigars saved from dry death or mold. Boveda humidity packs are the modern standard — set and forget.</p>
<p>Remember: patience is the most underrated skill in the cellar.</p>`,
    },
    {
        slug: "gentlemans-code-lounge-etiquette",
        title: "The Gentleman's Code: Lounge Etiquette",
        excerpt: "The unwritten rules of the smoking room — from the proper cut to the final ash — for the modern connoisseur.",
        category: "ETIQUETTE",
        coverImage: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=1200",
        authorName: "Sir Edmund Ashworth",
        readTime: 6,
        content: `<h2>The Rituals Matter</h2>
<p>A cigar is not merely tobacco. It is a ritual, a punctuation mark in the day, a statement of intention. How you cut, light, and smoke says something about how you approach pleasure — and whether you understand that the finest things in life reward attention and care.</p>

<h2>The Cut</h2>
<p>Use a sharp guillotine cutter or a V-cutter — never a punch cutter on a thin-capped cigar, and never your teeth. Cut approximately 1/16 to 1/8 inch above the shoulder of the cap. The goal is to open the draw without compromising the wrapper's integrity. A ragged cut frays the wrapper and allows tobacco to enter the mouth on every draw.</p>
<p>A dull cutter compresses rather than cuts, splitting the cap and causing the wrapper to unravel. Replace or sharpen your cutter annually.</p>

<h2>The Light</h2>
<p>A butane lighter or cedar spill (a strip of Spanish cedar lit from a candle) is the correct instrument. Fluid lighters impart petroleum flavors to the foot of the cigar. Matches are acceptable if allowed to burn long enough for the sulfur head to fully consume before applying flame.</p>
<p>Toast the foot first — hold the flame an inch below the foot, rotating the cigar, until the entire circumference glows. Only then bring the flame to the foot itself and draw gently. An even light prevents one side of the cigar burning faster than the other (a "runner"), which causes uneven combustion throughout the smoke.</p>

<h2>The Ash</h2>
<p>Do not knock the ash off prematurely. A long, firm ash insulates the burn and maintains optimal combustion temperature. Cubans and well-made Nicaraguans regularly hold an inch or more of ash. Let it fall naturally, or gently roll it off on the rim of the ashtray when it reaches critical length.</p>

<h2>In the Lounge</h2>
<p>Never light another man's cigar without asking. Never comment negatively on a companion's choice of cigar — the world is large enough for Perdomo and Cohiba to coexist. Do not discuss the price you paid; it is considered gauche in most traditional smoking rooms.</p>
<p>Pairings matter: a full-bodied Nicaraguan demands a whisky or aged rum capable of standing alongside it. A delicate Connecticut is not improved by a peated Scotch — match intensity to intensity. A good Bordeaux or an aged Burgundy alongside a Davidoff is a conversation worth having.</p>
<p>Finally, honor the smoke's pace. A cigar is not to be rushed. If you have not the time to give it 90 minutes of undivided attention, save it for an evening when you do. The greatest disrespect to a fine cigar is to smoke it distractedly.</p>`,
    },
];

async function main() {
    console.log("Seeding knowledge base articles...");
    await prisma.article.deleteMany();

    for (const article of ARTICLES) {
        await prisma.article.create({ data: article });
        console.log(`  Created: "${article.title}"`);
    }

    console.log(`\nSeeded ${ARTICLES.length} articles.`);

    // Also seed some demo swap listings (no user FK required, using a system user)
    console.log("\nSeeding demo swap listings...");
    await prisma.swapListing.deleteMany();

    // Create a demo system user if none exists
    let demoUser = await prisma.user.findFirst({ where: { username: "exchange_demo" } });
    if (!demoUser) {
        demoUser = await prisma.user.create({
            data: {
                email: "demo@exchange.internal",
                username: "exchange_demo",
                name: "The Exchange",
                xp: 500,
            },
        });
    }

    const DEMO_LISTINGS = [
        {
            offeringName: "Cohiba Behike 56 (Box of 10)",
            offeringImage: "https://images.unsplash.com/photo-1510009653068-07b489a20078?q=80&w=800",
            wantDescription: "Padrón 50th Anniversary",
            message: "Sealed box, purchased from La Casa del Habano Geneva in 2022. Perfect storage.",
        },
        {
            offeringName: "Arturo Fuente Opus X Angel's Share Toro",
            offeringImage: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800",
            wantDescription: "Vintage Davidoff Dom. Perignon or Dom. Rep. era No. 1",
            message: "Three singles, smoked one — the other two are yours. Absolute peak condition.",
        },
        {
            offeringName: "Liga Privada No. 9 Robusto (Full Box)",
            offeringImage: "https://images.unsplash.com/photo-1533633310034-716914565780?w=800",
            wantDescription: "Montecristo No. 2 Edición Limitada",
            message: "Never opened. Purchased at retail price — just looking for a trade partner.",
        },
        {
            offeringName: "Partagás Serie D No. 4 — Cabinet Selection 50ct",
            offeringImage: "https://images.unsplash.com/photo-1606771804928-854746f33967?w=800",
            wantDescription: "My Father Le Bijou 1922 Torpedo",
            message: "Cabinet from 2019. Outstanding burn and construction. One of the best D4s I've aged.",
        },
        {
            offeringName: "Davidoff Winston Churchill The Late Hour (10ct)",
            offeringImage: "https://images.unsplash.com/photo-1623157879673-10821b066316?w=800",
            wantDescription: "Rocky Patel Vintage 1990 or 1992",
            message: "A remarkable series. Offering 10 from my personal cellar.",
        },
        {
            offeringName: "Padron 1926 Serie No. 2 Maduro (5ct Sampler)",
            offeringImage: "https://images.unsplash.com/photo-1577908993883-fa4c0d087799?w=800",
            wantDescription: "Illusione ~eccj~ 20th Robusto",
            message: "Aged 2 years in my cellar. Perfect draw on all five.",
        },
    ];

    for (const listing of DEMO_LISTINGS) {
        await prisma.swapListing.create({
            data: { ...listing, authorId: demoUser.id },
        });
    }

    console.log(`Seeded ${DEMO_LISTINGS.length} demo swap listings.`);
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
