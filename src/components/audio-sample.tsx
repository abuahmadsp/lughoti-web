"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { IconPause, IconPlay } from "./icons";

const bars = [
  "h-3",
  "h-4",
  "h-2",
  "h-5",
  "h-3",
  "h-4",
  "h-2",
  "h-4",
  "h-5",
  "h-3",
  "h-2",
  "h-4",
  "h-3",
];

export function AudioSample() {
  const [playing, setPlaying] = useState(false);
  const [slow, setSlow] = useState(true);

  return (
    <div className="mt-2 flex max-w-xl flex-wrap items-center gap-3 rounded-xl border border-line/60 bg-paper p-3">
      <button
        type="button"
        onClick={() => setPlaying((value) => !value)}
        aria-label={playing ? "Jeda contoh pelafalan" : "Putar contoh pelafalan"}
        aria-pressed={playing}
        className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-white shadow-sm transition-transform hover:bg-emerald-700 active:scale-95"
      >
        {playing ? (
          <IconPause className="size-5" />
        ) : (
          <IconPlay className="size-5" />
        )}
      </button>

      <div className="flex min-w-[140px] flex-1 flex-col">
        <div className="mb-1 flex items-center justify-between gap-2 text-[10px] text-muted">
          <span className="font-semibold text-ink">
            Contoh Pelafalan Native
          </span>
          <span>{playing ? "00:24 / 01:24" : "00:18 / 01:24"}</span>
        </div>
        <div className="flex h-5 items-center gap-1 overflow-hidden">
          {bars.map((height, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={cn(
                "w-1 rounded-full",
                index < 7 ? "bg-brand" : "bg-brand/40",
                height,
                playing && "animate-eq origin-bottom",
              )}
              style={playing ? { animationDelay: `${index * 70}ms` } : undefined}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setSlow((value) => !value)}
        aria-pressed={slow}
        className="rounded bg-line/40 px-2.5 py-1 text-[10px] font-semibold text-ink transition-colors hover:bg-line/70"
      >
        {slow ? "0.75x (Lambat)" : "1x (Normal)"}
      </button>
    </div>
  );
}
