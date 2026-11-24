"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { IconDownload, IconFileText, IconTable } from "./icons";

const periods = ["7 Hari", "30 Hari Terakhir", "Sepanjang Waktu"] as const;

type Period = (typeof periods)[number];

export function PeriodFilter() {
  const [active, setActive] = useState<Period>("30 Hari Terakhir");
  const [notice, setNotice] = useState<string | null>(null);

  function selectPeriod(period: Period) {
    setActive(period);
    setNotice(
      `Pratinjau — rentang “${period}” belum punya data terpisah; angka di bawah tetap ilustratif.`,
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
      <div
        aria-label="Filter periode laporan"
        className="flex items-center gap-1 rounded-xl bg-line/40 p-1"
      >
        {periods.map((period) => {
          const selected = active === period;
          return (
            <button
              key={period}
              type="button"
              aria-pressed={selected}
              onClick={() => selectPeriod(period)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[11px] transition-all",
                selected
                  ? "bg-surface font-semibold text-brand shadow-sm"
                  : "font-medium text-muted transition-colors hover:text-ink",
              )}
            >
              {period}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          title="Pratinjau — ekspor CSV belum tersedia"
          aria-label="Ekspor data CSV"
          onClick={() => setNotice("Pratinjau — ekspor CSV belum tersedia.")}
          className="grid size-10 place-items-center rounded-lg border border-line/70 bg-surface text-brand shadow-sm transition-colors hover:bg-paper"
        >
          <IconTable className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setNotice("Pratinjau — unduh rapor PDF belum tersedia.")}
          className="flex items-center gap-2 rounded-lg bg-emerald-950 px-4 py-2.5 text-[12px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
        >
          <IconFileText className="size-4" />
          Unduh Rapor PDF
          <IconDownload className="size-3.5 opacity-70" />
        </button>
      </div>

      {notice ? (
        <p className="w-full text-right text-[10px] font-medium text-brand" aria-live="polite">
          {notice}
        </p>
      ) : null}
    </div>
  );
}
