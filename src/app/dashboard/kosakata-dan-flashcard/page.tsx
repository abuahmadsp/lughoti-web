import type { Metadata } from "next";
import { UserShell } from "@/components/user-shell";
import { VocabularyDeck } from "@/components/vocabulary-deck";

export const metadata: Metadata = {
  title: "Kosakata & Flashcard",
  description:
    "Pratinjau bank kosakata dan flashcard Lughati: sesi hafalan intensif 30 mufrodat dengan timer, SRS, antrean, dan catatan dialek, serta filter pustaka. Tampilan demo dengan data contoh.",
  alternates: { canonical: "/dashboard/kosakata-dan-flashcard" },
  robots: { index: false, follow: false },
};

export default function VocabularyPage() {
  return (
    <UserShell active="kosakata">
      <VocabularyDeck />
    </UserShell>
  );
}
