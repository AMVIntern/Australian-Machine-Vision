"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
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

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-soft"
      role="banner"
    >
      <nav
        className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-opacity hover:opacity-90"
          aria-label="Australian Machine Vision - Home"
        >
          <Image
            src="/amv-logo.png"
            alt="Australian Machine Vision"
            width={180}
            height={48}
            className="h-10 w-auto object-contain sm:h-12"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="text-sm font-medium text-foreground-muted hover:text-foreground transition-colors"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className={buttonVariants({ variant: "primary", size: "default" })}
          >
            Book Demo
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-background-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary"
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
          "md:hidden border-t border-border bg-background",
          mobileOpen ? "block" : "hidden"
        )}
        role="dialog"
        aria-label="Mobile menu"
      >
        <ul className="container mx-auto flex flex-col py-4 gap-1 px-4" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block py-3 px-4 rounded-md text-foreground hover:bg-background-secondary"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-2 px-4">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className={cn(
                buttonVariants({ variant: "primary", size: "default" }),
                "w-full inline-flex"
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
