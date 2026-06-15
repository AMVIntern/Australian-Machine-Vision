import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Stories",
  description:
    "Customer stories and case studies from Australian Machine Vision are coming soon.",
  // Thin placeholder page until approved case studies exist: keep it out of the index.
  robots: { index: false, follow: true },
  openGraph: {
    title: "Customer Stories | Australian Machine Vision",
    description:
      "Customer stories and case studies from Australian Machine Vision are coming soon.",
    type: "website",
  },
};

export default function CustomerStoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
