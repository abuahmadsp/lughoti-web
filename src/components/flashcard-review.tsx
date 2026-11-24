"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
  IconAward,
  IconBadgeCheck,
  IconBook,
  IconBrain,
  IconBranch,
  IconCheck,
  IconCompare,
  IconFlame,
  IconGauge,
  IconInfinity,
  IconKeyboard,
  IconLightbulb,
  IconMic,
  IconPause,
  IconPlay,
  IconPremium,
  IconRefresh,
  IconRepeat,
  IconStar,
  IconTimer,
  IconVolume,
  IconWaveform,
  IconX,
  IconZap,
} from "./icons";

type RatingLevel = "1" | "2" | "3" | "4";

type Rating = {
  level: RatingLevel;
  label: string;
  interval: string;
  detail: string;
  dot: string;
  active: string;
};

type SessionCard = {
  arabic: string;
  translit: string;
  fushah: string;
  fushahTranslit: string;
  meaning: string;
  nuance: string;
  category: string;
  track: string;
  root: string;
  exampleArabic: string;
  exampleTranslit: string;
  exampleMeaning: string;
  note: string;
  speaker?: string;
};

type LastAnswer = {
  kind: "srs" | "talaqqi";
  arabic: string;
  label: string;
  interval: string;
  xp: number;
};

type TalaqqiStage = "analyzing" | "result";

const ratings: Rating[] = [
  {
    level: "1",
    label: "Ulangi Lagi",
    interval: "10 menit",
    detail: "Ulangi segera",
    dot: "bg-red-500",
    active:
      "border-red-300 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950/50 dark:text-red-100",
  },
  {
    level: "2",
    label: "Sulit",
    interval: "1 hari",
    detail: "Perlu latihan",
    dot: "bg-sand-500",
    active:
      "border-sand-300 bg-sand-100 text-sand-900 dark:border-sand-700 dark:bg-sand-300/15 dark:text-sand-100",
  },
  {
    level: "3",
    label: "Baik / Ingat",
    interval: "3 hari",
    detail: "Ideal",
    dot: "bg-brand",
    active:
      "border-brand bg-emerald-100 text-emerald-950 dark:border-brand/60 dark:bg-emerald-900/50 dark:text-emerald-50",
  },
  {
    level: "4",
    label: "Sangat Mudah",
    interval: "7 hari",
    detail: "Interval panjang",
    dot: "bg-emerald-950 dark:bg-emerald-400",
    active:
      "border-emerald-800 bg-emerald-200 text-emerald-950 dark:border-emerald-600 dark:bg-emerald-900/70 dark:text-emerald-50",
  },
];

const initialCounts = { repeat: 2, hard: 0, good: 12, easy: 0 };
const countKey: Record<RatingLevel, keyof typeof initialCounts> = {
  "1": "repeat",
  "2": "hard",
  "3": "good",
  "4": "easy",
};

const defaultSpeaker = "Syaikh Ahmad (Makkah al-Mukarramah)";
const START_INDEX = 14;
const START_SECONDS = 425;

// Contoh antrean sesi intensif. Seluruh entri bersifat ilustratif dan tidak
// diambil dari data pengguna maupun disimpan ke backend.
const cards: SessionCard[] = [
  {
    arabic: "كِتَابٌ",
    translit: "/kitābun/",
    fushah: "كِتَابٌ",
    fushahTranslit: "(kitābun)",
    meaning: "Buku",
    nuance: "Kata benda dasar untuk buku dalam bahasa Arab baku.",
    category: "Fushah Dasar",
    track: "Fushah",
    root: "ك-ت-ب",
    exampleArabic: "«هَذَا كِتَابٌ مُفِيدٌ جِدًّا»",
    exampleTranslit: "Hādhā kitābun mufīdun jiddan",
    exampleMeaning: "Ini adalah buku yang sangat bermanfaat.",
    note: "Akar ك-ت-ب juga membentuk كَتَبَ (menulis) dan مَكْتَبَة (perpustakaan).",
  },
  {
    arabic: "يَلَّا!",
    translit: "/yallā!/",
    fushah: "هَيَّا بِنَا",
    fushahTranslit: "(hayyā binā)",
    meaning: "Ayo / Mari!",
    nuance: "Seruan sangat umum di Saudi untuk mengajak orang bergerak.",
    category: "Perkenalan & Sapaan",
    track: "Amiyah Saudi",
    root: "ي-ل-ل",
    exampleArabic: "«يَلَّا، الوَقْتُ ضَاقَ!»",
    exampleTranslit: "Yallā, al-waqtu ḍāqa!",
    exampleMeaning: "Ayo, waktunya sudah mepet!",
    note: "Dalam Amiyah, يَلَّا menggantikan هَيَّا pada situasi kasual.",
  },
  {
    arabic: "إِيشْ؟",
    translit: "/ēsh?/",
    fushah: "مَاذَا؟",
    fushahTranslit: "(mādhā?)",
    meaning: "Apa?",
    nuance: "Kata tanya paling sering dipakai untuk bertanya 'apa'.",
    category: "Perkenalan & Sapaan",
    track: "Amiyah Saudi",
    root: "إ-ي-ش",
    exampleArabic: "«إِيشْ تِبْغَى؟»",
    exampleTranslit: "Ēsh tibghā?",
    exampleMeaning: "Apa yang kamu mau?",
    note: "Padanan Fushah-nya adalah مَاذَا; keduanya tidak dipakai bergantian dalam satu register.",
  },
  {
    arabic: "حَيَّاكَ اللهُ",
    translit: "/ḥayyākallāh/",
    fushah: "أَهْلًا وَسَهْلًا",
    fushahTranslit: "(ahlan wa sahlan)",
    meaning: "Selamat datang",
    nuance: "Sapaan hangat khas Saudi untuk memuliakan tamu.",
    category: "Perkenalan & Sapaan",
    track: "Amiyah Saudi",
    root: "ح-ي-ي",
    exampleArabic: "«حَيَّاكَ الله، تَفَضَّلِ الجُلُوس»",
    exampleTranslit: "Ḥayyākallāh, tafaḍḍal al-julūs",
    exampleMeaning: "Selamat datang, silakan duduk.",
    note: "Untuk perempuan, bentuknya حَيَّاكِ اللهُ (ḥayyāki Allāh).",
  },
  {
    arabic: "لَوْ سَمَحْتَ",
    translit: "/law samaḥta/",
    fushah: "لَوْ سَمَحْتَ",
    fushahTranslit: "(law samaḥta)",
    meaning: "Permisi / Tolong",
    nuance: "Ungkapan sopan sebelum memesan atau bertanya.",
    category: "Makanan & Restoran",
    track: "Fushah & Amiyah",
    root: "س-م-ح",
    exampleArabic: "«لَوْ سَمَحْتَ، أَبْغَى مَنِيُو الطَّعَام»",
    exampleTranslit: "Law samaḥta, abghā manyū aṭ-ṭa‘ām",
    exampleMeaning: "Permisi, saya minta menu makanannya.",
    note: "Bentuk untuk perempuan adalah لَوْ سَمَحْتِ (law samaḥti).",
  },
  {
    arabic: "مَطْعَمٌ",
    translit: "/maṭʿamun/",
    fushah: "مَطْعَمٌ",
    fushahTranslit: "(maṭʿamun)",
    meaning: "Restoran / Rumah makan",
    nuance: "Kata yang sama dipakai dalam Fushah dan Amiyah Saudi.",
    category: "Makanan & Restoran",
    track: "Fushah & Amiyah",
    root: "ط-ع-م",
    exampleArabic: "«أَيْنَ الْمَطْعَمُ الْقَرِيبُ؟»",
    exampleTranslit: "Ayna al-maṭʿamu al-qarību?",
    exampleMeaning: "Di mana restoran terdekat?",
    note: "Akar ط-ع-م berkaitan dengan makan; مَطْعَم berarti tempat makan.",
  },
  {
    arabic: "كَيْفَ الحَالُ؟",
    translit: "/kayfa al-ḥālu?/",
    fushah: "كَيْفَ حَالُكَ؟",
    fushahTranslit: "(kayfa ḥāluka?)",
    meaning: "Apa kabar?",
    nuance: "Sapaan Fushah yang lazim dalam percakapan formal.",
    category: "Perkenalan & Sapaan",
    track: "Fushah",
    root: "ح-و-ل",
    exampleArabic: "«السَّلَامُ عَلَيْكُم، كَيْفَ الحَالُ؟»",
    exampleTranslit: "Assalāmu ‘alaykum, kayfa al-ḥālu?",
    exampleMeaning: "Assalamu’alaikum, apa kabar?",
    note: "Dalam Amiyah Saudi, sapaan ini sering diganti dengan «كَيْفِي؟».",
  },
  {
    arabic: "شُكْرًا",
    translit: "/syukran/",
    fushah: "شُكْرًا",
    fushahTranslit: "(syukran)",
    meaning: "Terima kasih",
    nuance: "Ungkapan terima kasih paling dikenal lintas dialek.",
    category: "Perkenalan & Sapaan",
    track: "Fushah & Amiyah",
    root: "ش-ك-ر",
    exampleArabic: "«شُكْرًا جَزِيلًا!»",
    exampleTranslit: "Syukran jazīlan!",
    exampleMeaning: "Terima kasih banyak!",
    note: "Balasan yang sopan adalah عَفْوًا (‘afwan).",
  },
  {
    arabic: "الْمَاءُ",
    translit: "/al-mā’u/",
    fushah: "الْمَاءُ",
    fushahTranslit: "(al-mā’u)",
    meaning: "Air",
    nuance: "Kata benda Fushah yang tetap dipahami di seluruh dialek.",
    category: "Makanan & Restoran",
    track: "Fushah",
    root: "م-و-ه",
    exampleArabic: "«مِنْ فَضْلِكَ، كُوبٌ مِنَ الْمَاءِ»",
    exampleTranslit: "Min faḍlika, kūbun mina al-mā’i",
    exampleMeaning: "Tolong, segelas air.",
    note: "Di Amiyah Saudi, kata مَيّ kemudian sering dipakai untuk air mineral.",
  },
  {
    arabic: "التَّمْرُ",
    translit: "/at-tamru/",
    fushah: "التَّمْرُ",
    fushahTranslit: "(at-tamru)",
    meaning: "Kurma",
    nuance: "Kata yang sangat akrab dalam budaya Arab Saudi.",
    category: "Makanan & Restoran",
    track: "Fushah & Amiyah",
    root: "ت-م-ر",
    exampleArabic: "«عِنْدَنَا تَمْرٌ مَعَ الْقَهْوَة»",
    exampleTranslit: "‘Indanā tamrun ma‘a al-qahwah",
    exampleMeaning: "Kami punya kurma dengan kopi.",
    note: "Bentuk jamaknya تُمُورٌ (tumūrun).",
  },
  {
    arabic: "كَبْسَة لَحَم",
    translit: "/kabsah laḥam/",
    fushah: "كَبْسَةُ لَحْمٍ",
    fushahTranslit: "(kabsatu laḥmin)",
    meaning: "Kabsa daging",
    nuance: "Menu nasi berbumbu khas jazirah Arab.",
    category: "Makanan & Restoran",
    track: "Amiyah Saudi",
    root: "ك-ب-س",
    exampleArabic: "«أَبْغَى كَبْسَة لَحَم، لَوْ سَمَحْتَ»",
    exampleTranslit: "Abghā kabsah laḥam, law samaḥta",
    exampleMeaning: "Saya mau kabsa daging, tolong.",
    note: "Kabsa biasanya disajikan bersama daging kambing atau ayam.",
  },
  {
    arabic: "قَهْوَة سُعُودِيَّة",
    translit: "/qahwah su‘ūdiyyah/",
    fushah: "قَهْوَةٌ سُعُودِيَّةٌ",
    fushahTranslit: "(qahwatun su‘ūdiyyatun)",
    meaning: "Kopi Saudi",
    nuance: "Kopi dengan rempah khas, sering disajikan bersama kurma.",
    category: "Makanan & Restoran",
    track: "Amiyah Saudi",
    root: "ق-ه-و",
    exampleArabic: "«قَهْوَة سُعُودِيَّة، مِنْ فَضْلِكَ»",
    exampleTranslit: "Qahwah su‘ūdiyyah, min faḍlika",
    exampleMeaning: "Kopi Saudi, tolong.",
    note: "Dialek Hijazi sering melafalkan قَهْوَة sebagai «gahwah».",
  },
  {
    arabic: "مَضْبِي دَجَاج",
    translit: "/maḍbī dajāj/",
    fushah: "دَجَاجٌ مَشْوِيٌّ",
    fushahTranslit: "(dajājun mashwiyyun)",
    meaning: "Ayam madhbi",
    nuance: "Ayam panggang khas Saudi yang dibumbui sebelum dibakar.",
    category: "Makanan & Restoran",
    track: "Amiyah Saudi",
    root: "ض-ب-ي",
    exampleArabic: "«الْمَضْبِي طَازَجٌ الْيَوْم»",
    exampleTranslit: "Al-maḍbī ṭāzajun al-yawm",
    exampleMeaning: "Madhbi hari ini masih segar.",
    note: "Biasanya dipasangkan dengan nasi kabsa atau roti.",
  },
  {
    arabic: "أَبْغَى",
    translit: "/abghā/",
    fushah: "أُرِيدُ",
    fushahTranslit: "(urīdu)",
    meaning: "Saya mau / Saya ingin",
    nuance: "Kata kerja Amiyah Saudi untuk menyatakan keinginan secara langsung.",
    category: "Makanan & Restoran",
    track: "Amiyah Saudi",
    root: "ب-غ-ي",
    exampleArabic: "«أَبْغَى كَبْسَة لَحَم مَعَ قَهْوَة سُعُودِيَّة، لَوْ سَمَحْتَ»",
    exampleTranslit: "Abghā kabsah laḥam ma‘a qahwah su‘ūdiyyah, law samaḥta",
    exampleMeaning: "Saya mau kabsa daging dengan kopi Saudi, tolong ya.",
    note: "أَبْغَى berakar dari بَغَى - يَبْغِي (mencari/menginginkan) dalam Fushah.",
  },
  {
    arabic: "كَمِ الحِسَاب؟",
    translit: "/kam il-ḥisāb?/",
    fushah: "كَمِ الثَّمَنُ؟ / كَمِ السِّعْرُ؟",
    fushahTranslit: "(kam ath-tsamanu? / kam as-si‘ru?)",
    meaning: "Berapa tagihannya? / Berapa bonnya?",
    nuance: "Frasa inti untuk menanyakan total tagihan di restoran atau kafe.",
    category: "Transaksi & Belanja",
    track: "Amiyah Saudi",
    root: "ح-س-ب",
    exampleArabic: "«لَوْ سَمَحْتَ، كَمِ الحِسَاب لِلْقَهْوَة وَالتَّمْر؟»",
    exampleTranslit: "Law samaḥta, kam il-ḥisāb lil-qahwah wat-tamr?",
    exampleMeaning: "Permisi, berapa total bon untuk kopi dan kurma ini?",
    note: "Kata الحِسَاب dipakai luas di jazirah Arab saat meminta bon atau tagihan, menggantikan pertanyaan formal Fushah.",
  },
  {
    arabic: "فِين المَطْعَم؟",
    translit: "/fīn al-maṭ‘am?/",
    fushah: "أَيْنَ الْمَطْعَمُ؟",
    fushahTranslit: "(ayna al-maṭ‘amu?)",
    meaning: "Di mana restorannya?",
    nuance: "Kata tanya tempat فِين adalah bentuk khas Amiyah Saudi.",
    category: "Transportasi & Arah",
    track: "Amiyah Saudi",
    root: "ف-ي-ن",
    exampleArabic: "«فِين المَطْعَمُ الَّذِي يَبِيعُ الْكَبْسَة؟»",
    exampleTranslit: "Fīn al-maṭ‘amu alladhī yabī‘u al-kabsah?",
    exampleMeaning: "Di mana restoran yang menjual kabsa?",
    note: "Dalam Fushah, gunakan أَيْنَ (ayna) sebagai pengganti فِين.",
  },
  {
    arabic: "مُمْتَاز جِدًّا",
    translit: "/mumtāz jiddan/",
    fushah: "مُمْتَاز جِدًّا",
    fushahTranslit: "(mumtāz jiddan)",
    meaning: "Sangat bagus",
    nuance: "Pujian sederhana yang aman di berbagai situasi.",
    category: "Perkenalan & Sapaan",
    track: "Fushah & Amiyah",
    root: "م-م-ت",
    exampleArabic: "«الطَّعَامُ مُمْتَاز جِدًّا، شُكْرًا»",
    exampleTranslit: "Aṭ-ṭa‘āmu mumtāz jiddan, syukran",
    exampleMeaning: "Makanannya sangat bagus, terima kasih.",
    note: "Bentuk ini identik di Fushah maupun percakapan sehari-hari.",
  },
  {
    arabic: "عَلَى كِيفَك",
    translit: "/‘alā kēfak/",
    fushah: "كَمَا تَشَاءُ",
    fushahTranslit: "(kamā tashā’u)",
    meaning: "Terserah kamu",
    nuance: "Ungkapan santai untuk memberi pilihan kepada lawan bicara.",
    category: "Perkenalan & Sapaan",
    track: "Amiyah Saudi",
    root: "ك-ي-ف",
    exampleArabic: "«نَحْنُ نَشْرَبُ الشَّاي، وَأَنْتَ عَلَى كِيفَك»",
    exampleTranslit: "Naḥnu nashrabu ash-shāy, wa-anta ‘alā kēfak",
    exampleMeaning: "Kami minum teh, dan kamu terserah saja.",
    note: "Untuk perempuan, bentuknya عَلَى كِيفِكِ (‘alā kēfiki).",
  },
  {
    arabic: "شُكْرًا جَزِيلًا",
    translit: "/syukran jazīlan/",
    fushah: "شُكْرًا جَزِيلًا",
    fushahTranslit: "(syukran jazīlan)",
    meaning: "Terima kasih banyak",
    nuance: "Bentuk apresiasi yang lebih puitis daripada شُكْرًا saja.",
    category: "Perkenalan & Sapaan",
    track: "Fushah",
    root: "ش-ك-ر",
    exampleArabic: "«شُكْرًا جَزِيلًا عَلَى الْمُسَاعَدَة»",
    exampleTranslit: "Syukran jazīlan ‘alā al-musā‘adah",
    exampleMeaning: "Terima kasih banyak atas bantuannya.",
    note: "Pasangan yang umum adalah عَفْوًا atau الْعَفْوُ (‘afwu).",
  },
  {
    arabic: "الله يِعْطِيك العَافِيَة",
    translit: "/Allāh yi‘ṭīk al-‘āfiyah/",
    fushah: "الله يُعْطِيكَ الْعَافِيَةَ",
    fushahTranslit: "(Allāh yu‘ṭīka al-‘āfiyata)",
    meaning: "Semoga Allah memberimu kesehatan",
    nuance: "Cara berterima kasih yang hangat kepada pekerja jasa.",
    category: "Perkenalan & Sapaan",
    track: "Amiyah Saudi",
    root: "ع-ط-ي",
    exampleArabic: "«الله يِعْطِيك العَافِيَة، يَا طَرِيق»",
    exampleTranslit: "Allāh yi‘ṭīk al-‘āfiyah, yā Ṭarīq",
    exampleMeaning: "Semoga Allah memberimu kesehatan, Tariq.",
    note: "Ungkapan ini lazim dipakai setelah menerima pelayanan di kafe atau restoran.",
  },
  {
    arabic: "مَنِيُو الطَّعَام",
    translit: "/manyū aṭ-ṭa‘ām/",
    fushah: "قَائِمَةُ الطَّعَامِ",
    fushahTranslit: "(qā’imatu aṭ-ṭa‘āmi)",
    meaning: "Menu makanan",
    nuance: "Kata «maniu» adalah penyerapan kata Prancis menu dalam Amiyah.",
    category: "Makanan & Restoran",
    track: "Amiyah Saudi",
    root: "م-ن-ي",
    exampleArabic: "«لَوْ سَمَحْت، هَاتِ مَنِيُو الطَّعَام»",
    exampleTranslit: "Law samaḥt, hāt-manyū aṭ-ṭa‘ām",
    exampleMeaning: "Permisi, tolong berikan menu makanannya.",
    note: "Dalam Fushah, kata yang lebih baku adalah قَائِمَةُ الطَّعَامِ.",
  },
  {
    arabic: "الْحُجْرَة",
    translit: "/al-ḥujrah/",
    fushah: "الْغُرْفَةُ",
    fushahTranslit: "(al-ghurfatu)",
    meaning: "Kamar / Ruangan",
    nuance: "Kata Amiyah Saudi untuk ruangan tempat menginap.",
    category: "Transportasi & Arah",
    track: "Amiyah Saudi",
    root: "ح-ج-ر",
    exampleArabic: "«الْحُجْرَةُ جَاهِزَةٌ، تَفَضَّلْ»",
    exampleTranslit: "Al-ḥujratu jāhizatun, tafaḍḍal",
    exampleMeaning: "Kamarnya sudah siap, silakan.",
    note: "Fushah memakai غُرْفَة (ghurfah), bukan حُجْرَة.",
  },
  {
    arabic: "بِكَمْ هَذَا؟",
    translit: "/bikam hādhā?/",
    fushah: "بِكَمْ هَذَا؟",
    fushahTranslit: "(bikam hādhā?)",
    meaning: "Berapa harga ini?",
    nuance: "Pertanyaan harga ringkas yang dipakai di pasar.",
    category: "Belanja di Pasar (Suuq)",
    track: "Fushah & Amiyah",
    root: "ك-م",
    exampleArabic: "«بِكَمْ هَذَا التَّمْرُ؟»",
    exampleTranslit: "Bikam hādhā at-tamru?",
    exampleMeaning: "Berapa harga kurma ini?",
    note: "Dengan menunjukkan barang, pertanyaan ini bisa dipakai tanpa menyebut nomor.",
  },
  {
    arabic: "غَالِي جِدًّا",
    translit: "/ghālī jiddan/",
    fushah: "غَالٍ جِدًّا",
    fushahTranslit: "(ghālin jiddan)",
    meaning: "Sangat mahal",
    nuance: "Ungkapan untuk menawar atau mengomentari harga.",
    category: "Belanja di Pasar (Suuq)",
    track: "Amiyah Saudi",
    root: "غ-ل-و",
    exampleArabic: "«هَذَا غَالِي جِدًّا، أَنَقِّصْ شَيَّ؟»",
    exampleTranslit: "Hādhā ghālī jiddan, anaqqiṣ shayya?",
    exampleMeaning: "Ini sangat mahal, bisa dikurangi sedikit?",
    note: "Akar غ-ل-و bermakna tinggi/mahal; lawan katanya رَخِيص.",
  },
  {
    arabic: "رَخِيص",
    translit: "/rakhīṣ/",
    fushah: "رَخِيصٌ",
    fushahTranslit: "(rakhīṣun)",
    meaning: "Murah",
    nuance: "Kata sifat untuk harga yang terjangkau.",
    category: "Belanja di Pasar (Suuq)",
    track: "Fushah & Amiyah",
    root: "ر-خ-ص",
    exampleArabic: "«السِّعْرُ رَخِيصٌ الْيَوْم»",
    exampleTranslit: "As-si‘ru rakhīṣun al-yawm",
    exampleMeaning: "Harganya murah hari ini.",
    note: "Bandingkan dengan غَالِي (mahal).",
  },
  {
    arabic: "أُرِيدُ أَنْ أَدْفَعَ",
    translit: "/urīdu an adfa‘a/",
    fushah: "أُرِيدُ أَنْ أَدْفَعَ",
    fushahTranslit: "(urīdu an adfa‘a)",
    meaning: "Saya ingin membayar",
    nuance: "Kalimat Fushah yang sopan untuk menutup transaksi.",
    category: "Transaksi & Belanja",
    track: "Fushah",
    root: "د-ف-ع",
    exampleArabic: "«أُرِيدُ أَنْ أَدْفَعَ بِالْبِطَاقَة»",
    exampleTranslit: "Urīdu an adfa‘a bi-l-biṭāqah",
    exampleMeaning: "Saya ingin membayar dengan kartu.",
    note: "Dalam Amiyah Saudi, kalimat ini sering menjadi أَبْغَى أَدْفَع.",
  },
  {
    arabic: "وَرَقَةُ الحِسَاب",
    translit: "/waraqatu al-ḥisāb/",
    fushah: "فَاتُورَةُ الْحِسَابِ",
    fushahTranslit: "(fātūratu al-ḥisābi)",
    meaning: "Bon / Tagihan",
    nuance: "Lembaran yang berisi rincian jumlah yang harus dibayar.",
    category: "Transaksi & Belanja",
    track: "Amiyah Saudi",
    root: "و-ر-ق",
    exampleArabic: "«هَاتِ وَرَقَةَ الحِسَاب، لَوْ سَمَحْتَ»",
    exampleTranslit: "Hāt waraqata al-ḥisāb, law samaḥta",
    exampleMeaning: "Tolong berikan bonnya.",
    note: "Dokumen resminya disebut فَاتُورَة (fā tūrah) dalam Fushah.",
  },
  {
    arabic: "أَيْنَ الحَمَّام؟",
    translit: "/ayna al-ḥammām?/",
    fushah: "أَيْنَ الْحَمَّامُ؟",
    fushahTranslit: "(ayna al-ḥammāmu?)",
    meaning: "Di mana toilet?",
    nuance: "Pertanyaan praktis yang sering dipakai wisatawan.",
    category: "Transportasi & Arah",
    track: "Fushah",
    root: "ح-م-م",
    exampleArabic: "«عُذْرًا، أَيْنَ الحَمَّامُ؟»",
    exampleTranslit: "‘Udhran, ayna al-ḥammāmu?",
    exampleMeaning: "Maaf, di mana toilet?",
    note: "Kata حَمَّام juga berarti kamar mandi atau tempat pemandian.",
  },
  {
    arabic: "يَمِينًا",
    translit: "/yamīnan/",
    fushah: "يَمِينًا",
    fushahTranslit: "(yamīnan)",
    meaning: "Ke kanan",
    nuance: "Petunjuk arah yang dipakai baik di Fushah maupun Amiyah.",
    category: "Transportasi & Arah",
    track: "Fushah & Amiyah",
    root: "ي-م-ن",
    exampleArabic: "«امْشِ يَمِينًا ثُمَّ اسْأَلْ»",
    exampleTranslit: "Imshi yamīnan thumma is’al",
    exampleMeaning: "Jalan ke kanan, lalu bertanyalah.",
    note: "Lawan katanya adalah شِمَالًا (shimālan), ke kiri.",
  },
  {
    arabic: "فِينَا نَرُوح؟",
    translit: "/fīnā narūḥ?/",
    fushah: "أَيْنَ نَذْهَبُ؟",
    fushahTranslit: "(ayna nadhhabu?)",
    meaning: "Ke mana kita pergi?",
    nuance: "Bentuk Amiyah untuk bertanya tujuan bersama.",
    category: "Transportasi & Arah",
    track: "Amiyah Saudi",
    root: "ر-و-ح",
    exampleArabic: "«فِينَا نَرُوحُ بَعْدَ الْغَدَاءِ؟»",
    exampleTranslit: "Fīnā narūḥu ba‘da al-ghadā’i?",
    exampleMeaning: "Ke mana kita pergi setelah makan siang?",
    note: "Padanan Fushah-nya memakai ذَهَبَ (dhahaba), bukan رَاحَ (rāḥa).",
  },
];

function formatTime(totalSeconds: number) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function arabicText(value: string, tashkeel: boolean) {
  if (tashkeel) return value;
  return value
    .replace(/[\u064B-\u065F\u0670]/g, "")
    .replace(/\u0640/g, "");
}

function xpFor(level: RatingLevel) {
  if (level === "1") return 5;
  if (level === "2") return 10;
  return 15;
}

export function FlashcardReview() {
  const [index, setIndex] = useState(START_INDEX);
  const [revealed, setRevealed] = useState(true);
  const [seconds, setSeconds] = useState(START_SECONDS);
  const [paused, setPaused] = useState(false);
  const [autoAudio, setAutoAudio] = useState(true);
  const [tashkeel, setTashkeel] = useState(true);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [slow, setSlow] = useState(false);
  const [talaqqiOpen, setTalaqqiOpen] = useState(false);
  const [talaqqiStage, setTalaqqiStage] = useState<TalaqqiStage>("analyzing");
  const [talaqqiNotice, setTalaqqiNotice] = useState<string | null>(null);
  const [lastAnswer, setLastAnswer] = useState<LastAnswer | null>(null);
  const [counts, setCounts] = useState(initialCounts);
  const [completed, setCompleted] = useState<number[]>(() =>
    Array.from({ length: START_INDEX }, (_, position) => position),
  );
  const talaqqiTriggerRef = useRef<HTMLButtonElement>(null);

  const sessionComplete = index >= cards.length;
  const currentNumber = Math.min(index + 1, cards.length);
  const currentCard = cards[Math.min(index, cards.length - 1)];
  const progress = Math.round((currentNumber / cards.length) * 100);
  const rememberedCount = counts.good + counts.easy;
  const reviewCount = counts.repeat + counts.hard;
  const retention = Math.max(88, Math.min(98, 94 + counts.easy - counts.repeat));

  const playAudio = useCallback(() => {
    setPlaying(true);
    window.setTimeout(() => setPlaying(false), 750);
  }, []);

  const openTalaqqi = useCallback(() => {
    setTalaqqiStage("analyzing");
    setTalaqqiNotice(null);
    setTalaqqiOpen(true);
  }, []);

  const closeTalaqqi = useCallback(() => {
    setTalaqqiOpen(false);
    setTalaqqiStage("analyzing");
    setTalaqqiNotice(null);
    window.setTimeout(() => talaqqiTriggerRef.current?.focus(), 0);
  }, []);

  const retryTalaqqi = useCallback(() => {
    setTalaqqiNotice(null);
    setTalaqqiStage("analyzing");
  }, []);

  const saveTalaqqi = useCallback(() => {
    setLastAnswer({
      kind: "talaqqi",
      arabic: "كَمِ الحِسَاب؟",
      label: "Mumtaz",
      interval: "96%",
      xp: 20,
    });
    setCompleted((value) => (value.includes(index) ? value : [...value, index]));
    setIndex((value) => Math.min(value + 1, cards.length));
    setRevealed(false);
    if (autoAudio && !paused && !sessionComplete) playAudio();
    closeTalaqqi();
  }, [autoAudio, closeTalaqqi, index, paused, playAudio, sessionComplete]);

  const selectCard = useCallback(
    (cardIndex: number) => {
      if (cardIndex < 0 || cardIndex >= cards.length) return;
      setIndex(cardIndex);
      setRevealed(true);
      setLastAnswer(null);
      setSlow(false);
      setPlaying(false);
      if (autoAudio && !paused) playAudio();
    },
    [autoAudio, paused, playAudio],
  );

  useEffect(() => {
    if (paused || sessionComplete) return;
    const interval = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [paused, sessionComplete]);

  useEffect(() => {
    if (!talaqqiOpen || talaqqiStage !== "analyzing") return;
    const timeout = window.setTimeout(() => setTalaqqiStage("result"), 1500);
    return () => window.clearTimeout(timeout);
  }, [talaqqiOpen, talaqqiStage]);

  useEffect(() => {
    if (!talaqqiNotice) return;
    const timeout = window.setTimeout(() => setTalaqqiNotice(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [talaqqiNotice]);

  const answer = useCallback(
    (level: RatingLevel) => {
      if (sessionComplete) return;
      const rating = ratings.find((item) => item.level === level);
      if (!rating) return;

      setLastAnswer({
        kind: "srs",
        arabic: currentCard.arabic,
        label: rating.label,
        interval: rating.interval,
        xp: xpFor(level),
      });
      setCounts((value) => ({
        ...value,
        [countKey[level]]: value[countKey[level]] + 1,
      }));
      setCompleted((value) => (value.includes(index) ? value : [...value, index]));
      setIndex((value) => Math.min(value + 1, cards.length));
      setRevealed(false);
      if (autoAudio && !paused) playAudio();
    },
    [autoAudio, currentCard.arabic, index, paused, playAudio, sessionComplete],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (talaqqiOpen) return;

      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "SELECT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      const rating = ratings.find((item) => item.level === event.key);
      if (rating) {
        event.preventDefault();
        answer(rating.level);
        return;
      }
      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        playAudio();
        return;
      }
      if (event.key === " " && target?.tagName !== "BUTTON") {
        event.preventDefault();
        setRevealed((value) => !value);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [answer, playAudio, talaqqiOpen]);

  function resetSession() {
    setIndex(START_INDEX);
    setRevealed(true);
    setSeconds(START_SECONDS);
    setPaused(false);
    setPlaying(false);
    setSlow(false);
    setTalaqqiOpen(false);
    setTalaqqiStage("analyzing");
    setTalaqqiNotice(null);
    setLastAnswer(null);
    setCounts(initialCounts);
    setCompleted(Array.from({ length: START_INDEX }, (_, position) => position));
    setShortcutsOpen(false);
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Session status and live controls */}
      <section className="flex flex-col gap-4 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between sm:p-5">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-950 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sand-200 dark:bg-emerald-900">
              <IconPremium className="size-3.5" />
              VIP Scholar
              <span className="rounded bg-white/15 px-1 py-0.5 text-[8px] tracking-normal text-sand-100">
                Contoh
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
              <span
                aria-hidden="true"
                className={cn(
                  "size-1.5 rounded-full",
                  paused ? "bg-sand-500" : "animate-pulse-dot bg-brand",
                )}
              />
              Mode Intensif SRS &bull; 30 Mufrodat
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-sand-100 px-2.5 py-1 text-[10px] font-bold text-sand-900 dark:bg-sand-300/15 dark:text-sand-100">
              <IconFlame className="size-3.5" />
              Streak 12 Hari (Contoh)
            </span>
            <span className="rounded-full border border-line/70 bg-paper px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-muted">
              Data demo
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-paper px-2.5 py-1 text-[11px] font-semibold text-ink xl:ml-2">
              <IconTimer className="size-3.5 text-brand" />
              <span className="font-mono" aria-label={`Waktu sesi ${formatTime(seconds)}`}>
                {formatTime(seconds)}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="h-2 flex-1 overflow-hidden rounded-full bg-line/60"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progres sesi hafalan"
            >
              <div
                className="h-full rounded-full bg-brand transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="whitespace-nowrap text-[10px] font-semibold text-muted">
              Kartu {currentNumber} / {cards.length}{" "}
              <span className="text-brand">({progress}%)</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 xl:justify-end">
          <button
            type="button"
            aria-pressed={autoAudio}
            onClick={() => setAutoAudio((value) => !value)}
            title="Pratinjau — audio native belum direkam"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-semibold transition-colors",
              autoAudio
                ? "border-brand/30 bg-emerald-50 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100"
                : "border-line/70 bg-paper text-muted hover:text-ink",
            )}
          >
            <IconVolume
              className={cn("size-3.5", playing && "animate-pulse", autoAudio ? "text-brand" : "")}
            />
            Auto Audio
          </button>
          <button
            type="button"
            aria-pressed={tashkeel}
            onClick={() => setTashkeel((value) => !value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[10px] font-semibold transition-colors",
              tashkeel
                ? "border-sand-300 bg-sand-100 text-sand-900 dark:bg-sand-300/15 dark:text-sand-100"
                : "border-line/70 bg-paper text-muted hover:text-ink",
            )}
          >
            <span className="font-arabic text-[14px] font-bold leading-none text-gold">
              َـِـُ
            </span>
            Tashkeel Lengkap
          </button>
          <button
            type="button"
            aria-expanded={shortcutsOpen}
            aria-controls="flashcard-shortcuts"
            onClick={() => setShortcutsOpen((value) => !value)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-paper px-3 py-1.5 text-[10px] font-semibold text-muted transition-colors hover:bg-line/30 hover:text-ink"
          >
            <IconKeyboard className="size-3.5" />
            Shortcut
          </button>
          <button
            type="button"
            onClick={() => setPaused((value) => !value)}
            aria-pressed={paused}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-950 px-3 py-1.5 text-[10px] font-bold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900 dark:hover:bg-emerald-800"
          >
            {paused ? <IconPlay className="size-3.5" /> : <IconPause className="size-3.5" />}
            {paused ? "Lanjutkan" : "Jeda"}
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-8">
          {lastAnswer ? (
            <div
              role="status"
              className="animate-flow-in flex flex-wrap items-center justify-between gap-2 rounded-xl border border-brand/20 bg-emerald-50 px-4 py-3 text-emerald-950 shadow-sm dark:bg-emerald-900/30 dark:text-emerald-50"
            >
              <span className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
                <IconCheck className="size-4 text-brand" />
                {lastAnswer.kind === "talaqqi" ? (
                  <>
                    AI Talaqqi: lafal
                    <span lang="ar" dir="rtl" className="font-arabic font-bold text-brand">
                      «{arabicText(lastAnswer.arabic, tashkeel)}»
                    </span>
                    mencapai {lastAnswer.interval} ({lastAnswer.label}) &mdash; contoh,
                    tidak disimpan.
                  </>
                ) : (
                  <>
                    Mufrodat
                    <span lang="ar" dir="rtl" className="font-arabic font-bold text-brand">
                      «{arabicText(lastAnswer.arabic, tashkeel)}»
                    </span>
                    dijadwalkan {lastAnswer.interval} (interval SRS diperbarui).
                  </>
                )}
              </span>
              <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">
                +{lastAnswer.xp} XP (Contoh)
              </span>
            </div>
          ) : null}

          {sessionComplete ? (
            <section className="flex flex-col gap-5 rounded-2xl border border-line/70 bg-surface p-6 text-center shadow-md sm:p-10">
              <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-emerald-950 text-sand-200 dark:bg-emerald-900">
                <IconAward className="size-7" />
              </span>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-ink">
                  Sesi 30 Mufrodat Selesai
                </h2>
                <p className="text-[12px] leading-5 text-muted">
                  Contoh ringkasan sesi. Tidak ada nilai, jadwal SRS, XP, atau
                  progres yang disimpan.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: "Kartu", value: `${cards.length} / ${cards.length}` },
                  { label: "Diingat", value: rememberedCount },
                  { label: "Diulang", value: reviewCount },
                  { label: "Estimasi", value: formatTime(seconds) },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-paper p-3 shadow-sm"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">
                      {item.label}
                    </p>
                    <p className="mt-1 text-[17px] font-bold text-brand">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={resetSession}
                className="mx-auto inline-flex items-center gap-2 rounded-xl bg-emerald-950 px-5 py-2.5 text-[12px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 dark:bg-emerald-900"
              >
                <IconRefresh className="size-4" />
                Ulangi Sesi Demo
              </button>
            </section>
          ) : (
            <>
              <section className="relative overflow-hidden rounded-2xl border border-line/70 bg-surface shadow-md">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand/5 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-20 -left-20 size-64 rounded-full bg-sand-300/20 blur-3xl"
                />
                <div className="h-1.5 w-full bg-gradient-to-r from-sand-300 via-brand to-emerald-950" />

                <div className="relative z-10 flex flex-col gap-5 p-4 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold",
                          currentCard.track === "Amiyah Saudi"
                            ? "bg-sand-100 text-sand-900 dark:bg-sand-300/15 dark:text-sand-100"
                            : "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100",
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn(
                            "size-1.5 rounded-full",
                            currentCard.track === "Amiyah Saudi"
                              ? "bg-sand-500"
                              : "bg-brand",
                          )}
                        />
                        {currentCard.track === "Amiyah Saudi"
                          ? "العامية السعودية (Amiyah Saudi)"
                          : currentCard.track}
                      </span>
                      <span className="text-[10px] font-medium text-muted">
                        &bull; {currentCard.category}
                      </span>
                    </div>
                    <span className="rounded-lg bg-paper px-2.5 py-1 font-mono text-[10px] text-muted">
                      ID: MUF-SA-{String(currentNumber).padStart(3, "0")}
                    </span>
                  </div>

                  <div className="relative flex flex-col items-center overflow-hidden rounded-xl bg-paper px-4 py-7 text-center sm:px-6">
                    <span
                      aria-hidden="true"
                      lang="ar"
                      dir="rtl"
                      className="pointer-events-none absolute right-5 top-1 select-none font-arabic text-[72px] leading-none text-line/40"
                    >
                      {currentCard.root.replace(/-/g, " ")}
                    </span>
                    <span className="relative mb-3 inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-[10px] font-bold tracking-wider text-brand shadow-sm">
                      <IconBranch className="size-3.5" />
                      AKAR: {currentCard.root}
                    </span>

                    <p
                      lang="ar"
                      dir="rtl"
                      className="relative font-arabic text-[34px] font-bold leading-[1.7] tracking-wide text-ink sm:text-[46px]"
                    >
                      {arabicText(currentCard.arabic, tashkeel)}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-[12px] font-semibold tracking-wide text-brand">
                      <span>{currentCard.translit}</span>
                      <span aria-hidden="true" className="size-1 rounded-full bg-line" />
                      <span className="font-normal text-muted">
                        {currentCard.nuance}
                      </span>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-center gap-3 rounded-full border border-line/70 bg-surface px-3 py-2 shadow-sm">
                      <button
                        type="button"
                        onClick={playAudio}
                        aria-pressed={playing}
                        aria-label="Putar pratinjau pengucapan"
                        title="Pratinjau — audio native belum direkam"
                        className={cn(
                          "grid size-10 place-items-center rounded-full bg-brand text-white transition-transform hover:scale-105 active:scale-95",
                          playing && "ring-4 ring-brand/20",
                        )}
                      >
                        <IconVolume
                          className={cn("size-5", playing && "animate-pulse")}
                        />
                      </button>
                      <div className="text-left">
                        <p className="text-[10px] font-bold leading-tight text-ink">
                          {currentCard.speaker ?? defaultSpeaker}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="flex h-3 items-end gap-0.5">
                            {["h-1.5", "h-2.5", "h-1", "h-3", "h-2", "h-3.5", "h-1.5"].map(
                              (height, position) => (
                                <span
                                  key={`${height}-${position}`}
                                  className={cn(
                                    "w-1 rounded-full bg-brand",
                                    playing ? "animate-eq" : "opacity-60",
                                    height,
                                  )}
                                />
                              ),
                            )}
                          </div>
                          <span className="text-[9px] text-muted">
                            Penutur asli &mdash; pratinjau
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSlow((value) => !value)}
                        aria-pressed={slow}
                        title="Pratinjau — audio belum direkam"
                        className={cn(
                          "rounded-lg px-2.5 py-1 text-[10px] font-bold shadow-sm transition-colors",
                          slow
                            ? "bg-emerald-950 text-white"
                            : "bg-paper text-brand hover:bg-line/30",
                        )}
                      >
                        {slow ? "0.85x" : "1.0x"}
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 rounded-lg bg-surface px-3 py-2 text-[11px]">
                      <IconBook className="size-3.5 text-brand" />
                      <span className="font-semibold text-muted">Padanan Fushah:</span>
                      <span
                        lang="ar"
                        dir="rtl"
                        className="font-arabic text-[14px] font-bold text-ink"
                      >
                        {arabicText(currentCard.fushah, tashkeel)}
                      </span>
                      <span className="font-mono text-[10px] text-brand">
                        {currentCard.fushahTranslit}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRevealed((value) => !value)}
                    aria-expanded={revealed}
                    aria-controls="flashcard-details"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-950 px-5 py-3 text-[12px] font-semibold text-white shadow-sm transition-colors hover:bg-emerald-900 sm:w-auto dark:bg-emerald-900 dark:hover:bg-emerald-800"
                  >
                    <IconZap className="size-4 text-sand-300" />
                    {revealed
                      ? "Sembunyikan Arti & Contoh"
                      : "Lihat Arti & Contoh Kalimat"}
                    <kbd className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-sand-200">
                      Space
                    </kbd>
                  </button>

                  {revealed ? (
                    <div
                      id="flashcard-details"
                      className="flex flex-col gap-3 border-t border-line/60 pt-4"
                    >
                      <div className="flex flex-col gap-1 rounded-xl bg-paper p-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-brand">
                          Arti & Makna Kontekstual
                        </p>
                        <p className="text-[15px] font-bold text-ink">
                          “{currentCard.meaning}”
                        </p>
                        <p className="text-[11px] leading-5 text-muted">
                          {currentCard.nuance}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 rounded-xl border border-line/70 bg-surface p-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-ink">
                            Contoh Percakapan (Suq &amp; Kafe)
                          </p>
                          <button
                            type="button"
                            onClick={playAudio}
                            className="inline-flex items-center gap-1 text-[10px] font-bold text-brand hover:underline"
                            title="Pratinjau — audio dialog belum direkam"
                          >
                            <IconPlay className="size-3.5" />
                            Dengar Audio Dialog
                          </button>
                        </div>
                        <p
                          lang="ar"
                          dir="rtl"
                          className="font-arabic text-[17px] font-semibold leading-loose text-ink"
                        >
                          {arabicText(currentCard.exampleArabic, tashkeel)}
                        </p>
                        <p className="font-mono text-[10px] italic text-brand">
                          {currentCard.exampleTranslit}
                        </p>
                        <p className="text-[11px] text-muted">
                          {currentCard.exampleMeaning}
                        </p>
                      </div>

                      <div className="flex items-start gap-2.5 rounded-xl bg-sand-100 p-3.5 text-sand-900 dark:bg-sand-300/15 dark:text-sand-100">
                        <IconLightbulb className="mt-0.5 size-4 shrink-0 text-sand-700 dark:text-sand-300" />
                        <div className="flex flex-col gap-1">
                          <p className="text-[10px] font-bold uppercase tracking-wide">
                            Kaidah Dialek &amp; Budaya
                          </p>
                          <p className="text-[11px] leading-5">{currentCard.note}</p>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </section>

              <section className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                    <IconBrain className="size-4 text-brand" />
                    Evaluasi Penguasaan SRS (Spaced Repetition)
                  </span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-900 dark:bg-emerald-900/40 dark:text-emerald-100">
                    Rekomendasi algoritma: 88% akurasi dek ini
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
                  {ratings.map((rating) => (
                    <button
                      key={rating.level}
                      type="button"
                      onClick={() => answer(rating.level)}
                      aria-label={`${rating.label}, ulang ${rating.interval}, pintasan ${rating.level}`}
                      className={cn(
                        "relative flex flex-col items-center rounded-xl border border-line/60 bg-paper p-3 text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
                        rating.level === "3" && "border-brand/30",
                      )}
                    >
                      {rating.level === "3" ? (
                        <span className="absolute -right-1 -top-1 rounded bg-brand px-1.5 py-0.5 text-[8px] font-bold text-white">
                          Ideal
                        </span>
                      ) : null}
                      <span className="flex items-center gap-1 text-[11px] font-bold">
                        {rating.level === "1" ? (
                          <IconRepeat className="size-3.5" />
                        ) : rating.level === "4" ? (
                          <IconCheck className="size-3.5" />
                        ) : (
                          <span className={cn("size-2 rounded-full", rating.dot)} />
                        )}
                        {rating.label}
                      </span>
                      <span className="mt-0.5 text-[9px] font-semibold text-muted">
                        {rating.interval}
                      </span>
                      <span className="mt-0.5 text-[8px] text-muted/70">
                        {rating.detail}
                      </span>
                      <kbd className="mt-1.5 rounded bg-line/40 px-1.5 py-0.5 font-mono text-[9px] font-bold text-muted">
                        {rating.level}
                      </kbd>
                    </button>
                  ))}
                </div>
                <p className="text-[10px] leading-4 text-muted">
                  Pratinjau &mdash; penjadwalan SRS, timer, XP, dan pilihan jawaban
                  tidak disimpan. Tekan 1&ndash;4 untuk menilai kartu.
                </p>
              </section>
            </>
          )}
        </div>

        <aside className="flex flex-col gap-4 lg:col-span-4">
          <section className="relative flex flex-col gap-3 overflow-hidden rounded-2xl bg-emerald-950 p-4 text-white shadow-md dark:bg-emerald-900">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-6 -right-6 size-24 rounded-full bg-brand/25 blur-xl"
            />
            <div className="relative z-10 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-100">
                <IconMic className="size-3.5" />
                AI Talaqqi Speech Engine
              </span>
              <span className="rounded-full bg-brand px-2 py-0.5 text-[9px] font-bold text-white">
                Pratinjau
              </span>
            </div>
            <p className="relative z-10 text-[11px] leading-5 text-emerald-50/85">
              Simulasi uji makhraj <strong>«ح» (Ḥā’)</strong> dan{" "}
              <strong>«ع» (‘Ayn)</strong>. Tidak ada mikrofon yang diakses dan
              tidak ada suara yang direkam.
            </p>
            <button
              ref={talaqqiTriggerRef}
              type="button"
              onClick={openTalaqqi}
              aria-haspopup="dialog"
              aria-expanded={talaqqiOpen}
              className="relative z-10 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-[11px] font-bold text-white shadow-sm transition-all hover:bg-emerald-700 active:scale-95"
            >
              <IconMic className="size-4" />
              Uji Lafal Anda Sekarang
            </button>
          </section>

          <section className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[15px] font-bold text-ink">Status 30 Mufrodat</h3>
              <span className="text-[10px] font-bold text-brand">
                {currentNumber} / {cards.length} Aktif
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-paper p-2.5">
                <p className="text-[9px] font-medium text-muted">Selesai (Ingat)</p>
                <p className="mt-0.5 text-[16px] font-bold text-brand">
                  {rememberedCount} Kata
                </p>
              </div>
              <div className="rounded-lg bg-paper p-2.5">
                <p className="text-[9px] font-medium text-muted">Butuh Ulang</p>
                <p className="mt-0.5 text-[16px] font-bold text-red-600 dark:text-red-400">
                  {reviewCount} Kata
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <p className="text-[9px] font-bold uppercase tracking-wider text-muted">
                  Antrean 30 Mufrodat
                </p>
                <span className="text-[8px] font-semibold text-brand">
                  Klik untuk buka (Contoh)
                </span>
              </div>
              <div className="flex max-h-60 flex-col gap-1.5 overflow-y-auto pr-1">
                {cards.map((item, cardIndex) => {
                  const isActive = cardIndex === index;
                  const isDone = !isActive && completed.includes(cardIndex);
                  return (
                    <button
                      key={cardIndex}
                      type="button"
                      onClick={() => selectCard(cardIndex)}
                      aria-current={isActive ? "step" : undefined}
                      aria-label={`Buka mufrodat ${cardIndex + 1} dari ${cards.length}: ${item.meaning}`}
                      className={cn(
                        "flex w-full items-center justify-between gap-2 rounded-lg px-2 py-2 text-left transition-colors hover:bg-line/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60",
                        isActive &&
                          "bg-emerald-50 ring-1 ring-brand/40 dark:bg-emerald-900/40",
                        isDone && "bg-paper text-muted opacity-75",
                        !isActive && !isDone && "bg-paper/60",
                      )}
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        {isDone ? (
                          <IconCheck className="size-3.5 shrink-0 text-brand" />
                        ) : isActive ? (
                          <span
                            aria-hidden="true"
                            className="size-2 shrink-0 animate-pulse-dot rounded-full bg-brand"
                          />
                        ) : (
                          <span className="w-4 shrink-0 text-center font-mono text-[9px] text-muted">
                            {cardIndex + 1}.
                          </span>
                        )}
                        <span
                          lang="ar"
                          dir="rtl"
                          className={cn(
                            "truncate font-arabic text-[12px] font-semibold",
                            isDone
                              ? "text-muted line-through"
                              : isActive
                                ? "text-brand"
                                : "text-ink",
                          )}
                        >
                          {arabicText(item.arabic, tashkeel)}
                        </span>
                        <span className="hidden truncate text-[9px] text-muted sm:inline">
                          ({item.meaning})
                        </span>
                      </div>
                      {isActive || isDone ? (
                        <span className="shrink-0 text-[8px] font-bold text-brand">
                          {cardIndex + 1} / {cards.length}
                        </span>
                      ) : (
                        <IconTimer className="size-3.5 shrink-0 text-muted/60" />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[8px] leading-3 text-muted">
                Memilih antrean hanya memindahkan tampilan kartu demo; tidak
                menulis progres SRS.
              </p>
            </div>
          </section>

          <section className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface p-4 shadow-sm">
            <div className="flex items-center gap-2 text-ink">
              <IconGauge className="size-4 text-brand" />
              <h4 className="text-[11px] font-bold">Prediksi Retensi Memori</h4>
              <span className="ml-auto rounded-full bg-paper px-2 py-0.5 text-[8px] font-bold uppercase text-muted">
                Contoh
              </span>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-paper p-3">
              <div className="relative size-14 shrink-0">
                <svg viewBox="0 0 36 36" className="size-full -rotate-90">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    className="text-line"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={`${retention}, 100`}
                    className="text-brand transition-all duration-500"
                  />
                </svg>
                <span className="absolute inset-0 grid place-items-center text-[12px] font-bold text-ink">
                  {retention}%
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-muted">Target daya ingat harian</span>
                <span className="text-[11px] font-bold text-ink">
                  Peningkatan +12% (Contoh)
                </span>
                <span className="text-[9px] font-semibold text-brand">
                  Interval SM-2 ilustratif
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-paper px-3 py-2 text-[10px]">
              <span className="text-muted">Review esok (H+1):</span>
              <span className="font-bold text-ink">18 Mufrodat terjadwal</span>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] leading-4 text-muted">
              <IconInfinity className="size-3.5 shrink-0 text-brand" />
              Semua angka di sidebar ini contoh dan tidak dihitung dari sesi
              sungguhan.
            </div>
          </section>
        </aside>
      </div>

      {/* Shortcut drawer */}
      {shortcutsOpen ? (
        <div
          id="flashcard-shortcuts"
          className="animate-flow-in fixed bottom-4 right-4 z-30 w-[calc(100vw-2rem)] max-w-sm rounded-xl border border-line/70 bg-emerald-950 p-4 text-white shadow-xl sm:bottom-6 sm:right-6"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-[11px] font-bold text-sand-200">
              <IconKeyboard className="size-4" />
              Pintasan Keyboard SRS
            </p>
            <button
              type="button"
              onClick={() => setShortcutsOpen(false)}
              aria-label="Tutup pintasan keyboard"
              className="rounded p-1 text-emerald-100 transition-colors hover:bg-white/10 hover:text-white"
            >
              <IconX className="size-4" />
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[10px]">
            {[
              { action: "Balik kartu", key: "Space" },
              { action: "Ulangi lagi", key: "1" },
              { action: "Sulit", key: "2" },
              { action: "Baik / ingat", key: "3" },
              { action: "Sangat mudah", key: "4" },
              { action: "Putar audio", key: "R" },
            ].map((shortcut) => (
              <div
                key={shortcut.key}
                className="flex items-center justify-between gap-2 rounded bg-white/10 px-2 py-1.5"
              >
                <span className="text-emerald-50">{shortcut.action}</span>
                <kbd className="rounded bg-emerald-950 px-1.5 py-0.5 font-mono text-[9px] font-bold text-sand-200">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-[9px] leading-4 text-emerald-100/80">
            <IconBadgeCheck className="size-3.5 shrink-0" />
            Pintasan hanya mengubah tampilan demo, bukan data pengguna.
          </p>
        </div>
      ) : null}

      {paused && !sessionComplete ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 mx-auto w-fit rounded-full border border-line/70 bg-surface/95 px-4 py-2 text-[10px] font-bold text-ink shadow-lg backdrop-blur-sm">
          Sesi dijeda &mdash; timer berhenti sementara
        </div>
      ) : null}

      {talaqqiOpen ? (
        <TalaqqiSpeechDialog
          stage={talaqqiStage}
          notice={talaqqiNotice}
          onClose={closeTalaqqi}
          onRetry={retryTalaqqi}
          onSave={saveTalaqqi}
          onDemoAction={setTalaqqiNotice}
        />
      ) : null}
    </div>
  );
}

const talaqqiWaveform = [16, 28, 48, 40, 56, 36, 20, 44, 60, 52, 32, 48, 56, 40, 24, 12];

const talaqqiMakhraj = [
  {
    arabic: "ك",
    name: "Kaf",
    score: "98%",
    makhraj: "Aqsha al-Lisan",
    note: "Hams lembut dan artikulasi pangkal lidah tepat.",
  },
  {
    arabic: "مِ",
    name: "Mim Kasrah",
    score: "95%",
    makhraj: "Washal Alif-Lam",
    note: "Transisi kasrah sambung (kam-il) mengalir alami.",
  },
  {
    arabic: "ح",
    name: "Ḥā’",
    score: "94%",
    makhraj: "Wast al-Halq",
    note: "Fasīḥ di tenggorokan tengah tanpa desah berlebih.",
  },
  {
    arabic: "س",
    name: "Sīn",
    score: "97%",
    makhraj: "Shafir al-Lisan",
    note: "Desis shafir tajam dan murni tanpa sengau.",
  },
  {
    arabic: "ب",
    name: "Bā’",
    score: "96%",
    makhraj: "Asy-Syafatain",
    note: "Katupan bibir rapat sempurna saat waqaf tanda tanya.",
  },
];

function TalaqqiSpeechDialog({
  stage,
  notice,
  onClose,
  onRetry,
  onSave,
  onDemoAction,
}: {
  stage: TalaqqiStage;
  notice: string | null;
  onClose: () => void;
  onRetry: () => void;
  onSave: () => void;
  onDemoAction: (message: string) => void;
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
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-emerald-950/65 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="talaqqi-dialog-title"
        aria-describedby="talaqqi-dialog-desc"
        className="animate-flow-in relative my-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-line/70 bg-paper shadow-2xl outline-none"
      >
        <header className="flex items-center justify-between gap-3 bg-gradient-to-r from-emerald-900 to-emerald-950 px-4 py-3 text-white sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-50/15 text-sand-200">
              <IconMic className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="talaqqi-dialog-title" className="text-[14px] font-bold leading-tight sm:text-[16px]">
                  AI Talaqqi Speech Engine
                </h2>
                <span className="rounded-full bg-brand px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  Live
                </span>
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-50">
                  Pratinjau
                </span>
              </div>
              <p id="talaqqi-dialog-desc" className="mt-0.5 flex items-center gap-1.5 text-[10px] text-emerald-100">
                <span className="size-1.5 animate-pulse-dot rounded-full bg-sand-200" />
                Analisis Fonetik &amp; Makhraj Real-Time (Simulasi)
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup uji lafal"
            className="grid size-8 shrink-0 place-items-center rounded-lg text-emerald-100 transition-colors hover:bg-white/10 hover:text-white"
          >
            <IconX className="size-4" />
          </button>
        </header>

        <div className="flex max-h-[78vh] flex-col gap-4 overflow-y-auto p-4 sm:p-6">
          <section className="flex flex-col items-center justify-center rounded-xl border border-line/70 bg-surface px-4 py-3 text-center">
            <span className="mb-2 rounded-full bg-sand-100 px-3 py-1 text-[9px] font-bold text-sand-900 dark:bg-sand-300/20 dark:text-sand-100">
              Target Pelafalan &bull; Amiyah Saudi
            </span>
            <p lang="ar" dir="rtl" className="font-arabic text-[30px] font-bold leading-normal text-ink sm:text-[36px]">
              كَمِ الحِسَاب؟
            </p>
            <div className="mt-1 flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold text-brand">
              <span>[kam il-ḥi-sāb]</span>
              <span className="size-1 rounded-full bg-line" />
              <span className="font-normal text-muted">&ldquo;Berapa tagihannya? / Berapa harganya?&rdquo;</span>
            </div>
          </section>

          {stage === "analyzing" ? (
            <section className="flex flex-col items-center gap-3 rounded-xl border border-line/70 bg-surface px-4 py-8 text-center">
              <IconWaveform className="size-8 animate-eq text-brand" />
              <p className="text-[13px] font-bold text-ink">Menganalisis Makhraj…</p>
              <p className="max-w-sm text-[10px] leading-4 text-muted">
                Simulasi pengenalan fonetik. Tidak ada mikrofon yang diakses, tidak ada suara
                yang direkam, dan tidak ada data yang dikirim.
              </p>
              <div className="flex h-10 items-end justify-center gap-1.5" aria-hidden="true">
                {talaqqiWaveform.map((height, position) => (
                  <span
                    key={position}
                    style={{ height: `${Math.round(height * 0.45)}px` }}
                    className="w-1.5 animate-eq rounded-full bg-brand/60"
                  />
                ))}
              </div>
            </section>
          ) : (
            <>
              <section className="flex flex-col gap-3 rounded-xl border border-line/70 bg-paper p-3 shadow-sm sm:p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-2 text-[11px] font-bold text-ink">
                    <IconWaveform className="size-4 text-brand" />
                    Spektrogram Gelombang Suara Santri
                  </span>
                  <span className="flex items-center gap-1.5 rounded bg-surface px-2 py-0.5 font-mono text-[10px] text-muted">
                    <span className="size-1.5 animate-pulse-dot rounded-full bg-brand" />
                    Durasi: 00:02.4s (Contoh)
                  </span>
                </div>
                <div className="flex h-16 items-end justify-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 dark:bg-emerald-950/40" aria-hidden="true">
                  {talaqqiWaveform.map((height, position) => (
                    <span
                      key={position}
                      style={{ height: `${height}px` }}
                      className={cn(
                        "w-1.5 rounded-full",
                        position % 3 === 0 ? "bg-brand/45" : "bg-brand",
                      )}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-emerald-50 px-3 py-2.5 dark:bg-emerald-900/25">
                  <div className="flex items-center gap-2.5">
                    <IconBadgeCheck className="size-5 shrink-0 text-brand" />
                    <div>
                      <p className="text-[11px] font-bold text-brand">
                        Analisis selesai &bull; Skor akurasi: 96%
                      </p>
                      <p className="text-[10px] text-muted">
                        Kategori: Mumtaz (
                        <span lang="ar" dir="rtl" className="font-arabic">
                          مُمْتَاز
                        </span>
                        ) &mdash; Sangat Memuaskan
                      </p>
                    </div>
                  </div>
                  <p lang="ar" dir="rtl" className="font-arabic text-[18px] font-bold text-brand">
                    مُمْتَاز
                  </p>
                </div>
              </section>

              <section className="flex flex-col gap-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-ink">
                    <IconMic className="size-3.5 text-brand" />
                    Rincian Makhraj &amp; Fonetik per Huruf
                  </span>
                  <span className="text-[9px] text-muted">Standar Tajwid &amp; Dialek Hijazi</span>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                  {talaqqiMakhraj.map((letter) => (
                    <div key={letter.name} className="flex flex-col gap-1 rounded-lg border border-line/70 bg-surface p-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span lang="ar" dir="rtl" className="font-arabic text-[15px] font-bold text-ink">
                          {letter.arabic} <span className="font-sans text-[10px] text-muted">[{letter.name}]</span>
                        </span>
                        <span className="rounded bg-brand/10 px-2 py-0.5 text-[10px] font-bold text-brand">
                          {letter.score}
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold text-ink">{letter.makhraj}</span>
                      <p className="text-[9px] leading-4 text-muted">{letter.note}</p>
                    </div>
                  ))}
                  <div className="flex flex-col justify-center gap-1 rounded-lg border border-sand-300/70 bg-sand-100 p-2.5 dark:border-sand-700/50 dark:bg-sand-300/10">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-sand-900 dark:text-sand-100">
                      <IconStar className="size-4" />
                      Keaslian Aksen
                    </span>
                    <span className="text-[12px] font-bold text-ink">96% Hijazi Riil</span>
                    <p className="text-[9px] leading-4 text-muted">
                      Hampir identik dengan penutur asli Jeddah &amp; Makkah (Contoh).
                    </p>
                  </div>
                </div>
              </section>

              <section className="flex items-start gap-3 rounded-xl border border-line/70 border-l-4 border-l-brand bg-surface p-3">
                <IconBrain className="mt-0.5 size-4 shrink-0 text-brand" />
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-bold text-ink">Umpan Balik AI Guru Lughati:</p>
                  <p className="text-[10px] leading-5 text-muted">
                    &ldquo;Lafal Anda sangat fasih dan menyerupai aksen penutur asli Hijaz!
                    Penyambungan kasrah (kam-il) terdengar mengalir sempurna dan intonasi tanya
                    (istifham) sudah sangat natural untuk situasi belanja/restoran.&rdquo;
                  </p>
                  <p className="text-[9px] text-muted">(Contoh umpan balik, bukan penilaian asli.)</p>
                </div>
              </section>
            </>
          )}

          {notice ? (
            <p role="status" className="animate-flow-in rounded-lg bg-sand-100 px-3 py-2 text-[10px] font-semibold text-sand-900 dark:bg-sand-300/15 dark:text-sand-100">
              {notice}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line/70 pt-3">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => onDemoAction("Pratinjau: tidak ada audio yang diputar.")}
                disabled={stage !== "result"}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-surface px-3 py-2 text-[10px] font-semibold text-ink transition-colors hover:bg-line/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IconPlay className="size-3.5 text-brand" />
                Putar Suara Saya (00:02.4)
              </button>
              <button
                type="button"
                onClick={() => onDemoAction("Pratinjau: suara penutur asli belum tersedia.")}
                disabled={stage !== "result"}
                className="inline-flex items-center gap-1.5 rounded-lg border border-line/70 bg-surface px-3 py-2 text-[10px] font-semibold text-ink transition-colors hover:bg-line/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IconCompare className="size-3.5 text-brand" />
                Bandingkan Native (Syaikh Ahmad)
              </button>
              <button
                type="button"
                onClick={onRetry}
                disabled={stage !== "result"}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand px-3 py-2 text-[10px] font-semibold text-brand transition-colors hover:bg-brand/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <IconRefresh className="size-3.5" />
                Coba Ucapkan Lagi
              </button>
            </div>
            <button
              type="button"
              onClick={onSave}
              disabled={stage !== "result"}
              className="ml-auto inline-flex items-center gap-2 rounded-xl bg-emerald-950 px-4 py-2.5 text-[11px] font-bold text-white shadow-md transition-all hover:bg-emerald-900 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-emerald-800 dark:hover:bg-emerald-700"
            >
              <IconCheck className="size-4 text-sand-200" />
              Simpan &amp; Lanjutkan Flashcard (+20 XP Talaqqi)
            </button>
          </div>
          <p className="flex items-center gap-1.5 text-[9px] leading-4 text-muted">
            <IconBadgeCheck className="size-3.5 shrink-0 text-brand" />
            Seluruh skor, durasi, XP, dan umpan balik di modal ini adalah data demo. Tidak ada
            audio, mikrofon, penilaian, atau progres yang dibuat atau disimpan.
          </p>
        </div>
      </div>
    </div>
  );
}
