"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Apple,
  Factory,
  Package,
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
  intro: string;
  valueBullets: string[];
  image: string;
  imageAlt: string;
}

const industryTabsData: IndustryTabData[] = [
  {
    id: "food-processing",
    label: "Food Processing",
    icon: Apple,
    inactiveIconColor: "text-red-500",
    intro:
      "Inspection and quality checks that keep food products safe, consistent and compliant at line speed.",
    valueBullets: [
      "Foreign material detection",
      "Portion control and weight verification",
      "Surface and structural defect detection",
      "Seal and packaging inspection",
      "Fill level checks",
      "Trending analysis for process improvement",
    ],
    image: "/industries/food-processing.jpg",
    imageAlt: "Food processing line with produce on inspection conveyors",
  },
  {
    id: "industrial-manufacturing",
    label: "Industrial Manufacturing",
    icon: Factory,
    inactiveIconColor: "text-slate-500",
    intro:
      "Precision measurement and defect detection that hold tight tolerances across production.",
    valueBullets: [
      "Dimensional measurement and tolerance control",
      "Surface defect detection",
      "Component presence and orientation",
      "Assembly verification",
      "Process stability and trend analysis",
    ],
    image: "/industries/industrial-manufacturing.jpg",
    imageAlt: "Automated industrial manufacturing production line",
  },
  {
    id: "general-manufacturing",
    label: "General Manufacturing",
    icon: Package,
    inactiveIconColor: "text-amber-600",
    intro:
      "Flexible inspection for packaging, labelling and assembly across mixed production.",
    valueBullets: [
      "High speed packaging inspection",
      "Barcode, label and print verification",
      "Completeness and assembly checks",
      "Quality grading and classification",
      "Automated quality trending",
    ],
    image: "/industries/general-manufacturing.jpg",
    imageAlt: "Automated packaging and sortation conveyor system",
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
          Where machine vision delivers value across food, industrial and
          general manufacturing.
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
                    <div className="relative aspect-video overflow-hidden bg-background-secondary lg:aspect-auto lg:min-h-[320px]">
                      <Image
                        src={activeTab.image}
                        alt={activeTab.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 50vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-col justify-center p-6 sm:p-8">
                      <h3 className="text-xl font-bold text-foreground">
                        {activeTab.label}
                      </h3>
                      <p className="mt-3 text-sm text-foreground-muted">
                        {activeTab.intro}
                      </p>
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-accent-primary">
                          Where we add value
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {activeTab.valueBullets.map((bullet, i) => (
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
                        href="/contact"
                        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
                      >
                        Discuss your application
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
                            <Image
                              src={tab.image}
                              alt={tab.imageAlt}
                              fill
                              className="object-cover"
                              sizes="100vw"
                            />
                          </div>
                          <h3 className="mt-4 text-lg font-bold text-foreground">
                            {tab.label}
                          </h3>
                          <p className="mt-2 text-sm text-foreground-muted">
                            {tab.intro}
                          </p>
                          <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-accent-primary">
                            Where we add value
                          </p>
                          <ul className="mt-2 space-y-1.5">
                            {tab.valueBullets.map((bullet, i) => (
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
                            href="/contact"
                            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent-primary hover:underline"
                          >
                            Discuss your application
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
