"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  useVocabularyLibrary,
  type CustomVocabularyEntry,
} from "./add-vocabulary-flow";
import {
  IconBadgeCheck,
  IconBook,
  IconBrain,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconDownloadDone,
  IconFilterOff,
  IconGrid,
  IconHeadphones,
  IconLightbulb,
  IconList,
  IconMic,
  IconMore,
  IconPencil,
  IconPlay,
  IconRefresh,
  IconSearch,
  IconTimeline,
  IconTree,
  IconTune,
  IconVerifiedUser,
  IconWaveform,
  IconX,
} from "./icons";

type IconType = ComponentType<{ className?: string }>;
type TabId = "bank" | "paths" | "audio" | "srs";
type View = "list" | "grid";
type RetentionTone = "brand" | "gold";

type Filters = {
  query: string;
  track: string;
  category: string;
  marhalah: string;
  audioOnly: boolean;
};

type Entry = {
  id: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  roots: string;
  grammar: string;
  track: string;
  trackValue: "both" | "fushah" | "amiyah";
  category: string;
  categoryValue: "tahiyyah" | "muamalah" | "doa" | "nahwu";
  marhalah: string;
  marhalahValue: "m1" | "m2" | "m3";
  audioDuration: string;
  audioSource: string;
  retention: number;
  interval: string;
  retentionTone: RetentionTone;
  isNew?: boolean;
};

const tabs: {
  id: TabId;
  label: string;
  icon: IconType;
  count: string | null;
  tone: "brand" | "neutral";
}[] = [
  {
    id: "bank",
    label: "Bank Mufrodat & Leksikografi",
    icon: IconBook,
    count: "3.850",
    tone: "brand",
  },
  {
    id: "paths",
    label: "Struktur Jalur & Marhalah",
    icon: IconTimeline,
    count: "18 Level",
    tone: "neutral",
  },
  {
    id: "audio",
    label: "Repositori Audio Native & Tartil",
    icon: IconDownloadDone,
    count: "7.420",
    tone: "neutral",
  },
  {
    id: "srs",
    label: "Konfigurasi Parameter SRS SM-2",
    icon: IconTune,
    count: null,
    tone: "neutral",
  },
];

const entries: Entry[] = [
  {
    id: "LGH-MF-0001",
    arabic: "أَهْلًا وَسَهْلًا",
    transliteration: "ʾahlan wa-sahlan",
    meaning: "Selamat datang / Welcome",
    roots: "أ - ه - ل / س - ه - ل",
    grammar: "Dual-Root Formula",
    track: "Amiyah & Fushah",
    trackValue: "both",
    category: "Tahiyyah & Adab",
    categoryValue: "tahiyyah",
    marhalah: "Marhalah 1",
    marhalahValue: "m1",
    audioDuration: "01.8s",
    audioSource: "Sy. Ahmad (Makkah)",
    retention: 96,
    interval: "4-7 hari",
    retentionTone: "brand",
  },
  {
    id: "LGH-MF-0002",
    arabic: "عَلَى رَاسِي",
    transliteration: "ʿalā rāsī",
    meaning: "Dengan senang hati / At my command",
    roots: "ر - أ - س",
    grammar: "Ism Majrur Majazi",
    track: "Amiyah Hijazi",
    trackValue: "amiyah",
    category: "Muamalah & Adab",
    categoryValue: "muamalah",
    marhalah: "Marhalah 2",
    marhalahValue: "m2",
    audioDuration: "01.7s",
    audioSource: "Syaikh Ahmad",
    retention: 88,
    interval: "3 hari",
    retentionTone: "brand",
  },
  {
    id: "LGH-MF-0003",
    arabic: "يَعْطِيك العَافِيَة",
    transliteration: "yaʿṭīk al-ʿāfiyah",
    meaning: "Semoga Allah memberimu kesehatan",
    roots: "ع - ط - ي / ع - ف - ي",
    grammar: "Fi'il Mudhari' + Maf'ul",
    track: "Amiyah Saudi",
    trackValue: "amiyah",
    category: "Doa & Syukur",
    categoryValue: "doa",
    marhalah: "Marhalah 2",
    marhalahValue: "m2",
    audioDuration: "02.1s",
    audioSource: "Ust. Salman",
    retention: 91,
    interval: "4 hari",
    retentionTone: "brand",
  },
  {
    id: "LGH-MF-0004",
    arabic: "المَفْعُولُ بِهِ",
    transliteration: "al-mafʿūlu bi-hi",
    meaning: "Objek penderita / Direct Object",
    roots: "ف - ع - ل",
    grammar: "Wazan: مَفْعُول",
    track: "Fushah Turots",
    trackValue: "fushah",
    category: "Nahwu & I'rob",
    categoryValue: "nahwu",
    marhalah: "Marhalah 2",
    marhalahValue: "m2",
    audioDuration: "03.2s",
    audioSource: "Skema I'rob Tartil",
    retention: 74,
    interval: "1 hari",
    retentionTone: "gold",
  },
  {
    id: "LGH-MF-0005",
    arabic: "مُبْتَدَأ وَخَبَر",
    transliteration: "mubtadaʾ wa-ḫabar",
    meaning: "Subjek & Predikat Kalimat Ismiyyah",
    roots: "ب - د - أ / خ - ب - ر",
    grammar: "Wazan: مُفْتَعَل / فَعَل",
    track: "Fushah Turots",
    trackValue: "fushah",
    category: "Struktur Kalimat",
    categoryValue: "nahwu",
    marhalah: "Marhalah 1",
    marhalahValue: "m1",
    audioDuration: "02.8s",
    audioSource: "Matan Ajrumiyyah",
    retention: 82,
    interval: "3 hari",
    retentionTone: "brand",
  },
  {
    id: "LGH-MF-0006",
    arabic: "كَمِ الحِسَاب؟",
    transliteration: "kam al-ḥisāb?",
    meaning: "Berapa total harganya? / The bill please",
    roots: "ح - س - ب",
    grammar: "Istifham + Mashdar",
    track: "Amiyah Saudi",
    trackValue: "amiyah",
    category: "Sūq & Belanja",
    categoryValue: "muamalah",
    marhalah: "Marhalah 1",
    marhalahValue: "m1",
    audioDuration: "01.5s",
    audioSource: "Native Riyadh",
    retention: 95,
    interval: "5 hari",
    retentionTone: "brand",
  },
];

const adminTrackLabels: Record<CustomVocabularyEntry["track"], string> = {
  both: "Amiyah & Fushah",
  fushah: "Fushah Turots",
  amiyah: "Amiyah Saudi",
};

function customCategoryValue(category: string): Entry["categoryValue"] {
  if (category.includes("Perkenalan") || category.includes("Sapaan")) {
    return "tahiyyah";
  }
  if (category.includes("Nahwu") || category.includes("I'rob")) return "nahwu";
  if (category.includes("Doa")) return "doa";
  return "muamalah";
}

/** Entries created via the shared demo modal, adapted to the admin bank shape. */
function toBankEntry(custom: CustomVocabularyEntry): Entry {
  const marhalah = Math.min(Math.max(custom.level, 1), 3);
  return {
    id: `LGH-MF-C${custom.id}`,
    arabic: custom.arabic,
    transliteration: custom.translit || "Transliterasi belum diisi",
    meaning: custom.meaning,
    roots: "—",
    grammar: custom.kind,
    track: adminTrackLabels[custom.track],
    trackValue: custom.track,
    category: custom.category,
    categoryValue: customCategoryValue(custom.category),
    marhalah: `Marhalah ${marhalah} (Demo)`,
    marhalahValue: `m${marhalah}` as Entry["marhalahValue"],
    audioDuration: "",
    audioSource: "Belum direkam (Demo)",
    retention: custom.mastery,
    interval: `${custom.days} hari`,
    retentionTone: custom.mastery >= 80 ? "brand" : "gold",
    isNew: true,
  };
}

const trackPillClass: Record<Entry["trackValue"], string> = {
  both: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  amiyah: "bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200",
  fushah: "bg-emerald-950 text-white dark:bg-emerald-800",
};

const pathCards = [
  {
    title: "Fushah Turots & Klasik",
    arabic: "الفُصْحَى التُّرَاثِيَّة",
    icon: IconBook,
    note: "Ajrumiyyah, Nahwu, Shorof, dan Balaghah",
    levels: [
      { name: "Marhalah 1 — Mubtadi'", detail: "Ajrumiyyah & nahwu dasar", count: "240 mufrodat" },
      { name: "Marhalah 2 — Mutawassith", detail: "I'rob & tashrif istilahi", count: "410 mufrodat" },
      { name: "Marhalah 3 — Mutaqaddim", detail: "Tarkib, balaghah, matan", count: "380 mufrodat" },
    ],
  },
  {
    title: "Amiyah Saudi (Hijazi / Najdi)",
    arabic: "العَامِيَّة السَّعُودِيَّة",
    icon: IconTree,
    note: "Hiwar harian, pasar, adab, dan doa",
    levels: [
      { name: "Marhalah 1 — Mubtadi'", detail: "Tahiyyah & percakapan Riyadh", count: "265 mufrodat" },
      { name: "Marhalah 2 — Mutawassith", detail: "Muamalah & hiwar pasar", count: "455 mufrodat" },
      { name: "Marhalah 3 — Mutaqaddim", detail: "Dialek Najdi & ekspresi idiom", count: "390 mufrodat" },
    ],
  },
];

const audioSamples = [
  {
    title: "Matan Al-Ajrumiyyah — Bab I'rab",
    source: "Qari Makkah (Contoh)",
    duration: "03.2s",
    detail: "Tartil makhraj ض - ظ - ع",
  },
  {
    title: "Hiwar Suq Riyadh — Tawar Menawar",
    source: "Native Hijazi (Contoh)",
    duration: "02.6s",
    detail: "Dialek Amiyah Saudi",
  },
  {
    title: "Tashrif Fi'il Tsulatsi Mujarrod",
    source: "Studio Tartil (Pratinjau)",
    duration: "04.1s",
    detail: "Skema shorof terharakat",
  },
  {
    title: "Adab & Doa Keseharian",
    source: "Qari Madinah (Contoh)",
    duration: "02.1s",
    detail: "Doa masuk rumah & perjalanan",
  },
];

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

/** Demo-only action button used by the server-rendered page header and rail. */
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
      <button type="button" title={title} onClick={() => setMessage(notice)} className={className}>
        {children}
      </button>
      {message ? <DemoToast message={message} onClose={() => setMessage(null)} /> : null}
    </>
  );
}

function TabBar({
  active,
  onChange,
  bankCount,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
  bankCount: number;
}) {
  return (
    <div className="flex items-center justify-between gap-3 overflow-x-auto rounded-2xl border border-line/70 bg-surface p-1.5 shadow-sm">
      <div className="flex min-w-max items-center gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          const count =
            tab.id === "bank"
              ? (3850 + bankCount).toLocaleString("id-ID")
              : tab.count;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-semibold transition-colors",
                isActive
                  ? "bg-emerald-950 text-white shadow-sm dark:bg-emerald-900"
                  : "text-muted hover:bg-paper hover:text-ink",
              )}
            >
              <Icon className="size-4" />
              <span>{tab.label}</span>
              {count ? (
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[10px] font-bold",
                    isActive
                      ? "bg-brand text-white"
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
      <span className="hidden shrink-0 items-center gap-1.5 px-2 text-[10px] font-semibold text-muted lg:inline-flex">
        <span className="size-2 rounded-full bg-brand animate-pulse-dot" />
        Auto-sync Leksikon: Aktif
      </span>
    </div>
  );
}

function FilterToolbar({
  filters,
  onQueryChange,
  onTrackChange,
  onCategoryChange,
  onMarhalahChange,
  onAudioOnlyChange,
  onReset,
}: {
  filters: Filters;
  onQueryChange: (value: string) => void;
  onTrackChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onMarhalahChange: (value: string) => void;
  onAudioOnlyChange: (value: boolean) => void;
  onReset: () => void;
}) {
  const selectClass =
    "h-10 cursor-pointer rounded-xl border border-line/70 bg-paper pl-3 pr-8 text-[11px] font-semibold text-ink focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-3 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-md">
        <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-muted" />
        <input
          type="search"
          value={filters.query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Cari mufrodat arab, terjemahan, akar kata (جذر), atau ID kosakata…"
          aria-label="Cari mufrodat dalam bank data contoh"
          className="h-10 w-full rounded-xl border border-line/70 bg-paper pl-10 pr-3 text-[11px] text-ink placeholder:text-muted/70 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative">
          <select
            aria-label="Filter jalur dialek"
            value={filters.track}
            onChange={(event) => onTrackChange(event.target.value)}
            className={selectClass}
          >
            <option value="">Semua Jalur (Fushah &amp; Amiyah)</option>
            <option value="fushah">Fushah Turots &amp; Klasik</option>
            <option value="amiyah">Amiyah Saudi (Hijazi / Najdi)</option>
            <option value="both">Amiyah &amp; Fushah</option>
          </select>
          <IconChevronRight className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 rotate-90 text-muted" />
        </div>
        <div className="relative">
          <select
            aria-label="Filter kategori tematik"
            value={filters.category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className={selectClass}
          >
            <option value="">Semua Kategori</option>
            <option value="tahiyyah">Tahiyyah &amp; Ta&apos;aruf</option>
            <option value="nahwu">Nahwu &amp; I&apos;rob Shorof</option>
            <option value="muamalah">Muamalah &amp; Percakapan Pasar</option>
            <option value="doa">Adab &amp; Doa Keseharian</option>
          </select>
          <IconChevronRight className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 rotate-90 text-muted" />
        </div>
        <div className="relative">
          <select
            aria-label="Filter marhalah tingkat"
            value={filters.marhalah}
            onChange={(event) => onMarhalahChange(event.target.value)}
            className={selectClass}
          >
            <option value="">Semua Marhalah</option>
            <option value="m1">Marhalah 1 (Mubtadi&apos; - A1)</option>
            <option value="m2">Marhalah 2 (Mutawassith - A2/B1)</option>
            <option value="m3">Marhalah 3 (Mutaqaddim - B2/C1)</option>
          </select>
          <IconChevronRight className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 rotate-90 text-muted" />
        </div>
        <button
          type="button"
          aria-pressed={filters.audioOnly}
          onClick={() => onAudioOnlyChange(!filters.audioOnly)}
          className={cn(
            "inline-flex h-10 items-center gap-1.5 rounded-xl border px-3 text-[11px] font-semibold transition-colors",
            filters.audioOnly
              ? "border-brand/40 bg-emerald-950 text-white dark:bg-emerald-900"
              : "border-line/70 bg-paper text-ink hover:bg-line/30",
          )}
        >
          <IconVerifiedUser className="size-4 text-brand" />
          Audio Lengkap
        </button>
        <button
          type="button"
          onClick={onReset}
          aria-label="Reset filter pencarian"
          title="Reset filter"
          className="grid size-10 place-items-center rounded-xl border border-line/70 bg-paper text-muted transition-colors hover:bg-line/30 hover:text-ink"
        >
          <IconFilterOff className="size-[18px]" />
        </button>
      </div>
    </section>
  );
}

function AudioPreview({
  duration,
  onNotice,
  compact = false,
}: {
  duration: string;
  onNotice: (message: string) => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() =>
        onNotice("Pratinjau — audio tartil belum direkam, tidak ada berkas yang diputar.")
      }
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-paper font-semibold text-ink transition-colors hover:bg-emerald-100 hover:text-emerald-900 dark:hover:bg-emerald-900/40 dark:hover:text-emerald-100",
        compact ? "px-2 py-1 text-[10px]" : "px-2.5 py-1 text-[11px]",
      )}
    >
      <IconPlay className="size-3.5 text-brand" />
      <span className="font-mono">{duration || "—"}</span>
    </button>
  );
}

function RetentionBar({ entry }: { entry: Entry }) {
  const tone =
    entry.retentionTone === "gold" ? "bg-gold" : "bg-brand";
  const text =
    entry.retentionTone === "gold" ? "text-gold" : "text-brand";
  return (
    <div className="flex w-24 flex-col gap-1">
      <div className="flex items-center justify-between text-[10px]">
        <span className={cn("font-bold", text)}>{entry.retention}%</span>
        <span className="text-muted">{entry.interval}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-line/60">
        <div
          className={cn("h-full rounded-full", tone)}
          style={{ width: `${entry.retention}%` }}
        />
      </div>
    </div>
  );
}

type Explanation = {
  summary: string;
  sections: Array<{ label: string; body: string }>;
  exampleArabic: string;
  exampleTranslit: string;
  exampleMeaning: string;
};

const categoryContext: Record<Entry["categoryValue"], string> = {
  tahiyyah:
    "Biasa dipakai saat menyapa, menyambut tamu, atau menutup percakapan dengan sopan.",
  muamalah:
    "Muncul dalam percakapan pasar, tawar-menawar, dan pertanyaan tentang harga atau tagihan.",
  doa: "Dipakai sebagai doa atau ungkapan syukur dalam interaksi sehari-hari.",
  nahwu:
    "Dipakai untuk menjelaskan kedudukan kata, wazan, atau pola kalimat dalam pembelajaran nahwu dan shorof.",
};

const categoryExamples: Record<
  Entry["categoryValue"],
  Pick<Explanation, "exampleArabic" | "exampleTranslit" | "exampleMeaning">
> = {
  tahiyyah: {
    exampleArabic: "أَهْلًا وَسَهْلًا، تَفَضَّلْ.",
    exampleTranslit: "ʾahlan wa-sahlan, tafaḍḍal.",
    exampleMeaning: "Selamat datang, silakan masuk.",
  },
  muamalah: {
    exampleArabic: "كَمِ الحِسَاب؟",
    exampleTranslit: "kam al-ḥisāb?",
    exampleMeaning: "Berapa total tagihannya?",
  },
  doa: {
    exampleArabic: "يَعْطِيك العَافِيَة.",
    exampleTranslit: "yaʿṭīk al-ʿāfiyah.",
    exampleMeaning: "Semoga Allah memberimu kesehatan.",
  },
  nahwu: {
    exampleArabic: "المَفْعُولُ بِهِ مَنْصُوبٌ.",
    exampleTranslit: "al-mafʿūlu bi-hi manṣūbun.",
    exampleMeaning: "Objek penderita berkedudukan mansub.",
  },
};

function explanationFor(entry: Entry): Explanation {
  const trackNote =
    entry.trackValue === "amiyah"
      ? "Pada jalur Amiyah, pelafalan mengikuti kebiasaan percakapan Saudi dan dapat berbeda antara Hijaz dan Najd."
      : entry.trackValue === "both"
        ? "Entri ini dipakai di dua jalur: Fushah untuk konteks formal dan Amiyah untuk percakapan sehari-hari."
        : "Pada jalur Fushah, perhatikan harokat dan kedudukan i'rab ketika membaca.";
  const rootNote =
    entry.roots === "—"
      ? "Entri buatan tidak memiliki akar terverifikasi, sehingga pembahasan difokuskan pada makna dan pemakaian kalimat."
      : `Akar ${entry.roots} menjadi patokan mencari bentuk turunan. Pola ${entry.grammar} menjelaskan kedudukan kata dalam kalimat.`;

  return {
    summary: `${entry.meaning}. Entri ${entry.id} tercatat di ${entry.marhalah} pada kategori ${entry.category}.`,
    sections: [
      { label: "Akar & struktur", body: rootNote },
      {
        label: "Konteks penggunaan",
        body: `${categoryContext[entry.categoryValue]} ${trackNote}`,
      },
      {
        label: "Catatan hafalan",
        body: `Data contoh menunjukkan retensi ${entry.retention}% dengan interval ${entry.interval}. Angka ini ilustratif dan tidak berasal dari progres santri sungguhan.`,
      },
    ],
    ...categoryExamples[entry.categoryValue],
  };
}

function useDialogBehavior(onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return dialogRef;
}

function ExplanationDialog({
  entry,
  onClose,
}: {
  entry: Entry;
  onClose: () => void;
}) {
  const dialogRef = useDialogBehavior(onClose);
  const explanation = explanationFor(entry);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-emerald-950/65 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mufrodat-explanation-title"
        aria-describedby="mufrodat-explanation-desc"
        className="animate-flow-in relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-line/70 bg-paper shadow-2xl outline-none"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line/70 bg-surface px-5 py-4">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
                <IconBook className="size-4" />
              </span>
              <h2
                id="mufrodat-explanation-title"
                className="text-[15px] font-bold text-ink"
              >
                Pembahasan Mufrodat
              </h2>
              <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
                Pratinjau
              </span>
            </div>
            <p id="mufrodat-explanation-desc" className="text-[10px] text-muted">
              Ringkasan ilustratif untuk entri contoh, bukan kamus atau data terverifikasi.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pembahasan"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-line/70 text-muted transition-colors hover:bg-line/30 hover:text-ink"
          >
            <IconX className="size-4" />
          </button>
        </header>

        <div className="max-h-[calc(100dvh-13rem)] overflow-y-auto p-5">
          <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border border-line/70 bg-surface p-3">
            <div className="min-w-0">
              <p lang="ar" dir="rtl" className="font-arabic text-[24px] font-bold leading-loose text-brand">
                {entry.arabic}
              </p>
              <p className="font-mono text-[11px] font-semibold text-ink">
                {entry.transliteration}
              </p>
              <p className="mt-0.5 text-[11px] text-muted">{entry.meaning}</p>
            </div>
            <span className="rounded bg-paper px-2 py-1 font-mono text-[10px] text-muted">
              {entry.id}
            </span>
          </div>

          <p className="mt-3 text-[11px] leading-5 text-muted">
            {explanation.summary}
          </p>

          <div className="mt-3 flex flex-col gap-2">
            {explanation.sections.map((section) => (
              <section
                key={section.label}
                className="rounded-xl border border-line/70 bg-surface p-3"
              >
                <h3 className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
                  <IconLightbulb className="size-3.5 text-brand" />
                  {section.label}
                </h3>
                <p className="mt-1 text-[11px] leading-5 text-muted">
                  {section.body}
                </p>
              </section>
            ))}
          </div>

          <section className="mt-3 rounded-xl bg-emerald-950 p-4 text-sand-50 dark:bg-emerald-900">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
              Contoh kalimat
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="mt-1 font-arabic text-[19px] font-bold leading-loose"
            >
              {explanation.exampleArabic}
            </p>
            <p className="mt-1 font-mono text-[10px] text-sand-200">
              {explanation.exampleTranslit}
            </p>
            <p className="mt-0.5 text-[11px] text-emerald-50/90">
              {explanation.exampleMeaning}
            </p>
          </section>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 bg-surface px-5 py-4">
          <p className="text-[10px] leading-4 text-muted">
            Contoh — pembahasan ini hanya pratinjau, tanpa analisis AI atau data
            tersimpan.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-emerald-950 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          >
            Tutup Pembahasan
          </button>
        </footer>
      </div>
    </div>
  );
}

function CatalogPanel({
  rows,
  totalCount,
  view,
  onViewChange,
  onNotice,
  onPreview,
}: {
  rows: Entry[];
  totalCount: number;
  view: View;
  onViewChange: (view: View) => void;
  onNotice: (message: string) => void;
  onPreview: (entry: Entry) => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-line/70 bg-surface shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line/70 bg-paper/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <h2 className="text-[14px] font-bold text-ink">Katalog Mufrodat Aktif</h2>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Tampil {rows.length} Entri
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            aria-label="Tampilan grid kartu"
            aria-pressed={view === "grid"}
            className={cn(
              "grid size-8 place-items-center rounded-lg transition-colors",
              view === "grid"
                ? "bg-surface text-brand shadow-sm"
                : "text-muted hover:bg-line/30",
            )}
          >
            <IconGrid className="size-[18px]" />
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            aria-label="Tampilan tabel berbaris"
            aria-pressed={view === "list"}
            className={cn(
              "grid size-8 place-items-center rounded-lg transition-colors",
              view === "list"
                ? "bg-surface text-brand shadow-sm"
                : "text-muted hover:bg-line/30",
            )}
          >
            <IconList className="size-[18px]" />
          </button>
        </div>
      </header>

      {view === "list" ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] border-collapse text-left">
            <thead className="bg-paper text-[10px] uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-semibold">Mufrodat &amp; Harokat</th>
                <th className="px-3 py-3 font-semibold">Akar &amp; Wazan (الجذر)</th>
                <th className="px-3 py-3 font-semibold">Jalur &amp; Kategori</th>
                <th className="px-3 py-3 font-semibold">Marhalah</th>
                <th className="px-3 py-3 text-center font-semibold">Audio Tartil</th>
                <th className="px-3 py-3 font-semibold">Retensi SRS</th>
                <th className="px-4 py-3 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/70 text-[11px] text-ink">
              {rows.map((entry) => (
                <tr key={entry.id} className="transition-colors hover:bg-paper/70">
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span
                          lang="ar"
                          dir="rtl"
                          className="font-arabic text-[18px] font-bold leading-tight text-ink"
                        >
                          {entry.arabic}
                        </span>
                        <span className="text-[14px] leading-none text-gold">•</span>
                      </div>
                      <span className="font-mono text-[10px] tracking-wide text-muted">
                        {entry.transliteration}
                      </span>
                      <span className="text-[10px] italic text-muted">{entry.meaning}</span>
                      {entry.isNew ? (
                        <span className="w-fit rounded bg-sand-100 px-1.5 py-0.5 text-[9px] font-bold text-sand-800 dark:bg-sand-300/20 dark:text-sand-100">
                          Ditambah (Demo)
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <span
                        lang="ar"
                        dir="rtl"
                        className="font-arabic text-[13px] font-semibold text-brand"
                      >
                        {entry.roots}
                      </span>
                      <span className="text-[10px] text-muted">{entry.grammar}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex flex-col items-start gap-1">
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[10px] font-bold",
                          trackPillClass[entry.trackValue],
                        )}
                      >
                        {entry.track}
                      </span>
                      <span className="text-[10px] text-muted">{entry.category}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3.5">
                    <span className="text-[11px] font-bold text-ink">{entry.marhalah}</span>
                    <span className="mt-0.5 block text-[10px] text-muted">{entry.id}</span>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <AudioPreview duration={entry.audioDuration} onNotice={onNotice} />
                    <span className="mt-1 block text-[9px] text-muted">{entry.audioSource}</span>
                  </td>
                  <td className="px-3 py-3.5">
                    <RetentionBar entry={entry} />
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        title="Lihat pratinjau pembahasan"
                        aria-label={`Pembahasan ${entry.arabic}`}
                        onClick={() => onPreview(entry)}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2 py-1.5 text-[10px] font-bold text-brand transition-colors hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50"
                      >
                        <IconBook className="size-3.5" />
                        Pembahasan
                      </button>
                      <button
                        type="button"
                        title="Edit data (demo)"
                        aria-label={`Edit ${entry.arabic}`}
                        onClick={() =>
                          onNotice(`Pratinjau — edit ${entry.arabic} hanya simulasi demo.`)
                        }
                        className="grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-line/30 hover:text-brand"
                      >
                        <IconPencil className="size-4" />
                      </button>
                      <button
                        type="button"
                        title="Analisis fonetik AI (demo)"
                        aria-label={`Analisis fonetik ${entry.arabic}`}
                        onClick={() =>
                          onNotice(
                            `Pratinjau — analisis fonetik ${entry.arabic} hanya simulasi demo.`,
                          )
                        }
                        className="grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-line/30 hover:text-brand"
                      >
                        <IconWaveform className="size-4" />
                      </button>
                      <button
                        type="button"
                        title="Opsi lainnya (demo)"
                        aria-label={`Opsi lainnya untuk ${entry.arabic}`}
                        onClick={() =>
                          onNotice("Pratinjau — menu opsi lanjutan hanya simulasi demo.")
                        }
                        className="grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-line/30 hover:text-ink"
                      >
                        <IconMore className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-[12px] text-muted">
                    Tidak ada entri contoh yang cocok dengan filter ini.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-3">
          {rows.map((entry) => (
            <article key={entry.id} className="flex flex-col gap-3 rounded-xl border border-line/70 bg-paper p-3">
              <div className="flex items-start justify-between gap-2">
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-[20px] font-bold leading-tight text-ink"
                >
                  {entry.arabic}
                </span>
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-[9px] font-bold",
                    trackPillClass[entry.trackValue],
                  )}
                >
                  {entry.track}
                </span>
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-wide text-muted">
                  {entry.transliteration}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold text-ink">{entry.meaning}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] text-muted">
                <span className="rounded bg-surface px-1.5 py-0.5">{entry.marhalah}</span>
                <span className="rounded bg-surface px-1.5 py-0.5">{entry.category}</span>
                {entry.isNew ? (
                  <span className="rounded bg-sand-100 px-1.5 py-0.5 text-[9px] font-bold text-sand-800 dark:bg-sand-300/20 dark:text-sand-100">
                    Ditambah (Demo)
                  </span>
                ) : null}
              </div>
              <div className="flex items-center justify-between gap-2">
                <AudioPreview duration={entry.audioDuration} onNotice={onNotice} compact />
                <RetentionBar entry={entry} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onPreview(entry)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 py-1.5 text-[10px] font-bold text-brand transition-colors hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50"
                >
                  <IconBook className="size-3.5" />
                  Pembahasan
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onNotice(`Pratinjau — edit ${entry.arabic} hanya simulasi demo.`)
                  }
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-line/70 bg-surface py-1.5 text-[10px] font-bold text-ink transition-colors hover:bg-line/30"
                >
                  <IconPencil className="size-3.5" />
                  Edit entri
                </button>
              </div>
            </article>
          ))}
          {rows.length === 0 ? (
            <p className="col-span-full py-10 text-center text-[12px] text-muted">
              Tidak ada entri contoh yang cocok dengan filter ini.
            </p>
          ) : null}
        </div>
      )}

      <footer className="flex flex-col gap-3 border-t border-line/70 bg-paper/40 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-muted">
          Menampilkan <span className="font-bold text-ink">1 - {rows.length}</span> dari{" "}
          <span className="font-bold text-ink">{totalCount.toLocaleString("id-ID")}</span>{" "}
          mufrodat <span className="font-bold text-brand">contoh</span>
        </p>
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            disabled
            aria-label="Halaman sebelumnya"
            className="grid size-8 place-items-center rounded-lg bg-surface text-muted opacity-50"
          >
            <IconChevronLeft className="size-4" />
          </button>
          {["1", "2", "3"].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onNotice(`Pratinjau — halaman ${page} tidak tersedia dalam demo.`)}
              className={cn(
                "size-8 rounded-lg text-[11px] font-bold transition-colors",
                page === "1"
                  ? "bg-emerald-950 text-white dark:bg-emerald-900"
                  : "text-ink hover:bg-line/30",
              )}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-muted">…</span>
          <button
            type="button"
            onClick={() => onNotice("Pratinjau — halaman 642 tidak tersedia dalam demo.")}
            className="size-9 rounded-lg text-[11px] font-bold text-ink transition-colors hover:bg-line/30"
          >
            642
          </button>
          <button
            type="button"
            aria-label="Halaman berikutnya"
            onClick={() => onNotice("Pratinjau — halaman berikutnya tidak tersedia dalam demo.")}
            className="grid size-8 place-items-center rounded-lg bg-surface text-ink transition-colors hover:bg-line/30"
          >
            <IconChevronRight className="size-4" />
          </button>
        </div>
      </footer>
    </section>
  );
}

function RootDerivationNote() {
  return (
    <section className="flex items-start gap-3 rounded-2xl border border-line/70 bg-paper/80 p-4">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-brand shadow-sm">
        <IconLightbulb className="size-5" />
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[12px] font-bold text-ink">
            Integrasi Sistem Akar Kata
          </h3>
          <span
            lang="ar"
            dir="rtl"
            className="font-arabic text-[13px] font-semibold text-brand"
          >
            نِظَام الجُذُور العَرَبِيَّة
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-5 text-muted">
          Setiap entri contoh dihubungkan ke akar trilateral (ثلاثي) atau kuadrilateral
          (رباعي). Rekomendasi kata turunan dan skema wazan SM-2 di panel ini adalah
          ilustrasi; belum ada penghitungan kognitif atau penyimpanan data sungguhan.
        </p>
      </div>
    </section>
  );
}

function PathPanel({ onNotice }: { onNotice: (message: string) => void }) {
  return (
    <section className="rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-[15px] font-bold text-ink">Struktur Jalur &amp; Marhalah</h2>
          <p className="mt-0.5 text-[11px] text-muted">
            18 tingkat contoh pada dua jalur; pratinjau silabus, bukan data kurikulum final.
          </p>
        </div>
        <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] font-bold text-muted">
          Contoh
        </span>
      </header>
      <div className="grid gap-4 lg:grid-cols-2">
        {pathCards.map((track) => {
          const Icon = track.icon;
          return (
            <article key={track.title} className="rounded-xl border border-line/70 bg-paper p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Icon className="size-[18px] text-brand" />
                    <h3 className="text-[13px] font-bold text-ink">{track.title}</h3>
                  </div>
                  <span
                    lang="ar"
                    dir="rtl"
                    className="mt-1 block font-arabic text-[13px] text-brand"
                  >
                    {track.arabic}
                  </span>
                </div>
                <IconBadgeCheck className="size-[18px] text-gold" />
              </div>
              <p className="mt-2 text-[10px] text-muted">{track.note}</p>
              <div className="mt-3 flex flex-col gap-2">
                {track.levels.map((level) => (
                  <div
                    key={level.name}
                    className="flex items-center justify-between gap-2 rounded-lg border border-line/60 bg-surface px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-bold text-ink">{level.name}</p>
                      <p className="truncate text-[10px] text-muted">{level.detail}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onNotice(`Pratinjau — silabus ${level.name} hanya simulasi demo.`)
                      }
                      className="shrink-0 text-[10px] font-bold text-brand hover:underline"
                    >
                      {level.count}
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  onNotice(`Pratinjau — struktur ${track.title} hanya simulasi demo.`)
                }
                className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold text-brand hover:underline"
              >
                <IconTree className="size-3.5" />
                Lihat peta marhalah lengkap
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function AudioPanel({ onNotice }: { onNotice: (message: string) => void }) {
  return (
    <section className="rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-[15px] font-bold text-ink">Repositori Audio Native &amp; Tartil</h2>
          <p className="mt-0.5 text-[11px] text-muted">
            Daftar berkas contoh; audio belum direkam sehingga tombol putar hanya pratinjau.
          </p>
        </div>
        <span className="rounded-full bg-sand-100 px-2.5 py-1 text-[10px] font-bold text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
          Pratinjau
        </span>
      </header>
      <div className="grid gap-3 sm:grid-cols-2">
        {audioSamples.map((sample) => (
          <article key={sample.title} className="flex gap-3 rounded-xl border border-line/70 bg-paper p-3">
            <button
              type="button"
              aria-label={`Putar pratinjau ${sample.title}`}
              onClick={() =>
                onNotice(`Pratinjau — audio "${sample.title}" belum tersedia.`)
              }
              className="grid size-10 shrink-0 place-items-center rounded-lg bg-emerald-950 text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900"
            >
              <IconPlay className="size-4" />
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <h3 className="truncate text-[11px] font-bold text-ink">{sample.title}</h3>
                <span className="font-mono text-[10px] text-brand">{sample.duration}</span>
              </div>
              <p className="mt-0.5 truncate text-[10px] text-muted">{sample.detail}</p>
              <div className="mt-1 flex items-center justify-between gap-2 text-[10px] text-muted">
                <span className="inline-flex items-center gap-1">
                  <IconMic className="size-3" />
                  {sample.source}
                </span>
                <IconHeadphones className="size-3.5 text-brand" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function SrsPanel({ onNotice }: { onNotice: (message: string) => void }) {
  const [interval, setInterval] = useState(24);
  const [multiplier, setMultiplier] = useState(245);
  const [retention, setRetention] = useState(92);

  return (
    <section className="rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-[15px] font-bold text-ink">Konfigurasi Parameter SRS SM-2</h2>
          <p className="mt-0.5 text-[11px] text-muted">
            Kalibrasi ilustratif; perubahan hanya tersimpan di tampilan sampai halaman dimuat ulang.
          </p>
        </div>
        <span className="rounded-full bg-paper px-2.5 py-1 text-[10px] font-bold text-muted">
          Contoh
        </span>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "Interval retensi rata-rata",
            value: `${interval} hari`,
            min: 7,
            max: 45,
            state: interval,
            set: setInterval,
          },
          {
            label: "Faktor pengali SM-2",
            value: (multiplier / 100).toFixed(2),
            min: 230,
            max: 260,
            state: multiplier,
            set: setMultiplier,
          },
          {
            label: "Target daya ingat",
            value: `${retention}%`,
            min: 80,
            max: 98,
            state: retention,
            set: setRetention,
          },
        ].map((field) => (
          <label key={field.label} className="flex flex-col gap-2 rounded-xl border border-line/70 bg-paper p-3">
            <span className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold text-ink">{field.label}</span>
              <span className="font-mono text-[11px] font-bold text-brand">{field.value}</span>
            </span>
            <input
              type="range"
              min={field.min}
              max={field.max}
              value={field.state}
              onChange={(event) => field.set(Number(event.target.value))}
              className="accent-brand"
              aria-label={field.label}
            />
          </label>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-4">
        <p className="flex items-center gap-1.5 text-[10px] text-muted">
          <IconBrain className="size-3.5 text-brand" />
          Tidak ada algoritma sungguhan yang dijalankan di halaman demo ini.
        </p>
        <button
          type="button"
          onClick={() =>
            onNotice("Pratinjau — Simpan Kalibrasi tidak menulis data apa pun.")
          }
          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-950 px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900"
        >
          <IconRefresh className="size-4" />
          Simpan Kalibrasi (Demo)
        </button>
      </div>
    </section>
  );
}

export function MufrodatWorkspace({ rail }: { rail: ReactNode }) {
  const [tab, setTab] = useState<TabId>("bank");
  const [view, setView] = useState<View>("list");
  const [filters, setFilters] = useState<Filters>({
    query: "",
    track: "",
    category: "",
    marhalah: "",
    audioOnly: false,
  });
  const [notice, setNotice] = useState<string | null>(null);
  const [previewEntry, setPreviewEntry] = useState<Entry | null>(null);
  const { customEntries } = useVocabularyLibrary();

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const allEntries = useMemo(
    () => [...customEntries.map(toBankEntry), ...entries],
    [customEntries],
  );

  const visible = useMemo(() => {
    const query = filters.query.trim().toLowerCase();
    return allEntries.filter((entry) => {
      const haystack = `${entry.arabic} ${entry.transliteration} ${entry.meaning} ${entry.roots} ${entry.id}`.toLowerCase();
      return (
        (!query || haystack.includes(query)) &&
        (!filters.track || entry.trackValue === filters.track) &&
        (!filters.category || entry.categoryValue === filters.category) &&
        (!filters.marhalah || entry.marhalahValue === filters.marhalah) &&
        (!filters.audioOnly || Boolean(entry.audioDuration))
      );
    });
  }, [allEntries, filters]);

  function resetFilters() {
    setFilters({ query: "", track: "", category: "", marhalah: "", audioOnly: false });
    setNotice("Pratinjau — semua filter dikembalikan ke keadaan awal demo.");
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <TabBar active={tab} onChange={setTab} bankCount={customEntries.length} />
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
          <div className="flex flex-col gap-4 xl:col-span-8">
            {tab === "bank" ? (
              <>
                <FilterToolbar
                  filters={filters}
                  onQueryChange={(query) => setFilters((current) => ({ ...current, query }))}
                  onTrackChange={(track) => setFilters((current) => ({ ...current, track }))}
                  onCategoryChange={(category) =>
                    setFilters((current) => ({ ...current, category }))
                  }
                  onMarhalahChange={(marhalah) =>
                    setFilters((current) => ({ ...current, marhalah }))
                  }
                  onAudioOnlyChange={(audioOnly) =>
                    setFilters((current) => ({ ...current, audioOnly }))
                  }
                  onReset={resetFilters}
                />
                <CatalogPanel
                  rows={visible}
                  totalCount={3850 + customEntries.length}
                  view={view}
                  onViewChange={setView}
                  onNotice={setNotice}
                  onPreview={setPreviewEntry}
                />
                <RootDerivationNote />
              </>
            ) : null}
            {tab === "paths" ? <PathPanel onNotice={setNotice} /> : null}
            {tab === "audio" ? <AudioPanel onNotice={setNotice} /> : null}
            {tab === "srs" ? <SrsPanel onNotice={setNotice} /> : null}
          </div>
          <aside aria-label="Analitik dan audit kurikulum" className="xl:col-span-4">
            {rail}
          </aside>
        </div>
      </div>
      {previewEntry ? (
        <ExplanationDialog
          entry={previewEntry}
          onClose={() => setPreviewEntry(null)}
        />
      ) : null}
      {notice ? <DemoToast message={notice} onClose={() => setNotice(null)} /> : null}
    </>
  );
}
