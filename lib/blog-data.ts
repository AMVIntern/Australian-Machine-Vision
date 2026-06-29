export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "numbered"; items: Array<{ title: string; body: string }> };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  linkedInUrl?: string;
  content: ContentBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "the-cognitive-gap",
    title: "The Cognitive Gap: Deep Learning for Reliable, Production-Grade Quality Outcomes",
    excerpt:
      "Quality and engineering leaders routinely manage inspection tasks where natural variation, material complexity or subjective criteria make rule-based systems unreliable. These tasks require judgement rather than fixed thresholds. This is the Cognitive Gap, and it is a common constraint in food, FMCG and industrial manufacturing.",
    publishedAt: "2026-06-29",
    linkedInUrl: "https://www.linkedin.com/pulse/cognitive-gap-deep-learning-reliable-productiongrade-quality-sekulov-r85ff/",
    content: [
      {
        type: "paragraph",
        text: "Deep Learning provides a disciplined method for addressing this constraint. It learns from real product examples, including acceptable variation, and applies consistent decision logic at line speed. When deployed within a structured inspection pipeline, it strengthens quality performance and stabilises production outcomes.",
      },
      {
        type: "heading2",
        text: "Understanding Where Traditional Vision Reaches Its Limits",
      },
      {
        type: "paragraph",
        text: "Rule-based vision performs well when defects are binary and predictable. It becomes less reliable when:",
      },
      {
        type: "bullets",
        items: [
          "Product surfaces vary naturally",
          "Cosmetic or structural defects present inconsistently",
          "Acceptable variation forms part of the specification",
          "The distinction between acceptable and unacceptable requires context",
        ],
      },
      {
        type: "paragraph",
        text: "In these cases, tightening rules increases false rejects. Loosening rules increases risk. Both outcomes affect throughput, waste, rework and customer quality.",
      },
      {
        type: "paragraph",
        text: "The Cognitive Gap is not a technology failure. It is a signal that the inspection task requires a different approach.",
      },
      {
        type: "heading2",
        text: "Deep Learning as a Structured Response",
      },
      {
        type: "paragraph",
        text: "Deep Learning models learn patterns directly from production imagery. They recognise defects that cannot be defined by simple geometry or colour thresholds. When engineered correctly, they deliver:",
      },
      {
        type: "bullets",
        items: [
          "More stable pass/fail decisions across product variation",
          "Reduced false rejects",
          "Improved alignment with quality criteria",
          "Consistent performance at production speeds",
        ],
      },
      {
        type: "paragraph",
        text: "This capability does not replace operators. It codifies expert judgement and applies it consistently across every unit produced.",
      },
      {
        type: "heading2",
        text: "Why Hybrid Pipelines Deliver the Most Reliable Outcome",
      },
      {
        type: "paragraph",
        text: "A production-grade inspection system rarely relies on a single technique. The most robust systems combine:",
      },
      {
        type: "bullets",
        items: [
          "Fit-for-purpose imaging",
          "Classical vision for deterministic measurement",
          "Deep Learning for variable or judgement-based defects",
          "Calibration to real-world units",
          "Integration with line controls and operator workflows",
        ],
      },
      {
        type: "paragraph",
        text: "This structured approach ensures that each component performs the task it is best suited for. It also ensures the system remains reliable under real operating conditions.",
      },
      {
        type: "heading2",
        text: "A Practical Framework for Leaders Assessing Vision Systems",
      },
      {
        type: "paragraph",
        text: "Quality and engineering managers can strengthen procurement decisions by assessing three factors early:",
      },
      {
        type: "numbered",
        items: [
          {
            title: "Physical stability",
            body: "Lighting, product presentation and line conditions determine whether the system can acquire reliable data. If physical variability is high, specialised imaging may be required.",
          },
          {
            title: "Defect consistency",
            body: "If the defect is predictable, rule-based tools may be sufficient. If the defect varies naturally or requires judgement, Deep Learning becomes essential.",
          },
          {
            title: "Operational use",
            body: "Inspection systems must support operators with clear information, reliable decisions and controlled changeovers. Systems that are difficult to trust or operate will not remain in service.",
          },
        ],
      },
      {
        type: "paragraph",
        text: "This framework helps avoid the common issue of selecting generic smart-camera solutions that perform well in demonstrations but struggle in production.",
      },
      {
        type: "heading2",
        text: "Why This Matters for Production Performance",
      },
      {
        type: "paragraph",
        text: "Reliable automated inspection contributes directly to:",
      },
      {
        type: "bullets",
        items: [
          "Throughput stability",
          "Reduced waste and rework",
          "Lower complaint rates",
          "Improved audit readiness",
          "More consistent operator decision-making",
        ],
      },
      {
        type: "paragraph",
        text: "Deep Learning is not a standalone solution. It is a component within a structured inspection methodology that strengthens quality outcomes and supports operational efficiency.",
      },
      {
        type: "heading2",
        text: "AMV's Role",
      },
      {
        type: "paragraph",
        text: "AMV helps customers determine where Deep Learning is appropriate, where classical vision is sufficient, and how both can be engineered into a reliable, production-grade system. Our approach is grounded in commercial discipline, industry experience and a clear understanding of real manufacturing environments.",
      },
      {
        type: "paragraph",
        text: "For leaders reviewing inspection capability or planning upgrades, a structured assessment of the Cognitive Gap provides clarity on where advanced vision adds measurable value.",
      },
    ],
  },

  {
    slug: "beyond-the-smart-camera",
    title: "Beyond the Smart Camera: Why Out-of-the-Box Vision Systems Struggle in Real Manufacturing",
    excerpt:
      "Almost every manufacturing leader has experienced an automation solution that looked simple in principle, but proved difficult in practice.",
    publishedAt: "2026-06-23",
    linkedInUrl: "https://www.linkedin.com/pulse/beyond-smart-camera-why-out-of-the-box-vision-systems-anthony-sekulov-gqtkf/",
    content: [
      {
        type: "paragraph",
        text: "You buy a highly rated, out-of-the-box smart camera. The sales demo looks flawless. But once it reaches the factory floor, reality sets in. Ambient light shifts, parts vibrate, or a harmless cosmetic mark triggers a false reject that interrupts the line. Within weeks, the system is bypassed because it cannot reliably handle real operating conditions.",
      },
      {
        type: "paragraph",
        text: "To understand why this happens, and what to do about it, it helps to use a familiar strategy tool: the Stacey Matrix.",
      },
      {
        type: "heading2",
        text: "Understanding the Stacey Matrix",
      },
      {
        type: "paragraph",
        text: "Developed by management theorist Ralph Stacey, this framework helps organisations choose the right tool for the job by mapping two questions:",
      },
      {
        type: "bullets",
        items: [
          "The \"What\" (How well do we agree on the requirements?)",
          "The \"How\" (How certain are we about the technical solution?)",
        ],
      },
      {
        type: "paragraph",
        text: "When conditions are predictable, you are in the Simple zone. As variables increase, you move into the Complicated or Complex zones. If control breaks down completely, you enter Anarchy.",
      },
      {
        type: "heading2",
        text: "Translating Stacey to the Vision Inspection World",
      },
      {
        type: "paragraph",
        text: "To see why off-the-shelf vision systems often struggle, we can translate the Stacey Matrix into manufacturing terms.",
      },
      {
        type: "paragraph",
        text: "The Horizontal Axis becomes Physical Certainty (the \"How\"): how stable is the product and its environment? This includes product-level challenges such as glare from packaging variation, motion blur on high-speed lines, and complex shapes that cast shadows over potential defects. It also includes plant floor conditions such as changing ambient light, variable product presentation, machinery vibration, airborne debris, and washdown moisture.",
      },
      {
        type: "paragraph",
        text: "The Vertical Axis becomes Defect Agreement (the \"What\"): how clearly defined is the flaw? Is it a binary check, such as part present or missing, or something more subjective, such as a harmless mark versus a critical defect? This includes the natural and acceptable variability in your product, and how quality is assessed, from pass or fail decisions to grading outcomes. Many industries allow for acceptable natural variation in the finished product.",
      },
      {
        type: "paragraph",
        text: "A successful automated vision inspection system depends on addressing both the physical realities of the factory environment and the inspection criteria that define product quality.",
      },
      {
        type: "heading2",
        text: "The Three Manufacturing Zones",
      },
      {
        type: "heading3",
        text: "1. The Simple Zone: Where Out-of-the-Box Systems Can Work Well",
      },
      {
        type: "paragraph",
        text: "In this quadrant, parts are consistently fixtured, lighting is controlled, and the defect is binary, such as verifying that a cap is fitted to a bottle. Traditional, rule-based smart cameras can perform well here. They count pixels, find edges, and apply simple inspection rules effectively.",
      },
      {
        type: "paragraph",
        text: "The common mistake is assuming that every inspection task on the factory floor sits in this zone.",
      },
      {
        type: "heading3",
        text: "2. The Complicated Zone: The Physical Gap",
      },
      {
        type: "paragraph",
        text: "Here, you know exactly what defect you are looking for, but physical certainty is low. Your line may run at high speeds, parts may rotate freely, or the material may be highly reflective.",
      },
      {
        type: "paragraph",
        text: "Generic, all-in-one cameras often struggle here because standard lenses and basic lighting cannot overcome the physical constraints. Bridging this gap usually requires considered hardware engineering, such as high-resolution line-scan cameras, 3D industrial sensors, dynamic focusing lenses, or specialised lighting to reduce glare or highlight defects.",
      },
      {
        type: "heading3",
        text: "3. The Complex Zone: The Cognitive Gap",
      },
      {
        type: "paragraph",
        text: "Here, the physical environment may be relatively stable, but the defect definition is highly variable. Think of organic materials, cast metals, or complex welds. Defining what makes a part unacceptable often requires human judgement.",
      },
      {
        type: "paragraph",
        text: "Traditional vision software relies on rigid rules. If those rules are too tight, your false reject rate rises and creates an unnecessary bottleneck. If they are too loose, bad parts can pass through. Bridging this gap often requires more advanced software and AI. Deep learning models can be trained on acceptable variations, helping the system emulate expert human judgement at line speed.",
      },
      {
        type: "heading2",
        text: "Delivering True Value on the Factory Floor",
      },
      {
        type: "paragraph",
        text: "An off-the-shelf vision system tends to treat every problem as if it belongs in the Simple Zone. When it meets the variability of a live production line, that assumption often breaks down.",
      },
      {
        type: "paragraph",
        text: "Real value in manufacturing inspection is rarely found in a catalogue or a generic box. It comes from a considered approach that addresses the physical gap with fit-for-purpose hardware, and the cognitive gap with more capable software.",
      },
      {
        type: "paragraph",
        text: "For more complex inspection tasks, the better path is to design a system around the realities of your production environment. Bringing the best mix of technology and a functional AI process in a single custom system is the answer to truly meet the required outcomes.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
