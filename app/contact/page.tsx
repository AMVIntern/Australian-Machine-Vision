import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Lock } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Australian Machine Vision. Discuss a machine vision or automated inspection challenge for any industry, anywhere in Australia or globally.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Australian Machine Vision",
    description:
      "Get in touch with Australian Machine Vision. Request a demo or ask about AI vision for quality inspection.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | Australian Machine Vision",
    description:
      "Get in touch with Australian Machine Vision. Request a demo or ask about AI vision for quality inspection.",
  },
};

export default function ContactPage() {
  return (
    <div>
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="mx-auto max-w-2xl text-center">
          <h1
            id="contact-title"
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Contact Us
          </h1>
          <p className="mt-3 text-lg text-foreground-muted">
            Reviewing your inspection capability or planning an upgrade? Let&apos;s
            discuss how machine vision can help your operation.
          </p>
        </header>

        <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-border bg-white p-6 shadow-soft sm:p-8">
              <h2 className="text-xl font-bold text-foreground">
                Send us a Message
              </h2>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-white p-6 shadow-soft">
              <h2 className="text-lg font-bold text-foreground">
                Contact Information
              </h2>
              <ul className="mt-6 space-y-4" role="list">
                <li className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary"
                    aria-hidden
                  >
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-foreground-muted leading-tight">
                    Office: 9A Sir Laurence Drive Seaford 3198
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary"
                    aria-hidden
                  >
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-foreground-muted leading-tight">
                    <a
                      href="tel:0499990117"
                      className="hover:text-foreground"
                    >
                      0499 990 117
                    </a>
                    {" / "}
                    <a
                      href="tel:0418535729"
                      className="hover:text-foreground"
                    >
                      0418 535 729
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary"
                    aria-hidden
                  >
                    <Mail className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-foreground-muted leading-tight">
                    <a
                      href="mailto:amvsupport@amvco.com.au"
                      className="hover:text-foreground"
                    >
                      amvsupport@amvco.com.au
                    </a>
                    {" / "}
                    <a
                      href="mailto:krazga@amvco.com.au"
                      className="hover:text-foreground"
                    >
                      krazga@amvco.com.au
                    </a>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary"
                    aria-hidden
                  >
                    <Clock className="h-4 w-4" />
                  </span>
                  <span className="text-sm text-foreground-muted leading-tight">
                    Monday to Friday, 9am to 5pm
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-teal-200/80 bg-gradient-to-br from-teal-600 via-teal-600 to-teal-700 p-5">
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white"
                aria-hidden
              >
                <Lock className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Your work stays confidential</p>
                <p className="mt-1 text-xs leading-relaxed text-teal-50/90">
                  We do not publish client names, line details or project outcomes without permission. Every engagement is treated as commercially sensitive.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
