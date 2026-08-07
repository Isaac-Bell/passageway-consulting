# Passageway Platform Roadmap

## Product goal

Passageway is evolving from a static marketing website into a calm, living
content and business platform. Hannah and Kimberly should be able to keep the
website current without editing code or using GitHub, while Isaac retains
technical and user-management access.

## Platform v1 — implemented foundation

The first platform release introduces a protected `/admin` content studio with
durable Cloudflare-backed content and uploads.

### Roles

- **Administrator:** full content access plus admin-user management.
- **Editor:** services, events, blog posts, resources, team profiles,
  testimonials, and homepage announcements.
- The initial administrator is `isaacmosesbell@gmail.com`.
- Hannah and Kimberly should be added as editors once their chosen ChatGPT
  account email addresses are confirmed.

### Managed content

- services and pricing;
- workshops, events, and cohorts;
- blog posts with SEO fields;
- downloadable resources and cover images;
- team names, biographies, credentials, portraits, and booking links;
- testimonials with approval and featured states;
- homepage announcements; and
- administrator/editor access.

### Public website integration

- The homepage services and pricing sections read managed services, with safe
  static defaults while data is unavailable.
- A featured published event can appear as a homepage banner.
- `/blog`, `/events`, and `/resources` provide public content hubs.
- Published posts and events have canonical detail pages.
- The sitemap includes the new hubs and published post/event URLs.

### Storage and security

- D1 stores structured content, publishing state, roles, and timestamps.
- R2 stores uploaded JPG, PNG, WebP, and PDF files.
- Passageway Admin uses ChatGPT sign-in plus a server-side database allowlist.
- Public pages never expose draft content.
- Archive actions are soft deletes, preserving recoverability.
- Admin pages are excluded from search indexing.

## Growth layer — prepared, awaiting account details

### Newsletter

Mailchimp remains the chosen email layer. The public resource model already
supports an email-required flag, but it must remain disabled until Passageway
provides an approved Mailchimp form or API configuration and confirms consent
copy and guide-delivery behavior.

### Analytics

The recommended setup remains a Passageway-owned GA4 property plus Search
Console. Events should include booking clicks, resource downloads, newsletter
completion, and cohort-interest clicks without sending names, email addresses,
health concerns, or booking details. A monthly email report is the initial
recommended cadence.

### Booking and commerce

The current Acuity booking page remains the safe production path. A future
native journey can present consultant/service selection inside Passageway and
hand off to Acuity or Stripe for scheduling and payment. No payment or booking
API should be invented before Passageway confirms the provider, credentials,
products, refund language, taxes, and operational owner.

## Release workflow

1. Build and review work on an `agent/*` branch.
2. Validate the production artifact, migrations, public routes, and protected
   admin behavior.
3. Open a draft pull request to `main`.
4. Merge after review and a successful GitHub Actions check.
5. Deliberately deploy the merged `main` through the existing ChatGPT Sites
   project and verify the custom domain.

## Information still required

- Hannah's editor-account email;
- Kimberly's editor-account email;
- Kimberly's preferred public full name and credentials;
- Mailchimp form/API configuration and consent wording;
- GA4 measurement details and analytics-report recipients;
- confirmed event dates, formats, capacity, curricula, and pricing; and
- any future Stripe/Acuity API credentials and approved payment policies.
