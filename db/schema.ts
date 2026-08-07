export type CmsRole = "admin" | "editor";

export type CmsBaseRow = {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type AdminUserRow = CmsBaseRow & {
  email: string;
  name: string;
  role: CmsRole;
  active: boolean;
};

export type ServiceRow = CmsBaseRow & {
  slug: string;
  name: string;
  eyebrow: string;
  category: string;
  summary: string;
  description: string;
  initialPrice: string;
  followUpPrice: string;
  priceNote: string;
  bookingUrl: string;
  active: boolean;
  featured: boolean;
  sortOrder: number;
};

export type EventRow = CmsBaseRow & {
  slug: string;
  title: string;
  summary: string;
  description: string;
  startsAt: string;
  endsAt: string;
  timezone: string;
  format: string;
  registrationUrl: string;
  imageUrl: string;
  priceLabel: string;
  capacityLabel: string;
  status: "draft" | "published" | "cancelled";
  featured: boolean;
};

export type BlogPostRow = CmsBaseRow & {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  authorName: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  status: "draft" | "published";
  publishedAt: string;
};

export type ResourceRow = CmsBaseRow & {
  slug: string;
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  imageUrl: string;
  requiresEmail: boolean;
  active: boolean;
  featured: boolean;
};

export type TestimonialRow = CmsBaseRow & {
  quote: string;
  name: string;
  attribution: string;
  approved: boolean;
  featured: boolean;
  sortOrder: number;
};

export type TeamMemberRow = CmsBaseRow & {
  slug: string;
  name: string;
  title: string;
  bio: string;
  credentials: string;
  focusAreas: string;
  imageUrl: string;
  bookingUrl: string;
  active: boolean;
  sortOrder: number;
};

export type SiteSettingRow = {
  key: string;
  value: Record<string, unknown>;
  updatedAt: string;
  updatedBy: string;
};

export type PublicCmsRow = ServiceRow | EventRow | BlogPostRow | ResourceRow | TestimonialRow | TeamMemberRow;
