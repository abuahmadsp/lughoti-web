"use client";

import Link from "next/link";
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
import {
  IconBadgeCheck,
  IconBook,
  IconCheck,
  IconLanguages,
  IconPlusCircle,
  IconSparkles,
  IconTag,
  IconX,
} from "./icons";

type Track = "fushah" | "amiyah" | "both";

export type CustomVocabularyEntry = {
  id: number;
  arabic: string;
  translit: string;
  meaning: string;
  track: Track;
  kind: string;
  note: string;
  mastery: number;
  masteryLabel: string;
  srs: string;
  days: number;
  due: boolean;
  level: number;
  category: string;
  favorite: boolean;
  bar: string;
  labelTone: string;
  isCustom: true;
};

type VocabularyDraft = {
  arabic: string;
  translit: string;
  meaning: string;
  track: Track;
  category: string;
  kind: string;
  level: number;
  exampleArabic: string;
  exampleTranslit: string;
  exampleMeaning: string;
  note: string;
};

export type GeneratedVocabularyInput = {
  arabic: string;
  translit: string;
  meaning: string;
  track: Track;
  note: string;
};

type LibraryValue = {
  customEntries: CustomVocabularyEntry[];
  addGeneratedEntry: (input: GeneratedVocabularyInput) => void;
};

const VocabularyLibraryContext = createContext<LibraryValue | null>(null);

const initialDraft: VocabularyDraft = {
  arabic: "",
  translit: "",
  meaning: "",
  track: "fushah",
  category: "Perkenalan & Sapaan",
  kind: "Isim (Kata Benda)",
  level: 1,
  exampleArabic: "",
  exampleTranslit: "",
  exampleMeaning: "",
  note: "",
};

const trackLabels: Record<Track, string> = {
  fushah: "Fushah (الفصحى)",
  amiyah: "Amiyah Saudi (العامية)",
  both: "Fushah & Amiyah",
};

const inputClass =
  "w-full rounded-xl border border-line/70 bg-paper px-3 py-2.5 text-[12px] text-ink placeholder:text-muted/60 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";
const arabicInputClass = `${inputClass} font-arabic text-[18px]`;

export function useVocabularyLibrary() {
  const value = useContext(VocabularyLibraryContext);
  if (!value) {
    throw new Error(
      "useVocabularyLibrary harus dipakai di dalam AddVocabularyProvider",
    );
  }
  return value;
}

export function AddVocabularyOpenButton({
  className,
  children,
  title,
}: {
  className?: string;
  children: ReactNode;
  title?: string;
}) {
  const { open } = useOpenVocabulary();
  return (
    <button type="button" onClick={open} title={title} className={className}>
      {children}
    </button>
  );
}

function useOpenVocabulary() {
  const value = useContext(OpenVocabularyContext);
  if (!value) {
    throw new Error(
      "AddVocabularyOpenButton harus dipakai di dalam AddVocabularyProvider",
    );
  }
  return value;
}

const OpenVocabularyContext = createContext<{ open: () => void } | null>(null);

export function AddVocabularyProvider({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toast, setToast] = useState<{ arabic: string; meaning: string } | null>(
    null,
  );
  const [customEntries, setCustomEntries] = useState<CustomVocabularyEntry[]>(
    [],
  );
  const nextId = useRef(1000);

  const open = useCallback(() => {
    setToast(null);
    setDialogOpen(true);
  }, []);

  const close = useCallback(() => setDialogOpen(false), []);
  const closeToast = useCallback(() => setToast(null), []);

  const saveEntry = useCallback((draft: VocabularyDraft) => {
    const noteParts = [
      draft.note.trim() || "Ditambahkan sendiri dalam sesi demo.",
    ];
    if (draft.exampleArabic.trim()) {
      noteParts.push(`Contoh: ${draft.exampleArabic.trim()}`);
    }
    if (draft.exampleMeaning.trim()) {
      noteParts.push(`Arti: ${draft.exampleMeaning.trim()}`);
    }
    const entry: CustomVocabularyEntry = {
      id: nextId.current++,
      arabic: draft.arabic.trim(),
      translit: draft.translit.trim() || "Transliterasi belum diisi",
      meaning: draft.meaning.trim(),
      track: draft.track,
      kind: draft.kind,
      note: noteParts.join(" • "),
      mastery: 0,
      masteryLabel: "Baru Ditambahkan (Demo)",
      srs: "SRS: belum dijadwalkan",
      days: 0,
      due: false,
      level: draft.level,
      category: draft.category,
      favorite: false,
      bar: "bg-sand-400",
      labelTone: "text-sand-700 dark:text-sand-300",
      isCustom: true,
    };
    setCustomEntries((current) => [entry, ...current]);
    setDialogOpen(false);
    setToast({ arabic: entry.arabic, meaning: entry.meaning });
  }, []);

  const addGeneratedEntry = useCallback((input: GeneratedVocabularyInput) => {
    const entry: CustomVocabularyEntry = {
      id: nextId.current++,
      arabic: input.arabic,
      translit: input.translit,
      meaning: input.meaning,
      track: input.track,
      kind: "Kalimat Contoh (AI)",
      note: input.note,
      mastery: 0,
      masteryLabel: "Dari Generator AI (Demo)",
      srs: "SRS: belum dijadwalkan",
      days: 0,
      due: false,
      level: 1,
      category: "Generator AI",
      favorite: false,
      bar: "bg-emerald-300",
      labelTone: "text-brand",
      isCustom: true,
    };
    setCustomEntries((current) => [entry, ...current]);
    setToast({ arabic: entry.arabic, meaning: entry.meaning });
  }, []);

  return (
    <VocabularyLibraryContext.Provider
      value={{ customEntries, addGeneratedEntry }}
    >
      <OpenVocabularyContext.Provider value={{ open }}>
        {children}
        {dialogOpen ? (
          <AddVocabularyDialog onClose={close} onSave={saveEntry} />
        ) : null}
        {toast ? (
          <AddVocabularyToast item={toast} onClose={closeToast} />
        ) : null}
      </OpenVocabularyContext.Provider>
    </VocabularyLibraryContext.Provider>
  );
}

function AddVocabularyDialog({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (draft: VocabularyDraft) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<VocabularyDraft>(initialDraft);
  const [error, setError] = useState<string | null>(null);

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

  function update<K extends keyof VocabularyDraft>(
    key: K,
    value: VocabularyDraft[K],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
    setError(null);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.arabic.trim() || !draft.meaning.trim()) {
      setError("Tulis mufrodat Arab dan artinya terlebih dahulu.");
      return;
    }
    onSave(draft);
  }

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
        aria-labelledby="add-vocabulary-title"
        aria-describedby="add-vocabulary-desc"
        className="animate-flow-in relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-line/70 bg-paper shadow-2xl outline-none"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line/70 bg-surface px-5 py-4 sm:px-6">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
                <IconPlusCircle className="size-4" />
              </span>
              <h2
                id="add-vocabulary-title"
                className="text-[17px] font-bold text-ink"
              >
                Tambah Kosakata Saya
              </h2>
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic text-[13px] font-semibold text-brand"
              >
                «إِضَافَةُ مُفْرَدَاتٍ»
              </span>
              <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
                Contoh
              </span>
            </div>
            <p id="add-vocabulary-desc" className="text-[11px] leading-5 text-muted">
              Modul demo untuk menyusun kartu mufrodat pribadi:Arab, transliterasi,
              arti, kategori, dan contoh kontekstual. Tidak ada data yang dikirim
              atau disimpan.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup tambah kosakata"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-line/70 text-muted transition-colors hover:bg-line/30 hover:text-ink"
          >
            <IconX className="size-4" />
          </button>
        </header>

        <form id="add-vocabulary-form" onSubmit={submit}>
          <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <Field label="Mufrodat dalam bahasa Arab" hint="Wajib • RTL">
                <input
                  required
                  lang="ar"
                  dir="rtl"
                  value={draft.arabic}
                  onChange={(event) => update("arabic", event.target.value)}
                  placeholder="كَمِ الحِسَاب؟"
                  className={arabicInputClass}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Transliterasi (Latin)" hint="opsional">
                  <input
                    value={draft.translit}
                    onChange={(event) => update("translit", event.target.value)}
                    placeholder="Kam il-ḥisāb?"
                    className={inputClass}
                  />
                </Field>
                <Field label="Arti / Makna" hint="Wajib">
                  <input
                    required
                    value={draft.meaning}
                    onChange={(event) => update("meaning", event.target.value)}
                    placeholder="Berapa tagihannya?"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Jalur bahasa">
                  <select
                    value={draft.track}
                    onChange={(event) =>
                      update("track", event.target.value as Track)
                    }
                    className={inputClass}
                  >
                    <option value="fushah">{trackLabels.fushah}</option>
                    <option value="amiyah">{trackLabels.amiyah}</option>
                    <option value="both">{trackLabels.both}</option>
                  </select>
                </Field>
                <Field label="Kategori">
                  <select
                    value={draft.category}
                    onChange={(event) => update("category", event.target.value)}
                    className={inputClass}
                  >
                    <option>Perkenalan &amp; Sapaan</option>
                    <option>Makanan &amp; Restoran</option>
                    <option>Transportasi &amp; Arah</option>
                    <option>Belanja di Pasar (Suuq)</option>
                    <option>Percakapan Kerja &amp; Formal</option>
                    <option>Koleksi Pribadi</option>
                  </select>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Jenis kata">
                  <select
                    value={draft.kind}
                    onChange={(event) => update("kind", event.target.value)}
                    className={inputClass}
                  >
                    <option>Isim (Kata Benda)</option>
                    <option>Fi&apos;il (Kata Kerja)</option>
                    <option>Harf (Partikel)</option>
                    <option>Ungkapan Santun</option>
                    <option>Frasa Amiyah</option>
                  </select>
                </Field>
                <Field label="Tingkat">
                  <select
                    value={draft.level}
                    onChange={(event) =>
                      update("level", Number(event.target.value))
                    }
                    className={inputClass}
                  >
                    <option value={1}>A1 — Pemula</option>
                    <option value={2}>A2 — Dasar</option>
                    <option value={3}>B1 — Menengah</option>
                    <option value={4}>B2 — Atas</option>
                    <option value={5}>C1 — Mahir</option>
                  </select>
                </Field>
              </div>

              <div className="rounded-xl border border-line/70 bg-surface p-4">
                <p className="mb-3 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                  <IconBook className="size-3.5 text-brand" />
                  Contoh Kontekstual (Pratinjau)
                </p>
                <div className="flex flex-col gap-3">
                  <input
                    lang="ar"
                    dir="rtl"
                    value={draft.exampleArabic}
                    onChange={(event) =>
                      update("exampleArabic", event.target.value)
                    }
                    placeholder="«لَوْ سَمَحْتَ، كَمِ الحِسَاب؟»"
                    className={arabicInputClass}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      value={draft.exampleTranslit}
                      onChange={(event) =>
                        update("exampleTranslit", event.target.value)
                      }
                      placeholder="Law samaḥt, kam il-ḥisāb?"
                      className={inputClass}
                    />
                    <input
                      value={draft.exampleMeaning}
                      onChange={(event) =>
                        update("exampleMeaning", event.target.value)
                      }
                      placeholder="Permisi, berapa tagihannya?"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <Field label="Catatan kaidah / konteks" hint="opsional">
                <textarea
                  rows={3}
                  value={draft.note}
                  onChange={(event) => update("note", event.target.value)}
                  placeholder="Contoh: digunakan saat meminta bon di restoran Hijaz."
                  className={inputClass}
                />
              </Field>
            </div>

            <aside className="flex flex-col gap-3 lg:col-span-1">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                <IconSparkles className="size-3.5 text-brand" />
                Pratinjau Kartu
              </p>
              <div className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[9px] font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
                    {trackLabels[draft.track]}
                  </span>
                  <span className="rounded-md bg-line/40 px-2 py-0.5 text-[9px] text-muted">
                    {draft.category}
                  </span>
                </div>
                <p
                  lang="ar"
                  dir="rtl"
                  className="min-h-[52px] font-arabic text-[26px] font-bold leading-relaxed text-ink"
                >
                  {draft.arabic.trim() || "…"}
                </p>
                <p className="text-[11px] font-semibold tracking-wide text-brand">
                  {draft.translit.trim() || "Transliterasi belum diisi"}
                </p>
                <div className="border-t border-line/60 pt-3">
                  <p className="text-[13px] font-bold text-ink">
                    {draft.meaning.trim() || "Arti mufrodat"}
                  </p>
                  <p className="mt-1 text-[10px] leading-4 text-muted">
                    {draft.note.trim() ||
                      "Catatan kontekstual akan tampil di sini."}
                  </p>
                </div>
                {draft.exampleArabic.trim() ? (
                  <div className="rounded-lg bg-paper p-3">
                    <p
                      lang="ar"
                      dir="rtl"
                      className="font-arabic text-[13px] font-semibold text-ink"
                    >
                      {draft.exampleArabic}
                    </p>
                    <p className="mt-1 text-[9px] italic text-brand">
                      {draft.exampleTranslit || "Transliterasi contoh"}
                    </p>
                    <p className="mt-0.5 text-[9px] text-muted">
                      {draft.exampleMeaning || "Arti contoh"}
                    </p>
                  </div>
                ) : null}
              </div>
              <p className="flex items-start gap-1.5 text-[9px] leading-4 text-muted">
                <IconBadgeCheck className="mt-0.5 size-3.5 shrink-0 text-brand" />
                Pratinjau ini hanya tampilan. Kartu baru muncul di bank kosakata
                selama halaman ini terbuka dan hilang saat dimuat ulang.
              </p>
            </aside>
          </div>
        </form>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 bg-surface px-5 py-4 sm:px-6">
          <p className="flex items-center gap-1.5 text-[9px] text-muted">
            <IconTag className="size-3.5" />
            Modul ini tidak menulis data pengguna, SRS, atau progres.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {error ? (
              <span role="alert" className="text-[10px] font-semibold text-red-600 dark:text-red-400">
                {error}
              </span>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line/70 bg-paper px-4 py-2.5 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
            >
              Batal
            </button>
            <button
              type="submit"
              form="add-vocabulary-form"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-4 py-2.5 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
            >
              <IconCheck className="size-4 text-sand-200" />
              Simpan ke Bank Kosakata (Contoh)
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between gap-2 text-[10px] font-bold text-ink">
        {label}
        {hint ? (
          <span className="font-normal text-muted">{hint}</span>
        ) : null}
      </span>
      {children}
    </label>
  );
}

function AddVocabularyToast({
  item,
  onClose,
}: {
  item: { arabic: string; meaning: string };
  onClose: () => void;
}) {
  useEffect(() => {
    const timeout = window.setTimeout(onClose, 6000);
    return () => window.clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      role="status"
      className="animate-flow-in fixed bottom-4 right-4 z-[110] flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border border-brand/30 bg-emerald-950 p-4 text-white shadow-xl sm:bottom-6 sm:right-6"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-white">
        <IconCheck className="size-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold text-sand-200">
          Kosakata berhasil ditambahkan
        </p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 text-[10px] leading-4 text-emerald-50/85">
          <span lang="ar" dir="rtl" className="font-arabic font-bold text-sand-200">
            «{item.arabic}»
          </span>
          <span>&mdash; {item.meaning}. Hanya berlaku di sesi demo ini.</span>
        </p>
        <Link
          href="/dashboard/kosakata-dan-flashcard#bank-kosakata"
          onClick={onClose}
          className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-sand-200 hover:underline"
        >
          <IconLanguages className="size-3.5" />
          Lihat di Bank Kosakata
        </Link>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup notifikasi"
        className="rounded p-1 text-emerald-100 transition-colors hover:bg-white/10 hover:text-white"
      >
        <IconX className="size-3.5" />
      </button>
    </div>
  );
}
