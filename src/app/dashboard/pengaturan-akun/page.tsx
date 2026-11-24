import type { Metadata } from "next";
import { AccountSettingsPage } from "@/components/account-settings-page";
import { EditProfileProvider } from "@/components/edit-profile-flow";
import { UserShell } from "@/components/user-shell";

export const metadata: Metadata = {
  title: "Pengaturan Akun",
  description:
    "Pratinjau pengaturan akun dan manajemen langganan Lughati: profil santri, preferensi kurikulum dual-track, notifikasi, keamanan, dan riwayat faktur. Seluruh data adalah contoh untuk UI demo.",
  alternates: { canonical: "/dashboard/pengaturan-akun" },
  robots: { index: false, follow: false },
};

export default function PengaturanAkunPage() {
  return (
    <UserShell active="pengaturan">
      <EditProfileProvider>
        <AccountSettingsPage />
      </EditProfileProvider>
    </UserShell>
  );
}
