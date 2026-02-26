export interface StoryMetric {
  label: string;
  value: string;
}

export interface ResultMetric {
  label: string;
  value: string;
  subDescription?: string;
  icon?: "trending" | "savings" | "inspection" | "latency";
}

export interface ImplementationStep {
  title: string;
  description: string;
  /** e.g. "Week 1-2" for timeline display */
  timeframe?: string;
  icon?: string;
}

export interface GalleryImage {
  id: string;
  alt: string;
  caption?: string;
  type?: "bounding-box" | "defect" | "before-after" | "dashboard" | "general";
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company: string;
}

export interface CustomerStory {
  slug: string;
  title: string;
  shortDescription: string;
  clientName: string;
  metrics: StoryMetric[];
  heroImage: string;
  gallery: GalleryImage[];
  problem: string;
  solution: string;
  implementationSteps: ImplementationStep[];
  resultsMetrics: ResultMetric[];
  testimonial: Testimonial;
}

export const customerStories: CustomerStory[] = [
  {
    slug: "automotive-paint-inspection",
    title: "95% defect detection on paint lines",
    shortDescription:
      "A global automotive tier-1 supplier reduced escape rates and cut manual inspection costs by 60% with AI vision.",
    clientName: "Automotive Tier-1 Supplier",
    metrics: [
      { label: "Defect detection", value: "95%" },
      { label: "Cost reduction", value: "60%" },
      { label: "Throughput gain", value: "40%" },
    ],
    heroImage: "",
    gallery: [
      { id: "1", alt: "Bounding box overlay on paint surface", type: "bounding-box", caption: "Real-time defect overlay" },
      { id: "2", alt: "Defect detection example", type: "defect", caption: "Scratch and dent detection" },
      { id: "3", alt: "Before vs after inspection", type: "before-after", caption: "Before vs after" },
      { id: "4", alt: "Dashboard screenshot", type: "dashboard", caption: "Analytics dashboard" },
    ],
    problem:
      "Manual paint defect inspection was slow and inconsistent, leading to high rejection rates, customer complaints, and costly rework. Multiple inspectors produced varying results.",
    solution:
      "We deployed an AI-powered vision system that detects paint defects, scratches, and dents in real time on the production line. The system integrates with existing cameras and runs inference at the edge for sub-50ms latency.",
    implementationSteps: [
      { title: "Discovery & Training", description: "Data collection and model training", timeframe: "Week 1-2" },
      { title: "Pilot Deployment", description: "Single line installation and testing", timeframe: "Week 3-4" },
      { title: "Validation", description: "Accuracy validation and fine tuning", timeframe: "Week 5-6" },
      { title: "Full Rollout", description: "Deployment across all production lines", timeframe: "Week 7-8" },
    ],
    resultsMetrics: [
      { label: "Defect Detection Rate", value: "95%", subDescription: "Up from 50% with manual inspection", icon: "trending" },
      { label: "Annual Savings", value: "$2.4M", subDescription: "From cost-not-to-exceed and warranty claims", icon: "savings" },
      { label: "Faster Inspection", value: "60%", subDescription: "Increased throughput & output capacity", icon: "inspection" },
      { label: "Processing Time", value: "35ms", subDescription: "Real-time defect detection", icon: "latency" },
    ],
    testimonial: {
      quote:
        "AMV's system has completely transformed our quality control process. We're catching defects we never even knew existed, and our customer satisfaction scores have improved dramatically. The ROI was clear within the first 3 months.",
      author: "Sarah Chen",
      role: "VP of Manufacturing Operations",
      company: "AutoTech Corp",
    },
  },
  {
    slug: "fmcg-packaging-quality",
    title: "Packaging and label verification at line speed",
    shortDescription:
      "An FMCG manufacturer eliminated label and fill-level errors with AI vision across multiple lines.",
    clientName: "FMCG Manufacturer",
    metrics: [
      { label: "Defect catch rate", value: "99%" },
      { label: "False reject reduction", value: "70%" },
      { label: "Lines deployed", value: "12" },
    ],
    heroImage: "",
    gallery: [
      { id: "1", alt: "Label verification overlay", type: "bounding-box" },
      { id: "2", alt: "Fill-level detection", type: "defect" },
      { id: "3", alt: "Before vs after", type: "before-after" },
      { id: "4", alt: "Dashboard", type: "dashboard" },
    ],
    problem:
      "Label misprints, wrong SKUs, and fill-level issues were causing recalls and customer complaints. Manual sampling could not keep up with line speed.",
    solution:
      "AI vision systems were deployed to verify labels, barcodes, and fill levels in real time. The platform supports multiple camera types and integrates with the existing MES for pass/fail and traceability.",
    implementationSteps: [
      { title: "Discovery & Training", description: "Data collection and model training", timeframe: "Week 1-2" },
      { title: "Pilot Deployment", description: "Single line installation and testing", timeframe: "Week 3-4" },
      { title: "Validation", description: "Accuracy validation and fine tuning", timeframe: "Week 5-6" },
      { title: "Full Rollout", description: "Deployment across all production lines", timeframe: "Week 7-8" },
    ],
    resultsMetrics: [
      { label: "Defect Catch Rate", value: "99%", subDescription: "Up from 70% with manual sampling", icon: "trending" },
      { label: "Annual Savings", value: "$1.1M", subDescription: "From reduced waste and recalls", icon: "savings" },
      { label: "Faster Inspection", value: "50%", subDescription: "Across 12 lines", icon: "inspection" },
      { label: "Processing Time", value: "42ms", subDescription: "Per unit at line speed", icon: "latency" },
    ],
    testimonial: {
      quote:
        "We now have full visibility and consistency. The ROI was clear within the first quarter.",
      author: "James Wilson",
      role: "Operations Manager",
      company: "FMCG Manufacturer",
    },
  },
  {
    slug: "pharma-tablet-inspection",
    title: "GMP-compliant tablet and capsule inspection",
    shortDescription:
      "A pharmaceutical manufacturer achieved GMP-aligned, auditable defect detection with minimal training data.",
    clientName: "Pharmaceutical Manufacturer",
    metrics: [
      { label: "Accuracy", value: "99.2%" },
      { label: "Audit-ready", value: "100%" },
      { label: "Deployment time", value: "6 weeks" },
    ],
    heroImage: "",
    gallery: [
      { id: "1", alt: "Tablet defect overlay", type: "bounding-box" },
      { id: "2", alt: "Contamination detection", type: "defect" },
      { id: "3", alt: "Before vs after", type: "before-after" },
      { id: "4", alt: "Compliance dashboard", type: "dashboard" },
    ],
    problem:
      "Regulatory requirements demanded consistent, auditable defect detection for tablets and capsules. Legacy systems were rigid and required large training sets.",
    solution:
      "We deployed a vision platform with pre-trained pharmaceutical defect models, fine-tuned on the client's specific defect classes. Full audit trails and integration with batch records were implemented.",
    implementationSteps: [
      { title: "Discovery & Training", description: "Data collection and model training", timeframe: "Week 1-2" },
      { title: "Pilot Deployment", description: "Single line installation and testing", timeframe: "Week 3-4" },
      { title: "Validation", description: "Accuracy validation and fine tuning", timeframe: "Week 5-6" },
      { title: "Full Rollout", description: "Deployment across all production lines", timeframe: "Week 7-8" },
    ],
    resultsMetrics: [
      { label: "Detection Accuracy", value: "99.2%", subDescription: "Audit-ready defect classification", icon: "trending" },
      { label: "Compliance", value: "100%", subDescription: "Full audit trails and batch records", icon: "savings" },
      { label: "Deployment", value: "6 weeks", subDescription: "From kickoff to production release", icon: "inspection" },
      { label: "Processing Time", value: "38ms", subDescription: "Per tablet at line speed", icon: "latency" },
    ],
    testimonial: {
      quote:
        "We got audit-ready inspection with a fraction of the data we thought we would need. The team was professional and understood our compliance needs.",
      author: "Dr. Maria Santos",
      role: "QA Director",
      company: "Pharmaceutical Manufacturer",
    },
  },
];

export function getStoryBySlug(slug: string): CustomerStory | undefined {
  return customerStories.find((s) => s.slug === slug);
}

export function getAllStorySlugs(): string[] {
  return customerStories.map((s) => s.slug);
}
