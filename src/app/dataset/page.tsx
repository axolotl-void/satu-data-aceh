"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, SlidersHorizontal, Eye, CalendarDays,
  ChevronDown, ChevronLeft, ChevronRight, SlidersVertical, X,
  TrendingUp, Briefcase, Users, Plane, Fish, FileText,
  Building2, Scale, GraduationCap, ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import FooterSection from "@/sections/homepage/footer-section";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Dataset {
  id: string;
  title: string;
  organization: string;
  formats: string[];
  views: number;
  date: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

interface FilterGroup {
  label: string;
  key: string;
  icon: LucideIcon;
  items: { name: string; count: number }[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_DATASETS: Dataset[] = [
  {
    id: "1",
    title: "Indeks Transformasi Digital menurut Kabupaten/Kota",
    organization: "Dinas Komunikasi dan Informatika",
    formats: ["CSV", "XLS"],
    views: 2_841,
    date: "12 Apr 2025",
    icon: TrendingUp,
    iconColor: "text-blue-500 dark:text-blue-400",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/15",
  },
  {
    id: "2",
    title: "Dokumen Pemberkasan Administrasi Hasil Penyidikan atas Penerapan secara Aktif Operasional Sekretariat Bersama PPNS oleh Dinas Satpol PP",
    organization: "Dinas Satpol PP dan WH",
    formats: ["PDF"],
    views: 1_204,
    date: "03 Mar 2025",
    icon: Briefcase,
    iconColor: "text-orange-500 dark:text-orange-400",
    iconBg: "bg-orange-500/10 dark:bg-orange-500/15",
  },
  {
    id: "3",
    title: "Dukungan Operasional Sekretariat PPNS",
    organization: "Dinas Satpol PP dan WH",
    formats: ["PDF", "XLS"],
    views: 876,
    date: "18 Feb 2025",
    icon: Building2,
    iconColor: "text-violet-500 dark:text-violet-400",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/15",
  },
  {
    id: "4",
    title: "Persentase Penduduk Usia Kerja Terdampak Covid-19",
    organization: "Dinas Ketenagakerjaan",
    formats: ["CSV", "PDF", "XLS"],
    views: 5_312,
    date: "07 Jan 2025",
    icon: Users,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
  },
  {
    id: "5",
    title: "Dokumen Pemberkasan Administrasi Hasil Penyidikan atas Pelanggaran Perda",
    organization: "Dinas Satpol PP dan WH",
    formats: ["PDF"],
    views: 993,
    date: "22 Dec 2024",
    icon: Briefcase,
    iconColor: "text-orange-500 dark:text-orange-400",
    iconBg: "bg-orange-500/10 dark:bg-orange-500/15",
  },
  {
    id: "6",
    title: "Dokumen yang Memuat Penanganan Pelanggaran Qanun yang Bersifat Non Yustisi secara Berkala, Sah dan Legal",
    organization: "Dinas Syariat Islam",
    formats: ["PDF", "XLS"],
    views: 1_567,
    date: "15 Nov 2024",
    icon: Scale,
    iconColor: "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/15",
  },
  {
    id: "7",
    title: "Indeks Reformasi Birokrasi Pemerintah Aceh",
    organization: "Biro Organisasi Setda Aceh",
    formats: ["CSV", "PDF"],
    views: 3_088,
    date: "30 Oct 2024",
    icon: FileText,
    iconColor: "text-sky-500 dark:text-sky-400",
    iconBg: "bg-sky-500/10 dark:bg-sky-500/15",
  },
  {
    id: "8",
    title: "Kapasitas Angkut dan Jumlah yang Diangkut Melalui Bandar Udara Sultan Iskandar Muda",
    organization: "Dinas Perhubungan",
    formats: ["CSV", "XLS"],
    views: 4_720,
    date: "09 Oct 2024",
    icon: Plane,
    iconColor: "text-cyan-500 dark:text-cyan-400",
    iconBg: "bg-cyan-500/10 dark:bg-cyan-500/15",
  },
  {
    id: "9",
    title: "Angka Konsumsi Ikan",
    organization: "Dinas Kelautan dan Perikanan",
    formats: ["CSV", "PDF", "XLS"],
    views: 2_199,
    date: "25 Sep 2024",
    icon: Fish,
    iconColor: "text-teal-500 dark:text-teal-400",
    iconBg: "bg-teal-500/10 dark:bg-teal-500/15",
  },
  {
    id: "10",
    title: "Dokumen Pemberkasan Administrasi Hasil Penyidikan atas Perkara yang Dapat Disidangkan di Tempat",
    organization: "Dinas Satpol PP dan WH",
    formats: ["PDF"],
    views: 741,
    date: "14 Aug 2024",
    icon: Briefcase,
    iconColor: "text-orange-500 dark:text-orange-400",
    iconBg: "bg-orange-500/10 dark:bg-orange-500/15",
  },
  {
    id: "11",
    title: "Jumlah Koperasi meningkat kapasitas produksinya",
    organization: "Dinas Koperasi dan UKM",
    formats: ["CSV", "XLS"],
    views: 1_883,
    date: "02 Jul 2024",
    icon: GraduationCap,
    iconColor: "text-indigo-500 dark:text-indigo-400",
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/15",
  },
  {
    id: "12",
    title: "Pelanggaran Syariat Islam Berdasarkan Pekerjaan",
    organization: "Dinas Syariat Islam",
    formats: ["CSV", "PDF"],
    views: 3_456,
    date: "21 Jun 2024",
    icon: ShieldAlert,
    iconColor: "text-rose-500 dark:text-rose-400",
    iconBg: "bg-rose-500/10 dark:bg-rose-500/15",
  },
];

const FILTER_GROUPS: FilterGroup[] = [
  {
    label: "Organisasi",
    key: "org",
    icon: Building2,
    items: [
      { name: "Dinas Satpol PP dan WH", count: 135 },
      { name: "Dinas Syariat Islam", count: 120 },
      { name: "Dinas Ketenagakerjaan", count: 98 },
      { name: "Dinas Perhubungan", count: 87 },
    ],
  },
  {
    label: "Grup",
    key: "group",
    icon: FileText,
    items: [
      { name: "Pemerintahan", count: 120 },
      { name: "Ekonomi", count: 108 },
      { name: "Sosial", count: 95 },
      { name: "Infrastruktur", count: 72 },
    ],
  },
  {
    label: "Tag",
    key: "tag",
    icon: Search,
    items: [
      { name: "Banda Aceh", count: 115 },
      { name: "Lhokseumawe", count: 108 },
      { name: "Aceh Besar", count: 94 },
      { name: "Sabang", count: 61 },
    ],
  },
  {
    label: "Format",
    key: "format",
    icon: SlidersHorizontal,
    items: [
      { name: "CSV", count: 17 },
      { name: "PDF", count: 4 },
      { name: "XLS", count: 9 },
    ],
  },
  {
    label: "Lisensi",
    key: "license",
    icon: Scale,
    items: [
      { name: "Creative Commons", count: 42 },
      { name: "Open Government", count: 28 },
      { name: "Lisensi Lainnya", count: 0 },
    ],
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

// ─── Format Badge ─────────────────────────────────────────────────────────────

const FORMAT_STYLES: Record<string, string> = {
  CSV: "bg-amber-500/15 text-amber-600 border-amber-500/40 dark:text-amber-400",
  PDF: "bg-red-500/15 text-red-600 border-red-500/40 dark:text-red-400",
  XLS: "bg-emerald-500/15 text-emerald-600 border-emerald-500/40 dark:text-emerald-400",
};

function FormatBadge({ format }: { format: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-bold tracking-wide",
        FORMAT_STYLES[format] ?? "bg-zinc-500/15 text-zinc-500 border-zinc-500/30"
      )}
    >
      {format}
    </span>
  );
}

// ─── Filter Accordion ─────────────────────────────────────────────────────────

function FilterAccordion({
  group,
  activeFilters,
  onToggle,
}: {
  group: FilterGroup;
  activeFilters: Set<string>;
  onToggle: (key: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const GroupIcon = group.icon;

  return (
    <div className="border-b border-zinc-200/70 dark:border-white/8 pb-3 last:border-0 last:pb-0">
      {/* Accordion header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-2.5 transition-colors"
      >
        <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-400">
          <GroupIcon className="h-3.5 w-3.5 text-[#8B1E1E] dark:text-amber-500/70" />
          {group.label}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-zinc-400 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Accordion body */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
            role="list"
          >
            <li className="pt-1.5">
              <div className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const isActive = activeFilters.has(item.name);
                  return (
                    <button
                      key={item.name}
                      onClick={() => onToggle(item.name)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-sm transition-all duration-150 text-left",
                        isActive
                          ? "bg-amber-500/10 border border-amber-500/70 text-amber-600 dark:text-amber-400 font-medium"
                          : "border border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/80 dark:hover:bg-white/5 hover:text-zinc-900 dark:hover:text-zinc-200"
                      )}
                    >
                      <span className="truncate">{item.name}</span>
                      <span
                        className={cn(
                          "ml-2 shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium tabular-nums",
                          isActive
                            ? "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                            : "bg-zinc-100 dark:bg-white/8 text-zinc-400 dark:text-zinc-500"
                        )}
                      >
                        {item.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sidebar Content ──────────────────────────────────────────────────────────

function SidebarContent({
  activeFilters,
  onToggle,
  onClear,
}: {
  activeFilters: Set<string>;
  onToggle: (key: string) => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      {/* Header row */}
      <div className="mb-4 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm font-bold text-zinc-800 dark:text-zinc-100">
          <SlidersVertical className="h-4 w-4 text-[#8B1E1E] dark:text-amber-400" />
          Filter
        </span>
        {activeFilters.size > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 rounded-md px-2 py-1 text-xs text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors"
          >
            <X className="h-3 w-3" />
            Reset semua
          </button>
        )}
      </div>

      {/* Active filter pills */}
      <AnimatePresence>
        {activeFilters.size > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 flex flex-wrap gap-1.5 overflow-hidden"
          >
            {[...activeFilters].map((f) => (
              <button
                key={f}
                onClick={() => onToggle(f)}
                className="inline-flex items-center gap-1 rounded-full border border-amber-500/60 bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 hover:border-red-400/60 hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-colors"
              >
                {f}
                <X className="h-2.5 w-2.5" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Divider */}
      {activeFilters.size > 0 && (
        <div className="mb-3 h-px bg-zinc-200/60 dark:bg-white/8" />
      )}

      {/* Filter groups */}
      <div className="flex flex-col gap-0.5">
        {FILTER_GROUPS.map((group) => (
          <FilterAccordion
            key={group.key}
            group={group}
            activeFilters={activeFilters}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Dataset Card ─────────────────────────────────────────────────────────────

function DatasetCard({ dataset }: { dataset: Dataset }) {
  const Icon = dataset.icon;

  return (
    <motion.article
      variants={cardVariants}
      className="
        group relative cursor-pointer overflow-hidden rounded-xl border p-5
        transition-all duration-300
        bg-white border-zinc-200/80 shadow-sm
        hover:-translate-y-1 hover:border-amber-500/50
        hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)]
        dark:bg-black/20 dark:border-white/10 dark:backdrop-blur-md
        dark:hover:border-amber-500/40
        dark:hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)]
      "
    >
      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(245,158,11,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-start gap-4">
        {/* Category icon */}
        <div
          className={cn(
            "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300",
            dataset.iconBg,
            "border-transparent group-hover:border-current/20"
          )}
        >
          <Icon className={cn("h-5 w-5", dataset.iconColor)} />
        </div>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-2.5">
          {/* Title */}
          <h3 className="text-sm font-semibold leading-snug text-zinc-900 dark:text-zinc-100 group-hover:text-[#8B1E1E] dark:group-hover:text-amber-400 transition-colors line-clamp-2 md:text-base">
            {dataset.title}
          </h3>

          {/* Meta row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            {/* Left: org + formats */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-lg border border-[#8B1E1E]/20 bg-[#8B1E1E]/8 px-2.5 py-1 text-xs font-medium text-[#8B1E1E] dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-400">
                {dataset.organization}
              </span>
              <div className="flex items-center gap-1">
                {dataset.formats.map((f) => (
                  <FormatBadge key={f} format={f} />
                ))}
              </div>
            </div>

            {/* Right: views + date */}
            <div className="flex items-center gap-3 text-xs text-zinc-400 dark:text-zinc-500">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {dataset.views.toLocaleString("id-ID")}
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />
                {dataset.date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

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
  return (
    <nav
      className="flex items-center justify-center gap-1.5 pt-4"
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
              ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
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

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function DatasetPage() {
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFilter = (name: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveFilters(new Set());
    setCurrentPage(1);
  };

  const filtered = MOCK_DATASETS.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase())
  );

  const sidebarProps = { activeFilters, onToggle: toggleFilter, onClear: clearFilters };

  return (
    <>
      <Navbar />

      <main
        id="main-content"
        className="min-h-screen pt-20 bg-[#F8F6F1] dark:bg-[#0D0D0D]"
      >
        {/* Ambient glow — dark mode */}
        <div
          className="pointer-events-none fixed inset-x-0 top-0 h-[500px] opacity-0 dark:opacity-100 -z-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(139,30,30,0.15) 0%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav
            className="mb-6 flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500"
            aria-label="Breadcrumb"
          >
            <a href="/" className="hover:text-[#8B1E1E] dark:hover:text-amber-400 transition-colors">
              Beranda
            </a>
            <span>/</span>
            <span className="font-medium text-zinc-600 dark:text-zinc-300">Dataset</span>
          </nav>

          {/* 2-column layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">

            {/* ── Sidebar desktop ── */}
            <aside className="hidden lg:block" aria-label="Filter dataset">
              <div className="sticky top-24 rounded-2xl border border-zinc-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-black/30">
                <SidebarContent {...sidebarProps} />
              </div>
            </aside>

            {/* ── Main content ── */}
            <div className="flex flex-col gap-6">

              {/* Page header */}
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-zinc-900 dark:text-white md:text-4xl">
                    Dataset
                  </h1>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    8.806 Dataset tersedia
                  </p>
                </div>

                {/* Mobile filter trigger */}
                <Sheet>
                  <SheetTrigger asChild>
                    <button className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:border-amber-500/50 transition-all lg:hidden">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filter
                      {activeFilters.size > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                          {activeFilters.size}
                        </span>
                      )}
                    </button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 bg-[#F8F6F1] dark:bg-[#0D0D0D] p-5">
                    <SheetHeader>
                      <SheetTitle>Filter Dataset</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4">
                      <SidebarContent {...sidebarProps} />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Search bar */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500" />
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
                    placeholder="Cari dataset..."
                    className="
                      w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none
                      border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400
                      focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20
                      dark:border-white/10 dark:bg-white/5 dark:text-zinc-100 dark:placeholder-zinc-500
                      dark:focus:border-amber-500/50 dark:focus:ring-amber-500/15
                      transition-all duration-200
                    "
                    aria-label="Cari dataset"
                  />
                </div>
                <button
                  className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:border-amber-500/50 hover:text-amber-600 dark:hover:text-amber-400 transition-all"
                  aria-label="Opsi pengurutan"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </button>
              </div>

              {/* Dataset list */}
              {filtered.length > 0 ? (
                <motion.div
                  className="flex flex-col gap-4"
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  key={query + [...activeFilters].join(",")}
                >
                  {filtered.map((dataset) => (
                    <DatasetCard key={dataset.id} dataset={dataset} />
                  ))}
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 dark:border-white/10 py-20 text-center">
                  <Search className="mb-3 h-8 w-8 text-zinc-300 dark:text-zinc-600" />
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Tidak ada dataset yang cocok
                  </p>
                  <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                    Coba kata kunci lain atau hapus filter
                  </p>
                </div>
              )}

              {/* Pagination */}
              {filtered.length > 0 && (
                <Pagination current={currentPage} total={4} onChange={setCurrentPage} />
              )}
            </div>
          </div>
        </div>
      </main>

      <FooterSection />
    </>
  );
}
