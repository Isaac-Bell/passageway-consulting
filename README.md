# Passageway Consulting

The public website for Passageway Consulting, founded by Hannah Spacek and
Kimberly. Passageway creates compassionate spaces where women can connect,
regulate, heal, and step into their lives with clarity and empowerment.

## Live website

- Current production site: <https://passageway-consulting.isaacmosesbell.chatgpt.site>
- Custom domain: <https://passagewayconsulting.com> (DNS activation in progress)
- Appointments: <https://passagewayconsulting.as.me/>

## What is included

- Passageway's mission, story, three pillars, and guiding truths
- Hannah and Kimberly's biographies and session pricing
- Workshop and three-week cohort information
- External Acuity appointment booking
- Downloadable Self-Compassion Reflection Guide
- Responsive layouts, accessible navigation, and reduced-motion support

## Local development

Prerequisites: Node.js `>=22.13.0`, Linux, `curl`, `flock`, and GNU `timeout`.

```bash
npm ci
npm run dev
```

The production build and artifact validation run with:

```bash
npm run build
```

## Hosting

The production site is hosted with ChatGPT Sites on Cloudflare's network. The
`.openai/hosting.json` manifest connects this source tree to the existing Sites
project. Porkbun remains the registrar and DNS provider for the custom domain.

## Newsletter

Newsletter signup currently opens an email opt-in. Replace that link with the
final Mailchimp signup URL once the Mailchimp audience and form are ready.
