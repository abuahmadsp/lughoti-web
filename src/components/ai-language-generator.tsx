"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { useVocabularyLibrary } from "./add-vocabulary-flow";
import {
  IconArrowRight,
  IconBook,
  IconCheck,
  IconLanguages,
  IconLightbulb,
  IconPlusCircle,
  IconSparkles,
  IconX,
} from "./icons";

type Track = "fushah" | "amiyah" | "both";
type GeneratedTrack = Exclude<Track, "both">;
type Tone = "formal" | "percakapan" | "pembelajaran";
type Topic = "pasar" | "sapaan" | "pelajaran" | "umum";

type GeneratedLine = {
  track: GeneratedTrack;
  arabic: string;
  translit: string;
  meaning: string;
  note: string;
};

const trackLabels: Record<Track, string> = {
  fushah: "Fushah (الفصحى)",
  amiyah: "Amiyah Saudi (العامية)",
  both: "Fushah & Amiyah",
};

const toneLabels: Record<Tone, string> = {
  formal: "Formal / akademik",
  percakapan: "Percakapan sehari-hari",
  pembelajaran: "Contoh untuk belajar",
};

const toneNotes: Record<Tone, string> = {
  formal: "Nada formal dan rapi untuk konteks akademik.",
  percakapan: "Nada percakapan alami untuk situasi sehari-hari.",
  pembelajaran: "Kalimat pendek yang cocok untuk latihan bertahap.",
};

const topicTemplates: Record<
  Topic,
  Record<GeneratedTrack, Omit<GeneratedLine, "note">>
> = {
  pasar: {
    fushah: {
      track: "fushah",
      arabic: "سَأَذْهَبُ إِلَى السُّوقِ لِشِرَاءِ بَعْضِ الْحَوَائِجِ.",
      translit: "Sa-adhhabu ilā as-sūqi li-shirā'i ba'ḍi al-ḥawā'iji.",
      meaning: "Saya akan pergi ke pasar untuk membeli beberapa keperluan.",
    },
    amiyah: {
      track: "amiyah",
      arabic: "أنا رايح السوق أشتري حاجات.",
      translit: "Anā rāyiḥ as-sūq ashtari ḥājāt.",
      meaning: "Saya mau ke pasar beli barang.",
    },
  },
  sapaan: {
    fushah: {
      track: "fushah",
      arabic: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتِهِ.",
      translit: "As-salāmu 'alaykum wa-raḥmatu llāhi wa-barakātuh.",
      meaning: "Semoga keselamatan, rahmat, dan berkah Allah menyertaimu.",
    },
    amiyah: {
      track: "amiyah",
      arabic: "السلام عليكم، شلونك اليوم؟",
      translit: "As-salāmu 'alaykum, shlōnak al-yōm?",
      meaning: "Halo, bagaimana kabarmu hari ini?",
    },
  },
  pelajaran: {
    fushah: {
      track: "fushah",
      arabic: "دَرَسْتُ مُفْرَدَاتٍ جَدِيدَةً مِنَ الْكِتَابِ الْيَوْمَ.",
      translit: "Darasatu mufradātin jadīdatin min al-kitābi al-yawm.",
      meaning: "Hari ini saya mempelajari kosakata baru dari buku.",
    },
    amiyah: {
      track: "amiyah",
      arabic: "اليوم تعلّمت كلمات جديدة من الكتاب.",
      translit: "Al-yōm ta'allamtu kilmāt jadīdah min al-kitāb.",
      meaning: "Hari ini saya belajar kata-kata baru dari buku.",
    },
  },
  umum: {
    fushah: {
      track: "fushah",
      arabic: "هَذِهِ جُمْلَةٌ تَوْضِيحِيَّةٌ بِاللُّغَةِ الْعَرَبِيَّةِ الْفُصْحَى.",
      translit: "Hādhihi jumlatun tawḍīḥiyyatun bi-al-lughati al-'arabiyyati al-fuṣḥā.",
      meaning: "Ini adalah kalimat penjelas dalam bahasa Arab Fushah.",
    },
    amiyah: {
      track: "amiyah",
      arabic: "هذي جملة بالعربي الأمياه عشان نفهم المعنى.",
      translit: "Hādhī jumlah bil-'arabi al-'āmiyyah 'ashān nifham al-ma'nā.",
      meaning: "Ini kalimat bahasa Arab Amiyah supaya kita paham maknanya.",
    },
  },
};

const examplePrompts = [
  { label: "Belanja di pasar", value: "Saya ingin belanja di pasar" },
  { label: "Sapaan pagi", value: "Sapaan pagi untuk teman" },
  { label: "Belajar kosakata", value: "Belajar kosakata dari buku" },
];

function detectTopic(prompt: string): Topic {
  const value = prompt.toLowerCase();
  if (/belanja|pasar|souq|suq|harga|jual/.test(value)) return "pasar";
  if (/sapa|halo|pag|selamat|teman/.test(value)) return "sapaan";
  if (/belajar|pelajaran|buku|kitab|kosakata|mufrodat/.test(value)) {
    return "pelajaran";
  }
  return "umum";
}

function buildResult(track: Track, tone: Tone, prompt: string): GeneratedLine[] {
  const topic = detectTopic(prompt);
  const pair = topicTemplates[topic];
  const selected: GeneratedTrack[] =
    track === "both" ? ["fushah", "amiyah"] : [track];
  const note = `${toneNotes[tone]} Topik demo: ${prompt.trim() || "contoh umum"}.`;

  return selected.map((item) => ({ ...pair[item], note }));
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
      <span className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-ink">
        {label}
        {hint ? (
          <span className="font-medium text-muted">({hint})</span>
        ) : null}
      </span>
      {children}
    </label>
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

function GeneratorDialog({
  initialTrack,
  onClose,
}: {
  initialTrack: Track;
  onClose: () => void;
}) {
  const { addGeneratedEntry } = useVocabularyLibrary();
  const dialogRef = useDialogBehavior(onClose);
  const [prompt, setPrompt] = useState("");
  const [track, setTrack] = useState<Track>(initialTrack);
  const [tone, setTone] = useState<Tone>("percakapan");
  const [result, setResult] = useState<GeneratedLine[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [notice, setNotice] = useState<string | null>(null);

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(buildResult(track, tone, prompt));
    setSaved([]);
    setNotice(
      "Contoh disusun dari templat demo, bukan hasil model AI sungguhan.",
    );
  }

  function saveLine(line: GeneratedLine) {
    addGeneratedEntry({
      arabic: line.arabic,
      translit: line.translit,
      meaning: line.meaning,
      track: line.track,
      note: `${line.note} Diambil dari generator AI demo.`,
    });
    setSaved((current) =>
      current.includes(line.arabic) ? current : [...current, line.arabic],
    );
    setNotice("Kalimat ditambahkan ke bank kosakata demo sesi ini.");
  }

  const inputClass =
    "w-full rounded-xl border border-line/70 bg-paper px-3 py-2.5 text-[12px] text-ink placeholder:text-muted/60 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

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
        aria-labelledby="ai-generator-title"
        aria-describedby="ai-generator-desc"
        className="animate-flow-in relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-line/70 bg-paper shadow-2xl outline-none"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line/70 bg-surface px-5 py-4 sm:px-6">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
                <IconSparkles className="size-4" />
              </span>
              <h2 id="ai-generator-title" className="text-[17px] font-bold text-ink">
                Generator Fushah &amp; Amiyah
              </h2>
              <span
                lang="ar"
                dir="rtl"
                className="font-arabic text-[13px] font-semibold text-brand"
              >
                «تَوْلِيدُ النَّصِّ»
              </span>
              <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
                Contoh
              </span>
            </div>
            <p id="ai-generator-desc" className="text-[11px] leading-5 text-muted">
              Tulis topik, pilih ragam bahasa, lalu hasilkan kalimat contoh.
              Seluruh keluaran berasal dari templat demo; tidak ada model, API,
              atau data yang dipanggil.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup generator"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-line/70 text-muted transition-colors hover:bg-line/30 hover:text-ink"
          >
            <IconX className="size-4" />
          </button>
        </header>

        <div className="max-h-[calc(100dvh-13rem)] overflow-y-auto p-5 sm:p-6">
          <form onSubmit={generate} className="flex flex-col gap-4">
            <Field label="Topik atau kalimat sumber" hint="Indonesia atau Arab">
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                rows={3}
                placeholder="Misalnya: saya ingin bertanya harga di pasar"
                className={cn(inputClass, "resize-none leading-5")}
              />
            </Field>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                <IconLightbulb className="size-3.5 text-brand" />
                Contoh topik:
              </span>
              {examplePrompts.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setPrompt(item.value)}
                  className="rounded-full border border-line/70 bg-surface px-2.5 py-1 text-[10px] font-semibold text-ink transition-colors hover:border-brand/40 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Ragam bahasa">
                <select
                  value={track}
                  onChange={(event) => setTrack(event.target.value as Track)}
                  className={inputClass}
                >
                  <option value="fushah">{trackLabels.fushah}</option>
                  <option value="amiyah">{trackLabels.amiyah}</option>
                  <option value="both">{trackLabels.both}</option>
                </select>
              </Field>
              <Field label="Gaya kalimat">
                <select
                  value={tone}
                  onChange={(event) => setTone(event.target.value as Tone)}
                  className={inputClass}
                >
                  {Object.entries(toneLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 self-start rounded-xl bg-emerald-950 px-4 py-2.5 text-[12px] font-bold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
            >
              <IconSparkles className="size-4 text-sand-200" />
              Hasilkan Contoh
              <IconArrowRight className="size-4" />
            </button>
          </form>

          {result.length > 0 ? (
            <section
              aria-live="polite"
              className="mt-5 flex flex-col gap-3 border-t border-line/70 pt-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[13px] font-bold text-ink">
                  Hasil Contoh ({result.length})
                </h3>
                <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sand-900 dark:bg-sand-300/15 dark:text-sand-100">
                  Data demo
                </span>
              </div>

              {result.map((line) => {
                const isSaved = saved.includes(line.arabic);
                return (
                  <article
                    key={line.track}
                    className="flex flex-col gap-3 rounded-xl border border-line/70 bg-surface p-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
                          <IconLanguages className="size-3.5" />
                          {trackLabels[line.track]}
                        </span>
                        <span className="text-[10px] text-muted">
                          {toneLabels[tone]}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => saveLine(line)}
                        disabled={isSaved}
                        className={cn(
                          "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-bold transition-colors",
                          isSaved
                            ? "cursor-default bg-emerald-50 text-brand dark:bg-emerald-900/20"
                            : "bg-paper text-ink hover:bg-line/40",
                        )}
                      >
                        {isSaved ? (
                          <IconCheck className="size-3.5" />
                        ) : (
                          <IconPlusCircle className="size-3.5" />
                        )}
                        {isSaved ? "Tersimpan (Pratinjau)" : "Tambah ke Bank"}
                      </button>
                    </div>

                    <p
                      lang="ar"
                      dir="rtl"
                      className="font-arabic text-[20px] font-bold leading-loose text-brand sm:text-[23px]"
                    >
                      {line.arabic}
                    </p>
                    <div className="flex flex-col gap-1">
                      <p className="font-mono text-[11px] font-semibold text-ink">
                        {line.translit}
                      </p>
                      <p className="text-[12px] leading-5 text-muted">
                        {line.meaning}
                      </p>
                      <p className="text-[10px] leading-4 text-muted">
                        {line.note}
                      </p>
                    </div>
                  </article>
                );
              })}
            </section>
          ) : (
            <p className="mt-5 flex items-center gap-2 rounded-xl border border-dashed border-line/70 bg-paper px-3 py-4 text-[11px] text-muted">
              <IconBook className="size-4 shrink-0 text-brand" />
              Pilih ragam bahasa dan tekan <strong>Hasilkan Contoh</strong> untuk
              melihat kalimat Fushah atau Amiyah.
            </p>
          )}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 bg-surface px-5 py-4 sm:px-6">
          <p className="text-[10px] leading-4 text-muted" role="status">
            {notice ?? "Pratinjau — tidak ada koneksi ke layanan AI."}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line/70 bg-surface px-3.5 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
          >
            Tutup
          </button>
        </footer>
      </div>
    </div>
  );
}

/** In-page AI demo card and generator dialog for the admin dashboard. */
export function AiLanguageGenerator() {
  const [initialTrack, setInitialTrack] = useState<Track | null>(null);

  return (
    <section
      id="generator-bahasa"
      className="flex scroll-mt-20 flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5 lg:flex-row lg:items-center lg:justify-between"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-brand dark:bg-emerald-900/40">
          <IconSparkles className="size-5" />
        </span>
        <div className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-semibold text-ink">
              Generator Bahasa Fushah &amp; Amiyah
            </h2>
            <span className="rounded-full bg-brand/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand">
              Bantuan AI · Demo
            </span>
          </div>
          <p className="text-[12px] leading-5 text-muted">
            Susun contoh kalimat Arab baku dan percakapan Saudi dari sebuah
            topik. Templat demo, tanpa model atau API sungguhan.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:shrink-0">
        <button
          type="button"
          onClick={() => setInitialTrack("fushah")}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-950 px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
        >
          <IconSparkles className="size-3.5" />
          Generate Fushah
        </button>
        <button
          type="button"
          onClick={() => setInitialTrack("amiyah")}
          className="flex items-center gap-1.5 rounded-lg bg-brand px-3 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-700"
        >
          <IconLanguages className="size-3.5" />
          Generate Amiyah
        </button>
        <button
          type="button"
          onClick={() => setInitialTrack("both")}
          className="flex items-center gap-1.5 rounded-lg bg-paper px-3 py-2 text-[11px] font-bold text-ink transition-colors hover:bg-line/40"
        >
          Bandingkan Keduanya
          <IconArrowRight className="size-3.5" />
        </button>
      </div>

      {initialTrack ? (
        <GeneratorDialog
          initialTrack={initialTrack}
          onClose={() => setInitialTrack(null)}
        />
      ) : null}
    </section>
  );
}
