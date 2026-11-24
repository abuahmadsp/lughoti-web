"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { IconChevronDown } from "./icons";

const items = [
  {
    q: "Apa perbedaan utama antara jalur Fushah dan Amiyah Saudi dalam paket Pro?",
    a: "Fushah adalah bahasa Arab baku standar internasional yang digunakan untuk literatur, Al-Qur’an, naskah akademik, dan berita resmi. Sedangkan Amiyah Saudi (khususnya dialek Najdi dan Hijazi) adalah bahasa percakapan praktis sehari-hari yang dipakai penutur asli di Arab Saudi. Di Lughati, Anda mendapatkan kedua jalur ini secara terintegrasi sehingga paham kaidah gramatika sekaligus tidak kaku saat bercakap di bandara atau pasar.",
  },
  {
    q: "Apakah saya bisa membatalkan langganan kapan saja?",
    a: "Ya. Anda memegang kendali penuh atas langganan melalui halaman Pengaturan Akun. Jika membatalkan paket bulanan atau tahunan, akses tetap aktif hingga akhir siklus penagihan berjalan dan tidak akan ada perpanjangan otomatis berikutnya. (Ilustrasi — tidak ada langganan nyata pada demo ini.)",
  },
  {
    q: "Bagaimana prosedur klaim garansi uang kembali 7 hari?",
    a: "Cukup hubungi tim support akademik melalui tombol ‘Bantuan’ di sidebar atau WhatsApp resmi dalam kurun waktu 7x24 jam sejak transaksi pertama. Kami akan memproses pengembalian dana 100% tanpa meminta alasan yang memberatkan. (Contoh kebijakan — belum ada pembayaran yang diproses.)",
  },
  {
    q: "Apakah sertifikat Lughati dapat digunakan untuk portofolio akademik/kerja?",
    a: "Setiap sertifikat kelulusan level Lughati dilengkapi kode verifikasi online QR unik dan standar leveling CEFR mulai dari A1 hingga B2, serta dapat ditautkan ke profil LinkedIn atau CV profesional. (Pratinjau — sertifikat pada demo ini bukan dokumen resmi.)",
  },
  {
    q: "Metode pembayaran apa saja yang didukung oleh sistem Lughati?",
    a: "Rencana metode pembayaran mencakup QRIS, dompet digital (GoPay, OVO, DANA, ShopeePay), Virtual Account otomatis, serta kartu kredit Visa/MasterCard. Semuanya masih pratinjau — tidak ada metode pembayaran yang aktif saat ini.",
  },
];

export function PremiumFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="flex flex-col gap-6">
      <div className="text-center">
        <h2 className="text-[24px] font-bold tracking-tight text-ink sm:text-[28px]">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h2>
        <p className="mx-auto mt-2 max-w-2xl text-[12px] leading-6 text-muted">
          Punya pertanyaan sebelum bergabung? Kami rangkum contoh jawaban yang
          paling sering ditanyakan calon pembelajar.
        </p>
        <p className="mt-2 text-[10px] font-semibold text-brand">
          Jawaban berikut adalah pratinjau — bukan kebijakan atau transaksi nyata.
        </p>
      </div>

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-3">
        {items.map((item, index) => {
          const isOpen = open === index;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-xl border border-line/70 bg-surface shadow-sm"
            >
              <h3>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`premium-faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-paper/70 sm:px-6"
                >
                  <span className="text-[13px] font-semibold leading-5 text-ink sm:text-[14px]">
                    {item.q}
                  </span>
                  <IconChevronDown
                    className={cn(
                      "size-4 shrink-0 text-muted transition-transform duration-300",
                      isOpen && "rotate-180 text-brand",
                    )}
                  />
                </button>
              </h3>
              <div
                id={`premium-faq-panel-${index}`}
                role="region"
                className={cn(
                  "grid transition-all duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-4 text-[12px] leading-6 text-muted sm:px-6">
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
