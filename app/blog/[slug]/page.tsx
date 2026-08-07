import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteChrome from "@/app/components/SiteChrome";
import { getPublicItem } from "@/app/lib/cms-data";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const post = await getPublicItem("posts", (await params).slug);
    if (!post) return {};
    return { title: post.seoTitle || `${post.title} | Passageway Consulting`, description: post.seoDescription || post.excerpt, alternates: { canonical: `/blog/${post.slug}` }, openGraph: post.coverImageUrl ? { images: [post.coverImageUrl] } : undefined };
  } catch { return {}; }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  let post;
  try { post = await getPublicItem("posts", (await params).slug); } catch { notFound(); }
  if (!post || !("content" in post)) notFound();
  return <SiteChrome><article className="content-detail"><header><div className="shell content-detail-narrow"><p className="kicker">{post.category}</p><h1>{post.title}</h1><p>{post.excerpt}</p><div>{post.authorName} · {formatDate(post.publishedAt)}</div></div>{post.coverImageUrl && <img src={post.coverImageUrl} alt="" />}</header><div className="shell content-detail-copy">{renderPlainArticle(post.content)}</div></article></SiteChrome>;
}

function renderPlainArticle(content: string) {
  return content.split(/\n\s*\n/).filter(Boolean).map((block, index) => block.startsWith("## ") ? <h2 key={index}>{block.slice(3)}</h2> : block.startsWith("### ") ? <h3 key={index}>{block.slice(4)}</h3> : <p key={index}>{block.replace(/\n/g, " ")}</p>);
}
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.valueOf()) ? value : new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(date); }
