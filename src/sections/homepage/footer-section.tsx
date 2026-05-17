import Link from "next/link";
import { Database, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/container";
import { BatikPattern } from "@/components/custom/batik-pattern";

const FOOTER_LINKS = {
  platform: [
    { label: "Dataset", href: "/dataset" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Peta Interaktif", href: "/map" },
    { label: "Wawasan Data", href: "/insights" },
  ],
  tentang: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Kebijakan Data", href: "/policy" },
    { label: "Panduan Penggunaan", href: "/guide" },
    { label: "API Dokumentasi", href: "/api-docs" },
  ],
  instansi: [
    { label: "BPS Aceh", href: "/institutions/bps" },
    { label: "BAPPEDA Aceh", href: "/institutions/bappeda" },
    { label: "Dinas Kesehatan", href: "/institutions/dinkes" },
    { label: "Semua Instansi", href: "/institutions" },
  ],
};

/**
 * Footer Section — Site footer with links, contact, and branding
 */
export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden border-t border-border/50 bg-card"
      aria-label="Footer Satu Data Aceh"
    >
      {/* Batik pattern */}
      <BatikPattern opacity={0.03} variant="pinto-aceh" />

      <Container className="relative z-10">
        {/* Main footer content */}
        <div className="grid gap-10 py-16 lg:grid-cols-4">

          {/* Brand column */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-foreground"
              aria-label="Satu Data Aceh — Beranda"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Database className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold">
                Satu Data <span className="gradient-text font-bold">Aceh</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Portal data terbuka resmi Pemerintah Aceh. Mendukung transparansi,
              akuntabilitas, dan pembangunan berbasis data.
            </p>

            {/* Contact */}
            <address className="flex flex-col gap-2 not-italic">
              {[
                { icon: MapPin, text: "Banda Aceh, Provinsi Aceh, Indonesia" },
                { icon: Mail, text: "data@acehprov.go.id" },
                { icon: Phone, text: "+62 651 000 0000" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{text}</span>
                </div>
              ))}
            </address>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-3">
            {Object.entries(FOOTER_LINKS).map(([key, links]) => (
              <div key={key} className="flex flex-col gap-4">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  {key === "platform" ? "Platform" : key === "tentang" ? "Tentang" : "Instansi"}
                </h3>
                <ul className="flex flex-col gap-2.5" role="list">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/50 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {currentYear} Pemerintah Aceh. Satu Data Aceh. Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Syarat Penggunaan
            </Link>
            <a
              href="https://data.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 transition-colors hover:text-foreground"
            >
              Portal Data Nasional
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
