# PRD: AMV Website v2 (Ken Feedback — Simplify Industries + Add Blog)

_Status: PROPOSED. Driven by Ken's review of the v1 preview. Awaiting confirmation before build._
_Author: Engineering (Vikrant). Date: 2026-06-29._
_Approval gate: Ken (Director). This document supersedes the relevant parts of `docs/PRD-WEBSITE-REVAMP.md` Section 4.2 (Industries) and adds a new Blog scope._

---

## 1. Why this revision exists

Ken reviewed the v1 preview and approved the overall rework and structure. He raised two substantive changes and one addition:

1. **The Industries section is too broad and too specific at the same time.** It risks overstating capability and damaging credibility by listing 20+ sectors, some of which AMV has not actually delivered into. He wants it pulled back to a small, generic, defensible set.
2. **Some specific sectors must be removed** because they imply specialised experience AMV cannot substantiate. Named examples: **Agriculture** (highly specialised and saturated field) and **Defence**.
3. **Add a Blog section** for the two posts he has written.

Ken's explicit guidance: *"go back to basics... and maybe build on this slightly for now."* Everything outside Industries and the new Blog is considered done for this generation of the website and needs no further refinement.

---

## 2. Summary of Ken's feedback (verbatim intent)

- Likes the rework; it breaks things down nicely.
- We had agreed to simplify and make the Industries slide much more generic.
- Concern about overstating capability: being too broad or too specific about work we have not actually accomplished risks credibility.
- Question whether we have genuinely done some of this work, **specifically agricultural** (specialised and saturated). Strip it out.
- Strip out **Defence** and similar.
- Go back to a basic Key Applications + three-industry structure (provided below).
- Structure outside of Industries does **not** need further refinement for this generation.
- Include a **Blog** section for the two posts he created. Use the second one attached. **Do not** use the initial italic text in each post body, because that italic intro is the entry/excerpt into the blog.

---

## 3. Industries: the new, simplified spec (replaces v1 Section 4.2)

The current `/industries` page lists 20+ sectors grouped into five categories with per-sector capability bullets and images. **This is being cut down to three industries plus a shared Key Applications section.**

### 3.1 Key Applications (new shared section, sits above the three industries)

Intro line: *Our systems address the core inspection and quality drivers across food, industrial and manufacturing environments.*

- Quality control, in and out of specification
- Dimensional measurement and tolerance verification
- Foreign material detection
- Surface and structural defect detection
- Packaging and label inspection
- Fill level and completeness checks
- Assembly verification
- Automated trending and process analytics
- Real time decision support for operators

### 3.2 Industries (three only)

**1. Food Processing**
- Foreign material detection
- Portion control and weight verification
- Surface and structural defect detection
- Seal and packaging inspection
- Fill level checks
- Trending analysis for process improvement

**2. Industrial Manufacturing**
- Dimensional measurement and tolerance control
- Surface defect detection
- Component presence and orientation
- Assembly verification
- Process stability and trend analysis

**3. General Manufacturing**
- High speed packaging inspection
- Barcode, label and print verification
- Completeness and assembly checks
- Quality grading and classification
- Automated quality trending

### 3.3 What gets removed

All of the following are removed from `lib/industries-data.ts` and the `/industries` page:

- FMCG and Packaged Food, Dairy and Food Processing, Bakery and Packaged Goods, Beverage (fold the relevant capability into **Food Processing** / **General Manufacturing**)
- Hygiene and Nonwovens
- Healthcare and Medical, Pharmaceutical and Distribution, Blood/Biologics and Labelling
- Automotive, Electronics and PCB, Plastics and Rubber, Textiles and Apparel, Building Products
- Returnable Transit Packaging, Logistics and Warehousing, Transport and Logistics
- **Agriculture and Primary Produce** (explicitly called out by Ken)
- Recycling and Waste Sorting
- **Defence** (explicitly called out by Ken)

### 3.4 Implementation notes

- `lib/industries-data.ts` shrinks dramatically: from 20+ entries and five groups to three entries (and the grouping mechanism can be dropped or collapsed to a single flat list).
- The per-industry **images** that caused recent back-and-forth (dairy, textiles, recycling, medical) are no longer needed for the removed sectors. Decide whether the three remaining industries keep representative images or move to a cleaner, text-led layout. **Recommendation:** text-led cards (Key Applications + three industries) to reinforce the "generic and defensible" intent and avoid sourcing more stock photos.
- Keep the existing "not limited to these industries / contact us" closing message. It now does even more work, since the visible list is intentionally short.
- Update page copy and metadata to drop the "more than 20 industries" claim. Reframe around the three core environments.

---

## 4. Blog section (new scope)

Add a Blog to the site for the two posts Ken has written. Source files live in `docs/`:

1. **The Cognitive Gap: Deep Learning for Reliable, Production-Grade Quality Outcomes** (`docs/The Cognitive Gap Rev 1.docx`)
2. **Beyond the Smart Camera: Why "Out-of-the-Box" Vision Systems Struggle in Real Manufacturing** (`docs/Beyond the Smart Camera Rev 3.docx`)

### 4.1 Content rule from Ken

Each post opens with an **italic intro paragraph**. That italic text is the **entry/excerpt** used on the blog listing card. **Do not repeat it in the body of the post.** The post body starts after the italic intro.

### 4.2 Proposed structure

- `/blog` — listing page. Each post shows title, the italic intro as the excerpt, and a link through to the post.
- `/blog/[slug]` — individual post page.
- Suggested slugs: `the-cognitive-gap`, `beyond-the-smart-camera`.
- Add **Blog** to the navbar and footer, and add both post URLs to `app/sitemap.ts`.

### 4.3 Storage approach (decision needed, see Section 6)

Two reasonable options for v1:
- **A. Hardcoded content** in a `lib/blog-data.ts` (or MDX files). Fastest, no dependencies, fine for two static posts.
- **B. CMS / markdown pipeline.** Overkill for two posts now, but better if posts will be added frequently.

**Recommendation: Option A** (static, in-repo) for this generation. Revisit a CMS only when post cadence justifies it.

### 4.4 Tone / formatting

- Follow the site-wide copy rules: plain language, **no em or en dashes** (the source docx files contain dashes and curly quotes that must be cleaned on import).
- Preserve the heading structure already in each post (section headings, numbered frameworks, bullet lists).
- Both posts already align with the agnostic, custom-built, inspection-only positioning. No repositioning needed.

---

## 5. What stays unchanged

Per Ken: the structure outside Industries needs no further refinement for this generation. The following remain as-is:

- Home (hero, differentiators, capabilities, methodology teaser, pipeline, production strip, final CTA)
- Methodology page
- About page
- Contact page

Only **Industries** is cut down, and **Blog** is added.

---

## 6. Decisions needed before build

1. **Industries layout:** keep representative images on the three industries, or go text-led (recommended)?
2. **Blog storage:** static in-repo (recommended) or markdown/MDX pipeline?
3. **Blog placement in nav:** top-level nav item, or footer only for v1?
4. **Author / date display:** show author and publish date on posts, or title and body only?
5. **Confirm removals:** the full removal list in 3.3 is broad. Confirm nothing in there must be retained (e.g. any sector AMV genuinely has delivered into and wants to keep as a fourth industry).

---

## 7. Suggested phasing

**Phase 1: Industries cut-down.**
- Reduce `lib/industries-data.ts` to the three industries.
- Add the Key Applications section above them.
- Update page copy/metadata, remove the "20+ industries" claim, keep the "not limited to these" close.

**Phase 2: Blog.**
- Build `/blog` and `/blog/[slug]`.
- Import the two posts, strip the italic intro from each body and reuse it as the listing excerpt, clean dashes and curly quotes.
- Wire nav, footer and sitemap.

---

_End of PRD. No implementation begins until Ken confirms Section 6._
