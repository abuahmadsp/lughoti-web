import { cn } from "@/lib/cn";
import { AudioSample } from "./audio-sample";
import { DashboardTracks } from "./dashboard-tracks";
import { FlashcardDeck } from "./flashcard-deck";
import {
  IconAward,
  IconBadgeCheck,
  IconBook,
  IconCards,
  IconChat,
  IconCheck,
  IconClock,
  IconMic,
  IconPlay,
  IconTarget,
  IconTrendingUp,
  IconZap,
} from "./icons";

const cardClass =
  "rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5";

type TrackData = {
  id: "fushah" | "amiyah";
  badge: string;
  badgeClass: string;
  level: string;
  levelArabic?: string;
  metaLabel: string;
  metaIcon: typeof IconBook;
  title: string;
  arabic: string;
  arabicClass: string;
  description: string;
  module: string;
  activeTitle: string;
  activeArabic: string;
  progressLabel: string;
  progress: number;
  progressBar: string;
  progressText: string;
  footerIcon: typeof IconBook;
  footer: string;
  cta: string;
  ctaClass: string;
};

const tracks: TrackData[] = [
  {
    id: "fushah",
    badge: "Jalur Akademik",
    badgeClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    level: "Pemula 1 (A1)",
    metaLabel: "12 / 28 Materi",
    metaIcon: IconBook,
    title: "Bahasa Arab Fushah",
    arabic: "العَرَبِيَّةُ الفُصْحَى",
    arabicClass: "text-brand",
    description:
      "Fokus tata bahasa nahwu & shorof, teks qira'ah, dan kosakata Al-Qur'an serta media resmi.",
    module: "Modul 3: Kaidah Kalimat",
    activeTitle: "Isim, Fi'il, & Huruf",
    activeArabic: "الِاسْمُ وَالفِعْلُ وَالحَرْفُ",
    progressLabel: "Kelulusan Modul",
    progress: 42,
    progressBar: "bg-emerald-900 dark:bg-emerald-300",
    progressText: "text-ink",
    footerIcon: IconBadgeCheck,
    footer: "Standar CEFR A1-A2",
    cta: "Lanjutkan Belajar",
    ctaClass:
      "bg-emerald-950 text-white shadow-sm hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800",
  },
  {
    id: "amiyah",
    badge: "Jalur Percakapan",
    badgeClass: "bg-sand-200 text-sand-900",
    level: "Najdi & Hijazi",
    levelArabic: "لهجة نجدية / حجازية",
    metaLabel: "6 / 24 Modul",
    metaIcon: IconChat,
    title: "Amiyah Saudi",
    arabic: "العَامِّيَّةُ السَّعُودِيَّةُ",
    arabicClass: "text-sand-700 dark:text-sand-300",
    description:
      "Dialek lokal Riyadh, Jeddah & Mekkah untuk komunikasi sehari-hari, ekspresi santai, dan bisnis.",
    module: "Modul 2: Kuliner & Belanja",
    activeTitle: "Ungkapan di Restoran & Kafe",
    activeArabic: "فِي المَطْعَمِ وَالمَقْهَى",
    progressLabel: "Kelulusan Percakapan",
    progress: 25,
    progressBar: "bg-brand",
    progressText: "text-brand",
    footerIcon: IconMic,
    footer: "Dilengkapi Audio Aksen Asli",
    cta: "Lanjutkan Dialek",
    ctaClass:
      "bg-brand text-white shadow-sm hover:bg-emerald-700 dark:hover:bg-emerald-600",
  },
];

const metrics = [
  {
    label: "Kosakata Dikuasai",
    value: "148",
    note: "+12 pekan ini",
    noteClass: "font-semibold text-brand",
    icon: IconBook,
    iconClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
    badge: false,
  },
  {
    label: "Dialog Interaktif",
    value: "9",
    note: "Percakapan Nyata",
    noteClass: "font-medium text-muted",
    icon: IconChat,
    iconClass:
      "bg-sand-200/70 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200",
    badge: false,
  },
  {
    label: "Rata-rata Kuis",
    value: "88%",
    note: "Level Bagus",
    noteClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    icon: IconTarget,
    iconClass:
      "bg-emerald-950/5 text-emerald-950 dark:bg-emerald-100/10 dark:text-emerald-200",
    badge: true,
  },
  {
    label: "Waktu Belajar",
    value: "14,5",
    note: "Jam Terakumulasi",
    noteClass: "font-medium text-muted",
    icon: IconClock,
    iconClass: "bg-line/50 text-ink",
    badge: false,
  },
];

const week = [
  { day: "Sen", value: 60 },
  { day: "Sel", value: 45 },
  { day: "Rab", value: 80 },
  { day: "Kam", value: 50 },
  { day: "Jum", value: 90 },
  { day: "Sab", value: 75 },
  { day: "Hari Ini", value: 70, today: true },
];

const activityLog = [
  {
    title: "Kuis Huruf Jar & Majrur",
    time: "2 jam lalu",
    detail: "Skor: 92/100 • 12 Mufrodat Diuji",
    icon: IconCheck,
    iconClass:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200",
  },
  {
    title: "Latihan Percakapan di Bandara",
    time: "Kemarin",
    detail: "Dialek Saudi • Nilai Kelancaran 85%",
    icon: IconChat,
    iconClass:
      "bg-sand-200 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200",
  },
  {
    title: "Simulasi Audio: Di Pasar Suq Zal",
    time: "2 hari lalu",
    detail: "Audio disimak 2x tanpa terjemahan Latin",
    icon: IconMic,
    iconClass:
      "bg-emerald-950/5 text-emerald-950 dark:bg-emerald-100/10 dark:text-emerald-200",
  },
  {
    title: "Mencapai 7 Hari Streak!",
    time: "3 hari lalu",
    detail: "Bonus +150 XP telah ditambahkan ke akun",
    icon: IconAward,
    iconClass: "bg-line/50 text-ink",
  },
];

const premiumBenefits = [
  "Koreksi Fonetik AI",
  "Akses Kamus Tashrif Lengkap",
  "Sertifikat Berbasis Standar CEFR",
];

function TrackCard({ track }: { track: TrackData }) {
  const MetaIcon = track.metaIcon;
  const FooterIcon = track.footerIcon;

  return (
    <section
      id={track.id}
      className={cn(
        cardClass,
        "flex scroll-mt-24 flex-col justify-between gap-4 transition-shadow hover:shadow-md",
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em]",
                track.badgeClass,
              )}
            >
              {track.badge}
            </span>
            <span className="rounded-md bg-paper px-2.5 py-1 text-[10px] font-medium text-muted">
              {track.level}
              {track.levelArabic ? (
                <span className="ml-1" lang="ar" dir="rtl">
                  ({track.levelArabic})
                </span>
              ) : null}
            </span>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-[10px] font-semibold text-brand">
            <MetaIcon className="size-3.5" />
            {track.metaLabel}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-lg font-bold text-ink">{track.title}</h2>
            <span
              className={cn(
                "font-arabic text-lg font-bold leading-loose",
                track.arabicClass,
              )}
              lang="ar"
              dir="rtl"
            >
              {track.arabic}
            </span>
          </div>
          <p className="text-[12px] leading-5 text-muted">{track.description}</p>
        </div>

        <div className="flex flex-col gap-2 rounded-xl border border-line/50 bg-paper p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted">
            <span className="font-semibold uppercase tracking-[0.12em]">
              Materi Aktif Sekarang
            </span>
            <span className="font-medium text-brand">{track.module}</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[13px] font-semibold text-ink">
              {track.activeTitle}
            </span>
            <span
              className="font-arabic text-[15px] font-semibold leading-loose text-ink"
              lang="ar"
              dir="rtl"
            >
              {track.activeArabic}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 pt-0.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted">{track.progressLabel}</span>
            <span className={cn("font-bold", track.progressText)}>
              {track.progress}%
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-line/50">
            <div
              className={cn("h-full rounded-full", track.progressBar)}
              style={{ width: `${track.progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <span className="flex items-center gap-1.5 text-[10px] text-muted">
          <FooterIcon className="size-4 text-brand" />
          {track.footer}
        </span>
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-[12px] font-semibold transition-colors",
            track.ctaClass,
          )}
        >
          {track.cta}
          <IconPlay className="size-4" />
        </button>
      </div>
    </section>
  );
}

export function UserOverview() {
  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 sm:gap-6">
      {/* --------------------------------------------------- Welcome + target */}
      <section
        id="beranda"
        className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6"
      >
        <div className="relative z-10 flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
          <div className="flex max-w-2xl flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                Kalender Akademik 1447 H
              </span>
              <span className="text-line">|</span>
              <span className="text-[11px] font-medium text-muted">
                Target Harian: 20 Menit
              </span>
              <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                Data demo
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 className="text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Ahlan wa Sahlan, Fathia! 👋
              </h1>
              <span
                className="font-arabic text-xl font-semibold leading-none text-brand"
                lang="ar"
                dir="rtl"
              >
                أهلاً وسهلاً يا فتحية
              </span>
            </div>

            <p className="max-w-2xl text-pretty text-sm leading-6 text-muted sm:text-[15px]">
              Konsistensi adalah kunci menguasai kaidah Fushah dan kehangatan
              dialek Amiyah Saudi. Hari ini Anda sudah sangat dekat dengan
              target!
            </p>
          </div>

          <div className="flex min-w-[280px] items-center gap-4 self-start rounded-xl border border-line/60 bg-paper px-4 py-3.5 shadow-sm sm:px-5 xl:self-auto">
            <div className="relative flex size-14 shrink-0 items-center justify-center">
              <svg viewBox="0 0 36 36" aria-hidden="true" className="size-14 -rotate-90">
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
                  strokeDasharray="70 100"
                  strokeLinecap="round"
                  className="text-brand"
                />
              </svg>
              <span className="absolute text-[11px] font-bold text-ink">70%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                Target Hari Ini
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-ink">14</span>
                <span className="text-[12px] text-muted">/ 20 menit</span>
              </div>
              <span className="mt-0.5 flex items-center gap-1 text-[10px] font-medium text-brand">
                <span className="size-1.5 rounded-full bg-brand" />6 menit
                tersisa
              </span>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -right-8 size-48 rounded-full bg-gradient-to-br from-emerald-300/15 to-sand-300/20 blur-2xl"
        />
      </section>

      {/* ------------------------------------------------- Selected track only */}
      <DashboardTracks
        fushah={<TrackCard track={tracks[0]} />}
        amiyah={<TrackCard track={tracks[1]} />}
      />

      {/* ------------------------------------------------- Resume last lesson */}
      <section
        id="lanjutkan"
        className="scroll-mt-24 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6"
      >
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-3 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="relative flex size-2.5" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-70" />
                <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
                Lanjutkan Sesi Terakhir Anda
              </span>
              <span className="text-line">•</span>
              <span className="text-[11px] text-muted">
                Modul 4: Percakapan Dasar
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-ink sm:text-2xl">
                Salam &amp; Sapaan Formal (Tahiyyat)
              </h2>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span
                  className="font-arabic text-2xl font-bold leading-loose text-ink"
                  lang="ar"
                  dir="rtl"
                >
                  التَّعَارُفُ وَالتَّوَاصُلُ اليَوْمِيُّ
                </span>
                <span className="font-mono text-[10px] font-medium text-muted">
                  / at-ta‘āruf wa at-tawāṣul al-yawmiyy /
                </span>
              </div>
            </div>

            <p className="max-w-xl text-sm leading-6 text-muted">
              Pelajari perbedaan halus antara salam formal &quot;Ahlan Bika&quot;
              dengan respons khas Najdi &quot;Halla wallah&quot; dalam skenario
              resepsi kerja.
            </p>

            <AudioSample />
          </div>

          <div className="flex h-full flex-col items-start justify-between gap-4 lg:col-span-4 lg:items-end">
            <div className="relative h-36 w-full overflow-hidden rounded-xl bg-gradient-to-br from-emerald-800 via-emerald-950 to-emerald-900 shadow-sm">
              <div
                aria-hidden="true"
                className="absolute -right-6 -top-10 size-32 rounded-full border border-sand-300/20"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-12 -left-6 size-28 rounded-full border border-sand-300/10"
              />
              <span
                className="absolute inset-0 grid place-items-center font-arabic text-2xl font-bold text-sand-100/90"
                lang="ar"
                dir="rtl"
              >
                التَّعَارُف
              </span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-emerald-950 to-transparent p-3">
                <span className="text-[10px] font-medium text-sand-100">
                  Pelajaran 4 dari 8 dalam Modul Ini
                </span>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-950 px-5 py-3 text-[13px] font-bold text-white shadow-md transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800 lg:w-auto"
            >
              Buka Materi Sekarang
              <IconPlay className="size-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Metric cards */}
      <section
        id="progres"
        aria-label="Metrik belajar"
        className="grid scroll-mt-24 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className={cn(cardClass, "flex items-center gap-3.5")}
            >
              <span
                className={cn(
                  "grid size-11 shrink-0 place-items-center rounded-xl",
                  metric.iconClass,
                )}
              >
                <Icon className="size-5" />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-[10px] font-medium uppercase tracking-[0.1em] text-muted">
                  {metric.label}
                </span>
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-xl font-bold text-ink">
                    {metric.value}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-0.5 text-[10px]",
                      metric.badge
                        ? cn("rounded px-1.5 py-0.5", metric.noteClass)
                        : metric.noteClass,
                    )}
                  >
                    {metric.label === "Kosakata Dikuasai" ? (
                      <IconTrendingUp className="size-3.5" />
                    ) : null}
                    {metric.note}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* --------------------------------------- Flashcards & activity split */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="flex flex-col gap-3 xl:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <IconCards className="size-5 text-brand" />
              <h2 className="text-base font-bold text-ink">
                Latihan Kilat Hari Ini (5 Mufrodat)
              </h2>
            </div>
            <span className="text-[10px] font-medium text-muted">
              Ketuk kartu untuk melihat arti
            </span>
          </div>

          <div id="flashcard" className="scroll-mt-24">
            <FlashcardDeck />
          </div>

          <div className="mt-1 flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[12px] font-bold text-ink">
                Aktivitas Belajar 7 Hari Terakhir
              </span>
              <span className="text-[10px] font-semibold text-brand">
                Aktif Tiap Hari 🔥
              </span>
            </div>
            <div className="flex h-24 items-end justify-between gap-2 pt-1">
              {week.map((day) => (
                <div
                  key={day.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-1.5"
                >
                  <div
                    className={cn(
                      "w-full rounded-t-md",
                      day.today ? "bg-brand shadow-sm" : "bg-emerald-200/70 dark:bg-emerald-900/60",
                    )}
                    style={{ height: `${day.value}%` }}
                  />
                  <span
                    className={cn(
                      "text-[9px] font-medium",
                      day.today ? "font-bold text-brand" : "text-muted",
                    )}
                  >
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          id="aktivitas"
          className="flex scroll-mt-24 flex-col gap-3 xl:col-span-5"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <IconClock className="size-5 text-brand" />
              <h2 className="text-base font-bold text-ink">
                Aktivitas &amp; Log Evaluasi
              </h2>
            </div>
            <a
              href="#"
              className="text-[10px] font-semibold text-brand hover:underline"
            >
              Lihat Semua
            </a>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
            {activityLog.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full",
                      item.iconClass,
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[12px] font-semibold text-ink">
                        {item.title}
                      </span>
                      <span className="shrink-0 text-[10px] text-muted">
                        {item.time}
                      </span>
                    </div>
                    <span className="text-[11px] text-muted">
                      {item.detail}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------ Premium banner */}
      <section
        id="premium"
        className="relative scroll-mt-24 overflow-hidden rounded-2xl bg-emerald-950 p-5 text-sand-50 shadow-md sm:p-7"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-emerald-400/15 via-transparent to-transparent"
        />
        <div className="relative z-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="flex max-w-2xl flex-col gap-2">
            <div className="flex items-center gap-2">
              <IconAward className="size-5 text-sand-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-sand-300">
                Lughati Premium Academic
              </span>
            </div>
            <h2 className="text-balance text-xl font-bold sm:text-2xl">
              Akses 500+ Dialog Amiyah Saudi &amp; Audio Penutur Asli
            </h2>
            <p className="text-sm leading-6 text-emerald-100/80">
              Buka seluruh materi dialek regional (Najdi, Hijazi, Sharqiyyah),
              unduh rekaman audio tanpa batas, dan raih Sertifikat Kelulusan
              resmi berbasis standar CEFR.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
              {premiumBenefits.map((benefit) => (
                <span
                  key={benefit}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-sand-50"
                >
                  <IconCheck className="size-3.5 text-emerald-300" />
                  {benefit}
                </span>
              ))}
            </div>
          </div>

          <div className="flex w-full shrink-0 flex-col items-center gap-2 sm:w-auto">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-sand-300 px-5 py-3 text-[13px] font-bold text-emerald-950 shadow-md transition-colors hover:bg-sand-200 sm:w-auto"
            >
              <IconZap className="size-4" />
              Tingkatkan ke Pro (Diskon 40%)
            </button>
            <span className="text-[10px] text-emerald-100/70">
              Mulai Rp 49.000/bulan • Batalkan kapan saja
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
