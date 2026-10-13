import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, Lock } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHeader } from "@/components/layout/page-header";

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
      <PageHeader
        titleId="contact-title"
        title="Contact Us"
        intro={
          <p>
            Reviewing your inspection capability or planning an upgrade? Let&apos;s
            discuss how machine vision can help your operation.
          </p>
        }
      />

      <section className="bg-background pb-20 sm:pb-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-8 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <div className="chamfer-lg relative bg-white p-6 shadow-soft-xl sm:p-10">
                <h2 className="font-display text-2xl font-extrabold text-foreground">
                  Send us a Message
                </h2>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>

            <aside className="space-y-6 lg:col-span-4 lg:pt-8">
              <div className="rounded-md border border-border bg-white p-6 sm:p-7">
                <h2 className="font-wide text-lg font-bold text-foreground">
                  Contact Information
                </h2>
                <ul className="mt-6 divide-y divide-border" role="list">
                  <li className="flex items-start gap-3 py-3.5 first:pt-0">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" aria-hidden />
                    <span className="text-[15px] leading-snug text-foreground">
                      Office: 9A Sir Laurence Drive Seaford 3198
                    </span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" aria-hidden />
                    <span className="tabular text-[15px] leading-snug text-foreground">
                      <a href="tel:0499990117" className="hover:text-accent-deep hover:underline">
                        0499 990 117
                      </a>
                      {" / "}
                      <a href="tel:0418535729" className="hover:text-accent-deep hover:underline">
                        0418 535 729
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-3 py-3.5">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" aria-hidden />
                    <a
                      href="mailto:amvsupport@amvco.com.au"
                      className="break-all text-[15px] leading-snug text-foreground hover:text-accent-deep hover:underline"
                    >
                      amvsupport@amvco.com.au
                    </a>
                  </li>
                  <li className="flex items-start gap-3 py-3.5 last:pb-0">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary" aria-hidden />
                    <span className="text-[15px] leading-snug text-foreground">
                      Monday to Friday, 9am to 5pm
                    </span>
                  </li>
                </ul>
              </div>

              <div className="chamfer relative overflow-hidden bg-ink p-6 text-white sm:p-7">
                <Lock className="h-5 w-5 text-accent-logo" aria-hidden />
                <p className="mt-4 font-bold">Your work stays confidential</p>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  We do not publish client names, line details or project outcomes without permission. Every engagement is treated as commercially sensitive.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
