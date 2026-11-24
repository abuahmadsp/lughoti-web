"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import {
  MaterialsActionButton,
  type ModuleSummary,
} from "./materials-actions";
import {
  IconAward,
  IconBook,
  IconCards,
  IconChat,
  IconCheck,
  IconClipboard,
  IconClock,
  IconHeadphones,
  IconLayers,
  IconLock,
  IconMic,
  IconPlay,
  IconRefresh,
  IconSearch,
  IconSparkles,
  IconVideo,
} from "./icons";

type Track = "fushah" | "amiyah" | "vip";
type Category = "nahwu" | "hiwar" | "mujam" | "latihan";
type Status = "completed" | "in-progress" | "locked";
type StatusFilter = "all" | Status;
type SortKey = "order" | "progress" | "duration";

type MetaKey =
  | "video"
  | "quiz"
  | "audio"
  | "talaqqi"
  | "pdf"
  | "clock"
  | "book"
  | "score"
  | "chat"
  | "mic"
  | "cert"
  | "cards";

type ModuleItem = {
  id: number;
  track: Track;
  category: Category;
  status: Status;
  arabic: string;
  title: string;
  description: string;
  meta: Array<{ icon: MetaKey; label: string; highlight?: boolean }>;
  progress: number;
  duration: number;
  statusLabel?: string;
};

const metaIcons: Record<MetaKey, typeof IconPlay> = {
  video: IconVideo,
  quiz: IconClipboard,
  audio: IconHeadphones,
  talaqqi: IconHeadphones,
  pdf: IconBook,
  clock: IconClock,
  book: IconBook,
  score: IconSparkles,
  chat: IconChat,
  mic: IconMic,
  cert: IconAward,
  cards: IconCards,
};

const modules: ModuleItem[] = [
  {
    id: 1,
    track: "fushah",
    category: "nahwu",
    status: "completed",
    arabic: "أَقْسَامُ الكَلِمَةِ",
    title: "Pengenalan Isim, Fi'il, & Huruf",
    description:
      "Membedakan tanda khas isim (tanwin, alif lam, khofadh) dan ciri kata kerja bahasa Arab.",
    meta: [
      { icon: "video", label: "4 Video" },
      { icon: "quiz", label: "2 Kuis" },
      { icon: "score", label: "98%", highlight: true },
    ],
    progress: 100,
    duration: 90,
  },
  {
    id: 2,
    track: "fushah",
    category: "nahwu",
    status: "completed",
    arabic: "المُبْتَدَأُ وَالخَبَرُ",
    title: "Mubtada' dan Khobar",
    description:
      "Struktur dasar kalimat nominal (Jumlah Ismiyyah), hukum rofa', dan keselarasan jender.",
    meta: [
      { icon: "video", label: "6 Video" },
      { icon: "quiz", label: "3 Kuis" },
      { icon: "score", label: "95%", highlight: true },
    ],
    progress: 100,
    duration: 110,
  },
  {
    id: 3,
    track: "fushah",
    category: "nahwu",
    status: "completed",
    arabic: "الفَاعِلُ وَأَنْوَاعُ الضَّمَائِرِ",
    title: "Fa'il dan Pembagian Dhomir",
    description:
      "Subjek pelaku, jenis dhomir bariz muttashil, munfashil, dan mustatir dalam kalimat fi'liyyah.",
    meta: [
      { icon: "video", label: "5 Video" },
      { icon: "talaqqi", label: "Talaqqi" },
      { icon: "score", label: "92%", highlight: true },
    ],
    progress: 100,
    duration: 95,
  },
  {
    id: 4,
    track: "fushah",
    category: "nahwu",
    status: "in-progress",
    arabic: "المَفْعُولُ بِهِ",
    title: "Al-Maf'ul Bih",
    description:
      "Bedah i'rab nashob dengan harakat zhahirah dan muqaddarah, plus dhomir maf'ul muttashil.",
    meta: [
      { icon: "clock", label: "1j 20m" },
      { icon: "book", label: "5 Bab" },
      { icon: "pdf", label: "PDF" },
    ],
    progress: 60,
    duration: 80,
  },
  {
    id: 5,
    track: "fushah",
    category: "nahwu",
    status: "locked",
    arabic: "إِنَّ وَأَخَوَاتُهَا",
    title: "Isim Inna wa Akhawatuha",
    description:
      "Partikel penegas harfu taukid yang menashobkan isim dan meroffakan khobar.",
    meta: [
      { icon: "book", label: "4 Bab" },
      { icon: "quiz", label: "1 Kuis Akhir" },
      { icon: "clock", label: "55 Menit" },
    ],
    progress: 0,
    duration: 55,
  },
  {
    id: 6,
    track: "fushah",
    category: "nahwu",
    status: "locked",
    arabic: "كَانَ وَأَخَوَاتُهَا",
    title: "Kaana wa Akhawatuha",
    description:
      "Fi'il naqish yang mengubah susunan jumlah ismiyyah: isim rofa' dan khobar nashob.",
    meta: [
      { icon: "video", label: "4 Bab" },
      { icon: "pdf", label: "Diktat" },
      { icon: "clock", label: "50 Menit" },
    ],
    progress: 0,
    duration: 50,
  },
  {
    id: 7,
    track: "amiyah",
    category: "hiwar",
    status: "in-progress",
    arabic: "فِي المَقْهَى وَالمَطْعَمِ",
    title: "Ungkapan Ramah Tamah di Kafe & Restoran Hijaz",
    description:
      "Dialog santai pesan qahwa arabiyyah, sapaan “abghaa”, pelafalan native Jeddah & Makkah.",
    meta: [
      { icon: "audio", label: "Dialog Audio" },
      { icon: "chat", label: "12 Skenario" },
    ],
    progress: 85,
    duration: 45,
  },
  {
    id: 8,
    track: "amiyah",
    category: "hiwar",
    status: "locked",
    arabic: "المُسَاوَمَةُ فِي السُّوقِ",
    title: "Tawar-Menawar & Belanja di Pasar Souq",
    description:
      "Kosakata praktis riyal, potongan harga (“khasm”), dan ungkapan sopan khas pasar tradisional.",
    meta: [
      { icon: "audio", label: "Audio Contoh" },
      { icon: "mic", label: "Latihan Ucap" },
    ],
    progress: 0,
    duration: 40,
  },
  {
    id: 9,
    track: "fushah",
    category: "mujam",
    status: "completed",
    arabic: "مُفْرَدَاتٌ حَوْلَ البَيْتِ وَالأُسْرَةِ",
    title: "Mufrodat Tematik: Rumah & Keluarga",
    description:
      "Kumpulan mufrodat harian seputar anggota keluarga, ruang rumah, dan percakapan di rumah.",
    meta: [
      { icon: "cards", label: "40 Mufrodat" },
      { icon: "audio", label: "Audio Contoh" },
      { icon: "score", label: "94%", highlight: true },
    ],
    progress: 100,
    duration: 30,
  },
  {
    id: 10,
    track: "fushah",
    category: "latihan",
    status: "locked",
    arabic: "تَدْرِيبَاتُ التَّصْرِيفِ",
    title: "Lembar Kerja Tashrif Fi'il Madhi",
    description:
      "Latihan tertulis menashrif fi'il madhi beserta kunci jawaban dan catatan kesalahan umum.",
    meta: [
      { icon: "pdf", label: "Lembar PDF" },
      { icon: "quiz", label: "12 Soal" },
    ],
    progress: 0,
    duration: 25,
  },
  {
    id: 11,
    track: "vip",
    category: "nahwu",
    status: "locked",
    arabic: "دِرَاسَةُ البَلَاغَةِ: المَجَازُ",
    title: "Dirasah Balaghah: Pengantar Majaz & Isti'arah",
    description:
      "Tingkat lanjut estetika sastra Al-Qur'an dan syair jahiliyyah bersama masyaikh tamu.",
    meta: [
      { icon: "video", label: "10 Pertemuan" },
      { icon: "cert", label: "Sertifikat" },
    ],
    progress: 0,
    duration: 0,
    statusLabel: "Akses Terkunci",
  },
];

const trackStyles: Record<Track, { label: string; badge: string }> = {
  fushah: {
    label: "Fushah",
    badge:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
  },
  amiyah: {
    label: "Amiyah Saudi",
    badge: "bg-sand-200 text-sand-900 dark:bg-sand-300/25 dark:text-sand-200",
  },
  vip: {
    label: "VIP Exclusive",
    badge: "bg-emerald-950 text-white dark:bg-emerald-900",
  },
};

const statusTabs: Array<{ id: StatusFilter; label: string }> = [
  { id: "all", label: "Semua Status" },
  { id: "in-progress", label: "Sedang Dipelajari" },
  { id: "completed", label: "Selesai" },
  { id: "locked", label: "Belum Dibuka" },
];

const categories: Array<{
  id: "all" | Category;
  label: string;
  icon?: typeof IconPlay;
}> = [
  { id: "all", label: "Semua Materi" },
  { id: "nahwu", label: "Kaidah Nahwu & Shorof", icon: IconLayers },
  { id: "hiwar", label: "Hiwar & Percakapan", icon: IconChat },
  { id: "mujam", label: "Kosakata Tematik & Mu'jam", icon: IconBook },
  { id: "latihan", label: "Latihan Soal & Lembar Kerja", icon: IconClipboard },
];

function progressCardClass(status: Status) {
  if (status === "completed") return "bg-brand";
  if (status === "in-progress") return "bg-brand";
  return "bg-line";
}

export function ModuleCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("order");

  const counts = useMemo(() => {
    const next = {
      all: modules.length,
      nahwu: 0,
      hiwar: 0,
      mujam: 0,
      latihan: 0,
    };
    for (const item of modules) next[item.category] += 1;
    return next;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = modules.filter((item) => {
      const matchCategory = category === "all" || item.category === category;
      const matchStatus = status === "all" || item.status === status;
      const haystack = `${item.title} ${item.arabic} ${item.description} ${item.track}`;
      const matchQuery = q.length === 0 || haystack.toLowerCase().includes(q);
      return matchCategory && matchStatus && matchQuery;
    });

    if (sort === "progress") {
      result.sort((a, b) => b.progress - a.progress || a.id - b.id);
    } else if (sort === "duration") {
      result.sort((a, b) => {
        const da = a.duration === 0 ? Number.MAX_SAFE_INTEGER : a.duration;
        const db = b.duration === 0 ? Number.MAX_SAFE_INTEGER : b.duration;
        return da - db || a.id - b.id;
      });
    } else {
      result.sort((a, b) => a.id - b.id);
    }

    return result;
  }, [category, query, sort, status]);

  function resetFilters() {
    setQuery("");
    setCategory("all");
    setStatus("all");
    setSort("order");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3.5 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm">
        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative flex w-full items-center rounded-xl border border-line/70 bg-paper px-3.5 py-2.5 transition-shadow focus-within:ring-2 focus-within:ring-brand/20 md:w-96">
            <IconSearch className="mr-2.5 size-5 shrink-0 text-muted" />
            <input
              type="search"
              name="module-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari materi, matan, tashrif, kaidah nahwu…"
              aria-label="Cari materi dan modul"
              className="w-full bg-transparent text-[12px] text-ink placeholder:text-muted/70 focus:outline-none"
            />
            <span className="shrink-0 rounded bg-line/40 px-1.5 py-0.5 text-[10px] font-semibold text-muted">
              {modules.length} modul
            </span>
          </div>

          <div
            role="group"
            aria-label="Filter status modul"
            className="flex w-full items-center gap-1.5 overflow-x-auto rounded-xl bg-paper p-1.5 md:w-auto"
          >
            {statusTabs.map((tab) => {
              const selected = status === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setStatus(tab.id)}
                  className={cn(
                    "whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors",
                    selected
                      ? "bg-surface text-ink shadow-sm"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
          {categories.map((item) => {
            const Icon = item.icon;
            const selected = category === item.id;
            const count = counts[item.id];
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setCategory(item.id)}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap rounded-xl px-3.5 py-2 text-[11px] font-medium transition-colors",
                  selected
                    ? "bg-emerald-950 text-white shadow-sm dark:bg-emerald-900"
                    : "bg-paper text-muted hover:text-ink",
                )}
              >
                {Icon ? <Icon className="size-4" /> : null}
                <span>{item.label}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[9px] font-semibold",
                    selected
                      ? "bg-white/15 text-white"
                      : "bg-line/40 text-muted",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <h2 className="text-base font-bold text-ink">
              Katalog Modul &amp; Silabus
            </h2>
            <span className="rounded-full bg-line/40 px-2.5 py-0.5 text-[10px] font-semibold text-muted">
              {modules.length} modul tersedia
            </span>
            <span
              aria-live="polite"
              className="text-[10px] font-medium text-muted"
            >
              {filtered.length} ditampilkan
            </span>
          </div>

          <label className="flex items-center gap-2 text-[10px] text-muted">
            Urutkan:
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              aria-label="Urutkan modul"
              className="cursor-pointer rounded-lg border border-line/70 bg-surface px-2.5 py-1.5 text-[11px] font-medium text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
            >
              <option value="order">Nomor urut modul</option>
              <option value="progress">Progres terbanyak</option>
              <option value="duration">Durasi terpendek</option>
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-line bg-surface/60 px-6 py-12 text-center">
            <IconSearch className="size-6 text-muted" />
            <p className="text-[12px] font-semibold text-ink">
              Tidak ada modul yang cocok
            </p>
            <p className="max-w-sm text-[11px] text-muted">
              Coba kata kunci lain, atau reset filter kategori dan status.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-1 rounded-lg bg-emerald-950 px-3.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
            >
              Reset filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => {
              const track = trackStyles[item.track];
              const isActive = item.status === "in-progress";
              const isCompleted = item.status === "completed";
              const isVip = item.track === "vip";
              const statusLabel =
                item.statusLabel ??
                (isCompleted
                  ? "Tuntas"
                  : isActive
                    ? `${item.progress}% Aktif`
                    : "Siap Dipelajari");

              return (
                <article
                  key={item.id}
                  className={cn(
                    "group flex flex-col justify-between rounded-2xl border border-line/70 bg-surface shadow-sm transition-shadow hover:shadow-md",
                    isActive && "ring-2 ring-brand/30",
                    isVip && "bg-gradient-to-b from-surface to-paper",
                  )}
                >
                  <div className="flex flex-col gap-3 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={cn(
                          "rounded-lg px-2.5 py-1 text-[10px] font-semibold",
                          track.badge,
                        )}
                      >
                        {track.label}
                      </span>

                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                          <IconCheck className="size-3.5" />
                          {statusLabel}
                        </span>
                      ) : isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950 px-2.5 py-0.5 text-[10px] font-bold text-white dark:bg-emerald-900">
                          <span
                            aria-hidden="true"
                            className="size-1.5 animate-pulse rounded-full bg-emerald-300"
                          />
                          {statusLabel}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-line/40 px-2.5 py-0.5 text-[10px] font-medium text-muted">
                          {isVip ? <IconLock className="size-3.5" /> : null}
                          {statusLabel}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <span
                        lang="ar"
                        dir="rtl"
                        className={cn(
                          "text-right font-arabic text-[15px] font-semibold leading-loose",
                          item.track === "amiyah"
                            ? "text-sand-700 dark:text-sand-300"
                            : "text-brand",
                        )}
                      >
                        {item.arabic}
                      </span>
                      <h3 className="text-[14px] font-bold leading-snug text-ink transition-colors group-hover:text-brand">
                        {item.title}
                      </h3>
                      <p className="line-clamp-2 text-[11px] leading-5 text-muted">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-0.5 text-[10px] text-muted">
                      {item.meta.map((meta) => {
                        const Icon = metaIcons[meta.icon];
                        return (
                          <span
                            key={meta.label}
                            className={cn(
                              "flex items-center gap-1",
                              meta.highlight &&
                                "font-semibold text-sand-700 dark:text-sand-300",
                            )}
                          >
                            <Icon className="size-3.5" />
                            {meta.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 rounded-b-2xl border-t border-line/50 bg-paper/60 px-4 py-3">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-line/50">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          progressCardClass(item.status),
                          isVip && "bg-line",
                        )}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "text-[10px]",
                          isCompleted && "text-muted",
                          isActive && "font-semibold text-brand",
                          !isCompleted && !isActive && "text-muted",
                        )}
                      >
                        {isCompleted
                          ? "Selesai 100%"
                          : isActive
                            ? `Progres ${item.progress}%`
                            : isVip
                              ? "Akses terkunci"
                              : "Belum mulai"}
                      </span>

                      <MaterialsActionButton
                        action={{
                          kind: "module",
                          item: {
                            id: item.id,
                            title: item.title,
                            arabic: item.arabic,
                            description: item.description,
                            track: item.track,
                            category: item.category,
                            status: item.status,
                            progress: item.progress,
                            duration: item.duration,
                            metaLabels: item.meta.map((meta) => meta.label),
                            statusLabel: item.statusLabel,
                          } satisfies ModuleSummary,
                        }}
                        title={`Buka detail modul: ${item.title}`}
                        className={cn(
                          "inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors",
                          isCompleted &&
                            "bg-line/40 text-ink hover:bg-line/70",
                          isActive &&
                            item.track === "amiyah" &&
                            "bg-sand-300 text-sand-950 shadow-sm hover:bg-sand-200",
                          isActive &&
                            item.track !== "amiyah" &&
                            "bg-emerald-950 text-white shadow-sm hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800",
                          !isCompleted &&
                            !isActive &&
                            !isVip &&
                            "bg-emerald-950 text-white shadow-sm hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800",
                          isVip &&
                            "bg-sand-300 text-sand-950 shadow-sm hover:bg-sand-200",
                        )}
                      >
                        {isCompleted ? (
                          <>
                            <IconRefresh className="size-3.5" />
                            Review
                          </>
                        ) : isActive ? (
                          <>
                            <IconPlay className="size-3.5" />
                            Lanjutkan
                          </>
                        ) : isVip ? (
                          <>
                            <IconLock className="size-3.5" />
                            Upgrade VIP
                          </>
                        ) : (
                          <>
                            <IconPlay className="size-3.5" />
                            {item.category === "hiwar"
                              ? "Mulai Dialog"
                              : item.category === "latihan"
                                ? "Mulai Latihan"
                                : "Mulai Belajar"}
                          </>
                        )}
                      </MaterialsActionButton>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
