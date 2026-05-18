"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NewsItem {
  id: string;
  title: string;
  snippet: string;
  date: string;
  image: string;
  href: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NEWS_DATA: NewsItem[] = [
  {
    id: "1",
    title: "Dashboard Informasi Perkembangan Bencana Alam di Provinsi Aceh",
    snippet:
      "Pemerintah Aceh meluncurkan dashboard pemantauan bencana alam secara real-time yang terintegrasi dengan data BPBA untuk mendukung respons cepat.",
    date: "20 Januari 2026",
    image: "/berita/berita-1.jpeg",
    href: "/berita/1",
  },
  {
    id: "2",
    title: "Diskominsa Aceh dan Skala Merumuskan Metadata SPM untuk Integrasi Data Nasional",
    snippet:
      "Kolaborasi strategis antara Diskominsa Aceh dan Skala menghasilkan standar metadata SPM yang selaras dengan kerangka Satu Data Indonesia.",
    date: "20 Januari 2026",
    image: "/berita/berita-2.jpeg",
    href: "/berita/2",
  },
  {
    id: "3",
    title: "Diskominsa Aceh Gelar Pengenalan Satu Data Aceh kepada Seluruh SKPA",
    snippet:
      "Sosialisasi intensif dilakukan kepada seluruh Satuan Kerja Perangkat Aceh guna mempercepat adopsi platform Satu Data Aceh di tingkat dinas.",
    date: "20 Januari 2026",
    image: "/berita/berita-3.jpeg",
    href: "/berita/3",
  },
  {
    id: "4",
    title: "Diskominsa Aceh Kunker Ke BAPPENAS terkait DTSEN dan Integrasi Data Pusat",
    snippet:
      "Kunjungan kerja ke BAPPENAS membahas sinkronisasi Data Terpadu Sosial Ekonomi Nasional dengan sistem pengelolaan data daerah Provinsi Aceh.",
    date: "20 Januari 2026",
    image: "/berita/berita-4.jpeg",
    href: "/berita/4",
  },
  {
    id: "5",
    title: "Diskominsa Berkoordinasi Gerak Cepat Penyusunan Rencana Aksi Satu Data",
    snippet:
      "Rapat koordinasi lintas instansi menghasilkan peta jalan percepatan penyusunan rencana aksi implementasi Satu Data Aceh tahun 2026.",
    date: "20 Januari 2026",
    image: "/berita/berita-5.jpg",
    href: "/berita/5",
  },
  {
    id: "6",
    title: "Diskominsa dan BAPPEDA Bahas Renaksi Satu Data Aceh",
    snippet:
      "Forum pembahasan bersama BAPPEDA menghasilkan kesepakatan teknis terkait jadwal, indikator, dan mekanisme pelaporan rencana aksi Satu Data Aceh.",
    date: "20 Januari 2026",
    image: "/berita/berita-6.jpg",
    href: "/berita/6",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── News Card ────────────────────────────────────────────────────────────────

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <motion.article variants={cardVariants}>
      <Link
        href={item.href}
        className="
          group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border
          transition-all duration-300
          bg-white border-zinc-200/80 shadow-sm
          hover:-translate-y-2 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/8
          dark:bg-black/20 dark:border-white/10 dark:backdrop-blur-md
          dark:hover:border-amber-500/40 dark:hover:shadow-amber-500/10
        "
        aria-label={item.title}
      >
        {/* ── Image ── */}
        <div className="relative h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Graceful fallback if image missing
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          {/* Gradient overlay on image */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
        </div>

        {/* ── Content ── */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          {/* Metadata row */}
          <div className="flex items-center gap-2.5">
            <span
              className="
                inline-flex items-center rounded-full px-2.5 py-0.5
                text-[10px] font-bold uppercase tracking-wider
                bg-teal-500/15 text-teal-600 border border-teal-500/30
                dark:bg-teal-500/15 dark:text-teal-400 dark:border-teal-500/25
              "
            >
              NEWS
            </span>
            <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
              <CalendarDays className="h-3 w-3" />
              {item.date}
            </span>
          </div>

          {/* Title */}
          <h3
            className="
              line-clamp-2 text-base font-bold leading-snug
              text-zinc-900 dark:text-zinc-100
              transition-colors group-hover:text-[#8B1E1E] dark:group-hover:text-amber-400
            "
          >
            {item.title}
          </h3>

          {/* Snippet */}
          <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {item.snippet}
          </p>

          {/* Read more */}
          <div className="mt-auto flex items-center gap-1 pt-1 text-xs font-medium text-[#8B1E1E] dark:text-amber-400 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5">
            Baca selengkapnya
            <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

/**
 * News Section — Informasi Terbaru
 * Diletakkan tepat sebelum InsightsSection dan Footer.
 * 2 baris × 3 kolom di desktop, responsif ke 1 kolom di mobile.
 */
export default function NewsSection() {
  return (
    <section
      className="relative w-full overflow-hidden py-20"
      aria-labelledby="news-heading"
    >
      {/* Subtle grid texture */}
      <div
        className="animated-grid pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      {/* Ambient glow — dark mode */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-0 dark:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(139,30,30,0.12) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-10 text-center">
          <motion.p
            className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8B1E1E]/70 dark:text-amber-500/60"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            Satu Data Aceh
          </motion.p>

          <motion.h2
            id="news-heading"
            className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Informasi{" "}
            <span className="bg-gradient-to-r from-[#8B1E1E] via-[#C0392B] to-[#D4AF37] bg-clip-text text-transparent dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400">
              Terbaru
            </span>
          </motion.h2>

          <motion.p
            className="mx-auto mt-3 max-w-xl text-sm text-zinc-500 dark:text-zinc-400 md:text-base"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Berita dan pembaruan terkini seputar pengelolaan data dan program
            Satu Data Provinsi Aceh.
          </motion.p>

          {/* Gold rule */}
          <motion.div
            className="mx-auto mt-5 h-px w-16 bg-gradient-to-r from-transparent via-[#8B1E1E]/40 to-transparent dark:via-amber-500/40"
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
          />
        </div>

        {/* ── News grid ── */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {NEWS_DATA.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* ── CTA button ── */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/berita"
            className="
              group inline-flex items-center gap-2 rounded-full border px-6 py-3
              text-sm font-medium transition-all duration-300
              border-amber-500 text-amber-600
              hover:bg-amber-500 hover:text-white hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]
              dark:text-amber-400 dark:hover:text-black
            "
          >
            Lihat Semua Berita
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
