import type { Metadata } from "next";
import { ProgressReport } from "@/components/progress-report";
import { UserShell } from "@/components/user-shell";

export const metadata: Metadata = {
  title: "Progres & Evaluasi",
  description:
    "Pratinjau laporan kemajuan dan evaluasi belajar Lughati: metrik jam belajar dan kosakata, komparasi Fushah–Amiyah, grafik aktivitas, kurva retensi SRS, pilar kompetensi, milestone, dan riwayat kuis. Tampilan demo dengan data contoh.",
  alternates: { canonical: "/dashboard/progres-dan-evaluasi" },
  robots: { index: false, follow: false },
};

export default function ProgressPage() {
  return (
    <UserShell active="progres">
      <ProgressReport />
    </UserShell>
  );
}
