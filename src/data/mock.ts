import type { StatItem, Institution } from "@/types";

export const STATS: StatItem[] = [
  { label: "Total Dataset", value: "2.847", unit: "dataset", change: 12.4, changeLabel: "dari bulan lalu" },
  { label: "Organisasi", value: "143", unit: "instansi", change: 3.2, changeLabel: "dari bulan lalu" },
  { label: "Unduhan", value: "1.2M", unit: "kali", change: 24.8, changeLabel: "dari bulan lalu" },
  { label: "Pengguna Aktif", value: "48.5K", unit: "pengguna", change: 18.1, changeLabel: "dari bulan lalu" },
];

export const INSTITUTIONS: Institution[] = [
  { id: "bps", name: "Badan Pusat Statistik Aceh", shortName: "BPS Aceh", datasetCount: 412, category: "Statistik", href: "/institutions/bps" },
  { id: "bappeda", name: "Badan Perencanaan Pembangunan Daerah", shortName: "BAPPEDA", datasetCount: 287, category: "Perencanaan", href: "/institutions/bappeda" },
  { id: "dinas-kesehatan", name: "Dinas Kesehatan Aceh", shortName: "Dinkes Aceh", datasetCount: 198, category: "Kesehatan", href: "/institutions/dinkes" },
  { id: "dinas-pendidikan", name: "Dinas Pendidikan Aceh", shortName: "Disdik Aceh", datasetCount: 176, category: "Pendidikan", href: "/institutions/disdik" },
  { id: "bpba", name: "Badan Penanggulangan Bencana Aceh", shortName: "BPBA", datasetCount: 143, category: "Kebencanaan", href: "/institutions/bpba" },
  { id: "dishub", name: "Dinas Perhubungan Aceh", shortName: "Dishub Aceh", datasetCount: 121, category: "Transportasi", href: "/institutions/dishub" },
];
