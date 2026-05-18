"use client";

import { motion, type Variants } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/layout/container";

/**
 * Vision & Mission Section — Visi & Misi Satu Data Aceh
 * Tab-based layout: Visi | Misi
 * Mendukung light mode & dark mode.
 */

// ─── Data ─────────────────────────────────────────────────────────────────────

/** 4 pilar visi — ditampilkan sebagai kata kunci besar bergradasi */
const VISI_PILLARS = [
  { word: "Islami",        delay: 0.1  },
  { word: "Maju",          delay: 0.25 },
  { word: "Bermartabat",   delay: 0.4  },
  { word: "Berkelanjutan", delay: 0.55 },
];

const MISI: string[] = [
  "Meningkatkan ketersediaan Data dan Informasi Aceh yang akurat dan dapat dipertanggungjawabkan.",
  "Meningkatkan Ketersediaan Data dan Informasi Aceh secara berkesinambungan.",
  "Mewujudkan Data dan Informasi Aceh yang Mutakhir.",
  "Mewujudkan Data dan Informasi Aceh yang terpadu.",
  "Mewujudkan Data dan Informasi Aceh yang dapat diakses oleh publik.",
  "Mendorong setiap instansi pemerintah daerah untuk menyelenggarakan kegiatan pengumpulan dan pengelolaan Data dan Informasi Aceh sesuai pedoman yang telah ditetapkan.",
  "Mengembangkan SDM yang berkompeten dalam penyelenggaraan Data dan Informasi Aceh.",
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const visiVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

/** Animasi per-pilar: slide dari bawah + blur */
const pillarVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Container stagger untuk pilar */
const pillarContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Kartu satu poin misi */
function MisiCard({ text, index }: { text: string; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      variants={cardVariants}
      className="
        group relative flex flex-col overflow-hidden rounded-2xl p-5 md:p-6
        transition-all duration-300
        /* Light mode */
        border border-[#8B1E1E]/15 bg-white/80 shadow-sm
        hover:-translate-y-2 hover:border-[#8B1E1E]/40
        hover:shadow-[0_0_30px_rgba(139,30,30,0.12)]
        /* Dark mode */
        dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-md
        dark:hover:border-amber-500/50
        dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]
      "
    >
      {/* Nomor dekoratif di latar belakang */}
      <span
        className="
          pointer-events-none absolute -bottom-4 -right-4 select-none
          text-6xl font-bold leading-none
          text-[#8B1E1E]/8 transition-colors
          group-hover:text-[#8B1E1E]/15
          dark:text-white/5 dark:group-hover:text-amber-500/10
        "
        aria-hidden="true"
      >
        {num}
      </span>

      {/* Nomor kecil di atas */}
      <span
        className="
          mb-3 inline-flex h-7 w-7 shrink-0 items-center justify-center
          rounded-lg text-xs font-bold
          bg-[#8B1E1E]/10 text-[#8B1E1E]
          dark:bg-amber-500/15 dark:text-amber-400
        "
      >
        {num}
      </span>

      {/* Teks misi */}
      <p
        className="
          relative z-10 text-sm leading-relaxed md:text-base
          text-[#3D2B1F]
          transition-colors group-hover:text-[#1A0509]
          dark:text-zinc-300 dark:group-hover:text-white
        "
      >
        {text}
      </p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VisionMissionSection() {
  const [activeTab, setActiveTab] = useState<"visi" | "misi">("visi");

  return (
    <section
      className="
        relative overflow-hidden py-20 md:py-28
        bg-[#F8F6F1]
        dark:bg-[#0D0D0D]
      "
      aria-labelledby="vision-mission-heading"
    >
      {/* Ambient glow — dark mode */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-96 opacity-0 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,30,30,0.18) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle grid texture */}
      <div
        className="animated-grid pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      <Container className="relative z-10">

        {/* ── Header ── */}
        <div className="mb-10 text-center">
          <motion.p
            className="
              mb-3 text-xs font-semibold uppercase tracking-[0.2em]
              text-[#8B1E1E]/70
              dark:text-amber-500/70
            "
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Satu Data Aceh
          </motion.p>
          <motion.h2
            id="vision-mission-heading"
            className="
              text-3xl font-bold md:text-4xl
              text-[#1A0509]
              dark:text-white
            "
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05 }}
          >
            Visi &amp; Misi
          </motion.h2>
          <motion.div
            className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[#8B1E1E]/50 to-transparent dark:via-amber-500/50"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          />
        </div>

        {/* ── Tab switcher ── */}
        <div className="mb-10 flex justify-center">
          <div
            className="
              inline-flex rounded-xl p-1
              bg-[#8B1E1E]/8 border border-[#8B1E1E]/15
              dark:bg-white/5 dark:border-white/10
            "
            role="tablist"
            aria-label="Pilih Visi atau Misi"
          >
            {(["visi", "misi"] as const).map((tab) => {
              const isActive = activeTab === tab;
              const Icon = tab === "visi" ? Eye : Target;
              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative inline-flex items-center gap-2 rounded-lg px-6 py-2.5
                    text-sm font-semibold capitalize transition-all duration-200
                    ${
                      isActive
                        ? "bg-[#8B1E1E] text-white shadow-md dark:bg-amber-500 dark:text-[#1A0509]"
                        : "text-[#5A4A3A] hover:text-[#8B1E1E] dark:text-zinc-400 dark:hover:text-amber-400"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  {tab === "visi" ? "Visi" : "Misi"}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Panel: Visi ── */}
        {activeTab === "visi" && (
          <motion.div
            id="panel-visi"
            role="tabpanel"
            aria-labelledby="tab-visi"
            key="visi"
            variants={visiVariants}
            initial="hidden"
            animate="visible"
            className="mx-auto max-w-4xl"
          >
            <div
              className="
                relative overflow-hidden rounded-3xl px-8 py-12 md:px-16 md:py-16 text-center
                border border-[#8B1E1E]/20 bg-white/90 shadow-xl
                dark:border-white/10 dark:bg-white/5 dark:backdrop-blur-md
              "
            >
              {/* Ambient glow blob — dark mode */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-100"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,30,30,0.12) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              {/* Decorative large quote — light */}
              <span
                className="pointer-events-none absolute -top-6 left-6 select-none font-serif text-[10rem] leading-none text-[#8B1E1E]/6 dark:text-amber-500/6"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Eyebrow label */}
              <motion.p
                className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#8B1E1E]/60 dark:text-amber-500/60"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                Visi Provinsi Aceh
              </motion.p>

              {/* Intro text */}
              <motion.p
                className="mb-8 text-sm text-[#5A4A3A]/70 dark:text-zinc-500 tracking-wide"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Aceh
              </motion.p>

              {/* ── 4 Pilar Visi — kata kunci besar ── */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:gap-x-5"
                variants={pillarContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {VISI_PILLARS.map(({ word }, i) => (
                  <motion.span
                    key={word}
                    variants={pillarVariants}
                    className="relative inline-block"
                  >
                    {/* Kata kunci utama */}
                    <span
                      className="
                        block text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl
                        bg-gradient-to-br from-[#8B1E1E] via-[#C0392B] to-[#8B1E1E]
                        bg-clip-text text-transparent
                        dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400
                      "
                      style={{ lineHeight: 1.15 }}
                    >
                      {word}
                    </span>

                    {/* Underline aksen */}
                    <motion.span
                      className="
                        absolute -bottom-1 left-0 h-[3px] w-full rounded-full
                        bg-gradient-to-r from-[#8B1E1E]/60 to-[#D4AF37]/60
                        dark:from-amber-500/70 dark:to-yellow-300/50
                      "
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.35 + i * 0.15, ease: "easeOut" }}
                    />
                  </motion.span>
                ))}
              </motion.div>

              {/* Separator dots */}
              <motion.div
                className="mt-10 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className={`rounded-full bg-[#8B1E1E]/30 dark:bg-amber-500/30 ${i === 1 ? "h-2 w-8" : "h-1.5 w-1.5"}`}
                  />
                ))}
              </motion.div>

              {/* Sub-caption */}
              <motion.p
                className="
                  mt-6 text-sm leading-relaxed md:text-base
                  text-[#5A4A3A]/80
                  dark:text-zinc-400
                "
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                Mewujudkan Aceh yang berlandaskan nilai-nilai Islam, unggul dalam
                pembangunan, menjunjung tinggi harkat dan martabat, serta
                berkomitmen pada keberlanjutan untuk generasi mendatang.
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* ── Panel: Misi ── */}
        {activeTab === "misi" && (
          <motion.div
            id="panel-misi"
            role="tabpanel"
            aria-labelledby="tab-misi"
            key="misi"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3 max-w-7xl mx-auto mt-8"
          >
            {MISI.map((text, i) => (
              <MisiCard key={i} text={text} index={i} />
            ))}
          </motion.div>
        )}

      </Container>
    </section>
  );
}
