import { cn } from "@/lib/cn";
import {
  IconArrowRight,
  IconAward,
  IconBadgeCheck,
  IconBook,
  IconBot,
  IconCalendar,
  IconCards,
  IconChat,
  IconCheck,
  IconChevronRight,
  IconClipboard,
  IconClock,
  IconDownload,
  IconGauge,
  IconGraduation,
  IconLightbulb,
  IconLock,
  IconMic,
  IconPlay,
  IconShare,
  IconSparkles,
} from "./icons";
import {
  ConversationPracticeButton,
  LearningPathActionsProvider,
  PathInfoButton,
  ReviewAudioButton,
} from "./learning-path-actions";
import { PathExplorer } from "./path-explorer";

const card = "rounded-2xl border border-line/70 bg-surface shadow-sm";
const mutedCard = "rounded-2xl border border-line/60 bg-surface/70 shadow-sm";

const stats = [
  { value: "48%", label: "Total Kurikulum" },
  { value: "1.480", label: "Akumulasi XP", icon: true },
  { value: "7", label: "Hari Beruntun", fire: true },
];

const achievements = [
  {
    value: "18",
    label: "Modul Selesai",
    icon: IconCheck,
    iconClass: "text-brand",
  },
  {
    value: "148",
    label: "Mufrodat Dikuasai",
    icon: IconCards,
    iconClass: "text-sand-700 dark:text-sand-300",
  },
  {
    value: "14,5 Jam",
    label: "Waktu Belajar",
    icon: IconClock,
    iconClass: "text-brand",
  },
  {
    value: "2",
    label: "Sertifikat",
    icon: IconAward,
    iconClass: "text-sand-700 dark:text-sand-300",
  },
];

const certificates = [
  {
    title: "Marhalah 1 : Mubtadi'",
    credential: "ID kredensial: LG-MB-2024-89",
    iconClass: "text-brand",
  },
  {
    title: "‘Amiyah Modul 1 : Ta'aruf",
    credential: "ID kredensial: LG-AM-2024-12",
    iconClass: "text-sand-700 dark:text-sand-300",
  },
];

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  badge,
  badgeArabic,
  statusLabel,
  statusValue,
  statusClass,
  iconClass,
}: {
  icon: typeof IconBook;
  eyebrow: string;
  title: string;
  description: string;
  badge: string;
  badgeArabic?: string;
  statusLabel: string;
  statusValue: string;
  statusClass: string;
  iconClass: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line/70 bg-paper p-4",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-xl",
            iconClass,
          )}
        >
          <Icon className="size-5" />
        </span>
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand">
              {eyebrow}
            </span>
            <span className="rounded bg-surface px-2 py-0.5 text-[10px] font-semibold text-muted">
              {badge}
            </span>
            {badgeArabic ? (
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic text-[12px] text-muted"
              >
                {badgeArabic}
              </span>
            ) : null}
          </div>
          <h2 className="text-base font-bold leading-snug text-ink">{title}</h2>
          <p className="max-w-xl text-[12px] leading-5 text-muted">
            {description}
          </p>
        </div>
      </div>
      <div className="hidden flex-col text-right sm:flex">
        <span className="text-[10px] text-muted">{statusLabel}</span>
        <span className={cn("text-[12px] font-bold", statusClass)}>
          {statusValue}
        </span>
      </div>
    </div>
  );
}

function LearningPathHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-7">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 text-emerald-900 opacity-10 dark:text-emerald-200"
      >
        <svg
          viewBox="0 0 200 200"
          className="size-72"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M100 0 130 70 200 100 130 130 100 200 70 130 0 100 70 70Z" />
          <circle cx="100" cy="100" r="45" />
          <circle cx="100" cy="100" r="75" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white dark:bg-emerald-900">
              Peta Kurikulum
            </span>
            <span className="text-line">•</span>
            <span className="text-[11px] font-semibold text-brand">
              Mengacu kerangka CEFR A1–C1
            </span>
            <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
              Data demo
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              title="Demo antarmuka — berkas silabus belum tersedia"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-surface px-3 py-1.5 text-[11px] font-semibold text-ink shadow-sm transition-colors hover:bg-paper"
            >
              <IconBook className="size-4 text-brand" />
              Unduh Silabus (PDF)
            </button>
            <button
              type="button"
              title="Demo antarmuka — tes penempatan belum tersedia"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-950 px-3.5 py-1.5 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
            >
              <IconClipboard className="size-4" />
              Uji Penempatan Level
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          <div className="flex flex-col gap-3 lg:col-span-8">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h1 className="text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Jalur Belajar Terstruktur
              </h1>
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic text-xl font-semibold leading-none text-sand-700 dark:text-sand-300"
              >
                مَسَارَاتُ التَّعَلُّمِ
              </span>
            </div>
            <p className="max-w-2xl text-pretty text-sm leading-6 text-muted sm:text-[15px]">
              Kurikulum pedagogis dwijalur: memadukan ketelitian gramatikal{" "}
              <span className="font-semibold text-brand">
                Fushah Akademis
              </span>{" "}
              (<span className="font-arabic" lang="ar" dir="rtl">نحو وصرف</span>
              ) dengan kelancaran praktis{" "}
              <span className="font-semibold text-sand-800 dark:text-sand-300">
                ‘Amiyah Saudi
              </span>{" "}
              untuk kesiapan membaca teks ilmiah sekaligus muamalah harian.
            </p>
          </div>

          <div className={cn(card, "flex flex-col gap-4 p-4 sm:p-5 lg:col-span-4")}>
            <div className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200">
                <IconAward className="size-5" />
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-[10px] uppercase tracking-[0.12em] text-muted">
                  Level Aktif Santri
                </span>
                <span className="text-base font-bold leading-tight text-ink">
                  Level 4 : Mutawassith
                </span>
                <span className="text-[10px] font-medium text-brand">
                  Fushah Intermediate (A2–B1)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-0.5 rounded-lg bg-paper p-2.5"
                >
                  <div className="flex items-center gap-1">
                    {stat.icon ? (
                      <IconSparkles className="size-3.5 text-brand" />
                    ) : null}
                    {stat.fire ? (
                      <span aria-hidden="true" className="text-[11px]">
                        🔥
                      </span>
                    ) : null}
                    <span className="text-sm font-bold text-ink">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-[9px] text-muted">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2 text-[10px]">
                <span className="text-muted">Menuju Marhalah 3: Tarkib</span>
                <span className="font-bold text-brand">480 / 1.000 XP</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-line/50">
                <div
                  className="h-full rounded-full bg-brand"
                  style={{ width: "48%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FushahTrack() {
  return (
    <section id="track-fushah" className="flex scroll-mt-24 flex-col gap-4">
      <SectionHeader
        icon={IconBook}
        eyebrow="Jalur 1"
        title="Fushah Standar Akademik"
        description="Penguasaan tata bahasa presisi (Nahwu–Shorof), struktur kalimat fusha, dan kemampuan membaca kitab turots."
        badge="Formal & Turots"
        statusLabel="Status Track"
        statusValue="Marhalah 2 Aktif"
        statusClass="text-brand"
        iconClass="bg-emerald-950 text-white dark:bg-emerald-900"
      />

      <div className="relative flex flex-col gap-4 pl-6 before:absolute before:bottom-4 before:left-3 before:top-4 before:w-0.5 before:bg-line before:content-[''] sm:pl-8 sm:before:left-4">
        {/* ------------------------------------------- Marhalah 1 (selesai) */}
        <div className="relative">
          <span className="absolute -left-6 top-1.5 z-10 grid size-7 place-items-center rounded-full bg-brand text-white ring-4 ring-paper sm:-left-8">
            <IconCheck className="size-4" />
          </span>
          <div className={cn(card, "flex flex-col gap-3 p-4 sm:p-5")}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand">
                    Marhalah 1 • Mubtadi&apos;
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                    100% Selesai
                  </span>
                  <PathInfoButton
                    info="m1"
                    title="Lihat detail Marhalah 1"
                    className="text-[10px] font-semibold text-brand hover:underline"
                  >
                    Detail Marhalah
                  </PathInfoButton>
                </div>
                <h3 className="text-[15px] font-semibold leading-snug text-ink">
                  Kaidah Dasar Huruf, Harakat &amp; Pembagian Kalimah
                </h3>
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-[15px] leading-loose text-muted"
                >
                  مَبَادِئُ اللُّغَةِ: الحُرُوفُ، الحَرَكَاتُ، وَأَقْسَامُ الكَلِمِ
                  (اِسْمٌ، فِعْلٌ، حَرْفٌ)
                </span>
              </div>
              <span className="flex items-center gap-1.5 rounded-lg bg-paper px-2.5 py-1.5 text-[10px] font-semibold text-ink">
                <IconAward className="size-4 text-gold" />
                Lencana Mubtadi&apos; Mutqin
              </span>
            </div>

            <p className="text-[12px] leading-5 text-muted">
              Mencakup 12 unit materi: artikulasi makharijul huruf fusha, tanda
              isim/fi&apos;il/huruf, dhamir munfashil, dan 140 mufrodat dasar
              ibadah harian.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="flex items-center gap-1 text-[10px] text-muted">
                <IconClock className="size-3.5" />
                Diselesaikan 14 Syawal 1447 H
              </span>
              <PathInfoButton
                info="history"
                title="Buka riwayat dan catatan Marhalah 1"
                className="flex items-center gap-1 text-[11px] font-semibold text-brand transition-colors hover:text-emerald-800 dark:hover:text-emerald-200"
              >
                Lihat Riwayat &amp; Catatan
                <IconChevronRight className="size-3.5" />
              </PathInfoButton>
            </div>
          </div>
        </div>

        {/* ----------------------------------------- Marhalah 2 (aktif) */}
        <div className="relative">
          <span className="absolute -left-6 top-1.5 z-10 grid size-7 animate-pulse-dot place-items-center rounded-full bg-emerald-950 text-white ring-4 ring-paper sm:-left-8 dark:bg-emerald-900">
            <IconPlay className="size-3.5" />
          </span>
          <div className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-brand/30 bg-surface p-4 shadow-md ring-1 ring-brand/10 sm:p-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-emerald-300/10 blur-xl"
            />
            <div className="relative flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex min-w-0 flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-brand">
                      Marhalah 2 • Nahwu &amp; Shorof Dasar
                    </span>
                    <span className="rounded-full bg-emerald-950 px-2.5 py-0.5 text-[10px] font-semibold text-white dark:bg-emerald-900">
                      Sedang Aktif (68%)
                    </span>
                    <PathInfoButton
                      info="m2"
                      title="Lihat detail Marhalah 2"
                      className="text-[10px] font-semibold text-brand hover:underline"
                    >
                      Detail Marhalah
                    </PathInfoButton>
                  </div>
                  <h3 className="text-[15px] font-semibold leading-snug text-ink">
                    Struktur Jumlah Fi&apos;liyyah, Ismiyyah &amp; Tasyrif
                    Af&apos;al
                  </h3>
                  <span
                    lang="ar"
                    dir="rtl"
                    className="font-arabic text-[15px] leading-loose text-brand"
                  >
                    الجُمْلَةُ الفِعْلِيَّةُ، الجُمْلَةُ الاِسْمِيَّةُ،
                    المَفْعُولُ بِهِ، وَتَصْرِيفُ الأَفْعَالِ
                  </span>
                </div>
                <span className="flex items-center gap-1.5 rounded-lg bg-paper px-3 py-1 text-[10px] font-medium text-ink">
                  <IconClock className="size-4 text-brand" />
                  Modul 5 dari 8
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  {
                    info: "bab1_2" as const,
                    chapter: "Bab 1-2",
                    topic: "Fa'il & Maf'ul",
                    className:
                      "bg-paper hover:bg-surface hover:shadow-sm",
                  },
                  {
                    info: "bab3_4" as const,
                    chapter: "Bab 3-4",
                    topic: "Mubtada' Khobar",
                    className:
                      "bg-paper hover:bg-surface hover:shadow-sm",
                  },
                ].map((item) => (
                  <PathInfoButton
                    key={item.chapter}
                    info={item.info}
                    title={`Lihat detail ${item.chapter}: ${item.topic}`}
                    className={cn(
                      "flex flex-col gap-1 rounded-lg p-2.5 text-left transition-all",
                      item.className,
                    )}
                  >
                    <span className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold text-ink">
                        {item.chapter}
                      </span>
                      <IconCheck className="size-3.5 text-brand" />
                    </span>
                    <span className="truncate text-[11px] text-muted">
                      {item.topic}
                    </span>
                  </PathInfoButton>
                ))}
                <PathInfoButton
                  info="bab5"
                  title="Lihat detail Bab 5: Isim Inna & Kaana"
                  className="flex flex-col gap-1 rounded-lg bg-emerald-950 p-2.5 text-left text-white shadow-sm transition-all hover:bg-emerald-900 hover:shadow-md dark:bg-emerald-900 dark:hover:bg-emerald-800"
                >
                  <span className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold">Bab 5 (Aktif)</span>
                    <span className="size-2 rounded-full bg-sand-300" />
                  </span>
                  <span className="truncate text-[11px] font-medium">
                    Isim Inna &amp; Kaana
                  </span>
                </PathInfoButton>
                <PathInfoButton
                  info="bab6_8"
                  title="Lihat syarat dan detail Bab 6-8"
                  className="flex flex-col gap-1 rounded-lg bg-paper/60 p-2.5 text-left text-muted transition-all hover:bg-surface hover:shadow-sm"
                >
                  <span className="flex items-center justify-between gap-1">
                    <span className="text-[10px] font-bold">Bab 6-8</span>
                    <IconLock className="size-3.5" />
                  </span>
                  <span className="truncate text-[11px]">
                    Tasyrif Istilahi
                  </span>
                </PathInfoButton>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px]">
                  <span className="text-muted">
                    Progres Kelulusan Marhalah 2
                  </span>
                  <span className="font-bold text-ink">
                    68% selesai (Bab 5 sedang berlangsung)
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-line/50">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: "68%" }}
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex flex-wrap items-center gap-2">
                  <PathInfoButton
                    info="bab5"
                    title="Buka pratinjau Bab 5: Isim Inna"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-4 py-2.5 text-[12px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
                  >
                    Lanjutkan Bab 5: Isim Inna
                    <IconArrowRight className="size-4" />
                  </PathInfoButton>
                  <PathInfoButton
                    info="drill"
                    title="Buka pratinjau Tashrif Drill"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-paper px-3.5 py-2.5 text-[12px] font-semibold text-ink transition-colors hover:bg-surface"
                  >
                    <IconMic className="size-4 text-brand" />
                    Tashrif Drill
                  </PathInfoButton>
                </div>
                <span className="text-[10px] text-muted">
                  Estimasi tuntas: 5 hari
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------------------- Marhalah 3 (terkunci) */}
        <div className="relative">
          <span className="absolute -left-6 top-1.5 z-10 grid size-7 place-items-center rounded-full bg-line/60 text-muted ring-4 ring-paper sm:-left-8">
            <IconLock className="size-3.5" />
          </span>
          <div className={cn(mutedCard, "flex flex-col gap-3 p-4 sm:p-5")}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                    Marhalah 3 • Tarkib &amp; Balaghah
                  </span>
                  <span className="rounded-full bg-line/50 px-2 py-0.5 text-[10px] font-semibold text-muted">
                    Terkunci
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold leading-snug text-ink/80">
                  Kaidah I&apos;rob Lengkap, Tasybih, Majaz &amp; Qira&apos;ah
                  Kitab Gundul
                </h3>
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-[15px] leading-loose text-muted"
                >
                  الإِعْرَابُ التَّفْصِيلِيُّ، عِلْمُ البَيَانِ (التَّشْبِيهُ
                  وَالمَجَازُ)، وَقِرَاءَةُ النُّصُوصِ التُّرَاثِيَّةِ
                </span>
              </div>
              <span className="flex items-center gap-1 rounded-lg bg-paper px-2.5 py-1 text-[10px] text-muted">
                <IconLock className="size-3.5" />
                Syarat: Tuntaskan Marhalah 2
              </span>
            </div>
            <p className="text-[12px] leading-5 text-muted">
              Mengupas 16 bab lanjutan: I&apos;rob Mahalli/Taqdiri, Na&apos;at
              Man&apos;ut, Idhafah majazi, dasar keindahan balaghah Al-Qur&apos;an,
              dan pembacaan teks tanpa syakal.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-[10px] text-muted">
                Syarat: Tuntaskan Marhalah 2
              </span>
              <PathInfoButton
                info="m3"
                title="Lihat syarat dan detail Marhalah 3"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand transition-colors hover:underline"
              >
                Lihat Syarat &amp; Detail
                <IconChevronRight className="size-3.5" />
              </PathInfoButton>
            </div>
          </div>
        </div>

        {/* --------------------------------------- Marhalah 4 (terkunci) */}
        <div className="relative">
          <span className="absolute -left-6 top-1.5 z-10 grid size-7 place-items-center rounded-full bg-line/60 text-muted ring-4 ring-paper sm:-left-8">
            <IconLock className="size-3.5" />
          </span>
          <div className={cn(mutedCard, "flex flex-col gap-3 p-4 sm:p-5")}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted">
                    Marhalah 4 • Mahir &amp; Dirasah Mutaqaddimah
                  </span>
                  <span className="rounded-full bg-line/50 px-2 py-0.5 text-[10px] font-semibold text-muted">
                    Terkunci
                  </span>
                </div>
                <h3 className="text-[15px] font-semibold leading-snug text-ink/80">
                  Analisis Kutub Turots, I&apos;jaz Al-Qur&apos;an &amp;
                  Penulisan Makalah Ilmiah
                </h3>
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-[15px] leading-loose text-muted"
                >
                  دِرَاسَةُ أُمَّهَاتِ الكُتُبِ، إِعْجَازُ القُرْآنِ،
                  وَالبَحْثُ الأَكَادِيمِيُّ بِالعَرَبِيَّةِ
                </span>
              </div>
              <span className="rounded-lg bg-paper px-2.5 py-1 text-[10px] text-muted">
                Level target C1
              </span>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <span className="text-[10px] text-muted">
                Prasyarat: tuntas Marhalah 3
              </span>
              <PathInfoButton
                info="m4"
                title="Lihat syarat dan detail Marhalah 4"
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand transition-colors hover:underline"
              >
                Lihat Syarat &amp; Detail
                <IconChevronRight className="size-3.5" />
              </PathInfoButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AmiyahTrack() {
  return (
    <section id="track-amiyah" className="flex scroll-mt-24 flex-col gap-4">
      <SectionHeader
        icon={IconChat}
        eyebrow="Jalur 2"
        title="‘Amiyah Saudi & Komunikasi Praktis"
        description="Skenario percakapan situasional interaktif di Riyadh, Makkah, Madinah, dan Jeddah."
        badge="Lahjah Hijazi & Najdi"
        badgeArabic="لهجة نجدية / حجازية"
        statusLabel="Modul Aktif"
        statusValue="Modul 2 (85%)"
        statusClass="text-sand-700 dark:text-sand-300"
        iconClass="bg-sand-300 text-sand-900 dark:bg-sand-300/25 dark:text-sand-200"
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* -------------------------------------- Modul 1 (selesai) */}
        <div
          className={cn(
            card,
            "flex flex-col justify-between gap-4 p-4 transition-shadow hover:shadow-md sm:p-5",
          )}
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                Modul 1 • Selesai
              </span>
              <IconBadgeCheck className="size-4 text-brand" />
            </div>
            <h3 className="text-[15px] font-semibold leading-snug text-ink">
              Kedatangan di Bandara King Abdulaziz Jeddah
            </h3>
            <p
              lang="ar"
              dir="rtl"
              className="font-arabic text-[15px] leading-loose text-sand-700 dark:text-sand-300"
            >
              وُصُولُ المَطَارِ: إِجْرَاءَاتُ الجَوَازَاتِ، التَّعَارُفُ،
              وَالتَّرْحِيبُ السُّعُودِيُّ
            </p>
            <p className="text-[12px] leading-5 text-muted">
              Ekspresi autentik: &quot;Hala wallah&quot;, &quot;Ya
              marhaba&quot;, navigasi terminal haji/umrah, klaim bagasi, dan
              pertukaran kontak.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <span className="text-[10px] font-semibold text-brand">
              Skor Fashahah: 96%
            </span>
            <ReviewAudioButton
              className="flex items-center gap-1 text-[11px] font-medium text-ink transition-colors hover:text-brand"
              title="Buka pratinjau audio review Modul 1"
            >
              Putar Audio Review
              <IconPlay className="size-4" />
            </ReviewAudioButton>
          </div>
        </div>

        {/* ----------------------------------------- Modul 2 (aktif) */}
        <div className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-2xl border border-sand-300/50 bg-surface p-4 shadow-md ring-1 ring-sand-300/20 sm:p-5">
          <div className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="rounded bg-sand-200 px-2.5 py-1 text-[10px] font-bold text-sand-900 dark:bg-sand-300/25 dark:text-sand-200">
                Modul 2 • Sedang Aktif
              </span>
              <span className="flex items-center gap-1 text-[10px] font-bold text-sand-700 dark:text-sand-300">
                <span aria-hidden="true">🔥</span>
                85% Selesai
              </span>
            </div>
            <h3 className="text-[15px] font-semibold leading-snug text-ink">
              Maqha Kafe, Restoran &amp; Tawar-Menawar di Suq
            </h3>
            <p
              lang="ar"
              dir="rtl"
              className="font-arabic text-[15px] leading-loose text-sand-700 dark:text-sand-300"
            >
              فِي المَقْهَى، المَطْعَمِ، وَالمُسَاوَمَةِ فِي السُّوقِ
              الشَّعْبِيِّ (&quot;كَمْ هَذَا؟&quot;)
            </p>
            <p className="text-[12px] leading-5 text-muted">
              Pemesanan Qahwa Saudi, Tamr Sukari, transaksi tunai/Mada, serta
              intonasi khas keramahan pedagang lokal Hijazi.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-line/50">
              <div
                className="h-full rounded-full bg-sand-400"
                style={{ width: "85%" }}
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
              <span className="text-[10px] text-muted">
                Sisa 1 skenario roleplay AI
              </span>
              <ConversationPracticeButton
                className="inline-flex items-center gap-1.5 rounded-lg bg-sand-300 px-3.5 py-1.5 text-[11px] font-semibold text-sand-950 shadow-sm transition-colors hover:bg-sand-200 dark:bg-sand-300 dark:hover:bg-sand-200"
                title="Buka pratinjau roleplay Modul 2"
              >
                <IconMic className="size-3.5" />
                Buka Latihan Percakapan
              </ConversationPracticeButton>
            </div>
          </div>
        </div>

        {/* -------------------------------------- Modul 3 (terkunci) */}
        <div className={cn(mutedCard, "flex flex-col justify-between gap-4 p-4 sm:p-5")}>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded bg-line/50 px-2 py-0.5 text-[10px] font-semibold text-muted">
                Modul 3 • Terkunci
              </span>
              <IconLock className="size-4 text-muted" />
            </div>
            <h3 className="text-[15px] font-semibold leading-snug text-ink/80">
              Transportasi: Kereta Cepat Haramain &amp; Navigasi Kota
            </h3>
            <p
              lang="ar"
              dir="rtl"
              className="font-arabic text-[15px] leading-loose text-muted"
            >
              قِطَارُ الحَرَمَيْنِ، سَيَّارَاتُ الأُجْرَةِ، وَوَصْفُ الطَّرِيقِ
              بِمَكَّةَ وَالمَدِينَةِ
            </p>
            <p className="text-[12px] leading-5 text-muted">
              Pemberian arah jalan (&quot;Khallak &apos;ala thul&quot;,
              &quot;Yamin/Yasar&quot;), reservasi tiket gerbong kelas bisnis,
              dan interaksi pengemudi ride-hailing.
            </p>
          </div>
          <p className="text-[10px] text-muted">
            Terbuka setelah menyelesaikan evaluasi Modul 2
          </p>
        </div>

        {/* -------------------------------------- Modul 4 (terkunci) */}
        <div className={cn(mutedCard, "flex flex-col justify-between gap-4 p-4 sm:p-5")}>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded bg-line/50 px-2 py-0.5 text-[10px] font-semibold text-muted">
                Modul 4 • Terkunci
              </span>
              <IconLock className="size-4 text-muted" />
            </div>
            <h3 className="text-[15px] font-semibold leading-snug text-ink/80">
              Negosiasi Bisnis, Muamalah Kerja &amp; Diplomasi Formal
            </h3>
            <p
              lang="ar"
              dir="rtl"
              className="font-arabic text-[15px] leading-loose text-muted"
            >
              التَّفَاوُضُ التِّجَارِيُّ، مُقَابَلَاتُ العَمَلِ، وَبِيئَةُ
              الشَّرِكَاتِ فِي الرِّيَاضِ
            </p>
            <p className="text-[12px] leading-5 text-muted">
              Ungkapan etos kerja modern, sopan-santun presentasi tender bisnis,
              dan etika persuratan kantor.
            </p>
          </div>
          <p className="text-[10px] text-muted">
            Prasyarat: tuntas Marhalah 2
          </p>
        </div>
      </div>
    </section>
  );
}

function ToaflTrack() {
  return (
    <section
      id="track-toafl"
      className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-emerald-200/30 via-transparent to-transparent dark:from-emerald-900/30"
      />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3.5">
          <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-950 text-white shadow-sm dark:bg-emerald-900">
            <IconGraduation className="size-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand">
              Jalur Khusus Persiapan
            </span>
            <h2 className="text-base font-bold leading-snug text-ink sm:text-lg">
              Persiapan TOAFL &amp; Karya Tulis Ilmiah (KTI) Bahasa Arab
            </h2>
            <p className="mt-1 max-w-xl text-[12px] leading-5 text-muted">
              Latihan bertema Fahmul Masmu&apos; (menyimak), Qawa&apos;id wa
              Tarkib (struktur), dan Fahmul Maqru&apos; (membaca) dengan contoh
              soal simulasi.
            </p>
          </div>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-line/70 bg-surface px-4 py-2.5 text-[12px] font-semibold text-ink shadow-sm transition-colors hover:bg-paper"
        >
          <IconClipboard className="size-4 text-brand" />
          Ikuti Tryout Simulasi #1
        </button>
      </div>
    </section>
  );
}

function LearningSidebar() {
  return (
    <>
      {/* ------------------------------------------- AI Talaqqi preview */}
      <div className={cn(card, "flex flex-col gap-4 p-4 sm:p-5")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200">
              <IconBot className="size-5" />
            </span>
            <div className="flex flex-col">
              <h2 className="text-[13px] font-bold text-ink">
                Rekomendasi AI Talaqqi
              </h2>
              <span className="text-[10px] text-muted">
                Analisis personalisasi belajar
              </span>
            </div>
          </div>
          <span className="rounded bg-paper px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">
            Pratinjau
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 rounded-xl bg-paper p-3">
            <div className="flex items-center gap-2.5">
              <IconGauge className="size-4 shrink-0 text-brand" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted">
                  Skor Fashahah Fonetik
                </span>
                <span className="text-base font-bold text-ink">92,4%</span>
              </div>
            </div>
            <span className="shrink-0 rounded bg-emerald-100 px-2 py-1 text-[9px] font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
              Sangat Baik
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 rounded-xl bg-paper p-3">
            <div className="flex items-center gap-2.5">
              <IconCalendar className="size-4 shrink-0 text-sand-700 dark:text-sand-300" />
              <div className="flex flex-col">
                <span className="text-[10px] text-muted">
                  Estimasi Buka Marhalah 3
                </span>
                <span className="text-base font-bold text-ink">
                  ~ 3 minggu
                </span>
              </div>
            </div>
            <span className="shrink-0 text-[9px] font-semibold text-sand-700 dark:text-sand-300">
              Sesuai target
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 rounded-xl bg-paper p-3.5">
          <span className="flex items-center gap-1.5 text-[10px] font-semibold text-ink">
            <IconLightbulb className="size-3.5 text-gold" />
            Saran latihan hari ini:
          </span>
          <p className="text-[11px] leading-5 text-muted">
            Perkuat tasyrif fi&apos;il mu&apos;tal (kata kerja berhuruf illat)
            pada bab{" "}
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-[13px] font-medium text-ink"
            >
              قَالَ - يَقُولُ
            </span>{" "}
            untuk memperlancar transisi ke materi I&apos;rob Taqdiri di Marhalah
            3.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-[12px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
        >
          <IconMic className="size-4" />
          Mulai Sesi Talaqqi Suara (5 Menit)
        </button>
      </div>

      {/* ------------------------------------------ Ringkasan capaian */}
      <div className={cn(card, "flex flex-col gap-4 p-4 sm:p-5")}>
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-base font-bold text-ink">Ringkasan Capaian</h2>
          <IconAward className="size-5 text-gold" />
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {achievements.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex flex-col gap-1 rounded-xl bg-paper p-3"
              >
                <div className="flex items-center gap-1.5">
                  <Icon className={cn("size-4", item.iconClass)} />
                  <span className="text-base font-bold text-ink">
                    {item.value}
                  </span>
                </div>
                <span className="text-[10px] text-muted">{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted">
            Contoh sertifikat
          </span>
          {certificates.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between gap-2 rounded-lg bg-paper p-2.5"
            >
              <div className="flex min-w-0 items-center gap-2">
                <IconBadgeCheck
                  className={cn("size-4 shrink-0", item.iconClass)}
                />
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[11px] font-bold text-ink">
                    {item.title}
                  </span>
                  <span className="truncate text-[9px] text-muted">
                    {item.credential}
                  </span>
                </div>
              </div>
              <button
                type="button"
                title="Demo antarmuka — berkas sertifikat belum tersedia"
                className="grid size-8 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                <IconDownload className="size-4" />
                <span className="sr-only">Unduh {item.title}</span>
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-line/70 bg-paper px-4 py-2.5 text-[12px] font-semibold text-ink transition-colors hover:bg-surface"
        >
          <IconShare className="size-4" />
          Bagikan Portofolio Belajar
        </button>
      </div>

      {/* --------------------------------------------- Halaqah live */}
      <div className={cn(card, "flex flex-col gap-3 p-4 sm:p-5")}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-[12px] font-bold text-ink">
            <IconCalendar className="size-4 text-brand" />
            Halaqah Live Pekan Ini
          </span>
          <span className="text-[10px] font-semibold text-brand">
            2 sesi tersedia
          </span>
        </div>

        <div className="flex flex-col gap-1 rounded-lg bg-paper p-3 shadow-sm">
          <span className="text-[10px] font-semibold text-sand-700 dark:text-sand-300">
            Kamis, 20.00 WIB • Tim Musyrif Lughati
          </span>
          <span className="text-[12px] font-bold text-ink">
            Kupas Tuntas I&apos;rob Bab Inna wa Akhwatuha
          </span>
          <span className="text-[10px] text-muted">
            Sesi daring • Terbuka untuk Marhalah 2 &amp; 3
          </span>
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-paper px-3 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/40"
        >
          Reservasi Tempat Halaqah
        </button>
      </div>
    </>
  );
}

export function LearningPath() {
  return (
    <LearningPathActionsProvider>
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5 sm:gap-6">
        <LearningPathHero />
        <PathExplorer
          fushah={<FushahTrack />}
          amiyah={<AmiyahTrack />}
          toafl={<ToaflTrack />}
          sidebar={<LearningSidebar />}
        />
      </div>
    </LearningPathActionsProvider>
  );
}
