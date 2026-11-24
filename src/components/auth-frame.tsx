import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function AuthFrame({
  children,
  maxWidth = "max-w-lg",
}: {
  children: ReactNode;
  maxWidth?: string;
}) {
  return (
    <main className="relative flex min-h-dvh w-full flex-col items-center justify-center bg-paper px-4 py-10 sm:px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-400/10" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-sand-300/25 blur-3xl dark:bg-sand-400/10" />
      </div>

      <div className={cn("relative z-10 w-full", maxWidth)}>
        {children}
        <p className="mt-6 text-center text-[11px] leading-5 text-muted">
          © 2026 Lughati (
          <span className="font-arabic" lang="ar" dir="rtl">
            لغتي
          </span>
          ) Learning Platform. Hak Cipta Terpelihara.
        </p>
      </div>
    </main>
  );
}
