import { cn } from "@/lib/cn";
import {
  IconArrowRight,
  IconBadgeCheck,
  IconBook,
  IconBrain,
  IconChevronRight,
  IconClock,
  IconDownload,
  IconHistory,
  IconLayers,
  IconMic,
  IconPie,
  IconPlusCircle,
  IconRefresh,
  IconTree,
} from "./icons";
import { AddVocabularyOpenButton } from "./add-vocabulary-flow";
import { DemoActionButton, MufrodatWorkspace } from "./mufrodat-workspace";

const buttonClass =
  "inline-flex items-center gap-2 rounded-xl border border-line/70 bg-surface px-3.5 py-2.5 text-[11px] font-semibold text-ink shadow-sm transition-colors hover:bg-line/30";
const primaryButtonClass =
  "inline-flex items-center gap-2 rounded-xl bg-emerald-950 px-3.5 py-2.5 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800";

function PageHeader() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-paper p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted">
            <span>Manajemen Utama</span>
            <IconChevronRight className="size-3.5" />
            <span className="font-semibold text-brand">Kurikulum &amp; Bank Mufrodat</span>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-[12px] text-brand"
            >
              المناهج وبنك المفردات الذكي
            </span>
            <span className="rounded-full border border-line/70 bg-surface px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              Data demo
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-[24px] font-bold tracking-tight text-ink sm:text-[30px]">
              Manajemen Kurikulum &amp; Bank Mufrodat
            </h1>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-[18px] font-bold text-brand sm:text-[22px]"
            >
              إدارة المناهج وبنك المفردات
            </span>
          </div>
          <p className="max-w-3xl text-[12px] leading-5 text-muted">
            Kelola 18 marhalah kurikulum dwi-jalur (Fushah Turots &amp; Amiyah Saudi),
            taksonomi 3.850+ mufrodat contoh berharokat, pratinjau repositori audio
            native, serta kalibrasi ilustratif algoritma Spaced Repetition SM-2.
            Seluruh angka, entri, dan aksi di halaman ini adalah data demo; audio
            belum direkam dan tidak ada penyimpanan sungguhan.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DemoActionButton
            className={buttonClass}
            notice="Pratinjau — Ekspor Glosarium tidak menghasilkan berkas."
            title="Pratinjau — ekspor glosarium hanya simulasi demo"
          >
            <IconDownload className="size-4 text-brand" />
            Ekspor Glosarium
          </DemoActionButton>
          <DemoActionButton
            className={buttonClass}
            notice="Pratinjau — Rilis Marhalah Baru hanya simulasi demo."
            title="Pratinjau — rilis marhalah hanya simulasi demo"
          >
            <IconTree className="size-4 text-brand" />
            + Rilis Marhalah Baru
          </DemoActionButton>
          <AddVocabularyOpenButton
            className={primaryButtonClass}
            title="Buka modul pratinjau penambahan mufrodat"
          >
            <IconPlusCircle className="size-4" />
            + Tambah Mufrodat Baru
          </AddVocabularyOpenButton>
        </div>
      </div>
    </section>
  );
}

function MetricCards() {
  return (
    <section
      aria-label="Ringkasan metrik kurikulum dan mufrodat"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            Total Mufrodat Aktif
          </span>
          <span className="grid size-9 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40 dark:text-emerald-200">
            <IconBook className="size-5" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold leading-none text-ink">3.850</span>
            <span className="text-[10px] font-bold text-brand">+120 bln ini</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-brand" />
              2.150 Fushah
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-gold" />
              1.700 Amiyah
            </span>
            <span className="font-semibold text-brand">Contoh</span>
          </div>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            Marhalah &amp; Modul
          </span>
          <span className="grid size-9 place-items-center rounded-lg bg-paper text-brand">
            <IconLayers className="size-5" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold leading-none text-ink">18</span>
            <span className="text-[10px] text-muted">Tingkat Belajar</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted">
            <span>Standar CEFR A1 - C1</span>
            <span className="rounded bg-paper px-1.5 py-0.5 font-bold text-brand">
              100% Terakreditasi (Contoh)
            </span>
          </div>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            Database Audio Native
          </span>
          <span className="grid size-9 place-items-center rounded-lg bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
            <IconMic className="size-5" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold leading-none text-ink">7.420</span>
            <span className="text-[10px] font-bold text-brand">Pratinjau</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted">
            <span className="truncate">Makkah &amp; Riyadh (Contoh)</span>
            <span className="inline-flex items-center gap-1 font-semibold text-brand">
              <IconBadgeCheck className="size-3.5" />
              100%
            </span>
          </div>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            Efektivitas SRS SM-2
          </span>
          <span className="grid size-9 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40 dark:text-emerald-200">
            <IconBrain className="size-5" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold leading-none text-brand">92,4%</span>
            <span className="text-[10px] text-muted">Daya Ingat Santri</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted">
            <span>Interval Retensi Rata-rata</span>
            <span className="font-semibold text-ink">24 Hari (Contoh)</span>
          </div>
        </div>
      </article>
    </section>
  );
}

const categories = [
  {
    label: "Percakapan Amiyah Saudi",
    words: "1.232 kata",
    percent: "32%",
    width: "32%",
    dot: "bg-brand",
  },
  {
    label: "Nahwu & Kaidah Turots",
    words: "1.078 kata",
    percent: "28%",
    width: "28%",
    dot: "bg-emerald-950 dark:bg-emerald-300",
  },
  {
    label: "Kosakata & I'jaz Al-Qur'an",
    words: "962 kata",
    percent: "25%",
    width: "25%",
    dot: "bg-gold",
  },
  {
    label: "Muamalah & Bisnis Saudi",
    words: "578 kata",
    percent: "15%",
    width: "15%",
    dot: "bg-emerald-400",
  },
];

function CategoryDistribution() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-[14px] font-bold text-ink">Distribusi Kategori Mufrodat</h2>
          <span
            lang="ar"
            dir="rtl"
            className="mt-0.5 block font-arabic text-[12px] text-brand"
          >
            توزيع المفردات حسب المجال
          </span>
        </div>
        <IconPie className="size-5 text-muted" />
      </header>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-line/50">
        {categories.map((category) => (
          <div
            key={category.label}
            className={cn("h-full", category.dot)}
            style={{ width: category.width }}
            title={`${category.label} (${category.percent})`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2 pt-1">
        {categories.map((category) => (
          <div key={category.label} className="flex items-center justify-between gap-2 text-[11px]">
            <span className="inline-flex min-w-0 items-center gap-2">
              <span className={cn("size-2.5 shrink-0 rounded-full", category.dot)} />
              <span className="truncate font-medium text-ink">{category.label}</span>
            </span>
            <span className="flex shrink-0 items-center gap-1.5">
              <span className="font-bold text-ink">{category.words}</span>
              <span className="text-[10px] text-muted">({category.percent})</span>
            </span>
          </div>
        ))}
      </div>
      <DemoActionButton
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-paper py-2 text-[11px] font-bold text-ink transition-colors hover:bg-line/30"
        notice="Pratinjau — Kelola Taksonomi & Tag Tematik hanya simulasi demo."
      >
        Kelola Taksonomi &amp; Tag Tematik
        <IconArrowRight className="size-3.5" />
      </DemoActionButton>
    </section>
  );
}

const auditItems = [
  {
    title: "Rilis 20 Mufrodat Dialek Najdi",
    time: "2 jam lalu",
    detail: "Divalidasi oleh Dr. Salman Al-Farisi untuk Marhalah 2 modul pasar Riyadh.",
    dot: "bg-brand",
  },
  {
    title: "Update Audio Tartil Ajrumiyyah",
    time: "Kemarin",
    detail: (
      <>
        Pembaruan 45 file lossless wav fonem makhraj{" "}
        <span lang="ar" dir="rtl" className="font-arabic text-brand">
          ض - ظ - ع
        </span>
        .
      </>
    ),
    dot: "bg-gold",
  },
  {
    title: "Kalibrasi Bobot SRS Interval",
    time: "3 hari lalu",
    detail: "Modifikasi faktor pengali SM-2 dari 2.5 ke 2.45 pada kategori I'rob Nahwu lanjut.",
    dot: "bg-muted",
  },
];

function AuditLog() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <header className="flex items-center justify-between gap-2">
        <div>
          <h2 className="text-[14px] font-bold text-ink">Audit Log Kurikulum</h2>
          <p className="mt-0.5 text-[10px] text-muted">Aktivitas rilis &amp; validasi (contoh)</p>
        </div>
        <IconHistory className="size-5 text-muted" />
      </header>
      <div className="relative flex flex-col gap-4 border-l border-line/70 pl-4">
        {auditItems.map((item) => (
          <div key={item.title} className="relative flex flex-col gap-1">
            <span
              className={cn(
                "absolute -left-[21px] top-1 size-2.5 rounded-full ring-4 ring-surface",
                item.dot,
              )}
            />
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-ink">{item.title}</span>
              <span className="shrink-0 font-mono text-[10px] text-muted">{item.time}</span>
            </div>
            <p className="text-[10px] leading-4 text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
      <DemoActionButton
        className="inline-flex items-center gap-1 text-[10px] font-bold text-brand hover:underline"
        notice="Pratinjau — Lihat Seluruh Log Verifikasi (142 Entri) hanya simulasi demo."
      >
        Lihat Seluruh Log Verifikasi (142 Entri)
        <IconChevronRight className="size-3.5" />
      </DemoActionButton>
    </section>
  );
}

function TalaqqiSync() {
  return (
    <section className="relative flex flex-col justify-between gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-950 to-emerald-800 p-4 text-sand-50 shadow-sm sm:p-5 dark:from-emerald-900 dark:to-emerald-950">
      <div className="absolute -right-8 -top-8 size-32 rounded-full bg-brand/25 blur-xl" />
      <div className="relative z-10 flex items-start justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
            Talaqqi Phonetic Engine
          </p>
          <h2 className="mt-1 text-[14px] font-bold">Status Sinkronisasi AI</h2>
        </div>
        <span className="inline-flex items-center gap-1 rounded bg-brand px-1.5 py-0.5 text-[10px] font-bold text-white">
          <span className="size-1.5 rounded-full bg-white animate-pulse-dot" />
          v4.2 Live
        </span>
      </div>
      <p className="relative z-10 text-[11px] leading-5 text-emerald-50/90">
        Seluruh 3.850 mufrodat contoh telah terindeks dalam peta titik artikulasi
        makharijul huruf. Klaim akurasi 98,2% dan latensi ini adalah ilustrasi, bukan
        hasil pengukuran sungguhan.
      </p>
      <div className="relative z-10 flex items-center justify-between gap-2 border-t border-white/20 pt-3">
        <div>
          <p className="text-[10px] text-emerald-100">Latensi Verifikasi</p>
          <p className="font-mono text-[13px] font-bold text-white">~140 ms</p>
        </div>
        <DemoActionButton
          className="inline-flex items-center gap-1.5 rounded-lg bg-surface px-3 py-1.5 text-[11px] font-bold text-ink transition-colors hover:bg-emerald-100"
          notice="Pratinjau — Re-Index Leksikon tidak menjalankan proses apa pun."
        >
          <IconRefresh className="size-3.5" />
          Re-Index Leksikon
        </DemoActionButton>
      </div>
    </section>
  );
}

function SidePanels() {
  return (
    <div className="flex flex-col gap-4">
      <CategoryDistribution />
      <AuditLog />
      <TalaqqiSync />
      <p className="flex items-center gap-1.5 px-1 text-[10px] leading-4 text-muted">
        <IconClock className="size-3.5 shrink-0" />
        Semua angka, log, dan status pada panel ini adalah data contoh; tidak ada
        audio, validasi, atau indeksasi yang dijalankan sungguhan.
      </p>
    </div>
  );
}

export function KurikulumMufrodatOverview() {
  return (
    <div className="flex flex-col gap-5 pb-8">
      <PageHeader />
      <MetricCards />
      <MufrodatWorkspace rail={<SidePanels />} />
    </div>
  );
}
