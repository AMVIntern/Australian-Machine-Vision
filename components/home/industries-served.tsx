"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Package,
  Milk,
  Croissant,
  Layers,
  HeartPulse,
  Truck,
  Droplet,
  Boxes,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Sector {
  id: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  inactiveIconColor: string;
  intro: string;
  valueBullets: string[];
  image: string;
  imageAlt: string;
}

const sectors: Sector[] = [
  {
    id: "fmcg",
    label: "FMCG and Packaged Food",
    shortLabel: "FMCG",
    icon: Package,
    inactiveIconColor: "text-orange-500",
    intro:
      "Quality and contamination inspection of products and packaging at high line speeds.",
    valueBullets: [
      "Foreign object detection",
      "Pack integrity verification",
      "Label and date code checks",
      "Surface defect detection",
      "High line speed throughput",
    ],
    image: "/industries/fmcg-packaged-food.jpg",
    imageAlt: "Packaged food products on a production conveyor line",
  },
  {
    id: "dairy",
    label: "Dairy and Food Processing",
    shortLabel: "Dairy",
    icon: Milk,
    inactiveIconColor: "text-sky-500",
    intro:
      "Surface defect and spoilage detection on perishable product, with presence and condition checks.",
    valueBullets: [
      "Surface and structural defect detection",
      "Spoilage detection on perishable product",
      "Presence and condition checks",
      "Fill level verification",
      "Seal and packaging inspection",
    ],
    image: "/industries/dairy-food-processing.jpg",
    imageAlt: "Dairy product on a production line",
  },
  {
    id: "bakery",
    label: "Bakery and Packaged Goods",
    shortLabel: "Bakery",
    icon: Croissant,
    inactiveIconColor: "text-amber-600",
    intro:
      "Label, date code and print verification on packaging, with pack and seal inspection.",
    valueBullets: [
      "Label and date code verification",
      "Print verification on packaging",
      "Pack and seal inspection",
      "Completeness and count checks",
      "Shape and consistency assessment",
    ],
    image: "/industries/bakery.jpg",
    imageAlt: "Bakery products on a production line",
  },
  {
    id: "hygiene",
    label: "Hygiene and Nonwovens",
    shortLabel: "Hygiene",
    icon: Layers,
    inactiveIconColor: "text-violet-500",
    intro:
      "Continuous web inspection of fabric and ribbon material at high speed.",
    valueBullets: [
      "Edge and width measurement",
      "Pattern verification",
      "Defect detection on fast moving material",
      "Material consistency checks",
      "Continuous web inspection",
    ],
    image: "/industries/hygiene-nonwovens.jpg",
    imageAlt: "Nonwoven material running through a manufacturing line",
  },
  {
    id: "healthcare",
    label: "Healthcare and Medical",
    shortLabel: "Healthcare",
    icon: HeartPulse,
    inactiveIconColor: "text-rose-500",
    intro:
      "Contamination inspection of reusable medical containers, with condition and safe handling checks.",
    valueBullets: [
      "Contamination inspection of reusable containers",
      "Fill level and condition assessment",
      "Safe handling verification",
      "Presence and integrity checks",
      "Component verification",
    ],
    image: "/industries/medical.png",
    imageAlt: "Reusable medical handling containers",
  },
  {
    id: "pharma",
    label: "Pharmaceutical Distribution",
    shortLabel: "Pharma",
    icon: Truck,
    inactiveIconColor: "text-teal-600",
    intro:
      "Contamination and integrity inspection of totes and transit containers in distribution environments.",
    valueBullets: [
      "Contamination inspection of totes",
      "Integrity inspection in distribution",
      "Damage and condition assessment",
      "Label and identifier verification",
      "High throughput screening",
    ],
    image: "/industries/totes.png",
    imageAlt: "Pharmaceutical distribution totes in a warehouse",
  },
  {
    id: "biologics",
    label: "Blood, Biologics and Labelling",
    shortLabel: "Biologics",
    icon: Droplet,
    inactiveIconColor: "text-red-500",
    intro:
      "Label presence, correctness and legibility verification on critical medical products.",
    valueBullets: [
      "Label presence verification",
      "Label correctness checks",
      "Print legibility verification",
      "Barcode and identifier reading",
      "Critical product traceability",
    ],
    image: "/industries/blood-biologics.jpg",
    imageAlt: "Medical vials with labels for biologics inspection",
  },
  {
    id: "rtp",
    label: "Returnable Transit Packaging",
    shortLabel: "Returnable",
    icon: Boxes,
    inactiveIconColor: "text-amber-800",
    intro:
      "Structural damage, missing component and out of spec assessment of pallets and reusable assets using 3D and 2D vision.",
    valueBullets: [
      "Structural damage assessment",
      "Missing component detection",
      "Out of spec dimensional checks",
      "3D and 2D vision analysis",
      "Reusable asset condition tracking",
    ],
    image: "/industries/returnable-packaging.jpg",
    imageAlt: "Stacked wooden EPAL pallets in a warehouse",
  },
];

const contentVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.25 },
};

function ActivePanel({ tab }: { tab: Sector }) {
  return (
    <Card variant="default" className="overflow-hidden shadow-soft-lg">
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-background-secondary lg:aspect-auto lg:min-h-[360px]">
            <Image
              src={tab.image}
              alt={tab.imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-6 sm:p-8">
            <h3 className="text-xl font-bold text-foreground sm:text-2xl">
              {tab.label}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted sm:text-base">
              {tab.intro}
            </p>

            <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-accent-primary">
              Where we add value
            </p>
            <ul className="mt-3 space-y-2">
              {tab.valueBullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2.5 text-sm text-foreground"
                >
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-600"
                    aria-hidden
                  >
                    <Check className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
            >
              Discuss your application
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function IndustriesServed() {
  const [activeId, setActiveId] = React.useState(sectors[0].id);
  const [mobileOpenId, setMobileOpenId] = React.useState<string | null>(
    sectors[0].id
  );

  const activeTab = sectors.find((t) => t.id === activeId) ?? sectors[0];

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
    if (e.key === "ArrowRight" && index < sectors.length - 1) {
      e.preventDefault();
      setActiveId(sectors[index + 1].id);
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      setActiveId(sectors[index - 1].id);
    }
  };

  return (
    <section
      className="bg-white/80 backdrop-blur-sm py-16 sm:py-20"
      aria-labelledby="industries-served-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="industries-served-heading"
          className="text-center text-3xl font-bold text-foreground sm:text-4xl"
        >
          Industry Solutions
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
          The same underlying capability adapts to very different products and
          environments. The imaging, lighting and algorithm are tuned to each
          task.
        </p>

        {/* Desktop: pill tabs + active panel */}
        <div className="mt-10 hidden lg:block">
          <div
            className="flex flex-wrap justify-center gap-3"
            role="tablist"
            aria-label="Industry sectors"
          >
            {sectors.map((tab, index) => {
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
                    "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-soft transition-colors",
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
              <ActivePanel tab={activeTab} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile: accordion */}
        <div
          className="mt-10 lg:hidden"
          role="tablist"
          aria-label="Industry sectors"
        >
          {sectors.map((tab) => {
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
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0",
                        isOpen ? "text-accent-primary" : tab.inactiveIconColor
                      )}
                    />
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
                      <div className="pb-6">
                        <div className="relative aspect-video overflow-hidden rounded-lg bg-background-secondary">
                          <Image
                            src={tab.image}
                            alt={tab.imageAlt}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-foreground-muted">
                          {tab.intro}
                        </p>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent-primary">
                          Where we add value
                        </p>
                        <ul className="mt-3 space-y-2">
                          {tab.valueBullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2.5 text-sm text-foreground"
                            >
                              <span
                                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-green-600"
                                aria-hidden
                              >
                                <Check className="h-3 w-3" strokeWidth={2.5} />
                              </span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/contact"
                          className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent-primary hover:underline"
                        >
                          Discuss your application
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Breadth callout */}
        <div className="mx-auto mt-10 max-w-4xl rounded-2xl border-l-4 border-accent-primary bg-background-secondary/50 p-6">
          <p className="text-base font-semibold text-foreground">
            Breadth of deployment is itself a capability.
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground-muted">
            Operating across this many materials and environments means our
            toolkit and engineering practices are proven against a wide range of
            real world conditions, lighting and failure modes.
          </p>
        </div>
      </div>
    </section>
  );
}
