import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";
import { Navbar } from "@/components/layout/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peta Interaktif",
  description: "Peta geospasial interaktif data Aceh.",
};

/**
 * Geospatial Map Page — Placeholder
 */
export default function MapPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex min-h-screen flex-col pt-24">
        <div className="flex flex-1 flex-col">
          <div className="border-b border-border bg-card px-4 py-4 sm:px-6 lg:px-8">
            <SectionTitle
              eyebrow="Peta Geospasial"
              title="Peta Interaktif Aceh"
              align="left"
              titleClassName="text-2xl sm:text-3xl"
            />
          </div>
          <div className="flex flex-1 items-center justify-center bg-muted/20 text-muted-foreground">
            <div className="text-center">
              <p className="text-sm">Peta interaktif — coming soon</p>
              <p className="mt-1 text-xs">Powered by Mapbox / Leaflet</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
