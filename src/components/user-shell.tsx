"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BrandMark } from "./brand";
import {
  IconAward,
  IconBook,
  IconCards,
  IconChart,
  IconChat,
  IconChevronDown,
  IconClipboard,
  IconGrid,
  IconHeadphones,
  IconMenu,
  IconMic,
  IconRoute,
  IconSearch,
  IconSettings,
  IconSparkles,
  IconX,
} from "./icons";
import { ThemeToggle } from "./theme-toggle";

type NavItem = {
  key: UserNavKey;
  label: string;
  href: string;
  icon: typeof IconAward;
  badge?: string;
};

const navItems: NavItem[] = [
  {
    key: "beranda",
    label: "Dashboard (Beranda)",
    href: "/dashboard",
    icon: IconGrid,
  },
  {
    key: "jalur-belajar",
    label: "Jalur Belajar",
    href: "/dashboard/jalur-belajar",
    icon: IconRoute,
  },
  {
    key: "materi",
    label: "Materi & Modul",
    href: "/dashboard/materi-dan-modul",
    icon: IconBook,
  },
  {
    key: "percakapan",
    label: "Percakapan & Dialog",
    href: "/dashboard/percakapan-dan-dialog",
    icon: IconMic,
  },
  {
    key: "kosakata",
    label: "Kosakata & Flashcard",
    href: "/dashboard/kosakata-dan-flashcard",
    icon: IconCards,
  },
  {
    key: "latihan",
    label: "Latihan & Kuis",
    href: "/dashboard/latihan-dan-kuis",
    icon: IconClipboard,
  },
  {
    key: "progres",
    label: "Progres & Evaluasi",
    href: "/dashboard/progres-dan-evaluasi",
    icon: IconChart,
  },
  {
    key: "premium",
    label: "Paket Premium",
    href: "/dashboard/paket-premium",
    icon: IconAward,
    badge: "PROMO",
  },
  {
    key: "pengaturan",
    label: "Pengaturan Akun",
    href: "/dashboard/pengaturan-akun",
    icon: IconSettings,
  },
];

export type UserNavKey =
  | "beranda"
  | "jalur-belajar"
  | "materi"
  | "percakapan"
  | "kosakata"
  | "latihan"
  | "progres"
  | "premium"
  | "pengaturan";

type Track = "fushah" | "amiyah";

export function UserShell({
  children,
  active = "beranda",
}: {
  children: ReactNode;
  active?: UserNavKey;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [track, setTrack] = useState<Track>("fushah");

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function goToTrack(next: Track) {
    setTrack(next);
    window.dispatchEvent(
      new CustomEvent<Track>("lughati:track-change", { detail: next }),
    );
    requestAnimationFrame(() => {
      const target =
        document.getElementById(next) ??
        document.getElementById(`track-${next}`);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  return (
    <div className="min-h-dvh bg-paper">
      <aside
        id="user-sidebar"
        aria-label="Navigasi peserta"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line/80 bg-surface transition-transform duration-300 lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex items-center gap-3 border-b border-line/70 bg-paper/60 px-4 py-4">
            <BrandMark className="size-10 rounded-xl" />
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[15px] font-bold tracking-tight text-ink">
                  Lughati
                </span>
                <span
                  className="font-arabic text-[13px] font-bold leading-none text-brand"
                  lang="ar"
                  dir="rtl"
                >
                  لُغَتِي
                </span>
              </div>
              <p className="mt-1 text-[11px] font-medium text-muted">
                Belajar Bahasa Arab
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Tutup menu navigasi"
              className="grid size-9 shrink-0 place-items-center rounded-lg border border-line/80 text-muted transition-colors hover:bg-surface hover:text-ink lg:hidden"
            >
              <IconX className="size-5" />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.key === active;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-colors",
                      isActive
                        ? "bg-emerald-950 font-semibold text-white shadow-sm dark:bg-emerald-900"
                        : "text-muted hover:bg-paper hover:text-ink",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-5 shrink-0",
                        item.key === "premium" && !isActive && "text-gold",
                      )}
                    />
                    <span className="min-w-0 flex-1 truncate">{item.label}</span>
                    {item.badge ? (
                      <span className="shrink-0 rounded-full bg-sand-200 px-2 py-0.5 text-[9px] font-bold tracking-tight text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        <div className="border-t border-line/70 bg-paper/60 p-3">
          <div className="flex flex-col gap-3 rounded-xl border border-line/70 bg-surface p-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-brand">
                  <IconHeadphones className="size-4" />
                  Audio Quota
                </span>
                <span className="text-[11px] text-muted">142 / 200 min</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-line/60">
                <div
                  className="h-full rounded-full bg-brand"
                  style={{ width: "71%" }}
                />
              </div>
            </div>
            <div className="flex items-center justify-between gap-2 pt-0.5 text-[11px] text-muted">
              <a
                href="#"
                className="flex items-center gap-1 transition-colors hover:text-ink"
              >
                <IconChat className="size-3.5" />
                Bantuan
              </a>
              <span>v2.4 Academic</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-1 rounded-lg bg-line/40 p-0.5">
              <span className="rounded bg-surface px-2 py-1 text-[11px] font-semibold text-ink shadow-sm">
                ID
              </span>
              <button
                type="button"
                disabled
                title="Antarmuka berbahasa Arab belum tersedia"
                lang="ar"
                className="rounded px-2 py-1 text-[11px] text-muted transition-colors hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
              >
                العربية
              </button>
            </div>
            <ThemeToggle className="size-9" />
          </div>
        </div>
      </aside>

      {menuOpen ? (
        <button
          type="button"
          aria-label="Tutup menu navigasi"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-emerald-950/50 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/85 backdrop-blur-xl">
          <div className="flex h-20 items-center gap-2 px-4 sm:gap-4 sm:px-6">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu navigasi"
              aria-controls="user-sidebar"
              aria-expanded={menuOpen}
              className="grid size-10 shrink-0 place-items-center rounded-lg border border-line/80 text-muted transition-colors hover:bg-surface hover:text-ink lg:hidden"
            >
              <IconMenu className="size-5" />
            </button>

            <Link
              href="/"
              aria-label="Lughati — kembali ke beranda"
              className="flex items-center gap-2 lg:hidden"
            >
              <BrandMark className="size-8 rounded-lg" />
              <span className="text-sm font-bold tracking-tight">Lughati</span>
            </Link>

            <div className="hidden flex-1 items-center gap-3 md:flex">
              <div className="flex w-full max-w-xl items-center rounded-xl border border-line/80 bg-surface px-3.5 py-2 text-muted shadow-sm">
                <IconSearch className="mr-2 size-5 shrink-0" />
                <input
                  type="search"
                  name="dashboard-search"
                  placeholder="Cari mufrodat, tashrif, tata bahasa, atau dialog…"
                  aria-label="Cari materi belajar"
                  className="w-full bg-transparent text-[13px] text-ink placeholder:text-muted/70 focus:outline-none"
                />
                <kbd className="hidden shrink-0 rounded bg-line/40 px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-muted sm:inline">
                  ⌘K
                </kbd>
              </div>

              <div className="hidden items-center rounded-xl border border-line/70 bg-paper p-1 xl:flex">
                <button
                  type="button"
                  onClick={() => goToTrack("fushah")}
                  aria-pressed={track === "fushah"}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors",
                    track === "fushah"
                      ? "bg-surface text-brand shadow-sm"
                      : "text-muted hover:text-ink",
                  )}
                >
                  <span className="size-2 rounded-full bg-brand" />
                  Fushah (
                  <span lang="ar" dir="rtl">
                    الفصحى
                  </span>
                  )
                </button>
                <button
                  type="button"
                  onClick={() => goToTrack("amiyah")}
                  aria-pressed={track === "amiyah"}
                  className={cn(
                    "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-medium transition-colors",
                    track === "amiyah"
                      ? "bg-surface text-ink shadow-sm"
                      : "text-muted hover:text-ink",
                  )}
                >
                  <span className="size-2 rounded-full bg-sand-400" />
                  Amiyah Saudi (
                  <span lang="ar" dir="rtl">
                    العامية
                  </span>
                  )
                </button>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2 sm:gap-3">
              <div className="hidden items-center gap-2 lg:flex">
                <span className="flex items-center gap-1.5 rounded-xl bg-sand-200 px-3 py-1.5 text-[12px] font-semibold text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
                  <span aria-hidden="true">🔥</span>
                  7 Hari Beruntun
                </span>
                <span className="flex items-center gap-1.5 rounded-xl bg-emerald-100 px-3 py-1.5 text-[12px] font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200">
                  <IconSparkles className="size-4 text-brand" />
                  1.480 XP
                </span>
              </div>

              <span className="hidden h-8 w-px bg-line/80 lg:block" />

              <Link
                href="#premium"
                className="group flex items-center gap-2.5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-950 text-[12px] font-bold text-white dark:bg-emerald-900">
                  FR
                </span>
                <span className="hidden flex-col text-left md:flex">
                  <span className="flex items-center gap-1 text-[12px] font-bold leading-tight text-ink">
                    Fathia Rahma
                    <IconChevronDown className="size-3.5 text-muted transition-transform group-hover:translate-y-0.5" />
                  </span>
                  <span className="text-[10px] font-medium leading-none text-brand">
                    Free Member (Upgrade Pro)
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
