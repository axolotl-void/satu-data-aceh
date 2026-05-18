// ============================================================
// SATU DATA ACEH — Mock / Placeholder Data
// ============================================================

import type { StatItem, Topic, Institution, Insight, Dataset } from "@/types";

export const STATS: StatItem[] = [
  { label: "Total Dataset", value: "2.847", unit: "dataset", change: 12.4, changeLabel: "dari bulan lalu" },
  { label: "Organisasi", value: "143", unit: "instansi", change: 3.2, changeLabel: "dari bulan lalu" },
  { label: "Unduhan", value: "1.2M", unit: "kali", change: 24.8, changeLabel: "dari bulan lalu" },
  { label: "Pengguna Aktif", value: "48.5K", unit: "pengguna", change: 18.1, changeLabel: "dari bulan lalu" },
];

export const TOPICS: Topic[] = [
  { id: "ekonomi", name: "Ekonomi & Keuangan", icon: "TrendingUp", count: 342, color: "#8B1E1E", description: "Data ekonomi, APBD, dan keuangan daerah" },
  { id: "pendidikan", name: "Pendidikan", icon: "GraduationCap", count: 287, color: "#D4AF37", description: "Data sekolah, siswa, dan tenaga pendidik" },
  { id: "kesehatan", name: "Kesehatan", icon: "Heart", count: 256, color: "#2D6A4F", description: "Data fasilitas dan layanan kesehatan" },
  { id: "infrastruktur", name: "Infrastruktur", icon: "Building2", count: 198, color: "#1D4E89", description: "Data jalan, jembatan, dan bangunan" },
  { id: "pertanian", name: "Pertanian & Pangan", icon: "Wheat", count: 175, color: "#6B8E23", description: "Data produksi pertanian dan ketahanan pangan" },
  { id: "kependudukan", name: "Kependudukan", icon: "Users", count: 164, color: "#6B3FA0", description: "Data demografi dan kependudukan" },
  { id: "lingkungan", name: "Lingkungan Hidup", icon: "Leaf", count: 143, color: "#40916C", description: "Data lingkungan dan sumber daya alam" },
  { id: "pariwisata", name: "Pariwisata & Budaya", icon: "MapPin", count: 121, color: "#C0392B", description: "Data destinasi wisata dan budaya Aceh" },
];

export const INSTITUTIONS: Institution[] = [
  { id: "bps", name: "Badan Pusat Statistik Aceh", shortName: "BPS Aceh", datasetCount: 412, category: "Statistik", href: "/institutions/bps" },
  { id: "bappeda", name: "Badan Perencanaan Pembangunan Daerah", shortName: "BAPPEDA", datasetCount: 287, category: "Perencanaan", href: "/institutions/bappeda" },
  { id: "dinas-kesehatan", name: "Dinas Kesehatan Aceh", shortName: "Dinkes Aceh", datasetCount: 198, category: "Kesehatan", href: "/institutions/dinkes" },
  { id: "dinas-pendidikan", name: "Dinas Pendidikan Aceh", shortName: "Disdik Aceh", datasetCount: 176, category: "Pendidikan", href: "/institutions/disdik" },
  { id: "bpba", name: "Badan Penanggulangan Bencana Aceh", shortName: "BPBA", datasetCount: 143, category: "Kebencanaan", href: "/institutions/bpba" },
  { id: "dishub", name: "Dinas Perhubungan Aceh", shortName: "Dishub Aceh", datasetCount: 121, category: "Transportasi", href: "/institutions/dishub" },
];

export const INSIGHTS: Insight[] = [
  {
    id: "1",
    title: "Pertumbuhan Ekonomi Aceh Q3 2024 Mencapai 4.8%",
    excerpt: "Berdasarkan data terbaru BPS Aceh, pertumbuhan ekonomi provinsi Aceh pada kuartal ketiga 2024 menunjukkan tren positif yang didorong oleh sektor pertanian dan pariwisata.",
    category: "Ekonomi",
    publishedAt: "2024-11-15",
    author: "Tim Analitik Satu Data Aceh",
    readTime: 5,
    href: "/insights/pertumbuhan-ekonomi-aceh-q3-2024",
  },
  {
    id: "2",
    title: "Peta Sebaran Fasilitas Kesehatan di 23 Kabupaten/Kota",
    excerpt: "Visualisasi interaktif sebaran puskesmas, rumah sakit, dan klinik di seluruh wilayah Aceh berdasarkan data Dinas Kesehatan Aceh tahun 2024.",
    category: "Kesehatan",
    publishedAt: "2024-11-10",
    author: "Tim GIS Satu Data Aceh",
    readTime: 7,
    href: "/insights/peta-fasilitas-kesehatan-aceh",
  },
  {
    id: "3",
    title: "Tren Angka Partisipasi Sekolah 2019–2024",
    excerpt: "Analisis mendalam tentang perkembangan angka partisipasi sekolah di Aceh selama lima tahun terakhir, dengan fokus pada daerah terpencil dan kepulauan.",
    category: "Pendidikan",
    publishedAt: "2024-11-05",
    author: "Tim Analitik Satu Data Aceh",
    readTime: 6,
    href: "/insights/tren-angka-partisipasi-sekolah",
  },
];

export const FEATURED_DATASETS: Dataset[] = [
  {
    id: "1",
    title: "Data Produk Domestik Regional Bruto (PDRB) Aceh 2019–2023",
    description: "Data PDRB Provinsi Aceh berdasarkan lapangan usaha dan pengeluaran, tersedia dalam format tahunan dan triwulanan.",
    category: "Ekonomi",
    organization: "BPS Aceh",
    tags: ["PDRB", "ekonomi", "makroekonomi"],
    format: ["CSV", "XLSX", "JSON"],
    lastUpdated: "2024-10-01",
    downloads: 12847,
    views: 48291,
    license: "CC BY 4.0",
    coverageArea: "Provinsi Aceh",
  },
  {
    id: "2",
    title: "Jumlah Penduduk Aceh per Kabupaten/Kota 2024",
    description: "Data kependudukan terkini mencakup jumlah penduduk, kepadatan, dan distribusi usia per kabupaten/kota di Aceh.",
    category: "Kependudukan",
    organization: "Disdukcapil Aceh",
    tags: ["penduduk", "demografi", "kabupaten"],
    format: ["CSV", "XLSX"],
    lastUpdated: "2024-09-15",
    downloads: 9234,
    views: 35102,
    license: "CC BY 4.0",
    coverageArea: "23 Kabupaten/Kota",
  },
  {
    id: "3",
    title: "Indeks Pembangunan Manusia (IPM) Aceh 2023",
    description: "Data IPM Aceh mencakup komponen pendidikan, kesehatan, dan pengeluaran per kapita untuk seluruh kabupaten/kota.",
    category: "Pembangunan",
    organization: "BPS Aceh",
    tags: ["IPM", "pembangunan", "HDI"],
    format: ["CSV", "XLSX", "JSON"],
    lastUpdated: "2024-08-20",
    downloads: 7891,
    views: 29847,
    license: "CC BY 4.0",
    coverageArea: "Provinsi Aceh",
  },
];

export const NAV_ITEMS = [
  { label: "Beranda",       href: "/"            },
  { label: "Dataset",       href: "/dataset"     },
  { label: "Visualisasi",   href: "/dashboard"   },
  { label: "Geospasial",    href: "/map"         },
  { label: "Produsen Data", href: "/institutions"},
  { label: "Insight",       href: "/insights"    },
];
