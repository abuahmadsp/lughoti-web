"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  IconBell,
  IconChat,
  IconLaptop,
  IconLogout,
  IconMail,
  IconPhone,
} from "./icons";

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
  label: string;
};

function Switch({ checked, onChange, label }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full p-0.5 shadow-inner transition-colors",
        checked ? "bg-brand" : "bg-line",
      )}
    >
      <span
        className={cn(
          "block size-5 rounded-full bg-white shadow-sm transition-transform",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}

export function AccountNotifications() {
  const [whatsapp, setWhatsapp] = useState(true);
  const [weekly, setWeekly] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);

  function showNotice(message: string) {
    setNotice(message);
  }

  return (
    <section className="flex flex-col gap-6 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl space-y-1">
          <h2 className="flex items-center gap-2 text-[18px] font-bold text-ink">
            <IconBell className="size-5 text-brand" />
            Integrasi Notifikasi dan Keamanan
          </h2>
          <p className="text-[12px] leading-5 text-muted">
            Kelola pengiriman jadwal mufrodat WhatsApp dan tinjau sesi login
            perangkat aktif. Semua pengaturan di sini bersifat ilustratif.
          </p>
        </div>
        <span className="rounded-full border border-line/70 bg-paper px-2.5 py-1 text-[10px] font-bold text-muted">
          Data demo
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-xl border border-line/70 bg-paper p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
                <IconChat className="size-4" />
              </span>
              <span className="text-[12px] font-semibold text-ink">
                Pengingat WhatsApp Harian
              </span>
            </span>
            <Switch
              checked={whatsapp}
              onChange={() => {
                setWhatsapp((current) => !current);
                setNotice(null);
              }}
              label=" Aktifkan pengingat WhatsApp harian"
            />
          </div>
          <p className="text-[11px] leading-5 text-muted">
            Contoh jadwal: 3 kosakata pukul 06.30 WIB dan tautan kuis pengulangan
            pukul 20.30 WIB. Tidak ada pesan yang dikirim.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-line/70 bg-paper p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sand-100 text-sand-900 dark:bg-sand-800 dark:text-sand-100">
                <IconMail className="size-4" />
              </span>
              <span className="text-[12px] font-semibold text-ink">
                Rapor Progres Mingguan via Email
              </span>
            </span>
            <Switch
              checked={weekly}
              onChange={() => {
                setWeekly((current) => !current);
                setNotice(null);
              }}
              label=" Aktifkan rapor progres mingguan via email"
            />
          </div>
          <p className="text-[11px] leading-5 text-muted">
            Contoh evaluasi pelafalan dikirim setiap Ahad malam. Tidak ada email
            sungguhan yang dibuat dari demo ini.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-line/60 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-[12px] font-bold uppercase tracking-wider text-muted">
            Sesi Perangkat Login
          </h3>
          <span className="text-[11px] font-bold text-brand">
            2 Perangkat Aktif (Contoh)
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line/70 bg-paper p-3">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-brand">
                <IconLaptop className="size-5" />
              </span>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-ink">
                  MacBook Pro 14 &bull; Safari
                </span>
                <span className="text-[10px] text-muted">
                  Jakarta, ID &bull; Sesi ini (aktif sekarang)
                </span>
              </div>
            </div>
            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
              Saat Ini
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line/70 bg-paper p-3">
            <div className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-muted">
                <IconPhone className="size-5" />
              </span>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-ink">
                  iPhone 15 Pro &bull; Aplikasi Lughati
                </span>
                <span className="text-[10px] text-muted">
                  Riyadh, KSA &bull; Aktif 4 jam lalu (contoh)
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                showNotice(
                  "Pratinjau — sesi perangkat tidak diakhiri karena tidak ada data login sungguhan.",
                )
              }
              className="rounded-lg border border-line/70 px-3 py-1.5 text-[11px] font-semibold text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              Keluar
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            showNotice(
              "Pratinjau — tidak ada sesi sungguhan yang dicabut dari perangkat lain.",
            )
          }
          className="flex items-center justify-center gap-2 rounded-lg border border-line/70 bg-paper px-4 py-2.5 text-[11px] font-semibold text-muted transition-colors hover:bg-line/30 hover:text-ink"
        >
          <IconLogout className="size-4" />
          Keluarkan Seluruh Sesi Perangkat Lain (Pratinjau)
        </button>
      </div>

      {notice ? (
        <p
          role="status"
          className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-[10px] font-semibold leading-4 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
        >
          {notice}
        </p>
      ) : null}
    </section>
  );
}
