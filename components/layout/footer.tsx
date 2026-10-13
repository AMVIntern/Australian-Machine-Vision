import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Linkedin } from "lucide-react";

const footerLinks = [
  { href: "/industries", label: "Industries" },
  { href: "/methodology", label: "Methodology" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/australian-machine-vision/",
    label: "LinkedIn",
    icon: Linkedin,
  },
] as const;

export function Footer() {
  return (
    <footer
      className="relative mt-auto overflow-hidden bg-ink text-white"
      role="contentinfo"
      data-nav="dark"
    >
      {/* The two shards of the mark, cropped by the footer edge */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute -right-24 -top-10 h-72 w-[34rem] bg-accent-logo/10"
          style={{ clipPath: "polygon(0 30%, 100% 0, 60% 100%)" }}
        />
        <div
          className="absolute -left-20 bottom-0 h-56 w-[26rem] bg-accent-logo/[0.07]"
          style={{ clipPath: "polygon(0 0, 100% 55%, 30% 100%)" }}
        />
      </div>

      <div className="container relative mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-block rounded-md"
              aria-label="Australian Machine Vision - Home"
            >
              <Image
                src="/amv-logo.png"
                alt="Australian Machine Vision"
                width={200}
                height={108}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <ul className="space-y-3 text-[15px] text-ink-soft" role="list">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent-logo" aria-hidden />
                <a
                  href="mailto:amvsupport@amvco.com.au"
                  className="transition-colors hover:text-white"
                >
                  amvsupport@amvco.com.au
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-logo" aria-hidden />
                <span>9A Sir Laurence Drive, Seaford 3198</span>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold text-white">Quick links</p>
            <ul className="space-y-3" role="list">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[15px] text-ink-soft transition-colors hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-sm font-semibold text-white">Follow us</p>
            <ul className="flex gap-3" role="list">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-ink-soft transition-colors hover:border-accent-logo hover:text-white"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <p className="text-sm text-ink-soft">
            © {new Date().getFullYear()} Australian Machine Vision Pty Ltd.
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
