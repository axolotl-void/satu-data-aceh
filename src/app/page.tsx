import { Navbar } from "@/components/layout/navbar";
import HeroSection from "@/sections/homepage/hero-section";
import StatsSection from "@/sections/homepage/stats-section";
import DashboardPreview from "@/sections/homepage/dashboard-preview";
import MapPreview from "@/sections/homepage/map-preview";
import TopicsSection from "@/sections/homepage/topics-section";
import InsightsSection from "@/sections/homepage/insights-section";
import InstitutionsSection from "@/sections/homepage/institutions-section";
import FooterSection from "@/sections/homepage/footer-section";

/**
 * Satu Data Aceh — Homepage
 * Premium cinematic government-tech landing page
 */
export default function HomePage() {
  return (
    <>
      {/* Fixed navigation */}
      <Navbar />

      {/* Main content */}
      <main id="main-content">
        {/* 1. Hero — Cinematic landing with search */}
        <HeroSection />

        {/* 2. Stats — Platform key metrics */}
        <StatsSection />

        {/* 3. Dashboard Preview — Analytics teaser */}
        <DashboardPreview />

        {/* 4. Map Preview — Geospatial teaser */}
        <MapPreview />

        {/* 5. Topics — Dataset categories */}
        <TopicsSection />

        {/* 6. Insights — Data stories */}
        <InsightsSection />

        {/* 7. Institutions — Government organizations */}
        <InstitutionsSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </>
  );
}
