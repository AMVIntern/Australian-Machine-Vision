import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Target, Eye, ScanLine, Settings2, Code2, ArrowRight } from "lucide-react";
import { AboutValuesSection } from "@/components/about/about-values-section";
import { PageHeader } from "@/components/layout/page-header";
import { ScanHeading, Reveal } from "@/components/ui/reveal";
import { NumberTicker } from "@/components/ui/number-ticker";
import { FinalCTA } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Australian Machine Vision. 20+ years of experience building custom machine vision and automated inspection systems for any industry, anywhere.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Australian Machine Vision",
    description:
      "Learn about Australian Machine Vision. Our mission, vision, and expertise in industrial machine vision for quality inspection.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About | Australian Machine Vision",
    description:
      "Learn about Australian Machine Vision. Our mission, vision, and expertise in industrial machine vision for quality inspection.",
  },
};

const teamStrengths = [
  {
    icon: ScanLine,
    index: "01",
    title: "Advanced machine vision engineering",
    description:
      "Expertise across 2D, line-scan and 3D imaging, classical vision pipelines and applied deep learning.",
  },
  {
    icon: Settings2,
    index: "02",
    title: "Robust automation and mechatronics",
    description:
      "Every system is designed for real-world reliability, line-speed performance and long-term stability.",
  },
  {
    icon: Code2,
    index: "03",
    title: "Modern software and AI development",
    description:
      "Custom models, advanced imaging pipelines and scalable architectures that integrate cleanly into customer operations.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        kicker="05 / About"
        titleId="about-title"
        title={
          <>
            Our <span className="text-accent-primary">Vision</span> is Your{" "}
            <span className="text-accent-primary">Solution</span>
          </>
        }
        intro={
          <p>
            AMV delivers end-to-end machine vision and automated inspection,
            from feasibility and proof of concept through custom build, on-site
            commissioning and ongoing support. We work across any industry, in
            Australia and global markets, applying AI and classical vision
            techniques to solve the inspection challenges that standard systems
            cannot.
          </p>
        }
      />

      {/* Mission + Vision */}
      <section className="bg-background py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-2">
            <Reveal className="bg-background p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <Target className="h-7 w-7 text-accent-primary" strokeWidth={1.6} aria-hidden />
                <span className="annot text-foreground-muted" aria-hidden>
                  01
                </span>
              </div>
              <h2 className="font-display mt-6 text-2xl font-bold text-foreground sm:text-3xl">
                Our Mission
              </h2>
              <p className="mt-4 leading-relaxed text-foreground-muted">
                To deliver machine vision and automated inspection systems that
                solve real production challenges. We help manufacturers across
                any industry achieve the accuracy, reliability and
                repeatability that off-the-shelf systems cannot.
              </p>
              <p className="mt-4 leading-relaxed text-foreground-muted">
                Every project starts with a clear understanding of your
                production environment and quality requirements, so the
                solution fits the way your line actually runs.
              </p>
            </Reveal>
            <Reveal className="bg-background p-8 sm:p-10" delay={0.08}>
              <div className="flex items-center justify-between">
                <Eye className="h-7 w-7 text-accent-primary" strokeWidth={1.6} aria-hidden />
                <span className="annot text-foreground-muted" aria-hidden>
                  02
                </span>
              </div>
              <h2 className="font-display mt-6 text-2xl font-bold text-foreground sm:text-3xl">
                Our Vision
              </h2>
              <p className="mt-4 leading-relaxed text-foreground-muted">
                Our vision is your solution. We combine advanced imaging,
                robust algorithms and a wide network of trusted technology
                partners to build inspection systems that perform in real world
                conditions, not just in the lab.
              </p>
              <p className="mt-4 leading-relaxed text-foreground-muted">
                We then select and integrate the technologies that deliver the
                most reliable, scalable and cost effective outcome for each
                customer.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section
        className="border-y border-border bg-background-secondary/50 py-20 sm:py-24"
        aria-labelledby="team-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="annot text-accent-deep">Our team</p>
          <ScanHeading
            as="h2"
            id="team-heading"
            className="font-display mt-3 text-4xl font-bold leading-none text-foreground sm:text-5xl"
          >
            About the AMV Team
          </ScanHeading>

          <Reveal className="mt-12">
            <div className="grid items-start gap-10 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <div className="reg-marks relative inline-block p-3">
                  <Image
                    src="/team/ken-razga.jpg"
                    alt="Ken Razga, Director at Australian Machine Vision"
                    width={280}
                    height={280}
                    className="h-auto w-48 object-cover object-top sm:w-56 lg:w-full"
                  />
                </div>
              </div>
              <div className="lg:col-span-9">
                <h3 className="font-display text-2xl font-bold text-foreground">Ken Razga</h3>
                <p className="mt-1 text-sm font-semibold text-accent-deep">Director</p>
                <p className="mt-5 max-w-[68ch] leading-relaxed text-foreground-muted">
                  Ken leads Australian Machine Vision, bringing more than 20
                  years of hands-on experience in machine vision and industrial
                  automation. He has worked closely with manufacturers across
                  any industry to solve the inspection challenges that
                  off-the-shelf systems cannot.
                </p>
                <p className="mt-3 max-w-[68ch] leading-relaxed text-foreground-muted">
                  His focus is practical engineering and measurable results,
                  making sure every system we deliver is reliable, well
                  integrated and built for real production conditions.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-14 border-t border-border pt-12">
            <p className="max-w-[64ch] leading-relaxed text-foreground-muted">
              AMV has expanded its engineering capability significantly,
              building a team that blends deep industry experience with fresh
              technical strength from RMIT Masters graduates in Mechatronics
              and Computer Science. This growth has strengthened our ability to
              deliver reliable, production-ready inspection systems across
              food, industrial and manufacturing environments.
            </p>

            <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
              {teamStrengths.map((strength) => {
                const Icon = strength.icon;
                return (
                  <div key={strength.title} className="bg-background px-6 py-7">
                    <div className="flex items-center justify-between">
                      <Icon className="h-5 w-5 text-accent-primary" strokeWidth={1.7} aria-hidden />
                      <span className="annot text-foreground-muted" aria-hidden>
                        {strength.index}
                      </span>
                    </div>
                    <h3 className="mt-5 text-sm font-bold text-foreground">
                      {strength.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {strength.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <p className="mt-10 max-w-[64ch] leading-relaxed text-foreground-muted">
              This expanded capability means AMV can support customers with
              greater depth, faster problem-solving and more confidence in
              tackling complex inspection challenges. The team&apos;s growth
              directly translates into stronger outcomes: better system design,
              more resilient performance, and a partner who can support you
              from concept through to deployment and ongoing optimisation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Core values on ink */}
      <section className="relative bg-ink py-20 text-white sm:py-24" data-nav="dark">
        <div className="ink-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <AboutValuesSection />
        </div>
      </section>

      {/* Statistics */}
      <section
        className="border-b border-border bg-background py-16 sm:py-20"
        aria-labelledby="about-stats-heading"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="about-stats-heading" className="sr-only">
            Key statistics
          </h2>
          <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="border-l-2 border-accent-logo pl-5">
              <dd className="font-display tabular text-4xl font-bold text-foreground sm:text-5xl">
                <NumberTicker value={20} suffix="+" />
              </dd>
              <dt className="mt-2 text-sm text-foreground-muted">Years of Experience</dt>
            </div>
            <div className="border-l-2 border-accent-logo pl-5">
              <dd className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                Global
              </dd>
              <dt className="mt-2 text-sm text-foreground-muted">
                Australia and International Markets
              </dt>
            </div>
            <div className="border-l-2 border-accent-logo pl-5">
              <dd className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                In-House
              </dd>
              <dt className="mt-2 text-sm text-foreground-muted">
                Engineering and Software
              </dt>
            </div>
            <div className="border-l-2 border-accent-logo pl-5">
              <dd className="font-display text-4xl font-bold text-foreground sm:text-5xl">
                Trusted
              </dd>
              <dt className="mt-2 text-sm text-foreground-muted">
                Technology Partner Network
              </dt>
            </div>
          </dl>
        </div>
      </section>

      {/* Cross-links */}
      <section className="bg-background py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2">
            <Link
              href="/industries"
              className="group bg-background p-7 transition-colors duration-300 hover:bg-background-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-primary"
            >
              <h2 className="font-display text-xl font-bold text-foreground">
                Industries we work in
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-muted">
                AMV works across food, healthcare, packaging, industrial
                manufacturing, logistics and beyond. See the full list with
                capability examples for each sector.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep">
                Explore industries
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
            <Link
              href="/methodology"
              className="group bg-background p-7 transition-colors duration-300 hover:bg-background-secondary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-primary"
            >
              <h2 className="font-display text-xl font-bold text-foreground">
                How we build solutions
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-foreground-muted">
                We combine HALCON industrial software, custom-trained AI models
                and classical vision algorithms. Each technique is applied
                where it performs best.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-deep">
                See our methodology
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <FinalCTA
        headingId="about-cta-heading"
        showSecondary={false}
        showNote={false}
      />
    </div>
  );
}
