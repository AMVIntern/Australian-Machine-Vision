import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { AgnosticBand } from "@/components/home/agnostic-band";
import { MethodologyTeaser } from "@/components/home/methodology-teaser";
import { IndustriesTeaser } from "@/components/home/industries-teaser";
import { Pipeline } from "@/components/home/pipeline";
import { CapabilitiesGrid } from "@/components/home/capabilities-grid";
import { Differentiators } from "@/components/home/differentiators";
import { ProductionStrip } from "@/components/home/production-strip";
import { IndustriesStrip } from "@/components/home/industries-strip";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Australian Machine Vision | Machine Vision and Automated Inspection",
  description:
    "Custom machine vision and automated inspection systems for any industry. Australian engineered, with 20+ years of integration experience, in-house software and AI-powered inspection.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "Australian Machine Vision | Machine Vision and Automated Inspection",
    description:
      "Custom machine vision and automated inspection systems for manufacturers across any industry. 20+ years of experience, in-house engineering and software.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Australian Machine Vision | Machine Vision and Automated Inspection",
    description:
      "Custom machine vision and automated inspection systems for manufacturers across any industry.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <IndustriesStrip />
      <Differentiators />
      <CapabilitiesGrid />
      <MethodologyTeaser />
      <IndustriesTeaser />
      <Pipeline />
      <ProductionStrip />
      <FinalCTA />
    </>
  );
}
