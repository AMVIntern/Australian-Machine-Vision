import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export default async function CustomerStoryDetailPage({ params }: Props) {
  const { slug } = await params;
  if (!slug) notFound();

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <section aria-labelledby="story-title">
        <h1 id="story-title" className="text-3xl font-bold text-foreground">
          Customer Story: {decodeURIComponent(slug)}
        </h1>
        <p className="mt-2 text-foreground-muted">
          Detail view for this customer story. Content coming in a future update.
        </p>
      </section>
    </div>
  );
}
