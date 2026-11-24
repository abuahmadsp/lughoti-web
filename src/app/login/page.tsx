import type { Metadata } from "next";
import Link from "next/link";
import { AuthFrame } from "@/components/auth-frame";
import { BrandMark } from "@/components/brand";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Masuk",
  description:
    "Masuk ke akun Lughati untuk melanjutkan belajar bahasa Arab Fushah dan Amiyah Saudi.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <AuthFrame>
      <div className="flex w-full flex-col items-center rounded-3xl border border-line/80 bg-surface p-6 shadow-xl shadow-emerald-950/5 sm:p-8 lg:p-10">
        <div className="mb-6 flex flex-col items-center text-center">
          <Link
            href="/"
            aria-label="Lughati — kembali ke beranda"
            className="rounded-2xl transition-transform hover:scale-105"
          >
            <BrandMark className="size-14 rounded-2xl" />
          </Link>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-semibold tracking-tight text-ink">
              Lughati
            </span>
            <span
              className="font-arabic text-xl leading-none text-brand"
              lang="ar"
              dir="rtl"
            >
              لُغَتِي
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">
            Platform Pembelajaran Bahasa Arab &amp; Al-Qur’an
          </p>
        </div>

        <LoginForm />

        <div className="mt-6 text-center text-sm text-muted">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-semibold text-brand hover:underline"
          >
            Daftar di sini
          </Link>
        </div>
      </div>
    </AuthFrame>
  );
}
