"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Menu, Sun, Moon, Database,
  ChevronRight, ChevronDown, LogIn, X, ExternalLink,
} from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

// ─── Navigation data ──────────────────────────────────────────────────────────

type NavItem =
  | { label: string; href: string; external?: boolean; children?: never }
  | { label: string; href?: never; external?: never; children: { label: string; href: string }[] };

const GEOSPASIAL_URL =
  "https://geoportal.acehprov.go.id/portal/apps/experiencebuilder/experience/?id=612279fd5d23491b859302329618b457&page=Jelajah-Peta";

const NAV: NavItem[] = [
  { label: "Dataset",        href: "/dataset"      },
  { label: "Mapset",         href: "/mapset"       },
  { label: "Geospasial",     href: GEOSPASIAL_URL, external: true },
  {
    label: "Pemanfaatan Data",
    children: [
      { label: "Dashboard",               href: "/pemanfaatan/dashboard"              },
      { label: "Infografik",              href: "/pemanfaatan/infografik"             },
      { label: "Videografik",             href: "/pemanfaatan/videografik"            },
      { label: "Artikel",                 href: "/pemanfaatan/artikel"                },
      { label: "Publikasi",               href: "/pemanfaatan/publikasi"              },
      { label: "Dokumentasi Geospasial",  href: "/pemanfaatan/dokumentasi-geospasial" },
    ],
  },
  { label: "Instansi",       href: "/instansi"     },
  { label: "Group",          href: "/group"        },
  { label: "Bidang Urusan",  href: "/bidang-urusan"},
  { label: "Ekosistem",      href: "/ekosistem"    },
  { label: "Rilis",          href: "/rilis"        },
  { label: "Tentang",        href: "/tentang"      },
];

// ─── Desktop: plain nav link (internal or external) ──────────────────────────

function NavLink({
  href,
  label,
  external = false,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const pathname = usePathname();
  const isActive = !external && pathname === href;
  const [hovered, setHovered] = useState(false);

  const baseClass = cn(
    "relative flex items-center gap-1 whitespace-nowrap px-2 py-1.5 text-xs font-medium transition-colors duration-200",
    isActive ? "text-amber-300" : "text-zinc-300 hover:text-amber-400"
  );

  const underline = (
    <motion.span
      className="absolute bottom-0 left-2 right-2 h-px rounded-full bg-amber-400"
      initial={false}
      animate={{ scaleX: isActive || hovered ? 1 : 0, opacity: isActive || hovered ? 1 : 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      style={{ originX: 0 }}
    />
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={baseClass}
      >
        {label}
        <ExternalLink className="h-2.5 w-2.5 opacity-50" />
        {underline}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-current={isActive ? "page" : undefined}
      className={baseClass}
    >
      {label}
      {underline}
    </Link>
  );
}

// ─── Desktop: dropdown trigger for "Pemanfaatan Data" ────────────────────────

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  const pathname = usePathname();
  const isActive = items.some((i) => pathname.startsWith(i.href));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 whitespace-nowrap px-2 py-1.5 text-xs font-medium",
            "transition-colors duration-200 outline-none",
            isActive ? "text-amber-300" : "text-zinc-300 hover:text-amber-400"
          )}
        >
          {label}
          <ChevronDown className="h-3 w-3 opacity-60" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={10}
        className={cn(
          // Override default popover bg with brand maroon
          "min-w-[200px] rounded-xl p-1.5",
          "border border-amber-500/20",
          "bg-[#1A0509]/95 backdrop-blur-md",
          "shadow-[0_16px_48px_rgba(0,0,0,0.6)]",
          // Ensure text is white on dark bg
          "text-zinc-200"
        )}
      >
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium",
                  "transition-colors duration-150 cursor-pointer",
                  active
                    ? "bg-amber-500/15 text-amber-300"
                    : "text-zinc-300 hover:bg-white/8 hover:text-amber-400 focus:bg-white/8 focus:text-amber-400"
                )}
              >
                {item.label}
                {active && <ChevronRight className="h-3 w-3 text-amber-400/60" />}
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Mobile: plain link (internal or external) ───────────────────────────────

function MobileNavLink({
  href,
  label,
  onClose,
  indent = false,
  external = false,
}: {
  href: string;
  label: string;
  onClose: () => void;
  indent?: boolean;
  external?: boolean;
}) {
  const pathname = usePathname();
  const isActive = !external && pathname === href;

  const baseClass = cn(
    "flex items-center justify-between rounded-xl py-2.5 text-sm font-medium transition-colors duration-150",
    indent ? "pl-7 pr-4" : "px-4",
    isActive
      ? "bg-amber-500/15 text-amber-300"
      : "text-white/70 hover:bg-white/8 hover:text-amber-300"
  );

  const rightIcon = external ? (
    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-white/30" />
  ) : (
    <ChevronRight
      className={cn(
        "h-3.5 w-3.5 shrink-0",
        isActive ? "text-amber-400/60" : "text-white/20"
      )}
    />
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClose}
        className={baseClass}
      >
        {label}
        {rightIcon}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClose}
      aria-current={isActive ? "page" : undefined}
      className={baseClass}
    >
      {label}
      {rightIcon}
    </Link>
  );
}

// ─── Mobile: accordion for dropdown group ────────────────────────────────────

function MobileAccordion({
  label,
  items,
  onClose,
  defaultOpen = true,
}: {
  label: string;
  items: { label: string; href: string }[];
  onClose: () => void;
  defaultOpen?: boolean;
}) {
  const pathname = usePathname();
  const isGroupActive = items.some((i) => pathname.startsWith(i.href));
  const [open, setOpen] = useState(defaultOpen || isGroupActive);

  return (
    <div>
      {/* Accordion trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between rounded-xl px-4 py-2.5",
          "text-sm font-medium transition-colors duration-150",
          isGroupActive
            ? "text-amber-300"
            : "text-white/70 hover:bg-white/8 hover:text-amber-300"
        )}
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          {/* Indicator dot when group is active */}
          {isGroupActive && (
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          )}
          {label}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-3.5 w-3.5 opacity-50" />
        </motion.span>
      </button>

      {/* Sub-items */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 pb-1 pt-0.5">
              {items.map((item) => (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onClose={onClose}
                  indent
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

/**
 * Animation variants — Cinematic Drop & Cascade Reveal
 *
 * barDrop:     the entire floating bar slides down from y:-100
 * cascade:     stagger container — waits 0.3s for bar to land, then
 *              reveals children 0.1s apart
 * cascadeItem: each child fades up + unblurs (blur 5px → 0)
 */
const barDrop: Variants = {
  hidden:  { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const cascade: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.7 },
  },
};

const cascadeItem: Variants = {
  hidden:  { opacity: 0, y: -24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};
export function Navbar() {
  const { scrolled } = useScroll(10);
  const { theme, setTheme } = useTheme();
  const [sheetOpen, setSheetOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <div className="fixed top-4 left-1/2 z-50 w-[95%] max-w-7xl -translate-x-1/2">

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-x-8 -bottom-3 h-8 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(ellipse at center,rgba(180,83,9,0.35) 0%,transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* ── Floating bar — cinematic drop ── */}
      <motion.nav
        aria-label="Navigasi utama"
        variants={barDrop}
        initial="hidden"
        animate="visible"
        className={cn(
          "relative flex h-14 items-center justify-between overflow-hidden rounded-2xl px-4 sm:px-5",
          "bg-[#3D0A12]/80 backdrop-blur-md",
          "border border-amber-500/30",
          "shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_0_1px_rgba(180,83,9,0.15)]",
          "transition-all duration-500",
          scrolled &&
            "border-amber-500/50 bg-[#3D0A12]/92 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(180,83,9,0.25)]"
        )}
      >
        {/* Batik left */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-36 lg:block"
          aria-hidden="true"
        >
          <Image src="/Bantik-3-kiri.png" alt="" fill
            className="object-cover object-left opacity-[0.20]" sizes="144px" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#3D0A12]/90" />
        </div>

        {/* Batik right */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-36 lg:block"
          aria-hidden="true"
        >
          <Image src="/batik-3-kanan.png" alt="" fill
            className="object-cover object-right opacity-[0.20]" sizes="144px" priority />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#3D0A12]/90" />
        </div>

        {/* ── Content — cascade stagger container ── */}
        <motion.div
          className="relative z-10 flex w-full items-center justify-between gap-3"
          variants={cascade}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div variants={cascadeItem} className="shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
              aria-label="Satu Data Aceh — Beranda"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 ring-1 ring-amber-500/40">
                <Database className="h-3.5 w-3.5 text-amber-300" />
              </span>
              <span className="hidden text-sm font-semibold tracking-tight text-white xl:block">
                Satu Data{" "}
                <span style={{
                  background: "linear-gradient(90deg,#F59E0B 0%,#FDE68A 50%,#F59E0B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Aceh
                </span>
              </span>
            </Link>
          </motion.div>

          {/* ── Desktop nav — each item is a cascadeItem ── */}
          <ul className="hidden items-center gap-4 lg:flex" role="list">
            {NAV.map((item) =>
              item.children ? (
                <motion.li key={item.label} variants={cascadeItem}>
                  <NavDropdown label={item.label} items={item.children} />
                </motion.li>
              ) : (
                <motion.li key={item.href} variants={cascadeItem}>
                  <NavLink href={item.href} label={item.label} external={item.external} />
                </motion.li>
              )
            )}
          </ul>

          {/* ── Right actions — each is a cascadeItem ── */}
          <div className="flex shrink-0 items-center gap-1">

            {/* Theme toggle */}
            <motion.div variants={cascadeItem}>
              <button
                onClick={toggleTheme}
                className="relative flex h-8 w-8 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-amber-300"
                aria-label="Toggle tema"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </button>
            </motion.div>

            {/* Login — gold border */}
            <motion.div variants={cascadeItem}>
              <Link
                href="/login"
                className={cn(
                  "hidden items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold sm:flex",
                  "border border-amber-500/40 text-amber-300/90",
                  "transition-all duration-200 hover:border-amber-400 hover:bg-amber-500/10 hover:text-amber-300 active:scale-95"
                )}
              >
                <LogIn className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">Masuk</span>
              </Link>
            </motion.div>

            {/* Hamburger — visible below lg */}
            <motion.div variants={cascadeItem}>
              <button
                onClick={() => setSheetOpen(true)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
                aria-label="Buka menu navigasi"
                aria-expanded={sheetOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>

      {/* ── Mobile Sheet Drawer ── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className={cn(
            "flex w-[300px] flex-col border-l border-amber-500/20 p-0",
            "bg-[#1A0509] text-white"
          )}
        >
          {/* Header */}
          <SheetHeader className="flex-row items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20 ring-1 ring-amber-500/40">
                <Database className="h-4 w-4 text-amber-300" />
              </span>
              <SheetTitle className="text-sm font-semibold text-white">
                Satu Data{" "}
                <span style={{
                  background: "linear-gradient(90deg,#F59E0B 0%,#FDE68A 50%,#F59E0B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  Aceh
                </span>
              </SheetTitle>
            </div>
            <SheetClose asChild>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Tutup menu"
              >
                <X className="h-4 w-4" />
              </button>
            </SheetClose>
          </SheetHeader>

          {/* Scrollable nav area */}
          <nav
            aria-label="Menu mobile"
            className="flex-1 overflow-y-auto px-3 py-3"
          >
            <div className="flex flex-col gap-0.5">
              {NAV.map((item, i) =>
                item.children ? (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <MobileAccordion
                      label={item.label}
                      items={item.children}
                      onClose={() => setSheetOpen(false)}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                  >
                    <MobileNavLink
                      href={item.href}
                      label={item.label}
                      onClose={() => setSheetOpen(false)}
                      external={item.external}
                    />
                  </motion.div>
                )
              )}
            </div>
          </nav>

          {/* Bottom actions */}
          <div className="border-t border-white/[0.06] px-4 py-4">
            <div className="flex flex-col gap-2.5">
              <Link
                href="/login"
                onClick={() => setSheetOpen(false)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl px-4 py-2.5",
                  "border border-amber-500/40 text-sm font-semibold text-amber-300",
                  "transition-all hover:border-amber-400 hover:bg-amber-500/10 active:scale-95"
                )}
              >
                <LogIn className="h-4 w-4" />
                Masuk / Portal Login
              </Link>
              <Link
                href="/dataset"
                onClick={() => setSheetOpen(false)}
                className={cn(
                  "flex items-center justify-center gap-2 rounded-xl px-4 py-2.5",
                  "bg-amber-500 text-sm font-semibold text-[#1A0005]",
                  "shadow-[0_2px_12px_rgba(245,158,11,0.35)]",
                  "transition-all hover:bg-amber-400 active:scale-95"
                )}
              >
                Jelajahi Data
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Batik watermark */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 opacity-[0.05]"
            aria-hidden="true"
            style={{
              backgroundImage: "url('/Batik_1.png')",
              backgroundSize: "cover",
              backgroundPosition: "bottom center",
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}
