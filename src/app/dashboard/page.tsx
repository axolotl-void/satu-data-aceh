import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";
import { Navbar } from "@/components/layout/navbar";
import FooterSection from "@/sections/homepage/footer-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard analitik data Aceh dengan visualisasi interaktif.",
};

/**
 * Dashboard Analytics Page — Placeholder
 */
export default function DashboardPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-16">
        <section className="section-padding">
          <Container>
            <SectionTitle
              eyebrow="Dashboard"
              title="Analitik Data Aceh"
              subtitle="Visualisasi interaktif indikator pembangunan Aceh secara real-time."
              align="center"
            />
            <div className="mt-12 flex items-center justify-center rounded-3xl border border-dashed border-border bg-muted/30 p-24 text-center text-muted-foreground">
              <p className="text-sm">Dashboard analytics — coming soon</p>
            </div>
          </Container>
        </section>
      </main>
      <FooterSection />
    </>
  );
}
