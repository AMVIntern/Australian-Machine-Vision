import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnalyticsPlaceholder } from "@/components/analytics-placeholder";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.australianmachinevision.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Australian Machine Vision | Machine Vision and Automated Inspection",
    template: "%s | Australian Machine Vision",
  },
  description:
    "Australian Machine Vision builds custom machine vision and automated inspection systems for manufacturers across any industry. HALCON, AI deep learning and classical vision combined. 20+ years of experience.",
  keywords: [
    "machine vision",
    "machine vision Australia",
    "automated inspection",
    "quality inspection",
    "vision systems integration",
    "AI inspection",
    "deep learning inspection",
    "HALCON machine vision",
    "defect detection",
    "custom inspection systems",
    "industrial automation",
  ],
  applicationName: "Australian Machine Vision",
  authors: [{ name: "Australian Machine Vision" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "Australian Machine Vision",
    title:
      "Australian Machine Vision | Machine Vision and Automated Inspection",
    description:
      "Machine vision and automated inspection systems for food, industrial and general manufacturing across Australia and global markets.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Australian Machine Vision | Machine Vision and Automated Inspection",
    description:
      "Machine vision and automated inspection systems for food, industrial and general manufacturing.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Australian Machine Vision",
  alternateName: "AMV",
  url: siteUrl,
  logo: `${siteUrl}/amv-logo.png`,
  description:
    "Custom machine vision and automated inspection systems for manufacturers across any industry. HALCON, AI deep learning and classical vision combined.",
  email: "amvsupport@amvco.com.au",
  telephone: "+61 499 990 117",
  address: {
    "@type": "PostalAddress",
    streetAddress: "9A Sir Laurence Drive",
    addressLocality: "Seaford",
    addressRegion: "VIC",
    postalCode: "3198",
    addressCountry: "AU",
  },
  areaServed: ["AU", "Worldwide"],
  sameAs: ["https://www.linkedin.com/company/australian-machine-vision/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <AnalyticsPlaceholder />
      </body>
    </html>
  );
}
