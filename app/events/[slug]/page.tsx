import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteChrome from "@/app/components/SiteChrome";
import { getPublicItem } from "@/app/lib/cms-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try { const event = await getPublicItem("events", (await params).slug); return event ? { title: `${event.title} | Passageway Consulting`, description: event.summary, alternates: { canonical: `/events/${event.slug}` } } : {}; } catch { return {}; }
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  let event;
  try { event = await getPublicItem("events", (await params).slug); } catch { notFound(); }
  if (!event || !("startsAt" in event)) notFound();
  return <SiteChrome><article className="event-detail"><div className="shell event-detail-grid"><div><p className="kicker">{event.format || "Online Passageway experience"}</p><h1>{event.title}</h1><p className="event-detail-intro">{event.summary}</p>{event.imageUrl && <img src={event.imageUrl} alt="" />}</div><aside><span>Event details</span><dl><div><dt>When</dt><dd>{event.startsAt ? formatDateTime(event.startsAt) : "To be announced"}</dd></div><div><dt>Where</dt><dd>{event.format || "Online"}</dd></div>{event.priceLabel && <div><dt>Investment</dt><dd>{event.priceLabel}</dd></div>}{event.capacityLabel && <div><dt>Capacity</dt><dd>{event.capacityLabel}</dd></div>}</dl><a className="button button-dark" href={event.registrationUrl} target="_blank" rel="noreferrer">Reserve your place <span aria-hidden="true">↗</span></a></aside></div><div className="shell content-detail-copy">{event.description.split(/\n\s*\n/).filter(Boolean).map((block, index) => <p key={index}>{block.replace(/\n/g, " ")}</p>)}</div></article></SiteChrome>;
}
function formatDateTime(value: string) { const date = new Date(value); return Number.isNaN(date.valueOf()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago", timeZoneName: "short" }).format(date); }
