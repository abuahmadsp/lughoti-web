"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { ModelText, useTalaqqiModel } from "./talaqqi-model-flow";
import {
  IconAlert,
  IconBadgeCheck,
  IconCalendar,
  IconCheck,
  IconChevronRight,
  IconCompare,
  IconPencil,
  IconPlay,
  IconX,
} from "./icons";

type ScoreTone = "good" | "gold" | "danger";

type StreamRow = {
  id: string;
  initials: string;
  avatarClass: string;
  name: string;
  tier: string;
  tierClass: string;
  phrase: string;
  track: string;
  trackValue: "fushah" | "amiyah";
  trackClass: string;
  score: string;
  scoreTone: ScoreTone;
  scoreNote: string;
  analysis: string;
  needsCorrection: boolean;
  actionLabel: string;
};

const streamRows: StreamRow[] = [
  {
    id: "ST-9021",
    initials: "FR",
    avatarClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    name: "Fathia Rahma",
    tier: "VIP Talaqqi",
    tierClass: "text-gold",
    phrase: "أَهْلًا وَسَهْلًا بِكُمْ",
    track: "Fushah Klasik",
    trackValue: "fushah",
    trackClass:
      "border-brand/25 bg-brand/10 text-brand dark:border-brand/30 dark:bg-brand/15",
    score: "99,2%",
    scoreTone: "good",
    scoreNote: "Mumtaz",
    analysis:
      "Makhraj Halq sempurna, sifat Hams pada huruf Ha' (هـ) presisi tinggi.",
    needsCorrection: false,
    actionLabel: "Bandingkan",
  },
  {
    id: "ST-7734",
    initials: "AG",
    avatarClass: "bg-emerald-950 text-white dark:bg-emerald-800",
    name: "M. Al-Ghazali",
    tier: "Reguler",
    tierClass: "text-muted",
    phrase: "عَلَى رَاسِي وَالله",
    track: "Amiyah Hijaz",
    trackValue: "amiyah",
    trackClass:
      "border-sand-300/60 bg-sand-100 text-sand-800 dark:border-sand-300/30 dark:bg-sand-300/15 dark:text-sand-200",
    score: "91,5%",
    scoreTone: "gold",
    scoreNote: "Jayyid",
    analysis:
      "Intonasi dialek Saudi natural. Sedikit kompresi pada artikulasi 'Ain awal.",
    needsCorrection: false,
    actionLabel: "Bandingkan",
  },
  {
    id: "ST-6104",
    initials: "AF",
    avatarClass: "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-200",
    name: "Ahmad Fauzi",
    tier: "Pemula",
    tierClass: "text-muted",
    phrase: "المَفْعُولُ بِهِ مَنْصُوبٌ",
    track: "Fushah Nahwu",
    trackValue: "fushah",
    trackClass:
      "border-brand/25 bg-brand/10 text-brand dark:border-brand/30 dark:bg-brand/15",
    score: "84,0%",
    scoreTone: "danger",
    scoreNote: "Perlu koreksi",
    analysis:
      "Deviasi: Huruf 'Ain tertukar Hamzah; Mad Thabi'i terpotong 1 harakat.",
    needsCorrection: true,
    actionLabel: "Koreksi Manual",
  },
  {
    id: "ST-8812",
    initials: "SN",
    avatarClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    name: "Siti Nurhaliza",
    tier: "VIP Talaqqi",
    tierClass: "text-gold",
    phrase: "يَعْطِيكَ العَافِيَة يَا خُوي",
    track: "Amiyah Najd",
    trackValue: "amiyah",
    trackClass:
      "border-sand-300/60 bg-sand-100 text-sand-800 dark:border-sand-300/30 dark:bg-sand-300/15 dark:text-sand-200",
    score: "96,8%",
    scoreTone: "good",
    scoreNote: "Mumtaz",
    analysis:
      "Ritme fonem Najdi akurat, artikulasi Jim & Kha' sesuai native speaker Riyadh.",
    needsCorrection: false,
    actionLabel: "Bandingkan",
  },
];

const scoreToneClass: Record<ScoreTone, string> = {
  good: "text-brand",
  gold: "text-gold",
  danger: "text-red-600 dark:text-red-400",
};

function DemoToast({ message, onClose }: { message: string; onClose?: () => void }) {
  return (
    <div
      role="status"
      className="animate-flow-in fixed bottom-4 right-4 z-[80] flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border border-brand/30 bg-emerald-950 p-4 text-sand-50 shadow-xl sm:bottom-6 sm:right-6"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-white">
        <IconCheck className="size-4" />
      </span>
      <p className="flex-1 text-[11px] font-semibold leading-5">{message}</p>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup notifikasi"
          className="rounded p-1 text-emerald-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          <IconX className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}

/** Demo-only action button used by the server-rendered page header and rail. */
export function DemoActionButton({
  className,
  children,
  notice,
  title,
}: {
  className?: string;
  children: ReactNode;
  notice: string;
  title?: string;
}) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [message]);

  return (
    <>
      <button type="button" title={title} onClick={() => setMessage(notice)} className={className}>
        {children}
      </button>
      {message ? <DemoToast message={message} onClose={() => setMessage(null)} /> : null}
    </>
  );
}

/** Period selector in the page header; changing it only raises a demo notice. */
export function DemoSelect({
  options,
  ariaLabel,
  notice,
}: {
  options: string[];
  ariaLabel: string;
  /** Demo notice text; `{value}` is replaced with the selected option. */
  notice: string;
}) {
  const [value, setValue] = useState(options[0]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [message]);

  return (
    <>
      <label className="inline-flex items-center gap-2 rounded-xl border border-line/70 bg-surface px-3 py-2.5 shadow-sm">
        <IconCalendar className="size-4 text-muted" />
        <select
          value={value}
          aria-label={ariaLabel}
          onChange={(event) => {
            setValue(event.target.value);
            setMessage(notice.replace("{value}", event.target.value));
          }}
          className="cursor-pointer bg-transparent text-[11px] font-semibold text-ink focus:outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <IconChevronRight className="pointer-events-none size-3.5 rotate-90 text-muted" />
      </label>
      {message ? <DemoToast message={message} onClose={() => setMessage(null)} /> : null}
    </>
  );
}

function ScoreBadge({ row }: { row: StreamRow }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={cn("text-[11px] font-bold", scoreToneClass[row.scoreTone])}>
        {row.score}
      </span>
      {row.scoreTone === "danger" ? (
        <IconAlert className="size-3.5 text-red-600 dark:text-red-400" />
      ) : (
        <IconBadgeCheck className={cn("size-3.5", scoreToneClass[row.scoreTone])} />
      )}
      <span className="text-[10px] font-semibold text-muted">{row.scoreNote}</span>
    </div>
  );
}

function StreamTable({
  rows,
  onlyCorrection,
  onOnlyCorrectionChange,
  onNotice,
}: {
  rows: StreamRow[];
  onlyCorrection: boolean;
  onOnlyCorrectionChange: (value: boolean) => void;
  onNotice: (message: string) => void;
}) {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <header className="flex flex-col gap-2 border-b border-line/70 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-red-500 animate-pulse-dot" />
          <h2 className="text-[14px] font-bold text-ink">
            Real-time Talaqqi Audio Verification Stream
          </h2>
          <span className="rounded-full bg-paper px-2 py-0.5 text-[9px] font-bold text-muted">
            Data demo
          </span>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            Model <ModelText slot="version" />
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onOnlyCorrectionChange(false)}
            aria-pressed={!onlyCorrection}
            className={cn(
              "rounded-lg px-2.5 py-1.5 text-[10px] font-bold transition-colors",
              !onlyCorrection
                ? "bg-paper text-ink shadow-sm"
                : "text-muted hover:bg-paper hover:text-ink",
            )}
          >
            Semua Tingkat
          </button>
          <button
            type="button"
            onClick={() => onOnlyCorrectionChange(true)}
            aria-pressed={onlyCorrection}
            className={cn(
              "rounded-lg px-2.5 py-1.5 text-[10px] font-bold transition-colors",
              onlyCorrection
                ? "bg-gold/20 text-gold"
                : "text-muted hover:bg-paper hover:text-ink",
            )}
          >
            Hanya Perlu Koreksi
          </button>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead className="text-[10px] uppercase tracking-wider text-muted">
            <tr className="border-b border-line/70">
              <th className="px-2 py-2 font-semibold">Santri &amp; Tier</th>
              <th className="px-2 py-2 text-right font-semibold">Lafaz / Frasa Uji</th>
              <th className="px-2 py-2 font-semibold">Jalur Dialek</th>
              <th className="px-2 py-2 font-semibold">Skor AI</th>
              <th className="px-2 py-2 font-semibold">Analisis Fonetik Utama</th>
              <th className="px-2 py-2 text-center font-semibold">Audio &amp; Validasi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60 text-[11px] text-ink">
            {rows.map((row) => (
              <tr key={row.id} className="transition-colors hover:bg-paper/70">
                <td className="px-2 py-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                        row.avatarClass,
                      )}
                    >
                      {row.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-bold text-ink">{row.name}</p>
                      <p className={cn("truncate text-[10px] font-semibold", row.tierClass)}>
                        {row.tier} • ID #{row.id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-3 text-right">
                  <span
                    lang="ar"
                    dir="rtl"
                    className="font-arabic text-[17px] font-semibold text-ink"
                  >
                    {row.phrase}
                  </span>
                </td>
                <td className="px-2 py-3">
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 text-[10px] font-semibold",
                      row.trackClass,
                    )}
                  >
                    {row.track}
                  </span>
                </td>
                <td className="px-2 py-3">
                  <ScoreBadge row={row} />
                </td>
                <td className="px-2 py-3">
                  <p
                    className={cn(
                      "max-w-[240px] leading-4",
                      row.needsCorrection
                        ? "font-medium text-red-600 dark:text-red-400"
                        : "text-muted",
                    )}
                  >
                    {row.analysis}
                  </p>
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      aria-label={`Putar pratinjau audio ${row.name}`}
                      onClick={() =>
                        onNotice(
                          `Pratinjau — audio ${row.name} belum tersedia, tidak ada berkas yang diputar.`,
                        )
                      }
                      className="grid size-8 place-items-center rounded-lg bg-paper text-ink transition-colors hover:bg-brand hover:text-white"
                    >
                      <IconPlay className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onNotice(
                          row.needsCorrection
                            ? "Pratinjau — koreksi manual hanya simulasi demo."
                            : "Pratinjau — perbandingan dengan qari rujukan belum tersedia.",
                        )
                      }
                      className={cn(
                        "inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[10px] font-bold transition-colors",
                        row.needsCorrection
                          ? "bg-gold/20 text-gold hover:bg-gold/30"
                          : "bg-paper text-ink hover:bg-line/30",
                      )}
                    >
                      {row.needsCorrection ? (
                        <IconPencil className="size-3" />
                      ) : (
                        <IconCompare className="size-3" />
                      )}
                      {row.actionLabel}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-2 py-10 text-center text-[12px] text-muted">
                  Tidak ada evaluasi contoh yang cocok dengan filter ini.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-col gap-2 border-t border-line/70 pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[10px] text-muted">
          Menampilkan {rows.length} dari{" "}
          <span className="font-bold text-ink">1.842</span> evaluasi sesi hari ini (
          <span className="font-bold text-brand">contoh</span>)
        </p>
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            disabled
            aria-label="Halaman sebelumnya"
            className="rounded-lg bg-paper px-3 py-1.5 text-[10px] font-bold text-muted opacity-50"
          >
            Sebelumnya
          </button>
          {["1", "2", "3"].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onNotice(`Pratinjau — halaman ${page} tidak tersedia dalam demo.`)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[10px] font-bold transition-colors",
                page === "1"
                  ? "bg-emerald-950 text-white dark:bg-emerald-900"
                  : "bg-paper text-ink hover:bg-line/30",
              )}
            >
              {page}
            </button>
          ))}
          <span className="px-1.5 text-muted">…</span>
          <button
            type="button"
            onClick={() => onNotice("Pratinjau — halaman berikutnya tidak tersedia dalam demo.")}
            className="rounded-lg bg-paper px-3 py-1.5 text-[10px] font-bold text-ink transition-colors hover:bg-line/30"
          >
            Selanjutnya
          </button>
        </div>
      </footer>
    </section>
  );
}

export function TalaqqiAnalyticsWorkspace({
  heatmap,
  rail,
}: {
  heatmap: ReactNode;
  rail: ReactNode;
}) {
  const { profile } = useTalaqqiModel();
  const [onlyCorrection, setOnlyCorrection] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const visible = useMemo(
    () =>
      streamRows.filter(
        (row) =>
          (profile.tracks === "all" || row.trackValue === profile.tracks) &&
          (!onlyCorrection || row.needsCorrection),
      ),
    [profile.tracks, onlyCorrection],
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12">
        <div className="flex flex-col gap-4 xl:col-span-8">
          {heatmap}
          <StreamTable
            rows={visible}
            onlyCorrection={onlyCorrection}
            onOnlyCorrectionChange={setOnlyCorrection}
            onNotice={setNotice}
          />
        </div>
        <aside aria-label="Benchmark dan telemetri model AI" className="xl:col-span-4">
          {rail}
        </aside>
      </div>
      {notice ? <DemoToast message={notice} onClose={() => setNotice(null)} /> : null}
    </>
  );
}
