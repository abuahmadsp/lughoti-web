"use client";

import { useState } from "react";
import { IconChat, IconShieldCheck } from "./icons";

export function SuccessSupportCard() {
  const [notice, setNotice] = useState<string | null>(null);

  function showNotice(message: string) {
    setNotice(message);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start gap-3 rounded-xl border border-line/70 bg-paper p-4">
        <IconShieldCheck
          aria-hidden="true"
          className="mt-0.5 size-5 shrink-0 text-brand"
        />
        <div>
          <p className="text-[11px] font-bold text-ink">
            Jaminan 7 Hari (Contoh Kebijakan)
          </p>
          <p className="mt-1 text-[10px] leading-5 text-muted">
            Ilustrasi kebijakan pengembalian dana. Tidak ada dana yang ditahan,
            dikembalikan, atau diverifikasi pada demo ini.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] text-muted">
        <button
          type="button"
          onClick={() =>
            showNotice(
              "Pratinjau — tautan WhatsApp dan nomor dukungan adalah contoh.",
            )
          }
          className="flex items-center gap-1.5 font-semibold text-brand hover:underline"
        >
          <IconChat aria-hidden="true" className="size-3.5" />
          Bantuan khusus Pro: +62 812-3456-7890 (contoh)
        </button>
        <span className="text-line">Respons &lt; 15 menit (klaim contoh)</span>
      </div>
      {notice ? (
        <p
          role="status"
          className="rounded-lg bg-emerald-50 px-3 py-2 text-center text-[10px] font-semibold text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
        >
          {notice}
        </p>
      ) : null}
    </div>
  );
}
