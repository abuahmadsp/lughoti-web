import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { AssessmentLog } from "./assessment-log";
import { PeriodFilter } from "./period-filter";
import {
  IconArrowRight,
  IconAward,
  IconBook,
  IconBrain,
  IconChart,
  IconCheck,
  IconChevronRight,
  IconClock,
  IconClipboard,
  IconCompare,
  IconEye,
  IconFlame,
  IconGauge,
  IconGraduation,
  IconGrid,
  IconHeadphones,
  IconMic,
  IconPencil,
  IconRefresh,
  IconSparkles,
  IconTrendingUp,
  IconUsers,
  IconX,
  IconChat,
  IconCards,
} from "./icons";

const fushahItems: {
  label: string;
  value: string;
  percent: number;
  icon: ReactNode;
}[] = [
  {
    label: "Kaidah Nahwu Dasar (Isim, Fi’il, Huruf)",
    value: "42%",
    percent: 42,
    icon: <IconCheck className="size-3.5 text-brand" />,
  },
  {
    label: "Kosakata Akademik & Teks Standar",
    value: "94 Kata Tersimpan",
    percent: 62,
    icon: <IconBook className="size-3.5 text-brand" />,
  },
  {
    label: "Latihan Menulis & Transliterasi Tashkeel",
    value: "65%",
    percent: 65,
    icon: <IconPencil className="size-3.5 text-brand" />,
  },
  {
    label: "Pemahaman Bacaan Sederhana (Qira’ah)",
    value: "50%",
    percent: 50,
    icon: <IconEye className="size-3.5 text-brand" />,
  },
];

const amiyahItems: {
  label: string;
  value: string;
  percent: number;
  icon: ReactNode;
}[] = [
  {
    label: "Kelancaran Audio & Pelafalan Native",
    value: "68%",
    percent: 68,
    icon: <IconMic className="size-3.5 text-sand-600" />,
  },
  {
    label: "Kosakata Khas Najd & Hijaz (Abgha, Eysh, Halla wallah)",
    value: "54 Kata Aktif",
    percent: 58,
    icon: <IconChat className="size-3.5 text-sand-600" />,
  },
  {
    label: "Kecepatan Respon Dialog Roleplay",
    value: "75%",
    percent: 75,
    icon: <IconGauge className="size-3.5 text-sand-600" />,
  },
  {
    label: "Pemahaman Konteks Budaya & Adab Saudi",
    value: "80%",
    percent: 80,
    icon: <IconUsers className="size-3.5 text-sand-600" />,
  },
];

const days = [
  { label: "Sen", total: "25m", fushah: 16, amiyah: 8 },
  { label: "Sel", total: "35m", fushah: 20, amiyah: 14 },
  { label: "Rab", total: "18m", fushah: 10, amiyah: 8 },
  { label: "Kam", total: "42m", fushah: 24, amiyah: 16 },
  { label: "Jum", total: "30m", fushah: 16, amiyah: 14 },
  { label: "Sab", total: "50m", fushah: 28, amiyah: 20 },
  { label: "Ahad", total: "22m", fushah: 12, amiyah: 10 },
];

function ReportHeader() {
  return (
    <header className="flex flex-col gap-5 pb-1 lg:flex-row lg:items-end lg:justify-between">
      <div className="flex flex-col gap-2">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] text-muted"
        >
          <Link
            href="/dashboard"
            className="flex items-center gap-1 transition-colors hover:text-brand"
          >
            <IconGrid className="size-3.5" />
            Dashboard
          </Link>
          <IconChevronRight aria-hidden="true" className="size-3 text-line" />
          <span className="font-semibold text-ink">Progres &amp; Evaluasi</span>
        </nav>

        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-baseline gap-3">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-ink sm:text-[30px] sm:leading-[38px]">
              Laporan Kemajuan &amp; Evaluasi Belajar
            </h1>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-[19px] leading-loose text-brand"
            >
              تقرير التَّقَدُّم والتَّقْيِيم
            </span>
          </div>
          <p className="max-w-3xl text-[13px] leading-6 text-muted">
            Pantau efektivitas belajar bahasa Arab Fushah dan Amiyah Saudi, kurva
            retensi memori SRS, performa kuis berkala, dan konsistensi streak
            harian (data ilustratif).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            <span
              aria-hidden="true"
              className="size-1.5 animate-pulse rounded-full bg-brand"
            />
            Sinkronisasi Cloud: pratinjau
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-line/40 px-2.5 py-1 text-[10px] text-muted">
            <IconGraduation className="size-3.5 text-brand" />
            Jenjang: <strong className="font-semibold text-ink">A1 Elementary (Menuju A2)</strong>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-2.5 py-1 text-[10px] text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
            <IconClock className="size-3.5 text-sand-600" />
            Akumulasi: <strong className="font-semibold">28.5 Jam Belajar</strong>
          </span>
          <span className="rounded-full border border-line/70 bg-surface px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
            Data demo
          </span>
        </div>
      </div>

      <PeriodFilter />
    </header>
  );
}

function Overview() {
  return (
    <section aria-label="Metrik utama" className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article className="flex flex-col justify-between rounded-xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
              Total Jam Belajar
            </p>
            <p className="flex items-baseline gap-2">
              <span className="text-[30px] font-bold leading-none text-ink">28.5</span>
              <span className="text-[13px] text-muted">Jam</span>
            </p>
          </div>
          <span className="grid size-10 place-items-center rounded-lg bg-paper text-brand">
            <IconClock className="size-5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 text-[10px]">
          <span className="inline-flex items-center gap-1 font-semibold text-brand">
            <IconTrendingUp className="size-3.5" />
            +4.2 jam bln ini
          </span>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Efisiensi Tinggi
          </span>
        </div>
      </article>

      <article className="flex flex-col justify-between rounded-xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
              Kosakata Dikuasai
            </p>
            <p className="flex items-baseline gap-2">
              <span className="text-[30px] font-bold leading-none text-brand">148</span>
              <span className="text-[11px] text-muted">/ 350 Target B1</span>
            </p>
          </div>
          <span className="grid size-10 place-items-center rounded-lg bg-emerald-50 text-brand dark:bg-emerald-900/40 dark:text-emerald-200">
            <IconCards className="size-5" />
          </span>
        </div>
        <div className="flex flex-col gap-1.5 pt-3">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-line/60">
            <div className="h-full w-[42.2%] rounded-full bg-brand" />
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted">
            <span>42.2% Milestone B1</span>
            <span className="font-semibold text-brand">Retensi SRS: 92%</span>
          </div>
        </div>
      </article>

      <article className="flex flex-col justify-between rounded-xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
              Rata-rata Skor Evaluasi
            </p>
            <p className="flex items-baseline gap-2">
              <span className="text-[30px] font-bold leading-none text-ink">88.5%</span>
              <span className="text-[10px] font-semibold text-brand">Cum Laude</span>
            </p>
          </div>
          <span className="grid size-10 place-items-center rounded-lg bg-paper text-brand">
            <IconClipboard className="size-5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 text-[10px] text-muted">
          <span>24 Kuis Diselesaikan</span>
          <span className="font-semibold text-ink">95% Kelulusan Awal</span>
        </div>
      </article>

      <article className="flex flex-col justify-between rounded-xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
              Streak Belajar Aktif
            </p>
            <p className="flex items-baseline gap-2">
              <span className="text-[30px] font-bold leading-none text-sand-700 dark:text-sand-300">
                7 <span aria-hidden="true" className="text-xl">🔥</span>
              </span>
              <span className="text-[11px] text-muted">Hari Beruntun</span>
            </p>
          </div>
          <span className="grid size-10 place-items-center rounded-lg bg-sand-100 text-sand-700 dark:bg-sand-300/20 dark:text-sand-200">
            <IconFlame className="size-5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 text-[10px]">
          <span className="text-muted">Rekor Terbaik: 18 Hari</span>
          <span className="rounded-full bg-sand-100 px-2 py-0.5 font-bold text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
            XP Mult 1.5x
          </span>
        </div>
      </article>
    </section>
  );
}

function ProgressRow({
  label,
  value,
  percent,
  icon,
  tone,
}: {
  label: string;
  value: string;
  percent: number;
  icon: ReactNode;
  tone: "brand" | "sand";
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2 text-[11px]">
        <span className="flex items-center gap-1.5 text-ink">
          {icon}
          {label}
        </span>
        <span
          className={cn(
            "shrink-0 font-bold",
            tone === "brand"
              ? "text-brand"
              : "text-sand-700 dark:text-sand-300",
          )}
        >
          {value}
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-line/50">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            tone === "brand" ? "bg-brand" : "bg-sand-400",
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

function TrackCard({
  letter,
  title,
  chapter,
  arabic,
  percent,
  modules,
  level,
  items,
  recommendation,
  action,
  tone,
}: {
  letter: string;
  title: string;
  chapter: string;
  arabic: string;
  percent: string;
  modules: string;
  level: string;
  items: { label: string; value: string; percent: number; icon: ReactNode }[];
  recommendation: string;
  action: string;
  tone: "brand" | "sand";
}) {
  const sand = tone === "sand";

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                "grid size-12 shrink-0 place-items-center rounded-xl text-[18px] font-bold",
                sand
                  ? "bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200"
                  : "bg-emerald-50 text-brand dark:bg-emerald-900/40 dark:text-emerald-200",
              )}
            >
              {letter}
            </span>
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[16px] font-bold text-ink">{title}</h3>
                <span
                  className={cn(
                    "rounded px-2 py-0.5 text-[10px] font-semibold",
                    sand
                      ? "bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200"
                      : "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
                  )}
                >
                  {chapter}
                </span>
              </div>
              <span
                lang="ar"
                dir="rtl"
                className={cn(
                  "font-arabic text-[14px]",
                  sand
                    ? "text-sand-700 dark:text-sand-300"
                    : "text-brand",
                )}
              >
                {arabic}
              </span>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <p
              className={cn(
                "text-[17px] font-bold",
                sand ? "text-sand-700 dark:text-sand-300" : "text-brand",
              )}
            >
              {percent}
            </p>
            <p className="text-[10px] text-muted">{modules}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-paper p-3 text-[11px]">
          <span className="text-muted">Jenjang Saat Ini:</span>
          <span className="font-semibold text-ink">{level}</span>
        </div>

        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <ProgressRow key={item.label} {...item} tone={tone} />
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-paper p-3">
        <div className="flex items-center gap-2.5">
          <IconArrowRight
            className={cn(
              "size-4 shrink-0",
              sand ? "text-sand-600" : "text-brand",
            )}
          />
          <div className="flex flex-col">
            <span className="text-[10px] text-muted">Langkah Rekomendasi:</span>
            <span className="text-[11px] font-bold text-ink">{recommendation}</span>
          </div>
        </div>
        <button
          type="button"
          title="Pratinjau — rekomendasi belum dapat dibuka"
          className={cn(
            "rounded-lg px-3 py-1.5 text-[11px] font-semibold text-white transition-colors",
            sand
              ? "bg-sand-600 hover:bg-sand-700"
              : "bg-emerald-950 hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800",
          )}
        >
          {action}
        </button>
      </div>
    </article>
  );
}

function DualTrack() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <IconCompare className="size-4 text-brand" />
          <h2 className="text-[18px] font-bold text-ink">
            Komparasi Dual-Track Pembelajaran
          </h2>
        </div>
        <p className="hidden text-[10px] text-muted sm:block">
          Dua kurikulum berjalan paralel sesuai kaidah PRD Lughati
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TrackCard
          letter="ف"
          title="Jalur Fushah"
          chapter="Resmi & Akademik"
          arabic="العربية الفصحى المعاصرة"
          percent="33%"
          modules="4/12 Modul Selesai"
          level="Pemula 1 (Level A1 — Dasar Bahasa Al-Qur’an & Berita)"
          items={fushahItems}
          recommendation="Modul 3: Kaidah Kalimat (Jumlah Ismiyah)"
          action="Buka"
          tone="brand"
        />
        <TrackCard
          letter="ع"
          title="Jalur Amiyah Saudi"
          chapter="Najdi & Hijazi"
          arabic="اللهجة العامية السعودية"
          percent="37.5%"
          modules="3/8 Modul Selesai"
          level="Percakapan Sehari-hari (A1-A2 — Berbelanja, Salam, Restoran)"
          items={amiyahItems}
          recommendation="Roleplay: Menawar di Souq Al-Zal Riyadh"
          action="Mulai"
          tone="sand"
        />
      </div>
    </section>
  );
}

function ActivityChart() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6 lg:col-span-8">
      <div>
        <div className="flex flex-wrap items-start justify-between gap-2 pb-4">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[15px] font-bold text-ink">
              Aktivitas &amp; Konsistensi Waktu Belajar
            </h3>
            <p className="text-[11px] text-muted">
              Distribusi durasi per hari (Target harian: 20 menit)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[10px] text-muted">
              <span aria-hidden="true" className="size-3 rounded-sm bg-brand" />
              Fushah
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-muted">
              <span aria-hidden="true" className="size-3 rounded-sm bg-sand-300" />
              Amiyah
            </span>
          </div>
        </div>

        <div className="flex h-44 w-full items-end justify-between gap-1.5 px-2 sm:gap-3">
          {days.map((day) => (
            <div key={day.label} className="group flex flex-1 flex-col items-center gap-1">
              <span className="text-[10px] font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                {day.total}
              </span>
              <div className="flex w-full max-w-7 flex-col overflow-hidden rounded-t bg-line/50">
                <div
                  className="w-full bg-brand transition-all group-hover:brightness-95"
                  style={{ height: day.fushah * 4 }}
                />
                <div
                  className="w-full bg-sand-300 transition-all group-hover:brightness-95"
                  style={{ height: day.amiyah * 4 }}
                />
              </div>
              <span
                className={cn(
                  "text-[10px] text-muted",
                  day.label === "Jum" && "font-bold text-brand",
                )}
              >
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-paper p-3 sm:grid-cols-3">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-muted">Rata-rata Harian:</span>
          <span className="text-[11px] font-bold text-ink">25.4 Menit / Sesi</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-muted">Waktu Paling Produktif:</span>
          <span className="text-[11px] font-bold text-ink">20:00 - 21:30 (Malam)</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-muted">Tercapai vs Target:</span>
          <span className="text-[11px] font-bold text-brand">127% dari Target 20m</span>
        </div>
      </div>
    </div>
  );
}

function RetentionCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6 lg:col-span-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[15px] font-bold text-ink">Kurva Retensi Memori</h3>
            <p className="text-[10px] text-muted">Algoritma Spaced Repetition (SRS)</p>
          </div>
          <IconBrain className="size-5 shrink-0 text-brand" />
        </div>

        <div className="flex items-center justify-center py-1">
          <div className="relative flex size-36 items-center justify-center">
            <svg viewBox="0 0 36 36" className="size-full -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="14" fill="none" strokeWidth="4" className="stroke-line" />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="56.3 87.96"
                className="stroke-brand"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                strokeWidth="4"
                strokeDasharray="19.3 87.96"
                strokeDashoffset="-56.3"
                className="stroke-sand-300"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                strokeWidth="4"
                strokeDasharray="12.3 87.96"
                strokeDashoffset="-75.6"
                className="stroke-red-500"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-[22px] font-bold text-ink">92%</span>
              <span className="text-[10px] text-muted">Daya Ingat</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 text-[11px]">
          <div className="flex items-center justify-between gap-2 rounded-lg bg-paper p-2">
            <span className="flex items-center gap-2 text-ink">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-brand" />
              Memori Sangat Kuat (&gt;30 hari)
            </span>
            <span className="shrink-0 font-bold text-brand">64% (95 kata)</span>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-paper p-2">
            <span className="flex items-center gap-2 text-ink">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-sand-300" />
              Stabil (7-14 hari)
            </span>
            <span className="shrink-0 font-bold text-sand-700 dark:text-sand-300">
              22% (33 kata)
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 rounded-lg bg-red-50 p-2 dark:bg-red-950/40">
            <span className="flex items-center gap-2 font-semibold text-red-700 dark:text-red-300">
              <span aria-hidden="true" className="size-2.5 rounded-full bg-red-500" />
              Perlu Diulang Hari Ini
            </span>
            <span className="shrink-0 font-bold text-red-700 dark:text-red-300">
              14% (8 kata)
            </span>
          </div>
        </div>
      </div>

      <Link
        href="/dashboard/kosakata-dan-flashcard"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-3 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        <IconRefresh className="size-4" />
        Review 8 Kata Sekarang
      </Link>
    </div>
  );
}

const pillars = [
  {
    name: "Membaca",
    arabic: "القراءة",
    percent: 78,
    note: "Teks berharakat lancar; teks gundul dalam tahap pengenalan wazan.",
    tone: "brand" as const,
    icon: <IconBook className="size-4 text-brand" />,
  },
  {
    name: "Mendengar",
    arabic: "الاستماع",
    percent: 85,
    note: "Mampu menangkap lafal percakapan cepat Najdi tempo 1.0x.",
    tone: "brand" as const,
    icon: <IconHeadphones className="size-4 text-brand" />,
  },
  {
    name: "Berbicara",
    arabic: "الكلام",
    percent: 72,
    note: "Artikulasi makharijul huruf fasih, aksen Saudi natural.",
    tone: "sand" as const,
    icon: <IconMic className="size-4 text-sand-600" />,
  },
  {
    name: "Tata Bahasa",
    arabic: "القواعد",
    percent: 80,
    note: "Paham wazan tiga huruf dasar mujarrad dan tanda i’rob rofa’.",
    tone: "brand" as const,
    icon: <IconClipboard className="size-4 text-brand" />,
  },
];

function CompetencyCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6 lg:col-span-7">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[15px] font-bold text-ink">
              Evaluasi Kompetensi (4 Pilar Bahasa)
            </h3>
            <p className="text-[11px] text-muted">
              Penilaian berbasis standar ACTFL &amp; CEFR untuk kemampuan Arab seimbang
            </p>
          </div>
          <IconBrain className="size-5 shrink-0 text-brand" />
        </div>

        <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
          {pillars.map((pillar) => (
            <div key={pillar.name} className="flex flex-col gap-2 rounded-xl bg-paper p-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-[11px] font-bold text-ink">
                  {pillar.icon}
                  {pillar.name} (
                  <span lang="ar" dir="rtl" className="font-arabic text-[13px] font-normal">
                    {pillar.arabic}
                  </span>
                  )
                </span>
                <span
                  className={cn(
                    "text-[15px] font-bold",
                    pillar.tone === "brand"
                      ? "text-brand"
                      : "text-sand-700 dark:text-sand-300",
                  )}
                >
                  {pillar.percent}%
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-line/60">
                <div
                  className={cn(
                    "h-full rounded-full",
                    pillar.tone === "brand" ? "bg-brand" : "bg-sand-400",
                  )}
                  style={{ width: `${pillar.percent}%` }}
                />
              </div>
              <p className="text-[10px] leading-4 text-muted">{pillar.note}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line/60 pt-3 text-[10px] text-muted">
        <span>
          Status Kompetensi:{" "}
          <strong className="font-semibold text-ink">
            Kategori Mahir Pemula (Strong Novice-High)
          </strong>
        </span>
        <Link
          href="/dashboard/jalur-belajar"
          className="inline-flex items-center gap-1 font-semibold text-brand transition-colors hover:text-ink"
        >
          Lihat Analisis Detail
          <IconArrowRight className="size-3" />
        </Link>
      </div>
    </div>
  );
}

const badges = [
  { emoji: "🏅", name: "Dialog Pertama", note: "Selesaikan 5 audio roleplay" },
  { emoji: "🔥", name: "7-Day Streak", note: "Konsistensi mingguan" },
  { emoji: "📚", name: "100 Mufrodat", note: "Hafal 100 kata aktif" },
  { emoji: "🇸🇦", name: "Saudi Explorer", note: "Kuasai dialek Najd" },
];

function MilestoneCard() {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6 lg:col-span-5">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-[15px] font-bold text-ink">Milestone &amp; Sertifikat</h3>
            <p className="text-[11px] text-muted">Lencana prestasi yang berhasil dicapai</p>
          </div>
          <IconAward className="size-5 shrink-0 text-sand-600" />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {badges.map((badge) => (
            <div key={badge.name} className="flex items-center gap-2.5 rounded-xl bg-paper p-3">
              <span aria-hidden="true" className="text-2xl leading-none">
                {badge.emoji}
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[11px] font-bold text-ink">{badge.name}</span>
                <span className="truncate text-[10px] text-muted">{badge.note}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 rounded-xl bg-emerald-950 p-3.5 text-white dark:bg-emerald-900">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] uppercase tracking-wider text-emerald-100">
              Target Berikutnya
            </span>
            <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-semibold">
              Tersisa 2 Modul
            </span>
          </div>
          <p className="text-[11px] font-semibold leading-snug">
            Menyelesaikan Ujian Akhir Level A1 Fushah untuk Sertifikat Kelulusan
            Resmi Lughati Terverifikasi
          </p>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-[66%] rounded-full bg-emerald-300" />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 text-[10px] text-muted">
        <span>
          Total XP Terkumpul: <strong className="font-semibold text-ink">1,480 XP</strong>
        </span>
        <span className="font-semibold text-brand">Tier: Pembelajar Berdedikasi</span>
      </div>
    </div>
  );
}

function ReviewDetail() {
  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Review Hasil
          </span>
          <span className="text-[10px] text-muted">Evaluasi Modul 1</span>
        </div>
        <h3 id="review-title" className="mt-1 text-[16px] font-bold text-ink">
          Pembahasan Evaluasi: Kosakata &amp; Frasa
        </h3>
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-paper p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-bold text-ink">
            Soal No. 4 (Salah • Poin diperbaiki)
          </p>
          <p className="inline-flex items-center gap-1 text-[10px] font-semibold text-red-700 dark:text-red-300">
            <IconX className="size-3.5" />
            Salah di percobaan 1
          </p>
        </div>
        <p className="text-[13px] leading-6 text-ink">
          Bagaimana ungkapan santun dalam Amiyah Saudi untuk menanyakan “Apa
          kabar?” kepada teman akrab?
        </p>
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-surface p-3">
          <span lang="ar" dir="rtl" className="font-arabic text-[19px] font-bold text-ink">
            شلونك؟ عساك طيب؟
          </span>
          <span className="shrink-0 text-[10px] font-semibold text-brand">
            Jawaban Benar
          </span>
        </div>
        <p className="text-[10px] text-muted">
          <em>Transliterasi:</em> “Shlonak? ’Asaak tayyib?” (Khas dialek Najd)
        </p>
        <p className="text-[11px] leading-5 text-muted">
          <strong className="text-ink">Catatan Pedagogis:</strong> Pilihan Anda
          sebelumnya <em>“Kayfa haluka”</em> adalah bentuk formal Fushah yang tepat
          untuk forum resmi, namun dalam konteks dialog kasual Riyadh, frasa{" "}
          <em>“Shlonak”</em> atau <em>“Kayf al-haal”</em> lebih lazim digunakan.
        </p>
      </div>

      <p className="flex items-center gap-1.5 text-[10px] text-muted">
        <IconSparkles className="size-3 shrink-0" />
        Pembahasan ilustratif — tidak ada jawaban atau skor yang disimpan.
      </p>
    </>
  );
}

export function ProgressReport() {
  return (
    <div className="mx-auto flex w-full max-w-[1520px] flex-col gap-6 pb-6">
      <ReportHeader />
      <Overview />

      <DualTrack />

      <section
        aria-label="Visualisasi aktivitas dan retensi"
        className="grid grid-cols-1 gap-4 lg:grid-cols-12"
      >
        <ActivityChart />
        <RetentionCard />
      </section>

      <section
        aria-label="Kompetensi dan pencapaian"
        className="grid grid-cols-1 gap-4 lg:grid-cols-12"
      >
        <CompetencyCard />
        <MilestoneCard />
      </section>

      <AssessmentLog review={<ReviewDetail />} />

      <p className="flex items-center justify-center gap-1.5 text-center text-[10px] text-muted">
        <IconChart className="size-3 shrink-0" />
        Seluruh angka pada laporan ini adalah data demo; tidak ada progres, skor,
        atau sertifikat yang disimpan.
      </p>
    </div>
  );
}
