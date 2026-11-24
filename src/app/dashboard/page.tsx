import type { Metadata } from "next";
import { UserOverview } from "@/components/user-overview";
import { UserShell } from "@/components/user-shell";

export const metadata: Metadata = {
  title: "Dashboard Peserta",
  description:
    "Ruang belajar peserta Lughati: jalur Fushah dan Amiyah Saudi, target harian, flashcard mufrodat, dan rekap aktivitas. Tampilan demo dengan data contoh.",
  alternates: { canonical: "/dashboard" },
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <UserShell active="beranda">
      <UserOverview />
    </UserShell>
  );
}
