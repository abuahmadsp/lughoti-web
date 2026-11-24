"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { EditProfileForm } from "./edit-profile-form";
import {
  IconBadgeCheck,
  IconCheck,
  IconEye,
  IconSettings,
  IconX,
} from "./icons";

type EditProfileValue = { openEditProfile: () => void };

const EditProfileContext = createContext<EditProfileValue | null>(null);

export function useEditProfile() {
  const value = useContext(EditProfileContext);
  if (!value) {
    throw new Error(
      "useEditProfile harus dipakai di dalam EditProfileProvider",
    );
  }
  return value;
}

export function EditProfileOpenButton({
  className,
  children,
  title = "Pratinjau — membuka modal edit profil demo",
}: {
  className?: string;
  children: ReactNode;
  title?: string;
}) {
  const { openEditProfile } = useEditProfile();
  return (
    <button type="button" title={title} onClick={openEditProfile} className={className}>
      {children}
    </button>
  );
}

export function EditProfileProvider({ children }: { children: ReactNode }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const openEditProfile = useCallback(() => {
    setToastOpen(false);
    setDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const showToast = useCallback(() => {
    setDialogOpen(false);
    setToastOpen(true);
  }, []);

  return (
    <EditProfileContext.Provider value={{ openEditProfile }}>
      {children}
      {dialogOpen ? (
        <EditProfileDialog onClose={closeDialog} onSave={showToast} />
      ) : null}
      {toastOpen ? <SavedProfileToast onClose={() => setToastOpen(false)} /> : null}
    </EditProfileContext.Provider>
  );
}

function EditProfileDialog({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-emerald-950/60 p-4 backdrop-blur-sm sm:items-center"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        className="animate-flow-in relative my-8 w-full max-w-2xl overflow-hidden rounded-2xl border border-line/70 bg-surface shadow-2xl outline-none"
      >
        <header className="border-b border-line/70 bg-paper px-5 py-5 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="grid size-8 place-items-center rounded-lg bg-emerald-100 text-brand dark:bg-emerald-900/40">
                  <IconSettings className="size-4" />
                </span>
                <h2
                  id="edit-profile-title"
                  className="text-[18px] font-bold text-ink"
                >
                  Edit Profil Santri
                </h2>
                <span
                  lang="ar"
                  dir="rtl"
                  className="font-arabic text-[13px] font-semibold text-brand"
                >
                  «تَعْدِيلُ المَلَفِّ الشَّخْصِيِّ»
                </span>
              </div>
              <p className="text-[11px] leading-5 text-muted">
                Contoh pembaruan identitas, nama untuk sertifikat, dan nomor
                WhatsApp untuk pengingat mufrodat. Tidak ada data yang disimpan.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup modal edit profil"
              className="grid size-8 shrink-0 place-items-center rounded-lg border border-line/70 text-muted transition-colors hover:bg-line/30 hover:text-ink"
            >
              <IconX className="size-4" />
            </button>
          </div>
        </header>

        <div className="max-h-[calc(100dvh-13rem)] overflow-y-auto p-5 sm:p-6 lg:p-8">
          <EditProfileForm onSave={onSave} />
        </div>

        <footer className="flex flex-wrap items-center justify-end gap-3 border-t border-line/70 bg-paper px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-line/70 bg-surface px-4 py-2.5 text-[12px] font-semibold text-ink transition-colors hover:bg-line/30"
          >
            Batal
          </button>
          <button
            type="submit"
            form="edit-profile-form"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-950 px-5 py-2.5 text-[12px] font-bold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          >
            <IconCheck className="size-4" />
            Simpan Perubahan Profil (Pratinjau)
          </button>
        </footer>
      </div>
    </div>
  );
}

function SavedProfileToast({ onClose }: { onClose: () => void }) {
  function viewProfile() {
    onClose();
    window.dispatchEvent(
      new CustomEvent<"profil">("lughati:account-tab", { detail: "profil" }),
    );
  }

  return (
    <div
      role="status"
      className="animate-flow-in fixed right-4 top-4 z-[110] w-[calc(100vw-2rem)] max-w-md rounded-2xl border border-brand/30 bg-surface p-4 shadow-2xl sm:right-8 sm:top-6 sm:w-auto"
    >
      <div className="flex items-start gap-3.5">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-brand shadow-sm ring-2 ring-brand/20 dark:bg-emerald-900/40">
          <IconBadgeCheck className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-[13px] font-bold text-ink">
                Perubahan Berhasil Disimpan
              </h3>
              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
                Baru saja &bull; Contoh
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup notifikasi"
              className="grid size-7 place-items-center rounded-lg text-muted transition-colors hover:bg-line/30 hover:text-ink"
            >
              <IconX className="size-4" />
            </button>
          </div>
          <p
            lang="ar"
            dir="rtl"
            className="mt-1 font-arabic text-[12px] font-semibold text-brand"
          >
            «تَمَّ حِفْظُ التَّعْدِيلَاتِ بِنَجَاح»
          </p>
          <p className="mt-1 text-[11px] leading-5 text-muted">
            Contoh: biodata, nama sertifikat, dan nomor WhatsApp Bot diperbarui
            tampilan saja. Tidak ada data sungguhan yang tersinkronisasi.
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 border-t border-line/60 pt-3">
        <button
          type="button"
          onClick={viewProfile}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold text-brand transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-900/30"
        >
          <IconEye className="size-4" />
          Lihat Profil
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg bg-paper px-3 py-1.5 text-[11px] font-semibold text-ink transition-colors hover:bg-line/30"
        >
          Tutup
        </button>
      </div>
    </div>
  );
}
