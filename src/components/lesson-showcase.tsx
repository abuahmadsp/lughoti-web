"use client";

import { useState } from "react";
import {
  dialogLines,
  previews,
  quizSample,
} from "@/lib/curriculum";
import { cn } from "@/lib/cn";
import {
  IconArrowRight,
  IconBook,
  IconCheck,
  IconChat,
  IconSparkles,
  IconVolume,
  IconX,
} from "./icons";

type TabId = "materi" | "kosakata" | "dialog" | "kuis";

const tabs: { id: TabId; label: string; icon: typeof IconBook }[] = [
  { id: "materi", label: "Materi", icon: IconBook },
  { id: "kosakata", label: "Kosakata", icon: IconSparkles },
  { id: "dialog", label: "Dialog", icon: IconChat },
  { id: "kuis", label: "Kuis", icon: IconCheck },
];

const preview = previews.amiyah;

export function LessonShowcase() {
  const [tab, setTab] = useState<TabId>("materi");
  const [picked, setPicked] = useState<number | null>(null);

  const answered = picked !== null;
  const isCorrect = picked === quizSample.answerIndex;

  return (
    <div className="overflow-hidden rounded-[28px] border border-line/80 bg-surface shadow-[0_30px_80px_-40px_rgba(7,50,38,0.4)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/70 bg-paper/70 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#e5735f]" />
          <span className="size-2.5 rounded-full bg-[#e2b84b]" />
          <span className="size-2.5 rounded-full bg-[#4fae7d]" />
        </div>
        <span className="hidden rounded-full border border-line/80 bg-surface/80 px-3 py-1 font-mono text-[10px] text-muted sm:inline">
          lughati.id/pelajaran/minggu-01
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-900/10 bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-800 dark:border-emerald-300/15 dark:bg-emerald-900/40 dark:text-emerald-200">
          <span className="size-1.5 rounded-full bg-emerald-600 dark:bg-emerald-300" />
          Amiyah Saudi · Najdi
        </span>
      </div>

      <div className="border-b border-line/70 px-3 py-2 sm:px-4">
        <div
          role="tablist"
          aria-label="Bagian pelajaran"
          className="flex gap-1 overflow-x-auto"
        >
          {tabs.map((item) => {
            const Icon = item.icon;
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`panel-${item.id}`}
                onClick={() => setTab(item.id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors sm:text-sm",
                  active
                    ? "bg-emerald-800 text-white shadow-sm shadow-emerald-900/20"
                    : "text-muted hover:bg-paper hover:text-ink",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="min-h-[27rem] p-4 sm:p-6">
        {tab === "materi" ? (
          <div
            id="panel-materi"
            role="tabpanel"
            aria-labelledby="tab-materi"
            className="animate-fade-up"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Penjelasan
            </span>
            <h3 className="mt-2 text-xl font-semibold tracking-tight">
              Menyapa adalah pintu percakapan
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Di Arab Saudi, sapaan bukan sekadar formalitas. Sapaan yang tepat
              membuka percakapan dan menunjukkan rasa hormat. Untuk situasi apa
              pun, السَّلَامُ عَلَيْكُمْ aman dipakai.
            </p>

            <div className="mt-4 rounded-2xl border border-line/80 bg-gradient-to-br from-sand-50 to-paper p-4 dark:from-emerald-950/40 dark:to-surface">
              <div className="flex items-start justify-between gap-3">
                <p
                  className="font-arabic flex-1 text-right text-2xl leading-[2] text-ink"
                  lang="ar"
                  dir="rtl"
                >
                  حَيَّاكَ اللهُ، وِشْ اسْمَك؟
                </p>
                <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-line bg-surface text-emerald-800 dark:text-emerald-200">
                  <IconVolume className="size-3.5" />
                </span>
              </div>
              <p className="mt-1 text-xs font-semibold text-emerald-800/80 dark:text-emerald-200/80">
                ḥayyāk Allāh, wesh ismak?
              </p>
              <p className="text-xs text-muted">Selamat datang; siapa namamu?</p>
            </div>

            <div className="mt-4 flex gap-3 rounded-2xl border border-emerald-900/10 bg-emerald-50/70 p-4 dark:border-emerald-300/15 dark:bg-emerald-950/40">
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-800 text-white">
                <IconSparkles className="size-3.5" />
              </span>
              <p className="text-xs leading-6 text-emerald-950/80 dark:text-emerald-100/80">
                <strong className="font-semibold">Najdi vs Hijazi.</strong> وِش
                dipakai di Riyadh, إِيش di Jeddah. Keduanya sama-sama Amiyah
                Saudi — pilih satu ragam dan pakai konsisten dalam percakapan.
              </p>
            </div>
          </div>
        ) : null}

        {tab === "kosakata" ? (
          <div
            id="panel-kosakata"
            role="tabpanel"
            aria-labelledby="tab-kosakata"
            className="animate-fade-up"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Minggu 01 · {preview.totalVocab} kosakata
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  Kartu kosakata
                </h3>
              </div>
              <span className="hidden rounded-full border border-line px-2.5 py-1 text-[10px] font-semibold text-muted sm:inline">
                klik untuk menandai
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {preview.vocabulary.map((item) => (
                <div
                  key={item.ar}
                  className="group rounded-2xl border border-line/80 bg-paper/50 p-4 transition-colors hover:border-emerald-600/40"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className="font-arabic text-xl leading-relaxed"
                      lang="ar"
                      dir="rtl"
                    >
                      {item.ar}
                    </span>
                    <span className="shrink-0 rounded-full bg-line/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-muted">
                      {item.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-emerald-800/90 dark:text-emerald-200/80">
                    {item.translit}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{item.id}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-line/40 px-4 py-3 text-xs text-muted">
              <span>Transliterasi Latin tersedia di setiap kata.</span>
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-800 dark:text-emerald-200">
                +14 lainnya
                <IconArrowRight className="size-3.5" />
              </span>
            </div>
          </div>
        ) : null}

        {tab === "dialog" ? (
          <div
            id="panel-dialog"
            role="tabpanel"
            aria-labelledby="tab-dialog"
            className="animate-fade-up"
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Percakapan
                </span>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  Bertemu di pusat bahasa
                </h3>
              </div>
              <span className="rounded-full border border-line px-2.5 py-1 text-[10px] font-semibold text-muted">
                Najdi · netral
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {dialogLines.map((line, index) => {
                const isAhmad = line.speaker === "Ahmad";
                return (
                  <div
                    key={line.ar}
                    className={cn(
                      "flex flex-col gap-1.5",
                      isAhmad ? "items-start" : "items-end",
                    )}
                  >
                    <span className="px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {line.speaker}
                    </span>
                    <div
                      className={cn(
                        "max-w-[92%] rounded-2xl border px-4 py-3 sm:max-w-[85%]",
                        isAhmad
                          ? "rounded-tl-md border-line/80 bg-paper/70"
                          : "rounded-tr-md border-emerald-900/10 bg-emerald-50/80 dark:border-emerald-300/15 dark:bg-emerald-950/50",
                      )}
                    >
                      <p
                        className="font-arabic text-right text-xl leading-[1.9]"
                        lang="ar"
                        dir="rtl"
                      >
                        {line.ar}
                      </p>
                      <p className="mt-1 text-[11px] text-emerald-800/80 dark:text-emerald-200/70">
                        {line.translit}
                      </p>
                      <p className="text-xs text-muted">{line.id}</p>
                    </div>
                    {index === 2 ? (
                      <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[10px] font-medium text-sand-800 dark:bg-sand-900/40 dark:text-sand-200">
                        Hijazi: إِيش اسْمَك؟
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}

        {tab === "kuis" ? (
          <div
            id="panel-kuis"
            role="tabpanel"
            aria-labelledby="tab-kuis"
            className="animate-fade-up"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                Soal 1 dari 8 · pilihan ganda
              </span>
              <span className="rounded-full bg-line/60 px-2.5 py-1 text-[10px] font-semibold text-muted">
                Kuis 1
              </span>
            </div>

            <h3 className="mt-3 text-lg font-semibold leading-7 sm:text-xl">
              {quizSample.question}
            </h3>

            <div className="mt-4 grid gap-2">
              {quizSample.options.map((option, index) => {
                const isAnswer = index === quizSample.answerIndex;
                const isPicked = picked === index;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setPicked(index)}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                      !answered &&
                        "border-line/80 bg-paper/50 hover:border-emerald-600/40 hover:bg-paper",
                      answered &&
                        isAnswer &&
                        "border-emerald-600/50 bg-emerald-50 text-emerald-900 dark:border-emerald-300/40 dark:bg-emerald-950/60 dark:text-emerald-100",
                      answered &&
                        isPicked &&
                        !isAnswer &&
                        "border-rose-500/40 bg-rose-50 text-rose-900 dark:border-rose-400/30 dark:bg-rose-950/40 dark:text-rose-100",
                      answered &&
                        !isAnswer &&
                        !isPicked &&
                        "border-line/60 bg-paper/30 text-muted",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-full border text-[10px] font-bold",
                          answered && isAnswer
                            ? "border-emerald-700 bg-emerald-700 text-white"
                            : "border-line text-muted",
                        )}
                      >
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </span>
                    {answered && isAnswer ? (
                      <IconCheck className="size-4 shrink-0 text-emerald-700 dark:text-emerald-300" />
                    ) : null}
                    {answered && isPicked && !isAnswer ? (
                      <IconX className="size-4 shrink-0 text-rose-600 dark:text-rose-300" />
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div
              className={cn(
                "mt-4 rounded-2xl border p-4 text-xs leading-6 transition-colors",
                answered && isCorrect
                  ? "border-emerald-600/30 bg-emerald-50/80 text-emerald-950 dark:border-emerald-300/20 dark:bg-emerald-950/50 dark:text-emerald-100"
                  : answered
                    ? "border-rose-500/30 bg-rose-50/80 text-rose-950 dark:border-rose-400/20 dark:bg-rose-950/40 dark:text-rose-100"
                    : "border-line/70 bg-paper/50 text-muted",
              )}
            >
              {answered ? (
                <div className="flex items-start justify-between gap-3">
                  <p>
                    <strong className="font-semibold">
                      {isCorrect ? "Tepat. " : "Belum tepat. "}
                    </strong>
                    {quizSample.explanation}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPicked(null)}
                    className="shrink-0 rounded-full border border-current/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                  >
                    Ulangi
                  </button>
                </div>
              ) : (
                <p>
                  Pilih satu jawaban. Penilaian dan pembahasan muncul langsung —
                  di aplikasi, skor disimpan ke progres Anda.
                </p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
