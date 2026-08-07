import type { Metadata } from "next";
import { ResourceFeed } from "@/app/components/CmsPublic";
import SiteChrome from "@/app/components/SiteChrome";

export const metadata: Metadata = {
  title: "Free Emotional Health Resources for Women | Passageway",
  description: "Download compassionate reflection guides and resources for women exploring self-compassion, emotional health, regulation, and personal growth.",
  alternates: { canonical: "/resources" },
};

export default function ResourcesPage() {
  return <SiteChrome><section className="content-index-hero content-index-resources"><div className="shell"><p className="kicker">Resources for your passage</p><h1>Gentle tools for <em>real life.</em></h1><p>Guides, reflections, and practices to help you meet yourself with kindness, listen to what your emotions are saying, and move forward with support.</p></div></section><section className="content-index-body"><div className="shell"><ResourceFeed /></div></section></SiteChrome>;
}
