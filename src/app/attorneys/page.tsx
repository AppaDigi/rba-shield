import styles from "@/app/page.module.css";
import Navigation from "@/components/Navigation";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/FadeIn";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata = {
  title: "For Attorneys — RBA Shield",
  description: "Join the RBA Shield National Attorney Network.",
};

export default function AttorneysPage() {
  return (
    <main className={styles.page}>
      <Navigation />

      <section className={styles.pageHero}>
        <div className={styles.heroBackgroundLogoContainer}>
          <Logo className={styles.heroBackgroundLogo} />
        </div>
        <FadeIn>
          <h1 className={styles.pageHeroTitle}>
            The National <span className={styles.pageHeroTitleAccent}>Attorney Network</span>
          </h1>
          <p className={styles.pageHeroSubtitle}>
            We are building a comprehensive roster of highly-skilled, allied legal counsel across all fifty states.
            Join the vanguard.
          </p>
        </FadeIn>
      </section>

      <section className={styles.pageArticle}>
        <FadeIn>
          <h2>A Call for Counsel</h2>
          <p>
            The RBA Shield is only as strong as the attorneys who stand on the front lines.
            We are actively vetting and recruiting attorneys across all jurisdictions to serve as the
            primary defense mechanism for our members.
          </p>
          <p>
            When an RBA Shield member is targeted, we do not send them to the yellow pages.
            We connect them immediately with a vetted attorney in our network who understands
            both the legal landscape and the spiritual stakes of the conflict.
          </p>
          <blockquote>
            &quot;We are assembling men and women of conviction who are willing to apply their legal
            expertise to defend the brethren.&quot;
          </blockquote>
        </FadeIn>

        <StaggerContainer className={styles.problemSequence}>
          <StaggerItem className={styles.problemItem}>
            <span>01</span>
            <h3>Join the Network</h3>
            <p>
              If you are an attorney who shares our convictions and is willing to
              defend members in your jurisdiction, we invite you to apply. You will become
              a trusted resource for our members.
            </p>
          </StaggerItem>

          <StaggerItem className={styles.problemItem}>
            <span>02</span>
            <h3>Refer a Need</h3>
            <p>
              RBA Shield acts as a force multiplier. If your client faces a threat
              they cannot afford to fight, our endowment fund may be able to help. We
              work with counsel to ensure justice is not forfeited due to a lack of capital.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </section>

      <section id="join" className={styles.sceneJoinEpic}>
        <div className={styles.joinEpicBackground} />
        <FadeIn className={styles.joinEpicContent}>
          <div className={styles.joinEpicText}>
            <h2>
              Apply as<br />
              Allied Counsel
            </h2>
            <p>
              We are currently accepting applications from attorneys across the United States.
              Submit your credentials for vetting.
            </p>
          </div>
          <div className={styles.joinEpicAction}>
            <Link href="/join" className={styles.btnEpic}>
              Begin Application
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
