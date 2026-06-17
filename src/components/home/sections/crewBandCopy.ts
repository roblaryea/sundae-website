import type { WebsiteLocale } from "@/lib/i18n";

// Copy for the homepage Crew band - the operational substrate (scheduling, time &
// attendance, payroll readiness, hire-to-retire HR ops) that feeds the decision
// intelligence. Native transcreation per locale; house style: no em-dashes / AI-tell
// characters - plain spaced hyphens only.
export type CrewPillar = { title: string; desc: string };
export type CrewBandCopy = {
  eyebrow: string;
  headline: string;
  accent: string;
  sub: string;
  pillars: CrewPillar[];
  optionalNote: string;
  cta: string;
};

export const crewBandCopy: Record<WebsiteLocale, CrewBandCopy> = {
  en: {
    "eyebrow": "CREW · THE OPERATIONAL SUBSTRATE",
    "headline": "Run the people side of the business.",
    "accent": "Every shift becomes signal.",
    "sub": "Scheduling, time and attendance, payroll readiness, and the full hire-to-retire lifecycle - run natively in Sundae, or bring your own HR. Every shift, punch, and pay run becomes operating data that makes Pulse, Labor Intelligence, and Foresight sharper.",
    "pillars": [
      {
        "title": "Scheduling",
        "desc": "AI-built schedules from real demand, eligibility-checked, with four manager view modes."
      },
      {
        "title": "Time & Attendance",
        "desc": "Mobile clock-in with geo-fence and biometric, break tracking, and live trust scores."
      },
      {
        "title": "Payroll Readiness",
        "desc": "Provider-neutral readiness and statutory exports across the US, Canada, UK, EU, and GCC. Pack-driven, never hardcoded."
      },
      {
        "title": "Hire-to-Retire",
        "desc": "Onboarding, performance, talent, casework, documents, and offboarding in one employee record."
      }
    ],
    "optionalNote": "Optional by design. Run Crew natively, or connect your existing HR and payroll stack.",
    "cta": "Explore Sundae Crew"
  },
  ar: {
    "eyebrow": "CREW · الأساس التشغيلي",
    "headline": "أدِر الجانب البشري من العمل.",
    "accent": "كل وردية تتحول إلى إشارة.",
    "sub": "جدولة الورديات، وتتبع الوقت والحضور، وتجهيز الرواتب، ودورة التوظيف الكاملة من التعيين حتى المغادرة - تُدار أصلاً داخل Sundae، أو عبر نظام HR الخاص بك. كل وردية وكل تسجيل دخول وكل دورة رواتب تتحول إلى بيانات تشغيلية تجعل Pulse وLabor Intelligence وForesight أكثر دقة.",
    "pillars": [
      {
        "title": "جدولة الورديات",
        "desc": "جداول تبنيها الـ AI من الطلب الفعلي، ويُتحقق من الأهلية فيها، مع أربعة أوضاع عرض للمدير."
      },
      {
        "title": "الوقت والحضور",
        "desc": "تسجيل دخول عبر الجوال مع السياج الجغرافي والقياسات الحيوية، وتتبع الاستراحات، ودرجات ثقة مباشرة."
      },
      {
        "title": "تجهيز الرواتب",
        "desc": "تجهيز محايد تجاه المزود وتصدير نظامي عبر US وCanada وUK وEU وGCC. مدفوع بالحزم، وغير مكتوب في الكود أبداً."
      },
      {
        "title": "من التعيين حتى المغادرة",
        "desc": "التأهيل، والأداء، والمواهب، وإدارة الحالات، والمستندات، وإنهاء الخدمة في سجل موظف واحد."
      }
    ],
    "optionalNote": "اختياري بالتصميم. استخدم Crew أصلاً، أو اربط منظومة HR والرواتب الحالية لديك.",
    "cta": "اكتشف Sundae Crew"
  },
  fr: {
    "eyebrow": "CREW · LE SOCLE OPÉRATIONNEL",
    "headline": "Pilotez le volet humain de votre activité.",
    "accent": "Chaque service devient un signal.",
    "sub": "Planning, gestion du temps et des présences, préparation de la paie et tout le cycle du recrutement au départ - gérés nativement dans Sundae, ou avec votre propre solution HR. Chaque service, chaque pointage et chaque paie devient une donnée d'exploitation qui affine Pulse, Labor Intelligence et Foresight.",
    "pillars": [
      {
        "title": "Planning",
        "desc": "Des plannings construits par l'IA à partir de la demande réelle, vérifiés selon l'éligibilité, avec quatre modes d'affichage pour le manager."
      },
      {
        "title": "Temps et présences",
        "desc": "Pointage mobile avec géorepérage et biométrie, suivi des pauses et scores de confiance en temps réel."
      },
      {
        "title": "Préparation de la paie",
        "desc": "Préparation indépendante du prestataire et exports réglementaires pour les US, le Canada, le UK, l'EU et le GCC. Piloté par packs, jamais codé en dur."
      },
      {
        "title": "Du recrutement au départ",
        "desc": "Intégration, performance, talents, gestion de cas, documents et offboarding dans un seul dossier salarié."
      }
    ],
    "optionalNote": "Optionnel par conception. Utilisez Crew en natif, ou connectez votre propre stack HR et paie.",
    "cta": "Découvrir Sundae Crew"
  },
  es: {
    "eyebrow": "CREW · EL SUSTRATO OPERATIVO",
    "headline": "Gestiona el lado humano del negocio.",
    "accent": "Cada turno se convierte en señal.",
    "sub": "Planificación de turnos, control horario y de presencia, preparación de la nómina y todo el ciclo de la contratación a la salida - gestionados de forma nativa en Sundae, o con tu propio HR. Cada turno, cada fichaje y cada nómina se convierte en dato operativo que hace más precisos a Pulse, Labor Intelligence y Foresight.",
    "pillars": [
      {
        "title": "Planificación de turnos",
        "desc": "Cuadrantes creados por IA a partir de la demanda real, verificados por elegibilidad, con cuatro modos de vista para el responsable."
      },
      {
        "title": "Control horario y presencia",
        "desc": "Fichaje móvil con geocerca y biometría, seguimiento de descansos y puntuaciones de confianza en directo."
      },
      {
        "title": "Preparación de la nómina",
        "desc": "Preparación neutral respecto al proveedor y exportaciones reglamentarias para US, Canadá, UK, EU y GCC. Basada en packs, nunca codificada en duro."
      },
      {
        "title": "De la contratación a la salida",
        "desc": "Onboarding, desempeño, talento, gestión de casos, documentos y offboarding en un único expediente del empleado."
      }
    ],
    "optionalNote": "Opcional por diseño. Usa Crew de forma nativa, o conecta tu stack de HR y nómina actual.",
    "cta": "Descubrir Sundae Crew"
  },
  de: {
    "eyebrow": "CREW · DAS OPERATIVE FUNDAMENT",
    "headline": "Führen Sie die Personalseite des Geschäfts.",
    "accent": "Jede Schicht wird zum Signal.",
    "sub": "Dienstplanung, Zeit- und Anwesenheitserfassung, Lohnvorbereitung und der gesamte Zyklus von der Einstellung bis zum Austritt - nativ in Sundae geführt, oder mit Ihrem eigenen HR. Jede Schicht, jede Stempelung und jeder Lohnlauf wird zu Betriebsdaten, die Pulse, Labor Intelligence und Foresight schärfer machen.",
    "pillars": [
      {
        "title": "Dienstplanung",
        "desc": "Von KI erstellte Dienstpläne aus echter Nachfrage, eignungsgeprüft, mit vier Ansichtsmodi für Führungskräfte."
      },
      {
        "title": "Zeit und Anwesenheit",
        "desc": "Mobiles Einstempeln mit Geofence und Biometrie, Pausenerfassung und Vertrauenswerte in Echtzeit."
      },
      {
        "title": "Lohnvorbereitung",
        "desc": "Anbieterneutrale Vorbereitung und gesetzliche Exporte für US, Kanada, UK, EU und GCC. Pack-gesteuert, niemals fest codiert."
      },
      {
        "title": "Von der Einstellung bis zum Austritt",
        "desc": "Onboarding, Leistung, Talent, Fallbearbeitung, Dokumente und Offboarding in einer einzigen Mitarbeiterakte."
      }
    ],
    "optionalNote": "Bewusst optional. Nutzen Sie Crew nativ, oder verbinden Sie Ihren bestehenden HR- und Lohn-Stack.",
    "cta": "Sundae Crew entdecken"
  },
  nl: {
    "eyebrow": "CREW · HET OPERATIONELE FUNDAMENT",
    "headline": "Stuur de menskant van het bedrijf aan.",
    "accent": "Elke dienst wordt een signaal.",
    "sub": "Roosters, tijd- en aanwezigheidsregistratie, salarisvoorbereiding en de volledige cyclus van indiensttreding tot uitdiensttreding - native gedraaid in Sundae, of met je eigen HR. Elke dienst, klokking en loonronde wordt operationele data die Pulse, Labor Intelligence en Foresight scherper maakt.",
    "pillars": [
      {
        "title": "Roosters",
        "desc": "Door AI opgebouwde roosters op basis van echte vraag, gecontroleerd op geschiktheid, met vier weergavemodi voor de manager."
      },
      {
        "title": "Tijd en aanwezigheid",
        "desc": "Mobiel inklokken met geofence en biometrie, pauzeregistratie en live vertrouwensscores."
      },
      {
        "title": "Salarisvoorbereiding",
        "desc": "Leveranciersneutrale voorbereiding en wettelijke exports voor de US, Canada, het UK, de EU en de GCC. Pack-gestuurd, nooit hardcoded."
      },
      {
        "title": "Van indiensttreding tot uitdiensttreding",
        "desc": "Onboarding, prestaties, talent, casework, documenten en offboarding in één personeelsdossier."
      }
    ],
    "optionalNote": "Optioneel van opzet. Gebruik Crew native, of koppel je bestaande HR- en salarisstack.",
    "cta": "Ontdek Sundae Crew"
  },
  pt: {
    "eyebrow": "CREW · A BASE OPERACIONAL",
    "headline": "Faça a gestão do lado humano do negócio.",
    "accent": "Cada turno vira sinal.",
    "sub": "Escalas, controlo de ponto e presença, preparação da folha de pagamento e todo o ciclo da contratação à saída - geridos nativamente no Sundae, ou com o seu próprio HR. Cada turno, marcação e processamento de folha vira dado operacional que torna o Pulse, o Labor Intelligence e o Foresight mais precisos.",
    "pillars": [
      {
        "title": "Escalas",
        "desc": "Escalas criadas por IA a partir da procura real, verificadas por elegibilidade, com quatro modos de visualização para o gestor."
      },
      {
        "title": "Ponto e presença",
        "desc": "Marcação de ponto móvel com geocerca e biometria, registo de pausas e pontuações de confiança ao vivo."
      },
      {
        "title": "Preparação da folha de pagamento",
        "desc": "Preparação neutra em relação ao fornecedor e exportações regulamentares para US, Canadá, UK, EU e GCC. Orientada por packs, nunca codificada de forma fixa."
      },
      {
        "title": "Da contratação à saída",
        "desc": "Onboarding, desempenho, talento, gestão de casos, documentos e offboarding num único registo do colaborador."
      }
    ],
    "optionalNote": "Opcional por conceção. Use o Crew nativamente, ou ligue a sua stack atual de HR e folha de pagamento.",
    "cta": "Explorar o Sundae Crew"
  },
  hi: {
    "eyebrow": "CREW · संचालन का आधार",
    "headline": "बिज़नेस के लोगों वाले हिस्से को संभालिए।",
    "accent": "हर शिफ्ट बन जाती है सिग्नल।",
    "sub": "शेड्यूलिंग, टाइम और अटेंडेंस, पेरोल की तैयारी, और भर्ती से लेकर रिटायरमेंट तक का पूरा सफ़र - सब Sundae में सीधे चलाइए, या अपना खुद का HR साथ लाइए। हर शिफ्ट, हर पंच और हर पे रन ऐसा ऑपरेटिंग डेटा बनता है जो Pulse, Labor Intelligence और Foresight को और पैना बनाता है।",
    "pillars": [
      {
        "title": "Scheduling",
        "desc": "असली डिमांड से AI से बने शेड्यूल, एलिजिबिलिटी जाँच के साथ, और मैनेजर के लिए चार व्यू मोड।"
      },
      {
        "title": "Time & Attendance",
        "desc": "जियो-फेंस और बायोमेट्रिक के साथ मोबाइल क्लॉक-इन, ब्रेक ट्रैकिंग, और लाइव ट्रस्ट स्कोर।"
      },
      {
        "title": "Payroll Readiness",
        "desc": "US, Canada, UK, EU और GCC में प्रोवाइडर-न्यूट्रल तैयारी और वैधानिक एक्सपोर्ट। पैक से चलने वाला, कभी हार्डकोड नहीं।"
      },
      {
        "title": "Hire-to-Retire",
        "desc": "ऑनबोर्डिंग, परफॉर्मेंस, टैलेंट, केसवर्क, डॉक्युमेंट्स और ऑफबोर्डिंग - सब एक ही कर्मचारी रिकॉर्ड में।"
      }
    ],
    "optionalNote": "डिज़ाइन से ही वैकल्पिक। Crew को सीधे चलाइए, या अपने मौजूदा HR और पेरोल स्टैक से जोड़िए।",
    "cta": "Sundae Crew देखें"
  },
  ur: {
    "eyebrow": "CREW · آپریشنل بنیاد",
    "headline": "کاروبار کا عملے والا پہلو سنبھالیے۔",
    "accent": "ہر شفٹ سگنل بن جاتی ہے۔",
    "sub": "شیڈولنگ، ٹائم اور اٹینڈنس، پے رول کی تیاری، اور بھرتی سے ریٹائرمنٹ تک کا پورا سفر - سب Sundae میں براہِ راست چلائیے، یا اپنا HR ساتھ لائیے۔ ہر شفٹ، ہر پنچ اور ہر پے رن ایسا آپریٹنگ ڈیٹا بنتا ہے جو Pulse، Labor Intelligence اور Foresight کو مزید گہرا کرتا ہے۔",
    "pillars": [
      {
        "title": "Scheduling",
        "desc": "اصل طلب سے AI کے بنائے شیڈول، اہلیت کی جانچ کے ساتھ، اور مینیجر کے لیے چار ویو موڈ۔"
      },
      {
        "title": "Time & Attendance",
        "desc": "جیو فینس اور بایومیٹرک کے ساتھ موبائل کلاک اِن، بریک ٹریکنگ، اور لائیو ٹرسٹ اسکور۔"
      },
      {
        "title": "Payroll Readiness",
        "desc": "US، Canada، UK، EU اور GCC میں پرووائیڈر سے آزاد تیاری اور قانونی ایکسپورٹ۔ پیک سے چلنے والا، کبھی ہارڈ کوڈ نہیں۔"
      },
      {
        "title": "Hire-to-Retire",
        "desc": "آن بورڈنگ، کارکردگی، ٹیلنٹ، کیس ورک، دستاویزات اور آف بورڈنگ - سب ایک ہی ملازم ریکارڈ میں۔"
      }
    ],
    "optionalNote": "ڈیزائن ہی سے اختیاری۔ Crew کو براہِ راست چلائیے، یا اپنے موجودہ HR اور پے رول اسٹیک سے جوڑیے۔",
    "cta": "Sundae Crew دیکھیے"
  },
  it: {
    "eyebrow": "CREW · LA BASE OPERATIVA",
    "headline": "Gestisci il lato umano dell'attività.",
    "accent": "Ogni turno diventa un segnale.",
    "sub": "Pianificazione dei turni, rilevazione di presenze e timbrature, preparazione delle buste paga e l'intero ciclo dall'assunzione all'uscita - gestiti nativamente in Sundae, o con il tuo HR. Ogni turno, timbratura ed elaborazione paga diventa un dato operativo che rende più precisi Pulse, Labor Intelligence e Foresight.",
    "pillars": [
      {
        "title": "Pianificazione dei turni",
        "desc": "Turni costruiti dall'IA sulla domanda reale, verificati per idoneità, con quattro modalità di visualizzazione per il responsabile."
      },
      {
        "title": "Presenze e timbrature",
        "desc": "Timbratura mobile con geofence e biometria, tracciamento delle pause e punteggi di affidabilità in tempo reale."
      },
      {
        "title": "Preparazione delle buste paga",
        "desc": "Preparazione neutrale rispetto al fornitore ed esportazioni di legge per US, Canada, UK, EU e GCC. Guidata da pack, mai scritta nel codice."
      },
      {
        "title": "Dall'assunzione all'uscita",
        "desc": "Onboarding, performance, talenti, gestione dei casi, documenti e offboarding in un unico fascicolo del dipendente."
      }
    ],
    "optionalNote": "Opzionale per scelta. Usa Crew in modo nativo, o collega il tuo attuale stack HR e paghe.",
    "cta": "Scopri Sundae Crew"
  },
  pl: {
    "eyebrow": "CREW · OPERACYJNY FUNDAMENT",
    "headline": "Zarządzaj ludźmi w swoim biznesie.",
    "accent": "Każda zmiana staje się sygnałem.",
    "sub": "Grafiki, czas pracy i obecność, gotowość do wypłat oraz pełen cykl od zatrudnienia po odejście pracownika - prowadzone natywnie w Sundae albo z własnym systemem HR. Każda zmiana, odbicie karty i naliczenie wynagrodzeń stają się danymi operacyjnymi, które wyostrzają Pulse, Labor Intelligence i Foresight.",
    "pillars": [
      {
        "title": "Grafiki",
        "desc": "Grafiki tworzone przez AI na podstawie realnego popytu, ze sprawdzaniem uprawnień i czterema trybami widoku dla menedżera."
      },
      {
        "title": "Czas pracy i obecność",
        "desc": "Mobilne odbijanie wejść z geofencingiem i biometrią, rejestracja przerw oraz wskaźniki zaufania na żywo."
      },
      {
        "title": "Gotowość do wypłat",
        "desc": "Gotowość niezależna od dostawcy i eksporty ustawowe dla US, Canada, UK, EU i GCC. Sterowane pakietami reguł, nigdy zaszyte na sztywno."
      },
      {
        "title": "Od zatrudnienia po odejście",
        "desc": "Wdrożenie, ocena, rozwój talentów, obsługa spraw, dokumenty i offboarding w jednej karcie pracownika."
      }
    ],
    "optionalNote": "Opcjonalny z założenia. Prowadź Crew natywnie albo podłącz swój obecny system HR i płacowy.",
    "cta": "Poznaj Sundae Crew"
  },
  tr: {
    "eyebrow": "CREW · OPERASYONEL ZEMİN",
    "headline": "İşin insan tarafını yönetin.",
    "accent": "Her vardiya sinyale dönüşür.",
    "sub": "Vardiya planlama, mesai ve devam takibi, bordro hazırlığı ve işe alımdan ayrılışa kadar tüm çalışan döngüsü - doğrudan Sundae içinde ya da kendi HR sisteminizle yürütün. Her vardiya, her kayıt ve her bordro çalışması, Pulse, Labor Intelligence ve Foresight'ı keskinleştiren operasyon verisine dönüşür.",
    "pillars": [
      {
        "title": "Vardiya Planlama",
        "desc": "Gerçek talebe göre AI ile kurulan, uygunluk denetimli vardiyalar ve yönetici için dört görünüm modu."
      },
      {
        "title": "Mesai ve Devam Takibi",
        "desc": "Coğrafi sınır ve biyometri ile mobil giriş, mola takibi ve canlı güven skorları."
      },
      {
        "title": "Bordro Hazırlığı",
        "desc": "Sağlayıcıdan bağımsız hazırlık ve US, Canada, UK, EU ile GCC genelinde yasal dışa aktarımlar. Kural paketleriyle yönetilir, asla sabit kodlanmaz."
      },
      {
        "title": "İşe Alımdan Ayrılışa",
        "desc": "Tek bir çalışan kaydında işe başlatma, performans, yetenek, vaka yönetimi, belgeler ve işten ayrılış."
      }
    ],
    "optionalNote": "Tasarım gereği isteğe bağlı. Crew'i doğrudan kullanın ya da mevcut HR ve bordro sisteminize bağlayın.",
    "cta": "Sundae Crew'i Keşfedin"
  },
  "zh-Hans": {
    "eyebrow": "CREW · 运营底座",
    "headline": "把团队管理交给一套系统。",
    "accent": "每个班次都化为信号。",
    "sub": "排班、考勤、薪资就绪以及从入职到离职的完整员工周期 - 既可在 Sundae 中原生运行，也可对接你自己的 HR。每一次排班、每一次打卡、每一轮发薪，都会变成运营数据，让 Pulse、Labor Intelligence 和 Foresight 更加敏锐。",
    "pillars": [
      {
        "title": "排班",
        "desc": "由 AI 依据真实需求生成排班，自动核验资质，并提供四种管理者视图模式。"
      },
      {
        "title": "考勤",
        "desc": "支持地理围栏与生物识别的移动打卡、休息时长记录，以及实时信任评分。"
      },
      {
        "title": "薪资就绪",
        "desc": "中立于服务商的就绪机制，覆盖 US、Canada、UK、EU 与 GCC 的法定导出。由规则包驱动，绝不写死。"
      },
      {
        "title": "从入职到离职",
        "desc": "入职、绩效、人才、个案处理、文档与离职，全部归于同一份员工档案。"
      }
    ],
    "optionalNote": "按设计可选启用。既可原生运行 Crew，也可对接你现有的 HR 与薪资系统。",
    "cta": "了解 Sundae Crew"
  },
  ja: {
    "eyebrow": "CREW · 運用の基盤",
    "headline": "人に関わる業務を、ひとつに。",
    "accent": "すべてのシフトが、シグナルになる。",
    "sub": "シフト管理、勤怠、給与計算の準備、そして採用から退職までの一連の従業員ライフサイクル - Sundae でネイティブに運用することも、自社の HR を併用することもできます。あらゆるシフト、打刻、給与処理が運用データとなり、Pulse、Labor Intelligence、Foresight をより鋭くします。",
    "pillars": [
      {
        "title": "シフト管理",
        "desc": "実需に基づき AI が組むシフト。資格を自動チェックし、管理者向けに4つのビューモードを用意。"
      },
      {
        "title": "勤怠",
        "desc": "ジオフェンスと生体認証によるモバイル打刻、休憩の記録、そしてリアルタイムの信頼スコア。"
      },
      {
        "title": "給与計算の準備",
        "desc": "プロバイダーに依存しない準備と、US、Canada、UK、EU、GCC にわたる法定書類の出力。ルールパック駆動で、決め打ちはしません。"
      },
      {
        "title": "採用から退職まで",
        "desc": "オンボーディング、評価、人材開発、ケース対応、書類、退職手続きを、ひとつの従業員レコードに。"
      }
    ],
    "optionalNote": "あくまで任意です。Crew をネイティブに使うことも、既存の HR・給与システムに接続することもできます。",
    "cta": "Sundae Crew を見る"
  },
  ko: {
    "eyebrow": "CREW · 운영의 토대",
    "headline": "사람을 관리하는 일, 한곳에서.",
    "accent": "모든 근무가 신호가 됩니다.",
    "sub": "근무 스케줄, 근태, 급여 준비, 그리고 채용부터 퇴직까지 이어지는 전체 직원 라이프사이클 - Sundae에서 직접 운영하거나, 사용하던 HR을 그대로 연결하세요. 모든 근무와 출퇴근 기록, 급여 처리가 운영 데이터가 되어 Pulse, Labor Intelligence, Foresight를 더 예리하게 만듭니다.",
    "pillars": [
      {
        "title": "근무 스케줄",
        "desc": "실제 수요를 기반으로 AI가 짜는 스케줄. 자격 요건을 자동 검증하고, 관리자용 네 가지 보기 모드를 제공합니다."
      },
      {
        "title": "근태",
        "desc": "지오펜스와 생체 인증을 활용한 모바일 출퇴근 체크, 휴게 시간 기록, 실시간 신뢰 점수."
      },
      {
        "title": "급여 준비",
        "desc": "공급사에 종속되지 않는 준비 기능과 US, Canada, UK, EU, GCC 전반의 법정 내보내기. 규칙 팩으로 작동하며, 절대 하드코딩하지 않습니다."
      },
      {
        "title": "채용부터 퇴직까지",
        "desc": "온보딩, 성과, 인재, 사례 처리, 문서, 오프보딩을 하나의 직원 기록에 담습니다."
      }
    ],
    "optionalNote": "설계상 선택 사항입니다. Crew를 직접 운영하거나, 기존 HR과 급여 시스템에 연결하세요.",
    "cta": "Sundae Crew 살펴보기"
  },
  id: {
    "eyebrow": "CREW · FONDASI OPERASIONAL",
    "headline": "Kelola sisi manusia dari bisnis Anda.",
    "accent": "Setiap shift menjadi sinyal.",
    "sub": "Penjadwalan, kehadiran dan absensi, kesiapan penggajian, dan seluruh perjalanan dari rekrut hingga pensiun - jalankan langsung di Sundae, atau bawa HR Anda sendiri. Setiap shift, absen, dan siklus gaji menjadi data operasional yang membuat Pulse, Labor Intelligence, dan Foresight makin tajam.",
    "pillars": [
      {
        "title": "Scheduling",
        "desc": "Jadwal yang dibuat AI dari permintaan nyata, sudah dicek kelayakan, dengan empat mode tampilan manajer."
      },
      {
        "title": "Time & Attendance",
        "desc": "Absen mobile dengan geo-fence dan biometrik, pelacakan istirahat, dan skor kepercayaan langsung."
      },
      {
        "title": "Payroll Readiness",
        "desc": "Kesiapan netral-penyedia dan ekspor statutori di US, Canada, UK, EU, dan GCC. Berbasis pack, tidak pernah dikodekan keras."
      },
      {
        "title": "Hire-to-Retire",
        "desc": "Onboarding, kinerja, talenta, penanganan kasus, dokumen, dan offboarding dalam satu catatan karyawan."
      }
    ],
    "optionalNote": "Opsional sejak dirancang. Jalankan Crew secara langsung, atau hubungkan stack HR dan penggajian Anda yang sudah ada.",
    "cta": "Jelajahi Sundae Crew"
  },
  vi: {
    "eyebrow": "CREW · NỀN TẢNG VẬN HÀNH",
    "headline": "Quản lý mảng con người của doanh nghiệp.",
    "accent": "Mỗi ca làm đều thành tín hiệu.",
    "sub": "Xếp lịch, chấm công, sẵn sàng tính lương, và toàn bộ vòng đời từ tuyển dụng đến nghỉ hưu - chạy trực tiếp trong Sundae, hoặc dùng HR của riêng bạn. Mỗi ca làm, mỗi lần chấm công và mỗi kỳ lương đều trở thành dữ liệu vận hành giúp Pulse, Labor Intelligence và Foresight sắc bén hơn.",
    "pillars": [
      {
        "title": "Scheduling",
        "desc": "Lịch do AI lập từ nhu cầu thực tế, đã kiểm tra điều kiện, với bốn chế độ xem cho quản lý."
      },
      {
        "title": "Time & Attendance",
        "desc": "Chấm công trên di động với hàng rào địa lý và sinh trắc học, theo dõi giờ nghỉ, và điểm tin cậy theo thời gian thực."
      },
      {
        "title": "Payroll Readiness",
        "desc": "Sẵn sàng độc lập nhà cung cấp và xuất báo cáo theo luật ở US, Canada, UK, EU và GCC. Dựa trên gói quy tắc, không bao giờ mã hóa cứng."
      },
      {
        "title": "Hire-to-Retire",
        "desc": "Tiếp nhận, đánh giá, nhân tài, xử lý hồ sơ, tài liệu, và nghỉ việc trong một hồ sơ nhân viên duy nhất."
      }
    ],
    "optionalNote": "Tùy chọn ngay từ thiết kế. Chạy Crew trực tiếp, hoặc kết nối với hệ thống HR và tính lương sẵn có của bạn.",
    "cta": "Khám phá Sundae Crew"
  },
  ro: {
    "eyebrow": "CREW · BAZA OPERAȚIONALĂ",
    "headline": "Gestionează latura umană a afacerii.",
    "accent": "Fiecare tură devine semnal.",
    "sub": "Planificarea turelor, pontajul, pregătirea pentru salarizare și întregul ciclu de la angajare la plecare - rulate nativ în Sundae sau cu propriul sistem HR. Fiecare tură, fiecare pontaj și fiecare rulaj de salarii devin date operaționale care fac Pulse, Labor Intelligence și Foresight mai precise.",
    "pillars": [
      {
        "title": "Planificarea turelor",
        "desc": "Ture construite de AI pe baza cererii reale, cu verificarea eligibilității și patru moduri de vizualizare pentru manager."
      },
      {
        "title": "Pontaj și prezență",
        "desc": "Pontare mobilă cu geofencing și biometrie, urmărirea pauzelor și scoruri de încredere în timp real."
      },
      {
        "title": "Pregătire pentru salarizare",
        "desc": "Pregătire neutră față de furnizor și exporturi legale pentru US, Canada, UK, EU și GCC. Bazată pe pachete de reguli, niciodată codată rigid."
      },
      {
        "title": "De la angajare la plecare",
        "desc": "Integrare, performanță, talent, gestionarea cazurilor, documente și plecare, totul într-o singură fișă a angajatului."
      }
    ],
    "optionalNote": "Opțional prin concepție. Rulează Crew nativ sau conectează sistemul tău actual de HR și salarizare.",
    "cta": "Descoperă Sundae Crew"
  },
  sv: {
    "eyebrow": "CREW · DEN OPERATIVA GRUNDEN",
    "headline": "Sköt personalsidan av verksamheten.",
    "accent": "Varje pass blir en signal.",
    "sub": "Schemaläggning, tid och närvaro, löneunderlag och hela resan från anställning till avslut - körs direkt i Sundae eller med ditt eget HR-system. Varje pass, varje stämpling och varje lönekörning blir driftdata som gör Pulse, Labor Intelligence och Foresight skarpare.",
    "pillars": [
      {
        "title": "Schemaläggning",
        "desc": "Scheman som AI bygger utifrån verklig efterfrågan, med behörighetskontroll och fyra visningslägen för chefen."
      },
      {
        "title": "Tid och närvaro",
        "desc": "Mobil instämpling med geofence och biometri, rastregistrering och förtroendepoäng i realtid."
      },
      {
        "title": "Löneunderlag",
        "desc": "Leverantörsneutralt underlag och lagstadgade exporter för US, Canada, UK, EU och GCC. Regelpaketsstyrt, aldrig hårdkodat."
      },
      {
        "title": "Från anställning till avslut",
        "desc": "Onboarding, prestation, talang, ärendehantering, dokument och offboarding i en enda personalpost."
      }
    ],
    "optionalNote": "Valfritt från grunden. Kör Crew direkt eller koppla in ditt befintliga HR- och lönesystem.",
    "cta": "Utforska Sundae Crew"
  },
  bn: {
    "eyebrow": "CREW · পরিচালনার ভিত্তি",
    "headline": "ব্যবসার মানুষ সংক্রান্ত দিকটি সামলান।",
    "accent": "প্রতিটি শিফট হয়ে ওঠে সিগন্যাল।",
    "sub": "শিডিউলিং, টাইম ও অ্যাটেনডেন্স, পেরোল প্রস্তুতি, এবং নিয়োগ থেকে অবসর পর্যন্ত পুরো যাত্রা - সব Sundae-তে সরাসরি চালান, কিংবা নিজের HR সঙ্গে আনুন। প্রতিটি শিফট, প্রতিটি পাঞ্চ আর প্রতিটি পে রান এমন পরিচালন ডেটা হয়ে ওঠে যা Pulse, Labor Intelligence ও Foresight-কে আরও তীক্ষ্ণ করে।",
    "pillars": [
      {
        "title": "Scheduling",
        "desc": "প্রকৃত চাহিদা থেকে AI দিয়ে তৈরি শিডিউল, যোগ্যতা যাচাই করা, এবং ম্যানেজারের জন্য চারটি ভিউ মোড।"
      },
      {
        "title": "Time & Attendance",
        "desc": "জিও-ফেন্স ও বায়োমেট্রিক সহ মোবাইল ক্লক-ইন, ব্রেক ট্র্যাকিং, এবং লাইভ ট্রাস্ট স্কোর।"
      },
      {
        "title": "Payroll Readiness",
        "desc": "US, Canada, UK, EU ও GCC জুড়ে প্রোভাইডার-নিরপেক্ষ প্রস্তুতি ও বিধিবদ্ধ এক্সপোর্ট। প্যাক-নির্ভর, কখনও হার্ডকোড নয়।"
      },
      {
        "title": "Hire-to-Retire",
        "desc": "অনবোর্ডিং, পারফরম্যান্স, ট্যালেন্ট, কেসওয়ার্ক, ডকুমেন্ট ও অফবোর্ডিং - সব এক কর্মী রেকর্ডে।"
      }
    ],
    "optionalNote": "ডিজাইন থেকেই ঐচ্ছিক। Crew সরাসরি চালান, কিংবা আপনার বিদ্যমান HR ও পেরোল স্ট্যাকের সঙ্গে যুক্ত করুন।",
    "cta": "Sundae Crew দেখুন"
  },
  th: {
    "eyebrow": "CREW · รากฐานการดำเนินงาน",
    "headline": "ดูแลด้านบุคลากรของธุรกิจ",
    "accent": "ทุกกะกลายเป็นสัญญาณ",
    "sub": "การจัดตาราง การลงเวลาเข้างาน ความพร้อมด้านเงินเดือน และวงจรตั้งแต่จ้างจนเกษียณอย่างครบถ้วน - ใช้งานได้โดยตรงใน Sundae หรือนำระบบ HR ของคุณเองมาเชื่อมก็ได้ ทุกกะ ทุกการลงเวลา และทุกรอบจ่ายเงินเดือนกลายเป็นข้อมูลการดำเนินงานที่ทำให้ Pulse, Labor Intelligence และ Foresight คมชัดยิ่งขึ้น",
    "pillars": [
      {
        "title": "Scheduling",
        "desc": "ตารางที่ AI สร้างจากความต้องการจริง ตรวจคุณสมบัติแล้ว พร้อมโหมดมุมมองสำหรับผู้จัดการสี่แบบ"
      },
      {
        "title": "Time & Attendance",
        "desc": "ลงเวลาเข้างานบนมือถือด้วยรั้วพิกัดและไบโอเมตริก ติดตามเวลาพัก และคะแนนความน่าเชื่อถือแบบสด"
      },
      {
        "title": "Payroll Readiness",
        "desc": "ความพร้อมที่เป็นกลางต่อผู้ให้บริการและการส่งออกตามกฎหมายครอบคลุม US, Canada, UK, EU และ GCC ขับเคลื่อนด้วยแพ็ก ไม่มีการฮาร์ดโค้ด"
      },
      {
        "title": "Hire-to-Retire",
        "desc": "การรับเข้า ประเมินผล ดูแลคนเก่ง จัดการเคส เอกสาร และการพ้นสภาพ รวมในบันทึกพนักงานเดียว"
      }
    ],
    "optionalNote": "เป็นตัวเลือกตั้งแต่การออกแบบ ใช้ Crew โดยตรง หรือเชื่อมกับระบบ HR และเงินเดือนเดิมของคุณ",
    "cta": "สำรวจ Sundae Crew"
  },
  ms: {
    "eyebrow": "CREW · ASAS OPERASI",
    "headline": "Urus bahagian manusia dalam perniagaan.",
    "accent": "Setiap syif menjadi isyarat.",
    "sub": "Penjadualan, masa dan kehadiran, kesediaan gaji, dan keseluruhan kitaran dari pengambilan hingga persaraan - jalankan terus dalam Sundae, atau bawa HR anda sendiri. Setiap syif, daftar masuk dan kitaran gaji menjadi data operasi yang menjadikan Pulse, Labor Intelligence dan Foresight lebih tajam.",
    "pillars": [
      {
        "title": "Scheduling",
        "desc": "Jadual yang dibina AI daripada permintaan sebenar, disemak kelayakan, dengan empat mod paparan pengurus."
      },
      {
        "title": "Time & Attendance",
        "desc": "Daftar masuk mudah alih dengan pagar geo dan biometrik, penjejakan rehat, dan skor kepercayaan langsung."
      },
      {
        "title": "Payroll Readiness",
        "desc": "Kesediaan neutral pembekal dan eksport berkanun merentas US, Canada, UK, EU dan GCC. Dipacu pek, tidak pernah dikodkan keras."
      },
      {
        "title": "Hire-to-Retire",
        "desc": "Penerimaan, prestasi, bakat, pengurusan kes, dokumen, dan pelepasan dalam satu rekod pekerja."
      }
    ],
    "optionalNote": "Pilihan sejak reka bentuk. Jalankan Crew secara terus, atau sambungkan timbunan HR dan gaji sedia ada anda.",
    "cta": "Terokai Sundae Crew"
  },
};
