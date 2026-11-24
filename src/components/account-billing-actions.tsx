"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  IconBadgeCheck,
  IconCalendar,
  IconCheck,
  IconDownload,
  IconFileText,
  IconReceipt,
  IconShieldCheck,
  IconWallet,
  IconX,
} from "./icons";

export type InvoiceDetail = {
  number: string;
  reference: string;
  date: string;
  packageName: string;
  description: string;
  method: string;
  total: string;
  status: "lunas" | "selesai";
  holder: string;
  santriId: string;
  voucher?: string;
  note: string;
};

export function AccountActionButton({
  label,
  notice,
  className,
  icon,
}: {
  label: string;
  notice: string;
  className?: string;
  icon?: ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <span className={cn("inline-flex flex-col gap-1", className)}>
      <button
        type="button"
        title="Pratinjau — aksi demo"
        onClick={() => setVisible(true)}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-line/70 bg-paper px-3 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
      >
        {icon}
        {label}
      </button>
      {visible ? (
        <span
          role="status"
          className="max-w-56 rounded bg-emerald-50 px-2 py-1 text-[10px] font-semibold leading-4 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
        >
          {notice}
        </span>
      ) : null}
    </span>
  );
}

function DetailField({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg bg-paper p-3">
      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md bg-surface text-brand">
        {icon}
      </span>
      <div className="min-w-0 space-y-0.5">
        <dt className="text-[9px] font-bold uppercase tracking-wider text-muted">
          {label}
        </dt>
        <dd className="break-words text-[11px] font-semibold leading-5 text-ink">
          {value}
        </dd>
      </div>
    </div>
  );
}

function InvoiceDetailDialog({
  detail,
  onClose,
}: {
  detail: InvoiceDetail;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const isPaid = detail.status === "lunas";

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
        aria-labelledby="invoice-detail-title"
        className="animate-flow-in relative my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-line/70 bg-paper shadow-2xl outline-none"
      >
        <header className="relative overflow-hidden bg-emerald-950 px-5 py-5 text-white sm:px-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-12 -top-16 size-56 rounded-full bg-emerald-400/20 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 left-1/3 size-48 rounded-full bg-sand-300/10 blur-2xl"
          />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sand-200 px-2.5 py-0.5 text-[10px] font-bold text-sand-900">
                <IconBadgeCheck className="size-3" />
                Data demo
              </span>
              <div>
                <h2 id="invoice-detail-title" className="text-[18px] font-bold">
                  Detail Faktur
                </h2>
                <p
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-[12px] font-semibold text-sand-200"
                >
                  «تَفْصِيلُ الفَاتُورَةِ»
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup detail faktur"
              className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <IconX className="size-4" />
            </button>
          </div>
        </header>

        <div className="max-h-[calc(100dvh-12rem)] overflow-y-auto p-5 sm:p-6">
          <section className="space-y-4 rounded-xl border border-line/70 bg-surface p-4">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line/70 pb-4">
              <div className="min-w-0 space-y-1">
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted">
                  Nomor Faktur
                </p>
                <p className="break-all font-mono text-[13px] font-bold text-ink">
                  {detail.number}
                </p>
                <p className="break-all text-[10px] text-muted">
                  Referensi: <span className="font-mono">{detail.reference}</span>
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-[22px] font-bold leading-tight text-ink">
                  {detail.total}
                </p>
                <span
                  className={cn(
                    "mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold",
                    isPaid
                      ? "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100"
                      : "bg-paper text-muted",
                  )}
                >
                  {isPaid ? <IconCheck className="size-3" /> : null}
                  {isPaid ? "Lunas (Contoh)" : "Selesai (Contoh)"}
                </span>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <DetailField
                icon={<IconCalendar className="size-3.5" />}
                label="Tanggal transaksi"
                value={detail.date}
              />
              <DetailField
                icon={<IconWallet className="size-3.5" />}
                label="Metode pembayaran"
                value={detail.method}
              />
              <DetailField
                icon={<IconReceipt className="size-3.5" />}
                label="Paket dan layanan"
                value={detail.packageName}
              />
              <DetailField
                icon={<IconBadgeCheck className="size-3.5" />}
                label="Pemegang faktur"
                value={detail.holder}
              />
            </dl>

            <div className="rounded-lg bg-paper p-3 text-[11px] leading-5 text-muted">
              <span className="font-bold text-ink">Deskripsi: </span>
              {detail.description}
            </div>

            {detail.voucher ? (
              <p className="rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-100">
                Voucher atau promo: {detail.voucher}
              </p>
            ) : null}
          </section>

          <section className="mt-4 space-y-2 rounded-xl border border-line/70 bg-paper p-4">
            <p className="flex items-center gap-2 text-[12px] font-bold text-ink">
              <IconShieldCheck className="size-4 text-brand" />
              Catatan pratinjau
            </p>
            <p className="text-[11px] leading-5 text-muted">{detail.note}</p>
            <p className="break-words font-mono text-[10px] text-muted">
              Santri ID: {detail.santriId} &bull; NPWP:
              01.992.834.1-012.000 (Contoh)
            </p>
          </section>

          {notice ? (
            <p
              role="status"
              className="mt-4 rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold leading-4 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
            >
              {notice}
            </p>
          ) : null}
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-2 border-t border-line/70 bg-surface px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line/70 bg-paper px-3 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={() =>
              setNotice(
                `Pratinjau — PDF faktur ${detail.number} tidak tersedia atau diunduh.`,
              )
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-paper px-3 py-2 text-[11px] font-semibold text-brand transition-colors hover:bg-line/30"
          >
            <IconDownload className="size-3.5" />
            Unduh PDF
          </button>
          <button
            type="button"
            onClick={() =>
              setNotice(`Pratinjau — kuitansi ${detail.number} tidak diterbitkan.`)
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-paper px-3 py-2 text-[11px] font-semibold text-muted transition-colors hover:bg-line/30 hover:text-ink"
          >
            <IconFileText className="size-3.5" />
            Kuitansi
          </button>
        </footer>
      </div>
    </div>
  );
}

export function BillingRowActions({
  invoice,
  kind,
  detail,
}: {
  invoice: string;
  kind: "invoice" | "trial";
  detail: InvoiceDetail;
}) {
  const [notice, setNotice] = useState<string | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  function openDetail() {
    setNotice(null);
    setDetailOpen(true);
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex flex-wrap justify-end gap-2">
        {kind === "invoice" ? (
          <>
            <button
              type="button"
              onClick={() =>
                setNotice(
                  `Pratinjau — PDF faktur ${invoice} tidak tersedia atau diunduh.`,
                )
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-paper px-3 py-1.5 text-[11px] font-semibold text-brand transition-colors hover:bg-line/30"
            >
              <IconDownload className="size-3.5" />
              Unduh PDF
            </button>
            <button
              type="button"
              onClick={() =>
                setNotice(`Pratinjau — kuitansi ${invoice} tidak diterbitkan.`)
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-paper px-3 py-1.5 text-[11px] font-medium text-muted transition-colors hover:bg-line/30 hover:text-ink"
            >
              <IconFileText className="size-3.5" />
              Kuitansi
            </button>
          </>
        ) : null}
        <button
          type="button"
          onClick={openDetail}
          className="rounded-lg border border-line/70 bg-paper px-3 py-1.5 text-[11px] font-semibold text-brand transition-colors hover:bg-line/30"
        >
          Detail
        </button>
      </div>
      {notice ? (
        <p
          role="status"
          className="max-w-64 text-right text-[10px] font-semibold leading-4 text-brand"
        >
          {notice}
        </p>
      ) : null}
      {detailOpen ? (
        <InvoiceDetailDialog
          detail={detail}
          onClose={() => setDetailOpen(false)}
        />
      ) : null}
    </div>
  );
}
