import type { WebsiteLocale } from "@/lib/i18n";

// Localized headings for the SectionProductGallery `headingOverride` on product/
// solutions pages. Product names (Core, Insights, Pulse, ...) stay English.
export type GalleryHeading = { eyebrow: string; title: string; subtitle: string };
export type GalleryHeadingPage =
  | "core"
  | "insights"
  | "intelligence"
  | "crew"
  | "benchmarking"
  | "pulse"
  | "watchtower"
  | "foresight";

const galleryHeadings: Record<GalleryHeadingPage, Record<WebsiteLocale, GalleryHeading>> = {
  "core": {
    "en": {
      "eyebrow": "SEE CORE IN ACTION",
      "title": "Every Core surface, in detail.",
      "subtitle": "Real operator-workspace surfaces from the live product."
    },
    "ar": {
      "eyebrow": "شاهد Core أثناء العمل",
      "title": "كل واجهة في Core، بالتفصيل.",
      "subtitle": "مساحات عمل حقيقية للمشغّل من المنتج الفعلي."
    },
    "fr": {
      "eyebrow": "DÉCOUVREZ CORE EN ACTION",
      "title": "Chaque surface de Core, en détail.",
      "subtitle": "De vrais espaces de travail opérateur, issus du produit en production."
    },
    "es": {
      "eyebrow": "VE CORE EN ACCIÓN",
      "title": "Cada pantalla de Core, en detalle.",
      "subtitle": "Espacios de trabajo reales para el operador, del producto en producción."
    },
    "de": {
      "eyebrow": "CORE IN AKTION ERLEBEN",
      "title": "Jede Core-Oberfläche, im Detail.",
      "subtitle": "Echte Betreiber-Arbeitsbereiche aus dem Live-Produkt."
    },
    "nl": {
      "eyebrow": "ZIE CORE IN ACTIE",
      "title": "Elk Core-scherm, tot in detail.",
      "subtitle": "Echte werkomgevingen voor operators uit het live product."
    },
    "pt": {
      "eyebrow": "VEJA O CORE EM AÇÃO",
      "title": "Cada tela do Core, em detalhe.",
      "subtitle": "Áreas de trabalho reais do operador, do produto em produção."
    },
    "hi": {
      "eyebrow": "CORE को काम करते देखें",
      "title": "हर Core सतह, पूरी बारीकी से।",
      "subtitle": "लाइव प्रोडक्ट से असली ऑपरेटर-वर्कस्पेस सतहें।"
    },
    "ur": {
      "eyebrow": "CORE کو عمل میں دیکھیں",
      "title": "ہر Core سطح، پوری تفصیل کے ساتھ۔",
      "subtitle": "لائیو پروڈکٹ سے حقیقی آپریٹر-ورک اسپیس سطحیں۔"
    },
    "it": {
      "eyebrow": "SCOPRI CORE IN AZIONE",
      "title": "Ogni schermata di Core, nel dettaglio.",
      "subtitle": "Spazi di lavoro reali per l'operatore, dal prodotto in produzione."
    },
    "pl": {
      "eyebrow": "ZOBACZ CORE W DZIAŁANIU",
      "title": "Każdy ekran Core, w szczegółach.",
      "subtitle": "Prawdziwe ekrany przestrzeni operatora z działającego produktu."
    },
    "tr": {
      "eyebrow": "CORE'U İŞ BAŞINDA GÖRÜN",
      "title": "Her Core ekranı, en ince ayrıntısına kadar.",
      "subtitle": "Canlı üründen gerçek operatör çalışma alanı ekranları."
    },
    "zh-Hans": {
      "eyebrow": "实地了解 CORE",
      "title": "每一个 Core 界面，尽收眼底。",
      "subtitle": "来自实际产品的真实运营者工作台界面。"
    },
    "ja": {
      "eyebrow": "CORE の実際を見る",
      "title": "すべての Core 画面を、細部まで。",
      "subtitle": "実稼働中の製品から、本物のオペレーター向け作業画面を。"
    },
    "ko": {
      "eyebrow": "CORE의 실제 모습 보기",
      "title": "모든 Core 화면을, 세세하게.",
      "subtitle": "실제 운영 중인 제품의 진짜 운영자 작업 화면."
    },
    "id": {
      "eyebrow": "LIHAT CORE BERAKSI",
      "title": "Setiap permukaan Core, secara detail.",
      "subtitle": "Permukaan ruang kerja operator nyata dari produk yang sudah aktif."
    },
    "vi": {
      "eyebrow": "XEM CORE HOẠT ĐỘNG",
      "title": "Từng giao diện Core, chi tiết đến từng phần.",
      "subtitle": "Giao diện không gian làm việc vận hành thực tế từ sản phẩm đang chạy."
    },
    "ro": {
      "eyebrow": "VEZI CORE ÎN ACȚIUNE",
      "title": "Fiecare ecran Core, în detaliu.",
      "subtitle": "Ecrane reale din spațiul de lucru al operatorului, din produsul live."
    },
    "sv": {
      "eyebrow": "SE CORE I ANVÄNDNING",
      "title": "Varje Core-vy, i detalj.",
      "subtitle": "Riktiga operatörsvyer från den live-produkten."
    },
    "bn": {
      "eyebrow": "CORE-কে কাজে দেখুন",
      "title": "প্রতিটি Core পৃষ্ঠ, পুঙ্খানুপুঙ্খভাবে।",
      "subtitle": "লাইভ প্রোডাক্ট থেকে প্রকৃত অপারেটর-ওয়ার্কস্পেস পৃষ্ঠ।"
    },
    "th": {
      "eyebrow": "ดู CORE ทำงานจริง",
      "title": "ทุกหน้าจอ Core อย่างละเอียด",
      "subtitle": "หน้าจอพื้นที่ทำงานของผู้ปฏิบัติงานจริงจากผลิตภัณฑ์ที่ใช้งานอยู่"
    },
    "ms": {
      "eyebrow": "LIHAT CORE BERAKSI",
      "title": "Setiap permukaan Core, secara terperinci.",
      "subtitle": "Permukaan ruang kerja operator sebenar daripada produk yang sedang beroperasi."
    }
  },
  "insights": {
    "en": {
      "eyebrow": "SEE INSIGHTS IN ACTION",
      "title": "Every Insights module, in detail.",
      "subtitle": "Real analytics surfaces from the live product."
    },
    "ar": {
      "eyebrow": "شاهد Insights أثناء العمل",
      "title": "كل وحدة في Insights، بالتفصيل.",
      "subtitle": "واجهات تحليلية حقيقية من المنتج الفعلي."
    },
    "fr": {
      "eyebrow": "DÉCOUVREZ INSIGHTS EN ACTION",
      "title": "Chaque module Insights, en détail.",
      "subtitle": "De vraies surfaces analytiques, issues du produit en production."
    },
    "es": {
      "eyebrow": "VE INSIGHTS EN ACCIÓN",
      "title": "Cada módulo de Insights, en detalle.",
      "subtitle": "Pantallas de analítica reales, del producto en producción."
    },
    "de": {
      "eyebrow": "INSIGHTS IN AKTION ERLEBEN",
      "title": "Jedes Insights-Modul, im Detail.",
      "subtitle": "Echte Analyse-Oberflächen aus dem Live-Produkt."
    },
    "nl": {
      "eyebrow": "ZIE INSIGHTS IN ACTIE",
      "title": "Elke Insights-module, tot in detail.",
      "subtitle": "Echte analytische schermen uit het live product."
    },
    "pt": {
      "eyebrow": "VEJA O INSIGHTS EM AÇÃO",
      "title": "Cada módulo do Insights, em detalhe.",
      "subtitle": "Telas de análise reais, do produto em produção."
    },
    "hi": {
      "eyebrow": "INSIGHTS को काम करते देखें",
      "title": "हर Insights मॉड्यूल, पूरी बारीकी से।",
      "subtitle": "लाइव प्रोडक्ट से असली एनालिटिक्स सतहें।"
    },
    "ur": {
      "eyebrow": "INSIGHTS کو عمل میں دیکھیں",
      "title": "ہر Insights ماڈیول، پوری تفصیل کے ساتھ۔",
      "subtitle": "لائیو پروڈکٹ سے حقیقی اینالیٹکس سطحیں۔"
    },
    "it": {
      "eyebrow": "SCOPRI INSIGHTS IN AZIONE",
      "title": "Ogni modulo di Insights, nel dettaglio.",
      "subtitle": "Schermate di analisi reali, dal prodotto in produzione."
    },
    "pl": {
      "eyebrow": "ZOBACZ INSIGHTS W DZIAŁANIU",
      "title": "Każdy moduł Insights, w szczegółach.",
      "subtitle": "Prawdziwe ekrany analityczne z działającego produktu."
    },
    "tr": {
      "eyebrow": "INSIGHTS'I İŞ BAŞINDA GÖRÜN",
      "title": "Her Insights modülü, en ince ayrıntısına kadar.",
      "subtitle": "Canlı üründen gerçek analitik ekranları."
    },
    "zh-Hans": {
      "eyebrow": "实地了解 INSIGHTS",
      "title": "每一个 Insights 模块，尽收眼底。",
      "subtitle": "来自实际产品的真实分析界面。"
    },
    "ja": {
      "eyebrow": "INSIGHTS の実際を見る",
      "title": "すべての Insights モジュールを、細部まで。",
      "subtitle": "実稼働中の製品から、本物の分析画面を。"
    },
    "ko": {
      "eyebrow": "INSIGHTS의 실제 모습 보기",
      "title": "모든 Insights 모듈을, 세세하게.",
      "subtitle": "실제 운영 중인 제품의 진짜 분석 화면."
    },
    "id": {
      "eyebrow": "LIHAT INSIGHTS BERAKSI",
      "title": "Setiap modul Insights, secara detail.",
      "subtitle": "Permukaan analitik nyata dari produk yang sudah aktif."
    },
    "vi": {
      "eyebrow": "XEM INSIGHTS HOẠT ĐỘNG",
      "title": "Từng module Insights, chi tiết đến từng phần.",
      "subtitle": "Giao diện phân tích thực tế từ sản phẩm đang chạy."
    },
    "ro": {
      "eyebrow": "VEZI INSIGHTS ÎN ACȚIUNE",
      "title": "Fiecare modul Insights, în detaliu.",
      "subtitle": "Ecrane analitice reale din produsul live."
    },
    "sv": {
      "eyebrow": "SE INSIGHTS I ANVÄNDNING",
      "title": "Varje Insights-modul, i detalj.",
      "subtitle": "Riktiga analysvyer från den live-produkten."
    },
    "bn": {
      "eyebrow": "INSIGHTS-কে কাজে দেখুন",
      "title": "প্রতিটি Insights মডিউল, পুঙ্খানুপুঙ্খভাবে।",
      "subtitle": "লাইভ প্রোডাক্ট থেকে প্রকৃত অ্যানালিটিক্স পৃষ্ঠ।"
    },
    "th": {
      "eyebrow": "ดู INSIGHTS ทำงานจริง",
      "title": "ทุกโมดูล Insights อย่างละเอียด",
      "subtitle": "หน้าจอวิเคราะห์ข้อมูลจริงจากผลิตภัณฑ์ที่ใช้งานอยู่"
    },
    "ms": {
      "eyebrow": "LIHAT INSIGHTS BERAKSI",
      "title": "Setiap modul Insights, secara terperinci.",
      "subtitle": "Permukaan analitik sebenar daripada produk yang sedang beroperasi."
    }
  },
  "intelligence": {
    "en": {
      "eyebrow": "SEE INTELLIGENCE IN ACTION",
      "title": "Every Intelligence surface, in detail.",
      "subtitle": "Real decision surfaces from the live product."
    },
    "ar": {
      "eyebrow": "شاهد Intelligence أثناء العمل",
      "title": "كل واجهة في Intelligence، بالتفصيل.",
      "subtitle": "واجهات لاتخاذ القرار حقيقية من المنتج الفعلي."
    },
    "fr": {
      "eyebrow": "DÉCOUVREZ INTELLIGENCE EN ACTION",
      "title": "Chaque surface Intelligence, en détail.",
      "subtitle": "De vraies surfaces de décision, issues du produit en production."
    },
    "es": {
      "eyebrow": "VE INTELLIGENCE EN ACCIÓN",
      "title": "Cada pantalla de Intelligence, en detalle.",
      "subtitle": "Pantallas de decisión reales, del producto en producción."
    },
    "de": {
      "eyebrow": "INTELLIGENCE IN AKTION ERLEBEN",
      "title": "Jede Intelligence-Oberfläche, im Detail.",
      "subtitle": "Echte Entscheidungs-Oberflächen aus dem Live-Produkt."
    },
    "nl": {
      "eyebrow": "ZIE INTELLIGENCE IN ACTIE",
      "title": "Elk Intelligence-scherm, tot in detail.",
      "subtitle": "Echte beslissingsschermen uit het live product."
    },
    "pt": {
      "eyebrow": "VEJA O INTELLIGENCE EM AÇÃO",
      "title": "Cada tela do Intelligence, em detalhe.",
      "subtitle": "Telas de decisão reais, do produto em produção."
    },
    "hi": {
      "eyebrow": "INTELLIGENCE को काम करते देखें",
      "title": "हर Intelligence सतह, पूरी बारीकी से।",
      "subtitle": "लाइव प्रोडक्ट से असली निर्णय सतहें।"
    },
    "ur": {
      "eyebrow": "INTELLIGENCE کو عمل میں دیکھیں",
      "title": "ہر Intelligence سطح، پوری تفصیل کے ساتھ۔",
      "subtitle": "لائیو پروڈکٹ سے حقیقی فیصلہ ساز سطحیں۔"
    },
    "it": {
      "eyebrow": "SCOPRI INTELLIGENCE IN AZIONE",
      "title": "Ogni schermata di Intelligence, nel dettaglio.",
      "subtitle": "Schermate decisionali reali, dal prodotto in produzione."
    },
    "pl": {
      "eyebrow": "ZOBACZ INTELLIGENCE W DZIAŁANIU",
      "title": "Każdy ekran Intelligence, w szczegółach.",
      "subtitle": "Prawdziwe ekrany decyzyjne z działającego produktu."
    },
    "tr": {
      "eyebrow": "INTELLIGENCE'I İŞ BAŞINDA GÖRÜN",
      "title": "Her Intelligence ekranı, en ince ayrıntısına kadar.",
      "subtitle": "Canlı üründen gerçek karar ekranları."
    },
    "zh-Hans": {
      "eyebrow": "实地了解 INTELLIGENCE",
      "title": "每一个 Intelligence 界面，尽收眼底。",
      "subtitle": "来自实际产品的真实决策界面。"
    },
    "ja": {
      "eyebrow": "INTELLIGENCE の実際を見る",
      "title": "すべての Intelligence 画面を、細部まで。",
      "subtitle": "実稼働中の製品から、本物の意思決定画面を。"
    },
    "ko": {
      "eyebrow": "INTELLIGENCE의 실제 모습 보기",
      "title": "모든 Intelligence 화면을, 세세하게.",
      "subtitle": "실제 운영 중인 제품의 진짜 의사결정 화면."
    },
    "id": {
      "eyebrow": "LIHAT INTELLIGENCE BERAKSI",
      "title": "Setiap permukaan Intelligence, secara detail.",
      "subtitle": "Permukaan pengambilan keputusan nyata dari produk yang sudah aktif."
    },
    "vi": {
      "eyebrow": "XEM INTELLIGENCE HOẠT ĐỘNG",
      "title": "Từng giao diện Intelligence, chi tiết đến từng phần.",
      "subtitle": "Giao diện ra quyết định thực tế từ sản phẩm đang chạy."
    },
    "ro": {
      "eyebrow": "VEZI INTELLIGENCE ÎN ACȚIUNE",
      "title": "Fiecare ecran Intelligence, în detaliu.",
      "subtitle": "Ecrane decizionale reale din produsul live."
    },
    "sv": {
      "eyebrow": "SE INTELLIGENCE I ANVÄNDNING",
      "title": "Varje Intelligence-vy, i detalj.",
      "subtitle": "Riktiga beslutsvyer från den live-produkten."
    },
    "bn": {
      "eyebrow": "INTELLIGENCE-কে কাজে দেখুন",
      "title": "প্রতিটি Intelligence পৃষ্ঠ, পুঙ্খানুপুঙ্খভাবে।",
      "subtitle": "লাইভ প্রোডাক্ট থেকে প্রকৃত সিদ্ধান্ত পৃষ্ঠ।"
    },
    "th": {
      "eyebrow": "ดู INTELLIGENCE ทำงานจริง",
      "title": "ทุกหน้าจอ Intelligence อย่างละเอียด",
      "subtitle": "หน้าจอการตัดสินใจจริงจากผลิตภัณฑ์ที่ใช้งานอยู่"
    },
    "ms": {
      "eyebrow": "LIHAT INTELLIGENCE BERAKSI",
      "title": "Setiap permukaan Intelligence, secara terperinci.",
      "subtitle": "Permukaan membuat keputusan sebenar daripada produk yang sedang beroperasi."
    }
  },
  "crew": {
    "en": {
      "eyebrow": "SEE CREW IN ACTION",
      "title": "Every Crew surface, in detail.",
      "subtitle": "Real workforce-ops surfaces from the live product."
    },
    "ar": {
      "eyebrow": "شاهد Crew أثناء العمل",
      "title": "كل واجهة في Crew، بالتفصيل.",
      "subtitle": "واجهات حقيقية لعمليات الموظفين من المنتج الفعلي."
    },
    "fr": {
      "eyebrow": "DÉCOUVREZ CREW EN ACTION",
      "title": "Chaque surface de Crew, en détail.",
      "subtitle": "De vraies surfaces d'opérations RH, issues du produit en production."
    },
    "es": {
      "eyebrow": "VE CREW EN ACCIÓN",
      "title": "Cada pantalla de Crew, en detalle.",
      "subtitle": "Pantallas reales de operaciones de personal, del producto en producción."
    },
    "de": {
      "eyebrow": "CREW IN AKTION ERLEBEN",
      "title": "Jede Crew-Oberfläche, im Detail.",
      "subtitle": "Echte Personal-Oberflächen aus dem Live-Produkt."
    },
    "nl": {
      "eyebrow": "ZIE CREW IN ACTIE",
      "title": "Elk Crew-scherm, tot in detail.",
      "subtitle": "Echte schermen voor personeelsbeheer uit het live product."
    },
    "pt": {
      "eyebrow": "VEJA O CREW EM AÇÃO",
      "title": "Cada tela do Crew, em detalhe.",
      "subtitle": "Telas reais de operações de equipe, do produto em produção."
    },
    "hi": {
      "eyebrow": "CREW को काम करते देखें",
      "title": "हर Crew सतह, पूरी बारीकी से।",
      "subtitle": "लाइव प्रोडक्ट से असली वर्कफोर्स-ऑप्स सतहें।"
    },
    "ur": {
      "eyebrow": "CREW کو عمل میں دیکھیں",
      "title": "ہر Crew سطح، پوری تفصیل کے ساتھ۔",
      "subtitle": "لائیو پروڈکٹ سے حقیقی ورک فورس-آپریشنز سطحیں۔"
    },
    "it": {
      "eyebrow": "SCOPRI CREW IN AZIONE",
      "title": "Ogni schermata di Crew, nel dettaglio.",
      "subtitle": "Schermate reali di gestione del personale, dal prodotto in produzione."
    },
    "pl": {
      "eyebrow": "ZOBACZ CREW W DZIAŁANIU",
      "title": "Każdy ekran Crew, w szczegółach.",
      "subtitle": "Prawdziwe ekrany operacji zespołowych z działającego produktu."
    },
    "tr": {
      "eyebrow": "CREW'U İŞ BAŞINDA GÖRÜN",
      "title": "Her Crew ekranı, en ince ayrıntısına kadar.",
      "subtitle": "Canlı üründen gerçek iş gücü operasyonu ekranları."
    },
    "zh-Hans": {
      "eyebrow": "实地了解 CREW",
      "title": "每一个 Crew 界面，尽收眼底。",
      "subtitle": "来自实际产品的真实人力运营界面。"
    },
    "ja": {
      "eyebrow": "CREW の実際を見る",
      "title": "すべての Crew 画面を、細部まで。",
      "subtitle": "実稼働中の製品から、本物の人員運用画面を。"
    },
    "ko": {
      "eyebrow": "CREW의 실제 모습 보기",
      "title": "모든 Crew 화면을, 세세하게.",
      "subtitle": "실제 운영 중인 제품의 진짜 인력 운영 화면."
    },
    "id": {
      "eyebrow": "LIHAT CREW BERAKSI",
      "title": "Setiap permukaan Crew, secara detail.",
      "subtitle": "Permukaan operasi tenaga kerja nyata dari produk yang sudah aktif."
    },
    "vi": {
      "eyebrow": "XEM CREW HOẠT ĐỘNG",
      "title": "Từng giao diện Crew, chi tiết đến từng phần.",
      "subtitle": "Giao diện vận hành nhân sự thực tế từ sản phẩm đang chạy."
    },
    "ro": {
      "eyebrow": "VEZI CREW ÎN ACȚIUNE",
      "title": "Fiecare ecran Crew, în detaliu.",
      "subtitle": "Ecrane reale de operațiuni cu echipa, din produsul live."
    },
    "sv": {
      "eyebrow": "SE CREW I ANVÄNDNING",
      "title": "Varje Crew-vy, i detalj.",
      "subtitle": "Riktiga vyer för personaldrift från den live-produkten."
    },
    "bn": {
      "eyebrow": "CREW-কে কাজে দেখুন",
      "title": "প্রতিটি Crew পৃষ্ঠ, পুঙ্খানুপুঙ্খভাবে।",
      "subtitle": "লাইভ প্রোডাক্ট থেকে প্রকৃত কর্মীবাহিনী-পরিচালন পৃষ্ঠ।"
    },
    "th": {
      "eyebrow": "ดู CREW ทำงานจริง",
      "title": "ทุกหน้าจอ Crew อย่างละเอียด",
      "subtitle": "หน้าจอบริหารกำลังคนจริงจากผลิตภัณฑ์ที่ใช้งานอยู่"
    },
    "ms": {
      "eyebrow": "LIHAT CREW BERAKSI",
      "title": "Setiap permukaan Crew, secara terperinci.",
      "subtitle": "Permukaan operasi tenaga kerja sebenar daripada produk yang sedang beroperasi."
    }
  },
  "benchmarking": {
    "en": {
      "eyebrow": "SEE BENCHMARK IN ACTION",
      "title": "Every Benchmark surface, in detail.",
      "subtitle": "Real peer-comparison surfaces from the live product."
    },
    "ar": {
      "eyebrow": "شاهد Benchmark أثناء العمل",
      "title": "كل واجهة في Benchmark، بالتفصيل.",
      "subtitle": "مقارنات حقيقية بين النظراء من المنتج الفعلي."
    },
    "fr": {
      "eyebrow": "DÉCOUVREZ BENCHMARK EN ACTION",
      "title": "Chaque surface Benchmark, en détail.",
      "subtitle": "De vraies comparaisons entre pairs, issues du produit en production."
    },
    "es": {
      "eyebrow": "VE BENCHMARK EN ACCIÓN",
      "title": "Cada pantalla de Benchmark, en detalle.",
      "subtitle": "Comparaciones reales entre pares, del producto en producción."
    },
    "de": {
      "eyebrow": "BENCHMARK IN AKTION ERLEBEN",
      "title": "Jede Benchmark-Oberfläche, im Detail.",
      "subtitle": "Echte Vergleiche mit Mitbewerbern aus dem Live-Produkt."
    },
    "nl": {
      "eyebrow": "ZIE BENCHMARK IN ACTIE",
      "title": "Elk Benchmark-scherm, tot in detail.",
      "subtitle": "Echte vergelijkingen met branchegenoten uit het live product."
    },
    "pt": {
      "eyebrow": "VEJA O BENCHMARK EM AÇÃO",
      "title": "Cada tela do Benchmark, em detalhe.",
      "subtitle": "Comparações reais entre pares, do produto em produção."
    },
    "hi": {
      "eyebrow": "BENCHMARK को काम करते देखें",
      "title": "हर Benchmark सतह, पूरी बारीकी से।",
      "subtitle": "लाइव प्रोडक्ट से असली पीयर-तुलना सतहें।"
    },
    "ur": {
      "eyebrow": "BENCHMARK کو عمل میں دیکھیں",
      "title": "ہر Benchmark سطح، پوری تفصیل کے ساتھ۔",
      "subtitle": "لائیو پروڈکٹ سے حقیقی ہم پلہ-موازنہ سطحیں۔"
    },
    "it": {
      "eyebrow": "SCOPRI BENCHMARK IN AZIONE",
      "title": "Ogni schermata di Benchmark, nel dettaglio.",
      "subtitle": "Confronti reali tra pari, dal prodotto in produzione."
    },
    "pl": {
      "eyebrow": "ZOBACZ BENCHMARK W DZIAŁANIU",
      "title": "Każdy ekran Benchmark, w szczegółach.",
      "subtitle": "Prawdziwe ekrany porównań z konkurencją z działającego produktu."
    },
    "tr": {
      "eyebrow": "BENCHMARK'I İŞ BAŞINDA GÖRÜN",
      "title": "Her Benchmark ekranı, en ince ayrıntısına kadar.",
      "subtitle": "Canlı üründen gerçek rakip karşılaştırma ekranları."
    },
    "zh-Hans": {
      "eyebrow": "实地了解 BENCHMARK",
      "title": "每一个 Benchmark 界面，尽收眼底。",
      "subtitle": "来自实际产品的真实同业对标界面。"
    },
    "ja": {
      "eyebrow": "BENCHMARK の実際を見る",
      "title": "すべての Benchmark 画面を、細部まで。",
      "subtitle": "実稼働中の製品から、本物の同業比較画面を。"
    },
    "ko": {
      "eyebrow": "BENCHMARK의 실제 모습 보기",
      "title": "모든 Benchmark 화면을, 세세하게.",
      "subtitle": "실제 운영 중인 제품의 진짜 동종업계 비교 화면."
    },
    "id": {
      "eyebrow": "LIHAT BENCHMARK BERAKSI",
      "title": "Setiap permukaan Benchmark, secara detail.",
      "subtitle": "Permukaan perbandingan antar-rekan nyata dari produk yang sudah aktif."
    },
    "vi": {
      "eyebrow": "XEM BENCHMARK HOẠT ĐỘNG",
      "title": "Từng giao diện Benchmark, chi tiết đến từng phần.",
      "subtitle": "Giao diện so sánh ngang hàng thực tế từ sản phẩm đang chạy."
    },
    "ro": {
      "eyebrow": "VEZI BENCHMARK ÎN ACȚIUNE",
      "title": "Fiecare ecran Benchmark, în detaliu.",
      "subtitle": "Ecrane reale de comparație cu concurența, din produsul live."
    },
    "sv": {
      "eyebrow": "SE BENCHMARK I ANVÄNDNING",
      "title": "Varje Benchmark-vy, i detalj.",
      "subtitle": "Riktiga vyer för jämförelser med branschkollegor från den live-produkten."
    },
    "bn": {
      "eyebrow": "BENCHMARK-কে কাজে দেখুন",
      "title": "প্রতিটি Benchmark পৃষ্ঠ, পুঙ্খানুপুঙ্খভাবে।",
      "subtitle": "লাইভ প্রোডাক্ট থেকে প্রকৃত সমকক্ষ-তুলনা পৃষ্ঠ।"
    },
    "th": {
      "eyebrow": "ดู BENCHMARK ทำงานจริง",
      "title": "ทุกหน้าจอ Benchmark อย่างละเอียด",
      "subtitle": "หน้าจอเปรียบเทียบกับคู่เทียบจริงจากผลิตภัณฑ์ที่ใช้งานอยู่"
    },
    "ms": {
      "eyebrow": "LIHAT BENCHMARK BERAKSI",
      "title": "Setiap permukaan Benchmark, secara terperinci.",
      "subtitle": "Permukaan perbandingan setara sebenar daripada produk yang sedang beroperasi."
    }
  },
  "pulse": {
    "en": {
      "eyebrow": "SEE PULSE IN ACTION",
      "title": "Every Pulse surface, in detail.",
      "subtitle": "Real shift-floor surfaces from the live product."
    },
    "ar": {
      "eyebrow": "شاهد Pulse أثناء العمل",
      "title": "كل واجهة في Pulse، بالتفصيل.",
      "subtitle": "واجهات حقيقية لإدارة الخدمة أثناء العمل من المنتج الفعلي."
    },
    "fr": {
      "eyebrow": "DÉCOUVREZ PULSE EN ACTION",
      "title": "Chaque surface de Pulse, en détail.",
      "subtitle": "De vraies surfaces de pilotage en service, issues du produit en production."
    },
    "es": {
      "eyebrow": "VE PULSE EN ACCIÓN",
      "title": "Cada pantalla de Pulse, en detalle.",
      "subtitle": "Pantallas reales de gestión en servicio, del producto en producción."
    },
    "de": {
      "eyebrow": "PULSE IN AKTION ERLEBEN",
      "title": "Jede Pulse-Oberfläche, im Detail.",
      "subtitle": "Echte Oberflächen für die Schichtsteuerung aus dem Live-Produkt."
    },
    "nl": {
      "eyebrow": "ZIE PULSE IN ACTIE",
      "title": "Elk Pulse-scherm, tot in detail.",
      "subtitle": "Echte schermen voor aansturing tijdens de dienst uit het live product."
    },
    "pt": {
      "eyebrow": "VEJA O PULSE EM AÇÃO",
      "title": "Cada tela do Pulse, em detalhe.",
      "subtitle": "Telas reais de gestão durante o serviço, do produto em produção."
    },
    "hi": {
      "eyebrow": "PULSE को काम करते देखें",
      "title": "हर Pulse सतह, पूरी बारीकी से।",
      "subtitle": "लाइव प्रोडक्ट से असली शिफ्ट-फ्लोर सतहें।"
    },
    "ur": {
      "eyebrow": "PULSE کو عمل میں دیکھیں",
      "title": "ہر Pulse سطح، پوری تفصیل کے ساتھ۔",
      "subtitle": "لائیو پروڈکٹ سے حقیقی شفٹ-فلور سطحیں۔"
    },
    "it": {
      "eyebrow": "SCOPRI PULSE IN AZIONE",
      "title": "Ogni schermata di Pulse, nel dettaglio.",
      "subtitle": "Schermate reali di gestione durante il servizio, dal prodotto in produzione."
    },
    "pl": {
      "eyebrow": "ZOBACZ PULSE W DZIAŁANIU",
      "title": "Każdy ekran Pulse, w szczegółach.",
      "subtitle": "Prawdziwe ekrany pracy na zmianie z działającego produktu."
    },
    "tr": {
      "eyebrow": "PULSE'I İŞ BAŞINDA GÖRÜN",
      "title": "Her Pulse ekranı, en ince ayrıntısına kadar.",
      "subtitle": "Canlı üründen gerçek vardiya sahası ekranları."
    },
    "zh-Hans": {
      "eyebrow": "实地了解 PULSE",
      "title": "每一个 Pulse 界面，尽收眼底。",
      "subtitle": "来自实际产品的真实门店现场界面。"
    },
    "ja": {
      "eyebrow": "PULSE の実際を見る",
      "title": "すべての Pulse 画面を、細部まで。",
      "subtitle": "実稼働中の製品から、本物の店舗現場画面を。"
    },
    "ko": {
      "eyebrow": "PULSE의 실제 모습 보기",
      "title": "모든 Pulse 화면을, 세세하게.",
      "subtitle": "실제 운영 중인 제품의 진짜 매장 현장 화면."
    },
    "id": {
      "eyebrow": "LIHAT PULSE BERAKSI",
      "title": "Setiap permukaan Pulse, secara detail.",
      "subtitle": "Permukaan lantai shift nyata dari produk yang sudah aktif."
    },
    "vi": {
      "eyebrow": "XEM PULSE HOẠT ĐỘNG",
      "title": "Từng giao diện Pulse, chi tiết đến từng phần.",
      "subtitle": "Giao diện sàn ca làm thực tế từ sản phẩm đang chạy."
    },
    "ro": {
      "eyebrow": "VEZI PULSE ÎN ACȚIUNE",
      "title": "Fiecare ecran Pulse, în detaliu.",
      "subtitle": "Ecrane reale din timpul turei, din produsul live."
    },
    "sv": {
      "eyebrow": "SE PULSE I ANVÄNDNING",
      "title": "Varje Pulse-vy, i detalj.",
      "subtitle": "Riktiga vyer från golvet under passet, från den live-produkten."
    },
    "bn": {
      "eyebrow": "PULSE-কে কাজে দেখুন",
      "title": "প্রতিটি Pulse পৃষ্ঠ, পুঙ্খানুপুঙ্খভাবে।",
      "subtitle": "লাইভ প্রোডাক্ট থেকে প্রকৃত শিফট-ফ্লোর পৃষ্ঠ।"
    },
    "th": {
      "eyebrow": "ดู PULSE ทำงานจริง",
      "title": "ทุกหน้าจอ Pulse อย่างละเอียด",
      "subtitle": "หน้าจอหน้างานกะจริงจากผลิตภัณฑ์ที่ใช้งานอยู่"
    },
    "ms": {
      "eyebrow": "LIHAT PULSE BERAKSI",
      "title": "Setiap permukaan Pulse, secara terperinci.",
      "subtitle": "Permukaan lantai syif sebenar daripada produk yang sedang beroperasi."
    }
  },
  "watchtower": {
    "en": {
      "eyebrow": "SEE WATCHTOWER IN ACTION",
      "title": "Every Watchtower surface, in detail.",
      "subtitle": "Real competitive-intelligence surfaces from the live product."
    },
    "ar": {
      "eyebrow": "شاهد Watchtower أثناء العمل",
      "title": "كل واجهة في Watchtower، بالتفصيل.",
      "subtitle": "واجهات حقيقية للاستخبارات التنافسية من المنتج الفعلي."
    },
    "fr": {
      "eyebrow": "DÉCOUVREZ WATCHTOWER EN ACTION",
      "title": "Chaque surface Watchtower, en détail.",
      "subtitle": "De vraies surfaces de veille concurrentielle, issues du produit en production."
    },
    "es": {
      "eyebrow": "VE WATCHTOWER EN ACCIÓN",
      "title": "Cada pantalla de Watchtower, en detalle.",
      "subtitle": "Pantallas reales de inteligencia competitiva, del producto en producción."
    },
    "de": {
      "eyebrow": "WATCHTOWER IN AKTION ERLEBEN",
      "title": "Jede Watchtower-Oberfläche, im Detail.",
      "subtitle": "Echte Oberflächen für Wettbewerbsanalysen aus dem Live-Produkt."
    },
    "nl": {
      "eyebrow": "ZIE WATCHTOWER IN ACTIE",
      "title": "Elk Watchtower-scherm, tot in detail.",
      "subtitle": "Echte schermen voor concurrentie-intelligentie uit het live product."
    },
    "pt": {
      "eyebrow": "VEJA O WATCHTOWER EM AÇÃO",
      "title": "Cada tela do Watchtower, em detalhe.",
      "subtitle": "Telas reais de inteligência competitiva, do produto em produção."
    },
    "hi": {
      "eyebrow": "WATCHTOWER को काम करते देखें",
      "title": "हर Watchtower सतह, पूरी बारीकी से।",
      "subtitle": "लाइव प्रोडक्ट से असली प्रतिस्पर्धी-इंटेलिजेंस सतहें।"
    },
    "ur": {
      "eyebrow": "WATCHTOWER کو عمل میں دیکھیں",
      "title": "ہر Watchtower سطح، پوری تفصیل کے ساتھ۔",
      "subtitle": "لائیو پروڈکٹ سے حقیقی مسابقتی-انٹیلیجنس سطحیں۔"
    },
    "it": {
      "eyebrow": "SCOPRI WATCHTOWER IN AZIONE",
      "title": "Ogni schermata di Watchtower, nel dettaglio.",
      "subtitle": "Schermate reali di intelligence competitiva, dal prodotto in produzione."
    },
    "pl": {
      "eyebrow": "ZOBACZ WATCHTOWER W DZIAŁANIU",
      "title": "Każdy ekran Watchtower, w szczegółach.",
      "subtitle": "Prawdziwe ekrany wywiadu konkurencyjnego z działającego produktu."
    },
    "tr": {
      "eyebrow": "WATCHTOWER'I İŞ BAŞINDA GÖRÜN",
      "title": "Her Watchtower ekranı, en ince ayrıntısına kadar.",
      "subtitle": "Canlı üründen gerçek rekabet istihbaratı ekranları."
    },
    "zh-Hans": {
      "eyebrow": "实地了解 WATCHTOWER",
      "title": "每一个 Watchtower 界面，尽收眼底。",
      "subtitle": "来自实际产品的真实竞争情报界面。"
    },
    "ja": {
      "eyebrow": "WATCHTOWER の実際を見る",
      "title": "すべての Watchtower 画面を、細部まで。",
      "subtitle": "実稼働中の製品から、本物の競合インテリジェンス画面を。"
    },
    "ko": {
      "eyebrow": "WATCHTOWER의 실제 모습 보기",
      "title": "모든 Watchtower 화면을, 세세하게.",
      "subtitle": "실제 운영 중인 제품의 진짜 경쟁 인텔리전스 화면."
    },
    "id": {
      "eyebrow": "LIHAT WATCHTOWER BERAKSI",
      "title": "Setiap permukaan Watchtower, secara detail.",
      "subtitle": "Permukaan intelijen kompetitif nyata dari produk yang sudah aktif."
    },
    "vi": {
      "eyebrow": "XEM WATCHTOWER HOẠT ĐỘNG",
      "title": "Từng giao diện Watchtower, chi tiết đến từng phần.",
      "subtitle": "Giao diện tình báo cạnh tranh thực tế từ sản phẩm đang chạy."
    },
    "ro": {
      "eyebrow": "VEZI WATCHTOWER ÎN ACȚIUNE",
      "title": "Fiecare ecran Watchtower, în detaliu.",
      "subtitle": "Ecrane reale de informații despre concurență, din produsul live."
    },
    "sv": {
      "eyebrow": "SE WATCHTOWER I ANVÄNDNING",
      "title": "Varje Watchtower-vy, i detalj.",
      "subtitle": "Riktiga vyer för konkurrentbevakning från den live-produkten."
    },
    "bn": {
      "eyebrow": "WATCHTOWER-কে কাজে দেখুন",
      "title": "প্রতিটি Watchtower পৃষ্ঠ, পুঙ্খানুপুঙ্খভাবে।",
      "subtitle": "লাইভ প্রোডাক্ট থেকে প্রকৃত প্রতিযোগী-গোয়েন্দা পৃষ্ঠ।"
    },
    "th": {
      "eyebrow": "ดู WATCHTOWER ทำงานจริง",
      "title": "ทุกหน้าจอ Watchtower อย่างละเอียด",
      "subtitle": "หน้าจอข่าวกรองคู่แข่งจริงจากผลิตภัณฑ์ที่ใช้งานอยู่"
    },
    "ms": {
      "eyebrow": "LIHAT WATCHTOWER BERAKSI",
      "title": "Setiap permukaan Watchtower, secara terperinci.",
      "subtitle": "Permukaan perisikan persaingan sebenar daripada produk yang sedang beroperasi."
    }
  },
  "foresight": {
    "en": {
      "eyebrow": "SEE FORESIGHT IN ACTION",
      "title": "Every Foresight surface, in detail.",
      "subtitle": "Real predictive-modelling surfaces from the live product."
    },
    "ar": {
      "eyebrow": "شاهد Foresight أثناء العمل",
      "title": "كل واجهة في Foresight، بالتفصيل.",
      "subtitle": "واجهات حقيقية للنمذجة التنبؤية من المنتج الفعلي."
    },
    "fr": {
      "eyebrow": "DÉCOUVREZ FORESIGHT EN ACTION",
      "title": "Chaque surface Foresight, en détail.",
      "subtitle": "De vraies surfaces de modélisation prédictive, issues du produit en production."
    },
    "es": {
      "eyebrow": "VE FORESIGHT EN ACCIÓN",
      "title": "Cada pantalla de Foresight, en detalle.",
      "subtitle": "Pantallas reales de modelado predictivo, del producto en producción."
    },
    "de": {
      "eyebrow": "FORESIGHT IN AKTION ERLEBEN",
      "title": "Jede Foresight-Oberfläche, im Detail.",
      "subtitle": "Echte Oberflächen für prädiktive Modellierung aus dem Live-Produkt."
    },
    "nl": {
      "eyebrow": "ZIE FORESIGHT IN ACTIE",
      "title": "Elk Foresight-scherm, tot in detail.",
      "subtitle": "Echte schermen voor voorspellende modellering uit het live product."
    },
    "pt": {
      "eyebrow": "VEJA O FORESIGHT EM AÇÃO",
      "title": "Cada tela do Foresight, em detalhe.",
      "subtitle": "Telas reais de modelagem preditiva, do produto em produção."
    },
    "hi": {
      "eyebrow": "FORESIGHT को काम करते देखें",
      "title": "हर Foresight सतह, पूरी बारीकी से।",
      "subtitle": "लाइव प्रोडक्ट से असली पूर्वानुमान-मॉडलिंग सतहें।"
    },
    "ur": {
      "eyebrow": "FORESIGHT کو عمل میں دیکھیں",
      "title": "ہر Foresight سطح، پوری تفصیل کے ساتھ۔",
      "subtitle": "لائیو پروڈکٹ سے حقیقی پیش گوئی-ماڈلنگ سطحیں۔"
    },
    "it": {
      "eyebrow": "SCOPRI FORESIGHT IN AZIONE",
      "title": "Ogni schermata di Foresight, nel dettaglio.",
      "subtitle": "Schermate reali di modellazione predittiva, dal prodotto in produzione."
    },
    "pl": {
      "eyebrow": "ZOBACZ FORESIGHT W DZIAŁANIU",
      "title": "Każdy ekran Foresight, w szczegółach.",
      "subtitle": "Prawdziwe ekrany modelowania predykcyjnego z działającego produktu."
    },
    "tr": {
      "eyebrow": "FORESIGHT'I İŞ BAŞINDA GÖRÜN",
      "title": "Her Foresight ekranı, en ince ayrıntısına kadar.",
      "subtitle": "Canlı üründen gerçek tahmine dayalı modelleme ekranları."
    },
    "zh-Hans": {
      "eyebrow": "实地了解 FORESIGHT",
      "title": "每一个 Foresight 界面，尽收眼底。",
      "subtitle": "来自实际产品的真实预测建模界面。"
    },
    "ja": {
      "eyebrow": "FORESIGHT の実際を見る",
      "title": "すべての Foresight 画面を、細部まで。",
      "subtitle": "実稼働中の製品から、本物の予測モデリング画面を。"
    },
    "ko": {
      "eyebrow": "FORESIGHT의 실제 모습 보기",
      "title": "모든 Foresight 화면을, 세세하게.",
      "subtitle": "실제 운영 중인 제품의 진짜 예측 모델링 화면."
    },
    "id": {
      "eyebrow": "LIHAT FORESIGHT BERAKSI",
      "title": "Setiap permukaan Foresight, secara detail.",
      "subtitle": "Permukaan pemodelan prediktif nyata dari produk yang sudah aktif."
    },
    "vi": {
      "eyebrow": "XEM FORESIGHT HOẠT ĐỘNG",
      "title": "Từng giao diện Foresight, chi tiết đến từng phần.",
      "subtitle": "Giao diện mô hình dự báo thực tế từ sản phẩm đang chạy."
    },
    "ro": {
      "eyebrow": "VEZI FORESIGHT ÎN ACȚIUNE",
      "title": "Fiecare ecran Foresight, în detaliu.",
      "subtitle": "Ecrane reale de modelare predictivă, din produsul live."
    },
    "sv": {
      "eyebrow": "SE FORESIGHT I ANVÄNDNING",
      "title": "Varje Foresight-vy, i detalj.",
      "subtitle": "Riktiga vyer för prediktiv modellering från den live-produkten."
    },
    "bn": {
      "eyebrow": "FORESIGHT-কে কাজে দেখুন",
      "title": "প্রতিটি Foresight পৃষ্ঠ, পুঙ্খানুপুঙ্খভাবে।",
      "subtitle": "লাইভ প্রোডাক্ট থেকে প্রকৃত পূর্বাভাস-মডেলিং পৃষ্ঠ।"
    },
    "th": {
      "eyebrow": "ดู FORESIGHT ทำงานจริง",
      "title": "ทุกหน้าจอ Foresight อย่างละเอียด",
      "subtitle": "หน้าจอแบบจำลองการคาดการณ์จริงจากผลิตภัณฑ์ที่ใช้งานอยู่"
    },
    "ms": {
      "eyebrow": "LIHAT FORESIGHT BERAKSI",
      "title": "Setiap permukaan Foresight, secara terperinci.",
      "subtitle": "Permukaan pemodelan ramalan sebenar daripada produk yang sedang beroperasi."
    }
  }
};

export function galleryHeading(page: GalleryHeadingPage, locale: WebsiteLocale): GalleryHeading {
  return galleryHeadings[page][locale] ?? galleryHeadings[page].en;
}
