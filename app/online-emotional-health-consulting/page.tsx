import type { Metadata } from "next";
import Link from "next/link";
import {
  ContentSection,
  InteriorPage,
  ServiceJsonLd,
} from "../components/InteriorPage";

const path = "/online-emotional-health-consulting";
const title = "Online Emotional Health Consulting for Women | Passageway";
const description =
  "Kansas City-based online emotional health consulting for women across the U.S. and worldwide, grounded in compassion, regulation, empowerment, and faith-aware support.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: {
    type: "website",
    url: path,
    title,
    description,
    images: ["/images/hannah-kimberly.webp"],
  },
  twitter: { card: "summary_large_image", title, description },
};

const relatedPages = [
  {
    href: "/nervous-system-regulation-for-women",
    label: "Nervous-system regulation",
    description: "Learn how regulation can create more room for choice, voice, boundaries, and connection.",
  },
  {
    href: "/online-womens-emotional-health-workshops",
    label: "Online workshops",
    description: "Connect, learn, and practice new tools in thoughtfully facilitated community with other women.",
  },
  {
    href: "/self-compassion-for-women",
    label: "Self-compassion for women",
    description: "Begin softening self-judgment with practical reflections and a free downloadable guide.",
  },
];

export default function OnlineEmotionalHealthConsultingPage() {
  return (
    <>
      <ServiceJsonLd name="Online Emotional Health Consulting for Women" description={description} path={path} />
      <InteriorPage
        eyebrow="Online emotional health consulting"
        title="Online emotional health consulting for women—without fixing, shaming, or performing."
        intro="Passageway offers one-to-one emotional health and life consulting for women online. Hannah and Kimberly help you meet your story with compassion, build a felt sense of safety, and reclaim your voice without treating you like a problem to fix."
        relatedPages={relatedPages}
      >
        <ContentSection eyebrow="What consulting offers" title="Support that makes room for your whole story.">
          <p>Emotional health consulting is an active, collaborative space to explore the patterns, beliefs, and experiences shaping your present life. Together, you can notice what helped you survive, understand what no longer serves you, and practice responding with greater choice.</p>
          <p>Women often arrive carrying anxiety, people-pleasing, low self-esteem, good-girl conditioning, relationship pain, religious trauma, or the sense that their voice has gone missing. You do not need a polished explanation before you begin.</p>
          <ul className="editorial-list">
            <li><span>01</span>Reframe old experiences without shaming the version of you who survived them.</li>
            <li><span>02</span>Build self-compassion, emotional awareness, boundaries, and a stronger sense of self.</li>
            <li><span>03</span>Bring your body, heart, mind, values, and choices into greater alignment.</li>
          </ul>
        </ContentSection>

        <ContentSection eyebrow="Consulting or coaching?" title="A clear name for deeply human work." tone="cream">
          <p>People may search for women’s emotional health coaching when they want practical, forward-moving support. Passageway uses the word <strong>consulting</strong> because the work blends compassionate reflection, education, lived experience, and tools you can practice in daily life.</p>
          <p>It is not psychotherapy, diagnosis, crisis care, or medical treatment. It is personal support that helps you understand your story, hear your own wisdom, and make conscious choices. When another kind of professional care would be more appropriate, Hannah and Kimberly will encourage you to seek it.</p>
        </ContentSection>

        <ContentSection eyebrow="Faith-aware support" title="Christian emotional health consulting without pressure or performance." tone="sage">
          <p>Faith can be a source of love, meaning, and restoration—and it can also be tangled with fear, shame, perfectionism, or religious trauma. Passageway can make room for Christian faith, honest questions, doubt, grief, and the desire to reconnect with a Creator who delights in you.</p>
          <p>This is never about forcing spiritual language into your story. Hannah and Kimberly lead with compassion, truth, and respect for where you actually are.</p>
        </ContentSection>

        <ContentSection eyebrow="Online from wherever you are" title="Based in Kansas City. Present with you worldwide." tone="forest">
          <p>Passageway Consulting is based in Kansas City, Missouri, while all consultations, workshops, and cohorts are held online. Women can join from across the United States and around the world without travel or a waiting room.</p>
          <p>Choose an individual consultation with Hannah or Kimberly, or book them together for two complementary perspectives in one supportive space.</p>
          <p><Link className="inline-editorial-link" href="/#pricing">See session pricing and meet your consultants →</Link></p>
        </ContentSection>
      </InteriorPage>
    </>
  );
}
