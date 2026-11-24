"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  IconArrowRight,
  IconBook,
  IconCalendar,
  IconCheck,
  IconClipboard,
  IconClock,
  IconDownload,
  IconFileText,
  IconHeadphones,
  IconList,
  IconLock,
  IconPause,
  IconPlay,
  IconRefresh,
  IconSend,
  IconSparkles,
  IconVideo,
  IconX,
} from "./icons";

export type ModuleSummary = {
  id: number;
  title: string;
  arabic: string;
  description: string;
  track: "fushah" | "amiyah" | "vip";
  category: "nahwu" | "hiwar" | "mujam" | "latihan";
  status: "completed" | "in-progress" | "locked";
  progress: number;
  duration: number;
  metaLabels: string[];
  statusLabel?: string;
};

export type MaterialsAction =
  | { kind: "feature-video" }
  | { kind: "feature-pdf" }
  | { kind: "feature-syllabus" }
  | { kind: "diktat"; title: string; meta: string }
  | { kind: "module"; item: ModuleSummary }
  | { kind: "halaqah-question" }
  | { kind: "halaqah-calendar" };

type MaterialsContextValue = {
  open: (action: MaterialsAction) => void;
  savedDocs: string[];
  saveDoc: (title: string) => void;
};

const MaterialsContext = createContext<MaterialsContextValue | null>(null);

function useMaterialsActions() {
  const value = useContext(MaterialsContext);
  if (!value) {
    throw new Error(
      "Aksi materi harus dipakai di dalam MaterialsActionsProvider",
    );
  }
  return value;
}

/** Session-only dialog and document state for the materials library. */
export function MaterialsActionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [action, setAction] = useState<MaterialsAction | null>(null);
  const [savedDocs, setSavedDocs] = useState<string[]>([]);

  const open = useCallback((next: MaterialsAction) => setAction(next), []);
  const close = useCallback(() => setAction(null), []);
  const saveDoc = useCallback((title: string) => {
    setSavedDocs((current) =>
      current.includes(title) ? current : [...current, title],
    );
  }, []);

  return (
    <MaterialsContext.Provider value={{ open, savedDocs, saveDoc }}>
      {children}
      {action ? (
        <ActionDialog
          action={action}
          onClose={close}
          savedDocs={savedDocs}
          onSaveDoc={saveDoc}
        />
      ) : null}
    </MaterialsContext.Provider>
  );
}

/** Client trigger usable from both server-rendered panels and the catalog. */
export function MaterialsActionButton({
  action,
  children,
  className,
  title,
  savedKey,
  savedChildren,
}: {
  action: MaterialsAction;
  children: ReactNode;
  className?: string;
  title?: string;
  savedKey?: string;
  savedChildren?: ReactNode;
}) {
  const { open, savedDocs } = useMaterialsActions();
  const isSaved = savedKey ? savedDocs.includes(savedKey) : false;

  return (
    <button
      type="button"
      onClick={() => open(action)}
      title={isSaved ? `${title ?? ""} • Tersimpan (Pratinjau)` : title}
      className={className}
    >
      {isSaved && savedChildren ? savedChildren : children}
    </button>
  );
}

function useDialogBehavior(onClose: () => void) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return dialogRef;
}

function DialogShell({
  labelledBy,
  onClose,
  header,
  children,
  footer,
}: {
  labelledBy: string;
  onClose: () => void;
  header: ReactNode;
  children: ReactNode;
  footer: ReactNode;
}) {
  const dialogRef = useDialogBehavior(onClose);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-emerald-950/65 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="animate-flow-in relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-line/70 bg-paper shadow-2xl outline-none"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line/70 bg-surface px-5 py-4 sm:px-6">
          {header}
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup dialog"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-line/70 text-muted transition-colors hover:bg-line/30 hover:text-ink"
          >
            <IconX className="size-4" />
          </button>
        </header>
        <div className="max-h-[calc(100dvh-13rem)] overflow-y-auto p-5 sm:p-6">
          {children}
        </div>
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 bg-surface px-5 py-4 sm:px-6">
          {footer}
        </footer>
      </div>
    </div>
  );
}

function DialogTitle({
  id,
  icon: Icon,
  title,
  eyebrow,
}: {
  id: string;
  icon: typeof IconBook;
  title: string;
  eyebrow: string;
}) {
  return (
    <div className="min-w-0 space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
          <Icon className="size-4" />
        </span>
        <h2 id={id} className="text-[16px] font-bold text-ink">
          {title}
        </h2>
        <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
          Pratinjau
        </span>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
        {eyebrow}
      </p>
    </div>
  );
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

const videoSubBabs = [
  { title: "Pengantar I'rab nashob", range: "00:00 – 04:10", start: 0 },
  { title: "Tanda zhahirah & muqaddarah", range: "04:10 – 09:30", start: 23 },
  { title: "Dhomir maf'ul muttashil", range: "09:30 – 14:05", start: 51 },
  { title: "Mu'rab vs Mabni Maf'ul", range: "14:05 – 18:15", start: 77 },
];

function VideoPreviewDialog({ onClose }: { onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(48);
  const [speed, setSpeed] = useState(1);
  const [watched, setWatched] = useState(false);
  const progressRef = useRef(48);

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      const next = Math.min(100, progressRef.current + speed);
      progressRef.current = next;
      setProgress(next);
      if (next >= 100) setPlaying(false);
    }, 160);
    return () => window.clearInterval(interval);
  }, [playing, speed]);

  function togglePlayback() {
    if (progressRef.current >= 100) {
      progressRef.current = 0;
      setProgress(0);
    }
    setPlaying((value) => !value);
  }

  function seek(next: number) {
    progressRef.current = next;
    setProgress(next);
    setPlaying(false);
  }

  const activeSub = progress < 23 ? 0 : progress < 51 ? 1 : progress < 77 ? 2 : 3;

  return (
    <DialogShell
      labelledBy="feature-video-title"
      onClose={onClose}
      header={
        <DialogTitle
          id="feature-video-title"
          icon={IconVideo}
          title="Video Kuliah Bab 4"
          eyebrow="Al-Maf'ul Bih wa 'Alamaat I'raabih"
        />
      }
      footer={
        <>
          <p className="text-[10px] leading-4 text-muted">
            Pratinjau — tidak ada video atau audio sungguhan yang diputar.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setWatched(true)}
              disabled={watched}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-paper px-3.5 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30 disabled:opacity-60"
            >
              {watched ? (
                <IconCheck className="size-3.5 text-brand" />
              ) : (
                <IconPlay className="size-3.5 text-brand" />
              )}
              {watched ? "Ditandai (Pratinjau)" : "Tandai Menonton"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-emerald-950 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
            >
              Tutup
            </button>
          </div>
        </>
      }
    >
      <div className="rounded-xl bg-emerald-950 p-4 text-sand-50">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={togglePlayback}
            aria-label={playing ? "Jeda pratinjau video" : "Putar pratinjau video"}
            aria-pressed={playing}
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full bg-sand-300 text-emerald-950 transition-transform hover:scale-105 active:scale-95",
              playing && "ring-4 ring-sand-300/40",
            )}
          >
            {playing ? <IconPause className="size-5" /> : <IconPlay className="size-5" />}
          </button>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold">
              {videoSubBabs[activeSub].title}
            </span>
            <span className="font-mono text-[10px] text-sand-200/80">
              {formatTime(Math.round((1095 * progress) / 100))} / 18:15
            </span>
          </div>
          <div className="ml-auto flex items-center rounded-lg bg-emerald-900/60 p-0.5">
            {[0.75, 1, 1.25].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setSpeed(value)}
                aria-pressed={speed === value}
                className={cn(
                  "rounded px-2 py-1 text-[10px] font-bold transition-colors",
                  speed === value
                    ? "bg-sand-300 text-emerald-950"
                    : "text-sand-200/70 hover:text-sand-100",
                )}
              >
                {value}x
              </button>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-3 grid h-24 place-items-center rounded-lg bg-gradient-to-br from-emerald-800 via-emerald-950 to-emerald-900"
        >
          <span
            lang="ar"
            dir="rtl"
            className="font-arabic text-xl font-bold text-sand-200/40"
          >
            المَفْعُولُ بِهِ
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-900">
          <div
            className="h-full rounded-full bg-sand-300 transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand">
          <IconList className="size-3.5" />
          Daftar Sub-bab
        </span>
        {videoSubBabs.map((sub, index) => (
          <button
            key={sub.title}
            type="button"
            onClick={() => seek(sub.start)}
            className={cn(
              "flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-left transition-colors",
              activeSub === index
                ? "border-brand/40 bg-emerald-50 dark:bg-emerald-900/20"
                : "border-line/70 bg-surface hover:bg-paper",
            )}
          >
            <span className="flex min-w-0 items-center gap-2">
              <span
                className={cn(
                  "grid size-5 shrink-0 place-items-center rounded-full text-[9px] font-bold",
                  activeSub === index
                    ? "bg-brand text-white"
                    : "bg-line/40 text-muted",
                )}
              >
                {index + 1}
              </span>
              <span className="truncate text-[11px] font-semibold text-ink">
                {sub.title}
              </span>
            </span>
            <span className="shrink-0 text-[10px] text-muted">{sub.range}</span>
          </button>
        ))}
      </div>
    </DialogShell>
  );
}

type DocumentKind = "pdf" | "syllabus" | "diktat";

const documentSections: Record<DocumentKind, string[]> = {
  pdf: [
    "Ringkasan i'rab nashob dan tanda harakatnya",
    "Tabel dhomir maf'ul muttashil",
    "Latihan contoh beserta kunci jawaban",
    "Catatan kesalahan yang sering muncul",
  ],
  syllabus: [
    "Pertemuan 1–2: kedudukan maf'ul dalam jumlah fi'liyyah",
    "Pertemuan 3: tanda nashob zhahirah dan muqaddarah",
    "Pertemuan 4: dhomir muttashil dan munfashil",
    "Pertemuan 5: evaluasi dan pengayaan",
  ],
  diktat: [
    "Bab Al-I'rab",
    "Khutbatul Kitab wa Kalam",
    "Alamat Al-Khofadh",
  ],
};

function DocumentDialog({
  kind,
  title,
  meta,
  savedDocs,
  onSaveDoc,
  onClose,
}: {
  kind: DocumentKind;
  title: string;
  meta: string;
  savedDocs: string[];
  onSaveDoc: (title: string) => void;
  onClose: () => void;
}) {
  const isSaved = savedDocs.includes(title);
  const heading =
    kind === "syllabus"
      ? "Silabus Bab"
      : kind === "diktat"
        ? "Pratinjau Diktat"
        : "Rangkuman Modul";

  return (
    <DialogShell
      labelledBy="document-title"
      onClose={onClose}
      header={
        <DialogTitle
          id="document-title"
          icon={kind === "syllabus" ? IconClipboard : IconFileText}
          title={heading}
          eyebrow={title}
        />
      }
      footer={
        <>
          <p className="text-[10px] leading-4 text-muted">
            Pratinjau — tidak ada berkas yang diunduh atau disimpan ke perangkat.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onSaveDoc(title)}
              disabled={isSaved}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-950 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 disabled:opacity-60 dark:bg-emerald-900 dark:hover:bg-emerald-800"
            >
              {isSaved ? (
                <IconCheck className="size-3.5" />
              ) : (
                <IconDownload className="size-3.5" />
              )}
              {isSaved ? "Tersimpan (Pratinjau)" : "Simpan ke Daftar"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line/70 bg-surface px-3.5 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
            >
              Tutup
            </button>
          </div>
        </>
      }
    >
      <div className="flex items-start gap-3 rounded-xl border border-line/70 bg-surface p-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-emerald-950 text-[9px] font-bold text-sand-200 dark:bg-emerald-900">
          PDF
        </span>
        <div className="min-w-0">
          <p className="text-[12px] font-bold text-ink">{title}</p>
          <p className="mt-0.5 text-[10px] text-muted">{meta}</p>
          <p className="mt-1 text-[10px] text-brand">
            {kind === "syllabus" ? "5 pertemuan" : "14 halaman"} • Data contoh
          </p>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand">
        <IconList className="size-3.5" />
        Isi Pratinjau
      </p>
      <div className="mt-2 flex flex-col gap-1.5">
        {documentSections[kind].map((section, index) => (
          <div
            key={section}
            className="flex items-center gap-2 rounded-lg bg-paper px-3 py-2"
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-line/40 text-[9px] font-bold text-muted">
              {index + 1}
            </span>
            <span className="text-[11px] text-ink">{section}</span>
          </div>
        ))}
      </div>
    </DialogShell>
  );
}

const trackLabels: Record<ModuleSummary["track"], string> = {
  fushah: "Fushah",
  amiyah: "Amiyah Saudi",
  vip: "VIP Exclusive",
};

function ModuleDialog({
  item,
  onClose,
}: {
  item: ModuleSummary;
  onClose: () => void;
}) {
  const [progress, setProgress] = useState(item.progress);
  const [reviewed, setReviewed] = useState(false);
  const [started, setStarted] = useState(false);
  const [vipInfo, setVipInfo] = useState(false);

  const isCompleted = item.status === "completed";
  const isActive = item.status === "in-progress";
  const isVip = item.track === "vip";
  const statusLabel =
    item.statusLabel ??
    (isCompleted
      ? "Tuntas"
      : isActive
        ? `${progress}% Aktif`
        : "Siap Dipelajari");

  function advance() {
    setProgress((current) => Math.min(100, current + 10));
  }

  return (
    <DialogShell
      labelledBy="module-dialog-title"
      onClose={onClose}
      header={
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
              {isVip ? <IconLock className="size-4" /> : <IconBook className="size-4" />}
            </span>
            <h2 id="module-dialog-title" className="text-[16px] font-bold text-ink">
              {item.title}
            </h2>
            <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              Pratinjau
            </span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
            {trackLabels[item.track]} • {statusLabel}
          </p>
        </div>
      }
      footer={
        <>
          <p className="text-[10px] leading-4 text-muted">
            Pratinjau — progres dan aksi di bawah hanya simulasi, tidak disimpan.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line/70 bg-surface px-3.5 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
          >
            Tutup
          </button>
        </>
      }
    >
      <div className="flex flex-col gap-1">
        <p
          lang="ar"
          dir="rtl"
          className="text-right font-arabic text-[17px] font-semibold leading-loose text-brand"
        >
          {item.arabic}
        </p>
        <p className="text-[12px] leading-5 text-muted">{item.description}</p>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-[10px] text-muted">
        {item.metaLabels.map((label) => (
          <span
            key={label}
            className="rounded-lg border border-line/70 bg-surface px-2 py-1"
          >
            {label}
          </span>
        ))}
        {item.duration > 0 ? (
          <span className="inline-flex items-center gap-1 rounded-lg border border-line/70 bg-surface px-2 py-1">
            <IconClock className="size-3" />
            {item.duration} menit
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-muted">Progres modul</span>
          <span className="font-bold text-brand">{progress}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-line/50">
          <div
            className={cn(
              "h-full rounded-full",
              progress >= 100 ? "bg-brand" : "bg-brand/80",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-line/70 bg-surface p-3">
        {isCompleted ? (
          <>
            <p className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
              <IconRefresh className="size-3.5 text-brand" />
              Review Modul
            </p>
            <div className="mt-2 flex flex-col gap-1.5">
              {["Video kuliah dan transkrip", "Kuis pengulangan", "Diktat ringkasan"].map(
                (label) => (
                  <p
                    key={label}
                    className="flex items-center gap-2 text-[10px] text-muted"
                  >
                    <IconCheck className="size-3.5 text-brand" />
                    {label}
                  </p>
                ),
              )}
            </div>
            <button
              type="button"
              onClick={() => setReviewed(true)}
              disabled={reviewed}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-line/40 px-3 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:bg-line/70 disabled:opacity-60"
            >
              {reviewed ? (
                <IconCheck className="size-3.5 text-brand" />
              ) : (
                <IconRefresh className="size-3.5" />
              )}
              {reviewed ? "Review Ditandai (Pratinjau)" : "Ulangi Review"}
            </button>
          </>
        ) : isActive ? (
          <>
            <p className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
              <IconPlay className="size-3.5 text-brand" />
              Lanjutkan Pembelajaran
            </p>
            <p className="mt-1.5 text-[10px] leading-4 text-muted">
              {progress >= 100
                ? "Semua sub-bab dalam pratinjau sudah ditandai selesai."
                : "Tandai sub-bab berikutnya untuk melihat simulasi progres."}
            </p>
            <button
              type="button"
              onClick={advance}
              disabled={progress >= 100}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-950 px-3.5 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 disabled:opacity-60 dark:bg-emerald-900 dark:hover:bg-emerald-800"
            >
              <IconArrowRight className="size-3.5" />
              {progress >= 100
                ? "Selesai (Pratinjau)"
                : "Tandai 1 Sub-bab (Pratinjau)"}
            </button>
          </>
        ) : isVip ? (
          <>
            <p className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
              <IconLock className="size-3.5 text-brand" />
              Akses VIP Eksklusif
            </p>
            <p className="mt-1.5 text-[10px] leading-4 text-muted">
              Modul ini bagian dari paket premium. Pembayaran dan perubahan
              akses tidak diproses pada demo.
            </p>
            {vipInfo ? (
              <p className="mt-2 rounded-lg bg-emerald-50 px-2.5 py-2 text-[10px] font-semibold text-brand dark:bg-emerald-900/20">
                Pratinjau — tidak ada transaksi, tagihan, atau paket yang
                diaktifkan.
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => setVipInfo(true)}
              disabled={vipInfo}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-sand-300 px-3.5 py-2 text-[11px] font-bold text-sand-950 transition-colors hover:bg-sand-200 disabled:opacity-60"
            >
              {vipInfo ? (
                <IconCheck className="size-3.5" />
              ) : (
                <IconSparkles className="size-3.5" />
              )}
              {vipInfo ? "Info Dilihat (Pratinjau)" : "Lihat Info Paket"}
            </button>
          </>
        ) : (
          <>
            <p className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
              <IconBook className="size-3.5 text-brand" />
              Siap Dipelajari
            </p>
            <p className="mt-1.5 text-[10px] leading-4 text-muted">
              {started
                ? "Modul dibuka dalam pratinjau — tidak ada materi sungguhan yang dimuat."
                : "Buka modul untuk melihat gambaran awal materi."}
            </p>
            <button
              type="button"
              onClick={() => setStarted(true)}
              disabled={started}
              className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-950 px-3.5 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 disabled:opacity-60 dark:bg-emerald-900 dark:hover:bg-emerald-800"
            >
              {started ? (
                <IconCheck className="size-3.5" />
              ) : (
                <IconPlay className="size-3.5" />
              )}
              {started ? "Dibuka (Pratinjau)" : "Buka Modul"}
            </button>
          </>
        )}
      </div>
    </DialogShell>
  );
}

function HalaqahQuestionDialog({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (key: string) => void;
}) {
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = question.trim();
    if (!text) {
      setError("Tulis pertanyaan terlebih dahulu.");
      return;
    }
    setSent((current) => [...current, text]);
    setQuestion("");
    setError(null);
    onSave("halaqah-question");
  }

  return (
    <DialogShell
      labelledBy="halaqah-question-title"
      onClose={onClose}
      header={
        <DialogTitle
          id="halaqah-question-title"
          icon={IconSend}
          title="Daftar Pertanyaan Santri"
          eyebrow="Halaqah Tanya Jawab Nahwu • Sabtu 20.00 WIB"
        />
      }
      footer={
        <>
          <p className="text-[10px] leading-4 text-muted">
            Pratinjau — pertanyaan hanya tersimpan di memori sesi, tidak
            dikirim ke musyrif.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line/70 bg-surface px-3.5 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
          >
            Tutup
          </button>
        </>
      }
    >
      <form onSubmit={submit} className="flex flex-col gap-2">
        <label htmlFor="halaqah-question-input" className="text-[11px] font-bold text-ink">
          Pertanyaan untuk Tim Musyrif
        </label>
        <textarea
          id="halaqah-question-input"
          value={question}
          onChange={(event) => {
            setQuestion(event.target.value);
            setError(null);
          }}
          rows={3}
          placeholder="Contoh: bagaimana cara membedakan i'rab marfu' dan mansub pada Inna?"
          className="w-full resize-none rounded-xl border border-line/70 bg-surface px-3 py-2.5 text-[12px] text-ink placeholder:text-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
        />
        {error ? <p className="text-[10px] font-semibold text-red-600 dark:text-red-400">{error}</p> : null}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] text-muted">{question.length} karakter</span>
          <button
            type="submit"
            disabled={question.trim().length === 0}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-950 px-3.5 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 disabled:opacity-50 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          >
            <IconSend className="size-3.5" />
            Kirim Pertanyaan (Pratinjau)
          </button>
        </div>
      </form>

      {sent.length > 0 ? (
        <div className="mt-4 flex flex-col gap-1.5">
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
            Pertanyaan Tersimpan ({sent.length})
          </p>
          {sent.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="rounded-xl border border-line/70 bg-surface p-3"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold text-ink">
                  Pertanyaan {index + 1}
                </span>
                <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                  Baru (Demo)
                </span>
              </div>
              <p className="mt-1 text-[11px] leading-4 text-muted">{item}</p>
            </div>
          ))}
        </div>
      ) : null}
    </DialogShell>
  );
}

function HalaqahCalendarDialog({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (key: string) => void;
}) {
  const [added, setAdded] = useState(false);

  return (
    <DialogShell
      labelledBy="halaqah-calendar-title"
      onClose={onClose}
      header={
        <DialogTitle
          id="halaqah-calendar-title"
          icon={IconCalendar}
          title="Tambah ke Kalender"
          eyebrow="Pratinjau jadwal halaqah"
        />
      }
      footer={
        <>
          <p className="text-[10px] leading-4 text-muted">
            Pratinjau — tidak ada undangan kalender atau pengingat yang dibuat.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setAdded(true);
                onSave("halaqah-calendar");
              }}
              disabled={added}
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-950 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 disabled:opacity-60 dark:bg-emerald-900 dark:hover:bg-emerald-800"
            >
              {added ? (
                <IconCheck className="size-3.5" />
              ) : (
                <IconCalendar className="size-3.5" />
              )}
              {added ? "Ditambahkan (Pratinjau)" : "Tambahkan"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line/70 bg-surface px-3.5 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
            >
              Tutup
            </button>
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-2 rounded-xl border border-line/70 bg-surface p-3">
        <p className="text-[13px] font-bold text-ink">
          Halaqah Tanya Jawab Nahwu &amp; Bedah Soal Ujian
        </p>
        <p className="flex items-center gap-1.5 text-[11px] text-muted">
          <IconCalendar className="size-3.5 text-brand" />
          Sabtu, 20.00 WIB
        </p>
        <p className="flex items-center gap-1.5 text-[11px] text-muted">
          <IconHeadphones className="size-3.5 text-brand" />
          Sesi daring bersama Tim Musyrif Lughati
        </p>
        {added ? (
          <p className="mt-1 rounded-lg bg-emerald-50 px-2.5 py-2 text-[10px] font-semibold text-brand dark:bg-emerald-900/20">
            Jadwal ditandai dalam pratinjau sesi ini saja.
          </p>
        ) : null}
      </div>
    </DialogShell>
  );
}

function ActionDialog({
  action,
  onClose,
  savedDocs,
  onSaveDoc,
}: {
  action: MaterialsAction;
  onClose: () => void;
  savedDocs: string[];
  onSaveDoc: (title: string) => void;
}) {
  switch (action.kind) {
    case "feature-video":
      return <VideoPreviewDialog onClose={onClose} />;
    case "feature-pdf":
      return (
        <DocumentDialog
          kind="pdf"
          title="Rangkuman Bab 4 — Al-Maf'ul Bih"
          meta="14 halaman • Ringkasan Nahwu Dasar"
          savedDocs={savedDocs}
          onSaveDoc={onSaveDoc}
          onClose={onClose}
        />
      );
    case "feature-syllabus":
      return (
        <DocumentDialog
          kind="syllabus"
          title="Silabus Bab 4 — Al-Maf'ul Bih"
          meta="Fushah Al-Mu'ashirah • Tingkat Mutawassith"
          savedDocs={savedDocs}
          onSaveDoc={onSaveDoc}
          onClose={onClose}
        />
      );
    case "diktat":
      return (
        <DocumentDialog
          kind="diktat"
          title={action.title}
          meta={action.meta}
          savedDocs={savedDocs}
          onSaveDoc={onSaveDoc}
          onClose={onClose}
        />
      );
    case "module":
      return <ModuleDialog item={action.item} onClose={onClose} />;
    case "halaqah-question":
      return (
        <HalaqahQuestionDialog onClose={onClose} onSave={onSaveDoc} />
      );
    case "halaqah-calendar":
      return (
        <HalaqahCalendarDialog onClose={onClose} onSave={onSaveDoc} />
      );
  }
}
