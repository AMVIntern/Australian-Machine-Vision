# Session Summary — Australian Machine Vision Website

_Generated: 2026-06-15_

## 1. Overview

A production-ready **B2B marketing website** for **Australian Machine Vision (AMV)**, a
company selling **Computer Vision / AI for industrial quality inspection** (real-time
defect detection, scalable deployment, measurable ROI for manufacturing).

It is a static-content, marketing/lead-gen site (no database, no auth, no CMS). Content
is hard-coded in TSX components and a single TypeScript data file.

## 2. Tech Stack

| Area | Choice |
|------|--------|
| Framework | **Next.js 14** (App Router) |
| Language | **TypeScript 5** |
| UI Library | **React 18** |
| Styling | **Tailwind CSS 3.4** (custom theme) + `tailwindcss-animate` |
| Components | **shadcn/ui** pattern (Button, Card) via `components.json` |
| Animation | **Framer Motion 11** |
| Icons | **lucide-react** |
| Utilities | `clsx`, `tailwind-merge`, `class-variance-authority` (`cn()` helper) |
| Fonts | Inter (sans) + JetBrains Mono (mono) via `next/font/google` |

Scripts: `npm run dev` / `build` / `start` / `lint`.

## 3. Project Structure

```
app/
  layout.tsx              Root layout: Navbar + Footer + AnalyticsPlaceholder, global metadata/SEO
  page.tsx                Home page (composes 9 home sections)
  globals.css             Global styles / theme tokens
  robots.ts, sitemap.ts   SEO route handlers
  about/page.tsx          About page (mission, vision, values, stats, CTA)
  contact/
    page.tsx              Contact page (form + contact info)
    actions.ts            Server Action: submitContactForm (validation + optional webhook)
  customer-stories/
    page.tsx              Stories listing (grid of StoryCard)
    layout.tsx            Section layout
    [slug]/page.tsx       Dynamic story detail page

components/
  home/                   hero, logo-carousel, metrics-strip, industry-tabs, pipeline,
                          capabilities-grid, visual-proof, differentiators, final-cta
  about/                  about-content, about-values-section
  contact/                contact-form, contact-form-submit
  customer-stories/       story-card, story-detail-content, story-gallery,
                          metric-card, impact-metric-card
  layout/                 navbar, footer
  ui/                     button, card (shadcn primitives)
  analytics-placeholder.tsx

lib/
  customer-stories.ts     Typed data model + 3 customer stories + lookup helpers
  utils.ts                cn() class merge helper

public/
  amv-logo.png, favicon.svg, logos/ (bosch.png, nestle.png)

docs/                     (was empty — this summary added here)
```

## 4. Pages / Routes

- `/` — **Home**: Hero → Logo carousel → Metrics strip → Industry tabs → Pipeline →
  Capabilities grid → Visual proof → Differentiators → Final CTA.
- `/about` — Mission & Vision (two-column), team image placeholder, Core Values grid,
  stats (150+ clients, 50M+ inspections/day, 99.2% accuracy, 6 team members), teal CTA band.
- `/customer-stories` — Animated grid of story cards (Framer Motion stagger).
- `/customer-stories/[slug]` — Per-story detail (problem, solution, implementation steps,
  results metrics, gallery, testimonial). Slugs from `getAllStorySlugs()`.
- `/contact` — Contact form + company contact info (address, phones, emails, hours).

## 5. Key Data Model (`lib/customer-stories.ts`)

`CustomerStory` interface includes: `slug`, `title`, `shortDescription`, `clientName`,
`metrics[]`, `heroImage`, `gallery[]`, `problem`, `solution`, `implementationSteps[]`,
`resultsMetrics[]`, `testimonial`.

Three seeded stories:
1. **automotive-paint-inspection** — 95% defect detection, $2.4M annual savings, 35ms.
2. **fmcg-packaging-quality** — 99% catch rate, 12 lines deployed, 42ms.
3. **pharma-tablet-inspection** — 99.2% accuracy, GMP-compliant, 6-week deployment.

Helpers: `getStoryBySlug(slug)`, `getAllStorySlugs()`.

> Note: `heroImage` values are empty strings and galleries are placeholders — imagery is
> not yet wired up.

## 6. Contact Form (`app/contact/actions.ts`)

- Server Action `submitContactForm` with progressive-enhancement form state.
- Server-side validation (name lengths, email regex, company, industry, message ≥10 chars).
- On success, POSTs JSON to `process.env.CONTACT_WEBHOOK_URL` **if set** (otherwise no-op);
  returns a friendly success message. No persistence layer.

## 7. Design System (`tailwind.config.ts`)

- **Palette**: off-white background (`#fafaf9`), teal accent (`#0d9488`), soft cyan
  secondary (`#22d3ee`), charcoal text (`#1c1917`), muted grey.
- Custom **soft shadows** (`soft`, `soft-md/lg/xl`), **glass** backgrounds + backdrop blur.
- Teal/cyan gradient backgrounds.
- `marquee` keyframe/animation (35s) — used by the logo carousel.
- Dark mode is class-based (configured but content is light-themed).

## 8. SEO / Metadata

- Root `metadata` with title template, OG/Twitter cards, `en_AU` locale, robots index/follow.
- `metadataBase` from `NEXT_PUBLIC_SITE_URL` (default `https://www.australianmachinevision.com`).
- Per-page metadata on Home, About, Contact. `robots.ts` + `sitemap.ts` route handlers.

## 9. Environment Variables

- `NEXT_PUBLIC_SITE_URL` — canonical site URL for metadata base (optional, has default).
- `CONTACT_WEBHOOK_URL` — destination for contact-form submissions (optional).

## 10. Real Business Details Present

- Office: 9A Sir Laurence Drive, Seaford 3198 (VIC, Australia).
- Phones: 0499 990 117 / 0418 535 729. Hours: Mon–Fri 9am–5pm.
- Emails: amvsupport@amvco.com.au / krazga@amvco.com.au.

## 11. Git State

- Branch `main`, working tree clean at session start.
- Recent commits: `f788ee4 build fix`, `88ad8ba changes`, `b6e8ea3 website-changes`,
  `a1d504e commit`.

## 12. Notable Gaps / Possible Next Steps

- **Imagery**: `heroImage` empty, galleries are placeholders; About has a "team image
  placeholder". Wire up real visuals.
- **Analytics**: `analytics-placeholder.tsx` is a stub — integrate a real provider.
- **Contact persistence**: form only fires an optional webhook; consider email/CRM/storage.
- **Customer stories**: only 3 seeded; data is hard-coded (no CMS).
- README still describes "Day 1 / Day 2+" scaffolding language — could be refreshed.
