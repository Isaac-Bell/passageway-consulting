import Link from "next/link";
import type { ReactNode } from "react";

const email = "hello@passagewayconsulting.com";
const bookingUrl = "https://passagewayconsulting.as.me/";

export type RelatedPage = {
  href: string;
  label: string;
  description: string;
};

type InteriorPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  relatedPages: RelatedPage[];
  ctaTitle?: string;
  ctaCopy?: string;
};

export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const siteUrl = "https://passagewayconsulting.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${path}#service`,
    name,
    description,
    url: `${siteUrl}${path}`,
    provider: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Passageway Consulting",
      url: siteUrl,
    },
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${siteUrl}${path}`,
      availableLanguage: "English",
    },
    audience: {
      "@type": "PeopleAudience",
      suggestedGender: "female",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function InteriorPage({
  eyebrow,
  title,
  intro,
  children,
  relatedPages,
  ctaTitle = "Ready for a compassionate next step?",
  ctaCopy =
    "You do not need to have the right words before you begin. Explore the appointment options and choose the support that feels right for you.",
}: InteriorPageProps) {
  return (
    <main className="interior-page">
      <header className="site-header">
        <div className="shell nav-shell">
          <Link className="brand" href="/" aria-label="Passageway Consulting home">
            <img className="brand-logo" src="/images/passageway-logo.png" alt="" />
          </Link>

          <nav className="desktop-nav interior-nav" aria-label="Primary navigation">
            <Link href="/online-emotional-health-consulting">Online consulting</Link>
            <Link href="/nervous-system-regulation-for-women">Nervous-system support</Link>
            <Link href="/online-womens-emotional-health-workshops">Online workshops</Link>
            <Link href="/self-compassion-for-women">Self-compassion</Link>
          </nav>

          <a
            className="button button-small button-dark header-cta"
            href={bookingUrl}
            target="_blank"
            rel="noreferrer"
          >
            Book a session <Arrow />
          </a>

          <details className="mobile-nav">
            <summary aria-label="Open navigation"><span /><span /></summary>
            <div className="mobile-nav-panel">
              <Link href="/">Home</Link>
              <Link href="/online-emotional-health-consulting">Online consulting</Link>
              <Link href="/nervous-system-regulation-for-women">Nervous-system support</Link>
              <Link href="/online-womens-emotional-health-workshops">Online workshops</Link>
              <Link href="/self-compassion-for-women">Self-compassion</Link>
              <a href={bookingUrl} target="_blank" rel="noreferrer">Book a session</a>
            </div>
          </details>
        </div>
      </header>

      <section className="interior-hero">
        <div className="interior-orbit interior-orbit-one" aria-hidden="true" />
        <div className="interior-orbit interior-orbit-two" aria-hidden="true" />
        <div className="shell interior-hero-grid">
          <div>
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Passageway</Link><span aria-hidden="true">/</span><span>{eyebrow}</span>
            </nav>
            <p className="kicker">{eyebrow}</p>
            <h1>{title}</h1>
            <p className="interior-intro">{intro}</p>
            <div className="interior-actions">
              <a className="button button-dark" href={bookingUrl} target="_blank" rel="noreferrer">
                Explore appointments <Arrow />
              </a>
              <Link className="text-link" href="/#guides">Meet Hannah & Kimberly <Arrow /></Link>
            </div>
          </div>
          <aside className="service-area-card">
            <span>Based in</span>
            <strong>Kansas City</strong>
            <p>Meeting with women online across the United States and worldwide.</p>
            <div><i /> Compassion <i /> Regulation <i /> Empowerment</div>
          </aside>
        </div>
      </section>

      <div className="interior-content">{children}</div>

      <section className="related-section" aria-labelledby="related-heading">
        <div className="shell">
          <p className="kicker">Continue exploring</p>
          <h2 id="related-heading">More ways through the Passageway.</h2>
          <div className="related-grid">
            {relatedPages.map((page) => (
              <Link href={page.href} className="related-card" key={page.href}>
                <h3>{page.label}</h3>
                <p>{page.description}</p>
                <span>Explore this path <Arrow /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="interior-cta">
        <div className="shell interior-cta-grid">
          <div>
            <p className="kicker kicker-light">Compassion opens the way</p>
            <h2>{ctaTitle}</h2>
          </div>
          <div>
            <p>{ctaCopy}</p>
            <a className="button button-cream" href={bookingUrl} target="_blank" rel="noreferrer">
              Book online <Arrow />
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div>
            <Link className="brand footer-brand" href="/">
              <img className="brand-logo" src="/images/passageway-logo.png" alt="Passageway Consulting" />
            </Link>
            <p>Connect. Heal. Empower.</p>
          </div>
          <div className="footer-links">
            <div>
              <strong>Explore</strong>
              <Link href="/online-emotional-health-consulting">Online consulting</Link>
              <Link href="/nervous-system-regulation-for-women">Nervous-system support</Link>
              <Link href="/online-womens-emotional-health-workshops">Online workshops</Link>
              <Link href="/self-compassion-for-women">Self-compassion</Link>
            </div>
            <div>
              <strong>Connect</strong>
              <a href={bookingUrl} target="_blank" rel="noreferrer">Book an appointment</a>
              <Link href="/#guides">Meet Hannah & Kimberly</Link>
              <a href={`mailto:${email}`}>Email us</a>
            </div>
          </div>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} Passageway Consulting</span>
          <span>Kansas City–based · Online worldwide</span>
        </div>
      </footer>
    </main>
  );
}

export function ContentSection({
  eyebrow,
  title,
  children,
  tone = "paper",
  id,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  tone?: "paper" | "cream" | "sage" | "forest";
  id?: string;
}) {
  return (
    <section className={`editorial-section editorial-${tone}`} id={id}>
      <div className="shell editorial-grid">
        <div>
          {eyebrow ? <p className="kicker">{eyebrow}</p> : null}
          <h2>{title}</h2>
        </div>
        <div className="editorial-copy">{children}</div>
      </div>
    </section>
  );
}
