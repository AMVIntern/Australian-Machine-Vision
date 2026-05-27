"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/customer-stories", label: "Customer Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-white/95 shadow-soft backdrop-blur-sm supports-[backdrop-filter]:bg-white/90"
      role="banner"
    >
      <nav
        className="container mx-auto flex h-[5rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 rounded-md"
          aria-label="Australian Machine Vision - Home"
        >
          <Image
            src="/amv-logo.png"
            alt="Australian Machine Vision"
            width={180}
            height={48}
            className="h-11 w-auto object-contain sm:h-12"
            priority
          />
        </Link>

        {/* Desktop nav - centered */}
        <ul
          className="hidden md:flex flex-1 items-center justify-center gap-10"
          role="list"
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "relative text-[15px] font-medium transition-colors py-2",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-accent-primary after:content-[''] after:transition-all after:duration-200",
                    isActive
                      ? "text-accent-primary after:w-full"
                      : "text-foreground hover:text-accent-primary after:w-0 hover:after:w-full"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA - hidden on mobile (shown in drawer) */}
        <div className="hidden md:flex shrink-0 items-center">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ variant: "primary", size: "default" }),
              "h-12 min-w-[8.5rem] rounded-lg px-6 text-base font-semibold shadow-soft hover:shadow-soft-md hover:opacity-95 transition-all duration-200"
            )}
          >
            Book Demo
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2.5 text-foreground hover:bg-background-secondary hover:text-accent-primary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 transition-colors"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Menu className="h-6 w-6" aria-hidden />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "md:hidden border-t border-border bg-white",
          mobileOpen ? "block" : "hidden"
        )}
        role="dialog"
        aria-label="Mobile menu"
      >
        <ul
          className="container mx-auto flex flex-col gap-0.5 py-4 px-4"
          role="list"
        >
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block py-3 px-4 rounded-lg text-[15px] font-medium transition-colors",
                    isActive
                      ? "bg-accent-primary/10 text-accent-primary"
                      : "text-foreground hover:bg-background-secondary"
                  )}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li className="pt-3 px-4">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={cn(
                buttonVariants({ variant: "primary", size: "default" }),
                "w-full inline-flex justify-center rounded-lg font-semibold"
              )}
            >
              Book Demo
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
