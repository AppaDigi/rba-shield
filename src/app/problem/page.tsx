import styles from "@/app/page.module.css";
import Navigation from "@/components/Navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata = {
  title: "The Problem — RBA Shield",
  description: "Christian business owners face a hostile legal climate. Here is the problem we are solving.",
};

export default function ProblemPage() {
  return (
    <main className={styles.page}>
      <Navigation />

      <section className={styles.pageHero}>
        <div className={styles.heroBackgroundLogoContainer}>
          <Logo className={styles.heroBackgroundLogo} />
        </div>
        <FadeIn>
          <h1 className={styles.pageHeroTitle}>
            The Law as a <span className={styles.pageHeroTitleAccent}>Weapon</span>
          </h1>
          <p className={styles.pageHeroSubtitle}>
            Christian business owners are facing a hostile legal climate where activists
            and antagonistic state apparatuses use the courts to silence convictions.
          </p>
        </FadeIn>
      </section>

      <section className={styles.pageArticle}>
        <FadeIn>
          <h2>The Cost of Capitulation</h2>
          <p>
            For decades, the standard advice to Christian business owners has been simple:
            keep your head down, settle the lawsuit, and pay the fine. The rationale is
            always financial. It is cheaper to capitulate than to fight a protracted legal battle
            against an opponent who faces no personal financial risk.
          </p>
          <p>
            But this strategy of retreat has emboldened activists. When they know a business
            will fold under the pressure of a single cease-and-desist letter, the letters become
            their primary tool of cultural enforcement.
          </p>
          <blockquote>
            &quot;When defending your convictions costs you your livelihood, justice becomes a luxury only the wealthy can afford.&quot;
          </blockquote>
          <p>
            An initial attorney retainer begins in the thousands. A single response to an HR
            complaint or activist lawsuit can exceed a month of revenue for a small business.
            They are not trying to win in court; they are trying to bankrupt you before you ever get there.
          </p>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <h2>Isolated and Outspent</h2>
          <p>
            Currently, when a member of the community faces a legal threat, they face it entirely alone.
            They must source their own attorney—hoping they find one who actually shares their worldview—and
            they must fund their defense entirely out of pocket.
          </p>
          <p>
            Meanwhile, the opposition is highly organized, heavily funded by massive NGOs, and strategically coordinated.
            They do not act as individuals; they act as an institution. Until we build our own institutions to
            counter them, we will continue to lose.
          </p>
        </FadeIn>
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
