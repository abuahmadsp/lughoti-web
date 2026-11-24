import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { CheckoutOpenButton } from "./checkout-flow";
import { PremiumFaq } from "./premium-faq";
import { PremiumPricing } from "./premium-pricing";
import {
  IconAward,
  IconBadgeCheck,
  IconBook,
  IconChevronRight,
  IconHourglass,
  IconLock,
  IconMinus,
  IconPremium,
  IconShieldCheck,
  IconStar,
  IconZap,
} from "./icons";

type Cell = {
  text?: string;
  icon?: "yes" | "no";
  strong?: boolean;
  tone?: "ink" | "brand" | "muted";
};

const muted = (text: string): Cell => ({ text, tone: "muted" });
const ink = (text: string): Cell => ({ text, tone: "ink" });
const strong = (text: string, tone: "ink" | "brand" = "ink"): Cell => ({
  text,
  strong: true,
  tone,
});
const yes = (): Cell => ({ icon: "yes" });
const no = (): Cell => ({ icon: "no" });

const groups: {
  title: string;
  rows: { feature: string; free: Cell; pro: Cell; vip: Cell }[];
}[] = [
  {
    title: "1. Kurikulum & Ragam Dialek",
    rows: [
      {
        feature: "Materi Fushah (Nahwu, Sharaf, I’rab)",
        free: muted("Hanya Pengenalan (A1)"),
        pro: strong("Lengkap (A1 - B2)", "brand"),
        vip: strong("Lengkap + Balaghah Lanjut"),
      },
      {
        feature: "Modul Amiyah Saudi (Najdi & Hijazi)",
        free: no(),
        pro: strong("500+ Dialog Situasional", "brand"),
        vip: strong("500+ Dialog + Dialek Khusus"),
      },
      {
        feature: "Modul Karir, Bisnis, & Medis Saudi",
        free: no(),
        pro: no(),
        vip: yes(),
      },
      {
        feature: "Percakapan Manasik Haji & Umrah Lengkap",
        free: no(),
        pro: ink("Dasar / Umum"),
        vip: strong("Tuntunan Lengkap 10 Skenario", "brand"),
      },
    ],
  },
  {
    title: "2. Audio & Multimedia Penutur Asli",
    rows: [
      {
        feature: "Batas Kuota Pemutaran Audio",
        free: muted("200 Menit / bln"),
        pro: strong("Tanpa Batas (Unlimited)", "brand"),
        vip: strong("Tanpa Batas (Unlimited)"),
      },
      {
        feature: "Pengatur Kecepatan Audio (0.75x, 1.0x, 1.25x)",
        free: yes(),
        pro: yes(),
        vip: yes(),
      },
      {
        feature: "Unduh Audio untuk Belajar Offline",
        free: no(),
        pro: yes(),
        vip: yes(),
      },
    ],
  },
  {
    title: "3. Latihan, Evaluasi & Kuis",
    rows: [
      {
        feature: "Algoritma Flashcard SRS (Spaced Repetition)",
        free: muted("Dasar (Maks 150 kata)"),
        pro: strong("Aktif (Kosa Kata Tanpa Batas)", "brand"),
        vip: strong("Aktif + Custom Deck Pribadi"),
      },
      {
        feature: "Koreksi Suara AI & Spektrogram Pronunciation",
        free: no(),
        pro: ink("Akses Standar"),
        vip: strong("Prioritas Fast-Lane", "brand"),
      },
      {
        feature: "Pembahasan Detail Tashrif & Kedudukan I’rab",
        free: no(),
        pro: yes(),
        vip: yes(),
      },
    ],
  },
  {
    title: "4. Kredensial, Mentoring & Akses",
    rows: [
      {
        feature: "Sertifikat Kelulusan Resmi Digital",
        free: no(),
        pro: strong("Level A1, A2, B1, B2", "brand"),
        vip: strong("Semua Level + Verifikasi LinkedIn"),
      },
      {
        feature: "Forum Tanya Mu’allim Native",
        free: no(),
        pro: no(),
        vip: yes(),
      },
      {
        feature: "Batas Perangkat Bersamaan",
        free: ink("1 Perangkat"),
        pro: ink("1 Perangkat"),
        vip: strong("2 Perangkat Aktif"),
      },
    ],
  },
];

function Hero() {
  return (
    <section className="relative overflow-hidden pb-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/3 size-80 rounded-full bg-sand-200/60 blur-3xl dark:bg-sand-300/10"
      />

      <div className="relative flex flex-col items-center text-center">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 self-start text-[11px] text-muted"
        >
          <Link
            href="/dashboard"
            className="transition-colors hover:text-brand"
          >
            Lughati
          </Link>
          <IconChevronRight aria-hidden="true" className="size-3 text-line" />
          <span className="font-semibold text-ink">Langganan &amp; Paket Premium</span>
        </nav>

        <div className="mt-5 inline-flex flex-wrap items-center justify-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 shadow-sm dark:bg-emerald-900/30">
          <IconPremium className="size-3.5 text-brand" />
          <span
            lang="ar"
            dir="rtl"
            className="font-arabic text-[15px] font-bold leading-none text-brand"
          >
            خُطَطُ الاشْتِرَاكِ وَالْعُضْوِيَّةِ الْمُمَيَّزَةِ
          </span>
          <span className="pl-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
            PRD 1.0 Curriculum
          </span>
          <span className="rounded-full border border-line/70 bg-surface px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
            Data demo
          </span>
        </div>

        <h1 className="mt-4 max-w-4xl text-balance text-[28px] font-bold leading-tight tracking-tight text-ink sm:text-[36px] sm:leading-[44px]">
          Investasi Terbaik untuk Menguasai{" "}
          <span className="italic text-brand">Fushah Akademik</span> &amp;{" "}
          <span className="text-sand-700 dark:text-sand-300">
            Percakapan Nyata Saudi
          </span>
        </h1>
        <p className="mt-3 max-w-3xl text-[13px] leading-7 text-muted sm:text-[14px]">
          Patahkan mitos bahwa bahasa Arab itu rumit. Nikmati sistem kurikulum
          dual-track terstruktur, audio penutur asli tanpa batas kuota, serta
          sertifikasi digital standar CEFR &amp; ACTFL. (Pratinjau — belum
          tersedia.)
        </p>

        <div className="mt-8 w-full max-w-2xl rounded-2xl border border-line/70 bg-paper p-4 text-left shadow-sm">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3.5">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sand-200 text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
                <IconHourglass className="size-6" />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[12px] font-bold text-ink">
                    Status Anda: Free Member
                  </p>
                  <span className="rounded bg-line/50 px-2 py-0.5 text-[10px] text-muted">
                    Modul Aktif: 4/36
                  </span>
                  <span className="rounded-full border border-line/70 bg-surface px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
                    Data demo
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-muted">
                  Sisa Kuota Audio Bulanan:{" "}
                  <strong className="font-semibold text-brand">
                    142 dari 200 Menit
                  </strong>{" "}
                  (Batas reset 12 hari lagi)
                </p>
              </div>
            </div>
            <a
              href="#pricing-matrix"
              className="shrink-0 rounded-lg bg-emerald-950 px-4 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
            >
              Buka Kuota Penuh
            </a>
          </div>
        </div>

        <div className="mt-10 w-full">
          <PremiumPricing />
        </div>
      </div>
    </section>
  );
}

function Assurance() {
  const items = [
    {
      icon: IconShieldCheck,
      title: "7 Hari Garansi Bebas Risiko",
      text: "Contoh kebijakan: refund 100% dalam 7 hari pertama. Belum ada transaksi nyata pada demo ini.",
      iconClass:
        "bg-emerald-50 text-brand dark:bg-emerald-900/40 dark:text-emerald-200",
    },
    {
      icon: IconBook,
      title: "Standarisasi CEFR & ACTFL",
      text: "Contoh silabus mengacu pada CEFR & ACTFL. Materi masih berstatus review dan belum terverifikasi.",
      iconClass:
        "bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200",
    },
    {
      icon: IconLock,
      title: "Metode Pembayaran Lengkap",
      text: "Rencana metode: QRIS, e-wallet, Virtual Account, kartu kredit. Belum ada payment gateway yang terhubung.",
      iconClass: "bg-paper text-brand",
    },
  ];

  return (
    <section
      aria-label="Jaminan dan kebijakan"
      className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className="flex items-start gap-4 rounded-2xl bg-paper p-6"
          >
            <span
              className={cn(
                "grid size-12 shrink-0 place-items-center rounded-xl",
                item.iconClass,
              )}
            >
              <Icon className="size-6" />
            </span>
            <div>
              <h3 className="mb-1 text-[15px] font-bold text-ink">{item.title}</h3>
              <p className="text-[12px] leading-5 text-muted">{item.text}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

function CellView({ cell, highlight }: { cell: Cell; highlight?: boolean }) {
  return (
    <td
      className={cn(
        "px-5 py-4 text-center text-[12px]",
        highlight && "bg-emerald-50/50 dark:bg-emerald-900/10",
      )}
    >
      {cell.icon === "yes" ? (
        <IconBadgeCheck className="mx-auto size-5 text-brand" />
      ) : null}
      {cell.icon === "no" ? (
        <IconMinus className="mx-auto size-5 text-muted/50" />
      ) : null}
      {cell.text ? (
        <span
          className={cn(
            cell.strong && "font-semibold",
            cell.tone === "brand"
              ? "text-brand"
              : cell.tone === "muted"
                ? "text-muted"
                : "text-ink",
          )}
        >
          {cell.text}
        </span>
      ) : null}
    </td>
  );
}

function ComparisonMatrix() {
  return (
    <section className="mt-16 flex flex-col gap-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-[24px] font-bold tracking-tight text-ink sm:text-[28px]">
          Matriks Perbandingan Fitur Detail
        </h2>
        <p className="mt-2 text-[12px] leading-6 text-muted">
          Pahami perbedaan spesifikasi teknis dan manfaat akademis antar paket
          belajar Lughati (contoh pratinjau).
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line/70 bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="bg-paper text-ink">
                <th className="w-2/5 px-5 py-4 text-[11px] font-bold uppercase tracking-wider">
                  Fitur &amp; Kemampuan Belajar
                </th>
                <th className="w-1/5 px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Paket Gratis
                </th>
                <th className="w-1/5 bg-emerald-50 px-5 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-brand dark:bg-emerald-900/20">
                  Pro Learner
                </th>
                <th className="w-1/5 px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
                  Academic VIP
                </th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <Fragment key={group.title}>
                  <tr className="bg-paper/70">
                    <td
                      colSpan={4}
                      className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-ink"
                    >
                      {group.title}
                    </td>
                  </tr>
                  {group.rows.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-t border-line/60 transition-colors hover:bg-paper/40"
                    >
                      <td className="px-5 py-4 text-[12px] font-medium text-ink">
                        {row.feature}
                      </td>
                      <CellView cell={row.free} />
                      <CellView cell={row.pro} highlight />
                      <CellView cell={row.vip} />
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

const stories = [
  {
    quote:
      "Sebelumnya saya belajar Nahwu bertahun-tahun di pondok tapi lidah tetap kaku saat diajak bicara dialek Saudi di Makkah. Modul Pro Learner Lughati mengawinkan kaidah buku dengan logat Najdi secara sangat natural!",
    name: "Ahmad Fauzi, Lc.",
    role: "Alumni Pesantren & Mahasiswa Pascasarjana",
    initials: "AF",
  },
  {
    quote:
      "Fitur audio tanpa batas dan modul bisnis Saudi di paket VIP sangat membantu persiapan negosiasi kontrak proyek infrastruktur saya di Riyadh. Sangat praktis bisa dipelajari via laptop dan HP saat commuting.",
    name: "Ir. Hendra Wijaya",
    role: "Project Manager di Perusahaan Rekayasa Riyadh",
    initials: "HW",
  },
  {
    quote:
      "Sebagai pembimbing rombongan umrah wanita, skenario percakapan pasar dan bandara di Lughati membuat saya jauh lebih percaya diri membantu para jamaah. Sertifikatnya juga terverifikasi resmi.",
    name: "Maryam Al-Haddad",
    role: "Muthawwifah & Konsultan Travel Umrah",
    initials: "MA",
  },
];

function Stories() {
  return (
    <section className="mt-16 flex flex-col gap-6">
      <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand">
            Kisah Sukses Santri &amp; Profesional
          </span>
          <h2 className="mt-1 text-[24px] font-bold tracking-tight text-ink sm:text-[28px]">
            Contoh Kisah Pembelajar (ilustrasi)
          </h2>
        </div>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }, (_, index) => (
            <IconStar
              key={index}
              className="size-4 fill-current text-sand-400"
            />
          ))}
          <span className="ml-1 text-[11px] font-semibold text-ink">
            Tampilan penilaian (contoh)
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-sand-300/60 bg-sand-100 px-3.5 py-2.5 text-[11px] text-sand-900 dark:border-sand-300/20 dark:bg-sand-300/10 dark:text-sand-200">
        <IconAward className="size-4 shrink-0" />
        Nama, peran, dan kutipan di bawah adalah konten contoh — bukan testimoni
        pembelajar nyata.
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {stories.map((story) => (
          <article
            key={story.name}
            className="flex flex-col justify-between rounded-2xl border border-line/70 bg-surface p-6 shadow-sm"
          >
            <p className="mb-6 text-[12px] italic leading-6 text-muted">
              “{story.quote}”
            </p>
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-emerald-950 to-brand text-[13px] font-bold text-white"
              >
                {story.initials}
              </span>
              <div className="min-w-0">
                <h3 className="text-[12px] font-bold text-ink">{story.name}</h3>
                <p className="text-[10px] text-muted">{story.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative mt-16 overflow-hidden rounded-3xl bg-emerald-950 p-8 text-white shadow-2xl sm:p-12 dark:bg-emerald-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 size-64 rounded-full bg-brand/20 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-12 left-1/3 size-48 rounded-full bg-sand-300/10 blur-2xl"
      />
      <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="max-w-2xl text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-semibold tracking-wide">
            <span
              aria-hidden="true"
              className="size-1.5 animate-pulse rounded-full bg-emerald-300"
            />
            GARANSI 7 HARI UANG KEMBALI (PRATINJAU)
          </span>
          <h2 className="mt-4 text-balance text-[26px] font-bold leading-tight tracking-tight sm:text-[32px]">
            Siap Lancar Berbahasa Arab Baku &amp; Percakapan Saudi dalam 90 Hari?
          </h2>
          <p className="mt-3 max-w-xl text-[12px] leading-6 text-emerald-100">
            Tingkatkan keanggotaan Anda hari ini. Nikmati audio penutur asli
            tanpa batas kuota dan kuasai dialek Najdi-Hijazi bersama kurikulum
            terpadu Lughati. (Ilustrasi — tidak ada pembayaran yang diproses.)
          </p>
        </div>
        <CheckoutOpenButton
          plan="Pro Learner (Dual-Track)"
          title="Pratinjau — membuka modal checkout demo"
          className="flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-sand-200 px-8 py-4 text-[13px] font-bold text-sand-900 shadow-lg transition-colors hover:bg-sand-300 sm:w-auto"
        >
          Aktivasi Pro Sekarang
          <IconZap className="size-4" />
        </CheckoutOpenButton>
      </div>
    </section>
  );
}

export function PremiumPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col pb-8">
      <Hero />
      <Assurance />
      <ComparisonMatrix />
      <Stories />
      <div className="mt-16">
        <PremiumFaq />
      </div>
      <FinalCta />
      <p className="mt-8 text-center text-[10px] leading-5 text-muted">
        Halaman ini adalah pratinjau antarmuka. Harga, promo, garansi,
        sertifikat, dan kisah pembelajar adalah contoh; tidak ada paket,
        pembayaran, maupun akun premium yang dibuat dari demo ini.
      </p>
    </div>
  );
}
