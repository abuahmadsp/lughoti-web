"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { IconHistory, IconX } from "./icons";

const rows = [
  {
    title: "Evaluasi Modul 1: Kosakata & Frasa Perkenalan",
    arabic: "تقييم الوحدة الأولى: المفردات والتعارف",
    track: "Dual Track",
    tone: "brand",
    duration: "6m 12s",
    score: "90/100",
    grade: "Lulus Cum Laude",
    xp: "+30 XP",
  },
  {
    title: "Kuis Huruf Jar & Majrur (Nahwu Dasar)",
    arabic: "اختبار حروف الجر والاسم المجرور",
    track: "Fushah",
    tone: "brand",
    duration: "4m 45s",
    score: "92/100",
    grade: "Lulus",
    xp: "+25 XP",
  },
  {
    title: "Simulasi Percakapan Restoran Riyadh",
    arabic: "محادثة في المطعم بالرياض (عامية)",
    track: "Amiyah Saudi",
    tone: "sand",
    duration: "5m 30s",
    score: "85/100",
    grade: "Lulus",
    xp: "+20 XP",
  },
  {
    title: "Mencocokkan Padanan Fushah vs. Amiyah Saudi",
    arabic: "المطابقة بين الفصحى والعامية",
    track: "Dual Track",
    tone: "brand",
    duration: "3m 15s",
    score: "100/100",
    grade: "Sempurna ✨",
    xp: "+40 XP",
  },
] as const;

export function AssessmentLog({ review }: { review: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <IconHistory className="size-4 text-brand" />
              <h2 className="text-[15px] font-bold text-ink">
                Log Evaluasi &amp; Riwayat Kuis Terakhir
              </h2>
            </div>
            <p className="text-[11px] text-muted">
              Rekam jejak latihan harian, evaluasi bab, dan skor perolehan XP
              (ilustrasi).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted">Menampilkan 4 dari 24 kuis</span>
            <button
              type="button"
              onClick={() => setNotice("Pratinjau — riwayat lengkap belum tersedia.")}
              className="rounded-lg bg-paper px-3 py-1.5 text-[11px] font-semibold text-brand transition-colors hover:bg-line/40"
            >
              Lihat Semua Riwayat
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="bg-paper text-[10px] uppercase tracking-wider text-muted">
                <th className="rounded-l-lg px-4 py-3 font-semibold">Judul Evaluasi / Materi</th>
                <th className="px-4 py-3 font-semibold">Track</th>
                <th className="px-4 py-3 font-semibold">Durasi</th>
                <th className="px-4 py-3 font-semibold">Skor &amp; Hasil</th>
                <th className="px-4 py-3 font-semibold">Perolehan XP</th>
                <th className="rounded-r-lg px-4 py-3 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-[12px] text-ink">
              {rows.map((row) => (
                <tr
                  key={row.title}
                  className="border-b border-line/60 transition-colors last:border-0 hover:bg-paper/70"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-semibold text-brand">{row.title}</span>
                      <span
                        lang="ar"
                        dir="rtl"
                        className="font-arabic text-[13px] text-muted"
                      >
                        {row.arabic}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={cn(
                        "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        row.tone === "brand"
                          ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                          : "bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200",
                      )}
                    >
                      {row.track}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-muted">{row.duration}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "text-[14px] font-bold",
                          row.score === "100/100" ? "text-sand-600" : "text-brand",
                        )}
                      >
                        {row.score}
                      </span>
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-[10px] font-semibold",
                          row.grade === "Sempurna ✨"
                            ? "bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200"
                            : "bg-emerald-50 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
                        )}
                      >
                        {row.grade}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 font-semibold text-brand">{row.xp}</td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      className="rounded-lg bg-paper px-3 py-1.5 text-[10px] font-semibold text-brand transition-colors hover:bg-emerald-950 hover:text-white"
                    >
                      Lihat Pembahasan
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {notice ? (
          <p className="text-[10px] font-semibold text-brand" aria-live="polite">
            {notice}
          </p>
        ) : null}
      </section>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/50 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-title"
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[85vh] w-full max-w-2xl flex-col gap-4 overflow-y-auto rounded-2xl border border-line/70 bg-surface p-5 shadow-xl sm:p-6"
          >
            <div className="flex justify-end">
              <button
                type="button"
                aria-label="Tutup pembahasan"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-muted transition-colors hover:bg-paper hover:text-ink"
              >
                <IconX className="size-5" />
              </button>
            </div>

            {review}

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg bg-emerald-950 px-4 py-2 text-[12px] font-semibold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
              >
                Tutup Pembahasan
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
