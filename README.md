# Lughati — Web (Next.js)

Antarmuka **landing page** Lughati: aplikasi belajar bahasa Arab **Fushah** dan
**Amiyah Saudi** (Najdi sebagai acuan, Hijazi sebagai pembanding). Dibangun
dengan Next.js App Router, React, TypeScript, Tailwind CSS v4, dan ESLint.

> Status: **UI/landing saja**. Autentikasi, halaman pelajaran, API, dan
> penyimpanan progres belum diimplementasikan di app ini. Aplikasi lama
> (vanilla Node + SQLite) tetap berada di `../app/` dan tidak diubah.

## Menjalankan

```powershell
npm install        # sekali saja
npm run dev        # http://localhost:3000
npm run lint       # ESLint (eslint-config-next)
npm run build      # build produksi + typecheck
npm start          # jalankan hasil build
```

Butuh Node.js 20.9+ (disarankan 22/24). Font Latin & Arab diambil dari Google
Fonts saat build lewat `next/font`, jadi build pertama memerlukan jaringan.

## Struktur

```text
src/
├─ app/
│  ├─ layout.tsx        # metadata, font, skrip tema (anti-flash)
│  ├─ page.tsx          # seluruh section landing page
│  └─ globals.css       # token warna, pola dekoratif, animasi
├─ components/
│  ├─ site-header.tsx   # header sticky + menu mobile
│  ├─ site-footer.tsx
│  ├─ track-preview.tsx # kartu pratinjau Fushah/Amiyah (client)
│  ├─ lesson-showcase.tsx # tab Materi/Kosakata/Dialog/Kuis (client)
│  ├─ faq-accordion.tsx
│  ├─ theme-toggle.tsx  # mode gelap/terang
│  ├─ brand.tsx
│  ├─ icons.tsx         # ikon SVG inline (tanpa dependency ikon)
│  └─ ui.tsx            # Container, SectionHeading, badge
└─ lib/
   ├─ curriculum.ts     # data 12 minggu, frasa, dialog, FAQ, statistik
   └─ cn.ts
```

## Sumber data

Data di `src/lib/curriculum.ts` **disalin manual** dari kurikulum kanonik di
`../content/fushah/` dan `../content/amiyah-saudi/` (Minggu 1). Folder
`content/` tidak diimpor langsung karena berada di luar root Next.js.

Saat menambah materi:

1. Ubah sumber kanonik di `../content/...`.
2. Sinkronkan entri yang tampil di `src/lib/curriculum.ts`.
3. Jaga kejujuran konten: audio **belum ada** (manifest masih produksi), dan
   semua materi berstatus `review`. Jangan menambahkan klaim audio final atau
   testimoni fiktif.

## Catatan desain

- Token warna semantik (`--paper`, `--ink`, `--muted`, `--line`, `--brand`)
  didefinisikan di `globals.css` dan dibalik di class `.dark`.
- Tema gelap dipilih lewat `ThemeToggle` (localStorage `lughati-theme`), dengan
  skrip inline di `layout.tsx` agar tidak berkedip saat muat.
- Teks Arab memakai `font-arabic` (Noto Naskh Arabic) dan selalu diberi
  `lang="ar" dir="rtl"`. Transliterasi tetap Latin.
- Semua navigasi memakai anchor dalam satu halaman (`#ragam`, `#kurikulum`,
  `#pratinjau`, `#fitur`, `#faq`, `#daftar`).
- Tanpa library ikon/animasi tambahan; ikon SVG inline dan animasi CSS.

## Verifikasi cepat

```powershell
npm run lint
npm run build
```

Checklist manual yang sudah diuji pada 360/390/768/1440 px: tidak ada overflow
horizontal, font Arab termuat, tab pratinjau & kuis berfungsi, FAQ bisa
dibuka/tutup, menu mobile menutup setelah navigasi, dan toggle tema tersimpan.
