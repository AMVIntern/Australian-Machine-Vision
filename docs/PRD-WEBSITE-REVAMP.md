# PRD: AMV Website Revamp (Agnostic Repositioning)

_Status: APPROVED in principle. All open questions resolved (see Section 6). Ready to plan the build._
_Author: Engineering (Vikrant). Date: 2026-06-29._
_Approval gate: Ken (Director) signed off on positioning. Note: process control is OUT (inspection only), overriding the wording in Ken's email._

---

## 1. Executive summary

### 1.1 The shift
AMV is repositioning from a site that reads as a **set of specific industries we serve** to a site that reads as an **industry-agnostic machine vision solutions provider**. The message becomes simple: whatever the customer's visual inspection or quality control problem, AMV can build a custom computer vision system for it. The industries we show are **examples of where our capability has been applied, not the boundaries of what we do.**

### 1.2 What changes at a glance
1. **Hero tagline becomes the headline:** "Our vision is your solution." (This line already lives on the About page hero; it is not yet on the homepage.)
2. **Core differentiator repeated throughout:** every solution is custom-built and specialised to the customer's exact use case. We do not sell off-the-shelf, fixed-function inspection products. This is the central reason to choose AMV.
3. **Agnostic positioning:** "according to your requirements, we can build a solution for virtually any visual inspection or quality control problem, in any industry."
4. **AI made visible and honest:** AI and AI-driven inspection become prominent hooks on the homepage, mapped truthfully to the real deep learning and machine learning work AMV does. AI is presented alongside, not instead of, 20+ years of integrator experience.
5. **Confidentiality explained:** we describe capability categories rather than naming clients or sites because we respect customer confidentiality. This becomes a stated, positive reason for the generic framing.
6. **Plain language throughout:** every page must be readable by a plant manager or procurement lead. Each technical term is paired with a plain-language explanation.

### 1.3 Information architecture headline
The homepage is already long (eight stacked sections). Embedding the full industries detail on it makes it longer. **This PRD proposes moving Industries to its own page (`/industries`)**, with the homepage carrying a short teaser that links out. It also proposes a new **Methodology / "How we do it"** section explaining HOW AMV builds solutions in non-technical terms.

### 1.4 Reconciliation note (important)
A prior plan (`docs/CONTENT-MAP-v1.md`) deliberately **reduced** AI-first framing to move AMV away from looking like an "AI startup" and toward an "experienced integrator." This revamp **re-introduces AI as a prominent hook**. These are not in conflict if handled as follows: lead with AI as a capability that is real and differentiating, anchored to the 20+ years of engineering and the HALCON plus deep learning hybrid, and never as standalone marketing language disconnected from delivery. This reconciliation is confirmed (Section 6, item 1).

---

## 2. Current state analysis (from codebase review)

### 2.1 Stack
- Next.js 14 (App Router), React 18, TypeScript 5.
- Tailwind CSS 3.4, shadcn-style UI primitives (`components/ui/button.tsx`, `card.tsx`), Framer Motion 11, lucide-react icons.
- `@vercel/postgres` for the contact form store. Contact email via Web3Forms (browser side). Google Sheet append as a secondary store.
- This is a **marketing site**. It contains no machine vision code (no HALCON, ONNX, model runtime, or annotation tooling in the repo). Every technology claim on the site is **content**, so all methodology claims must be verified with AMV rather than read from the codebase.

### 2.2 Current routes
| Route | In nav? | In sitemap? | State |
|---|---|---|---|
| `/` (Home) | Yes | Yes | Live, eight sections |
| `/about` | Yes | Yes | Live |
| `/contact` | Yes | Yes | Live, working form |
| `/customer-stories` | No | No | Route exists but is parked. Renders an empty state because `lib/customer-stories.ts` has no entries. Effectively hidden. |

Navigation (`components/layout/navbar.tsx`) exposes only **Home, About, Contact**. Footer exposes **About, Contact**.

### 2.3 Current homepage structure (`app/page.tsx`)
In render order:
1. **`Hero`** ("Transforming Cameras Into Decision-Making Systems"). Subhead is integrator-flavoured. Two CTAs (Contact, Learn More). Trust chips: "20+ years", "In-house engineering and software". The agnostic tagline is **not** here.
2. **`IndustriesStrip`** (animated marquee of 10 industry names: FMCG, Dairy, Bakery, Hygiene and Nonwovens, Healthcare and Medical, Pharmaceutical, Returnable Packaging, Transport and Logistics, Defence, Building Products).
3. **`IndustriesServed`** (the heavy one): 8 detailed sectors as desktop pill-tabs plus an active panel, mobile accordion. Each sector has an intro, five "where we add value" bullets, and an image. Sectors: FMCG and Packaged Food, Dairy and Food Processing, Bakery and Packaged Goods, Hygiene and Nonwovens, Healthcare and Medical, Pharmaceutical Distribution, Blood/Biologics and Labelling, Returnable Transit Packaging. Closes with a "breadth of deployment is itself a capability" callout.
4. **`Pipeline`** ("Our Approach"): 5-step scroll-tracked timeline (Feasibility and POC, Custom development, Deployment and commissioning, Validation, Support and refinement).
5. **`CapabilitiesGrid`** ("Capabilities"): interactive selector across 3 families (Sensing, Classical/rule-based vision, ML/deep learning) and 8 problems (defect, contamination, presence, label/print, dimensional, fill level, surface/structural, orientation). ML family already lists object detection, segmentation, anomaly detection, OCR, custom model development. SAM is named in the fill-level problem.
6. **`Differentiators`** ("What sets our work apart"): 5-card bento. Featured "Built to be customised" (core strength), plus Whole-stack capability, Production-grade engineering, Right tool for the job, Customer oriented and globally supported.
7. **`ProductionStrip`** ("Engineered for production"): runs at line speed, integrates with your line, validated and traceable, globally supported.
8. **`FinalCTA`** ("Let's Solve Your Inspection Challenge").

### 2.4 Current positioning gaps versus the new brief
- **Agnostic message is missing on Home.** The marquee and the 8-sector panel both read as "these are the industries we serve," which is exactly the impression the brief wants to remove.
- **Tagline placement.** "Our vision is your solution" is on `/about` only, not the homepage hero.
- **Custom is present but soft.** "Built to be customised" exists as the featured differentiator, but the explicit contrast (custom-built versus competitors' generic, fixed products) is not stated as the headline reason to choose AMV.
- **AI is deliberately understated.** Per the v1 plan, AI was pushed down. The new brief wants it forward (honestly).
- **No HALCON mention anywhere.** Ken's feedback specifically calls out the HALCON plus AMV Deep Learning hybrid. It is currently absent from the site.
- **Non-traditional inspection not surfaced.** AMV takes on unusual, hard inspection problems that standard off-the-shelf products will not handle. This is not called out. (Note: AMV does **inspection only**. It does **not** do process control, that is, vision output that drives or adjusts the line. Despite Ken's email phrasing, process control is explicitly out of scope and must not appear on the site.)
- **Two industries components on Home** (marquee plus detailed panel) duplicate the industries idea and add length. Good candidate for consolidation and extraction to `/industries`.
- **About page** already carries the tagline and a Director profile (Ken Razga), 20+ years framing, and qualitative stats (no fabricated numbers). It is in good shape and largely out of scope for this revamp except for cross-linking.

---

## 3. Proposed sitemap / information architecture

### 3.1 Proposed navigation
**Home, Industries, Methodology, About, Contact.**

Rationale:
- **Industries** becomes its own top-level page so the homepage can shrink to a teaser. This is the brief's explicit IA request.
- **Methodology** ("How we do it") becomes discoverable in nav because it carries the AI and HALCON story, which is now a primary hook. (Placement decision discussed in 3.3.)
- **About** and **Contact** stay.
- **Customer Stories** remains parked/hidden until signed-off, confidentiality-safe stories exist (see Open Questions).

### 3.2 Proposed route map
| Route | Action | Notes |
|---|---|---|
| `/` | Restructure | Add tagline hero, agnostic message, AI hook, custom-built differentiator, Industries teaser, Methodology teaser. Remove the heavy `IndustriesServed` panel from Home. |
| `/industries` | **New page** | Move and rework `IndustriesServed` content here as "we work across all industries," organised by category with capability bullets and a "not limited to these" close. |
| `/methodology` | **New page (recommended)** | "How we do it." HALCON, deep learning/ML, classical CV, cloud diagnostics, each in plain language. See 3.3 for the page-versus-section decision. |
| `/about` | Light touch | Cross-link to Industries and Methodology. Otherwise unchanged. |
| `/contact` | No change | Working form stays. |
| `/customer-stories` | Stay parked | Out of scope. Keep hidden. |
| `app/sitemap.ts` | Update | Add `/industries` and `/methodology` when they ship. |

### 3.3 Methodology: own page or homepage section?
**Recommendation: a dedicated `/methodology` page, with a short 3 to 4 card teaser on the homepage that links to it.**

Reasoning:
- The methodology content is substantial (four-plus technologies, each needing a plain-language explanation and a customer-benefit line). Inlined on Home it re-bloats the page we are trying to slim.
- It is now a primary differentiator hook (AI, HALCON hybrid). A dedicated page gives it room and an SEO target ("machine vision methodology", "HALCON deep learning inspection").
- The homepage teaser keeps the hook visible without the full depth.

Trade-off: a new page is more to maintain than a section. Given the brief weights AI and "how we do it" heavily, the page is justified. If Ken prefers fewer pages for v1, the fallback is a single homepage Methodology section with the same content (flagged in Open Questions).

### 3.4 Resulting homepage section order (proposed)
1. Hero (tagline-led, agnostic, AI hook).
2. Agnostic positioning band (short: "any industry, any visual inspection problem", with the confidentiality note).
3. Why AMV / custom-built differentiator (the anti-off-the-shelf message, reworked `Differentiators`).
4. Capabilities (keep, lightly reframe to surface AI and process control).
5. Methodology teaser (3 to 4 cards linking to `/methodology`).
6. Industries teaser (replaces the heavy panel; links to `/industries`).
7. Our Approach (keep `Pipeline`).
8. Engineered for production (keep `ProductionStrip`).
9. Final CTA (keep).

This keeps Home roughly the same length while swapping the heavy industries panel and adding the AI/methodology hook.

---

## 4. Page-by-page content specification

> Copy below is **direction and key messages**, not final wording. All copy must follow the tone rules in Section 5 (plain language, no em or en dashes). Final copy is a separate pass.

### 4.1 Home (`/`)

**Section: Hero** (`components/home/hero.tsx`, rewrite)
- Headline: lead with **"Our vision is your solution."**
- Subhead key messages: AMV builds **custom** machine vision and AI inspection systems for **any** industry and **any** visual inspection or quality control problem. Plain-language one-liner on what machine vision is (cameras plus software that inspect products automatically and decide in real time).
- Trust chips: keep "20+ years" and "In-house engineering and software." Consider adding an AI chip (for example "AI and deep learning inspection") if Ken approves the AI emphasis.
- CTAs: "Discuss your problem" (to Contact) and "See how we do it" (to Methodology).
- Image placeholder: none required (gradient hero retained), but optional `image_placeholder`: a generic, abstract machine-vision visual (camera over a conveyor, or a clean inspection overlay graphic). Royalty-free or AMV-owned.

**Section: Agnostic positioning band** (new, small)
- Key message: "Whatever you make, if it can be seen, it can be inspected." We are not tied to one industry or one product type. Examples follow on the Industries page; they are illustrations, not limits.
- Confidentiality line: "We describe our work by capability rather than by client, because we respect customer confidentiality." This pre-empts the "where are your logos/case studies" question.

**Section: Why AMV (custom-built differentiator)** (rework of `components/home/differentiators.tsx`)
- Lead pillar (featured): **Custom-built, not off-the-shelf.** We do not sell generic, fixed-function inspection boxes. Every system is specialised to your exact line, product mix, and process. Plain-language benefit: it fits your problem instead of forcing your problem to fit a product.
- Supporting pillars (keep and lightly retune): Whole-stack capability; Right tool for the job (this is where the HALCON plus deep learning hybrid gets a one-line mention); Production-grade engineering; Customer oriented and globally supported.
- New angle to fold in (Ken): **non-traditional inspection.** One line stating that AMV takes on unusual, hard inspection problems that standard off-the-shelf products will not handle. (Inspection only. Do **not** claim process control or any "vision drives the line" capability.)

**Section: Capabilities** (keep `components/home/capabilities-grid.tsx`, light reframe)
- Keep the interactive families and problems.
- Reframe intro to surface AI ("trained AI models that learn defects from examples"). Keep the framing on inspection. Do not add process control.
- Ensure each family has a plain-language gloss visible (Sensing = how we capture the image; Classical = fixed rules and measurement; ML/deep learning = models that learn from examples).

**Section: Methodology teaser** (new)
- 3 to 4 cards: HALCON, AI / deep learning, classical vision, cloud diagnostics. One plain sentence each. Link: "How we build solutions" to `/methodology`.

**Section: Industries teaser** (new, replaces `IndustriesServed` on Home)
- Short statement: "We work across food, healthcare, packaging, logistics, industrial and general manufacturing, and beyond." A compact grid or row of category names (can reuse the marquee idea or a static chip grid).
- Strong closing line: "These are examples, not limits. If your industry is not listed, we can still help." Link: "Explore industries" to `/industries`.
- This replaces both the marquee `IndustriesStrip` detail and the heavy `IndustriesServed` panel on Home (consolidate to one teaser).

**Sections kept as-is:** Our Approach (`Pipeline`), Engineered for production (`ProductionStrip`), Final CTA (`FinalCTA`).

### 4.2 Industries (`/industries`, new page)

**Page intro**
- Headline key message: "Machine vision for any industry."
- Sub: we organise by industry to make examples concrete, but our capability is general. Plain-language line. Confidentiality note repeated briefly (capability categories, not named clients).

**Body: one block per industry category.** Each block has:
- Industry name (plain).
- One-sentence plain-language framing of the inspection challenge in that industry.
- A bulleted list of capability examples.
- An `image_placeholder` field: a short description of the generic, royalty-free representative stock image to source later. (Engineering will not fetch or generate images; these are sourced separately and supplied.)

**Approved baseline categories (ship these):**

1. **Food Processing**
   - Foreign material detection
   - Portion control and weight verification
   - Surface and structural defect detection
   - Seal and packaging inspection
   - Fill level checks
   - Trending analysis for process improvement
   - `image_placeholder`: generic food production line, product moving on a conveyor (no brand marks).

2. **Industrial Manufacturing**
   - Dimensional measurement and tolerance control
   - Surface defect detection
   - Component presence and orientation
   - Assembly verification
   - Process stability and trend analysis
   - `image_placeholder`: generic factory floor or metal/precision parts on a line.

3. **General Manufacturing**
   - High speed packaging inspection
   - Barcode, label and print verification
   - Completeness and assembly checks
   - Quality grading and classification
   - Automated quality trending
   - `image_placeholder`: generic packaging line with cartons or labels.

**Existing detailed sectors to map in (already on the current site, confidentiality-safe and generic).** These can be presented as sub-examples under the categories above, or as their own slimmer blocks. Decision needed (Open Questions), but they are already approved content and should not be lost:
- FMCG and Packaged Food, Dairy and Food Processing, Bakery and Packaged Goods (map under Food Processing / General Manufacturing).
- Hygiene and Nonwovens (continuous web inspection).
- Healthcare and Medical, Pharmaceutical Distribution, Blood/Biologics and Labelling (a Healthcare and Life Sciences grouping).
- Returnable Transit Packaging (3D and 2D pallet/asset inspection).
- Plus the marquee-only names not yet detailed: Defence, Building Products, Transport and Logistics.

**Additional categories: CONFIRMED, all ship.** AMV confirmed all proposed categories are in scope. Each follows the same block format with capability bullets and an `image_placeholder`:
- **Pharmaceuticals** (blister/vial inspection, fill and seal, label and serialisation verification). `image_placeholder`: generic pharma packaging line.
- **Beverage** (fill level, cap and seal, label placement, container defects). `image_placeholder`: generic bottling line.
- **Automotive / Components** (surface finish, assembly and presence, dimensional gauging). `image_placeholder`: generic automotive parts line.
- **Electronics / PCB** (solder and component placement, presence/polarity, print). `image_placeholder`: generic PCB assembly.
- **Agriculture / Fresh Produce** (grading, sizing, blemish and contamination). `image_placeholder`: generic produce sorting line.
- **Logistics / Warehousing** (label and barcode reading, dimensioning, damage detection). `image_placeholder`: generic warehouse conveyor/sortation. (Aligns with the existing "Transport and Logistics" tag.)
- **Recycling / Waste Sorting** (material classification and contamination sorting). `image_placeholder`: generic sorting line.
- **Textiles / Nonwovens** (web defect detection, width and pattern). (Overlaps Hygiene and Nonwovens; can be merged.)
- **Plastics / Injection Moulding** (short shots, flash, surface and dimensional defects). `image_placeholder`: generic moulded-parts line.
- **Medical Devices** (assembly verification, defect and cleanliness, label correctness). (Overlaps Healthcare; can sit in a Healthcare and Life Sciences group.)
- **Building Products** and **Defence** (already named in the current marquee). Capability bullets to be drafted; confirm specifics with AMV during copy pass.

Note: page structure (flat vs grouped) is at engineering's discretion and can be changed later (AMV is not prescriptive). Recommended grouping is in Section 6, resolved item 6.

**Page close (required by brief):**
- Explicit statement that AMV is **not limited** to the industries listed. The list represents examples, not boundaries. Capability extends to any visual inspection problem. CTA to Contact: "Do not see your industry? Tell us your problem."

### 4.3 Methodology (`/methodology`, new page) "How we do it"

**Page intro**
- Key message: how AMV actually builds a working system, written for non-technical readers. One line that the "how" is what makes a custom solution reliable.

**Per technology block format (brief-specified):** plain-language name/category, one sentence on what it does in non-technical terms, one sentence on why it matters to the customer (speed, accuracy, cost, reliability).

1. **HALCON (industrial machine vision software)**
   - What: a proven, professional vision toolkit for precise, repeatable optical measurement and defect detection.
   - Why: gives rock-solid accuracy and repeatability on well-defined checks, the parts of the job where exact measurement matters.
   - _Note: Ken specifically wants the **HALCON plus AMV Deep Learning hybrid** called out. Add a short paragraph explaining the hybrid: HALCON for the precise, rule-based parts, AMV's own deep learning for the variable, hard-to-define parts, combined in one system._

2. **Deep learning / machine learning models (for example YOLO-style detection, SAM-style segmentation)**
   - What: AI that **learns** to recognise defects, objects and features from examples, instead of being told rigid rules.
   - Why: handles messy, variable, hard-to-describe defects that fixed rules miss, which means higher catch rates on real product.
   - Plain-language gloss required for "model", "training", "segmentation".

3. **Classical computer vision algorithms (alongside AI)**
   - What: fixed, rule-based image methods for measuring and checking when the task is well defined and consistent.
   - Why: fast, predictable and cheap to run where the problem does not need a learned model. Explain plainly **when** AMV uses classical versus AI (rules for the predictable parts, AI for the variable parts).

4. **Cloud-based diagnostics and monitoring (Grafana dashboards)**
   - What: remote, real-time dashboards (Grafana-based metrics) showing how each system is running and how inspection is performing, viewable without being on-site.
   - Why: faster support, less downtime, and ongoing insight into line performance.
   - Confirmed offered. Present as Grafana-based metrics dashboards. Optionally include one or two **dummy/sample dashboard screenshots** (clearly representative, no real customer data) if AMV wants a visual. Mark any sample image as illustrative.

**Other tech to include only if AMV confirms (flag as "to confirm with AMV"):**
- Model deployment/runtime (for example ONNX or edge inference) and what it buys the customer (on-line, low-latency decisions).
- Annotation/training tooling and continuous improvement (models that improve as product mix changes).
- 3D / line-scan / multispectral or thermal imaging (already implied in current Capabilities content; can be summarised here in plain terms).

**Tie-back:** close the page by linking the methodology to the custom-built differentiator: because AMV owns the whole pipeline and combines these methods, it can tailor the solution to the exact problem.

### 4.4 About (`/about`, light touch)
- Already strong (tagline present, Director profile, qualitative stats, no fabricated numbers).
- Action: add cross-links to `/industries` and `/methodology`. Ensure tone and the no-dashes rule hold. No structural change.

### 4.5 Contact (`/contact`, no change)
- Working form and correct business details. No change in scope. (Optional: a one-line nudge that "any industry, any problem" enquiries are welcome.)

### 4.6 Navigation and footer
- Navbar: add **Industries** and **Methodology** between Home and About.
- Footer: add the two new links under Quick links.
- Sitemap (`app/sitemap.ts`): add `/industries` and `/methodology` on ship.

---

## 5. Tone and voice guidelines (enforce site-wide)

These extend the existing rules in `docs/CONTENT-MAP-v1.md` and the project copy-style rules.

1. **Non-technical reader first.** Write for a plant manager or procurement lead, not an engineer. If a sentence needs domain knowledge to parse, rewrite it.
2. **Pair every technical term with a plain-language explanation.** First use of "segmentation", "HALCON", "deep learning", "process control", "line-scan", and similar must include a short plain gloss. This is a hard requirement from the brief.
3. **No em dashes or en dashes anywhere.** Use commas, periods, parentheses, or colons. (Project-wide rule; the current build still has dashes in places and needs a pass.)
4. **Concise and skimmable.** Lead with the takeaway. Short paragraphs and bullets.
5. **Honest AI.** AI claims must map to real deep learning/ML delivery. No AI language that is not backed by something AMV actually does.
6. **Custom, repeated, not hyped.** State the custom-built, anti-off-the-shelf message plainly and often, without superlatives.
7. **Confidentiality framed as a positive.** When explaining the lack of named clients, frame it as respect for customer confidentiality, not as an absence of proof.
8. **Benefit before mechanism.** Say what the customer gets (accuracy, speed, less downtime, lower cost) before how it works.

---

## 6. Decisions (RESOLVED with AMV, 2026-06-29)

All open questions have been answered. Decisions below are binding for the build.

1. **AI emphasis.** RESOLVED, yes. Lead with AI, anchored to real delivery and the 20+ years integrator story.
2. **HALCON hybrid.** RESOLVED, yes. Describe the HALCON plus AMV Deep Learning hybrid, and HALCON can be named publicly on the site.
3. **Process control.** RESOLVED, NO. AMV does **inspection only** and does **not** do process control. Despite Ken's email phrasing, process control must not appear anywhere on the site. Keep the "non-traditional / hard inspection problems" angle only.
4. **Cloud diagnostics.** RESOLVED, yes. Offered as **Grafana-based metrics dashboards**. May include one or two dummy/sample dashboard screenshots (illustrative, no real data) if wanted.
5. **Industries scope.** RESOLVED. **All** proposed categories ship (Pharmaceuticals, Beverage, Automotive, Electronics/PCB, Agriculture, Logistics, Recycling, Textiles, Plastics, Medical Devices, plus existing Defence and Building Products), alongside the three baseline categories and the eight existing detailed sectors.
6. **Industries page structure.** RESOLVED, engineering's discretion, changeable later. Recommended grouping: Food and Beverage; Healthcare and Life Sciences; Industrial and General Manufacturing; Materials, Web and Packaging; Logistics and Other. Fold the existing 8 sectors into these groups.
7. **Methodology placement.** RESOLVED. Dedicated `/methodology` page **plus** a brief methodology summary/teaser on the homepage.
8. **Tagline placement.** RESOLVED, yes. "Our vision is your solution." becomes the homepage hero headline.
9. **Customer Stories.** RESOLVED. Keep parked. Address in a later phase.
10. **Images.** RESOLVED. AMV (Vikrant) will source the images. Engineering provides the industry list and image descriptions (see the list delivered alongside this PRD).
11. **Brand and visual direction.** RESOLVED. Keep the current teal/cyan palette, Inter/JetBrains fonts, and existing component styling. No rebrand.
12. **SEO/meta.** RESOLVED. New pages follow the existing title/description/canonical/sitemap pattern, with keywords driven by the actual website content (machine vision, automated inspection, AI inspection, HALCON, deep learning, plus the industry and capability terms used on each page).

---

## 7. Suggested implementation phasing

**Phase 1: IA + Home + Industries (the repositioning core)**
- Add Industries (`/industries`) page from existing `IndustriesServed` content plus approved baseline categories and the "not limited to these" close.
- Restructure Home: tagline hero, agnostic band with confidentiality note, custom-built differentiator rework, Industries teaser replacing the heavy panel.
- Update navbar, footer, sitemap.
- Outcome: the agnostic, custom-built, confidentiality-aware positioning is live. This is the minimum that satisfies the brief's main intent.

**Phase 2: Methodology + AI hook**
- Build `/methodology` ("How we do it") with HALCON, deep learning/ML, classical CV, and cloud diagnostics (confirmed items only), each in plain language with a benefit line.
- Add the HALCON plus deep learning hybrid narrative and the non-traditional inspection angle (no process control).
- Add the homepage Methodology teaser/brief and surface AI in Hero/Capabilities.
- Cloud diagnostics presented as Grafana-based dashboards (optional sample screenshots).

**Phase 3: Polish, plain-language and SEO pass**
- Site-wide plain-language audit (every technical term glossed) and the no-dashes cleanup pass.
- Drop in the supplied stock images per the `image_placeholder` notes.
- SEO: titles, descriptions, canonicals, JSON-LD review, sitemap finalisation, internal cross-links (About to Industries/Methodology).
- Optional: revisit Customer Stories if a confidentiality-safe format is approved.

---

_End of PRD. Awaiting review. No implementation will begin until this document is approved._
