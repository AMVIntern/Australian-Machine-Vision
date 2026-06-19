"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { customerStories } from "@/lib/customer-stories";
import { StoryCard } from "@/components/customer-stories/story-card";

const container = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export default function CustomerStoriesPage() {
  return (
    <div>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <section aria-labelledby="customer-stories-heading">
          <h1
            id="customer-stories-heading"
            className="text-center text-3xl font-bold text-foreground sm:text-4xl"
          >
            Customer Stories
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-center text-foreground-muted">
            See how manufacturers across food, industrial and general
            manufacturing are improving accuracy, throughput and consistency
            with machine vision.
          </p>

          {customerStories.length > 0 ? (
            <motion.div
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="initial"
              animate="animate"
            >
              {customerStories.map((story, index) => (
                <StoryCard key={story.slug} story={story} index={index} />
              ))}
            </motion.div>
          ) : (
            <div className="mx-auto mt-12 max-w-xl rounded-xl border border-border bg-white p-8 text-center shadow-soft">
              <p className="text-lg font-semibold text-foreground">
                Customer stories coming soon
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                We are preparing detailed case studies. To discuss results we
                have delivered for businesses like yours, please get in touch.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-accent-primary px-6 text-sm font-semibold text-white shadow-soft transition hover:opacity-90"
              >
                Contact Us
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
