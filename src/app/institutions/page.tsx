import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";
import { Navbar } from "@/components/layout/navbar";
import FooterSection from "@/sections/homepage/footer-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instansi",
  description: "Daftar instansi pemerintah Aceh yang berkontribusi data.",
};

/**
 * Institutions Page — Placeholder
 */
export default function InstitutionsPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <section className="section-padding">
          <Container>
            <SectionTitle
              eyebrow="Instansi Pemerintah"
              title="Sumber Data Resmi Aceh"
              subtitle="Seluruh instansi pemerintah Aceh yang berkontribusi dalam Satu Data Aceh."
              align="center"
            />
            <div className="mt-12 flex items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 p-24 text-center text-muted-foreground">
              <p className="text-sm">Institutions directory — coming soon</p>
            </div>
          </Container>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
