import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";
import { INSIGHTS } from "@/data/mock";
import { formatDate } from "@/lib/utils";

/**
 * Insights Section — Latest data stories and analysis
 */
export default function InsightsSection() {
  const [featured, ...rest] = INSIGHTS;

  return (
    <section
      className="section-padding relative overflow-hidden bg-card"
      aria-labelledby="insights-heading"
    >
      <Container>
        <div className="flex flex-col gap-12">

          {/* Header */}
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <SectionTitle
              eyebrow="Wawasan Data"
              title="Cerita di Balik Data Aceh"
              subtitle="Analisis mendalam dan visualisasi data terkini dari tim Satu Data Aceh."
              align="left"
            />
            <Link
              href="/insights"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-70"
            >
              Semua wawasan
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Grid */}
          <div className="grid gap-6 lg:grid-cols-3">

            {/* Featured article */}
            <article className="card-cinematic group flex flex-col gap-4 p-6 lg:col-span-2">
              {/* Category badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  <Tag className="h-3 w-3" />
                  {featured.category}
                </span>
                <span className="text-xs text-muted-foreground">Unggulan</span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  <Link href={featured.href}>{featured.title}</Link>
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {featured.excerpt}
                </p>
              </div>

              {/* Meta */}
              <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{featured.author}</span>
                  <span>·</span>
                  <span>{formatDate(featured.publishedAt)}</span>
                </div>
                {featured.readTime && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {featured.readTime} menit baca
                  </div>
                )}
              </div>
            </article>

            {/* Secondary articles */}
            <div className="flex flex-col gap-4">
              {rest.map((insight) => (
                <article
                  key={insight.id}
                  className="card-cinematic group flex flex-col gap-3 p-5"
                >
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {insight.category}
                  </span>

                  <h3 className="text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                    <Link href={insight.href}>{insight.title}</Link>
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{formatDate(insight.publishedAt)}</span>
                    {insight.readTime && (
                      <>
                        <span>·</span>
                        <span>{insight.readTime} menit</span>
                      </>
                    )}
                  </div>
                </article>
              ))}

              {/* CTA card */}
              <Link
                href="/insights"
                className="card-cinematic flex items-center justify-between p-5 text-sm font-semibold text-primary"
              >
                Lihat semua wawasan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
