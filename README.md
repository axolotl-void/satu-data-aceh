# 🏛️ Satu Data Aceh — Portal Data Terbuka Provinsi Aceh

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)

**Portal prototype terpadu untuk data sektoral, visualisasi geospasial, dan wawasan makro ekonomi Provinsi Aceh.**

[🌐 Demo Live](#) · [📋 Dokumentasi](#) · [🐛 Laporkan Bug](../../issues) · [💡 Usulkan Fitur](../../issues)

</div>

---

## 📖 Tentang Proyek

**Satu Data Aceh** adalah sebuah portal prototype yang dirancang untuk mengintegrasikan ribuan dataset sektoral dari berbagai Satuan Kerja Perangkat Aceh (SKPA) ke dalam satu platform yang terpadu, modern, dan mudah diakses oleh publik.

Proyek ini hadir sebagai jawaban atas kebutuhan nyata akan **transparansi data pemerintahan** dan **kebijakan berbasis bukti** (*evidence-based policy*). Dengan menggabungkan visualisasi geospasial interaktif, dashboard indikator makro ekonomi, direktori instansi, dan sistem kategorisasi dataset yang terstruktur, portal ini bertujuan menjadi jembatan antara data pemerintah dan masyarakat luas.

### 🎯 Tujuan Utama

- **Integrasi Data** — Menyatukan dataset dari puluhan SKPA dalam satu antarmuka yang konsisten
- **Aksesibilitas Publik** — Memudahkan masyarakat, peneliti, dan jurnalis mengakses data resmi
- **Transparansi Pemerintahan** — Mendorong keterbukaan informasi sebagai fondasi tata kelola yang baik
- **Dukungan Kebijakan** — Menyediakan indikator makro ekonomi dan sosial sebagai bahan analisis kebijakan

---

## 👨‍💻 Tentang Developer

<table>
  <tr>
    <td width="120" align="center">
      <img src="https://github.com/yogiprsty.png" width="80" style="border-radius:50%" alt="Yogi Prasetya Sadewa"/>
    </td>
    <td>
      <h3>Yogi Prasetya Sadewa</h3>
      <p>
        Seorang <strong>mahasiswa, developer, dan peneliti</strong> yang berfokus pada teknologi web modern, integrasi sistem data, dan <em>Cinematic UI/UX Design</em>. Memiliki ketertarikan mendalam pada persimpangan antara desain visual yang memukau dan arsitektur sistem yang solid — percaya bahwa antarmuka pemerintahan tidak harus membosankan untuk bisa dipercaya.
      </p>
      <p>
        Aktif mengeksplorasi bagaimana <strong>open data</strong> dan <strong>design thinking</strong> dapat bersinergi untuk menciptakan layanan publik digital yang benar-benar berpusat pada pengguna.
      </p>
    </td>
  </tr>
</table>

---

## ✨ Fitur Unggulan

| Fitur | Deskripsi |
|---|---|
| 🎬 **Cinematic Hero** | Landing page dengan video background, animasi stagger, dan batik frame corner |
| 📊 **Dashboard Analitik** | Visualisasi indikator makro ekonomi dan kesejahteraan sosial |
| 🗺️ **Peta Geospasial** | Integrasi dengan Geoportal Aceh untuk eksplorasi data spasial |
| 🗂️ **Direktori Dataset** | 12+ dataset dengan filter sidebar, search real-time, dan pagination |
| 🏛️ **Direktori Instansi** | 12 SKPA dengan animasi cascade blur-to-clear |
| 📁 **Kategori Data** | 10 grup kategori dengan logo Pancacita dan aura glow unik per kartu |
| 🎯 **Visi & Misi** | Tab interaktif dengan animasi pilar visi yang dramatis |
| 📰 **Berita Terbaru** | 6 kartu berita editorial dengan hover scale dan image zoom |
| 🌙 **Dark / Light Mode** | Tema adaptif penuh dengan transisi smooth |
| 📱 **Fully Responsive** | Dioptimalkan untuk mobile, tablet, dan desktop |

---

## 🛠️ Tech Stack & Alasan Pemilihan

### ⚡ Framework — Next.js 15 (React 19)

```
Alasan: Performa instant loading melalui Server-Side Rendering (SSR) dan
Static Site Generation (SSG) memastikan halaman terindeks optimal oleh
mesin pencari — krusial agar data publik mudah ditemukan masyarakat.
App Router Next.js 15 juga memungkinkan pemisahan Server/Client Components
yang menjaga bundle JavaScript tetap minimal.
```

### 🔷 Bahasa — TypeScript

```
Alasan: Strict typing berfungsi sebagai "sabuk pengaman" saat mengelola
data masif yang heterogen — Dataset, Institution, GeoFeature, StatItem —
sehingga bug tipe data terdeteksi saat compile-time, bukan saat runtime
di hadapan pengguna nyata.
```

### 🎨 Styling & UI — Tailwind CSS v4 & shadcn/ui

```
Alasan: Tailwind v4 menghasilkan bundle CSS yang sangat kecil karena
hanya menyertakan kelas yang benar-benar dipakai. shadcn/ui menyediakan
komponen aksesibel (Sheet, Dialog, Dropdown) yang dapat dikustomisasi
penuh untuk efek glassmorphism premium tanpa overhead library besar.
```

### 🎞️ Animasi — Framer Motion

```
Alasan: Kunci dari Cinematic Design. Animasi cascade, scroll reveal,
hover glow, dan spring entrance dirender langsung oleh GPU browser
(via CSS transform & opacity) — tidak membebani thread JavaScript
utama sehingga tetap smooth bahkan di perangkat mid-range.
```

### 📈 Visualisasi & Ikon — Recharts & Lucide React

```
Recharts: Library chart berbasis SVG yang ringan dan mudah dikustomisasi
untuk grafik bar, line, dan pie chart pada dashboard analitik.

Lucide React: Set ikon konsisten dengan tree-shaking sempurna —
hanya ikon yang diimport yang masuk ke bundle akhir.
```

---

## 📁 Struktur Folder

```
satu-data-aceh/
├── public/                         # Aset statis (gambar, video, SVG)
│   ├── berita/                     # Foto berita (berita-1.jpeg, dst.)
│   ├── Batik-frame.png             # Ornamen batik sudut hero
│   ├── batik-garis.png             # Divider batik horizontal
│   ├── Pancacita.svg               # Logo kategori dataset
│   └── video-aceh-landing-page.mp4 # Video background hero
│
└── src/
    ├── app/                        # Next.js App Router
    │   ├── dashboard/
    │   │   └── page.tsx            # Halaman dashboard analitik
    │   ├── dataset/
    │   │   └── page.tsx            # Halaman eksplorasi dataset
    │   ├── group/
    │   │   └── page.tsx            # Halaman kategori dataset
    │   ├── instansi/
    │   │   └── page.tsx            # Halaman direktori instansi
    │   ├── map/
    │   │   └── page.tsx            # Halaman peta geospasial
    │   ├── globals.css             # Design token & utility classes
    │   ├── layout.tsx              # Root layout (font, theme provider)
    │   └── page.tsx                # Homepage (orkestrasi semua section)
    │
    ├── components/
    │   ├── custom/
    │   │   └── cinematic-glow.tsx  # Komponen ambient glow orb
    │   ├── layout/
    │   │   ├── container.tsx       # Wrapper layout responsif
    │   │   ├── navbar.tsx          # Navigasi floating dengan mobile sheet
    │   │   └── section-title.tsx   # Komponen judul section
    │   └── ui/                     # Komponen shadcn/ui
    │       ├── button.tsx
    │       ├── dialog.tsx
    │       ├── dropdown-menu.tsx
    │       └── sheet.tsx
    │
    ├── data/
    │   └── mock.ts                 # Data statis (STATS, INSTITUTIONS)
    │
    ├── hooks/
    │   └── use-scroll.ts           # Hook tracking posisi & arah scroll
    │
    ├── sections/
    │   └── homepage/
    │       ├── hero-section.tsx        # Cinematic hero dengan video & stat counter
    │       ├── stats-section.tsx       # Statistik platform
    │       ├── dashboard-preview.tsx   # Teaser dashboard analitik
    │       ├── vision-mission-section.tsx # Tab Visi & Misi interaktif
    │       ├── map-preview.tsx         # Teaser peta geospasial
    │       ├── topics-section.tsx      # Grid kategori topik data
    │       ├── institutions-section.tsx # Kartu instansi pemerintah
    │       ├── news-section.tsx        # Kartu berita editorial
    │       ├── insights-section.tsx    # Dashboard indikator makro
    │       └── footer-section.tsx      # Footer premium dengan batik frame
    │
    ├── types/
    │   └── index.ts                # Type definitions (Dataset, Institution, dll.)
    │
    └── providers/
        └── theme-provider.tsx      # next-themes provider
```

---

## 🚀 Panduan Menjalankan Proyek Secara Lokal

### Prasyarat

Pastikan perangkat Anda telah terinstal:
- **Node.js** versi `18.17` atau lebih baru
- **npm** versi `9+` (atau `yarn` / `pnpm`)
- **Git**

### Langkah Instalasi

**1. Clone repositori ini ke komputer lokal Anda**

```bash
git clone https://github.com/yogiprsty/satu-data-aceh.git
```

**2. Masuk ke direktori project**

```bash
cd satu-data-aceh
```

**3. Install semua dependensi yang dibutuhkan**

```bash
npm install
```

> Proses ini akan mengunduh Next.js, Framer Motion, Tailwind CSS, dan semua library lain yang tercantum di `package.json`.

**4. Jalankan development server**

```bash
npm run dev
```

**5. Buka browser dan akses**

```
http://localhost:3000
```

Portal akan berjalan dalam mode development dengan hot-reload aktif — setiap perubahan kode akan langsung terlihat di browser.

### Perintah Lainnya

```bash
# Build untuk production
npm run build

# Jalankan versi production secara lokal
npm run start

# Jalankan linter untuk memeriksa kualitas kode
npm run lint
```

---

## 🗺️ Peta Jalan (Roadmap)

- [x] Homepage dengan Cinematic Hero Section
- [x] Halaman Dataset dengan filter & search
- [x] Halaman Instansi / Produsen Data
- [x] Halaman Kategori (Group)
- [x] Seksi Visi & Misi interaktif
- [x] Seksi Berita Terbaru
- [x] Dashboard Indikator Makro (Data Insight)
- [x] Responsif Mobile
- [ ] Integrasi API data real dari backend
- [ ] Halaman detail dataset
- [ ] Fitur unduh dataset
- [ ] Dashboard analitik interaktif dengan Recharts
- [ ] Autentikasi pengguna (login portal)
- [ ] Peta geospasial interaktif terintegrasi

---

## 🤝 Kontribusi & Kolaborasi

Proyek ini terbuka untuk kontribusi, kritik konstruktif, dan saran pengembangan dari siapa pun. Jika Anda menemukan bug, memiliki ide fitur baru, atau ingin berdiskusi tentang arsitektur sistem, jangan ragu untuk:

1. **Fork** repositori ini
2. Buat **branch** baru (`git checkout -b fitur/nama-fitur`)
3. **Commit** perubahan Anda (`git commit -m 'feat: tambah fitur X'`)
4. **Push** ke branch (`git push origin fitur/nama-fitur`)
5. Buka **Pull Request**

Untuk diskusi lebih lanjut, silakan buka [Issues](../../issues) atau hubungi langsung melalui profil GitHub.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah **MIT License** — bebas digunakan, dimodifikasi, dan didistribusikan dengan tetap mencantumkan atribusi kepada pengembang asli.

---

## ⭐ Dukungan

Jika proyek ini bermanfaat bagi Anda — baik sebagai referensi belajar, inspirasi desain, maupun kontribusi nyata terhadap ekosistem open data Indonesia — pertimbangkan untuk memberikan **⭐ Star** pada repositori ini.

Setiap bintang adalah motivasi nyata untuk terus mengembangkan dan menyempurnakan portal ini.

---

<div align="center">

**Dibangun dengan ❤️ untuk Aceh dan Indonesia**

*"Data Akurat, Kebijakan Tepat, Masyarakat Sejahtera."*

---

© 2026 **Yogi Prasetya Sadewa** · [GitHub](https://github.com/yogiprsty)

</div>
