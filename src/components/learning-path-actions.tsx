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
  IconBadgeCheck,
  IconBook,
  IconHeadphones,
  IconLightbulb,
  IconLock,
  IconMic,
  IconPause,
  IconPlay,
  IconRefresh,
  IconSparkles,
  IconStorefront,
  IconSubtitles,
  IconVolume,
  IconWaveform,
  IconX,
} from "./icons";

export type PathInfoKey =
  | "m1"
  | "m2"
  | "m3"
  | "m4"
  | "history"
  | "bab1_2"
  | "bab3_4"
  | "bab5"
  | "bab6_8"
  | "drill";

type Dialog = "review" | "conversation" | { info: PathInfoKey } | null;

type ActionsContextValue = {
  openReview: () => void;
  openConversation: () => void;
  openInfo: (key: PathInfoKey) => void;
};

const ActionsContext = createContext<ActionsContextValue | null>(null);

function useLearningPathActions() {
  const value = useContext(ActionsContext);
  if (!value) {
    throw new Error(
      "Aksi jalur belajar harus dipakai di dalam LearningPathActionsProvider",
    );
  }
  return value;
}

/** Session-only dialog state for the two active cards on the Amiyah track. */
export function LearningPathActionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [dialog, setDialog] = useState<Dialog>(null);
  const close = useCallback(() => setDialog(null), []);
  const openReview = useCallback(() => setDialog("review"), []);
  const openConversation = useCallback(() => setDialog("conversation"), []);
  const openInfo = useCallback(
    (key: PathInfoKey) => setDialog({ info: key }),
    [],
  );

  return (
    <ActionsContext.Provider value={{ openReview, openConversation, openInfo }}>
      {children}
      {dialog === "review" ? <ReviewAudioDialog onClose={close} /> : null}
      {dialog === "conversation" ? (
        <ConversationPracticeDialog onClose={close} />
      ) : null}
      {dialog && typeof dialog === "object" ? (
        <PathInfoDialog info={dialog.info} onClose={close} />
      ) : null}
    </ActionsContext.Provider>
  );
}

export function ReviewAudioButton({
  className,
  children,
  title,
}: {
  className?: string;
  children: ReactNode;
  title?: string;
}) {
  const { openReview } = useLearningPathActions();
  return (
    <button type="button" onClick={openReview} title={title} className={className}>
      {children}
    </button>
  );
}

export function ConversationPracticeButton({
  className,
  children,
  title,
}: {
  className?: string;
  children: ReactNode;
  title?: string;
}) {
  const { openConversation } = useLearningPathActions();
  return (
    <button
      type="button"
      onClick={openConversation}
      title={title}
      className={className}
    >
      {children}
    </button>
  );
}

export function PathInfoButton({
  info,
  className,
  children,
  title,
}: {
  info: PathInfoKey;
  className?: string;
  children: ReactNode;
  title?: string;
}) {
  const { openInfo } = useLearningPathActions();
  return (
    <button
      type="button"
      onClick={() => openInfo(info)}
      title={title}
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

const waveHeights = [
  "h-2", "h-4", "h-6", "h-3", "h-5", "h-7", "h-4", "h-2", "h-5", "h-6",
  "h-3", "h-4", "h-7", "h-5", "h-2", "h-6", "h-4", "h-3", "h-5", "h-2",
];

const reviewLines = [
  {
    id: "sapa",
    arabic: "هَلَا وَاللَّه، يَا مَرْحَبَا",
    latin: "Hala wallah, ya marhabā",
    idn: "Halo, demi Allah, selamat datang",
  },
  {
    id: "bagasi",
    arabic: "مِنْ فَضْلِكَ، أَيْنَ مَخْرَجُ الحَقَائِبِ؟",
    latin: "Min faḍlika, ayna makhraju al-ḥaqā'ib?",
    idn: "Mohon maaf, di mana pengambilan bagasi?",
  },
  {
    id: "kontak",
    arabic: "أَعْطِنِي رَقْمَ جَوَالِكَ",
    latin: "A‘ṭinī raqma jawālika",
    idn: "Berikan saya nomor ponselmu",
  },
];

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

function ReviewAudioDialog({ onClose }: { onClose: () => void }) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const progressRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    const interval = window.setInterval(() => {
      const next = Math.min(100, progressRef.current + 2 * speed);
      progressRef.current = next;
      setProgress(next);
      if (next >= 100) setPlaying(false);
    }, 120);
    return () => window.clearInterval(interval);
  }, [playing, speed]);

  function restart() {
    progressRef.current = 0;
    setProgress(0);
    setPlaying(false);
  }

  function togglePlayback() {
    if (progressRef.current >= 100) {
      progressRef.current = 0;
      setProgress(0);
    }
    setPlaying((value) => !value);
  }

  const currentSecond = Math.round((72 * progress) / 100);
  const activeLine = progress < 34 ? 0 : progress < 67 ? 1 : 2;

  return (
    <DialogShell
      labelledBy="review-audio-title"
      onClose={onClose}
      header={
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
              <IconHeadphones className="size-4" />
            </span>
            <h2 id="review-audio-title" className="text-[16px] font-bold text-ink">
              Audio Review Modul 1
            </h2>
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
              Selesai
            </span>
            <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              Pratinjau
            </span>
          </div>
          <p className="text-[11px] leading-5 text-muted">
            Kedatangan di Bandara King Abdulaziz Jeddah — ulang lafal sapaan,
            navigasi bagasi, dan pertukaran kontak.
          </p>
        </div>
      }
      footer={
        <>
          <p className="text-[10px] leading-4 text-muted">
            Simulasi tampilan — tidak ada berkas audio yang diputar.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={restart}
              className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-surface px-3.5 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
            >
              <IconRefresh className="size-3.5" />
              Ulangi
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
            aria-label={playing ? "Jeda pratinjau audio" : "Putar pratinjau audio"}
            aria-pressed={playing}
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-full bg-emerald-200 text-emerald-950 transition-transform hover:scale-105 active:scale-95",
              playing && "ring-4 ring-emerald-200/40",
            )}
          >
            {playing ? <IconPause className="size-5" /> : <IconPlay className="size-5" />}
          </button>
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold">Putar Audio Review</span>
            <span className="font-mono text-[10px] text-emerald-200/80">
              {formatTime(currentSecond)} / 01:12
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
                    ? "bg-emerald-200 text-emerald-950"
                    : "text-emerald-200/70 hover:text-emerald-100",
                )}
              >
                {value}x
              </button>
            ))}
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-3 flex h-10 items-center gap-[3px] overflow-hidden rounded-lg bg-emerald-900/50 px-3"
        >
          {waveHeights.map((height, index) => (
            <span
              key={index}
              className={cn(
                "w-1 shrink-0 rounded-full",
                index < Math.round((progress / 100) * waveHeights.length)
                  ? "bg-emerald-200"
                  : "bg-emerald-200/30",
                height,
                playing && "animate-eq origin-bottom",
              )}
              style={playing ? { animationDelay: `${index * 60}ms` } : undefined}
            />
          ))}
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-900">
          <div
            className="h-full rounded-full bg-emerald-200 transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <p className="mt-3 flex items-start gap-1.5 text-[10px] leading-4 text-muted">
        <IconWaveform className="mt-px size-3.5 shrink-0 text-brand" />
        Pratinjau — audio tartil belum direkam. Bilah waktu, kecepatan, dan
        sorotan transkrip hanya simulasi visual; tidak ada suara yang diputar.
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand">
          <IconSubtitles className="size-3.5" />
          Transkrip Review
        </span>
        {reviewLines.map((line, index) => (
          <div
            key={line.id}
            className={cn(
              "flex flex-col gap-0.5 rounded-xl border p-3 transition-colors",
              activeLine === index
                ? "border-brand/40 bg-emerald-50 dark:bg-emerald-900/20"
                : "border-line/70 bg-surface",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <p
                lang="ar"
                dir="rtl"
                className="font-arabic text-[16px] font-semibold leading-loose text-ink"
              >
                {line.arabic}
              </p>
              {activeLine === index ? (
                <IconVolume className="size-4 shrink-0 text-brand" />
              ) : null}
            </div>
            <p className="text-[11px] font-medium text-brand">{line.latin}</p>
            <p className="text-[10px] text-muted">{line.idn}</p>
          </div>
        ))}
      </div>
    </DialogShell>
  );
}

const conversationTurns = [
  {
    id: "pesan",
    speaker: "Andi",
    role: "Pelajar",
    own: true,
    arabic: "أَبْغَى قَهْوَة سُعُودِيَّة وَتَمْر سُكَّرِي، لَوْ سَمَحْت",
    latin: "Abghā gahwah su‘ūdiyyah wa tamr sukkari, law samaḥt",
    idn: "Saya mau kopi Saudi dan kurma sukari, mohon",
  },
  {
    id: "tanya",
    speaker: "Penjual",
    role: "Pedagang Hijazi",
    own: false,
    arabic: "حَيَّاك الله! كَمْ هَذَا؟ تِسْعَة رِيَال، أَوْ خُدْ اثْنَيْنِ بِسِتَّة عَشَر",
    latin: "Ḥayyāka Allāh! Kam hādhā? Ti‘sah riyāl, aw khudh ithnayn bi-sittata ‘ashar",
    idn: "Selamat datang! Ini berapa? Sembilan riyal, atau ambil dua untuk enam belas",
  },
  {
    id: "tawar",
    speaker: "Andi",
    role: "Pelajar",
    own: true,
    arabic: "طَيِّب، خُذْ سَبْعَة وَأَعْطِنِي وَصْلִينِ بِالْمَادَا",
    latin: "Ṭayyib, khudh sab‘ah wa a‘ṭinī waṣlayni bil-mādā",
    idn: "Baik, ambil tujuh dan beri saya dua struk Mada",
  },
];

function ConversationPracticeDialog({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [micPreview, setMicPreview] = useState(false);
  const visibleTurns = conversationTurns.slice(0, step);

  return (
    <DialogShell
      labelledBy="conversation-practice-title"
      onClose={onClose}
      header={
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-sand-200 text-sand-900 dark:bg-sand-300/20 dark:text-sand-100">
              <IconMic className="size-4" />
            </span>
            <h2
              id="conversation-practice-title"
              className="text-[16px] font-bold text-ink"
            >
              Latihan Percakapan Modul 2
            </h2>
            <span className="rounded bg-sand-200 px-1.5 py-0.5 text-[9px] font-bold text-sand-900 dark:bg-sand-300/20 dark:text-sand-100">
              85%
            </span>
            <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              Pratinjau
            </span>
          </div>
          <p className="text-[11px] leading-5 text-muted">
            Maqha Kafe, Restoran &amp; Tawar-Menawar di Suq — skenario roleplay AI
            terakhir yang tersisa.
          </p>
        </div>
      }
      footer={
        <>
          <p className="text-[10px] leading-4 text-muted">
            Giliran {step} dari {conversationTurns.length} — tidak ada audio,
            microphone, atau penilaian sungguhan.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line/70 bg-surface px-3.5 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
            >
              Tutup
            </button>
            {step < conversationTurns.length ? (
              <button
                type="button"
                onClick={() => setStep((value) => value + 1)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-sand-300 px-4 py-2 text-[11px] font-bold text-sand-950 transition-colors hover:bg-sand-200"
              >
                Giliran Berikutnya
                <IconArrowRight className="size-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setMicPreview(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-950 px-4 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
              >
                <IconRefresh className="size-3.5" />
                Ulangi Skenario
              </button>
            )}
          </div>
        </>
      }
    >
      <div className="flex items-start gap-3 rounded-xl border border-line/70 bg-surface p-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-100">
          <IconStorefront className="size-4" />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
            Latar Situasi
          </p>
          <p className="mt-0.5 text-[11px] leading-5 text-muted">
            Suq tradisional Hijaz. Anda memesan Qahwa Saudi dan Tamr Sukari,
            lalu menawar harga dengan pedagang sebelum membayar pakai Mada.
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {visibleTurns.map((turn, index) => (
          <div
            key={turn.id}
            className={cn(
              "flex flex-col gap-1 rounded-xl border border-line/70 bg-surface p-3",
              turn.own && "ml-auto max-w-[92%] bg-emerald-50 dark:bg-emerald-900/20",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-ink">
                {index === visibleTurns.length - 1 ? (
                  <IconSparkles className="size-3.5 text-brand" />
                ) : (
                  <IconBadgeCheck className="size-3.5 text-brand" />
                )}
                {turn.speaker}
                <span className="font-normal text-muted">• {turn.role}</span>
              </span>
              <span className="text-[9px] font-semibold text-muted">
                Giliran {index + 1}
              </span>
            </div>
            <p
              lang="ar"
              dir="rtl"
              className="font-arabic text-[15px] font-semibold leading-loose text-ink"
            >
              {turn.arabic}
            </p>
            <p className="text-[11px] font-medium text-brand">{turn.latin}</p>
            <p className="text-[10px] text-muted">{turn.idn}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 rounded-xl border border-line/70 bg-surface p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2">
          <IconLightbulb className="mt-px size-4 shrink-0 text-gold" />
          <div>
            <p className="text-[11px] font-bold text-ink">
              Uji pelafalan (simulasi)
            </p>
            <p className="text-[10px] leading-4 text-muted">
              Ucapkan kalimat giliran Anda. Perekaman dan penilaian intonasi
              belum tersedia pada demo ini.
            </p>
            {micPreview ? (
              <p className="mt-1 text-[10px] font-semibold text-brand">
                Pratinjau — tidak ada microphone yang diaktifkan dan tidak ada
                suara yang direkam.
              </p>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMicPreview((value) => !value)}
          aria-pressed={micPreview}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-950 px-3.5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
        >
          <IconMic className="size-3.5" />
          {micPreview ? "Hentikan Pratinjau" : "Coba Ucapkan"}
        </button>
      </div>
    </DialogShell>
  );
}

type PathInfo = {
  eyebrow: string;
  title: string;
  arabic?: string;
  badge: string;
  tone: "good" | "active" | "locked";
  intro: string;
  items: { label: string; text: string }[];
  note: string;
  action?: string;
};

const pathInfo: Record<PathInfoKey, PathInfo> = {
  m1: {
    eyebrow: "Jalur 1 • Fushah Standar Akademik",
    title: "Marhalah 1 — Mubtadi'",
    arabic:
      "مَبَادِئُ اللُّغَةِ: الحُرُوفُ، الحَرَكَاتُ، وَأَقْسَامُ الكَلِمِ",
    badge: "100% Selesai",
    tone: "good",
    intro:
      "Fondasi huruf, harakat, dan pembagian kalimah yang dituntaskan pada 14 Syawal 1447 H.",
    items: [
      {
        label: "12 unit materi",
        text: "Artikulasi makharijul huruf fusha, harakat, sukun, dan tanda baca dasar.",
      },
      {
        label: "Pembagian kalimah",
        text: "Isim, fi'il, haraf, serta penggunaan dhamir munfashil.",
      },
      {
        label: "140 mufrodat dasar",
        text: "Kosakata ibadah harian dan ungkapan dasar yang telah dikuasai.",
      },
      {
        label: "Capaian",
        text: "Lencana Mubtadi' Mutqin dengan skor rata-rata contoh 96%.",
      },
    ],
    note: "Pratinjau — capaian ini adalah data contoh, bukan catatan belajar sungguhan.",
  },
  history: {
    eyebrow: "Marhalah 1 • Riwayat Belajar",
    title: "Riwayat & Catatan — Marhalah 1",
    badge: "Arsip Demo",
    tone: "good",
    intro:
      "Ringkasan simulasi progres dan catatan tutor selama menuntaskan Marhalah 1.",
    items: [
      {
        label: "14 Syawal 1447 H",
        text: "Unit 12 dinyatakan selesai: dhamir munfashil dan latihan penggolongan kalimah.",
      },
      {
        label: "10 Syawal 1447 H",
        text: "Kuis identifikasi harakat mendapat skor contoh 96%.",
      },
      {
        label: "03 Syawal 1447 H",
        text: "Catatan musyrif: perkuat pembedaan artikulasi huruf ح dan ه.",
      },
      {
        label: "25 Ramadhan 1447 H",
        text: "Menyelesaikan 140 mufrodat dasar ibadah harian.",
      },
    ],
    note: "Pratinjau — tanggal, skor, dan catatan di atas seluruhnya ilustratif.",
  },
  m2: {
    eyebrow: "Jalur 1 • Fushah Standar Akademik",
    title: "Marhalah 2 — Nahwu & Shorof Dasar",
    arabic:
      "الجُمْلَةُ الفِعْلِيَّةُ، الجُمْلَةُ الاِسْمِيَّةُ، المَفْعُولُ بِهِ، وَتَصْرِيفُ الأَفْعَالِ",
    badge: "Sedang Aktif (68%)",
    tone: "active",
    intro:
      "Marhalah berjalan dengan fokus pada struktur jumlah dan tasyrif af'al. Modul 5 dari 8 sedang dikerjakan.",
    items: [
      {
        label: "Bab 1–2 • Selesai",
        text: "Fa'il dan Maf'ul dalam jumlah fi'liyyah.",
      },
      {
        label: "Bab 3–4 • Selesai",
        text: "Mubtada' dan khobar dalam jumlah ismiyyah.",
      },
      {
        label: "Bab 5 • Sedang berlangsung",
        text: "Isim Inna dan Kaana beserta turunannya.",
      },
      {
        label: "Bab 6–8 • Terkunci",
        text: "Tasyrif istilahi dibuka setelah Bab 5 selesai.",
      },
    ],
    note: "Pratinjau — progres 68% dan perkiraan 5 hari adalah data contoh.",
  },
  bab1_2: {
    eyebrow: "Marhalah 2 • Bab 1–2",
    title: "Bab 1–2 — Fa'il & Maf'ul",
    arabic: "الفَاعِلُ وَالمَفْعُولُ بِهِ",
    badge: "Selesai",
    tone: "good",
    intro:
      "Ringkasan Bab 1–2 tentang pelaku dan objek dalam jumlah fi'liyyah. Sudah dituntaskan pada demo ini.",
    items: [
      {
        label: "Bab 1 — Fa'il",
        text: "Pelaku yang beri'rob marfu' dalam kalimat verbal.",
      },
      {
        label: "Bab 2 — Maf'ul bihi",
        text: "Objek yang beri'rob mansub setelah fi'il.",
      },
      {
        label: "Contoh",
        text: "ضَرَبَ الوَلَدُ الكُرَةَ — si anak memukul bola.",
      },
      {
        label: "Capaian",
        text: "Latihan contoh 12 kalimat dengan skor ilustratif 92%.",
      },
    ],
    note: "Pratinjau — skor dan capaian di atas adalah data contoh.",
    action: "Ulangi Ringkasan (Pratinjau)",
  },
  bab3_4: {
    eyebrow: "Marhalah 2 • Bab 3–4",
    title: "Bab 3–4 — Mubtada' & Khobar",
    arabic: "المُبْتَدَأُ وَالخَبَرُ",
    badge: "Selesai",
    tone: "good",
    intro:
      "Ringkasan Bab 3–4 tentang subjek dan predikat dalam jumlah ismiyyah yang sudah diselesaikan.",
    items: [
      {
        label: "Bab 3 — Mubtada'",
        text: "Subjek yang beri'rob marfu' di awal kalimat nominal.",
      },
      {
        label: "Bab 4 — Khobar",
        text: "Predikat yang menjelaskan mubtada', bisa marfu' atau mansub.",
      },
      {
        label: "Contoh",
        text: "الكِتَابُ مُفِيدٌ — buku itu bermanfaat.",
      },
      {
        label: "Capaian",
        text: "Latihan contoh 10 kalimat dengan skor ilustratif 94%.",
      },
    ],
    note: "Pratinjau — skor dan capaian di atas adalah data contoh.",
    action: "Ulangi Ringkasan (Pratinjau)",
  },
  bab5: {
    eyebrow: "Marhalah 2 • Bab 5",
    title: "Lanjutkan Bab 5 — Isim Inna wa Akhawatuha",
    arabic: "إِنَّ وَأَخَوَاتِهَا",
    badge: "Sedang Dipelajari",
    tone: "active",
    intro:
      "Simulasi ringkas alur Bab 5. Tidak ada materi, latihan, atau progres sungguhan yang dimuat.",
    items: [
      {
        label: "Langkah 1",
        text: "Mengenali إِنَّ, أَنَّ, كَانَ, dan saudara-saudaranya.",
      },
      {
        label: "Langkah 2",
        text: "Menentukan isim Inna yang beri'rob mansub.",
      },
      {
        label: "Langkah 3",
        text: "Menentukan khobar Inna yang beri'rob marfu'.",
      },
      {
        label: "Langkah 4",
        text: "Latihan contoh 10 kalimat dan evaluasi singkat.",
      },
    ],
    note: "Pratinjau — tidak ada materi yang dibuka atau disimpan.",
    action: "Tandai Langkah (Pratinjau)",
  },
  bab6_8: {
    eyebrow: "Marhalah 2 • Bab 6–8",
    title: "Bab 6–8 — Tasyrif Istilahi",
    arabic: "التَّصْرِيفُ الاصْطِلَاحِيُّ",
    badge: "Terkunci",
    tone: "locked",
    intro:
      "Tiga bab terakhir yang belum terbuka. Detail ini hanya pratinjau syarat dan cakupan materinya.",
    items: [
      {
        label: "Syarat pembuka",
        text: "Bab 5 dinyatakan selesai lebih dulu.",
      },
      {
        label: "Bab 6 — Tasyrif tsulatsi",
        text: "Pol madhi, mudhari', amr, dan mashdar untuk fi'il tsulatsi.",
      },
      {
        label: "Bab 7 — Tashrif ruba'i",
        text: "Pola fi'il ruba'i beserta turunannya.",
      },
      {
        label: "Bab 8 — Fi'il mu'tal",
        text: "Perubahan huruf illat pada tasyrif.",
      },
    ],
    note: "Pratinjau — status terkunci hanya simulasi; tidak ada akses yang dibuka.",
  },
  drill: {
    eyebrow: "Marhalah 2 • Latihan",
    title: "Tashrif Drill — Tasyrif Af'al",
    arabic: "تَصْرِيفُ الأَفْعَالِ",
    badge: "Latihan Demo",
    tone: "active",
    intro:
      "Contoh pola tasyrif yang biasa dipakai pada drill. Tidak ada penilaian atau audio yang dijalankan.",
    items: [
      {
        label: "Madhi → Mudhari'",
        text: "فَعَلَ → يَفْعُلُ (dia telah melakukan → dia melakukan).",
      },
      {
        label: "Amr",
        text: "اِفْعَلْ → bentuk perintah untuk mudhat atau jamak.",
      },
      {
        label: "Mashdar & Isim Fa'il",
        text: "فِعْلٌ → فَاعِلٌ sesuai pola fi'il tsulatsi.",
      },
      {
        label: "Mubalaghah",
        text: "فَعَّالٌ untuk intensitas, misalnya صَوَّابٌ.",
      },
    ],
    note: "Pratinjau — jawaban drill hanya contoh dan tidak dinilai.",
    action: "Coba Latihan (Pratinjau)",
  },
  m3: {
    eyebrow: "Jalur 1 • Fushah Standar Akademik",
    title: "Marhalah 3 — Tarkib & Balaghah",
    arabic:
      "الإِعْرَابُ التَّفْصِيلِيُّ، عِلْمُ البَيَانِ، وَقِرَاءَةُ النُّصُوصِ التُّرَاثِيَّةِ",
    badge: "Terkunci",
    tone: "locked",
    intro:
      "Marhalah lanjutan yang belum terbuka. Prasyaratnya adalah menuntaskan evaluasi Marhalah 2.",
    items: [
      {
        label: "Syarat pembuka",
        text: "Marhalah 2 harus mencapai 100% selesai, termasuk Bab 6–8.",
      },
      {
        label: "16 bab lanjutan",
        text: "I'rob Mahalli/Taqdiri, Na'at Man'ut, dan Idhafah majazi.",
      },
      {
        label: "Balaghah",
        text: "Dasar tasybih, majaz, dan keindahan bayan Al-Qur'an.",
      },
      {
        label: "Qira'ah",
        text: "Pembacaan teks turots tanpa syakal atau kitab gundul.",
      },
    ],
    note: "Pratinjau — status terkunci hanya simulasi; tidak ada pembukaan akses sungguhan.",
  },
  m4: {
    eyebrow: "Jalur 1 • Fushah Standar Akademik",
    title: "Marhalah 4 — Mahir & Dirasah Mutaqaddimah",
    arabic:
      "دِرَاسَةُ أُمَّهَاتِ الكُتُبِ، إِعْجَازُ القُرْآنِ، وَالبَحْثُ الأَكَادِيمِيُّ بِالعَرَبِيَّةِ",
    badge: "Terkunci • Target C1",
    tone: "locked",
    intro:
      "Tahap akhir jalur Fushah untuk analisis kutub turots dan penulisan akademik bahasa Arab.",
    items: [
      {
        label: "Syarat pembuka",
        text: "Marhalah 3 tuntas dan target level CEFR C1 tercapai.",
      },
      {
        label: "Kutub turots",
        text: "Membaca ummahat al-kutub dengan pendampingan musyrif.",
      },
      {
        label: "I'jaz Al-Qur'an",
        text: "Mengkaji aspek balaghah dan keunikan susunan Al-Qur'an.",
      },
      {
        label: "Penulisan ilmiah",
        text: "Menyusun makalah riset singkat dalam bahasa Arab fusha.",
      },
    ],
    note: "Pratinjau — level target C1 dan syarat di atas adalah data contoh.",
  },
};

function PathInfoDialog({
  info,
  onClose,
}: {
  info: PathInfoKey;
  onClose: () => void;
}) {
  const data = pathInfo[info];
  const [actionDone, setActionDone] = useState(false);
  const ToneIcon =
    data.tone === "locked"
      ? IconLock
      : data.tone === "good"
        ? IconBadgeCheck
        : IconBook;
  const badgeClass =
    data.tone === "locked"
      ? "bg-line/50 text-muted"
      : data.tone === "good"
        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
        : "bg-emerald-950 text-white dark:bg-emerald-900";

  return (
    <DialogShell
      labelledBy="path-info-title"
      onClose={onClose}
      header={
        <div className="min-w-0 space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
              <ToneIcon className="size-4" />
            </span>
            <h2 id="path-info-title" className="text-[16px] font-bold text-ink">
              {data.title}
            </h2>
            <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-bold", badgeClass)}>
              {data.badge}
            </span>
            <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              Pratinjau
            </span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
            {data.eyebrow}
          </p>
        </div>
      }
      footer={
        <>
          <p className="text-[10px] leading-4 text-muted">{data.note}</p>
          <div className="flex flex-wrap items-center gap-2">
            {data.action ? (
              <button
                type="button"
                onClick={() => setActionDone(true)}
                disabled={actionDone}
                className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-[11px] font-bold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60"
              >
                {actionDone ? (
                  <IconBadgeCheck className="size-3.5" />
                ) : (
                  <IconArrowRight className="size-3.5" />
                )}
                {actionDone ? "Tersimpan (Pratinjau)" : data.action}
              </button>
            ) : null}
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
      <p className="text-[12px] leading-5 text-muted">{data.intro}</p>
      {data.arabic ? (
        <p
          lang="ar"
          dir="rtl"
          className="mt-3 rounded-xl bg-paper p-3 font-arabic text-[16px] leading-loose text-brand"
        >
          {data.arabic}
        </p>
      ) : null}
      <div className="mt-4 flex flex-col gap-2">
        {data.items.map((item, index) => (
          <div
            key={`${item.label}-${index}`}
            className="flex gap-3 rounded-xl border border-line/70 bg-surface p-3"
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-[10px] font-bold text-brand dark:bg-emerald-900/40">
              {index + 1}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-ink">{item.label}</p>
              <p className="text-[10px] leading-4 text-muted">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </DialogShell>
  );
}
