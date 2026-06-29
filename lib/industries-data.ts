export interface Industry {
  id: string;
  name: string;
  headline: string;
  capabilities: string[];
  imagePlaceholder: string;
}

export const KEY_APPLICATIONS = [
  "Quality control, in and out of specification",
  "Dimensional measurement and tolerance verification",
  "Foreign material detection",
  "Surface and structural defect detection",
  "Packaging and label inspection",
  "Fill level and completeness checks",
  "Assembly verification",
  "Automated trending and process analytics",
  "Real time decision support for operators",
];

export const INDUSTRIES: Industry[] = [
  {
    id: "food-processing",
    name: "Food Processing",
    headline: "Inspection systems for food production lines, from contamination detection to packaging integrity and fill level verification.",
    imagePlaceholder: "/industries/fmcg-packaged-food.jpg",
    capabilities: [
      "Foreign material detection",
      "Portion control and weight verification",
      "Surface and structural defect detection",
      "Seal and packaging inspection",
      "Fill level checks",
      "Trending analysis for process improvement",
    ],
  },
  {
    id: "industrial-manufacturing",
    name: "Industrial Manufacturing",
    headline: "Precision measurement and defect detection for industrial parts and components, with process stability and trend analysis.",
    imagePlaceholder: "/industries/automotive.jpg",
    capabilities: [
      "Dimensional measurement and tolerance control",
      "Surface defect detection",
      "Component presence and orientation",
      "Assembly verification",
      "Process stability and trend analysis",
    ],
  },
  {
    id: "general-manufacturing",
    name: "General Manufacturing",
    headline: "Automated quality inspection for high-speed packaging lines, labelling, and general production environments.",
    imagePlaceholder: "/industries/building-products.jpg",
    capabilities: [
      "High speed packaging inspection",
      "Barcode, label and print verification",
      "Completeness and assembly checks",
      "Quality grading and classification",
      "Automated quality trending",
    ],
  },
];
