import type { Metadata } from "next";
import { LearningPath } from "@/components/learning-path";
import { UserShell } from "@/components/user-shell";

export const metadata: Metadata = {
  title: "Jalur Belajar",
  description:
    "Peta kurikulum Lughati: jalur Fushah akademik dan ‘Amiyah Saudi, dengan marhalah, modul, serta ringkasan capaian. Tampilan demo dengan data contoh.",
  alternates: { canonical: "/dashboard/jalur-belajar" },
  robots: { index: false, follow: false },
};

export default function LearningPathPage() {
  return (
    <UserShell active="jalur-belajar">
      <LearningPath />
    </UserShell>
  );
}
