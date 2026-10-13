import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Target, Eye, ScanLine, Settings2, Code2 } from "lucide-react";
import { AboutValuesSection } from "@/components/about/about-values-section";
import { PageHeader } from "@/components/layout/page-header";
import { Initialled } from "@/components/ui/initialled";
import { NumberTicker } from "@/components/ui/number-ticker";
import { FinalCTA } from "@/components/home/final-cta";
import { cn } from "@/lib/utils";

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

const capabilities = [
  {
    icon: ScanLine,
    title: "Advanced machine vision engineering",
    text: "Expertise across 2D, line-scan and 3D imaging, classical vision pipelines and applied deep learning.",
  },
  {
    icon: Settings2,
    title: "Robust automation and mechatronics",
    text: "Every system is designed for real-world reliability, line-speed performance and long-term stability.",
  },
  {
    icon: Code2,
    title: "Modern software and AI development",
    text: "Custom models, advanced imaging pipelines and scalable architectures that integrate cleanly into customer operations.",
  },
];

const stats: { value: string | null; label: string }[] = [
  { value: null, label: "Years of Experience" },
  { value: "Global", label: "Australia and International Markets" },
  { value: "In-House", label: "Engineering and Software" },
  { value: "Trusted", label: "Technology Partner Network" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        titleId="about-title"
        title={<Initialled text="Our Vision is Your Solution" />}
        intro={
          <p>
            AMV delivers end-to-end machine vision and automated inspection,
            from feasibility and proof of concept through custom build,
            on-site commissioning and ongoing support. We work across any
            industry, in Australia and global markets, applying AI and
            classical vision techniques to solve the inspection challenges
            that standard systems cannot.
          </p>
        }
      />

      {/* Our Mission + Our Vision */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-0">
            <div className="lg:pr-16">
              <Target className="h-8 w-8 text-accent-primary" strokeWidth={1.6} aria-hidden />
              <h2 className="font-display mt-6 text-3xl font-extrabold text-foreground sm:text-4xl">
                Our Mission
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted">
                To deliver machine vision and automated inspection systems that
                solve real production challenges. We help manufacturers across
                any industry achieve the accuracy, reliability and repeatability
                that off-the-shelf systems cannot.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-foreground-muted">
                Every project starts with a clear understanding of your
                production environment and quality requirements, so the
                solution fits the way your line actually runs.
              </p>
            </div>
            <div className="border-t border-border pt-14 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
              <Eye className="h-8 w-8 text-accent-primary" strokeWidth={1.6} aria-hidden />
              <h2 className="font-display mt-6 text-3xl font-extrabold text-foreground sm:text-4xl">
                Our Vision
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-foreground-muted">
                Our vision is your solution. We combine advanced imaging, robust
                algorithms and a wide network of trusted technology partners to
                build inspection systems that perform in real world conditions,
                not just in the lab.
              </p>
              <p className="mt-4 max-w-xl leading-relaxed text-foreground-muted">
                We then select and integrate the technologies that deliver the
                most reliable, scalable and cost effective outcome for each
                customer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-white py-20 sm:py-28" aria-labelledby="team-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="flex items-center gap-2.5 text-sm font-medium text-accent-deep">
                <span
                  className="h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-accent-logo"
                  aria-hidden
                />
                Our team
              </p>
              <h2
                id="team-heading"
                className="font-display mt-4 text-3xl font-extrabold leading-[1.05] text-foreground sm:text-4xl"
              >
                About the AMV Team
              </h2>
            </div>

            <div className="lg:col-span-8">
              <div className="grid items-center gap-8 sm:grid-cols-[auto,1fr] sm:gap-10">
                <div className="chamfer-lg relative h-52 w-44 overflow-hidden bg-background-secondary sm:h-60 sm:w-48">
                  <Image
                    src="/team/ken-razga.jpg"
                    alt="Ken Razga, Director at Australian Machine Vision"
                    fill
                    sizes="192px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="font-wide text-2xl font-bold text-foreground">Ken Razga</h3>
                  <p className="mt-1 text-sm font-semibold text-accent-deep">Director</p>
                  <p className="mt-4 leading-relaxed text-foreground-muted">
                    Ken leads Australian Machine Vision, bringing more than 20 years
                    of hands-on experience in machine vision and industrial automation.
                    He has worked closely with manufacturers across any industry to
                    solve the inspection challenges that off-the-shelf systems cannot.
                  </p>
                  <p className="mt-3 leading-relaxed text-foreground-muted">
                    His focus is practical engineering and measurable results, making
                    sure every system we deliver is reliable, well integrated and built
                    for real production conditions.
                  </p>
                </div>
              </div>

              <p className="mt-14 max-w-[68ch] border-t border-border pt-10 text-lg leading-relaxed text-foreground">
                AMV has expanded its engineering capability significantly, building a team that blends deep industry experience with fresh technical strength from RMIT Masters graduates in Mechatronics and Computer Science. This growth has strengthened our ability to deliver reliable, production-ready inspection systems across food, industrial and manufacturing environments.
              </p>

              <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
                {capabilities.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="bg-white p-6">
                    <Icon className="h-6 w-6 text-accent-primary" strokeWidth={1.75} aria-hidden />
                    <h3 className="mt-5 font-bold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{text}</p>
                  </div>
                ))}
              </div>

              <p className="mt-10 max-w-[68ch] leading-relaxed text-foreground-muted">
                This expanded capability means AMV can support customers with greater depth, faster problem-solving and more confidence in tackling complex inspection challenges. The team&apos;s growth directly translates into stronger outcomes: better system design, more resilient performance, and a partner who can support you from concept through to deployment and ongoing optimisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values */}
      <section className="bay relative py-20 sm:py-28" data-nav="dark">
        <div className="dot-field pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <AboutValuesSection />
        </div>
      </section>

      {/* Statistics */}
      <section
        className="border-y border-border bg-background-tint"
        aria-labelledby="about-stats-heading"
      >
        <h2 id="about-stats-heading" className="sr-only">
          Key statistics
        </h2>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col-reverse justify-end gap-2 py-10 sm:py-12",
                  i % 2 === 1 ? "border-l border-border pl-5 sm:pl-8" : "pr-5",
                  i >= 2 && "border-t border-border lg:border-t-0",
                  i === 2 && "lg:border-l lg:pl-8"
                )}
              >
                <dt className="text-sm font-medium text-foreground-muted">{stat.label}</dt>
                <dd className="font-display text-[1.6rem] font-extrabold leading-none text-accent-primary sm:text-5xl">
                  {stat.value ?? <NumberTicker value={20} suffix="+" />}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cross-links to Industries and Methodology */}
      <section className="border-b border-border bg-white">
        <div className="container mx-auto grid px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <Link
            href="/industries"
            className="group flex flex-col border-b border-border py-12 md:border-b-0 md:border-r md:pr-12"
          >
            <h2 className="font-display flex items-center justify-between gap-4 text-2xl font-extrabold text-foreground">
              Industries we work in
              <ArrowRight
                className="h-6 w-6 shrink-0 text-accent-primary transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden
              />
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-foreground-muted">
              AMV works across food, healthcare, packaging, industrial
              manufacturing, logistics and beyond. See the full list with
              capability examples for each sector.
            </p>
            <span className="mt-5 text-sm font-semibold text-accent-deep group-hover:underline">
              Explore industries
            </span>
          </Link>
          <Link href="/methodology" className="group flex flex-col py-12 md:pl-12">
            <h2 className="font-display flex items-center justify-between gap-4 text-2xl font-extrabold text-foreground">
              How we build solutions
              <ArrowRight
                className="h-6 w-6 shrink-0 text-accent-primary transition-transform duration-300 group-hover:translate-x-1.5"
                aria-hidden
              />
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-foreground-muted">
              We combine HALCON industrial software, custom-trained AI models
              and classical vision algorithms. Each technique is applied where
              it performs best.
            </p>
            <span className="mt-5 text-sm font-semibold text-accent-deep group-hover:underline">
              See our methodology
            </span>
          </Link>
        </div>
      </section>

      <FinalCTA showSecondary={false} showNote={false} headingId="about-cta-heading" />
    </div>
  );
}
