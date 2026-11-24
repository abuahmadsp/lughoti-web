import type { Metadata } from "next";
import {
  CheckoutAccountCard,
  CheckoutAssurances,
} from "@/components/checkout-flow-slots";
import { CheckoutFlowProvider } from "@/components/checkout-flow";
import { PremiumPage } from "@/components/premium-page";
import { UserShell } from "@/components/user-shell";

export const metadata: Metadata = {
  title: "Paket Premium",
  description:
    "Pratinjau paket langganan Lughati: perbandingan Free, Pro Learner, dan Academic VIP untuk jalur Fushah dan Amiyah Saudi. Harga, promo, garansi, sertifikat, dan testimoni adalah contoh untuk UI demo; tombol paket membuka modal checkout dan sukses pratinjau.",
  alternates: { canonical: "/dashboard/paket-premium" },
  robots: { index: false, follow: false },
};

export default function PremiumSubscriptionPage() {
  return (
    <UserShell active="premium">
      <CheckoutFlowProvider
        accountCard={<CheckoutAccountCard />}
        assurances={<CheckoutAssurances />}
      >
        <PremiumPage />
      </CheckoutFlowProvider>
    </UserShell>
  );
}
