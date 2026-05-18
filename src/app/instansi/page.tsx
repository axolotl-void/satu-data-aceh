"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search, Database, ArrowRight,
  ChevronLeft, ChevronRight, Building2,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import FooterSection from "@/sections/homepage/footer-section";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Instansi {
  id: string;
  shortName: string;
  fullName: string;
  initials: string;
  datasetCount: number;
  category: string;
  color: string;       // Tailwind bg class for initials badge
  textColor: string;   // Tailwind text class for initials badge
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const INSTANSI_DATA: Instansi[] = [
  {
    id: "1",
    shortName: "Dinas Sosial",
    fullName: "Dinas Sosial Aceh",
    initials: "DINSOS",
    datasetCount: 382,
    category: "Sosial & Kesejahteraan",
    color: "bg-rose-500/15 dark:bg-rose-500/20",
    textColor: "text-rose-600 dark:text-rose-400",
  },
  {
    id: "2",
    shortName: "Dinas Pendidikan",
    fullName: "Dinas Pendidikan Aceh",
    initials: "DISDIK",
    datasetCount: 374,
    category: "Pendidikan",
    color: "bg-blue-500/15 dark:bg-blue-500/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    id: "3",
    shortName: "DPMG",
    fullName: "Dinas Pemberdayaan Masyarakat dan Gampong",
    initials: "DPMG",
    datasetCount: 372,
    category: "Pemberdayaan Masyarakat",
    color: "bg-emerald-500/15 dark:bg-emerald-500/20",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  {
    id: "4",
    shortName: "Distanbun",
    fullName: "Dinas Pertanian dan Perkebunan",
    initials: "DISTANBUN",
    datasetCount: 352,
    category: "Pertanian & Perkebunan",
    color: "bg-lime-500/15 dark:bg-lime-500/20",
    textColor: "text-lime-600 dark:text-lime-400",
  },
  {
    id: "5",
    shortName: "Dinas Pengairan",
    fullName: "Dinas Pengairan Aceh",
    initials: "PENGAIRAN",
    datasetCount: 309,
    category: "Infrastruktur & SDA",
    color: "bg-cyan-500/15 dark:bg-cyan-500/20",
    textColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    id: "6",
    shortName: "Dinas Kesehatan",
    fullName: "Dinas Kesehatan Aceh",
    initials: "DINKES",
    datasetCount: 280,
    category: "Kesehatan",
    color: "bg-teal-500/15 dark:bg-teal-500/20",
    textColor: "text-teal-600 dark:text-teal-400",
  },
  {
    id: "7",
    shortName: "DLHK",
    fullName: "Dinas Lingkungan Hidup dan Kehutanan",
    initials: "DLHK",
    datasetCount: 236,
    category: "Lingkungan & Kehutanan",
    color: "bg-green-500/15 dark:bg-green-500/20",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    id: "8",
    shortName: "Dishub",
    fullName: "Dinas Perhubungan Aceh",
    initials: "DISHUB",
    datasetCount: 200,
    category: "Transportasi",
    color: "bg-sky-500/15 dark:bg-sky-500/20",
    textColor: "text-sky-600 dark:text-sky-400",
  },
  {
    id: "9",
    shortName: "DP3A",
    fullName: "Dinas Pemberdayaan Perempuan dan Perlindungan Anak",
    initials: "DP3A",
    datasetCount: 189,
    category: "Pemberdayaan Perempuan",
    color: "bg-pink-500/15 dark:bg-pink-500/20",
    textColor: "text-pink-600 dark:text-pink-400",
  },
  {
    id: "10",
    shortName: "BPBA",
    fullName: "Badan Penanggulangan Bencana Aceh",
    initials: "BPBA",
    datasetCount: 183,
    category: "Kebencanaan",
    color: "bg-orange-500/15 dark:bg-orange-500/20",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  {
    id: "11",
    shortName: "DRKA",
    fullName: "Dinas Registrasi Kependudukan Aceh",
    initials: "DRKA",
    datasetCount: 178,
    category: "Kependudukan",
    color: "bg-violet-500/15 dark:bg-violet-500/20",
    textColor: "text-violet-600 dark:text-violet-400",
  },
  {
    id: "12",
    shortName: "Diskominfo",
    fullName: "Dinas Komunikasi, Informatika dan Persandian",
    initials: "DISKOMINFO",
    datasetCount: 150,
    category: "Komunikasi & Informatika",
    color: "bg-indigo-500/15 dark:bg-indigo-500/20",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
];

const PER_PAGE = 12;

// ─── Animation variants ───────────────────────────────────────────────────────

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(4px)",
    transition: { duration: 0.2 },
  },
};

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  if (total <= 1) return null;
  return (
    <nav className="flex items-center justify-center gap-1.5 pt-6" aria-label="Navigasi halaman">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Halaman sebelumnya"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === current ? "page" : undefined}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition-all duration-200",
            p === current
              ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-[0_0_14px_rgba(245,158,11,0.25)]"
              : "border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:border-amber-500/40 hover:text-amber-600 dark:hover:text-amber-400"
          )}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        aria-label="Halaman berikutnya"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}

// ─── Instansi Card ────────────────────────────────────────────────────────────

function InstansiCard({ instansi }: { instansi: Instansi }) {
  return (
    <motion.div variants={cardVariants} layout>
      <Link
        href={`/instansi/${instansi.id}`}
        className="
          group relative flex flex-col overflow-hidden rounded-2xl border p-6
          transition-all duration-300
          bg-white/80 border-zinc-200/80 shadow-sm
          hover:scale-[1.02] hover:border-amber-500/50
          hover:shadow-[0_8px_40px_rgba(245,158,11,0.12)]
          dark:bg-black/40 dark:border-white/8 dark:backdrop-blur-md
          dark:hover:border-amber-500/40
          dark:hover:shadow-[0_8px_40px_rgba(245,158,11,0.15)]
        "
        aria-label={`${instansi.fullName} — ${instansi.datasetCount} dataset`}
      >
        {/* Hover glow overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.06) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Top row: initials badge + arrow */}
        <div className="mb-5 flex items-start justify-between">
          {/* Initials badge */}
          <div
            className={cn(
              "flex items-center justify-center rounded-xl px-3 py-2 transition-transform duration-300 group-hover:scale-105",
              instansi.color
            )}
          >
            <span
              className={cn(
                "font-mono text-xs font-extrabold tracking-widest uppercase",
                instansi.textColor
              )}
            >
              {instansi.initials}
            </span>
          </div>

          {/* Arrow icon */}
          <ArrowRight
            className="h-4 w-4 text-zinc-300 dark:text-zinc-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-500"
          />
        </div>

        {/* Name & category */}
        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="text-sm font-bold leading-snug text-zinc-900 dark:text-zinc-100 transition-colors group-hover:text-[#8B1E1E] dark:group-hover:text-amber-400 line-clamp-2">
            {instansi.fullName}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            {instansi.category}
          </p>
        </div>

        {/* Bottom: dataset counter */}
        <div className="mt-5 flex items-center justify-between border-t border-zinc-100 dark:border-white/6 pt-4">
          <span className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500">
            <Database className="h-3.5 w-3.5" />
            Dataset tersedia
          </span>
          <span
            className="
              inline-flex items-center rounded-lg border px-2.5 py-1
              text-sm font-bold tabular-nums
              border-amber-500/30 bg-amber-500/10 text-amber-600
              dark:border-amber-500/25 dark:bg-amber-500/10 dark:text-amber-400
            "
          >
            {instansi.datasetCount.toLocaleString("id-ID")}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function InstansiPage() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () =>
      INSTANSI_DATA.filter(
        (d) =>
          d.fullName.toLowerCase().includes(query.toLowerCase()) ||
          d.shortName.toLowerCase().includes(query.toLowerCase()) ||
          d.category.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const handleSearch = (val: string) => {
    setQuery(val);
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="min-h-screen pt-20 bg-[#F8F6F1] dark:bg-[#0D0D0D]"
      >
        {/* ── Ambient glow — dark mode ── */}
        <div
          className="pointer-events-none fixed inset-x-0 top-0 h-[500px] opacity-0 dark:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(139,30,30,0.15) 0%, transparent 100%)",
            zIndex: 0,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          {/* ── Breadcrumb ── */}
          <motion.nav
            className="mb-8 flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500"
            aria-label="Breadcrumb"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link href="/" className="hover:text-[#8B1E1E] dark:hover:text-amber-400 transition-colors">
              Beranda
            </Link>
            <span>/</span>
            <span className="font-medium text-zinc-600 dark:text-zinc-300">Instansi</span>
          </motion.nav>

          {/* ── Header ── */}
          <div className="mb-10">
            <motion.p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B1E1E]/70 dark:text-amber-500/60"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              Satu Data Aceh
            </motion.p>
            <motion.h1
              className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              Produsen Data{" "}
              <span
                className="bg-gradient-to-r from-[#8B1E1E] via-[#C0392B] to-[#D4AF37] bg-clip-text text-transparent dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400"
              >
                Provinsi Aceh
              </span>
            </motion.h1>
            <motion.p
              className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-base"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Daftar Satuan Kerja Perangkat Aceh (SKPA) yang berkontribusi dalam
              menyediakan data sektoral yang akurat dan terintegrasi.
            </motion.p>
          </div>

          {/* ── Batik divider ── */}
          <motion.div
            className="relative mb-10 h-8 w-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            aria-hidden="true"
          >
            <Image
              src="/batik-garis.png"
              alt=""
              fill
              className="object-cover object-center opacity-30 dark:opacity-20"
              sizes="100vw"
            />
            {/* Fade edges */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F1] via-transparent to-[#F8F6F1] dark:from-[#0D0D0D] dark:to-[#0D0D0D]" />
          </motion.div>

          {/* ── Search + stats row ── */}
          <motion.div
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
              <input
                type="search"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Cari instansi atau kategori..."
                className="
                  w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none
                  border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400
                  shadow-sm
                  focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20
                  focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)]
                  dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:placeholder-zinc-500
                  dark:focus:border-amber-500/50 dark:focus:ring-amber-500/15
                  transition-all duration-200
                "
                aria-label="Cari instansi"
              />
            </div>

            {/* Stats */}
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <Building2 className="h-4 w-4 text-[#8B1E1E] dark:text-amber-500" />
              <span>
                Menampilkan{" "}
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {filtered.length}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {INSTANSI_DATA.length}
                </span>{" "}
                instansi
              </span>
            </div>
          </motion.div>

          {/* ── Grid ── */}
          <AnimatePresence mode="wait">
            {paginated.length > 0 ? (
              <motion.div
                key={query + currentPage}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {paginated.map((instansi) => (
                  <InstansiCard key={instansi.id} instansi={instansi} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 dark:border-white/10 py-24 text-center"
              >
                <Building2 className="mb-3 h-10 w-10 text-zinc-300 dark:text-zinc-600" />
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Instansi tidak ditemukan
                </p>
                <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                  Coba kata kunci lain
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Pagination ── */}
          <Pagination
            current={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        </div>
      </main>

      <FooterSection />
    </>
  );
}
