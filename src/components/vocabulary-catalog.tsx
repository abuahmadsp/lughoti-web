"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { useVocabularyLibrary } from "./add-vocabulary-flow";
import {
  VocabularyActionButton,
  type VocabularyEntrySummary,
} from "./vocabulary-actions";
import {
  IconBadgeCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconMore,
  IconRefresh,
  IconSearch,
  IconStar,
  IconVolume,
  IconWaveform,
} from "./icons";

type Track = "fushah" | "amiyah" | "both";
type Filter = "all" | "fushah" | "amiyah" | "saved" | "due";
type Sort = "recent" | "arabic" | "level" | "srs";

type Entry = {
  id: number;
  arabic: string;
  translit: string;
  meaning: string;
  track: Track;
  kind: string;
  note: string;
  mastery: number;
  masteryLabel: string;
  srs: string;
  days: number;
  due: boolean;
  level: number;
  category: string;
  favorite: boolean;
  bar: string;
  labelTone: string;
  isCustom?: boolean;
};

const entries: Entry[] = [
  {
    id: 1,
    arabic: "كِتَابٌ",
    translit: "Kitābun • Level A1",
    meaning: "Buku",
    track: "fushah",
    kind: "Isim (Kata Benda)",
    note: "Bentuk jamak (Taksir): كُتُبٌ (Kutubun).",
    mastery: 98,
    masteryLabel: "Hafal Kuat (98%)",
    srs: "SRS: Ulang dalam 14 hari",
    days: 14,
    due: false,
    level: 1,
    category: "Percakapan Kerja & Formal",
    favorite: true,
    bar: "bg-brand",
    labelTone: "text-brand",
  },
  {
    id: 2,
    arabic: "مَطْعَمٌ",
    translit: "Maṭʿamun • Akar: ط-ع-م",
    meaning: "Restoran / Rumah Makan",
    track: "both",
    kind: "Isim Makan (Tempat)",
    note: "Digunakan identik dalam teks baku dan bahasa jalanan di seluruh jazirah Arab.",
    mastery: 60,
    masteryLabel: "Perlu Review",
    srs: "SRS: Jatuh tempo besok",
    days: 1,
    due: true,
    level: 1,
    category: "Makanan & Restoran",
    favorite: false,
    bar: "bg-sand-400",
    labelTone: "text-sand-700 dark:text-sand-300",
  },
  {
    id: 3,
    arabic: "إِيشْ؟",
    translit: "Ēsh / Aysh • Fushah: مَاذَا",
    meaning: "Apa?",
    track: "amiyah",
    kind: "Najdi & Hijazi",
    note: "Kata tanya paling vital di Arab Saudi. Contoh: “Eysh tebgha?” (Mau apa?).",
    mastery: 100,
    masteryLabel: "Sangat Hafal",
    srs: "SRS: Ulang dalam 21 hari",
    days: 21,
    due: false,
    level: 1,
    category: "Perkenalan & Sapaan",
    favorite: true,
    bar: "bg-emerald-950 dark:bg-emerald-500",
    labelTone: "text-brand",
  },
  {
    id: 4,
    arabic: "شُكْرًا جَزِيلًا",
    translit: "Syukran Jazīlan",
    meaning: "Terima Kasih Banyak",
    track: "fushah",
    kind: "Ungkapan Santun",
    note: "Bentuk apresiasi formal standar. Balasan: عَفْوًا (‘Afwan).",
    mastery: 85,
    masteryLabel: "Hafal (85%)",
    srs: "SRS: Ulang dalam 5 hari",
    days: 5,
    due: false,
    level: 2,
    category: "Perkenalan & Sapaan",
    favorite: false,
    bar: "bg-brand",
    labelTone: "text-brand",
  },
  {
    id: 5,
    arabic: "لَوْ سَمَحْتَ",
    translit: "Law Samaḥta (Pria) / Samaḥti (Wanita)",
    meaning: "Permisi / Tolong",
    track: "both",
    kind: "Etika Kesopanan",
    note: "Ungkapan wajib sebelum menanyakan arah atau memesan sesuatu kepada pelayan.",
    mastery: 45,
    masteryLabel: "Review Hari Ini",
    srs: "SRS: Perlu diuji ulang",
    days: 0,
    due: true,
    level: 2,
    category: "Makanan & Restoran",
    favorite: true,
    bar: "bg-red-500",
    labelTone: "text-red-600 dark:text-red-400",
  },
  {
    id: 6,
    arabic: "حَيَّاكَ اللهُ",
    translit: "Ḥayyākallāh (Semoga Allah menjagamu)",
    meaning: "Selamat Datang",
    track: "amiyah",
    kind: "Doa & Sapaan Hangat",
    note: "Sambutan khas masyarakat Saudi saat menerima tamu di majlis atau toko.",
    mastery: 95,
    masteryLabel: "Hafal Kuat (95%)",
    srs: "SRS: Ulang dalam 12 hari",
    days: 12,
    due: false,
    level: 2,
    category: "Perkenalan & Sapaan",
    favorite: true,
    bar: "bg-brand",
    labelTone: "text-brand",
  },
];

const PAGE_SIZE = 4;

const filters: Array<{ id: Filter; label: string; tone?: string }> = [
  { id: "all", label: "Semua (148)" },
  { id: "fushah", label: "Fushah Baku (94)" },
  { id: "amiyah", label: "Amiyah Saudi (54)" },
  { id: "saved", label: "Tersimpan (18)" },
  {
    id: "due",
    label: "Perlu Diulang Segera (8)",
    tone: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
  },
];

const trackBadge: Record<Track, { label: string; className: string }> = {
  fushah: {
    label: "Fushah",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
  },
  amiyah: {
    label: "Amiyah Saudi",
    className: "bg-sand-200 text-sand-900 dark:bg-sand-300/20 dark:text-sand-200",
  },
  both: {
    label: "Fushah & Amiyah",
    className: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
  },
};

export function VocabularyCatalog() {
  const { customEntries } = useVocabularyLibrary();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<Sort>("recent");
  const [filter, setFilter] = useState<Filter>("all");
  const [favorites, setFavorites] = useState<string[]>(
    entries.filter((entry) => entry.favorite).map((entry) => String(entry.id)),
  );
  const [playing, setPlaying] = useState<number | null>(null);
  const [page, setPage] = useState(1);

  const allEntries = useMemo(
    () => [...customEntries, ...entries],
    [customEntries],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = allEntries.filter((entry) => {
      const matchQuery =
        q.length === 0 ||
        `${entry.arabic} ${entry.translit} ${entry.meaning} ${entry.note} ${entry.kind}`
          .toLowerCase()
          .includes(q);
      const matchCategory =
        category === "all" || entry.category === category;
      const matchFilter =
        filter === "all" ||
        (filter === "fushah" &&
          (entry.track === "fushah" || entry.track === "both")) ||
        (filter === "amiyah" &&
          (entry.track === "amiyah" || entry.track === "both")) ||
        (filter === "saved" && favorites.includes(String(entry.id))) ||
        (filter === "due" && entry.due);
      return matchQuery && matchCategory && matchFilter;
    });

    if (sort === "arabic") {
      result.sort((a, b) => a.arabic.localeCompare(b.arabic, "ar"));
    } else if (sort === "level") {
      result.sort((a, b) => a.level - b.level || a.id - b.id);
    } else if (sort === "srs") {
      result.sort((a, b) => a.days - b.days || a.id - b.id);
    } else {
      result.sort((a, b) => {
        if (a.isCustom !== b.isCustom) return a.isCustom ? -1 : 1;
        return a.id - b.id;
      });
    }
    return result;
  }, [allEntries, category, favorites, filter, query, sort]);

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageEntries = visible.slice(start, start + PAGE_SIZE);

  function toggleFavorite(id: number) {
    const key = String(id);
    setFavorites((current) =>
      current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key],
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center rounded-xl border border-line/70 bg-paper px-3.5 py-2.5 transition-shadow focus-within:ring-2 focus-within:ring-brand/20">
            <IconSearch className="mr-2.5 size-5 shrink-0 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Cari mufrodat, transliterasi, akar kata, atau terjemahan…"
              aria-label="Cari kosakata"
              className="w-full bg-transparent text-[12px] text-ink placeholder:text-muted/70 focus:outline-none"
            />
            <kbd className="hidden shrink-0 rounded bg-line/40 px-1.5 py-0.5 text-[10px] font-semibold text-muted sm:inline">
              ⌘K
            </kbd>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="relative">
              <span className="sr-only">Filter kategori</span>
              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setPage(1);
                }}
                className="cursor-pointer appearance-none rounded-xl border border-line/70 bg-paper py-2.5 pl-3.5 pr-8 text-[12px] font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                <option value="all">Semua Kategori</option>
                <option value="Perkenalan & Sapaan">Perkenalan &amp; Sapaan</option>
                <option value="Makanan & Restoran">Makanan &amp; Restoran</option>
                <option value="Transportasi & Arah">Transportasi &amp; Arah</option>
                <option value="Belanja di Pasar (Suuq)">Belanja di Pasar (Suuq)</option>
                <option value="Percakapan Kerja & Formal">Percakapan Kerja &amp; Formal</option>
              </select>
              <IconChevronDown className="pointer-events-none absolute right-2.5 top-3 size-4 text-muted" />
            </label>
            <label className="relative">
              <span className="sr-only">Urutkan kosakata</span>
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value as Sort);
                  setPage(1);
                }}
                className="cursor-pointer appearance-none rounded-xl border border-line/70 bg-paper py-2.5 pl-3.5 pr-8 text-[12px] font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
              >
                <option value="recent">Terakhir Dipelajari</option>
                <option value="arabic">Abjad Arab (أ - ي)</option>
                <option value="level">Tingkat Kesulitan (A1 - C1)</option>
                <option value="srs">Jadwal SRS Terdekat</option>
              </select>
              <IconRefresh className="pointer-events-none absolute right-2.5 top-3 size-4 text-muted" />
            </label>
          </div>
        </div>

        <div
          role="group"
          aria-label="Filter bank kosakata"
          className="flex items-center gap-2 overflow-x-auto pb-1"
        >
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => {
                setFilter(item.id);
                setPage(1);
              }}
              className={cn(
                "flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-[11px] font-semibold transition-colors",
                filter === item.id
                  ? item.tone ?? "bg-emerald-950 text-white dark:bg-emerald-900"
                  : "bg-paper text-muted hover:bg-line/40 hover:text-ink",
              )}
            >
              {item.id === "due" ? (
                <span aria-hidden="true" className="size-1.5 rounded-full bg-red-500" />
              ) : null}
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-bold text-ink">Bank Kosakata Saya</h2>
        <p className="text-[10px] font-medium text-muted" aria-live="polite">
          {visible.length} entri cocok dari {148 + customEntries.length} total demo
        </p>
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line bg-surface/60 px-6 py-12 text-center">
          <IconSearch className="size-6 text-muted" />
          <p className="text-[12px] font-semibold text-ink">
            Tidak ada kosakata yang cocok
          </p>
          <p className="text-[11px] text-muted">
            Coba kata kunci atau filter lain.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
              setFilter("all");
              setSort("recent");
              setPage(1);
            }}
            className="mt-1 rounded-lg bg-emerald-950 px-3.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {pageEntries.map((entry) => {
            const isSaved = favorites.includes(String(entry.id));
            const track = trackBadge[entry.track];
            return (
              <article
                key={entry.id}
                className="group flex flex-col justify-between rounded-2xl border border-line/70 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span
                        className={cn(
                          "rounded-md px-2.5 py-1 text-[10px] font-semibold",
                          track.className,
                        )}
                      >
                        {track.label}
                      </span>
                      <span className="rounded-md bg-line/40 px-2 py-0.5 text-[10px] text-muted">
                        {entry.kind}
                      </span>
                      {entry.isCustom ? (
                        <span className="rounded-md bg-sand-100 px-2 py-0.5 text-[9px] font-semibold text-sand-800 dark:bg-sand-300/15 dark:text-sand-100">
                          Ditambah sendiri
                        </span>
                      ) : null}
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => toggleFavorite(entry.id)}
                        aria-pressed={isSaved}
                        aria-label={
                          isSaved ? "Hapus dari tersimpan" : "Simpan kosakata"
                        }
                        className={cn(
                          "transition-colors",
                          isSaved
                            ? "text-sand-500"
                            : "text-muted/50 hover:text-sand-500",
                        )}
                      >
                        <IconStar
                          className={cn("size-4", isSaved && "fill-current")}
                        />
                      </button>
                      <VocabularyActionButton
                        action={{
                          kind: "entry-options",
                          entry: {
                            id: entry.id,
                            arabic: entry.arabic,
                            translit: entry.translit,
                            meaning: entry.meaning,
                            kind: entry.kind,
                            note: entry.note,
                          } satisfies VocabularyEntrySummary,
                        }}
                        title={`Buka opsi untuk ${entry.meaning}`}
                        ariaLabel={`Opsi lain untuk ${entry.meaning}`}
                        className="rounded-md p-1 text-muted transition-colors hover:bg-paper hover:text-ink"
                      >
                        <IconMore className="size-4" />
                      </VocabularyActionButton>
                    </div>
                  </div>

                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <div>
                      <h3 className="text-[15px] font-bold text-ink">
                        {entry.meaning}
                      </h3>
                      <p className="text-[11px] font-medium tracking-wide text-brand">
                        {entry.translit}
                      </p>
                    </div>
                    <span
                      lang="ar"
                      dir="rtl"
                      className="font-arabic text-[22px] font-bold text-ink transition-colors group-hover:text-brand"
                    >
                      {entry.arabic}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-muted">
                    {entry.note}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 border-t border-line/60 pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPlaying((current) =>
                          current === entry.id ? null : entry.id,
                        )
                      }
                      aria-pressed={playing === entry.id}
                      aria-label={`Putar pelafalan ${entry.meaning}`}
                      title="Pratinjau — audio belum direkam"
                      className="grid size-8 shrink-0 place-items-center rounded-full bg-paper text-brand transition-colors hover:bg-brand hover:text-white"
                    >
                      {playing === entry.id ? (
                        <IconWaveform className="size-4 animate-eq" />
                      ) : (
                        <IconVolume className="size-4" />
                      )}
                    </button>
                    <div className="flex flex-col">
                      <span
                        className={cn(
                          "flex items-center gap-1 text-[10px] font-bold",
                          entry.labelTone,
                        )}
                      >
                        {entry.due ? (
                          <IconClock className="size-3" />
                        ) : (
                          <IconBadgeCheck className="size-3" />
                        )}
                        {entry.masteryLabel}
                      </span>
                      <span className="text-[10px] text-muted/80">{entry.srs}</span>
                    </div>
                  </div>
                  <div className="h-1.5 w-16 shrink-0 overflow-hidden rounded-full bg-line/50">
                    <div
                      className={cn("h-full rounded-full", entry.bar)}
                      style={{ width: `${entry.mastery}%` }}
                    />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-3 rounded-xl border border-line/70 bg-surface p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] text-muted" aria-live="polite">
          Menampilkan {start + 1}&ndash;{start + pageEntries.length} dari{" "}
          {visible.length} entri demo &mdash; halaman {currentPage} dari{" "}
          {totalPages}
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Halaman sebelumnya"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={currentPage === 1}
            className="grid size-8 place-items-center rounded-lg bg-paper text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <IconChevronLeft className="size-4" />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                aria-current={pageNumber === currentPage ? "page" : undefined}
                onClick={() => setPage(pageNumber)}
                className={cn(
                  "size-8 rounded-lg text-[11px] font-semibold transition-colors",
                  pageNumber === currentPage
                    ? "bg-brand text-white"
                    : "text-ink hover:bg-paper",
                )}
              >
                {pageNumber}
              </button>
            ),
          )}
          <button
            type="button"
            aria-label="Halaman berikutnya"
            onClick={() =>
              setPage((value) => Math.min(totalPages, value + 1))
            }
            disabled={currentPage === totalPages}
            className="grid size-8 place-items-center rounded-lg bg-paper text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <IconChevronRight className="size-4" />
          </button>
        </div>
      </div>
      <p className="text-center text-[10px] text-muted">
        Data demo &mdash; hanya sebagian entri yang dimuat dalam pratinjau.
      </p>
    </div>
  );
}
