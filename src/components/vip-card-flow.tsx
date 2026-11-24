"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  IconAward,
  IconBadgeCheck,
  IconCheck,
  IconCopy,
  IconDownload,
  IconEye,
  IconPremium,
  IconQrCode,
  IconShieldCheck,
  IconWallet,
  IconX,
} from "./icons";

export function VipCardOpenButton({
  className,
  children,
  title = "Pratinjau — membuka kartu anggota VIP digital",
}: {
  className?: string;
  children: ReactNode;
  title?: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  function openDialog() {
    setToastOpen(false);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
  }

  function showDownloadToast() {
    setDialogOpen(false);
    setToastOpen(true);
  }

  return (
    <>
      <button
        type="button"
        title={title}
        onClick={openDialog}
        className={className}
      >
        {children}
      </button>
      {dialogOpen ? (
        <VipCardDialog onClose={closeDialog} onDownload={showDownloadToast} />
      ) : null}
      {toastOpen ? (
        <VipCardToast onClose={() => setToastOpen(false)} />
      ) : null}
    </>
  );
}

function VipCardDialog({
  onClose,
  onDownload,
}: {
  onClose: () => void;
  onDownload: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [notice, setNotice] = useState<string | null>(null);

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
        aria-labelledby="vip-card-title"
        className="animate-flow-in relative my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-line/70 bg-paper shadow-2xl outline-none"
      >
        <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto">
          <div className="space-y-5 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
                    <IconAward className="size-4" />
                  </span>
                  <h2 id="vip-card-title" className="text-[18px] font-bold text-ink">
                    Kartu Anggota VIP Digital
                  </h2>
                  <span className="rounded-full border border-line/70 bg-surface px-2 py-0.5 text-[10px] font-bold text-muted">
                    Contoh
                  </span>
                </div>
                <p
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-[12px] font-semibold text-brand"
                >
                  «بِطَاقَةُ عُضْوِيَّةِ كِبَارِ الشَّخْصِيَّاتِ (VIP)»
                </p>
                <p className="pt-1 text-[11px] leading-5 text-muted">
                  Ilustrasi identitas santri VIP Lughati. Tidak ada kartu, QR,
                  berkas, atau dompet digital sungguhan yang dibuat.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup kartu anggota VIP"
                className="grid size-8 shrink-0 place-items-center rounded-full border border-line/70 bg-surface text-muted transition-colors hover:bg-line/30 hover:text-ink"
              >
                <IconX className="size-4" />
              </button>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-sand-300/40 bg-emerald-950 p-5 text-white shadow-xl sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-emerald-400/25 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-12 size-64 rounded-full bg-sand-300/20 blur-3xl"
              />
              <span
                aria-hidden="true"
                lang="ar"
                dir="rtl"
                className="pointer-events-none absolute bottom-2 right-4 select-none font-arabic text-[72px] leading-none text-white/5"
              >
                لغتي
              </span>

              <div className="relative z-10 flex min-h-48 flex-col justify-between gap-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-sand-300/40 bg-emerald-900 text-sand-200 shadow-inner">
                      <IconPremium className="size-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[15px] font-bold leading-none text-sand-200">
                          Lughati
                        </span>
                        <span
                          lang="ar"
                          dir="rtl"
                          className="font-arabic text-[11px] leading-none text-emerald-200"
                        >
                          | لغتي
                        </span>
                      </div>
                      <p className="mt-1 text-[9px] font-semibold uppercase tracking-widest text-emerald-100">
                        VIP Academic Member
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden text-sand-300 sm:inline">✦</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-sand-200 px-2.5 py-0.5 text-[10px] font-bold text-sand-900 shadow-sm">
                      <IconBadgeCheck className="size-3" />
                      VIP LIFETIME
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-emerald-100">
                    Nama Santri / Student Name
                  </p>
                  <p className="text-[22px] font-bold tracking-wide text-white sm:text-[24px]">
                    FATHIA RAHMA
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-[11px]">
                    <span
                      lang="ar"
                      dir="rtl"
                      className="font-arabic text-emerald-200"
                    >
                      طَالِبَةُ عِلْمٍ مُجْتَهِدَةٌ &bull; VIP Scholar
                    </span>
                    <span className="text-sand-300">&bull;</span>
                    <span className="font-medium text-sand-200">
                      Dual-Track (Fushah dan Amiyah Saudi)
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/10 pt-3">
                  <div className="space-y-1">
                    <p className="text-[9px] font-medium uppercase tracking-wider text-emerald-100">
                      Nomor ID Santri dan Serial Kartu
                    </p>
                    <p className="font-mono text-[14px] font-bold tracking-wider text-sand-200">
                      LGH-2026-9021
                    </p>
                    <p className="flex items-center gap-1 text-[10px] text-emerald-200">
                      Berlaku: Seumur Hidup (Lifetime) &bull; Contoh
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="grid size-11 place-items-center rounded-lg bg-white text-emerald-950 shadow-sm">
                      <IconQrCode className="size-7" />
                    </span>
                    <span className="font-mono text-[9px] tracking-tighter text-emerald-100">
                      VIP-8829-0192-KSA (Contoh)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onDownload}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-[11px] font-bold text-white shadow-sm transition-colors hover:bg-emerald-800 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                <IconDownload className="size-4" />
                Unduh Kartu (Pratinjau)
              </button>
              <button
                type="button"
                onClick={() =>
                  setNotice(
                    "Pratinjau — Apple / Google Wallet tidak tersedia pada demo ini.",
                  )
                }
                className="inline-flex items-center gap-2 rounded-lg border border-line/70 bg-surface px-3 py-2.5 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
              >
                <IconWallet className="size-4 text-brand" />
                Apple / Google Wallet
              </button>
              <button
                type="button"
                onClick={() =>
                  setNotice("Pratinjau — ID tidak disalin ke clipboard.")
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-paper px-3 py-2.5 text-[11px] font-medium text-muted transition-colors hover:bg-line/30 hover:text-ink"
              >
                <IconCopy className="size-4" />
                Salin ID
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-brand/20 bg-emerald-50 px-3 py-2 text-[10px] dark:bg-emerald-900/20">
              <span className="flex items-center gap-2 font-semibold text-emerald-900 dark:text-emerald-100">
                <IconCheck className="size-3.5" />
                Contoh unduhan: PDF dan PNG, resolusi 300 DPI
              </span>
              <span className="font-mono text-emerald-800 dark:text-emerald-200">
                10 Nov 2026, 14.35 WIB
              </span>
            </div>

            <div className="space-y-2 rounded-xl bg-surface p-4">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-ink">
                <IconBadgeCheck className="size-3.5 text-brand" />
                Hak Istimewa Pemegang Kartu VIP (Contoh)
              </p>
              <div className="grid grid-cols-1 gap-2 text-[11px] text-muted sm:grid-cols-2">
                {[
                  "Akses penuh Fushah C2 dan dialek Saudi",
                  "Live mentoring 1-on-1 dua kali sebulan",
                  "Prioritas uji Talaqqi AI suara",
                  "Sertifikat kompetensi digital QR",
                ].map((benefit) => (
                  <span key={benefit} className="flex items-start gap-1.5">
                    <IconCheck className="mt-0.5 size-3 shrink-0 text-brand" />
                    {benefit}
                  </span>
                ))}
              </div>
            </div>

            {notice ? (
              <p
                role="status"
                className="rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold leading-4 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
              >
                {notice}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line/70 bg-surface px-5 py-3.5 sm:px-6">
            <span className="flex items-center gap-1.5 text-[11px] text-muted">
              <IconShieldCheck className="size-4 text-brand" />
              Terotentasi dan terverifikasi &mdash; ilustrasi
            </span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-line/70 bg-paper px-4 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VipCardToast({ onClose }: { onClose: () => void }) {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <div
      role="status"
      className="animate-flow-in fixed right-4 top-4 z-[110] w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-brand/30 bg-surface p-4 shadow-2xl sm:right-8 sm:top-6 sm:w-auto"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-brand shadow-sm ring-2 ring-brand/20 dark:bg-emerald-900/40">
          <IconDownload className="size-5" />
        </span>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-ink">
              Kartu VIP Berhasil Diunduh (Contoh)
              <span className="size-2 animate-pulse rounded-full bg-brand" />
            </h3>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup notifikasi kartu VIP"
              className="grid size-7 place-items-center rounded-lg text-muted transition-colors hover:bg-line/30 hover:text-ink"
            >
              <IconX className="size-4" />
            </button>
          </div>
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic text-[12px] font-semibold text-brand"
          >
            «تَمَّ تَحْمِيلُ بِطَاقَةِ VIP بِنَجَاح»
          </p>
          <p className="text-[11px] leading-5 text-muted">
            Contoh: <span className="font-mono">Lughati-VIP-FathiaRahma-Card.pdf</span>{" "}
            dan <span className="font-mono">.png</span> tidak dibuat atau
            disimpan ke perangkat.
          </p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-end gap-2 border-t border-line/60 pt-3">
        <button
          type="button"
          onClick={() => setNotice("Pratinjau — tidak ada file PDF untuk dibuka.")}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold text-brand transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
        >
          <IconEye className="size-4" />
          Buka File PDF
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg bg-paper px-3 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
        >
          Tutup
        </button>
      </div>
      {notice ? (
        <p
          role="status"
          className="mt-2 rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold leading-4 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
        >
          {notice}
        </p>
      ) : null}
    </div>
  );
}
