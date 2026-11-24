import { cn } from "@/lib/cn";
import { AiLanguageGenerator } from "./ai-language-generator";
import { AddVocabularyOpenButton } from "./add-vocabulary-flow";
import {
  IconArrowRight,
  IconArrowUp,
  IconAward,
  IconBadgeCheck,
  IconBank,
  IconBook,
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconCreditCard,
  IconDownload,
  IconEye,
  IconFilter,
  IconLayers,
  IconMegaphone,
  IconMic,
  IconPlusCircle,
  IconQrCode,
  IconReceipt,
  IconRefresh,
  IconSort,
  IconTrendingUp,
  IconUsers,
  IconWallet,
  IconWaveform,
  IconZap,
} from "./icons";

const cardClass =
  "flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5";
const cardLabelClass =
  "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted";
const panelHeadingClass = "text-base font-semibold text-ink";
const panelSubheadingClass = "text-[12px] leading-5 text-muted";
const iconTileClass =
  "grid size-8 shrink-0 place-items-center rounded-lg bg-paper";
const tableHeadClass =
  "bg-paper text-[10px] font-semibold uppercase tracking-[0.12em] text-muted";
const tableCellClass = "px-4 py-3.5";

const waveform = [
  { height: "25%", tone: "bg-brand/40" },
  { height: "50%", tone: "bg-brand/50" },
  { height: "75%", tone: "bg-brand/80" },
  { height: "100%", tone: "bg-brand" },
  { height: "62%", tone: "bg-brand" },
  { height: "88%", tone: "bg-brand/70" },
  { height: "94%", tone: "bg-brand" },
  { height: "75%", tone: "bg-ink/70" },
  { height: "100%", tone: "bg-ink" },
  { height: "88%", tone: "bg-ink" },
  { height: "50%", tone: "bg-brand" },
  { height: "94%", tone: "bg-brand/80" },
  { height: "69%", tone: "bg-brand/60" },
  { height: "100%", tone: "bg-brand/90" },
  { height: "81%", tone: "bg-brand" },
  { height: "44%", tone: "bg-brand/70" },
  { height: "94%", tone: "bg-ink/80" },
  { height: "100%", tone: "bg-ink" },
  { height: "56%", tone: "bg-ink/70" },
  { height: "31%", tone: "bg-brand/50" },
  { height: "19%", tone: "bg-brand/30" },
];

const dialects = [
  {
    label: "Fusha (Standar Akademik)",
    value: 55,
    dot: "bg-emerald-950 dark:bg-emerald-300",
    bar: "bg-emerald-950 dark:bg-emerald-300",
  },
  {
    label: "Amiyah Hijaz (Saudi Barat)",
    value: 35,
    dot: "bg-brand",
    bar: "bg-brand",
  },
  {
    label: "Dialek Teluk / Khaleeji",
    value: 10,
    dot: "bg-sand-400",
    bar: "bg-sand-400",
  },
];

const anomalyCards = [
  {
    arabic: "ع vs ء",
    title: "'Ain vs Hamzah",
    detail: "Penyempitan laring tengah",
    percent: "41,8% Keliru",
  },
  {
    arabic: "خ vs ح",
    title: "Kha' vs Ha'",
    detail: "Frikatif uvular vs faringal",
    percent: "28,4% Keliru",
  },
];

const activities = [
  {
    initials: "AM",
    name: "Ahmad Mujahid (Surabaya)",
    time: "Baru saja",
    action: "Submit Talaqqi Surah Al-Fatihah",
    badge: "Skor 98 · Mumtaz",
    meta: "Jalur: Fusha VIP",
    avatarClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    badgeClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    metaClass: "text-muted",
  },
  {
    initials: "FA",
    name: "Fatimah Azzahra (Bandung)",
    time: "2m lalu",
    action: "Selesai Kuis Nahwu Jurumiyyah Bab Fa'il",
    badge: "10/10 Sempurna",
    meta: "SRS Level 4",
    avatarClass: "bg-paper text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200",
    badgeClass: "bg-paper text-ink",
    metaClass: "text-brand",
  },
  {
    initials: "RK",
    name: "Rizal Kurniawan (Makassar)",
    time: "5m lalu",
    action: "Praktek Percakapan Amiyah: Belanja di Suq Jeddah",
    badge: "Skor Fashahah 89",
    meta: "Dialek Hijaz",
    avatarClass: "bg-sand-200 text-sand-900",
    badgeClass: "bg-sand-200 text-sand-900",
    metaClass: "text-muted",
  },
  {
    initials: "NH",
    name: "Nurul Hidayah (Jakarta)",
    time: "8m lalu",
    action: "Upgrade Menjadi VIP Scholar Lifetime",
    badge: "Akses Penuh Seluruh Dialek & Mentoring",
    meta: "",
    avatarClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    badgeClass: "bg-transparent text-brand",
    metaClass: "text-muted",
  },
];

const prioritySantri = [
  {
    initials: "MA",
    name: "Muhammad Al-Ghazali",
    id: "LGT-2026-0891",
    avatarClass: "bg-emerald-950 text-white",
    track: "Fusha Akademik",
    trackClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    material: "Kaidah I'rob Bab Marfu'at",
    detail: "Sesi Vokal 04",
    score: "92",
    scoreClass: "text-brand",
    access: "VIP Scholar",
    accessClass: "bg-sand-200 text-sand-900",
    primaryAction: true,
  },
  {
    initials: "SN",
    name: "Siti Nurhaliza",
    id: "LGT-2026-1142",
    avatarClass: "bg-brand text-white",
    track: "Amiyah Saudi",
    trackClass: "bg-sand-200 text-sand-900",
    material: "Muhadatsah Jamu'ah di Riyadh",
    detail: "Fonem Qaf vs Gim",
    score: "76",
    scoreClass: "text-red-600 dark:text-red-400",
    access: "Reguler Pro",
    accessClass: "bg-paper text-ink",
    primaryAction: true,
  },
  {
    initials: "ZB",
    name: "Zaid Bin Tsabit",
    id: "LGT-2026-0043",
    avatarClass: "bg-emerald-900 text-white",
    track: "Fusha Akademik",
    trackClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    material: "Ujian Marhalah 2 Shorof Mujarrod",
    detail: "Wazan Fa'ala Yaf'ulu",
    score: "99",
    scoreClass: "text-brand",
    access: "VIP Scholar",
    accessClass: "bg-sand-200 text-sand-900",
    primaryAction: false,
  },
  {
    initials: "AR",
    name: "Aisyah Rahmadani",
    id: "LGT-2026-2410",
    avatarClass: "bg-paper text-ink dark:bg-emerald-950 dark:text-emerald-100",
    track: "Takhassus Bahasa",
    trackClass: "bg-paper text-muted",
    material: "Uslub Balaghah Al-Bayan",
    detail: "Tasybih Tamtsil",
    score: "88",
    scoreClass: "text-brand",
    access: "Reguler Pro",
    accessClass: "bg-paper text-ink",
    primaryAction: false,
  },
];

const paymentChannels = [
  {
    label: "QRIS Statis & Dinamis",
    share: "48% (Rp 136,5 Jt)",
    value: 48,
    bar: "bg-brand",
    text: "text-brand",
  },
  {
    label: "Kartu Kredit / Visa Global",
    share: "26% (Rp 74,0 Jt)",
    value: 26,
    bar: "bg-emerald-950 dark:bg-emerald-300",
    text: "text-ink",
  },
  {
    label: "Virtual Account (BSI / Mandiri / BCA)",
    share: "18% (Rp 51,2 Jt)",
    value: 18,
    bar: "bg-muted",
    text: "text-ink",
  },
  {
    label: "GoPay / ShopeePay",
    share: "8% (Rp 22,8 Jt)",
    value: 8,
    bar: "bg-sand-400",
    text: "text-sand-700 dark:text-sand-300",
  },
];

const transactions = [
  {
    invoice: "INV-8841-LGT",
    payer: "dr. Fahri Hamzah",
    plan: "VIP Lifetime Scholar",
    method: "QRIS",
    methodIcon: IconQrCode,
    methodClass: "text-brand",
    amount: "Rp 2.450.000",
    status: "Berhasil",
    statusClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    dotClass: "bg-brand",
  },
  {
    invoice: "INV-8840-LGT",
    payer: "Nabila Fitriani",
    plan: "Fusha 6 Bulan Pro",
    method: "Visa ID",
    methodIcon: IconCreditCard,
    methodClass: "text-emerald-900 dark:text-emerald-200",
    amount: "Rp 480.000",
    status: "Berhasil",
    statusClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    dotClass: "bg-brand",
  },
  {
    invoice: "INV-8839-LGT",
    payer: "Hafiz Ramadhan",
    plan: "Amiyah Bulanan",
    method: "VA BSI",
    methodIcon: IconBank,
    methodClass: "text-muted",
    amount: "Rp 99.000",
    status: "Pending",
    statusClass: "bg-sand-200 text-sand-900",
    dotClass: "bg-sand-500 animate-pulse",
  },
  {
    invoice: "INV-8838-LGT",
    payer: "Khadijah Lubis",
    plan: "VIP Lifetime Scholar",
    method: "GoPay",
    methodIcon: IconWallet,
    methodClass: "text-brand",
    amount: "Rp 2.450.000",
    status: "Berhasil",
    statusClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    dotClass: "bg-brand",
  },
];

export function AdminOverview() {
  return (
    <div className="flex w-full flex-col gap-4 sm:gap-6">
      {/* ------------------------------------------------------------- Hero */}
      <section
        id="ringkasan"
        className="relative scroll-mt-20 overflow-hidden rounded-2xl bg-emerald-950 text-sand-50 shadow-xl"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 size-96 rounded-full bg-emerald-400/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 right-1/4 size-80 rounded-full bg-sand-300/10 blur-2xl"
        />

        <div className="relative z-10 flex flex-col justify-between gap-6 p-5 sm:p-7 lg:flex-row lg:items-center lg:p-9">
          <div className="flex max-w-2xl flex-col gap-2">
            <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-sand-50 backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-300" />
                </span>
                Server AI Talaqqi v4.2 Riyadh Node: Optimal (320ms)
              </span>
              <span className="hidden text-emerald-200/40 sm:inline">|</span>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-100/80">
                <IconCalendar className="size-4 text-sand-300" />
                <span>14 Syawwal 1447 H</span>
                <span className="text-emerald-100/40">•</span>
                <span>2 Mei 2026 M</span>
              </div>
              <span className="rounded-full border border-sand-300/30 bg-sand-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-sand-200">
                Data demo
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h1 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
                Ahlan wa Sahlan, Dr. Salman Al-Farisi
              </h1>
              <span
                className="hidden font-arabic text-2xl font-bold leading-none text-emerald-200 md:inline"
                lang="ar"
                dir="rtl"
              >
                أهلاً بك
              </span>
            </div>

            <p className="max-w-2xl text-pretty text-sm leading-6 text-emerald-100/80 sm:text-[15px]">
              Pusat kendali operasional akademi Lughati: pantau akselerasi
              kefasihan 12.845 santri fusha &amp; amiyah, status orkestrasi audio
              fonetik, dan laporan akademik hari ini.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
            <AddVocabularyOpenButton className="flex items-center gap-2 rounded-lg bg-white/10 px-3.5 py-2.5 text-[13px] font-semibold text-sand-50 shadow-sm backdrop-blur transition-colors hover:bg-white/20">
              <IconPlusCircle className="size-[18px]" />
              Tambah Kosakata Saya
            </AddVocabularyOpenButton>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-white/10 px-3.5 py-2.5 text-[13px] font-semibold text-sand-50 shadow-sm backdrop-blur transition-colors hover:bg-white/20"
            >
              <IconDownload className="size-[18px]" />
              Unduh Laporan
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-white/10 px-3.5 py-2.5 text-[13px] font-semibold text-sand-50 shadow-sm backdrop-blur transition-colors hover:bg-white/20"
            >
              <IconMegaphone className="size-[18px]" />
              Siaran Santri
            </button>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-emerald-400 px-3.5 py-2.5 text-[13px] font-semibold text-emerald-950 shadow-md transition-colors hover:bg-emerald-300"
            >
              <IconPlusCircle className="size-[18px]" />
              Materi Baru
            </button>
          </div>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/10 bg-white/5 px-5 py-3 text-[11px] text-emerald-100/80 backdrop-blur sm:px-7 lg:px-9">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-sand-50">
              Fokus Verifikasi Hari Ini:
            </span>
            <span className="rounded bg-sand-300/15 px-2 py-0.5 font-semibold text-sand-200">
              18 Rekaman Audio Membutuhkan Masukan Musyrif
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>
              Kapasitas AI Model:{" "}
              <strong className="font-semibold text-sand-50">
                98,4% Berjalan Lancar
              </strong>
            </span>
            <span>
              Sinkronisasi Cloud:{" "}
              <strong className="font-semibold text-sand-50">2 Menit Lalu</strong>
            </span>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- KPI cards */}
      <section
        aria-label="Metrik utama akademi"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <div className={cardClass}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <span className={cardLabelClass}>Total Santri Aktif</span>
              <span className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                12.845
              </span>
            </div>
            <span className="grid size-10 place-items-center rounded-lg bg-paper text-emerald-900 dark:text-emerald-200">
              <IconUsers className="size-[22px]" />
            </span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[12px] font-semibold text-brand">
                <IconTrendingUp className="size-4" />
                <span>+14,2%</span>
              </div>
              <span className="text-[11px] text-muted">vs bulan lalu</span>
            </div>
            <svg
              viewBox="0 0 100 32"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="h-9 w-24 text-brand"
              fill="none"
            >
              <path
                d="M0 28 C20 28, 30 18, 45 20 C60 22, 75 8, 100 4"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
              <path
                d="M0 28 C20 28, 30 18, 45 20 C60 22, 75 8, 100 4 L100 32 L0 32 Z"
                fill="currentColor"
                fillOpacity={0.12}
              />
            </svg>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-paper px-2.5 py-2 text-[11px] text-muted">
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-950 dark:bg-emerald-300" />
              Reguler: <strong className="font-semibold text-ink">9.420</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-brand" />
              VIP Scholar:{" "}
              <strong className="font-semibold text-ink">3.425</strong>
            </span>
          </div>
        </div>

        <div className={cardClass}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <span className={cardLabelClass}>Kelulusan AI Talaqqi</span>
              <span className="mt-1 text-2xl font-semibold tracking-tight text-brand">
                94,8%
              </span>
            </div>
            <span className="grid size-10 place-items-center rounded-lg bg-emerald-100/70 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
              <IconMic className="size-[22px]" />
            </span>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between gap-2 text-[11px] text-muted">
              <span>Standar Mumtaz</span>
              <span className="font-semibold text-ink">48.210 Sesi</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-paper">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: "94.8%" }}
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
            <span className="flex items-center gap-1 font-medium text-ink">
              <IconBadgeCheck className="size-4 text-brand" />
              Fashahah Tinggi
            </span>
            <span>
              Toleransi makhraj:{" "}
              <strong className="font-semibold text-ink">±3Hz</strong>
            </span>
          </div>
        </div>

        <div className={cardClass}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <span className={cardLabelClass}>Pendapatan &amp; MRR</span>
              <span className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                Rp 284,5 Jt
              </span>
            </div>
            <span className="grid size-10 place-items-center rounded-lg bg-paper text-emerald-900 dark:text-emerald-200">
              <IconWallet className="size-[22px]" />
            </span>
          </div>
          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[12px] font-semibold text-brand">
                <IconArrowUp className="size-4" />
                <span>+18,5%</span>
              </div>
              <span className="text-[11px] text-muted">Pertumbuhan MoM</span>
            </div>
            <div className="flex h-9 items-end gap-1">
              <span className="h-[40%] w-2.5 rounded-t bg-line" />
              <span className="h-[55%] w-2.5 rounded-t bg-line" />
              <span className="h-[60%] w-2.5 rounded-t bg-line" />
              <span className="h-[75%] w-2.5 rounded-t bg-line" />
              <span className="h-[85%] w-2.5 rounded-t bg-emerald-300" />
              <span className="h-full w-2.5 rounded-t bg-brand" />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-paper px-2.5 py-2 text-[11px] text-muted">
            <span>
              Langganan Pro:{" "}
              <strong className="font-semibold text-ink">68%</strong>
            </span>
            <span>
              VIP Lifetime:{" "}
              <strong className="font-semibold text-ink">32%</strong>
            </span>
          </div>
        </div>

        <div className={cardClass}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <span className={cardLabelClass}>Retensi Hafalan SRS</span>
              <span className="mt-1 text-2xl font-semibold tracking-tight text-ink">
                91,2%
              </span>
            </div>
            <span className="grid size-10 place-items-center rounded-lg bg-paper text-emerald-900 dark:text-emerald-200">
              <IconLayers className="size-[22px]" />
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex size-12 shrink-0 items-center justify-center">
              <svg
                viewBox="0 0 36 36"
                aria-hidden="true"
                className="size-12 -rotate-90"
              >
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3.5}
                  className="text-line"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9155"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3.5}
                  strokeDasharray="91.2 100"
                  strokeLinecap="round"
                  className="text-brand"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-ink">
                SM-2
              </span>
            </div>
            <div className="flex flex-col text-[11px] leading-tight text-muted">
              <span className="text-[12px] font-semibold text-ink">
                142.890 Mufrodat
              </span>
              <span>tersimpan di memori jangka panjang santri</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted">
            <span className="font-medium text-brand">
              Interval rata-rata:{" "}
              <strong className="font-semibold">14 Hari</strong>
            </span>
            <span>
              Lupa: <strong className="font-semibold text-ink">&lt; 8,8%</strong>
            </span>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------- AI language utility */}
      <AiLanguageGenerator />

      {/* -------------------------------------- Analytics & live monitoring */}
      <section
        id="talaqqi"
        aria-label="Analitik AI dan aktivitas langsung"
        className="grid scroll-mt-20 grid-cols-1 gap-4 lg:grid-cols-12"
      >
        <div className={cn(cardClass, "lg:col-span-7")}>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className={cn(iconTileClass, "text-brand")}>
                <IconWaveform className="size-5" />
              </span>
              <div>
                <h2 className={panelHeadingClass}>AI Talaqqi Speech Engine</h2>
                <p className={panelSubheadingClass}>
                  Spektrum akustik dan distribusi dialek bahasa Arab santri
                </p>
              </div>
            </div>
            <span className="flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-paper px-2.5 py-1 text-[11px] text-muted sm:self-auto">
              <span className="size-2 rounded-full bg-brand" />
              Latensi: 320ms (Optimal)
            </span>
          </div>

          <div className="flex w-full flex-col justify-between gap-3 overflow-hidden rounded-xl border border-line/60 bg-paper/70 p-3.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-white">
                  Talaqqi Stream Live
                </span>
                <span className="text-[11px] text-muted">
                  Al-Baqarah: Ayat 255 (Makharijul Huruf)
                </span>
              </div>
              <span
                className="font-arabic text-lg font-bold leading-none text-ink"
                lang="ar"
                dir="rtl"
              >
                بِسْمِ ٱللَّهِ
              </span>
            </div>

            <div className="flex h-16 w-full items-end justify-between gap-1">
              {waveform.map((bar, index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  className={cn("w-1.5 rounded-t", bar.tone)}
                  style={{ height: bar.height }}
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/50 pt-2 text-[11px] text-muted">
              <span>
                Frekuensi Formant F1/F2:{" "}
                <strong className="font-semibold text-ink">840 Hz / 2250 Hz</strong>
              </span>
              <span className="font-semibold text-brand">
                Tingkat Kemiripan Native: 96,2%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 pt-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg bg-paper p-3">
              <span className="text-[11px] font-semibold text-ink">
                Distribusi Peminatan Dialek
              </span>
              <div className="mt-1 space-y-2.5">
                {dialects.map((dialect) => (
                  <div key={dialect.label}>
                    <div className="mb-1 flex items-center justify-between gap-2 text-[11px] text-muted">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={cn("size-2.5 rounded", dialect.dot)}
                        />
                        {dialect.label}
                      </span>
                      <span className="font-semibold text-ink">
                        {dialect.value}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-line/70">
                      <div
                        className={cn("h-full rounded-full", dialect.bar)}
                        style={{ width: `${dialect.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 rounded-lg bg-paper p-3">
              <span className="text-[11px] font-semibold text-ink">
                Anomali Fonetik Santri Indonesia
              </span>
              <div className="mt-1 flex flex-col gap-2">
                {anomalyCards.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between gap-2 rounded-lg bg-surface p-2"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="shrink-0 rounded bg-red-100 px-2 py-0.5 font-arabic text-[15px] font-bold leading-7 text-red-700 dark:bg-red-950/60 dark:text-red-200"
                        lang="ar"
                        dir="rtl"
                      >
                        {item.arabic}
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-[11px] font-semibold text-ink">
                          {item.title}
                        </span>
                        <span className="truncate text-[10px] text-muted">
                          {item.detail}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 rounded bg-paper px-1.5 py-0.5 text-[10px] font-semibold text-ink">
                      {item.percent}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={cn(cardClass, "lg:col-span-5")}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-start gap-3">
              <span className={cn(iconTileClass, "text-emerald-900 dark:text-emerald-200")}>
                <IconZap className="size-5" />
              </span>
              <div>
                <h2 className={panelHeadingClass}>Aktivitas Belajar Langsung</h2>
                <p className={panelSubheadingClass}>
                  Feed interaksi real-time santri
                </p>
              </div>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              Live
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {activities.map((activity, index) => (
              <div
                key={activity.name}
                className="flex items-start gap-2.5 rounded-lg bg-paper p-2.5 transition-colors hover:bg-line/40"
              >
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                    activity.avatarClass,
                  )}
                >
                  {index === activities.length - 1 ? (
                    <IconAward className="size-[18px]" />
                  ) : (
                    activity.initials
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="truncate text-[12px] font-semibold text-ink">
                      {activity.name}
                    </span>
                    <span className="shrink-0 text-[10px] text-muted">
                      {activity.time}
                    </span>
                  </div>
                  <p className="truncate text-[11px] text-muted">
                    {activity.action}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[10px] font-semibold",
                        activity.badgeClass,
                      )}
                    >
                      {activity.badge}
                    </span>
                    {activity.meta ? (
                      <span className={cn("text-[10px]", activity.metaClass)}>
                        {activity.meta}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-1 rounded-lg bg-paper py-2 text-[12px] font-semibold text-ink transition-colors hover:bg-line/60"
          >
            Buka Seluruh Log Aktivitas
            <IconChevronRight className="size-4" />
          </button>
        </div>
      </section>

      {/* ------------------------------------------ Musyrif verification table */}
      <section
        id="verifikasi"
        aria-labelledby="verifikasi-heading"
        className="flex w-full scroll-mt-20 flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5"
      >
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 id="verifikasi-heading" className={panelHeadingClass}>
                Verifikasi &amp; Penilaian Musyrif
              </h2>
              <span className="rounded-full bg-sand-200 px-2 py-0.5 text-[10px] font-bold text-sand-900">
                18 Antrean
              </span>
            </div>
            <p className={panelSubheadingClass}>
              Santri prioritas yang memerlukan masukan vokal manual atau
              sertifikasi kelulusan marhalah
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg bg-paper px-2.5 py-1.5 text-[11px] text-muted transition-colors hover:bg-line/60 hover:text-ink"
            >
              <IconFilter className="size-[18px]" />
              Semua Jalur
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg bg-paper px-2.5 py-1.5 text-[11px] text-muted transition-colors hover:bg-line/60 hover:text-ink"
            >
              <IconSort className="size-[18px]" />
              Skor Terendah Dahulu
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse text-left">
            <thead>
              <tr className={tableHeadClass}>
                <th className="rounded-l-lg px-4 py-3">
                  Santri &amp; Identitas
                </th>
                <th className="px-4 py-3">Jalur Pembelajaran</th>
                <th className="px-4 py-3">Materi Terakhir</th>
                <th className="px-4 py-3">Skor AI Talaqqi</th>
                <th className="px-4 py-3">Status Akses</th>
                <th className="rounded-r-lg px-4 py-3 text-right">
                  Aksi Musyrif
                </th>
              </tr>
            </thead>
            <tbody className="text-sm text-ink">
              {prioritySantri.map((student) => (
                <tr
                  key={student.id}
                  className="border-t border-line/60 transition-colors hover:bg-paper/70"
                >
                  <td className={tableCellClass}>
                    <div className="flex items-center gap-2.5">
                      <span
                        className={cn(
                          "grid size-9 shrink-0 place-items-center rounded-full text-[11px] font-bold",
                          student.avatarClass,
                        )}
                      >
                        {student.initials}
                      </span>
                      <div className="flex min-w-0 flex-col">
                        <span className="truncate text-[12px] font-semibold text-ink">
                          {student.name}
                        </span>
                        <span className="text-[11px] text-muted">
                          {student.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className={tableCellClass}>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
                        student.trackClass,
                      )}
                    >
                      <IconBook className="size-3.5" />
                      {student.track}
                    </span>
                  </td>
                  <td className={tableCellClass}>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-medium text-ink">
                        {student.material}
                      </span>
                      <span className="text-[11px] text-muted">
                        {student.detail}
                      </span>
                    </div>
                  </td>
                  <td className={tableCellClass}>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={cn(
                          "text-lg font-semibold",
                          student.scoreClass,
                        )}
                      >
                        {student.score}
                      </span>
                      <span className="text-[11px] text-muted">/ 100</span>
                    </div>
                  </td>
                  <td className={tableCellClass}>
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 text-[10px] font-semibold",
                        student.accessClass,
                      )}
                    >
                      {student.access}
                    </span>
                  </td>
                  <td className={cn(tableCellClass, "text-right")}>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        title="Kirim umpan balik suara"
                        aria-label={`Kirim umpan balik suara untuk ${student.name}`}
                        className={cn(
                          "grid size-8 place-items-center rounded-lg transition-colors",
                          student.primaryAction
                            ? "bg-brand text-white hover:bg-emerald-700"
                            : "bg-paper text-ink hover:bg-emerald-950 hover:text-white",
                        )}
                      >
                        <IconMic className="size-[18px]" />
                      </button>
                      <button
                        type="button"
                        title="Buka profil lengkap"
                        aria-label={`Buka profil lengkap ${student.name}`}
                        className="grid size-8 place-items-center rounded-lg bg-paper text-muted transition-colors hover:bg-emerald-950 hover:text-white"
                      >
                        <IconEye className="size-[18px]" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-1 text-[11px] text-muted sm:flex-row">
          <span>
            Menampilkan 4 dari 18 santri butuh tindakan evaluasi
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Halaman sebelumnya"
              className="rounded bg-paper p-1 text-muted transition-colors hover:bg-line/60 disabled:opacity-40"
              disabled
            >
              <IconChevronLeft className="size-[18px]" />
            </button>
            <span className="rounded bg-emerald-950 px-2.5 py-1 font-bold text-white dark:bg-emerald-900">
              1
            </span>
            <button
              type="button"
              className="rounded px-2.5 py-1 text-ink transition-colors hover:bg-paper"
            >
              2
            </button>
            <button
              type="button"
              className="rounded px-2.5 py-1 text-ink transition-colors hover:bg-paper"
            >
              3
            </button>
            <button
              type="button"
              aria-label="Halaman berikutnya"
              className="rounded bg-paper p-1 text-muted transition-colors hover:bg-line/60"
            >
              <IconChevronRight className="size-[18px]" />
            </button>
          </div>
        </div>
      </section>

      {/* -------------------------------------------- Finance & transactions */}
      <section
        id="transaksi"
        aria-label="Keuangan dan transaksi"
        className="grid scroll-mt-20 grid-cols-1 gap-4 lg:grid-cols-12"
      >
        <div className={cn(cardClass, "lg:col-span-4")}>
          <div className="flex items-start gap-3">
            <span
              className={cn(
                iconTileClass,
                "text-emerald-900 dark:text-emerald-200",
              )}
            >
              <IconWallet className="size-5" />
            </span>
            <div>
              <h2 className={panelHeadingClass}>Kanal Pembayaran</h2>
              <p className={panelSubheadingClass}>
                Rasio metode masuk bulan ini
              </p>
            </div>
          </div>

          <div className="space-y-3.5">
            {paymentChannels.map((channel) => (
              <div key={channel.label}>
                <div className="mb-1 flex items-center justify-between gap-2 text-[11px]">
                  <span className="font-semibold text-ink">{channel.label}</span>
                  <span className={cn("shrink-0 font-bold", channel.text)}>
                    {channel.share}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-paper">
                  <div
                    className={cn("h-full rounded-full", channel.bar)}
                    style={{ width: `${channel.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between gap-3 rounded-lg bg-paper p-2.5">
            <div className="flex flex-col">
              <span className="text-[10px] text-muted">
                Biaya Gateway Rata-rata
              </span>
              <span className="text-[12px] font-semibold text-ink">
                1,2% (Terkonsolidasi)
              </span>
            </div>
            <button
              type="button"
              className="rounded bg-surface px-2.5 py-1 text-[11px] font-semibold text-ink transition-colors hover:bg-line/60"
            >
              Audit Fee
            </button>
          </div>
        </div>

        <div className={cn(cardClass, "lg:col-span-8")}>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <span className={cn(iconTileClass, "text-brand")}>
                <IconReceipt className="size-5" />
              </span>
              <div>
                <h2 className={panelHeadingClass}>
                  Transaksi Terkini Langganan
                </h2>
                <p className={panelSubheadingClass}>
                  Pembaruan otomatis dari Payment Gateway Midtrans &amp; Xendit
                </p>
              </div>
            </div>
            <button
              type="button"
              className="flex shrink-0 items-center gap-1.5 self-start rounded-lg bg-paper px-3 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:bg-line/60 sm:self-auto"
            >
              <IconRefresh className="size-4" />
              Rekonsiliasi Faktur
            </button>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className={tableHeadClass}>
                  <th className="rounded-l-lg px-4 py-2.5">ID Faktur</th>
                  <th className="px-4 py-2.5">Pembayar</th>
                  <th className="px-4 py-2.5">Paket Lisensi</th>
                  <th className="px-4 py-2.5">Metode</th>
                  <th className="px-4 py-2.5">Nominal</th>
                  <th className="rounded-r-lg px-4 py-2.5 text-right">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-ink">
                {transactions.map((trx) => {
                  const MethodIcon = trx.methodIcon;
                  return (
                    <tr
                      key={trx.invoice}
                      className="border-t border-line/60 transition-colors hover:bg-paper/70"
                    >
                      <td className="px-4 py-3 font-mono text-[11px] text-muted">
                        {trx.invoice}
                      </td>
                      <td className="px-4 py-3 text-[12px] font-medium text-ink">
                        {trx.payer}
                      </td>
                      <td className="px-4 py-3 text-[12px] text-ink">
                        {trx.plan}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-[11px] text-ink">
                          <MethodIcon
                            className={cn("size-4", trx.methodClass)}
                          />
                          {trx.method}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[12px] font-semibold text-ink">
                        {trx.amount}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold",
                            trx.statusClass,
                          )}
                        >
                          <span
                            className={cn("size-1.5 rounded-full", trx.dotClass)}
                          />
                          {trx.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-start justify-between gap-2 pt-1 text-[11px] text-muted sm:flex-row sm:items-center">
            <span>
              Settlement Dana Terakhir:{" "}
              <strong className="font-semibold text-ink">
                Hari Ini, 03:00 WIB (Otomatis ke BSI Utama)
              </strong>
            </span>
            <a
              href="#"
              className="flex items-center gap-1 font-semibold text-brand hover:underline"
            >
              Kelola Buku Kas &amp; Payouts
              <IconArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
