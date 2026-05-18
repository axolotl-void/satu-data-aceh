"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import {
  Database,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  FileText,
  BookOpen,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const HELP_LINKS = [
  { label: "FAQ",                href: "/faq",   icon: HelpCircle },
  { label: "Syarat & Ketentuan", href: "/terms", icon: FileText   },
  { label: "Panduan",            href: "/guide", icon: BookOpen   },
];

const PLATFORM_LINKS = [
  { label: "Dataset",        href: "/dataset"   },
  { label: "Dashboard",      href: "/dashboard" },
  { label: "Peta Interaktif",href: "/map"       },
  { label: "Wawasan Data",   href: "/insights"  },
];

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: "Alamat",
    value:
      "Jl. Tgk. H. Mohd Daud Beureueh No.119, Gampong Bandar Baru, Kec. Kuta Alam, Kota Banda Aceh, Aceh 24415",
    href: "https://maps.google.com/?q=Jl.+Tgk.+H.+Mohd+Daud+Beureueh+No.119+Banda+Aceh",
    external: true,
  },
  {
    icon: Phone,
    label: "Telepon",
    value: "(0651) 33611",
    href: "tel:+0651336111",
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "satudata@acehprov.go.id",
    href: "mailto:satudata@acehprov.go.id",
    external: false,
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

/** Outer footer reveal — slides up from below */
const footerVariants: Variants = {
  hidden:  { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

/** Stagger container for the three columns */
const gridVariants: Variants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.25,
    },
  },
};

/** Each column fades + rises */
const colVariants: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

/** Bottom bar fades in last */
const bottomBarVariants: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, delay: 0.85, ease: "easeOut" },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Animated gold gradient divider at the very top of the footer */
function GoldDivider() {
  return (
    <div className="relative h-px w-full overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />
      <div
        className="absolute inset-x-0 -top-px h-[3px] blur-sm"
        style={{
          background:
            "linear-gradient(90deg,transparent 0%,rgba(245,158,11,.5) 30%,rgba(253,230,138,.85) 50%,rgba(245,158,11,.5) 70%,transparent 100%)",
        }}
      />
    </div>
  );
}

/** Reusable link with animated underline + chevron */
function FooterLink({
  href,
  label,
  icon: Icon,
  external = false,
}: {
  href: string;
  label: string;
  icon?: React.ElementType;
  external?: boolean;
}) {
  const inner = (
    <span className="group flex items-center gap-2 text-sm text-white/60 transition-colors duration-200 hover:text-amber-300">
      {Icon && (
        <Icon className="h-3.5 w-3.5 shrink-0 text-amber-500/60 transition-colors group-hover:text-amber-400" />
      )}
      <span className="relative">
        {label}
        <span className="absolute -bottom-px left-0 h-px w-0 bg-amber-400/60 transition-all duration-300 group-hover:w-full" />
      </span>
      <ChevronRight className="ml-auto h-3 w-3 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60" />
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return <Link href={href}>{inner}</Link>;
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * Premium Futuristic Gov-Tech Footer — Aceh Identity Edition
 *
 * Visual layers (back → front):
 *   1. bg-[#1A0509]  — near-black maroon base
 *   2. Bantik-3-kiri.png  — full-height left frame, mix-blend-plus-lighter
 *   3. Batik-2.png        — full-height right frame, mix-blend-plus-lighter
 *   4. Gradient masks     — fade batik edges toward center
 *   5. Ambient glow       — subtle maroon radial at top
 *   6. z-10 content layer — all text / links
 *
 * Animation:
 *   - motion.footer  → slide-up reveal on scroll
 *   - Three columns  → staggered fade-up (0.18 s apart)
 *   - Bottom bar     → delayed fade-in
 */
export default function FooterSection() {
  return (
    <motion.footer
      className="relative overflow-hidden"
      style={{ backgroundColor: "#1A0509" }}
      aria-label="Footer Satu Data Aceh"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* ── Gold top divider ── */}
      <GoldDivider />

      {/* ════════════════════════════════════════════════
          BATIK FRAME — full-height left
      ════════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 select-none md:w-1/4"
        aria-hidden="true"
      >
        <Image
          src="/Bantik-3-kiri.png"
          alt=""
          fill
          className="object-cover object-left opacity-40"
          style={{ mixBlendMode: "plus-lighter" }}
          sizes="(max-width: 768px) 33vw, 25vw"
        />
        {/* Gradient mask — fade right edge toward center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, transparent 0%, transparent 40%, #1A0509 100%)",
          }}
        />
      </div>

      {/* ════════════════════════════════════════════════
          BATIK FRAME — full-height right
      ════════════════════════════════════════════════ */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3 select-none md:w-1/4"
        aria-hidden="true"
      >
        <Image
          src="/Batik-2.png"
          alt=""
          fill
          className="object-cover object-right opacity-40"
          style={{ mixBlendMode: "plus-lighter" }}
          sizes="(max-width: 768px) 33vw, 25vw"
        />
        {/* Gradient mask — fade left edge toward center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to left, transparent 0%, transparent 40%, #1A0509 100%)",
          }}
        />
      </div>

      {/* ── Ambient maroon glow at top ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139,30,30,0.35) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ════════════════════════════════════════════════
          CONTENT — z-10 above all ornament layers
      ════════════════════════════════════════════════ */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Three-column stagger grid  5 : 3 : 4 ── */}
        <motion.div
          className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:gap-8 lg:py-20"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >

          {/* ── Col 1 — Brand & About (5/12) ── */}
          <motion.div
            className="flex flex-col gap-6 md:col-span-5"
            variants={colVariants}
          >
            {/* Logos */}
            <div className="flex flex-col gap-4">
              {/* Satu Data Aceh */}
              <Link
                href="/"
                className="group inline-flex items-center gap-3 transition-opacity hover:opacity-80"
                aria-label="Satu Data Aceh — Beranda"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 ring-1 ring-amber-500/30 transition-all group-hover:ring-amber-500/60">
                  <Database className="h-5 w-5 text-amber-400" />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                    Portal Resmi
                  </span>
                  <span className="text-base font-bold text-white">
                    Satu Data{" "}
                    <span
                      style={{
                        background:
                          "linear-gradient(90deg,#F59E0B 0%,#FDE68A 60%,#F59E0B 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Aceh
                    </span>
                  </span>
                </div>
              </Link>

              {/* Satu Data Indonesia badge */}
              <a
                href="https://data.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-fit items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 transition-all hover:border-amber-500/30 hover:bg-white/10"
                aria-label="Satu Data Indonesia — Portal Data Nasional"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-red-700/80">
                  <span className="text-[8px] font-black text-white">SDI</span>
                </span>
                <span className="text-xs font-medium text-white/60 transition-colors group-hover:text-white/90">
                  Satu Data Indonesia
                </span>
                <ExternalLink className="h-3 w-3 text-white/30 transition-colors group-hover:text-amber-400" />
              </a>
            </div>

            {/* Description */}
            <p className="max-w-sm text-sm leading-relaxed text-white/55">
              Satu Data Aceh merupakan Portal Resmi Data Terbuka Pemerintah
              Provinsi Aceh yang menyajikan data dari berbagai SKPA (Satuan
              Kerja Perangkat Aceh) dan instansi di lingkungan Pemerintah
              Provinsi Aceh.
            </p>

            {/* Gold rule */}
            <div className="h-px w-16 bg-gradient-to-r from-amber-500/60 to-transparent" />

            {/* Tagline */}
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-amber-500/60">
              Transparan · Akuntabel · Berbasis Data
            </p>
          </motion.div>

          {/* ── Col 2 — Pusat Bantuan + Platform (3/12) ── */}
          <motion.div
            className="flex flex-col gap-5 md:col-span-3 md:pl-4"
            variants={colVariants}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
              Pusat Bantuan
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {HELP_LINKS.map(({ label, href, icon }) => (
                <li key={href}>
                  <FooterLink href={href} label={label} icon={icon} />
                </li>
              ))}
            </ul>

            <div className="h-px w-full bg-white/[0.06]" />

            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
              Platform
            </h3>
            <ul className="flex flex-col gap-3" role="list">
              {PLATFORM_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <FooterLink href={href} label={label} />
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 3 — Hubungi Kami (4/12) ── */}
          <motion.div
            className="flex flex-col gap-5 md:col-span-4"
            variants={colVariants}
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">
              Hubungi Kami
            </h3>

            <address className="flex flex-col gap-5 not-italic">
              {CONTACT_ITEMS.map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-start gap-3"
                  aria-label={`${label}: ${value}`}
                >
                  {/* Icon badge */}
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20 transition-all group-hover:bg-amber-500/20 group-hover:ring-amber-500/50">
                    <Icon className="h-3.5 w-3.5 text-amber-400/80" />
                  </span>
                  {/* Text */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                      {label}
                    </span>
                    <span className="text-sm leading-relaxed text-white/65 transition-colors group-hover:text-white/95">
                      {value}
                    </span>
                  </div>
                </a>
              ))}
            </address>

            <div className="h-px w-full bg-white/[0.06]" />

            <p className="text-xs text-white/30">
              Jam Operasional:{" "}
              <span className="text-white/50">
                Senin – Jumat, 08.00 – 16.00 WIB
              </span>
            </p>
          </motion.div>
        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="relative border-t border-white/[0.06] py-6"
          variants={bottomBarVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Gold accent line on top border */}
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent 0%,rgba(245,158,11,.2) 30%,rgba(245,158,11,.4) 50%,rgba(245,158,11,.2) 70%,transparent 100%)",
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            {/* Copyright */}
            <p className="text-xs text-white/35">
              Hak Cipta &copy; 2026.{" "}
              <span className="font-medium text-white/55">Diskominsa Aceh.</span>{" "}
              All rights reserved.
            </p>

            {/* Right links */}
            <div className="flex items-center gap-5">
              {[
                { label: "Kebijakan Privasi", href: "/privacy" },
                { label: "Syarat Penggunaan", href: "/terms"   },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs text-white/35 transition-colors hover:text-amber-400"
                >
                  {label}
                </Link>
              ))}
              <a
                href="https://data.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-white/35 transition-colors hover:text-amber-400"
              >
                data.go.id
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
