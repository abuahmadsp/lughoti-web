"use client";

import { useState } from "react";
import { IconEye, IconEyeOff, IconLogin, IconUser } from "./icons";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="mt-6 w-full space-y-4"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="space-y-1.5">
        <label
          htmlFor="login-username"
          className="block text-[13px] font-semibold text-ink"
        >
          Username atau Email
        </label>
        <div className="flex items-center overflow-hidden rounded-xl border border-line/80 bg-paper/60 transition-colors focus-within:border-brand/40 focus-within:bg-surface focus-within:ring-2 focus-within:ring-brand/20">
          <input
            id="login-username"
            name="username"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            spellCheck={false}
            required
            placeholder="Masukkan username atau email"
            className="w-full bg-transparent px-3.5 py-3 text-base text-ink placeholder:text-muted/70 focus:outline-none sm:text-sm"
          />
          <IconUser className="mr-3.5 size-5 shrink-0 text-muted" />
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-3">
          <label
            htmlFor="login-password"
            className="block text-[13px] font-semibold text-ink"
          >
            Password
          </label>
          <a
            href="#"
            className="text-[11px] font-semibold text-brand hover:underline"
          >
            Lupa kata sandi?
          </a>
        </div>
        <div className="flex items-center overflow-hidden rounded-xl border border-line/80 bg-paper/60 transition-colors focus-within:border-brand/40 focus-within:bg-surface focus-within:ring-2 focus-within:ring-brand/20">
          <input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="Masukkan kata sandi"
            className="w-full bg-transparent px-3.5 py-3 text-base text-ink placeholder:text-muted/70 focus:outline-none sm:text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword((visible) => !visible)}
            aria-label={
              showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
            }
            aria-pressed={showPassword}
            className="mr-1 grid size-10 shrink-0 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
          >
            {showPassword ? (
              <IconEyeOff className="size-5" />
            ) : (
              <IconEye className="size-5" />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-emerald-900/20 transition-all hover:bg-emerald-700 active:scale-[0.99]"
      >
        Masuk ke Akun
        <IconLogin className="size-5 transition-transform group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
