"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun, Moon, Database } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { NAV_ITEMS } from "@/data/mock";

/**
 * Fixed transparent navbar with glassmorphism on scroll
 * Supports dark/light mode toggle and responsive mobile menu
 */
export function Navbar() {
  const { scrolled } = useScroll(20);
  const { theme, setTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "glass border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navigasi utama"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-foreground transition-opacity hover:opacity-80"
          aria-label="Satu Data Aceh — Beranda"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Database className="h-4 w-4" />
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:block">
            Satu Data{" "}
            <span className="gradient-text font-bold">Aceh</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 md:flex" role="list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Toggle tema"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {/* CTA */}
          <Link
            href="/dataset"
            className="hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 sm:block"
          >
            Jelajahi Data
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="glass border-t border-border/50 md:hidden">
          <ul className="flex flex-col px-4 py-3" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-border/50 pt-2">
              <Link
                href="/dataset"
                onClick={() => setMobileOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"
              >
                Jelajahi Data
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
