"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  IconBadgeCheck,
  IconBank,
  IconChat,
  IconCheck,
  IconCopy,
  IconCreditCard,
  IconCurrencyExchange,
  IconLock,
  IconQrCode,
  IconRefresh,
  IconShieldCheck,
  IconTag,
  IconTimer,
  IconWallet,
  IconZap,
} from "./icons";

type Method = "qris" | "va" | "cc" | "saudi";
type Bank = "bca" | "bsi" | "mandiri" | "bni";

const vaNumbers: Record<Bank, string> = {
  bca: "1234 5678 9012 3456",
  bsi: "9882 1029 3847 2819",
  mandiri: "8890 1122 3344 5566",
  bni: "7788 9900 1122 3344",
};

const bankLabels: Record<Bank, string> = {
  bca: "BCA VA",
  bsi: "BSI VA",
  mandiri: "Mandiri VA",
  bni: "BNI VA",
};

const methods: {
  key: Method;
  label: string;
  description: string;
  badge: string;
  icon: typeof IconQrCode;
}[] = [
  {
    key: "qris",
    label: "QRIS & E-Wallet Nasional",
    description:
      "Contoh alur pindai QRIS untuk m-Banking dan dompet digital berstandar BI.",
    badge: "Paling Cepat",
    icon: IconQrCode,
  },
  {
    key: "va",
    label: "Virtual Account Bank",
    description:
      "Contoh nomor Virtual Account untuk ATM, internet banking, dan m-Banking.",
    badge: "Semua Bank",
    icon: IconBank,
  },
  {
    key: "cc",
    label: "Kartu Kredit / Debit",
    description:
      "Contoh formulir Visa, MasterCard, atau JCB dengan 3D Secure.",
    badge: "3D Secure",
    icon: IconCreditCard,
  },
  {
    key: "saudi",
    label: "Jemaah Umrah & Diaspora Saudi",
    description:
      "Contoh metode Mada, Apple Pay, dan STC Pay dengan estimasi SAR.",
    badge: "KSA",
    icon: IconWallet,
  },
];

function QrMock({ amount }: { amount: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-white p-3 shadow-md">
      <div className="relative size-40 overflow-hidden rounded-lg bg-white p-2">
        <svg
          viewBox="0 0 100 100"
          fill="currentColor"
          className="size-full text-emerald-950"
          aria-hidden="true"
        >
          <rect x="5" y="5" width="26" height="26" />
          <rect x="9" y="9" width="18" height="18" fill="white" />
          <rect x="13" y="13" width="10" height="10" />
          <rect x="69" y="5" width="26" height="26" />
          <rect x="73" y="9" width="18" height="18" fill="white" />
          <rect x="77" y="13" width="10" height="10" />
          <rect x="5" y="69" width="26" height="26" />
          <rect x="9" y="73" width="18" height="18" fill="white" />
          <rect x="13" y="77" width="10" height="10" />
          <rect x="36" y="8" width="6" height="6" />
          <rect x="46" y="14" width="6" height="6" />
          <rect x="56" y="6" width="6" height="6" />
          <rect x="38" y="24" width="12" height="6" />
          <rect x="10" y="38" width="8" height="8" />
          <rect x="22" y="44" width="6" height="14" />
          <rect x="34" y="36" width="16" height="6" />
          <rect x="42" y="46" width="12" height="12" />
          <rect x="60" y="36" width="8" height="8" />
          <rect x="74" y="40" width="18" height="6" />
          <rect x="64" y="52" width="6" height="14" />
          <rect x="78" y="56" width="14" height="6" />
          <rect x="36" y="66" width="6" height="14" />
          <rect x="46" y="66" width="16" height="6" />
          <rect x="48" y="78" width="6" height="14" />
          <rect x="60" y="74" width="14" height="6" />
          <rect x="78" y="72" width="14" height="18" />
        </svg>
        <span
          lang="ar"
          dir="rtl"
          className="absolute inset-0 m-auto grid size-8 place-items-center rounded-full bg-brand font-arabic text-[14px] font-bold text-white shadow-md"
        >
          ل
        </span>
      </div>
      <span className="mt-2 text-[9px] font-semibold uppercase tracking-wider text-emerald-950">
        NMID: ID102039201928 (contoh)
      </span>
      <span className="mt-1 text-[10px] font-bold text-emerald-900">
        {amount}
      </span>
    </div>
  );
}

export function CheckoutWorkspace({
  accountCard,
  assurances,
  plan,
  onSuccess,
}: {
  accountCard: ReactNode;
  assurances: ReactNode;
  plan: string;
  onSuccess: () => void;
}) {
  const [method, setMethod] = useState<Method>("qris");
  const [bank, setBank] = useState<Bank>("bsi");
  const [secondsLeft, setSecondsLeft] = useState(14 * 60 + 52);
  const [vaCopied, setVaCopied] = useState(false);
  const [promoApplied, setPromoApplied] = useState(true);
  const [promoInput, setPromoInput] = useState("");
  const [terms, setTerms] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!vaCopied) return;
    const id = window.setTimeout(() => setVaCopied(false), 2500);
    return () => window.clearTimeout(id);
  }, [vaCopied]);

  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  const timerLabel = `${minutes}:${seconds}`;

  const totalLabel = promoApplied ? "Rp 250.000" : "Rp 300.000";
  const monthlyLabel = promoApplied
    ? "≈ Rp 20.833 / bln"
    : "≈ Rp 25.000 / bln";
  const savingsLabel = promoApplied
    ? "Hemat contoh Rp 338.000 untuk akses setahun penuh."
    : "Hemat contoh Rp 288.000 untuk akses setahun penuh.";

  async function copyVa() {
    try {
      await navigator.clipboard.writeText(
        vaNumbers[bank].replace(/\s+/g, ""),
      );
      setVaCopied(true);
      setNotice("Nomor contoh tersalin — nomor ini tidak dapat digunakan.");
    } catch {
      setNotice("Pratinjau — fitur salin tidak tersedia di demo ini.");
    }
  }

  function applyPromo() {
    if (!promoInput.trim()) {
      setNotice("Masukkan kode contoh terlebih dahulu.");
      return;
    }
    setNotice("Pratinjau — kode promo tidak diverifikasi atau disimpan.");
  }

  function pay() {
    if (!terms) {
      setNotice("Centang persetujuan contoh untuk melanjutkan pratinjau.");
      return;
    }
    setNotice(null);
    onSuccess();
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line/70 bg-paper px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="relative flex size-2.5" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-sand-500 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-sand-600" />
          </span>
          <span className="text-[11px] font-semibold text-ink">
            Penawaran contoh:
          </span>
          <span className="font-mono text-[12px] font-bold tracking-wide text-sand-800">
            {timerLabel}
          </span>
          <span className="text-[10px] text-muted">(timer pratinjau)</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-right">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-brand">
            Bilingual Track Checkout
          </span>
          <span className="text-line" aria-hidden="true">
            •
          </span>
          <span
            lang="ar"
            dir="rtl"
            className="font-arabic text-[13px] font-bold text-ink"
          >
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        <section className="flex flex-col gap-5 lg:col-span-8">
          {accountCard}

          <div className="flex flex-col gap-5 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="flex items-center gap-2 text-[17px] font-bold text-ink">
                  <IconCreditCard className="size-5 text-brand" />
                  Metode Pembayaran (Contoh)
                </h2>
                <p className="mt-1 text-[12px] leading-5 text-muted">
                  Pilihan di bawah hanya mengubah tampilan. Tidak ada gateway,
                  rekening, atau kartu yang diproses.
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                Pratinjau
              </span>
            </div>

            <div
              role="radiogroup"
              aria-label="Pilih metode pembayaran contoh"
              className="flex flex-col gap-3"
            >
              {methods.map((option) => {
                const Icon = option.icon;
                const active = method === option.key;
                return (
                  <div
                    key={option.key}
                    className={cn(
                      "rounded-xl border p-4 transition-colors",
                      active
                        ? "border-brand bg-emerald-50/60 dark:bg-emerald-900/20"
                        : "border-line/70 bg-paper",
                    )}
                  >
                    <label className="flex cursor-pointer items-start justify-between gap-3">
                      <span className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="payment_method"
                          value={option.key}
                          checked={active}
                          onChange={() => setMethod(option.key)}
                          className="mt-0.5 size-4 shrink-0 accent-emerald-900"
                        />
                        <span className="flex flex-col">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="text-[14px] font-bold text-ink">
                              {option.label}
                            </span>
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100">
                              {option.badge}
                            </span>
                          </span>
                          <span className="mt-1 text-[11px] leading-5 text-muted">
                            {option.description}
                          </span>
                        </span>
                      </span>
                      <Icon
                        className={cn(
                          "size-5 shrink-0",
                          active ? "text-brand" : "text-muted",
                        )}
                      />
                    </label>

                    {active ? (
                      <div className="mt-4 border-t border-line/60 pt-4">
                        {option.key === "qris" ? (
                          <div className="flex flex-col gap-5 rounded-xl bg-surface p-4 sm:flex-row sm:items-center">
                            <QrMock amount={totalLabel} />
                            <div className="flex flex-1 flex-col gap-2">
                              <p className="flex items-center gap-2 text-[12px] font-bold text-ink">
                                <IconQrCode className="size-4 text-brand" />
                                Instruksi scan (contoh)
                              </p>
                              <ol className="list-inside list-decimal space-y-1 text-[11px] leading-5 text-muted">
                                <li>Buka m-Banking atau e-wallet pilihan Anda.</li>
                                <li>Pilih menu Pindai / Scan QRIS.</li>
                                <li>Arahkan kamera ke QR di samping.</li>
                                <li>
                                  Nama merchant contoh:{" "}
                                  <strong className="text-ink">
                                    LUGHATI ACADEMY ID
                                  </strong>
                                  .
                                </li>
                                <li>
                                  Nominal {totalLabel} akan tampil sebagai contoh.
                                </li>
                              </ol>
                              <p className="flex items-center gap-1.5 pt-1 text-[10px] text-sand-800">
                                <IconTimer className="size-3.5" />
                                QR contoh berlaku {timerLabel} pada pratinjau ini.
                              </p>
                            </div>
                          </div>
                        ) : null}

                        {option.key === "va" ? (
                          <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
                            <p className="text-[12px] font-bold text-ink">
                              Pilih bank Virtual Account contoh:
                            </p>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                              {(Object.keys(bankLabels) as Bank[]).map((key) => (
                                <button
                                  key={key}
                                  type="button"
                                  onClick={() => setBank(key)}
                                  aria-pressed={bank === key}
                                  className={cn(
                                    "rounded-lg border p-3 text-left transition-colors",
                                    bank === key
                                      ? "border-emerald-900 bg-emerald-950 text-white shadow-sm dark:border-emerald-400 dark:bg-emerald-800"
                                      : "border-line/70 bg-paper text-ink hover:bg-line/30",
                                  )}
                                >
                                  <span className="block text-[11px] font-bold">
                                    {bankLabels[key]}
                                  </span>
                                  <span className="mt-0.5 block text-[9px] opacity-80">
                                    {key === "bsi" ? "Syariah (contoh)" : "Contoh"}
                                  </span>
                                </button>
                              ))}
                            </div>
                            <div className="flex flex-col gap-2 rounded-xl bg-paper p-4 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-[10px] text-muted">
                                  Nomor {bankLabels[bank]} contoh
                                </p>
                                <p className="mt-1 font-mono text-[15px] font-bold tracking-wider text-ink">
                                  {vaNumbers[bank]}
                                </p>
                                <p className="mt-1 text-[10px] text-muted">
                                  Atas nama: Lughati — Fathia Rahma (demo)
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={copyVa}
                                className="flex shrink-0 items-center gap-1.5 rounded-lg border border-line/80 bg-surface px-3 py-2 text-[11px] font-bold text-brand transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                              >
                                <IconCopy className="size-3.5" />
                                {vaCopied ? "Tersalin" : "Salin Nomor"}
                              </button>
                            </div>
                            <p className="text-[10px] text-muted">
                              Nomor di atas adalah contoh dan tidak terhubung ke
                              bank mana pun.
                            </p>
                          </div>
                        ) : null}

                        {option.key === "cc" ? (
                          <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
                            <div className="flex flex-col gap-1.5">
                              <label
                                htmlFor="checkout-card-number"
                                className="text-[11px] font-semibold text-ink"
                              >
                                Nomor Kartu (contoh)
                              </label>
                              <div className="flex items-center rounded-xl border border-line/70 bg-paper px-3">
                                <IconCreditCard className="size-4 text-muted" />
                                <input
                                  id="checkout-card-number"
                                  type="text"
                                  inputMode="numeric"
                                  autoComplete="off"
                                  placeholder="4111 2222 3333 4444"
                                  className="w-full bg-transparent px-3 py-2.5 text-[12px] text-ink placeholder:text-muted/70 focus:outline-none"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                              <div className="flex flex-col gap-1.5">
                                <label
                                  htmlFor="checkout-card-expiry"
                                  className="text-[11px] font-semibold text-ink"
                                >
                                  Masa Berlaku (MM/YY)
                                </label>
                                <input
                                  id="checkout-card-expiry"
                                  type="text"
                                  inputMode="numeric"
                                  autoComplete="off"
                                  placeholder="12/28"
                                  className="rounded-xl border border-line/70 bg-paper px-3 py-2.5 text-[12px] text-ink placeholder:text-muted/70 focus:outline-none"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label
                                  htmlFor="checkout-card-cvv"
                                  className="text-[11px] font-semibold text-ink"
                                >
                                  CVV / Security Code
                                </label>
                                <input
                                  id="checkout-card-cvv"
                                  type="password"
                                  inputMode="numeric"
                                  autoComplete="off"
                                  maxLength={4}
                                  placeholder="•••"
                                  className="rounded-xl border border-line/70 bg-paper px-3 py-2.5 text-[12px] text-ink placeholder:text-muted/70 focus:outline-none"
                                />
                              </div>
                            </div>
                            <p className="text-[10px] text-sand-800">
                              Jangan masukkan data kartu sungguhan — kolom ini
                              tidak dikirim atau disimpan.
                            </p>
                          </div>
                        ) : null}

                        {option.key === "saudi" ? (
                          <div className="flex flex-col gap-4 rounded-xl bg-surface p-4">
                            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-paper p-3">
                              <span className="flex items-center gap-2 text-[11px] font-semibold text-ink">
                                <IconCurrencyExchange className="size-4 text-brand" />
                                Estimasi konversi (contoh)
                              </span>
                              <span className="text-[12px] font-bold text-ink">
                                ≈ SAR 59,50
                              </span>
                            </div>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                              {[
                                { label: "Mada Card", arabic: "مدى", icon: IconWallet },
                                { label: "Apple Pay", arabic: null, icon: IconZap },
                                { label: "STC Pay (KSA)", arabic: null, icon: IconChat },
                              ].map((item) => {
                                const ItemIcon = item.icon;
                                return (
                                  <button
                                    key={item.label}
                                    type="button"
                                    onClick={() =>
                                      setNotice(
                                        `Pratinjau — ${item.label} belum terhubung.`,
                                      )
                                    }
                                    className="flex items-center justify-center gap-2 rounded-xl border border-line/70 bg-paper px-3 py-3 text-[11px] font-semibold text-ink transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
                                  >
                                    {item.arabic ? (
                                      <span
                                        lang="ar"
                                        dir="rtl"
                                        className="font-arabic text-[15px] font-bold text-brand"
                                      >
                                        {item.arabic}
                                      </span>
                                    ) : (
                                      <ItemIcon className="size-4 text-brand" />
                                    )}
                                    {item.label}
                                  </button>
                                );
                              })}
                            </div>
                            <p className="text-[10px] text-muted">
                              Konversi dan metode Saudi di atas hanya ilustrasi;
                              tidak ada transaksi KSA yang diproses.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="flex items-center gap-2 text-[17px] font-bold text-ink">
                <IconTag className="size-5 text-sand-700 dark:text-sand-300" />
                Voucher &amp; Kode Promo (Contoh)
              </h2>
              <span className="text-[10px] font-semibold text-brand">
                Tidak memproses diskon nyata
              </span>
            </div>

            {promoApplied ? (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-emerald-50 p-3.5 dark:bg-emerald-900/20">
                <div className="flex items-center gap-3">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand text-white">
                    <IconCheck className="size-4" />
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[12px] font-bold text-ink">
                        FUSHAHPRO35
                      </span>
                      <span className="rounded bg-brand px-1.5 py-0.5 text-[9px] font-bold text-white">
                        CONTOH
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] leading-4 text-muted">
                      Kupon contoh: bonus akses 2 bulan &amp; potongan Rp 50.000.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setPromoApplied(false);
                    setNotice("Kupon contoh dilepas dari ringkasan.");
                  }}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-bold text-brand transition-colors hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                >
                  <IconRefresh className="size-3.5" />
                  Ganti Kode
                </button>
              </div>
            ) : (
              <p className="rounded-xl bg-paper p-3.5 text-[11px] text-muted">
                Belum ada kupon contoh yang diterapkan.
              </p>
            )}

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={promoInput}
                onChange={(event) => setPromoInput(event.target.value)}
                placeholder="Masukkan kode afiliasi contoh"
                aria-label="Kode promo contoh"
                className="min-w-0 flex-1 rounded-xl border border-line/70 bg-paper px-3 py-3 font-mono text-[12px] uppercase text-ink placeholder:normal-case placeholder:text-muted/70 focus:outline-none"
              />
              <button
                type="button"
                onClick={applyPromo}
                className="shrink-0 rounded-xl bg-line/40 px-5 py-3 text-[12px] font-semibold text-ink transition-colors hover:bg-line/70"
              >
                Gunakan
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-emerald-50 text-brand dark:bg-emerald-900/30">
                <IconShieldCheck className="size-6" />
              </span>
              <div>
                <h3 className="text-[15px] font-bold text-ink">
                  Garansi 7 Hari (Contoh Kebijakan)
                </h3>
                <p className="mt-1 text-[11px] leading-5 text-muted">
                  Ilustrasi kebijakan pengembalian dana. Tidak ada pembayaran
                  yang ditahan atau dikembalikan pada demo ini.
                </p>
              </div>
            </div>
            <p
              lang="ar"
              dir="rtl"
              className="shrink-0 text-center font-arabic text-[13px] font-bold leading-tight text-brand"
            >
              ضَمَانُ اسْتِرْجَاعِ المَبْلَغِ
            </p>
          </div>
        </section>

        <aside className="flex flex-col gap-5 lg:col-span-4 lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-line/70 bg-surface shadow-md">
            <div className="flex flex-col gap-2 bg-emerald-950 p-5 text-white dark:bg-emerald-900">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-sand-200 px-2.5 py-0.5 text-[10px] font-bold tracking-tight text-sand-900">
                  PAKET PILIHAN UTAMA
                </span>
                <span className="rounded-full border border-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-100">
                  Data demo
                </span>
              </div>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-[17px] font-bold">{plan}</h3>
                <span className="text-[10px] font-semibold text-emerald-200">
                  12 bulan
                </span>
              </div>
              <p
                lang="ar"
                dir="rtl"
                className="font-arabic text-[15px] leading-tight text-emerald-200"
              >
                الفصحى المعاصرة وَ اللهجة السعودية
              </p>
              <p className="text-[11px] text-emerald-100">
                Modern Standard Arabic + Amiyah Saudi (Najdi &amp; Hijazi)
              </p>
            </div>

            <div className="flex flex-col gap-3 border-b border-line/60 bg-paper p-5">
              <p className="text-[11px] font-bold text-ink">
                Fitur contoh yang tercantum:
              </p>
              {[
                "Nahwu, Sharaf, & Balaghah (A1–B2)",
                "500+ dialog situasional Saudi",
                "Kuota audio penutur asli tanpa batas",
                "Spaced Repetition + root word engine",
                "Sertifikat digital dengan ID (contoh)",
              ].map((item) => (
                <p
                  key={item}
                  className="flex items-start gap-2 text-[11px] leading-5 text-muted"
                >
                  <IconBadgeCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                  {item}
                </p>
              ))}
            </div>

            <div className="flex flex-col gap-3 bg-surface p-5">
              <div className="flex items-center justify-between gap-2 text-[11px] text-muted">
                <span>Harga normal (12 bulan)</span>
                <span className="line-through">Rp 588.000</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-[11px] text-brand">
                <span>Diskon tahunan contoh (−49%)</span>
                <span className="font-bold">−Rp 288.000</span>
              </div>
              {promoApplied ? (
                <div className="flex items-center justify-between gap-2 text-[11px] text-sand-800">
                  <span className="font-mono">FUSHAHPRO35</span>
                  <span className="font-bold">−Rp 50.000</span>
                </div>
              ) : null}
              <div className="flex items-center justify-between gap-2 text-[11px] text-muted">
                <span>Biaya gateway &amp; sertifikat</span>
                <span className="font-semibold text-brand">Gratis (Rp 0)</span>
              </div>
              <div className="flex items-center justify-between gap-2 text-[11px] text-muted">
                <span>PPN 11%</span>
                <span>Termasuk (Rp 0)</span>
              </div>

              <div
                aria-live="polite"
                className="mt-1 flex flex-col gap-1 rounded-xl bg-paper p-4"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                  Total pembayaran (contoh)
                </span>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[24px] font-bold leading-none text-ink">
                    {totalLabel}
                  </span>
                  <span className="text-[10px] font-semibold text-brand">
                    {monthlyLabel}
                  </span>
                </div>
                <span className="text-[10px] text-muted">{savingsLabel}</span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <input
                  id="checkout-terms"
                  type="checkbox"
                  checked={terms}
                  onChange={(event) => setTerms(event.target.checked)}
                  className="mt-0.5 size-4 shrink-0 accent-emerald-900"
                />
                <label
                  htmlFor="checkout-terms"
                  className="text-[11px] leading-5 text-muted"
                >
                  Saya menyetujui{" "}
                  <button
                    type="button"
                    onClick={() =>
                      setNotice(
                        "Pratinjau — Ketentuan Layanan belum tersedia.",
                      )
                    }
                    className="font-semibold text-brand underline underline-offset-2"
                  >
                    contoh Ketentuan Layanan
                  </button>{" "}
                  dan memahami bahwa ini bukan transaksi nyata.
                </label>
              </div>

              <button
                type="button"
                onClick={pay}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-950 px-4 py-3.5 text-[13px] font-bold text-white shadow-lg transition-colors hover:bg-emerald-900 dark:bg-emerald-800 dark:hover:bg-emerald-700"
              >
                <IconLock className="size-4" />
                Bayar &amp; Buka Akses (Pratinjau)
              </button>
              {notice ? (
                <p
                  role="status"
                  className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-[10px] font-semibold leading-4 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
                >
                  {notice}
                </p>
              ) : null}
              <p className="text-center text-[10px] leading-4 text-muted">
                Tombol ini hanya mengganti isi modal dengan pratinjau sukses.
                Tidak ada pembayaran, kwitansi, sertifikat, atau akses premium
                yang dibuat dari demo ini.
              </p>
            </div>
          </div>

          {assurances}
        </aside>
      </div>
    </div>
  );
}
