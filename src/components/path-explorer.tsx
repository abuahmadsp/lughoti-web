"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconAward } from "./icons";

type PathFilter = "all" | "fushah" | "amiyah" | "toafl";

const tabs: Array<{
  id: PathFilter;
  label: string;
  arabic?: string;
  dotClass?: string;
  premium?: boolean;
}> = [
  { id: "all", label: "Semua Jalur" },
  {
    id: "fushah",
    label: "Fushah Standar Akademik",
    arabic: "الفصحى",
    dotClass: "bg-brand",
  },
  {
    id: "amiyah",
    label: "‘Amiyah Saudi Sehari-hari",
    arabic: "العامية",
    dotClass: "bg-sand-400",
  },
  {
    id: "toafl",
    label: "Persiapan TOAFL & Riset KTI",
    premium: true,
  },
];

export function PathExplorer({
  fushah,
  amiyah,
  toafl,
  sidebar,
}: {
  fushah: ReactNode;
  amiyah: ReactNode;
  toafl: ReactNode;
  sidebar: ReactNode;
}) {
  const [filter, setFilter] = useState<PathFilter>("all");

  // The header's Fushah/Amiyah switch also drives this filter on this page.
  useEffect(() => {
    function onTrackChange(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === "fushah" || detail === "amiyah") setFilter(detail);
    }
    window.addEventListener("lughati:track-change", onTrackChange);
    return () =>
      window.removeEventListener("lughati:track-change", onTrackChange);
  }, []);

  const showFushah = filter === "all" || filter === "fushah";
  const showAmiyah = filter === "all" || filter === "amiyah";
  const showToafl = filter === "all" || filter === "toafl";

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line/70 bg-surface p-3 shadow-sm">
        <div
          role="group"
          aria-label="Filter jalur belajar"
          className="flex flex-wrap items-center gap-2"
        >
          {tabs.map((tab) => {
            const selected = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(tab.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12px] font-medium transition-colors",
                  selected
                    ? "bg-emerald-950 text-white shadow-sm dark:bg-emerald-900"
                    : "border border-line/70 bg-paper text-muted hover:text-ink",
                )}
              >
                {tab.dotClass ? (
                  <span
                    aria-hidden="true"
                    className={cn("size-2 rounded-full", tab.dotClass)}
                  />
                ) : null}
                {tab.premium ? (
                  <IconAward className="size-3.5 text-gold" />
                ) : null}
                <span>{tab.label}</span>
                {tab.arabic ? (
                  <span
                    lang="ar"
                    dir="rtl"
                    className="font-arabic text-[12px] opacity-80"
                  >
                    {tab.arabic}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
        <p aria-live="polite" className="text-[10px] font-medium text-muted">
          Menampilkan{" "}
          {[showFushah, showAmiyah, showToafl].filter(Boolean).length} dari 3
          jalur
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
        <div className="flex flex-col gap-10 lg:col-span-8">
          {showFushah ? fushah : null}

          {showFushah && showAmiyah ? (
            <div
              aria-hidden="true"
              className="flex items-center justify-center gap-3 text-muted/70"
            >
              <span className="h-px flex-1 bg-line/70" />
              <span className="font-arabic text-sm" lang="ar">
                ۞ ۞ ۞
              </span>
              <span className="h-px flex-1 bg-line/70" />
            </div>
          ) : null}

          {showAmiyah ? amiyah : null}
          {showToafl ? toafl : null}
        </div>

        <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:col-span-4">
          {sidebar}
        </aside>
      </div>
    </div>
  );
}
