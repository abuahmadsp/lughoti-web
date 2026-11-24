import type { Metadata } from "next";
import { AdminShell } from "@/components/admin-shell";
import { SystemSettingsOverview } from "@/components/system-settings-overview";

export const metadata: Metadata = {
  title: "Pengaturan Sistem",
  description:
    "Panel ilustratif pengaturan sistem dan infrastruktur Lughati: engine AI Talaqqi, WhatsApp Gateway, RBAC asatidz, backup, dan status server. Tampilan demo dengan data contoh; tidak ada konfigurasi yang disimpan atau layanan yang dikendalikan.",
  alternates: { canonical: "/admin/pengaturan-sistem" },
  robots: { index: false, follow: false },
};

export default function PengaturanSistemPage() {
  return (
    <AdminShell>
      <SystemSettingsOverview />
    </AdminShell>
  );
}
