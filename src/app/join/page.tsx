import styles from "@/app/page.module.css";
import Navigation from "@/components/Navigation";
import { FadeIn } from "@/components/ui/FadeIn";
import Link from "next/link";
import Logo from "@/components/ui/Logo";

export const metadata = {
  title: "Join — RBA Shield",
  description: "Join RBA Shield and take up your defense.",
};

export default function JoinPage() {
  return (
    <main className={styles.page}>
      <Navigation />

      <section className={styles.pageHero}>
        <div className={styles.heroBackgroundLogoContainer}>
          <Logo className={styles.heroBackgroundLogo} />
        </div>
        <FadeIn>
          <h1 className={styles.pageHeroTitle}>
            Take Up Your <span className={styles.pageHeroTitleAccent}>Shield</span>
          </h1>
          <p className={styles.pageHeroSubtitle}>
            Membership is an investment in your own protection and a commitment to the
            defense of the brethren. We build the shield together.
          </p>
        </FadeIn>
      </section>

      <section className={styles.pageArticle} style={{ minHeight: '60vh' }}>
        <FadeIn>
          <h2>Membership Requirements</h2>
          <p>
            RBA Shield is a proprietary defense network. To be eligible for coverage under the Shield, 
            you must be an active, dues-paying member of the Reformed Business Alliance in good standing.
            Your application will be reviewed and verified by our admissions board prior to the activation
            of your coverage.
          </p>
          <br/>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            maxWidth: '600px',
            margin: '3rem auto 0',
            padding: '3rem',
            border: '2px solid var(--ink)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <h3 style={{
              fontFamily: 'var(--font-oswald)',
              fontSize: '2.5rem',
              textTransform: 'uppercase',
              color: 'var(--ink)',
              margin: 0
            }}>$250 / year</h3>
            
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              fontSize: '1.2rem',
              color: 'var(--ink)'
            }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--heritage-red)' }}>✓</span> Full access to the National Attorney Network
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--heritage-red)' }}>✓</span> Eligibility for Legal Endowment Fund grants
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--heritage-red)' }}>✓</span> Priority intake for emerging threats
              </li>
            </ul>

            <button className={styles.btnEpic} style={{ width: '100%', marginTop: '1rem' }}>
              Begin Application
            </button>
            <div style={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(0,0,0,0.6)' }}>
              Card will not be charged until application is approved.
            </div>
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
