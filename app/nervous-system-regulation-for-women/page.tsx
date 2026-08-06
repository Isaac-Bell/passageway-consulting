import type { Metadata } from "next";
import Link from "next/link";
import {
  ContentSection,
  InteriorPage,
  ServiceJsonLd,
} from "../components/InteriorPage";

const path = "/nervous-system-regulation-for-women";
const title = "Nervous System Regulation Support for Women | Passageway";
const description =
  "Online nervous system regulation support for women through compassionate education, body awareness, self-compassion, boundaries, and practical emotional-health tools.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: path },
  openGraph: { type: "website", url: path, title, description, images: ["/images/hannah-kimberly.webp"] },
  twitter: { card: "summary_large_image", title, description },
};

const relatedPages = [
  {
    href: "/online-emotional-health-consulting",
    label: "Online consulting",
    description: "Explore compassionate one-to-one emotional health and life consulting with Hannah or Kimberly.",
  },
  {
    href: "/self-compassion-for-women",
    label: "Self-compassion for women",
    description: "Practice meeting difficult moments with warmth, common humanity, and a kinder inner voice.",
  },
  {
    href: "/online-womens-emotional-health-workshops",
    label: "Online workshops",
    description: "Learn and practice regulation in a safe, connected community with other women.",
  },
];

export default function NervousSystemRegulationPage() {
  return (
    <>
      <ServiceJsonLd name="Nervous System Regulation Support for Women" description={description} path={path} />
      <InteriorPage
        eyebrow="Nervous-system regulation for women"
        title="Nervous system regulation support for women, grounded in compassion."
        intro="Regulation is the bedrock of lasting change at Passageway. Through online consulting and workshops, women learn to listen to their bodies, understand protective patterns, and create more room for choice."
        relatedPages={relatedPages}
      >
        <ContentSection eyebrow="What regulation means" title="Your body has been trying to protect you.">
          <p>Your nervous system responds to what it has learned about safety, connection, conflict, rest, and belonging. Reactions such as overworking, pleasing, shutting down, staying hyper-alert, or disconnecting can make sense as intelligent adaptations—not evidence that you are broken.</p>
          <p>Nervous-system regulation support helps you notice those responses with curiosity and practice returning to enough steadiness to hear your needs, use your voice, and choose your next step.</p>
        </ContentSection>

        <ContentSection eyebrow="What you may practice" title="Small tools that create more room inside." tone="cream">
          <ul className="editorial-list editorial-list-large">
            <li><span>01</span><div><strong>Notice without judgment</strong><p>Recognize activation, numbness, urgency, or disconnection before automatically reacting.</p></div></li>
            <li><span>02</span><div><strong>Return to the present</strong><p>Use grounding, breath, movement, sensory awareness, or connection to support a felt sense of safety.</p></div></li>
            <li><span>03</span><div><strong>Listen to emotion</strong><p>Treat anger, sadness, fear, and joy as meaningful information rather than weaknesses to hide.</p></div></li>
            <li><span>04</span><div><strong>Reclaim choice</strong><p>Practice needs, boundaries, honest noes, and responses aligned with who you are becoming.</p></div></li>
          </ul>
        </ContentSection>

        <ContentSection eyebrow="A both-and practice" title="Regulation does not mean being calm all the time." tone="sage">
          <p>You can be healing and still feel activated. You can be grateful and still grieve. You can love someone and need a boundary. Regulation is not emotional perfection; it is growing your capacity to stay connected to yourself through a real human experience.</p>
          <p>Compassion matters here. Lasting change rarely grows through self-criticism. It grows when your body learns that you will listen, respond, and stop abandoning yourself.</p>
        </ContentSection>

        <ContentSection eyebrow="Scope of support" title="Educational, compassionate, and grounded in choice." tone="forest">
          <p>Passageway provides consulting, education, and guided practices. Nervous-system language is used to support awareness and everyday emotional resilience—not to diagnose, treat, or promise a medical outcome.</p>
          <p>If you are in crisis or need clinical mental-health care, please contact an appropriately licensed professional or emergency service in your location.</p>
          <p><Link className="inline-editorial-link" href="/online-emotional-health-consulting">Learn how online emotional health consulting works →</Link></p>
        </ContentSection>
      </InteriorPage>
    </>
  );
}
