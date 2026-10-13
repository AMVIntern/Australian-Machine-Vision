"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/industries", label: "Industries" },
  { href: "/methodology", label: "Methodology" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

/** True while a `[data-nav="dark"]` element spans the probe line near the top. */
function useOverDark() {
  const [overDark, setOverDark] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    let frame = 0;
    const probe = () => {
      frame = 0;
      const y = 44;
      const sections = document.querySelectorAll<HTMLElement>("[data-nav='dark']");
      let dark = false;
      sections.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= y && r.bottom >= y) dark = true;
      });
      setOverDark(dark);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(probe);
    };
    probe();
    // re-probe shortly after a route change, once the new page has painted
    const t = window.setTimeout(probe, 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return overDark;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
  const overDark = useOverDark();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const dark = overDark || mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        dark
          ? scrolled && !mobileOpen
            ? "border-b border-ink-line bg-ink/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
          : scrolled
            ? "border-b border-border bg-background/90 backdrop-blur-md"
            : "border-b border-transparent bg-background/0"
      )}
      role="banner"
    >
      <nav
        className="container mx-auto flex h-[4.5rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="relative z-50 flex shrink-0 items-center rounded-sm transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
          aria-label="Australian Machine Vision - Home"
        >
          <Image
            src="/amv-logo.png"
            alt="Australian Machine Vision"
            width={180}
            height={48}
            className={cn(
              "h-10 w-auto object-contain transition-[filter] duration-300 sm:h-11",
              dark && "brightness-0 invert"
            )}
            priority
          />
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-8 md:flex" role="list">
          {navLinks.map(({ href, label }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "relative py-2 text-[15px] font-medium transition-colors",
                    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:transition-all after:duration-300 after:content-['']",
                    dark
                      ? isActive
                        ? "text-white after:w-full after:bg-accent-logo"
                        : "text-white/70 hover:text-white hover:after:w-full after:bg-white/50"
                      : isActive
                        ? "text-foreground after:w-full after:bg-accent-primary"
                        : "text-foreground-muted hover:text-foreground hover:after:w-full after:bg-foreground/40"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden shrink-0 items-center md:flex">
          <Link
            href="/contact"
            className={cn(
              "group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-sm px-6 text-sm font-semibold transition-colors duration-300",
              dark
                ? "bg-accent-logo text-ink hover:bg-accent-secondary"
                : "bg-ink text-white hover:bg-accent-primary"
            )}
          >
            Contact Us
          </Link>
        </div>

        <button
          type="button"
          className={cn(
            "relative z-50 inline-flex items-center justify-center rounded-sm p-2.5 transition-colors md:hidden",
            dark
              ? "text-white hover:bg-white/10"
              : "text-foreground hover:bg-background-secondary",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary"
          )}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Menu className="h-6 w-6" aria-hidden />
          )}
          <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
        </button>
      </nav>

      {/* Mobile menu: full-screen ink sheet */}
      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-0 z-40 bg-ink transition-[opacity,visibility] duration-300 md:hidden",
          // invisible (not just transparent) when closed, so its links leave the tab order
          mobileOpen ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        )}
        role="dialog"
        aria-label="Mobile menu"
      >
        <div className="ink-dots absolute inset-0" aria-hidden />
        <ul
          className="relative flex h-full flex-col justify-center gap-1 px-8 pt-16"
          role="list"
        >
          {navLinks.map(({ href, label }, i) => {
            const isActive = pathname === href;
            return (
              <li
                key={href}
                className={cn(
                  "transition-all duration-500",
                  mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}
                style={{ transitionDelay: mobileOpen ? `${80 + i * 55}ms` : "0ms" }}
              >
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "font-display flex items-baseline gap-4 py-2.5 text-3xl font-bold transition-colors",
                    isActive ? "text-accent-logo" : "text-white hover:text-accent-logo"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li
            className={cn(
              "mt-8 transition-all duration-500",
              mobileOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            )}
            style={{ transitionDelay: mobileOpen ? `${80 + navLinks.length * 55}ms` : "0ms" }}
          >
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="inline-flex h-12 w-full items-center justify-center rounded-sm bg-accent-logo px-6 text-base font-semibold text-ink"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
