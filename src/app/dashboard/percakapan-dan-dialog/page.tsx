import type { Metadata } from "next";
import { ConversationDialog } from "@/components/conversation-dialog";
import { UserShell } from "@/components/user-shell";

export const metadata: Metadata = {
  title: "Percakapan & Dialog",
  description:
    "Pratinjau dialog Amiyah Saudi di restoran tradisional Riyadh: percakapan dengan transliterasi, arti, catatan dialek, dan kosakata kunci. Tampilan demo dengan data contoh.",
  alternates: { canonical: "/dashboard/percakapan-dan-dialog" },
  robots: { index: false, follow: false },
};

export default function ConversationPage() {
  return (
    <UserShell active="percakapan">
      <ConversationDialog />
    </UserShell>
  );
}
