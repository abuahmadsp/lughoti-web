import type { Metadata } from "next";
import { AdminShell } from "@/components/admin-shell";
import { KurikulumMufrodatOverview } from "@/components/kurikulum-mufrodat-overview";

export const metadata: Metadata = {
  title: "Kurikulum & Mufrodat",
  description:
    "Bank mufrodat contoh dengan pratinjau pembahasan per entri, struktur marhalah Fushah dan Amiyah, pratinjau repositori audio, dan kalibrasi SRS SM-2. Tampilan demo dengan data ilustratif, bukan data kurikulum sebenarnya.",
  alternates: { canonical: "/admin/kurikulum-dan-mufrodat" },
  robots: { index: false, follow: false },
};

export default function KurikulumMufrodatPage() {
  return (
    <AdminShell>
      <KurikulumMufrodatOverview />
    </AdminShell>
  );
}
