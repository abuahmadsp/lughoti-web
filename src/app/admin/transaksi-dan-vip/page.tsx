import type { Metadata } from "next";
import { AdminShell } from "@/components/admin-shell";
import { TransactionOverview } from "@/components/transaction-overview";

export const metadata: Metadata = {
  title: "Transaksi & VIP",
  description:
    "Ringkasan ilustratif transaksi langganan, member VIP, rekonsiliasi gateway, distribusi metode bayar, log aktivitas, faktur elektronik, pratinjau aksi per transaksi, dan antrean tinjauan CS. Tampilan demo dengan data contoh; tidak ada pembayaran, payout, email, atau dokumen sungguhan.",
  alternates: { canonical: "/admin/transaksi-dan-vip" },
  robots: { index: false, follow: false },
};

export default function TransaksiDanVipPage() {
  return (
    <AdminShell>
      <TransactionOverview />
    </AdminShell>
  );
}
