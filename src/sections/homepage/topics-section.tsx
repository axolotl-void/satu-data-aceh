import Link from "next/link";
import {
  TrendingUp, GraduationCap, Heart, Building2,
  Wheat, Users, Leaf, MapPin, ArrowRight
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";
import { TOPICS } from "@/data/mock";
import { formatNumber } from "@/lib/utils";

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp, GraduationCap, Heart, Building2,
  Wheat, Users, Leaf, MapPin,
};

/**
 * Topics Section — Dataset categories grid
 */
export default function TopicsSection() {
  return (
    <section
      className="section-padding relative overflow-hidden"
      aria-labelledby="topics-heading"
    >
      <Container>
        <div className="flex flex-col gap-12">

          {/* Header */}
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <SectionTitle
              eyebrow="Topik Data"
              title="Jelajahi Berdasarkan Kategori"
              subtitle="Temukan dataset yang relevan dari berbagai sektor pembangunan Aceh."
              align="left"
            />
            <Link
              href="/dataset"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-70"
            >
              Lihat semua topik
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Topics grid */}
          <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
            role="list"
            aria-label="Kategori dataset"
          >
            {TOPICS.map((topic) => {
              const Icon = ICON_MAP[topic.icon] ?? Database;
              return (
                <Link
                  key={topic.id}
                  href={`/dataset?category=${topic.id}`}
                  role="listitem"
                  className="card-cinematic group flex flex-col gap-4 p-5"
                  aria-label={`${topic.name} — ${formatNumber(topic.count)} dataset`}
                >
                  {/* Icon */}
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${topic.color}18` }}
                  >
                    <Icon
                      className="h-5 w-5"
                      style={{ color: topic.color }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold leading-tight text-foreground">
                      {topic.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(topic.count)} dataset
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                      style={{
                        width: `${(topic.count / 350) * 100}%`,
                        backgroundColor: topic.color,
                      }}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

// Fallback icon
function Database({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    </svg>
  );
}
