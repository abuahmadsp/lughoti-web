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
  IconCalendar,
  IconCheck,
  IconClock,
  IconPlusCircle,
  IconUsers,
  IconX,
} from "./icons";

type TrackValue = "fushah" | "amiyah" | "toafl";

type ExamDraft = {
  title: string;
  track: TrackValue;
  marhalah: string;
  date: string;
  time: string;
  duration: string;
  examiner: string;
  participants: string;
  topic: string;
};

export type ScheduledExam = {
  id: string;
  day: string;
  date: string;
  title: string;
  time: string;
  topic: string;
  students: string;
  note: string;
};

type ScheduleExamContextValue = {
  scheduled: ScheduledExam[];
  open: () => void;
  remove: (id: string) => void;
};

const ScheduleExamContext = createContext<ScheduleExamContextValue | null>(null);

const initialDraft: ExamDraft = {
  title: "",
  track: "fushah",
  marhalah: "m1",
  date: "",
  time: "",
  duration: "60",
  examiner: "",
  participants: "",
  topic: "",
};

const trackOptions: { value: TrackValue; label: string }[] = [
  { value: "fushah", label: "Fushah Akademik (Nahwu-Shorof)" },
  { value: "amiyah", label: "Amiyah Saudi (Hijazi/Najdi)" },
  { value: "toafl", label: "Persiapan TOAFL Internasional" },
];

const marhalahOptions = [
  { value: "m1", label: "Marhalah 1 (Mubtadi')" },
  { value: "m2", label: "Marhalah 2 (Mutawassith)" },
  { value: "m3", label: "Marhalah 3 (Tarkib & I'rob)" },
  { value: "m4", label: "Marhalah 4 (Mahir & Balaghah)" },
];

const durationOptions = ["30", "45", "60", "90", "120"];

const trackLabels: Record<TrackValue, string> = {
  fushah: "Fushah",
  amiyah: "Amiyah Saudi",
  toafl: "TOAFL",
};

const marhalahLabels: Record<string, string> = Object.fromEntries(
  marhalahOptions.map((option) => [option.value, option.label]),
);

const inputClass =
  "w-full rounded-xl border border-line/70 bg-paper px-3 py-2.5 text-[12px] text-ink placeholder:text-muted/60 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

export function useScheduleExam() {
  const value = useContext(ScheduleExamContext);
  if (!value) {
    throw new Error(
      "Modul penjadwalan harus dipakai di dalam ScheduleExamProvider",
    );
  }
  return value;
}

/** Client trigger for the server-rendered page header. */
export function ScheduleExamOpenButton({
  className,
  children,
  title,
}: {
  className?: string;
  children: ReactNode;
  title?: string;
}) {
  const { open } = useScheduleExam();
  return (
    <button type="button" onClick={open} title={title} className={className}>
      {children}
    </button>
  );
}

export function ScheduleExamProvider({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [scheduled, setScheduled] = useState<ScheduledExam[]>([]);
  const [savedTitle, setSavedTitle] = useState<string | null>(null);
  const nextId = useRef(0);

  const open = useCallback(() => {
    setSavedTitle(null);
    setDialogOpen(true);
  }, []);
  const close = useCallback(() => setDialogOpen(false), []);
  const closeToast = useCallback(() => setSavedTitle(null), []);

  const saveExam = useCallback((draft: ExamDraft) => {
    const [year, month, dayOfMonth] = draft.date.split("-");
    const weekday = new Date(
      Number(year),
      Number(month) - 1,
      Number(dayOfMonth),
    ).toLocaleDateString("id-ID", { weekday: "long" });
    const noteParts = [
      trackLabels[draft.track],
      marhalahLabels[draft.marhalah],
      `Durasi ${draft.duration} menit`,
    ];
    if (draft.examiner.trim()) {
      noteParts.push(`Penguji: ${draft.examiner.trim()}`);
    }

    const exam: ScheduledExam = {
      id: `scheduled-${nextId.current++}`,
      day: weekday.charAt(0).toUpperCase() + weekday.slice(1),
      date: dayOfMonth,
      title: draft.title.trim(),
      time: `${draft.time} WIB`,
      topic: draft.topic.trim() || "Topik belum diisi",
      students: draft.participants.trim()
        ? `${draft.participants.trim()} Santri Terdaftar`
        : "Peserta belum diisi",
      note: noteParts.join(" • "),
    };

    setScheduled((current) => [exam, ...current]);
    setDialogOpen(false);
    setSavedTitle(exam.title);
  }, []);

  const remove = useCallback((id: string) => {
    setScheduled((current) => current.filter((exam) => exam.id !== id));
  }, []);

  return (
    <ScheduleExamContext.Provider value={{ scheduled, open, remove }}>
      {children}
      {dialogOpen ? (
        <ScheduleExamDialog onClose={close} onSave={saveExam} />
      ) : null}
      {savedTitle ? (
        <ScheduleExamToast title={savedTitle} onClose={closeToast} />
      ) : null}
    </ScheduleExamContext.Provider>
  );
}

function ScheduleExamDialog({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (draft: ExamDraft) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState<ExamDraft>(initialDraft);
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

  function update<K extends keyof ExamDraft>(key: K, value: ExamDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setError(null);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.title.trim() || !draft.date || !draft.time) {
      setError("Lengkapi nama ujian, tanggal, dan jam terlebih dahulu.");
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
        aria-labelledby="schedule-exam-title"
        aria-describedby="schedule-exam-desc"
        className="animate-flow-in relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-line/70 bg-paper shadow-2xl outline-none"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line/70 bg-surface px-5 py-4 sm:px-6">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
                <IconCalendar className="size-4" />
              </span>
              <h2
                id="schedule-exam-title"
                className="text-[17px] font-bold text-ink"
              >
                Jadwalkan Ujian Baru
              </h2>
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic text-[13px] font-semibold text-brand"
              >
                «جَدْوَلَةُ اخْتِبَارٍ جَدِيدٍ»
              </span>
              <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
                Pratinjau
              </span>
            </div>
            <p
              id="schedule-exam-desc"
              className="text-[11px] leading-5 text-muted"
            >
              Susun sesi ujian marhalah, Amiyah, atau TOAFL. Jadwal yang dibuat
              hanya tersimpan dalam memori sesi demo — tanpa server,
              notifikasi, atau peserta sungguhan.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup modal penjadwalan ujian"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-line/70 text-muted transition-colors hover:bg-line/30 hover:text-ink"
          >
            <IconX className="size-4" />
          </button>
        </header>

        <div className="max-h-[calc(100dvh-13rem)] overflow-y-auto p-5 sm:p-6">
          <form
            id="schedule-exam-form"
            onSubmit={submit}
            className="grid gap-4 sm:grid-cols-2"
          >
            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className="text-[11px] font-semibold text-ink">
                Nama Ujian <span className="text-red-600 dark:text-red-400">*</span>
              </span>
              <input
                type="text"
                value={draft.title}
                onChange={(event) => update("title", event.target.value)}
                placeholder="Contoh: Ujian Marhalah 3 Nahwu"
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-ink">Jalur Belajar</span>
              <select
                value={draft.track}
                onChange={(event) =>
                  update("track", event.target.value as TrackValue)
                }
                className={inputClass}
              >
                {trackOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-ink">Marhalah</span>
              <select
                value={draft.marhalah}
                onChange={(event) => update("marhalah", event.target.value)}
                className={inputClass}
              >
                {marhalahOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-ink">
                Tanggal <span className="text-red-600 dark:text-red-400">*</span>
              </span>
              <input
                type="date"
                value={draft.date}
                onChange={(event) => update("date", event.target.value)}
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-ink">
                Jam Mulai (WIB){" "}
                <span className="text-red-600 dark:text-red-400">*</span>
              </span>
              <input
                type="time"
                value={draft.time}
                onChange={(event) => update("time", event.target.value)}
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-ink">
                Durasi (menit)
              </span>
              <select
                value={draft.duration}
                onChange={(event) => update("duration", event.target.value)}
                className={inputClass}
              >
                {durationOptions.map((option) => (
                  <option key={option} value={option}>
                    {option} menit
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-ink">
                Estimasi Peserta
              </span>
              <input
                type="number"
                min={0}
                value={draft.participants}
                onChange={(event) => update("participants", event.target.value)}
                placeholder="Contoh: 210"
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className="text-[11px] font-semibold text-ink">
                Penguji / Musyrif
              </span>
              <input
                type="text"
                value={draft.examiner}
                onChange={(event) => update("examiner", event.target.value)}
                placeholder="Contoh: Ust. Salman"
                className={inputClass}
              />
            </label>

            <label className="flex flex-col gap-1.5 sm:col-span-2">
              <span className="text-[11px] font-semibold text-ink">
                Topik / Catatan
              </span>
              <textarea
                rows={3}
                value={draft.topic}
                onChange={(event) => update("topic", event.target.value)}
                placeholder="Contoh: Bab Fi'il Tsulatsi & Rubai Mujarrod"
                className={cn(inputClass, "resize-none")}
              />
            </label>

            {error ? (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-semibold text-red-700 sm:col-span-2 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
              >
                {error}
              </p>
            ) : null}
          </form>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 bg-paper px-5 py-4 sm:px-6">
          <p className="text-[10px] leading-4 text-muted">
            Simulasi demo — tidak ada jadwal, peserta, atau penguji yang
            disimpan.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line/70 bg-surface px-4 py-2.5 text-[12px] font-semibold text-ink transition-colors hover:bg-line/30"
            >
              Batal
            </button>
            <button
              type="submit"
              form="schedule-exam-form"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-4 py-2.5 text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
            >
              <IconCheck className="size-4" />
              Tambahkan ke Jadwal (Pratinjau)
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

function ScheduleExamToast({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const timeout = window.setTimeout(onClose, 5000);
    return () => window.clearTimeout(timeout);
  }, [onClose]);

  return (
    <div
      role="status"
      className="animate-flow-in fixed bottom-4 right-4 z-[110] flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border border-brand/30 bg-emerald-950 p-4 text-sand-50 shadow-xl sm:bottom-6 sm:right-6"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-white">
        <IconCalendar className="size-4" />
      </span>
      <p className="flex-1 text-[11px] font-semibold leading-5">
        Pratinjau — &ldquo;{title}&rdquo; ditambahkan ke jadwal. Data hanya
        tersimpan dalam sesi demo.
      </p>
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

/** Compact row used by the sessions tab for both example and newly scheduled exams. */
export function ScheduledExamMeta({ exam }: { exam: ScheduledExam }) {
  return (
    <div className="mt-1.5 flex flex-wrap items-center gap-x-2 text-[10px] text-muted">
      <span className="inline-flex items-center gap-1">
        <IconUsers className="size-3" />
        {exam.students}
      </span>
      <span>•</span>
      <span className="inline-flex items-center gap-1">
        <IconClock className="size-3" />
        {exam.note}
      </span>
    </div>
  );
}

export function ScheduleExamAddButton({ className }: { className?: string }) {
  const { open } = useScheduleExam();
  return (
    <button type="button" onClick={open} className={className}>
      <IconPlusCircle className="size-3.5" />
      Jadwalkan Ujian
    </button>
  );
}
