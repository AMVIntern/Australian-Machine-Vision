import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStoryBySlug, getAllStorySlugs } from "@/lib/customer-stories";
import { StoryDetailContent } from "@/components/customer-stories/story-detail-content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllStorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return {};
  return {
    title: story.title,
    description: story.shortDescription,
    openGraph: {
      title: `${story.title} | Australian Machine Vision`,
      description: story.shortDescription,
      type: "article",
    },
  };
}

export default async function CustomerStoryDetailPage({ params }: Props) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  return <StoryDetailContent story={story} />;
}
