import type { Metadata } from "next";
import Link from "next/link";
import {
  ContentSection,
  InteriorPage,
  ServiceJsonLd,
} from "../components/InteriorPage";

const path = "/self-compassion-for-women";
const title = "Self-Compassion Support for Women | Free Reflection Guide";
const description =
  "Self-compassion support for women who want to soften self-judgment, build a kinder inner voice, and practice five gentle reflections with Passageway’s free guide.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { type: "website", url: path, title, description, images: ["/images/self-compassion-guide.webp"] },
  twitter: { card: "summary_large_image", title, description },
};

const relatedPages = [
  {
    href: "/online-emotional-health-consulting",
    label: "Online consulting",
    description: "Receive personalized support for self-worth, voice, anxiety, people-pleasing, and change.",
  },
  {
    href: "/nervous-system-regulation-for-women",
    label: "Nervous-system regulation",
    description: "Learn why compassion and felt safety create more room for emotional choice.",
  },
  {
    href: "/online-womens-emotional-health-workshops",
    label: "Online workshops",
    description: "Practice compassion, regulation, and empowerment in connected community with other women.",
  },
];

export default function SelfCompassionPage() {
  return (
    <>
      <ServiceJsonLd name="Self-Compassion Support for Women" description={description} path={path} />
      <InteriorPage
        eyebrow="Self-compassion for women"
        title="Self-compassion support for women who are tired of criticizing themselves."
        intro="Self-compassion is the practice of meeting pain, mistakes, and imperfection with the tenderness, honesty, and care you would offer someone you love. It is not indulgence—it is a way to stop abandoning yourself."
        relatedPages={relatedPages}
        ctaTitle="Begin with one gentle practice."
        ctaCopy="Download Passageway’s free Self-Compassion Reflection Guide, or explore online consulting when you would like personal support."
      >
        <ContentSection eyebrow="Why compassion first" title="Healing begins with love, not self-improvement.">
          <p>Many women learned that criticism would keep them safe, accepted, productive, spiritual, or easy to love. That inner pressure may have helped you adapt—and it may now leave little room to rest, make mistakes, name a need, or receive care.</p>
          <p>Self-compassion does not deny responsibility or truth. It creates enough safety to face reality honestly without turning against yourself.</p>
        </ContentSection>

        <ContentSection eyebrow="Five gentle practices" title="A reflection guide for real-life moments." tone="cream">
          <ul className="editorial-list editorial-list-large">
            <li><span>01</span><div><strong>The hand-on-heart pause</strong><p>Slow the rush of self-judgment and offer your body a small cue of care.</p></div></li>
            <li><span>02</span><div><strong>The kind inner voice swap</strong><p>Notice the words you use with yourself and try the language you would offer a friend.</p></div></li>
            <li><span>03</span><div><strong>The enoughness reminder</strong><p>Practice remembering that worth is not something you earn through performance.</p></div></li>
            <li><span>04</span><div><strong>The gentle reality check</strong><p>Hold truth and tenderness together instead of minimizing pain or amplifying shame.</p></div></li>
            <li><span>05</span><div><strong>The self-compassion letter</strong><p>Write to yourself from the voice of someone who understands your common humanity.</p></div></li>
          </ul>
          <p className="download-callout"><a className="button button-dark" href="/resources/self-compassion-reflection-guide.pdf" download>Download the free reflection guide <span aria-hidden="true">↓</span></a></p>
        </ContentSection>

        <ContentSection eyebrow="Support beyond the guide" title="Self-compassion can be practiced in relationship." tone="sage">
          <p>If you have been looking for self-compassion coaching for women, Passageway’s one-to-one consulting offers a compassionate relationship where you can explore the beliefs and protective patterns beneath self-criticism.</p>
          <p>Hannah and Kimberly help women practice a kinder inner voice while also honoring truth, boundaries, needs, and meaningful change.</p>
          <p><Link className="inline-editorial-link" href="/online-emotional-health-consulting">Explore online emotional health consulting →</Link></p>
        </ContentSection>

        <ContentSection eyebrow="A truth to carry" title="You make sense—and you are already enough." tone="forest">
          <p>The pain you carry is not proof that you are defective. Your patterns often tell the story of a person who adapted beautifully to survive. Maturity does not require rejecting who you were; it invites you to grow with compassion into who you are becoming.</p>
        </ContentSection>
      </InteriorPage>
    </>
  );
}
