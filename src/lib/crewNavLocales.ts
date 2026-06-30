// Localized Core + Crew navigation labels. "Core" and "Crew" are brand names
// (kept in English); crewAll / viewPricing / crewList are transcreated per locale.
// The navbar reads these so non-English locales get the new Crew-nav fields — their
// i18n.ts navbar blocks predate these fields. Generated from the nav transcreation;
// review prose before release.
export type CrewNavLink = { name: string; description: string; href: string };
export type CrewNav = { core: string; crew: string; crewAll: string; viewPricing: string; crewList: CrewNavLink[] };
export const crewNavLocales: Record<string, CrewNav> = {
  "en": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Explore all of Crew →",
    "viewPricing": "View full pricing →",
    "crewList": [
      {
        "name": "Scheduling",
        "description": "Build the schedule in minutes",
        "href": "/crew/scheduling"
      },
      {
        "name": "Time & Attendance",
        "description": "On-site clock-in, clean hours",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Payroll",
        "description": "Pay-ready in 39+ countries",
        "href": "/crew/payroll"
      },
      {
        "name": "People & HR",
        "description": "Hire to exit, one record",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "See the workforce clearly",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "ar": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "اكتشف Crew بالكامل →",
    "viewPricing": "عرض الأسعار كاملة →",
    "crewList": [
      {
        "name": "الجدولة",
        "description": "أنشئ الجدول في دقائق",
        "href": "/crew/scheduling"
      },
      {
        "name": "الوقت والحضور",
        "description": "تسجيل حضور في الموقع وساعات دقيقة",
        "href": "/crew/time-attendance"
      },
      {
        "name": "الرواتب",
        "description": "جاهزة للدفع في أكثر من 39 دولة",
        "href": "/crew/payroll"
      },
      {
        "name": "الموظفون والموارد البشرية",
        "description": "من التوظيف حتى المغادرة، سجل واحد",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "رؤية واضحة لفريق العمل",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "fr": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Découvrir tout Crew →",
    "viewPricing": "Voir tous les tarifs →",
    "crewList": [
      {
        "name": "Planning",
        "description": "Créez le planning en quelques minutes",
        "href": "/crew/scheduling"
      },
      {
        "name": "Temps & présence",
        "description": "Pointage sur site, heures fiables",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Paie",
        "description": "Prête à payer dans plus de 39 pays",
        "href": "/crew/payroll"
      },
      {
        "name": "Personnel & RH",
        "description": "De l'embauche au départ, un seul dossier",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Voyez vos équipes clairement",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "es": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Descubre todo Crew →",
    "viewPricing": "Ver precios completos →",
    "crewList": [
      {
        "name": "Horarios",
        "description": "Crea el horario en minutos",
        "href": "/crew/scheduling"
      },
      {
        "name": "Control horario",
        "description": "Fichaje presencial, horas exactas",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Nóminas",
        "description": "Listas para pagar en más de 39 países",
        "href": "/crew/payroll"
      },
      {
        "name": "Personal y RR. HH.",
        "description": "De la contratación a la salida, un registro",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Conoce a tu equipo con claridad",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "de": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Crew komplett entdecken →",
    "viewPricing": "Alle Preise ansehen →",
    "crewList": [
      {
        "name": "Dienstplanung",
        "description": "Den Dienstplan in Minuten erstellen",
        "href": "/crew/scheduling"
      },
      {
        "name": "Zeiterfassung",
        "description": "Stempeln vor Ort, saubere Stunden",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Lohnabrechnung",
        "description": "Auszahlbereit in über 39 Ländern",
        "href": "/crew/payroll"
      },
      {
        "name": "Personal & HR",
        "description": "Vom Onboarding bis zum Austritt, eine Akte",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Die Belegschaft klar im Blick",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "nl": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Ontdek heel Crew →",
    "viewPricing": "Bekijk alle prijzen →",
    "crewList": [
      {
        "name": "Roosters",
        "description": "Maak het rooster in minuten",
        "href": "/crew/scheduling"
      },
      {
        "name": "Tijd & aanwezigheid",
        "description": "Inklokken op locatie, kloppende uren",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Salaris",
        "description": "Klaar om uit te betalen in 39+ landen",
        "href": "/crew/payroll"
      },
      {
        "name": "Personeel & HR",
        "description": "Van aanname tot vertrek, één dossier",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Zie je personeel helder",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "pt": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Explore todo o Crew →",
    "viewPricing": "Ver preços completos →",
    "crewList": [
      {
        "name": "Escalas",
        "description": "Monte a escala em minutos",
        "href": "/crew/scheduling"
      },
      {
        "name": "Ponto e presença",
        "description": "Registo no local, horas certas",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Folha de pagamento",
        "description": "Pronta para pagar em mais de 39 países",
        "href": "/crew/payroll"
      },
      {
        "name": "Pessoas e RH",
        "description": "Da contratação à saída, um só registo",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Veja a equipa com clareza",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "hi": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "पूरा Crew देखें →",
    "viewPricing": "पूरी कीमतें देखें →",
    "crewList": [
      {
        "name": "शेड्यूलिंग",
        "description": "मिनटों में शेड्यूल बनाएँ",
        "href": "/crew/scheduling"
      },
      {
        "name": "समय और उपस्थिति",
        "description": "साइट पर हाज़िरी, सटीक घंटे",
        "href": "/crew/time-attendance"
      },
      {
        "name": "पेरोल",
        "description": "39+ देशों में भुगतान के लिए तैयार",
        "href": "/crew/payroll"
      },
      {
        "name": "स्टाफ़ और HR",
        "description": "भर्ती से विदाई तक, एक रिकॉर्ड",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "अपनी टीम को स्पष्ट देखें",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "ur": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "مکمل Crew دریافت کریں →",
    "viewPricing": "مکمل قیمتیں دیکھیں →",
    "crewList": [
      {
        "name": "شیڈولنگ",
        "description": "چند منٹ میں شیڈول بنائیں",
        "href": "/crew/scheduling"
      },
      {
        "name": "وقت اور حاضری",
        "description": "موقع پر حاضری، درست گھنٹے",
        "href": "/crew/time-attendance"
      },
      {
        "name": "تنخواہ",
        "description": "39 سے زائد ممالک میں ادائیگی کے لیے تیار",
        "href": "/crew/payroll"
      },
      {
        "name": "عملہ اور ایچ آر",
        "description": "بھرتی سے رخصتی تک، ایک ریکارڈ",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "اپنی ٹیم کو واضح طور پر دیکھیں",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "it": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Esplora tutto Crew →",
    "viewPricing": "Vedi tutti i prezzi →",
    "crewList": [
      {
        "name": "Turni",
        "description": "Crea i turni in pochi minuti",
        "href": "/crew/scheduling"
      },
      {
        "name": "Presenze",
        "description": "Timbratura in sede, ore precise",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Buste paga",
        "description": "Pronte al pagamento in oltre 39 Paesi",
        "href": "/crew/payroll"
      },
      {
        "name": "Personale e HR",
        "description": "Dall'assunzione all'uscita, un'unica scheda",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Vedi il personale con chiarezza",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "pl": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Poznaj cały Crew →",
    "viewPricing": "Zobacz pełny cennik →",
    "crewList": [
      {
        "name": "Grafiki",
        "description": "Ułóż grafik w kilka minut",
        "href": "/crew/scheduling"
      },
      {
        "name": "Czas i obecność",
        "description": "Odbicie na miejscu, czyste godziny",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Płace",
        "description": "Gotowe do wypłaty w ponad 39 krajach",
        "href": "/crew/payroll"
      },
      {
        "name": "Pracownicy i HR",
        "description": "Od zatrudnienia po odejście, jedna kartoteka",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Zobacz zespół wyraźnie",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "tr": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Crew'i tümüyle keşfet →",
    "viewPricing": "Tüm fiyatları gör →",
    "crewList": [
      {
        "name": "Vardiya planı",
        "description": "Planı dakikalar içinde oluştur",
        "href": "/crew/scheduling"
      },
      {
        "name": "Zaman ve devam",
        "description": "Yerinde giriş, net saatler",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Bordro",
        "description": "39+ ülkede ödemeye hazır",
        "href": "/crew/payroll"
      },
      {
        "name": "Çalışanlar ve İK",
        "description": "İşe alımdan ayrılışa, tek kayıt",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Ekibini net gör",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "zh-Hans": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "探索完整 Crew →",
    "viewPricing": "查看完整价格 →",
    "crewList": [
      {
        "name": "排班",
        "description": "几分钟搞定排班",
        "href": "/crew/scheduling"
      },
      {
        "name": "考勤",
        "description": "到店打卡，工时清晰",
        "href": "/crew/time-attendance"
      },
      {
        "name": "薪资",
        "description": "可在 39+ 个国家发薪",
        "href": "/crew/payroll"
      },
      {
        "name": "员工与人力资源",
        "description": "从入职到离职，一份档案",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "清晰洞察你的团队",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "ja": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Crew のすべてを見る →",
    "viewPricing": "料金の全体を見る →",
    "crewList": [
      {
        "name": "シフト管理",
        "description": "数分でシフトを作成",
        "href": "/crew/scheduling"
      },
      {
        "name": "勤怠管理",
        "description": "現場で打刻、正確な労働時間",
        "href": "/crew/time-attendance"
      },
      {
        "name": "給与計算",
        "description": "39か国以上で支払い対応",
        "href": "/crew/payroll"
      },
      {
        "name": "人材・人事",
        "description": "採用から退職まで一つの記録に",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "チームをクリアに把握",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "ko": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Crew 전체 둘러보기 →",
    "viewPricing": "전체 요금 보기 →",
    "crewList": [
      {
        "name": "근무 일정",
        "description": "몇 분 만에 일정 완성",
        "href": "/crew/scheduling"
      },
      {
        "name": "근태 관리",
        "description": "현장 출퇴근 기록, 정확한 근무 시간",
        "href": "/crew/time-attendance"
      },
      {
        "name": "급여",
        "description": "39개국 이상에서 지급 준비 완료",
        "href": "/crew/payroll"
      },
      {
        "name": "인력 및 HR",
        "description": "채용부터 퇴사까지 하나의 기록",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "인력 현황을 한눈에",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "id": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Jelajahi semua Crew →",
    "viewPricing": "Lihat harga lengkap →",
    "crewList": [
      {
        "name": "Penjadwalan",
        "description": "Susun jadwal dalam hitungan menit",
        "href": "/crew/scheduling"
      },
      {
        "name": "Waktu & Kehadiran",
        "description": "Absen di lokasi, jam kerja akurat",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Penggajian",
        "description": "Siap bayar di 39+ negara",
        "href": "/crew/payroll"
      },
      {
        "name": "Karyawan & HR",
        "description": "Dari rekrut hingga keluar, satu data",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Lihat tim Anda dengan jelas",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "vi": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Khám phá toàn bộ Crew →",
    "viewPricing": "Xem bảng giá đầy đủ →",
    "crewList": [
      {
        "name": "Xếp lịch",
        "description": "Lập lịch chỉ trong vài phút",
        "href": "/crew/scheduling"
      },
      {
        "name": "Chấm công",
        "description": "Chấm công tại chỗ, giờ giấc chuẩn",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Bảng lương",
        "description": "Sẵn sàng chi trả ở hơn 39 quốc gia",
        "href": "/crew/payroll"
      },
      {
        "name": "Nhân sự & HR",
        "description": "Từ tuyển đến nghỉ, một hồ sơ",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Thấu hiểu đội ngũ rõ ràng",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "ro": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Explorează tot Crew →",
    "viewPricing": "Vezi toate prețurile →",
    "crewList": [
      {
        "name": "Programări",
        "description": "Creezi programul în câteva minute",
        "href": "/crew/scheduling"
      },
      {
        "name": "Pontaj și prezență",
        "description": "Pontaj la fața locului, ore corecte",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Salarizare",
        "description": "Gata de plată în peste 39 de țări",
        "href": "/crew/payroll"
      },
      {
        "name": "Personal și HR",
        "description": "De la angajare la plecare, o singură fișă",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Vezi echipa cu claritate",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "sv": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Utforska hela Crew →",
    "viewPricing": "Se alla priser →",
    "crewList": [
      {
        "name": "Schemaläggning",
        "description": "Skapa schemat på några minuter",
        "href": "/crew/scheduling"
      },
      {
        "name": "Tid och närvaro",
        "description": "Instämpling på plats, korrekta timmar",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Lön",
        "description": "Redo att betala i 39+ länder",
        "href": "/crew/payroll"
      },
      {
        "name": "Personal och HR",
        "description": "Från anställning till avslut, ett register",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Se personalen tydligt",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "bn": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "সম্পূর্ণ Crew দেখুন →",
    "viewPricing": "সম্পূর্ণ মূল্য দেখুন →",
    "crewList": [
      {
        "name": "শিডিউলিং",
        "description": "মিনিটেই শিডিউল তৈরি করুন",
        "href": "/crew/scheduling"
      },
      {
        "name": "সময় ও উপস্থিতি",
        "description": "সাইটে ক্লক-ইন, নির্ভুল ঘণ্টা",
        "href": "/crew/time-attendance"
      },
      {
        "name": "পেরোল",
        "description": "৩৯+ দেশে বেতন দিতে প্রস্তুত",
        "href": "/crew/payroll"
      },
      {
        "name": "কর্মী ও HR",
        "description": "নিয়োগ থেকে বিদায়, এক রেকর্ড",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "কর্মীদের স্পষ্টভাবে দেখুন",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "th": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "สำรวจ Crew ทั้งหมด →",
    "viewPricing": "ดูราคาทั้งหมด →",
    "crewList": [
      {
        "name": "การจัดตาราง",
        "description": "สร้างตารางงานได้ในไม่กี่นาที",
        "href": "/crew/scheduling"
      },
      {
        "name": "เวลาและการเข้างาน",
        "description": "ลงเวลาที่หน้างาน ชั่วโมงแม่นยำ",
        "href": "/crew/time-attendance"
      },
      {
        "name": "เงินเดือน",
        "description": "พร้อมจ่ายใน 39+ ประเทศ",
        "href": "/crew/payroll"
      },
      {
        "name": "พนักงานและ HR",
        "description": "ตั้งแต่จ้างจนลาออก ในข้อมูลเดียว",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "เห็นภาพทีมงานชัดเจน",
        "href": "/crew/people-intelligence"
      }
    ]
  },
  "ms": {
    "core": "Core",
    "crew": "Crew",
    "crewAll": "Terokai seluruh Crew →",
    "viewPricing": "Lihat harga penuh →",
    "crewList": [
      {
        "name": "Penjadualan",
        "description": "Bina jadual dalam beberapa minit",
        "href": "/crew/scheduling"
      },
      {
        "name": "Masa & Kehadiran",
        "description": "Daftar masuk di lokasi, jam tepat",
        "href": "/crew/time-attendance"
      },
      {
        "name": "Gaji",
        "description": "Sedia bayar di 39+ negara",
        "href": "/crew/payroll"
      },
      {
        "name": "Pekerja & HR",
        "description": "Dari pengambilan ke pemberhentian, satu rekod",
        "href": "/crew/people"
      },
      {
        "name": "People Intelligence",
        "description": "Lihat tenaga kerja dengan jelas",
        "href": "/crew/people-intelligence"
      }
    ]
  }
};
