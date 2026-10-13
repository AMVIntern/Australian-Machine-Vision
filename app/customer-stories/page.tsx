"use client";

import Link from "next/link";
import { customerStories } from "@/lib/customer-stories";
import { StoryCard } from "@/components/customer-stories/story-card";
import { PageHeader } from "@/components/layout/page-header";

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

      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <section aria-labelledby="customer-stories-heading">
          {customerStories.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {customerStories.map((story, index) => (
                <StoryCard key={story.slug} story={story} index={index} />
              ))}
            </div>
          ) : (
            <div className="reg-marks mx-auto max-w-xl border border-border bg-white p-10 text-center">
              <p className="font-display text-xl font-bold text-foreground">
                Customer stories coming soon
              </p>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                We are preparing detailed case studies. To discuss results we
                have delivered for businesses like yours, please get in touch.
              </p>
              <Link
                href="/contact"
                className="mt-7 inline-flex h-11 items-center justify-center rounded-sm bg-ink px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-primary"
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
