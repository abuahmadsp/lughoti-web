"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  IconBank,
  IconCheck,
  IconHourglass,
  IconReceipt,
  IconShieldCheck,
  IconX,
} from "./icons";

type ReviewKind = "va" | "sengketa";
type ReviewFilter = "all" | ReviewKind;

type ReviewItem = {
  id: string;
  invoice: string;
  name: string;
  santriId: string;
  kind: ReviewKind;
  method: string;
  amount: string;
  time: string;
  detail: string;
  suggested: string;
};

const reviewItems: ReviewItem[] = [
  {
    id: "rv-1",
    invoice: "INV/2026/03/8920",
    name: "M. Al-Ghazali",
    santriId: "LGT-2023-4102",
    kind: "va",
    method: "BSI Virtual Account",
    amount: "Rp 899.000",
    time: "Hari ini • 13:58 WIB",
    detail:
      "Pembayaran VA sudah masuk di rekening contoh, tetapi webhook gateway belum mengubah status faktur.",
    suggested: "Cocokkan nominal dan tandai konfirmasi manual dalam pratinjau.",
  },
  {
    id: "rv-2",
    invoice: "INV/2026/03/8917",
    name: "Zaid Bin Tsabit",
    santriId: "LGT-2023-7720",
    kind: "va",
    method: "Mandiri VA",
    amount: "Rp 899.000",
    time: "Hari ini • 09:44 WIB",
    detail:
      "Settlement H+1 tertunda pada simulasi rekonsiliasi. Status tampilan masih Lunas.",
    suggested: "Periksa rujukan demo dan tandai selesai jika tidak ada selisih.",
  },
  {
    id: "rv-3",
    invoice: "INV/2026/03/8915",
    name: "Nabila Fitriani",
    santriId: "LGT-2024-7788",
    kind: "va",
    method: "BSI Virtual Account",
    amount: "Rp 149.000",
    time: "Kemarin • 18:20 WIB",
    detail:
      "Terdapat selisih nominal Rp 10.000 antara tagihan dan pembayaran contoh.",
    suggested: "Tandai perlu klarifikasi; tidak ada dana yang benar-benar dikembalikan.",
  },
  {
    id: "rv-4",
    invoice: "INV/2026/03/8919",
    name: "Siti Nurhaliza",
    santriId: "LGT-2024-9112",
    kind: "sengketa",
    method: "QRIS Dinamis",
    amount: "Rp 1.499.000",
    time: "Hari ini • 12:40 WIB",
    detail:
      "Santri mengklaim sudah membayar dan mengunggah bukti QRIS contoh pada tiket CS.",
    suggested: "Tinjau bukti ilustratif dan tandai selesai hanya di tampilan demo.",
  },
  {
    id: "rv-5",
    invoice: "INV/2026/03/8916",
    name: "Aisyah Rahmadani",
    santriId: "LGT-2024-1049",
    kind: "sengketa",
    method: "Kartu Kredit Visa",
    amount: "Rp 1.499.000",
    time: "Hari ini • 08:12 WIB",
    detail:
      "Permintaan refund sebagian untuk paket VIP Scholar Complete masuk dalam antrean contoh.",
    suggested: "Catat keputusan pratinjau; tidak ada refund atau tagihan yang diproses.",
  },
];

const filterLabels: Record<ReviewFilter, string> = {
  all: "Semua (5)",
  va: "Verifikasi VA (3)",
  sengketa: "Sengketa (2)",
};

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

function ReviewDialog({ onClose }: { onClose: () => void }) {
  const dialogRef = useDialogBehavior(onClose);
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const [selectedId, setSelectedId] = useState(reviewItems[0].id);
  const [completed, setCompleted] = useState<string[]>([]);

  const visible = useMemo(
    () =>
      filter === "all"
        ? reviewItems
        : reviewItems.filter((item) => item.kind === filter),
    [filter],
  );

  const selected =
    visible.find((item) => item.id === selectedId) ?? visible[0] ?? null;

  function changeFilter(next: ReviewFilter) {
    setFilter(next);
    const nextItems =
      next === "all"
        ? reviewItems
        : reviewItems.filter((item) => item.kind === next);
    if (nextItems.length > 0) setSelectedId(nextItems[0].id);
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
        aria-labelledby="review-dialog-title"
        aria-describedby="review-dialog-desc"
        className="animate-flow-in relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-line/70 bg-paper shadow-2xl outline-none"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line/70 bg-surface px-5 py-4">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-sand-200 text-gold dark:bg-sand-300/20">
                <IconHourglass className="size-4" />
              </span>
              <h2 id="review-dialog-title" className="text-[16px] font-bold text-ink">
                Antrean Tinjauan CS
              </h2>
              <span className="rounded-full bg-sand-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-sand-900 dark:bg-sand-300/15 dark:text-sand-100">
                5 Antrean
              </span>
              <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
                Data demo
              </span>
            </div>
            <p id="review-dialog-desc" className="text-[10px] leading-4 text-muted">
              Contoh kasus Pending dan Refund. Pilih kasus untuk melihat rincian; tidak ada
              status transaksi, refund, atau tiket yang diubah sungguhan.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup antrean tinjauan"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-line/70 text-muted transition-colors hover:bg-line/30 hover:text-ink"
          >
            <IconX className="size-4" />
          </button>
        </header>

        <div className="max-h-[calc(100dvh-13rem)] overflow-y-auto p-5">
          <div className="flex flex-wrap items-center gap-1.5">
            {(Object.keys(filterLabels) as ReviewFilter[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => changeFilter(key)}
                aria-pressed={filter === key}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[10px] font-bold transition-colors",
                  filter === key
                    ? "bg-emerald-950 text-white dark:bg-emerald-900"
                    : "bg-paper text-ink hover:bg-line/40",
                )}
              >
                {filterLabels[key]}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-2" aria-label="Daftar kasus tinjauan">
              {visible.map((item) => {
                const isSelected = selected?.id === item.id;
                const isDone = completed.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "flex flex-col gap-1 rounded-xl border p-3 text-left transition-colors",
                      isSelected
                        ? "border-brand/40 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-line/70 bg-surface hover:bg-paper",
                    )}
                  >
                    <span className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-ink">{item.name}</span>
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[9px] font-bold",
                          item.kind === "va"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                            : "bg-sand-200 text-sand-900 dark:bg-sand-300/20 dark:text-sand-100",
                        )}
                      >
                        {item.kind === "va" ? "Verifikasi VA" : "Sengketa"}
                      </span>
                    </span>
                    <span className="block font-mono text-[10px] text-muted">
                      {item.invoice}
                    </span>
                    <span className="block text-[10px] text-muted">
                      {item.method} &bull; {item.amount}
                    </span>
                    {isDone ? (
                      <span className="mt-0.5 inline-flex w-fit items-center gap-1 rounded bg-brand/10 px-1.5 py-0.5 text-[9px] font-bold text-brand">
                        <IconCheck className="size-3" />
                        Selesai (Pratinjau)
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            {selected ? (
              <section className="flex flex-col gap-3 rounded-xl border border-line/70 bg-surface p-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="text-[12px] font-bold text-ink">{selected.name}</h3>
                    <p className="font-mono text-[10px] text-muted">
                      {selected.santriId} &bull; {selected.invoice}
                    </p>
                  </div>
                  <span className="shrink-0 rounded bg-paper px-2 py-1 text-[9px] font-bold text-muted">
                    {selected.time}
                  </span>
                </div>

                <div className="grid gap-2 rounded-lg bg-paper p-3 text-[10px] text-muted sm:grid-cols-2">
                  <p className="flex items-center gap-1.5">
                    {selected.kind === "va" ? (
                      <IconBank className="size-3.5 shrink-0 text-brand" />
                    ) : (
                      <IconShieldCheck className="size-3.5 shrink-0 text-brand" />
                    )}
                    {selected.method}
                  </p>
                  <p className="flex items-center gap-1.5 font-semibold text-ink">
                    <IconReceipt className="size-3.5 shrink-0 text-brand" />
                    {selected.amount}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Ringkasan kasus
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-ink">
                    {selected.detail}
                  </p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
                    Langkah disarankan
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-muted">
                    {selected.suggested}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCompleted((current) =>
                      current.includes(selected.id)
                        ? current
                        : [...current, selected.id],
                    )
                  }
                  disabled={completed.includes(selected.id)}
                  className={cn(
                    "self-start rounded-lg px-3 py-2 text-[10px] font-bold transition-colors",
                    completed.includes(selected.id)
                      ? "cursor-default bg-emerald-50 text-brand dark:bg-emerald-900/20"
                      : "bg-emerald-950 text-white hover:bg-emerald-900 dark:bg-emerald-900",
                  )}
                >
                  {completed.includes(selected.id)
                    ? "Selesai (Pratinjau)"
                    : "Tandai Selesai (Demo)"}
                </button>
              </section>
            ) : (
              <p className="rounded-xl border border-dashed border-line/70 p-4 text-[11px] text-muted">
                Tidak ada kasus pada filter ini.
              </p>
            )}
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 bg-surface px-5 py-4">
          <p className="text-[10px] leading-4 text-muted">
            Contoh — peninjauan hanya mengubah label di modal ini dan tidak menulis data apa pun.
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

/** Active CS review link for the Pending / Refund metric card. */
export function TransactionReviewLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        title="Buka contoh antrean tinjauan CS"
        className={className}
      >
        {children}
      </button>
      {open ? <ReviewDialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}
