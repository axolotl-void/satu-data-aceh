import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";
import { Navbar } from "@/components/layout/navbar";
import FooterSection from "@/sections/homepage/footer-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dataset",
  description: "Jelajahi ribuan dataset terbuka dari Pemerintah Aceh.",
};

/**
 * Dataset Explorer Page — Placeholder
 */
export default function DatasetPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <section className="section-padding">
          <Container>
            <SectionTitle
              eyebrow="Dataset"
              title="Jelajahi Dataset Aceh"
              subtitle="Ribuan dataset terbuka dari seluruh instansi pemerintah Aceh, siap diakses dan diunduh."
              align="center"
            />
            <div className="mt-12 flex items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 p-24 text-center text-muted-foreground">
              <p className="text-sm">Dataset explorer — coming soon</p>
            </div>
          </Container>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
