import type { Metadata } from "next";
import { BlogFeed } from "@/app/components/CmsPublic";
import SiteChrome from "@/app/components/SiteChrome";

export const metadata: Metadata = {
  title: "Emotional Health Articles for Women | Passageway Consulting",
  description: "Compassionate articles for women exploring emotional health, nervous-system regulation, self-acceptance, boundaries, faith, and personal freedom.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <SiteChrome><section className="content-index-hero"><div className="shell"><p className="kicker">The Passageway journal</p><h1>Words for the journey <em>through.</em></h1><p>Thoughtful, grounded writing from Hannah and Kimberly about compassion, regulation, empowerment, and the beautifully human work of becoming.</p></div></section><section className="content-index-body"><div className="shell"><BlogFeed /></div></section></SiteChrome>;
}
