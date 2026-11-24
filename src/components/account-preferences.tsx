"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { IconBook, IconCheck, IconClock, IconMic, IconSparkles } from "./icons";

type TrackMode = "seimbang" | "fushah" | "amiyah";

const tracks: {
  key: TrackMode;
  label: string;
  hint: string;
  tag: string;
}[] = [
  {
    key: "seimbang",
    label: "Jalur Seimbang (Dual-Track)",
    hint: "Fushah 50% dan Amiyah Saudi 50% untuk literatur sekaligus percakapan.",
    tag: "Rekomendasi",
  },
  {
    key: "fushah",
    label: "Fushah Dominan",
    hint: "Fokus kajian naskah klasik, gramatika, dan bacaan kitab turots.",
    tag: "Akademik",
  },
  {
    key: "amiyah",
    label: "Amiyah Dominan",
    hint: "Fokus kelancaran lisan untuk bisnis di Riyadh, Jeddah, dan pergaulan.",
    tag: "Keseharian",
  },
];

const tagTone: Record<TrackMode, string> = {
  seimbang: "bg-brand text-white",
  fushah: "bg-line/60 text-muted",
  amiyah: "bg-sand-200 text-sand-900 dark:bg-sand-300/20 dark:text-sand-200",
};

export function AccountPreferences() {
  const [track, setTrack] = useState<TrackMode>("seimbang");
  const [dialect, setDialect] = useState("Najdi dan Hijazi Saudi");
  const [goal, setGoal] = useState("20");
  const [tashkeel, setTashkeel] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  function save() {
    setNotice(
      "Pratinjau — preferensi tidak disimpan. Tidak ada pengaturan akun yang berubah.",
    );
  }

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl space-y-1">
          <h2 className="flex items-center gap-2 text-[18px] font-bold text-ink">
            <IconBook className="size-5 text-brand" />
            Preferensi Kurikulum dan Jalur Belajar
          </h2>
          <p className="text-[12px] leading-5 text-muted">
            Kustomisasi penekanan materi antara Bahasa Arab Standar (Fushah) dan
            dialek percakapan sehari-hari (Amiyah Saudi). Pilihan di bawah hanya
            ilustrasi.
          </p>
        </div>
        <span
          lang="ar"
          dir="rtl"
          className="font-arabic text-[15px] text-brand"
        >
          تفضيلات التعلم
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[12px] font-semibold text-ink">
          Fokus Utama Jalur Belajar (Track Mode)
        </p>
        <div
          role="group"
          aria-label="Fokus utama jalur belajar"
          className="grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {tracks.map((item) => {
            const selected = item.key === track;
            return (
              <button
                key={item.key}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setTrack(item.key);
                  setNotice(null);
                }}
                className={cn(
                  "flex min-h-36 flex-col justify-between gap-3 rounded-xl border p-4 text-left transition-colors",
                  selected
                    ? "border-brand/60 bg-emerald-50 shadow-sm dark:bg-emerald-900/20"
                    : "border-line/70 bg-paper hover:bg-line/30",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-[9px] font-bold",
                      tagTone[item.key],
                    )}
                  >
                    {item.tag}
                  </span>
                  <span
                    className={cn(
                      "grid size-5 shrink-0 place-items-center rounded-full border",
                      selected
                        ? "border-brand bg-brand text-white"
                        : "border-line text-transparent",
                    )}
                  >
                    <IconCheck className="size-3" />
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-[12px] font-bold text-ink">{item.label}</p>
                  <p className="text-[11px] leading-4 text-muted">{item.hint}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-[12px] font-semibold text-ink">
            Dialek Amiyah Pilihan Utama
          </span>
          <span className="flex items-center gap-2.5 rounded-xl border border-line/70 bg-paper p-3">
            <IconMic className="size-5 shrink-0 text-brand" />
            <select
              value={dialect}
              onChange={(event) => {
                setDialect(event.target.value);
                setNotice(null);
              }}
              aria-label="Dialek Amiyah pilihan utama"
              className="min-w-0 flex-1 bg-transparent text-[12px] font-semibold text-ink focus:outline-none"
            >
              <option>Najdi dan Hijazi Saudi</option>
              <option>Najdi (Riyadh)</option>
              <option>Hijazi (Jeddah dan Mekkah)</option>
            </select>
          </span>
          <span className="text-[10px] text-muted">
            Riyadh, Mekkah, dan Jeddah — contoh pilihan.
          </span>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-[12px] font-semibold text-ink">
            Target Komitmen Harian (SRS)
          </span>
          <span className="flex items-center gap-2.5 rounded-xl border border-line/70 bg-paper p-3">
            <IconClock className="size-5 shrink-0 text-gold" />
            <select
              value={goal}
              onChange={(event) => {
                setGoal(event.target.value);
                setNotice(null);
              }}
              aria-label="Target komitmen harian"
              className="min-w-0 flex-1 bg-transparent text-[12px] font-semibold text-ink focus:outline-none"
            >
              <option value="10">10 menit / hari</option>
              <option value="20">20 menit / hari</option>
              <option value="30">30 menit / hari</option>
            </select>
          </span>
          <span className="text-[10px] text-muted">
            Pengingat contoh: 20.30 WIB — tidak dijadwalkan sungguhan.
          </span>
        </label>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line/70 bg-paper p-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-surface text-brand shadow-sm">
            <IconSparkles className="size-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-[12px] font-semibold text-ink">
              Tashkeel Penuh dan Transliterasi Latin
            </span>
            <span className="text-[11px] leading-4 text-muted">
              Tampilkan harakat lengkap pada mufrodat dan panduan fonetik.
            </span>
          </div>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={tashkeel}
          aria-label="Aktifkan tashkeel penuh dan transliterasi Latin"
          onClick={() => {
            setTashkeel((current) => !current);
            setNotice(null);
          }}
          className={cn(
            "relative h-6 w-11 shrink-0 rounded-full p-0.5 shadow-inner transition-colors",
            tashkeel ? "bg-brand" : "bg-line",
          )}
        >
          <span
            className={cn(
              "block size-5 rounded-full bg-white shadow-sm transition-transform",
              tashkeel && "translate-x-5",
            )}
          />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3">
        {notice ? (
          <p
            role="status"
            className="max-w-md rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold leading-4 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
          >
            {notice}
          </p>
        ) : null}
        <button
          type="button"
          onClick={save}
          className="rounded-lg bg-emerald-950 px-6 py-2.5 text-[12px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
        >
          Simpan Perubahan Preferensi (Pratinjau)
        </button>
      </div>
    </section>
  );
}
