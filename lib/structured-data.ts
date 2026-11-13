import { SITE_URL } from "@/lib/utils";

// Schema.org JSON-LD shared across pages. The organisation itself is declared
// once in app/layout.tsx under ORGANIZATION_ID; pages refer to it by id.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const SERVICE_ID = `${SITE_URL}/#service`;

export const SERVICE_JSON_LD = {
  "@type": "Service",
  "@id": SERVICE_ID,
  name: "Custom machine vision and automated inspection systems",
  serviceType: "Machine vision inspection system integration",
  description:
    "AMV builds custom machine vision and automated inspection systems for food processing, industrial manufacturing and general manufacturing environments.",
  provider: { "@id": ORGANIZATION_ID },
  areaServed: ["AU", "Worldwide"],
};

/** Home > ... > current page. Paths are site-relative, e.g. "/blog". */
export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  const items = [{ name: "Home", path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data) };
}
