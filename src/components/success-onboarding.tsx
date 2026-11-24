"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { IconCheck, IconDownload, IconFileText } from "./icons";

type Track = "fushah" | "amiyah" | "dual";
type Goal = "15" | "20" | "30";

const tracks: {
  key: Track;
  tag: string;
  arabic: string;
  description: string;
}[] = [
  {
    key: "fushah",
    tag: "Fushah",
    arabic: "الفُصْحَى",
    description: "Akademik, studi Al-Qur’an, dan teks klasik",
  },
  {
    key: "amiyah",
    tag: "Amiyah Saudi",
    arabic: "العَامِّيَّة",
    description: "Percakapan Riyadh, Jeddah, dan bisnis Saudi",
  },
  {
    key: "dual",
    tag: "Rekomendasi",
    arabic: "المَسَارَان مَعًا",
    description: "Dual-Track: Fushah & Amiyah seimbang",
  },
];

const goals: { key: Goal; label: string; note: string }[] = [
  { key: "15", label: "15 Menit", note: "Santai (1 modul)" },
  { key: "20", label: "20 Menit", note: "Ideal (optimal SRS)" },
  { key: "30", label: "30 Menit", note: "Intensif & dialog" },
];

export function SuccessOnboarding({
  downloads,
  primaryCta,
  secondaryCta,
}: {
  downloads: ReactNode;
  primaryCta: ReactNode;
  secondaryCta: ReactNode;
}) {
  const [track, setTrack] = useState<Track>("dual");
  const [goal, setGoal] = useState<Goal>("20");
  const [reminder, setReminder] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  function savePreferences() {
    setNotice(
      "Pratinjau — preferensi tidak disimpan dan tidak mengubah kurikulum.",
    );
  }

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-1.5">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand">
          <span aria-hidden="true">✦</span>
          Panduan Belajar Santri Baru
        </p>
        <h2 className="text-[18px] font-bold leading-snug text-ink sm:text-[20px]">
          3 Langkah Singkat Memulai Petualangan Bahasa Arab Anda
        </h2>
        <p className="text-[11px] leading-5 text-muted">
          Pilihan di bawah hanya ilustrasi antarmuka. Tidak ada preferensi yang
          dikirim, disimpan, atau dipakai untuk merekomendasikan materi.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[12px] font-bold text-ink">
            <span className="grid size-6 place-items-center rounded-full bg-emerald-950 text-[10px] font-bold text-white">
              1
            </span>
            Tentukan fokus jalur belajar pertama Anda
          </span>
          <span className="text-[10px] text-muted">Dapat diubah kapan saja</span>
        </div>
        <div
          role="radiogroup"
          aria-label="Pilih fokus jalur belajar contoh"
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {tracks.map((item) => {
            const active = track === item.key;
            return (
              <button
                key={item.key}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setTrack(item.key)}
                className={cn(
                  "flex flex-col gap-2 rounded-xl border p-3 text-left transition-colors",
                  active
                    ? "border-transparent bg-brand text-white shadow-md"
                    : "border-line/70 bg-paper text-ink hover:bg-line/30",
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-[9px] font-bold",
                      active
                        ? "bg-white/15 text-emerald-50"
                        : "bg-line/40 text-brand",
                    )}
                  >
                    {item.tag}
                  </span>
                  {active ? <IconCheck className="size-4" /> : null}
                </span>
                <span
                  lang="ar"
                  dir="rtl"
                  className={cn(
                    "font-arabic text-[18px] font-bold leading-tight",
                    active ? "text-white" : "text-ink",
                  )}
                >
                  {item.arabic}
                </span>
                <span
                  className={cn(
                    "text-[10px] leading-4",
                    active ? "text-emerald-100" : "text-muted",
                  )}
                >
                  {item.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-line/60 pt-4">
        <span className="flex items-center gap-2 text-[12px] font-bold text-ink">
          <span className="grid size-6 place-items-center rounded-full bg-emerald-950 text-[10px] font-bold text-white">
            2
          </span>
          Atur target komitmen waktu harian
        </span>
        <div
          role="radiogroup"
          aria-label="Pilih target waktu harian contoh"
          className="grid grid-cols-3 gap-3"
        >
          {goals.map((item) => {
            const active = goal === item.key;
            return (
              <button
                key={item.key}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setGoal(item.key)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 rounded-lg border p-3 text-center transition-colors",
                  active
                    ? "border-transparent bg-emerald-950 text-white shadow-sm"
                    : "border-line/70 bg-paper text-ink hover:bg-line/30",
                )}
              >
                <span className="text-[13px] font-bold">{item.label}</span>
                <span
                  className={cn(
                    "text-[9px]",
                    active ? "text-emerald-200" : "text-muted",
                  )}
                >
                  {item.note}
                </span>
              </button>
            );
          })}
        </div>
        <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line/70 bg-paper p-3 transition-colors hover:bg-line/30">
          <input
            type="checkbox"
            checked={reminder}
            onChange={(event) => setReminder(event.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-emerald-900"
          />
          <span className="flex items-start gap-2 text-[11px] leading-5 text-ink">
            <IconFileText aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" />
            Kirimkan pengingat kosakata harian melalui WhatsApp Bot Lughati
            (+62 812-3456-7890). <strong className="font-bold">Contoh</strong> —
            tidak ada pesan yang dikirim.
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-3 border-t border-line/60 pt-4">
        <span className="flex items-center gap-2 text-[12px] font-bold text-ink">
          <span className="grid size-6 place-items-center rounded-full bg-emerald-950 text-[10px] font-bold text-white">
            3
          </span>
          Unduh paket audio offline &amp; modul panduan
        </span>
        {downloads}
      </div>

      <div className="flex flex-col gap-3 border-t border-line/60 pt-5 sm:flex-row sm:items-center">
        {primaryCta}
        {secondaryCta}
      </div>
      <button
        type="button"
        onClick={savePreferences}
        className="self-start rounded-lg border border-line/80 bg-paper px-4 py-2 text-[11px] font-bold text-brand transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
      >
        Simpan Preferensi (Pratinjau)
      </button>
      {notice ? (
        <p
          role="status"
          className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-[10px] font-semibold leading-4 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
        >
          {notice}
        </p>
      ) : null}
    </section>
  );
}

export function DownloadLink({
  title,
  meta,
  icon,
  onClick,
}: {
  title: string;
  meta: string;
  icon: "pdf" | "audio";
  onClick: () => void;
}) {
  const Icon = icon === "audio" ? IconHeadphones : IconFileText;
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-w-0 flex-1 items-center gap-3 rounded-lg border border-line/70 bg-paper p-3 text-left transition-colors hover:bg-line/30"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-brand shadow-sm">
        <Icon className="size-5" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-[11px] font-semibold text-ink">
          {title}
        </span>
        <span className="text-[9px] text-muted">{meta}</span>
      </span>
      <IconDownload aria-hidden="true" className="ml-auto size-4 shrink-0 text-brand" />
    </button>
  );
}

function IconHeadphones(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h3v6H5a1 1 0 0 1-1-1Z" />
      <path d="M20 14h-3v6h2a1 1 0 0 0 1-1Z" />
    </svg>
  );
}
