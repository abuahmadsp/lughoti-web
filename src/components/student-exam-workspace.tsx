"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  ScheduleExamAddButton,
  ScheduledExamMeta,
  useScheduleExam,
} from "./schedule-exam-flow";
import {
  IconAlert,
  IconAward,
  IconBadgeCheck,
  IconCalendar,
  IconChat,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconClipboard,
  IconClock,
  IconDownload,
  IconEye,
  IconFileText,
  IconHistory,
  IconHourglass,
  IconPlay,
  IconPrint,
  IconRefresh,
  IconSearch,
  IconSparkles,
  IconTable,
  IconUsers,
  IconWaveform,
  IconX,
} from "./icons";

type IconType = ComponentType<{ className?: string }>;
type TabId = "students" | "sessions" | "queue" | "bank";
type ActionKey =
  | "view"
  | "play"
  | "download"
  | "print"
  | "review"
  | "remedial"
  | "monitor";
type Action = { key: ActionKey; label: string; primary?: boolean };
type Tone = "brand" | "neutral" | "danger";

type Filters = {
  query: string;
  track: string;
  marhalah: string;
  status: string;
};

type Student = {
  id: string;
  initials: string;
  avatarClass: string;
  name: string;
  tier: "VIP" | "Reguler";
  track: string;
  trackValue: "fushah" | "amiyah" | "toafl";
  marhalah: string;
  marhalahValue: "m1" | "m2" | "m3" | "m4";
  exam: string;
  examNote: string;
  theory: string;
  theoryTone: "good" | "low" | "pending";
  ai: string;
  aiNote: string;
  aiTone: "good" | "review" | "low" | "live";
  status: string;
  statusTone: "excellent" | "good" | "review" | "remedial" | "live";
  statusValue: "lulus" | "berlangsung" | "remedial" | "review" | "belum";
  actions: Action[];
};

const tabs: {
  id: TabId;
  label: string;
  icon: IconType;
  count: string | null;
  tone: Tone;
}[] = [
  {
    id: "students",
    label: "Semua Santri & Progres Belajar",
    icon: IconBadgeCheck,
    count: "12.845",
    tone: "brand",
  },
  {
    id: "sessions",
    label: "Sesi Ujian & Jadwal Marhalah",
    icon: IconCalendar,
    count: "8 Sesi",
    tone: "neutral",
  },
  {
    id: "queue",
    label: "Antrean Koreksi Asatidz & AI",
    icon: IconWaveform,
    count: "18",
    tone: "danger",
  },
  { id: "bank", label: "Bank Soal & Syahadah", icon: IconHistory, count: null, tone: "neutral" },
];

const students: Student[] = [
  {
    id: "LGT-2024-8841",
    initials: "FR",
    avatarClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    name: "Fathia Rahma",
    tier: "VIP",
    track: "Fushah Nahwu-Shorof",
    trackValue: "fushah",
    marhalah: "Marhalah 3 (Tarkib)",
    marhalahValue: "m3",
    exam: "Matan Al-Ajurrumiyyah",
    examNote: "Bab Na'at & Manshubat",
    theory: "98",
    theoryTone: "good",
    ai: "97,2%",
    aiNote: "Makhraj: Mumtaz",
    aiTone: "good",
    status: "Mumtaz Murtafi'",
    statusTone: "excellent",
    statusValue: "lulus",
    actions: [
      { key: "view", label: "Lihat lembar jawaban" },
      { key: "play", label: "Dengarkan audio Talaqqi" },
      { key: "download", label: "Unduh syahadah" },
    ],
  },
  {
    id: "LGT-2023-4102",
    initials: "AG",
    avatarClass: "bg-surface text-brand",
    name: "M. Al-Ghazali",
    tier: "Reguler",
    track: "Amiyah Saudi Hijazi",
    trackValue: "amiyah",
    marhalah: "Marhalah 2 (Kalam Harian)",
    marhalahValue: "m2",
    exam: "Hiwar Suq & Mat'am",
    examNote: "Ujian Percakapan Real-Time",
    theory: "88",
    theoryTone: "good",
    ai: "89,5%",
    aiNote: "Dialek: Jayyid",
    aiTone: "good",
    status: "Jayyid Jiddan",
    statusTone: "good",
    statusValue: "lulus",
    actions: [
      { key: "view", label: "Lihat lembar jawaban" },
      { key: "play", label: "Dengarkan audio percakapan" },
      { key: "print", label: "Cetak hasil" },
    ],
  },
  {
    id: "LGT-2024-9112",
    initials: "SN",
    avatarClass:
      "bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200",
    name: "Siti Nurhaliza",
    tier: "VIP",
    track: "Persiapan TOAFL",
    trackValue: "toafl",
    marhalah: "Sesi 1: Fahmul Masmu'",
    marhalahValue: "m3",
    exam: "TOAFL Listening Test 4",
    examNote: "Durasi: 45 Menit",
    theory: "94",
    theoryTone: "good",
    ai: "Verifikasi",
    aiNote: "Audio perlu divalidasi",
    aiTone: "review",
    status: "Review Musyrif",
    statusTone: "review",
    statusValue: "review",
    actions: [{ key: "review", label: "Koreksi", primary: true }],
  },
  {
    id: "LGT-2023-7720",
    initials: "ZB",
    avatarClass: "bg-surface text-brand",
    name: "Zaid Bin Tsabit",
    tier: "Reguler",
    track: "Fushah Nahwu-Shorof",
    trackValue: "fushah",
    marhalah: "Marhalah 1 (Mubtadi')",
    marhalahValue: "m1",
    exam: "Tashrif Shorof Istilahi",
    examNote: "Fi'il Tsulatsi Mujarrod",
    theory: "58",
    theoryTone: "low",
    ai: "62,4%",
    aiNote: "Ghunnah & Tashrif kurang",
    aiTone: "low",
    status: "Remedial Diperlukan",
    statusTone: "remedial",
    statusValue: "remedial",
    actions: [
      { key: "view", label: "Lihat rekap nilai rendah" },
      { key: "remedial", label: "Buka Ujian Ulang", primary: true },
    ],
  },
  {
    id: "LGT-2024-1049",
    initials: "AR",
    avatarClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    name: "Aisyah Rahmadani",
    tier: "VIP",
    track: "Amiyah Saudi Najdi",
    trackValue: "amiyah",
    marhalah: "Marhalah 3 (Ekspresi Riyadh)",
    marhalahValue: "m3",
    exam: "Qawa'id Al-Kalam Al-Najdi",
    examNote: "Sedang dikerjakan",
    theory: "Mengisi…",
    theoryTone: "pending",
    ai: "Live Rec",
    aiNote: "Soal 14 / 20",
    aiTone: "live",
    status: "In-Session",
    statusTone: "live",
    statusValue: "berlangsung",
    actions: [{ key: "monitor", label: "Live monitor jawaban" }],
  },
  {
    id: "LGT-2023-3990",
    initials: "RK",
    avatarClass: "bg-surface text-brand",
    name: "Rizal Kurniawan",
    tier: "Reguler",
    track: "Fushah Nahwu-Shorof",
    trackValue: "fushah",
    marhalah: "Marhalah 4 (Balaghah)",
    marhalahValue: "m4",
    exam: "Al-Balaghah Al-Wadhihah",
    examNote: "Tasybih & Majaz Mursal",
    theory: "92",
    theoryTone: "good",
    ai: "91,0%",
    aiNote: "Fashahah: Mumtaz",
    aiTone: "good",
    status: "Mumtaz",
    statusTone: "excellent",
    statusValue: "lulus",
    actions: [
      { key: "view", label: "Lihat lembar jawaban" },
      { key: "play", label: "Dengarkan audio" },
      { key: "download", label: "Unduh syahadah" },
    ],
  },
];

const sessions = [
  {
    day: "Sabtu",
    date: "25",
    title: "Ujian Marhalah 2 Shorof",
    time: "20:00 WIB",
    topic: "Bab Fi'il Tsulatsi & Rubai Mujarrod",
    students: "210 Santri Terdaftar",
    note: "Musyrif: Ust. Salman",
  },
  {
    day: "Selasa",
    date: "28",
    title: "Tryout Akbar TOAFL IV",
    time: "09:00 WIB",
    topic: "Standardized Arabic Proficiency Test",
    students: "432 Santri",
    note: "Sertifikasi Resmi (Contoh)",
  },
  {
    day: "Rabu",
    date: "29",
    title: "Hiwar Amiyah Hijazi",
    time: "16:30 WIB",
    topic: "Percakapan pasar & restoran",
    students: "184 Santri",
    note: "Penguji: Ustzh. Maryam",
  },
  {
    day: "Jumat",
    date: "31",
    title: "Talaqqi Fashahah Marhalah 4",
    time: "19:00 WIB",
    topic: "Makhraj huruf isti'la & qalqalah",
    students: "96 Santri",
    note: "Koreksi AI + Asatidz",
  },
];

const queue = [
  { name: "Siti Nurhaliza", module: "TOAFL Listening Test 4", score: "94", wait: "6 mnt lalu" },
  { name: "Dina Novita", module: "Hiwar Mat'am (Amiyah)", score: "84", wait: "12 mnt lalu" },
  { name: "Ilyas Kurnia", module: "Gramatika TOAFL", score: "91", wait: "18 mnt lalu" },
  { name: "Ahmad Fauzi", module: "Shorof M2: Isim Fa'il", score: "96", wait: "24 mnt lalu" },
];

const bankCards = [
  {
    title: "Bank Soal Nahwu-Shorof",
    count: "1.204 soal",
    detail: "Tashrif, i'rab, dan kaidah marhalah 1–4.",
    icon: IconClipboard,
  },
  {
    title: "Bank Soal Amiyah Saudi",
    count: "786 soal",
    detail: "Dialog Hijazi/Najdi dan respons situasional.",
    icon: IconChat,
  },
  {
    title: "Syahadah Digital",
    count: "312 template",
    detail: "Sertifikat Fushah, Amiyah, dan TOAFL.",
    icon: IconAward,
  },
];

const statusPillClass: Record<Student["statusTone"], string> = {
  excellent:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  good: "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200",
  review: "bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200",
  remedial: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-200",
  live: "bg-paper text-ink",
};

const aiPillClass: Record<Student["aiTone"], string> = {
  good: "bg-emerald-50 text-brand dark:bg-emerald-900/30 dark:text-emerald-200",
  review: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-200",
  low: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
  live: "bg-emerald-50 text-brand dark:bg-emerald-900/30 dark:text-emerald-200",
};

function DemoToast({ message, onClose }: { message: string; onClose?: () => void }) {
  return (
    <div
      role="status"
      className="animate-flow-in fixed bottom-4 right-4 z-[80] flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border border-brand/30 bg-emerald-950 p-4 text-sand-50 shadow-xl sm:bottom-6 sm:right-6"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-white">
        <IconCheck className="size-4" />
      </span>
      <p className="flex-1 text-[11px] font-semibold leading-5">{message}</p>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup notifikasi"
          className="rounded p-1 text-emerald-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          <IconX className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}

/** Small demo-only action button used by the server-rendered page header. */
export function DemoActionButton({
  className,
  children,
  notice,
  title,
}: {
  className?: string;
  children: ReactNode;
  notice: string;
  title?: string;
}) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [message]);

  return (
    <>
      <button
        type="button"
        title={title}
        onClick={() => setMessage(notice)}
        className={className}
      >
        {children}
      </button>
      {message ? (
        <DemoToast message={message} onClose={() => setMessage(null)} />
      ) : null}
    </>
  );
}

function TabBar({
  active,
  onChange,
  sessionCount,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
  sessionCount: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3 overflow-x-auto rounded-2xl border border-line/70 bg-surface p-1.5 shadow-sm">
      <div className="flex min-w-max items-center gap-1.5">
        {tabs.map((tab) => {
          const TabIcon = tab.icon;
          const isActive = tab.id === active;
          const count = tab.id === "sessions" ? `${sessionCount} Sesi` : tab.count;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(tab.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3.5 py-2 text-[11px] font-semibold transition-colors sm:text-[12px]",
                isActive
                  ? "bg-emerald-950 text-white shadow-sm dark:bg-emerald-900"
                  : "text-muted hover:bg-paper hover:text-ink",
              )}
            >
              <TabIcon className="size-[18px] shrink-0" />
              <span>{tab.label}</span>
              {count ? (
                <span
                  className={cn(
                    "ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                    isActive
                      ? "bg-white/15 text-white"
                      : tab.tone === "danger"
                        ? "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-200"
                        : "bg-paper text-muted",
                  )}
                >
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <span className="hidden shrink-0 items-center gap-1.5 pr-2 text-[10px] font-semibold text-muted xl:flex">
        <span className="size-2 rounded-full bg-brand animate-pulse-dot" />
        Sinkronisasi Live Database (Contoh)
      </span>
    </div>
  );
}

const selectClass =
  "w-full rounded-xl border border-line/70 bg-paper px-3 py-2 text-[12px] text-ink transition-shadow focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20 sm:w-auto";

function FilterToolbar({
  filters,
  onChange,
  onNotice,
}: {
  filters: Filters;
  onChange: (key: keyof Filters, value: string) => void;
  onNotice: (message: string) => void;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm">
      <div className="grid flex-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="relative sm:col-span-2 lg:col-span-1">
          <span className="sr-only">Cari santri, ID, atau email</span>
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={filters.query}
            onChange={(event) => onChange("query", event.target.value)}
            placeholder="Cari santri, ID (LGT-XXXX), email…"
            className="w-full rounded-xl border border-line/70 bg-paper py-2 pl-10 pr-3 text-[12px] text-ink placeholder:text-muted/70 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <select
          aria-label="Filter jalur belajar"
          value={filters.track}
          onChange={(event) => onChange("track", event.target.value)}
          className={selectClass}
        >
          <option value="">Semua Jalur Belajar</option>
          <option value="fushah">Fushah Akademik (Nahwu-Shorof)</option>
          <option value="amiyah">Amiyah Saudi (Hijazi/Najdi)</option>
          <option value="toafl">Persiapan TOAFL Internasional</option>
        </select>
        <select
          aria-label="Filter marhalah"
          value={filters.marhalah}
          onChange={(event) => onChange("marhalah", event.target.value)}
          className={selectClass}
        >
          <option value="">Semua Marhalah</option>
          <option value="m1">Marhalah 1 (Mubtadi&apos;)</option>
          <option value="m2">Marhalah 2 (Mutawassith)</option>
          <option value="m3">Marhalah 3 (Tarkib &amp; I&apos;rob)</option>
          <option value="m4">Marhalah 4 (Mahir & Balaghah)</option>
        </select>
        <select
          aria-label="Filter status ujian"
          value={filters.status}
          onChange={(event) => onChange("status", event.target.value)}
          className={selectClass}
        >
          <option value="">Status Ujian (Semua)</option>
          <option value="lulus">Lulus (Mumtaz/Jayyid)</option>
          <option value="berlangsung">Sedang Ujian</option>
          <option value="review">Menunggu Review Musyrif</option>
          <option value="remedial">Perlu Remedial</option>
          <option value="belum">Belum Ambil Ujian</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-t border-line/60 pt-3">
        <button
          type="button"
          title="Pratinjau — pengiriman WA massal belum tersedia"
          onClick={() =>
            onNotice("Pratinjau — Kirim Pengingat WA hanya simulasi demo.")
          }
          className="inline-flex items-center gap-1.5 rounded-lg bg-paper px-3 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/40"
        >
          <IconChat className="size-4 text-brand" />
          Kirim Pengingat WA
        </button>
        <button
          type="button"
          title="Pratinjau — penerbitan syahadah belum tersedia"
          onClick={() =>
            onNotice("Pratinjau — Terbitkan Syahadah hanya simulasi demo.")
          }
          className="inline-flex items-center gap-1.5 rounded-lg bg-paper px-3 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/40"
        >
          <IconAward className="size-4 text-gold" />
          Terbitkan Syahadah
        </button>
        <span className="ml-auto text-[10px] text-muted">
          Filter hanya menyaring 6 entri contoh.
        </span>
      </div>
    </section>
  );
}

function ActionIcon({ action }: { action: ActionKey }) {
  const className = "size-[18px]";
  if (action === "play") return <IconPlay className={className} />;
  if (action === "download") return <IconDownload className={className} />;
  if (action === "print") return <IconPrint className={className} />;
  if (action === "review") return <IconClipboard className={className} />;
  if (action === "remedial") return <IconRefresh className={className} />;
  return <IconEye className={className} />;
}

function StudentDirectory({
  rows,
  selected,
  onToggle,
  onNotice,
}: {
  rows: Student[];
  selected: string[];
  onToggle: (id: string) => void;
  onNotice: (message: string) => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-line/70 bg-surface shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 px-4 py-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-[15px] font-bold text-ink">
            Direktori Santri &amp; Hasil Marhalah
          </h2>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            {rows.length} contoh ditampilkan
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Pratinjau — muat ulang data"
            onClick={() =>
              onNotice("Pratinjau — muat ulang data tidak tersedia dalam demo.")
            }
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-paper hover:text-brand"
          >
            <IconRefresh className="size-[18px]" />
          </button>
          <button
            type="button"
            title="Pratinjau — pengaturan kolom"
            onClick={() =>
              onNotice("Pratinjau — pengaturan kolom belum tersedia.")
            }
            className="rounded-lg p-1.5 text-muted transition-colors hover:bg-paper hover:text-brand"
          >
            <IconTable className="size-[18px]" />
          </button>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left">
          <thead>
            <tr className="bg-paper text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              <th className="px-4 py-3.5">Santri &amp; Identitas</th>
              <th className="px-4 py-3.5">Jalur / Marhalah</th>
              <th className="px-4 py-3.5">Ujian Terakhir</th>
              <th className="px-4 py-3.5 text-center">Teori / I&apos;rob</th>
              <th className="px-4 py-3.5 text-center">AI Vokal Talaqqi</th>
              <th className="px-4 py-3.5">Status Hasil</th>
              <th className="px-4 py-3.5 text-right">Aksi Akademik</th>
            </tr>
          </thead>
          <tbody className="text-[12px] text-ink">
            {rows.map((row) => {
              const isSelected = selected.includes(row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => onToggle(row.id)}
                  className={cn(
                    "cursor-pointer border-t border-line/60 transition-colors",
                    isSelected
                      ? "bg-emerald-50/70 dark:bg-emerald-900/20"
                      : "hover:bg-paper/70",
                  )}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-full text-[13px] font-bold",
                          row.avatarClass,
                        )}
                      >
                        {row.initials}
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-semibold text-ink">{row.name}</span>
                          <span
                            className={cn(
                              "rounded px-1.5 py-0.5 text-[10px] font-bold",
                              row.tier === "VIP"
                                ? "bg-sand-200 text-sand-900"
                                : "bg-paper text-muted",
                            )}
                          >
                            {row.tier}
                          </span>
                        </div>
                        <span className="font-mono text-[11px] text-muted">
                          {row.id}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-ink">{row.track}</span>
                      <span className="text-[11px] font-semibold text-brand">
                        {row.marhalah}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex max-w-[170px] flex-col gap-0.5">
                      <span className="truncate font-medium">{row.exam}</span>
                      <span className="truncate text-[11px] text-muted">
                        {row.examNote}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={cn(
                        "text-[15px] font-bold",
                        row.theoryTone === "low"
                          ? "text-red-600 dark:text-red-400"
                          : row.theoryTone === "pending"
                            ? "text-[12px] font-medium italic text-muted"
                            : "text-ink",
                      )}
                    >
                      {row.theory}
                    </span>
                    {row.theoryTone !== "pending" ? (
                      <span className="block text-[10px] text-muted">/ 100</span>
                    ) : null}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
                        aiPillClass[row.aiTone],
                      )}
                    >
                      {row.aiTone === "good" ? (
                        <IconWaveform className="size-3.5" />
                      ) : null}
                      {row.aiTone === "review" ? (
                        <IconHourglass className="size-3.5" />
                      ) : null}
                      {row.aiTone === "low" ? (
                        <IconAlert className="size-3.5" />
                      ) : null}
                      {row.aiTone === "live" ? (
                        <span className="size-2 rounded-full bg-brand animate-pulse-dot" />
                      ) : null}
                      {row.ai}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 block text-[10px]",
                        row.aiTone === "low"
                          ? "text-red-600 dark:text-red-400"
                          : "text-muted",
                      )}
                    >
                      {row.aiNote}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold",
                        statusPillClass[row.statusTone],
                      )}
                    >
                      {row.statusTone === "excellent" ? (
                        <IconBadgeCheck className="size-3.5" />
                      ) : null}
                      {row.statusTone === "live" ? (
                        <span className="size-2 rounded-full bg-brand animate-pulse-dot" />
                      ) : null}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      {row.actions.map((action) =>
                        action.primary ? (
                          <button
                            key={action.label}
                            type="button"
                            title={action.label}
                            onClick={(event) => {
                              event.stopPropagation();
                              onNotice(
                                `Pratinjau — ${action.label} hanya simulasi demo.`,
                              );
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1 text-[10px] font-bold text-white transition-colors hover:bg-brand/85"
                          >
                            <ActionIcon action={action.key} />
                            {action.label}
                          </button>
                        ) : (
                          <button
                            key={action.label}
                            type="button"
                            title={action.label}
                            onClick={(event) => {
                              event.stopPropagation();
                              onNotice(
                                `Pratinjau — ${action.label} hanya simulasi demo.`,
                              );
                            }}
                            className="grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-paper hover:text-brand"
                          >
                            <ActionIcon action={action.key} />
                          </button>
                        ),
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-[12px] text-muted">
                  Tidak ada santri contoh yang cocok dengan filter ini.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-col gap-3 border-t border-line/70 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-muted">
          Menampilkan{" "}
          <span className="font-semibold text-ink">1 - {rows.length}</span> dari{" "}
          <span className="font-semibold text-ink">12.845</span> santri{" "}
          <span className="font-semibold text-brand">demo</span>
        </p>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            disabled
            aria-label="Halaman sebelumnya"
            className="grid size-8 place-items-center rounded-lg bg-paper text-muted opacity-50"
          >
            <IconChevronLeft className="size-[18px]" />
          </button>
          {["1", "2", "3"].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() =>
                onNotice(`Pratinjau — halaman ${page} tidak tersedia dalam demo.`)
              }
              className={cn(
                "size-8 rounded-lg text-[11px] font-semibold transition-colors",
                page === "1"
                  ? "bg-emerald-950 text-white dark:bg-emerald-900"
                  : "text-ink hover:bg-paper",
              )}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-muted">…</span>
          <button
            type="button"
            onClick={() =>
              onNotice("Pratinjau — halaman 2141 tidak tersedia dalam demo.")
            }
            className="size-9 rounded-lg text-[11px] font-semibold text-ink transition-colors hover:bg-paper"
          >
            2141
          </button>
          <button
            type="button"
            aria-label="Halaman berikutnya"
            onClick={() =>
              onNotice("Pratinjau — halaman berikutnya tidak tersedia dalam demo.")
            }
            className="grid size-8 place-items-center rounded-lg bg-paper text-ink transition-colors hover:bg-line/40"
          >
            <IconChevronRight className="size-[18px]" />
          </button>
        </div>
      </footer>
    </section>
  );
}

function SessionsPanel({ onNotice }: { onNotice: (message: string) => void }) {
  const { scheduled, remove } = useScheduleExam();

  return (
    <section className="rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <IconCalendar className="size-[18px] text-brand" />
          <h2 className="text-[15px] font-bold text-ink">
            Sesi Ujian &amp; Jadwal Marhalah
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] font-semibold text-muted">
            {8 + scheduled.length} sesi contoh
          </span>
          <ScheduleExamAddButton className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1.5 text-[10px] font-bold text-white transition-colors hover:bg-brand/85" />
        </div>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {sessions.map((session) => (
          <article
            key={session.title}
            className="flex gap-3 rounded-xl border border-line/70 bg-paper p-3"
          >
            <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-emerald-950 text-white dark:bg-emerald-900">
              <span className="text-[9px] font-bold uppercase tracking-wider">
                {session.day}
              </span>
              <span className="text-[16px] font-bold leading-none">
                {session.date}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <h3 className="text-[12px] font-bold text-ink">{session.title}</h3>
                <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  <IconClock className="size-3" />
                  {session.time}
                </span>
              </div>
              <p className="mt-1 truncate text-[11px] text-muted">{session.topic}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[10px] text-muted">
                <span className="inline-flex items-center gap-1">
                  <IconUsers className="size-3" />
                  {session.students}
                </span>
                <span>•</span>
                <span className="text-brand">{session.note}</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  onNotice(
                    `Pratinjau — detail ${session.title} hanya simulasi demo.`,
                  )
                }
                className="mt-2 text-[10px] font-bold text-brand hover:underline"
              >
                Lihat detail sesi
              </button>
            </div>
          </article>
        ))}
        {scheduled.map((exam) => (
          <article
            key={exam.id}
            className="flex gap-3 rounded-xl border border-brand/40 bg-emerald-50/60 p-3 dark:bg-emerald-900/20"
          >
            <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-brand text-white">
              <span className="text-[9px] font-bold uppercase tracking-wider">
                {exam.day}
              </span>
              <span className="text-[16px] font-bold leading-none">
                {exam.date}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <h3 className="text-[12px] font-bold text-ink">{exam.title}</h3>
                <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  <IconClock className="size-3" />
                  {exam.time}
                </span>
              </div>
              <p className="mt-1 truncate text-[11px] text-muted">{exam.topic}</p>
              <ScheduledExamMeta exam={exam} />
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold text-brand">
                  Baru (Demo)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    remove(exam.id);
                    onNotice(
                      `Pratinjau — ${exam.title} dihapus dari jadwal demo.`,
                    );
                  }}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-muted transition-colors hover:text-red-600 dark:hover:text-red-400"
                >
                  <IconX className="size-3" />
                  Hapus dari jadwal
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {scheduled.length > 0 ? (
        <p className="mt-3 text-[10px] leading-4 text-muted">
          Sesi bertanda &ldquo;Baru (Demo)&rdquo; hanya tersimpan dalam memori
          sesi ini; muat ulang halaman untuk mengosongkannya.
        </p>
      ) : null}
    </section>
  );
}

function QueuePanel({ onNotice }: { onNotice: (message: string) => void }) {
  return (
    <section className="rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <IconWaveform className="size-[18px] text-brand" />
          <h2 className="text-[15px] font-bold text-ink">
            Antrean Koreksi Asatidz &amp; AI
          </h2>
        </div>
        <span className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold text-red-700 dark:bg-red-950/40 dark:text-red-200">
          18 menunggu (Contoh)
        </span>
      </header>
      <div className="flex flex-col divide-y divide-line/60">
        {queue.map((item) => (
          <div
            key={item.name}
            className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-100 text-[11px] font-bold text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
                {item.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-ink">
                  {item.name}
                </p>
                <p className="truncate text-[11px] text-muted">{item.module}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-[12px] font-bold text-brand">Skor {item.score}</p>
                <p className="text-[10px] text-muted">{item.wait}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onNotice(
                    `Pratinjau — koreksi audio ${item.name} hanya simulasi demo.`,
                  )
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-2.5 py-1.5 text-[10px] font-bold text-white transition-colors hover:bg-brand/85"
              >
                <IconClipboard className="size-3.5" />
                Koreksi
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[10px] leading-4 text-muted">
        Antrean, skor, dan waktu tunggu bersifat ilustratif. Tidak ada audio yang
        diputar, direkam, atau divalidasi.
      </p>
    </section>
  );
}

function BankPanel({ onNotice }: { onNotice: (message: string) => void }) {
  return (
    <section className="rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <IconHistory className="size-[18px] text-brand" />
          <h2 className="text-[15px] font-bold text-ink">
            Bank Soal &amp; Syahadah
          </h2>
        </div>
        <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] font-semibold text-muted">
          Contoh
        </span>
      </header>
      <div className="grid gap-3 sm:grid-cols-3">
        {bankCards.map((card) => {
          const CardIcon = card.icon;
          return (
            <article
              key={card.title}
              className="flex flex-col gap-2 rounded-xl border border-line/70 bg-paper p-4"
            >
              <CardIcon className="size-5 text-brand" />
              <h3 className="text-[12px] font-bold text-ink">{card.title}</h3>
              <p className="text-[11px] font-semibold text-gold">{card.count}</p>
              <p className="text-[11px] leading-4 text-muted">{card.detail}</p>
              <button
                type="button"
                onClick={() =>
                  onNotice(`Pratinjau — ${card.title} hanya contoh demo.`)
                }
                className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[10px] font-bold text-brand hover:underline"
              >
                <IconFileText className="size-3.5" />
                Pratinjau
              </button>
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-[10px] leading-4 text-muted">
        Tidak ada berkas soal, PDF, atau syahadah yang dibuat atau diunduh dari
        halaman demo ini.
      </p>
    </section>
  );
}

function AiBanner({ onNotice }: { onNotice: (message: string) => void }) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-emerald-900/20 bg-emerald-950 p-4 text-sand-50 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5 dark:border-emerald-700/40 dark:bg-emerald-900">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-white/10 text-sand-200">
          <IconSparkles className="size-5" />
        </span>
        <div>
          <h4 className="text-[12px] font-bold">
            Auto-Grading Talaqqi AI v2.4 Tersedia
          </h4>
          <p className="mt-0.5 text-[11px] leading-4 text-sand-200/80">
            Koreksi otomatis artikulasi huruf isti&apos;la &amp; qalqalah dengan
            toleransi dialek regional (Pratinjau).
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() =>
          onNotice(
            "Pratinjau — Jalankan AI Re-Evaluation hanya simulasi demo.",
          )
        }
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-brand/85"
      >
        <IconSparkles className="size-4" />
        Jalankan AI Re-Evaluation
      </button>
    </section>
  );
}

export function StudentExamWorkspace({ rail }: { rail: ReactNode }) {
  const [tab, setTab] = useState<TabId>("students");
  const [filters, setFilters] = useState<Filters>({
    query: "",
    track: "",
    marhalah: "",
    status: "",
  });
  const [selected, setSelected] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const { scheduled } = useScheduleExam();

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const visible = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return students.filter((student) => {
      const matchQuery =
        q.length === 0 ||
        `${student.name} ${student.id} ${student.track} ${student.exam}`
          .toLowerCase()
          .includes(q);
      const matchTrack = !filters.track || student.trackValue === filters.track;
      const matchMarhalah =
        !filters.marhalah || student.marhalahValue === filters.marhalah;
      const matchStatus = !filters.status || student.statusValue === filters.status;
      return matchQuery && matchTrack && matchMarhalah && matchStatus;
    });
  }, [filters]);

  function updateFilter(key: keyof Filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }));
  }

  function toggleSelected(id: string) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <TabBar
          active={tab}
          onChange={setTab}
          sessionCount={8 + scheduled.length}
        />
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <div className="flex flex-col gap-4 xl:col-span-8">
            <FilterToolbar
              filters={filters}
              onChange={updateFilter}
              onNotice={setNotice}
            />
            {tab === "students" ? (
              <StudentDirectory
                rows={visible}
                selected={selected}
                onToggle={toggleSelected}
                onNotice={setNotice}
              />
            ) : null}
            {tab === "sessions" ? <SessionsPanel onNotice={setNotice} /> : null}
            {tab === "queue" ? <QueuePanel onNotice={setNotice} /> : null}
            {tab === "bank" ? <BankPanel onNotice={setNotice} /> : null}
            <AiBanner onNotice={setNotice} />
          </div>
          <aside aria-label="Pantauan ujian langsung" className="xl:col-span-4">
            {rail}
          </aside>
        </div>
      </div>
      {notice ? <DemoToast message={notice} onClose={() => setNotice(null)} /> : null}
    </>
  );
}
