import styles from "./page.module.css";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Logo from "@/components/ui/Logo";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";

export const metadata = {
  title: "RBA Shield — LEGAL Protection. Member Power.",
  description:
    "RBA Shield gives Reformed Business Alliance members a growing legal endowment fund and a national attorney network ready to defend your rights.",
};

export default function ShieldPage() {
  return (
    <main className={styles.page}>
      {/* Background elements */}
      <div className={styles.backdrop} />
      <div className={styles.noise} />

      <Navigation />

      {/* ========================= */}
      {/* SCENE 1 — OPENING FRAME */}
      {/* ========================= */}
      <section className={styles.sceneHero} data-scene="hero">
        <div className={styles.heroBackgroundLogoContainer}>
          <Logo className={styles.heroBackgroundLogo} />
        </div>
        <div className={styles.heroFrame} />

        <div className={styles.heroGrid}>
          <FadeIn className={styles.heroContent} delay={0.1}>
            <div className={styles.heroRule} />
            <div className={styles.heroEyebrow}>
              LEGAL Protection · Member Power
            </div>

            <h1 className={styles.heroTitle}>
              When Your Convictions<br />
              Come Under <span className={styles.heroTitleAccent}>Attack</span>,<br />
              You Should Not Stand Alone.
            </h1>

            <p className={styles.heroBody}>
              RBA Shield is a two-pronged legal defense initiative for members of
              the Reformed Business Alliance — a growing endowment fund and a
              national network of attorneys who share your values, ready to respond
              when threats arise.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/join" className={styles.btnPrimary}>
                Take Up Your Shield
              </Link>
              <Link href="/program" className={styles.btnSecondary}>
                Learn About the Program
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================= */}
      {/* SCENE 1.5 — METADATA */}
      {/* ========================= */}
      <section className={styles.sceneMetadata}>
        <FadeIn delay={0.3} yOffset={20} className={styles.metadataBand}>
          <Link href="/program" className={styles.metadataCard}>
            <div className={styles.metadataCardAccent} />
            <span>Pillar I</span>
            <strong>Legal Endowment Fund</strong>
          </Link>
          <Link href="/attorneys" className={styles.metadataCard}>
            <div className={styles.metadataCardAccent} />
            <span>Pillar II</span>
            <strong>National Attorney Network</strong>
          </Link>
          <Link href="/join" className={styles.metadataCard}>
            <div className={styles.metadataCardAccent} />
            <span>Access</span>
            <strong>$250 / yr</strong>
          </Link>
        </FadeIn>
      </section>

      {/* ========================= */}
      {/* SCENE 2 — PRESSURE BUILDS */}
      {/* ========================= */}
      <section id="problem" className={styles.sceneProblem}>
        <FadeIn className={styles.sceneIntro}>
          <span className={styles.eyebrow}>The Problem</span>

          <h2>
            The Legal System Is Being Used<br />
            as a Weapon Against Believers
          </h2>

          <p>
            Christian business owners face a hostile legal climate. The cost of
            defending your convictions — or simply responding to a threat —
            puts justice out of reach for most.
          </p>
        </FadeIn>

        <StaggerContainer className={styles.problemSequence}>
          <StaggerItem className={styles.problemItem}>
            <span>01</span>
            <h3>Prohibitive Cost of Defense</h3>
            <p>
              Attorney retainers begin in the thousands. A single cease-and-desist
              response can exceed a month of revenue for a small business.
            </p>
          </StaggerItem>

          <StaggerItem className={styles.problemItem}>
            <span>02</span>
            <h3>Legal Threats as Coercion</h3>
            <p>
              Activists deploy legal threats cheaply, knowing most businesses
              cannot afford to fight back.
            </p>
          </StaggerItem>

          <StaggerItem className={styles.problemItem}>
            <span>03</span>
            <h3>Isolated and Outspent</h3>
            <p>
              Without a coalition, every member faces identical threats alone —
              divided and dwarfed by well-funded opposition.
            </p>
          </StaggerItem>

          <StaggerItem className={styles.problemItem}>
            <span>04</span>
            <h3>A Silenced Marketplace</h3>
            <p>
              Fear of legal consequences drives business owners to self-censor
              and forfeit convictions.
            </p>
          </StaggerItem>
        </StaggerContainer>

        <FadeIn delay={0.4} style={{ marginTop: '4rem' }}>
           <Link href="/problem" className={styles.btnSecondary} style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>
             Read Full Details
           </Link>
        </FadeIn>
      </section>

      {/* ========================= */}
      {/* SCENE 3 — THE TURN */}
      {/* ========================= */}
      <section className={styles.sceneTurn}>
        <FadeIn>
          <h2>
            But Faithful Men Should Not Face<br />
            Coordinated Pressure Alone.
          </h2>
          <p>
            RBA Shield exists to build what isolated Christians do not have on their own.
          </p>
        </FadeIn>
      </section>

      {/* ========================= */}
      {/* SCENE 4 — THE SHIELD */}
      {/* ========================= */}
      <section id="program" className={styles.sceneProgram}>
        <FadeIn className={styles.sceneIntro}>
          <span className={styles.eyebrow}>The Program</span>
          <h2>A Two-Fold Defense</h2>
          <p>
            RBA Shield combines a growing financial endowment with human capital —
            attorneys across the country who share your values and stand ready to act.
          </p>
        </FadeIn>

        <div className={styles.epicPillars}>
          <FadeIn className={styles.epicPillar} yOffset={40}>
            <div className={styles.epicPillarNumber}>I</div>
            <div className={styles.epicPillarContent}>
              <h3>The Legal Endowment Fund</h3>
              <p>
                Every member’s contribution builds a shared, aggressive legal defense capacity —
                not just for polite letters, but for decisive litigation. We pool our capital to ensure no believer is ever outspent by activists.
              </p>
            </div>
          </FadeIn>

          <FadeIn className={styles.epicPillar} delay={0.2} yOffset={40}>
            <div className={styles.epicPillarNumber}>II</div>
            <div className={styles.epicPillarContent}>
              <h3>The National Attorney Network</h3>
              <p>
                A vetted, highly-coordinated roster of allied attorneys across the country.
                When a threat materializes, our network responds immediately—a massive, institutional shield wall standing between you and those who seek to ruin you.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4} style={{ marginTop: '4rem' }}>
           <Link href="/program" className={styles.btnSecondary} style={{ color: 'var(--ink)', borderColor: 'var(--ink)' }}>
             Explore the Program
           </Link>
        </FadeIn>
      </section>

      {/* ========================= */}
      {/* SCENE 6 — PROCESS */}
      {/* ========================= */}
      <section className={styles.sceneProcess}>
        <FadeIn className={styles.sceneIntro}>
          <h2>Simple. Coordinated. Effective.</h2>
          <p>
            Membership builds the fund. The network handles the response.
            When a threat comes, you are not starting from zero.
          </p>
        </FadeIn>

        <StaggerContainer className={styles.processSteps}>
          <StaggerItem>
            <span>01</span>
            <h4>Join & Contribute</h4>
          </StaggerItem>

          <StaggerItem>
            <span>02</span>
            <h4>Submit Your Need</h4>
          </StaggerItem>

          <StaggerItem>
            <span>03</span>
            <h4>Get Defended</h4>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* ========================= */}
      {/* SCENE 7 — ATTORNEYS */}
      {/* ========================= */}
      <section id="attorneys" className={styles.sceneAttorneys}>
        <FadeIn className={styles.sceneIntro}>
          <h2>
            Use Your Gift to Defend<br />
            Your Neighbors
          </h2>
          <p>
            Join the network and put your expertise to work for the body of Christ.
          </p>
          <Link href="/attorneys" className={styles.btnPrimary}>
            Join the Attorney Network
          </Link>
        </FadeIn>
      </section>

      {/* ========================= */}
      {/* SCENE 8 — QUOTE */}
      {/* ========================= */}
      <section className={styles.sceneQuote}>
        <FadeIn yOffset={20}>
          <p>
            <span className={styles.quoteMark}>&ldquo;</span>
            Stronger Together. Protected Always.
            <span className={styles.quoteMark}>&rdquo;</span>
          </p>
        </FadeIn>
      </section>

      {/* ========================= */}
      {/* SCENE 9 — JOIN THE SHIELD */}
      {/* ========================= */}
      <section id="join" className={styles.sceneJoinEpic}>
        <div className={styles.joinEpicBackground} />
        <FadeIn className={styles.joinEpicContent}>
          <div className={styles.joinEpicText}>
            <h2>
              Invest in the Protection<br />
              We Build Together
            </h2>
            <p>
              Your contribution funds the endowment and guarantees your access to the network.
              Build the shield before you need it.
            </p>
          </div>
          <div className={styles.joinEpicAction}>
            <div className={styles.joinEpicPrice}>
              <span>Annual Membership</span>
              <strong>$250 <small>/ yr</small></strong>
            </div>
            <Link href="/join" className={styles.btnEpic}>
              Take Up Your Shield
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.navBrandContainer}>
            <Link href="/">
              <Logo className={styles.footerLogo} />
            </Link>
            <div className={styles.footerBrand}>
              <span className={styles.footerBrandName}>RBA Shield</span>
              <span className={styles.footerBrandSub}>Reformed Business Alliance</span>
            </div>
          </div>
          <nav className={styles.footerLinks}>
            <Link href="/problem" className={styles.footerLink}>The Problem</Link>
            <Link href="/program" className={styles.footerLink}>The Program</Link>
            <Link href="/attorneys" className={styles.footerLink}>For Attorneys</Link>
            <Link href="/join" className={styles.footerLink}>Join</Link>
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
