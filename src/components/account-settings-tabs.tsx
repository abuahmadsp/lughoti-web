"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  IconBell,
  IconPremium,
  IconReceipt,
  IconSettings,
  IconShieldCheck,
  IconUser,
} from "./icons";

export type AccountTabKey =
  | "paket"
  | "profil"
  | "preferensi"
  | "riwayat"
  | "notifikasi"
  | "keamanan";

const tabs: {
  key: AccountTabKey;
  label: string;
  arabic: string;
  icon: typeof IconPremium;
  badge?: string;
}[] = [
  {
    key: "paket",
    label: "Paket dan Langganan",
    arabic: "خطة الاشتراك",
    icon: IconPremium,
    badge: "VIP Aktif",
  },
  {
    key: "profil",
    label: "Profil Santri",
    arabic: "الملف الشخصي",
    icon: IconUser,
  },
  {
    key: "preferensi",
    label: "Preferensi Belajar",
    arabic: "تفضيلات التعلم",
    icon: IconSettings,
  },
  {
    key: "riwayat",
    label: "Riwayat dan Faktur",
    arabic: "الفواتير والسجلات",
    icon: IconReceipt,
  },
  {
    key: "notifikasi",
    label: "Notifikasi WhatsApp",
    arabic: "الإشعارات",
    icon: IconBell,
  },
  {
    key: "keamanan",
    label: "Keamanan",
    arabic: "الأمان",
    icon: IconShieldCheck,
  },
];

export function AccountSettingsTabs({
  panels,
}: {
  panels: Record<AccountTabKey, ReactNode>;
}) {
  const [active, setActive] = useState<AccountTabKey>("paket");

  useEffect(() => {
    const onTabRequest = (event: Event) => {
      const requested = (event as CustomEvent<string>).detail;
      if (requested === "profil") setActive("profil");
    };
    window.addEventListener("lughati:account-tab", onTabRequest);
    return () => window.removeEventListener("lughati:account-tab", onTabRequest);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
        <nav
          role="tablist"
          aria-label="Bagian pengaturan akun"
          className="flex min-w-max items-center gap-2 rounded-xl border border-line/70 bg-paper p-1.5"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.key === active;
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={`account-panel-${tab.key}`}
                id={`account-tab-${tab.key}`}
                onClick={() => setActive(tab.key)}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2.5 text-left text-[12px] transition-colors",
                  isActive
                    ? "bg-surface font-semibold text-brand shadow-sm"
                    : "text-muted hover:bg-surface/70 hover:text-ink",
                )}
              >
                <Icon className="size-4 shrink-0" />
                <span className="whitespace-nowrap font-semibold">
                  {tab.label}
                </span>
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-[11px] text-muted"
                >
                  ({tab.arabic})
                </span>
                {tab.badge ? (
                  <span className="shrink-0 rounded-full bg-sand-200 px-2 py-0.5 text-[9px] font-bold text-sand-900 dark:bg-sand-300/20 dark:text-sand-200">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      <div
        role="tabpanel"
        id={`account-panel-${active}`}
        aria-labelledby={`account-tab-${active}`}
        className="animate-fade-up"
      >
        {panels[active]}
      </div>

      <p className="text-center text-[10px] leading-5 text-muted">
        Pengalih tab hanya mengganti tampilan pada halaman ini. Tidak ada data
        akun, langganan, atau preferensi yang disimpan.
      </p>
    </div>
  );
}
