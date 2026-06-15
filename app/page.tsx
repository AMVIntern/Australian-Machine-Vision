import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { IndustriesStrip } from "@/components/home/industries-strip";
import { IndustryTabs } from "@/components/home/industry-tabs";
import { Pipeline } from "@/components/home/pipeline";
import { CapabilitiesGrid } from "@/components/home/capabilities-grid";
import { Differentiators } from "@/components/home/differentiators";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Australian Machine Vision | Machine Vision and Automated Inspection",
  description:
    "Machine vision and automated inspection systems for food, industrial and general manufacturing. Australian engineered, with 20+ years of experience and in-house engineering and software.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Australian Machine Vision | Machine Vision and Automated Inspection",
    description:
      "Machine vision and automated inspection systems for food, industrial and general manufacturing across Australia and global markets.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Australian Machine Vision | Machine Vision and Automated Inspection",
    description:
      "Machine vision and automated inspection systems for food, industrial and general manufacturing.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <IndustriesStrip />
      <IndustryTabs />
      <Pipeline />
      <CapabilitiesGrid />
      <Differentiators />
      <FinalCTA />
    </>
  );
}
