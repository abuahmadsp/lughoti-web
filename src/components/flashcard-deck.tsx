"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const cards = [
  {
    track: "Fushah",
    arabic: "كِتَابٌ",
    translit: "kitābun",
    meaning: "Buku",
    isFushah: true,
  },
  {
    track: "Fushah",
    arabic: "شُكْرًا",
    translit: "syukran",
    meaning: "Terima kasih",
    isFushah: true,
  },
  {
    track: "Fushah",
    arabic: "كَيْفَ الحَالُ؟",
    translit: "kayfa al-ḥāl?",
    meaning: "Apa kabar?",
    isFushah: true,
  },
  {
    track: "Amiyah",
    arabic: "مَطْعَم",
    translit: "mat'am",
    meaning: "Restoran",
    isFushah: false,
  },
  {
    track: "Amiyah",
    arabic: "يَلَّا!",
    translit: "yallah!",
    meaning: "Ayo / Mari!",
    isFushah: false,
  },
];

export function FlashcardDeck() {
  const [revealed, setRevealed] = useState<number[]>([]);

  function toggle(index: number) {
    setRevealed((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {cards.map((card, index) => {
        const isRevealed = revealed.includes(index);
        return (
          <button
            key={card.arabic}
            type="button"
            onClick={() => toggle(index)}
            aria-pressed={isRevealed}
            aria-label={`${card.arabic} — ${isRevealed ? card.meaning : "ketuk untuk melihat arti"}`}
            className="group flex min-h-[152px] cursor-pointer flex-col items-center justify-center rounded-xl border border-line/70 bg-surface p-4 text-center shadow-sm transition-all hover:border-brand/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            <span
              className={cn(
                "mb-1 rounded px-2 py-0.5 text-[10px] font-semibold",
                card.isFushah
                  ? "bg-line/40 text-muted"
                  : "bg-sand-200 text-sand-900",
              )}
            >
              {card.track}
            </span>
            <span
              className={cn(
                "font-arabic text-lg font-bold leading-loose text-ink transition-colors",
                card.isFushah
                  ? "group-hover:text-brand"
                  : "group-hover:text-sand-700 dark:group-hover:text-sand-300",
              )}
              lang="ar"
              dir="rtl"
            >
              {card.arabic}
            </span>
            <span className="mt-0.5 font-mono text-[10px] tracking-wide text-muted">
              {card.translit}
            </span>
            <span
              className={cn(
                "mt-2 w-full rounded px-1 py-1 text-[12px] font-bold",
                isRevealed
                  ? "bg-paper text-ink"
                  : "bg-paper/60 text-muted/80",
              )}
            >
              {isRevealed ? card.meaning : "Ketuk untuk arti"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
