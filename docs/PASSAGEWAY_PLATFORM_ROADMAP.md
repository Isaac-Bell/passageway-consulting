# Passageway Platform Roadmap

## Product goal

Passageway is evolving from a static marketing website into a calm, living
content and business platform. Hannah and Kimberly should be able to keep the
website current without editing code or using GitHub, while Isaac retains
technical and user-management access.

## Platform v1 — implemented foundation

The first platform release introduces a protected `/admin` content studio with
Passageway-owned Supabase content, authentication, and uploads.

### Roles

- **Administrator:** full content access plus admin-user management.
- **Editor:** services, events, blog posts, resources, team profiles,
  testimonials, and homepage announcements.
- The initial administrator is `isaacmosesbell@gmail.com`.
- `passagewayconsultingkc@gmail.com` is the current shared Passageway
  administrator. Hannah and Kimberly should move to separate named accounts
  before private applicant or client information is introduced.
- Invited users can sign in with a persistent password or a secure one-time
  email link.

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

- Supabase Postgres stores structured content, publishing state, roles, and
  timestamps. Isaac can manage it in Supabase or connect DBeaver using a
  Supabase Postgres connection string.
- Supabase Storage stores uploaded JPG, PNG, WebP, and PDF files.
- Supabase Auth supplies email/password and passwordless email sign-in. A
  database allowlist and row-level security restrict all draft and write access
  to Passageway staff.
- The production project is `Passageway Consulting` in the `Owl Consulting`
  organization, region `us-east-2`, project reference `qmlidzzjsutgjnocaain`.
- Production Auth configuration must use `https://passagewayconsulting.com` as
  the Site URL and include `https://passagewayconsulting.com/admin` in its
  redirect allowlist.
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

### Booking, cohorts, and commerce

The current Acuity booking page remains the safe production path while a native
Passageway journey is built in stages. The agreed direction covers cohort
interest/applications and rosters, guided intake, Stripe Checkout, payment
tracking, consultant availability, calendar events, and cohort communication.
The detailed architecture, delivery phases, security boundaries, and required
business decisions live in `docs/COHORTS_BOOKING_PAYMENTS_PLAN.md`.

## Release workflow

1. Build and review work on an `agent/*` branch.
2. Validate the production artifact, migrations, public routes, and protected
   admin behavior.
3. Open a draft pull request to `main`.
4. Merge after review and a successful GitHub Actions check.
5. Deliberately deploy the merged `main` through the existing ChatGPT Sites
   project and verify the custom domain.

## Information still required

- Separate Hannah and Kimberly admin emails before private client records are introduced;
- Kimberly Rankins' final public credentials, if any;
- Mailchimp form/API configuration and consent wording;
- GA4 measurement details and analytics-report recipients;
- confirmed event dates, formats, capacity, curricula, and pricing;
- any future Stripe/Acuity API credentials and approved payment policies; and
- the calendar provider/account currently used for Passageway appointments.
