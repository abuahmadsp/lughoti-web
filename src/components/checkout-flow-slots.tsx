import {
  IconChat,
  IconLock,
  IconRefresh,
  IconShieldCheck,
  IconStar,
} from "./icons";

export function CheckoutAccountCard() {
  return (
    <div className="rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-brand dark:bg-emerald-900/30">
            <IconShieldCheck className="size-5" />
          </span>
          <div>
            <h3 className="text-[16px] font-bold text-ink">
              Informasi Akun Penerima Akses (Contoh)
            </h3>
            <p className="mt-1 text-[11px] leading-5 text-muted">
              Data di bawah hanya ilustrasi dan tidak diverifikasi server.
            </p>
          </div>
        </div>
        <span className="rounded-full border border-line/70 bg-paper px-2.5 py-1 text-[10px] font-bold text-muted">
          Data demo
        </span>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="flex flex-col rounded-xl bg-paper p-3">
          <span className="text-[10px] text-muted">Nama contoh</span>
          <span className="mt-1 text-[13px] font-semibold text-ink">
            Fathia Rahma
          </span>
        </div>
        <div className="flex flex-col rounded-xl bg-paper p-3">
          <span className="text-[10px] text-muted">Email contoh</span>
          <span className="mt-1 truncate text-[13px] font-semibold text-ink">
            fathia.rahma@example.com
          </span>
        </div>
        <div className="flex flex-col rounded-xl bg-paper p-3">
          <span className="text-[10px] text-muted">Status contoh</span>
          <span className="mt-1 text-[13px] font-semibold text-sand-800 dark:text-sand-200">
            Free Member
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1.5">
        <label
          htmlFor="checkout-wa"
          className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-semibold text-ink"
        >
          <span>Nomor WhatsApp contoh (kode konfirmasi ilustratif)</span>
          <span className="font-normal text-brand">Tidak ada pesan WA nyata</span>
        </label>
        <div className="flex items-center rounded-xl border border-line/70 bg-surface px-1">
          <span className="rounded-lg bg-paper px-3 py-2 text-[11px] font-semibold text-muted">
            +62 (ID)
          </span>
          <input
            id="checkout-wa"
            type="tel"
            defaultValue="812-3456-7890"
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[12px] text-ink focus:outline-none"
          />
          <IconChat aria-hidden="true" className="size-4 shrink-0 text-brand" />
        </div>
      </div>
    </div>
  );
}

export function CheckoutAssurances() {
  const badges = [
    { icon: IconLock, label: "256-Bit SSL", note: "contoh" },
    { icon: IconShieldCheck, label: "ISO 27001", note: "contoh" },
    { icon: IconRefresh, label: "Garansi 7 Hari", note: "contoh" },
  ];

  return (
    <>
      <div className="rounded-2xl border border-line/70 bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-around gap-2 text-center">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div key={badge.label} className="flex flex-col items-center gap-1">
                <Icon className="size-5 text-brand" />
                <span className="text-[10px] font-bold text-ink">
                  {badge.label}
                </span>
                <span className="text-[9px] text-muted">{badge.note}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-paper p-3">
          <div className="flex items-center gap-2">
            <IconChat className="size-5 shrink-0 text-brand" />
            <div>
              <p className="text-[11px] font-bold text-ink">
                Butuh panduan pembayaran?
              </p>
              <p className="text-[10px] text-muted">
                Contoh dukungan — bukan layanan CS nyata.
              </p>
            </div>
          </div>
          <button
            type="button"
            title="Pratinjau — dukungan WhatsApp belum tersedia"
            className="rounded-lg border border-line/80 bg-surface px-3 py-1.5 text-[11px] font-bold text-brand transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
          >
            Chat WA (contoh)
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-line/70 bg-paper p-4">
        <div className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-950 to-brand text-[13px] font-bold text-white"
          >
            A
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-0.5 text-sand-500">
              {Array.from({ length: 5 }, (_, index) => (
                <IconStar
                  key={index}
                  className="size-3.5 fill-current"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="mt-1.5 text-[11px] italic leading-5 text-muted">
              “Kombinasi Fushah dan Amiyah Saudi sangat pas untuk persiapan tugas
              dinas ke Riyadh. Audio native-nya jernih sekali.”
            </p>
            <p className="mt-2 text-[10px] font-bold text-ink">
              — Ahmad Zaki (contoh), peserta Pro 2024
            </p>
            <p className="mt-1 text-[9px] text-muted">
              Kutipan ilustrasi, bukan testimoni pembelajar nyata.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
