import { cn } from "@/lib/cn";
import {
  IconAward,
  IconCalendar,
  IconChart,
  IconChevronRight,
  IconClipboard,
  IconClock,
  IconDownload,
  IconEye,
  IconFilter,
  IconMic,
  IconUsers,
} from "./icons";
import {
  ScheduleExamOpenButton,
  ScheduleExamProvider,
} from "./schedule-exam-flow";
import { DemoActionButton, StudentExamWorkspace } from "./student-exam-workspace";

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
            <span className="font-semibold text-brand">Santri &amp; Ujian</span>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-[12px] text-brand"
            >
              الطلاب والاختبارات
            </span>
            <span className="rounded-full border border-line/70 bg-surface px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              Data demo
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-[24px] font-bold tracking-tight text-ink sm:text-[30px]">
              Manajemen Santri &amp; Monitoring Ujian
            </h1>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-[18px] font-bold text-brand sm:text-[22px]"
            >
              إدارة شؤون الطلاب وتقييم الاختبارات
            </span>
          </div>
          <p className="max-w-3xl text-[12px] leading-5 text-muted">
            Kelola 12.845 santri, jadwal ujian marhalah berkala, verifikasi vokal
            makharijul huruf via AI Talaqqi &amp; Asatidz, serta penerbitan
            syahadah Fushah &amp; Amiyah. Seluruh angka, nama, dan aksi di halaman
            ini adalah contoh.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DemoActionButton
            className={buttonClass}
            notice="Pratinjau — Export Santri (CSV) tidak menghasilkan berkas."
            title="Pratinjau — ekspor CSV hanya simulasi demo"
          >
            <IconDownload className="size-4 text-brand" />
            Export Santri (CSV)
          </DemoActionButton>
          <DemoActionButton
            className={buttonClass}
            notice="Pratinjau — Filter Lanjutan belum tersedia dalam demo."
            title="Pratinjau — filter lanjutan hanya simulasi demo"
          >
            <IconFilter className="size-4 text-muted" />
            Filter Lanjutan
          </DemoActionButton>
          <ScheduleExamOpenButton
            className={primaryButtonClass}
            title="Buka modul pratinjau penjadwalan ujian"
          >
            <IconCalendar className="size-4" />
            Jadwalkan Ujian Baru
          </ScheduleExamOpenButton>
        </div>
      </div>
    </section>
  );
}

function MetricCards() {
  return (
    <section
      aria-label="Ringkasan metrik santri dan ujian"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            Total Santri Terdaftar
          </span>
          <span className="grid size-9 place-items-center rounded-lg bg-emerald-950 text-white dark:bg-emerald-900">
            <IconUsers className="size-5" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold leading-none text-ink">
              12.845
            </span>
            <span className="text-[10px] font-bold text-brand">+14,2%</span>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-gold" />
              3.425 VIP Scholar
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-brand" />
              9.420 Reguler
            </span>
          </div>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            Ujian Pekan Ini
          </span>
          <span className="grid size-9 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40 dark:text-emerald-200">
            <IconClipboard className="size-5" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold leading-none text-ink">642</span>
            <span className="text-[10px] text-muted">Santri Diuji</span>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[10px] text-brand">
            <span className="size-1.5 rounded-full bg-brand animate-pulse-dot" />
            8 Marhalah &amp; Simulasi TOAFL
          </p>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            Kelulusan &amp; Akurasi AI
          </span>
          <span className="grid size-9 place-items-center rounded-lg bg-sand-200 text-sand-900">
            <IconAward className="size-5" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold leading-none text-ink">
              91,4%
            </span>
            <span className="text-[10px] font-semibold text-gold">
              Mumtaz / Jayyid
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-muted">
            <span>AI Speech Accuracy:</span>
            <span className="font-semibold text-brand">94,8% Vokal Valid</span>
          </div>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
            Verifikasi Vokal Musyrif
          </span>
          <span className="grid size-9 place-items-center rounded-lg bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-200">
            <IconMic className="size-5" />
          </span>
        </div>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[26px] font-bold leading-none text-ink">18</span>
            <span className="text-[10px] font-semibold text-red-600 dark:text-red-400">
              Talaqqi Menunggu
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-muted">
            <span>Estimasi Review:</span>
            <span className="font-semibold text-brand">&lt; 3 Jam</span>
          </div>
        </div>
      </article>
    </section>
  );
}

function ExamRail() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <IconCalendar className="size-[18px] text-brand" />
            <h2 className="text-[14px] font-bold text-ink">
              Jadwal Ujian Mendatang
            </h2>
          </div>
          <DemoActionButton
            className="text-[10px] font-bold text-brand hover:underline"
            notice="Pratinjau — daftar sesi lengkap hanya simulasi demo."
          >
            Semua Sesi
          </DemoActionButton>
        </header>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 rounded-xl border border-line/70 bg-paper p-3">
            <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-emerald-950 text-white dark:bg-emerald-900">
              <span className="text-[9px] font-bold uppercase tracking-wider">
                Sabtu
              </span>
              <span className="text-[16px] font-bold leading-none">25</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="text-[12px] font-bold text-ink">
                  Ujian Marhalah 2 Shorof
                </span>
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  20:00 WIB
                </span>
              </div>
              <p className="mt-0.5 truncate text-[11px] text-muted">
                Bab Fi&apos;il Tsulatsi &amp; Rubai Mujarrod
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[10px] text-muted">
                <span className="inline-flex items-center gap-1">
                  <IconUsers className="size-3" />
                  210 Santri Terdaftar
                </span>
                <span>•</span>
                <span className="text-brand">Musyrif: Ust. Salman</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 rounded-xl border border-line/70 bg-paper p-3">
            <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-brand text-white">
              <span className="text-[9px] font-bold uppercase tracking-wider">
                Selasa
              </span>
              <span className="text-[16px] font-bold leading-none">28</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <span className="text-[12px] font-bold text-ink">
                  Tryout Akbar TOAFL IV
                </span>
                <span className="rounded bg-sand-200 px-1.5 py-0.5 text-[10px] font-bold text-sand-900">
                  09:00 WIB
                </span>
              </div>
              <p className="mt-0.5 truncate text-[11px] text-muted">
                Standardized Arabic Proficiency Test
              </p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[10px] text-muted">
                <span className="inline-flex items-center gap-1">
                  <IconUsers className="size-3" />
                  432 Santri
                </span>
                <span>•</span>
                <span className="text-gold">Sertifikasi Resmi (Contoh)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <IconChart className="size-[18px] text-brand" />
            <h2 className="text-[14px] font-bold text-ink">
              Distribusi Nilai Marhalah
            </h2>
          </div>
          <span className="text-[10px] text-muted">Bulan Ini (Contoh)</span>
        </header>
        <div className="flex flex-col gap-3">
          {[
            {
              label: "Mumtaz (90 - 100)",
              value: "62% (7.963)",
              width: "62%",
              dot: "bg-brand",
              bar: "bg-brand",
              text: "text-brand",
            },
            {
              label: "Jayyid Jiddan (80 - 89)",
              value: "26% (3.339)",
              width: "26%",
              dot: "bg-emerald-950 dark:bg-emerald-300",
              bar: "bg-emerald-950 dark:bg-emerald-300",
              text: "text-ink",
            },
            {
              label: "Jayyid (70 - 79)",
              value: "9% (1.156)",
              width: "9%",
              dot: "bg-sand-400",
              bar: "bg-sand-400",
              text: "text-gold",
            },
            {
              label: "Rasib / Remedial (< 70)",
              value: "3% (385)",
              width: "3%",
              dot: "bg-red-500",
              bar: "bg-red-500",
              text: "text-red-600 dark:text-red-400",
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <div className="flex items-center justify-between gap-2 text-[11px]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                  <span className={cn("size-2.5 rounded-full", item.dot)} />
                  {item.label}
                </span>
                <span className={cn("font-bold", item.text)}>{item.value}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-line/50">
                <div
                  className={cn("h-full rounded-full", item.bar)}
                  style={{ width: item.width }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-line/70 bg-paper p-3">
          <div className="relative grid size-12 shrink-0 place-items-center">
            <svg
              viewBox="0 0 36 36"
              className="size-full -rotate-90"
              aria-hidden="true"
            >
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                className="text-line"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeDasharray="88, 100"
                strokeLinecap="round"
                className="text-brand"
              />
            </svg>
            <span className="absolute text-[10px] font-bold text-ink">88%</span>
          </div>
          <div className="min-w-0">
            <p className="text-[12px] font-bold text-ink">
              Tingkat Ketuntasan Kelas
            </p>
            <p className="mt-0.5 text-[11px] leading-4 text-muted">
              88% santri menuntaskan ujian marhalah pada percobaan pertama
              (ilustrasi).
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-brand animate-pulse-dot" />
            <h2 className="text-[14px] font-bold text-ink">
              Live Selesai Ujian
            </h2>
          </div>
          <span className="font-mono text-[10px] text-muted">
            Real-time (Contoh)
          </span>
        </header>
        <div className="flex flex-col gap-1">
          {[
            {
              initials: "AF",
              name: "Ahmad Fauzi",
              detail: "Shorof M2: Bab Isim Fa'il",
              score: "96",
              time: "1 mnt lalu",
              tone: "text-brand",
            },
            {
              initials: "DN",
              name: "Dina Novita",
              detail: "Amiyah: Hiwar Mat'am",
              score: "84",
              time: "4 mnt lalu",
              tone: "text-ink",
            },
            {
              initials: "IK",
              name: "Ilyas Kurnia",
              detail: "TOAFL Tryout Gramatika",
              score: "91",
              time: "9 mnt lalu",
              tone: "text-brand",
            },
          ].map((item) => (
            <div
              key={item.initials}
              className="flex items-center justify-between gap-2 rounded-lg p-2 hover:bg-paper"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  {item.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-ink">
                    {item.name}
                  </p>
                  <p className="truncate text-[10px] text-muted">{item.detail}</p>
                </div>
              </div>
              <div className="shrink-0 pl-2 text-right">
                <p className={cn("text-[12px] font-bold", item.tone)}>
                  Skor: {item.score}
                </p>
                <p className="text-[10px] text-muted">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
        <DemoActionButton
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-paper py-2 text-[10px] font-bold text-brand transition-colors hover:bg-line/40"
          notice="Pratinjau — Audit Log Ujian Lengkap hanya simulasi demo."
        >
          <IconEye className="size-3.5" />
          Buka Audit Log Ujian Lengkap
        </DemoActionButton>
      </section>

      <p className="flex items-center gap-1.5 px-1 text-[10px] leading-4 text-muted">
        <IconClock className="size-3.5 shrink-0" />
        Jadwal, skor, dan aliran aktivitas di panel ini adalah data contoh;
        tidak ada ujian, audio, atau notifikasi sungguhan.
      </p>
    </div>
  );
}

export function SantriUjianOverview() {
  return (
    <ScheduleExamProvider>
      <div className="flex flex-col gap-5 pb-8">
        <PageHeader />
        <MetricCards />
        <StudentExamWorkspace rail={<ExamRail />} />
      </div>
    </ScheduleExamProvider>
  );
}
