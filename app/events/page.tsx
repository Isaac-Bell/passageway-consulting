import type { Metadata } from "next";
import { EventFeed } from "@/app/components/CmsPublic";
import SiteChrome from "@/app/components/SiteChrome";

export const metadata: Metadata = {
  title: "Online Emotional Health Workshops & Events | Passageway",
  description: "Upcoming online Passageway workshops, courses, and cohorts where women can learn, connect, and heal through community.",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return <SiteChrome><section className="content-index-hero content-index-events"><div className="shell"><p className="kicker">Gather in good company</p><h1>Upcoming workshops & <em>experiences.</em></h1><p>Online spaces blending education, meaningful shared experience, and practical tools for compassion, regulation, and empowerment.</p></div></section><section className="content-index-body"><div className="shell"><EventFeed /></div></section></SiteChrome>;
}
