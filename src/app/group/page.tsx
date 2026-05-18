"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search, ChevronLeft, ChevronRight, LayoutGrid,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import FooterSection from "@/sections/homepage/footer-section";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Group {
  id: string;
  title: string;
  description: string;
  datasetCount: number;
  slug: string;
  /** Tailwind color classes for the aura glow behind the logo */
  auraFrom: string;
  auraTo: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const GROUP_DATA: Group[] = [
  {
    id: "1",
    title: "Pemberdayaan Masyarakat dan Desa",
    description: "Data pembangunan desa, gampong, dan pemberdayaan komunitas lokal di seluruh wilayah Aceh.",
    datasetCount: 234,
    slug: "pemberdayaan-masyarakat-desa",
    auraFrom: "rgba(59,130,246,0.35)",
    auraTo: "rgba(59,130,246,0)",
  },
  {
    id: "2",
    title: "Pertanian",
    description: "Data produksi tanaman pangan, perkebunan, hortikultura, dan ketahanan pangan Aceh.",
    datasetCount: 212,
    slug: "pertanian",
    auraFrom: "rgba(34,197,94,0.35)",
    auraTo: "rgba(34,197,94,0)",
  },
  {
    id: "3",
    title: "Pendidikan",
    description: "Data sekolah, angka partisipasi, tenaga pendidik, dan capaian literasi Provinsi Aceh.",
    datasetCount: 188,
    slug: "pendidikan",
    auraFrom: "rgba(245,158,11,0.35)",
    auraTo: "rgba(245,158,11,0)",
  },
  {
    id: "4",
    title: "Kesehatan",
    description: "Data fasilitas kesehatan, tenaga medis, penyakit, dan indikator kesehatan masyarakat.",
    datasetCount: 128,
    slug: "kesehatan",
    auraFrom: "rgba(239,68,68,0.35)",
    auraTo: "rgba(239,68,68,0)",
  },
  {
    id: "5",
    title: "Sosial",
    description: "Data kemiskinan, perlindungan sosial, penyandang disabilitas, dan kesejahteraan warga.",
    datasetCount: 138,
    slug: "sosial",
    auraFrom: "rgba(168,85,247,0.35)",
    auraTo: "rgba(168,85,247,0)",
  },
  {
    id: "6",
    title: "Statistik",
    description: "Data statistik dasar, sensus, survei, dan indikator makro pembangunan Aceh.",
    datasetCount: 104,
    slug: "statistik",
    auraFrom: "rgba(14,165,233,0.35)",
    auraTo: "rgba(14,165,233,0)",
  },
  {
    id: "7",
    title: "Lingkungan Hidup",
    description: "Data kualitas udara, air, kehutanan, keanekaragaman hayati, dan perubahan iklim.",
    datasetCount: 93,
    slug: "lingkungan-hidup",
    auraFrom: "rgba(20,184,166,0.35)",
    auraTo: "rgba(20,184,166,0)",
  },
  {
    id: "8",
    title: "Portal Data BPS",
    description: "Data resmi Badan Pusat Statistik Aceh mencakup berbagai indikator ekonomi dan sosial.",
    datasetCount: 80,
    slug: "portal-data-bps",
    auraFrom: "rgba(249,115,22,0.35)",
    auraTo: "rgba(249,115,22,0)",
  },
  {
    id: "9",
    title: "Pekerjaan Umum dan Penataan Ruang",
    description: "Data infrastruktur jalan, jembatan, irigasi, tata ruang, dan permukiman Aceh.",
    datasetCount: 84,
    slug: "pekerjaan-umum",
    auraFrom: "rgba(234,179,8,0.35)",
    auraTo: "rgba(234,179,8,0)",
  },
  {
    id: "10",
    title: "Kekhususan Aceh",
    description: "Data terkait syariat Islam, adat istiadat, keistimewaan, dan identitas budaya Aceh.",
    datasetCount: 72,
    slug: "kekhususan-aceh",
    auraFrom: "rgba(139,30,30,0.45)",
    auraTo: "rgba(139,30,30,0)",
  },
];

const PER_PAGE = 12;

// ─── Animation variants ───────────────────────────────────────────────────────

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -8,
    transition: { duration: 0.18 },
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
    <nav
      className="flex items-center justify-center gap-1.5 pt-8"
      aria-label="Navigasi halaman"
    >
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

// ─── Group Card ───────────────────────────────────────────────────────────────

function GroupCard({ group }: { group: Group }) {
  return (
    <motion.div variants={cardVariants} layout>
      <Link
        href={`/group/${group.slug}`}
        className="
          group relative flex h-full flex-col overflow-hidden rounded-3xl border p-6
          transition-all duration-300
          bg-white/80 border-zinc-200/80 shadow-sm
          hover:-translate-y-2 hover:border-amber-500/50
          hover:shadow-[0_0_40px_rgba(185,28,28,0.10)]
          dark:bg-black/40 dark:border-white/8 dark:backdrop-blur-xl
          dark:hover:border-amber-500/40
          dark:hover:shadow-[0_0_40px_rgba(245,158,11,0.12)]
        "
        aria-label={`${group.title} — ${group.datasetCount} dataset`}
      >
        {/* ── Hover glow overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(245,158,11,0.05) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* ── Logo container with per-card aura ── */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Aura glow — unique per card */}
          <div
            className="absolute h-24 w-24 rounded-full blur-2xl transition-all duration-500 group-hover:scale-125 group-hover:blur-3xl"
            style={{
              background: `radial-gradient(circle, ${group.auraFrom} 0%, ${group.auraTo} 70%)`,
            }}
            aria-hidden="true"
          />

          {/* Logo circle */}
          <div
            className="
              relative z-10 flex h-20 w-20 items-center justify-center rounded-full
              border border-white/20 bg-white/60 shadow-md
              transition-transform duration-300 group-hover:scale-110
              dark:border-white/10 dark:bg-white/8
            "
          >
            <Image
              src="/Pancacita.svg"
              alt={`Ikon kategori ${group.title}`}
              width={44}
              height={44}
              className="object-contain drop-shadow-sm"
            />
          </div>
        </div>

        {/* ── Text content ── */}
        <div className="flex flex-1 flex-col gap-2">
          <h3
            className="
              text-base font-bold leading-snug
              text-zinc-900 dark:text-zinc-100
              transition-colors group-hover:text-[#8B1E1E] dark:group-hover:text-amber-400
            "
          >
            {group.title}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {group.description}
          </p>
        </div>

        {/* ── Dataset counter ── */}
        <div className="mt-5 flex items-center justify-between border-t border-zinc-100 dark:border-white/6 pt-4">
          <span className="text-xs text-zinc-400 dark:text-zinc-500">Total Dataset</span>
          <span
            className="
              text-lg font-extrabold tabular-nums
              bg-gradient-to-r from-[#8B1E1E] to-[#D4AF37]
              bg-clip-text text-transparent
              dark:from-amber-400 dark:to-yellow-300
            "
          >
            {group.datasetCount.toLocaleString("id-ID")}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GroupPage() {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = useMemo(
    () =>
      GROUP_DATA.filter(
        (g) =>
          g.title.toLowerCase().includes(query.toLowerCase()) ||
          g.description.toLowerCase().includes(query.toLowerCase())
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
        {/* Ambient glow — dark mode */}
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
            <span className="font-medium text-zinc-600 dark:text-zinc-300">Kategori</span>
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
              Jelajahi Data{" "}
              <span className="bg-gradient-to-r from-[#8B1E1E] via-[#C0392B] to-[#D4AF37] bg-clip-text text-transparent dark:from-amber-300 dark:via-yellow-200 dark:to-amber-400">
                Berdasarkan Kategori
              </span>
            </motion.h1>

            <motion.p
              className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 md:text-base"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Temukan kumpulan data yang dikelompokkan berdasarkan sektor pembangunan
              untuk mempermudah analisis dan pencarian informasi.
            </motion.p>

            {/* Search bar */}
            <motion.div
              className="mt-6 max-w-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Cari kategori dataset..."
                  className="
                    w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none
                    border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 shadow-sm
                    focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20
                    focus:shadow-[0_0_0_3px_rgba(245,158,11,0.08)]
                    dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:placeholder-zinc-500
                    dark:focus:border-amber-500/50 dark:focus:ring-amber-500/15
                    transition-all duration-200
                  "
                  aria-label="Cari kategori"
                />
              </div>
            </motion.div>
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
            <div className="absolute inset-0 bg-gradient-to-r from-[#F8F6F1] via-transparent to-[#F8F6F1] dark:from-[#0D0D0D] dark:to-[#0D0D0D]" />
          </motion.div>

          {/* ── Stats row ── */}
          <motion.div
            className="mb-6 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <LayoutGrid className="h-4 w-4 text-[#8B1E1E] dark:text-amber-500" />
            <span>
              Menampilkan{" "}
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {filtered.length}
              </span>{" "}
              kategori
            </span>
          </motion.div>

          {/* ── Grid ── */}
          <AnimatePresence mode="wait">
            {paginated.length > 0 ? (
              <motion.div
                key={query + currentPage}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {paginated.map((group) => (
                  <GroupCard key={group.id} group={group} />
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
                <LayoutGrid className="mb-3 h-10 w-10 text-zinc-300 dark:text-zinc-600" />
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Kategori tidak ditemukan
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
