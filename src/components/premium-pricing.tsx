"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { useCheckoutFlow } from "./checkout-flow";
import { IconArrowRight, IconBadgeCheck, IconMinus, IconSparkles } from "./icons";

type Billing = "monthly" | "annual";
type Feature = { text: string; strong?: boolean };

const freeIncluded: Feature[] = [
  { text: "Akses Modul Pemula (Level A1 Dasar)" },
  { text: "Kuota Audio Terbatas 200 Menit / bln" },
  { text: "150 Bank Kosakata & Flashcard Dasar" },
  { text: "Kuis & Penilaian Otomatis Standar" },
  { text: "Dashboard Progres Belajar Dasar" },
];

const freeExcluded = [
  "Audio Dialek Saudi Tanpa Batas",
  "Modul Bisnis & Negosiasi Najdi/Hijazi",
  "Sertifikat Digital Kelulusan Resmi",
];

const proFeatures: Feature[] = [
  { text: "Akses Penuh Seluruh Materi Fushah (Nahwu, Sharaf, Balaghah)", strong: true },
  { text: "Akses Penuh 500+ Dialog Amiyah Saudi (Najdi & Hijazi)" },
  { text: "Streaming & Unduh Audio Penutur Asli Unlimited", strong: true },
  { text: "Algoritma Spaced Repetition (SRS) Flashcard Cerdas" },
  { text: "Visualisasi Morfologi / Tashrif Interaktif Lengkap" },
  { text: "Ujian Sertifikasi Resmi Level A1 - B2" },
  { text: "Sertifikat Digital Lughati dengan ID Kredensial Unik" },
];

const vipFeatures: Feature[] = [
  { text: "Modul Khusus Bahasa Arab Bisnis, Diplomasi & Medis Saudi" },
  { text: "Modul Percakapan Umrah, Haji & Negosiasi Souq Tradisional" },
  { text: "Akses Tanya Mu’allim (Forum Khusus Ustadz Native)", strong: true },
  { text: "Prioritas Akses Fitur Koreksi Suara AI & Spektrogram" },
  { text: "Rapor Belajar Mingguan via WhatsApp & Email" },
  { text: "Lisensi Multi-Perangkat (Akses 2 Gadget Bersamaan)" },
];

const baseCard =
  "flex flex-col justify-between rounded-2xl border border-line/70 bg-surface p-6 shadow-sm sm:p-8";

function FeatureList({ items }: { items: Feature[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li
          key={item.text}
          className="flex items-start gap-2.5 text-[12px] leading-5 text-ink"
        >
          <IconBadgeCheck className="mt-0.5 size-4 shrink-0 text-brand" />
          <span className={cn(item.strong && "font-semibold text-brand")}>
            {item.text}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function PremiumPricing() {
  const [billing, setBilling] = useState<Billing>("annual");
  const { openCheckout } = useCheckoutFlow();

  const annual = billing === "annual";

  return (
    <section id="pricing-matrix" className="scroll-mt-28 flex flex-col gap-8">
      <div className="flex justify-center">
        <div
          role="group"
          aria-label="Pilihan periode tagihan"
          className="inline-flex items-center rounded-full bg-line/40 p-1.5"
        >
          <button
            type="button"
            aria-pressed={!annual}
            onClick={() => setBilling("monthly")}
            className={cn(
              "rounded-full px-5 py-2 text-[12px] transition-all",
              annual
                ? "font-medium text-muted hover:text-ink"
                : "bg-surface font-bold text-brand shadow-sm",
            )}
          >
            Tagihan Bulanan
          </button>
          <button
            type="button"
            aria-pressed={annual}
            onClick={() => setBilling("annual")}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-2 text-[12px] transition-all",
              annual
                ? "bg-surface font-bold text-brand shadow-sm"
                : "font-medium text-muted hover:text-ink",
            )}
          >
            Tahunan
            <span className="rounded-full bg-sand-200 px-2 py-0.5 text-[10px] font-bold text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
              HEMAT 49%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3 lg:gap-8">
        {/* Free */}
        <article className={baseCard}>
          <div>
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="rounded-full bg-paper px-3 py-1 text-[10px] font-semibold text-muted">
                FREE TIER
              </span>
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic text-[14px] text-muted"
              >
                حِسَابٌ مَجَّانِيٌّ
              </span>
            </div>
            <h3 className="mb-2 text-[18px] font-bold text-ink">Paket Gratis</h3>
            <p className="mb-6 min-h-10 text-[12px] leading-5 text-muted">
              Akses materi dasar untuk mengenal struktur dasar Fushah dan kosa
              kata percakapan santai.
            </p>
            <div className="mb-6 flex items-baseline gap-1.5">
              <span className="text-[30px] font-bold leading-none text-ink">Rp 0</span>
              <span className="text-[12px] text-muted">/ selamanya</span>
            </div>
            <div className="mb-6 h-px w-full bg-line/70" />
            <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-muted">
              Mencakup Fitur:
            </p>
            <FeatureList items={freeIncluded} />
            <ul className="mt-4 flex flex-col gap-3">
              {freeExcluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-[12px] leading-5 text-muted/60 line-through"
                >
                  <IconMinus className="mt-0.5 size-4 shrink-0 text-muted/50" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <button
            type="button"
            disabled
            className="mt-8 w-full cursor-not-allowed rounded-lg bg-paper py-3 text-center text-[12px] font-semibold text-muted"
          >
            Paket Anda Saat Ini
          </button>
        </article>

        {/* Pro */}
        <article
          className={cn(
            baseCard,
            "relative shadow-xl ring-2 ring-sand-300/70 dark:ring-sand-400/40 lg:-mt-4",
          )}
        >
          <div className="absolute -top-3.5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-sand-200 px-4 py-1 text-[10px] font-bold uppercase tracking-wide text-sand-900 shadow-sm dark:bg-sand-300 dark:text-sand-900">
            <IconSparkles className="size-3.5" />
            Paling Favorit • Rekomendasi
          </div>
          <div>
            <div className="mb-4 mt-2 flex items-center justify-between gap-2">
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                PRO LEARNER
              </span>
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic text-[14px] font-bold text-brand"
              >
                مُتَعَلِّمٌ مُحْتَرِفٌ
              </span>
            </div>
            <h3 className="mb-2 text-[18px] font-bold text-ink">
              Jalur Pilihan (Dual-Track)
            </h3>
            <p className="mb-6 min-h-10 text-[12px] leading-5 text-muted">
              Pilihan ideal untuk santri, mahasiswa, ekspatriat, dan pembelajar
              serius yang ingin fasih Fushah &amp; Amiyah.
            </p>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-[30px] font-bold leading-none text-ink">
                {annual ? "Rp 25.000" : "Rp 49.000"}
              </span>
              <span className="text-[12px] text-muted">/ bulan</span>
            </div>
            <p className="mb-6 text-[10px] font-semibold text-brand">
              {annual
                ? "Ditagih tahunan Rp 300.000 (Hemat Rp 288.000)"
                : "Ditagih bulanan, batalkan kapan saja"}
            </p>
            <div className="mb-6 h-px w-full bg-line/70" />
            <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-ink">
              Semua Fitur Free, Ditambah:
            </p>
            <FeatureList items={proFeatures} />
          </div>
          <button
            type="button"
            onClick={() => openCheckout("Pro Learner (Dual-Track)")}
            title="Pratinjau — membuka modal checkout demo"
            className="group mt-8 flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-950 py-3.5 text-[12px] font-bold text-white shadow-md transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          >
            Pilih Pro Learner (Coba 7 Hari)
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </article>

        {/* VIP */}
        <article className={baseCard}>
          <div>
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="rounded-full bg-paper px-3 py-1 text-[10px] font-bold text-ink">
                VIP LIFETIME / CAREER
              </span>
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic text-[14px] font-bold text-ink"
              >
                الْعُضْوِيَّةُ الشَّامِلَةُ
              </span>
            </div>
            <h3 className="mb-2 text-[18px] font-bold text-ink">
              Academic &amp; Saudi Career
            </h3>
            <p className="mb-6 min-h-10 text-[12px] leading-5 text-muted">
              Untuk profesional, calon diplomat, jemaah haji/umrah eksekutif, dan
              akademisi yang butuh materi karir intensif.
            </p>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="text-[30px] font-bold leading-none text-ink">
                {annual ? "Rp 250.000" : "Rp 99.000"}
              </span>
              <span className="text-[12px] text-muted">
                {annual ? "/ sekali bayar" : "/ bulan"}
              </span>
            </div>
            <p className="mb-6 text-[10px] font-semibold text-brand">
              {annual
                ? "Akses Seumur Hidup (Lifetime) Termasuk Semua Update Masa Depan"
                : "Atau opsi lifetime sekali bayar Rp 250.000"}
            </p>
            <div className="mb-6 h-px w-full bg-line/70" />
            <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-muted">
              Semua Fitur Pro, Ditambah:
            </p>
            <FeatureList items={vipFeatures} />
          </div>
          <button
            type="button"
            onClick={() => openCheckout("Academic VIP (Lifetime)")}
            title="Pratinjau — membuka modal checkout demo"
            className="mt-8 w-full rounded-lg bg-brand py-3.5 text-center text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            Pilih Academic VIP
          </button>
        </article>
      </div>

      <p className="text-center text-[10px] text-muted">
        Semua harga, promo, dan fitur di atas adalah contoh untuk pratinjau UI —
        tidak ada paket, tagihan, atau pembayaran nyata.
      </p>
    </section>
  );
}
