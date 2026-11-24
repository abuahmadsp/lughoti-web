import { cn } from "@/lib/cn";
import {
  IconAlert,
  IconBadgeCheck,
  IconChart,
  IconCloudDownload,
  IconCompare,
  IconDownload,
  IconGauge,
  IconInfo,
  IconMic,
  IconServer,
  IconTrendingUp,
  IconTune,
  IconWaveform,
} from "./icons";
import {
  ModelDialectRows,
  ModelPipelineSelect,
  ModelText,
  ModelVersionBadge,
  TalaqqiModelProvider,
  type DemoDialect,
} from "./talaqqi-model-flow";
import {
  DemoActionButton,
  DemoSelect,
  TalaqqiAnalyticsWorkspace,
} from "./talaqqi-analytics-workspace";

const buttonClass =
  "inline-flex items-center gap-2 rounded-xl border border-line/70 bg-surface px-3.5 py-2.5 text-[11px] font-semibold text-ink shadow-sm transition-colors hover:bg-line/30";
const primaryButtonClass =
  "inline-flex items-center gap-2 rounded-xl bg-emerald-950 px-3.5 py-2.5 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800";

function TelemetryStrip() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line/70 bg-surface p-3 shadow-sm sm:p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="relative flex size-3">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex size-3 rounded-full bg-brand" />
          </span>
          <span className="text-[11px] font-bold text-ink">
            <ModelText slot="engine" />
          </span>
          <ModelVersionBadge />
          <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
            Data demo
          </span>
        </div>
        <div className="hidden items-center gap-4 border-l border-line/70 pl-3 lg:flex">
          <span className="inline-flex items-center gap-1.5 text-[10px] text-muted">
            <IconGauge className="size-4 text-brand" />
            Latensi:{" "}
            <span className="font-bold text-ink">
              <ModelText slot="latency" /> ms (Contoh)
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 text-[10px] text-muted">
            <IconBadgeCheck className="size-4 text-gold" />
            Akurasi Global:{" "}
            <span className="font-bold text-gold">
              <ModelText slot="accuracy" /> (Contoh)
            </span>
          </span>
        </div>
      </div>
      <ModelPipelineSelect />
    </section>
  );
}

function PageHeader() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-paper p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand">
            <IconWaveform className="size-5" />
            <span>Speech Recognition &amp; Phonetic Intelligence</span>
            <span className="text-muted">•</span>
            <span lang="ar" dir="rtl" className="font-arabic text-[13px] normal-case">
              تحليلات التلقي الصوتي
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-[24px] font-bold tracking-tight text-ink sm:text-[30px]">
              AI Talaqqi Speech Analytics &amp; Monitoring
            </h1>
            <span className="rounded-full border border-line/70 bg-surface px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              Data demo
            </span>
          </div>
          <p className="max-w-4xl text-[12px] leading-5 text-muted">
            Monitoring ilustratif pemrosesan fonetik Talaqqi, analisis artikulasi
            makharijul huruf, komparasi deviasi dialek Fushah dan Amiyah Saudi,
            serta audit rekalibrasi model. Seluruh angka, santri, dan status di
            halaman ini adalah contoh; tidak ada microphone, audio, atau pipeline
            ASR sungguhan yang dijalankan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DemoSelect
            ariaLabel="Pilih periode laporan demo"
            options={[
              "7 Hari Terakhir",
              "Bulan Ini (Juni 2025)",
              "Kuartal Berjalan",
              "Rentang Kustom",
            ]}
            notice='Pratinjau — periode "{value}" hanya mengubah tampilan contoh.'
          />
          <DemoActionButton
            className={buttonClass}
            notice="Pratinjau — Ekspor Laporan (CSV/PDF) tidak menghasilkan berkas."
            title="Pratinjau — ekspor laporan hanya simulasi demo"
          >
            <IconDownload className="size-4 text-brand" />
            Ekspor Laporan (CSV/PDF)
          </DemoActionButton>
          <DemoActionButton
            className={primaryButtonClass}
            notice="Pratinjau — Jalankan Rekalibrasi AI tidak melatih atau mengubah model apa pun."
            title="Pratinjau — rekalibrasi hanya simulasi demo"
          >
            <IconTune className="size-4" />
            Jalankan Rekalibrasi AI
          </DemoActionButton>
        </div>
      </div>
    </section>
  );
}

function MetricCards() {
  return (
    <section
      aria-label="Ringkasan metrik analitik Talaqqi"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              Total Sesi Talaqqi
            </span>
            <span className="text-[26px] font-bold leading-none text-ink">
              <ModelText slot="sessions" />
            </span>
          </div>
          <span className="grid size-10 place-items-center rounded-lg bg-paper text-brand">
            <IconMic className="size-5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3 text-[10px]">
          <span className="inline-flex items-center gap-1 font-bold text-brand">
            <IconTrendingUp className="size-3.5" />
            <ModelText slot="sessionsDelta" />
          </span>
          <span className="text-muted">
            vs pekan lalu (<ModelText slot="sessionsPrev" />) • Contoh
          </span>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              Akurasi Fonetik Global
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-bold leading-none text-brand">
                <ModelText slot="accuracy" />
              </span>
              <span className="text-[10px] text-muted">/ Target ≥ 92%</span>
            </div>
          </div>
          <span className="grid size-10 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40 dark:text-emerald-200">
            <IconBadgeCheck className="size-5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3 text-[10px]">
          <span className="rounded bg-emerald-100 px-1.5 py-0.5 font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Status: <ModelText slot="accuracyStatus" />
          </span>
          <span className="text-muted">
            <ModelText slot="accuracyNote" />
          </span>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              Deviasi Makhraj Tertinggi
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-bold leading-none text-gold">
                <ModelText slot="makhraj" />
              </span>
              <span className="text-[10px] text-muted">kesalahan</span>
            </div>
          </div>
          <span className="grid size-10 place-items-center rounded-lg bg-sand-100 text-gold dark:bg-sand-300/20 dark:text-sand-200">
            <IconAlert className="size-5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3 text-[10px]">
          <span className="flex items-center gap-1.5 font-semibold text-ink">
            <span lang="ar" dir="rtl" className="font-arabic text-[15px] text-gold">
              ع
            </span>
            (&apos;Ain) &amp;
            <span lang="ar" dir="rtl" className="font-arabic text-[15px] text-gold">
              ض
            </span>
            (Dhad)
          </span>
          <span className="font-bold text-red-600 dark:text-red-400">Butuh Latihan</span>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              Latensi Edge Inferensi
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-[26px] font-bold leading-none text-ink">
                <ModelText slot="latency" />
              </span>
              <span className="text-[10px] text-muted">ms per audio</span>
            </div>
          </div>
          <span className="grid size-10 place-items-center rounded-lg bg-paper text-brand">
            <IconGauge className="size-5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3 text-[10px]">
          <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
            <span className="size-2 rounded-full bg-brand animate-pulse-dot" />
            Cluster A100: <ModelText slot="clusterLoad" /> Load
          </span>
          <span className="text-muted">Jkt &amp; Ryd CDN (Contoh)</span>
        </div>
      </article>
    </section>
  );
}

type LetterTone = "good" | "gold" | "danger";

type Region = {
  title: string;
  arabic: string;
  badge: string;
  badgeTone: "good" | "gold";
  description: string;
  accuracy: string;
  accuracyTone: "good" | "gold";
  barTone: string;
  letters: { symbol: string; score: string; tone: LetterTone }[];
  sample: string;
  note: string;
};

const letterToneClass: Record<LetterTone, string> = {
  good: "text-brand",
  gold: "text-gold",
  danger: "text-red-600 dark:text-red-400",
};

const regions: Region[] = [
  {
    title: "Al-Halq (الحَلْق)",
    arabic: "الحَلْق",
    badge: "Koreksi Moderat",
    badgeTone: "gold",
    description: "Rongga Tenggorokan (6 Huruf)",
    accuracy: "89,2%",
    accuracyTone: "gold",
    barTone: "bg-gold",
    letters: [
      { symbol: "ء", score: "98%", tone: "good" },
      { symbol: "هـ", score: "95%", tone: "good" },
      { symbol: "ع", score: "78%", tone: "danger" },
      { symbol: "ح", score: "84%", tone: "gold" },
      { symbol: "غ", score: "91%", tone: "good" },
      { symbol: "خ", score: "89%", tone: "good" },
    ],
    sample: "Sample: 64.120 tes",
    note: "Deviasi utama: Huruf 'Ain & Ha'",
  },
  {
    title: "Al-Lisan (اللِّسَان)",
    arabic: "اللِّسَان",
    badge: "Sangat Baik",
    badgeTone: "good",
    description: "Pangkal s/d Ujung Lidah (18 Huruf)",
    accuracy: "95,1%",
    accuracyTone: "good",
    barTone: "bg-brand",
    letters: [
      { symbol: "ض", score: "81%", tone: "danger" },
      { symbol: "ط", score: "94%", tone: "good" },
      { symbol: "ص", score: "93%", tone: "good" },
      { symbol: "ظ", score: "88%", tone: "gold" },
      { symbol: "ق", score: "96%", tone: "good" },
      { symbol: "ر", score: "97%", tone: "good" },
      { symbol: "+12", score: "98%", tone: "good" },
    ],
    sample: "Sample: 178.210 tes",
    note: "Tafkhim & Ithbaq terkendali",
  },
  {
    title: "Asy-Syafatain (الشَّفَتَان)",
    arabic: "الشَّفَتَان",
    badge: "Mumtaz",
    badgeTone: "good",
    description: "Dua Bibir (ف, و, ب, م)",
    accuracy: "98,7%",
    accuracyTone: "good",
    barTone: "bg-brand",
    letters: [
      { symbol: "ف", score: "99%", tone: "good" },
      { symbol: "و", score: "98%", tone: "good" },
      { symbol: "ب", score: "99%", tone: "good" },
      { symbol: "م", score: "99%", tone: "good" },
    ],
    sample: "Sample: 45.600 tes",
    note: "Hampir tanpa deviasi fonik",
  },
  {
    title: "Khaisyum & Al-Jauf",
    arabic: "الخَيْشُوم والجَوْف",
    badge: "Mumtaz",
    badgeTone: "good",
    description: "Rongga Hidung & Mulut (Ghunnah & Mad)",
    accuracy: "97,4%",
    accuracyTone: "good",
    barTone: "bg-brand",
    letters: [
      { symbol: "غُنَّة", score: "96%", tone: "good" },
      { symbol: "مَدّ طَبِيعِي", score: "98%", tone: "good" },
      { symbol: "إِخْفَاء", score: "97%", tone: "good" },
    ],
    sample: "Sample: 24.560 tes",
    note: "Ketukan harakat terkalibrasi",
  },
];

function ArticulationMatrix() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <header className="flex flex-col gap-2 border-b border-line/70 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <IconWaveform className="size-5 text-brand" />
            <h2 className="text-[14px] font-bold text-ink">
              Matriks Artikulasi Makharijul Huruf
            </h2>
          </div>
          <p className="mt-1 text-[11px] text-muted">
            Akurasi posisi fonem, sifat huruf, dan penekanan tajwid — seluruhnya data contoh.
          </p>
        </div>
        <span className="self-start rounded-full bg-paper px-2.5 py-1 text-[10px] font-bold text-muted sm:self-center">
          Total Sample: <ModelText slot="samples" />
        </span>
      </header>

      <div className="grid gap-3 md:grid-cols-2">
        {regions.map((region) => (
          <article key={region.title} className="flex flex-col gap-3 rounded-xl bg-paper p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h3 className="text-[12px] font-bold text-ink">{region.title}</h3>
                  <span
                    className={cn(
                      "rounded px-1.5 py-0.5 text-[9px] font-bold",
                      region.badgeTone === "gold"
                        ? "bg-gold/20 text-gold"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
                    )}
                  >
                    {region.badge}
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] text-muted">{region.description}</p>
              </div>
              <div className="shrink-0 text-right">
                <span
                  className={cn(
                    "text-[15px] font-bold",
                    region.accuracyTone === "gold" ? "text-gold" : "text-brand",
                  )}
                >
                  {region.accuracy}
                </span>
                <span className="mt-0.5 block text-[9px] text-muted">Akurasi</span>
              </div>
            </div>

            <div dir="rtl" className="flex flex-wrap gap-1.5">
              {region.letters.map((letter) => (
                <span
                  key={`${region.title}-${letter.symbol}`}
                  className="flex min-w-10 flex-col items-center rounded-lg border border-line/70 bg-surface px-2 py-1 text-center shadow-sm"
                >
                  <span
                    lang="ar"
                    dir="rtl"
                    className={cn(
                      "font-arabic text-[15px] leading-tight",
                      letter.symbol === "+12" ? "font-sans font-bold text-ink" : "text-ink",
                    )}
                  >
                    {letter.symbol}
                  </span>
                  <span className={cn("text-[9px] font-bold", letterToneClass[letter.tone])}>
                    {letter.score}
                  </span>
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-line/50">
                <div
                  className={cn("h-full rounded-full", region.barTone)}
                  style={{ width: region.accuracy.replace(",", ".") + "%" }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-1 text-[9px] text-muted">
                <span>{region.sample}</span>
                <span
                  className={cn(
                    "font-semibold",
                    region.badgeTone === "gold" ? "text-red-600 dark:text-red-400" : "text-brand",
                  )}
                >
                  {region.note}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
      <span className="sr-only">{regions[0].arabic}</span>
    </section>
  );
}

const distribution = [
  { label: "Mumtaz (90% - 100%)", value: "64,0%", width: "64%", dot: "bg-brand" },
  { label: "Jayyid Jiddan (80% - 89%)", value: "26,0%", width: "26%", dot: "bg-gold" },
  { label: "Jayyid (70% - 79%)", value: "7,0%", width: "7%", dot: "bg-muted" },
  {
    label: "Remedial Makhraj (< 70%)",
    value: "3,0%",
    width: "3%",
    dot: "bg-red-500",
  },
];

const dialects: DemoDialect[] = [
  {
    label: "Fushah Turots & Nahwu",
    value: "96,4%",
    width: "96.4%",
    bar: "bg-brand",
    note: "Korpus Al-Qur'an & Turots klasik (Contoh)",
    trackValue: "fushah",
  },
  {
    label: "Amiyah Hijaz (Makkah-Jeddah)",
    value: "93,8%",
    width: "93.8%",
    bar: "bg-gold",
    note: "Penyesuaian Qaf menjadi Gaf/Hamzah (Contoh)",
    trackValue: "amiyah",
  },
  {
    label: "Amiyah Najd (Riyadh-Qassim)",
    value: "92,2%",
    width: "92.2%",
    bar: "bg-gold",
    note: "Deteksi Kasrah Imalah & konsonan majemuk (Contoh)",
    trackValue: "amiyah",
  },
];

function SidePanels() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex items-center justify-between gap-2 border-b border-line/70 pb-3">
          <div className="flex items-center gap-2">
            <IconChart className="size-5 text-brand" />
            <h2 className="text-[14px] font-bold text-ink">Distribusi Skor Fonetik</h2>
          </div>
          <span className="text-[10px] text-muted">Evaluasi AI (Contoh)</span>
        </header>
        <div className="flex flex-col gap-3">
          {distribution.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="inline-flex min-w-0 items-center gap-2 font-semibold text-ink">
                  <span className={cn("size-2.5 shrink-0 rounded-sm", item.dot)} />
                  <span className="truncate">{item.label}</span>
                </span>
                <span className="shrink-0 font-bold text-ink">{item.value}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-line/50">
                <div
                  className={cn("h-full rounded-full", item.dot)}
                  style={{ width: item.width }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="border-t border-line/70 pt-3 text-[10px] leading-4 text-muted">
          90% santri berada di atas ambang 80% pada data contoh ini; tidak ada
          penilaian sungguhan yang dihitung.
        </p>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex items-center justify-between gap-2 border-b border-line/70 pb-3">
          <div className="flex items-center gap-2">
            <IconCompare className="size-5 text-brand" />
            <h2 className="text-[14px] font-bold text-ink">Komparasi Akurasi Dialek</h2>
          </div>
          <span className="rounded bg-paper px-1.5 py-0.5 text-[9px] font-bold text-brand">
            <ModelText slot="pipelineBadge" />
          </span>
        </header>
        <div className="flex flex-col gap-3">
          <ModelDialectRows dialects={dialects} />
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex items-center justify-between gap-2 border-b border-line/70 pb-3">
          <div className="flex items-center gap-2">
            <IconServer className="size-5 text-brand" />
            <h2 className="text-[14px] font-bold text-ink">Infrastruktur GPU AI</h2>
          </div>
          <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Sehat (Contoh)
          </span>
        </header>
        <div className="flex flex-col gap-1 text-[11px]">
          <div className="flex items-center justify-between gap-2 py-1">
            <span className="text-muted">NVIDIA A100 Tensor Core</span>
            <span className="font-bold text-ink">8 Node (Online)</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-1">
            <span className="text-muted">VRAM Allocation</span>
            <span className="font-bold text-ink">184 / 320 GB</span>
          </div>
          <div className="flex items-center justify-between gap-2 py-1">
            <span className="text-muted">Audio Anotasi Pending</span>
            <span className="font-bold text-gold">420 klip</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 border-t border-line/70 pt-3">
          <DemoActionButton
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-paper py-2.5 text-[10px] font-bold text-ink transition-colors hover:bg-line/30"
            notice="Pratinjau — Unduh Raw Dataset Audio Anotasi tidak menghasilkan berkas."
          >
            <IconCloudDownload className="size-4 text-brand" />
            Unduh Raw Dataset Audio Anotasi
          </DemoActionButton>
          <DemoActionButton
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-paper py-2.5 text-[10px] font-bold text-ink transition-colors hover:bg-line/30"
            notice="Pratinjau — Setel Ambang Batas Toleransi Fonetik hanya simulasi demo."
          >
            <IconTune className="size-4 text-brand" />
            Setel Ambang Batas Toleransi Fonetik
          </DemoActionButton>
        </div>
      </section>

      <p className="flex items-center gap-1.5 px-1 text-[10px] leading-4 text-muted">
        <IconInfo className="size-3.5 shrink-0" />
        Semua metrik, klip, dan status GPU di panel ini adalah data contoh; tidak ada
        inferensi, unduhan, atau rekalibrasi sungguhan.
      </p>
    </div>
  );
}

function FooterNote() {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-paper p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
          <IconInfo className="size-5" />
        </span>
        <p className="text-[11px] leading-5 text-muted">
          <strong className="text-ink">Catatan Algoritma Talaqqi (Contoh):</strong>{" "}
          Penilaian fonik dalam mockup ini merujuk pada standar Tajwid Matan
          Al-Jazariyyah untuk Fushah dan korpus dialek Arab Saudi untuk Amiyah.
          Angka 10.000 sampel serta enkripsi AES-256 di bawah adalah ilustrasi,
          bukan konfigurasi sistem sungguhan.
        </p>
        <p className="text-[10px] leading-4 text-muted">
          <strong className="text-ink">Model aktif (Pratinjau):</strong>{" "}
          <ModelText slot="shortLabel" /> — <ModelText slot="note" />
        </p>
      </div>
      <span className="shrink-0 text-[10px] font-semibold text-brand">
        AES-256 Voice Biomark (Contoh)
      </span>
    </section>
  );
}

export function TalaqqiAnalyticsOverview() {
  return (
    <TalaqqiModelProvider>
      <div className="flex flex-col gap-5 pb-8">
        <TelemetryStrip />
        <PageHeader />
        <MetricCards />
        <TalaqqiAnalyticsWorkspace
          heatmap={<ArticulationMatrix />}
          rail={<SidePanels />}
        />
        <FooterNote />
      </div>
    </TalaqqiModelProvider>
  );
}
