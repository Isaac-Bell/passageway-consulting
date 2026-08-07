# Cohorts, Native Booking, Payments, and Calendar Plan

## Product outcome

Passageway should welcome a woman from first interest through a confirmed
consultation or cohort without making the experience feel clinical, fragmented,
or administratively heavy.

The target platform has two connected journeys:

1. **Consultations:** choose a service and guide, choose an available time, pay
   securely, receive confirmation, and manage the appointment.
2. **Cohorts:** join an interest list or an open cohort, optionally complete a
   guided questionnaire or request a pre-cohort conversation, pay when
   appropriate, and receive cohort communication.

The public experience remains warm and simple. Supabase is the system of record
for Passageway business data, Stripe handles card data and payments, and a
calendar provider remains the system of record for busy time and meeting events.

## Recommended product decisions

- Keep Acuity live until the native flow passes end-to-end production testing.
- For the first cohort release, use an interest/application flow with human
  review. Passageway can later enable direct enrollment for repeatable cohorts.
- Use Stripe-hosted Checkout first. It provides a branded, secure payment page
  without Passageway collecting card details.
- Build a calendar adapter so the application is not tied permanently to
  Google Calendar, Outlook, or Acuity. Confirm the provider Hannah and Kimberly
  actually use before implementing the connection.
- Give Hannah and Kimberly separate admin accounts before storing applicant
  questionnaires, private notes, payment records, or participant details.

## Public cohort journey

The primary call to action becomes **Explore upcoming cohorts**. A visitor can:

1. join the general interest list;
2. apply to a specific open cohort;
3. request a pre-cohort conversation; or
4. enroll directly when Passageway has enabled immediate enrollment.

The optional questionnaire should be an animated one-question-at-a-time
stepper. Touch users may swipe, but every step must also have Back and Continue
buttons and work by keyboard. It should show progress, autosave after contact
details are verified, and let the visitor choose to complete it now, book a
pre-cohort conversation, or skip it and submit basic interest.

Only ask questions that help Passageway place and support participants. Do not
ask for diagnostic or unnecessarily detailed health information.

## Cohort administration

The admin studio gains five connected views:

- **Programs:** reusable offering templates such as Connect & Empower.
- **Cohorts:** individual runs with dates, timezone, capacity, status, price,
  facilitators, and enrollment rules.
- **Interest & applications:** a filterable list of women who expressed
  interest, their preferred timing, and their next action.
- **Roster:** confirmed participants grouped by cohort, with enrollment,
  questionnaire, pre-call, and payment status.
- **Communications:** send or schedule cohort announcements and retain a record
  without exposing recipients to one another.

Roster actions include assigning or moving a participant, marking a manual
payment, sending a payment link, recording a withdrawal, exporting CSV, and
opening a private participant timeline.

## Core data model

| Entity | Purpose | Important fields |
|---|---|---|
| `programs` | Reusable cohort/service template | name, slug, summary, duration, default price, active |
| `cohorts` | A dated run of a program | program, name, start/end, timezone, capacity, status, enrollment mode, price |
| `contacts` | One person record across services | name, email, phone, timezone, consent timestamps |
| `cohort_applications` | Interest or application | contact, cohort, source, status, questionnaire choice, pre-call status |
| `questionnaire_responses` | Private structured answers | application, question version, answers, completion, consent, retention date |
| `cohort_enrollments` | Confirmed roster membership | cohort, contact, status, payment status, enrolled/completed dates |
| `appointment_types` | Bookable Passageway services | service, duration, buffer, price, consultants, active |
| `bookings` | Appointment lifecycle | contact, type, consultant, start/end, timezone, status, payment status, provider event IDs |
| `booking_holds` | Prevent double-booking during payment | slot, consultant, expires at, Checkout Session |
| `payment_records` | Local payment ledger | contact, purpose, amount, currency, Stripe IDs, status, refund state |
| `calendar_connections` | Provider connection metadata | consultant, provider, calendar ID, token reference, sync state |
| `availability_rules` | Working hours and exceptions | consultant, weekday/date, local time range, timezone, buffer |
| `communications` | Message audit trail | cohort, channel, subject, provider message ID, status, sent at |

Every exposed table requires row-level security. Public visitors should only be
able to submit through narrow server endpoints; they should never receive list
access to contacts, applications, bookings, payments, or answers.

## Native consultation booking flow

1. Visitor chooses one-to-one or joint consulting.
2. Visitor chooses Hannah, Kimberly, or both when the service allows it.
3. Passageway calculates slots from availability rules minus provider busy
   time, existing bookings, buffers, and temporary holds.
4. Visitor chooses a slot in her own timezone and enters contact details.
5. The server creates a short booking hold and Stripe Checkout Session using a
   server-owned price mapping.
6. Stripe sends a signed `checkout.session.completed` webhook.
7. Passageway verifies the signature and idempotently confirms the booking.
8. Passageway creates the calendar event, adds the meeting link, and sends a
   confirmation plus signed reschedule/cancellation links.
9. Failed or abandoned payment releases the hold automatically.

Never accept a price from the browser and never store card details. A success
page is useful feedback, but webhook-confirmed payment is the authority for
fulfillment. Stripe documents Checkout Sessions and webhook-based fulfillment
at <https://docs.stripe.com/payments/checkout/how-checkout-works> and signature
verification at <https://docs.stripe.com/webhooks>.

## Stripe model

Use one Stripe product per stable Passageway offer and one or more Prices for
its current amounts. Store Stripe product/price IDs against managed services or
cohorts; keep Stripe secret keys and webhook secrets only in hosted secrets.

Initial payment purposes:

- one-to-one initial session — $100;
- one-to-one follow-up — $55;
- Hannah + Kimberly initial session — $160;
- Hannah + Kimberly follow-up — $110; and
- cohort enrollment — price set per cohort once approved.

Webhook processing must be idempotent and record the Stripe event ID before
fulfilling. Support Checkout completion, delayed-payment success/failure if
enabled payment methods require it, expiration of Checkout Sessions and holds,
refunds, and disputes as admin alerts.

Before live payments, Passageway must approve refund/cancellation terms,
currency, tax handling, payment timing, receipts, legal business details, and
who owns payment support.

## Calendar strategy

### Bridge release

While native scheduling is under construction, replace generic Acuity links
with service-specific Acuity links or an on-site Acuity embed. Acuity supports
availability, appointment creation, and webhooks for scheduled, rescheduled,
cancelled, and changed appointments. This keeps the current operation safe
while the Passageway admin roster begins receiving booking status.

References: <https://developers.acuityscheduling.com/> and
<https://developers.acuityscheduling.com/docs/webhooks>.

### Native release

Connect each consultant's real calendar using OAuth. The provider adapter must
support listing busy periods; creating, updating, and cancelling events;
creating or attaching online meeting links; detecting provider-side changes;
and disconnecting/re-authorizing without losing Passageway booking history.

For Google Calendar, use provider busy-time/event APIs, incremental sync, and
push notifications rather than constant polling. Notification channels expire
and must be renewed. Google notes that notifications are not perfectly
reliable, so scheduled reconciliation remains necessary. See
<https://developers.google.com/workspace/calendar/api/guides/push> and
<https://developers.google.com/workspace/calendar/api/guides/sync>.

OAuth refresh tokens must be encrypted or held behind a managed secret/token
service; never expose them to the browser or readable admin fields.

## Communications

Mailchimp remains appropriate for newsletters and broad marketing consent. It
is not the right place for questionnaire answers or private participant notes.
Use a transactional email provider for confirmations, payment receipts,
reminders, and cohort-operational messages. Bulk cohort email must conceal the
recipient list and record delivery state without copying sensitive details into
the message body.

## Delivery phases

### Phase 1 — cohort interest foundation

- Public cohort hub and interest/application form.
- Programs, cohorts, applications, and roster tables with strict RLS.
- Admin cohort list, application queue, roster, filters, notes, and CSV export.
- Confirmation email and admin notification.
- No card payment and no detailed sensitive questionnaire yet.

### Phase 2 — guided intake and pre-call

- Accessible one-question-at-a-time questionnaire with versioned questions.
- Consent, save/resume, completion status, and retention controls.
- Optional pre-cohort conversation using the current Acuity bridge.
- Admin application timeline and placement workflow.

### Phase 3 — Stripe cohort enrollment

- Stripe test-mode products/prices and Checkout Sessions.
- Signed, idempotent webhooks and local payment ledger.
- Capacity-safe enrollment, waitlist promotion, payment links, receipts,
  refunds, and reconciliation tools.

### Phase 4 — native consultation booking

- Appointment types, consultant availability, timezone-safe slot picker, and
  short slot holds.
- Calendar provider connection and event lifecycle.
- Stripe payment-before-confirmation and automated confirmations/reminders.
- Reschedule/cancellation links and admin appointment calendar.

### Phase 5 — cohort communication and participant experience

- Transactional cohort announcements and reminder scheduling.
- Communication log, templates, delivery failures, and opt-out rules.
- Optional participant portal for schedules, resources, and meeting links.

## Required decisions before implementation

- Which calendar provider/account Hannah and Kimberly currently use.
- Whether they share one booking calendar or maintain separate calendars.
- Session durations, buffers, working hours, lead time, cancellation window,
  and reschedule rules.
- Whether payment happens before choosing a slot, after choosing a held slot,
  or after Passageway approval.
- Stripe account ownership, USD currency, tax approach, refund language, and
  receipt/support email.
- Cohort application questions, which are optional, and the retention period.
- Cohort capacity, dates, pricing, enrollment mode, waitlist rules, and whether
  a pre-cohort conversation is required.
- Transactional email provider and sender domain configuration.

## Definition of done for the first cohort milestone

- A visitor can submit interest for a general or specific cohort and receives a
  clear confirmation.
- Hannah or Kimberly can see the submission in Admin without seeing another
  person's data in the public response.
- An administrator can create a cohort, assign an applicant, change status,
  and export the roster.
- Consent and privacy copy are visible and recorded.
- RLS and API authorization tests prove private records are not publicly
  readable.
- Analytics records only anonymous funnel events, never names, emails,
  questionnaire answers, booking details, or payment identifiers.
