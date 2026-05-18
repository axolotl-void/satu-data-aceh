import { Navbar } from "@/components/layout/navbar";
import HeroSection from "@/sections/homepage/hero-section";
import StatsSection from "@/sections/homepage/stats-section";
import DashboardPreview from "@/sections/homepage/dashboard-preview";
import VisionMissionSection from "@/sections/homepage/vision-mission-section";
import MapPreview from "@/sections/homepage/map-preview";
import TopicsSection from "@/sections/homepage/topics-section";
import InsightsSection from "@/sections/homepage/insights-section";
import InstitutionsSection from "@/sections/homepage/institutions-section";
import NewsSection from "@/sections/homepage/news-section";
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
      <main id="main-content" className="w-full overflow-x-hidden">
        {/* 1. Hero — Cinematic landing with search */}
        <HeroSection />

        {/* 2. Stats — Platform key metrics */}
        <StatsSection />

        {/* 3. Dashboard Preview — Analytics teaser */}
        <DashboardPreview />

        {/* 4. Vision & Mission — Visi & Misi Satu Data Aceh */}
        <VisionMissionSection />

        {/* 5. Map Preview — Geospatial teaser */}
        <MapPreview />

        {/* 6. Topics — Dataset categories */}
        <TopicsSection />

        {/* 7. Institutions — Government organizations */}
        <InstitutionsSection />

        {/* 8. News — Informasi terbaru (tepat sebelum Insights & Footer) */}
        <NewsSection />

        {/* 9. Data Insight — Macro indicators (tepat sebelum Footer) */}
        <InsightsSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </>
  );
}
