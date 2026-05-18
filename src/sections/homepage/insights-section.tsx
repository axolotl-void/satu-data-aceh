"use client";

import { motion } from "framer-motion";
import {
  Users,
  TrendingDown,
  UserMinus,
  Activity,
  LineChart,
  Scale,
  TrendingUp,
  PieChart,
  GraduationCap,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/layout/container";

/**
 * Data Insight Section — Executive Premium Dashboard
 * Menampilkan 10 indikator makro ekonomi dan kesejahteraan sosial.
 * Diletakkan tepat sebelum Footer.
 * Mendukung light mode & dark mode.
 */

interface DataIndicator {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  period?: string;
}

const DATA_INDICATORS: DataIndicator[] = [
  {
    id: "population",
    label: "Jumlah Penduduk",
    value: "5.500.000",
    icon: Users,
    period: "April 2026",
  },
  {
    id: "poverty-severity",
    label: "Indeks Keparahan Kemiskinan (P2)",
    value: "0.35",
    icon: TrendingDown,
    period: "2025",
  },
  {
    id: "unemployment",
    label: "Jumlah Pengangguran Terbuka",
    value: "5.7%",
    icon: UserMinus,
    period: "2025",
  },
  {
    id: "inflation",
    label: "Inflasi (M to M)",
    value: "0.21%",
    icon: Activity,
  },
  {
    id: "poverty-rate",
    label: "Persentase Penduduk Miskin",
    value: "14.45%",
    icon: LineChart,
  },
  {
    id: "gender-inequality",
    label: "Ketimpangan Gender",
    value: "0.320",
    icon: Scale,
  },
  {
    id: "economic-growth",
    label: "Pertumbuhan Ekonomi",
    value: "4.21%",
    icon: TrendingUp,
  },
  {
    id: "gini-ratio",
    label: "Gini Rasio",
    value: "0.291",
    icon: PieChart,
  },
  {
    id: "education",
    label: "Rata-rata Lama Sekolah",
    value: "9.5 Tahun",
    icon: GraduationCap,
  },
  {
    id: "stunting",
    label: "Prevalensi Stunting",
    value: "29.4%",
    icon: HeartPulse,
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function InsightsSection() {
  return (
    <section
      className="
        relative z-10 overflow-hidden py-20
        /* Light mode: warm cream background menyatu dengan tema */
        bg-gradient-to-b from-[#F0EDE6] to-[#E8E2D8]
        /* Dark mode: maroon gelap dramatis menyatu ke footer */
        dark:from-[#120308] dark:to-[#1A0509]
      "
      aria-labelledby="insights-heading"
    >
      {/* ── Ambient glow — dark mode only ── */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 opacity-0 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(139,30,30,0.25) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Subtle grid texture ── */}
      <div
        className="animated-grid pointer-events-none absolute inset-0 opacity-30"
        aria-hidden="true"
      />

      {/* ── Gold top divider ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px" aria-hidden="true">
        {/* Light mode: subtle maroon line */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#8B1E1E]/30 to-transparent dark:hidden" />
        {/* Dark mode: gold shimmer */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-transparent via-amber-500/50 to-transparent dark:block" />
      </div>

      <Container>
        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <motion.h2
            id="insights-heading"
            className="
              mb-4 text-3xl font-bold md:text-5xl
              /* Light mode: maroon-to-gold gradient */
              bg-gradient-to-r from-[#8B1E1E] via-[#B8860B] to-[#8B1E1E]
              bg-clip-text text-transparent
              /* Dark mode: cream-gold gradient */
              dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400
            "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Data Insight
          </motion.h2>
          <motion.p
            className="
              mx-auto max-w-2xl text-sm md:text-base
              text-[#5A4A3A]
              dark:text-zinc-400
            "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Indikator Makro Ekonomi dan Kesejahteraan Sosial Provinsi Aceh
          </motion.p>
        </div>

        {/* ── Grid of Indicators ── */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-5 lg:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {DATA_INDICATORS.map((indicator) => {
            const Icon = indicator.icon;
            return (
              <motion.div
                key={indicator.id}
                variants={itemVariants}
                className="
                  group relative flex flex-col overflow-hidden rounded-2xl p-5
                  transition-all duration-300
                  /* Light mode card */
                  border border-[#8B1E1E]/15 bg-white/80 shadow-sm
                  hover:-translate-y-1 hover:border-[#8B1E1E]/40 hover:shadow-md hover:shadow-[#8B1E1E]/10
                  /* Dark mode card */
                  dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-md
                  dark:hover:border-amber-500/50 dark:hover:bg-white/10
                "
              >
                {/* Glow on hover — light mode */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 dark:hidden"
                  aria-hidden="true"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#8B1E1E]/8 blur-2xl" />
                </div>

                {/* Glow on hover — dark mode */}
                <div
                  className="pointer-events-none absolute inset-0 hidden opacity-0 transition-opacity group-hover:opacity-100 dark:block"
                  aria-hidden="true"
                >
                  <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-amber-500/12 blur-2xl" />
                  <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-full bg-amber-600/8 blur-xl" />
                </div>

                {/* Icon */}
                <Icon
                  className="
                    mb-4 h-5 w-5
                    text-[#8B1E1E]
                    dark:text-amber-400
                  "
                />

                {/* Label */}
                <p
                  className="
                    mb-2 text-xs font-medium leading-snug
                    text-[#5A4A3A]
                    dark:text-zinc-400
                  "
                >
                  {indicator.label}
                  {indicator.period && (
                    <span className="ml-1 text-[10px] text-[#8B7A6A] dark:text-zinc-500">
                      ({indicator.period})
                    </span>
                  )}
                </p>

                {/* Value */}
                <p
                  className="
                    mt-auto text-2xl font-bold lg:text-3xl
                    text-[#1A0509]
                    transition-colors
                    group-hover:text-[#8B1E1E]
                    dark:text-white
                    dark:group-hover:text-amber-400
                  "
                >
                  {indicator.value}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
