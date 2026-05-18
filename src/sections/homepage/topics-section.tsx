"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import {
  TrendingUp,
  BookOpen,
  HeartPulse,
  Building2,
  Users,
  Leaf,
  ArrowRight,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const topicsData = [
  {
    title: "Ekonomi",
    icon: TrendingUp,
    description: "PDRB, inflasi, dan keuangan daerah",
    href: "/dataset?category=ekonomi",
    accent: "#F59E0B",
  },
  {
    title: "Pendidikan",
    icon: BookOpen,
    description: "Sekolah, siswa, dan tenaga pendidik",
    href: "/dataset?category=pendidikan",
    accent: "#60A5FA",
  },
  {
    title: "Kesehatan",
    icon: HeartPulse,
    description: "Fasilitas dan layanan kesehatan",
    href: "/dataset?category=kesehatan",
    accent: "#F87171",
  },
  {
    title: "Infrastruktur",
    icon: Building2,
    description: "Jalan, jembatan, dan bangunan",
    href: "/dataset?category=infrastruktur",
    accent: "#A78BFA",
  },
  {
    title: "Sosial",
    icon: Users,
    description: "Demografi dan kesejahteraan",
    href: "/dataset?category=sosial",
    accent: "#34D399",
  },
  {
    title: "Lingkungan",
    icon: Leaf,
    description: "Sumber daya alam dan ekologi",
    href: "/dataset?category=lingkungan",
    accent: "#4ADE80",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const dividerVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 0.6,
    scaleX: 1,
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
  },
};

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function TopicsSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-labelledby="topics-heading"
      style={{ backgroundColor: "#1A0509" }}
    >

      {/* ── Top batik divider — 2 images side by side, fixed height ── */}
      <motion.div
        className="flex w-full overflow-hidden"
        style={{ height: "74px" }}
        variants={dividerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        aria-hidden="true"
      >
        <img
          src="/batik-garis.png"
          alt=""
          draggable={false}
          className="h-full w-1/2 select-none object-cover opacity-70"
          style={{ mixBlendMode: "screen" }}
        />
        <img
          src="/batik-garis.png"
          alt=""
          draggable={false}
          className="h-full w-1/2 select-none object-cover opacity-70"
          style={{ mixBlendMode: "screen" }}
        />
      </motion.div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">

        {/* Section heading */}
        <motion.div
          className="mb-12 flex flex-col items-center gap-4 text-center"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span
              className="h-px w-8"
              style={{
                background: "linear-gradient(to right, transparent, rgba(245,158,11,0.6))",
              }}
              aria-hidden="true"
            />
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-400/70">
              Topik Data Sektoral
            </span>
            <span
              className="h-px w-8"
              style={{
                background: "linear-gradient(to left, transparent, rgba(245,158,11,0.6))",
              }}
              aria-hidden="true"
            />
          </div>

          {/* Title */}
          <h2
            id="topics-heading"
            className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            Jelajahi Berdasarkan{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #FDE68A 50%, #F59E0B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Kategori
            </span>
          </h2>

          {/* Subtitle */}
          <p className="max-w-xl text-sm leading-relaxed text-white/45 sm:text-base">
            Temukan dataset yang relevan dari berbagai sektor pembangunan Provinsi Aceh.
          </p>

          {/* Gold underline */}
          <div
            className="h-px w-16 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, #F59E0B, transparent)",
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-5"
          role="list"
          aria-label="Kategori topik data"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {topicsData.map((topic) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={topic.title}
                variants={cardVariants}
                role="listitem"
              >
                <Link
                  href={topic.href}
                  aria-label={`Topik ${topic.title}`}
                  className="group relative flex flex-col items-center justify-center rounded-2xl p-6 text-center outline-none transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/50 focus-visible:ring-2 focus-visible:ring-amber-400"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.10)",
                  }}
                >
                  {/* Hover glow overlay */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      border: `1px solid ${topic.accent}55`,
                      boxShadow: `0 0 20px ${topic.accent}15`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <div
                    className="relative mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${topic.accent}18`,
                      border: `1px solid ${topic.accent}30`,
                    }}
                  >
                    {/* Icon glow */}
                    <span
                      className="absolute inset-0 rounded-xl opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-50"
                      style={{ background: topic.accent }}
                      aria-hidden="true"
                    />
                    <Icon
                      className="relative h-5 w-5"
                      style={{ color: topic.accent }}
                    />
                  </div>

                  {/* Label */}
                  <p className="text-sm font-semibold text-white/90 transition-colors duration-200 group-hover:text-white">
                    {topic.title}
                  </p>

                  {/* Description */}
                  <p className="mt-1 text-[11px] leading-relaxed text-white/35 transition-colors duration-200 group-hover:text-white/55">
                    {topic.description}
                  </p>

                  {/* Bottom accent line */}
                  <span
                    className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-hover:w-2/3"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${topic.accent}80, transparent)`,
                    }}
                    aria-hidden="true"
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 flex justify-center"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Link
            href="/dataset"
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-amber-500/30 hover:bg-white/8 hover:text-amber-300"
          >
            Lihat semua topik
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* ── Bottom batik divider — 2 images side by side, fixed height ── */}
      <motion.div
        className="flex w-full overflow-hidden"
        style={{ height: "74px" }}
        variants={dividerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        aria-hidden="true"
      >
        <img
          src="/batik-garis.png"
          alt=""
          draggable={false}
          className="h-full w-1/2 select-none object-cover opacity-70"
          style={{ mixBlendMode: "screen" }}
        />
        <img
          src="/batik-garis.png"
          alt=""
          draggable={false}
          className="h-full w-1/2 select-none object-cover opacity-70"
          style={{ mixBlendMode: "screen" }}
        />
      </motion.div>

    </section>
  );
}
