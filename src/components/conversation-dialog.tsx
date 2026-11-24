import Link from "next/link";
import { ConversationActions } from "./conversation-actions";
import { ConversationPlayer } from "./conversation-player";
import {
  IconBook,
  IconCards,
  IconChat,
  IconGraduation,
  IconLocation,
  IconMic,
  IconRestaurant,
  IconSparkles,
} from "./icons";

const vocabulary = [
  {
    arabic: "أَبْغَى",
    transliteration: "Abghā",
    meaning: "Mau / Ingin",
    kind: "Kata Kerja",
    kindClass:
      "bg-sand-200/70 text-sand-900 dark:bg-sand-300/20 dark:text-sand-200",
    label: "Bentuk Fushah",
    compare: "أُرِيدُ",
    compareNote: "(Urīdu)",
  },
  {
    arabic: "إِيش",
    transliteration: "Ēsh / Aysh",
    meaning: "Apa?",
    kind: "Partikel Tanya",
    kindClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
    label: "Bentuk Fushah",
    compare: "مَاذَا",
    compareNote: "(Mādhā)",
  },
  {
    arabic: "لَوْ سَمَحْت",
    transliteration: "Law samaḥt",
    meaning: "Permisi / Tolong",
    kind: "Kesantunan",
    kindClass: "bg-line/50 text-muted",
    label: "Penggunaan",
    compare: "Memanggil pramusaji di tempat umum",
    compareNote: "",
  },
  {
    arabic: "حَيَّاك الله",
    transliteration: "Ḥayyāka / Ḥayyāki Allāh",
    meaning: "Selamat datang!",
    kind: "Doa & Sapaan",
    kindClass:
      "bg-sand-200/70 text-sand-900 dark:bg-sand-300/20 dark:text-sand-200",
    label: "Bentuk Fushah",
    compare: "مَرْحَبًا بِكَ",
    compareNote: "(Marḥaban bik)",
  },
];

function ContextHeader() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-paper p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href="#atas"
            className="flex items-center gap-1 text-[11px] font-semibold text-brand hover:underline"
          >
            <IconChat className="size-3.5 rotate-180" />
            Percakapan &amp; Dialog
          </a>
          <span aria-hidden="true" className="text-line">
            •
          </span>
          <span className="text-[11px] font-medium text-muted">
            Modul 04: Real-Life Riyadh Scenarios
          </span>
        </div>
        <span className="rounded-full border border-line/70 bg-surface px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
          Data demo
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sand-200/70 px-3 py-1 text-[10px] font-semibold text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
          <IconMic className="size-3.5" />
          Amiyah Saudi (
          <span lang="ar" dir="rtl">
            العامية السعودية
          </span>
          )
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
          <IconLocation className="size-3.5" />
          Dialek Najdi &amp; Hijazi (
          <span lang="ar" dir="rtl">
            لهجة نجدية وحجازية
          </span>
          )
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-line/40 px-3 py-1 text-[10px] font-medium text-muted">
          <IconRestaurant className="size-3.5" />
          Situasi Nyata: Memesan Makanan &amp; Gahwa
        </span>
      </div>

      <div className="flex flex-col gap-4 pt-1 md:flex-row md:items-end md:justify-between">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-balance text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Percakapan Praktis: Di Restoran Tradisional Riyadh
            </h1>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-2xl font-bold leading-none text-brand"
            >
              فِي المَطْعَم
            </span>
          </div>
          <p className="max-w-2xl text-[13px] leading-6 text-muted">
            Pelajari interaksi autentik memesan hidangan tradisional Kabsa
            Daging dan Kopi Gahwa khas Najd dengan sopan santun dan ungkapan
            lokal Saudi.
          </p>
        </div>
        <ConversationActions />
      </div>
    </section>
  );
}

function ContextHub() {
  return (
    <>
      {/* Cultural spotlight — illustrative, no real photo asset yet */}
      <section className="overflow-hidden rounded-2xl border border-line/70 bg-surface shadow-sm">
        <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-emerald-950 via-emerald-800 to-sand-700">
          <div aria-hidden="true" className="bg-dots absolute inset-0 opacity-20" />
          <div aria-hidden="true" className="relative text-5xl">
            🍛 ☕
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-emerald-950/90 to-transparent px-4 pb-3 pt-8 text-sand-50">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-sand-300">
                Kuliner Riyadh
              </p>
              <p lang="ar" dir="rtl" className="font-arabic text-lg font-bold">
                كَبْسَة وَقَهْوَة سُعُودِيَّة
              </p>
            </div>
            <span className="rounded bg-white/15 px-2 py-0.5 text-[10px] font-semibold backdrop-blur-sm">
              Tradisi Najd
            </span>
          </div>
        </div>
        <p className="bg-paper p-4 text-[12px] leading-5 text-muted">
          Kopi Saudi (Gahwa) disajikan menggunakan teko khas{" "}
          <span className="font-semibold text-ink">Dallah</span> dengan rempah
          kapulaga, biasanya diseruput berpasangan dengan hidangan nasi rempah
          Kabsa.
        </p>
      </section>

      {/* Core vocabulary */}
      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-[15px] font-bold text-ink">
            <IconBook className="size-5 text-brand" />
            Kosakata Khas Amiyah
          </h2>
          <span className="text-[10px] font-medium text-muted">4 entri kunci</span>
        </div>

        <div className="flex flex-col gap-3">
          {vocabulary.map((item) => (
            <div
              key={item.arabic}
              className="flex flex-col gap-1.5 rounded-xl bg-paper p-3 transition-colors hover:bg-line/30"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-lg font-bold text-brand"
                >
                  {item.arabic}
                </span>
                <span
                  className={`rounded px-2 py-0.5 text-[9px] font-bold ${item.kindClass}`}
                >
                  {item.kind}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-semibold text-ink">
                  {item.transliteration}
                </span>
                <span className="text-[11px] text-muted">{item.meaning}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-muted">
                <span className="font-medium text-brand">{item.label}:</span>
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-arabic font-semibold text-ink"
                >
                  {item.compare}
                </span>
                {item.compareNote ? <span>{item.compareNote}</span> : null}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          <a
            href="#latih-pelafalan"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-[12px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
          >
            <IconGraduation className="size-4" />
            Latihan Dialog (Roleplay Kuis)
          </a>
          <Link
            href="/dashboard#flashcard"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-line/40 px-4 py-2.5 text-[12px] font-semibold text-ink transition-colors hover:bg-line/70"
          >
            <IconCards className="size-4" />
            Buka Flashcard 12 Mufrodat Dialog
          </Link>
        </div>
      </section>

      {/* Progress */}
      <section className="flex items-center gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm">
        <div className="relative grid size-12 shrink-0 place-items-center">
          <svg className="size-12 -rotate-90" viewBox="0 0 36 36" aria-hidden="true">
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-line"
            />
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeDasharray="75 100"
              className="text-brand"
            />
          </svg>
          <span className="absolute text-[10px] font-bold text-ink">75%</span>
        </div>
        <div className="flex-1">
          <p className="flex items-center gap-1.5 text-[12px] font-bold text-ink">
            <IconSparkles className="size-3.5 text-brand" />
            Kemajuan Percakapan
          </p>
          <p className="mt-0.5 text-[11px] leading-4 text-muted">
            3 dari 4 baris dialog telah kamu latih intonasinya.
          </p>
        </div>
      </section>
    </>
  );
}

export function ConversationDialog() {
  return (
    <div className="flex flex-col gap-6">
      <ContextHeader />
      <ConversationPlayer>
        <ContextHub />
      </ConversationPlayer>
    </div>
  );
}
