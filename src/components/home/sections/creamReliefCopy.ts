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
  /**
   * 'decisions' beat only - the quiet proof line + CTA above the frames, and the
   * labels for the in-card "Sundae would flag" receipt revealed on hover/tap.
   * Optional so the 'truth' variant (no frames) can omit them.
   */
  proof?: string;
  ctaLabel?: string;
  /** Receipt header - the only coral text in the reveal. */
  flagLabel?: string;
  causeLabel?: string;
  moveLabel?: string;
  /** Resting affordance hinting the card is interactive. */
  viewSignal?: string;
};

/**
 * A frame = a place (label) + the live signal Sundae reads there, plus the
 * compact receipt it would surface: the cause and the next move (both used by
 * the 'decisions' beat only; optional for the empty 'truth' frames).
 */
export type TrioFrame = { label: string; signal: string; cause?: string; move?: string };

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
        { label: 'Floor', signal: 'Wait time rising', cause: 'Section 3 is 18 minutes behind pace.', move: 'Shift one server from prep to floor.' },
        { label: 'Pass', signal: 'Fire time slipping', cause: 'Ribeye and salmon tickets are backing up.', move: 'Hold ribeye pushes, move one cook to expo.' },
        { label: 'Room', signal: 'Covers on pace', cause: 'Pace is healthy, but average check is soft.', move: 'Prompt wine pairing on the next 12 two-tops.' },
      ],
      proof: 'A signal, a cause, and a next move - while the shift is still live.',
      ctaLabel: 'See Pulse live',
      flagLabel: 'Sundae would flag',
      causeLabel: 'Cause',
      moveLabel: 'Move',
      viewSignal: 'View signal',
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
        { label: 'الصالة', signal: 'وقت الانتظار يرتفع', cause: 'القسم 3 متأخّر 18 دقيقة عن الإيقاع.', move: 'انقل نادلاً من التحضير إلى الصالة.' },
        { label: 'الباس', signal: 'توقيت التحضير يتأخر', cause: 'طلبات الريب آي والسلمون تتراكم.', move: 'أوقف دفعات الريب آي وانقل طاهياً إلى نقطة التسليم.' },
        { label: 'القاعة', signal: 'عدد الضيوف على المسار', cause: 'الإيقاع جيد لكن متوسط الفاتورة منخفض.', move: 'اقترح إقران النبيذ على الطاولات الثنائية الـ12 التالية.' },
      ],
      proof: 'إشارة، وسبب، والخطوة التالية - والوردية ما زالت جارية.',
      ctaLabel: 'شاهد Pulse مباشرة',
      flagLabel: 'Sundae سيُنبّه',
      causeLabel: 'السبب',
      moveLabel: 'الإجراء',
      viewSignal: 'عرض الإشارة',
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
        { label: 'Service', signal: 'Attente en hausse', cause: 'La section 3 a 18 minutes de retard sur le rythme.', move: 'Faites passer un serveur de la prépa à la salle.' },
        { label: 'Passe', signal: 'Timing qui glisse', cause: "Les tickets entrecôte et saumon s'accumulent.", move: 'Suspendez les entrecôtes et envoyez un cuisinier à la passe.' },
        { label: 'Salle', signal: 'Couverts dans les temps', cause: 'Le rythme est bon, mais le ticket moyen est faible.', move: 'Proposez un accord mets-vins aux 12 prochaines tables de deux.' },
      ],
      proof: 'Un signal, une cause, et la prochaine action - pendant que le service tourne encore.',
      ctaLabel: 'Voir Pulse en direct',
      flagLabel: 'Sundae signalerait',
      causeLabel: 'Cause',
      moveLabel: 'Action',
      viewSignal: 'Voir le signal',
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
        { label: 'Sala', signal: 'Espera al alza', cause: 'La sección 3 va 18 minutos por detrás del ritmo.', move: 'Pasa a un camarero de preparación a la sala.' },
        { label: 'Pase', signal: 'Tiempos retrasados', cause: 'Las comandas de ribeye y salmón se acumulan.', move: 'Frena los ribeye y manda un cocinero al pase.' },
        { label: 'Comedor', signal: 'Comensales en ritmo', cause: 'El ritmo es bueno, pero el ticket medio es bajo.', move: 'Sugiere maridaje de vino en las próximas 12 mesas de dos.' },
      ],
      proof: 'Una señal, una causa y el siguiente paso - con el turno aún en marcha.',
      ctaLabel: 'Ver Pulse en vivo',
      flagLabel: 'Sundae avisaría',
      causeLabel: 'Causa',
      moveLabel: 'Acción',
      viewSignal: 'Ver señal',
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
        { label: 'Fläche', signal: 'Wartezeit steigt', cause: 'Bereich 3 liegt 18 Minuten hinter dem Takt.', move: 'Setzen Sie eine Servicekraft von der Vorbereitung in den Gastraum.' },
        { label: 'Anrichte', signal: 'Anrichtzeit kippt', cause: 'Ribeye- und Lachs-Bons stauen sich.', move: 'Ribeye stoppen, einen Koch an die Anrichte holen.' },
        { label: 'Gastraum', signal: 'Gedecke im Plan', cause: 'Das Tempo passt, aber der Durchschnittsbon ist schwach.', move: 'Weinbegleitung an den nächsten 12 Zweiertischen anbieten.' },
      ],
      proof: 'Ein Signal, eine Ursache und der nächste Schritt - während die Schicht noch läuft.',
      ctaLabel: 'Pulse live ansehen',
      flagLabel: 'Sundae würde warnen',
      causeLabel: 'Ursache',
      moveLabel: 'Maßnahme',
      viewSignal: 'Signal ansehen',
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
        { label: 'Vloer', signal: 'Wachttijd loopt op', cause: 'Sectie 3 loopt 18 minuten achter op schema.', move: 'Zet één medewerker van de mise-en-place naar de vloer.' },
        { label: 'Doorgeef', signal: 'Baktiming loopt uit', cause: 'Ribeye- en zalmbonnen stapelen zich op.', move: 'Houd ribeye even vast, zet een kok bij de doorgeef.' },
        { label: 'Zaal', signal: 'Couverts op schema', cause: 'Het tempo is goed, maar de gemiddelde besteding is laag.', move: 'Bied wijnarrangement aan bij de volgende 12 tweepersoonstafels.' },
      ],
      proof: 'Een signaal, een oorzaak en de volgende stap - terwijl de dienst nog loopt.',
      ctaLabel: 'Bekijk Pulse live',
      flagLabel: 'Sundae zou waarschuwen',
      causeLabel: 'Oorzaak',
      moveLabel: 'Actie',
      viewSignal: 'Signaal bekijken',
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
        { label: 'Salão', signal: 'Espera a subir', cause: 'A seção 3 está 18 minutos atrás do ritmo.', move: 'Passe um garçom da pré-produção para o salão.' },
        { label: 'Passe', signal: 'Tempos a atrasar', cause: 'As comandas de ribeye e salmão estão se acumulando.', move: 'Segure os ribeyes e leve um cozinheiro para o passe.' },
        { label: 'Sala', signal: 'Couverts no ritmo', cause: 'O ritmo está bom, mas o ticket médio está baixo.', move: 'Sugira harmonização de vinhos nas próximas 12 mesas de dois.' },
      ],
      proof: 'Um sinal, uma causa e o próximo passo - com o turno ainda em andamento.',
      ctaLabel: 'Ver o Pulse ao vivo',
      flagLabel: 'O Sundae sinalizaria',
      causeLabel: 'Causa',
      moveLabel: 'Ação',
      viewSignal: 'Ver sinal',
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
        { label: 'फ्लोर', signal: 'वेट टाइम बढ़ रहा', cause: 'सेक्शन 3 तय रफ्तार से 18 मिनट पीछे है।', move: 'एक सर्वर को प्रेप से फ्लोर पर भेजें।' },
        { label: 'पास', signal: 'फायर टाइम फिसल रहा', cause: 'रिबआय और सैल्मन के ऑर्डर जमा हो रहे हैं।', move: 'रिबआय रोकें, एक कुक को एक्सपो पर लगाएं।' },
        { label: 'डाइनिंग रूम', signal: 'मेहमान लक्ष्य पर', cause: 'रफ्तार ठीक है, पर औसत बिल कम है।', move: 'अगली 12 दो-सीटर टेबलों पर वाइन पेयरिंग सुझाएं।' },
      ],
      proof: 'एक सिग्नल, एक वजह, और अगला कदम - जब शिफ्ट अब भी चल रही हो।',
      ctaLabel: 'Pulse लाइव देखें',
      flagLabel: 'Sundae बताएगा',
      causeLabel: 'वजह',
      moveLabel: 'कदम',
      viewSignal: 'सिग्नल देखें',
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
        { label: 'فلور', signal: 'ویٹ ٹائم بڑھ رہا ہے', cause: 'سیکشن 3 مقررہ رفتار سے 18 منٹ پیچھے ہے۔', move: 'ایک سرور کو پریپ سے فلور پر بھیجیں۔' },
        { label: 'پاس', signal: 'فائر ٹائم پھسل رہا ہے', cause: 'رِب آئی اور سالمن کے آرڈر جمع ہو رہے ہیں۔', move: 'رِب آئی روکیں، ایک کُک کو ایکسپو پر لگائیں۔' },
        { label: 'ڈائننگ روم', signal: 'مہمانوں کی تعداد ہدف پر', cause: 'رفتار ٹھیک ہے، مگر اوسط بل کم ہے۔', move: 'اگلی 12 دو نشست میزوں پر وائن پیئرنگ تجویز کریں۔' },
      ],
      proof: 'ایک سگنل، ایک وجہ، اور اگلا قدم - جب شفٹ ابھی جاری ہو۔',
      ctaLabel: 'Pulse لائیو دیکھیں',
      flagLabel: 'Sundae نشاندہی کرے گا',
      causeLabel: 'وجہ',
      moveLabel: 'اقدام',
      viewSignal: 'سگنل دیکھیں',
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
        { label: 'Servizio', signal: 'Attesa in aumento', cause: 'La sezione 3 è in ritardo di 18 minuti sul ritmo.', move: 'Sposta un cameriere dalla preparazione alla sala.' },
        { label: 'Passe', signal: 'Tempi in ritardo', cause: 'Le comande di ribeye e salmone si accumulano.', move: 'Ferma i ribeye e sposta un cuoco al passe.' },
        { label: 'Sala', signal: 'Coperti in linea', cause: 'Il ritmo è buono, ma lo scontrino medio è basso.', move: "Proponi l'abbinamento vino ai prossimi 12 tavoli da due." },
      ],
      proof: 'Un segnale, una causa e la prossima mossa - mentre il servizio è ancora in corso.',
      ctaLabel: 'Vedi Pulse in diretta',
      flagLabel: 'Sundae segnalerebbe',
      causeLabel: 'Causa',
      moveLabel: 'Mossa',
      viewSignal: 'Vedi il segnale',
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
        { label: 'Obsługa', signal: 'Czas oczekiwania rośnie', cause: 'Sekcja 3 jest 18 minut za tempem.', move: 'Przesuń jednego kelnera z przygotowalni na salę.' },
        { label: 'Wydawka', signal: 'Timing się sypie', cause: 'Zamówienia na ribeye i łososia się piętrzą.', move: 'Wstrzymaj ribeye, przesuń kucharza na wydawkę.' },
        { label: 'Sala', signal: 'Goście zgodnie z planem', cause: 'Tempo jest dobre, ale średni rachunek jest niski.', move: 'Zaproponuj parowanie wina przy kolejnych 12 stolikach dla dwojga.' },
      ],
      proof: 'Sygnał, przyczyna i następny ruch - gdy zmiana wciąż trwa.',
      ctaLabel: 'Zobacz Pulse na żywo',
      flagLabel: 'Sundae zwróciłby uwagę',
      causeLabel: 'Przyczyna',
      moveLabel: 'Ruch',
      viewSignal: 'Zobacz sygnał',
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
        { label: 'Salon', signal: 'Bekleme süresi artıyor', cause: 'Bölge 3 tempodan 18 dakika geride.', move: 'Bir garsonu hazırlıktan salona alın.' },
        { label: 'Servis Ağzı', signal: 'Pişirme zamanı kayıyor', cause: 'Antrikot ve somon adisyonları birikiyor.', move: 'Antrikotu bekletin, bir aşçıyı servis ağzına alın.' },
        { label: 'Masalar', signal: 'Misafir sayısı hedefte', cause: 'Tempo iyi ama ortalama adisyon düşük.', move: 'Sonraki 12 iki kişilik masaya şarap eşleştirmesi önerin.' },
      ],
      proof: 'Bir sinyal, bir neden ve sıradaki hamle - vardiya hâlâ sürerken.',
      ctaLabel: "Pulse'u canlı izleyin",
      flagLabel: 'Sundae işaret ederdi',
      causeLabel: 'Neden',
      moveLabel: 'Hamle',
      viewSignal: 'Sinyali gör',
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
        { label: '前厅', signal: '等位时间上升', cause: '3 区比正常节奏慢了 18 分钟。', move: '把一名服务员从备餐区调到前厅。' },
        { label: '出品口', signal: '出餐节奏延后', cause: '肋眼牛排和三文鱼的订单正在积压。', move: '暂停肋眼出餐，调一名厨师到出品口。' },
        { label: '餐厅', signal: '客流达标', cause: '节奏正常，但客单价偏低。', move: '为接下来 12 张双人桌推荐配酒。' },
      ],
      proof: '一个信号、一个原因、下一步动作--在班次仍在进行时。',
      ctaLabel: '实时查看 Pulse',
      flagLabel: 'Sundae 会提示',
      causeLabel: '原因',
      moveLabel: '动作',
      viewSignal: '查看信号',
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
        { label: 'フロア', signal: '待ち時間が増加', cause: 'セクション3はペースより18分遅れ。', move: 'スタッフを1名、仕込みからフロアへ。' },
        { label: 'パス', signal: '提供タイミング遅延', cause: 'リブアイとサーモンの注文が滞留中。', move: 'リブアイを一旦止め、調理1名をパスへ。' },
        { label: '客席', signal: '客数は順調', cause: 'ペースは順調だが客単価が低め。', move: '次の2名席12卓にワインペアリングを提案。' },
      ],
      proof: 'シグナル、原因、次の一手--シフトがまだ動いているうちに。',
      ctaLabel: 'Pulse をライブで見る',
      flagLabel: 'Sundae なら指摘',
      causeLabel: '原因',
      moveLabel: '次の一手',
      viewSignal: 'シグナルを見る',
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
        { label: '홀', signal: '대기 시간 증가', cause: '3번 구역이 페이스보다 18분 늦습니다.', move: '직원 한 명을 준비에서 홀로 이동하세요.' },
        { label: '패스', signal: '조리 타이밍 지연', cause: '립아이와 연어 주문이 밀리고 있습니다.', move: '립아이를 잠시 멈추고 조리사 한 명을 패스로 보내세요.' },
        { label: '다이닝룸', signal: '고객 수 순항 중', cause: '페이스는 좋지만 객단가가 낮습니다.', move: '다음 2인석 12개에 와인 페어링을 제안하세요.' },
      ],
      proof: '신호, 원인, 다음 한 수 - 근무가 아직 진행 중일 때.',
      ctaLabel: 'Pulse 실시간 보기',
      flagLabel: 'Sundae가 짚어줍니다',
      causeLabel: '원인',
      moveLabel: '조치',
      viewSignal: '신호 보기',
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
        { label: 'Area Layan', signal: 'Waktu tunggu naik', cause: 'Seksi 3 tertinggal 18 menit dari ritme.', move: 'Pindahkan satu pramusaji dari prep ke area layan.' },
        { label: 'Meja Saji', signal: 'Waktu masak meleset', cause: 'Pesanan ribeye dan salmon menumpuk.', move: 'Tahan ribeye, pindahkan satu juru masak ke meja saji.' },
        { label: 'Ruang Makan', signal: 'Tamu sesuai target', cause: 'Ritme sehat, tapi rata-rata bon rendah.', move: 'Tawarkan wine pairing ke 12 meja berdua berikutnya.' },
      ],
      proof: 'Sebuah sinyal, sebuah penyebab, dan langkah berikutnya - saat shift masih berjalan.',
      ctaLabel: 'Lihat Pulse langsung',
      flagLabel: 'Sundae akan menandai',
      causeLabel: 'Penyebab',
      moveLabel: 'Tindakan',
      viewSignal: 'Lihat sinyal',
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
        { label: 'Khu phục vụ', signal: 'Thời gian chờ tăng', cause: 'Khu 3 đang chậm 18 phút so với nhịp.', move: 'Chuyển một nhân viên từ khâu sơ chế ra khu phục vụ.' },
        { label: 'Bếp ra món', signal: 'Giờ ra món trễ', cause: 'Phiếu ribeye và cá hồi đang dồn ứ.', move: 'Tạm dừng ribeye, đưa một đầu bếp ra khu trả món.' },
        { label: 'Phòng ăn', signal: 'Lượt khách đúng nhịp', cause: 'Nhịp ổn, nhưng hóa đơn trung bình thấp.', move: 'Gợi ý kết hợp rượu vang cho 12 bàn đôi kế tiếp.' },
      ],
      proof: 'Một tín hiệu, một nguyên nhân và bước tiếp theo - khi ca làm vẫn đang diễn ra.',
      ctaLabel: 'Xem Pulse trực tiếp',
      flagLabel: 'Sundae sẽ cảnh báo',
      causeLabel: 'Nguyên nhân',
      moveLabel: 'Hành động',
      viewSignal: 'Xem tín hiệu',
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
        { label: 'Servire', signal: 'Așteptare în creștere', cause: 'Secțiunea 3 e cu 18 minute în urma ritmului.', move: 'Mută un ospătar de la preparare în sală.' },
        { label: 'Pas', signal: 'Timpii întârzie', cause: 'Comenzile de ribeye și somon se aglomerează.', move: 'Oprește ribeye și trimite un bucătar la pas.' },
        { label: 'Sală', signal: 'Acoperiri în ritm', cause: 'Ritmul e bun, dar nota medie e mică.', move: 'Propune asociere cu vin la următoarele 12 mese de doi.' },
      ],
      proof: 'Un semnal, o cauză și următoarea mișcare - cât tura este încă în desfășurare.',
      ctaLabel: 'Vezi Pulse live',
      flagLabel: 'Sundae ar semnala',
      causeLabel: 'Cauză',
      moveLabel: 'Acțiune',
      viewSignal: 'Vezi semnalul',
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
        { label: 'Golvet', signal: 'Väntetid ökar', cause: 'Sektion 3 ligger 18 minuter efter takten.', move: 'Flytta en servitör från förberedelse till golvet.' },
        { label: 'Passet', signal: 'Tajmingen glider', cause: 'Ribeye- och laxnotor börjar hopa sig.', move: 'Pausa ribeye, flytta en kock till passet.' },
        { label: 'Matsalen', signal: 'Kuvert i takt', cause: 'Takten är god, men snittnotan är svag.', move: 'Föreslå vinpaket vid de nästa 12 tvåmansborden.' },
      ],
      proof: 'En signal, en orsak och nästa drag - medan passet fortfarande pågår.',
      ctaLabel: 'Se Pulse live',
      flagLabel: 'Sundae skulle flagga',
      causeLabel: 'Orsak',
      moveLabel: 'Åtgärd',
      viewSignal: 'Se signalen',
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
        { label: 'ফ্লোর', signal: 'অপেক্ষার সময় বাড়ছে', cause: 'সেকশন ৩ নির্ধারিত গতির চেয়ে ১৮ মিনিট পিছিয়ে।', move: 'একজন সার্ভারকে প্রেপ থেকে ফ্লোরে পাঠান।' },
        { label: 'পাস', signal: 'ফায়ার টাইম পিছিয়ে', cause: 'রিবআই ও স্যামনের অর্ডার জমছে।', move: 'রিবআই থামান, একজন কুককে এক্সপোতে দিন।' },
        { label: 'ডাইনিং রুম', signal: 'অতিথি লক্ষ্যমাত্রায়', cause: 'গতি ঠিক আছে, তবে গড় বিল কম।', move: 'পরের ১২টি দুই-আসনের টেবিলে ওয়াইন পেয়ারিং প্রস্তাব করুন।' },
      ],
      proof: 'একটি সংকেত, একটি কারণ, আর পরের পদক্ষেপ - শিফট চলাকালীনই।',
      ctaLabel: 'Pulse লাইভ দেখুন',
      flagLabel: 'Sundae চিহ্নিত করত',
      causeLabel: 'কারণ',
      moveLabel: 'পদক্ষেপ',
      viewSignal: 'সংকেত দেখুন',
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
        { label: 'ฟลอร์', signal: 'เวลารอเพิ่มขึ้น', cause: 'โซน 3 ช้ากว่าจังหวะ 18 นาที', move: 'ย้ายพนักงานเสิร์ฟหนึ่งคนจากครัวเตรียมมาที่ฟลอร์' },
        { label: 'พาส', signal: 'จังหวะปรุงคลาด', cause: 'ออร์เดอร์ริบอายและแซลมอนกำลังกองค้าง', move: 'ชะลอริบอาย แล้วย้ายกุ๊กหนึ่งคนไปที่พาส' },
        { label: 'ห้องอาหาร', signal: 'จำนวนแขกตามเป้า', cause: 'จังหวะดี แต่ยอดต่อบิลเฉลี่ยต่ำ', move: 'เสนอไวน์แพริงกับโต๊ะสองที่นั่ง 12 โต๊ะถัดไป' },
      ],
      proof: 'สัญญาณ สาเหตุ และก้าวต่อไป - ในขณะที่กะยังดำเนินอยู่',
      ctaLabel: 'ดู Pulse แบบเรียลไทม์',
      flagLabel: 'Sundae จะแจ้งเตือน',
      causeLabel: 'สาเหตุ',
      moveLabel: 'การลงมือ',
      viewSignal: 'ดูสัญญาณ',
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
        { label: 'Lantai', signal: 'Masa menunggu naik', cause: 'Seksyen 3 ketinggalan 18 minit daripada rentak.', move: 'Pindahkan seorang pelayan dari penyediaan ke lantai.' },
        { label: 'Pas', signal: 'Masa masak tergelincir', cause: 'Pesanan ribeye dan salmon semakin bertimbun.', move: 'Tahan ribeye, pindahkan seorang tukang masak ke pas.' },
        { label: 'Ruang Makan', signal: 'Tetamu ikut sasaran', cause: 'Rentak sihat, tetapi purata bil rendah.', move: 'Cadangkan padanan wain di 12 meja berdua seterusnya.' },
      ],
      proof: 'Satu isyarat, satu punca, dan langkah seterusnya - semasa syif masih berjalan.',
      ctaLabel: 'Lihat Pulse secara langsung',
      flagLabel: 'Sundae akan menandakan',
      causeLabel: 'Punca',
      moveLabel: 'Tindakan',
      viewSignal: 'Lihat isyarat',
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
