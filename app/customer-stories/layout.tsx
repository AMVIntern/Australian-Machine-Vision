import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Stories",
  description:
    "Case studies and success stories. See how manufacturers use AI vision for defect detection and quality inspection.",
  openGraph: {
    title: "Customer Stories | Australian Machine Vision",
    description:
      "Case studies and success stories. See how manufacturers use AI vision for defect detection and quality inspection.",
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
