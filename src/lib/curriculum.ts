export type TrackId = "fushah" | "amiyah";
export type Access = "free" | "premium";

export const navLinks = [
  { href: "#ragam", label: "Fushah & Amiyah" },
  { href: "#kurikulum", label: "Kurikulum" },
  { href: "#pratinjau", label: "Pratinjau" },
  { href: "#fitur", label: "Fitur" },
  { href: "#faq", label: "FAQ" },
] as const;

export const heroStats = [
  { value: "12", label: "minggu per jalur" },
  { value: "508", label: "kosakata" },
  { value: "202", label: "soal kuis" },
] as const;

export type Week = {
  n: number;
  ar: string;
  title: string;
  focus: string;
  access: Access;
};

/** 12 tema yang sama dipakai jalur Fushah & Amiyah Saudi. */
export const weeks: Week[] = [
  {
    n: 1,
    ar: "السَّلَامُ وَالتَّعَارُف",
    title: "Salam & Perkenalan",
    focus: "Menyapa, menyebut nama dan asal, kata tanya dasar.",
    access: "free",
  },
  {
    n: 2,
    ar: "فِي الْبَيْتِ",
    title: "Di Rumah",
    focus: "Keluarga, menjamu tamu, rutinitas harian.",
    access: "free",
  },
  {
    n: 3,
    ar: "فِي السُّوقِ",
    title: "Di Pasar",
    focus: "Harga, angka, dan tawar-menawar.",
    access: "premium",
  },
  {
    n: 4,
    ar: "فِي الْمَطْعَمِ",
    title: "Di Restoran",
    focus: "Memesan makanan, preferensi, minta bill.",
    access: "premium",
  },
  {
    n: 5,
    ar: "فِي الْمَدْرَسَةِ وَالْجَامِعَةِ",
    title: "Sekolah & Kampus",
    focus: "Jadwal, tugas, dan meminta izin.",
    access: "premium",
  },
  {
    n: 6,
    ar: "فِي الْعَمَلِ",
    title: "Di Tempat Kerja",
    focus: "Profesi, rekan kerja, register formal.",
    access: "premium",
  },
  {
    n: 7,
    ar: "الْمَوَاصَلَاتُ وَالطَّرِيقُ",
    title: "Transportasi & Arah",
    focus: "Naik taksi, menanyakan arah, menyebut tujuan.",
    access: "premium",
  },
  {
    n: 8,
    ar: "فِي الْمَطَارِ",
    title: "Di Bandara",
    focus: "Check-in, bagasi, imigrasi, dan gate.",
    access: "premium",
  },
  {
    n: 9,
    ar: "الصِّحَّةُ",
    title: "Kesehatan",
    focus: "Menjelaskan keluhan, klinik, dan apotek.",
    access: "premium",
  },
  {
    n: 10,
    ar: "التَّعَامُلُ مَعَ أَهْلِ الْبَلَدِ",
    title: "Bergaul dengan Warga",
    focus: "Menerima undangan, berbasa-basi, berpamitan.",
    access: "premium",
  },
  {
    n: 11,
    ar: "عِبَارَاتٌ يَوْمِيَّةٌ",
    title: "Ungkapan Harian",
    focus: "Mengisi jeda, menyatakan ragu, setuju, kaget.",
    access: "premium",
  },
  {
    n: 12,
    ar: "مَوَاقِفُ مُرَكَّبَةٌ",
    title: "Situasi Kompleks",
    focus: "Komplain, negosiasi, telepon, minta bantuan.",
    access: "premium",
  },
];

export const tracks: Record<
  TrackId,
  {
    name: string;
    arabic: string;
    label: string;
    tagline: string;
    description: string;
    points: string[];
  }
> = {
  fushah: {
    name: "Fushah",
    arabic: "الْفُصْحَى",
    label: "Bahasa Arab baku",
    tagline: "Untuk membaca, menulis, dan situasi resmi.",
    description:
      "Struktur baku dengan harakat penuh: kata ganti, kata tanya, dan kalimat nominal. Bekal untuk berita, dokumen, pidato, dan studi.",
    points: ["Harakat penuh", "Tata bahasa baku", "Teks & dokumen resmi"],
  },
  amiyah: {
    name: "Amiyah Saudi",
    arabic: "الْعَامِّيَّة السَّعُودِيَّة",
    label: "Percakapan sehari-hari",
    tagline: "Untuk ngobrol nyata di Riyadh dan Jeddah.",
    description:
      "Ragam Najdi sebagai acuan utama, dengan pembanding Hijazi pada baris tertentu. Fokus pada bunyi, ungkapan sosial, dan kelancaran bicara.",
    points: ["Najdi sebagai acuan", "Pembanding Hijazi", "Ungkapan sosial"],
  },
};

export type PhrasePair = {
  meaning: string;
  fushah: { ar: string; translit: string };
  amiyah: { ar: string; translit: string };
};

export const phrasePairs: PhrasePair[] = [
  {
    meaning: "Siapa namamu?",
    fushah: { ar: "مَا اسْمُكَ؟", translit: "mā ismuka?" },
    amiyah: { ar: "وِشْ اسْمَك؟", translit: "wesh ismak?" },
  },
  {
    meaning: "Dari mana kamu?",
    fushah: { ar: "مِنْ أَيْنَ أَنْتَ؟", translit: "min ayna anta?" },
    amiyah: { ar: "مِنْ وِينْ أَنْتَ؟", translit: "min wēn inta?" },
  },
  {
    meaning: "Saya mau belajar Amiyah Saudi.",
    fushah: {
      ar: "أُرِيدُ أَنْ أَتَعَلَّمَ الْعَرَبِيَّةَ الْعَامِّيَّةَ السَّعُودِيَّةَ.",
      translit: "urīdu an ataʿallama al-ʿarabiyya al-ʿāmiyya as-saʿūdiyya.",
    },
    amiyah: {
      ar: "أَبِي أَتَعَلَّم الْعَامِّيَّة السَّعُودِيَّة.",
      translit: "abī ataʿallam al-ʿāmiyya as-saʿūdiyya.",
    },
  },
];

/* -------------------------------------------------------------------------
   Data pratinjau — diambil dari pelajaran Minggu 1 (Salam & Perkenalan)
------------------------------------------------------------------------- */
export type PreviewData = {
  track: TrackId;
  week: number;
  lessonTitle: string;
  lessonArabic: string;
  phrase: { ar: string; translit: string; id: string };
  vocabulary: { ar: string; translit: string; id: string; tag: string }[];
  totalVocab: number;
};

export const previews: Record<TrackId, PreviewData> = {
  fushah: {
    track: "fushah",
    week: 1,
    lessonTitle: "Salam dan Perkenalan",
    lessonArabic: "السَّلَامُ وَالتَّعَارُف",
    phrase: {
      ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ.",
      translit: "as-salāmu ʿalaykum wa raḥmatullāh.",
      id: "Semoga keselamatan dan rahmat Allah atasmu.",
    },
    vocabulary: [
      {
        ar: "مَا اسْمُكَ؟",
        translit: "mā ismuka?",
        id: "Siapa namamu?",
        tag: "ungkapan",
      },
      { ar: "أَنَا", translit: "anā", id: "saya", tag: "kata ganti" },
      {
        ar: "طَالِبٌ",
        translit: "ṭālibun",
        id: "pelajar",
        tag: "kata benda",
      },
      {
        ar: "مِنْ أَيْنَ",
        translit: "min ayna",
        id: "dari mana",
        tag: "kata tanya",
      },
    ],
    totalVocab: 22,
  },
  amiyah: {
    track: "amiyah",
    week: 1,
    lessonTitle: "Salam dan Perkenalan",
    lessonArabic: "السَّلَامُ وَالتَّعَارُف",
    phrase: {
      ar: "حَيَّاكَ اللهُ، وِشْ اسْمَك؟",
      translit: "ḥayyāk Allāh, wesh ismak?",
      id: "Selamat datang; siapa namamu?",
    },
    vocabulary: [
      { ar: "وِش", translit: "wesh", id: "apa", tag: "Najdi" },
      {
        ar: "مِنْ وِين",
        translit: "min wēn",
        id: "dari mana",
        tag: "Najdi",
      },
      {
        ar: "حَيَّاكَ الله",
        translit: "ḥayyāk Allāh",
        id: "selamat datang",
        tag: "ungkapan",
      },
      { ar: "أَبِي", translit: "abī", id: "saya mau", tag: "Najdi" },
    ],
    totalVocab: 18,
  },
};

export const dialogLines = [
  {
    speaker: "Ahmad",
    ar: "السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللهِ.",
    translit: "as-salāmu ʿalaykum wa raḥmatullāh.",
    id: "Semoga keselamatan dan rahmat Allah atasmu.",
  },
  {
    speaker: "Budi",
    ar: "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ.",
    translit: "wa ʿalaykum as-salām wa raḥmatullāh wa barakātuh.",
    id: "Dan atasmu keselamatan, rahmat Allah, dan keberkahan-Nya.",
  },
  {
    speaker: "Ahmad",
    ar: "حَيَّاكَ اللهُ، وِشْ اسْمَك؟",
    translit: "ḥayyāk Allāh, wesh ismak?",
    id: "Selamat datang; siapa namamu?",
  },
  {
    speaker: "Budi",
    ar: "اسْمِي بُودِي، وَأَنْتَ؟",
    translit: "ismī Būdī, wa inta?",
    id: "Namaku Budi, dan kamu?",
  },
] as const;

export const quizSample = {
  question: "Apa arti kata وِش dalam ragam Najdi?",
  options: ["Di mana", "Apa", "Siapa", "Kapan"],
  answerIndex: 1,
  explanation:
    "وِش berarti “apa” dalam ragam Najdi. Di Hijaz, kata yang sama adalah إِيش.",
} as const;

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Apakah saya harus bisa membaca huruf Arab dari awal?",
    a: "Tidak. Setiap kosakata dan contoh disertai transliterasi Latin, jadi Anda bisa mulai dari nol. Huruf Arab dan harakat tetap ditampilkan agar kebiasaan membaca terbentuk sejak minggu pertama.",
  },
  {
    q: "Apa bedanya jalur Fushah dan Amiyah Saudi?",
    a: "Fushah adalah bahasa Arab baku yang dipakai di berita, buku, dan dokumen resmi. Amiyah Saudi adalah ragam percakapan sehari-hari. Keduanya memakai 12 tema yang sama, sehingga Anda bisa membandingkan langsung cara mengatakan hal yang sama.",
  },
  {
    q: "Najdi dan Hijazi itu apa?",
    a: "Dua ragam Amiyah Saudi yang umum. Najdi dipakai di Riyadh dan sekitarnya, Hijazi di Jeddah dan pesisir barat. Lughati memakai Najdi sebagai acuan, lalu menampilkan bentuk Hijazi sebagai pembanding pada baris tertentu.",
  },
  {
    q: "Apakah minggu 1–2 benar-benar gratis?",
    a: "Ya. Minggu 1–2 di kedua jalur terbuka tanpa biaya. Minggu 3–12 berstatus premium. Aktivasi premium dilakukan lewat pengajuan permintaan dan dikonfirmasi admin, tanpa gateway pembayaran otomatis.",
  },
  {
    q: "Apakah latihan pelafalan butuh mikrofon?",
    a: "Hanya jika Anda ingin mencoba latihan pelafalan. Fitur ini memakai Web Speech API dan paling optimal di Chrome atau Edge. Materi, kuis, dan latihan kosakata tetap bisa dipakai tanpa mikrofon.",
  },
  {
    q: "Apakah audio dan kontennya sudah final?",
    a: "Kurikulum 12 minggu sudah lengkap dan kini berada pada tahap review bahasa. Aset audio masih dalam produksi, jadi tombol audio menampilkan status ketersediaan secara jujur — belum ada rekaman pengganti.",
  },
];
