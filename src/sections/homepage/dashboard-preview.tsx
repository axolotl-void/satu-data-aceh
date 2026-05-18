import { ArrowRight, BarChart3, LineChart, PieChart, Activity } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";
import { CinematicGlow } from "@/components/custom/cinematic-glow";

const PREVIEW_CARDS = [
  {
    icon: LineChart,
    title: "Tren Ekonomi",
    description: "PDRB, inflasi, dan indikator ekonomi makro Aceh",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: BarChart3,
    title: "Demografi",
    description: "Distribusi penduduk per kabupaten dan kelompok usia",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: PieChart,
    title: "Anggaran Daerah",
    description: "Realisasi APBA dan alokasi belanja per sektor",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Activity,
    title: "Indikator SDGs",
    description: "Capaian tujuan pembangunan berkelanjutan Aceh",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
];

/**
 * Dashboard Preview Section — Teaser of analytics capabilities
 */
export default function DashboardPreview() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      aria-labelledby="dashboard-preview-heading"
    >
      {/* Ambient glow */}
      <CinematicGlow
        color="primary"
        size="xl"
        intensity="low"
        className="-right-40 top-1/2 -translate-y-1/2"
      />

      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left: Text content */}
          <div className="flex flex-col gap-6">
            <SectionTitle
              eyebrow="Dashboard Analitik"
              title="Data Aceh dalam Satu Tampilan"
              subtitle="Visualisasi interaktif yang mengubah data mentah menjadi wawasan bermakna. Pantau indikator pembangunan Aceh secara real-time."
              align="left"
            />

            <ul className="flex flex-col gap-3" role="list">
              {[
                "Grafik interaktif berbasis Recharts",
                "Filter berdasarkan periode dan wilayah",
                "Ekspor data dalam berbagai format",
                "Pembaruan data berkala dari sumber resmi",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/dashboard"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Buka Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: Preview cards grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {PREVIEW_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="card-cinematic flex flex-col gap-3 p-5"
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bg}`}>
                    <Icon className={`h-5 w-5 ${card.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                  {/* Placeholder chart bar */}
                  <div className="flex items-end gap-0.5 pt-1" aria-hidden="true">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-primary/20 transition-all"
                        style={{ height: `${h * 0.4}px` }}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
