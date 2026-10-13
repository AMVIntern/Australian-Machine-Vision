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
      <div className="ink-dots pointer-events-none absolute inset-0" aria-hidden />
      <div className="container relative mx-auto px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-ink-line pb-12 sm:grid-cols-2 lg:grid-cols-12">
          {/* Brand / contact */}
          <div className="space-y-5 lg:col-span-5">
            <Link
              href="/"
              className="inline-block rounded-sm transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-logo"
              aria-label="Australian Machine Vision - Home"
            >
              <Image
                src="/amv-logo.png"
                alt="Australian Machine Vision"
                width={160}
                height={42}
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <ul className="space-y-2.5 text-sm text-ink-soft" role="list">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent-logo" aria-hidden />
                <a
                  href="mailto:amvsupport@amvco.com.au"
                  className="transition-colors hover:text-white"
                >
                  amvsupport@amvco.com.au
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-logo" aria-hidden />
                <span>9A Sir Laurence Drive, Seaford 3198</span>
              </li>
            </ul>
          </div>

          {/* Quick navigation */}
          <div className="lg:col-span-4">
            <p className="annot text-ink-soft">Quick links</p>
            <ul className="mt-5 space-y-2.5" role="list">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 transition-colors hover:text-accent-logo"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="lg:col-span-3">
            <p className="annot text-ink-soft">Follow us</p>
            <ul className="mt-5 flex gap-3" role="list">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-ink-line text-ink-soft transition-colors hover:border-accent-logo hover:text-white"
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8">
          <p className="text-sm text-ink-soft">
            © {new Date().getFullYear()} Australian Machine Vision Pty Ltd. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
