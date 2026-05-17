import Link from "next/link";
import { ArrowRight, Search, TrendingUp, Database, Map } from "lucide-react";
import { Container } from "@/components/layout/container";
import { HeroOverlay } from "@/components/custom/hero-overlay";

/**
 * Hero Section — Cinematic landing hero with search and CTAs
 */
export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Background overlays */}
      <HeroOverlay />

      <Container className="relative z-10 py-24 lg:py-32">
        <div className="flex flex-col items-center gap-8 text-center">

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Platform Data Terbuka Pemerintah Aceh
          </div>

          {/* Main heading */}
          <div className="flex flex-col gap-3">
            <h1
              id="hero-heading"
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Satu Data{" "}
              <span className="gradient-text">Aceh</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Portal data terbuka resmi Pemerintah Aceh. Akses ribuan dataset,
              visualisasi interaktif, dan wawasan berbasis data untuk mendukung
              pembangunan Aceh yang transparan dan berkelanjutan.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full max-w-2xl">
            <div className="glass-light dark:glass flex items-center gap-3 rounded-2xl border border-border/50 p-2 shadow-lg">
              <Search className="ml-2 h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                type="search"
                placeholder="Cari dataset, topik, atau instansi..."
                className="flex-1 bg-transparent py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                aria-label="Cari dataset"
              />
              <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                Cari
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            {[
              { icon: Database, label: "2.847 Dataset" },
              { icon: TrendingUp, label: "143 Instansi" },
              { icon: Map, label: "23 Kabupaten/Kota" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-primary" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dataset"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
            >
              Jelajahi Dataset
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-muted"
            >
              Lihat Dashboard
            </Link>
          </div>
        </div>
      </Container>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
