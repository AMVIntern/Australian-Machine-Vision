import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PipelineDiagram } from "@/components/methodology/pipeline-diagram";
import { MethodsAccordion } from "@/components/methodology/methods-accordion";

export const metadata: Metadata = {
  title: "Methodology | Australian Machine Vision",
  description:
    "How AMV builds machine vision and automated inspection systems. HALCON and custom deep learning combined, classical computer vision, and cloud-based Grafana diagnostics.",
  alternates: { canonical: "/methodology" },
  openGraph: {
    title: "Methodology | Australian Machine Vision",
    description:
      "How AMV builds machine vision and automated inspection systems. HALCON, deep learning, classical vision and cloud diagnostics explained in plain language.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Methodology | Australian Machine Vision",
    description:
      "How AMV builds machine vision and automated inspection systems. Plain language explanation of the HALCON and deep learning hybrid approach.",
  },
};

const METHODS = [
  {
    id: "halcon",
    number: "01",
    name: "HALCON",
    label: "Industrial machine vision software",
    what: "HALCON is a professional, purpose-built library for industrial machine vision. It provides precise optical measurement, calibration, and rule-based defect detection that has been validated on production lines for decades.",
    why: "When the inspection task is well defined, such as measuring a gap to the nearest tenth of a millimetre or confirming a barcode grade, HALCON delivers rock-solid accuracy and repeatability at full line speed. It does not learn or guess: it measures.",
    hybrid: true,
    hybridText:
      "AMV combines HALCON with its own custom-trained deep learning models in a single system. HALCON handles the precise, rule-based parts of the inspection. Our deep learning models handle the variable, hard-to-define parts that rigid rules miss. One system, the right technique applied to each task.",
  },
  {
    id: "deep-learning",
    number: "02",
    name: "Deep learning and AI inspection",
    label: "Models that learn from examples",
    what: "Deep learning is a type of artificial intelligence where the software learns to recognise defects, objects and features by studying labelled examples, rather than being told rigid rules. AMV builds and trains custom models for each application.",
    why: "Real production lines produce defects that are hard to describe with fixed rules: subtle surface blemishes, inconsistent contamination, colour variation that shifts across a batch. A trained model can catch these reliably where rule-based systems would either miss them or raise too many false alarms.",
    extra:
      "We select and train the AI model type that fits your specific inspection task. Every application is different, and the right AI model is chosen based on what your line produces and what needs to be detected.",
  },
  {
    id: "classical",
    number: "03",
    name: "Classical computer vision",
    label: "Rule-based algorithms for defined problems",
    what: "Classical computer vision uses fixed mathematical rules to process images: measuring dimensions, checking pixel intensity, counting objects, detecting edges, or comparing a product to a template. No learning required.",
    why: "For well-defined, consistent inspection tasks, classical methods are fast, predictable and cost-effective to run. AMV uses classical techniques where the problem is stable and well understood, reserving AI for the tasks that genuinely need it. The result is a system that is easier to certify, validate and maintain.",
    extra:
      "In practice, most systems AMV builds use both. Classical vision handles the reliable, repeatable checks. AI handles the variable, pattern-based ones. The combination is more capable and more efficient than either approach used alone.",
  },
  {
    id: "diagnostics",
    number: "04",
    name: "Cloud diagnostics and monitoring",
    label: "Grafana-based dashboards for remote visibility",
    what: "AMV systems can send performance data to cloud-based dashboards built on Grafana, an open monitoring platform. This gives you and our support team a live view of how each inspection system is running, without being on-site.",
    why: "When a system flags an increase in rejects, or inspection performance dips, the dashboard shows it in real time. Our team can investigate remotely before it becomes a line stoppage. For multi-site operations, it gives a consolidated view across every system from a single screen.",
    extra:
      "Metrics typically include inspection throughput, pass and fail rates, camera and hardware health, and alert history. Dashboard configuration is tailored to what matters for your line.",
  },
];

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Methodology | Australian Machine Vision",
  description:
    "How AMV builds machine vision and automated inspection systems. HALCON and custom deep learning combined, classical computer vision, and cloud-based Grafana diagnostics.",
  url: "https://www.australianmachinevision.com/methodology",
};

export default function MethodologyPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-br from-teal-50/95 via-cyan-50/80 to-background py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
              How we{" "}
              <span className="text-accent-primary">build</span>
            </h1>
            <p className="mt-4 text-lg text-foreground-muted">
              AMV does not use a single tool for everything. We combine proven
              industrial vision software with custom AI models and classical
              algorithms, applying each where it performs best. This is what
              makes a custom system more accurate and more reliable than an
              off-the-shelf product.
            </p>
          </header>
        </div>
      </section>

      {/* Technology blocks */}
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {/* Pipeline diagram */}
        <div className="mx-auto max-w-4xl">
          <PipelineDiagram />
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-primary">
              Technology stack
            </p>
            <h2 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
              Software, AI and classical vision
            </h2>
          </div>
          <MethodsAccordion methods={METHODS} />
        </div>

        {/* How it comes together */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-teal-200/80 bg-gradient-to-br from-teal-600 via-teal-600 to-teal-700 shadow-soft-lg">
            <div className="px-8 py-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal-100/70">
                The full picture
              </p>
              <h2 className="mt-2 text-xl font-bold text-white sm:text-2xl">
                How it comes together
              </h2>

              <p className="mt-6 text-sm leading-relaxed text-teal-50/90">
                AMV owns the full pipeline. Camera selection, lighting design,
                software development, on-site commissioning. Because we control
                every stage, we choose the right tool for each part of the
                problem rather than forcing one approach across the whole system.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-teal-50/90">
                In practice that means a single system might run HALCON for
                precise dimensional gauging, a custom AI model for surface defect
                detection, and classical edge detection for label placement, all
                in parallel at full line speed.
              </p>

              <div className="mt-6 border-t border-white/15 pt-6">
                <p className="text-base font-semibold text-white">
                  Custom-built means built around your product, your line, and your defect types. Not a standard product with your logo on it.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/industries"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-5 py-2.5 text-sm font-semibold text-white",
                    "hover:border-white hover:bg-white/10 transition-colors duration-200",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-600"
                  )}
                >
                  See the industries we work in
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-accent-primary shadow-soft",
                    "hover:bg-white/90 transition-opacity",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-teal-600"
                  )}
                >
                  Discuss your inspection challenge
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
