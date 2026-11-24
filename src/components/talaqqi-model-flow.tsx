"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { IconCheck, IconChevronRight, IconTune, IconX } from "./icons";

export type TalaqqiModelId = "v42" | "v41" | "whisper3";

export type ModelProfile = {
  id: TalaqqiModelId;
  optionLabel: string;
  shortLabel: string;
  version: string;
  engine: string;
  accuracy: string;
  latency: string;
  sessions: string;
  sessionsDelta: string;
  sessionsPrev: string;
  accuracyStatus: string;
  accuracyNote: string;
  makhraj: string;
  clusterLoad: string;
  samples: string;
  pipelineBadge: string;
  note: string;
  tracks: "all" | "fushah";
};

const modelProfiles: Record<TalaqqiModelId, ModelProfile> = {
  v42: {
    id: "v42",
    optionLabel: "v4.2 — Neural Dual-Engine (Fushah + Amiyah)",
    shortLabel: "Talaqqi ASR v4.2 Neural",
    version: "v4.2.3",
    engine: "Talaqqi ASR Neural Engine",
    accuracy: "94,8%",
    latency: "138",
    sessions: "48.920",
    sessionsDelta: "+18,4%",
    sessionsPrev: "41,3K",
    accuracyStatus: "Mumtaz",
    accuracyNote: "+0,6% pasca model v4,2 (Contoh)",
    makhraj: "14,2%",
    clusterLoad: "42%",
    samples: "312.490 fonem (Contoh)",
    pipelineBadge: "Dual Pipeline",
    note: "Dual-engine Fushah dan Amiyah Hijazi/Najdi. Seluruh angka adalah data contoh.",
    tracks: "all",
  },
  v41: {
    id: "v41",
    optionLabel: "v4.1 — Legacy (Fushah Al-Turats Only)",
    shortLabel: "Talaqqi ASR v4.1 Legacy",
    version: "v4.1.9",
    engine: "Talaqqi ASR Legacy Engine",
    accuracy: "91,3%",
    latency: "96",
    sessions: "12.470",
    sessionsDelta: "+2,1%",
    sessionsPrev: "12,2K",
    accuracyStatus: "Jayyid Jiddan",
    accuracyNote: "Korpus Fushah Turats tanpa dialek (Contoh)",
    makhraj: "18,6%",
    clusterLoad: "18%",
    samples: "86.120 fonem (Contoh)",
    pipelineBadge: "Fushah Only",
    note: "Hanya mendukung Fushah Al-Turats; evaluasi Amiyah disembunyikan pada pratinjau ini.",
    tracks: "fushah",
  },
  whisper3: {
    id: "whisper3",
    optionLabel: "v3.0-rc4 — Whisper-Arabic (Research Preview)",
    shortLabel: "Whisper-Arabic Fine-Tuned v3",
    version: "v3.0-rc4",
    engine: "Whisper-Arabic Fine-Tuned",
    accuracy: "89,7%",
    latency: "284",
    sessions: "3.180",
    sessionsDelta: "+41,2%",
    sessionsPrev: "2,3K",
    accuracyStatus: "Jayyid",
    accuracyNote: "Eksperimen riset, belum produksi (Contoh)",
    makhraj: "22,9%",
    clusterLoad: "67%",
    samples: "41.830 fonem (Contoh)",
    pipelineBadge: "Research Preview",
    note: "Mode riset — hasil eksperimen, bukan engine produksi dan tanpa audio sungguhan.",
    tracks: "all",
  },
};

const modelOrder: TalaqqiModelId[] = ["v42", "v41", "whisper3"];

type ModelContextValue = {
  model: TalaqqiModelId;
  profile: ModelProfile;
  setModel: (id: TalaqqiModelId) => void;
};

const TalaqqiModelContext = createContext<ModelContextValue | null>(null);

export function useTalaqqiModel() {
  const value = useContext(TalaqqiModelContext);
  if (!value) {
    throw new Error(
      "Modul model Talaqqi harus dipakai di dalam TalaqqiModelProvider",
    );
  }
  return value;
}

/** Session-only model selection; no model is loaded and nothing is persisted. */
export function TalaqqiModelProvider({ children }: { children: ReactNode }) {
  const [model, setModelState] = useState<TalaqqiModelId>("v42");
  const [toast, setToast] = useState<string | null>(null);

  const setModel = useCallback((id: TalaqqiModelId) => {
    setModelState(id);
    setToast(
      `Pratinjau — ${modelProfiles[id].shortLabel} dipilih. ${modelProfiles[id].note}`,
    );
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  return (
    <TalaqqiModelContext.Provider
      value={{ model, profile: modelProfiles[model], setModel }}
    >
      {children}
      {toast ? (
        <ModelToast message={toast} onClose={() => setToast(null)} />
      ) : null}
    </TalaqqiModelContext.Provider>
  );
}

export type ModelSlot = Exclude<
  keyof ModelProfile,
  "id" | "optionLabel" | "tracks"
>;

/** Client leaf so server-rendered panels can show model-dependent demo figures. */
export function ModelText({
  slot,
  className,
}: {
  slot: ModelSlot;
  className?: string;
}) {
  const { profile } = useTalaqqiModel();
  return <span className={className}>{profile[slot]}</span>;
}

export function ModelVersionBadge() {
  const { profile } = useTalaqqiModel();
  return (
    <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
      {profile.version} (Pratinjau)
    </span>
  );
}

/** Replaces the old track switch: choosing a version changes all demo figures. */
export function ModelPipelineSelect() {
  const { model, setModel } = useTalaqqiModel();
  return (
    <label className="inline-flex items-center gap-2 rounded-xl border border-line/70 bg-paper px-3 py-2 shadow-sm">
      <IconTune className="size-4 shrink-0 text-brand" />
      <span className="hidden text-[10px] font-semibold uppercase tracking-wider text-muted lg:inline">
        Model Pipeline:
      </span>
      <select
        value={model}
        aria-label="Pilih versi model pipeline Talaqqi"
        onChange={(event) => setModel(event.target.value as TalaqqiModelId)}
        className="max-w-[16rem] cursor-pointer bg-transparent text-[11px] font-semibold text-ink focus:outline-none"
      >
        {modelOrder.map((id) => (
          <option key={id} value={id}>
            {modelProfiles[id].optionLabel}
          </option>
        ))}
      </select>
      <IconChevronRight className="pointer-events-none size-3.5 shrink-0 rotate-90 text-muted" />
    </label>
  );
}

export type DemoDialect = {
  label: string;
  value: string;
  width: string;
  bar: string;
  note: string;
  trackValue: "fushah" | "amiyah";
};

/** Fushah-only profiles hide Amiyah rows from the demo comparison panel. */
export function ModelDialectRows({ dialects }: { dialects: DemoDialect[] }) {
  const { profile } = useTalaqqiModel();
  const rows =
    profile.tracks === "fushah"
      ? dialects.filter((dialect) => dialect.trackValue === "fushah")
      : dialects;

  return (
    <>
      {rows.map((dialect) => (
        <div key={dialect.label} className="flex flex-col gap-1.5 rounded-xl bg-paper p-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-ink">{dialect.label}</span>
            <span className="text-[11px] font-bold text-brand">{dialect.value}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-line/50">
            <div
              className={cn("h-full rounded-full", dialect.bar)}
              style={{ width: dialect.width }}
            />
          </div>
          <p className="text-[9px] text-muted">{dialect.note}</p>
        </div>
      ))}
      {profile.tracks === "fushah" ? (
        <p className="text-[9px] leading-4 text-muted">
          Pipeline Fushah Only tidak menampilkan dialek Amiyah pada data contoh ini.
        </p>
      ) : null}
    </>
  );
}

function ModelToast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div
      role="status"
      className="animate-flow-in fixed bottom-4 right-4 z-[90] flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border border-brand/30 bg-emerald-950 p-4 text-sand-50 shadow-xl sm:bottom-6 sm:right-6"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-white">
        <IconCheck className="size-4" />
      </span>
      <p className="flex-1 text-[11px] font-semibold leading-5">{message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup notifikasi model"
        className="rounded p-1 text-emerald-100 transition-colors hover:bg-white/10 hover:text-white"
      >
        <IconX className="size-3.5" />
      </button>
    </div>
  );
}
