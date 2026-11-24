import type { Metadata } from "next";
import { MaterialsLibrary } from "@/components/materials-library";
import { UserShell } from "@/components/user-shell";

export const metadata: Metadata = {
  title: "Materi & Modul",
  description:
    "Katalog materi dan modul Lughati: silabus bab, video kuliah, lembar kerja tashrif, dan contoh audio untuk jalur Fushah serta ‘Amiyah Saudi. Tampilan demo dengan data contoh.",
  alternates: { canonical: "/dashboard/materi-dan-modul" },
  robots: { index: false, follow: false },
};

export default function MaterialsPage() {
  return (
    <UserShell active="materi">
      <MaterialsLibrary />
    </UserShell>
  );
}
