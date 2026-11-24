import { cn } from "@/lib/cn";
import {
  IconAward,
  IconBadgeCheck,
  IconChart,
  IconChevronRight,
  IconDownload,
  IconHourglass,
  IconInfo,
  IconPremium,
  IconReceipt,
  IconSend,
  IconShieldCheck,
  IconTrendingUp,
  IconVerifiedUser,
  IconWallet,
} from "./icons";
import { TransactionReviewLink } from "./transaction-review-flow";
import { DemoActionButton, DemoSelect, TransactionWorkspace } from "./transaction-workspace";

const buttonClass =
  "inline-flex items-center gap-2 rounded-xl border border-line/70 bg-surface px-3.5 py-2.5 text-[11px] font-semibold text-ink shadow-sm transition-colors hover:bg-line/30";

function PageHeader() {
  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-paper p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted">
            <span>Keuangan &amp; Akademi</span>
            <IconChevronRight className="size-3.5" />
            <span className="font-semibold text-brand">Transaksi &amp; VIP</span>
            <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
              FY 2026/Q1
            </span>
            <span className="rounded-full border border-line/70 bg-surface px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              Data demo
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-[22px] font-bold tracking-tight text-ink sm:text-[28px]">
              Manajemen Transaksi &amp; Member VIP
            </h1>
            <span
              lang="ar"
              dir="rtl"
              className="font-arabic text-[15px] font-bold text-gold sm:text-[17px]"
            >
              إدارة المعاملات المالية واشتراكات VIP
            </span>
          </div>
          <p className="max-w-3xl text-[12px] leading-5 text-muted">
            Audit ilustratif pemasukan langganan santri, perpanjangan paket Pro/VIP Lifetime,
            rekonsiliasi gateway, dan faktur elektronik. Seluruh nominal, nama, gateway, dan log
            di halaman ini adalah data contoh; tidak ada transaksi, payout, email, atau dokumen
            sungguhan yang diproses.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DemoSelect
            ariaLabel="Pilih periode laporan keuangan demo"
            options={["Mar 2026", "Feb 2026", "Q1 2026", "Rentang Kustom"]}
            notice='Pratinjau — periode "{value}" hanya mengubah tampilan contoh.'
          />
          <DemoActionButton
            className={buttonClass}
            title="Pratinjau — tagihan manual hanya simulasi demo"
            notice="Pratinjau — Tagihan Manual tidak membuat atau mengirim tagihan apa pun."
          >
            <IconSend className="size-4 text-brand" />
            Tagihan Manual
          </DemoActionButton>
          <DemoActionButton
            className={cn(
              "inline-flex items-center gap-2 rounded-xl bg-brand px-3.5 py-2.5 text-[11px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90",
            )}
            title="Pratinjau — ekspor rekap hanya simulasi demo"
            notice="Pratinjau — Ekspor Rekap (CSV/Excel) tidak menghasilkan berkas."
          >
            <IconDownload className="size-4" />
            Ekspor Rekap (CSV/Excel)
          </DemoActionButton>
        </div>
      </div>
    </section>
  );
}

function MetricCards() {
  return (
    <section
      aria-label="Ringkasan metrik transaksi dan VIP"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              Total Pendapatan Bulan Ini
            </span>
            <span className="text-[22px] font-bold leading-tight text-ink sm:text-[24px]">
              Rp 482.950.000
            </span>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand">
            <IconWallet className="size-5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3 text-[10px]">
          <span className="inline-flex items-center gap-1 font-bold text-brand">
            <IconTrendingUp className="size-3.5" />
            +22,4%
            <span className="font-medium text-muted">vs Feb 2026</span>
          </span>
          <span lang="ar" dir="rtl" className="font-arabic text-[11px] text-gold">
            إجمالي الإيرادات
          </span>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              Member VIP Aktif
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-bold leading-tight text-ink sm:text-[24px]">
                3.425
              </span>
              <span className="text-[10px] text-muted">Santri</span>
            </div>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-sand-200 text-gold dark:bg-sand-300/20 dark:text-sand-200">
            <IconPremium className="size-5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3 text-[10px]">
          <span className="flex flex-wrap gap-1">
            <span className="rounded bg-emerald-950 px-1.5 py-0.5 font-bold text-white dark:bg-emerald-900">
              2.180 Annual
            </span>
            <span className="rounded bg-sand-200 px-1.5 py-0.5 font-bold text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
              1.245 Lifetime
            </span>
          </span>
          <span lang="ar" dir="rtl" className="font-arabic text-[11px] text-gold">
            عضويات VIP
          </span>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              Transaksi Berhasil
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-bold leading-tight text-ink sm:text-[24px]">
                1.842
              </span>
              <span className="text-[10px] text-muted">orders</span>
            </div>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40 dark:text-emerald-200">
            <IconBadgeCheck className="size-5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3 text-[10px]">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <span className="size-2 rounded-full bg-brand animate-pulse-dot" />
            <span className="font-bold text-brand">99,1%</span>
            <span className="font-normal text-muted">Success Settlement</span>
          </span>
          <span lang="ar" dir="rtl" className="font-arabic text-[11px] text-gold">
            عمليات ناجحة
          </span>
        </div>
      </article>

      <article className="flex flex-col justify-between gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              Pending / Refund Review
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-bold leading-tight text-gold sm:text-[24px]">5</span>
              <span className="text-[10px] font-medium text-red-600 dark:text-red-400">
                butuh tindakan CS
              </span>
            </div>
          </div>
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-sand-200 text-gold dark:bg-sand-300/20 dark:text-sand-200">
            <IconHourglass className="size-5" />
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3 text-[10px]">
          <span className="inline-flex items-center gap-1.5 text-muted">
            <span className="size-2 rounded-full bg-gold animate-pulse-dot" />
            3 Verifikasi VA • 2 Sengketa
          </span>
          <TransactionReviewLink className="font-bold text-brand hover:underline">
            Tinjau →
          </TransactionReviewLink>
        </div>
      </article>
    </section>
  );
}

function FeaturedBanner() {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-paper p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sand-200 text-gold dark:bg-sand-300/20 dark:text-sand-200">
          <IconAward className="size-6" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[13px] font-bold text-ink">Program Akselerasi VIP Lifetime</h2>
            <span className="rounded bg-sand-200 px-1.5 py-0.5 text-[9px] font-bold text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
              Contoh
            </span>
          </div>
          <p className="mt-1 max-w-xl text-[10px] leading-4 text-muted">
            Angka retensi 94,8% per kuartal dan penilaian Talaqqi AI 4,9/5,0 di banner ini adalah
            ilustrasi. Tidak ada kesaksian, sertifikat, atau hak akses sungguhan yang diterbitkan.
          </p>
        </div>
      </div>
      <DemoActionButton
        className="shrink-0 rounded-xl border border-line/70 bg-surface px-3.5 py-2 text-[10px] font-bold text-ink shadow-sm transition-colors hover:bg-line/30"
        notice="Pratinjau — Kelola Hak Akses VIP tidak mengubah langganan atau entitlement apa pun."
      >
        Kelola Hak Akses VIP
      </DemoActionButton>
    </section>
  );
}

const gatewayBalances = [
  {
    mark: "M",
    markClass: "bg-surface text-brand",
    name: "Midtrans Gateway",
    note: "Auto-settle H+1 Siap Tarik (Contoh)",
    amount: "Rp 182.400.000",
    sub: null,
    payout: true,
  },
  {
    mark: "S",
    markClass: "bg-surface text-brand",
    name: "Stripe International",
    note: "Santri Luar Negeri (Gulf & ASEAN)",
    amount: "$4,850.00 USD",
    sub: "≈ Rp 78.570.000",
    payout: false,
  },
  {
    mark: "BSI",
    markClass: "bg-brand/10 text-brand",
    name: "BSI Syariah Escrow",
    note: "Realtime Direct Clearing (Contoh)",
    amount: "Rp 221.980.000",
    sub: "Dedicated VA",
    payout: false,
  },
];

const methodDistribution = [
  { label: "BSI / Bank Syariah (45%)", width: "45%", dot: "bg-emerald-950 dark:bg-emerald-500" },
  { label: "QRIS & E-Wallet (35%)", width: "35%", dot: "bg-brand" },
  { label: "Kartu Kredit Visa/MC (15%)", width: "15%", dot: "bg-gold" },
  { label: "Lainnya / Manual (5%)", width: "5%", dot: "bg-line" },
];

const activityLogs = [
  {
    time: "14:23 WIB • Webhook Midtrans",
    title: "Settlement sukses #INV/2026/03/8921",
    note: "Faktur e-Pajak otomatis diterbitkan via DJP Sandbox (contoh).",
    dot: "bg-brand",
  },
  {
    time: "13:58 WIB • BSI VA Direct Callback",
    title: "Aktivasi lisensi Pro Annual — M. Al-Ghazali",
    note: "Masa aktif diperpanjang hingga 29 Mar 2027 (contoh).",
    dot: "bg-brand",
  },
  {
    time: "11:15 WIB • ShopeePay Engine",
    title: "Payment order dibuat, menunggu konfirmasi pin",
    note: "Expiry time: 15 menit tersisa (contoh).",
    dot: "bg-gold",
  },
  {
    time: "08:12 WIB • Stripe Recurring",
    title: "Faktur dwi-bahasa dikirim ke aisyah.r@lughati.academy",
    note: "Kuitansi PDF terlampir otomatis (contoh).",
    dot: "bg-emerald-950 dark:bg-emerald-500",
  },
];

function FinancialRail() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
              Rekonsiliasi Saldo Gateway
            </p>
            <h2 className="text-[14px] font-bold text-ink">Status Likuiditas</h2>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-full bg-brand animate-pulse-dot"
              title="Pratinjau — gateway tidak tersambung"
            />
            <span className="rounded-full bg-paper px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
              Contoh
            </span>
          </div>
        </header>
        <div className="flex flex-col gap-2">
          {gatewayBalances.map((gateway) => (
            <div key={gateway.name} className="flex items-center justify-between gap-2 rounded-xl bg-paper p-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-lg text-[11px] font-bold",
                    gateway.markClass,
                  )}
                >
                  {gateway.mark}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-bold text-ink">{gateway.name}</p>
                  <p className="truncate text-[10px] text-muted">{gateway.note}</p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[11px] font-bold text-ink">{gateway.amount}</p>
                {gateway.sub ? <p className="text-[10px] text-muted">{gateway.sub}</p> : null}
                {gateway.payout ? (
                  <DemoActionButton
                    className="text-[10px] font-bold text-brand hover:underline"
                    notice="Pratinjau — Payout tidak memindahkan dana atau menghubungi gateway."
                  >
                    Payout →
                  </DemoActionButton>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <p className="border-t border-line/70 pt-3 text-[10px] leading-4 text-muted">
          Semua saldo, kurs, dan status settlement di atas adalah data contoh; tidak ada koneksi
          ke Midtrans, Stripe, BSI, atau bank mana pun.
        </p>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <IconChart className="size-5 text-brand" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">
                Distribusi Metode
              </p>
              <h2 className="text-[14px] font-bold text-ink">Kanal Pembayaran</h2>
            </div>
          </div>
          <span className="rounded bg-paper px-2 py-0.5 text-[9px] font-bold text-muted">
            30 Hari • Contoh
          </span>
        </header>
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-line/50">
          {methodDistribution.map((item) => (
            <div
              key={item.label}
              className={cn("h-full", item.dot)}
              style={{ width: item.width }}
              title={item.label}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {methodDistribution.map((item) => (
            <span key={item.label} className="inline-flex items-center gap-1.5 text-[10px] text-ink">
              <span className={cn("size-2.5 shrink-0 rounded-full", item.dot)} />
              {item.label}
            </span>
          ))}
        </div>
        <div className="flex items-start gap-2 rounded-xl bg-paper p-3">
          <IconVerifiedUser className="mt-0.5 size-4 shrink-0 text-brand" />
          <p className="text-[10px] leading-4 text-muted">
            Proporsi BSI Virtual Account Syariah mendominasi data contoh pendaftaran program Nahwu
            &amp; Shorof Intensif Ramadan.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex items-center justify-between gap-2">
          <h2 className="text-[14px] font-bold text-ink">Log Aktivitas Sistem</h2>
          <DemoActionButton
            className="text-[10px] font-bold text-brand hover:underline"
            notice="Pratinjau — Semua Log tidak tersedia dalam demo."
          >
            Semua Log
          </DemoActionButton>
        </header>
        <div className="relative flex flex-col gap-3 border-l-2 border-line/60 pl-4">
          {activityLogs.map((log) => (
            <div key={log.time} className="relative flex flex-col gap-0.5">
              <span
                className={cn("absolute -left-[21px] top-1.5 size-2 rounded-full", log.dot)}
              />
              <span className="font-mono text-[10px] text-muted">{log.time}</span>
              <span className="text-[11px] font-bold text-ink">{log.title}</span>
              <span className="text-[10px] text-muted">{log.note}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-between gap-3 rounded-2xl bg-emerald-950 p-4 text-sand-50 shadow-sm">
        <div className="min-w-0 space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-100">
            Kepatuhan Syariah &amp; Pajak
          </p>
          <p className="text-[14px] font-bold">Faktur Terverifikasi 100%</p>
          <p className="text-[10px] leading-4 text-emerald-100">
            Integrasi e-Faktur PPh/PPN hanya ilustrasi; tidak ada sandbox pajak sungguhan.
          </p>
          <span className="inline-flex items-center gap-1 rounded bg-emerald-900 px-1.5 py-0.5 text-[9px] font-bold text-emerald-100">
            <IconInfo className="size-3" />
            Pratinjau
          </span>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-900 text-emerald-200">
          <IconShieldCheck className="size-6" />
        </span>
      </section>

      <p className="flex items-start gap-1.5 px-1 text-[10px] leading-4 text-muted">
        <IconReceipt className="mt-0.5 size-3.5 shrink-0" />
        Panel keuangan ini tidak membaca saldo, tidak mengirim notifikasi, dan tidak menghasilkan
        faktur atau kuitansi.
      </p>
    </div>
  );
}

export function TransactionOverview() {
  return (
    <div className="flex flex-col gap-5 pb-8">
      <PageHeader />
      <MetricCards />
      <TransactionWorkspace featured={<FeaturedBanner />} rail={<FinancialRail />} />
    </div>
  );
}
