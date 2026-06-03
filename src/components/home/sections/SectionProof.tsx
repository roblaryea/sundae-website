"use client";

import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import { EditorialImage } from "@/components/ui/EditorialImage";
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/components_home_sections_SectionProof'

type LocalizedProof = {
  eyebrow: string;
  headline: string;
  description: string;
  stats: { value: string; label: string; footnoteMarker?: string }[];
  industryEyebrow: string;
  industryHeadline: string;
  industryDisclaimer: string;
  industryTodayLabel: string;
  withSundaeLabel: string;
  industryClaims: { industry: string; sundae: string }[];
  footnote: string;
};

const claimIds = ["reporting-lag", "leakage", "margin-variance"];

const localizedCopy: Record<"en" | "ar" | "fr" | "es", LocalizedProof> = {
  en: {
    eyebrow: "BUILT WITH OPERATORS",
    headline: "Shaped by restaurant operators across every format.",
    description: "QSR, casual dining, fine dining, cloud kitchens, and hospitality groups inform the intelligence layer restaurants actually need — from single-shop operators to multi-brand portfolios.",
    stats: [
      { value: "12", label: "data domains unified" },
      { value: "500+", label: "restaurant-specific data models" },
      { value: "12", label: "analytics modules", footnoteMarker: "†" },
      { value: "5-min", label: "shift refresh on Core Pro", footnoteMarker: "*" },
    ],
    industryEyebrow: "WHAT WE HEAR FROM OPERATORS",
    industryHeadline: "The data exists. The decision still arrives late.",
    industryDisclaimer: "Patterns we hear from operators and see across restaurant reporting workflows. Anonymized and generalized.",
    industryTodayLabel: "Industry today",
    withSundaeLabel: "With Sundae",
    industryClaims: [
      { industry: "Teams wait 2–3 days for reports, exports, or analyst follow-ups. By the time the answer arrives, the shift has already happened.", sundae: "Sundae Intelligence gives teams source-cited answers in seconds, across the systems they already use." },
      { industry: "Voids, comps, discounts, and POS exceptions are small on their own. Left unreviewed, they can create between 1–3% of revenue and margin leakage.", sundae: "Pulse flags exception patterns during the shift, attributed to the server, daypart, location, or behavior driving them." },
      { industry: "Margin variance is often explained at month-end, after the costs are already booked.", sundae: "Insights connects revenue, labor, food cost, discounts, and pricing so teams can see the cause while it is still actionable." },
    ],
    footnote: "*Refresh frequency varies by Core tier. See pricing for details. †12 analytics modules across the platform; 12 specialized modules included in the current pricing bundle. ‡Industry observations are general restaurant-industry patterns drawn from public research and advisory feedback. Named pilot results and validated customer outcomes will replace this section as they become available.",
  },
  ar: {
    eyebrow: "مبني مع المشغلين",
    headline: "صاغته مجموعات مطاعم عبر كل صيغة.",
    description: "QSR والمطاعم العائلية والمطاعم الراقية والمطابخ السحابية ومجموعات الضيافة تُلهم طبقة الذكاء التي يحتاجها المطاعم — من مشغل واحد إلى محافظ متعددة العلامات.",
    stats: [
      { value: "12", label: "مجال بيانات موحد" },
      { value: "+500", label: "نموذج بيانات مطعم" },
      { value: "+30", label: "وحدة تحليلية", footnoteMarker: "†" },
      { value: "5 د", label: "تحديث وردية على Core Pro", footnoteMarker: "*" },
    ],
    industryEyebrow: "ما نسمعه من المشغلين",
    industryHeadline: "البيانات موجودة. القرار ما زال يصل متأخراً.",
    industryDisclaimer: "أنماط نسمعها من المشغلين ونراها عبر سير عمل تقارير المطاعم. مجهولة ومعممة.",
    industryTodayLabel: "الصناعة اليوم",
    withSundaeLabel: "مع Sundae",
    industryClaims: [
      { industry: "تنتظر الفِرَق 2–3 أيام لتقارير أو تصديرات أو متابعات محللين. حين تصل الإجابة، تكون الوردية قد انتهت.", sundae: "Sundae Intelligence يعطي الفِرَق إجابات بمصادر في ثوانٍ، عبر الأنظمة التي يستخدمونها." },
      { industry: "التجاوزات والتعويضات والخصومات وحالات POS الشاذة صغيرة بذاتها. تركها بلا مراجعة قد ينتج عنه تسرب 1–3% من الإيرادات والهامش.", sundae: "Pulse يكشف أنماط الحالات الشاذة خلال الوردية، منسوبة إلى الموظف أو الفترة أو الموقع." },
      { industry: "غالباً ما يُفسر تباين الهامش في نهاية الشهر، بعد تسجيل التكاليف.", sundae: "Insights يربط الإيرادات والعمالة وتكلفة الطعام والخصومات والتسعير ليرى الفريق السبب وهو ما زال قابلاً للتنفيذ." },
    ],
    footnote: "*يختلف معدل التحديث بحسب طبقة Core. راجع التسعير. † أكثر من 30 وحدة تحليلية عبر المنصة؛ 12 وحدة متخصصة في الحزمة الحالية. ‡ ملاحظات الصناعة أنماط عامة لصناعة المطاعم من بحث عام وملاحظات استشارية. نتائج تجريبية مسماة ستحل محل هذا القسم عند توفرها.",
  },
  fr: {
    eyebrow: "CONSTRUIT AVEC LES OPÉRATEURS",
    headline: "Façonné par des opérateurs de restaurants dans tous les formats.",
    description: "QSR, restauration décontractée, gastronomie, cuisines virtuelles et groupes hôteliers nourrissent la couche d'intelligence dont les restaurants ont vraiment besoin — du single-shop aux portefeuilles multi-marques.",
    stats: [
      { value: "12", label: "domaines de données unifiés" },
      { value: "500+", label: "modèles de données restaurant" },
      { value: "12", label: "modules analytiques", footnoteMarker: "†" },
      { value: "5 min", label: "refresh service sur Core Pro", footnoteMarker: "*" },
    ],
    industryEyebrow: "CE QUE NOUS ENTENDONS DES OPÉRATEURS",
    industryHeadline: "Les données existent. La décision arrive encore en retard.",
    industryDisclaimer: "Motifs que nous entendons des opérateurs et voyons dans les workflows de reporting restaurant. Anonymisés et généralisés.",
    industryTodayLabel: "L'industrie aujourd'hui",
    withSundaeLabel: "Avec Sundae",
    industryClaims: [
      { industry: "Les équipes attendent 2–3 jours pour des rapports, exports ou suivis d'analystes. Quand la réponse arrive, le service est déjà passé.", sundae: "Sundae Intelligence donne aux équipes des réponses sourcées en secondes, sur les systèmes qu'elles utilisent déjà." },
      { industry: "Annulations, comps, remises et exceptions POS sont petites individuellement. Non revues, elles peuvent créer 1–3% de fuite de revenu et marge.", sundae: "Pulse signale les motifs d'exception pendant le service, attribués au serveur, à la tranche horaire, au site ou au comportement." },
      { industry: "La variance de marge est souvent expliquée en fin de mois, après que les coûts soient passés.", sundae: "Insights connecte revenu, main-d'œuvre, coût matière, remises et prix pour que l'équipe voit la cause pendant qu'elle est encore actionnable." },
    ],
    footnote: "*Fréquence de refresh selon le tier Core. Voir les prix. †12 modules analytiques sur la plateforme ; 12 modules spécialisés inclus dans le bundle actuel. ‡Observations industrielles : motifs généraux de la restauration tirés de recherche publique et de retours conseil. Résultats pilotes nommés remplaceront cette section dès disponibles.",
  },
  es: {
    eyebrow: "CONSTRUIDO CON OPERADORES",
    headline: "Forjado por operadores de restaurantes en cada formato.",
    description: "QSR, casual, alta cocina, cocinas en la nube y grupos de hospitalidad informan la capa de inteligencia que los restaurantes realmente necesitan — desde operadores de un solo local hasta portafolios multi-marca.",
    stats: [
      { value: "12", label: "dominios de datos unificados" },
      { value: "500+", label: "modelos de datos de restaurante" },
      { value: "12", label: "módulos analíticos", footnoteMarker: "†" },
      { value: "5 min", label: "refresco de turno en Core Pro", footnoteMarker: "*" },
    ],
    industryEyebrow: "LO QUE ESCUCHAMOS DE OPERADORES",
    industryHeadline: "Los datos existen. La decisión sigue llegando tarde.",
    industryDisclaimer: "Patrones que escuchamos de operadores y vemos en los workflows de reporting de restaurantes. Anonimizados y generalizados.",
    industryTodayLabel: "La industria hoy",
    withSundaeLabel: "Con Sundae",
    industryClaims: [
      { industry: "Los equipos esperan 2–3 días por reportes, exportes o seguimiento de analistas. Cuando llega la respuesta, el turno ya pasó.", sundae: "Sundae Intelligence da a los equipos respuestas con fuente en segundos, en los sistemas que ya usan." },
      { industry: "Anulaciones, comps, descuentos y excepciones POS son pequeños por sí solos. Sin revisar, pueden crear 1–3% de fuga de ingresos y margen.", sundae: "Pulse señala los patrones de excepción durante el turno, atribuidos al mesero, daypart, local o comportamiento." },
      { industry: "La varianza de margen suele explicarse a fin de mes, después de que los costes se registraron.", sundae: "Insights conecta ingresos, personal, coste alimentos, descuentos y precios para que el equipo vea la causa mientras aún es accionable." },
    ],
    footnote: "*Frecuencia de refresco varía por tier Core. Ver precios. †12 módulos analíticos en la plataforma; 12 módulos especializados incluidos en el bundle actual. ‡Observaciones de industria: patrones generales de la restauración basados en investigación pública y feedback de asesoría. Resultados de pilotos nombrados reemplazarán esta sección cuando estén disponibles.",
  },
};

export function SectionProof() {
  const { locale } = useWebsiteI18n();
  const copy = localizedCopy[locale as keyof typeof localizedCopy] ?? getGeneratedLocalCopy(localizedCopy, generatedLocalCopy.localizedCopy, locale) ?? localizedCopy.en;

  return (
    <section aria-labelledby="proof-headline" className="relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="eyebrow mb-4">{copy.eyebrow}</div>
          <h2 id="proof-headline" className="section-h2 text-balance mb-5">{copy.headline}</h2>
          <p className="body-lg max-w-2xl mx-auto">{copy.description}</p>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {copy.stats.map((s) => (
            <div key={s.label} className="text-center p-5 sm:p-7 rounded-2xl bg-[var(--surface-subtle)] border border-[var(--border-default)]">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] tabular-nums">
                {s.value}
                {s.footnoteMarker && (
                  <sup className="text-base text-[var(--text-muted)] ml-0.5">{s.footnoteMarker}</sup>
                )}
              </div>
              <div className="mt-2 text-sm sm:text-base text-[var(--text-supporting)]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Theme-matched editorial anchor — warm room in light, moody room in dark.
            Each mode keeps its own first-class image (no conflation). Portrait
            frames, so the ratio stays portrait-tolerant rather than a wide slice. */}
        <div className="mt-12 sm:mt-16 max-w-3xl mx-auto">
          <EditorialImage
            src="/images/editorial/dining-night.jpg"
            light="/images/editorial/dining-room.jpg"
            alt="An operator's dining room mid-service"
            ratio="aspect-[4/3] sm:aspect-[3/2]"
            overlay="blend"
            rounded="rounded-[24px]"
          />
        </div>

        <div className="mt-16 sm:mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="eyebrow mb-4">{copy.industryEyebrow}</div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight text-balance max-w-xl mx-auto text-[var(--text-primary)]">
              {copy.industryHeadline}
            </h3>
            <p className="mt-4 text-[12px] text-[var(--text-muted)] italic max-w-xl mx-auto">
              {copy.industryDisclaimer}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-5">
            {copy.industryClaims.map((c, i) => (
              <div key={claimIds[i]} className="rounded-2xl border border-[var(--border-default)] bg-[var(--surface-subtle)] p-5 sm:p-6">
                <div className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-bold mb-2">
                  {copy.industryTodayLabel}
                </div>
                <p className="text-sm text-[var(--text-supporting)] leading-snug mb-4">{c.industry}</p>
                <div className="pt-4 border-t border-[var(--border-default)]">
                  <div className="text-[11px] uppercase tracking-wider text-[var(--electric-blue)] font-bold mb-2">
                    {copy.withSundaeLabel}
                  </div>
                  <p className="text-sm text-[var(--text-primary)] font-medium leading-snug">{c.sundae}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-[11px] text-[var(--text-muted)] italic max-w-3xl mx-auto leading-relaxed">
          {copy.footnote}
        </p>
      </div>
    </section>
  );
}
