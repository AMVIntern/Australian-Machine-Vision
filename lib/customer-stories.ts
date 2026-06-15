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

// Customer stories are parked for v1 until real, approved case studies are
// available. The structure below is retained so signed-off stories can be
// added without rebuilding the page.
export const customerStories: CustomerStory[] = [];

export function getStoryBySlug(slug: string): CustomerStory | undefined {
  return customerStories.find((s) => s.slug === slug);
}

export function getAllStorySlugs(): string[] {
  return customerStories.map((s) => s.slug);
}
