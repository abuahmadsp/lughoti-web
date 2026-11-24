"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  IconHeadphones,
  IconPause,
  IconPlay,
  IconRepeat,
  IconSkipBack,
  IconSkipForward,
} from "./icons";

const tracks = [
  {
    title: "Bab Al-I'rab",
    arabic: "بَابُ الإِعْرَابِ",
    duration: "03:40",
  },
  {
    title: "Khutbatul Kitab wa Kalam",
    arabic: "خُطْبَةُ الكِتَابِ وَالكَلَامِ",
    duration: "01:45",
  },
  {
    title: "Alamat Al-Khofadh",
    arabic: "عَلَامَاتُ الخَفْضِ",
    duration: "02:10",
  },
];

const bars = [
  "h-3",
  "h-5",
  "h-7",
  "h-4",
  "h-6",
  "h-8",
  "h-5",
  "h-3",
  "h-4",
  "h-6",
  "h-3",
  "h-5",
  "h-2",
  "h-4",
  "h-6",
  "h-2",
];

export function MatanAudioPlayer() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [slow, setSlow] = useState(true);
  const [repeat, setRepeat] = useState(false);

  const track = tracks[active];

  function selectTrack(index: number) {
    setActive(index);
    setPlaying(false);
  }

  function step(direction: 1 | -1) {
    setActive((index) => (index + direction + tracks.length) % tracks.length);
    setPlaying(false);
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-paper p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <IconHeadphones className="size-3.5 shrink-0 text-brand" />
          <div className="flex min-w-0 items-baseline gap-2">
            <span className="truncate text-[12px] font-semibold text-ink">
              {track.title}
            </span>
            <span
              lang="ar"
              dir="rtl"
              className="shrink-0 font-arabic text-[12px] text-muted"
            >
              {track.arabic}
            </span>
          </div>
        </div>
        <span className="shrink-0 text-[10px] text-muted">
          {playing ? "01:32" : "00:00"} / {track.duration}
        </span>
      </div>

      <div
        aria-hidden="true"
        className="flex h-9 items-end justify-between gap-1 overflow-hidden rounded-xl bg-surface px-2.5 py-1.5"
      >
        {bars.map((height, index) => (
          <span
            key={index}
            className={cn(
              "w-1 rounded-full",
              index < (playing ? 9 : 6) ? "bg-brand" : "bg-line",
              height,
              playing && "animate-eq origin-bottom",
            )}
            style={
              playing ? { animationDelay: `${index * 60}ms` } : undefined
            }
          />
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setSlow((value) => !value)}
          aria-pressed={slow}
          title="Demo antarmuka — audio contoh belum direkam"
          className="rounded-md bg-line/40 px-2 py-1 text-[10px] font-semibold text-ink transition-colors hover:bg-line/70"
        >
          {slow ? "0.75x (Lambat)" : "1x (Normal)"}
        </button>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Track sebelumnya"
            className="rounded-full p-1.5 text-muted transition-colors hover:bg-line/40 hover:text-ink"
          >
            <IconSkipBack className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            aria-label={playing ? "Jeda audio" : "Putar audio"}
            aria-pressed={playing}
            className="grid size-9 place-items-center rounded-full bg-brand text-white shadow-sm transition-transform hover:bg-emerald-700 active:scale-95"
          >
            {playing ? (
              <IconPause className="size-4" />
            ) : (
              <IconPlay className="size-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Track berikutnya"
            className="rounded-full p-1.5 text-muted transition-colors hover:bg-line/40 hover:text-ink"
          >
            <IconSkipForward className="size-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => setRepeat((value) => !value)}
          aria-label="Ulangi track"
          aria-pressed={repeat}
          className={cn(
            "rounded-full p-1.5 transition-colors hover:bg-line/40",
            repeat ? "bg-line/60 text-brand" : "text-muted hover:text-ink",
          )}
        >
          <IconRepeat className="size-4" />
        </button>
      </div>

      <div className="flex flex-col gap-1 border-t border-line/60 pt-2">
        {tracks.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => selectTrack(index)}
            aria-pressed={active === index}
            className={cn(
              "flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-left transition-colors",
              active === index
                ? "bg-surface text-ink shadow-sm"
                : "text-muted hover:bg-surface/70 hover:text-ink",
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  active === index ? "bg-brand" : "bg-line",
                )}
              />
              <span className="truncate text-[11px] font-medium">
                {String(index + 1).padStart(2, "0")}. {item.title}
              </span>
            </span>
            <span className="shrink-0 text-[10px]">{item.duration}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
