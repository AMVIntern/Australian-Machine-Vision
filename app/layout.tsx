import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnalyticsPlaceholder } from "@/components/analytics-placeholder";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SITE_URL } from "@/lib/utils";
import { ORGANIZATION_ID } from "@/lib/structured-data";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Australian Machine Vision | Machine Vision and Automated Inspection",
    template: "%s | Australian Machine Vision",
  },
  description:
    "Australian Machine Vision builds custom machine vision and automated inspection systems for manufacturers across any industry. HALCON, AI deep learning and classical vision combined. 25+ years of experience.",
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
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
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
      className={`${archivo.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:font-semibold focus:text-foreground focus:shadow-soft-lg"
        >
          Skip to content
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main" tabIndex={-1} className="w-full flex-1 focus:outline-none">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        <AnalyticsPlaceholder />
      </body>
    </html>
  );
}
