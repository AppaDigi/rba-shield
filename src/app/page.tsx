import styles from "./page.module.css";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

export const metadata = {
  title: "RBA Shield — GAL Protection. Member Power.",
  description:
    "RBA Shield gives Reformed Business Alliance members a growing legal endowment fund and a national attorney network ready to defend your rights.",
};

function ScaleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v1m0 16v1M3 12h1m16 0h1" />
      <path d="M6 6l1.5 1.5M16.5 16.5 18 18M6 18l1.5-1.5M16.5 7.5 18 6" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function GavelIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m14 13-8.5 8.5a2.12 2.12 0 0 1-3-3L11 10" />
      <path d="m16 16 6-6" />
      <path d="m8 8 6-6" />
      <path d="m9 7 8 8" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="5" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M12 7v4m0 0-4 6m4-6 4 6" />
    </svg>
  );
}

function HandshakeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </svg>
  );
}

function DiamondMark() {
  return <span className={styles.pillarListMark}>◆</span>;
}

export default function ShieldPage() {
  return (
    <main className={styles.page}>

      {/* ── Nav ── */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.navBrand}>
            <span className={styles.navBrandName}>RBA Shield</span>
            <span className={styles.navBrandSub}>Reformed Business Alliance</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#the-problem" className={styles.navLink}>The Problem</a>
            <a href="#the-program" className={styles.navLink}>The Program</a>
            <a href="#attorneys" className={styles.navLink}>Attorneys</a>
            <a href="#join" className={styles.navCta}>Take Up Your Shield</a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className={styles.hero}>
        <FadeIn className={styles.heroLeft} delay={0.1}>
          <div className={styles.heroRule} />
          <div className={styles.heroEyebrow}>GAL Protection · Member Power</div>
          <h1 className={styles.heroTitle}>
            When Your Convictions<br />
            Come Under{" "}
            <span className={styles.heroTitleItalic}>Attack</span>,<br />
            You Should Not<br />
            Stand Alone.
          </h1>
          <p className={styles.heroBody}>
            RBA Shield is a two-pronged legal defense initiative for members of
            the Reformed Business Alliance — a growing endowment fund and a
            national network of attorneys who share your values, ready to respond
            when threats arise.
          </p>
          <div className={styles.heroCtas}>
            <a href="#join" className={styles.btnGold}>Take Up Your Shield</a>
            <a href="#the-program" className={styles.btnGhost}>Learn About The Program</a>
          </div>
        </FadeIn>

        <FadeIn className={styles.heroPanel} delay={0.3}>
          <div className={styles.heroPanelLabel}>Program Overview</div>
          <div className={styles.heroPanelStats}>
            <div className={styles.heroPanelStat}>
              <span className={styles.heroPanelStatVal}>Pillar I</span>
              <span className={styles.heroPanelStatKey}>Legal Endowment Fund</span>
            </div>
            <div className={styles.heroPanelStat}>
              <span className={styles.heroPanelStatVal}>Pillar II</span>
              <span className={styles.heroPanelStatKey}>National Attorney Network</span>
            </div>
            <div className={styles.heroPanelStat}>
              <span className={styles.heroPanelStatVal}>~$250/yr</span>
              <span className={styles.heroPanelStatKey}>Annual Member Contribution</span>
            </div>
          </div>
          <div className={styles.heroPanelDivider} />
          <p className={styles.heroPanelQuote}>
            <span className={styles.heroPanelQuoteMark}>&ldquo;</span>
            Stronger Together. Protected Always.
          </p>
        </FadeIn>
      </div>

      {/* ── Quote Band ── */}
      <FadeIn className={styles.dividerBand} yOffset={20}>
        <span className={styles.dividerBandText}>
          <span className={styles.dividerBandMark}>◆&ensp;</span>
          C&amp;D letters &amp; demand responses
          <span className={styles.dividerBandMark}>&ensp;·&ensp;</span>
          Contract reviews
          <span className={styles.dividerBandMark}>&ensp;·&ensp;</span>
          Pro-bono representation
          <span className={styles.dividerBandMark}>&ensp;·&ensp;</span>
          Growing legal endowment
          <span className={styles.dividerBandMark}>&ensp;◆</span>
        </span>
      </FadeIn>

      {/* ── The Problem ── */}
      <section id="the-problem" className={styles.sectionFull}>
        <div className={styles.sectionFullInner}>
          <FadeIn>
            <div className={styles.sectionEyebrow}>The Problem</div>
            <h2 className={styles.sectionTitle}>
              The Legal System Is Being Used<br />
              as a Weapon Against Believers
            </h2>
            <p className={styles.sectionBody}>
              Christian business owners face a hostile legal climate. The cost of
              defending your convictions — or simply responding to a threat —
              puts justice out of reach for most.
            </p>
          </FadeIn>

          <StaggerContainer className={styles.problemGrid}>
            <StaggerItem className={styles.problemItem}>
              <div className={styles.problemItemNum}>01</div>
              <div className={styles.problemItemTitle}>Prohibitive Cost of Defense</div>
              <p className={styles.problemItemBody}>
                Attorney retainers begin in the thousands. A single
                cease-and-desist response can exceed a month of revenue for a
                small business — before any litigation begins.
              </p>
            </StaggerItem>
            <StaggerItem className={styles.problemItem}>
              <div className={styles.problemItemNum}>02</div>
              <div className={styles.problemItemTitle}>Legal Threats as Coercion</div>
              <p className={styles.problemItemBody}>
                Activists deploy legal threats cheaply, knowing most businesses
                cannot afford to fight back. Compliance is extracted through
                financial intimidation, not merit.
              </p>
            </StaggerItem>
            <StaggerItem className={styles.problemItem}>
              <div className={styles.problemItemNum}>03</div>
              <div className={styles.problemItemTitle}>Isolated and Outspent</div>
              <p className={styles.problemItemBody}>
                Without a coalition, every member faces identical threats alone
                — divided and dwarfed by well-funded opposition with
                institutional legal infrastructure.
              </p>
            </StaggerItem>
            <StaggerItem className={styles.problemItem}>
              <div className={styles.problemItemNum}>04</div>
              <div className={styles.problemItemTitle}>A Silenced Marketplace</div>
              <p className={styles.problemItemBody}>
                Fear of legal consequences drives Christian business owners to
                self-censor, forfeit convictions, and operate as if the
                First Amendment does not apply to commerce.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── The Program ── */}
      <section id="the-program" className={styles.section}>
        <FadeIn>
          <div className={styles.sectionEyebrow}>The Program</div>
          <h2 className={styles.sectionTitle}>A Two-Fold Defense</h2>
          <p className={styles.sectionBody}>
            RBA Shield combines a growing financial endowment with human capital —
            attorneys across the country who share your values and stand ready to act.
          </p>
        </FadeIn>

        <div className={styles.pillarWrap}>
          <FadeIn className={styles.pillar}>
            <div className={styles.pillarNumeral}>I</div>
            <div>
              <div className={styles.pillarTag}>Financial Strength</div>
              <h3 className={styles.pillarTitle}>The Legal Endowment Fund</h3>
              <p className={styles.pillarBody}>
                Every member&rsquo;s annual contribution flows into a collectively
                managed legal endowment. As membership grows, so does our
                capacity — not just for letters, but for litigation. The earlier
                you join, the more you help build what protects us all.
              </p>
              <ul className={styles.pillarList}>
                <li className={styles.pillarListItem}><DiamondMark />Annual membership fee invested into the shared endowment</li>
                <li className={styles.pillarListItem}><DiamondMark />Fund grows proportionally with membership — collective power</li>
                <li className={styles.pillarListItem}><DiamondMark />Deployed for member defense as cases arise</li>
                <li className={styles.pillarListItem}><DiamondMark />Annual transparency report published to all members</li>
                <li className={styles.pillarListItem}><DiamondMark />Governed by RBA leadership with member accountability</li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn className={styles.pillar} delay={0.2}>
            <div className={styles.pillarNumeral}>II</div>
            <div>
              <div className={styles.pillarTag}>Human Capital</div>
              <h3 className={styles.pillarTitle}>The National Attorney Network</h3>
              <p className={styles.pillarBody}>
                A vetted roster of attorneys across every state — sharing reformed
                values, willing to donate hours for smaller matters and take on
                landmark cases when the moment calls for it.
              </p>
              <ul className={styles.pillarList}>
                <li className={styles.pillarListItem}><DiamondMark />Cease-and-desist responses and demand letters at no cost</li>
                <li className={styles.pillarListItem}><DiamondMark />Contract reviews, compliance questions, advisory calls</li>
                <li className={styles.pillarListItem}><DiamondMark />Pro-bono and reduced-rate representation for significant cases</li>
                <li className={styles.pillarListItem}><DiamondMark />Attorneys vetted for values alignment with RBA membership</li>
                <li className={styles.pillarListItem}><DiamondMark />Geographic matching to connect you with local counsel</li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className={styles.sectionFull}>
        <div className={styles.sectionFullInner}>
          <FadeIn>
            <div className={styles.sectionEyebrow}>The Process</div>
            <h2 className={styles.sectionTitle}>Simple. Coordinated. Effective.</h2>
          </FadeIn>

          <StaggerContainer className={styles.stepsWrap}>
            <StaggerItem className={styles.step}>
              <span className={styles.stepNum}>01</span>
              <div className={styles.stepRule} />
              <div className={styles.stepTitle}>Join &amp; Contribute</div>
              <p className={styles.stepBody}>
                RBA members pay an annual Shield contribution. Your fee funds
                the endowment and grants full access to the attorney network
                for the year.
              </p>
            </StaggerItem>
            <StaggerItem className={styles.step}>
              <span className={styles.stepNum}>02</span>
              <div className={styles.stepRule} />
              <div className={styles.stepTitle}>Submit Your Need</div>
              <p className={styles.stepBody}>
                When a legal threat arrives, submit it through your member
                portal. Shield staff triage and match you with the right
                attorney for the situation.
              </p>
            </StaggerItem>
            <StaggerItem className={styles.step}>
              <span className={styles.stepNum}>03</span>
              <div className={styles.stepRule} />
              <div className={styles.stepTitle}>Get Defended</div>
              <p className={styles.stepBody}>
                Your attorney responds promptly — from a strongly-worded
                letter to full courtroom representation, backed by the
                endowment when needed.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── For Attorneys ── */}
      <section id="attorneys" className={styles.section}>
        <FadeIn>
          <div className={styles.sectionEyebrow}>For Attorneys</div>
          <h2 className={styles.sectionTitle}>Use Your Gift to Defend<br />Your Neighbors</h2>
          <p className={styles.sectionBody}>
            Are you an attorney who shares reformed values? Join the network and
            put your expertise to work for the body of Christ in the marketplace.
          </p>
        </FadeIn>

        <div className={styles.attorneysGrid}>
          <StaggerContainer className={styles.attorneyItems}>
            <StaggerItem className={styles.attorneyItem}>
              <span className={styles.attorneyItemIcon}><ScaleIcon /></span>
              <div>
                <div className={styles.attorneyItemTitle}>Minimal Commitment Required</div>
                <p className={styles.attorneyItemBody}>
                  Donate as little as a few hours per quarter — drafting
                  demand letters, reviewing contracts, or answering
                  compliance questions.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className={styles.attorneyItem}>
              <span className={styles.attorneyItemIcon}><GavelIcon /></span>
              <div>
                <div className={styles.attorneyItemTitle}>High-Stakes Litigation</div>
                <p className={styles.attorneyItemBody}>
                  When landmark cases arise, the endowment funds your work
                  at market rates — so you can take the cases that matter
                  without carrying the cost alone.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className={styles.attorneyItem}>
              <span className={styles.attorneyItemIcon}><NetworkIcon /></span>
              <div>
                <div className={styles.attorneyItemTitle}>A Network of Peers</div>
                <p className={styles.attorneyItemBody}>
                  Connect with like-minded attorneys across the country.
                  Collaborate on cases, share referrals, and build lasting
                  professional relationships within the alliance.
                </p>
              </div>
            </StaggerItem>
            <StaggerItem className={styles.attorneyItem}>
              <span className={styles.attorneyItemIcon}><HandshakeIcon /></span>
              <div>
                <div className={styles.attorneyItemTitle}>Values-First Matching</div>
                <p className={styles.attorneyItemBody}>
                  Every attorney in the network is vetted for alignment with
                  RBA&rsquo;s statement of values — you will always be working
                  alongside people who share your convictions.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <FadeIn className={styles.attorneyPanel} delay={0.2}>
            <h3 className={styles.attorneyPanelTitle}>Join the Attorney Network</h3>
            <p className={styles.attorneyPanelBody}>
              We are actively recruiting values-aligned attorneys in every
              state. No minimum commitment to join the roster — serve as
              your schedule and caseload allow.
            </p>
            <div className={styles.attorneyBadge}>Open Enrollment</div>
            <br /><br />
            <a
              href="mailto:shield@reformedbusinessalliance.com"
              className={styles.btnGold}
              style={{ display: "inline-flex" }}
            >
              Join The Waitlist
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── Pull Quote ── */}
      <FadeIn className={styles.quoteSection} yOffset={20}>
        <p className={styles.quoteText}>
          <span className={styles.quoteGoldMark}>&ldquo;</span>
          Stronger Together. Protected Always.
          <span className={styles.quoteGoldMark}>&rdquo;</span>
        </p>
        <div className={styles.quoteSource}>Reformed Business Alliance — Shield Program</div>
      </FadeIn>

      {/* ── Join ── */}
      <section id="join" className={styles.section}>
        <div className={styles.pricingWrap}>
          <FadeIn className={styles.pricingIntro}>
            <div className={styles.sectionEyebrow}>Membership</div>
            <h2 className={styles.sectionTitle}>
              Invest in the<br />Protection We<br />Build Together
            </h2>
            <p className={styles.sectionBody} style={{ marginTop: "1rem" }}>
              Your annual contribution funds the endowment and grants access to
              the attorney network. The sooner you join, the stronger the
              foundation we build for every member who follows.
            </p>
            <br />
            <p className={styles.sectionBody} style={{ fontSize: "0.875rem" }}>
              RBA membership in good standing is required to participate in the
              Shield program.{" "}
              <a
                href="https://www.reformedbusinessalliance.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--gold)", textDecoration: "none" }}
              >
                Learn about RBA membership &rarr;
              </a>
            </p>
          </FadeIn>

          <FadeIn className={styles.pricingCard} delay={0.2}>
            <div className={styles.pricingCardHeader}>
              <span className={styles.pricingCardBadge}>Annual Shield Membership</span>
              <div className={styles.pricingCardPrice}>
                <span className={styles.pricingCardCurrency}>$</span>
                <span className={styles.pricingCardAmount}>250</span>
              </div>
              <div className={styles.pricingCardPeriod}>per year</div>
              <p className={styles.pricingCardNote}>
                Pricing to be confirmed. Early members help build the
                endowment from the ground up — your contribution compounds
                in value as the network grows.
              </p>
            </div>
            <div className={styles.pricingCardFeatures}>
              <div className={styles.pricingCardFeature}>
                <span className={styles.pricingCardCheck}>◆</span>
                Contribution invested into the RBA Legal Endowment Fund
              </div>
              <div className={styles.pricingCardFeature}>
                <span className={styles.pricingCardCheck}>◆</span>
                Access to the national RBA Attorney Network
              </div>
              <div className={styles.pricingCardFeature}>
                <span className={styles.pricingCardCheck}>◆</span>
                C&amp;D responses and demand letter drafting
              </div>
              <div className={styles.pricingCardFeature}>
                <span className={styles.pricingCardCheck}>◆</span>
                Priority matching with local and state counsel
              </div>
              <div className={styles.pricingCardFeature}>
                <span className={styles.pricingCardCheck}>◆</span>
                Annual endowment fund transparency report
              </div>
              <div className={styles.pricingCardFeature}>
                <span className={styles.pricingCardCheck}>◆</span>
                Active RBA membership required
              </div>
            </div>
            <div className={styles.pricingCardFooter}>
              <a
                href="mailto:shield@reformedbusinessalliance.com"
                className={styles.pricingCardCta}
              >
                Get Early Access
              </a>
              <p className={styles.pricingCardSub}>
                Questions?{" "}
                <a
                  href="mailto:shield@reformedbusinessalliance.com"
                  className={styles.pricingCardSubLink}
                >
                  shield@reformedbusinessalliance.com
                </a>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <span className={styles.footerBrandName}>RBA Shield</span>
            <span className={styles.footerBrandSub}>Reformed Business Alliance</span>
          </div>
          <nav className={styles.footerLinks}>
            <a href="#the-problem" className={styles.footerLink}>The Problem</a>
            <a href="#the-program" className={styles.footerLink}>The Program</a>
            <a href="#attorneys" className={styles.footerLink}>For Attorneys</a>
            <a href="#join" className={styles.footerLink}>Join</a>
            <a
              href="https://www.reformedbusinessalliance.com"
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              RBA Main Site
            </a>
          </nav>
        </div>
        <p className={styles.footerCopy}>
          © {new Date().getFullYear()} Reformed Business Alliance. All rights reserved.
          RBA Shield is a member program of the Reformed Business Alliance.
        </p>
      </footer>

    </main>
  );
}
