import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Satu Data Aceh — Portal Data Terbuka Pemerintah Aceh",
    template: "%s | Satu Data Aceh",
  },
  description:
    "Portal data terbuka resmi Pemerintah Aceh. Akses ribuan dataset, visualisasi interaktif, dan wawasan berbasis data untuk mendukung pembangunan Aceh yang transparan dan berkelanjutan.",
  keywords: ["data aceh", "open data", "pemerintah aceh", "satu data", "dataset aceh"],
  authors: [{ name: "Pemerintah Aceh" }],
  creator: "Pemerintah Aceh",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://data.acehprov.go.id",
    siteName: "Satu Data Aceh",
    title: "Satu Data Aceh — Portal Data Terbuka Pemerintah Aceh",
    description:
      "Portal data terbuka resmi Pemerintah Aceh. Akses ribuan dataset dan visualisasi interaktif.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satu Data Aceh",
    description: "Portal data terbuka resmi Pemerintah Aceh.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F6F1" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0D0D" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
