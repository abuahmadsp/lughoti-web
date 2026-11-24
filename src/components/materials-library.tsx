import { cn } from "@/lib/cn";
import {
  MaterialsActionButton,
  MaterialsActionsProvider,
} from "./materials-actions";
import { MatanAudioPlayer } from "./matan-audio-player";
import { ModuleCatalog } from "./module-catalog";
import {
  IconAward,
  IconBook,
  IconCalendar,
  IconCheck,
  IconClipboard,
  IconDownload,
  IconPlay,
  IconWaveform,
} from "./icons";

const card = "rounded-2xl border border-line/70 bg-surface shadow-sm";

const diktat = [
  {
    title: "Matan Al-Ajrumiyyah",
    meta: "Ringkasan nahwu • 4,2 MB",
    tone: "bg-emerald-950 text-white dark:bg-emerald-900",
    accent: "text-sand-300",
    iconClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
  },
  {
    title: "Syarah Al-Ajrumiyyah",
    meta: "Syarah matan • 18,7 MB",
    tone: "bg-sand-300 text-sand-950 dark:bg-sand-300/25 dark:text-sand-100",
    accent: "text-sand-900 dark:text-sand-300",
    iconClass: "bg-sand-200/70 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200",
  },
  {
    title: "Mu'jam Mufrodat Fushah–Amiyah",
    meta: "Tim Kurikulum Lughati • 6,5 MB",
    tone: "bg-brand text-white",
    accent: "text-emerald-100",
    iconClass: "bg-line/50 text-ink",
  },
];

function MaterialsHeader() {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-2xl flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
              <span className="size-1.5 rounded-full bg-brand" />
              Manhaj Akademik Santri
            </span>
            <span aria-hidden="true" className="text-line">
              •
            </span>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-[13px] font-semibold text-brand"
            >
              المواد والمناهج الدراسية
            </span>
            <span className="rounded-full border border-line/70 bg-surface px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
              Data demo
            </span>
          </div>

          <h1 className="text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Materi &amp; Modul Pembelajaran
          </h1>
          <p className="text-pretty text-sm leading-6 text-muted sm:text-[15px]">
            Koleksi silabus interaktif, video kuliah gramatika, lembar kerja
            tashrif, dan contoh audio untuk penguasaan bahasa Arab bertahap.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-line/70 bg-surface p-2.5 shadow-sm">
          <div className="flex items-center gap-3 rounded-xl bg-paper px-3.5 py-2">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
              <IconBook className="size-5" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted">
                Modul Diselesaikan
              </span>
              <span className="text-base font-bold leading-tight text-ink">
                4{" "}
                <span className="text-[11px] font-normal text-muted">
                  / 11 modul
                </span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-sand-100 px-3.5 py-2 dark:bg-sand-300/15">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sand-200/80 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
              <IconAward className="size-5" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] text-muted">Rata-rata Kuis</span>
              <span className="text-base font-bold leading-tight text-sand-900 dark:text-sand-200">
                94,8%
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedModule() {
  return (
    <section
      aria-labelledby="modul-aktif"
      className="relative overflow-hidden rounded-2xl bg-emerald-950 text-sand-50 shadow-md"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-24 size-96 rounded-full bg-emerald-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-12 size-72 rounded-full bg-sand-300/10 blur-2xl"
      />

      <div className="relative z-10 grid grid-cols-1 items-center gap-7 p-5 sm:p-7 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-950">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-950" />
              Sedang Berjalan
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-medium text-sand-100">
              Nahwu Dasar • Tingkat Mutawassith
            </span>
            <span className="rounded-full bg-sand-300/20 px-2.5 py-1 text-[10px] font-semibold text-sand-200">
              Fushah Al-Mu&apos;ashirah
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <p
              lang="ar"
              dir="rtl"
              className="text-right font-arabic text-2xl font-bold leading-loose text-sand-200 sm:text-3xl"
            >
              المَفْعُولُ بِهِ وَعَلَامَاتُ إِعْرَابِهِ
            </p>
            <h2
              id="modul-aktif"
              className="text-balance text-xl font-bold leading-snug sm:text-2xl"
            >
              Bab 4: Al-Maf&apos;ul Bih wa &apos;Alamaat I&apos;raabih
            </h2>
            <p className="max-w-xl text-[13px] leading-6 text-emerald-100/80">
              Memahami kedudukan objek dalam susunan kalimat verbal (Jumlah
              Fi&apos;liyyah), tanda harakat nashob (fathah, ya&apos;, kasrah
              jamak muannats), serta muttashil dhomir maf&apos;ul.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
            <div className="flex items-center gap-2.5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sand-300 text-[11px] font-bold text-emerald-950 ring-2 ring-emerald-500/60">
                ML
              </span>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.12em] text-emerald-100/70">
                  Pengampu Modul
                </span>
                <span className="text-[12px] font-semibold text-white">
                  Tim Musyrif Lughati
                </span>
              </div>
            </div>

            <span
              aria-hidden="true"
              className="hidden h-8 w-px bg-white/15 sm:block"
            />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-medium text-sand-50">
              <span className="flex items-center gap-1.5">
                <IconPlay className="size-4 text-emerald-300" />
                18 Menit
              </span>
              <span className="flex items-center gap-1.5">
                <IconClipboard className="size-4 text-sand-300" />1 Kuis Cek
              </span>
              <span className="flex items-center gap-1.5">
                <IconBook className="size-4 text-emerald-300" />
                Diktat 14 Hal
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex items-center justify-between gap-2 text-[10px] text-emerald-100/80">
              <span>Progres Bab: 3 dari 5 sub-bab terselesaikan</span>
              <span className="font-bold text-white">60%</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sand-300 to-emerald-400"
                style={{ width: "60%" }}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <MaterialsActionButton
              action={{ kind: "feature-video" }}
              title="Buka pratinjau video kuliah Bab 4"
              className="inline-flex items-center gap-2 rounded-xl bg-sand-300 px-4 py-2.5 text-[12px] font-bold text-emerald-950 shadow-sm transition-colors hover:bg-sand-200"
            >
              <IconPlay className="size-4" />
              Lanjutkan Menonton (Menit 08:42)
            </MaterialsActionButton>
            <MaterialsActionButton
              action={{ kind: "feature-pdf" }}
              savedKey="Rangkuman Bab 4 — Al-Maf'ul Bih"
              savedChildren={
                <>
                  <IconDownload className="size-4" />
                  Tersimpan (Pratinjau)
                </>
              }
              title="Buka pratinjau rangkuman PDF"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3.5 py-2.5 text-[12px] font-medium text-sand-50 backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <IconDownload className="size-4" />
              Unduh Rangkuman PDF
            </MaterialsActionButton>
            <MaterialsActionButton
              action={{ kind: "feature-syllabus" }}
              savedKey="Silabus Bab 4 — Al-Maf'ul Bih"
              savedChildren={
                <>
                  <IconClipboard className="size-4" />
                  Tersimpan (Pratinjau)
                </>
              }
              title="Buka pratinjau silabus Bab 4"
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-3.5 py-2.5 text-[12px] font-medium text-sand-100 transition-colors hover:bg-white/15"
            >
              <IconClipboard className="size-4" />
              Silabus Bab
            </MaterialsActionButton>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-800 via-emerald-950 to-emerald-900 shadow-xl ring-1 ring-white/10 sm:h-72 lg:h-80">
            <div
              aria-hidden="true"
              className="absolute -right-10 -top-14 size-48 rounded-full border border-sand-300/15"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-16 -left-8 size-44 rounded-full border border-sand-300/10"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 grid place-items-center font-arabic text-3xl font-bold text-sand-100/15"
              lang="ar"
              dir="rtl"
            >
              المَفْعُولُ بِهِ
            </span>

            <div className="absolute left-3 top-3 flex items-center gap-2 rounded-xl bg-emerald-950/80 px-3 py-1.5 backdrop-blur-md">
              <span className="size-2 rounded-full bg-sand-300" />
              <span className="text-[10px] font-medium tracking-wide text-sand-50">
                Video Kuliah HD
              </span>
            </div>
            <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-1 backdrop-blur-md">
              <IconWaveform className="size-3.5 text-sand-100" />
              <span className="text-[10px] text-sand-50">Audio Fushah</span>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <MaterialsActionButton
                action={{ kind: "feature-video" }}
                title="Putar pratinjau video kuliah Bab 4"
                className="grid size-16 place-items-center rounded-full bg-sand-300 text-emerald-950 shadow-xl transition-transform hover:scale-105 active:scale-95"
              >
                <IconPlay className="size-7" />
                <span className="sr-only">Putar pratinjau video kuliah</span>
              </MaterialsActionButton>
              <span className="rounded-full bg-emerald-950/80 px-3 py-1 text-[10px] font-medium text-sand-100">
                Sub-bab 4: Mu&apos;rab vs Mabni Maf&apos;ul
              </span>
            </div>

            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 text-[10px] text-sand-100/80">
              <span>08:42</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
                <div className="h-full w-[48%] rounded-full bg-sand-300" />
              </div>
              <span>18:15</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MaterialsSidebar() {
  return (
    <>
      <div className={cn(card, "flex flex-col gap-4 p-4 sm:p-5")}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
              <IconBook className="size-4" />
            </span>
            <div className="flex flex-col">
              <h2 className="text-[13px] font-bold text-ink">
                Diktat &amp; Kitab Digital
              </h2>
              <span className="text-[10px] text-muted">
                Berkas contoh untuk santri
              </span>
            </div>
          </div>
          <span className="rounded bg-paper px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-muted">
            Contoh
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {diktat.map((item) => (
            <div
              key={item.title}
              className="group flex items-center justify-between gap-3 rounded-xl bg-paper p-2.5 transition-colors hover:bg-line/30"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className={cn(
                    "flex h-12 w-10 shrink-0 flex-col items-center justify-center rounded-lg",
                    item.tone,
                  )}
                >
                  <span className="text-[9px] font-bold tracking-tight">
                    PDF
                  </span>
                  <IconDownload className={cn("size-3.5", item.accent)} />
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-[11px] font-semibold text-ink transition-colors group-hover:text-brand">
                    {item.title}
                  </span>
                  <span className="truncate text-[9px] text-muted">
                    {item.meta}
                  </span>
                </div>
              </div>
              <MaterialsActionButton
                action={{ kind: "diktat", title: item.title, meta: item.meta }}
                savedKey={item.title}
                savedChildren={
                  <>
                    <IconCheck className="size-4 text-brand" />
                    <span className="sr-only">
                      {item.title} tersimpan (Pratinjau)
                    </span>
                  </>
                }
                title={`Lihat pratinjau ${item.title}`}
                className="grid size-8 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-brand"
              >
                <IconDownload className="size-4" />
                <span className="sr-only">Unduh {item.title}</span>
              </MaterialsActionButton>
            </div>
          ))}
        </div>
      </div>

      <div className={cn(card, "flex flex-col gap-4 p-4 sm:p-5")}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-sand-200/70 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
              <IconWaveform className="size-4" />
            </span>
            <div className="flex flex-col">
              <h2 className="text-[13px] font-bold text-ink">
                Audio Hafalan Matan MP3
              </h2>
              <span className="text-[10px] text-muted">
                Pelafalan berirama tartil
              </span>
            </div>
          </div>
          <span className="rounded bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
            Pratinjau
          </span>
        </div>

        <MatanAudioPlayer />

        <p className="text-[10px] leading-4 text-muted">
          Pemutar ini hanya demo antarmuka — rekaman audio belum direkam.
        </p>
      </div>

      <div
        className={cn(
          card,
          "relative overflow-hidden bg-emerald-50/80 p-4 dark:bg-emerald-950/40 sm:p-5",
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-600" />
            Live Pekan Ini
          </span>
          <span className="text-[10px] text-muted">Sabtu, 20.00 WIB</span>
        </div>

        <div className="mt-3 flex flex-col gap-1">
          <h2 className="text-[14px] font-bold leading-snug text-ink">
            Halaqah Tanya Jawab Nahwu &amp; Bedah Soal Ujian
          </h2>
          <p className="text-[11px] leading-5 text-muted">
            Sesi daring interaktif bersama Tim Musyrif Lughati. Ajukan
            pertanyaan sebelum sesi dimulai.
          </p>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <MaterialsActionButton
            action={{ kind: "halaqah-question" }}
            savedKey="halaqah-question"
            savedChildren="Pertanyaan Ditulis (Pratinjau)"
            title="Tulis pertanyaan untuk musyrif"
            className="flex-1 rounded-xl bg-emerald-950 px-3 py-2.5 text-center text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          >
            Daftar Pertanyaan Santri
          </MaterialsActionButton>
          <MaterialsActionButton
            action={{ kind: "halaqah-calendar" }}
            savedKey="halaqah-calendar"
            savedChildren={<IconCheck className="size-4 text-brand" />}
            title="Pratinjau tambah ke kalender"
            className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-muted shadow-sm transition-colors hover:text-ink"
          >
            <IconCalendar className="size-4" />
            <span className="sr-only">Tambah ke kalender</span>
          </MaterialsActionButton>
        </div>
      </div>
    </>
  );
}

export function MaterialsLibrary() {
  return (
    <MaterialsActionsProvider>
      <div
        id="materi"
        className="mx-auto flex w-full max-w-[1400px] flex-col gap-5 sm:gap-6"
      >
        <MaterialsHeader />
        <FeaturedModule />

        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-12">
          <div className="xl:col-span-8">
            <ModuleCatalog />
          </div>
          <aside
            aria-label="Sumber daya pendukung"
            className="flex flex-col gap-4 xl:col-span-4 xl:sticky xl:top-24"
          >
            <MaterialsSidebar />
          </aside>
        </div>
      </div>
    </MaterialsActionsProvider>
  );
}
