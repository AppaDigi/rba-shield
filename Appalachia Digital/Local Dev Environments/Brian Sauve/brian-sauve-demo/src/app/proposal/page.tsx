"use client";

import { motion } from "framer-motion";

export default function ProposalPage() {
  return (
    <div className="flex flex-col min-h-screen bg-parchment bg-texture-light text-ink">
      
      {/* COVER SECTION */}
      <section className="py-24 md:py-32 border-b-[12px] border-wood bg-cathedral bg-texture-dark bg-cathedral-pattern text-parchment relative overflow-hidden">
        <div className="absolute inset-0 bg-cathedral/95 mix-blend-multiply"></div>
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber via-cathedral to-cathedral mix-blend-overlay"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber/10 rounded-full blur-[100px] mix-blend-screen pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xs uppercase tracking-[0.4em] font-semibold text-amber mb-6 drop-shadow-sm">briansauve.com</h2>
            <h1 className="font-heading text-5xl md:text-7xl italic tracking-tight font-medium mb-6">Brian Sauvé</h1>
            <p className="font-body text-xl md:text-2xl text-parchment/70 tracking-widest uppercase mb-12">
              Pastor • Author • Musician • Podcaster
            </p>
            
            <div className="w-24 h-px bg-amber/50 mx-auto my-12"></div>
            
            <h2 className="font-heading text-4xl md:text-5xl uppercase tracking-widest font-medium text-amber mb-4">SEO Strategy &amp; Implementation Plan</h2>
            <p className="font-body text-lg text-parchment/80 tracking-widest uppercase mb-16">
              Music Fan Growth • Bright Hearth Podcast • Personal Brand Authority
            </p>
            
            <div className="inline-block border border-amber/30 px-8 py-4 bg-ink/30 backdrop-blur-sm rounded-sm">
              <p className="font-body text-sm tracking-widest text-parchment/60 uppercase">
                Prepared by Appalachia Digital, LLC | March 2026
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DOCUMENT BODY */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg prose-headings:font-heading prose-headings:font-medium prose-h2:text-4xl prose-h2:text-wood prose-h2:border-b-2 prose-h2:border-amber/30 prose-h2:pb-4 prose-h2:mt-16 prose-h3:text-3xl prose-h3:text-oak prose-h3:mt-12 prose-p:font-body prose-p:text-xl prose-p:leading-relaxed prose-p:text-ink/80 prose-li:font-body prose-li:text-xl prose-li:text-ink/80 prose-strong:text-ink prose-strong:font-bold prose-table:border-collapse prose-td:border prose-td:border-wood/20 prose-th:bg-wood/5 prose-th:border prose-th:border-wood/20 prose-th:font-heading prose-th:text-xl prose-th:text-wood prose-th:p-4 prose-td:p-4">
          
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="lead text-2xl font-heading italic text-wood border-l-4 border-amber pl-6 py-2 bg-amber/5">
              Brian Sauvé is one of the most prolific and theologically grounded content creators in the Reformed and New Christendom ecosystem. His website at briansauve.com serves as the hub for four distinct but interconnected verticals: a growing music catalog, the Bright Hearth podcast, a pastoral writing archive, and a merchandise store.
            </p>
          </motion.div>

          <p>
            The site currently receives 1,500 organic visits per month with 137 ranking keywords and 6,700 total backlinks from 232 referring domains — a meaningful foundation. However, 86.7% of that traffic is branded (people searching for 'Brian Sauve' directly), which means the site is doing very little to attract new audiences who don't already know who he is.
          </p>

          <p>
            This proposal addresses two growth goals: (1) growing Brian's music fan base by capturing search traffic from people who are looking for Reformed/Christian Psalm music but don't yet know Brian's work, and (2) growing the Bright Hearth podcast audience by capturing women searching for Christian homemaking and household content. Both goals are served through the same strategy: fix the critical crawl blocking issues, create targeted content, and build the SEO infrastructure that's currently missing.
          </p>

          <h2>Current Baseline (March 2026)</h2>
          <p>
            The 429 rate-limiting error is appearing on the exact pages that carry the most backlinks and audience interest — the Bright Hearth podcast page and the flagship album pages. This is the same issue found on briansauve.com's partner site, thehauntedcosmos.com. The pattern strongly suggests a Squarespace server-level rate limiting configuration that is blocking Googlebot from crawling the www subdomain.
          </p>

          <h2>Critical Issues</h2>
          
          <div className="space-y-8 mt-8">
            <div className="bg-white/50 border border-wood/20 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="!mt-0 font-bold">1. 429 Rate-Limiting Blocking Key Pages from Indexing</h3>
              <p className="text-base">
                SEMrush's backlink index shows 429 Too Many Requests errors on three high-value pages: /bright-hearth (41 referring domains, 158 backlinks), /even-dragons-shall-him-praise (11 domains, 196 backlinks), and /hearth-songs (10 domains, 39 backlinks). These are among the most-linked pages on the site. If Google cannot crawl them, their rankings and traffic potential are lost entirely.
              </p>
              <div className="bg-green-50/50 border-l-4 border-green-600 p-4 mt-4">
                <p className="!m-0 text-sm font-bold text-green-900">Fix:</p>
                <p className="!m-0 text-sm text-green-800">Investigate and resolve rate-limiting configuration in Squarespace or CDN settings. Whitelist Googlebot user agent. Set up Google Search Console immediately and submit the affected URLs for re-indexing once the server issue is resolved.</p>
              </div>
            </div>

            <div className="bg-white/50 border border-wood/20 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="!mt-0 font-bold">2. URL Variant Fragmentation Splits Link Equity</h3>
              <p className="text-base">
                The backlink data shows two competing homepage URL variants accumulating links: https://briansauve.com/ (88 domains, 105 backlinks) and https://www.briansauve.com/ (48 domains, 2,071 backlinks). The www variant has far more backlinks but is also the one returning 429 errors. Link equity is split across both variants.
              </p>
              <div className="bg-green-50/50 border-l-4 border-green-600 p-4 mt-4">
                <p className="!m-0 text-sm font-bold text-green-900">Fix:</p>
                <p className="!m-0 text-sm text-green-800">Set a canonical preferred URL. Implement 301 redirects from all non-canonical variants. Set the preferred domain in Google Search Console.</p>
              </div>
            </div>

            <div className="bg-white/50 border border-wood/20 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="!mt-0 font-bold">3. 86.7% Branded Traffic — Invisible to New Audiences</h3>
              <p className="text-base">
                The overwhelming dominance of branded traffic is the strategic problem this proposal addresses. The site currently has almost no non-branded organic presence. For the music vertical, this means potential fans who search for 'psalm music' never find Brian's work.
              </p>
              <div className="bg-green-50/50 border-l-4 border-green-600 p-4 mt-4">
                <p className="!m-0 text-sm font-bold text-green-900">Fix:</p>
                <p className="!m-0 text-sm text-green-800">Build a content layer targeting non-branded discovery keywords.</p>
              </div>
            </div>

            <div className="bg-white/50 border border-wood/20 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="!mt-0 font-bold">4. Album Pages Have No SEO Content</h3>
              <p className="text-base">
                The album pages are Squarespace gallery pages with minimal text content and no structured data. These pages have backlinks but no keyword-optimized copy.
              </p>
              <div className="bg-green-50/50 border-l-4 border-green-600 p-4 mt-4">
                <p className="!m-0 text-sm font-bold text-green-900">Fix:</p>
                <p className="!m-0 text-sm text-green-800">Add keyword-rich descriptions, track listings with searchable lyrics references, schema (MusicAlbum JSON-LD), and contextual CTAs to each album page.</p>
              </div>
            </div>

            <div className="bg-white/50 border border-wood/20 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="!mt-0 font-bold">5. No Structured Data / Schema</h3>
              <p className="text-base">
                No JSON-LD schema detected anywhere on the site. Brian qualifies for Person, MusicArtist, MusicAlbum, PodcastSeries, Organization, and WebSite with SearchAction. None are implemented.
              </p>
              <div className="bg-green-50/50 border-l-4 border-green-600 p-4 mt-4">
                <p className="!m-0 text-sm font-bold text-green-900">Fix:</p>
                <p className="!m-0 text-sm text-green-800">Implement Person + MusicArtist schema on the homepage, PodcastSeries on the Bright Hearth page, and MusicAlbum schema on each album page.</p>
              </div>
            </div>
          </div>

          <div className="bg-amber/10 border-4 border-amber/30 p-8 mt-12 mb-16">
            <h3 className="!mt-0 !text-amber font-bold flex items-center gap-3">
              <span className="text-3xl">⚠️</span> Warnings
            </h3>
            <ul className="!mt-4 space-y-2">
              <li><strong>No Google Search Console setup</strong> confirmed — essential for monitoring 429 crawl errors.</li>
              <li><strong>No GA4 tracking</strong> confirmed — no ability to measure music stream referrals or podcast listener conversions.</li>
              <li><strong>No llms.txt present</strong> — AI crawlers receive no guidance.</li>
              <li><strong>The anchor text profile</strong> is heavily dominated by 'promotes' (77% from aaview.com / 5,097 links) — this is a likely link aggregator or automated link source. Diversifying anchor text through editorial links is a priority.</li>
              <li><strong>Squarespace limits technical SEO access.</strong> WordPress is the long-term recommendation, especially to enable MusicBrainz/schema integrations.</li>
            </ul>
          </div>

          <div className="w-full text-center">
             <div className="inline-block w-8 h-8 rotate-45 border-r border-b border-wood/40 mb-16 mx-auto"></div>
          </div>

          <h2>The Keyword Strategy</h2>
          <p>
            This site requires keyword research across two distinct audience segments: music listeners and podcast/homemaking audiences. The strategies are complementary but target different keyword clusters.
          </p>

          <h3>Music Keywords — Target List</h3>
          <p>
            The music keyword landscape for Brian's work is defined by two dynamics: very low competition in the Reformed/Psalm niche, and a meaningful adjacent audience in 'christian folk music' and 'christian acoustic music'.
          </p>
          
          <div className="overflow-x-auto shadow-sm rounded-lg border border-wood/20 mb-8">
            <table className="w-full text-left text-sm bg-white/50">
              <thead className="bg-cathedral text-parchment">
                <tr>
                  <th className="!text-parchment font-body uppercase tracking-wider text-xs">Keyword</th>
                  <th className="!text-parchment font-body uppercase tracking-wider text-xs">Search Vol/Mo</th>
                  <th className="!text-parchment font-body uppercase tracking-wider text-xs">KD (Difficulty)</th>
                  <th className="!text-parchment font-body uppercase tracking-wider text-xs">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>psalm singing</td><td>590</td><td>5</td><td>Core audience, perfectly matches Brian's catalog</td></tr>
                <tr><td>christian folk music</td><td>480</td><td>&lt;5</td><td>Acoustic/folk crossover audience</td></tr>
                <tr><td>psalms set to music</td><td>90</td><td>1</td><td>Extremely high conversion intent for streaming</td></tr>
                <tr><td>christian acoustic music</td><td>260</td><td>11</td><td>Adjacent broader audience</td></tr>
                <tr><td>reformed worship music</td><td>40</td><td>&lt;5</td><td>Hyper-targeted theological alignment</td></tr>
                <tr><td>catechism songs</td><td>30</td><td>*</td><td>Authority opportunity for children's resources</td></tr>
              </tbody>
            </table>
          </div>

          <h3>Bright Hearth Keywords — The Tradwife Discovery</h3>
          <p>
            The Bright Hearth podcast sits at the intersection of Christian homemaking, traditional household living, and the broader "tradwife" cultural conversation. This research reveals a dramatic opportunity: the tradwife cluster carries over 40,000 searches per month with almost no competition.
          </p>

          <div className="overflow-x-auto shadow-sm rounded-lg border border-wood/20 mb-8 mt-6">
            <table className="w-full text-left text-sm bg-white/50">
              <thead className="bg-wood text-parchment">
                <tr>
                  <th className="!text-parchment font-body uppercase tracking-wider text-xs">Tier 1: High Volume</th>
                  <th className="!text-parchment font-body uppercase tracking-wider text-xs">Search Vol</th>
                  <th className="!text-parchment font-body uppercase tracking-wider text-xs">KD</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="font-bold">tradwife</td><td>40,500</td><td>20</td></tr>
                <tr><td className="font-bold">trad wife</td><td>33,100</td><td>19</td></tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto shadow-sm rounded-lg border border-wood/20 mb-8">
            <table className="w-full text-left text-sm bg-white/50">
              <thead className="bg-oak text-parchment">
                <tr>
                  <th className="!text-parchment font-body uppercase tracking-wider text-xs">Tier 2: Podcast Discovery</th>
                  <th className="!text-parchment font-body uppercase tracking-wider text-xs">Search Vol</th>
                  <th className="!text-parchment font-body uppercase tracking-wider text-xs">KD</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>christian marriage podcast</td><td>390</td><td>38</td></tr>
                <tr><td>christian wife podcast</td><td>50</td><td>1</td></tr>
                <tr><td>christian podcast for women</td><td>880</td><td>43</td></tr>
              </tbody>
            </table>
          </div>

          <div className="overflow-x-auto shadow-sm rounded-lg border border-wood/20 mb-8">
            <table className="w-full text-left text-sm bg-white/50">
              <thead className="bg-amber text-cathedral">
                <tr>
                  <th className="!text-cathedral font-body uppercase tracking-wider text-xs font-bold">Tier 3: Content / Article Targets</th>
                  <th className="!text-cathedral font-body uppercase tracking-wider text-xs font-bold">Search Vol</th>
                  <th className="!text-cathedral font-body uppercase tracking-wider text-xs font-bold">KD</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>homemaking skills</td><td>260</td><td>*</td></tr>
                <tr><td>art of homemaking</td><td>170</td><td>22</td></tr>
                <tr><td>christian homemaking</td><td>110</td><td>9</td></tr>
                <tr><td>biblical homemaking</td><td>40</td><td>*</td></tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Framing note:</strong> Bright Hearth should own the Christian tradwife space by being descriptively accurate, not apologetic. A page titled <em>'What Is the Tradwife Movement? A Christian Perspective'</em> could rank for the high-volume head term and serve as an on-ramp to the podcast.
          </p>

          <div className="w-full text-center">
             <div className="inline-block w-8 h-8 rotate-45 border-r border-b border-wood/40 mb-16 mx-auto mt-8"></div>
          </div>

          <h2>The Content Plan</h2>
          <p>
            Brian's site has content in it (books, articles, sermons, albums) but almost none of it is structured for search discovery. The following content plan targets both verticals simultaneously.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-texture-dark bg-cathedral text-parchment p-8 rounded-lg shadow-xl">
              <h3 className="!mt-0 !text-amber border-b border-amber/30 pb-4">🎵 Music Discovery</h3>
              <ul className="text-sm space-y-4 pt-4 prose-li:text-parchment/80">
                <li><strong>Album SEO:</strong> Add keyword-optimized copy, MusicAlbum schema, and a structured tracklist to 'Even Dragons Shall Him Praise', 'Hearth Songs', and 'Awake the Dawn'.</li>
                <li><strong>Vinyl Store:</strong> Rewrite with <em>'vinyl records christian music'</em> targeting.</li>
                <li><strong>Article:</strong> Why Christians Should Sing the Psalms</li>
                <li><strong>Article:</strong> What Is Christian Folk Music? A Guide</li>
                <li><strong>Article:</strong> The Best Psalms Set to Music</li>
              </ul>
            </div>

            <div className="bg-texture-dark bg-wood text-parchment p-8 rounded-lg shadow-xl">
              <h3 className="!mt-0 !text-amber border-b border-amber/30 pb-4">🎙️ Bright Hearth Podcast</h3>
              <ul className="text-sm space-y-4 pt-4 prose-li:text-parchment/80">
                <li><strong>Podcast Landing Page:</strong> Keyword-rich show description, Episode list with searchable titles, PodcastSeries schema.</li>
                <li><strong>Hub Article:</strong> What Is the Tradwife Movement? A Christian Perspective (Highest Priority)</li>
                <li><strong>Hub Article:</strong> Homemaking Skills Every Christian Woman Should Master</li>
                <li><strong>Hub Article:</strong> The Best Christian Podcasts for Wives</li>
                <li><strong>Show Notes:</strong> 300-500 words for each legacy episode to capture long-tail keyword traffic.</li>
              </ul>
            </div>
          </div>

          <div className="w-full text-center">
             <div className="inline-block w-8 h-8 rotate-45 border-r border-b border-wood/40 mb-16 mx-auto mt-16"></div>
          </div>

          <h2>Prioritized Action Items &amp; Roadmap</h2>
          
          <div className="border-l-4 border-amber pl-8 py-2 my-8">
            <h3 className="!mt-0">Month 1 — Foundation &amp; Emergency Fixes</h3>
            <ul className="text-base text-ink/80">
              <li>Fix 429 rate-limiting on www subdomain</li>
              <li>Canonicalize URL variants and set preferred domain in GSC</li>
              <li>Google Search Console setup + sitemap submission</li>
              <li>GA4 installation with music + podcast conversion tracking</li>
              <li>Title tag and meta description rewrites site-wide</li>
              <li>Person + MusicArtist JSON-LD schema on homepage</li>
              <li>Bright Hearth page rebuild with SEO copy + PodcastSeries schema</li>
              <li>Album pages rebuilt with keyword copy + MusicAlbum schema</li>
            </ul>
          </div>

          <div className="border-l-4 border-oak pl-8 py-2 my-8">
            <h3 className="!mt-0">Month 2 — Content Launch</h3>
            <ul className="text-base text-ink/80">
              <li>'Why Christians Should Sing the Psalms' article published (590/mo, KD 5)</li>
              <li>'What Is the Tradwife Movement? A Christian Perspective' published (40,500/mo, KD 20)</li>
              <li>'Homemaking Skills Every Christian Woman Should Master' published (260/mo, KD ~zero)</li>
              <li>8 Bright Hearth episode show notes published</li>
              <li>Vinyl store page rewritten with keyword optimization</li>
              <li>Outreach to newchristendompress.com for contextual links</li>
            </ul>
          </div>

          <div className="border-l-4 border-wood pl-8 py-2 my-8">
            <h3 className="!mt-0">Month 3 — Authority Build</h3>
            <ul className="text-base text-ink/80">
              <li>'Psalms Set to Music: A Listener's Guide' publication</li>
              <li>'What Is a Productive Christian Household?' cornerstone page live</li>
              <li>Behind-the-album article for Awake the Dawn published</li>
              <li>Internal linking audit</li>
              <li>Backlink diversification outreach</li>
              <li>First keyword ranking and traffic performance report delivered</li>
            </ul>
          </div>

          <div className="w-full text-center">
             <div className="inline-block w-8 h-8 rotate-45 border-r border-b border-wood/40 mb-16 mx-auto mt-8"></div>
          </div>

          <h2>Pricing &amp; Investment</h2>
          <p>
            Appalachia Digital offers three engagement tiers tailored to this site's dual-vertical structure. The Foundation Sprint addresses the critical 429 issue and schema implementation — this is the prerequisite for everything else and delivers immediate unlocking of existing link equity.
          </p>

          <div className="bg-white/60 border border-wood/30 p-10 rounded-xl shadow-xl mt-8 text-center">
            <h3 className="!mt-0 text-amber font-heading text-4xl mb-2">Brian Sauvé Site Strategy</h3>
            <p className="font-body text-xl text-ink/60 tracking-widest uppercase mb-8">6 Month Engagement Model</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left mb-8 max-w-2xl mx-auto">
              <div>
                <span className="block text-sm uppercase tracking-widest text-wood/60 font-bold mb-1">Upfront Development</span>
                <span className="text-3xl font-heading text-ink">$3,500</span>
              </div>
              <div>
                <span className="block text-sm uppercase tracking-widest text-wood/60 font-bold mb-1">Monthly SEO Retainer</span>
                <span className="text-3xl font-heading text-ink">$1,500 <span className="text-base text-ink/50 block mt-1">/ month</span></span>
              </div>
            </div>
            
            <div className="border-y border-wood/10 py-8 mb-8 max-w-2xl mx-auto text-left">
              <span className="block text-sm uppercase tracking-widest text-wood/60 font-bold mb-1">Maintenance &amp; Hosting</span>
              <span className="text-2xl font-heading text-ink">$100 <span className="text-base text-ink/50">/ month</span></span>
            </div>
            
            <div className="bg-wood/5 border border-wood/20 p-8 rounded-lg max-w-2xl mx-auto flex flex-col sm:flex-row justify-between items-center text-left shadow-inner">
              <div>
                 <span className="block text-sm uppercase tracking-[0.2em] text-wood/80 font-bold mb-1">Six-Month Total</span>
                 <span className="block text-sm font-body text-ink/60">Includes upfront dev, SEO retainer, and hosting.</span>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                 <span className="text-5xl font-heading text-amber font-medium">$13,100</span>
              </div>
            </div>
          </div>

          <div className="bg-wood text-parchment p-12 text-center mt-24 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-texture-dark mix-blend-multiply opacity-50"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber/5 via-transparent to-transparent opacity-50 mix-blend-screen pointer-events-none"></div>
            <h2 className="!text-parchment relative z-10 !mt-0 !border-0 text-4xl mb-8">Why Appalachia Digital?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 text-left">
              <div className="space-y-2">
                <span className="text-amber text-2xl mb-2 block">✓</span>
                <p className="font-bold mb-1">Reformed Christian-owned</p>
                <p className="text-sm opacity-80">We're working within your theological tradition, not adapting to it.</p>
              </div>
              <div className="space-y-2">
                <span className="text-amber text-2xl mb-2 block">✓</span>
                <p className="font-bold mb-1">Infrastructure Knowledge</p>
                <p className="text-sm opacity-80">We've already audited thehauntedcosmos.com and identified the 429 issue.</p>
              </div>
              <div className="space-y-2">
                <span className="text-amber text-2xl mb-2 block">✓</span>
                <p className="font-bold mb-1">Data-Driven Modeling</p>
                <p className="text-sm opacity-80">DataForSEO-powered keyword research with live Google data.</p>
              </div>
              <div className="space-y-2">
                <span className="text-amber text-2xl mb-2 block">✓</span>
                <p className="font-bold mb-1">Full SEO Stack</p>
                <p className="text-sm opacity-80">Technical, content, schema, AI optimization, and music mapping.</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
