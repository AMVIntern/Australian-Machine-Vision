export type IndustryGroup =
  | "Food and Consumer Goods"
  | "Health, Hygiene and Life Sciences"
  | "Industrial and Manufacturing"
  | "Packaging and Logistics"
  | "Agriculture and Specialty";

export interface Industry {
  id: string;
  name: string;
  group: IndustryGroup;
  headline: string;
  capabilities: string[];
  imagePlaceholder: string;
  imageContain?: boolean;
  imagePosition?: string;
}

export const INDUSTRY_GROUPS: IndustryGroup[] = [
  "Food and Consumer Goods",
  "Health, Hygiene and Life Sciences",
  "Industrial and Manufacturing",
  "Packaging and Logistics",
  "Agriculture and Specialty",
];

export const INDUSTRIES: Industry[] = [
  // ── Food and Consumer Goods ────────────────────────────────────────────────
  {
    id: "fmcg-packaged-food",
    name: "FMCG and Packaged Food",
    group: "Food and Consumer Goods",
    headline: "Label accuracy, fill level, seal integrity and foreign object detection at high line speeds.",
    capabilities: [
      "Label presence, placement and print quality inspection",
      "Overfill and underfill detection",
      "Cap and closure verification",
      "Foreign object and contaminant detection",
      "Date and batch code reading and validation",
    ],
    imagePlaceholder: "/industries/fmcg-packaged-food.jpg",
  },
  {
    id: "dairy-food-processing",
    name: "Dairy and Food Processing",
    group: "Food and Consumer Goods",
    headline: "Contamination detection and packaging integrity for dairy and fresh food production.",
    capabilities: [
      "Seal and lid integrity inspection",
      "Foreign body and contamination detection",
      "Fill level and volume verification",
      "Label and date code validation",
      "Packaging surface and defect inspection",
    ],
    imagePlaceholder: "/industries/dairy.jpg",
    imagePosition: "left center",
  },
  {
    id: "bakery-packaged-goods",
    name: "Bakery and Packaged Goods",
    group: "Food and Consumer Goods",
    headline: "Product completeness, packaging quality and label accuracy on fast-moving bakery lines.",
    capabilities: [
      "Product presence and count verification",
      "Pack completeness and configuration checks",
      "Label, barcode and print quality inspection",
      "Seal and closure integrity",
      "Surface defect and colour deviation detection",
    ],
    imagePlaceholder: "/industries/bakery-packaged-goods.jpg",
  },
  {
    id: "beverage",
    name: "Beverage",
    group: "Food and Consumer Goods",
    headline: "Fill level, cap torque presence, label accuracy and container integrity at bottling speeds.",
    capabilities: [
      "Fill level measurement for bottles, cans and cartons",
      "Cap, closure and seal presence inspection",
      "Label placement, print quality and barcode reading",
      "Container defect and sidewall inspection",
      "Date and lot code validation",
    ],
    imagePlaceholder: "/industries/beverage.jpg",
  },

  // ── Health, Hygiene and Life Sciences ─────────────────────────────────────
  {
    id: "hygiene-nonwovens",
    name: "Hygiene and Nonwovens",
    group: "Health, Hygiene and Life Sciences",
    headline: "Fabric integrity, component placement and seal quality for hygiene products.",
    capabilities: [
      "Web defect detection including holes, tears and contamination",
      "Component placement and adhesive presence verification",
      "Seal and bond quality inspection",
      "Print and label accuracy on finished packs",
      "Dimensional and cut quality checks",
    ],
    imagePlaceholder: "/industries/hygiene-nonwovens.jpg",
  },
  {
    id: "healthcare-medical",
    name: "Healthcare and Medical",
    group: "Health, Hygiene and Life Sciences",
    headline: "Packaging integrity and label accuracy for medical consumables and devices.",
    capabilities: [
      "Sterile barrier and seal integrity inspection",
      "Label, UDI and print quality verification",
      "Component presence and assembly confirmation",
      "Dimensional measurement and tolerance checks",
      "Foreign body detection in trays and blister packs",
    ],
    imagePlaceholder: "/industries/medical.png",
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical and Distribution",
    group: "Health, Hygiene and Life Sciences",
    headline: "Tablet, capsule and packaging inspection with serialisation and tamper evidence verification.",
    capabilities: [
      "Tablet and capsule count, colour and defect inspection",
      "Blister pack fill and seal integrity",
      "Serialisation code reading and validation",
      "Tamper-evident feature verification",
      "Carton label and leaflet presence confirmation",
    ],
    imagePlaceholder: "/industries/pharmaceutical.jpg",
  },
  {
    id: "blood-biologics-labelling",
    name: "Blood, Biologics and Labelling",
    group: "Health, Hygiene and Life Sciences",
    headline: "Label accuracy, barcode readability and pack completeness for blood products and biologics.",
    capabilities: [
      "Label presence, placement and adhesion inspection",
      "Barcode and 2D code reading and grade verification",
      "Lot, expiry and patient data print quality checks",
      "Vial and bag integrity inspection",
      "Colour and visual anomaly detection",
    ],
    imagePlaceholder: "/industries/blood-biologics-labelling.jpg",
  },

  // ── Industrial and Manufacturing ───────────────────────────────────────────
  {
    id: "automotive",
    name: "Automotive Parts and Components",
    group: "Industrial and Manufacturing",
    headline: "Dimensional measurement, surface quality and assembly verification for high-volume automotive parts.",
    capabilities: [
      "Dimensional measurement and geometric tolerance checks",
      "Surface defect detection including scratches, burrs and cracks",
      "Hole presence, diameter and thread quality inspection",
      "Assembly and component presence confirmation",
      "Marking and engraving legibility verification",
    ],
    imagePlaceholder: "/industries/automotive.jpg",
  },
  {
    id: "electronics-pcb",
    name: "Electronics and PCB Assembly",
    group: "Industrial and Manufacturing",
    headline: "Component placement, solder quality and board inspection for electronics manufacturing.",
    capabilities: [
      "Component presence, orientation and placement accuracy",
      "Solder joint quality and bridging detection",
      "PCB surface inspection for scratches and contamination",
      "Marking and serial number legibility",
      "Connector and pin integrity verification",
    ],
    imagePlaceholder: "/industries/electronics-pcb.jpg",
  },
  {
    id: "plastics-rubber",
    name: "Plastics and Rubber",
    group: "Industrial and Manufacturing",
    headline: "Moulded part quality, dimensional accuracy and surface inspection for plastics and rubber components.",
    capabilities: [
      "Surface defect detection including flash, sink marks and voids",
      "Dimensional measurement and profile conformance",
      "Colour and material consistency verification",
      "Assembly feature and insert presence checks",
      "Marking and identification legibility",
    ],
    imagePlaceholder: "/industries/plastics-rubber.jpg",
  },
  {
    id: "textiles-apparel",
    name: "Textiles and Apparel",
    group: "Industrial and Manufacturing",
    headline: "Fabric defect detection, colour consistency and print quality for textiles and garment manufacturing.",
    capabilities: [
      "Fabric defect detection including holes, stains and weave faults",
      "Colour uniformity and shade matching",
      "Print and pattern registration accuracy",
      "Dimensional and cut quality inspection",
      "Label and care instruction verification",
    ],
    imagePlaceholder: "/industries/textile.jpg",
  },
  {
    id: "building-products",
    name: "Building Products",
    group: "Industrial and Manufacturing",
    headline: "Surface quality, dimensional accuracy and marking verification for building materials.",
    capabilities: [
      "Surface defect and finish inspection at line speed",
      "Dimensional measurement and profile compliance",
      "Colour and texture consistency verification",
      "Marking, grade and compliance label accuracy",
      "Cut edge and join quality checks",
    ],
    imagePlaceholder: "/industries/building-products.jpg",
  },

  // ── Packaging and Logistics ────────────────────────────────────────────────
  {
    id: "returnable-transit-packaging",
    name: "Returnable Transit Packaging",
    group: "Packaging and Logistics",
    headline: "Condition assessment and grading of returned packaging items before recirculation.",
    capabilities: [
      "Structural damage and crack detection on crates and pallets",
      "Contamination and soiling inspection",
      "ID tag and barcode readability verification",
      "Dimensional conformance and deformation checks",
      "Grade and sort decisions for return or rejection",
    ],
    imagePlaceholder: "/industries/returnable-transit-packaging.jpg",
  },
  {
    id: "logistics-warehousing",
    name: "Logistics and Warehousing",
    group: "Packaging and Logistics",
    headline: "Barcode reading, dimensioning and package integrity verification for distribution operations.",
    capabilities: [
      "Barcode and label reading at conveyor speed",
      "Package dimension and weight verification",
      "Damage and integrity inspection on inbound and outbound freight",
      "Label presence and compliance checks",
      "Sortation and routing decision support",
    ],
    imagePlaceholder: "/industries/logistics-warehousing.jpg",
  },
  {
    id: "transport-logistics",
    name: "Transport and Logistics",
    group: "Packaging and Logistics",
    headline: "Vehicle and cargo inspection, marking verification and automated identification for transport operations.",
    capabilities: [
      "Vehicle identification and licence plate reading",
      "Cargo condition and load integrity inspection",
      "Pallet and unit load labelling verification",
      "Dimensional scanning for freight classification",
      "Automated documentation and image capture for compliance",
    ],
    imagePlaceholder: "/industries/transport-logistics.jpg",
  },

  // ── Agriculture and Specialty ──────────────────────────────────────────────
  {
    id: "agriculture-primary-produce",
    name: "Agriculture and Primary Produce",
    group: "Agriculture and Specialty",
    headline: "Size, colour and defect grading for fresh produce and primary agricultural products.",
    capabilities: [
      "Size and weight grading and sortation",
      "Colour maturity and ripeness assessment",
      "Surface defect and blemish detection",
      "Foreign body and contamination detection",
      "Count and pack confirmation for packaged produce",
    ],
    imagePlaceholder: "/industries/agriculture-primary-produce.jpg",
  },
  {
    id: "recycling-waste-sorting",
    name: "Recycling and Waste Sorting",
    group: "Agriculture and Specialty",
    headline: "Material identification and sortation for recycling and waste processing operations.",
    capabilities: [
      "Material type identification and classification",
      "Colour and composition-based sortation",
      "Contaminant and non-conforming item detection",
      "Label and packaging type recognition",
      "Count and throughput measurement",
    ],
    imagePlaceholder: "/industries/plastic-recycling.webp",
  },
  {
    id: "defence",
    name: "Defence",
    group: "Agriculture and Specialty",
    headline: "Component verification, marking inspection and quality assurance for defence manufacturing and supply.",
    capabilities: [
      "Component identification and traceability marking verification",
      "Dimensional measurement and tolerance confirmation",
      "Surface integrity and defect inspection",
      "Assembly and sub-assembly completeness checks",
      "Serialisation and compliance label accuracy",
    ],
    imagePlaceholder: "/industries/defence.jpg",
  },
];

export function getIndustriesByGroup(): Map<IndustryGroup, Industry[]> {
  const map = new Map<IndustryGroup, Industry[]>();
  for (const group of INDUSTRY_GROUPS) {
    map.set(group, []);
  }
  for (const industry of INDUSTRIES) {
    map.get(industry.group)!.push(industry);
  }
  return map;
}
