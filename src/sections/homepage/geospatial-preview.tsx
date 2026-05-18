"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  type Variants,
  useMotionValue,
  useTransform,
  animate as motionAnimate,
} from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Database,
  Layers,
  Building2,
  Search,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { SectionTitle } from "@/components/layout/section-title";

// ─── Constants ────────────────────────────────────────────────────────────────

const GEOPORTAL_URL =
  "https://geoportal.acehprov.go.id/portal/apps/experiencebuilder/experience/?id=612279fd5d23491b859302329618b457&page=Jelajah-Peta";

const DONUT_DATA = [
  { name: "Batas Administrasi", value: 28, color: "#8B1E1E" },
  { name: "Transportasi",       value: 22, color: "#D4AF37" },
  { name: "Ekonomi",            value: 18, color: "#60A5FA" },
  { name: "Sosial",             value: 17, color: "#34D399" },
  { name: "Lingkungan",         value: 15, color: "#A78BFA" },
];

const HOTSPOTS = [
  {
    id: "banda-aceh",
    label: "BANDA ACEH",
    sub: "Ibukota Provinsi",
    tags: ["Batas Administrasi", "Infrastruktur Utama"],
    top: "38%", left: "18%",
  },
  {
    id: "sabang",
    label: "SABANG",
    sub: "Kota Paling Barat",
    tags: ["Batas Wilayah", "Data Kelautan"],
    top: "18%", left: "8%",
  },
  {
    id: "lhokseumawe",
    label: "LHOKSEUMAWE",
    sub: "Kota Industri",
    tags: ["Ekonomi", "Transportasi"],
    top: "30%", left: "62%",
  },
  {
    id: "meulaboh",
    label: "MEULABOH",
    sub: "Aceh Barat",
    tags: ["Sosial", "Lingkungan"],
    top: "58%", left: "28%",
  },
];

// ─── Animation variants ───────────────────────────────────────────────────────

const panelVariants: Variants = {
  hidden:  { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── AnimatedCounter ──────────────────────────────────────────────────────────

function AnimatedCounter({
  target,
  suffix = "",
  inView,
}: {
  target: number;
  suffix?: string;
  inView: boolean;
}) {
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) =>
    Math.round(v).toLocaleString("id-ID")
  );

  useEffect(() => {
    if (!inView || target === 0) return;
    const ctrl = motionAnimate(motionVal, target, { duration: 2, ease: "easeOut" });
    return () => ctrl.stop();
  }, [inView, target, motionVal]);

  return (
    <span>
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

// ─── Custom Donut Tooltip ─────────────────────────────────────────────────────

function DonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: { color: string } }[];
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-xl border border-border bg-card px-3 py-2 text-xs shadow-lg">
      <p className="font-semibold" style={{ color: d.payload.color }}>
        {d.name}
      </p>
      <p className="text-muted-foreground">{d.value}%</p>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  target,
  suffix,
  inView,
  color,
}: {
  icon: React.ElementType;
  label: string;
  target: number;
  suffix?: string;
  inView: boolean;
  color: string;
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="card-cinematic group flex items-center gap-3 p-3 md:p-4"
    >
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${color}18`, border: `1px solid ${color}30` }}
      >
        <Icon className="h-4 w-4" style={{ color }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-lg font-bold leading-none tracking-tight text-foreground md:text-xl">
          <AnimatedCounter target={target} suffix={suffix} inView={inView} />
        </p>
        <p className="mt-0.5 truncate text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Map Hotspot ──────────────────────────────────────────────────────────────

function Hotspot({
  label,
  sub,
  tags,
  top,
  left,
}: (typeof HOTSPOTS)[number]) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute z-20"
      style={{ top, left, transform: "translate(-50%,-50%)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Ping ring */}
      <span
        className="absolute -inset-3 rounded-full border border-primary/40"
        style={{ animation: "ping 2s cubic-bezier(0,0,0.2,1) infinite", opacity: hovered ? 0.7 : 0.25 }}
        aria-hidden="true"
      />
      <span className="absolute -inset-1.5 rounded-full border border-primary/20" aria-hidden="true" />

      {/* Dot */}
      <div
        className="relative h-3 w-3 cursor-pointer rounded-full transition-all duration-200"
        style={{
          background: hovered ? "var(--accent)" : "var(--primary)",
          boxShadow: hovered
            ? "0 0 12px var(--accent), 0 0 24px color-mix(in srgb, var(--accent) 30%, transparent)"
            : "0 0 8px var(--primary)",
        }}
      />

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute bottom-full left-1/2 mb-3 w-44 -translate-x-1/2 rounded-xl border border-border bg-card p-3 shadow-xl"
        >
          <p className="text-xs font-bold tracking-wider text-primary">{label}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">{sub}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-md bg-muted px-1.5 py-0.5 text-[9px] font-medium text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          {/* Arrow */}
          <div
            className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-border bg-card"
            aria-hidden="true"
          />
        </motion.div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * Geospatial Hub Dashboard
 *
 * Follows the same theme system as map-preview.tsx:
 * - bg-card, text-foreground, border-border — auto light/dark
 * - No hardcoded maroon/dark colors
 * - Two-column layout: left (donut + stats) | right (map + hotspots)
 */
export default function GeospatialPreview() {
  const [inView, setInView] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="section-padding relative overflow-hidden bg-card"
      aria-labelledby="geospasial-heading"
    >
      <Container className="relative z-10">
        <div className="flex flex-col gap-10">

          {/* ── Section heading ── */}
          <SectionTitle
            eyebrow="Sistem Geospasial"
            title="Cinematic Geospatial Hub"
            subtitle="Akses peta interaktif, batas wilayah, tematik, dan simpul jaringan data geospasial resmi Provinsi Aceh."
            align="center"
          />

          {/* ── Dashboard panel ── */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="overflow-hidden rounded-3xl border border-border/50 bg-background shadow-2xl"
          >
            {/* Panel header */}
            <div className="flex items-center justify-between border-b border-border/50 px-5 py-3.5">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Geoportal Aceh — Live
                </span>
              </div>
              <a
                href={GEOPORTAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-lg border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-muted/80"
              >
                <ExternalLink className="h-3 w-3" />
                Buka Geoportal
              </a>
            </div>

            {/* Two-column body */}
            <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr]">

              {/* ── Left column ── */}
              <motion.div
                className="flex flex-col gap-0 border-b border-border/50 lg:border-b-0 lg:border-r"
                variants={staggerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Donut chart */}
                <motion.div variants={itemVariants} className="p-5">
                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Pembagian Data Tematik
                  </p>
                  <div className="flex items-center gap-4">
                    {/* Chart */}
                    <div className="h-[130px] w-[130px] shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={DONUT_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={38}
                            outerRadius={58}
                            paddingAngle={3}
                            dataKey="value"
                            strokeWidth={0}
                          >
                            {DONUT_DATA.map((entry) => (
                              <Cell key={entry.name} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip content={<DonutTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Legend */}
                    <div className="flex flex-col gap-2">
                      {DONUT_DATA.map((d) => (
                        <div key={d.name} className="flex items-center gap-2">
                          <span
                            className="h-2 w-2 shrink-0 rounded-full"
                            style={{ background: d.color }}
                          />
                          <span className="text-[10px] text-muted-foreground">{d.name}</span>
                          <span className="ml-auto text-[10px] font-bold" style={{ color: d.color }}>
                            {d.value}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="h-px w-full bg-border/50" />

                {/* Stat cards */}
                <motion.div variants={itemVariants} className="flex flex-col gap-2.5 p-5">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Ringkasan Data
                  </p>
                  <StatCard
                    icon={Database}
                    label="Total Dataset Spasial"
                    target={2300}
                    suffix="+"
                    inView={inView}
                    color="#8B1E1E"
                  />
                  <StatCard
                    icon={Layers}
                    label="Jumlah Layer Aktif"
                    target={150}
                    suffix="+"
                    inView={inView}
                    color="#D4AF37"
                  />
                  <StatCard
                    icon={Building2}
                    label="Produsen Data Terintegrasi"
                    target={48}
                    suffix=" SKPA"
                    inView={inView}
                    color="#34D399"
                  />
                </motion.div>
              </motion.div>

              {/* ── Right column — Map ── */}
              <motion.div
                className="flex flex-col"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Search bar */}
                <div className="flex items-center gap-2.5 border-b border-border/50 px-4 py-3">
                  <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <input
                    type="search"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Cari wilayah, layer, atau dataset spasial..."
                    className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
                    aria-label="Cari data geospasial"
                  />
                  <a
                    href={GEOPORTAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-lg bg-primary/10 px-2.5 py-1 text-[10px] font-semibold text-primary transition-all hover:bg-primary/20"
                  >
                    <MapPin className="h-3 w-3" />
                    Jelajah
                  </a>
                </div>

                {/* Map */}
                <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto lg:min-h-[360px] lg:flex-1">
                  {/* Map image */}
                  <img
                    src="/geospasial-peta.png"
                    alt="Peta Geospasial Provinsi Aceh"
                    className="absolute inset-0 z-0 h-full w-full object-cover"
                    draggable={false}
                  />

                  {/* Subtle overlay for readability */}
                  <div
                    className="absolute inset-0 z-[2]"
                    style={{
                      background:
                        "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 50%, rgba(0,0,0,0.25) 100%)",
                    }}
                    aria-hidden="true"
                  />

                  {/* Hotspots */}
                  {HOTSPOTS.map((h) => (
                    <Hotspot key={h.id} {...h} />
                  ))}

                  {/* Attribution */}
                  <div className="absolute bottom-2 right-3 z-20 text-[9px] text-white/40" aria-hidden="true">
                    © Geoportal Aceh
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
