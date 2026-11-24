"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import {
  IconArrowRight,
  IconBot,
  IconChat,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconUser,
} from "./icons";

type PasswordStrength = 0 | 1 | 2 | 3;

function getPasswordStrength(value: string): PasswordStrength {
  if (!value) return 0;

  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value) && /[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;

  return Math.max(1, score) as PasswordStrength;
}

const inputBaseClass =
  "h-11 w-full rounded-xl border border-line/80 bg-paper/60 pl-10 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand/40 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20 sm:text-sm";
const inputClass = `${inputBaseClass} pr-3.5`;
const passwordInputClass = `${inputBaseClass} pr-11`;
const labelClass = "mb-1 block text-[13px] font-semibold text-ink";
const iconClass =
  "pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-muted";
const actionButtonClass =
  "absolute right-1 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-lg text-muted transition-colors hover:bg-paper hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30";

export function RegisterForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const strength = getPasswordStrength(password);
  const passwordsMismatch =
    confirmPassword.length > 0 && confirmPassword !== password;

  const strengthLabel =
    strength === 0
      ? "Belum diisi"
      : strength === 1
        ? "Lemah"
        : strength === 2
          ? "Cukup"
          : "Kuat & Aman";
  const strengthBarClass =
    strength === 1
      ? "bg-red-500"
      : strength === 2
        ? "bg-sand-500"
        : "bg-emerald-600 dark:bg-emerald-300";
  const strengthTextClass =
    strength === 1
      ? "text-red-600 dark:text-red-400"
      : strength === 2
        ? "text-sand-700 dark:text-sand-300"
        : "text-emerald-700 dark:text-emerald-300";

  return (
    <form
      id="register-form"
      className="mt-5 flex w-full flex-col gap-3.5"
      onSubmit={(event) => event.preventDefault()}
    >
      <div>
        <label htmlFor="register-full-name" className={labelClass}>
          Nama Lengkap
        </label>
        <div className="relative">
          <IconUser className={iconClass} />
          <input
            id="register-full-name"
            name="fullName"
            type="text"
            autoComplete="name"
            required
            placeholder="Muhammad Fadhil"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="register-email" className={labelClass}>
          Username atau Email
        </label>
        <div className="relative">
          <IconMail className={iconClass} />
          <input
            id="register-email"
            name="email"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            required
            placeholder="santri@lughati.id"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="register-whatsapp"
            className="block text-[13px] font-semibold text-ink"
          >
            Nomor WhatsApp
          </label>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand">
            <IconBot className="size-3.5" />
            Bot Hafalan
          </span>
        </div>
        <div className="relative mt-1">
          <IconChat className={iconClass} />
          <input
            id="register-whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="081234567890"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="register-password" className={labelClass}>
          Kata Sandi
        </label>
        <div className="relative">
          <IconLock className={iconClass} />
          <input
            id="register-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="Minimal 8 karakter"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-describedby="register-password-strength"
            className={passwordInputClass}
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={
              showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
            }
            aria-pressed={showPassword}
            className={actionButtonClass}
          >
            {showPassword ? (
              <IconEyeOff className="size-5" />
            ) : (
              <IconEye className="size-5" />
            )}
          </button>
        </div>
        <div
          id="register-password-strength"
          aria-live="polite"
          className="mt-2"
        >
          <div className="flex gap-1" aria-hidden="true">
            {[1, 2, 3].map((level) => (
              <span
                key={level}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-colors",
                  strength >= level ? strengthBarClass : "bg-line/80",
                )}
              />
            ))}
          </div>
          <p
            className={cn(
              "mt-1 text-[11px] font-medium",
              strength === 0 ? "text-muted" : strengthTextClass,
            )}
          >
            {strengthLabel}
          </p>
        </div>
      </div>

      <div>
        <label htmlFor="register-confirm-password" className={labelClass}>
          Konfirmasi Kata Sandi
        </label>
        <div className="relative">
          <IconLock className={iconClass} />
          <input
            id="register-confirm-password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            minLength={8}
            required
            placeholder="Ulangi kata sandi"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            aria-invalid={passwordsMismatch}
            aria-describedby={
              passwordsMismatch ? "register-password-mismatch" : undefined
            }
            className={passwordInputClass}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((visible) => !visible)}
            aria-label={
              showConfirmPassword
                ? "Sembunyikan konfirmasi kata sandi"
                : "Tampilkan konfirmasi kata sandi"
            }
            aria-pressed={showConfirmPassword}
            className={actionButtonClass}
          >
            {showConfirmPassword ? (
              <IconEyeOff className="size-5" />
            ) : (
              <IconEye className="size-5" />
            )}
          </button>
        </div>
        {passwordsMismatch ? (
          <p
            id="register-password-mismatch"
            className="mt-1 text-[11px] font-medium text-red-600 dark:text-red-400"
          >
            Konfirmasi kata sandi belum sama.
          </p>
        ) : null}
      </div>

      <label className="flex cursor-pointer select-none items-start gap-2.5 py-1">
        <input
          id="register-terms"
          name="terms"
          type="checkbox"
          required
          className="mt-0.5 size-4 shrink-0 rounded border-line accent-brand focus:ring-2 focus:ring-brand/30"
        />
        <span className="text-xs leading-relaxed text-muted">
          Saya menyetujui{" "}
          <a href="#" className="font-medium text-ink hover:underline">
            Ketentuan Layanan
          </a>{" "}
          &amp;{" "}
          <a href="#" className="font-medium text-ink hover:underline">
            Kebijakan Privasi
          </a>{" "}
          Lughati.
        </span>
      </label>

      <button
        type="submit"
        className="group mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-900/20 transition-all hover:bg-emerald-700 active:scale-[0.99]"
      >
        Daftar Akun
        <IconArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
