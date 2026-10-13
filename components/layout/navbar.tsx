"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/industries", label: "Industries" },
  { href: "/methodology", label: "Methodology" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hovered, setHovered] = React.useState<string | null>(null);
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const activeHref = navLinks.find(({ href }) => isActivePath(pathname, href))?.href;
  const indicatorHref = hovered ?? activeHref;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-border/70 bg-white/80 shadow-soft-md backdrop-blur-md supports-[backdrop-filter]:bg-white/75"
          : "border-border bg-white/95 shadow-soft backdrop-blur-sm supports-[backdrop-filter]:bg-white/90"
      )}
      role="banner"
    >
      <nav
        className={cn(
          "container mx-auto flex items-center justify-between gap-6 px-4 transition-[height] duration-300 sm:px-6 lg:px-8",
          scrolled ? "h-16" : "h-[5rem]"
        )}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-md transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2"
          aria-label="Australian Machine Vision - Home"
        >
          <Image
            src="/amv-logo.png"
            alt="Australian Machine Vision"
            width={180}
            height={48}
            className={cn(
              "w-auto object-contain transition-[height] duration-300",
              scrolled ? "h-10 sm:h-11" : "h-11 sm:h-12 lg:h-14"
            )}
            priority
          />
        </Link>

        {/* Desktop nav - centered */}
        <ul
          className="hidden flex-1 items-center justify-center gap-10 md:flex"
          role="list"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map(({ href, label }) => {
            const isActive = activeHref === href;
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  onMouseEnter={() => setHovered(href)}
                  onFocus={() => setHovered(href)}
                  onBlur={() => setHovered(null)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative block rounded-sm py-2 text-[15px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-4",
                    isActive || hovered === href
                      ? "text-accent-deep"
                      : "text-foreground"
                  )}
                >
                  {label}
                  {indicatorHref === href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-accent-primary"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 34 }
                      }
                      aria-hidden
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA - hidden on mobile (shown in drawer) */}
        <div className="hidden shrink-0 items-center md:flex">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "primary", size: "default" }),
              "btn-shine min-w-[8.5rem] rounded-lg px-6 text-base font-semibold shadow-soft transition-all duration-300 hover:opacity-95 hover:shadow-soft-md",
              scrolled ? "h-11" : "h-12"
            )}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2.5 text-foreground transition-colors hover:bg-background-secondary hover:text-accent-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileOpen ? "close" : "open"}
              initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={reduceMotion ? undefined : { rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="block"
            >
              {mobileOpen ? (
                <X className="h-6 w-6" aria-hidden />
              ) : (
                <Menu className="h-6 w-6" aria-hidden />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            className="overflow-hidden border-t border-border bg-white md:hidden"
            role="dialog"
            aria-label="Mobile menu"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul
              className="container mx-auto flex flex-col gap-0.5 px-4 py-4"
              role="list"
            >
              {navLinks.map(({ href, label }, index) => {
                const isActive = activeHref === href;
                return (
                  <motion.li
                    key={href}
                    initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.22 }}
                  >
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "block rounded-lg px-4 py-3 text-[15px] font-medium transition-colors",
                        isActive
                          ? "bg-accent-primary/10 text-accent-primary"
                          : "text-foreground hover:bg-background-secondary"
                      )}
                    >
                      {label}
                    </Link>
                  </motion.li>
                );
              })}
              <li className="px-4 pt-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "primary", size: "default" }),
                    "inline-flex w-full justify-center rounded-lg font-semibold"
                  )}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
