import type { Metadata } from "next";
import { QuizWorkspace } from "@/components/quiz-workspace";
import { UserShell } from "@/components/user-shell";

export const metadata: Metadata = {
  title: "Latihan & Kuis",
  description:
    "Pratinjau latihan dan kuis Lughati: soal pilihan ganda dengan audio, penjelasan kosakata, navigasi butir, dan contoh latihan mencocokkan Fushah–Amiyah. Tampilan demo dengan data contoh.",
  alternates: { canonical: "/dashboard/latihan-dan-kuis" },
  robots: { index: false, follow: false },
};

export default function QuizPage() {
  return (
    <UserShell active="latihan">
      <QuizWorkspace />
    </UserShell>
  );
}
