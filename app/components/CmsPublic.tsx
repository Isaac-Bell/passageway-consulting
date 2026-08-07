"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Service = {
  id: number | string; slug: string; name: string; eyebrow: string; category: string; summary: string; description: string;
  initialPrice: string; followUpPrice: string; priceNote: string; bookingUrl: string; featured: boolean;
};
type EventItem = {
  id: number | string; slug: string; title: string; summary: string; startsAt: string; format: string; registrationUrl: string;
  imageUrl: string; priceLabel: string; capacityLabel: string;
};
type Post = { id: number | string; slug: string; title: string; excerpt: string; coverImageUrl: string; authorName: string; category: string; publishedAt: string };
type Resource = { id: number | string; slug: string; title: string; description: string; category: string; fileUrl: string; imageUrl: string; requiresEmail: boolean };
type TeamMember = {
  id: number | string; slug: string; name: string; title: string; bio: string; credentials: string; focusAreas: string;
  imageUrl: string; bookingUrl: string; active: boolean; sortOrder: number;
};

const bookingUrl = "https://passagewayconsulting.as.me/";

const fallbackServices: Service[] = [
  { id: "individual", slug: "online-emotional-health-consulting", name: "One-to-one consulting", eyebrow: "Personal", category: "Consulting", summary: "Personalized support to explore emotional wounds, reclaim your power, and move forward with greater resilience.", description: "Personalized support with Hannah or Kimberly, tailored to what you are walking through.", initialPrice: "$100", followUpPrice: "$55", priceNote: "Initial session · Follow-up consultation", bookingUrl, featured: true },
  { id: "joint", slug: "joint-consulting", name: "Kimberly + Hannah", eyebrow: "Combined", category: "Consulting", summary: "Two complementary perspectives in one supportive space, grounded in compassion, regulation, and empowerment.", description: "Two complementary perspectives, one supportive space, and a shared commitment to your growth.", initialPrice: "$160", followUpPrice: "$110", priceNote: "Initial session · Follow-up consultation", bookingUrl, featured: true },
  { id: "workshop", slug: "online-womens-emotional-health-workshops", name: "One-day workshops", eyebrow: "Shared", category: "Workshop", summary: "A brief but impactful experience where learning, honest connection, and shared healing come together.", description: "Online experiences blending education, reflection, and meaningful connection.", initialPrice: "", followUpPrice: "", priceNote: "", bookingUrl: "/online-womens-emotional-health-workshops", featured: false },
  { id: "cohort", slug: "online-womens-emotional-health-workshops#cohorts", name: "Three-week programs", eyebrow: "Transformational", category: "Cohort", summary: "An immersive journey for women ready to grow in community, practice new tools, and make change last.", description: "A longer rhythm of learning, conversation, practice, and community.", initialPrice: "", followUpPrice: "", priceNote: "", bookingUrl: "/online-womens-emotional-health-workshops#cohorts", featured: false },
];

const fallbackTeam: TeamMember[] = [
  {
    id: "hannah-spacek", slug: "hannah-spacek", name: "Hannah Spacek", title: "ND, CHC · Life Consultant",
    bio: "Hannah has worked in the wellness field for over ten years and has spent more than eight years on her own healing journey—overcoming chronic anxiety, people-pleasing, low self-esteem, and the struggle to have a voice.\n\nToday, she combines natural health principles with practical guidance to help women move beyond limiting beliefs and into self-acceptance, confidence, and freedom.",
    credentials: "Naturopath · Regenerative Detoxification Specialist · Certified Health Coach",
    focusAreas: "Dating, Anxiety, Self-esteem, Empowerment", imageUrl: "/images/hannah-spacek.webp", bookingUrl, active: true, sortOrder: 1,
  },
  {
    id: "kimberly", slug: "kimberly", name: "Kimberly Rankins", title: "Life Consultant",
    bio: "With more than 30 years in Christian ministry and a deeply lived healing journey, Kimberly brings compassion, love, and truth to women navigating insecurity, self-hatred, religious trauma, toxic relationships, and long-standing beliefs that no longer serve them.",
    credentials: "More than 30 years ministering to women",
    focusAreas: "Trauma, Self-worth, Voice, Personal freedom", imageUrl: "/images/kimberly.webp", bookingUrl, active: true, sortOrder: 2,
  },
];

export function FeaturedEventBanner() {
  const [content, setContent] = useState<{ settings?: Record<string, unknown>; featuredEvent?: EventItem | null } | null>(null);
  useEffect(() => {
    fetch("/api/public/content?collection=homepage").then((response) => response.json()).then(setContent).catch(() => undefined);
  }, []);
  if (!content) return null;
  const settings = content.settings ?? {};
  const event = content.featuredEvent;
  if (!event && !settings.announcementEnabled) return null;

  const title = event?.title || String(settings.announcementTitle || "A note from Passageway");
  const body = event?.summary || String(settings.announcementBody || "");
  const href = event ? `/events/${event.slug}` : String(settings.announcementCtaUrl || "#experiences");
  const label = event ? "View event" : String(settings.announcementCtaLabel || "Learn more");
  return (
    <section className="featured-event-banner" aria-label={event ? "Upcoming Passageway event" : "Passageway announcement"}>
      <div className="shell featured-event-inner">
        <div><p>{event ? "Upcoming online experience" : "Passageway announcement"}</p><h2>{title}</h2>{body && <span>{body}</span>}</div>
        {event?.startsAt && <time dateTime={event.startsAt}>{formatDate(event.startsAt)}</time>}
        <Link href={href}>{label} <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}

export function ManagedServices({ variant }: { variant: "pathways" | "pricing" }) {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  useEffect(() => {
    fetch("/api/public/content?collection=services").then((response) => response.json()).then((payload: { items?: Service[] }) => {
      if (payload.items?.length) setServices(payload.items);
    }).catch(() => undefined);
  }, []);

  if (variant === "pricing") {
    const priced = services.filter((service) => service.initialPrice || service.followUpPrice);
    return (
      <section className="pricing-section" id="pricing">
        <div className="shell">
          <div className="pricing-heading reveal"><p className="kicker">Session pricing</p><h2>Clear support. Simple pricing.</h2><p>Choose the Passageway offering that fits the support you are looking for today.</p></div>
          <div className="pricing-grid managed-pricing-grid">
            {priced.map((service, index) => (
              <article className={`price-card reveal ${service.featured && index > 0 ? "price-card-featured" : ""}`} key={service.id}>
                <div className="price-card-top"><span>{service.eyebrow || service.category}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
                <h3>{service.name}</h3>
                <div className="price-pair">
                  <div><small>Initial session</small><strong>{service.initialPrice || "Ask us"}</strong></div>
                  <div><small>Follow-up</small><strong>{service.followUpPrice || "Ask us"}</strong></div>
                </div>
                <p>{service.description || service.summary}</p>
                <a className={`text-link ${service.featured && index > 0 ? "text-link-light" : ""}`} href={service.bookingUrl || bookingUrl} target={isExternal(service.bookingUrl) ? "_blank" : undefined} rel={isExternal(service.bookingUrl) ? "noreferrer" : undefined}>Choose this pathway <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
          <p className="pricing-note reveal">Not sure which option fits? <a href="mailto:hello@passagewayconsulting.com?subject=Passageway%20session%20question">Send us a note</a> and we’ll help you choose.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="pathway-section" id="experiences">
      <div className="shell">
        <div className="section-heading reveal"><p className="kicker">Ways to work together</p><h2>Support for the step you’re on.</h2><p>Whether you need a quiet one-to-one conversation or a longer shared journey, every offering is online and there is room to begin exactly where you are.</p></div>
        <div className="pathway-grid managed-pathway-grid">
          {services.map((service, index) => (
            <article className="pathway-card reveal" key={service.id}>
              <div className="pathway-number">{String(index + 1).padStart(2, "0")}</div><p className="card-eyebrow">{service.eyebrow || service.category}</p>
              <h3>{service.name}</h3><p>{service.summary}</p>
              <a href={service.bookingUrl || `/${service.slug}`} target={isExternal(service.bookingUrl) ? "_blank" : undefined} rel={isExternal(service.bookingUrl) ? "noreferrer" : undefined}>Explore this pathway <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ManagedTeam() {
  const [team, setTeam] = useState<TeamMember[]>(fallbackTeam);

  useEffect(() => {
    fetch("/api/public/content?collection=team", { cache: "no-store" })
      .then((response) => response.json())
      .then((payload: { items?: TeamMember[] }) => {
        if (payload.items?.length) setTeam(payload.items);
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="guide-grid">
      {team.map((member) => {
        const firstName = member.name.trim().split(/\s+/)[0] || member.name;
        const portraitClass = member.slug?.includes("hannah") ? "hannah-portrait" : member.slug?.includes("kimberly") ? "kimberly-portrait" : "";
        const focusAreas = (member.focusAreas || "").split(",").map((area) => area.trim()).filter(Boolean);
        const paragraphs = (member.bio || "").split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);

        return (
          <article className="guide-card reveal" key={member.id}>
            <div className={`guide-portrait ${portraitClass}`.trim()}>
              <img src={member.imageUrl} alt={member.name} width={900} height={member.slug?.includes("hannah") ? 1333 : 900} />
            </div>
            <div className="guide-content">
              <p className="card-eyebrow">{member.title || "Life Consultant"}</p>
              <h3>{member.name}</h3>
              {member.credentials && <p className="guide-role">{member.credentials}</p>}
              {paragraphs.map((paragraph, index) => <p className={index > 0 ? "guide-second-paragraph" : undefined} key={`${member.id}-bio-${index}`}>{paragraph}</p>)}
              {focusAreas.length > 0 && <div className="focus-tags">{focusAreas.map((area) => <span key={area}>{area}</span>)}</div>}
              <a className="button button-cream" href={member.bookingUrl || bookingUrl} target="_blank" rel="noreferrer">
                Book with {firstName} <span aria-hidden="true">↗</span>
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function BlogFeed() {
  const { items, loading } = useCollection<Post>("posts");
  if (loading) return <FeedLoading />;
  if (!items.length) return <EmptyFeed title="Stories are on their way." copy="Hannah and Kimberly are preparing thoughtful articles grounded in compassion, regulation, and empowerment." />;
  return <div className="content-card-grid">{items.map((post) => <article className="content-card" key={post.id}>{post.coverImageUrl && <img src={post.coverImageUrl} alt="" />}<div><p>{post.category}</p><h2>{post.title}</h2><span>{post.excerpt}</span><small>{post.authorName} · {formatDate(post.publishedAt)}</small><Link href={`/blog/${post.slug}`}>Read the article <b aria-hidden="true">↗</b></Link></div></article>)}</div>;
}

export function EventFeed() {
  const { items, loading } = useCollection<EventItem>("events");
  if (loading) return <FeedLoading />;
  if (!items.length) return <EmptyFeed title="The next gathering is taking shape." copy="Join the Passageway newsletter or check back soon for online workshops and cohort dates." />;
  return <div className="content-card-grid">{items.map((event) => <article className="content-card event-card" key={event.id}>{event.imageUrl && <img src={event.imageUrl} alt="" />}<div><p>{event.format || "Online"}</p><h2>{event.title}</h2><span>{event.summary}</span><small>{event.startsAt ? formatDate(event.startsAt) : "Date announced soon"}{event.priceLabel ? ` · ${event.priceLabel}` : ""}</small><Link href={`/events/${event.slug}`}>View the event <b aria-hidden="true">↗</b></Link></div></article>)}</div>;
}

export function ResourceFeed() {
  const { items, loading } = useCollection<Resource>("resources");
  const resources = items.length ? items : [{ id: "self-compassion", slug: "self-compassion-reflection-guide", title: "Self-Compassion Reflection Guide", description: "Five gentle practices for softening self-judgment and nurturing warmth toward yourself.", category: "Free guide", fileUrl: "/resources/self-compassion-reflection-guide.pdf", imageUrl: "/images/self-compassion-guide.webp", requiresEmail: false }];
  if (loading) return <FeedLoading />;
  return <div className="content-card-grid">{resources.map((resource) => <article className="content-card resource-card" key={resource.id}>{resource.imageUrl && <img src={resource.imageUrl} alt={`Cover of ${resource.title}`} />}<div><p>{resource.category}</p><h2>{resource.title}</h2><span>{resource.description}</span>{resource.requiresEmail ? <a href="mailto:hello@passagewayconsulting.com?subject=Passageway%20resource">Request this resource <b aria-hidden="true">↗</b></a> : <a href={resource.fileUrl} download>Download resource <b aria-hidden="true">↓</b></a>}</div></article>)}</div>;
}

function useCollection<T>(collection: string) {
  const [items, setItems] = useState<T[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { fetch(`/api/public/content?collection=${collection}`).then((response) => response.json()).then((payload: { items?: T[] }) => setItems(payload.items ?? [])).catch(() => undefined).finally(() => setLoading(false)); }, [collection]);
  return { items, loading };
}

function FeedLoading() { return <div className="feed-loading">Opening the Passageway…</div>; }
function EmptyFeed({ title, copy }: { title: string; copy: string }) { return <div className="feed-empty"><span>✦</span><h2>{title}</h2><p>{copy}</p><a href="mailto:hello@passagewayconsulting.com?subject=Passageway%20updates">Keep me updated <b aria-hidden="true">↗</b></a></div>; }
function formatDate(value: string) { if (!value) return ""; const date = new Date(value); return Number.isNaN(date.valueOf()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Chicago" }).format(date); }
function isExternal(value = "") { return /^https?:\/\//.test(value); }
