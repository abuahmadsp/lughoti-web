"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  IconArrowRight,
  IconBook,
  IconCheck,
  IconClock,
  IconList,
  IconMore,
  IconRefresh,
  IconSparkles,
  IconStar,
  IconX,
} from "./icons";

export type VocabularyEntrySummary = {
  id: number;
  arabic: string;
  translit: string;
  meaning: string;
  kind: string;
  note: string;
};

export type VocabularyAction =
  | { kind: "tashrif-table" }
  | { kind: "dialect-article" }
  | { kind: "entry-options"; entry: VocabularyEntrySummary };

type VocabularyContextValue = {
  open: (action: VocabularyAction) => void;
};

const VocabularyContext = createContext<VocabularyContextValue | null>(null);

function useVocabularyActions() {
  const value = useContext(VocabularyContext);
  if (!value) {
    throw new Error(
      "Aksi kosakata harus dipakai di dalam VocabularyActionsProvider",
    );
  }
  return value;
}

/** Session-only dialog state for the vocabulary page's remaining controls. */
export function VocabularyActionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [action, setAction] = useState<VocabularyAction | null>(null);
  const open = useCallback((next: VocabularyAction) => setAction(next), []);
  const close = useCallback(() => setAction(null), []);

  return (
    <VocabularyContext.Provider value={{ open }}>
      {children}
      {action ? <ActionDialog action={action} onClose={close} /> : null}
    </VocabularyContext.Provider>
  );
}

export function VocabularyActionButton({
  action,
  children,
  className,
  title,
  ariaLabel,
}: {
  action: VocabularyAction;
  children: ReactNode;
  className?: string;
  title?: string;
  ariaLabel?: string;
}) {
  const { open } = useVocabularyActions();
  return (
    <button
      type="button"
      onClick={() => open(action)}
      title={title}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
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
  icon: Icon,
  title,
  eyebrow,
  children,
  footer,
}: {
  labelledBy: string;
  onClose: () => void;
  icon: typeof IconBook;
  title: string;
  eyebrow: string;
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
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
                <Icon className="size-4" />
              </span>
              <h2 id={labelledBy} className="text-[16px] font-bold text-ink">
                {title}
              </h2>
              <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
                Contoh
              </span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
              {eyebrow}
            </p>
          </div>
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

const tashrifRows = [
  {
    label: "Fi'il Madhi",
    arabic: "كَتَبَ",
    translit: "kataba",
    meaning: "Dia telah menulis",
  },
  {
    label: "Fi'il Mudhari'",
    arabic: "يَكْتُبُ",
    translit: "yaktubu",
    meaning: "Dia sedang menulis",
  },
  {
    label: "Fi'il Amr",
    arabic: "اُكْتُبْ",
    translit: "uktub",
    meaning: "Tulislah!",
  },
  {
    label: "Masdar",
    arabic: "كِتَابَةً",
    translit: "kitābah",
    meaning: "Penulisan",
  },
  {
    label: "Isim Fa'il",
    arabic: "كَاتِبٌ",
    translit: "kātubun",
    meaning: "Penulis (pelaku)",
  },
  {
    label: "Isim Maf'ul",
    arabic: "مَكْتُوبٌ",
    translit: "maktūbun",
    meaning: "Ditulis (objek)",
  },
];

function TashrifTableDialog({ onClose }: { onClose: () => void }) {
  return (
    <DialogShell
      labelledBy="tashrif-table-title"
      onClose={onClose}
      icon={IconBook}
      title="Tabel Tashrif Lengkap"
      eyebrow="Akar kata: ك - ت - ب • Mujarrad tsulatsi"
      footer={
        <>
          <p className="text-[10px] leading-4 text-muted">
            Contoh — tabel ini ringkasan ilustratif, bukan kamus atau data
            terverifikasi.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-emerald-950 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          >
            Tutup
          </button>
        </>
      }
    >
      <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-900/25">
        <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
          Pola wazan
        </p>
        <p lang="ar" dir="rtl" className="mt-1 font-arabic text-[18px] font-bold text-ink">
          فَعَلَ → يَفْعُلُ → اُفْعُلْ
        </p>
        <p className="mt-1 text-[10px] text-muted">
          Pola fi&apos;il tsulatsi mujarrad yang dipakai pada enam bentuk di bawah.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {tashrifRows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-1 rounded-xl border border-line/70 bg-surface px-3 py-2.5 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-3"
          >
            <p className="text-[10px] font-bold uppercase tracking-wide text-muted">
              {row.label}
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="font-arabic text-[19px] font-bold leading-loose text-brand"
            >
              {row.arabic}
            </p>
            <div className="sm:text-right">
              <p className="font-mono text-[10px] font-semibold text-ink">
                {row.translit}
              </p>
              <p className="text-[10px] text-muted">{row.meaning}</p>
            </div>
          </div>
        ))}
      </div>
    </DialogShell>
  );
}

const dialectNotes = [
  {
    title: "Pelafalan Qaf (ق)",
    text: "Di Hijaz (Mekkah, Madinah, Jeddah), ق sering dilafalkan /G/ lembut: قَهْوَة menjadi gahwah. Di Najd (Riyadh), bunyi /Q/ lebih jelas.",
  },
  {
    title: "Bertanya “Kenapa?”",
    text: "Hijaz memakai Lēsh?, sementara sebagian kawasan pedalaman memakai Warrāh?. Keduanya dipahami, tetapi konotasinya berbeda menurut daerah.",
  },
  {
    title: "Sapaan hangat",
    text: "حَيَّاكَ اللهُ (Ḥayyākallāh) lazim dipakai saat menyambut tamu di majlis atau toko, diikuti عَفْوًا (‘Afwan) sebagai balasan terima kasih.",
  },
];

function DialectArticleDialog({ onClose }: { onClose: () => void }) {
  return (
    <DialogShell
      labelledBy="dialect-article-title"
      onClose={onClose}
      icon={IconSparkles}
      title="Pedoman Percakapan Saudi #14"
      eyebrow="Tips Dialek: Najd vs. Hijaz"
      footer={
        <>
          <p className="text-[10px] leading-4 text-muted">
            Contoh — ringkasan demo untuk mengenal perbedaan dialek, bukan
            panduan resmi.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-emerald-950 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          >
            Tutup
          </button>
        </>
      }
    >
      <p className="text-[12px] leading-5 text-muted">
        Perbedaan kecil antara dialek Hijaz dan Najd sering muncul pada
        percakapan sehari-hari. Tiga catatan berikut merangkum yang paling
        sering ditemui santri.
      </p>
      <div className="mt-3 flex flex-col gap-2">
        {dialectNotes.map((note, index) => (
          <div
            key={note.title}
            className="rounded-xl border border-line/70 bg-surface p-3"
          >
            <p className="flex items-center gap-2 text-[11px] font-bold text-ink">
              <span className="grid size-5 place-items-center rounded-full bg-line/40 text-[9px] font-bold text-muted">
                {index + 1}
              </span>
              {note.title}
            </p>
            <p className="mt-1.5 text-[11px] leading-5 text-muted">{note.text}</p>
          </div>
        ))}
      </div>
    </DialogShell>
  );
}

function EntryOptionsDialog({
  entry,
  onClose,
}: {
  entry: VocabularyEntrySummary;
  onClose: () => void;
}) {
  const [addedToSession, setAddedToSession] = useState(false);
  const [markedDue, setMarkedDue] = useState(false);

  return (
    <DialogShell
      labelledBy="entry-options-title"
      onClose={onClose}
      icon={IconMore}
      title="Opsi Kosakata"
      eyebrow={`ID demo ${entry.id} • ${entry.kind}`}
      footer={
        <>
          <p className="text-[10px] leading-4 text-muted">
            Contoh — opsi hanya mengubah tampilan sesi ini, tanpa menulis SRS
            atau favorit.
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
      <div className="flex items-start justify-between gap-3 rounded-xl border border-line/70 bg-surface p-3">
        <div className="min-w-0">
          <p className="text-[13px] font-bold text-ink">{entry.meaning}</p>
          <p className="mt-0.5 text-[11px] font-medium text-brand">
            {entry.translit}
          </p>
          <p className="mt-1 text-[10px] leading-4 text-muted">{entry.note}</p>
        </div>
        <p
          lang="ar"
          dir="rtl"
          className="shrink-0 font-arabic text-[22px] font-bold text-ink"
        >
          {entry.arabic}
        </p>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setAddedToSession(true)}
          disabled={addedToSession}
          className={cn(
            "flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
            addedToSession
              ? "border-brand/30 bg-emerald-50 dark:bg-emerald-900/20"
              : "border-line/70 bg-surface hover:bg-paper",
          )}
        >
          <span className="flex items-center gap-2">
            <IconStar className="size-4 text-brand" />
            <span className="text-[11px] font-semibold text-ink">
              Tambah ke Sesi Hafalan
            </span>
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-brand">
            {addedToSession ? <IconCheck className="size-3.5" /> : <IconArrowRight className="size-3.5" />}
            {addedToSession ? "Ditambahkan (Contoh)" : "Pratinjau"}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setMarkedDue(true)}
          disabled={markedDue}
          className={cn(
            "flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors",
            markedDue
              ? "border-sand-300 bg-sand-100 dark:bg-sand-300/15"
              : "border-line/70 bg-surface hover:bg-paper",
          )}
        >
          <span className="flex items-center gap-2">
            <IconClock className="size-4 text-sand-700 dark:text-sand-300" />
            <span className="text-[11px] font-semibold text-ink">
              Tandai Perlu Diulang
            </span>
          </span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-sand-700 dark:text-sand-300">
            {markedDue ? <IconCheck className="size-3.5" /> : <IconRefresh className="size-3.5" />}
            {markedDue ? "Ditandai (Contoh)" : "Pratinjau"}
          </span>
        </button>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[10px] leading-4 text-muted">
        <IconList className="size-3.5 shrink-0 text-brand" />
        Kedua aksi di atas hanya simulasi: tidak ada kartu, jadwal SRS, atau
        peringkat yang disimpan.
      </p>
    </DialogShell>
  );
}

function ActionDialog({
  action,
  onClose,
}: {
  action: VocabularyAction;
  onClose: () => void;
}) {
  switch (action.kind) {
    case "tashrif-table":
      return <TashrifTableDialog onClose={onClose} />;
    case "dialect-article":
      return <DialectArticleDialog onClose={onClose} />;
    case "entry-options":
      return <EntryOptionsDialog entry={action.entry} onClose={onClose} />;
  }
}
