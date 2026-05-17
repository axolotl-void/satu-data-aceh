import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";
import { Navbar } from "@/components/layout/navbar";
import FooterSection from "@/sections/homepage/footer-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wawasan Data",
  description: "Analisis dan cerita data terkini dari Pemerintah Aceh.",
};

/**
 * Insights / News Page — Placeholder
 */
export default function InsightsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <section className="section-padding">
          <Container>
            <SectionTitle
              eyebrow="Wawasan Data"
              title="Cerita di Balik Data Aceh"
              subtitle="Analisis mendalam dan visualisasi data terkini dari tim Satu Data Aceh."
              align="center"
            />
            <div className="mt-12 flex items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 p-24 text-center text-muted-foreground">
              <p className="text-sm">Insights & news — coming soon</p>
            </div>
          </Container>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
