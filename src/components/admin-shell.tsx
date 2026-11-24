"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { BrandMark } from "./brand";
import {
  IconBadgeCheck,
  IconBell,
  IconBook,
  IconChart,
  IconGraduation,
  IconGrid,
  IconLanguages,
  IconLogout,
  IconMenu,
  IconPlus,
  IconSearch,
  IconSettings,
  IconUser,
  IconX,
} from "./icons";
import { ThemeToggle } from "./theme-toggle";

const navGroups = [
  {
    title: "Manajemen Utama",
    items: [
      { label: "Ringkasan / Overview", href: "/admin", icon: IconGrid },
      {
        label: "Santri & Ujian",
        href: "/admin/santri-dan-ujian",
        icon: IconGraduation,
      },
      {
        label: "Kurikulum & Mufrodat",
        href: "/admin/kurikulum-dan-mufrodat",
        icon: IconBook,
      },
      {
        label: "AI Talaqqi Analytics",
        href: "/admin/ai-talaqqi-analytics",
        icon: IconChart,
        badge: "Dual",
      },
      {
        label: "Transaksi & VIP",
        href: "/admin/transaksi-dan-vip",
        icon: IconBadgeCheck,
      },
    ],
  },
  {
    title: "Infrastruktur",
    items: [
      {
        label: "Pengaturan Sistem",
        href: "/admin/pengaturan-sistem",
        icon: IconSettings,
      },
    ],
  },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="min-h-dvh bg-paper">
      <aside
        id="admin-sidebar"
        aria-label="Navigasi admin"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-line/80 bg-surface transition-transform duration-300 lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 border-b border-line/70 px-4 py-4">
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
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              Admin &amp; Akademi
            </p>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Tutup menu navigasi"
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-line/80 text-muted transition-colors hover:bg-paper hover:text-ink lg:hidden"
          >
            <IconX className="size-5" />
          </button>
        </div>

        <div className="px-3 pt-4">
          <div className="flex items-center justify-between gap-2 rounded-xl border border-line/70 bg-paper/60 px-3 py-2">
            <span className="flex items-center gap-2 text-[11px] font-medium text-ink">
              <span className="size-2 rounded-full bg-brand animate-pulse" />
              Engine AI Talaqqi
            </span>
            <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
              Aktif
            </span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {navGroups.map((group) => (
            <div key={group.title} className="mb-4 last:mb-0">
              <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                {group.title}
              </p>
              <div className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition-colors",
                        active
                          ? "bg-emerald-950 font-semibold text-white shadow-sm dark:bg-emerald-900"
                          : "text-muted hover:bg-paper hover:text-ink",
                      )}
                    >
                      <Icon className="size-5 shrink-0" />
                      <span className="truncate">{item.label}</span>
                      {item.badge ? (
                        <span className="ml-auto rounded bg-sand-200 px-1.5 py-0.5 text-[10px] font-bold text-sand-900">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-line/70 p-3">
          <div className="flex items-center justify-between gap-2 rounded-xl bg-paper/70 px-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-950 text-white">
                <IconUser className="size-[18px]" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-ink">
                  Dr. Salman Al-Farisi
                </p>
                <p className="truncate text-[11px] text-muted">Super Admin</p>
              </div>
            </div>
            <Link
              href="/login"
              title="Keluar portal"
              aria-label="Keluar portal"
              className="rounded-lg p-1.5 text-muted transition-colors hover:bg-surface hover:text-red-600"
            >
              <IconLogout className="size-[18px]" />
            </Link>
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
        <header className="sticky top-0 z-30 h-16 border-b border-line/80 bg-paper/85 backdrop-blur-xl">
          <div className="flex h-full items-center gap-2 px-4 sm:gap-3 sm:px-6">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Buka menu navigasi"
              aria-controls="admin-sidebar"
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

            <div className="hidden flex-1 md:block">
              <div className="relative max-w-xl">
                <IconSearch className="pointer-events-none absolute left-3 top-1/2 size-[18px] -translate-y-1/2 text-muted" />
                <input
                  type="search"
                  name="admin-search"
                  placeholder="Cari santri, materi nahwu-shorof, akar kata mufrodat…"
                  aria-label="Cari di dashboard admin"
                  className="h-10 w-full rounded-xl border border-line/80 bg-surface/70 pl-10 pr-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-brand/40 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-lg border border-line/80 bg-surface/60 px-2.5 py-1.5 text-[11px] font-semibold text-ink xl:flex">
                <IconLanguages className="size-4 text-brand" />
                Fusha &amp; Amiyah
              </span>

              <ThemeToggle />

              <button
                type="button"
                aria-label="Notifikasi akademik"
                className="relative grid size-10 place-items-center rounded-full border border-line/80 bg-surface/70 text-muted transition-colors hover:border-emerald-600/40 hover:text-ink"
              >
                <IconBell className="size-[18px]" />
                <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-red-500 ring-2 ring-paper" />
              </button>

              <button
                type="button"
                className="hidden items-center gap-1.5 rounded-xl bg-emerald-950 px-3.5 py-2 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 sm:flex"
              >
                <IconPlus className="size-4" />
                Rilis Materi
              </button>

              <span
                title="Dr. Salman Al-Farisi"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-emerald-950 text-white"
              >
                <IconUser className="size-[18px]" />
              </span>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
