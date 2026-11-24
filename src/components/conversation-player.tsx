"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  IconGraduation,
  IconLanguages,
  IconLightbulb,
  IconMic,
  IconPause,
  IconPlay,
  IconQuote,
  IconStorefront,
  IconSubtitles,
  IconVolume,
} from "./icons";

type Turn = {
  id: string;
  speaker: "fathia" | "tariq";
  name: string;
  role: string;
  duration: string;
  arabic: string;
  transliteration: ReactNode;
  translation: string;
  noteIcon: ReactNode;
  noteLabel: string;
  note: ReactNode;
};

const turns: Turn[] = [
  {
    id: "sapa",
    speaker: "fathia",
    name: "Fathia",
    role: "Pelajar",
    duration: "0:04",
    arabic: "مَسَّاكُم الله بِالخَيْر، لَوْ سَمَحْت أَبْغَى مَنِيُو الطَّعَام؟",
    transliteration: (
      <>
        <span className="font-semibold text-brand">
          Massākum Allāh bil-khayr
        </span>
        , law samaḥt{" "}
        <span className="rounded bg-sand-200/70 px-1 py-0.5 font-bold text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
          abghā
        </span>{" "}
        manyū aṭ-ṭa’ām?
      </>
    ),
    translation:
      '"Selamat sore, permisi saya minta buku menu makanannya?"',
    noteIcon: <IconGraduation className="size-4" />,
    noteLabel: "Catatan Khas Saudi",
    note: (
      <>
        Kata{" "}
        <span lang="ar" dir="rtl" className="font-arabic font-bold text-brand">
          أَبْغَى
        </span>{" "}
        (<em>Abghā</em>) adalah kata kerja utama Amiyah Saudi untuk “saya
        mau/ingin” (menggantikan{" "}
        <span lang="ar" dir="rtl" className="font-arabic">
          أُرِيدُ
        </span>{" "}
        pada Fushah). Sapaan petang yang akrab diawali dengan{" "}
        <em>Massākum Allāh bil-khayr</em>.
      </>
    ),
  },
  {
    id: "sambutan",
    speaker: "tariq",
    name: "Tariq",
    role: "Pelayan Najd",
    duration: "0:06",
    arabic:
      "أَهْلًا وَسَهْلًا! حَيَّاكِ الله. عِنْدَنَا كَبْسَة لَحَم وَمَضْبِي دَجَاج، إِيش تِحِبِّين؟",
    transliteration: (
      <>
        Ahlān wa sahlān!{" "}
        <span className="rounded bg-sand-200/70 px-1 py-0.5 font-bold text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
          Ḥayyāki Allāh
        </span>
        . ’Indanā kabsah laḥam wa maḍbī dajāj,{" "}
        <span className="font-bold text-brand">ēsh</span> tiḥibbīn?
      </>
    ),
    translation:
      '"Selamat datang! Kami ada menu Kabsa Daging kambing dan Madhbi Ayam, kamu suka pesan yang mana?"',
    noteIcon: <IconLightbulb className="size-4" />,
    noteLabel: "Kaidah Percakapan",
    note: (
      <>
        Kata tanya{" "}
        <span lang="ar" dir="rtl" className="font-arabic font-bold text-brand">
          إِيش
        </span>{" "}
        (<em>Ēsh</em>) adalah partikel penanya “apa?” yang paling dominan di
        Saudi (setara{" "}
        <span lang="ar" dir="rtl" className="font-arabic">
          مَاذَا
        </span>
        ). Ungkapan{" "}
        <span lang="ar" dir="rtl" className="font-arabic font-bold text-brand">
          حَيَّاكِ الله
        </span>{" "}
        (<em>Ḥayyāki Allāh</em>) adalah keramahan tradisi Badui untuk
        memuliakan tamu wanita.
      </>
    ),
  },
  {
    id: "pesanan",
    speaker: "fathia",
    name: "Fathia",
    role: "Pelajar",
    duration: "0:05",
    arabic:
      "أَبْغَى كَبْسَة لَحَم مَعَ قَهْوَة سُعُودِيَّة، وَاللهِ يِعْطِيك العَافِيَة!",
    transliteration: (
      <>
        Abghā kabsah laḥam ma’a{" "}
        <span className="rounded bg-sand-200/70 px-1 py-0.5 font-bold text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
          gahwah su’ūdiyyah
        </span>
        , wallāhi <span className="font-bold text-brand">yi’ṭīk al-’āfiyah!</span>
      </>
    ),
    translation:
      '"Saya pesan kabsa daging dan kopi Saudi, semoga Allah memberimu kesehatan (terima kasih banyak)!"',
    noteIcon: <IconQuote className="size-4" />,
    noteLabel: "Etika Budaya Saudi",
    note: (
      <>
        Doa{" "}
        <span lang="ar" dir="rtl" className="font-arabic font-bold text-brand">
          الله يِعْطِيك العَافِيَة
        </span>{" "}
        (<em>Allāh yi’ṭīk al-’āfiyah</em>) adalah cara masyarakat Saudi
        berterima kasih secara tulus dan hangat kepada pekerja jasa maupun teman
        sebaya.
      </>
    ),
  },
];

const waveHeights = [
  "h-2",
  "h-3",
  "h-5",
  "h-4",
  "h-6",
  "h-7",
  "h-3",
  "h-5",
  "h-4",
  "h-6",
  "h-2",
  "h-4",
  "h-6",
  "h-5",
  "h-3",
  "h-2",
  "h-4",
  "h-5",
  "h-3",
  "h-2",
  "h-5",
  "h-4",
  "h-2",
  "h-3",
];

const speeds = [0.75, 1, 1.2] as const;
type Speed = (typeof speeds)[number];

function SpeakerAvatar({ speaker }: { speaker: Turn["speaker"] }) {
  const isFathia = speaker === "fathia";
  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <span
        aria-hidden="true"
        className={cn(
          "grid size-12 place-items-center rounded-full text-sm font-bold shadow-sm",
          isFathia
            ? "bg-emerald-950 text-white dark:bg-emerald-900"
            : "bg-sand-200 text-sand-900 dark:bg-sand-300/30 dark:text-sand-100",
        )}
      >
        {isFathia ? "F" : "T"}
      </span>
      <span className="text-[11px] font-semibold text-ink">
        {isFathia ? "Fathia" : "Tariq"}
      </span>
      <span className="text-[10px] font-medium leading-none text-brand">
        {isFathia ? "Pelajar" : "Pelayan Najd"}
      </span>
    </div>
  );
}

export function ConversationPlayer({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);
  const [showLatin, setShowLatin] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      {/* Master audio controller — mockup only, no audio is recorded yet */}
      <div className="sticky top-20 z-20 -mx-4 rounded-2xl bg-emerald-950 px-4 py-3 text-sand-50 shadow-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? "Jeda seluruh percakapan" : "Putar seluruh percakapan"}
              aria-pressed={playing}
              title="Pratinjau antarmuka — audio belum direkam"
              className={cn(
                "grid size-11 shrink-0 place-items-center rounded-full bg-emerald-200 text-emerald-950 transition-transform hover:scale-105 active:scale-95",
                playing && "ring-4 ring-emerald-200/40",
              )}
            >
              {playing ? (
                <IconPause className="size-5" />
              ) : (
                <IconPlay className="size-5" />
              )}
            </button>
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[12px] font-semibold text-emerald-100">
                  Putar Seluruh Percakapan
                </span>
                <span className="rounded bg-emerald-800/80 px-2 py-0.5 text-[10px] text-emerald-200">
                  Kecepatan native
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-2 text-[11px] text-emerald-200/80">
                <span>{playing ? "00:18" : "00:00"}</span>
                <span>/</span>
                <span>01:45</span>
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="flex h-9 min-w-0 flex-1 items-center gap-[3px] overflow-hidden rounded-xl bg-emerald-900/60 px-3"
          >
            {waveHeights.map((height, index) => (
              <span
                key={index}
                className={cn(
                  "w-1 shrink-0 rounded-full",
                  index < (playing ? 12 : 6)
                    ? "bg-emerald-200"
                    : "bg-emerald-200/35",
                  height,
                  playing && "animate-eq origin-bottom",
                )}
                style={playing ? { animationDelay: `${index * 70}ms` } : undefined}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-lg bg-emerald-900/60 p-0.5">
              {speeds.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setSpeed(value)}
                  aria-pressed={speed === value}
                  className={cn(
                    "rounded px-2.5 py-1 text-[11px] font-semibold transition-colors",
                    speed === value
                      ? "bg-emerald-200 text-emerald-950"
                      : "text-emerald-200/70 hover:text-emerald-100",
                  )}
                >
                  {value}x
                </button>
              ))}
            </div>
            <span className="hidden h-6 w-px bg-emerald-200/20 sm:block" />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowLatin((value) => !value)}
                aria-pressed={showLatin}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1 text-[11px] font-semibold transition-colors",
                  showLatin
                    ? "bg-emerald-800/70 text-emerald-50"
                    : "bg-emerald-900/60 text-emerald-200/60",
                )}
              >
                <IconSubtitles className="size-3.5" />
                Latin
              </button>
              <button
                type="button"
                onClick={() => setShowTranslation((value) => !value)}
                aria-pressed={showTranslation}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1 text-[11px] font-semibold transition-colors",
                  showTranslation
                    ? "bg-emerald-800/70 text-emerald-50"
                    : "bg-emerald-900/60 text-emerald-200/60",
                )}
              >
                <IconLanguages className="size-3.5" />
                Arti
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-8">
          {/* Scene setting */}
          <section className="flex items-start gap-4 rounded-2xl border border-line/70 bg-paper p-4 shadow-sm">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-brand shadow-sm">
              <IconStorefront className="size-5" />
            </span>
            <div className="flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
                Latar Situasi
              </p>
              <p className="mt-1 text-[13px] leading-6 text-muted">
                Restoran tradisional Najd di kawasan Olaya, Riyadh. Suasana
                hangat aroma rempah cengkeh dan kapulaga. Fathia baru saja
                menempati meja lesehan dan memanggil pelayan bernama Tariq.
              </p>
            </div>
          </section>

          {/* Dialogue turns */}
          {turns.map((turn) => {
            const isFathia = turn.speaker === "fathia";
            const isActive = activeLine === turn.id;
            return (
              <section
                key={turn.id}
                className={cn(
                  "flex items-start gap-4 rounded-2xl transition-shadow",
                  isFathia && "flex-row-reverse",
                )}
              >
                <SpeakerAvatar speaker={turn.speaker} />
                <div
                  className={cn(
                    "w-full max-w-2xl rounded-2xl border border-line/70 bg-surface p-5 shadow-sm transition-shadow hover:shadow-md",
                    isFathia ? "rounded-tr-none" : "rounded-tl-none",
                    isActive && "ring-2 ring-brand/40",
                  )}
                >
                  <div
                    className={cn(
                      "flex items-center justify-between gap-4",
                      !isFathia && "flex-row-reverse",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setActiveLine((current) =>
                          current === turn.id ? null : turn.id,
                        )
                      }
                      aria-label={`Putar kalimat ${turn.name}`}
                      aria-pressed={isActive}
                      title="Pratinjau antarmuka — audio belum direkam"
                      className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-semibold text-emerald-800 transition-colors hover:bg-brand hover:text-white dark:bg-emerald-900/40 dark:text-emerald-200"
                    >
                      <IconVolume className="size-4" />
                      {turn.duration}
                    </button>
                    <p
                      lang="ar"
                      dir="rtl"
                      className="font-arabic text-[19px] font-semibold leading-relaxed text-ink"
                    >
                      {turn.arabic}
                    </p>
                  </div>

                  {showLatin ? (
                    <p className="pt-3 text-left text-[13px] font-medium tracking-wide text-muted">
                      {turn.transliteration}
                    </p>
                  ) : null}
                  {showTranslation ? (
                    <p className="pt-1 text-left text-[13px] leading-6 text-ink">
                      {turn.translation}
                    </p>
                  ) : null}

                  <div className="mt-3 space-y-1 rounded-xl bg-paper p-3 text-left">
                    <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-brand">
                      {turn.noteIcon}
                      {turn.noteLabel}
                    </p>
                    <p className="text-[12px] leading-5 text-muted">{turn.note}</p>
                  </div>
                </div>
              </section>
            );
          })}

          {/* Pronunciation practice — UI-only preview */}
          <section
            id="latih-pelafalan"
            className="flex scroll-mt-32 flex-col gap-5 rounded-2xl border border-line/70 bg-paper p-6 shadow-sm md:flex-row md:items-center md:justify-between"
          >
            <div className="space-y-1">
              <h3 className="flex items-center gap-2 text-[15px] font-bold text-ink">
                <IconMic className="size-5 text-brand" />
                Uji Pelafalan Nada Saudi Kamu
              </h3>
              <p className="text-[12px] leading-5 text-muted">
                Rekam suaramu mengucapkan kalimat Fathia:{" "}
                <em>“Abghā kabsah laḥam…”</em> dan dapatkan skor kesesuaian
                intonasi dialek Najdi.
              </p>
              {recording ? (
                <p className="text-[11px] font-semibold text-brand">
                  Pratinjau — perekaman dan penilaian belum tersedia.
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => setRecording((value) => !value)}
              aria-pressed={recording}
              className="flex shrink-0 items-center gap-3 rounded-xl bg-emerald-950 px-5 py-3 text-[12px] font-semibold text-white shadow-md transition-colors hover:bg-emerald-900"
            >
              <span className="size-3 rounded-full bg-red-500 animate-pulse-dot" />
              {recording ? "Hentikan Pratinjau" : "Tekan & Bicara Sekarang"}
            </button>
          </section>
        </div>

        <div className="flex flex-col gap-6 lg:sticky lg:top-56 lg:col-span-4">
          {children}
        </div>
      </div>
    </div>
  );
}
