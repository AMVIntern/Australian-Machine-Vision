export const CONTACT_INDUSTRY_OPTIONS = [
  { value: "fmcg-packaged-food", label: "FMCG and Packaged Food" },
  { value: "dairy-food-processing", label: "Dairy and Food Processing" },
  { value: "bakery", label: "Bakery" },
  { value: "hygiene-nonwovens", label: "Hygiene and Nonwovens" },
  { value: "healthcare-medical", label: "Healthcare and Medical" },
  { value: "pharmaceutical", label: "Pharmaceutical" },
  { value: "returnable-packaging", label: "Returnable Packaging" },
  { value: "transport-logistics", label: "Transport and Logistics" },
  { value: "defence", label: "Defence" },
  { value: "building-products", label: "Building Products" },
  { value: "other", label: "Other" },
] as const;

/** Map select value (slug) to display label; pass-through if already a label. */
export function getIndustryLabel(value: string): string {
  const match = CONTACT_INDUSTRY_OPTIONS.find((option) => option.value === value);
  return match?.label ?? value;
}
