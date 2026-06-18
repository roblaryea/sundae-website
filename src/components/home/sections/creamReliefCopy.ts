import type { WebsiteLocale } from '@/lib/i18n';

/**
 * Copy for the two homepage "cream relief" beats (SectionCreamRelief), plus the
 * labels inside the animated "one decision surface" UnifyVisual on the second beat.
 *
 * Hand-authored native transcreation per locale - NOT literal word-for-word - so
 * each line reads the way an operator in that market would actually say it. Follows
 * the editorialCopy.ts pattern: a self-contained locale-keyed map resolved at render
 * with an English fallback, kept out of the large per-locale i18n.ts trees.
 *
 * EMPHASIS MARKER: the `statement` strings carry the cherry-italic accent as a
 * `*...*` span (the same word(s) emphasized in the English source). The component
 * splits on `*...*` and renders the wrapped phrase in <em>. Every locale MUST keep
 * exactly one `*...*` pair around the equivalent emphasized phrase.
 *
 * Glossary discipline (mirrors scripts/qa-translation-quality.mjs): "Sundae", "POS",
 * "P&L", "Pulse" and the role abbreviation "GM" stay untranslated in every locale.
 *
 * Restaurant terms of art - "the line"/"the floor" (the service floor / cooking line,
 * contrasted with a dashboard), "cover" (a guest served), "the pass" - are rendered
 * with each market's native vocabulary, not calqued.
 */

export type CreamReliefVariantCopy = {
  eyebrow: string;
  /** Big editorial belief. Emphasized phrase wrapped in `*...*`. */
  statement: string;
  lede: string;
  /**
   * Three live operating moments (used by the 'decisions' beat only): each frame
   * is a place on the operation (Floor / Pass / Room) and the live signal Sundae
   * reads there while it's still actionable. Tone is derived by index in the
   * component (0,1 = caution, 2 = good), so it isn't localized here.
   */
  trio: [TrioFrame, TrioFrame, TrioFrame];
};

export type TrioFrame = { label: string; signal: string };

export type UnifyVisualCopy = {
  scattered: string;
  inputs: { pos: string; labor: string; inventory: string; delivery: string; reservations: string };
  decisionSurface: string;
  allOutlets: string;
  live: string;
  kpis: { revenue: string; labor: string; margin: string };
  oneTruth: string;
  roles: { gm: string; finance: string; headChef: string; owner: string; regional: string };
};

export type CreamReliefCopy = {
  decisions: CreamReliefVariantCopy;
  truth: CreamReliefVariantCopy;
  unify: UnifyVisualCopy;
};

export const creamReliefCopy: Record<WebsiteLocale, CreamReliefCopy> = {
  en: {
    decisions: {
      eyebrow: 'Decisions, not dashboards',
      statement:
        'Every plate, every cover, every shift is a *decision.* Sundae is in all of them - with you, on the floor.',
      lede: 'The work happens on the line, not in a dashboard. Sundae turns the live shift into the next right move - for the person who has to make it.',
      trio: [
        { label: 'Floor', signal: 'Wait time rising' },
        { label: 'Pass', signal: 'Fire time slipping' },
        { label: 'Room', signal: 'Covers on pace' },
      ],
    },
    truth: {
      eyebrow: 'One source of truth',
      statement: 'One screen the whole team *actually trusts.*',
      lede: 'POS, labor, inventory, delivery, reservations - Sundae unifies every system into a single decision surface. No more arguing about whose number is right; the team acts instead of reconciling spreadsheets.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Your systems, scattered',
      inputs: { pos: 'POS', labor: 'Labor', inventory: 'Inventory', delivery: 'Delivery', reservations: 'Reservations' },
      decisionSurface: 'One decision surface',
      allOutlets: 'All outlets',
      live: 'Live',
      kpis: { revenue: 'Revenue', labor: 'Labor', margin: 'Margin' },
      oneTruth: 'One truth, the whole team',
      roles: { gm: 'GM', finance: 'Finance', headChef: 'Head chef', owner: 'Owner', regional: 'Regional' },
    },
  },
  ar: {
    decisions: {
      eyebrow: 'قرارات، لا لوحات معلومات',
      statement:
        'كل طبق وكل ضيف وكل وردية هو *قرار.* Sundae حاضر فيها جميعاً - معك، على أرض الخدمة.',
      lede: 'العمل يجري على خط الخدمة، لا في لوحة معلومات. Sundae يحوّل الوردية الجارية إلى الخطوة الصحيحة التالية - لمن عليه أن يتخذها.',
      trio: [
        { label: 'الصالة', signal: 'وقت الانتظار يرتفع' },
        { label: 'الباس', signal: 'توقيت التحضير يتأخر' },
        { label: 'القاعة', signal: 'عدد الضيوف على المسار' },
      ],
    },
    truth: {
      eyebrow: 'مصدر واحد للحقيقة',
      statement: 'شاشة واحدة *يثق بها الفريق كله فعلاً.*',
      lede: 'POS والعمالة والمخزون والتوصيل والحجوزات - يوحّد Sundae كل نظام في سطح قرار واحد. لا مزيد من الجدال حول رقم مَن هو الصحيح؛ الفريق يتصرّف بدل تسوية جداول البيانات.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'أنظمتك، مبعثرة',
      inputs: { pos: 'POS', labor: 'العمالة', inventory: 'المخزون', delivery: 'التوصيل', reservations: 'الحجوزات' },
      decisionSurface: 'سطح قرار واحد',
      allOutlets: 'كل الفروع',
      live: 'مباشر',
      kpis: { revenue: 'الإيرادات', labor: 'العمالة', margin: 'الهامش' },
      oneTruth: 'حقيقة واحدة، الفريق كله',
      roles: { gm: 'GM', finance: 'المالية', headChef: 'رئيس الطهاة', owner: 'المالك', regional: 'الإقليمي' },
    },
  },
  fr: {
    decisions: {
      eyebrow: 'Des décisions, pas des tableaux de bord',
      statement:
        'Chaque assiette, chaque couvert, chaque service est une *décision.* Sundae est dans toutes - avec vous, en salle.',
      lede: "Le travail se joue en salle, pas dans un tableau de bord. Sundae transforme le service en cours en la bonne décision suivante - pour celui qui doit la prendre.",
      trio: [
        { label: 'Service', signal: 'Attente en hausse' },
        { label: 'Passe', signal: 'Timing qui glisse' },
        { label: 'Salle', signal: 'Couverts dans les temps' },
      ],
    },
    truth: {
      eyebrow: 'Une seule source de vérité',
      statement: "Un seul écran auquel toute l'équipe *fait vraiment confiance.*",
      lede: "POS, main-d'œuvre, stocks, livraison, réservations - Sundae réunit chaque système en une seule surface de décision. Fini les débats sur qui a le bon chiffre ; l'équipe agit au lieu de réconcilier des tableurs.",
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Vos systèmes, éparpillés',
      inputs: { pos: 'POS', labor: "Main-d'œuvre", inventory: 'Stocks', delivery: 'Livraison', reservations: 'Réservations' },
      decisionSurface: 'Une seule surface de décision',
      allOutlets: 'Tous les points de vente',
      live: 'En direct',
      kpis: { revenue: "Chiffre d'affaires", labor: "Main-d'œuvre", margin: 'Marge' },
      oneTruth: "Une seule vérité, toute l'équipe",
      roles: { gm: 'GM', finance: 'Finances', headChef: 'Chef de cuisine', owner: 'Propriétaire', regional: 'Régional' },
    },
  },
  es: {
    decisions: {
      eyebrow: 'Decisiones, no paneles',
      statement:
        'Cada plato, cada comensal, cada turno es una *decisión.* Sundae está en todas - contigo, en la sala.',
      lede: 'El trabajo ocurre en la sala, no en un panel. Sundae convierte el turno en vivo en el siguiente movimiento acertado - para quien tiene que tomarlo.',
      trio: [
        { label: 'Sala', signal: 'Espera al alza' },
        { label: 'Pase', signal: 'Tiempos retrasados' },
        { label: 'Comedor', signal: 'Comensales en ritmo' },
      ],
    },
    truth: {
      eyebrow: 'Una sola fuente de verdad',
      statement: 'Una sola pantalla en la que todo el equipo *de verdad confía.*',
      lede: 'POS, personal, inventario, delivery, reservas - Sundae unifica cada sistema en una sola superficie de decisión. Se acabó discutir quién tiene el número correcto; el equipo actúa en lugar de cuadrar hojas de cálculo.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Tus sistemas, dispersos',
      inputs: { pos: 'POS', labor: 'Personal', inventory: 'Inventario', delivery: 'Delivery', reservations: 'Reservas' },
      decisionSurface: 'Una sola superficie de decisión',
      allOutlets: 'Todos los locales',
      live: 'En vivo',
      kpis: { revenue: 'Ingresos', labor: 'Personal', margin: 'Margen' },
      oneTruth: 'Una verdad, todo el equipo',
      roles: { gm: 'GM', finance: 'Finanzas', headChef: 'Jefe de cocina', owner: 'Propietario', regional: 'Regional' },
    },
  },
  de: {
    decisions: {
      eyebrow: 'Entscheidungen statt Dashboards',
      statement:
        'Jeder Teller, jedes Gedeck, jede Schicht ist eine *Entscheidung.* Sundae steckt in allen - mit Ihnen, im Gastraum.',
      lede: 'Die Arbeit passiert im Gastraum, nicht im Dashboard. Sundae macht aus der laufenden Schicht den nächsten richtigen Schritt - für die Person, die ihn gehen muss.',
      trio: [
        { label: 'Fläche', signal: 'Wartezeit steigt' },
        { label: 'Anrichte', signal: 'Anrichtzeit kippt' },
        { label: 'Gastraum', signal: 'Gedecke im Plan' },
      ],
    },
    truth: {
      eyebrow: 'Eine einzige Quelle der Wahrheit',
      statement: 'Ein Bildschirm, dem das ganze Team *wirklich vertraut.*',
      lede: 'POS, Personal, Lager, Lieferung, Reservierungen - Sundae führt jedes System zu einer einzigen Entscheidungsoberfläche zusammen. Kein Streit mehr darüber, wessen Zahl stimmt; das Team handelt, statt Tabellen abzugleichen.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Ihre Systeme, verstreut',
      inputs: { pos: 'POS', labor: 'Personal', inventory: 'Lager', delivery: 'Lieferung', reservations: 'Reservierungen' },
      decisionSurface: 'Eine Entscheidungsoberfläche',
      allOutlets: 'Alle Standorte',
      live: 'Live',
      kpis: { revenue: 'Umsatz', labor: 'Personal', margin: 'Marge' },
      oneTruth: 'Eine Wahrheit, das ganze Team',
      roles: { gm: 'GM', finance: 'Finanzen', headChef: 'Küchenchef', owner: 'Inhaber', regional: 'Regional' },
    },
  },
  nl: {
    decisions: {
      eyebrow: 'Beslissingen, geen dashboards',
      statement:
        'Elk bord, elke gast, elke dienst is een *beslissing.* Sundae zit in allemaal - met u, op de vloer.',
      lede: 'Het werk gebeurt op de vloer, niet in een dashboard. Sundae maakt van de lopende dienst de juiste volgende stap - voor wie hem moet zetten.',
      trio: [
        { label: 'Vloer', signal: 'Wachttijd loopt op' },
        { label: 'Doorgeef', signal: 'Baktiming loopt uit' },
        { label: 'Zaal', signal: 'Couverts op schema' },
      ],
    },
    truth: {
      eyebrow: 'Eén bron van waarheid',
      statement: 'Eén scherm dat het hele team *echt vertrouwt.*',
      lede: 'POS, personeel, voorraad, bezorging, reserveringen - Sundae brengt elk systeem samen tot één beslisoppervlak. Geen discussie meer over wiens cijfer klopt; het team handelt in plaats van spreadsheets te kloppen.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Uw systemen, verspreid',
      inputs: { pos: 'POS', labor: 'Personeel', inventory: 'Voorraad', delivery: 'Bezorging', reservations: 'Reserveringen' },
      decisionSurface: 'Eén beslisoppervlak',
      allOutlets: 'Alle vestigingen',
      live: 'Live',
      kpis: { revenue: 'Omzet', labor: 'Personeel', margin: 'Marge' },
      oneTruth: 'Eén waarheid, het hele team',
      roles: { gm: 'GM', finance: 'Financiën', headChef: 'Chef-kok', owner: 'Eigenaar', regional: 'Regionaal' },
    },
  },
  pt: {
    decisions: {
      eyebrow: 'Decisões, não painéis',
      statement:
        'Cada prato, cada cliente, cada turno é uma *decisão.* O Sundae está em todas - com você, no salão.',
      lede: 'O trabalho acontece no salão, não em um painel. O Sundae transforma o turno ao vivo no próximo passo certo - para quem precisa dá-lo.',
      trio: [
        { label: 'Salão', signal: 'Espera a subir' },
        { label: 'Passe', signal: 'Tempos a atrasar' },
        { label: 'Sala', signal: 'Couverts no ritmo' },
      ],
    },
    truth: {
      eyebrow: 'Uma única fonte de verdade',
      statement: 'Uma só tela em que a equipe inteira *realmente confia.*',
      lede: 'POS, mão de obra, estoque, delivery, reservas - o Sundae unifica cada sistema em uma única superfície de decisão. Acabou a discussão sobre quem tem o número certo; a equipe age em vez de conciliar planilhas.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Seus sistemas, espalhados',
      inputs: { pos: 'POS', labor: 'Mão de obra', inventory: 'Estoque', delivery: 'Delivery', reservations: 'Reservas' },
      decisionSurface: 'Uma superfície de decisão',
      allOutlets: 'Todas as unidades',
      live: 'Ao vivo',
      kpis: { revenue: 'Receita', labor: 'Mão de obra', margin: 'Margem' },
      oneTruth: 'Uma verdade, a equipe inteira',
      roles: { gm: 'GM', finance: 'Financeiro', headChef: 'Chef de cozinha', owner: 'Proprietário', regional: 'Regional' },
    },
  },
  hi: {
    decisions: {
      eyebrow: 'डैशबोर्ड नहीं, फैसले',
      statement:
        'हर प्लेट, हर मेहमान, हर शिफ्ट एक *फैसला* है। Sundae इन सबमें मौजूद है - आपके साथ, फ्लोर पर।',
      lede: 'काम फ्लोर पर होता है, डैशबोर्ड में नहीं। Sundae चालू शिफ्ट को अगले सही कदम में बदल देता है - उस शख्स के लिए जिसे वह कदम उठाना है।',
      trio: [
        { label: 'फ्लोर', signal: 'वेट टाइम बढ़ रहा' },
        { label: 'पास', signal: 'फायर टाइम फिसल रहा' },
        { label: 'डाइनिंग रूम', signal: 'मेहमान लक्ष्य पर' },
      ],
    },
    truth: {
      eyebrow: 'सच का एक ही स्रोत',
      statement: 'एक स्क्रीन जिस पर पूरी टीम *सचमुच भरोसा करती है।*',
      lede: 'POS, स्टाफ, इन्वेंट्री, डिलीवरी, रिज़र्वेशन - Sundae हर सिस्टम को एक ही डिसीज़न सरफेस में जोड़ देता है। अब इस बहस की ज़रूरत नहीं कि किसका आँकड़ा सही है; टीम स्प्रेडशीट मिलाने के बजाय कदम उठाती है।',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'आपके सिस्टम, बिखरे हुए',
      inputs: { pos: 'POS', labor: 'स्टाफ', inventory: 'इन्वेंट्री', delivery: 'डिलीवरी', reservations: 'रिज़र्वेशन' },
      decisionSurface: 'एक डिसीज़न सरफेस',
      allOutlets: 'सभी आउटलेट',
      live: 'लाइव',
      kpis: { revenue: 'रेवेन्यू', labor: 'श्रम', margin: 'मार्जिन' },
      oneTruth: 'एक सच, पूरी टीम',
      roles: { gm: 'GM', finance: 'वित्त', headChef: 'हेड शेफ', owner: 'मालिक', regional: 'रीजनल' },
    },
  },
  ur: {
    decisions: {
      eyebrow: 'ڈیش بورڈ نہیں، فیصلے',
      statement:
        'ہر پلیٹ، ہر مہمان، ہر شفٹ ایک *فیصلہ* ہے۔ Sundae اِن سب میں موجود ہے - آپ کے ساتھ، فلور پر۔',
      lede: 'کام فلور پر ہوتا ہے، ڈیش بورڈ میں نہیں۔ Sundae جاری شفٹ کو اگلے درست قدم میں بدل دیتا ہے - اُس شخص کے لیے جسے وہ قدم اٹھانا ہے۔',
      trio: [
        { label: 'فلور', signal: 'ویٹ ٹائم بڑھ رہا ہے' },
        { label: 'پاس', signal: 'فائر ٹائم پھسل رہا ہے' },
        { label: 'ڈائننگ روم', signal: 'مہمانوں کی تعداد ہدف پر' },
      ],
    },
    truth: {
      eyebrow: 'سچ کا واحد ماخذ',
      statement: 'ایک اسکرین جس پر پوری ٹیم *واقعی بھروسا کرتی ہے۔*',
      lede: 'POS، عملہ، انوینٹری، ڈیلیوری، ریزرویشن - Sundae ہر نظام کو ایک ہی فیصلہ سطح میں جوڑ دیتا ہے۔ اب یہ بحث نہیں کہ کس کا عدد درست ہے؛ ٹیم اسپریڈ شیٹ ملانے کے بجائے قدم اٹھاتی ہے۔',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'آپ کے نظام، بکھرے ہوئے',
      inputs: { pos: 'POS', labor: 'عملہ', inventory: 'انوینٹری', delivery: 'ڈیلیوری', reservations: 'ریزرویشن' },
      decisionSurface: 'ایک فیصلہ سطح',
      allOutlets: 'تمام آؤٹ لیٹس',
      live: 'لائیو',
      kpis: { revenue: 'آمدنی', labor: 'محنت', margin: 'مارجن' },
      oneTruth: 'ایک سچ، پوری ٹیم',
      roles: { gm: 'GM', finance: 'فنانس', headChef: 'ہیڈ شیف', owner: 'مالک', regional: 'ریجنل' },
    },
  },
  it: {
    decisions: {
      eyebrow: 'Decisioni, non dashboard',
      statement:
        'Ogni piatto, ogni coperto, ogni turno è una *decisione.* Sundae è in tutte - con te, in sala.',
      lede: 'Il lavoro accade in sala, non in una dashboard. Sundae trasforma il turno in corso nella prossima mossa giusta - per chi deve prenderla.',
      trio: [
        { label: 'Servizio', signal: 'Attesa in aumento' },
        { label: 'Passe', signal: 'Tempi in ritardo' },
        { label: 'Sala', signal: 'Coperti in linea' },
      ],
    },
    truth: {
      eyebrow: "Un'unica fonte di verità",
      statement: 'Un solo schermo di cui tutto il team *si fida davvero.*',
      lede: 'POS, personale, magazzino, delivery, prenotazioni - Sundae unisce ogni sistema in un\'unica superficie decisionale. Basta discutere su chi ha il numero giusto; il team agisce invece di riconciliare fogli di calcolo.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'I tuoi sistemi, sparsi',
      inputs: { pos: 'POS', labor: 'Personale', inventory: 'Magazzino', delivery: 'Delivery', reservations: 'Prenotazioni' },
      decisionSurface: 'Una superficie decisionale',
      allOutlets: 'Tutti i punti vendita',
      live: 'In diretta',
      kpis: { revenue: 'Ricavi', labor: 'Personale', margin: 'Margine' },
      oneTruth: 'Una verità, tutto il team',
      roles: { gm: 'GM', finance: 'Finanza', headChef: 'Chef di cucina', owner: 'Titolare', regional: 'Regionale' },
    },
  },
  pl: {
    decisions: {
      eyebrow: 'Decyzje, nie pulpity',
      statement:
        'Każdy talerz, każdy gość, każda zmiana to *decyzja.* Sundae jest w każdej z nich - z tobą, na sali.',
      lede: 'Praca dzieje się na sali, nie na pulpicie. Sundae zamienia trwającą zmianę w kolejny właściwy ruch - dla osoby, która musi go wykonać.',
      trio: [
        { label: 'Obsługa', signal: 'Czas oczekiwania rośnie' },
        { label: 'Wydawka', signal: 'Timing się sypie' },
        { label: 'Sala', signal: 'Goście zgodnie z planem' },
      ],
    },
    truth: {
      eyebrow: 'Jedno źródło prawdy',
      statement: 'Jeden ekran, któremu cały zespół *naprawdę ufa.*',
      lede: 'POS, obsada, magazyn, dostawy, rezerwacje - Sundae łączy każdy system w jedną powierzchnię decyzyjną. Koniec sporów o to, czyja liczba jest poprawna; zespół działa, zamiast uzgadniać arkusze.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Twoje systemy, rozproszone',
      inputs: { pos: 'POS', labor: 'Obsada', inventory: 'Magazyn', delivery: 'Dostawy', reservations: 'Rezerwacje' },
      decisionSurface: 'Jedna powierzchnia decyzyjna',
      allOutlets: 'Wszystkie lokale',
      live: 'Na żywo',
      kpis: { revenue: 'Przychód', labor: 'Obsada', margin: 'Marża' },
      oneTruth: 'Jedna prawda, cały zespół',
      roles: { gm: 'GM', finance: 'Finanse', headChef: 'Szef kuchni', owner: 'Właściciel', regional: 'Regionalny' },
    },
  },
  tr: {
    decisions: {
      eyebrow: 'Gösterge paneli değil, kararlar',
      statement:
        'Her tabak, her misafir, her vardiya bir *karardır.* Sundae hepsinin içinde - sizinle, sahada.',
      lede: 'İş, gösterge panelinde değil, sahada olur. Sundae devam eden vardiyayı bir sonraki doğru hamleye dönüştürür - o hamleyi yapacak kişi için.',
      trio: [
        { label: 'Salon', signal: 'Bekleme süresi artıyor' },
        { label: 'Servis Ağzı', signal: 'Pişirme zamanı kayıyor' },
        { label: 'Masalar', signal: 'Misafir sayısı hedefte' },
      ],
    },
    truth: {
      eyebrow: 'Tek bir doğru kaynağı',
      statement: 'Tüm ekibin *gerçekten güvendiği* tek bir ekran.',
      lede: 'POS, iş gücü, stok, teslimat, rezervasyonlar - Sundae her sistemi tek bir karar yüzeyinde birleştirir. Kimin rakamının doğru olduğunu tartışmak yok artık; ekip tabloları uzlaştırmak yerine harekete geçer.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Sistemleriniz, dağınık',
      inputs: { pos: 'POS', labor: 'İş gücü', inventory: 'Stok', delivery: 'Teslimat', reservations: 'Rezervasyonlar' },
      decisionSurface: 'Tek bir karar yüzeyi',
      allOutlets: 'Tüm şubeler',
      live: 'Canlı',
      kpis: { revenue: 'Gelir', labor: 'İş gücü', margin: 'Marj' },
      oneTruth: 'Tek doğru, tüm ekip',
      roles: { gm: 'GM', finance: 'Finans', headChef: 'Mutfak şefi', owner: 'Sahip', regional: 'Bölge' },
    },
  },
  'zh-Hans': {
    decisions: {
      eyebrow: '要决策，不要仪表盘',
      statement: '每一道菜、每一位客人、每一个班次都是一次*决策。* Sundae 贯穿其中--与你同在，在一线。',
      lede: '工作发生在一线，而不是仪表盘里。Sundae 把正在进行的班次变成下一步的正确动作--交到真正要做决定的人手中。',
      trio: [
        { label: '前厅', signal: '等位时间上升' },
        { label: '出品口', signal: '出餐节奏延后' },
        { label: '餐厅', signal: '客流达标' },
      ],
    },
    truth: {
      eyebrow: '唯一的事实来源',
      statement: '一块整个团队*真正信任*的屏幕。',
      lede: 'POS、人力、库存、外送、预订--Sundae 把每个系统统一为单一的决策界面。不必再争论谁的数字才对；团队不再对账表格，而是直接行动。',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: '你的系统，各自为政',
      inputs: { pos: 'POS', labor: '人力', inventory: '库存', delivery: '外送', reservations: '预订' },
      decisionSurface: '单一决策界面',
      allOutlets: '全部门店',
      live: '实时',
      kpis: { revenue: '营收', labor: '人力', margin: '利润率' },
      oneTruth: '一个事实，全员共享',
      roles: { gm: 'GM', finance: '财务', headChef: '主厨', owner: '老板', regional: '区域' },
    },
  },
  ja: {
    decisions: {
      eyebrow: 'ダッシュボードではなく、決断を',
      statement: 'どの一皿も、どの一席も、どのシフトも、ひとつの*決断。* Sundae はそのすべてに--あなたとともに、現場で。',
      lede: '仕事は現場で起きる。ダッシュボードの中ではない。Sundae は進行中のシフトを次の最善手に変える--それを下す当人のために。',
      trio: [
        { label: 'フロア', signal: '待ち時間が増加' },
        { label: 'パス', signal: '提供タイミング遅延' },
        { label: '客席', signal: '客数は順調' },
      ],
    },
    truth: {
      eyebrow: 'ひとつの真実',
      statement: 'チーム全員が*本当に信頼できる*ひとつの画面。',
      lede: 'POS、人員、在庫、デリバリー、予約--Sundae はすべてのシステムをひとつの意思決定画面に束ねます。誰の数字が正しいかで揉めることはもうありません。チームは表計算の照合ではなく、行動に移ります。',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'バラバラのシステム',
      inputs: { pos: 'POS', labor: '人員', inventory: '在庫', delivery: 'デリバリー', reservations: '予約' },
      decisionSurface: 'ひとつの意思決定画面',
      allOutlets: '全店舗',
      live: 'ライブ',
      kpis: { revenue: '売上', labor: '人件費', margin: '利益率' },
      oneTruth: 'ひとつの真実を、チーム全員で',
      roles: { gm: 'GM', finance: '経理', headChef: '料理長', owner: 'オーナー', regional: 'エリア' },
    },
  },
  ko: {
    decisions: {
      eyebrow: '대시보드가 아니라 결정',
      statement: '접시 하나, 손님 한 명, 근무 한 번이 모두 하나의 *결정입니다.* Sundae는 그 모든 순간에 있습니다 - 당신과 함께, 현장에서.',
      lede: '일은 대시보드가 아니라 현장에서 일어납니다. Sundae는 진행 중인 근무를 다음 옳은 한 수로 바꿔줍니다 - 그 결정을 내려야 하는 사람을 위해.',
      trio: [
        { label: '홀', signal: '대기 시간 증가' },
        { label: '패스', signal: '조리 타이밍 지연' },
        { label: '다이닝룸', signal: '고객 수 순항 중' },
      ],
    },
    truth: {
      eyebrow: '하나의 진실',
      statement: '팀 전체가 *정말로 신뢰하는* 하나의 화면.',
      lede: 'POS, 인력, 재고, 배달, 예약 - Sundae는 모든 시스템을 하나의 의사결정 화면으로 통합합니다. 누구의 숫자가 맞는지 다툴 일이 없습니다. 팀은 스프레드시트를 맞추는 대신 행동합니다.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: '흩어진 당신의 시스템',
      inputs: { pos: 'POS', labor: '인력', inventory: '재고', delivery: '배달', reservations: '예약' },
      decisionSurface: '하나의 의사결정 화면',
      allOutlets: '전 매장',
      live: '실시간',
      kpis: { revenue: '매출', labor: '인건비', margin: '마진' },
      oneTruth: '하나의 진실, 팀 전체',
      roles: { gm: 'GM', finance: '재무', headChef: '주방장', owner: '점주', regional: '지역' },
    },
  },
  id: {
    decisions: {
      eyebrow: 'Keputusan, bukan dasbor',
      statement:
        'Setiap piring, setiap tamu, setiap shift adalah sebuah *keputusan.* Sundae ada di semuanya - bersama Anda, di lantai.',
      lede: 'Pekerjaan terjadi di lantai, bukan di dasbor. Sundae mengubah shift yang sedang berjalan menjadi langkah tepat berikutnya - untuk orang yang harus mengambilnya.',
      trio: [
        { label: 'Area Layan', signal: 'Waktu tunggu naik' },
        { label: 'Meja Saji', signal: 'Waktu masak meleset' },
        { label: 'Ruang Makan', signal: 'Tamu sesuai target' },
      ],
    },
    truth: {
      eyebrow: 'Satu sumber kebenaran',
      statement: 'Satu layar yang *benar-benar dipercaya* seluruh tim.',
      lede: 'POS, tenaga kerja, inventaris, pengiriman, reservasi - Sundae menyatukan setiap sistem menjadi satu permukaan keputusan. Tak ada lagi perdebatan soal angka siapa yang benar; tim bertindak alih-alih mencocokkan spreadsheet.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Sistem Anda, tercerai-berai',
      inputs: { pos: 'POS', labor: 'Tenaga kerja', inventory: 'Inventaris', delivery: 'Pengiriman', reservations: 'Reservasi' },
      decisionSurface: 'Satu permukaan keputusan',
      allOutlets: 'Semua outlet',
      live: 'Langsung',
      kpis: { revenue: 'Pendapatan', labor: 'Tenaga kerja', margin: 'Margin' },
      oneTruth: 'Satu kebenaran, seluruh tim',
      roles: { gm: 'GM', finance: 'Keuangan', headChef: 'Kepala koki', owner: 'Pemilik', regional: 'Regional' },
    },
  },
  vi: {
    decisions: {
      eyebrow: 'Quyết định, không phải bảng số liệu',
      statement:
        'Mỗi đĩa ăn, mỗi lượt khách, mỗi ca làm đều là một *quyết định.* Sundae có mặt trong tất cả - cùng bạn, ngay tại sàn.',
      lede: 'Công việc diễn ra ngay tại sàn, không phải trên bảng số liệu. Sundae biến ca làm đang diễn ra thành nước đi đúng tiếp theo - cho chính người phải đưa ra nó.',
      trio: [
        { label: 'Khu phục vụ', signal: 'Thời gian chờ tăng' },
        { label: 'Bếp ra món', signal: 'Giờ ra món trễ' },
        { label: 'Phòng ăn', signal: 'Lượt khách đúng nhịp' },
      ],
    },
    truth: {
      eyebrow: 'Một nguồn sự thật duy nhất',
      statement: 'Một màn hình mà cả đội *thực sự tin tưởng.*',
      lede: 'POS, nhân sự, kho, giao hàng, đặt bàn - Sundae hợp nhất mọi hệ thống thành một mặt phẳng quyết định duy nhất. Không còn tranh cãi con số của ai đúng; cả đội hành động thay vì đối chiếu bảng tính.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Hệ thống của bạn, rời rạc',
      inputs: { pos: 'POS', labor: 'Nhân sự', inventory: 'Kho', delivery: 'Giao hàng', reservations: 'Đặt bàn' },
      decisionSurface: 'Một mặt phẳng quyết định',
      allOutlets: 'Mọi chi nhánh',
      live: 'Trực tiếp',
      kpis: { revenue: 'Doanh thu', labor: 'Nhân sự', margin: 'Biên lợi nhuận' },
      oneTruth: 'Một sự thật, cả đội',
      roles: { gm: 'GM', finance: 'Tài chính', headChef: 'Bếp trưởng', owner: 'Chủ', regional: 'Vùng' },
    },
  },
  ro: {
    decisions: {
      eyebrow: 'Decizii, nu panouri',
      statement:
        'Fiecare farfurie, fiecare client, fiecare tură este o *decizie.* Sundae este în toate - alături de tine, în sală.',
      lede: 'Munca se întâmplă în sală, nu într-un panou. Sundae transformă tura în desfășurare în următoarea mișcare corectă - pentru cel care trebuie să o ia.',
      trio: [
        { label: 'Servire', signal: 'Așteptare în creștere' },
        { label: 'Pas', signal: 'Timpii întârzie' },
        { label: 'Sală', signal: 'Acoperiri în ritm' },
      ],
    },
    truth: {
      eyebrow: 'O singură sursă de adevăr',
      statement: 'Un singur ecran în care toată echipa *chiar are încredere.*',
      lede: 'POS, personal, stocuri, livrare, rezervări - Sundae unește fiecare sistem într-o singură suprafață de decizie. Gata cu discuțiile despre cine are cifra corectă; echipa acționează în loc să potrivească tabele.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Sistemele tale, împrăștiate',
      inputs: { pos: 'POS', labor: 'Personal', inventory: 'Stocuri', delivery: 'Livrare', reservations: 'Rezervări' },
      decisionSurface: 'O singură suprafață de decizie',
      allOutlets: 'Toate locațiile',
      live: 'În direct',
      kpis: { revenue: 'Venituri', labor: 'Personal', margin: 'Marjă' },
      oneTruth: 'Un adevăr, toată echipa',
      roles: { gm: 'GM', finance: 'Finanțe', headChef: 'Bucătar-șef', owner: 'Proprietar', regional: 'Regional' },
    },
  },
  sv: {
    decisions: {
      eyebrow: 'Beslut, inte instrumentpaneler',
      statement:
        'Varje tallrik, varje gäst, varje pass är ett *beslut.* Sundae finns i alla - med dig, på golvet.',
      lede: 'Jobbet sker på golvet, inte i en instrumentpanel. Sundae gör det pågående passet till nästa rätta drag - för den som måste ta det.',
      trio: [
        { label: 'Golvet', signal: 'Väntetid ökar' },
        { label: 'Passet', signal: 'Tajmingen glider' },
        { label: 'Matsalen', signal: 'Kuvert i takt' },
      ],
    },
    truth: {
      eyebrow: 'En enda källa till sanning',
      statement: 'En skärm som hela teamet *verkligen litar på.*',
      lede: 'POS, bemanning, lager, leverans, bokningar - Sundae förenar varje system till en enda beslutsyta. Inget mer tjafs om vems siffra som stämmer; teamet agerar i stället för att stämma av kalkylblad.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Dina system, utspridda',
      inputs: { pos: 'POS', labor: 'Bemanning', inventory: 'Lager', delivery: 'Leverans', reservations: 'Bokningar' },
      decisionSurface: 'En beslutsyta',
      allOutlets: 'Alla enheter',
      live: 'Live',
      kpis: { revenue: 'Intäkter', labor: 'Bemanning', margin: 'Marginal' },
      oneTruth: 'En sanning, hela teamet',
      roles: { gm: 'GM', finance: 'Ekonomi', headChef: 'Kökschef', owner: 'Ägare', regional: 'Regional' },
    },
  },
  bn: {
    decisions: {
      eyebrow: 'ড্যাশবোর্ড নয়, সিদ্ধান্ত',
      statement:
        'প্রতিটি প্লেট, প্রতিটি অতিথি, প্রতিটি শিফট একেকটি *সিদ্ধান্ত।* Sundae সবগুলোতেই আছে - আপনার সঙ্গে, ফ্লোরে।',
      lede: 'কাজ হয় ফ্লোরে, ড্যাশবোর্ডে নয়। Sundae চলমান শিফটকে পরের সঠিক পদক্ষেপে রূপ দেয় - যাকে সেই পদক্ষেপ নিতে হবে তার জন্য।',
      trio: [
        { label: 'ফ্লোর', signal: 'অপেক্ষার সময় বাড়ছে' },
        { label: 'পাস', signal: 'ফায়ার টাইম পিছিয়ে' },
        { label: 'ডাইনিং রুম', signal: 'অতিথি লক্ষ্যমাত্রায়' },
      ],
    },
    truth: {
      eyebrow: 'সত্যের একটিই উৎস',
      statement: 'একটি স্ক্রিন, পুরো দল যাতে *সত্যিই ভরসা রাখে।*',
      lede: 'POS, জনবল, ইনভেন্টরি, ডেলিভারি, রিজার্ভেশন - Sundae প্রতিটি সিস্টেমকে একটিই সিদ্ধান্ত-পৃষ্ঠে একত্র করে। কার সংখ্যা সঠিক তা নিয়ে আর তর্ক নয়; দল স্প্রেডশিট মেলানোর বদলে পদক্ষেপ নেয়।',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'আপনার সিস্টেমগুলো, ছড়িয়ে-ছিটিয়ে',
      inputs: { pos: 'POS', labor: 'জনবল', inventory: 'ইনভেন্টরি', delivery: 'ডেলিভারি', reservations: 'রিজার্ভেশন' },
      decisionSurface: 'একটি সিদ্ধান্ত-পৃষ্ঠ',
      allOutlets: 'সব আউটলেট',
      live: 'সরাসরি',
      kpis: { revenue: 'রাজস্ব', labor: 'শ্রম', margin: 'মার্জিন' },
      oneTruth: 'একটি সত্য, পুরো দল',
      roles: { gm: 'GM', finance: 'অর্থ', headChef: 'হেড শেফ', owner: 'মালিক', regional: 'আঞ্চলিক' },
    },
  },
  th: {
    decisions: {
      eyebrow: 'การตัดสินใจ ไม่ใช่แดชบอร์ด',
      statement:
        'ทุกจาน ทุกลูกค้า ทุกกะ คือ*การตัดสินใจ* Sundae อยู่ในทุกครั้ง - เคียงข้างคุณ ที่หน้างาน',
      lede: 'งานเกิดขึ้นที่หน้างาน ไม่ใช่ในแดชบอร์ด Sundae เปลี่ยนกะที่กำลังดำเนินอยู่ให้เป็นก้าวต่อไปที่ถูกต้อง - เพื่อคนที่ต้องเป็นผู้ตัดสินใจ',
      trio: [
        { label: 'ฟลอร์', signal: 'เวลารอเพิ่มขึ้น' },
        { label: 'พาส', signal: 'จังหวะปรุงคลาด' },
        { label: 'ห้องอาหาร', signal: 'จำนวนแขกตามเป้า' },
      ],
    },
    truth: {
      eyebrow: 'แหล่งความจริงเดียว',
      statement: 'หน้าจอเดียวที่ทั้งทีม*ไว้ใจได้จริง*',
      lede: 'POS แรงงาน สต็อก เดลิเวอรี การจอง - Sundae รวมทุกระบบไว้บนพื้นผิวการตัดสินใจเดียว ไม่ต้องเถียงกันอีกว่าตัวเลขของใครถูก ทีมลงมือทำแทนที่จะมานั่งกระทบยอดสเปรดชีต',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'ระบบของคุณ กระจัดกระจาย',
      inputs: { pos: 'POS', labor: 'แรงงาน', inventory: 'สต็อก', delivery: 'เดลิเวอรี', reservations: 'การจอง' },
      decisionSurface: 'พื้นผิวการตัดสินใจเดียว',
      allOutlets: 'ทุกสาขา',
      live: 'เรียลไทม์',
      kpis: { revenue: 'รายได้', labor: 'แรงงาน', margin: 'มาร์จิน' },
      oneTruth: 'ความจริงเดียว ทั้งทีม',
      roles: { gm: 'GM', finance: 'การเงิน', headChef: 'หัวหน้าเชฟ', owner: 'เจ้าของ', regional: 'ระดับภูมิภาค' },
    },
  },
  ms: {
    decisions: {
      eyebrow: 'Keputusan, bukan papan pemuka',
      statement:
        'Setiap pinggan, setiap tetamu, setiap syif ialah satu *keputusan.* Sundae ada dalam semuanya - bersama anda, di lantai.',
      lede: 'Kerja berlaku di lantai, bukan di papan pemuka. Sundae mengubah syif yang sedang berjalan menjadi langkah betul seterusnya - untuk orang yang perlu membuatnya.',
      trio: [
        { label: 'Lantai', signal: 'Masa menunggu naik' },
        { label: 'Pas', signal: 'Masa masak tergelincir' },
        { label: 'Ruang Makan', signal: 'Tetamu ikut sasaran' },
      ],
    },
    truth: {
      eyebrow: 'Satu sumber kebenaran',
      statement: 'Satu skrin yang *benar-benar dipercayai* seluruh pasukan.',
      lede: 'POS, tenaga kerja, inventori, penghantaran, tempahan - Sundae menyatukan setiap sistem menjadi satu permukaan keputusan. Tiada lagi pertikaian tentang angka siapa yang betul; pasukan bertindak dan bukannya menyelaraskan hamparan.',
      trio: [{ label: '', signal: '' }, { label: '', signal: '' }, { label: '', signal: '' }],
    },
    unify: {
      scattered: 'Sistem anda, berselerak',
      inputs: { pos: 'POS', labor: 'Tenaga kerja', inventory: 'Inventori', delivery: 'Penghantaran', reservations: 'Tempahan' },
      decisionSurface: 'Satu permukaan keputusan',
      allOutlets: 'Semua cawangan',
      live: 'Langsung',
      kpis: { revenue: 'Hasil', labor: 'Tenaga kerja', margin: 'Margin' },
      oneTruth: 'Satu kebenaran, seluruh pasukan',
      roles: { gm: 'GM', finance: 'Kewangan', headChef: 'Ketua cef', owner: 'Pemilik', regional: 'Serantau' },
    },
  },
};
