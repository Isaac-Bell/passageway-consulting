import Link from "next/link";

const bookingUrl = "https://passagewayconsulting.as.me/";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <header className="site-header interior-site-header">
        <div className="shell nav-shell">
          <Link className="brand" href="/" aria-label="Passageway Consulting home"><img className="brand-logo" src="/images/passageway-logo.png" alt="" /></Link>
          <nav className="desktop-nav interior-nav" aria-label="Primary navigation"><Link href="/#about">About</Link><Link href="/#experiences">Work with us</Link><Link href="/events">Events</Link><Link href="/blog">Blog</Link><Link href="/resources">Resources</Link></nav>
          <a className="button button-small button-dark header-cta" href={bookingUrl} target="_blank" rel="noreferrer">Book a session <span aria-hidden="true">↗</span></a>
          <details className="mobile-nav"><summary aria-label="Open navigation"><span /><span /></summary><div className="mobile-nav-panel"><Link href="/">Home</Link><Link href="/#about">About</Link><Link href="/#experiences">Work with us</Link><Link href="/events">Events</Link><Link href="/blog">Blog</Link><Link href="/resources">Resources</Link><a href={bookingUrl} target="_blank" rel="noreferrer">Book a session</a></div></details>
        </div>
      </header>
      {children}
      <footer>
        <div className="shell footer-grid"><div><Link className="brand footer-brand" href="/"><img className="brand-logo" src="/images/passageway-logo.png" alt="Passageway Consulting" /></Link><p>Connect. Heal. Empower.</p></div><div className="footer-links"><div><strong>Explore</strong><Link href="/">Home</Link><Link href="/blog">Blog</Link><Link href="/events">Events</Link><Link href="/resources">Resources</Link></div><div><strong>Connect</strong><a href={bookingUrl} target="_blank" rel="noreferrer">Book a session</a><a href="mailto:hello@passagewayconsulting.com">Email us</a></div></div></div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Passageway Consulting</span><span>Kansas City–based · Online worldwide</span></div>
      </footer>
    </main>
  );
}
