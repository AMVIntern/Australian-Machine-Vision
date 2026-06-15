import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { IndustriesStrip } from "@/components/home/industries-strip";
import { IndustryTabs } from "@/components/home/industry-tabs";
import { Pipeline } from "@/components/home/pipeline";
import { CapabilitiesGrid } from "@/components/home/capabilities-grid";
import { Differentiators } from "@/components/home/differentiators";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Australian Machine Vision | Computer Vision AI",
  description:
    "AI-powered visual inspection and automation. Real-time defect detection, scalable deployment, and measurable ROI for manufacturing.",
  openGraph: {
    title: "Australian Machine Vision | Computer Vision AI",
    description:
      "AI-powered visual inspection and automation. Real-time defect detection, scalable deployment, and measurable ROI for manufacturing.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Australian Machine Vision | Computer Vision AI",
    description:
      "AI-powered visual inspection and automation. Real-time defect detection, scalable deployment, and measurable ROI for manufacturing.",
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
