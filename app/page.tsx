import Link from "next/link";
import { FeaturedEventBanner, ManagedServices, ManagedTeam } from "./components/CmsPublic";

const email = "hello@passagewayconsulting.com";
const bookingUrl = "https://passagewayconsulting.as.me/";

const values = [
  ["Compassion", "Your story makes sense and deserves love, dignity, and truth."],
  ["Regulation", "Lasting change grows from safety felt in the body and nervous system."],
  ["Empowerment", "Your voice, needs, choices, and boundaries matter."],
];

const guidingTruths = [
  {
    number: "01",
    title: "You are not broken—you adapted beautifully to survive",
    copy: "What looks like dysfunction is often a brilliant survival strategy. We honor the patterns that helped you cope, then gently invite you into healing that no longer requires those same tools. You make sense, and you are allowed to choose something new.",
  },
  {
    number: "02",
    title: "Healing begins with love, not self-improvement",
    copy: "You do not need to become someone else. Healing is a return to yourself—learning to stop abandoning who you are and to walk with yourself in tenderness, truth, and care.",
  },
  {
    number: "03",
    title: "You are already enough",
    copy: "Your pain is not proof of brokenness; it is evidence that something happened that mattered. You do not have to earn worth or become more lovable. Even in the middle of the mess, you are enough.",
  },
  {
    number: "04",
    title: "Common humanity is the foundation of compassion",
    copy: "Pain does not make you weak; it makes you human. Shame isolates, compassion connects, and no one is alone in carrying wounds or longing to be understood.",
  },
  {
    number: "05",
    title: "Emotions are God-given intelligence",
    copy: "Emotions are not enemies to control but messengers to hear. Anger has wisdom, sadness has depth, and joy has power. You do not have to perform happiness to be healthy—you get to be real.",
  },
  {
    number: "06",
    title: "Life is nuanced—we can hold two truths",
    copy: "You can be healing and still hurting. You can love someone and need boundaries. You can feel grateful and still grieve. Wisdom often lives in both/and rather than either/or.",
  },
  {
    number: "07",
    title: "Regulation is the bedrock of lasting change",
    copy: "Your body holds your story, and safety must be felt—not merely understood. As your nervous system learns it is safe to rest, receive, and be seen, you regain access to choice. We heal best in safe, connected relationships.",
  },
  {
    number: "08",
    title: "Your voice, needs, and boundaries matter",
    copy: "You are allowed to take up space. You do not have to earn rest, respect, or love, and saying no does not make you bad—it makes you honest.",
  },
  {
    number: "09",
    title: "Truth brings healing and freedom",
    copy: "Truth and love are companions. We will never shame you, but we will tell you the truth in love. Facing reality with compassion is not cruel—it is a path toward freedom.",
  },
  {
    number: "10",
    title: "You were created on purpose—and there is always hope",
    copy: "You were designed with intention, beauty, and purpose by a Creator who delights in you. No matter how deep the pain or how stuck you feel, your story is not over. You were made for healing, love, connection, and truth.",
  },
];

const faqs = [
  {
    question: "What is life consulting?",
    answer:
      "Life consulting creates a compassionate, safe space to explore and reframe past experiences, build self-compassion, and make conscious choices. It is active, empowering support designed to help your body, heart, and mind come into greater alignment.",
  },
  {
    question: "What does a session cost?",
    answer:
      "An initial one-to-one session is $100, followed by $55 consultations. An initial session with Hannah and Kimberly together is $160, followed by $110 consultations.",
  },
  {
    question: "Where should I begin?",
    answer:
      "If you are not sure which pathway fits, start with a complimentary conversation. Hannah or Kimberly can listen to what you are looking for and help you choose a next step.",
  },
  {
    question: "Are sessions online or in person?",
    answer:
      "All Passageway consultations, workshops, and cohorts are held online. Hannah and Kimberly are based in Kansas City and welcome women from across the United States and worldwide.",
  },
  {
    question: "Can I join a program on my own?",
    answer:
      "Absolutely. Our group experiences are created for women arriving as individuals, with thoughtful facilitation that helps connection grow naturally and safely.",
  },
  {
    question: "Is Passageway therapy?",
    answer:
      "Passageway offers consulting, education, guided workshops, and personal support. We will always be clear about the scope of an offering and help you identify other professional support when appropriate.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <div className="shell nav-shell">
          <Link className="brand" href="#top" aria-label="Passageway Consulting home">
            <img className="brand-logo" src="/images/passageway-logo.png" alt="" />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="#about">About</Link>
            <Link href="#experiences">Work with us</Link>
            <Link href="#story">Our story</Link>
            <Link href="#guides">Meet us</Link>
            <Link href="#pricing">Pricing</Link>
            <Link href="/events">Events</Link>
            <Link href="/blog">Blog</Link>
            <details className="resources-nav">
              <summary>Resources</summary>
              <div>
                <Link href="#beliefs">Guiding truths</Link>
                <Link href="#resources">Free reflection guide</Link>
                <Link href="/nervous-system-regulation-for-women">Nervous-system support</Link>
                <Link href="/self-compassion-for-women">Self-compassion</Link>
              </div>
            </details>
          </nav>

          <a className="button button-small button-dark header-cta" href={bookingUrl} target="_blank" rel="noreferrer">
            Book a session <Arrow />
          </a>

          <details className="mobile-nav">
            <summary aria-label="Open navigation"><span /><span /></summary>
            <div className="mobile-nav-panel">
              <Link href="#about">About</Link>
              <Link href="#experiences">Work with us</Link>
              <Link href="#story">Our story</Link>
              <Link href="#guides">Hannah & Kimberly</Link>
              <Link href="#beliefs">Guiding truths</Link>
              <Link href="#pricing">Pricing</Link>
              <Link href="/events">Events</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/resources">Resources</Link>
              <Link href="#resources">Free reflection guide</Link>
              <Link href="/online-emotional-health-consulting">Online consulting</Link>
              <Link href="/online-womens-emotional-health-workshops">Online workshops</Link>
              <a href={bookingUrl} target="_blank" rel="noreferrer">Book a session</a>
            </div>
          </details>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="kicker animate-in">Online emotional health consulting for women</p>
            <h1 className="animate-in delay-one">There is a way <em>through.</em></h1>
            <p className="hero-intro animate-in delay-two">
              Based in Kansas City and meeting online worldwide, Hannah and Kimberly offer compassionate emotional health and life consulting grounded in regulation, truth, and empowerment.
            </p>
            <div className="hero-actions animate-in delay-three">
              <a className="button button-dark" href={bookingUrl} target="_blank" rel="noreferrer">Book a consultation <Arrow /></a>
              <a className="text-link" href="#about">Discover Passageway <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          <div className="portal-wrap animate-in delay-two" aria-label="A visual passageway representing growth and transition">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="portal-shadow" />
            <div className="portal">
              <div className="portal-sky" />
              <div className="portal-sun" />
              <div className="portal-land portal-land-one" />
              <div className="portal-land portal-land-two" />
              <div className="portal-path" />
              <p>Space to become</p>
            </div>
            <div className="portal-note">
              <span className="spark">✦</span>
              <p><strong>For every season of transition</strong><br />You are welcome here.</p>
            </div>
          </div>
        </div>

        <div className="shell hero-foot">
          <p>Passageway is a place to pause, reconnect, and move forward with support.</p>
          <span>Kansas City–based · Online worldwide</span>
        </div>
      </section>

      <FeaturedEventBanner />
      <ManagedServices variant="pathways" />

      <section className="about-section" id="about">
        <div className="shell about-grid">
          <div className="about-art reveal">
            <div className="about-frame frame-back" />
            <div className="about-frame frame-front photo-frame">
              <img src="/images/hannah-kimberly.webp" alt="Kimberly and Hannah smiling together" width="1400" height="1120" />
              <span>Together in the Passageway</span>
            </div>
            <div className="about-seal">P<span>✦</span>C</div>
          </div>

          <div className="about-copy reveal">
            <p className="kicker">Welcome to the Passageway</p>
            <h2>Your messiness is part of being human.</h2>
            <p className="lead">We are rooted in a profound love and deep passion for our shared humanity.</p>
            <p>Everyone has their moments of messiness, so we have crafted a safe, welcoming space to support you through them. From one-day workshops and three-week programs to deeply personalized consultations, we meet you where you are and walk with you on your healing journey.</p>
            <p className="mission-callout">Through our Connect and Empowerment workshops, we blend education with meaningful shared experiences—supporting women as they reclaim their voice, strengthen their sense of self, and step into life with clarity and empowerment.</p>
            <div className="values-list">
              {values.map(([title, copy]) => (
                <div key={title}>
                  <span>✦</span>
                  <p><strong>{title}</strong>{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="story-section" id="story">
        <div className="shell">
          <div className="story-heading reveal">
            <p className="kicker">The story of Passageway</p>
            <h2>Two healing journeys.<br /><em>One shared calling.</em></h2>
          </div>
          <div className="story-grid">
            <article className="story-card reveal">
              <span>How it began</span>
              <h3>A powerful team takes shape</h3>
              <p>Hannah and Kimberly had worked together for four years when Hannah stepped into Kimberly’s office and asked whether she would consider taking courses in Emotional Health. Kimberly said yes immediately.</p>
              <p>About a year and a half into those courses, they recognized how powerfully their perspectives worked together. The idea of building an Emotional Health Consulting practice began to take shape.</p>
            </article>
            <article className="story-card story-card-dark reveal">
              <span>Why “Passageway”?</span>
              <h3>A safe passage from here to hope</h3>
              <p>The name grew from their own healing journeys. It reflects movement, safety, and transformation—a safe passageway from where someone is now to where they long to be.</p>
              <p>Today, Hannah and Kimberly walk with clients using the same kinds of tools that changed their own lives, grounded in three core pillars.</p>
              <div className="pillar-row"><strong>Compassion</strong><strong>Regulation</strong><strong>Empowerment</strong></div>
            </article>
          </div>
        </div>
      </section>

      <section className="life-section" id="life-consulting">
        <div className="shell life-grid">
          <div className="life-copy reveal">
            <p className="kicker">Life consulting</p>
            <h2>Bring your body, heart, and mind back into alignment.</h2>
            <p className="lead">Life consulting creates a compassionate and safe space to explore and heal past emotional wounds—while actively engaging in the life you want to create.</p>
            <p>Our consultants help you reframe past experiences, build self-compassion, and make conscious choices. It is a collaborative process designed to help you reclaim your power, strengthen emotional resilience, and move toward a more balanced, fulfilling life.</p>
            <div className="life-principles">
              <div><span>01</span><strong>Compassion</strong><p>Meet your story without judgment or shame.</p></div>
              <div><span>02</span><strong>Regulation</strong><p>Build safety in the body and nervous system.</p></div>
              <div><span>03</span><strong>Empowerment</strong><p>Reclaim your voice, choices, and power.</p></div>
            </div>
            <Link className="text-link life-service-link" href="/online-emotional-health-consulting">Learn about online emotional health consulting <Arrow /></Link>
          </div>
          <div className="life-art reveal">
            <div className="life-arch" aria-hidden="true" />
            <img src="/images/passageway-team-cutout.webp" alt="Hannah and Kimberly standing together" width="900" height="900" />
            <p><span>✦</span> Compassion opens the way.<br />Empowerment helps you walk it.</p>
          </div>
        </div>
      </section>

      <section className="beliefs-section" id="beliefs">
        <div className="shell">
          <div className="beliefs-heading reveal">
            <p className="kicker kicker-light">Belief systems & guiding truths</p>
            <h2>Healing is a sacred return to truth, love, and wholeness.</h2>
            <p>We do not exist to fix people. We exist to remind you who you already are underneath the pain, programming, and pressure.</p>
          </div>
          <div className="beliefs-grid">
            {guidingTruths.map((truth) => (
              <details className="belief-card reveal" key={truth.number}>
                <summary>
                  <span>{truth.number}</span>
                  <strong>{truth.title}</strong>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{truth.copy}</p>
              </details>
            ))}
          </div>
          <p className="beliefs-close reveal">You are not a problem to fix. <em>You are a person to understand.</em></p>
        </div>
      </section>

      <section className="guides-section" id="guides">
        <div className="shell">
          <div className="section-heading split-heading reveal">
            <div>
              <p className="kicker kicker-light">Meet your guides</p>
              <h2>Choose the person you feel drawn to.</h2>
            </div>
            <p>You do not need to have the right words before you reach out. A first conversation is simply a chance to be heard and explore what support could look like.</p>
          </div>

          <ManagedTeam />

          <p className="guide-note reveal">Not sure who to choose? <a href={bookingUrl} target="_blank" rel="noreferrer">Explore every appointment option</a> on the Passageway booking page.</p>
        </div>
      </section>

      <ManagedServices variant="pricing" />

      <section className="cohort-section" id="cohorts">
        <div className="shell cohort-grid">
          <div className="cohort-copy reveal">
            <p className="kicker">Three-week programs</p>
            <h2>Real change grows in good company.</h2>
            <p className="lead">Our longer experiences create a steady rhythm for insight, practice, honest conversation, and support.</p>
            <p>Come as you are. Across each gathering, you will build practical tools, deepen self-trust, and walk alongside women who are choosing growth too.</p>
            <a className="button button-dark" href={`mailto:${email}?subject=Passageway%20cohort%20interest`}>
              Join the cohort list <Arrow />
            </a>
          </div>

          <div className="cohort-card reveal">
            <div className="cohort-card-top"><span>Upcoming</span><span>Three-week experience</span></div>
            <h3>Connect & Empower</h3>
            <p>A guided Passageway for women ready to reconnect with themselves and move forward with intention.</p>
            <ul>
              <li><span>01</span> Guided learning and reflection</li>
              <li><span>02</span> Meaningful group conversation</li>
              <li><span>03</span> Practices for resilience and agency</li>
              <li><span>04</span> A supported path into what’s next</li>
            </ul>
            <div className="cohort-card-foot">
              <p><strong>Dates announced soon</strong><br />Join the list for first access.</p>
              <a href={`mailto:${email}?subject=Passageway%20cohort%20interest`} aria-label="Join the cohort interest list"><Arrow /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-section">
        <div className="shell quote-wrap reveal">
          <span className="quote-mark">“</span>
          <blockquote>You are not broken. You adapted beautifully to survive—and you are allowed to choose something new.</blockquote>
          <p>— One of our guiding truths</p>
        </div>
      </section>

      <section className="resource-section" id="resources">
        <div className="shell resource-grid">
          <div className="resource-visual reveal">
            <div className="resource-back-card" aria-hidden="true" />
            <img src="/images/self-compassion-guide.webp" alt="Cover of the Self-Compassion Reflection Guide" width="720" height="931" />
            <span>4-page reflection guide</span>
          </div>
          <div className="resource-copy reveal">
            <p className="kicker">A free resource for you</p>
            <h2>Meet yourself with a little more kindness.</h2>
            <p className="lead">The Self-Compassion Reflection Guide offers five gentle practices for softening self-judgment and nurturing warmth toward yourself.</p>
            <ul>
              <li><span>✦</span>The Hand-on-Heart Pause</li>
              <li><span>✦</span>The Kind Inner Voice Swap</li>
              <li><span>✦</span>The Enoughness Reminder</li>
              <li><span>✦</span>The Gentle Reality Check</li>
              <li><span>✦</span>The Self-Compassion Letter</li>
            </ul>
            <div className="resource-actions">
              <a className="button button-dark" href="/resources/self-compassion-reflection-guide.pdf" download>Download the free guide <span aria-hidden="true">↓</span></a>
              <a className="text-link" href={`mailto:${email}?subject=Join%20the%20Passageway%20newsletter&body=Please%20add%20me%20to%20the%20Passageway%20newsletter.`}>Join our newsletter <Arrow /></a>
            </div>
            <p className="resource-note">Healing is possible. Wholeness is worth it. You are not alone.</p>
          </div>
        </div>
      </section>

      <section className="faq-section" id="questions">
        <div className="shell faq-grid">
          <div className="faq-heading reveal">
            <p className="kicker">A little more clarity</p>
            <h2>Questions before you begin?</h2>
            <p>If your question is not here, send us a note. We’re happy to help you find the right starting point.</p>
            <a className="text-link" href={`mailto:${email}`}>Ask us anything <Arrow /></a>
          </div>
          <div className="faq-list reveal">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>{faq.question}<span aria-hidden="true">+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="shell final-cta-inner reveal">
          <p className="kicker kicker-light">Compassion opens the way</p>
          <h2>Take the next step.<br /><em>We’ll meet you there.</em></h2>
          <div>
            <a className="button button-cream" href={bookingUrl} target="_blank" rel="noreferrer">Book a session <Arrow /></a>
            <a className="text-link text-link-light" href="#experiences">Explore your options <span aria-hidden="true">↑</span></a>
          </div>
        </div>
      </section>

      <footer>
        <div className="shell footer-grid">
          <div>
            <Link className="brand footer-brand" href="#top">
              <img className="brand-logo" src="/images/passageway-logo.png" alt="Passageway Consulting" />
            </Link>
            <p>Connect. Heal. Empower.</p>
          </div>
          <div className="footer-links">
            <div><strong>Explore</strong><a href="#about">About</a><Link href="/online-emotional-health-consulting">Online consulting</Link><Link href="/online-womens-emotional-health-workshops">Online workshops</Link><Link href="/events">Events</Link><Link href="/blog">Blog</Link><Link href="/resources">Resources</Link></div>
            <div><strong>Connect</strong><a href={bookingUrl} target="_blank" rel="noreferrer">Book Hannah</a><a href={bookingUrl} target="_blank" rel="noreferrer">Book Kimberly</a><a href={`mailto:${email}`}>Email us</a><Link href="/admin">Passageway Admin</Link></div>
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
