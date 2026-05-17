import Link from "next/link";
import { ArrowRight, MapPin, Layers, ZoomIn } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";
import { BatikPattern } from "@/components/custom/batik-pattern";

const MAP_FEATURES = [
  { icon: MapPin, label: "23 Kabupaten/Kota" },
  { icon: Layers, label: "Multi-layer data" },
  { icon: ZoomIn, label: "Zoom interaktif" },
];

/**
 * Map Preview Section — Geospatial visualization teaser
 */
export default function MapPreview() {
  return (
    <section
      className="section-padding relative overflow-hidden bg-card"
      aria-labelledby="map-preview-heading"
    >
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left: Map placeholder */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/50 bg-muted shadow-2xl">
              {/* Batik pattern overlay */}
              <BatikPattern opacity={0.06} variant="geometric" />

              {/* Simulated map UI */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MapPin className="h-8 w-8" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Peta Interaktif Aceh
                  </p>
                  <p className="text-xs text-muted-foreground/70">
                    Powered by Mapbox / Leaflet
                  </p>
                </div>
              </div>

              {/* Simulated map controls */}
              <div className="absolute right-3 top-3 flex flex-col gap-1.5">
                {["+", "−", "⊕"].map((ctrl) => (
                  <div
                    key={ctrl}
                    className="glass flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-foreground"
                    aria-hidden="true"
                  >
                    {ctrl}
                  </div>
                ))}
              </div>

              {/* Simulated legend */}
              <div className="glass absolute bottom-3 left-3 rounded-xl p-3">
                <p className="mb-2 text-xs font-semibold text-foreground">Kepadatan Penduduk</p>
                <div className="flex gap-1">
                  {["bg-primary/20", "bg-primary/40", "bg-primary/60", "bg-primary/80", "bg-primary"].map((c) => (
                    <div key={c} className={`h-3 w-6 rounded-sm ${c}`} aria-hidden="true" />
                  ))}
                </div>
                <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                  <span>Rendah</span>
                  <span>Tinggi</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Text content */}
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <SectionTitle
              eyebrow="Sistem Geospasial"
              title="Peta Data Aceh yang Interaktif"
              subtitle="Eksplorasi data spasial Aceh secara visual. Dari sebaran fasilitas publik hingga peta risiko bencana, semua tersedia dalam satu platform."
              align="left"
            />

            <div className="flex flex-wrap gap-3">
              {MAP_FEATURES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-muted-foreground"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {label}
                </div>
              ))}
            </div>

            <ul className="flex flex-col gap-2.5" role="list">
              {[
                "Peta sebaran fasilitas kesehatan dan pendidikan",
                "Visualisasi data bencana dan kerawanan wilayah",
                "Overlay data sosial-ekonomi per kecamatan",
                "Ekspor peta dalam format GeoJSON dan Shapefile",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/map"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-muted"
            >
              Buka Peta Interaktif
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
