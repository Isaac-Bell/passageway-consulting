import type { Metadata } from "next";
import Link from "next/link";
import {
  ContentSection,
  InteriorPage,
  ServiceJsonLd,
} from "../components/InteriorPage";

const path = "/online-womens-emotional-health-workshops";
const title = "Online Women’s Emotional Health Workshops | Passageway";
const description =
  "Online emotional health workshops and three-week cohorts where women connect, learn about compassion and regulation, and practice empowerment in community.";

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
    description: "Choose personalized one-to-one support with Hannah, Kimberly, or both consultants together.",
  },
  {
    href: "/nervous-system-regulation-for-women",
    label: "Nervous-system regulation",
    description: "Understand why felt safety, connection, and body awareness support lasting change.",
  },
  {
    href: "/self-compassion-for-women",
    label: "Self-compassion for women",
    description: "Start with a free reflection guide and five gentle practices you can use in everyday life.",
  },
];

export default function OnlineWorkshopsPage() {
  return (
    <>
      <ServiceJsonLd name="Online Women’s Emotional Health Workshops" description={description} path={path} />
      <InteriorPage
        eyebrow="Online women’s emotional health workshops"
        title="Online women’s emotional health workshops where you can learn, connect, and be real."
        intro="Passageway’s Connect and Empowerment experiences blend emotional-health education with meaningful shared practice, helping women strengthen their voice, sense of self, and capacity for choice."
        relatedPages={relatedPages}
        ctaTitle="Come exactly as you are."
        ctaCopy="Women are welcome to join on their own. Contact Passageway to hear about upcoming online workshops and three-week cohorts."
      >
        <ContentSection eyebrow="Why community matters" title="Shame isolates. Compassion connects.">
          <p>Healing can feel lonely when you believe everyone else has life figured out. In thoughtfully facilitated community, women discover that struggle is part of our common humanity—and that being witnessed with dignity can soften shame.</p>
          <p>You do not need to arrive with a friend or be naturally outgoing. Passageway’s online women’s workshops are designed to help connection grow gently, with room to participate at a pace that respects you.</p>
        </ContentSection>

        <ContentSection eyebrow="One-day workshops" title="A focused experience with tools you can carry home." tone="cream">
          <p>One-day workshops offer a brief but impactful space for education, reflection, conversation, and practical exercises. Topics are shaped around Passageway’s three pillars: Compassion, Regulation, and Empowerment.</p>
          <ul className="editorial-list">
            <li><span>01</span>Learn language for patterns, emotions, needs, and nervous-system responses.</li>
            <li><span>02</span>Practice self-compassion and hear the common humanity in other women’s stories.</li>
            <li><span>03</span>Leave with grounded tools for voice, boundaries, and conscious choice.</li>
          </ul>
        </ContentSection>

        <ContentSection eyebrow="Three-week cohorts" title="More time to connect, practice, and let new learning settle." tone="sage" id="cohorts">
          <p>Three-week programs create an immersive journey for women who want to move beyond understanding an idea and begin practicing it in community. The longer format allows trust to grow and gives each participant time to notice what changes between sessions.</p>
          <p>Upcoming dates, themes, capacity, and pricing will be announced as each cohort opens. All Passageway workshops and cohorts are hosted online.</p>
        </ContentSection>

        <ContentSection eyebrow="Join from anywhere" title="Kansas City roots. A worldwide online room." tone="forest">
          <p>Hannah and Kimberly are based in Kansas City, Missouri, but the Passageway community is not limited by geography. Women can join online from across the United States and worldwide.</p>
          <p><Link className="inline-editorial-link" href="mailto:hello@passagewayconsulting.com?subject=Passageway%20workshop%20and%20cohort%20updates">Ask to receive workshop and cohort updates →</Link></p>
        </ContentSection>
      </InteriorPage>
    </>
  );
}
