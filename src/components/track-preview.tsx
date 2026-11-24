"use client";

import { useState } from "react";
import { previews, type TrackId } from "@/lib/curriculum";
import { cn } from "@/lib/cn";
import {
  IconBook,
  IconGlobe,
  IconLock,
  IconStar,
  IconVolume,
} from "./icons";

const trackTabs: { id: TrackId; label: string; hint: string }[] = [
  { id: "fushah", label: "Fushah", hint: "baku" },
  { id: "amiyah", label: "Amiyah Saudi", hint: "harian" },
];

const waveBars = [7, 13, 21, 11, 25, 17, 9, 22, 14, 24, 10, 17, 13, 20];

export function TrackPreview() {
  const [track, setTrack] = useState<TrackId>("amiyah");
  const data = previews[track];
  const marked = track === "amiyah" ? 5 : 4;

  return (
    <div className="relative mx-auto w-full max-w-[440px] lg:max-w-none">
      <div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[42px] bg-gradient-to-br from-emerald-500/25 via-sand-300/20 to-transparent blur-3xl"
      />

      <div className="relative rounded-[30px] border border-line/80 bg-surface/80 p-2 shadow-[0_30px_80px_-30px_rgba(7,50,38,0.45)] backdrop-blur-xl">
        <div className="rounded-[24px] border border-line/70 bg-surface p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sand-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-sand-800 dark:bg-sand-900/40 dark:text-sand-200">
              <span className="size-1.5 rounded-full bg-sand-600 dark:bg-sand-300" />
              Pratinjau UI
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[10px] font-semibold text-muted">
              Minggu {String(data.week).padStart(2, "0")}
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                Gratis
              </span>
            </span>
          </div>

          <div
            role="group"
            aria-label="Pilih jalur pratinjau"
            className="mt-4 grid grid-cols-2 gap-1 rounded-full border border-line/80 bg-paper/80 p-1"
          >
            {trackTabs.map((tab) => {
              const active = track === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setTrack(tab.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold transition-all",
                    active
                      ? "bg-emerald-800 text-white shadow-sm shadow-emerald-900/25"
                      : "text-muted hover:text-ink",
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide",
                      active
                        ? "bg-white/15 text-white/80"
                        : "bg-line/70 text-muted",
                    )}
                  >
                    {tab.hint}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              <IconBook className="size-3.5" />
              {data.lessonTitle}
            </div>
            <p
              className="font-arabic mt-1 text-lg leading-relaxed text-ink/70"
              lang="ar"
              dir="rtl"
            >
              {data.lessonArabic}
            </p>

            <div className="mt-3 rounded-2xl border border-emerald-900/10 bg-gradient-to-br from-emerald-50/90 to-sand-50/60 p-4 dark:border-emerald-300/15 dark:from-emerald-950/60 dark:to-emerald-900/20">
              <p
                className="font-arabic text-right text-[26px] leading-[1.9] text-ink sm:text-[28px]"
                lang="ar"
                dir="rtl"
              >
                {data.phrase.ar}
              </p>
              <p className="mt-2 text-sm font-medium text-emerald-800/90 dark:text-emerald-200/80">
                {data.phrase.translit}
              </p>
              <p className="mt-1 text-sm text-muted">{data.phrase.id}</p>

              <div className="mt-3 flex items-center gap-3 border-t border-emerald-900/10 pt-3 dark:border-emerald-300/10">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-800 text-white shadow-sm">
                  <IconVolume className="size-4" />
                </span>
                <div className="flex h-7 flex-1 items-center gap-[3px]" aria-hidden="true">
                  {waveBars.map((height, index) => (
                    <span
                      key={index}
                      className="w-[3px] rounded-full bg-emerald-700/35 dark:bg-emerald-300/35"
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </div>
                <span className="rounded-full border border-line px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted">
                  Audio segera
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Kosakata minggu ini
            </h3>
            <span className="text-[11px] font-medium text-muted">
              {marked}/{data.totalVocab}
            </span>
          </div>

          <ul className="mt-2 space-y-2">
            {data.vocabulary.map((item) => (
              <li
                key={item.ar}
                className="flex items-center gap-3 rounded-xl border border-line/70 bg-paper/60 px-3 py-2.5"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                  <IconStar className="size-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span
                      className="font-arabic text-right text-lg leading-snug"
                      lang="ar"
                      dir="rtl"
                    >
                      {item.ar}
                    </span>
                    <span className="shrink-0 rounded-full bg-line/60 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-muted">
                      {item.tag}
                    </span>
                  </span>
                  <span className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[11px] text-emerald-800/80 dark:text-emerald-200/70">
                      {item.translit}
                    </span>
                    <span className="text-[11px] text-muted">· {item.id}</span>
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-xl bg-line/40 p-3">
            <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              <span>Progres minggu 1</span>
              <span>2 minggu gratis</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-sand-400"
                style={{ width: `${Math.round((marked / data.totalVocab) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="animate-float absolute -right-3 top-24 hidden rotate-2 rounded-2xl border border-line/80 bg-surface/95 px-3.5 py-2.5 shadow-xl shadow-emerald-950/10 backdrop-blur lg:block dark:shadow-black/40">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-sand-100 text-sand-700 dark:bg-sand-900/50 dark:text-sand-200">
            <IconLock className="size-3.5" />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-bold">Minggu 1–2</p>
            <p className="text-[10px] text-muted">terbuka gratis</p>
          </div>
        </div>
      </div>

      <div
        className="animate-float absolute -left-4 bottom-24 hidden rotate-[-3deg] rounded-2xl border border-line/80 bg-surface/95 px-3.5 py-2.5 shadow-xl shadow-emerald-950/10 backdrop-blur lg:block dark:shadow-black/40"
        style={{ animationDelay: "-2.5s" }}
      >
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
            <IconGlobe className="size-3.5" />
          </span>
          <div className="leading-tight">
            <p className="text-[11px] font-bold">Najdi + Hijazi</p>
            <p className="text-[10px] text-muted">dua ragam Saudi</p>
          </div>
        </div>
      </div>
    </div>
  );
}
