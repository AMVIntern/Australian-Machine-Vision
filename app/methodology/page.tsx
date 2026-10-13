import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { PipelineDiagram } from "@/components/methodology/pipeline-diagram";
import { MethodsIndex } from "@/components/methodology/methods-index";
import { PageHeader } from "@/components/layout/page-header";

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

      <PageHeader
        title="How we build"
        intro={
          <p>
            AMV does not use a single tool for everything. We combine proven
            industrial vision software with custom AI models and classical
            algorithms, applying each where it performs best. This is what
            makes a custom system more accurate and more reliable than an
            off-the-shelf product.
          </p>
        }
      />

      {/* Pipeline diagram */}
      <section className="bg-background py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <PipelineDiagram />
          </div>
        </div>
      </section>

      {/* Technology blocks */}
      <section className="border-t border-border bg-white py-20 sm:py-28" aria-labelledby="stack-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 grid gap-4 lg:grid-cols-12">
            <div className="lg:col-span-9 lg:col-start-4">
              <p className="flex items-center gap-2.5 text-sm font-medium text-accent-deep">
                <span
                  className="h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-accent-logo"
                  aria-hidden
                />
                Technology stack
              </p>
              <h2
                id="stack-heading"
                className="font-display mt-4 text-4xl font-extrabold leading-none text-foreground sm:text-5xl"
              >
                Software, AI and classical vision
              </h2>
            </div>
          </div>
          <MethodsIndex methods={METHODS} />
        </div>
      </section>

      {/* How it comes together */}
      <section className="bay relative overflow-hidden py-20 sm:py-28" data-nav="dark" aria-labelledby="together-heading">
        <div className="dot-field pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-sm font-medium text-accent-logo">The full picture</p>
              <h2
                id="together-heading"
                className="font-display mt-4 text-4xl font-extrabold leading-[1.02] sm:text-5xl"
              >
                How it comes together
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-lg leading-relaxed text-ink-soft">
                AMV owns the full pipeline. Camera selection, lighting design,
                software development, on-site commissioning. Because we control
                every stage, we choose the right tool for each part of the
                problem rather than forcing one approach across the whole system.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-ink-soft">
                In practice that means a single system might run HALCON for
                precise dimensional gauging, a custom AI model for surface defect
                detection, and classical edge detection for label placement, all
                in parallel at full line speed.
              </p>

              <p className="font-wide mt-10 border-t border-white/15 pt-8 text-xl font-bold leading-snug text-white sm:text-2xl">
                Custom-built means built around your product, your line, and your defect types. Not a standard product with your logo on it.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/industries"
                  className={cn(
                    "inline-flex h-12 items-center gap-2 rounded-md border border-white/25 px-5 text-sm font-semibold text-white",
                    "transition-colors hover:border-white hover:bg-white/5"
                  )}
                >
                  See the industries we work in
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <Link
                  href="/contact"
                  className={cn(
                    "chamfer inline-flex h-12 items-center gap-2 bg-accent-logo px-6 text-sm font-semibold text-ink",
                    "transition-colors hover:bg-accent-secondary"
                  )}
                >
                  Discuss your inspection challenge
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
