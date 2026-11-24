"use client";

import { useState } from "react";
import { IconDownload, IconFileText, IconChat } from "./icons";

export function SuccessReceiptActions() {
  const [notice, setNotice] = useState<string | null>(null);

  function showNotice(message: string) {
    setNotice(message);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() =>
            showNotice(
              "Pratinjau — tidak ada PDF yang dibuat atau diunduh dari demo ini.",
            )
          }
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-line/80 bg-paper px-3 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
        >
          <IconFileText className="size-4 text-brand" />
          Unduh Kuitansi (Contoh)
        </button>
        <button
          type="button"
          onClick={() =>
            showNotice(
              "Pratinjau — salinan tidak dikirim ke email atau WhatsApp manapun.",
            )
          }
          className="flex items-center justify-center gap-1.5 rounded-lg border border-line/80 bg-paper px-3 py-2 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
          title="Kirim salinan contoh"
        >
          <IconDownload className="size-4 text-brand" />
          Kirim Salinan
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
      <p className="flex items-center justify-center gap-1 text-center text-[9px] text-muted">
        <IconChat aria-hidden="true" className="size-3" />
        Faktur, nomor, dan pembayaran pada kartu ini adalah contoh.
      </p>
    </div>
  );
}
