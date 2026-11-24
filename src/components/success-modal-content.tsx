"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { SuccessOnboarding, DownloadLink } from "./success-onboarding";
import { SuccessReceiptActions } from "./success-receipt-actions";
import { SuccessSupportCard } from "./success-support-card";
import {
  IconAward,
  IconBadgeCheck,
  IconBook,
  IconCards,
  IconCheck,
  IconChevronRight,
  IconHeadphones,
  IconPremium,
  IconUsers,
} from "./icons";

const steps = [
  { kicker: "Langkah 1/3", title: "Pilih Paket Pro Tahunan" },
  { kicker: "Langkah 2/3", title: "Metode Pembayaran & Data" },
  {
    kicker: "Langkah 3/3 (Selesai)",
    title: "Akses Pro Aktif & Onboarding",
  },
] as const;

const entitlements = [
  {
    icon: IconHeadphones,
    label: "Unlimited",
    title: "Audio Streaming & Download",
    description:
      "Contoh akses tanpa kuota 200 menit ke rekaman penutur asli Saudi dan Mesir.",
  },
  {
    icon: IconBook,
    label: "Terbuka 100%",
    title: "Kurikulum Dual-Track",
    description:
      "Contoh akses Fushah A1–B2 dan dialog Amiyah Riyadh serta Jeddah.",
  },
  {
    icon: IconCards,
    label: "Tanpa Batas",
    title: "Flashcard Algoritma SRS",
    description:
      "Ilustrasi metode SuperMemo-2 adaptif dengan akar kata dan tashkeel otomatis.",
  },
  {
    icon: IconAward,
    label: "Contoh",
    title: "Kredensial Sertifikat Digital",
    description:
      "Ilustrasi sertifikat per level dengan kode verifikasi; tidak ada sertifikat yang diterbitkan.",
  },
] as const;

function Stepper() {
  return (
    <section
      aria-label="Progres checkout"
      className="rounded-2xl border border-line/70 bg-surface p-4 shadow-sm"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {steps.map((step, index) => {
          const active = index === steps.length - 1;
          const done = index < steps.length - 1;
          return (
            <div key={step.kicker} className="contents">
              <div
                aria-current={active ? "step" : undefined}
                className={cn(
                  "flex flex-1 items-center gap-3",
                  !active && "opacity-70",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full",
                    done
                      ? "bg-brand text-white"
                      : "bg-sand-300 text-sand-950 shadow-md dark:bg-sand-500",
                  )}
                >
                  {done ? (
                    <IconCheck className="size-4" />
                  ) : (
                    <IconBadgeCheck className="size-4" />
                  )}
                </span>
                <span className="flex min-w-0 flex-col">
                  <span
                    className={cn(
                      "text-[9px] font-bold uppercase tracking-wider",
                      active ? "text-brand" : "text-muted",
                    )}
                  >
                    {step.kicker}
                  </span>
                  <span
                    className={cn(
                      "truncate text-[11px]",
                      active ? "font-bold text-ink" : "font-semibold text-muted",
                    )}
                  >
                    {step.title}
                  </span>
                </span>
              </div>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="hidden h-0.5 w-12 shrink-0 bg-brand md:block"
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SuccessHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-emerald-950 p-5 text-white shadow-md sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 size-80 rounded-full bg-emerald-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 -top-12 size-72 rounded-full bg-sand-300/10 blur-2xl"
      />
      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1.5 text-[10px] font-bold text-emerald-950">
            <IconBadgeCheck className="size-3.5" />
            Pembayaran terverifikasi otomatis (contoh)
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-100">
              Data demo
            </span>
            <div className="flex flex-wrap gap-2 text-[10px] text-emerald-100">
              <span className="rounded-lg bg-white/10 px-2.5 py-1 font-mono">
                Ref: LGH-TRX-20261110-8842
              </span>
              <span className="rounded-lg bg-white/10 px-2.5 py-1">
                QRIS &amp; E-Wallet
              </span>
              <span className="rounded-lg bg-white/10 px-2.5 py-1">
                10 Nov 2026, 14:32 WIB
              </span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic text-[24px] font-bold leading-snug text-sand-200 sm:text-[28px]"
          >
            «مَبْرُوك! تَمَّ تَفْعِيلُ العُضْوِيَّةِ المُمَيَّزَةِ بِنَجَاح»
          </p>
          <p className="mt-1 text-[10px] italic tracking-wide text-emerald-200">
            Mabrūk! Tamma Tafʿīlul-ʿUdhwiyyatil-Mumayyazah bi-Najāḥ
          </p>
        </div>

        <div className="flex max-w-4xl flex-col gap-2">
          <h2 className="text-balance text-[26px] font-bold leading-tight tracking-tight sm:text-[32px]">
            Alhamdulillah, Pembayaran Berhasil! Selamat Datang di Lughati Pro
            Learner
          </h2>
          <p className="text-[12px] leading-6 text-emerald-100">
            Contoh aktivasi akses 12 bulan ke materi Fushah A1–B2, 500+ dialog
            Amiyah Saudi, audio penutur asli, dan algoritma SRS untuk akun{" "}
            <strong className="font-semibold text-sand-200">
              fathia.rahma@example.com
            </strong>
            . Tidak ada akun, langganan, atau hak akses sungguhan yang dibuat.
          </p>
        </div>
      </div>
    </section>
  );
}

function EntitlementGrid() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-[16px] font-bold text-ink">
          <IconPremium className="size-5 text-brand" />
          Status Hak Akses Pro (Contoh)
        </h3>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100">
          4 fitur diilustrasikan
        </span>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {entitlements.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex flex-col gap-2 rounded-lg border border-line/60 bg-paper p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-surface text-brand shadow-sm">
                  <Icon className="size-4" />
                </span>
                <span className="text-[10px] font-bold text-brand">
                  {item.label}
                </span>
              </div>
              <h4 className="text-[11px] font-bold text-ink">{item.title}</h4>
              <p className="text-[10px] leading-5 text-muted">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ReceiptCard() {
  return (
    <section className="relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-5 top-5 -rotate-12 select-none rounded border-2 border-brand/60 bg-emerald-50 px-3 py-1 text-center dark:bg-emerald-900/30"
      >
        <span className="block text-[9px] font-bold uppercase tracking-widest text-brand">
          Lunas / Paid
        </span>
        <span
          lang="ar"
          dir="rtl"
          className="block font-arabic text-[14px] font-bold leading-tight text-brand"
        >
          مَدْفُوع
        </span>
      </div>

      <div className="flex flex-col gap-1 pr-24">
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
          Tanda terima contoh
        </p>
        <h3 className="text-[16px] font-bold text-ink">Faktur Langganan Pro</h3>
        <p className="text-[10px] font-semibold text-brand">
          No. INV/2026/LGH/11/9021
        </p>
      </div>

      <div className="h-px w-full bg-line/60" />

      <div className="grid grid-cols-1 gap-3 text-[10px] sm:grid-cols-2">
        <div>
          <span className="block text-muted">Diterbitkan untuk</span>
          <span className="mt-0.5 block font-semibold text-ink">
            Fathia Rahma
          </span>
          <span className="block break-all text-muted">
            fathia.rahma@example.com
          </span>
        </div>
        <div>
          <span className="block text-muted">Periode contoh</span>
          <span className="mt-0.5 block font-semibold text-ink">
            10 Nov 2026 – 10 Nov 2027
          </span>
          <span className="block text-brand">12 bulan penuh</span>
        </div>
      </div>

      <div className="h-px w-full bg-line/60" />

      <div className="flex flex-col gap-2 text-[11px]">
        <div className="flex items-center justify-between gap-2 text-ink">
          <span>Paket Lughati Pro (12 bulan)</span>
          <span>Rp 588.000</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-brand">
          <span>Diskon tahunan contoh (−49%)</span>
          <span className="font-bold">−Rp 288.000</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-brand">
          <span className="font-mono">Kupon FUSHAHPRO35</span>
          <span className="font-bold">−Rp 50.000</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-muted">
          <span>Biaya layanan &amp; gateway</span>
          <span className="font-semibold text-brand">Rp 0 (gratis)</span>
        </div>
        <div className="flex items-center justify-between gap-2 text-muted">
          <span>PPN 11%</span>
          <span>Termasuk</span>
        </div>
      </div>

      <div className="h-px w-full bg-line/60" />

      <div className="flex items-center justify-between gap-2 rounded-lg bg-paper p-3">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted">
            Total dibayarkan (contoh)
          </span>
          <span className="text-[9px] text-muted">Lunas via QRIS contoh</span>
        </div>
        <span className="text-[20px] font-bold leading-none text-ink">
          Rp 250.000
        </span>
      </div>

      <SuccessReceiptActions />
    </section>
  );
}

function CommunityCard() {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-sand-100 text-sand-900 dark:bg-sand-800 dark:text-sand-100">
          <IconUsers className="size-5" />
        </span>
        <div className="flex flex-col">
          <h3 className="text-[12px] font-bold text-ink">
            Komunitas Santri Pro Learner (Contoh)
          </h3>
          <p className="text-[10px] text-muted">
            Grup eksklusif Telegram &amp; WhatsApp — ilustrasi
          </p>
        </div>
      </div>
      <p className="text-[11px] leading-5 text-muted">
        Contoh komunitas 3.400+ peserta dengan sesi tanya-jawab nahwu dan
        praktik percakapan. Angka dan grup ini tidak nyata serta tidak
        mengarah ke undangan sungguhan.
      </p>
      <button
        type="button"
        title="Pratinjau — forum komunitas belum tersedia"
        className="w-full rounded-lg bg-paper py-2.5 px-4 text-[11px] font-bold text-brand transition-colors hover:bg-line/30"
      >
        Gabung Forum Diskusi Pro (Pratinjau)
      </button>
    </section>
  );
}

export function SuccessModalContent({ onClose }: { onClose: () => void }) {
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-5">
      <Stepper />
      <SuccessHero />

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12">
        <div className="flex flex-col gap-5 lg:col-span-7">
          <EntitlementGrid />
          <SuccessOnboarding
            downloads={
              <div className="flex flex-col gap-3 sm:flex-row">
                <DownloadLink
                  title="Kamus Mini Mufrodat A1 (Contoh)"
                  meta="PDF • 4,2 MB • pratinjau"
                  icon="pdf"
                  onClick={() =>
                    setDownloadNotice(
                      "Pratinjau — berkas PDF tidak tersedia atau diunduh.",
                    )
                  }
                />
                <DownloadLink
                  title="Audio Percakapan Riyadh (Contoh)"
                  meta="MP3 ZIP • 18 berkas • pratinjau"
                  icon="audio"
                  onClick={() =>
                    setDownloadNotice(
                      "Pratinjau — berkas MP3 tidak tersedia atau diunduh.",
                    )
                  }
                />
              </div>
            }
            primaryCta={
              <Link
                href="/dashboard"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-950 px-4 text-[12px] font-bold text-white shadow-md transition-colors hover:bg-emerald-900 sm:w-auto sm:flex-1 dark:bg-emerald-800 dark:hover:bg-emerald-700"
              >
                Masuk ke Dashboard Pembelajaran (Demo)
                <IconChevronRight className="size-4" />
              </Link>
            }
            secondaryCta={
              <Link
                href="/dashboard/percakapan-dan-dialog"
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-line/80 bg-paper px-5 text-[12px] font-semibold text-ink transition-colors hover:bg-line/30 sm:w-auto"
              >
                Mulai Dialog Amiyah Pertama
              </Link>
            }
          />
          {downloadNotice ? (
            <p
              role="status"
              className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-[10px] font-semibold leading-4 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
            >
              {downloadNotice}
            </p>
          ) : null}
        </div>

        <aside className="flex flex-col gap-5 lg:col-span-5">
          <ReceiptCard />
          <CommunityCard />
          <SuccessSupportCard />
        </aside>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-line/60 pt-4">
        <p className="text-center text-[10px] leading-5 text-muted">
          Modal ini adalah pratinjau alur sukses pembayaran. Status Pro, nomor
          transaksi, faktur, kuota, sertifikat, komunitas, jaminan, dukungan, dan
          unduhan semuanya contoh. Tidak ada pembayaran, verifikasi, akun
          premium, atau hak akses yang dibuat.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-line/80 bg-paper px-4 py-2 text-[11px] font-bold text-brand transition-colors hover:bg-line/30"
        >
          Tutup Pratinjau
        </button>
      </div>
    </div>
  );
}
