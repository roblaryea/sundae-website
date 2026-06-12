/**
 * Copy for the signature "Watch the night turn" interaction - a scrubbable
 * service-night timeline that makes Sundae's whole thesis tangible: the signal
 * arrives at 7:15, while the shift is still yours to change, not in tomorrow's
 * report. It is the interactive proof of the manifesto + operator-voice copy.
 *
 * Same locale-keyed-with-en-fallback pattern as the other self-contained
 * homepage copy maps (outside the validated `messages` tree). Dash house-style:
 * spaced ASCII hyphen " - ", no em-dashes.
 */
export type ShiftMomentCopy = {
  eyebrow: string;
  heading: string;
  sub: string;
  frameLabel: string;
  withSundae: string;
  oldWay: string;
  paceLabel: string;
  coversLabel: string;
  laborLabel: string;
  forecastLabel: string;
  actualLabel: string;
  scrubHint: string;
  scrubAria: string;
  preSignal: string;
  signalTitle: string;
  signalBody: string;
  signalAction: string;
  oldTitle: string;
  oldBody: string;
  oldAction: string;
};

export const shiftMomentCopy: Record<'en' | 'ar' | 'fr' | 'es', ShiftMomentCopy> = {
  en: {
    eyebrow: 'Watch the night turn',
    heading: 'The signal, while the shift is still yours to change.',
    sub: 'Drag through a real service night. The old way, you read this tomorrow. With Sundae, you read it at 7:15 - in time to act.',
    frameLabel: 'Pulse - Live Shift',
    withSundae: 'With Sundae',
    oldWay: 'The old way',
    paceLabel: 'vs forecast pace',
    coversLabel: 'Covers / hr',
    laborLabel: 'Labor',
    forecastLabel: 'Forecast',
    actualLabel: 'Actual',
    scrubHint: 'Drag to scrub the night',
    scrubAria: 'Service-night timeline from 5 PM to close. Use the arrow keys to move through the evening.',
    preSignal: 'Service is on pace. Keep scrubbing toward 7:15.',
    signalTitle: 'Signal - 7:15 PM',
    signalBody: 'Section 3 is dragging. Covers are behind pace and labor is climbing past 30%. Move one server off prep now - you can still save the night.',
    signalAction: 'This is the moment to act.',
    oldTitle: 'Tomorrow, 11:00 AM',
    oldBody: 'Last night ran behind pace in Section 3 and labor closed high. You are reading this now. The shift is already over.',
    oldAction: 'Too late to change anything.',
  },
  ar: {
    eyebrow: 'شاهد الليلة وهي تتبدّل',
    heading: 'الإشارة، والوردية ما تزال قابلة للتغيير.',
    sub: 'مرّر عبر ليلة خدمة حقيقية. بالطريقة القديمة تقرأ هذا غدًا. مع Sundae تقرؤه عند السابعة وربع - في الوقت المناسب للتصرّف.',
    frameLabel: 'Pulse - وردية مباشرة',
    withSundae: 'مع Sundae',
    oldWay: 'الطريقة القديمة',
    paceLabel: 'مقارنةً بالوتيرة المتوقعة',
    coversLabel: 'ضيوف / ساعة',
    laborLabel: 'العمالة',
    forecastLabel: 'المتوقع',
    actualLabel: 'الفعلي',
    scrubHint: 'اسحب لتتنقّل عبر الليلة',
    scrubAria: 'مخطّط زمني لليلة الخدمة من السابعة مساءً حتى الإغلاق. استخدم مفاتيح الأسهم للتنقّل عبر المساء.',
    preSignal: 'الخدمة على الوتيرة. واصل التمرير نحو السابعة وربع.',
    signalTitle: 'إشارة - 7:15 مساءً',
    signalBody: 'القسم 3 يتباطأ. الضيوف دون الوتيرة والعمالة تتجاوز 30%. انقل نادلًا من التحضير الآن - لا يزال بإمكانك إنقاذ الليلة.',
    signalAction: 'هذه هي لحظة التصرّف.',
    oldTitle: 'غدًا، 11:00 صباحًا',
    oldBody: 'الليلة الماضية جرت دون الوتيرة في القسم 3 وأغلقت العمالة مرتفعة. أنت تقرأ هذا الآن. والوردية قد انتهت بالفعل.',
    oldAction: 'فات الأوان على تغيير أي شيء.',
  },
  fr: {
    eyebrow: 'Regardez la soirée basculer',
    heading: 'Le signal, tant que le service peut encore être sauvé.',
    sub: "Parcourez une vraie soirée de service. À l'ancienne, vous lisez ça demain. Avec Sundae, vous le lisez à 19 h 15 - à temps pour agir.",
    frameLabel: 'Pulse - Service en direct',
    withSundae: 'Avec Sundae',
    oldWay: "À l'ancienne",
    paceLabel: 'vs cadence prévue',
    coversLabel: 'Couverts / h',
    laborLabel: "Main-d'œuvre",
    forecastLabel: 'Prévu',
    actualLabel: 'Réel',
    scrubHint: 'Glissez pour parcourir la soirée',
    scrubAria: "Frise de la soirée de service, de 19 h à la fermeture. Utilisez les flèches pour parcourir la soirée.",
    preSignal: 'Le service tient la cadence. Continuez jusqu’à 19 h 15.',
    signalTitle: 'Signal - 19 h 15',
    signalBody: "La salle 3 décroche. Les couverts sont en retard et la main-d'œuvre dépasse 30%. Sortez un serveur du prep maintenant - vous pouvez encore sauver la soirée.",
    signalAction: "C'est le moment d'agir.",
    oldTitle: 'Demain, 11 h 00',
    oldBody: "Hier soir, la salle 3 a décroché et la main-d'œuvre a fini haut. Vous le lisez maintenant. Le service est déjà terminé.",
    oldAction: 'Trop tard pour changer quoi que ce soit.',
  },
  es: {
    eyebrow: 'Mira cómo cambia la noche',
    heading: 'La señal, cuando todavía puedes cambiar el turno.',
    sub: 'Recorre una noche de servicio real. A la antigua, lees esto mañana. Con Sundae, lo lees a las 7:15 - a tiempo para actuar.',
    frameLabel: 'Pulse - Turno en vivo',
    withSundae: 'Con Sundae',
    oldWay: 'A la antigua',
    paceLabel: 'vs ritmo previsto',
    coversLabel: 'Comensales / h',
    laborLabel: 'Personal',
    forecastLabel: 'Previsto',
    actualLabel: 'Real',
    scrubHint: 'Arrastra para recorrer la noche',
    scrubAria: 'Línea de tiempo de la noche de servicio, de 7 p. m. al cierre. Usa las flechas para avanzar por la noche.',
    preSignal: 'El servicio va a ritmo. Sigue avanzando hacia las 7:15.',
    signalTitle: 'Señal - 7:15 p. m.',
    signalBody: 'La sala 3 se está quedando atrás. Los comensales van por debajo del ritmo y el personal supera el 30%. Saca a un camarero del prep ahora - todavía puedes salvar la noche.',
    signalAction: 'Este es el momento de actuar.',
    oldTitle: 'Mañana, 11:00 a. m.',
    oldBody: 'Anoche la sala 3 fue por debajo del ritmo y el personal cerró alto. Lo estás leyendo ahora. El turno ya terminó.',
    oldAction: 'Demasiado tarde para cambiar nada.',
  },
};
