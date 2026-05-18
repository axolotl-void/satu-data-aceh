import { ArrowRight, MapPin, Layers, ZoomIn, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";

const GEOPORTAL_URL =
  "https://geoportal.acehprov.go.id/portal/apps/experiencebuilder/experience/?id=612279fd5d23491b859302329618b457&page=Jelajah-Peta";

const MAP_FEATURES = [
  { icon: MapPin, label: "23 Kabupaten/Kota" },
  { icon: Layers, label: "Multi-layer data"  },
  { icon: ZoomIn, label: "Zoom interaktif"   },
];

const MAP_LAYERS = [
  "Batas Wilayah",
  "Jalan",
  "Perairan",
  "Guna Lahan",
];

/**
 * Map Preview Section — Geospatial visualization teaser
 * Map image: /geospasial-peta.png
 * CTA: opens Geoportal Aceh in new tab
 */
export default function MapPreview() {
  return (
    <section
      className="section-padding relative overflow-hidden bg-card"
      aria-labelledby="map-preview-heading"
    >
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* ── Left: Map visual ── */}
          <div className="relative order-2 lg:order-1">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-border/50 bg-muted shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">

              {/* Map screenshot */}
              <img
                src="/geospasial-peta.png"
                alt="Peta Geospasial Provinsi Aceh"
                className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                draggable={false}
              />

              {/* Subtle vignette overlay */}
              <div
                className="absolute inset-0 z-[1]"
                style={{
                  background:
                    "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.2) 100%)",
                }}
                aria-hidden="true"
              />

              {/* Map controls — top right */}
              <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
                {["+", "−", "⊕"].map((ctrl) => (
                  <div
                    key={ctrl}
                    className="glass flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-foreground shadow-sm"
                    aria-hidden="true"
                  >
                    {ctrl}
                  </div>
                ))}
              </div>

              {/* Layer pills — bottom left */}
              <div className="absolute bottom-3 left-3 z-10 flex flex-wrap gap-1.5">
                {MAP_LAYERS.map((layer) => (
                  <span
                    key={layer}
                    className="rounded-full border border-border/60 bg-card/80 px-2.5 py-1 text-[10px] font-medium text-foreground backdrop-blur-sm"
                  >
                    {layer}
                  </span>
                ))}
              </div>

              {/* Open geoportal overlay button — center, appears on hover */}
              <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <a
                  href={GEOPORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-2xl border border-border/60 bg-card/90 px-5 py-2.5 text-sm font-semibold text-foreground shadow-lg backdrop-blur-md transition-all hover:border-primary/40 hover:bg-card"
                >
                  <ExternalLink className="h-4 w-4 text-primary" />
                  Buka Geoportal
                </a>
              </div>

              {/* Attribution */}
              <div
                className="absolute bottom-2 right-3 z-10 text-[9px] text-white/40"
                aria-hidden="true"
              >
                © Geoportal Aceh
              </div>
            </div>
          </div>

          {/* ── Right: Text content ── */}
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <SectionTitle
              eyebrow="Sistem Geospasial"
              title="Peta Data Aceh yang Interaktif"
              subtitle="Eksplorasi data spasial Aceh secara visual. Dari sebaran fasilitas publik hingga peta risiko bencana, semua tersedia dalam satu platform."
              align="left"
            />

            {/* Feature badges */}
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

            {/* Feature list */}
            <ul className="flex flex-col gap-2.5" role="list">
              {[
                "Peta sebaran fasilitas kesehatan dan pendidikan",
                "Visualisasi data bencana dan kerawanan wilayah",
                "Overlay data sosial-ekonomi per kecamatan",
                "Ekspor peta dalam format GeoJSON dan Shapefile",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>

            {/* CTA — external link to Geoportal */}
            <a
              href={GEOPORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-muted"
            >
              Buka Peta Interaktif
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
