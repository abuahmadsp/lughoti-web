import type { Metadata } from "next";
import Link from "next/link";
import { AuthFrame } from "@/components/auth-frame";
import { BrandMark } from "@/components/brand";
import { RegisterForm } from "@/components/register-form";

export const metadata: Metadata = {
  title: "Daftar Akun",
  description:
    "Buat akun Lughati untuk mulai belajar bahasa Arab Fushah dan Amiyah Saudi.",
  alternates: { canonical: "/register" },
};

export default function RegisterPage() {
  return (
    <AuthFrame maxWidth="max-w-md">
      <div className="flex w-full flex-col rounded-3xl border border-line/80 bg-surface p-6 shadow-xl shadow-emerald-950/5 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <Link
            href="/"
            aria-label="Lughati — kembali ke beranda"
            className="rounded-2xl transition-transform hover:scale-105"
          >
            <BrandMark className="size-12 rounded-2xl" />
          </Link>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-bold tracking-tight text-ink">
              Lughati
            </span>
            <span aria-hidden="true" className="text-line">
              |
            </span>
            <span
              className="font-arabic text-lg font-semibold text-brand"
              lang="ar"
              dir="rtl"
            >
              لُغَتِي
            </span>
          </div>
          <p className="mt-0.5 text-sm text-muted">
            Platform Pembelajaran Bahasa Arab &amp; Al-Qur’an
          </p>
        </div>

        <div className="mt-5 text-center">
          <h1 className="text-xl font-semibold text-ink">Daftar Akun Baru</h1>
          <p className="mt-0.5 text-sm text-muted">
            Mulai perjalanan belajar bahasa Arab &amp; Al-Qur’an Anda
          </p>
        </div>

        <RegisterForm />

        <div className="mt-5 border-t border-line/70 pt-4 text-center text-sm text-muted">
          Sudah punya akun?{" "}
          <Link
            href="/login"
            className="font-semibold text-brand hover:underline"
          >
            Masuk di sini
          </Link>
        </div>
      </div>
    </AuthFrame>
  );
}
