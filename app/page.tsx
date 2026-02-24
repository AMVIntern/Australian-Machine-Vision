import { Hero } from "@/components/home/hero";
import { MetricsStrip } from "@/components/home/metrics-strip";
import { IndustryTabs } from "@/components/home/industry-tabs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricsStrip />
      <IndustryTabs />
    </>
  );
}
