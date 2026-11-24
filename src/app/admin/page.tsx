import type { Metadata } from "next";
import { AdminOverview } from "@/components/admin-overview";
import { AdminShell } from "@/components/admin-shell";

export const metadata: Metadata = {
  title: "Dashboard Admin",
  description:
    "Pusat kendali akademi Lughati, termasuk generator contoh kalimat Fushah dan Amiyah berbantuan AI. Tampilan demo dengan data contoh, bukan data santri atau transaksi sebenarnya.",
  alternates: { canonical: "/admin" },
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <AdminShell>
      <AdminOverview />
    </AdminShell>
  );
}
