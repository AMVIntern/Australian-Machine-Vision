import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Linkedin } from "lucide-react";

const footerLinks = [
  { href: "/industries", label: "Industries" },
  { href: "/methodology", label: "Methodology" },
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
      className="mt-auto border-t border-border bg-background-secondary"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand / Contact */}
          <div className="space-y-4">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90" aria-label="Australian Machine Vision - Home">
              <Image
                src="/amv-logo.png"
                alt="Australian Machine Vision"
                width={160}
                height={42}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <ul className="space-y-2 text-sm text-foreground-muted" role="list">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                <a
                  href="mailto:amvsupport@amvco.com.au"
                  className="hover:text-foreground transition-colors"
                >
                  amvsupport@amvco.com.au
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
                <span>9A Sir Laurence Drive, Seaford 3198</span>
              </li>
            </ul>
          </div>

          {/* Quick navigation */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-4">
              Quick links
            </p>
            <ul className="space-y-2" role="list">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social placeholder */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-4">Follow us</p>
            <ul className="flex gap-4" role="list">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground-muted hover:text-foreground transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="mt-10 pt-8 border-t border-border">
          <p className="text-center text-sm text-foreground-muted">
            © {new Date().getFullYear()} Australian Machine Vision. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
