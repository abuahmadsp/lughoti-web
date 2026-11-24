import Link from "next/link";
import { FlashcardReview } from "./flashcard-review";
import {
  VocabularyActionButton,
  VocabularyActionsProvider,
} from "./vocabulary-actions";
import { VocabularyCatalog } from "./vocabulary-catalog";
import {
  IconArrowRight,
  IconBadgeCheck,
  IconBell,
  IconBook,
  IconBranch,
  IconFlag,
  IconGrid,
  IconLightbulb,
  IconRefresh,
  IconSparkles,
  IconTarget,
  IconTrendingUp,
  IconZap,
} from "./icons";

const statCard =
  "flex items-center justify-between gap-4 rounded-xl border border-line/70 bg-surface p-5 shadow-sm";
const widgetCard =
  "flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6";

function PageHeader() {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-line/70 bg-paper p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 transition-colors hover:text-brand"
          >
            <IconGrid className="size-3.5" />
            Dashboard
          </Link>
          <span aria-hidden="true" className="text-line">
            /
          </span>
          <span className="font-semibold text-ink">Kosakata &amp; Flashcard</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            <span
              aria-hidden="true"
              className="size-1.5 animate-pulse rounded-full bg-brand"
            />
            Algoritma SRS SuperMemo-2 Aktif
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-line/40 px-2.5 py-1 text-[10px] font-medium text-muted">
            <IconRefresh className="size-3.5" />
            Sinkronisasi Terakhir: Baru saja
          </span>
          <span className="rounded-full border border-line/70 bg-surface px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
            Data demo
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-2">
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Bank Kosakata &amp; Flashcard Interaktif
            </h1>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-2xl font-bold leading-none text-brand/80"
            >
              بَنْكُ المُفْرَدَاتِ وَالبِطَاقَات
            </span>
          </div>
          <p className="text-[13px] leading-6 text-muted">
            Kuasai 850+ kosakata bahasa Arab Fushah dan dialek Amiyah Saudi
            melalui sistem pengulangan berkala (Spaced Repetition System) yang
            dirancang untuk retensi memori jangka panjang.
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <a
            href="#kartu-hafalan"
            className="flex items-center gap-2 rounded-lg bg-emerald-950 px-5 py-2.5 text-[12px] font-semibold text-white shadow-md transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          >
            <IconZap className="size-4 text-sand-300" />
            Mode Hafalan Intensif (Review 30 Kata)
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl bg-emerald-50 p-3.5 text-emerald-900 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:bg-emerald-900/30 dark:text-emerald-100">
        <div className="flex items-start gap-2.5">
          <IconBadgeCheck className="mt-0.5 size-5 shrink-0 text-brand dark:text-emerald-300" />
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[12px] font-bold text-ink dark:text-white">
              Target harian 30 mufrodat aktif
            </span>
            <span className="hidden size-1.5 rounded-full bg-brand sm:inline-block" />
            <span className="text-[11px] text-muted dark:text-emerald-200/80">
              Algoritma SRS SuperMemo-2 telah disinkronkan dengan preferensi
              akun VIP Anda (ilustrasi).
            </span>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-0.5 text-center text-[10px] font-semibold text-emerald-800 dark:bg-emerald-800/50 dark:text-emerald-100">
          Mode Intensif (30 kata/hari)
        </span>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div className={statCard}>
        <div className="flex flex-col">
          <p className="text-[10px] font-medium text-muted">
            Total Kosakata Dikuasai
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ink">148</span>
            <span className="flex items-center gap-0.5 text-[10px] font-semibold text-brand">
              <IconTrendingUp className="size-3.5" />
              +12 pekan ini
            </span>
          </div>
          <p className="mt-1 text-[10px] text-muted">Target B1: 350 kata</p>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-100 text-brand dark:bg-emerald-900/40">
          <IconBook className="size-6" />
        </span>
      </div>

      <div className={statCard}>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] font-medium text-muted">
              Target Hafalan Hari Ini
            </p>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
              Mode Intensif
            </span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ink">18</span>
            <span className="text-[12px] text-muted">/ 30 kata</span>
            <span className="ml-auto text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
              60%
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-line/50">
            <div className="h-full w-[60%] rounded-full bg-brand" />
          </div>
          <p className="mt-1.5 flex items-center gap-1 text-[10px] text-muted">
            <IconFlag className="size-3.5 text-brand" />
            Tersisa 12 kata lagi hari ini
          </p>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-100 text-brand dark:bg-emerald-900/40">
          <IconTarget className="size-6" />
        </span>
      </div>

      <div className={statCard}>
        <div className="flex flex-col">
          <p className="text-[10px] font-medium text-muted">
            Perlu Diulang Segera (SRS Due)
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              8
            </span>
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-semibold text-red-700 dark:bg-red-950/40 dark:text-red-300">
              Perlu Review
            </span>
          </div>
          <p className="mt-1 text-[10px] text-muted">Jadwal hari ini tersisa</p>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400">
          <IconBell className="size-6" />
        </span>
      </div>

      <div className={statCard}>
        <div className="flex flex-col">
          <p className="text-[10px] font-medium text-muted">
            Akurasi Retensi Memori
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ink">92%</span>
            <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[9px] font-semibold text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
              Kategori Tinggi
            </span>
          </div>
          <p className="mt-1 text-[10px] text-muted">
            Berdasarkan 320 kuis SRS
          </p>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
          <IconSparkles className="size-6" />
        </span>
      </div>
    </div>
  );
}

function SidebarWidgets() {
  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-24">
      <section className={widgetCard}>
        <div className="flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-[15px] font-bold text-ink">
            <IconRefresh className="size-5 text-brand" />
            Jadwal Pengulangan
          </h2>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
            SRS Algoritma
          </span>
        </div>
        <p className="text-[11px] leading-5 text-muted">
          Pengulangan terjadwal mengaktifkan memori sebelum kurva lupa
          (Ebbinghaus curve) terjadi.
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 rounded-xl bg-red-50 p-3 dark:bg-red-950/30">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-red-500" />
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-ink">
                  Hari Ini (Prioritas)
                </span>
                <span className="text-[10px] text-muted">8 kata perlu direview</span>
              </div>
            </div>
            <a
              href="#kartu-hafalan"
              className="shrink-0 rounded-lg bg-red-600 px-3 py-1 text-[10px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            >
              Mulai (8)
            </a>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-xl bg-paper p-3">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-sand-400" />
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">Besok</span>
                <span className="text-[10px] text-muted">14 kata terjadwal</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-muted">14 Kata</span>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-xl bg-paper p-3">
            <div className="flex items-center gap-2.5">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-brand" />
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-ink">
                  Pekan Depan
                </span>
                <span className="text-[10px] text-muted">
                  42 kata interval panjang
                </span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-muted">42 Kata</span>
          </div>
        </div>
      </section>

      <section className={widgetCard}>
        <div className="flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-[15px] font-bold text-ink">
            <IconBranch className="size-5 text-brand" />
            Tashrif &amp; Morfologi
          </h2>
          <span className="text-[10px] text-muted/70">Kamus Cepat</span>
        </div>
        <p className="text-[11px] leading-5 text-muted">
          Cek perubahan bentuk kata kerja Fushah berdasarkan wazan tiga huruf
          (Mujarrad):
        </p>
        <div className="flex flex-col gap-3 rounded-xl bg-paper p-4">
          <div className="flex items-center justify-between border-b border-line/60 pb-2">
            <span className="text-[10px] text-muted">Akar Kata (Root):</span>
            <span lang="ar" dir="rtl" className="font-arabic text-[15px] font-bold text-brand">
              ك - ت - ب
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { label: "Fi'il Madhi", arabic: "كَتَبَ", meaning: "Dia menulis" },
              { label: "Mudhari’", arabic: "يَكْتُبُ", meaning: "Sedang menulis" },
              { label: "Masdar", arabic: "كِتَابَةً", meaning: "Penulisan" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col rounded-lg bg-surface p-2">
                <span className="text-[9px] text-muted/70">{item.label}</span>
                <span lang="ar" dir="rtl" className="font-arabic text-[14px] font-bold text-brand">
                  {item.arabic}
                </span>
                <span className="text-[9px] text-brand">{item.meaning}</span>
              </div>
            ))}
          </div>
        </div>
        <VocabularyActionButton
          action={{ kind: "tashrif-table" }}
          title="Buka contoh tabel tashrif"
          className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-paper py-2.5 text-[11px] font-semibold text-brand transition-colors hover:bg-line/40"
        >
          <IconBook className="size-4" />
          Buka Tabel Tashrif Lengkap
        </VocabularyActionButton>
      </section>

      <section className={widgetCard}>
        <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-sand-700">
          <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-20" />
          <span aria-hidden="true" className="relative text-4xl">
            🫖 🌴
          </span>
        </div>
        <div className="flex items-center gap-2 text-sand-800 dark:text-sand-200">
          <IconLightbulb className="size-5" />
          <span className="text-[12px] font-bold">Tips Dialek: Najd vs. Hijaz</span>
        </div>
        <p className="text-[11px] leading-5 text-muted">
          Di wilayah Hijaz (Mekkah, Madinah, Jeddah), huruf{" "}
          <strong className="font-bold text-ink">ق (Qaf)</strong> sering
          dilafalkan sebagai <strong className="font-bold text-ink">/G/</strong>{" "}
          lembut, mirip dialek Najd (Riyadh). Namun untuk pertanyaan “Kenapa?”,
          orang Hijaz sering memakai <em>Lēsh?</em> sementara sebagian kawasan
          pedalaman menggunakan <em>Warrāh?</em>
        </p>
        <div className="flex items-center justify-between border-t border-line/60 pt-2 text-[10px] text-muted">
          <span>Pedoman Percakapan Saudi #14</span>
          <VocabularyActionButton
            action={{ kind: "dialect-article" }}
            title="Baca ringkasan artikel dialek"
            className="flex items-center font-semibold text-brand hover:underline"
          >
            Selengkapnya
            <IconArrowRight className="size-3.5" />
          </VocabularyActionButton>
        </div>
      </section>
    </aside>
  );
}

export function VocabularyDeck() {
  return (
    <VocabularyActionsProvider>
      <div className="flex flex-col gap-6 pb-10">
        <PageHeader />
        <Stats />
        <section id="kartu-hafalan" className="scroll-mt-24">
          <FlashcardReview />
        </section>
        <section
          id="bank-kosakata"
          className="grid scroll-mt-24 grid-cols-1 items-start gap-6 lg:grid-cols-12"
        >
          <div className="lg:col-span-8">
            <VocabularyCatalog />
          </div>
          <div className="lg:col-span-4">
            <SidebarWidgets />
          </div>
        </section>
      </div>
    </VocabularyActionsProvider>
  );
}
