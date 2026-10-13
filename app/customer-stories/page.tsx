"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { customerStories } from "@/lib/customer-stories";
import { StoryCard } from "@/components/customer-stories/story-card";
import { PageHeader } from "@/components/layout/page-header";

const container = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function CustomerStoriesPage() {
  return (
    <div>
      <PageHeader
        titleId="customer-stories-heading"
        title="Customer Stories"
        intro={
          <p>
            See how manufacturers across food, industrial and general
            manufacturing are improving accuracy, throughput and consistency
            with machine vision.
          </p>
        }
      />

      <section className="bg-background py-16 sm:py-24" aria-labelledby="customer-stories-heading">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {customerStories.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="initial"
              animate="animate"
            >
              {customerStories.map((story, index) => (
                <StoryCard key={story.slug} story={story} index={index} />
              ))}
            </motion.div>
          ) : (
            <div className="grid gap-8 border-t border-foreground pt-10 lg:grid-cols-12">
              <p className="font-display text-2xl font-extrabold text-foreground lg:col-span-5">
                Customer stories coming soon
              </p>
              <div className="lg:col-span-7">
                <p className="max-w-xl text-lg leading-relaxed text-foreground-muted">
                  We are preparing detailed case studies. To discuss results we
                  have delivered for businesses like yours, please get in touch.
                </p>
                <Link
                  href="/contact"
                  className="chamfer mt-8 inline-flex h-12 items-center justify-center bg-ink px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-primary"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
