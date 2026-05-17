import { TrendingUp, Database, Building2, Users } from "lucide-react";
import { Container } from "@/components/layout/container";
import { STATS } from "@/data/mock";

const ICONS = [Database, Building2, TrendingUp, Users];

/**
 * Stats Section — Key platform metrics with animated counters placeholder
 */
export default function StatsSection() {
  return (
    <section
      className="section-padding-sm relative overflow-hidden border-y border-border/50 bg-card"
      aria-labelledby="stats-heading"
    >
      <Container>
        <h2 id="stats-heading" className="sr-only">
          Statistik Platform Satu Data Aceh
        </h2>

        <div className="grid grid-cols-2 gap-px bg-border/50 lg:grid-cols-4">
          {STATS.map((stat, index) => {
            const Icon = ICONS[index];
            return (
              <article
                key={stat.label}
                className="flex flex-col gap-3 bg-card p-6 transition-colors hover:bg-muted/50 lg:p-8"
              >
                {/* Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                {/* Value */}
                <div>
                  <p className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                    {stat.value}
                    {stat.unit && (
                      <span className="ml-1 text-base font-normal text-muted-foreground">
                        {stat.unit}
                      </span>
                    )}
                  </p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                </div>

                {/* Change indicator */}
                {stat.change !== undefined && (
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-emerald-500" />
                    <span className="font-semibold text-emerald-500">
                      +{stat.change}%
                    </span>
                    <span className="text-muted-foreground">{stat.changeLabel}</span>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
