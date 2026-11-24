import { FaqAccordion } from "@/components/faq-accordion";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconBook,
  IconChart,
  IconChat,
  IconCheck,
  IconClock,
  IconGlobe,
  IconGraduation,
  IconLayers,
  IconLock,
  IconMic,
  IconPlay,
  IconShield,
  IconSparkles,
  IconStar,
  IconTarget,
  IconUsers,
  IconZap,
} from "@/components/icons";
import { LessonShowcase } from "@/components/lesson-showcase";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TrackPreview } from "@/components/track-preview";
import { Container, SectionBadge, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  heroStats,
  phrasePairs,
  tracks,
  weeks,
} from "@/lib/curriculum";

const marqueePhrases = [
  { ar: "السَّلَامُ عَلَيْكُمْ", id: "Semoga keselamatan atasmu" },
  { ar: "أَهْلًا وَسَهْلًا", id: "Selamat datang" },
  { ar: "كَيْفَ حَالُكَ؟", id: "Bagaimana kabarmu?" },
  { ar: "شُكْرًا جَزِيلًا", id: "Terima kasih banyak" },
  { ar: "يَعْطِيكَ الْعَافِيَة", id: "Semoga sehat selalu" },
  { ar: "مَعَ السَّلَامَة", id: "Selamat jalan" },
  { ar: "بِالتَّوْفِيق", id: "Semoga sukses" },
];

const featureNotes = [
  "Pratinjau interaktif dengan data kurikulum asli",
  "Kuis dinilai langsung, bukan sekadar dibaca",
  "Transliterasi Latin di setiap kosakata",
  "Bisa dipakai tanpa mikrofon",
];

const steps = [
  {
    n: "01",
    title: "Pilih titik mulai",
    body: "Mulai dari Fushah untuk fondasi baku, atau Amiyah Saudi untuk percakapan. Banyak pembelajar memakai keduanya secara bergantian.",
    meta: "Dua jalur bisa berjalan bersama",
  },
  {
    n: "02",
    title: "Ikuti satu tema per minggu",
    body: "Setiap minggu berisi satu materi, satu dialog, kosakata bertransliterasi, dan satu kuis. Tema minggu 1–12 sama di kedua jalur.",
    meta: "±20 menit per pertemuan",
  },
  {
    n: "03",
    title: "Latih, ulangi, lanjut",
    body: "Kuis dan latihan menandai kata yang perlu diulang. Progres tersimpan per pelajaran, jadi Anda bisa berhenti dan melanjutkan kapan saja.",
    meta: "Pengulangan terjadwal",
  },
] as const;

export default function Home() {
  return (
    <div id="atas" className="flex min-h-dvh flex-col">
      <a
        href="#konten"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-emerald-800 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Lompat ke konten
      </a>

      <SiteHeader />

      <main id="konten" className="flex-1">
        {/* ---------------------------------------------------------------- Hero */}
        <section className="relative overflow-hidden pt-12 sm:pt-16 lg:pt-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="bg-grid absolute inset-0 opacity-80" />
            <div className="absolute -top-32 left-1/2 h-[440px] w-[780px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="absolute -right-24 top-40 size-72 rounded-full bg-sand-300/20 blur-3xl" />
            <div className="absolute -left-24 bottom-0 size-64 rounded-full bg-emerald-600/10 blur-3xl" />
          </div>

          <Container className="grid items-center gap-12 pb-14 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12 lg:pb-20">
            <div className="animate-fade-up">
              <SectionBadge>
                <span className="animate-pulse-dot size-1.5 rounded-full bg-emerald-600 dark:bg-emerald-300" />
                Kurikulum 12 minggu · Fushah &amp; Amiyah Saudi
              </SectionBadge>

              <h1 className="mt-6 text-balance text-[2.55rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.1rem]">
                Bahasa Arab untuk{" "}
                <span className="text-gradient">ngobrol</span> di Riyadh dan{" "}
                <span className="text-gradient">membaca</span> teks resmi.
              </h1>

              <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-muted sm:text-lg sm:leading-8">
                Lughati menyatukan bahasa Arab baku (Fushah) dan percakapan
                Saudi (Amiyah Najdi) dalam alur yang sama: dialog, kosakata
                bertransliterasi, kuis, dan latihan pelafalan.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#daftar"
                  className="group inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/20 transition-colors hover:bg-emerald-700"
                >
                  Mulai belajar gratis
                  <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#pratinjau"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-5 py-3 text-sm font-semibold text-ink backdrop-blur transition-colors hover:border-emerald-600/40 hover:bg-surface"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                    <IconPlay className="size-2.5" />
                  </span>
                  Lihat pratinjau pelajaran
                </a>
              </div>

              <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted">
                <li className="inline-flex items-center gap-1.5">
                  <IconCheck className="size-3.5 text-emerald-700 dark:text-emerald-300" />
                  Minggu 1–2 gratis
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <IconCheck className="size-3.5 text-emerald-700 dark:text-emerald-300" />
                  Tanpa kartu kredit
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <IconCheck className="size-3.5 text-emerald-700 dark:text-emerald-300" />
                  Bahasa pengantar Indonesia
                </li>
              </ul>

              <dl className="mt-9 grid max-w-lg grid-cols-3 gap-4 border-t border-line/80 pt-6">
                {heroStats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block text-2xl font-semibold tracking-tight sm:text-3xl">
                        {stat.value}
                      </span>
                      <span className="mt-0.5 block text-[11px] font-medium leading-tight text-muted sm:text-xs">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="animate-fade-up lg:pl-2" style={{ animationDelay: "120ms" }}>
              <TrackPreview />
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------- Marquee */}
        <div className="relative overflow-hidden border-y border-line/70 bg-surface/50 py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-paper to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-paper to-transparent" />
          <div
            aria-hidden="true"
            className="animate-marquee flex w-max items-center gap-10 hover:[animation-play-state:paused]"
          >
            {[...marqueePhrases, ...marqueePhrases].map((phrase, index) => (
              <span key={index} className="inline-flex items-center gap-3">
                <IconStar className="size-3 text-sand-500/70 dark:text-sand-300/60" />
                <span className="font-arabic text-lg text-ink/80" lang="ar" dir="rtl">
                  {phrase.ar}
                </span>
                <span className="text-[11px] font-medium text-muted">{phrase.id}</span>
              </span>
            ))}
          </div>
        </div>

        {/* --------------------------------------------------------------- Ragam */}
        <section id="ragam" className="scroll-mt-24 py-20 sm:py-28">
          <Container>
            <SectionHeading
              eyebrow="Dua jalur, satu tema"
              title={
                <>
                  Fushah dan Amiyah dilatih terpisah,{" "}
                  <span className="text-gradient">tanpa saling meniadakan.</span>
                </>
              }
              description="Keduanya bukan versi benar-salah dari bahasa yang sama. Fushah membuka pintu teks formal; Amiyah membuka pintu percakapan nyata di Arab Saudi. Di Lughati, Anda berlatih keduanya dengan sadar perbedaannya."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {(["fushah", "amiyah"] as const).map((id) => {
                const track = tracks[id];
                const isFushah = id === "fushah";
                return (
                  <article
                    key={id}
                    className={cn(
                      "relative overflow-hidden rounded-3xl border p-6 sm:p-7",
                      isFushah
                        ? "border-emerald-900/15 bg-gradient-to-br from-emerald-50/80 to-surface dark:border-emerald-300/15 dark:from-emerald-950/50"
                        : "border-sand-500/25 bg-gradient-to-br from-sand-50/90 to-surface dark:border-sand-300/15 dark:from-sand-900/20",
                    )}
                  >
                    <div
                      aria-hidden="true"
                      className={cn(
                        "absolute -right-10 -top-12 size-40 rounded-full blur-2xl",
                        isFushah ? "bg-emerald-400/20" : "bg-sand-400/25",
                      )}
                    />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p
                          className="font-arabic text-3xl leading-relaxed"
                          lang="ar"
                          dir="rtl"
                        >
                          {track.arabic}
                        </p>
                        <h3 className="mt-1 text-xl font-semibold tracking-tight">
                          {track.name}
                        </h3>
                      </div>
                      <span className="rounded-full border border-line/80 bg-surface/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">
                        {track.label}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-medium text-ink/80">
                      {track.tagline}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {track.description}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2">
                      {track.points.map((point) => (
                        <li
                          key={point}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line/80 bg-surface/70 px-2.5 py-1 text-[11px] font-medium text-ink/80"
                        >
                          <IconCheck
                            className={cn(
                              "size-3",
                              isFushah
                                ? "text-emerald-700 dark:text-emerald-300"
                                : "text-sand-600 dark:text-sand-300",
                            )}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            <div className="mt-4 overflow-hidden rounded-3xl border border-line/80 bg-surface/70">
              <div className="hidden gap-4 border-b border-line/70 bg-paper/60 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-muted sm:grid sm:grid-cols-[0.85fr_1fr_1fr]">
                <span>Maksud</span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald-600 dark:bg-emerald-300" />
                  Fushah
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-sand-500 dark:bg-sand-300" />
                  Amiyah Saudi (Najdi)
                </span>
              </div>

              <div className="divide-y divide-line/70">
                {phrasePairs.map((pair) => (
                  <div
                    key={pair.meaning}
                    className="grid gap-4 px-5 py-5 sm:grid-cols-[0.85fr_1fr_1fr] sm:items-center"
                  >
                    <p className="text-sm font-semibold leading-6">{pair.meaning}</p>

                    <div className="border-l-2 border-emerald-600/30 pl-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-emerald-800/70 dark:text-emerald-200/70 sm:hidden">
                        Fushah
                      </span>
                      <p
                        className="font-arabic text-right text-xl leading-[1.9] sm:text-lg"
                        lang="ar"
                        dir="rtl"
                      >
                        {pair.fushah.ar}
                      </p>
                      <p className="mt-0.5 text-right text-[11px] text-emerald-800/80 dark:text-emerald-200/70">
                        {pair.fushah.translit}
                      </p>
                    </div>

                    <div className="border-l-2 border-sand-500/40 pl-3">
                      <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-sand-700/80 dark:text-sand-200/70 sm:hidden">
                        Amiyah Saudi
                      </span>
                      <p
                        className="font-arabic text-right text-xl leading-[1.9] sm:text-lg"
                        lang="ar"
                        dir="rtl"
                      >
                        {pair.amiyah.ar}
                      </p>
                      <p className="mt-0.5 text-right text-[11px] text-sand-700/90 dark:text-sand-200/70">
                        {pair.amiyah.translit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-muted">
              Contoh diambil dari kurikulum Minggu 1. Penulisan Arab Fushah memakai
              harakat penuh; Amiyah ditulis mengikuti kebiasaan penutur Najdi.
            </p>
          </Container>
        </section>

        {/* ----------------------------------------------------------- Kurikulum */}
        <section
          id="kurikulum"
          className="scroll-mt-24 border-y border-line/70 bg-surface/40 py-20 sm:py-28"
        >
          <Container>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <SectionHeading
                eyebrow="Peta 12 minggu"
                title={
                  <>
                    Tema yang sama,{" "}
                    <span className="text-gradient">dua cara mengatakannya.</span>
                  </>
                }
                description="Setiap minggu punya satu situasi, satu dialog, dan satu kuis. Pelajari situasinya dalam Fushah, lalu bandingkan dengan Amiyah Saudi di minggu yang sama."
              />

              <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-700 px-2.5 py-1 text-white">
                  <IconStar className="size-3" />
                  Gratis · minggu 1–2
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-2.5 py-1 text-muted">
                  <IconLock className="size-3" />
                  Premium · minggu 3–12
                </span>
              </div>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {weeks.map((week) => {
                const free = week.access === "free";
                return (
                  <article
                    key={week.n}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border p-5 transition-colors",
                      free
                        ? "border-emerald-700/25 bg-emerald-50/40 dark:border-emerald-300/20 dark:bg-emerald-950/30"
                        : "border-line/80 bg-surface/70 hover:border-emerald-600/30 hover:bg-surface",
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] font-semibold tracking-wider text-muted">
                        MINGGU {String(week.n).padStart(2, "0")}
                      </span>
                      {free ? (
                        <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                          Gratis
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-line bg-paper/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-muted">
                          <IconLock className="size-2.5" />
                          Premium
                        </span>
                      )}
                    </div>

                    <p
                      className="font-arabic mt-3 text-right text-xl leading-[1.9]"
                      lang="ar"
                      dir="rtl"
                    >
                      {week.ar}
                    </p>
                    <h3 className="mt-1 text-base font-semibold tracking-tight">
                      {week.title}
                    </h3>
                    <p className="mt-1 text-xs leading-6 text-muted">{week.focus}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-line/60 pt-3 text-[10px] font-medium text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <IconBook className="size-3" />
                        1 materi · 1 dialog
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <IconChat className="size-3" />
                        {free ? "terbuka" : "terkunci"}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line/80 bg-surface/70 px-5 py-4 sm:flex-row sm:items-center">
              <p className="flex items-start gap-3 text-xs leading-6 text-muted">
                <IconShield className="mt-0.5 size-4 shrink-0 text-emerald-700 dark:text-emerald-300" />
                Aktivasi premium dilakukan lewat pengajuan permintaan dan
                konfirmasi admin — tanpa gateway pembayaran otomatis.
              </p>
              <a
                href="#pratinjau"
                className="group inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold text-emerald-800 transition-colors hover:text-emerald-700 dark:text-emerald-200"
              >
                Lihat isi pelajaran
                <IconArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Container>
        </section>

        {/* ------------------------------------------------------------ Pratinjau */}
        <section id="pratinjau" className="scroll-mt-24 py-20 sm:py-28">
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-14">
              <div className="lg:sticky lg:top-28">
                <SectionHeading
                  eyebrow="Pratinjau pelajaran"
                  title={
                    <>
                      Lihat isi minggu pertama{" "}
                      <span className="text-gradient">sebelum mulai.</span>
                    </>
                  }
                  description="Empat tab di samping memakai data kurikulum asli Minggu 1 — bukan contoh karangan. Ganti tab dan coba jawab kuisnya langsung."
                />

                <ul className="mt-6 space-y-3">
                  {featureNotes.map((note) => (
                    <li key={note} className="flex items-start gap-2.5 text-sm text-ink/80">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                        <IconCheck className="size-3" />
                      </span>
                      {note}
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="#daftar"
                    className="group inline-flex items-center gap-2 rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
                  >
                    Coba minggu 1 gratis
                    <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                    <IconClock className="size-3.5" />
                    ±20 menit
                  </span>
                </div>

                <div className="mt-8 rounded-2xl border border-line/80 bg-surface/60 p-4">
                  <p className="flex items-start gap-2.5 text-xs leading-6 text-muted">
                    <IconSparkles className="mt-0.5 size-4 shrink-0 text-sand-600 dark:text-sand-300" />
                    <span>
                      <strong className="font-semibold text-ink">Catatan jujur:</strong>{" "}
                      aset audio masih dalam produksi, jadi tombol audio menampilkan
                      status &ldquo;segera&rdquo;. Tidak ada rekaman pengganti yang
                      dipaksakan.
                    </span>
                  </p>
                </div>
              </div>

              <LessonShowcase />
            </div>
          </Container>
        </section>

        {/* --------------------------------------------------------------- Fitur */}
        <section
          id="fitur"
          className="scroll-mt-24 border-y border-line/70 bg-surface/40 py-20 sm:py-28"
        >
          <Container>
            <SectionHeading
              align="center"
              eyebrow="Yang Anda dapat"
              title={
                <>
                  Belajar dengan alat yang{" "}
                  <span className="text-gradient">saling menguatkan.</span>
                </>
              }
              description="Bukan kumpulan fitur terpisah — setiap bagian mengarah ke satu tujuan: membuat Anda bisa memakai bahasa Arab dengan percaya diri."
            />

            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Dua jalur */}
              <article className="relative overflow-hidden rounded-3xl border border-line/80 bg-surface/80 p-6 md:col-span-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="max-w-md">
                    <span className="grid size-10 place-items-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                      <IconLayers className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight">
                      Dua jalur, satu progres
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      Progres Fushah dan Amiyah disimpan terpisah per pelajaran,
                      tetapi tetap dalam satu akun. Pindah jalur kapan pun tanpa
                      kehilangan catatan.
                    </p>
                  </div>
                  <IconGlobe className="hidden size-16 text-emerald-900/10 dark:text-emerald-100/10 sm:block" />
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-700/20 bg-emerald-50/60 p-3 dark:border-emerald-300/15 dark:bg-emerald-950/40">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-900/70 dark:text-emerald-100/70">
                      <span>Fushah</span>
                      <span>4/12</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-900/10 dark:bg-emerald-100/10">
                      <div className="h-full w-1/3 rounded-full bg-emerald-600 dark:bg-emerald-300" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-sand-500/25 bg-sand-50/70 p-3 dark:border-sand-300/15 dark:bg-sand-900/20">
                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.12em] text-sand-800/80 dark:text-sand-100/70">
                      <span>Amiyah Saudi</span>
                      <span>6/12</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand-900/10 dark:bg-sand-100/10">
                      <div className="h-full w-1/2 rounded-full bg-sand-500 dark:bg-sand-300" />
                    </div>
                  </div>
                </div>
              </article>

              {/* Kuis */}
              <article className="rounded-3xl border border-line/80 bg-surface/80 p-6">
                <span className="grid size-10 place-items-center rounded-2xl bg-sand-100 text-sand-700 dark:bg-sand-900/40 dark:text-sand-200">
                  <IconTarget className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  Kuis bergaya ujian
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Pilihan ganda, mencocokkan, dan isian singkat. Kunci jawaban
                  tidak pernah dikirim ke browser sebelum Anda menjawab.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Pilihan ganda", "Matching", "Fill-in"].map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-paper/60 px-2.5 py-1 text-[10px] font-semibold text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>

              {/* Kosakata */}
              <article className="rounded-3xl border border-line/80 bg-surface/80 p-6">
                <span className="grid size-10 place-items-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                  <IconSparkles className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  Kartu kosakata &amp; dialog
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Setiap kata disertai transliterasi dan contoh kalimat. Dialog
                  pendek menempatkan kata itu dalam percakapan nyata.
                </p>
                <div className="mt-4 rounded-xl border border-line/70 bg-paper/60 p-3">
                  <p
                    className="font-arabic text-right text-lg leading-relaxed"
                    lang="ar"
                    dir="rtl"
                  >
                    مِنْ وِينْ أَنْتَ؟
                  </p>
                  <p className="mt-1 text-[11px] text-emerald-800/80 dark:text-emerald-200/70">
                    min wēn inta? · dari mana kamu?
                  </p>
                </div>
              </article>

              {/* Pelafalan */}
              <article className="rounded-3xl border border-line/80 bg-surface/80 p-6">
                <span className="grid size-10 place-items-center rounded-2xl bg-sand-100 text-sand-700 dark:bg-sand-900/40 dark:text-sand-200">
                  <IconMic className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  Latihan pelafalan
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Ucapkan kosakata atau baris dialog, lalu lihat kata mana yang
                  tepat, mendekati, atau terlewat.
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="flex h-8 items-end gap-1" aria-hidden="true">
                    {[10, 22, 16, 28, 12, 24, 18, 9, 26, 15, 21, 11].map(
                      (height, index) => (
                        <span
                          key={index}
                          className="w-1 rounded-full bg-emerald-600/60 dark:bg-emerald-300/60"
                          style={{ height: `${height}px` }}
                        />
                      ),
                    )}
                  </span>
                  <span className="text-[10px] font-semibold text-muted">
                    Chrome · Edge
                  </span>
                </div>
              </article>

              {/* Progres */}
              <article className="rounded-3xl border border-line/80 bg-surface/80 p-6">
                <span className="grid size-10 place-items-center rounded-2xl bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                  <IconChart className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  Progres &amp; pengulangan
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Lihat penyelesaian per minggu dan skor latihan. Kata yang sering
                  salah akan muncul lagi di sesi berikutnya.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "inline-flex size-5 items-center justify-center rounded-md text-[9px] font-bold",
                        index < 3
                          ? "bg-emerald-700 text-white"
                          : "bg-line/60 text-muted",
                      )}
                    >
                      {index + 1}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </Container>
        </section>

        {/* ---------------------------------------------------------- Cara belajar */}
        <section id="cara-belajar" className="scroll-mt-24 py-20 sm:py-28">
          <Container>
            <SectionHeading
              align="center"
              eyebrow="Cara belajar"
              title={
                <>
                  Tiga langkah,{" "}
                  <span className="text-gradient">satu ritme yang tenang.</span>
                </>
              }
              description="Tidak perlu menyelesaikan semuanya sekaligus. Satu tema per minggu sudah cukup untuk membangun kebiasaan."
            />

            <ol className="relative mt-12 grid gap-4 md:grid-cols-3">
              <span
                aria-hidden="true"
                className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block"
              />
              {steps.map((step) => (
                <li
                  key={step.n}
                  className="relative rounded-3xl border border-line/80 bg-surface/70 p-6"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-full border border-line bg-paper font-mono text-xs font-bold text-emerald-800 dark:text-emerald-200">
                      {step.n}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {step.meta}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{step.body}</p>
                </li>
              ))}
            </ol>

            <div className="mt-6 grid gap-4 rounded-3xl border border-line/80 bg-surface/60 p-6 sm:grid-cols-3">
              {[
                {
                  icon: IconGraduation,
                  title: "Level Beginner",
                  body: "12 minggu, 4 keterampilan dasar",
                },
                {
                  icon: IconUsers,
                  title: "Untuk pembelajar Indonesia",
                  body: "Penjelasan bahasa Indonesia",
                },
                {
                  icon: IconZap,
                  title: "Mulai tanpa instalasi",
                  body: "Buka di browser, langsung belajar",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="mt-0.5 text-xs leading-5 text-muted">{item.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ----------------------------------------------------------------- FAQ */}
        <section
          id="faq"
          className="scroll-mt-24 border-y border-line/70 bg-surface/40 py-20 sm:py-28"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <SectionHeading
                  eyebrow="FAQ"
                  title={
                    <>
                      Pertanyaan yang{" "}
                      <span className="text-gradient">sering muncul.</span>
                    </>
                  }
                  description="Belum menemukan jawaban? Halaman ini akan diperbarui saat pendaftaran akun dibuka."
                />
                <div className="mt-6 rounded-2xl border border-line/80 bg-surface/70 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-ink">
                    <IconShield className="size-4 text-emerald-700 dark:text-emerald-300" />
                    Transparansi konten
                  </div>
                  <p className="mt-2 text-xs leading-6 text-muted">
                    Kurikulum lengkap 12 minggu berstatus <em>review</em> bahasa.
                    Audio masih diproduksi. Kami tidak menandai konten sebagai
                    final sebelum gate kualitas terlewati.
                  </p>
                </div>
              </div>

              <FaqAccordion />
            </div>
          </Container>
        </section>

        {/* ---------------------------------------------------------------- CTA */}
        <section id="daftar" className="scroll-mt-24 py-20 sm:py-28">
          <Container>
            <div className="relative overflow-hidden rounded-[32px] border border-emerald-950/40 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 px-6 py-12 text-center shadow-2xl shadow-emerald-950/20 sm:px-12 sm:py-16">
              <div
                aria-hidden="true"
                className="bg-dots absolute inset-0 opacity-[0.12]"
              />
              <div
                aria-hidden="true"
                className="absolute -left-16 -top-16 size-64 rounded-full bg-sand-300/20 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -right-10 size-72 rounded-full bg-emerald-400/20 blur-3xl"
              />

              <div className="relative mx-auto max-w-2xl">
                <p
                  className="font-arabic text-2xl text-sand-200/90 sm:text-3xl"
                  lang="ar"
                  dir="rtl"
                >
                  اِبْدَأْ رِحْلَتَكَ
                </p>
                <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
                  Mulai dari satu sapaan hari ini.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-7 text-emerald-50/75 sm:text-base">
                  Minggu 1–2 terbuka gratis di jalur Fushah maupun Amiyah Saudi.
                  Tidak perlu kartu kredit — cukup rasa ingin tahu.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href="#pratinjau"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sand-100 px-6 py-3.5 text-sm font-semibold text-emerald-950 shadow-lg shadow-black/20 transition-colors hover:bg-white sm:w-auto"
                  >
                    Coba pratinjau gratis
                    <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href="#kurikulum"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/50 hover:bg-white/5 sm:w-auto"
                  >
                    Lihat kurikulum lengkap
                  </a>
                </div>

                <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.14em] text-emerald-100/50">
                  Tanpa kartu kredit · progres tersimpan · bisa ganti jalur
                </p>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
