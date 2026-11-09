import type { Metadata } from 'next'
import type { WebsiteLocale } from '@/lib/i18n'
import { buildResolvedPageMetadata } from '@/lib/solutionPageMetadata'

type Copy = { title: string; description: string }

const metadata: Record<string, Partial<Record<WebsiteLocale, Copy>> & { en: Copy }> = {
  '/restaurant-management-platform': {
    en: {
      title: 'Restaurant Management Platform for Multi-Location Operators | Sundae',
      description: 'Restaurant management software for multi-location groups, connected to a broader hospitality and food-service operating platform with decision intelligence.',
    },
    ar: { title: 'منصة إدارة المطاعم للمشغلين متعددي المواقع | Sundae', description: 'برنامج إدارة مطاعم للمجموعات متعددة المواقع، متصل بمنصة تشغيل أوسع للضيافة وخدمات الطعام مع ذكاء القرار.' },
    fr: { title: 'Plateforme de gestion de restaurants multi-sites | Sundae', description: 'Un logiciel de gestion pour groupes multi-sites, relié à une plateforme d’exploitation plus large pour l’hôtellerie et la restauration.' },
    es: { title: 'Plataforma de gestión de restaurantes multiubicación | Sundae', description: 'Software de gestión para grupos con varias ubicaciones, conectado a una plataforma operativa más amplia para hospitality y food-service.' },
  },
  '/restaurant-task-management': {
    en: { title: 'Restaurant Task Management Software | Sundae', description: 'Assign, approve and measure restaurant tasks and checklists across every shift and location with Sundae Crew.' },
    ar: { title: 'برنامج إدارة مهام المطاعم | Sundae', description: 'وزّع مهام المطعم وقوائم التحقق ووافق عليها وقِس تنفيذها عبر كل وردية وموقع مع Sundae Crew.' },
    fr: { title: 'Logiciel de gestion des tâches en restauration | Sundae', description: 'Attribuez, validez et mesurez les tâches et checklists de chaque service et établissement avec Sundae Crew.' },
    es: { title: 'Software de gestión de tareas para restaurantes | Sundae', description: 'Asigna, aprueba y mide tareas y checklists de cada turno y local con Sundae Crew.' },
  },
  '/restaurant-logbook': {
    en: { title: 'Digital Restaurant Logbook and Shift Handover | Sundae', description: 'Keep restaurant shift notes, handovers, issues and follow-up in one searchable operating record with Sundae Crew.' },
    ar: { title: 'سجل المطعم الرقمي وتسليم الورديات | Sundae', description: 'احتفظ بملاحظات الورديات وتسليمها والمشكلات والمتابعة في سجل تشغيل واحد قابل للبحث مع Sundae Crew.' },
    fr: { title: 'Journal numérique de restaurant et passation de service | Sundae', description: 'Centralisez notes de service, passations, problèmes et suivis dans un registre opérationnel consultable avec Sundae Crew.' },
    es: { title: 'Libro de registro digital y relevo de turnos | Sundae', description: 'Centraliza notas, relevos, incidencias y seguimiento en un registro operativo consultable con Sundae Crew.' },
  },
  '/restaurant-tip-management': {
    en: { title: 'Restaurant Tip Management Software | Sundae Crew', description: 'Manage restaurant tip workflows with configurable rules, reviewable calculations and payroll-ready evidence through Sundae Crew.' },
    ar: { title: 'برنامج إدارة إكراميات المطاعم | Sundae Crew', description: 'أدر سير عمل الإكراميات بقواعد قابلة للتهيئة وحسابات قابلة للمراجعة وأدلة جاهزة للرواتب عبر Sundae Crew.' },
    fr: { title: 'Logiciel de gestion des pourboires en restauration | Sundae Crew', description: 'Gérez les workflows de pourboires avec règles configurables, calculs vérifiables et justificatifs prêts pour la paie.' },
    es: { title: 'Software de gestión de propinas para restaurantes | Sundae Crew', description: 'Gestiona flujos de propinas con reglas configurables, cálculos revisables y evidencias listas para nómina.' },
  },
  '/restaurant365-alternative': {
    en: { title: 'Restaurant365 Alternative for Multi-Location Operators | Sundae', description: 'A neutral guide to evaluating Restaurant365 alternatives across restaurant workflows, workforce operations, regional fit, integrations and decision intelligence.' },
    ar: { title: 'بديل Restaurant365 للمشغلين متعددي المواقع | Sundae', description: 'دليل محايد لتقييم بدائل Restaurant365 عبر سير عمل المطاعم والقوى العاملة والملاءمة الإقليمية والتكاملات وذكاء القرار.' },
    fr: { title: 'Alternative à Restaurant365 pour groupes multi-sites | Sundae', description: 'Un guide neutre pour évaluer les alternatives à Restaurant365 selon les workflows, la workforce, les régions, les intégrations et le decision intelligence.' },
    es: { title: 'Alternativa a Restaurant365 para operadores multiubicación | Sundae', description: 'Guía neutral para evaluar alternativas a Restaurant365 en workflows, workforce, adaptación regional, integraciones e inteligencia de decisión.' },
  },
}

export function buildOperatorWorkflowMetadata(locale: WebsiteLocale, pathname: string): Metadata {
  const routeCopy = metadata[pathname]
  const copy = routeCopy?.[locale] ?? routeCopy?.en
  if (!copy) return {}
  return buildResolvedPageMetadata({ locale, pathname, ...copy })
}
