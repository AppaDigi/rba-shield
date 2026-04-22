import styles from "./page.module.css";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

export const metadata = {
  title: "RBA Shield — LEGAL Protection. Member Power.",
  description:
    "RBA Shield gives Reformed Business Alliance members a growing legal endowment fund and a national attorney network ready to defend your rights.",
};

export default function ShieldPage() {
  return (
    <main className={styles.page}>

      {/* ========================= */}
      {/* NAV */}
      {/* ========================= */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.navBrand}>
            <span className={styles.navBrandName}>RBA Shield</span>
            <span className={styles.navBrandSub}>Reformed Business Alliance</span>
          </div>

          <div className={styles.navLinks}>
            <a href="#problem" className={styles.navLink}>The Problem</a>
            <a href="#program" className={styles.navLink}>The Program</a>
            <a href="#attorneys" className={styles.navLink}>Attorneys</a>
            <a href="#join" className={styles.navCta}>Take Up Your Shield</a>
          </div>
        </div>
      </nav>

      {/* ========================= */}
      {/* SCENE 1 — OPENING FRAME */}
      {/* ========================= */}
      <section className={styles.hero} data-scene="hero">
        <FadeIn className={styles.heroLeft} delay={0.1}>
          <div className={styles.heroEyebrow}>
            LEGAL Protection · Member Power
          </div>

          <h1 className={styles.heroTitle}>
            When Your Convictions<br />
            Come Under <span className={styles.heroTitleItalic}>Attack</span>,<br />
            You Should Not Stand Alone.
          </h1>

          <p className={styles.heroBody}>
            RBA Shield is a two-pronged legal defense initiative for members of
            the Reformed Business Alliance — a growing endowment fund and a
            national network of attorneys who share your values, ready to respond
            when threats arise.
          </p>

          <div className={styles.heroCtas}>
            <a href="#join" className={styles.btnGold}>
              Take Up Your Shield
            </a>
            <a href="#program" className={styles.btnGhost}>
              Learn About the Program
            </a>
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
              <span className={styles.heroPanelStatKey}>Annual Contribution</span>
            </div>
          </div>

          <div className={styles.heroPanelDivider} />
          <p className={styles.heroPanelQuote}>
            <span className={styles.heroPanelQuoteMark}>&ldquo;</span>
            Stronger Together. Protected Always.
          </p>
        </FadeIn>
      </section>

      {/* ========================= */}
      {/* SCENE 2 — PRESSURE BUILDS */}
      {/* ========================= */}
      <section id="problem" className={styles.sectionFull}>
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
              <span className={styles.problemItemNum}>01</span>
              <h3 className={styles.problemItemTitle}>Prohibitive Cost of Defense</h3>
              <p className={styles.problemItemBody}>
                Attorney retainers begin in the thousands. A single cease-and-desist
                response can exceed a month of revenue for a small business.
              </p>
            </StaggerItem>

            <StaggerItem className={styles.problemItem}>
              <span className={styles.problemItemNum}>02</span>
              <h3 className={styles.problemItemTitle}>Legal Threats as Coercion</h3>
              <p className={styles.problemItemBody}>
                Activists deploy legal threats cheaply, knowing most businesses
                cannot afford to fight back.
              </p>
            </StaggerItem>

            <StaggerItem className={styles.problemItem}>
              <span className={styles.problemItemNum}>03</span>
              <h3 className={styles.problemItemTitle}>Isolated and Outspent</h3>
              <p className={styles.problemItemBody}>
                Without a coalition, every member faces identical threats alone —
                divided and dwarfed by well-funded opposition.
              </p>
            </StaggerItem>

            <StaggerItem className={styles.problemItem}>
              <span className={styles.problemItemNum}>04</span>
              <h3 className={styles.problemItemTitle}>A Silenced Marketplace</h3>
              <p className={styles.problemItemBody}>
                Fear of legal consequences drives business owners to self-censor
                and forfeit convictions.
              </p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ========================= */}
      {/* SCENE 3 — THE TURN */}
      {/* ========================= */}
      <section className={styles.sceneTurn}>
        <FadeIn>
          <h2 className={styles.sceneTurnTitle}>
            But Faithful Men Should Not Face<br />
            Coordinated Pressure Alone.
          </h2>
          <p className={styles.sceneTurnBody}>
            RBA Shield exists to build what isolated Christians do not have on their own.
          </p>
        </FadeIn>
      </section>

      {/* ========================= */}
      {/* SCENE 4 — THE SHIELD */}
      {/* ========================= */}
      <section id="program" className={styles.section}>
        <FadeIn>
          <div className={styles.sectionEyebrow}>The Program</div>
          <h2 className={styles.sectionTitle}>A Two-Fold Defense</h2>
          <p className={styles.sectionBody}>
            RBA Shield combines a growing financial endowment with human capital —
            attorneys across the country who share your values and stand ready to act.
          </p>
        </FadeIn>

        {/* ========================= */}
        {/* SCENE 5 — PILLARS */}
        {/* ========================= */}
        <div className={styles.pillarWrap}>
          <FadeIn className={styles.pillar}>
            <div className={styles.pillarNumeral}>I</div>
            <div>
              <h3 className={styles.pillarTitle}>The Legal Endowment Fund</h3>
              <p className={styles.pillarBody}>
                Every member’s contribution builds a shared legal defense capacity —
                not just for letters, but for litigation.
              </p>
            </div>
          </FadeIn>

          <FadeIn className={styles.pillar} delay={0.2}>
            <div className={styles.pillarNumeral}>II</div>
            <div>
              <h3 className={styles.pillarTitle}>The National Attorney Network</h3>
              <p className={styles.pillarBody}>
                A vetted roster of attorneys across every state, ready to respond
                when threats arise.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================= */}
      {/* SCENE 6 — PROCESS */}
      {/* ========================= */}
      <section className={styles.sectionFull}>
        <div className={styles.sectionFullInner}>
          <FadeIn>
            <h2 className={styles.sectionTitle}>Simple. Coordinated. Effective.</h2>
            <p className={styles.sectionBody}>
              Membership builds the fund. The network handles the response.
              When a threat comes, you are not starting from zero.
            </p>
          </FadeIn>

          <StaggerContainer className={styles.stepsWrap}>
            <StaggerItem className={styles.step}>
              <span className={styles.stepNum}>01</span>
              <div className={styles.stepRule} />
              <div className={styles.stepTitle}>Join & Contribute</div>
            </StaggerItem>

            <StaggerItem className={styles.step}>
              <span className={styles.stepNum}>02</span>
              <div className={styles.stepRule} />
              <div className={styles.stepTitle}>Submit Your Need</div>
            </StaggerItem>

            <StaggerItem className={styles.step}>
              <span className={styles.stepNum}>03</span>
              <div className={styles.stepRule} />
              <div className={styles.stepTitle}>Get Defended</div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ========================= */}
      {/* SCENE 7 — ATTORNEYS */}
      {/* ========================= */}
      <section id="attorneys" className={styles.section} style={{ textAlign: 'center', paddingBottom: '2rem' }}>
        <FadeIn>
          <h2 className={styles.sectionTitle}>
            Use Your Gift to Defend<br />
            Your Neighbors
          </h2>
          <p className={styles.sectionBody} style={{ margin: '0 auto 2rem auto' }}>
            Join the network and put your expertise to work for the body of Christ.
          </p>
          <a href="mailto:shield@reformedbusinessalliance.com" className={styles.btnGold}>
            Join the Attorney Network
          </a>
        </FadeIn>
      </section>

      {/* ========================= */}
      {/* SCENE 8 — QUOTE */}
      {/* ========================= */}
      <FadeIn className={styles.quoteSection} yOffset={20}>
        <p className={styles.quoteText}>
          <span className={styles.quoteGoldMark}>&ldquo;</span>
          Stronger Together. Protected Always.
          <span className={styles.quoteGoldMark}>&rdquo;</span>
        </p>
      </FadeIn>

      {/* ========================= */}
      {/* SCENE 9 — MEMBERSHIP */}
      {/* ========================= */}
      <section id="join" className={styles.section}>
        <div className={styles.pricingWrap}>
          <FadeIn className={styles.pricingIntro}>
            <h2 className={styles.sectionTitle}>
              Invest in the Protection<br />
              We Build Together
            </h2>
            <p className={styles.sectionBody}>
              Your contribution funds the endowment and grants access to the network.
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
            </div>
            <div className={styles.pricingCardFooter}>
              <a href="mailto:shield@reformedbusinessalliance.com" className={styles.pricingCardCta}>
                Get Early Access
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================= */}
      {/* SCENE 10 — FINAL */}
      {/* ========================= */}
      <section className={styles.sceneFinal}>
        <FadeIn>
          <h2 className={styles.sceneFinalTitle}>Do Not Stand Alone</h2>
          <p className={styles.sceneFinalBody}>Build the shield before you need it.</p>
          <a href="#join" className={styles.btnGold}>
            Take Up Your Shield
          </a>
        </FadeIn>
      </section>

    </main>
  );
}
