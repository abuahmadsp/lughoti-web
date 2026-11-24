"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  IconArrowLeft,
  IconArrowRight,
  IconCheck,
  IconChevronDown,
  IconClipboard,
  IconClock,
  IconFlag,
  IconLightbulb,
  IconRefresh,
  IconSkipForward,
  IconSparkles,
  IconVolume,
  IconWaveform,
} from "./icons";

const options = [
  {
    id: "A",
    text: "Selamat pagi, sampai berjumpa kembali besok hari.",
  },
  {
    id: "B",
    text: "Selamat datang, kami sangat senang dan merasa terhormat dapat mengenalmu.",
  },
  {
    id: "C",
    text: "Permisi, di mana letak perpustakaan umum kota ini?",
  },
  {
    id: "D",
    text: "Terima kasih banyak atas bantuan dan hidangannya.",
  },
] as const;

const waveHeights = [
  "h-2",
  "h-3",
  "h-4",
  "h-5",
  "h-2",
  "h-4",
  "h-3",
  "h-5",
  "h-2",
  "h-4",
  "h-3",
  "h-5",
  "h-2",
  "h-4",
];

export function QuizSession({
  preview,
  sidebar,
}: {
  preview: ReactNode;
  sidebar: ReactNode;
}) {
  const [selected, setSelected] = useState<string>("B");
  const [playing, setPlaying] = useState(false);
  const [checked, setChecked] = useState(false);
  const [flagged, setFlagged] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const audioTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (audioTimer.current !== null) window.clearTimeout(audioTimer.current);
    };
  }, []);

  function playAudio() {
    if (audioTimer.current !== null) window.clearTimeout(audioTimer.current);
    setPlaying(true);
    setNotice("Pratinjau — audio soal belum direkam.");
    audioTimer.current = window.setTimeout(() => setPlaying(false), 1800);
  }

  function checkAnswer() {
    setChecked(true);
    setNotice(
      selected === "B"
        ? "Benar! +10 XP (pratinjau — skor tidak disimpan)."
        : "Belum tepat. Jawaban yang benar: B (pratinjau — skor tidak disimpan).",
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-10">
      {/* Status bar */}
      <section className="rounded-xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-paper text-brand">
              <IconClipboard className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  Modul 1 • Bab Perkenalan
                </span>
                <span className="rounded bg-sand-100 px-2 py-0.5 text-[10px] font-semibold text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
                  Dual-Track (Fushah &amp; Amiyah)
                </span>
                <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
                  Data demo
                </span>
              </div>
              <h1 className="mt-1 truncate text-[16px] font-bold text-ink sm:text-[18px]">
                Evaluasi Modul 1: Kosakata &amp; Frasa Perkenalan
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 rounded-lg bg-paper px-3 py-1.5">
              <IconClock className="size-4 text-brand" />
              <div className="flex flex-col">
                <span className="text-[10px] font-medium leading-none text-muted">
                  Sisa Waktu
                </span>
                <span className="text-[13px] font-semibold leading-tight text-ink">
                  08:45
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-paper px-3 py-1.5">
              <IconSparkles className="size-4 text-sand-600" />
              <div className="flex flex-col">
                <span className="text-[10px] font-medium leading-none text-muted">
                  Skor Sementara
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[13px] font-bold leading-tight text-ink">
                    20 Poin
                  </span>
                  <span className="text-[10px] font-semibold text-brand">
                    (+10 XP)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted">
              Progres Kuis:{" "}
              <strong className="font-semibold text-ink">Soal 3</strong> dari 10
              Soal
            </span>
            <span className="font-bold text-brand">30% Selesai</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-line/50">
            <div className="h-full w-[30%] rounded-full bg-brand transition-all duration-500" />
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Question column */}
        <div className="flex flex-col gap-5 lg:col-span-8">
          <section className="flex flex-col gap-6 rounded-xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-2 border-b border-line/50 pb-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  <IconCheck className="size-3.5" />
                  Pilihan Ganda
                </span>
                <span className="rounded-md bg-paper px-2 py-0.5 text-[10px] text-muted">
                  Tingkat: Dasar (A1)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setNotice("Pratinjau — laporan soal belum tersedia.")}
                className="flex items-center gap-1 text-[10px] font-medium text-muted transition-colors hover:text-brand"
              >
                <IconFlag className="size-3.5" />
                Laporkan Soal
              </button>
            </div>

            <p className="text-[16px] font-medium leading-relaxed text-ink">
              Dengarkan audio berikut dan pilihlah terjemahan bahasa Indonesia
              yang paling tepat untuk kalimat Arab di bawah ini:
            </p>

            <div className="relative flex flex-col gap-4 overflow-hidden rounded-xl bg-paper p-5 sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-brand/5 blur-2xl"
              />
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={playAudio}
                    aria-pressed={playing}
                    className="flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-[12px] font-semibold text-white shadow-sm transition-transform hover:bg-emerald-700 active:scale-95"
                  >
                    {playing ? (
                      <IconRefresh className="size-4 animate-spin" />
                    ) : (
                      <IconVolume className="size-4" />
                    )}
                    {playing ? "Memutar Suara…" : "Putar Audio Soal (2x)"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setNotice("Pratinjau — kecepatan audio belum tersedia.")}
                    title="Perlambat kecepatan audio"
                    className="flex items-center gap-1 rounded-full bg-surface px-3 py-2 text-[11px] font-semibold text-muted transition-colors hover:text-brand"
                  >
                    <IconClock className="size-3.5" />
                    0.75x
                  </button>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[10px] font-semibold text-brand shadow-sm">
                  <span aria-hidden="true" className="size-2 rounded-full bg-brand" />
                  Fushah Baku (
                  <span lang="ar" dir="rtl">
                    الفصحى المعاصرة
                  </span>
                  )
                </span>
              </div>

              <div
                aria-hidden="true"
                className="flex h-9 items-center gap-[3px] rounded-lg bg-surface/70 px-3"
              >
                <IconWaveform className="mr-2 size-4 shrink-0 text-brand" />
                {waveHeights.map((height, index) => (
                  <span
                    key={index}
                    className={cn(
                      "w-[3px] shrink-0 rounded-full bg-brand/60",
                      height,
                      playing && "animate-eq origin-center",
                    )}
                    style={playing ? { animationDelay: `${index * 60}ms` } : undefined}
                  />
                ))}
                <span className="ml-auto font-mono text-[10px] text-muted">
                  00:04
                </span>
              </div>

              <div className="py-2 text-center">
                <p
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-[24px] font-bold leading-loose tracking-wide text-ink sm:text-[28px]"
                >
                  « أَهْلًا بِكَ، تَشَرَّفْنَا بِمَعْرِفَتِكَ »
                </p>
                <p className="mt-2 font-mono text-[12px] font-medium tracking-wide text-muted">
                  “Ahlan bika, tasyarrafnā bi-ma‘rifatik.”
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                Pilihan Terjemahan:
              </p>
              <div role="radiogroup" aria-label="Pilihan terjemahan" className="flex flex-col gap-3">
                {options.map((option) => {
                  const active = selected === option.id;
                  return (
                    <label
                      key={option.id}
                      className={cn(
                        "group flex cursor-pointer items-center justify-between gap-3 rounded-xl p-4 transition-all",
                        active
                          ? "bg-emerald-50 shadow-sm dark:bg-emerald-900/30"
                          : "bg-paper hover:bg-line/40",
                      )}
                    >
                      <span className="flex min-w-0 items-center gap-3.5">
                        <span
                          className={cn(
                            "grid size-8 shrink-0 place-items-center rounded-lg text-[12px] font-bold transition-colors",
                            active
                              ? "bg-brand text-white shadow-sm"
                              : "bg-surface text-muted group-hover:text-ink",
                          )}
                        >
                          {option.id}
                        </span>
                        <span
                          className={cn(
                            "text-[13px] leading-normal text-ink",
                            active && "font-semibold",
                          )}
                        >
                          {option.text}
                        </span>
                      </span>
                      <input
                        type="radio"
                        name="quiz-option"
                        value={option.id}
                        checked={active}
                        onChange={() => {
                          setSelected(option.id);
                          setChecked(false);
                        }}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full",
                          active
                            ? "size-6 bg-brand text-white shadow-sm"
                            : "bg-surface",
                        )}
                      >
                        {active ? <IconCheck className="size-3.5" /> : null}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <details className="group rounded-xl bg-paper">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 select-none">
                <span className="flex items-center gap-2 text-[12px] font-semibold text-brand">
                  <IconLightbulb className="size-4" />
                  Lihat Penjelasan Kosakata (Harakat &amp; Morfologi Kata)
                </span>
                <IconChevronDown className="size-4 text-muted transition-transform group-open:rotate-180" />
              </summary>
              <div className="grid grid-cols-1 gap-3 px-4 pb-4 pt-1 md:grid-cols-2">
                <div className="flex flex-col gap-1 rounded-lg bg-surface p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12px] font-semibold text-ink">
                      <span lang="ar" dir="rtl" className="font-arabic">
                        أَهْلًا
                      </span>{" "}
                      (Ahlan)
                    </span>
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200">
                      Isim Maf&apos;ul
                    </span>
                  </div>
                  <p className="text-[11px] leading-5 text-muted">
                    Berasal dari kata <em>Ahl</em> (Keluarga). Makna tersirat:
                    “Engkau dianggap keluarga sendiri yang kami muliakan.”
                  </p>
                </div>
                <div className="flex flex-col gap-1 rounded-lg bg-surface p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[12px] font-semibold text-ink">
                      <span lang="ar" dir="rtl" className="font-arabic">
                        تَشَرَّفْنَا
                      </span>{" "}
                      (Tasyarrafnā)
                    </span>
                    <span className="rounded bg-sand-100 px-1.5 py-0.5 text-[9px] font-semibold text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
                      Fi&apos;il Madhi Bab V
                    </span>
                  </div>
                  <p className="text-[11px] leading-5 text-muted">
                    Akar kata <em>Sy-R-F</em> (Kemuliaan / Kehormatan). Bentuk
                    jamak mutakallim: “Kami merasa terhormat.”
                  </p>
                </div>
              </div>
            </details>

            {checked ? (
              <p
                aria-live="polite"
                className={cn(
                  "rounded-lg px-3 py-2 text-[11px] font-semibold",
                  selected === "B"
                    ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                    : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
                )}
              >
                {selected === "B"
                  ? "Benar! +10 XP — pratinjau, skor tidak disimpan."
                  : "Belum tepat. Jawaban yang benar: B — pratinjau, skor tidak disimpan."}
              </p>
            ) : null}
          </section>

          {preview}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-5 lg:col-span-4">
          <section className="flex flex-col gap-4 rounded-xl border border-line/70 bg-surface p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-[11px] font-bold uppercase tracking-wide text-ink">
                Navigasi Soal Kuis
              </h2>
              <span className="text-[10px] text-muted">10 Butir</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 10 }, (_, index) => {
                const number = index + 1;
                const done = number < 3;
                const current = number === 3;
                return (
                  <button
                    key={number}
                    type="button"
                    onClick={() =>
                      setNotice(
                        current
                          ? null
                          : "Pratinjau — hanya Soal 3 yang tersedia dalam demo ini.",
                      )
                    }
                    aria-current={current ? "step" : undefined}
                    className={cn(
                      "flex h-10 flex-col items-center justify-center rounded-lg text-[11px] font-bold transition-transform hover:scale-105",
                      done && "bg-brand text-white",
                      current &&
                        "bg-emerald-950 text-white shadow-md ring-2 ring-brand ring-offset-2 dark:bg-emerald-900",
                      !done &&
                        !current &&
                        "bg-paper font-medium text-muted hover:bg-line/50",
                    )}
                  >
                    <span>{String(number).padStart(2, "0")}</span>
                    {done ? <IconCheck className="-mt-1 size-3" /> : null}
                    {current ? (
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-300" />
                    ) : null}
                  </button>
                );
              })}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[10px] text-muted">
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="size-3 rounded-full bg-brand" />
                Terjawab
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="size-3 rounded-full bg-emerald-950 dark:bg-emerald-700" />
                Sedang Dikerjakan
              </span>
              <span className="flex items-center gap-1.5">
                <span aria-hidden="true" className="size-3 rounded-full bg-paper" />
                Belum
              </span>
            </div>
          </section>

          {sidebar}
        </div>
      </div>

      <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line/70 bg-surface p-4 shadow-md sm:p-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setNotice("Pratinjau — soal berikutnya belum tersedia.")}
            className="flex items-center gap-2 rounded-lg bg-paper px-4 py-2.5 text-[12px] font-semibold text-ink transition-colors hover:bg-line/50"
          >
            <IconSkipForward className="size-4" />
            Lewati Soal
          </button>
          <button
            type="button"
            onClick={() => setFlagged((value) => !value)}
            aria-pressed={flagged}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2.5 text-[12px] font-semibold transition-colors",
              flagged
                ? "bg-sand-300 text-sand-950"
                : "bg-sand-100 text-sand-800 hover:bg-sand-200 dark:bg-sand-300/20 dark:text-sand-200",
            )}
          >
            <IconFlag className={cn("size-4", flagged && "fill-current")} />
            {flagged ? "Ditandai Ragu" : "Tandai Ragu-ragu"}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setNotice("Pratinjau — soal sebelumnya belum tersedia.")}
            className="flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[12px] font-semibold text-muted transition-colors hover:text-ink"
          >
            <IconArrowLeft className="size-4" />
            Soal Sebelumnya
          </button>
          <button
            type="button"
            onClick={checkAnswer}
            className="group flex items-center gap-2 rounded-lg bg-emerald-950 px-6 py-2.5 text-[12px] font-semibold text-white shadow-sm transition-transform hover:bg-emerald-900 active:scale-95 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          >
            Periksa Jawaban &amp; Lanjut
            <IconArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {notice ? (
        <p className="text-center text-[11px] font-semibold text-brand" aria-live="polite">
          {notice}
        </p>
      ) : null}
    </div>
  );
}
