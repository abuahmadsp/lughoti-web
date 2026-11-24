import { cn } from "@/lib/cn";
import {
  IconBrain,
  IconCheck,
  IconCloudCheck,
  IconCloudDownload,
  IconClock,
  IconCpu,
  IconInfo,
  IconReceipt,
  IconRefresh,
  IconSave,
  IconServer,
  IconShieldCheck,
  IconVerifiedUser,
} from "./icons";
import { DemoActionButton, SystemSettingsWorkspace } from "./system-settings-workspace";

const buttonClass =
  "inline-flex items-center gap-2 rounded-xl border border-line/70 bg-surface px-3.5 py-2.5 text-[11px] font-semibold text-ink shadow-sm transition-colors hover:bg-line/30";
const primaryButtonClass =
  "inline-flex items-center gap-2 rounded-xl bg-emerald-950 px-4 py-2.5 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800";

function StatusStrip() {
  return (
    <section
      aria-label="Status node dan engine"
      className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-paper p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4"
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
          <span className="size-2 rounded-full bg-brand animate-pulse-dot" />
          Node Riyadh-01 &amp; JKT-02 Synced
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[10px] font-semibold text-ink shadow-sm">
          <IconCloudCheck className="size-4 text-brand" />
          Versi Engine Talaqqi: <strong>v4.2.8-prod</strong>
        </span>
        <span className="hidden text-[10px] text-muted sm:inline">•</span>
        <span className="text-[10px] text-muted">Terakhir Diperiksa: 14 Detik Lalu</span>
      </div>
      <div className="flex items-center gap-2 self-start sm:self-auto">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-brand" />
        </span>
        <span className="text-[10px] font-bold text-ink">Semua Layanan Operasional</span>
        <span className="rounded-full border border-line/70 bg-surface px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-muted">
          Contoh
        </span>
      </div>
    </section>
  );
}

function PageHeader() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
      <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-emerald-100/50 blur-3xl dark:bg-emerald-900/20" />
      <div className="pointer-events-none absolute -bottom-20 right-1/3 size-64 rounded-full bg-sand-100/60 blur-3xl dark:bg-sand-300/10" />
      <div className="relative flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0 max-w-3xl space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
            <span className="rounded bg-sand-200 px-2 py-0.5 text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
              Infrastruktur Inti LMS
            </span>
            <span className="text-line">/</span>
            <span lang="ar" dir="rtl" className="font-arabic text-[12px] text-brand">
              إعدادات النظام والمنصة الذكية
            </span>
            <span className="rounded-full border border-line/70 bg-paper px-2 py-0.5 text-[9px] font-bold text-muted">
              Data demo
            </span>
          </div>
          <h1 className="text-[22px] font-bold tracking-tight text-ink sm:text-[28px]">
            Pengaturan Sistem &amp; Infrastruktur LMS
          </h1>
          <p className="max-w-3xl text-[12px] leading-5 text-muted">
            Pusat kendali ilustratif arsitektur Lughati: orkestrasi Speech Engine AI Talaqqi,
            WhatsApp Gateway, kontrol multi-peran RBAC, jadwal backup, dan protokol keamanan data
            santri. Seluruh versi, metrik, akun, dan jadwal di halaman ini adalah data contoh;
            tidak ada konfigurasi yang disimpan atau layanan yang dikendalikan dari sini.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <DemoActionButton
            className={buttonClass}
            title="Pratinjau — Audit Log Sistem hanya simulasi"
            notice="Pratinjau — Audit Log Sistem tidak memuat catatan atau berkas sungguhan."
          >
            <IconReceipt className="size-4 text-brand" />
            Audit Log Sistem
          </DemoActionButton>
          <DemoActionButton
            className={buttonClass}
            title="Pratinjau — Reset Cache AI hanya simulasi"
            notice="Pratinjau — Reset Cache AI tidak membersihkan cache atau mengubah model."
          >
            <IconRefresh className="size-4 text-brand" />
            Reset Cache AI
          </DemoActionButton>
          <DemoActionButton
            className={primaryButtonClass}
            title="Pratinjau — Simpan Seluruh Konfigurasi hanya simulasi"
            notice="Pratinjau — Simpan Seluruh Konfigurasi tidak menulis pengaturan ke backend mana pun."
          >
            <IconSave className="size-4" />
            Simpan Seluruh Konfigurasi
          </DemoActionButton>
        </div>
      </div>
    </section>
  );
}

type RailRow = {
  title: string;
  value: string;
  note?: string;
  dotClass?: string;
};

const edgeNodes: RailRow[] = [
  { title: "Jakarta (JKT-IDC3)", value: "18ms • Master DB", dotClass: "bg-brand" },
  { title: "Riyadh (RUH-KSA1)", value: "46ms • Speech Core", dotClass: "bg-brand" },
  { title: "Singapore (SIN-AWS)", value: "22ms • Edge CDN", dotClass: "bg-brand" },
];

const cronJobs = [
  {
    title: "Backup Database Lengkap",
    time: "02:00 WIB",
    note: "Arsip PostgreSQL & cloud storage terenkripsi (contoh).",
    icon: IconCloudDownload,
    iconClass: "text-brand",
  },
  {
    title: "Rekalibrasi Model Fonetik",
    time: "Ahad 03:00",
    note: "Pembaruan bobot varian makhraj (contoh).",
    icon: IconBrain,
    iconClass: "text-ink",
  },
  {
    title: "Rekonsiliasi Faktur VIP",
    time: "23:59 WIB",
    note: "Pencocokan QRIS/VA ke ledger kas (contoh).",
    icon: IconReceipt,
    iconClass: "text-gold",
  },
];

const securityLogs = [
  {
    title: "Login Berhasil: Dr. Salman (Super Admin)",
    note: "IP: 182.253.110.14 • Jakarta • 10m lalu",
    icon: IconVerifiedUser,
    iconClass: "text-brand",
  },
  {
    title: "Perpanjangan Sertifikat TLS/SSL",
    note: "Let's Encrypt Wildcard valid s/d 2026 (contoh).",
    icon: IconRefresh,
    iconClass: "text-brand",
  },
  {
    title: "Pembersihan Cache CDN Edge",
    note: "32,4 GB purges audio cache di Riyadh (contoh).",
    icon: IconShieldCheck,
    iconClass: "text-gold",
  },
];

function InfrastructureRail() {
  return (
    <div className="flex flex-col gap-4">
      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <IconServer className="size-5 text-brand" />
            <h2 className="text-[14px] font-bold text-ink">System Health &amp; SLA</h2>
          </div>
          <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
            99,98% SLA
          </span>
        </header>
        <div className="flex flex-col gap-2 rounded-xl bg-paper/70 p-3">
          <div className="flex flex-wrap items-center justify-between gap-1 text-[10px]">
            <span className="font-bold text-ink">Uptime 30 Hari Terakhir</span>
            <span className="font-bold text-brand">0 Menit Downtime</span>
          </div>
          <div className="flex h-12 items-end gap-1 overflow-hidden" aria-hidden="true">
            {Array.from({ length: 30 }, (_, index) => (
              <span
                key={index}
                className={cn(
                  "h-10 w-1.5 shrink-0 rounded-sm bg-brand/90",
                  index === 29 && "bg-brand",
                )}
              />
            ))}
          </div>
          <p className="text-[9px] text-muted">Bars uptime adalah representasi data contoh.</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
            Multi-Region Edge Clusters
          </p>
          {edgeNodes.map((node) => (
            <div key={node.title} className="flex items-center justify-between gap-2 rounded-lg bg-paper/70 p-2.5">
              <span className="flex min-w-0 items-center gap-2 text-[11px] font-semibold text-ink">
                <span className={cn("size-2 shrink-0 rounded-full", node.dotClass)} />
                <span className="truncate">{node.title}</span>
              </span>
              <span className="shrink-0 font-mono text-[9px] text-muted">{node.value}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex items-center justify-between gap-2">
          <h2 className="text-[14px] font-bold text-ink">Jadwal Otomatis (Cron)</h2>
          <IconClock className="size-5 text-muted" />
        </header>
        <div className="flex flex-col gap-2">
          {cronJobs.map((job) => {
            const JobIcon = job.icon;
            return (
              <div key={job.title} className="flex items-start gap-2.5 rounded-xl bg-paper/70 p-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-brand shadow-sm">
                  <JobIcon className={cn("size-4", job.iconClass)} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <span className="truncate text-[11px] font-bold text-ink">{job.title}</span>
                    <span className="text-[10px] font-bold text-brand">{job.time}</span>
                  </div>
                  <p className="mt-0.5 text-[10px] leading-4 text-muted">{job.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
        <header className="flex items-center justify-between gap-2">
          <h2 className="text-[14px] font-bold text-ink">Log Aktivitas Keamanan</h2>
          <IconShieldCheck className="size-5 text-muted" />
        </header>
        <div className="flex flex-col gap-3">
          {securityLogs.map((log) => {
            const LogIcon = log.icon;
            return (
              <div key={log.title} className="flex items-start gap-2">
                <LogIcon className={cn("mt-0.5 size-4 shrink-0", log.iconClass)} />
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-bold text-ink">{log.title}</p>
                  <p className="text-[10px] leading-4 text-muted">{log.note}</p>
                </div>
              </div>
            );
          })}
        </div>
        <DemoActionButton
          className="w-full rounded-xl bg-paper px-3 py-2 text-center text-[10px] font-bold text-ink transition-colors hover:bg-line/30"
          notice="Pratinjau — 1.420 entri audit log tidak tersedia dalam demo."
        >
          Lihat Seluruh 1.420 Entri Audit Log →
        </DemoActionButton>
      </section>

      <section className="flex items-start gap-2 rounded-2xl bg-emerald-950 p-4 text-sand-50 shadow-sm">
        <IconCpu className="mt-0.5 size-4 shrink-0 text-emerald-200" />
        <div className="min-w-0 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-100">
            Status Ilustratif
          </p>
          <p className="text-[11px] leading-4">
            SLA, latensi node, cron job, dan log keamanan di rail ini tidak terhubung ke server,
            monitoring, atau penjadwal sungguhan.
          </p>
          <span className="inline-flex items-center gap-1 rounded bg-emerald-900 px-1.5 py-0.5 text-[9px] font-bold text-emerald-100">
            <IconCheck className="size-3" />
            Pratinjau
          </span>
        </div>
      </section>

      <p className="flex items-start gap-1.5 px-1 text-[10px] leading-4 text-muted">
        <IconInfo className="mt-0.5 size-3.5 shrink-0" />
        Tidak ada cache yang direset, backup yang dijalankan, atau pengaturan yang dipersistenkan
        oleh halaman ini.
      </p>
    </div>
  );
}

export function SystemSettingsOverview() {
  return (
    <div className="flex flex-col gap-5 pb-8">
      <StatusStrip />
      <PageHeader />
      <SystemSettingsWorkspace rail={<InfrastructureRail />} />
    </div>
  );
}
