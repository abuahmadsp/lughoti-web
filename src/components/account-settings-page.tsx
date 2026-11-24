import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  AccountActionButton,
  BillingRowActions,
  type InvoiceDetail,
} from "./account-billing-actions";
import { AccountNotifications } from "./account-notifications";
import { AccountPreferences } from "./account-preferences";
import { AccountSettingsTabs } from "./account-settings-tabs";
import { EditProfileOpenButton } from "./edit-profile-flow";
import { VipCardOpenButton } from "./vip-card-flow";
import {
  IconAward,
  IconBadgeCheck,
  IconCalendar,
  IconChat,
  IconCheck,
  IconCreditCard,
  IconGraduation,
  IconInfinity,
  IconLock,
  IconPencil,
  IconPremium,
  IconQrCode,
  IconReceipt,
  IconSettings,
  IconShieldCheck,
  IconSparkles,
  IconStar,
  IconWallet,
  IconZap,
} from "./icons";

const vipFeatures = [
  "Fushah Lengkap Level A1 sampai C2 (Nahwu, Sharaf, dan Balaghah)",
  "500+ Dialog Amiyah Saudi (Najdi Riyadh dan Hijazi Jeddah)",
  "Live Mentoring 1-on-1 dua kali sebulan dengan penutur asli",
  "Koreksi Talaqqi Suara dan pengenalan ucapan (pratinjau)",
  "Grup WhatsApp Privat dan komunitas santri VIP (contoh)",
  "Sertifikat Digital Kompetensi ber-QR code (contoh)",
];

function UpgradeBanner() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sand-300/70 bg-sand-100/70 p-4 dark:border-sand-300/20 dark:bg-sand-300/10">
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-300 text-sand-900">
          <IconSparkles className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[12px] font-bold text-ink">
            Selamat! Status Akun Berhasil Ditingkatkan ke VIP Lifetime (Contoh)
          </p>
          <p
            lang="ar"
            dir="rtl"
            className="font-arabic text-[11px] leading-6 text-muted"
          >
            «تَمَّتِ التَّرْقِيَةُ إِلَى كِبَارِ الشَّخْصِيَّاتِ (VIP) بِنَجَاح - عُضْوِيَّة مَدَى الحَيَاة»
          </p>
        </div>
      </div>
      <span className="rounded-full bg-brand px-3 py-1 text-[10px] font-bold text-white">
        Lunas Seumur Hidup &bull; Contoh
      </span>
    </section>
  );
}

function PageHeader() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6 lg:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 size-56 rounded-full bg-emerald-100/70 blur-3xl dark:bg-emerald-900/20"
      />
      <span
        aria-hidden="true"
        lang="ar"
        dir="rtl"
        className="pointer-events-none absolute -bottom-4 right-8 hidden select-none font-arabic text-[72px] leading-none text-brand/10 lg:block"
      >
        إعدادات الحساب
      </span>

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-[11px]">
            <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
              Akun dan Langganan
            </span>
            <span className="rounded-full border border-line/70 bg-paper px-3 py-1 font-bold text-muted">
              Data demo
            </span>
            <span className="text-muted">&bull;</span>
            <span className="font-medium text-muted">
              Santri ID: LGH-2026-9021
            </span>
          </div>
          <div className="space-y-1">
            <h1 className="text-balance text-[26px] font-bold tracking-tight text-ink sm:text-[32px]">
              Pengaturan Akun dan Manajemen Langganan
            </h1>
            <p
              lang="ar"
              dir="rtl"
              className="font-arabic text-[18px] font-semibold leading-relaxed text-brand sm:text-[22px]"
            >
              «إِعْدَادَاتُ الحِسَابِ وَإِدَارَةُ الاِشْتِرَاكِ»
            </p>
          </div>
          <p className="text-[12px] leading-6 text-muted">
            Kelola profil santri, status paket Pro Learner, preferensi kurikulum
            dual-track, riwayat faktur pembayaran, dan integrasi nomor WhatsApp.
            Seluruh data pada halaman ini adalah contoh untuk pratinjau antarmuka.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start lg:self-end">
          <Link
            href="/dashboard/paket-premium"
            className="rounded-xl border border-line/70 bg-paper px-4 py-2.5 text-[11px] font-semibold text-brand transition-colors hover:bg-line/30"
          >
            Lihat Paket Premium
          </Link>
          <div className="flex items-center gap-3 rounded-xl border border-line/70 bg-paper px-4 py-2.5 shadow-sm">
            <span className="size-2.5 animate-pulse rounded-full bg-gold" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-medium text-muted">
                Status Langganan (Contoh)
              </span>
              <span className="text-[12px] font-bold text-brand">
                VIP Lifetime Aktif
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SubscriptionCard() {
  return (
    <article className="relative flex flex-col gap-6 overflow-hidden rounded-2xl bg-emerald-950 p-5 text-white shadow-xl sm:p-6 lg:p-8 dark:bg-emerald-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 size-72 rounded-full bg-emerald-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 size-56 rounded-full bg-sand-300/20 blur-2xl"
      />

      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-sand-200">
            <IconPremium className="size-4" />
            Paket Berlangganan Saat Ini (Contoh)
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-[22px] font-bold leading-tight sm:text-[26px]">
              VIP Lifetime (Seumur Hidup)
            </h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-sand-200 px-3 py-1 text-[10px] font-bold text-sand-900">
              <IconBadgeCheck className="size-3.5" />
              AKTIF SEUMUR HIDUP
              <span lang="ar" dir="rtl" className="font-arabic">
                / مَدَى الحَيَاة
              </span>
            </span>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[24px] font-bold leading-tight text-sand-200 sm:text-[28px]">
            Rp 250.000
            <span className="ml-1 text-[11px] font-normal text-emerald-100">
              (Lunas Seumur Hidup &bull; Contoh)
            </span>
          </p>
          <p className="text-[10px] text-emerald-100">
            Dibayar sekali &bull; tanpa biaya tahunan sungguhan
          </p>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm sm:grid-cols-3">
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-100">
            <IconInfinity className="size-4" />
            Periode Aktif
          </span>
          <span className="text-[12px] font-bold text-sand-200">
            Akses Seumur Hidup
          </span>
          <span className="text-[10px] text-emerald-100">
            Tidak ada batas waktu (contoh)
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-100">
            <IconCheck className="size-4" />
            Pembaruan Otomatis
          </span>
          <span className="text-[12px] font-bold text-emerald-50">
            Bebas Biaya Perpanjangan
          </span>
          <span className="text-[10px] text-emerald-100">
            Rp 0 &bull; tanpa tagihan lanjutan
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-100">
            <IconWallet className="size-4" />
            Metode Pembayaran
          </span>
          <span className="text-[12px] font-bold text-white">
            GoPay (QRIS dan E-Wallet)
          </span>
          <span className="text-[10px] text-sand-200">
            Transaksi terakhir: Rp 250.000 (Contoh)
          </span>
        </div>
      </div>

      <div className="relative z-10 space-y-3">
        <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-sand-200">
          <IconSparkles className="size-4" />
          Akses Fasilitas dan Hak Istimewa VIP Aktif (Contoh)
        </p>
        <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {vipFeatures.map((feature, index) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 text-[11px] leading-5 text-emerald-50"
            >
              <IconCheck
                className={cn(
                  "mt-0.5 size-4 shrink-0",
                  index % 2 === 0 ? "text-emerald-300" : "text-sand-200",
                )}
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-emerald-900/50 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <VipCardOpenButton className="inline-flex items-center gap-2 rounded-lg border border-sand-300/50 bg-sand-200 px-3 py-2 text-[11px] font-bold text-sand-900 transition-colors hover:bg-sand-300">
            <IconAward className="size-4" />
            Kartu Anggota VIP Digital
          </VipCardOpenButton>
          <AccountActionButton
            label="Kelola Benefit VIP"
            notice="Pratinjau — benefit langganan tidak dapat diubah dari demo ini."
            className="[&>button]:border-white/20 [&>button]:bg-white/10 [&>button]:text-white"
            icon={<IconSettings className="size-4" />}
          />
          <AccountActionButton
            label="Ubah Metode Pembayaran"
            notice="Pratinjau — metode pembayaran tidak tersimpan dan tidak dapat diubah."
            className="[&>button]:border-transparent [&>button]:bg-emerald-400 [&>button]:text-emerald-950"
            icon={<IconCreditCard className="size-4" />}
          />
        </div>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-100">
          <IconBadgeCheck className="size-4" />
          Status: Bebas Langganan Rutin (Contoh)
        </span>
      </div>
    </article>
  );
}

function ProfileSummary() {
  return (
    <aside className="flex h-full flex-col justify-between gap-6 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted">
            Profil Santri
          </span>
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
            Terverifikasi (Contoh)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <span className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-emerald-950 to-brand text-[20px] font-bold text-white shadow-sm">
              FR
            </span>
            <span className="absolute -bottom-1 -right-1 grid size-6 place-items-center rounded-full bg-brand text-white shadow-md">
              <IconGraduation className="size-3.5" />
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-[17px] font-bold text-ink">
              Fathia Rahma
            </h3>
            <p className="truncate text-[11px] text-muted">
              fathia.rahma@example.com
            </p>
            <p
              lang="ar"
              dir="rtl"
              className="mt-1 font-arabic text-[11px] text-brand"
            >
              VIP Lifetime Member &bull; طَالِبَةٌ مُمَيَّزَة
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-paper px-3 py-2 text-[11px]">
            <span className="flex items-center gap-2 text-muted">
              <IconBadgeCheck className="size-4" />
              ID Santri
            </span>
            <span className="font-mono font-semibold text-ink">
              LGH-2026-9021
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-paper px-3 py-2 text-[11px]">
            <span className="flex items-center gap-2 text-muted">
              <IconCalendar className="size-4" />
              Bergabung Sejak
            </span>
            <span className="font-semibold text-ink">10 November 2026</span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-paper px-3 py-2 text-[11px]">
            <span className="flex items-center gap-2 text-muted">
              <IconChat className="size-4 text-brand" />
              WhatsApp Bot
            </span>
            <span className="font-mono font-semibold text-brand">
              +62 812-3456-7890
            </span>
          </div>
        </div>

        <div className="space-y-2 rounded-xl border border-line/70 bg-paper p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-muted">
              Penguasaan Kosakata (SRS)
            </span>
            <span className="text-[12px] font-bold text-brand">842 Kata</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-line/60">
            <div className="h-full w-[72%] rounded-full bg-brand" />
          </div>
          <div className="flex justify-between text-[10px] text-muted">
            <span>Target Level B1: 1.200 Kata</span>
            <span className="font-bold text-ink">72%</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 pt-2">
        <EditProfileOpenButton className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-950 px-3 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800">
          <IconPencil className="size-4" />
          Edit Profil
        </EditProfileOpenButton>
        <EditProfileOpenButton className="rounded-lg border border-line/70 bg-paper px-3 py-2.5 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30">
          Ganti Foto
        </EditProfileOpenButton>
      </div>
    </aside>
  );
}

function ProfileDetail() {
  const rows = [
    { label: "Nama lengkap", value: "Fathia Rahma (contoh)" },
    { label: "Email", value: "fathia.rahma@example.com" },
    { label: "Nomor WhatsApp", value: "+62 812-3456-7890 (contoh)" },
    { label: "Santri ID", value: "LGH-2026-9021" },
    { label: "Bergabung", value: "10 November 2026 (contoh)" },
    { label: "Status verifikasi", value: "Terverifikasi — ilustrasi" },
  ];

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="space-y-1">
        <h2 className="flex items-center gap-2 text-[18px] font-bold text-ink">
          <IconBadgeCheck className="size-5 text-brand" />
          Data Akun Santri
        </h2>
        <p className="text-[12px] leading-5 text-muted">
          Ringkasan identitas demo yang terhubung dengan langganan. Tidak ada
          data yang diverifikasi atau disimpan di server.
        </p>
      </div>
      <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex flex-col gap-1 rounded-xl bg-paper p-3"
          >
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-muted">
              {row.label}
            </dt>
            <dd className="break-all text-[12px] font-semibold text-ink">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="flex flex-wrap gap-2 border-t border-line/60 pt-4">
        <AccountActionButton
          label="Ubah Email"
          notice="Pratinjau — perubahan email tidak diproses."
        />
        <AccountActionButton
          label="Ubah Nomor WhatsApp"
          notice="Pratinjau — nomor WhatsApp tidak diperbarui."
        />
        <AccountActionButton
          label="Verifikasi Data"
          notice="Pratinjau — tidak ada proses verifikasi identitas sungguhan."
        />
      </div>
    </section>
  );
}

const invoiceDetails: Record<string, InvoiceDetail> = {
  "INV/2026/LGH/11/9028": {
    number: "INV/2026/LGH/11/9028",
    reference: "PAY-LGH-VIP-20261128 (Contoh)",
    date: "10 Nov 2026, 14.32 WIB",
    packageName: "Upgrade VIP Lifetime (Prorata Trade-in)",
    description:
      "Contoh transaksi upgrade dengan kredit Pro aktif sebagai trade-in. Tidak ada pembayaran sungguhan.",
    method: "GoPay (Instant)",
    total: "Rp 250.000",
    status: "lunas",
    holder: "Fathia Rahma",
    santriId: "LGH-2026-9021",
    voucher: "Promo Upgrade VIP (Contoh)",
    note: "Faktur contoh untuk pratinjau antarmuka. PDF, kuitansi, dan status pembayaran tidak diterbitkan atau diverifikasi.",
  },
  "INV/2026/LGH/11/9021": {
    number: "INV/2026/LGH/11/9021",
    reference: "PAY-LGH-PRO-20261121 (Contoh)",
    date: "10 Nov 2026, 09.14 WIB",
    packageName: "Pro Learner (12 Bulan)",
    description:
      "Contoh langganan Pro Learner selama dua belas bulan dengan voucher ilustratif.",
    method: "GoPay (QRIS)",
    total: "Rp 250.000",
    status: "lunas",
    holder: "Fathia Rahma",
    santriId: "LGH-2026-9021",
    voucher: "FUSHAHPRO35 (Contoh)",
    note: "Faktur contoh untuk pratinjau antarmuka. PDF, kuitansi, dan status pembayaran tidak diterbitkan atau diverifikasi.",
  },
  "INV/2026/LGH/10/0104": {
    number: "INV/2026/LGH/10/0104",
    reference: "TRIAL-LGH-A1-20261004 (Contoh)",
    date: "10 Okt 2026, 14.22 WIB",
    packageName: "Uji Coba Modul Pemula A1 (7 Hari)",
    description:
      "Contoh pendaftaran uji coba tujuh hari. Tidak ada akses modul sungguhan dari faktur ini.",
    method: "Sistem Pendaftaran",
    total: "Rp 0",
    status: "selesai",
    holder: "Fathia Rahma",
    santriId: "LGH-2026-9021",
    note: "Faktur contoh untuk pratinjau antarmuka. PDF, kuitansi, dan status pendaftaran tidak diterbitkan atau diverifikasi.",
  },
};

function BillingHistory() {
  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-2xl space-y-1">
          <h2 className="flex items-center gap-2 text-[18px] font-bold text-ink">
            <IconReceipt className="size-5 text-brand" />
            Riwayat Pembayaran dan Unduh Faktur
          </h2>
          <p className="text-[12px] leading-5 text-muted">
            Arsip faktur contoh untuk keperluan ilustrasi verifikasi dan
            reimbursement. Tidak ada dokumen sungguhan yang diterbitkan.
          </p>
        </div>
        <AccountActionButton
          label="Kendala Penagihan? Hubungi CS"
          notice="Pratinjau — dukungan WhatsApp tidak tersedia pada demo ini."
          icon={<IconChat className="size-4" />}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse text-left">
          <thead>
            <tr className="bg-paper text-[10px] font-bold uppercase tracking-wider text-muted">
              <th className="rounded-l-lg px-4 py-3">Nomor Faktur</th>
              <th className="px-4 py-3">Tanggal Transaksi</th>
              <th className="px-4 py-3">Paket dan Layanan</th>
              <th className="px-4 py-3">Metode Bayar</th>
              <th className="px-4 py-3">Total Tagihan</th>
              <th className="px-4 py-3">Status</th>
              <th className="rounded-r-lg px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line/70 text-[11px]">
            <tr className="bg-sand-100/50 dark:bg-sand-300/5">
              <td className="px-4 py-4 font-mono font-bold text-ink">
                INV/2026/LGH/11/9028
              </td>
              <td className="px-4 py-4 text-muted">10 Nov 2026, 14.32 WIB</td>
              <td className="px-4 py-4">
                <p className="font-semibold text-ink">
                  Upgrade VIP Lifetime (Prorata Trade-in)
                </p>
                <p className="mt-1 flex items-center gap-1 text-[10px] font-semibold text-brand">
                  <IconSparkles className="size-3" />
                  Promo Upgrade VIP (Contoh)
                </p>
              </td>
              <td className="px-4 py-4 text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <IconZap className="size-4 text-brand" />
                  GoPay (Instant)
                </span>
              </td>
              <td className="px-4 py-4 font-bold text-ink">Rp 250.000</td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
                  <IconCheck className="size-3" />
                  Lunas
                </span>
              </td>
              <td className="px-4 py-4">
                <BillingRowActions
                  invoice="INV/2026/LGH/11/9028"
                  kind="invoice"
                  detail={invoiceDetails["INV/2026/LGH/11/9028"]}
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-4 font-mono font-semibold text-ink">
                INV/2026/LGH/11/9021
              </td>
              <td className="px-4 py-4 text-muted">10 Nov 2026, 09.14 WIB</td>
              <td className="px-4 py-4">
                <p className="font-semibold text-ink">Pro Learner (12 Bulan)</p>
                <p className="mt-1 text-[10px] font-medium text-brand">
                  Voucher: FUSHAHPRO35 (Contoh)
                </p>
              </td>
              <td className="px-4 py-4 text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <IconQrCode className="size-4 text-brand" />
                  GoPay (QRIS)
                </span>
              </td>
              <td className="px-4 py-4 font-bold text-ink">Rp 250.000</td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
                  <IconCheck className="size-3" />
                  Lunas
                </span>
              </td>
              <td className="px-4 py-4">
                <BillingRowActions
                  invoice="INV/2026/LGH/11/9021"
                  kind="invoice"
                  detail={invoiceDetails["INV/2026/LGH/11/9021"]}
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-4 font-mono text-muted">
                INV/2026/LGH/10/0104
              </td>
              <td className="px-4 py-4 text-muted">10 Okt 2026, 14.22 WIB</td>
              <td className="px-4 py-4">
                <p className="font-medium text-ink">
                  Uji Coba Modul Pemula A1
                </p>
                <p className="mt-1 text-[10px] text-muted">
                  Akses 7 Hari Percobaan (Contoh)
                </p>
              </td>
              <td className="px-4 py-4 text-muted">Sistem Pendaftaran</td>
              <td className="px-4 py-4 font-medium text-muted">
                Rp 0 (Free Trial)
              </td>
              <td className="px-4 py-4">
                <span className="rounded-full bg-paper px-2.5 py-1 font-medium text-muted">
                  Selesai
                </span>
              </td>
              <td className="px-4 py-4">
                <BillingRowActions
                  invoice="INV/2026/LGH/10/0104"
                  kind="trial"
                  detail={invoiceDetails["INV/2026/LGH/10/0104"]}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-paper p-4 text-[11px] text-muted">
        <span className="flex items-start gap-2">
          <IconShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
          Contoh narasi keamanan: transaksi diproses melalui gateway
          terenkripsi. Tidak ada gerbang pembayaran sungguhan pada demo ini.
        </span>
        <span className="font-mono text-[10px]">
          NPWP: 01.992.834.1-012.000 (Contoh)
        </span>
      </div>
    </section>
  );
}

function SecurityPanel() {
  const items = [
    {
      icon: IconLock,
      title: "Verifikasi dua langkah (contoh)",
      note: "Belum diaktifkan — pengaturan ini hanya ilustrasi.",
    },
    {
      icon: IconShieldCheck,
      title: "Perlindungan perangkat (contoh)",
      note: "2 perangkat ditampilkan pada tab Notifikasi WhatsApp.",
    },
    {
      icon: IconStar,
      title: "Riwayat aktivitas akun (contoh)",
      note: "Tidak ada log login sungguhan yang disimpan.",
    },
  ];

  return (
    <section className="flex flex-col gap-5 rounded-2xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h2 className="flex items-center gap-2 text-[18px] font-bold text-ink">
            <IconShieldCheck className="size-5 text-brand" />
            Keamanan Akun
          </h2>
          <p className="text-[12px] leading-5 text-muted">
            Ringkasan fitur keamanan pratinjau. Tidak ada kata sandi, token, atau
            perangkat sungguhan yang diakses dari halaman ini.
          </p>
        </div>
        <span className="rounded-full border border-line/70 bg-paper px-2.5 py-1 text-[10px] font-bold text-muted">
          Pratinjau
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="flex flex-col gap-2 rounded-xl border border-line/70 bg-paper p-4"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-surface text-brand">
                <Icon className="size-5" />
              </span>
              <p className="text-[12px] font-bold text-ink">{item.title}</p>
              <p className="text-[10px] leading-4 text-muted">{item.note}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line/60 pt-4">
        <AccountActionButton
          label="Ubah Kata Sandi"
          notice="Pratinjau — kata sandi tidak diubah atau disimpan."
        />
        <AccountActionButton
          label="Periksa Perangkat"
          notice="Pratinjau — tidak ada perangkat sungguhan yang diperiksa."
        />
        <AccountActionButton
          label="Lapor Masalah"
          notice="Pratinjau — laporan tidak dikirim ke tim mana pun."
        />
      </div>
    </section>
  );
}

export function AccountSettingsPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 pb-8">
      <UpgradeBanner />
      <PageHeader />

      <AccountSettingsTabs
        panels={{
          paket: (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-8">
                <SubscriptionCard />
              </div>
              <div className="lg:col-span-4">
                <ProfileSummary />
              </div>
            </div>
          ),
          profil: (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <ProfileSummary />
              </div>
              <div className="lg:col-span-8">
                <ProfileDetail />
              </div>
            </div>
          ),
          preferensi: <AccountPreferences />,
          riwayat: <BillingHistory />,
          notifikasi: <AccountNotifications />,
          keamanan: <SecurityPanel />,
        }}
      />

      <p className="text-center text-[10px] leading-5 text-muted">
        Halaman ini adalah pratinjau antarmuka. Status VIP, Santri ID, nomor
        faktur, nominal pembayaran, kiriman WhatsApp dan email, sesi perangkat,
        serta preferensi belajar adalah contoh. Tidak ada akun, langganan,
        pembayaran, sertifikat, atau data pribadi sungguhan yang dibuat,
        diverifikasi, atau disimpan.
      </p>
    </div>
  );
}
