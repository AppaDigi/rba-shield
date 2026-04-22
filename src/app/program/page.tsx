import styles from "@/app/page.module.css";
import Navigation from "@/components/Navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata = {
  title: "The Program — RBA Shield",
  description: "A two-fold defense strategy: A legal endowment fund and a national attorney network.",
};

export default function ProgramPage() {
  return (
    <main className={styles.page}>
      <Navigation />

      <section className={styles.pageHero}>
        <div className={styles.heroBackgroundLogoContainer}>
          <Logo className={styles.heroBackgroundLogo} />
        </div>
        <FadeIn>
          <h1 className={styles.pageHeroTitle}>
            A Two-Fold <span className={styles.pageHeroTitleAccent}>Defense</span>
          </h1>
          <p className={styles.pageHeroSubtitle}>
            RBA Shield combines a growing financial endowment with human capital —
            attorneys across the country who share your values and stand ready to act.
          </p>
        </FadeIn>
      </section>

      <section className={styles.pageArticle}>
        <div className={styles.epicPillars}>
          <FadeIn className={styles.epicPillar} yOffset={40}>
            <div className={styles.epicPillarNumber}>I</div>
            <div className={styles.epicPillarContent}>
              <h3>The Legal Endowment Fund</h3>
              <p>
                Every member’s contribution builds a shared, aggressive legal defense capacity —
                not just for polite letters, but for decisive litigation. We pool our capital to ensure no believer is ever outspent by activists.
              </p>
              <br />
              <p>
                By aggregating a massive war chest, we remove the primary weapon used against Christian
                businesses: financial attrition. When they know you have the backing of a national endowment,
                the calculus of litigation changes immediately.
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
              <br />
              <p>
                These are not just competent attorneys; they are men and women who share your core
                convictions. You will not have to explain your faith to your defender. They already
                understand what is at stake.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

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

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.navBrandContainer}>
            <Link href="/">
              <Logo className={styles.footerLogo} />
            </Link>
            <div className={styles.navBrand}>
              <span className={styles.navBrandName}>RBA Shield</span>
              <span className={styles.navBrandSub}>Reformed Business Alliance</span>
            </div>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/problem" className={styles.footerLink}>The Problem</Link>
            <Link href="/program" className={styles.footerLink}>The Program</Link>
            <Link href="/attorneys" className={styles.footerLink}>Attorneys</Link>
            <Link href="/join" className={styles.footerLink}>Join</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
