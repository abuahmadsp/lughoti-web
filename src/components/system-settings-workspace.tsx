"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  IconBrain,
  IconBuilding,
  IconChat,
  IconCheck,
  IconChevronDown,
  IconClock,
  IconCloudDownload,
  IconCpu,
  IconInfo,
  IconLock,
  IconPlusCircle,
  IconReceipt,
  IconRefresh,
  IconSave,
  IconServer,
  IconShieldCheck,
  IconTune,
  IconUsers,
  IconWaveform,
  IconX,
} from "./icons";

type IconType = ComponentType<{ className?: string }>;
type TabId = "general" | "engine" | "gateway" | "rbac" | "backup";

type SettingsState = {
  adaptive: boolean;
  voiceEncryption: boolean;
  talaqqiReminder: boolean;
  invoiceWa: boolean;
  twoFa: boolean;
  sanadApproval: boolean;
  autoRefund: boolean;
  maintenance: boolean;
  backupEncryption: boolean;
};

const initialSettings: SettingsState = {
  adaptive: true,
  voiceEncryption: true,
  talaqqiReminder: true,
  invoiceWa: true,
  twoFa: true,
  sanadApproval: true,
  autoRefund: false,
  maintenance: false,
  backupEncryption: true,
};

const tabs: {
  id: TabId;
  label: string;
  icon: IconType;
  badge?: string;
  dot?: boolean;
}[] = [
  { id: "general", label: "Konfigurasi Umum & Profil", icon: IconBuilding },
  { id: "engine", label: "Engine AI Talaqqi & Vokal", icon: IconWaveform, badge: "Aktif" },
  { id: "gateway", label: "Gateway & Notifikasi", icon: IconChat, dot: true },
  { id: "rbac", label: "Hak Akses & Asatidz (RBAC)", icon: IconShieldCheck },
  { id: "backup", label: "Backup Data & Keamanan", icon: IconCloudDownload },
];

const pipelineOptions = [
  "Talaqqi ASR v4.2 Neural Dual-Engine (Fushah & Amiyah Hijazi/Najdi)",
  "Talaqqi ASR v4.1 Legacy (Fushah Al-Turats Only)",
  "Experimental Whisper-Arabic Fine-Tuned v3 (Research Preview)",
];

const panelClass =
  "flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5";
const subPanelClass = "rounded-xl border border-line/60 bg-paper/70 p-3";

function tierFor(value: number) {
  if (value < 85) return "Makbul";
  if (value >= 95) return "Mutqin";
  return "Mumtaz";
}

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

type ModuleProps = {
  settings: SettingsState;
  toggle: (key: keyof SettingsState, noticeOn: string, noticeOff: string) => void;
  onNotice: (message: string) => void;
};

function SwitchButton({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors",
        checked ? "bg-brand" : "bg-line",
      )}
    >
      <span
        className={cn(
          "size-5 rounded-full bg-white shadow-sm transition-transform",
          checked ? "translate-x-[22px]" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

function ToggleRow({
  title,
  description,
  icon,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  icon: IconType;
  checked: boolean;
  onChange: () => void;
}) {
  const Icon = icon;
  return (
    <div className="flex items-start justify-between gap-3 rounded-xl bg-paper/70 p-3">
      <div className="flex min-w-0 items-start gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-brand shadow-sm">
          <Icon className="size-4" />
        </span>
        <div className="min-w-0">
          <h3 className="text-[11px] font-bold leading-4 text-ink">{title}</h3>
          <p className="mt-1 text-[10px] leading-4 text-muted">{description}</p>
        </div>
      </div>
      <SwitchButton label={title} checked={checked} onChange={onChange} />
    </div>
  );
}

function ModuleHeading({
  icon,
  title,
  arabic,
  description,
  chip,
}: {
  icon: IconType;
  title: string;
  arabic: string;
  description: string;
  chip: string;
}) {
  const Icon = icon;
  return (
    <header className="flex flex-col gap-3 border-b border-line/70 pb-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-950 text-white dark:bg-emerald-900">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <h2 className="text-[14px] font-bold text-ink">{title}</h2>
            <span lang="ar" dir="rtl" className="font-arabic text-[12px] font-bold text-gold">
              {arabic}
            </span>
          </div>
          <p className="mt-1 text-[10px] leading-4 text-muted">{description}</p>
        </div>
      </div>
      <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-[9px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
        {chip}
      </span>
    </header>
  );
}

function AiEngineModule({ settings, toggle, onNotice }: ModuleProps) {
  const [slider, setSlider] = useState(92);
  const [pipeline, setPipeline] = useState(pipelineOptions[0]);

  return (
    <section className={panelClass} aria-labelledby="ai-engine-heading">
      <div id="ai-engine-heading">
        <ModuleHeading
          icon={IconBrain}
          title="Model AI Talaqqi & Spektrum Fonetik"
          arabic="النطق القرآني والفونولوجيا"
          description="Konfigurasi ilustratif ketelitian pengenalan suara, tashkeel, makharijul huruf, dan aksen lokal. Tidak ada model atau inference sungguhan."
          chip="Dual Engine Aktif • Data demo"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1.5 md:col-span-2">
          <span className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-bold text-ink">
            Model Pipeline Utama Talaqqi
            <span className="text-[10px] font-medium text-brand">Transformer Multi-Task ASR</span>
          </span>
          <span className="relative flex items-center">
            <select
              value={pipeline}
              onChange={(event) => {
                setPipeline(event.target.value);
                onNotice(`Pratinjau — pipeline "${event.target.value}" hanya dipilih secara lokal.`);
              }}
              aria-label="Model pipeline utama Talaqqi"
              className="w-full cursor-pointer appearance-none rounded-xl border border-line/70 bg-paper py-3 pl-3 pr-9 text-[11px] font-semibold text-ink focus:outline-none"
            >
              {pipelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <IconChevronDown className="pointer-events-none absolute right-3 size-4 text-muted" />
          </span>
          <span className="text-[10px] leading-4 text-muted">
            Pilihan ini tidak memuat model, tidak memproses audio, dan tidak mengubah engine apa pun.
          </span>
        </label>

        <div className="flex flex-col gap-3 rounded-xl border border-line/60 bg-paper/70 p-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-ink">
              <IconTune className="size-4 text-brand" />
              Toleransi Deviasi Makhraj
            </span>
            <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-bold text-white dark:bg-emerald-900">
              {slider}% ({tierFor(slider)})
            </span>
          </div>
          <input
            type="range"
            min={80}
            max={98}
            value={slider}
            aria-label="Toleransi deviasi makhraj"
            onChange={(event) => setSlider(Number(event.target.value))}
            className="h-2 w-full cursor-pointer accent-brand"
          />
          <div className="flex flex-wrap justify-between gap-1 text-[9px] text-muted">
            <span>80% (Longgar - Pemula)</span>
            <span className="font-semibold text-brand">92% Standar Ujian</span>
            <span>98% (Mutqin Itqan)</span>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-3 rounded-xl border border-line/60 bg-paper/70 p-3">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-ink">Batas Latensi Edge (Real-Time)</span>
              <span className="rounded bg-surface px-2 py-0.5 text-[10px] font-bold text-brand">
                Aktual: 138 ms
              </span>
            </div>
            <p className="mt-1 text-[10px] leading-4 text-muted">
              Maksimum respon balik talaqqi audio santri saat latihan interaktif (data contoh).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 flex-1 overflow-hidden rounded-full bg-line/60">
              <span className="block h-full w-[69%] rounded-full bg-brand" />
            </span>
            <span className="text-[10px] font-semibold text-ink">138 / 200 ms</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <ToggleRow
          title="Amiyah Hijaz / Najd Adaptive Normalization"
          description="Normalisasi dialek Saudi perkotaan ditampilkan sebagai contoh; tidak ada pengenalan dialek sungguhan."
          icon={IconRefresh}
          checked={settings.adaptive}
          onChange={() =>
            toggle(
              "adaptive",
              "Pratinjau — normalisasi dialek dinyalakan pada tampilan demo.",
              "Pratinjau — normalisasi dialek dimatikan pada tampilan demo.",
            )
          }
        />
        <ToggleRow
          title="Enkripsi AES-256 Voice Biomarkers Santri"
          description="Hanya label ilustratif; tidak ada sampel audio, metadata, atau klaster pelatihan yang disentuh."
          icon={IconLock}
          checked={settings.voiceEncryption}
          onChange={() =>
            toggle(
              "voiceEncryption",
              "Pratinjau — enkripsi voice biomarker dinyalakan pada tampilan demo.",
              "Pratinjau — enkripsi voice biomarker dimatikan pada tampilan demo.",
            )
          }
        />
      </div>

      <div className="flex flex-col gap-3 rounded-xl bg-emerald-950 p-3 text-sand-50">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-sand-50">
            <IconCpu className="size-4 text-emerald-200" />
            Alokasi VRAM Server AI Cluster (NVIDIA A100)
          </span>
          <span className="rounded bg-emerald-900 px-2 py-0.5 text-[10px] font-bold text-emerald-100">
            184 / 320 GB (57,5%)
          </span>
        </div>
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-emerald-900">
          <span className="h-full w-[42%] bg-emerald-300" title="Speech Inference" />
          <span className="h-full w-[15.5%] bg-brand" title="Dialect Engine" />
          <span className="h-full w-[42.5%] bg-emerald-900" title="Free Buffer" />
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9px] text-emerald-100">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-300" />
            Active Inference (134 GB)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-brand" />
            Tashkeel Synthesizer (50 GB)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-900" />
            Free Buffer (136 GB)
          </span>
        </div>
      </div>
      <p className="flex items-start gap-1.5 text-[10px] leading-4 text-muted">
        <IconInfo className="mt-0.5 size-3.5 shrink-0" />
        Semua nilai pada modul ini adalah data contoh. Tidak ada GPU, model, atau microphone yang
        digunakan.
      </p>
    </section>
  );
}

function GatewayModule({ settings, toggle }: ModuleProps) {
  const gatewayStats = [
    { label: "Pesan Terkirim (Bulan Ini)", value: "42.180", note: "99,4% Terkirim Sukses" },
    { label: "Sisa Kuota API Meta", value: "57.820", note: "Reset dalam 12 hari" },
    { label: "Webhook Payment", value: "42 ms", note: "Response Time Stabil" },
  ];

  return (
    <section className={panelClass} aria-labelledby="gateway-heading">
      <div id="gateway-heading">
        <ModuleHeading
          icon={IconChat}
          title="WhatsApp Gateway & Notifikasi Santri"
          arabic="بوابة الواتساب والرسائل"
          description="Otomatisasi pengingat muraja'ah, kartu skor ujian, dan invoice VIP ditampilkan sebagai ilustrasi. Tidak ada pesan yang dikirim."
          chip="Terhubung (API v2.4) • Contoh"
        />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {gatewayStats.map((stat) => (
          <div key={stat.label} className={subPanelClass}>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted">
              {stat.label}
            </p>
            <p className="mt-1 text-[18px] font-bold text-ink">{stat.value}</p>
            <p className="mt-0.5 text-[10px] text-brand">{stat.note}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <ToggleRow
          title="Pengingat Talaqqi Harian (05:30 WIB)"
          description="Notifikasi 1 juz & 5 mufrodat hanya rancangan; tidak ada jadwal atau pengiriman sungguhan."
          icon={IconChat}
          checked={settings.talaqqiReminder}
          onChange={() =>
            toggle(
              "talaqqiReminder",
              "Pratinjau — pengingat Talaqqi dinyalakan pada tampilan demo.",
              "Pratinjau — pengingat Talaqqi dimatikan pada tampilan demo.",
            )
          }
        />
        <ToggleRow
          title="Faktur & Invoice VIP Otomatis"
          description="Tidak ada PDF, email, atau WhatsApp yang dibuat oleh tombol ini."
          icon={IconReceipt}
          checked={settings.invoiceWa}
          onChange={() =>
            toggle(
              "invoiceWa",
              "Pratinjau — invoice otomatis dinyalakan pada tampilan demo.",
              "Pratinjau — invoice otomatis dimatikan pada tampilan demo.",
            )
          }
        />
      </div>
      <p className="flex items-start gap-1.5 text-[10px] leading-4 text-muted">
        <IconInfo className="mt-0.5 size-3.5 shrink-0" />
        Angka pengiriman, kuota Meta, dan latency webhook adalah data contoh tanpa koneksi ke API
        mana pun.
      </p>
    </section>
  );
}

const roleCards = [
  { count: "1", label: "Super Admin", valueClass: "text-ink" },
  { count: "4", label: "Musyrif Talaqqi", valueClass: "text-brand" },
  { count: "2", label: "Admin Keuangan", valueClass: "text-ink" },
  { count: "1", label: "Kurikulum Lead", valueClass: "text-gold" },
];

function RbacModule({ settings, toggle }: ModuleProps) {
  return (
    <section className={panelClass} aria-labelledby="rbac-heading">
      <div id="rbac-heading">
        <ModuleHeading
          icon={IconUsers}
          title="Manajemen Hak Akses & Asatidz (RBAC)"
          arabic="صلاحيات الأساتذة والإشراف"
          description="Restriksi perizinan, approval kurikulum, dan pengawasan staf pengajar hanya simulasi. Tidak ada akun atau peran yang diubah."
          chip="Data demo"
        />
      </div>
      <div className="flex justify-end">
        <DemoActionButton
          className="inline-flex items-center gap-1.5 rounded-xl border border-line/70 bg-paper px-3 py-2 text-[10px] font-bold text-ink transition-colors hover:bg-line/30"
          title="Pratinjau — Tambah Staf tidak membuat akun"
          notice="Pratinjau — Tambah Staf hanya membuka rancangan dialog; tidak ada akun yang dibuat."
        >
          <IconPlusCircle className="size-4 text-brand" />
          Tambah Staf
        </DemoActionButton>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {roleCards.map((role) => (
          <div key={role.label} className="rounded-xl bg-paper/70 p-3 text-center">
            <p className={cn("text-[20px] font-bold", role.valueClass)}>{role.count}</p>
            <p className="mt-0.5 text-[10px] text-muted">{role.label}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <ToggleRow
          title="Otorisasi Ganda (2-FA) untuk Ekspor Database Santri"
          description="Membutuhkan persetujuan Super Admin sebelum CSV diunduh (rancangan kebijakan)."
          icon={IconShieldCheck}
          checked={settings.twoFa}
          onChange={() =>
            toggle(
              "twoFa",
              "Pratinjau — otorisasi ganda dinyalakan pada tampilan demo.",
              "Pratinjau — otorisasi ganda dimatikan pada tampilan demo.",
            )
          }
        />
        <ToggleRow
          title="Wajib Verifikasi Sanad & Modul Baru oleh Musyrif Lead"
          description="Materi bank mufrodat & ujian tajwid tidak tayang tanpa tanda tangan digital (ilustrasi)."
          icon={IconCheck}
          checked={settings.sanadApproval}
          onChange={() =>
            toggle(
              "sanadApproval",
              "Pratinjau — verifikasi sanad dinyalakan pada tampilan demo.",
              "Pratinjau — verifikasi sanad dimatikan pada tampilan demo.",
            )
          }
        />
        <ToggleRow
          title="Refund Transaksi VIP Otomatis (Threshold ≤ Rp500.000)"
          description="Admin Keuangan dapat memproses pembatalan tanpa eskalasi (contoh kebijakan)."
          icon={IconReceipt}
          checked={settings.autoRefund}
          onChange={() =>
            toggle(
              "autoRefund",
              "Pratinjau — refund otomatis dinyalakan pada tampilan demo.",
              "Pratinjau — refund otomatis dimatikan pada tampilan demo.",
            )
          }
        />
      </div>
    </section>
  );
}

function GeneralModule({
  settings,
  toggle,
  onNotice,
  profile,
  setProfile,
}: ModuleProps & {
  profile: { name: string; timezone: string; track: string };
  setProfile: (next: { name: string; timezone: string; track: string }) => void;
}) {
  return (
    <section className={panelClass} aria-labelledby="general-heading">
      <div id="general-heading">
        <ModuleHeading
          icon={IconBuilding}
          title="Konfigurasi Umum & Profil Lembaga"
          arabic="إعدادات المؤسسة"
          description="Identitas dan preferensi contoh untuk tampilan admin. Perubahan hanya tersimpan di memori halaman ini, bukan ke basis data."
          chip="Data demo"
        />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-ink">Nama Lembaga</span>
          <input
            type="text"
            value={profile.name}
            onChange={(event) => setProfile({ ...profile, name: event.target.value })}
            className="rounded-xl border border-line/70 bg-paper px-3 py-2.5 text-[11px] text-ink focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-ink">Zona Waktu Operasional</span>
          <select
            value={profile.timezone}
            onChange={(event) => {
              setProfile({ ...profile, timezone: event.target.value });
              onNotice(`Pratinjau — zona waktu "${event.target.value}" dipilih secara lokal.`);
            }}
            className="cursor-pointer rounded-xl border border-line/70 bg-paper px-3 py-2.5 text-[11px] text-ink focus:outline-none"
          >
            <option>Asia/Jakarta (WIB)</option>
            <option>Asia/Makassar (WITA)</option>
            <option>Asia/Jayapura (WIT)</option>
            <option>Asia/Riyadh (AST)</option>
          </select>
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="text-[11px] font-bold text-ink">Jalur Belajar Utama</span>
          <select
            value={profile.track}
            onChange={(event) => {
              setProfile({ ...profile, track: event.target.value });
              onNotice(`Pratinjau — jalur "${event.target.value}" dipilih secara lokal.`);
            }}
            className="cursor-pointer rounded-xl border border-line/70 bg-paper px-3 py-2.5 text-[11px] text-ink focus:outline-none"
          >
            <option>Fushah & Amiyah Saudi</option>
            <option>Fushah saja</option>
            <option>Amiyah Hijazi saja</option>
            <option>Amiyah Najdi saja</option>
          </select>
        </label>
      </div>
      <ToggleRow
        title="Mode Perbaikan Terjadwal"
        description="Rancangan penanda untuk notifikasi pemeliharaan; tidak mengubah status layanan apa pun."
        icon={IconServer}
        checked={settings.maintenance}
        onChange={() =>
          toggle(
            "maintenance",
            "Pratinjau — mode perbaikan dinyalakan pada tampilan demo.",
            "Pratinjau — mode perbaikan dimatikan pada tampilan demo.",
          )
        }
      />
      <div className="flex flex-wrap items-center gap-2">
        <DemoActionButton
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-950 px-3.5 py-2.5 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          notice="Pratinjau — Simpan Perubahan Umum tidak menulis konfigurasi atau basis data."
        >
          <IconSave className="size-4" />
          Simpan Perubahan Umum
        </DemoActionButton>
        <span className="text-[10px] text-muted">Semua bidang adalah data contoh.</span>
      </div>
    </section>
  );
}

function BackupModule({ settings, toggle }: ModuleProps) {
  const schedules = [
    { title: "Backup Database Harian", time: "02:00 WIB", note: "Arsip PostgreSQL & objek storage (contoh)." },
    { title: "Rekalibrasi Model Fonetik", time: "Ahad 03:00", note: "Pembaruan bobot varian makhraj (contoh)." },
    { title: "Rekonsiliasi Faktur VIP", time: "23:59 WIB", note: "Pencocokan QRIS/VA ke ledger kas (contoh)." },
  ];

  return (
    <section className={panelClass} aria-labelledby="backup-heading">
      <div id="backup-heading">
        <ModuleHeading
          icon={IconCloudDownload}
          title="Backup Data & Protokol Keamanan"
          arabic="النسخ الاحتياطي والأمان"
          description="Jadwal, retensi, dan status enkripsi berikut adalah data contoh. Tidak ada backup, unduhan, atau ekspor yang dijalankan."
          chip="Pratinjau"
        />
      </div>
      <div className="flex flex-col gap-2">
        {schedules.map((item) => (
          <div key={item.title} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-paper/70 p-3">
            <div className="flex min-w-0 items-start gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-brand shadow-sm">
                <IconClock className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-bold text-ink">{item.title}</p>
                <p className="mt-0.5 text-[10px] leading-4 text-muted">{item.note}</p>
              </div>
            </div>
            <span className="rounded bg-surface px-2 py-0.5 text-[10px] font-bold text-brand">
              {item.time}
            </span>
          </div>
        ))}
      </div>
      <ToggleRow
        title="Enkripsi Arsip Backup"
        description="Label ilustratif untuk kebijakan retensi; tidak ada berkas yang dienkripsi oleh halaman ini."
        icon={IconLock}
        checked={settings.backupEncryption}
        onChange={() =>
          toggle(
            "backupEncryption",
            "Pratinjau — enkripsi arsip dinyalakan pada tampilan demo.",
            "Pratinjau — enkripsi arsip dimatikan pada tampilan demo.",
          )
        }
      />
      <div className="flex flex-wrap gap-2">
        <DemoActionButton
          className="inline-flex items-center gap-2 rounded-xl border border-line/70 bg-paper px-3.5 py-2.5 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
          notice="Pratinjau — Jalankan Backup Sekarang tidak membuat arsip atau menyalin data."
        >
          <IconCloudDownload className="size-4 text-brand" />
          Jalankan Backup Sekarang
        </DemoActionButton>
        <DemoActionButton
          className="inline-flex items-center gap-2 rounded-xl border border-line/70 bg-paper px-3.5 py-2.5 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
          notice="Pratinjau — Unduh Salinan Terakhir tidak menghasilkan berkas."
        >
          <IconSave className="size-4 text-brand" />
          Unduh Salinan Terakhir
        </DemoActionButton>
      </div>
    </section>
  );
}

function TabBar({ active, onChange }: { active: TabId; onChange: (id: TabId) => void }) {
  return (
    <div
      role="tablist"
      aria-label="Bagian pengaturan sistem"
      className="flex items-center gap-2 overflow-x-auto rounded-2xl border border-line/70 bg-paper p-2"
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-semibold transition-colors",
              isActive
                ? "bg-emerald-950 text-white shadow-sm dark:bg-emerald-900"
                : "text-muted hover:bg-surface hover:text-ink",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="whitespace-nowrap">{tab.label}</span>
            {tab.badge ? (
              <span className="rounded-full bg-sand-200 px-1.5 py-0.5 text-[9px] font-bold text-sand-900">
                {tab.badge}
              </span>
            ) : null}
            {tab.dot ? <span className="size-2 rounded-full bg-brand" /> : null}
          </button>
        );
      })}
    </div>
  );
}

export function SystemSettingsWorkspace({ rail }: { rail: ReactNode }) {
  const [active, setActive] = useState<TabId>("engine");
  const [settings, setSettings] = useState(initialSettings);
  const [profile, setProfile] = useState({
    name: "Lughati Academy",
    timezone: "Asia/Jakarta (WIB)",
    track: "Fushah & Amiyah Saudi",
  });
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const toggle = (key: keyof SettingsState, noticeOn: string, noticeOff: string) => {
    const next = !settings[key];
    setSettings((current) => ({ ...current, [key]: next }));
    setNotice(next ? noticeOn : noticeOff);
  };

  const shared: ModuleProps = { settings, toggle, onNotice: setNotice };

  return (
    <>
      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-8">
          <TabBar active={active} onChange={setActive} />
          {active === "general" ? (
            <GeneralModule {...shared} profile={profile} setProfile={setProfile} />
          ) : null}
          {active === "engine" ? (
            <>
              <AiEngineModule {...shared} />
              <GatewayModule {...shared} />
              <RbacModule {...shared} />
            </>
          ) : null}
          {active === "gateway" ? <GatewayModule {...shared} /> : null}
          {active === "rbac" ? <RbacModule {...shared} /> : null}
          {active === "backup" ? <BackupModule {...shared} /> : null}
          <p className="flex items-start gap-1.5 px-1 text-[10px] leading-4 text-muted">
            <IconInfo className="mt-0.5 size-3.5 shrink-0" />
            Berpindah tab tidak menyimpan apa pun. Nilai slider, switch, dan pilihan hanya berupa
            state lokal halaman dan tidak ditulis ke backend mana pun.
          </p>
        </div>
        <aside aria-label="Kesehatan dan keamanan infrastruktur" className="lg:col-span-4">
          {rail}
        </aside>
      </div>
      {notice ? <DemoToast message={notice} onClose={() => setNotice(null)} /> : null}
    </>
  );
}
