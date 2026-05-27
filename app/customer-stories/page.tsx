"use client";

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
            See how manufacturers across automotive, FMCG, pharma, and more are
            reducing defects, cutting costs, and scaling quality with AI vision.
          </p>

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
        </section>
      </div>
    </div>
  );
}
