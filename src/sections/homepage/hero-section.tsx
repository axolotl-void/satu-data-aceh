"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion, type Variants,
  useMotionValue, useTransform, animate as motionAnimate,
} from "framer-motion";
import {
  Search, ArrowRight,
  Database, PieChart, FileText, PlayCircle, BookOpen,
} from "lucide-react";

// ─── Animation Variants ───────────────────────────────────────────────────────

/**
 * Stagger container — orchestrates children with 0.15s gap.
 * delayChildren: 0.1s gives the video a moment to render first.
 */
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Primary item reveal — moves up + fades in + unblurs.
 * Bezier [0.16, 1, 0.3, 1] = fast start, very slow ease-out (expo-like).
 * This gives the "premium cinematic" feel where motion decelerates elegantly.
 */
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/**
 * Stat cards — scale-up variant, appears after main content.
 * Uses its own transition so it can override duration/ease independently.
 */
const statVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/**
 * Stat container — stagger the three cards with a short gap.
 * Extra delayChildren pushes stats to appear after search bar.
 */
const statContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/**
 * Scroll indicator — simple fade, last to appear.
 */
const scrollIndicatorVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Database,    value: 8917, label: "Dataset"                   },
  { icon: PieChart,    value: 101,  label: "Infografik"                },
  { icon: FileText,    value: 53,   label: "Artikel"                   },
  { icon: PlayCircle,  value: 21,   label: "VideoGrafis"               },
  { icon: BookOpen,    value: 18,   label: "Kertas Kerja Kebijakan"    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/**
 * Cinematic video background.
 * No animation — video starts immediately for instant cinematic impact.
 * Gradient overlay: 5-stop from semi-transparent top → solid maroon bottom.
 */
function VideoBackground() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {/* ── Video ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 z-0 h-full w-full object-cover"
      >
        <source src="/video-aceh-landing-page.mp4" type="video/mp4" />
      </video>

      {/* ── Multi-stop gradient overlay ──
          top    → semi-transparent  (blends with floating navbar)
          middle → maroon dark       (cinematic depth)
          bottom → solid #1A0509     (seamless transition to next section) */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(26,5,9,0.55)  0%,
            rgba(26,5,9,0.60) 30%,
            rgba(26,5,9,0.72) 60%,
            rgba(26,5,9,0.92) 85%,
            #1A0509           100%
          )`,
        }}
      />

      {/* ── Edge vignette ── */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 120% 100% at 50% 50%, transparent 40%, rgba(26,5,9,0.6) 100%)",
        }}
      />
    </div>
  );
}

/** Decorative gold glow rule */
function GoldRule({ className }: { className?: string }) {
  return (
    <div
      className={`relative h-px w-24 overflow-visible ${className ?? ""}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />
      <div
        className="absolute inset-x-0 -top-px h-[3px] blur-sm"
        style={{
          background:
            "linear-gradient(90deg,transparent,rgba(251,191,36,.9),transparent)",
        }}
      />
    </div>
  );
}

/**
 * Batik Frame — 4-corner configuration
 *
 * Source image /Batik-frame.png is oriented for the Top-Left corner
 * (motif faces inward = toward bottom-right).
 *
 * Mirroring strategy — CSS 2D scale (NOT rotateX/rotateY which require
 * a perspective context and behave inconsistently across browsers):
 *
 *   Top-Left     → no flip              natural orientation
 *   Top-Right    → scaleX(-1)           mirror horizontally
 *   Bottom-Left  → scaleY(-1)           mirror vertically
 *   Bottom-Right → scaleX(-1) scaleY(-1) mirror both axes
 *
 * Each corner slides in from its respective outside edge.
 * opacity animates to 0.5 — accent, never dominant.
 * mix-blend-screen — gold glows on dark video, black areas vanish.
 */
function BatikFrame() {
  const CORNERS = [
    {
      key: "top-left",
      pos: "top-0 left-0",
      flip: "scaleY(-1)",           // flip vertical → motif menghadap ke atas (keluar dari atas)
      initial: { opacity: 0, x: -30, y: -30 },
      animate: { opacity: 0.5, x: 0, y: 0 },
      delay: 0.5,
    },
    {
      key: "top-right",
      pos: "top-0 right-0",
      flip: "scaleX(-1) scaleY(-1)", // flip keduanya → motif menghadap ke atas + mirror horizontal
      initial: { opacity: 0, x: 30, y: -30 },
      animate: { opacity: 0.5, x: 0, y: 0 },
      delay: 0.6,
    },
    {
      key: "bottom-left",
      pos: "bottom-0 left-0",
      flip: "none",                  // orientasi asli → motif menghadap ke bawah (keluar dari bawah)
      initial: { opacity: 0, x: -30, y: 30 },
      animate: { opacity: 0.5, x: 0, y: 0 },
      delay: 0.7,
    },
    {
      key: "bottom-right",
      pos: "bottom-0 right-0",
      flip: "scaleX(-1)",            // mirror horizontal saja → motif menghadap ke bawah + mirror
      initial: { opacity: 0, x: 30, y: 30 },
      animate: { opacity: 0.5, x: 0, y: 0 },
      delay: 0.8,
    },
  ] as const;

  return (
    <>
      {CORNERS.map(({ key, pos, flip, initial, animate, delay }) => (
        /* Wrapper div holds the CSS flip — Framer Motion won't touch it.
           motion.img inside handles only x/y/opacity animation.          */
        <div
          key={key}
          className={`pointer-events-none absolute z-[15] w-14 select-none sm:w-20 md:w-32 lg:w-44 ${pos}`}
          style={{ transform: flip }}
          aria-hidden="true"
        >
          <motion.img
            src="/Batik-frame.png"
            alt=""
            draggable={false}
            className="w-full h-auto block"
            style={{ mixBlendMode: "screen" }}
            initial={initial}
            animate={animate}
            transition={{ duration: 1.2, ease: "easeOut", delay }}
          />
        </div>
      ))}
    </>
  );
}


function HUDSearch() {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    /* motion.div inherits itemVariants from parent stagger container */
    <motion.div className="w-full max-w-2xl" variants={itemVariants}>
      {/* Outer glow ring */}
      <div
        className="relative rounded-2xl transition-all duration-500"
        style={{
          boxShadow: focused
            ? "0 0 0 1px rgba(245,158,11,0.5), 0 0 30px rgba(245,158,11,0.18), 0 8px 32px rgba(0,0,0,0.4)"
            : "0 0 0 1px rgba(255,255,255,0.08), 0 8px 32px rgba(0,0,0,0.35)",
        }}
      >
        <div
          className="flex items-center overflow-hidden rounded-2xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: focused
              ? "1px solid rgba(245,158,11,0.45)"
              : "1px solid rgba(255,255,255,0.10)",
            transition: "border-color 0.3s ease",
          }}
        >
          {/* Search icon */}
          <div className="flex h-14 w-14 shrink-0 items-center justify-center">
            <Search
              className="h-5 w-5 transition-colors duration-300"
              style={{
                color: focused ? "rgba(251,191,36,0.9)" : "rgba(255,255,255,0.4)",
              }}
            />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="search"
            placeholder="Cari data, instansi, sektoral, atau topik di sini..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="h-14 flex-1 bg-transparent text-sm text-white/90 placeholder:text-white/35 focus:outline-none"
            aria-label="Cari dataset Satu Data Aceh"
          />

          {/* Execute button */}
          <div className="p-2">
            <button
              type="submit"
              className="group flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-200 active:scale-95"
              style={{
                background:
                  "linear-gradient(135deg, #8B1E1E 0%, #A62929 50%, #7A1818 100%)",
                boxShadow:
                  "0 2px 12px rgba(139,30,30,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
                color: "#FDE68A",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 4px 20px rgba(139,30,30,0.7), 0 0 0 1px rgba(245,158,11,0.3), inset 0 1px 0 rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow =
                  "0 2px 12px rgba(139,30,30,0.5), inset 0 1px 0 rgba(255,255,255,0.1)";
              }}
            >
              <span className="hidden sm:inline">Cari Sekarang</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick-search hint tags */}
      <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
        <span className="text-xs text-white/25">Populer:</span>
        {["PDRB Aceh", "Kependudukan", "Kesehatan", "APBA 2024"].map((tag) => (
          <button
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-white/45 transition-all hover:border-amber-500/30 hover:bg-white/10 hover:text-amber-300"
          >
            {tag}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

/**
 * AnimatedNumber — counts from 0 to `value` on mount.
 *
 * Uses useMotionValue + useTransform to round and format the number,
 * then motionAnimate() to drive the count with easeOut deceleration.
 * Syncs with the parent stagger: counting starts when the card becomes
 * visible (triggered by `inView` prop from the parent StatCard).
 */
function AnimatedNumber({
  value,
  inView,
}: {
  value: number;
  inView: boolean;
}) {
  const motionVal = useMotionValue(0);

  // Round + format with Indonesian locale (3587 → "3.587")
  const display = useTransform(motionVal, (v) =>
    Math.round(v).toLocaleString("id-ID")
  );

  useEffect(() => {
    if (!inView) return;

    // value = 0 → show "0" immediately, no animation needed
    if (value === 0) {
      motionVal.set(0);
      return;
    }

    const controls = motionAnimate(motionVal, value, {
      duration: 2.5,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [inView, value, motionVal]);

  return <motion.span>{display}</motion.span>;
}

/**
 * StatCard — glassmorphic card with counting number animation.
 *
 * Entrance: inherits statVariants from parent stagger container.
 * Counting: starts when the card enters the viewport (inView state).
 * Hover:    border glows amber, icon scales up.
 */
function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: number;
  label: string;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Trigger counting when card becomes visible
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      variants={statVariants}
      className="group relative flex flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl p-3 text-center transition-all duration-300 md:gap-2 md:p-5"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
      whileHover={{
        y: -4,
        borderColor: "rgba(245,158,11,0.5)",
        boxShadow: "0 0 30px rgba(245,158,11,0.15), 0 8px 32px rgba(0,0,0,0.3)",
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Icon */}
      <Icon
        className="h-4 w-4 text-zinc-300 transition-all duration-300 group-hover:scale-110 group-hover:text-amber-400 md:h-5 md:w-5"
      />

      {/* Counting number */}
      <p className="text-xl font-bold leading-none tracking-tight text-white transition-colors duration-300 group-hover:text-amber-400 drop-shadow-md md:text-3xl lg:text-4xl">
        <AnimatedNumber value={value} inView={inView} />
      </p>

      {/* Label */}
      <p className="text-[9px] font-medium leading-tight text-zinc-300 md:text-xs md:mt-1">
        {label}
      </p>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

/**
 * Cinematic Hero Section — Staggered Reveal Edition
 *
 * Z-index stack:
 *   z-0    <video>  — plays immediately, no animation
 *   z-10   gradient overlay + vignette
 *   z-[15] BatikFrame — top-left & bottom-right Batik-frame.png accents
 *   z-20   stagger container → all content items
 *
 * Stagger sequence (0.15s apart, starting at 0.1s):
 *   #1  Tagline          (itemVariants — blur + fadeUp)
 *   #2  Headline block   (itemVariants — blur + fadeUp)
 *   #3  Sub-headline     (itemVariants — blur + fadeUp)
 *   #4  HUD Search       (itemVariants — blur + fadeUp)
 *   #5  Stats wrapper    (statContainerVariants → 3× statVariants scale-up)
 *   #6  Scroll indicator (scrollIndicatorVariants — fade only)
 */
export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* ── Layer 1: Video + overlays (no animation) ── */}
      <VideoBackground />

      {/* ── Layer 1.5: Batik frame corner accents ── */}
      <BatikFrame />

      {/* ── Layer 2: Stagger container ── */}
      <motion.div
        className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-4 pb-24 pt-28 text-center sm:gap-8 sm:px-6 sm:pb-32 sm:pt-36 lg:px-8 lg:pt-40"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ── Item 1: Tagline ── */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3"
        >
          <div
            className="hidden h-px w-8 bg-amber-400/40 sm:block"
            aria-hidden="true"
          />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs"
            style={{ color: "rgba(251,191,36,0.75)" }}
          >
            Portal Resmi Data Terbuka Provinsi Aceh
          </span>
          <div
            className="hidden h-px w-8 bg-amber-400/40 sm:block"
            aria-hidden="true"
          />
        </motion.div>

        {/* ── Item 2: Main headline ── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-3"
        >
          <h1
            id="hero-heading"
            className="text-4xl font-black tracking-tight sm:text-5xl md:text-7xl lg:text-8xl xl:text-[96px]"
            style={{
              background:
                "linear-gradient(160deg, #FFFFFF 0%, #FFFFFF 45%, #FDE68A 75%, #F59E0B 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(234,179,8,0.18))",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            SATU DATA
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #F59E0B 0%, #FDE68A 40%, #F59E0B 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ACEH
            </span>
          </h1>
          <GoldRule className="mt-1" />
        </motion.div>

        {/* ── Item 3: Sub-headline ── */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-sm leading-relaxed text-white/55 sm:text-base sm:leading-loose"
        >
          Mewujudkan tata kelola pemerintahan yang transparan, akurat, dan
          terintegrasi melalui penyediaan data sektoral yang valid dan mudah
          diakses.
        </motion.p>

        {/* ── Item 4: HUD Search (inherits itemVariants internally) ── */}
        <HUDSearch />

        {/* ── Item 5: Stat counters ── */}
        <motion.div
          variants={itemVariants}
          className="mt-4 w-full"
        >
          {/* Thin divider */}
          <div
            className="mx-auto mb-6 h-px max-w-sm"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)",
            }}
            aria-hidden="true"
          />

          {/* Stat cards — 5 items always in one row */}
          <motion.div
            className="mx-auto flex w-full max-w-4xl flex-row gap-2 md:gap-3"
            variants={statContainerVariants}
          >
            {STATS.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator (outside stagger, delayed fade) ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
        variants={scrollIndicatorVariants}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
          Gulir ke bawah
        </span>
        <div
          className="flex h-8 w-5 items-start justify-center rounded-full border pt-1.5"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}
        >
          <motion.div
            className="h-1.5 w-1 rounded-full bg-amber-400/60"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
