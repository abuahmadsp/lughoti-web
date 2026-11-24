import { QuizSession } from "./quiz-session";
import {
  IconBook,
  IconLink,
  IconRefresh,
  IconSparkles,
} from "./icons";

const fushahItems = [
  { id: "1", text: "Saya ingin / menghendaki", arabic: "أُرِيدُ" },
  { id: "2", text: "Apa / Apakah", arabic: "مَاذَا" },
  { id: "3", text: "Bagaimana kabarmu?", arabic: "كَيْفَ حَالُكَ" },
];

const amiyahItems = [
  { text: "Abgha", arabic: "أَبْغَى" },
  { text: "Eysh", arabic: "إِيش" },
  { text: "Sylonak / Kaifak", arabic: "شْلُونَك / كَيْفَك" },
];

function MatchingPreview() {
  return (
    <section className="flex flex-col gap-5 rounded-xl border border-line/70 bg-surface p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-sand-100 text-sand-800 dark:bg-sand-300/20 dark:text-sand-200">
            <IconRefresh className="size-4" />
          </span>
          <div>
            <h2 className="text-[15px] font-bold text-ink">
              Preview Latihan Soal Berikutnya: Mencocokkan Kata
            </h2>
            <p className="text-[11px] leading-5 text-muted">
              Pasangkan ungkapan Bahasa Arab Fushah (Baku) dengan padanan dialek
              percakapan Amiyah Saudi:
            </p>
          </div>
        </div>
        <span className="hidden shrink-0 rounded bg-paper px-2.5 py-1 text-[10px] font-medium text-muted sm:inline-block">
          Soal 4 Mendatang
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 pt-1 md:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-2 pb-1">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase text-brand">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-brand" />
              Bahasa Arab Fushah (Baku)
            </p>
            <span className="text-[10px] text-muted">Kolom A</span>
          </div>
          {fushahItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-paper p-3.5 shadow-sm"
            >
              <span className="flex items-center gap-3">
                <span className="grid size-6 place-items-center rounded-full bg-line/50 text-[10px] font-bold text-muted">
                  {item.id}
                </span>
                <span className="text-[12px] font-medium text-ink">{item.text}</span>
              </span>
              <span lang="ar" dir="rtl" className="font-arabic text-[17px] font-bold text-brand">
                {item.arabic}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-2 pb-1">
            <p className="flex items-center gap-1 text-[10px] font-bold uppercase text-sand-700 dark:text-sand-300">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-sand-500" />
              Dialek Amiyah Saudi (
              <span lang="ar" dir="rtl">
                العامية
              </span>
              )
            </p>
            <span className="text-[10px] text-muted">Kolom B</span>
          </div>
          {amiyahItems.map((item) => (
            <div
              key={item.text}
              className="flex items-center justify-between gap-3 rounded-xl bg-sand-100 p-3.5 shadow-sm dark:bg-sand-300/15"
            >
              <span className="flex items-center gap-3">
                <IconLink className="size-4 shrink-0 text-brand" />
                <span className="text-[12px] italic text-muted">{item.text}</span>
              </span>
              <span lang="ar" dir="rtl" className="font-arabic text-[17px] font-bold text-brand">
                {item.arabic}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightCard() {
  return (
    <section className="relative flex flex-col gap-3 overflow-hidden rounded-xl border border-line/70 bg-surface p-5 shadow-sm">
      <div className="flex items-center gap-2 text-brand">
        <IconBook className="size-5" />
        <h3 className="text-[15px] font-bold text-ink">Kaidah Percakapan</h3>
      </div>
      <p className="text-[12px] leading-5 text-muted">
        Frasa{" "}
        <span lang="ar" dir="rtl" className="font-semibold text-ink">
          «تَشَرَّفْنَا بِمَعْرِفَتِكَ»
        </span>{" "}
        merupakan ungkapan kesopanan tingkat tinggi (Adab at-Ta&apos;aruf) yang
        sangat umum dipakai baik di kalangan formal Saudi maupun di lingkungan
        diplomasi sastra Arab.
      </p>
      <div className="mt-1 flex flex-col gap-1 rounded-lg bg-paper p-3">
        <p className="text-[10px] font-semibold text-muted">Jawaban Balasan Lazim:</p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[12px] font-medium text-brand">
            “Asy-Syaraf lanā” (Kehormatan bagi kami)
          </p>
          <span lang="ar" dir="rtl" className="font-arabic text-[14px] font-bold text-ink">
            « الشَّرَفُ لَنَا »
          </span>
        </div>
      </div>
    </section>
  );
}

function TutorCard() {
  return (
    <section className="flex items-center gap-4 rounded-xl border border-line/70 bg-surface p-5 shadow-sm">
      <span
        aria-hidden="true"
        className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-950 to-emerald-700 text-[14px] font-bold text-sand-100 shadow-sm"
      >
        FA
      </span>
      <div className="min-w-0">
        <p className="truncate text-[12px] font-bold text-ink">
          Ustadz Farhan Al-Makki
        </p>
        <p className="text-[10px] font-medium text-brand">Kurator Materi Lughati</p>
        <p className="mt-0.5 flex items-center gap-1 truncate text-[11px] text-muted">
          <IconSparkles className="size-3 shrink-0" />
          Butuh panduan pengucapan makhraj huruf?
        </p>
      </div>
    </section>
  );
}

export function QuizWorkspace() {
  return (
    <QuizSession
      preview={<MatchingPreview />}
      sidebar={
        <>
          <InsightCard />
          <TutorCard />
        </>
      }
    />
  );
}
