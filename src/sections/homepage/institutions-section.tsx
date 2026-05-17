import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";
import { INSTITUTIONS } from "@/data/mock";
import { formatNumber } from "@/lib/utils";

/**
 * Institutions Section — Government organizations contributing data
 */
export default function InstitutionsSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      aria-labelledby="institutions-heading"
    >
      <Container>
        <div className="flex flex-col gap-12">

          {/* Header */}
          <SectionTitle
            eyebrow="Instansi Pemerintah"
            title="Data dari Sumber Resmi"
            subtitle="Satu Data Aceh mengintegrasikan data dari seluruh instansi pemerintah Provinsi Aceh untuk memastikan akurasi dan keterpercayaan."
            align="center"
          />

          {/* Institutions grid */}
          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            role="list"
            aria-label="Daftar instansi pemerintah"
          >
            {INSTITUTIONS.map((institution) => (
              <Link
                key={institution.id}
                href={institution.href}
                role="listitem"
                className="card-cinematic group flex items-start gap-4 p-5"
                aria-label={`${institution.name} — ${formatNumber(institution.datasetCount)} dataset`}
              >
                {/* Logo placeholder */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                  <Building2 className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {institution.category}
                  </span>
                  <h3 className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                    {institution.shortName}
                  </h3>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {institution.name}
                  </p>
                  <p className="mt-1 text-xs font-medium text-primary">
                    {formatNumber(institution.datasetCount)} dataset
                  </p>
                </div>

                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground/50 transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center">
            <Link
              href="/institutions"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-muted"
            >
              Lihat Semua Instansi
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
