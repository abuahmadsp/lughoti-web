"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  IconBadgeCheck,
  IconBank,
  IconBell,
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconCreditCard,
  IconFileText,
  IconHourglass,
  IconMail,
  IconPremium,
  IconQrCode,
  IconReceipt,
  IconRefresh,
  IconSearch,
  IconTune,
  IconX,
} from "./icons";

type TabId = "all" | "vip" | "gateway" | "invoice";
type RowStatus = "success" | "pending";
type IconType = ComponentType<{ className?: string }>;

type TransactionRow = {
  invoice: string;
  time: string;
  initials: string;
  avatarClass: string;
  name: string;
  santriId: string;
  packageName: string;
  packageNote: string;
  packageValue: "vip_lifetime" | "pro_annual" | "scholar_batch" | "monthly";
  packageIcon: "star" | "badge" | null;
  method: string;
  methodValue: "gopay" | "bsi" | "qris" | "shopeepay" | "mandiri" | "card";
  methodDot: string;
  amount: string;
  status: RowStatus;
  needsReview: boolean;
};

type TransactionActionKind =
  | "gateway"
  | "receipt"
  | "invoice"
  | "reminder"
  | "email";

type TransactionAction = {
  kind: TransactionActionKind;
  row: TransactionRow;
};

const tabs: {
  id: TabId;
  label: string;
  icon: IconType;
  count: string | null;
}[] = [
  { id: "all", label: "Semua Transaksi Masuk", icon: IconReceipt, count: "1.842" },
  { id: "vip", label: "Member VIP & Lifetime", icon: IconPremium, count: "3.425" },
  { id: "gateway", label: "Metode Pembayaran & Gateway", icon: IconBank, count: null },
  {
    id: "invoice",
    label: "Faktur Pajak & Kuitansi Elektronik",
    icon: IconFileText,
    count: null,
  },
];

const rows: TransactionRow[] = [
  {
    invoice: "INV/2026/03/8921",
    time: "29 Mar 2026 • 14:22 WIB",
    initials: "FR",
    avatarClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    name: "Fathia Rahma",
    santriId: "LGT-2024-8841",
    packageName: "VIP Lifetime Upgrade",
    packageNote: "Akses Fusha + Talaqqi AI Selamanya",
    packageValue: "vip_lifetime",
    packageIcon: "star",
    method: "GoPay E-Wallet",
    methodValue: "gopay",
    methodDot: "bg-brand",
    amount: "Rp 1.499.000",
    status: "success",
    needsReview: false,
  },
  {
    invoice: "INV/2026/03/8920",
    time: "29 Mar 2026 • 13:58 WIB",
    initials: "AG",
    avatarClass: "bg-emerald-950 text-white dark:bg-emerald-800",
    name: "M. Al-Ghazali",
    santriId: "LGT-2023-4102",
    packageName: "Pro Annual (12 Bulan)",
    packageNote: "Shorof + Nahwu Praktis",
    packageValue: "pro_annual",
    packageIcon: null,
    method: "BSI Virtual Account",
    methodValue: "bsi",
    methodDot: "bg-brand",
    amount: "Rp 899.000",
    status: "success",
    needsReview: false,
  },
  {
    invoice: "INV/2026/03/8919",
    time: "29 Mar 2026 • 12:40 WIB",
    initials: "SN",
    avatarClass: "bg-sand-200 text-sand-900 dark:bg-sand-300/25 dark:text-sand-200",
    name: "Siti Nurhaliza",
    santriId: "LGT-2024-9112",
    packageName: "VIP Scholar Batch 4",
    packageNote: "Kurikulum Terpadu Saudi Dialect",
    packageValue: "scholar_batch",
    packageIcon: "badge",
    method: "QRIS Dinamis",
    methodValue: "qris",
    methodDot: "bg-brand",
    amount: "Rp 1.499.000",
    status: "success",
    needsReview: false,
  },
  {
    invoice: "INV/2026/03/8918",
    time: "29 Mar 2026 • 11:15 WIB",
    initials: "AF",
    avatarClass: "bg-line/60 text-muted",
    name: "Ahmad Fauzi",
    santriId: "LGT-2024-6104",
    packageName: "Paket Bulanan Intensif",
    packageNote: "Latihan Mufrodat Harian",
    packageValue: "monthly",
    packageIcon: null,
    method: "ShopeePay",
    methodValue: "shopeepay",
    methodDot: "bg-gold",
    amount: "Rp 149.000",
    status: "pending",
    needsReview: true,
  },
  {
    invoice: "INV/2026/03/8917",
    time: "29 Mar 2026 • 09:44 WIB",
    initials: "ZT",
    avatarClass: "bg-emerald-950 text-white dark:bg-emerald-800",
    name: "Zaid Bin Tsabit",
    santriId: "LGT-2023-7720",
    packageName: "Renewal Pro Annual",
    packageNote: "Perpanjangan Tahun ke-2",
    packageValue: "pro_annual",
    packageIcon: null,
    method: "Mandiri VA",
    methodValue: "mandiri",
    methodDot: "bg-brand",
    amount: "Rp 899.000",
    status: "success",
    needsReview: false,
  },
  {
    invoice: "INV/2026/03/8916",
    time: "29 Mar 2026 • 08:12 WIB",
    initials: "AR",
    avatarClass: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200",
    name: "Aisyah Rahmadani",
    santriId: "LGT-2024-1049",
    packageName: "VIP Scholar Complete",
    packageNote: "Sertifikasi & Talaqqi Mu'allim",
    packageValue: "scholar_batch",
    packageIcon: "badge",
    method: "Kartu Kredit Visa",
    methodValue: "card",
    methodDot: "bg-brand",
    amount: "Rp 1.499.000",
    status: "success",
    needsReview: false,
  },
];

const initialFilters = { query: "", status: "", package: "", method: "" };

function DemoToast({ message, onClose }: { message: string; onClose?: () => void }) {
  return (
    <div
      role="status"
      className="animate-flow-in fixed bottom-4 right-4 z-[80] flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border border-brand/30 bg-emerald-950 p-4 text-sand-50 shadow-xl sm:bottom-6 sm:right-6"
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-white">
        <IconCheck className="size-4" />
      </span>
      <p className="flex-1 text-[11px] font-semibold leading-5">{message}</p>
      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup notifikasi"
          className="rounded p-1 text-emerald-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          <IconX className="size-3.5" />
        </button>
      ) : null}
    </div>
  );
}

/** Demo-only action button used by the server-rendered header and rail. */
export function DemoActionButton({
  className,
  children,
  notice,
  title,
}: {
  className?: string;
  children: ReactNode;
  notice: string;
  title?: string;
}) {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [message]);

  return (
    <>
      <button type="button" title={title} onClick={() => setMessage(notice)} className={className}>
        {children}
      </button>
      {message ? <DemoToast message={message} onClose={() => setMessage(null)} /> : null}
    </>
  );
}

/** Period selector in the page header; changing it only raises a demo notice. */
export function DemoSelect({
  options,
  ariaLabel,
  notice,
}: {
  options: string[];
  ariaLabel: string;
  /** Demo notice text; `{value}` is replaced with the selected option. */
  notice: string;
}) {
  const [value, setValue] = useState(options[0]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!message) return;
    const timeout = window.setTimeout(() => setMessage(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [message]);

  return (
    <>
      <label className="inline-flex items-center gap-2 rounded-xl border border-line/70 bg-surface px-3 py-2.5 shadow-sm">
        <IconCalendar className="size-4 text-brand" />
        <span className="whitespace-nowrap text-[11px] font-semibold text-muted">Periode:</span>
        <select
          value={value}
          aria-label={ariaLabel}
          onChange={(event) => {
            setValue(event.target.value);
            setMessage(notice.replace("{value}", event.target.value));
          }}
          className="cursor-pointer bg-transparent text-[11px] font-bold text-ink focus:outline-none"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <IconChevronDown className="pointer-events-none size-3.5 text-muted" />
      </label>
      {message ? <DemoToast message={message} onClose={() => setMessage(null)} /> : null}
    </>
  );
}

function TabBar({ active, onChange }: { active: TabId; onChange: (id: TabId) => void }) {
  return (
    <div className="flex items-center gap-1 overflow-x-auto rounded-2xl border border-line/70 bg-paper p-1.5">
      {tabs.map((tab) => {
        const TabIcon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-[11px] font-semibold transition-colors",
              isActive
                ? "bg-surface text-ink shadow-sm dark:bg-emerald-950 dark:text-white"
                : "text-muted hover:bg-surface hover:text-ink",
            )}
          >
            <TabIcon className="size-4 shrink-0" />
            <span className="whitespace-nowrap">{tab.label}</span>
            {tab.count ? (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
                  isActive ? "bg-line/40 text-ink" : "bg-line/60 text-muted",
                )}
              >
                {tab.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function FilterBar({
  filters,
  onChange,
  onReset,
  onNotice,
}: {
  filters: typeof initialFilters;
  onChange: (next: typeof initialFilters) => void;
  onReset: () => void;
  onNotice: (message: string) => void;
}) {
  const selectClass =
    "cursor-pointer rounded-lg border border-line/70 bg-paper px-2.5 py-2 text-[10px] font-semibold text-ink focus:outline-none";

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-3 shadow-sm sm:p-4">
      <label className="relative flex items-center">
        <IconSearch className="pointer-events-none absolute left-3 size-4 text-muted" />
        <input
          value={filters.query}
          onChange={(event) => onChange({ ...filters, query: event.target.value })}
          type="search"
          aria-label="Cari faktur, santri, atau ID"
          placeholder="Cari No. Faktur (INV/2026/...), Nama Santri, ID (LGT-...), atau Rujukan..."
          className="w-full rounded-lg border border-line/70 bg-paper py-2 pl-9 pr-3 text-[11px] text-ink placeholder:text-muted focus:outline-none"
        />
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filters.status}
          aria-label="Filter status transaksi"
          onChange={(event) => onChange({ ...filters, status: event.target.value })}
          className={selectClass}
        >
          <option value="">Semua Status</option>
          <option value="success">Lunas / Berhasil</option>
          <option value="pending">Pending Settlement</option>
          <option value="failed">Gagal / Kadaluarsa</option>
          <option value="refund">Refund / Dibatalkan</option>
        </select>
        <select
          value={filters.package}
          aria-label="Filter paket langganan"
          onChange={(event) => onChange({ ...filters, package: event.target.value })}
          className={selectClass}
        >
          <option value="">Semua Paket</option>
          <option value="vip_lifetime">VIP Lifetime</option>
          <option value="pro_annual">Pro Annual</option>
          <option value="scholar_batch">VIP Scholar</option>
          <option value="monthly">Paket Bulanan</option>
        </select>
        <select
          value={filters.method}
          aria-label="Filter metode pembayaran"
          onChange={(event) => onChange({ ...filters, method: event.target.value })}
          className={selectClass}
        >
          <option value="">Metode Bayar</option>
          <option value="bsi">BSI VA Syariah</option>
          <option value="qris">QRIS Nasional</option>
          <option value="gopay">GoPay / ShopeePay</option>
          <option value="card">Kartu Kredit Visa/MC</option>
        </select>
        <button
          type="button"
          onClick={() => {
            onReset();
            onNotice("Pratinjau — filter contoh dikembalikan ke kondisi awal.");
          }}
          title="Reset filter"
          aria-label="Reset filter"
          className="grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-paper hover:text-ink"
        >
          <IconTune className="size-4" />
        </button>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: RowStatus }) {
  if (status === "success") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
        <IconBadgeCheck className="size-3.5" />
        Lunas
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sand-200 px-2 py-1 text-[10px] font-bold text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
      <IconHourglass className="size-3.5" />
      Pending
    </span>
  );
}

const actionMeta: Record<
  TransactionActionKind,
  { title: string; eyebrow: string; icon: IconType }
> = {
  gateway: {
    title: "Periksa Gateway",
    eyebrow: "Pemeriksaan status pembayaran (contoh)",
    icon: IconRefresh,
  },
  receipt: {
    title: "Lihat Kuitansi",
    eyebrow: "Kuitansi elektronik ilustratif",
    icon: IconReceipt,
  },
  invoice: {
    title: "Faktur PDF",
    eyebrow: "Pratinjau faktur, bukan berkas asli",
    icon: IconFileText,
  },
  reminder: {
    title: "Peringatan Pembayaran",
    eyebrow: "Simulasi pengingat, tidak dikirim",
    icon: IconBell,
  },
  email: {
    title: "Kirim Ulang Email",
    eyebrow: "Simulasi email, tidak dikirim",
    icon: IconMail,
  },
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

function demoEmail(row: TransactionRow) {
  return `${row.santriId.toLowerCase()}@contoh.lughati.id`;
}

function TransactionActionDialog({
  action,
  onClose,
}: {
  action: TransactionAction;
  onClose: () => void;
}) {
  const dialogRef = useDialogBehavior(onClose);
  const { row, kind } = action;
  const meta = actionMeta[kind];
  const MetaIcon = meta.icon;
  const [done, setDone] = useState(false);
  const [reminder, setReminder] = useState(
    `Assalamu'alaikum ${row.name}, pembayaran ${row.invoice} masih menunggu konfirmasi. Terima kasih.`,
  );

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
        aria-labelledby="transaction-action-title"
        aria-describedby="transaction-action-desc"
        className="animate-flow-in relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-line/70 bg-paper shadow-2xl outline-none"
      >
        <header className="flex items-start justify-between gap-4 border-b border-line/70 bg-surface px-5 py-4">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
                <MetaIcon className="size-4" />
              </span>
              <h2 id="transaction-action-title" className="text-[16px] font-bold text-ink">
                {meta.title}
              </h2>
              <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
                Pratinjau
              </span>
            </div>
            <p id="transaction-action-desc" className="text-[10px] leading-4 text-muted">
              {meta.eyebrow} &mdash; {row.invoice}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup aksi transaksi"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-line/70 text-muted transition-colors hover:bg-line/30 hover:text-ink"
          >
            <IconX className="size-4" />
          </button>
        </header>

        <div className="max-h-[calc(100dvh-13rem)] overflow-y-auto p-5">
          <div className="rounded-xl border border-line/70 bg-surface p-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[11px] font-bold text-ink">{row.invoice}</p>
                <p className="mt-0.5 text-[10px] text-muted">{row.time}</p>
              </div>
              <StatusBadge status={row.status} />
            </div>
            <div className="mt-3 grid gap-2 border-t border-line/70 pt-3 text-[11px] sm:grid-cols-2">
              <p className="text-muted">
                Santri: <span className="font-semibold text-ink">{row.name}</span> &bull;{" "}
                <span className="font-mono text-[10px]">{row.santriId}</span>
              </p>
              <p className="text-muted">
                Paket: <span className="font-semibold text-ink">{row.packageName}</span>
              </p>
              <p className="text-muted">
                Metode: <span className="font-semibold text-ink">{row.method}</span>
              </p>
              <p className="text-muted">
                Nominal: <span className="font-bold text-ink">{row.amount}</span>
              </p>
            </div>
          </div>

          {kind === "gateway" ? (
            <section className="mt-3 flex flex-col gap-2 rounded-xl border border-line/70 bg-paper p-4">
              <h3 className="text-[11px] font-bold text-ink">Hasil Pemeriksaan Contoh</h3>
              <div className="grid gap-2 text-[11px] text-muted sm:grid-cols-2">
                <p>
                  Gateway: <span className="font-semibold text-ink">{row.method}</span>
                </p>
                <p>
                  Rujukan: <span className="font-mono text-[10px]">DEMO-{row.invoice}</span>
                </p>
                <p>
                  Status: <span className="font-semibold text-sand-700 dark:text-sand-300">Pending settlement</span>
                </p>
                <p>
                  Perkiraan clear: <span className="font-semibold text-ink">H+1 (ilustrasi)</span>
                </p>
              </div>
              <p className="text-[10px] leading-4 text-muted">
                Tidak ada panggilan ke gateway sungguhan; angka dan status di atas hanya contoh.
              </p>
              <button
                type="button"
                onClick={() => setDone(true)}
                disabled={done}
                className={cn(
                  "mt-1 self-start rounded-lg px-3 py-2 text-[10px] font-bold transition-colors",
                  done
                    ? "cursor-default bg-emerald-50 text-brand dark:bg-emerald-900/20"
                    : "bg-emerald-950 text-white hover:bg-emerald-900 dark:bg-emerald-900",
                )}
              >
                {done ? "Diperiksa (Pratinjau)" : "Tandai Diperiksa (Demo)"}
              </button>
            </section>
          ) : null}

          {kind === "receipt" ? (
            <section className="mt-3 rounded-xl bg-emerald-950 p-4 text-sand-50 dark:bg-emerald-900">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">
                  Kuitansi Contoh
                </p>
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-[13px] text-sand-200"
                >
                  إيصال دفع
                </span>
              </div>
              <p className="mt-2 font-mono text-[11px] font-bold">{row.invoice}</p>
              <div className="mt-3 grid gap-2 border-t border-white/20 pt-3 text-[11px] sm:grid-cols-2">
                <p className="text-emerald-100">Diterima dari: {row.name}</p>
                <p className="text-emerald-100">Paket: {row.packageName}</p>
                <p className="text-emerald-100">Metode: {row.method}</p>
                <p className="font-bold text-sand-200">{row.amount}</p>
              </div>
              <p className="mt-3 text-[10px] leading-4 text-emerald-100/80">
                Kuitansi ini hanya tampilan demo. Tidak ada PDF, tanda tangan, atau dokumen asli.
              </p>
            </section>
          ) : null}

          {kind === "invoice" ? (
            <section className="mt-3 flex flex-col gap-2 rounded-xl border border-line/70 bg-paper p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-[11px] font-bold text-ink">Faktur Contoh</h3>
                <span className="rounded bg-surface px-2 py-0.5 font-mono text-[10px] text-muted">
                  {row.invoice}
                </span>
              </div>
              <div className="divide-y divide-line/70 rounded-lg bg-surface px-3">
                {[
                  ["Santri", row.name],
                  ["Paket", row.packageName],
                  ["Metode bayar", row.method],
                  ["Nominal", row.amount],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between gap-3 py-2 text-[11px]">
                    <span className="text-muted">{label}</span>
                    <span className="font-semibold text-ink">{value}</span>
                  </div>
                ))}
              </div>
              {row.status === "pending" ? (
                <p className="rounded-lg bg-sand-100 px-3 py-2 text-[10px] font-semibold text-sand-900 dark:bg-sand-300/15 dark:text-sand-100">
                  Faktur belum tersedia untuk status Pending. Hanya rincian transaksi yang dapat
                  dilihat.
                </p>
              ) : (
                <p className="text-[10px] leading-4 text-muted">
                  Pratinjau ini bukan berkas PDF dan tidak diunduh ke perangkat.
                </p>
              )}
              <button
                type="button"
                onClick={() => setDone(true)}
                disabled={done}
                className={cn(
                  "self-start rounded-lg px-3 py-2 text-[10px] font-bold transition-colors",
                  done
                    ? "cursor-default bg-emerald-50 text-brand dark:bg-emerald-900/20"
                    : "bg-emerald-950 text-white hover:bg-emerald-900 dark:bg-emerald-900",
                )}
              >
                {done ? "Pratinjau Ditampilkan" : "Unduh PDF (Pratinjau)"}
              </button>
            </section>
          ) : null}

          {kind === "reminder" ? (
            <section className="mt-3 flex flex-col gap-2 rounded-xl border border-line/70 bg-paper p-4">
              <label className="flex flex-col gap-1.5 text-[11px] font-bold text-ink">
                Isi pengingat (dapat diedit)
                <textarea
                  value={reminder}
                  onChange={(event) => setReminder(event.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-line/70 bg-surface px-3 py-2 text-[11px] font-normal leading-5 text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
                />
              </label>
              <p className="text-[10px] leading-4 text-muted">
                Penerima: {demoEmail(row)} &bull; pesan ini tidak dikirim atau disimpan.
              </p>
              <button
                type="button"
                onClick={() => setDone(true)}
                disabled={done}
                className={cn(
                  "self-start rounded-lg px-3 py-2 text-[10px] font-bold transition-colors",
                  done
                    ? "cursor-default bg-emerald-50 text-brand dark:bg-emerald-900/20"
                    : "bg-emerald-950 text-white hover:bg-emerald-900 dark:bg-emerald-900",
                )}
              >
                {done ? "Ditandai Terkirim (Pratinjau)" : "Tandai Terkirim (Demo)"}
              </button>
            </section>
          ) : null}

          {kind === "email" ? (
            <section className="mt-3 flex flex-col gap-2 rounded-xl border border-line/70 bg-paper p-4">
              <h3 className="text-[11px] font-bold text-ink">Email Contoh</h3>
              <div className="grid gap-2 text-[11px] text-muted sm:grid-cols-2">
                <p>
                  Penerima: <span className="font-semibold text-ink">{demoEmail(row)}</span>
                </p>
                <p>
                  Subjek: <span className="font-semibold text-ink">Faktur {row.invoice}</span>
                </p>
              </div>
              <p className="rounded-lg bg-surface px-3 py-2 text-[10px] leading-4 text-muted">
                Lampiran difokuskan sebagai pratinjau faktur {row.invoice}. Tidak ada email,
                lampiran, atau notifikasi yang benar-benar dikirim.
              </p>
              <button
                type="button"
                onClick={() => setDone(true)}
                disabled={done}
                className={cn(
                  "self-start rounded-lg px-3 py-2 text-[10px] font-bold transition-colors",
                  done
                    ? "cursor-default bg-emerald-50 text-brand dark:bg-emerald-900/20"
                    : "bg-emerald-950 text-white hover:bg-emerald-900 dark:bg-emerald-900",
                )}
              >
                {done ? "Terkirim (Pratinjau)" : "Kirim Ulang (Demo)"}
              </button>
            </section>
          ) : null}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 bg-surface px-5 py-4">
          <p className="text-[10px] leading-4 text-muted">
            Contoh — tidak ada transaksi, payout, email, atau berkas yang diproses.
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

function RowActions({
  row,
  onAction,
}: {
  row: TransactionRow;
  onAction: (action: TransactionAction) => void;
}) {
  const actionClass =
    "grid size-7 place-items-center rounded-lg text-muted transition-colors hover:bg-paper hover:text-ink";

  if (row.needsReview) {
    return (
      <div className="flex items-center justify-center gap-1">
        <button
          type="button"
          aria-label={`Periksa gateway ${row.invoice}`}
          title="Periksa gateway"
          onClick={() => onAction({ kind: "gateway", row })}
          className={actionClass}
        >
          <IconRefresh className="size-4" />
        </button>
        <button
          type="button"
          aria-label={`Unduh faktur ${row.invoice}`}
          title="Unduh faktur"
          onClick={() => onAction({ kind: "invoice", row })}
          className={actionClass}
        >
          <IconReceipt className="size-4" />
        </button>
        <button
          type="button"
          aria-label={`Ingatkan pembayaran ${row.invoice}`}
          title="Kirim peringatan bayar"
          onClick={() => onAction({ kind: "reminder", row })}
          className={actionClass}
        >
          <IconBell className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-1">
      <button
        type="button"
        aria-label={`Lihat kuitansi ${row.invoice}`}
        title="Lihat kuitansi"
        onClick={() => onAction({ kind: "receipt", row })}
        className={actionClass}
      >
        <IconReceipt className="size-4" />
      </button>
      <button
        type="button"
        aria-label={`Unduh faktur ${row.invoice}`}
        title="Unduh faktur PDF"
        onClick={() => onAction({ kind: "invoice", row })}
        className={actionClass}
      >
        <IconFileText className="size-4" />
      </button>
      <button
        type="button"
        aria-label={`Kirim ulang email ${row.invoice}`}
        title="Kirim ulang email"
        onClick={() => onAction({ kind: "email", row })}
        className={actionClass}
      >
        <IconMail className="size-4" />
      </button>
    </div>
  );
}

function TransactionTable({
  data,
  onNotice,
  onAction,
}: {
  data: TransactionRow[];
  onNotice: (message: string) => void;
  onAction: (action: TransactionAction) => void;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-line/70 bg-surface shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-left">
          <thead className="bg-paper text-[10px] uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3 font-semibold">No. Faktur &amp; Waktu</th>
              <th className="px-4 py-3 font-semibold">Santri &amp; ID</th>
              <th className="px-4 py-3 font-semibold">Paket Langganan</th>
              <th className="px-4 py-3 font-semibold">Metode Bayar</th>
              <th className="px-4 py-3 text-right font-semibold">Nominal</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/60 text-[11px] text-ink">
            {data.map((row) => (
              <tr key={row.invoice} className="transition-colors hover:bg-paper/70">
                <td className="px-4 py-3.5">
                  <div className="flex flex-col">
                    <span className="font-bold text-ink">{row.invoice}</span>
                    <span className="mt-0.5 text-[10px] text-muted">{row.time}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full text-[10px] font-bold",
                        row.avatarClass,
                      )}
                    >
                      {row.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[11px] font-bold text-ink">{row.name}</p>
                      <p className="truncate font-mono text-[10px] text-muted">{row.santriId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex flex-col">
                    <span className="flex items-center gap-1 font-bold text-ink">
                      {row.packageIcon === "star" ? (
                        <IconPremium className="size-3.5 text-gold" />
                      ) : row.packageIcon === "badge" ? (
                        <IconBadgeCheck className="size-3.5 text-gold" />
                      ) : null}
                      {row.packageName}
                    </span>
                    <span className="mt-0.5 text-[10px] text-muted">{row.packageNote}</span>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <span className={cn("size-2 rounded-full", row.methodDot)} />
                    {row.method}
                  </span>
                </td>
                <td className="px-4 py-3.5 text-right font-bold text-ink">{row.amount}</td>
                <td className="px-4 py-3.5 text-center">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-4 py-3.5">
                  <RowActions row={row} onAction={onAction} />
                </td>
              </tr>
            ))}
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-[12px] text-muted">
                  Tidak ada transaksi contoh yang cocok dengan filter ini.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <footer className="flex flex-col gap-3 border-t border-line/70 bg-surface p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <p className="text-[10px] text-muted">
          Menampilkan <span className="font-bold text-ink">{data.length}</span> dari{" "}
          <span className="font-bold text-ink">1.842</span> transaksi terverifikasi (
          <span className="font-bold text-brand">contoh</span>)
        </p>
        <div className="flex flex-wrap items-center gap-1">
          <button
            type="button"
            disabled
            aria-label="Halaman sebelumnya"
            className="inline-flex items-center gap-1 rounded-lg bg-paper px-2.5 py-1.5 text-[10px] font-bold text-muted opacity-50"
          >
            <IconChevronLeft className="size-3.5" />
            Sebelumnya
          </button>
          {["1", "2", "3"].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onNotice(`Pratinjau — halaman ${page} tidak tersedia dalam demo.`)}
              className={cn(
                "grid size-8 place-items-center rounded-lg text-[10px] font-bold transition-colors",
                page === "1"
                  ? "bg-emerald-950 text-white dark:bg-emerald-900"
                  : "bg-paper text-ink hover:bg-line/30",
              )}
            >
              {page}
            </button>
          ))}
          <span className="px-1.5 text-muted">…</span>
          <button
            type="button"
            onClick={() => onNotice("Pratinjau — halaman 307 tidak tersedia dalam demo.")}
            className="grid size-8 place-items-center rounded-lg bg-paper text-[10px] font-bold text-ink transition-colors hover:bg-line/30"
          >
            307
          </button>
          <button
            type="button"
            onClick={() => onNotice("Pratinjau — halaman berikutnya tidak tersedia dalam demo.")}
            className="inline-flex items-center gap-1 rounded-lg bg-paper px-2.5 py-1.5 text-[10px] font-bold text-ink transition-colors hover:bg-line/30"
          >
            Berikutnya
            <IconChevronRight className="size-3.5" />
          </button>
        </div>
      </footer>
    </section>
  );
}

const gatewayPanels: {
  title: string;
  note: string;
  icon: IconType;
  iconClass: string;
}[] = [
  {
    title: "Midtrans Gateway",
    note: "Auto-settle H+1, status payout hanya ilustrasi.",
    icon: IconBank,
    iconClass: "text-brand",
  },
  {
    title: "QRIS & E-Wallet",
    note: "QRIS Dinamis, GoPay, dan ShopeePay tampil sebagai contoh.",
    icon: IconQrCode,
    iconClass: "text-brand",
  },
  {
    title: "Kartu & VA Syariah",
    note: "Visa/MC dan BSI Virtual Account tidak terhubung ke gateway nyata.",
    icon: IconCreditCard,
    iconClass: "text-gold",
  },
];

function AlternatePanel({ tab, onNotice }: { tab: TabId; onNotice: (message: string) => void }) {
  if (tab === "gateway") {
    return (
      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line/70 pb-3">
          <div className="flex items-center gap-2">
            <IconBank className="size-5 text-brand" />
            <h2 className="text-[14px] font-bold text-ink">Kanal Pembayaran &amp; Gateway</h2>
          </div>
          <span className="rounded-full bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
            Data demo
          </span>
        </header>
        <div className="grid gap-3 sm:grid-cols-3">
          {gatewayPanels.map((panel) => {
            const PanelIcon = panel.icon;
            return (
              <article key={panel.title} className="flex flex-col gap-2 rounded-xl bg-paper p-3">
                <PanelIcon className={cn("size-5", panel.iconClass)} />
                <h3 className="text-[11px] font-bold text-ink">{panel.title}</h3>
                <p className="text-[10px] leading-4 text-muted">{panel.note}</p>
                <button
                  type="button"
                  onClick={() => onNotice("Pratinjau — rincian gateway hanya tersedia sebagai contoh.")}
                  className="mt-auto self-start text-[10px] font-bold text-brand hover:underline"
                >
                  Lihat rincian
                </button>
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <header className="flex flex-wrap items-center justify-between gap-2 border-b border-line/70 pb-3">
        <div className="flex items-center gap-2">
          <IconFileText className="size-5 text-brand" />
          <h2 className="text-[14px] font-bold text-ink">Faktur Pajak &amp; Kuitansi Elektronik</h2>
        </div>
        <span className="rounded-full bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
          Pratinjau
        </span>
      </header>
      {[
        "Nomor faktur, tanggal, dan nominal pada tabel adalah data contoh.",
        "Kuitansi PDF tidak dibuat; tombol unduh hanya menampilkan notifikasi demo.",
        "Integrasi e-Faktur dan pengiriman email tidak terhubung ke layanan apa pun.",
      ].map((text) => (
        <div key={text} className="flex items-start gap-2 rounded-xl bg-paper p-3">
          <IconCheck className="mt-0.5 size-3.5 shrink-0 text-brand" />
          <p className="text-[11px] leading-4 text-muted">{text}</p>
        </div>
      ))}
    </section>
  );
}

export function TransactionWorkspace({
  featured,
  rail,
}: {
  featured: ReactNode;
  rail: ReactNode;
}) {
  const [active, setActive] = useState<TabId>("all");
  const [filters, setFilters] = useState(initialFilters);
  const [notice, setNotice] = useState<string | null>(null);
  const [action, setAction] = useState<TransactionAction | null>(null);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const showTable = active === "all" || active === "vip";

  const visible = useMemo(
    () =>
      rows.filter((row) => {
        if (active === "vip" && !["vip_lifetime", "scholar_batch"].includes(row.packageValue)) {
          return false;
        }
        const query = filters.query.trim().toLowerCase();
        if (
          query &&
          !`${row.invoice} ${row.name} ${row.santriId} ${row.packageName}`
            .toLowerCase()
            .includes(query)
        ) {
          return false;
        }
        if (filters.status && row.status !== filters.status) return false;
        if (filters.package && row.packageValue !== filters.package) return false;
        if (filters.method === "gopay") {
          if (!["gopay", "shopeepay"].includes(row.methodValue)) return false;
        } else if (filters.method && row.methodValue !== filters.method) {
          return false;
        }
        return true;
      }),
    [active, filters],
  );

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-12">
        <div className="flex flex-col gap-4 xl:col-span-8">
          <TabBar active={active} onChange={setActive} />
          {showTable ? (
            <>
              <FilterBar
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(initialFilters)}
                onNotice={setNotice}
              />
              <TransactionTable
                data={visible}
                onNotice={setNotice}
                onAction={setAction}
              />
            </>
          ) : (
            <AlternatePanel tab={active} onNotice={setNotice} />
          )}
          {featured}
        </div>
        <aside aria-label="Rekonsiliasi dan log keuangan" className="xl:col-span-4">
          {rail}
        </aside>
      </div>
      {action ? (
        <TransactionActionDialog
          action={action}
          onClose={() => setAction(null)}
        />
      ) : null}
      {notice ? <DemoToast message={notice} onClose={() => setNotice(null)} /> : null}
    </>
  );
}
