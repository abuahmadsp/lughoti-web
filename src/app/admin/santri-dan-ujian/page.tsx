import type { Metadata } from "next";
import { AdminShell } from "@/components/admin-shell";
import { SantriUjianOverview } from "@/components/santri-ujian-overview";

export const metadata: Metadata = {
  title: "Santri & Ujian",
  description:
    "Direktori santri, jadwal ujian marhalah, antrean koreksi Talaqqi, dan bank soal Lughati. Tampilan demo dengan data contoh, bukan data santri sebenarnya.",
  alternates: { canonical: "/admin/santri-dan-ujian" },
  robots: { index: false, follow: false },
};

export default function SantriUjianPage() {
  return (
    <AdminShell>
      <SantriUjianOverview />
    </AdminShell>
  );
}
