"use client";

import { useState, type FormEvent } from "react";
import {
  IconArrowUp,
  IconBadgeCheck,
  IconCamera,
  IconChevronDown,
  IconClock,
  IconLock,
} from "./icons";

export function EditProfileForm({ onSave }: { onSave: () => void }) {
  const [name, setName] = useState("Fathia Rahma");
  const [bio, setBio] = useState(
    "طَالِبَةُ عِلْمٍ مُجْتَهِدَةٌ (Penuntut Ilmu Bahasa Arab dan Studi Islam)",
  );
  const [phone, setPhone] = useState("812-3456-7890");
  const [reminder, setReminder] = useState(true);
  const [timezone, setTimezone] = useState("WIB (Jakarta • UTC+7)");
  const [city, setCity] = useState("Jakarta Selatan, Indonesia");
  const [notice, setNotice] = useState<string | null>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave();
  }

  return (
    <form id="edit-profile-form" onSubmit={submit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border border-line/70 bg-paper p-4 sm:flex-row sm:items-start">
        <div className="relative mx-auto shrink-0 sm:mx-0">
          <span className="grid size-20 place-items-center rounded-full bg-gradient-to-br from-emerald-950 to-brand text-[24px] font-bold text-white ring-2 ring-sand-300 shadow-sm">
            FR
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-0 right-0 grid size-7 place-items-center rounded-full bg-brand text-white shadow-md"
          >
            <IconCamera className="size-4" />
          </span>
        </div>
        <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <p className="text-[12px] font-bold text-ink">Foto Profil Santri</p>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
              ID: LGH-2026-9021
            </span>
          </div>
          <p className="text-[11px] leading-5 text-muted">
            Contoh unggahan: format JPG atau PNG, maksimal 2 MB. Berkas tidak
            diunggah atau disimpan dari demo ini.
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
            <button
              type="button"
              onClick={() =>
                setNotice("Pratinjau — berkas foto tidak diunggah atau disimpan.")
              }
              className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-surface px-3 py-1.5 text-[11px] font-semibold text-brand transition-colors hover:bg-line/30"
            >
              <IconArrowUp className="size-3.5" />
              Unggah Foto Baru
            </button>
            <button
              type="button"
              onClick={() =>
                setNotice("Pratinjau — foto contoh tidak dihapus.")
              }
              className="rounded-lg px-3 py-1.5 text-[11px] font-semibold text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
            >
              Hapus Foto
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label
              htmlFor="edit-profile-name"
              className="text-[12px] font-semibold text-ink"
            >
              Nama Lengkap Sesuai KTP atau Paspor <span className="text-red-600">*</span>
            </label>
            <span className="text-[10px] font-medium text-brand">
              Untuk Ijazah dan Sertifikat (Contoh)
            </span>
          </div>
          <input
            id="edit-profile-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-lg border border-line/70 bg-paper px-3.5 py-2.5 text-[13px] font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
          <p className="text-[10px] leading-4 text-muted">
            Contoh nama yang akan dicetak pada sertifikat kompetensi dan kode
            kredensial. Tidak ada sertifikat yang diterbitkan.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-profile-bio"
            className="text-[12px] font-semibold text-ink"
          >
            Gelar Pembelajar, Kunyah, atau Bio Akademis
          </label>
          <input
            id="edit-profile-bio"
            type="text"
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            className="w-full rounded-lg border border-line/70 bg-paper px-3.5 py-2.5 text-[13px] font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
          />
          <p className="text-[10px] leading-4 text-muted">
            Ilustrasi teks yang tampil pada kartu profil dan forum diskusi.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-[12px] font-semibold text-ink">
            Alamat Email Terdaftar
          </p>
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line/70 bg-paper px-3.5 py-2.5">
            <span className="flex items-center gap-2 text-[12px] text-ink">
              <IconLock className="size-4 text-muted" />
              <span className="font-mono">fathia.rahma@example.com</span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
              <IconBadgeCheck className="size-3" />
              Terverifikasi (Contoh)
            </span>
          </div>
          <p className="text-[10px] leading-4 text-muted">
            Email terkunci pada pratinjau ini — perubahan tidak diproses.
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-profile-phone"
            className="text-[12px] font-semibold text-ink"
          >
            Nomor WhatsApp Bot Pembelajaran
          </label>
          <div className="flex items-center gap-2">
            <span className="flex shrink-0 items-center gap-1.5 rounded-lg border border-line/70 bg-paper px-3 py-2.5 text-[12px] font-semibold text-ink">
              <span aria-hidden="true">🇮🇩</span>
              +62
            </span>
            <input
              id="edit-profile-phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-line/70 bg-paper px-3.5 py-2.5 font-mono text-[13px] font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>
          <div className="mt-1 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
            <span className="flex items-center gap-2 text-[11px] font-semibold text-emerald-900 dark:text-emerald-100">
              <span className="size-2 animate-pulse rounded-full bg-brand" />
              Terhubung (Aktif) &bull; Bot v2.4 siap — contoh
            </span>
            <span className="text-[10px] text-emerald-800 dark:text-emerald-200">
              Tidak ada pembaruan sungguhan
            </span>
          </div>
          <label className="flex cursor-pointer items-start gap-2.5 pt-1 select-none">
            <input
              type="checkbox"
              checked={reminder}
              onChange={(event) => setReminder(event.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-emerald-800"
            />
            <span className="text-[11px] leading-5 text-muted">
              Kirim ringkasan mufrodat harian dan pengingat kuis via nomor ini
              (ilustrasi — tidak ada pesan yang dijadwalkan).
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-profile-timezone"
              className="text-[12px] font-semibold text-ink"
            >
              Zona Waktu Pembelajaran
            </label>
            <div className="relative">
              <IconClock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand" />
              <select
                id="edit-profile-timezone"
                value={timezone}
                onChange={(event) => setTimezone(event.target.value)}
                className="w-full appearance-none rounded-lg border border-line/70 bg-paper py-2.5 pl-9 pr-9 text-[11px] text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
              >
                <option>WIB (Jakarta • UTC+7)</option>
                <option>WITA (Makassar • UTC+8)</option>
                <option>WIT (Jayapura • UTC+9)</option>
              </select>
              <IconChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="edit-profile-city"
              className="text-[12px] font-semibold text-ink"
            >
              Kota Domisili
            </label>
            <input
              id="edit-profile-city"
              type="text"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="w-full rounded-lg border border-line/70 bg-paper px-3.5 py-2.5 text-[12px] font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand/40"
            />
          </div>
        </div>
      </div>

      {notice ? (
        <p
          role="status"
          className="rounded-lg bg-emerald-50 px-3 py-2 text-[10px] font-semibold leading-4 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-100"
        >
          {notice}
        </p>
      ) : null}
    </form>
  );
}
