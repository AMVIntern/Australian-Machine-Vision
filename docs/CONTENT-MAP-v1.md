# AMV Website - Content-to-Component Map (Cut-down v1)

_Generated: 2026-06-15 · Source: "AMV Website Content.docx" (Anthony Sekulov) + email thread (Anthony, Vikrant, Ken, Harsha)_

This document maps the approved copy from Anthony's docx onto the existing Next.js build,
and lists what to **add**, **change**, **remove**, and **park** for the cut-down v1 launch.
It is the planning reference for the merge. No code has been changed yet.

---

## 1. Decisions driving this version

- **Audience:** lead with the **frontline customer who has the inspection problem**, not the engineer. Keep engineering depth available but secondary.
- **Positioning shift:** from "AI defect-detection startup" to **experienced machine vision integrator** (20+ years, food / industrial / general manufacturing, strong partner network, in-house engineering).
- **Fabricated content is removed / genericised in v1** (logos, testimonials, dollar-value metrics). Real proof is parked until customer sign-off.
- **Scope:** launch a clean **baseline** that presents AMV well, then build up over time.
- **Timeline:** Vikrant available from next week; cut-down launch targeted 1-2 weeks after, gated on content finalisation and Ken's review (especially About Us).

## 2. Style and tone rules (enforce site-wide)

- Concise, structured, clear, personable.
- No hype, no unnecessary jargon.
- **No em dashes or en dashes.** Use commas or periods instead. (Current build uses em dashes in many components - global pass required.)
- Lead with key takeaways to grab attention early.
- Skimmable: bullet points and short paragraphs.
- Avoid duplication across sections.
- SEO optimised, linked to customer value.

---

## 3. Page-by-page content map

### 3.1 Home (`app/page.tsx` + `components/home/*`)

| Section / component | Current state | v1 action | Source copy |
|---|---|---|---|
| `hero.tsx` | "Computer Vision AI" startup framing | **Rewrite** to integrator positioning | Headline: "Inspection systems engineered for reliability and real world performance." Sub-bullets: decades of experience; expertise across food, industrial, manufacturing; integration of 3D vision, 2D imaging, advanced image processing; custom software and engineering for seamless line integration; trusted technology partner network; solutions that outperform off the shelf systems. |
| `logo-carousel.tsx` | Bosch / Nestle logos | **Remove logos.** Repurpose strip as **generic industries** or delete for v1 | Industries (Harsha's generic list): Bakery, Defence, Building Products, Healthcare, Transport and Logistics, Dairy, FMCG |
| `metrics-strip.tsx` | Hard-coded marketing metrics | **Genericise or remove.** No invented numbers in v1 | Replace with qualitative value statements (accuracy, throughput, consistency) or park until sign-off |
| `industry-tabs.tsx` | Generic tabs | **Repopulate** with docx industries + value pockets | Food Processing / Industrial Manufacturing / General Manufacturing, each with its bullet list (see 4.3) |
| `pipeline.tsx` | Generic pipeline | **Reframe** as "Our Approach" | "Every project begins with a clear understanding of the customer's production environment and quality requirements. We then select and integrate the technologies that deliver the most reliable, scalable and cost effective outcome." |
| `capabilities-grid.tsx` | AI-centric capabilities | **Replace** with technology breadth + key applications | Technologies (4.2) and Key Applications (4.1) |
| `visual-proof.tsx` | Placeholder visuals | **Keep as placeholder**, integrate basic supporting visuals later (Adept / partner material pending) | Park real imagery |
| `differentiators.tsx` | Generic differentiators | **Rewrite** around the three pillars | Decades of Experience; Technology Partners; In-House Engineering and Software; Value for Investment (see 4.4) |
| `final-cta.tsx` | Generic CTA | **Update** copy | "If you are reviewing your inspection capability or planning upgrades across multiple sites, our team can help you identify the right approach." -> Contact Us |

### 3.2 About (`app/about/page.tsx` + `components/about/*`)

> **Ken must sign off on this page specifically.**

- **Replace** mission/vision startup language with the docx narrative: "Advanced Machine Vision Systems for Real Production Environments" intro, then the three pillars (Decades of Experience, Technology Partners, In-House Engineering and Software, Value for Investment).
- **Remove** invented statistics (150+ clients, 50M+ inspections/day, 99.2%, "6 team members") unless confirmed accurate. Park anything unverified.
- Keep real business facts (Seaford address, contact details) - these are correct.

### 3.3 Customer Stories (`app/customer-stories/*` + `lib/customer-stories.ts`)

- **Remove the three fabricated stories** (automotive paint, FMCG packaging, pharma tablet) and their invented testimonials/metrics ("Sarah Chen", "$2.4M", "Dr. Maria Santos"). These violate "no hype" and are unapproved.
- **v1 option A (recommended):** replace the route with a generic **Industry Solutions** page built from value pockets (no named customers).
- **v1 option B:** hide the route from nav until real, signed-off case studies exist.
- Keep the `CustomerStory` data structure for future reuse when approved stories arrive.

### 3.4 Contact (`app/contact/page.tsx` + `actions.ts`)

- Largely **keep as-is** - real details are correct (9A Sir Laurence Drive Seaford 3198; phones; emails; Mon-Fri 9am-5pm).
- Light copy pass for tone and to match the new CTA wording.
- Server Action + optional webhook unchanged.

### 3.5 Navigation / Footer (`components/layout/*`)

- Update nav to reflect v1 structure (Home, About, Industries/Solutions, Contact).
- Ensure no links point to removed/parked pages.

---

## 4. Reusable content blocks (from docx)

### 4.1 Key Applications
Quality control (in/out of specification); dimensional measurement and tolerance verification;
foreign material detection; surface and structural defect detection; packaging and label
inspection; fill level and completeness checks; assembly verification; automated trending and
process analytics; real time decision support for operators.

### 4.2 Technologies
3D vision and depth sensing; high resolution 2D imaging; smart cameras and embedded vision
systems; line scan and area scan imaging; multispectral, hyperspectral and thermal imaging;
advanced image processing and algorithmic inspection; deep learning for classification and
defect detection.

### 4.3 Industries and value pockets

**Food Processing:** foreign material detection; portion control and weight verification;
surface and structural defect detection; seal and packaging inspection; fill level checks;
trending analysis for process improvement.

**Industrial Manufacturing:** dimensional measurement and tolerance control; surface defect
detection; component presence and orientation; assembly verification; process stability and
trend analysis.

**General Manufacturing:** high speed packaging inspection; barcode, label and print
verification; completeness and assembly checks; quality grading and classification; automated
quality trending.

**Generic industry tags (Harsha, for logos-replacement):** Bakery, Defence, Building Products,
Healthcare, Transport and Logistics, Dairy, FMCG.

### 4.4 Three pillars (About / Differentiators)

- **Decades of Experience:** 20+ years delivering machine vision and automated inspection across food processing, FMCG, packaging and industrial manufacturing, in Australia and global markets.
- **Technology Partners:** wide network of trusted partners across the global vision industry, giving access to the best hardware, imaging platforms and processing technologies.
- **In-House Engineering and Software:** teams that design, build and support every system, combining best-available components with custom software and automation integration. Capabilities: custom software development; advanced image processing and algorithm design; PLC and automation integration; mechanical and electrical design; vision system optimisation and remote support.
- **Value for Investment:** solves challenges off-the-shelf systems cannot; measurable improvements in accuracy, throughput and consistency.

---

## 5. Remove / soften checklist

- [ ] Remove Bosch / Nestle logos (`public/logos/`, `logo-carousel.tsx`) - logos need approval.
- [ ] Remove fabricated testimonials and dollar metrics (`lib/customer-stories.ts`, `metrics-strip.tsx`, About stats).
- [ ] Soften "no replacement hardware" messaging - present as an option that can deliver value, not the preference.
- [ ] Global pass: replace all em dashes / en dashes with commas or periods.
- [ ] Reduce AI-first framing; lead with experience and breadth, keep AI/deep learning as one capability among many.

## 6. Parked until sign-off / later passes

- Real customer logos and named case studies (await approval).
- Verified statistics (client count, inspection volume, accuracy figures).
- Supporting visuals and marketing material (awaiting Adept response; partner material from MVTec Halcon etc.).
- Reference material to leverage later: adept.net.au, mvtec.com/products/halcon, and the product videos listed in the docx.

## 7. Suggested v1 build order for Vikrant

1. Global tone + em-dash cleanup pass (low risk, touches everything).
2. Hero + Differentiators (three pillars) - sets the new positioning.
3. About page rewrite -> Ken review gate.
4. Capabilities (technologies) + Key Applications.
5. Industries section (value pockets + generic industry tags), replacing the logo carousel.
6. Customer Stories -> swap to generic Industry Solutions or hide from nav.
7. Contact copy polish.
8. Integrate basic placeholder visuals; wire real assets when Adept/partners deliver.
