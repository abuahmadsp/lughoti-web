import type { Metadata } from "next";
import { AdminShell } from "@/components/admin-shell";
import { TalaqqiAnalyticsOverview } from "@/components/talaqqi-analytics-overview";

export const metadata: Metadata = {
  title: "AI Talaqqi Analytics",
  description:
    "Analitik ilustratif performa ASR Talaqqi, matriks artikulasi makhraj, verifikasi audio real-time, komparasi dialek Fushah/Amiyah, dan telemetri infrastruktur. Tampilan demo dengan data contoh, tanpa microphone, audio, atau inferensi sungguhan.",
  alternates: { canonical: "/admin/ai-talaqqi-analytics" },
  robots: { index: false, follow: false },
};

export default function AiTalaqqiAnalyticsPage() {
  return (
    <AdminShell>
      <TalaqqiAnalyticsOverview />
    </AdminShell>
  );
}
