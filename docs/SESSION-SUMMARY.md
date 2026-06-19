# Session Summary - Australian Machine Vision Website

_Generated: 2026-06-19 (covers work from 2026-06-15 through 2026-06-19)_

This summary covers the full reposition of the AMV website from an "AI defect-detection
startup" framing to an experienced machine vision integrator, then the integration of
Harsha's capability statement across the site, plus contact form persistence and
notification setup.

For phased plans see [CAPABILITY-PHASED-BUILD.md](CAPABILITY-PHASED-BUILD.md) and
[CONTENT-MAP-v1.md](CONTENT-MAP-v1.md). For contact form setup see
[CONTACT-FORM-SETUP.md](CONTACT-FORM-SETUP.md).

---

## 1. People and approval gates

- **Anthony Sekulov** - Business Operations Consultant. Wrote the original website copy
  ("AMV Website Content.docx") and the style/tone rules.
- **Vikrant Shahane** - Software Engineer. Owns the build.
- **Ken Razga** - Director. **Signs off all content**, especially the About page.
- **Harsha Krishnappa** - Wrote the detailed Technology and Capability Overview
  (referenced as "the capability document" below). Wanted the cut-down version launched
  to drive traffic.

Live preview deployment: `australian-machine-vision-6esvi3rdp-amv-s-projects.vercel.app`
(per-deployment hash; consider sharing the stable URL once known).

---

## 2. Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| UI | React 18 + Tailwind CSS 3.4 + shadcn/ui pattern |
| Animation | Framer Motion 11 |
| Icons | lucide-react |
| Fonts | Inter (sans) + JetBrains Mono (mono) |
| Storage | **Vercel Postgres** (via Neon integration) - `@vercel/postgres` |
| Email | **Web3Forms** (browser-side, no SMTP/DNS needed) |

Scripts: `npm run dev` / `build` / `start` / `lint`.

---

## 3. Style and content rules (applied site-wide)

- Concise, structured, clear, personable.
- **No hype, no fabricated metrics, no client names or invented testimonials.**
- **No em or en dashes anywhere.** Use commas or periods instead.
- Lead with key takeaways. Skimmable bullets, short paragraphs.
- Audience bias: frontline customer with the problem first, engineering depth secondary.
- SEO tied to customer value.

---

## 4. Final home page structure

Hero -> Industries strip (marquee) -> **Industries we serve** (8-sector grid) -> Our
Approach -> Capabilities -> What sets our work apart -> Engineered for production ->
Final CTA.

---

## 5. Major work completed

### 5a. Cut-down v1 reposition (8 steps)

Repositioned from "AI defect-detection startup" to **experienced machine vision
integrator** (20+ years; food, industrial and general manufacturing; partner network;
in-house engineering).

| Step | Change |
|---|---|
| 1 | Global tone + em/en dash cleanup (every dash replaced with comma or period) |
| 2 | Hero badge and sub-text reframed, four pillars in Differentiators (later replaced) |
| 3 | About page rewritten (Ken gate). Hero tagline **"Our Vision is Your Solution"** (Ken). Fabricated stats replaced with truthful qualitative ones. Leadership section added with Ken Razga, Director, 20+ years bio. |
| 4 | Capabilities rebuilt around vision technologies and key applications |
| 5 | Industries strip replaced fake logos (Bosch, Nestle removed). Industry tabs rebuilt around generic industries with real value pockets |
| 6 | Customer Stories parked: fabricated stories removed, data emptied, route hidden from nav and sitemap, page shows "coming soon" |
| 7 | Contact page copy polish, industry dropdown realigned |
| 8 | Section audit. Removed fabricated `MetricsStrip` and `VisualProof`. Reframed `Pipeline` as Our Approach. Cleaned up Final CTA. |

### 5b. Fabricated content removed

- Bosch and Nestle logos (image files deleted) and `LogoCarousel`.
- Three invented customer stories with "Sarah Chen", "$2.4M" testimonials, fake metrics.
- About page stats: 150+ clients, 50M+ inspections/day, 99.2%, 6 team members. Replaced
  with truthful qualitative versions (20+ years, Global, In-House, Trusted Partners).
- `MetricsStrip` (99.2% / 65% / 400% / 45ms / 99.9%) deleted entirely.
- `VisualProof` "Inspection outputs" section removed (real overlays were not credible).

### 5c. Footer and nav cleanup

- LinkedIn wired to `linkedin.com/company/australian-machine-vision/` (Twitter
  placeholder removed).
- "Book Demo" CTAs replaced with "Contact Us".
- Footer fake `contact@example.com` replaced with real `amvsupport@amvco.com.au` and
  Seaford address.
- Navbar: added Home as first link; Customer Stories removed.

### 5d. SEO optimisation

- Modernised metadata: title now "Machine Vision and Automated Inspection" (was
  "Computer Vision AI").
- Canonical URLs on every page.
- JSON-LD structured data (Organization/LocalBusiness) in root layout: name, logo,
  description, email, phone, full Seaford address, `areaServed: AU`, LinkedIn.
- Generated `og:image` (1200x630 teal card) in `app/opengraph-image.tsx`.
- `keywords`, `og:url`, `siteName`, richer `googleBot` directives.
- `<html lang>` changed `en` -> **`en-AU`**.
- Customer Stories set to `noindex` (thin placeholder).

### 5e. Capability document integration (6 phases)

Harsha's capability statement was woven across the existing site (not added as a single
tab). Each phase referenced the document directly.

| Phase | Section | Source in doc |
|---|---|---|
| 1 | **Capabilities** - 3 families (Image acquisition and sensing, Classical and rule-based vision, ML and deep learning) + "Problems we solve" 4x2 panel | Sections 4, 5, 6, 7 |
| 2 | **Industries we serve** - replaced 3 generic tabs with **8 sectors** from the document (FMCG and packaged food, Dairy and food processing, Bakery and packaged goods, Hygiene and nonwoven manufacturing, Healthcare and medical handling, Pharmaceutical distribution and logistics, Blood biologics and medical labelling, Returnable transit packaging and supply chain) + "Breadth of deployment" callout | Sections 2, 3 |
| 3 | **What sets our work apart** - five pillars with **"Built to be customised"** featured as core strength | Section 11 + "What sets our work apart" callout |
| 4 | **Our Approach** - five engagement stages (Feasibility and POC, Custom development, Deployment and commissioning, Validation, Support and refinement) | Section 13 |
| 5 | **Engineered for production** trust strip (new) - Runs at line speed, Integrates with your line, Validated and traceable, Globally supported | Sections 8, 9, 10, 12 |
| 6 | Hero sub-text and About wording tightened using Executive Summary and Company at a Glance | Sections 1, 2 |

### 5f. Industry tab images (added then removed)

Photos sourced from Unsplash for food/industrial/general manufacturing during the old
3-tab format. These were removed in Phase 2 when the section was rebuilt to the 8-sector
grid, since the new sectors needed different imagery. No images currently in
`public/industries/`.

### 5g. About: Leadership section

Replaced the generic team image placeholder with a Leadership block for Ken Razga
(Director, 20+ years experience, two-paragraph bio). Placeholder shows "KR" initials in
a teal tile - drop a portrait at `public/team/ken-razga.jpg` and wire it in.

---

## 6. Contact form: storage and email

### Storage (working)

Vercel Postgres via Neon integration. Confirmed working - submissions land in the
`contact_submissions` table (id, created_at, first_name, last_name, email, company,
phone, industry, message). The table self-creates on first insert. View at Vercel ->
Storage -> amv-contact-db -> Data/Query.

The Neon database is in **Sydney (syd1)** region. Preview deployments use a separate
**branch** (set at integration time), so test data does not mix with production leads.

### Email notification (Web3Forms - **important refactor**)

Initial attempt called Web3Forms from the server-side Server Action. **This did not
work** - Web3Forms blocks server-side calls by design. The submission would store in
Postgres but no email would be sent (the Vercel function log showed only Neon API calls,
no Web3Forms call).

**Cursor refactored** (commit `a9dcc08`) to the official Web3Forms Vercel pattern:

- **Browser-side fetch** to `api.web3forms.com/submit` from the form component.
- Env var renamed `WEB3FORMS_ACCESS_KEY` -> **`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`** so
  Next.js exposes it to the browser (Web3Forms keys are public by design).
- Form now does **two things in sequence**: browser fetch to Web3Forms (sends email),
  then Server Action call (stores in Postgres).
- Switched from `useFormState` to `useState` since Server Actions don't compose with the
  browser-side fetch flow.
- Added **honeypot field** (hidden `botcheck` checkbox) for spam protection.
- Form resets on success.
- Submit button no longer uses `useFormStatus`; receives `pending` prop.

**Important warning** documented in CONTACT-FORM-SETUP.md: **Web3Forms may block free
platform subdomains, including Vercel preview URLs (`*.vercel.app`).** If submissions
work locally but not on `something.vercel.app`, contact Web3Forms support to whitelist
the domain, or test on the production custom domain.

### Contact recipient

`vikrant@amvco.com.au` is the default recipient. Set in two places:

1. Web3Forms access key registration (determines real destination - the key is registered
   to this address).
2. `CONTACT_TO_EMAIL` env var (optional override, falls back to the hardcoded default).

Submitter's email is set as **reply-to**, so you can reply directly to them.

---

## 7. Environment variables (current)

### Required (you set manually in Vercel)

| Variable | Value | Why |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | The Web3Forms key | Browser-exposed for the email send |

After adding it, **redeploy** (NEXT_PUBLIC_ values are baked at build time).

### Auto-injected

| Variable | Source |
|---|---|
| `POSTGRES_URL` (plus all `PG*`, `POSTGRES_*`, `DATABASE_URL*`, `NEON_*`) | Neon integration |

### Optional overrides

| Variable | Default | Use |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.australianmachinevision.com` | Drives canonical URLs, OG, sitemap. Set to the real production URL when known. |
| `CONTACT_TO_EMAIL` | `vikrant@amvco.com.au` | Recipient override (note: Web3Forms also enforces via the key) |

---

## 8. Pages and routes (current)

- `/` Home with the 8-section flow above.
- `/about` Mission and Vision (reworded), Leadership (Ken), Core Values, qualitative
  stats, teal CTA band.
- `/contact` Form (with Web3Forms + Postgres) and real contact info (Seaford address,
  phones, emails, hours).
- `/customer-stories` "Coming soon" placeholder, `noindex`, removed from nav and
  sitemap. The data structure remains in `lib/customer-stories.ts` for when real,
  approved stories arrive.

---

## 9. Files and components

### Created in this session
- `components/home/industries-strip.tsx`
- `components/home/industries-served.tsx` (the 8-sector grid)
- `components/home/production-strip.tsx` (Engineered for production)
- `app/opengraph-image.tsx` (generated OG image)
- `docs/CONTENT-MAP-v1.md`
- `docs/CAPABILITY-STATEMENT-CUTDOWN-PLAN.md`
- `docs/CAPABILITY-PHASED-BUILD.md`
- `docs/CONTACT-FORM-SETUP.md`
- `lib/send-contact-email.ts` (later removed by Cursor in `a9dcc08`)
- `.env.example` (later by Cursor)
- `public/industries/` directory (images later removed)

### Deleted in this session
- `components/home/logo-carousel.tsx` (replaced by industries-strip)
- `components/home/metrics-strip.tsx` (fabricated numbers)
- `components/home/industry-tabs.tsx` (replaced by industries-served in Phase 2)
- `components/home/visual-proof.tsx` ("Inspection outputs" - removed at user request)
- `public/logos/bosch.png`, `public/logos/nestle.png` (unapproved logos)
- All `public/industries/*.jpg` (no longer used)

### Heavily modified
- `app/contact/actions.ts` (multiple rewrites, now Postgres-only)
- `components/contact/contact-form.tsx` (Cursor refactored to browser-side Web3Forms)
- `components/contact/contact-form-submit.tsx` (Cursor: removed useFormStatus)
- `app/page.tsx` (section order/imports)
- `app/about/page.tsx` (full rewrite: hero, mission, vision, stats, Leadership, CTA)
- `app/layout.tsx` (SEO: JSON-LD, canonical, og:image, lang en-AU)
- `components/layout/navbar.tsx`, `footer.tsx` (links, LinkedIn, CTAs)

---

## 10. Open items and next steps

### Pending action from team
- **Ken** to review and sign off the About page and capability content.
- **Anthony** has reviewed and given feedback (see below).
- Real **portrait of Ken** to drop at `public/team/ken-razga.jpg`.
- Decision on the production custom domain (e.g. `www.amvco.com.au` or
  `australian-machine-vision.com`) so `NEXT_PUBLIC_SITE_URL` can be set and Web3Forms
  can whitelist it.

### Anthony's feedback (2026-06-19, not yet implemented)
> "Main comment is we have lost the Engagement breakdown across the Industry Solutions
> in the previous version. I would suggest building this version out across the wider
> snapshot you have captured. You can look to source more generic images... I.e below
> for returnable packaging and supply chain, or even an AI generate one for FMCG and
> Packaging, and Dairy."

Plan: rebuild the 8-sector Industries section as **enriched cards** (image + intro +
"Where we add value" bullets + Contact CTA per sector), matching the rich format of the
old 3-tab version. Anthony specifically suggested:
- Returnable transit packaging -> stacked pallets photo
- FMCG and packaged food -> bakery/packaging line photo
- Dairy -> dairy line photo
- Plus equivalents for Bakery, Hygiene, Healthcare, Pharma, Blood/biologics

### Web3Forms recipient and domain
- Web3Forms may block `*.vercel.app` preview URLs by default. Confirm whether the latest
  preview deployment actually sends emails, or whether it needs whitelisting.
- Rotate the Web3Forms access key after testing since it was pasted in chat.

### Production parity items
- `NEXT_PUBLIC_SITE_URL` should be set on Vercel to the real production URL once known.
- `AnalyticsPlaceholder` is still a stub; integrate a real provider before high-traffic
  launch.

---

## 11. Git state (snapshot)

Branch `release-cutdown-v1`. Working tree clean as of summary time.

Recent commits (latest first):
```
a9dcc08 changes                        (Cursor: browser-side Web3Forms refactor)
ce1cc3e web3forms updtaed              (Cursor: env var + lib/send-contact-email.ts)
3bf553f web3forms                       (initial Web3Forms wiring)
18b37cc capailities content             (capability statement Phases 1-6)
e1d1213 SEO changes                     (canonical, JSON-LD, og:image, en-AU)
d43bb1b cutdown v1 changes              (initial 8-step reposition)
f788ee4 build fix
88ad8ba changes
b6e8ea3 website-changes
a1d504e commit
```

---

## 12. Memory and references

Project memory stored at
`C:\Users\ashus\.claude\projects\E--AMV-Australian-Machine-Vision-Website\memory\`:

- `team-and-stakeholders.md` - who's who and the Ken approval gate
- `website-v1-plan.md` - cut-down launch scope
- `copy-style-rules.md` - mandatory tone rules (no em or en dashes)

Source documents (external):
- `AMV Website Content.docx` (Anthony) - original copy and style rules
- `AMV_Technology_Capability_Overview_HK_15JUNE26_v1.docx` (Harsha) - 14-section
  capability statement that drove Phases 1-6

---

## 13. Notable gaps

- **Industry imagery** removed in Phase 2 and not yet replaced. Anthony's feedback is the
  prompt to add per-sector photos when the richer card layout is built.
- **Real customer photos** for the Inspection in action section if reintroduced.
- **Customer stories** still parked; bring back when Ken-approved case studies exist.
- **Analytics** stub needs replacing with a real provider.
- **Production build** OOMs at static generation on the constrained development machine
  (compiles and type-checks fine; a normal-RAM host or CI will build without issue).
