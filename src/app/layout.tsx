import type { Metadata, Viewport } from "next";
import { Noto_Naskh_Arabic, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { AddVocabularyProvider } from "@/components/add-vocabulary-flow";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const naskh = Noto_Naskh_Arabic({
  variable: "--font-naskh",
  subsets: ["arabic"],
  display: "swap",
});

const themeScript = `(function(){try{var t=localStorage.getItem("lughati-theme");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;if(d){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL("https://lughati.id"),
  title: {
    default: "Lughati — Belajar Bahasa Arab Fushah & Amiyah Saudi",
    template: "%s · Lughati",
  },
  description:
    "Kuasai bahasa Arab baku (Fushah) dan percakapan Saudi (Amiyah Najdi) dalam satu alur belajar: 12 minggu, 508 kosakata, dialog, kuis, dan latihan pelafalan.",
  keywords: [
    "belajar bahasa Arab",
    "bahasa Arab Fushah",
    "Amiyah Saudi",
    "bahasa Arab Najdi",
    "kursus bahasa Arab online",
    "Lughati",
  ],
  authors: [{ name: "Lughati" }],
  creator: "Lughati",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Lughati",
    title: "Lughati — Belajar Bahasa Arab Fushah & Amiyah Saudi",
    description:
      "Dua ragam bahasa Arab, satu alur belajar. 12 minggu kurikulum, dialog asli, kuis, dan latihan pelafalan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lughati — Belajar Bahasa Arab Fushah & Amiyah Saudi",
    description:
      "Dua ragam bahasa Arab, satu alur belajar. 12 minggu kurikulum, dialog asli, kuis, dan latihan pelafalan.",
  },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf8f1" },
    { media: "(prefers-color-scheme: dark)", color: "#06110e" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${jakarta.variable} ${naskh.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-dvh bg-paper text-ink antialiased">
        <AddVocabularyProvider>{children}</AddVocabularyProvider>
      </body>
    </html>
  );
}
