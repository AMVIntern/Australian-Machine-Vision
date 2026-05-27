"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Car,
  Apple,
  Box,
  Pill,
  Zap,
  Factory,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface IndustryTabData {
  id: string;
  label: string;
  icon: LucideIcon;
  /** Tailwind class for icon when tab is inactive (e.g. text-violet-500) */
  inactiveIconColor: string;
  challenge: string;
  solution: string;
  impactBullets: string[];
  imageAlt: string;
}

const industryTabsData: IndustryTabData[] = [
  {
    id: "automotive",
    label: "Automotive",
    icon: Car,
    inactiveIconColor: "text-violet-500",
    challenge:
      "Manual paint defect inspection is slow and inconsistent, leading to high rejection rates and customer complaints.",
    solution:
      "AI-powered vision system detects paint defects, scratches, and dents in real-time on the production line.",
    impactBullets: [
      "95% defect detection accuracy",
      "60% reduction in quality control costs",
      "40% faster inspection throughput",
    ],
    imageAlt: "Automotive inspection example",
  },
  {
    id: "fmcg-food",
    label: "FMCG / Food",
    icon: Apple,
    inactiveIconColor: "text-red-500",
    challenge:
      "Quality and safety checks at scale are manual and error-prone, risking compliance and waste.",
    solution:
      "Vision systems for packaging, labelling, fill-level and foreign body detection with full traceability.",
    impactBullets: [
      "Reduced product waste and rework",
      "Label and fill-level verification",
      "Allergen and foreign body screening",
    ],
    imageAlt: "FMCG and food inspection example",
  },
  {
    id: "warehousing-logistics",
    label: "Warehousing & Logistics",
    icon: Box,
    inactiveIconColor: "text-amber-800",
    challenge:
      "Parcel and inventory verification relies on manual checks, limiting throughput and accuracy.",
    solution:
      "Automated damage detection, sortation, and dimension validation at line speed.",
    impactBullets: [
      "Higher sortation accuracy",
      "Damage and condition checks",
      "Dimension and barcode validation",
    ],
    imageAlt: "Warehousing and logistics inspection example",
  },
  {
    id: "pharmaceuticals",
    label: "Pharmaceuticals",
    icon: Pill,
    inactiveIconColor: "text-rose-500",
    challenge:
      "Regulatory requirements demand consistent, auditable defect detection for tablets, capsules, and packaging.",
    solution:
      "GMP-aligned inspection for defects, contamination, and serialisation with full audit trails.",
    impactBullets: [
      "GMP-aligned inspection workflows",
      "Batch and unit-level traceability",
      "Contamination and defect detection",
    ],
    imageAlt: "Pharmaceutical inspection example",
  },
  {
    id: "electronics",
    label: "Electronics",
    icon: Zap,
    inactiveIconColor: "text-amber-500",
    challenge:
      "PCB and assembly defects cause rework and failures downstream if not caught early.",
    solution:
      "Solder joint, placement, and defect detection integrated with AOI and test systems.",
    impactBullets: [
      "Solder and placement verification",
      "Short-circuit and defect detection",
      "Integration with AOI and test systems",
    ],
    imageAlt: "Electronics inspection example",
  },
  {
    id: "general-manufacturing",
    label: "General Manufacturing",
    icon: Factory,
    inactiveIconColor: "text-slate-500",
    challenge:
      "Mixed production and changing defect types require flexible, quick-to-deploy inspection.",
    solution:
      "One platform for multiple lines and defect types with configurable rules and fast model updates.",
    impactBullets: [
      "Quick model retraining for new products",
      "Configurable pass/fail rules",
      "Edge and cloud deployment options",
    ],
    imageAlt: "General manufacturing inspection example",
  },
];

const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
};

export function IndustryTabs() {
  const [activeId, setActiveId] = React.useState(industryTabsData[0].id);
  const [mobileOpenId, setMobileOpenId] = React.useState<string | null>(
    industryTabsData[0].id
  );

  const activeTab =
    industryTabsData.find((t) => t.id === activeId) ?? industryTabsData[0];

  const handleTabClick = (id: string) => {
    setActiveId(id);
    setMobileOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    id: string,
    index: number
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabClick(id);
    }
    if (e.key === "ArrowRight" && index < industryTabsData.length - 1) {
      e.preventDefault();
      setActiveId(industryTabsData[index + 1].id);
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      setActiveId(industryTabsData[index - 1].id);
    }
  };

  return (
    <section
      className="bg-white/80 backdrop-blur-sm py-16 sm:py-20"
      aria-labelledby="industry-tabs-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="industry-tabs-heading"
          className="text-center text-3xl font-bold text-foreground sm:text-4xl"
        >
          Industry Solutions
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
          Tailored AI vision systems for your specific manufacturing
          challenges.
        </p>

        {/* Desktop: pill tabs + content */}
        <div className="mt-10 hidden lg:block">
          <div
            className="flex flex-wrap justify-center gap-3"
            role="tablist"
            aria-label="Industry sectors"
          >
            {industryTabsData.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  id={`tab-${tab.id}`}
                  onClick={() => handleTabClick(tab.id)}
                  onKeyDown={(e) => handleKeyDown(e, tab.id, index)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium shadow-soft transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2",
                    isActive
                      ? "bg-gradient-to-b from-teal-400 to-teal-600 text-white"
                      : "border border-border bg-white text-foreground hover:bg-background-secondary"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0",
                      isActive ? "text-white" : tab.inactiveIconColor
                    )}
                    aria-hidden
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              id={`panel-${activeId}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeId}`}
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={contentVariants.transition}
              className="mt-6"
            >
              <Card
                variant="default"
                className="overflow-hidden shadow-soft-lg"
              >
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2">
                    <motion.div
                      className="relative aspect-video overflow-hidden bg-background-secondary lg:aspect-auto lg:min-h-[320px]"
                      whileHover={{ scale: 1.02 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 24,
                      }}
                    >
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background-secondary to-border/30"
                        aria-hidden
                      >
                        <div
                          className="h-20 w-20 rounded-xl border-2 border-dashed border-accent-primary/50 bg-white/60"
                          title={activeTab.imageAlt}
                        />
                      </div>
                    </motion.div>
                    <div className="flex flex-col justify-center p-6 sm:p-8">
                      <h3 className="text-xl font-bold text-foreground">
                        {activeTab.label}
                      </h3>
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary">
                          Challenge
                        </p>
                        <p className="mt-1 text-sm text-foreground-muted">
                          {activeTab.challenge}
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary">
                          Solution
                        </p>
                        <p className="mt-1 text-sm text-foreground-muted">
                          {activeTab.solution}
                        </p>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary">
                          Impact
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {activeTab.impactBullets.map((bullet, i) => (
                            <li
                              key={i}
                              className="flex items-center gap-2 text-sm text-foreground"
                            >
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-600">
                                <Check className="h-3 w-3" aria-hidden />
                              </span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Link
                        href="/customer-stories"
                        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                      >
                        Learn More
                        <ChevronRight className="h-4 w-4" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: accordion */}
        <div
          className="mt-10 lg:hidden"
          role="tablist"
          aria-label="Industry sectors"
        >
          {industryTabsData.map((tab) => {
            const isOpen = mobileOpenId === tab.id;
            const Icon = tab.icon;
            return (
              <div
                key={tab.id}
                className="border-b border-border last:border-b-0"
                role="tab"
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${tab.id}`}
                id={`accordion-tab-${tab.id}`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setMobileOpenId((prev) =>
                      prev === tab.id ? null : tab.id
                    )
                  }
                  className="flex w-full items-center justify-between py-4 text-left font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-inset"
                >
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-accent-primary" />
                    {tab.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      id={`accordion-panel-${tab.id}`}
                      role="tabpanel"
                      aria-labelledby={`accordion-tab-${tab.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <Card
                        variant="default"
                        className="mx-0 mb-4 border-0 shadow-soft"
                      >
                        <CardContent className="p-4 pt-0">
                          <div className="relative aspect-video overflow-hidden rounded-lg bg-background-secondary">
                            <div
                              className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background-secondary to-border/30"
                              aria-hidden
                            />
                          </div>
                          <h3 className="mt-4 text-lg font-bold text-foreground">
                            {tab.label}
                          </h3>
                          <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-accent-primary">
                            Challenge
                          </p>
                          <p className="mt-1 text-sm text-foreground-muted">
                            {tab.challenge}
                          </p>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-accent-primary">
                            Solution
                          </p>
                          <p className="mt-1 text-sm text-foreground-muted">
                            {tab.solution}
                          </p>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-accent-primary">
                            Impact
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {tab.impactBullets.map((bullet, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2 text-sm text-foreground"
                              >
                                <Check className="h-4 w-4 shrink-0 text-green-600" />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                          <Link
                            href="/customer-stories"
                            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-primary hover:underline"
                          >
                            Learn More
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
