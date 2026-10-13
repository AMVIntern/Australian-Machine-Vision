"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
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

/** True while a section marked data-nav="dark" sits under the floating bar. */
function useOverDark(pathname: string) {
  const [overDark, setOverDark] = React.useState(true);

  React.useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const probe = 40;
      const dark = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav='dark']")
      ).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= probe && r.bottom >= probe;
      });
      setOverDark(dark);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return overDark;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const pathname = usePathname();
  const overDark = useOverDark(pathname);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Step out of the way while reading down the page, return on the way up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (mobileOpen) return;
    setHidden(y > prev && y > 160);
  });

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      role="banner"
      initial={false}
      animate={{ y: hidden && !reduceMotion ? "-120%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        className={cn(
          "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-lg border pl-3 pr-2 transition-colors duration-300 sm:pl-4",
          overDark
            ? "border-white/10 bg-ink/75 text-white shadow-[0_18px_40px_-20px_rgb(0_0_0/0.7)] backdrop-blur-md"
            : "border-border bg-white/90 text-foreground shadow-soft-lg backdrop-blur-md"
        )}
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-md"
          aria-label="Australian Machine Vision - Home"
        >
          <Image
            src="/amv-logo.png"
            alt="Australian Machine Vision"
            width={180}
            height={97}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-1 md:flex" role="list">
          {navLinks.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <li key={href} className="relative">
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative block rounded-md px-3.5 py-2 text-[15px] font-medium transition-colors",
                    overDark
                      ? active
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : active
                        ? "text-foreground"
                        : "text-foreground/65 hover:text-foreground"
                  )}
                >
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-mark"
                      className="absolute -bottom-0.5 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-accent-logo"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      aria-hidden
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className={cn(
              "chamfer inline-flex h-12 items-center justify-center px-6 text-[15px] font-semibold transition-colors",
              overDark
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
            "inline-flex h-11 w-11 items-center justify-center rounded-md md:hidden",
            overDark ? "text-white hover:bg-white/10" : "text-foreground hover:bg-background-secondary"
          )}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-6 w-6" aria-hidden /> : <Menu className="h-6 w-6" aria-hidden />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-lg border border-white/10 bg-ink text-white shadow-soft-xl md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="flex flex-col p-2" role="list">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isActive(href) ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-md px-4 py-3.5 text-base font-medium",
                      isActive(href) ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/5"
                    )}
                  >
                    {label}
                    {isActive(href) && (
                      <span
                        className="h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-accent-logo"
                        aria-hidden
                      />
                    )}
                  </Link>
                </li>
              ))}
              <li className="p-2 pt-3">
                <Link
                  href="/contact"
                  className="chamfer flex h-12 w-full items-center justify-center bg-accent-logo font-semibold text-ink"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
