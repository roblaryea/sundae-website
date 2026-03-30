'use client';

import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { SundaeIcon, type SundaeIconName } from "@/components/icons";
import { MockupFrame, MockupKPI, MockupTable, MockupAlert } from "@/components/ui/MockupFrame";
import { PageHero, PageCTA, FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/PageAnimations";
import { useCta } from "@/lib/cta";
import { PRICING_URL } from "@/lib/urls";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

// ─── Inline Mockups ─────────────────────────────────────────────────────────

type CrossIntelligenceMockupCopy = {
  marketingTimeline: {
    label: string;
    campaignSpend: string;
    revenue: string;
    campaignLaunch: string;
    uplift: string;
  };
  causeEffect: {
    label: string;
    alert: string;
    causes: Array<{ cause: string; impact: string }>;
    strongNegative: string;
    strongPositive: string;
  };
  correlationMatrix: {
    label: string;
    modules: string[];
    strongNegative: string;
    strongPositive: string;
  };
  revenueWaterfall: {
    label: string;
    netRevenueChange: string;
    bars: Array<{ label: string; h: number; color: string }>;
  };
  spendRadar: {
    label: string;
    markers: string[];
    alert: string;
  };
  campaignPulse: {
    label: string;
    campaignROI: string;
    revImpact: string;
    headers: string[];
    rows: string[][];
    warning: string;
  };
  cannibalization: {
    label: string;
    alert: string;
    items: Array<{ item: string; before: number; after: number; change: number }>;
    before: string;
    after: string;
  };
  whatChanged: {
    label: string;
    metrics: Array<{ metric: string; change: string; cause: string; severity: "positive" | "negative" }>;
  };
};

const localizedCrossIntelligenceMockups: Record<'en' | 'ar' | 'fr' | 'es', CrossIntelligenceMockupCopy> = {
  en: {
    marketingTimeline: {
      label: "Marketing Impact Timeline",
      campaignSpend: "Campaign Spend",
      revenue: "Revenue",
      campaignLaunch: "Campaign Launch",
      uplift: "Revenue uplift detected 5 days post-campaign (+14%)",
    },
    causeEffect: {
      label: "Cause & Effect Analysis",
      alert: "Revenue dropped 8.2% vs. prior week",
      causes: [
        { cause: "Server staffing reduced 15%", impact: "-$3,200" },
        { cause: "Menu item #4 86'd at 7pm", impact: "-$1,800" },
        { cause: "Weather: rain Fri-Sat", impact: "-$1,100" },
      ],
      strongNegative: "Strong negative",
      strongPositive: "Strong positive",
    },
    correlationMatrix: {
      label: "Correlation Matrix",
      modules: ["Rev", "Labor", "Inv", "Mktg", "Wx"],
      strongNegative: "Strong negative",
      strongPositive: "Strong positive",
    },
    revenueWaterfall: {
      label: "Revenue Attribution Waterfall",
      netRevenueChange: "Net Revenue Change",
      bars: [
        { label: "Base", h: 60, color: "bg-slate-500" },
        { label: "Promo", h: 25, color: "bg-green-500" },
        { label: "Menu", h: 15, color: "bg-green-400" },
        { label: "Labor", h: -10, color: "bg-red-400" },
        { label: "Wx", h: -8, color: "bg-red-300" },
        { label: "Total", h: 72, color: "bg-purple-500" },
      ],
    },
    spendRadar: {
      label: "Spend Efficiency Radar",
      markers: ["Mktg", "Labor", "Inv", "Rent", "Tech"],
      alert: "Marketing ROI 2.3x above benchmark. Labor underperforming.",
    },
    campaignPulse: {
      label: "Campaign Pulse Monitor",
      campaignROI: "Campaign ROI",
      revImpact: "Rev Impact",
      headers: ["Campaign", "Spend", "Rev", "ROI"],
      rows: [
        ["Weekend Brunch", "$1,200", "$4,800", "4.0x"],
        ["Happy Hour Push", "$800", "$2,100", "2.6x"],
        ["Loyalty Blast", "$600", "$1,700", "2.8x"],
      ],
      warning: "Happy Hour: labor cost spike detected (+22%)",
    },
    cannibalization: {
      label: "Cannibalization Detector",
      alert: "New item 'Truffle Burger' cannibalizing 'Classic Burger' (-34%)",
      items: [
        { item: "Classic Burger", before: 85, after: 56, change: -34 },
        { item: "Wagyu Slider", before: 42, after: 38, change: -10 },
        { item: "Chicken Sandwich", before: 64, after: 61, change: -5 },
      ],
      before: "Before",
      after: "After",
    },
    whatChanged: {
      label: "What Changed Engine",
      metrics: [
        { metric: "Lunch Revenue", change: "+12%", cause: "New menu items + weather improvement", severity: "positive" },
        { metric: "Labor Cost %", change: "+3.1pp", cause: "Overtime: 2 staff no-shows Thursday", severity: "negative" },
        { metric: "Food Waste", change: "-18%", cause: "Par level adjustment took effect", severity: "positive" },
        { metric: "Avg Ticket", change: "-$2.40", cause: "Promo discount applied without cap", severity: "negative" },
      ],
    },
  },
  ar: {
    marketingTimeline: {
      label: "الجدول الزمني لأثر التسويق",
      campaignSpend: "الإنفاق على الحملة",
      revenue: "الإيرادات",
      campaignLaunch: "إطلاق الحملة",
      uplift: "تم رصد ارتفاع في الإيرادات بعد 5 أيام من الحملة (+14%)",
    },
    causeEffect: {
      label: "تحليل السبب والنتيجة",
      alert: "انخفضت الإيرادات بنسبة 8.2% مقارنة بالأسبوع السابق",
      causes: [
        { cause: "خفض طاقم الخوادم بنسبة 15%", impact: "-$3,200" },
        { cause: "نفاد عنصر القائمة #4 الساعة 7 مساءً", impact: "-$1,800" },
        { cause: "الطقس: أمطار الجمعة والسبت", impact: "-$1,100" },
      ],
      strongNegative: "سلبي جداً",
      strongPositive: "إيجابي جداً",
    },
    correlationMatrix: {
      label: "مصفوفة الارتباط",
      modules: ["الإيراد", "العمالة", "المخزون", "التسويق", "الطقس"],
      strongNegative: "سلبي جداً",
      strongPositive: "إيجابي جداً",
    },
    revenueWaterfall: {
      label: "شلال إسناد الإيرادات",
      netRevenueChange: "صافي تغير الإيرادات",
      bars: [
        { label: "الأساس", h: 60, color: "bg-slate-500" },
        { label: "العروض", h: 25, color: "bg-green-500" },
        { label: "القائمة", h: 15, color: "bg-green-400" },
        { label: "العمالة", h: -10, color: "bg-red-400" },
        { label: "الطقس", h: -8, color: "bg-red-300" },
        { label: "الإجمالي", h: 72, color: "bg-purple-500" },
      ],
    },
    spendRadar: {
      label: "رادار كفاءة الإنفاق",
      markers: ["التسويق", "العمالة", "المخزون", "الإيجار", "التقنية"],
      alert: "عائد التسويق أعلى من المعيار بـ 2.3x. العمالة أقل من المتوقع.",
    },
    campaignPulse: {
      label: "مراقب نبض الحملة",
      campaignROI: "عائد الحملة",
      revImpact: "أثر الإيرادات",
      headers: ["الحملة", "الإنفاق", "الإيرادات", "العائد"],
      rows: [
        ["فطور عطلة نهاية الأسبوع", "$1,200", "$4,800", "4.0x"],
        ["تعزيز ساعة السعادة", "$800", "$2,100", "2.6x"],
        ["إشعار الولاء", "$600", "$1,700", "2.8x"],
      ],
      warning: "ساعة السعادة: تم رصد ارتفاع في تكلفة العمالة (+22%)",
    },
    cannibalization: {
      label: "كاشف الاستهلاك المتبادل",
      alert: "العنصر الجديد 'Truffle Burger' يستنزف مبيعات 'Classic Burger' (-34%)",
      items: [
        { item: "Classic Burger", before: 85, after: 56, change: -34 },
        { item: "Wagyu Slider", before: 42, after: 38, change: -10 },
        { item: "Chicken Sandwich", before: 64, after: 61, change: -5 },
      ],
      before: "قبل",
      after: "بعد",
    },
    whatChanged: {
      label: "محرك ماذا تغيّر",
      metrics: [
        { metric: "إيرادات الغداء", change: "+12%", cause: "عناصر جديدة في القائمة + تحسن الطقس", severity: "positive" },
        { metric: "نسبة تكلفة العمالة", change: "+3.1pp", cause: "ساعات إضافية: غياب موظفين يوم الخميس", severity: "negative" },
        { metric: "هدر الطعام", change: "-18%", cause: "تم تطبيق تعديل مستوى الحد", severity: "positive" },
        { metric: "متوسط الفاتورة", change: "-$2.40", cause: "تم تطبيق خصم ترويجي بلا حد", severity: "negative" },
      ],
    },
  },
  fr: {
    marketingTimeline: {
      label: "Chronologie d'impact marketing",
      campaignSpend: "Depense campagne",
      revenue: "Revenu",
      campaignLaunch: "Lancement campagne",
      uplift: "Hausse du revenu detectee 5 jours apres la campagne (+14%)",
    },
    causeEffect: {
      label: "Analyse cause-effet",
      alert: "Le revenu a baisse de 8,2 % vs. la semaine precedente",
      causes: [
        { cause: "Le staff de service a ete reduit de 15 %", impact: "-$3,200" },
        { cause: "Article #4 rupture a 19h", impact: "-$1,800" },
        { cause: "Meteo : pluie ven-sam", impact: "-$1,100" },
      ],
      strongNegative: "Fortement negatif",
      strongPositive: "Fortement positif",
    },
    correlationMatrix: {
      label: "Matrice de correlation",
      modules: ["Rev", "Main-d'oeuvre", "Stock", "Mktg", "Meteo"],
      strongNegative: "Fortement negatif",
      strongPositive: "Fortement positif",
    },
    revenueWaterfall: {
      label: "Waterfall d'attribution revenu",
      netRevenueChange: "Variation nette de revenu",
      bars: [
        { label: "Base", h: 60, color: "bg-slate-500" },
        { label: "Promo", h: 25, color: "bg-green-500" },
        { label: "Menu", h: 15, color: "bg-green-400" },
        { label: "Main-d'oeuvre", h: -10, color: "bg-red-400" },
        { label: "Meteo", h: -8, color: "bg-red-300" },
        { label: "Total", h: 72, color: "bg-purple-500" },
      ],
    },
    spendRadar: {
      label: "Radar d'efficacite des depenses",
      markers: ["Mktg", "Main-d'oeuvre", "Stock", "Loyer", "Tech"],
      alert: "ROI marketing 2,3x au-dessus du benchmark. Main-d'oeuvre en dessous.",
    },
    campaignPulse: {
      label: "Campaign Pulse Monitor",
      campaignROI: "ROI campagne",
      revImpact: "Impact revenu",
      headers: ["Campagne", "Depense", "Rev", "ROI"],
      rows: [
        ["Brunch week-end", "$1,200", "$4,800", "4.0x"],
        ["Happy Hour", "$800", "$2,100", "2.6x"],
        ["Push fidelite", "$600", "$1,700", "2.8x"],
      ],
      warning: "Happy Hour : pic de cout main-d'oeuvre detecte (+22 %)",
    },
    cannibalization: {
      label: "Detecteur de cannibalisation",
      alert: "Le nouvel article 'Truffle Burger' cannibalise 'Classic Burger' (-34%)",
      items: [
        { item: "Classic Burger", before: 85, after: 56, change: -34 },
        { item: "Wagyu Slider", before: 42, after: 38, change: -10 },
        { item: "Chicken Sandwich", before: 64, after: 61, change: -5 },
      ],
      before: "Avant",
      after: "Apres",
    },
    whatChanged: {
      label: "Moteur What Changed",
      metrics: [
        { metric: "Revenu dej.", change: "+12%", cause: "Nouveaux plats + amelioration meteo", severity: "positive" },
        { metric: "Cout main-d'oeuvre %", change: "+3,1pp", cause: "Heures sup : 2 absences jeudi", severity: "negative" },
        { metric: "Gaspillage alimentaire", change: "-18%", cause: "Ajustement du niveau de par", severity: "positive" },
        { metric: "Ticket moyen", change: "-$2.40", cause: "Remise promo appliquee sans plafond", severity: "negative" },
      ],
    },
  },
  es: {
    marketingTimeline: {
      label: "Linea de impacto de marketing",
      campaignSpend: "Gasto de campaña",
      revenue: "Ingresos",
      campaignLaunch: "Lanzamiento de campaña",
      uplift: "Se detecto un aumento de ingresos 5 dias despues de la campaña (+14%)",
    },
    causeEffect: {
      label: "Analisis causa-efecto",
      alert: "Los ingresos bajaron 8.2% vs. la semana anterior",
      causes: [
        { cause: "Se redujo el personal de sala un 15%", impact: "-$3,200" },
        { cause: "El plato #4 se agotó a las 7pm", impact: "-$1,800" },
        { cause: "Clima: lluvia vie-sab", impact: "-$1,100" },
      ],
      strongNegative: "Fuerte negativo",
      strongPositive: "Fuerte positivo",
    },
    correlationMatrix: {
      label: "Matriz de correlacion",
      modules: ["Ing", "Mano de obra", "Inventario", "Mktg", "Clima"],
      strongNegative: "Fuerte negativo",
      strongPositive: "Fuerte positivo",
    },
    revenueWaterfall: {
      label: "Cascada de atribucion de ingresos",
      netRevenueChange: "Cambio neto de ingresos",
      bars: [
        { label: "Base", h: 60, color: "bg-slate-500" },
        { label: "Promo", h: 25, color: "bg-green-500" },
        { label: "Menu", h: 15, color: "bg-green-400" },
        { label: "Mano de obra", h: -10, color: "bg-red-400" },
        { label: "Clima", h: -8, color: "bg-red-300" },
        { label: "Total", h: 72, color: "bg-purple-500" },
      ],
    },
    spendRadar: {
      label: "Radar de eficiencia del gasto",
      markers: ["Mktg", "Mano de obra", "Inventario", "Renta", "Tech"],
      alert: "El ROI de marketing esta 2.3x por encima del benchmark. La mano de obra va por debajo.",
    },
    campaignPulse: {
      label: "Campaign Pulse Monitor",
      campaignROI: "ROI de campaña",
      revImpact: "Impacto en ingresos",
      headers: ["Campaña", "Gasto", "Ing", "ROI"],
      rows: [
        ["Brunch de fin de semana", "$1,200", "$4,800", "4.0x"],
        ["Push de happy hour", "$800", "$2,100", "2.6x"],
        ["Campaña de fidelidad", "$600", "$1,700", "2.8x"],
      ],
      warning: "Happy Hour: se detecto un pico en el coste laboral (+22%)",
    },
    cannibalization: {
      label: "Detector de canibalizacion",
      alert: "El nuevo item 'Truffle Burger' canibaliza a 'Classic Burger' (-34%)",
      items: [
        { item: "Classic Burger", before: 85, after: 56, change: -34 },
        { item: "Wagyu Slider", before: 42, after: 38, change: -10 },
        { item: "Chicken Sandwich", before: 64, after: 61, change: -5 },
      ],
      before: "Antes",
      after: "Despues",
    },
    whatChanged: {
      label: "Motor What Changed",
      metrics: [
        { metric: "Ingresos de almuerzo", change: "+12%", cause: "Nuevos platos + mejora del clima", severity: "positive" },
        { metric: "Coste laboral %", change: "+3.1pp", cause: "Horas extra: 2 ausencias el jueves", severity: "negative" },
        { metric: "Desperdicio de comida", change: "-18%", cause: "Se aplico un ajuste de nivel de par", severity: "positive" },
        { metric: "Ticket medio", change: "-$2.40", cause: "Descuento promocional aplicado sin limite", severity: "negative" },
      ],
    },
  },
};

function MarketingTimelineMockup({ copy }: { copy: CrossIntelligenceMockupCopy }) {
  return (
    <MockupFrame label={copy.marketingTimeline.label}>
      <div className="space-y-3">
        <MockupKPI label={copy.marketingTimeline.campaignSpend} value="$12,400" trend="+18%" trendUp />
        <div className="h-20 flex items-end gap-1">
          {[35, 38, 42, 40, 55, 62, 68, 72, 65, 70, 78, 82].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
              <div className="w-full rounded-sm bg-purple-500/60" style={{ height: `${h}%` }} />
              {i === 4 && <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
          <span className="w-2 h-2 rounded-full bg-purple-500/60" /> {copy.marketingTimeline.revenue}
          <span className="w-2 h-2 rounded-full bg-orange-400" /> {copy.marketingTimeline.campaignLaunch}
        </div>
        <MockupAlert type="info">{copy.marketingTimeline.uplift}</MockupAlert>
      </div>
    </MockupFrame>
  );
}

function CauseEffectMockup({ copy }: { copy: CrossIntelligenceMockupCopy }) {
  return (
    <MockupFrame label={copy.causeEffect.label}>
      <div className="space-y-3">
        <MockupAlert type="warning">{copy.causeEffect.alert}</MockupAlert>
        <div className="space-y-2">
          {copy.causeEffect.causes.map((item) => (
            <div key={item.cause} className="p-2 bg-[var(--surface-faint)] rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-medium text-[var(--text-secondary)]">{item.cause}</span>
                <span className="text-[10px] text-red-400">{item.impact}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1 bg-[var(--surface-subtle)] rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "70%" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

function CorrelationMatrixMockup({ copy }: { copy: CrossIntelligenceMockupCopy }) {
  const modules = copy.correlationMatrix.modules;
  const colors = [
    ["bg-purple-500", "bg-red-400", "bg-green-400", "bg-purple-400", "bg-yellow-400"],
    ["bg-red-400", "bg-purple-500", "bg-orange-400", "bg-blue-300", "bg-slate-400"],
    ["bg-green-400", "bg-orange-400", "bg-purple-500", "bg-slate-400", "bg-green-300"],
    ["bg-purple-400", "bg-blue-300", "bg-slate-400", "bg-purple-500", "bg-orange-300"],
    ["bg-yellow-400", "bg-slate-400", "bg-green-300", "bg-orange-300", "bg-purple-500"],
  ];
  return (
    <MockupFrame label={copy.correlationMatrix.label}>
      <div className="space-y-2">
        <div className="grid gap-1" style={{ gridTemplateColumns: `40px repeat(${modules.length}, 1fr)` }}>
          <div />
          {modules.map((m) => (
            <div key={m} className="text-[8px] text-center text-[var(--text-muted)] font-medium">{m}</div>
          ))}
          {modules.map((row, ri) => (
            <>
              <div key={`label-${row}`} className="text-[8px] text-[var(--text-muted)] font-medium flex items-center">{row}</div>
              {colors[ri].map((color, ci) => (
                <div key={`${ri}-${ci}`} className={`h-6 rounded-sm ${color} ${ri === ci ? 'opacity-100' : 'opacity-50'}`} />
              ))}
            </>
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-[var(--text-muted)]">
          <span>{copy.correlationMatrix.strongNegative}</span>
          <span>{copy.correlationMatrix.strongPositive}</span>
        </div>
      </div>
    </MockupFrame>
  );
}

function RevenueWaterfallMockup({ copy }: { copy: CrossIntelligenceMockupCopy }) {
  return (
    <MockupFrame label={copy.revenueWaterfall.label}>
      <div className="space-y-2">
        <MockupKPI label={copy.revenueWaterfall.netRevenueChange} value="+$18,400" trend="+7.2%" trendUp />
        <div className="flex items-end gap-2 h-24">
          {copy.revenueWaterfall.bars.map((bar) => (
            <div key={bar.label} className="flex-1 flex flex-col items-center gap-0.5">
              <div
                className={`w-full rounded-sm ${bar.color}`}
                style={{ height: `${Math.abs(bar.h)}%`, marginTop: bar.h < 0 ? 'auto' : undefined }}
              />
              <span className="text-[8px] text-[var(--text-muted)]">{bar.label}</span>
            </div>
          ))}
        </div>
      </div>
    </MockupFrame>
  );
}

function SpendRadarMockup({ copy }: { copy: CrossIntelligenceMockupCopy }) {
  return (
    <MockupFrame label={copy.spendRadar.label}>
      <div className="space-y-3">
        <div className="relative w-full aspect-square max-w-[160px] mx-auto">
          <div className="absolute inset-0 rounded-full border border-[var(--border-default)] opacity-30" />
          <div className="absolute inset-[15%] rounded-full border border-[var(--border-default)] opacity-30" />
          <div className="absolute inset-[30%] rounded-full border border-[var(--border-default)] opacity-30" />
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            <polygon points="50,15 82,35 75,72 25,72 18,35" fill="rgba(168,85,247,0.2)" stroke="rgb(168,85,247)" strokeWidth="1" />
          </svg>
          {copy.spendRadar.markers.map((label, index) => {
            const axes = [
              { x: "50%", y: "5%" },
              { x: "90%", y: "30%" },
              { x: "80%", y: "75%" },
              { x: "20%", y: "75%" },
              { x: "5%", y: "30%" },
            ];
            return (
              <span key={label} className="absolute text-[8px] text-[var(--text-muted)] font-medium" style={{ left: axes[index].x, top: axes[index].y, transform: 'translate(-50%, -50%)' }}>
                {label}
              </span>
            );
          })}
        </div>
        <MockupAlert type="info">{copy.spendRadar.alert}</MockupAlert>
      </div>
    </MockupFrame>
  );
}

function CampaignPulseMockup({ copy }: { copy: CrossIntelligenceMockupCopy }) {
  return (
    <MockupFrame label={copy.campaignPulse.label}>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <MockupKPI label={copy.campaignPulse.campaignROI} value="3.2x" trend="+12%" trendUp />
          <MockupKPI label={copy.campaignPulse.revImpact} value="+$8,600" trend="+9%" trendUp />
        </div>
        <MockupTable
          headers={copy.campaignPulse.headers}
          rows={copy.campaignPulse.rows}
        />
        <MockupAlert type="warning">{copy.campaignPulse.warning}</MockupAlert>
      </div>
    </MockupFrame>
  );
}

function CannibalizationMockup({ copy }: { copy: CrossIntelligenceMockupCopy }) {
  return (
    <MockupFrame label={copy.cannibalization.label}>
      <div className="space-y-3">
        <MockupAlert type="critical">{copy.cannibalization.alert}</MockupAlert>
        <div className="space-y-2">
          {copy.cannibalization.items.map((row) => (
            <div key={row.item} className="p-2 bg-[var(--surface-faint)] rounded-lg">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-medium text-[var(--text-secondary)]">{row.item}</span>
                <span className={`text-[10px] font-semibold ${row.change < -20 ? 'text-red-400' : 'text-orange-400'}`}>{row.change}%</span>
              </div>
              <div className="flex gap-1 h-2">
                <div className="bg-[var(--text-muted)] rounded-full opacity-30" style={{ width: `${row.before}%` }} />
                <div className="bg-purple-500 rounded-full" style={{ width: `${row.after}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 text-[9px] text-[var(--text-muted)]">
          <span className="w-2 h-0.5 rounded-full bg-[var(--text-muted)] opacity-30" /> {copy.cannibalization.before}
          <span className="w-2 h-0.5 rounded-full bg-purple-500" /> {copy.cannibalization.after}
        </div>
      </div>
    </MockupFrame>
  );
}

function WhatChangedMockup({ copy }: { copy: CrossIntelligenceMockupCopy }) {
  return (
    <MockupFrame label={copy.whatChanged.label}>
      <div className="space-y-2">
        {copy.whatChanged.metrics.map((item) => (
          <div key={item.metric} className="flex items-start gap-2 p-2 bg-[var(--surface-faint)] rounded-lg">
            <div className={`w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0 ${item.severity === 'positive' ? 'bg-green-400' : 'bg-red-400'}`} />
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-semibold text-[var(--text-secondary)]">{item.metric}</span>
                <span className={`text-[10px] font-bold ${item.severity === 'positive' ? 'text-green-400' : 'text-red-400'}`}>{item.change}</span>
              </div>
              <span className="text-[9px] text-[var(--text-muted)]">{item.cause}</span>
            </div>
          </div>
        ))}
      </div>
    </MockupFrame>
  );
}

// ─── Component Mockup Map ───────────────────────────────────────────────────
const mockupRenderers = [
  MarketingTimelineMockup,
  CauseEffectMockup,
  CorrelationMatrixMockup,
  RevenueWaterfallMockup,
  SpendRadarMockup,
  CampaignPulseMockup,
  CannibalizationMockup,
  WhatChangedMockup,
] as const;

// ─── Data ───────────────────────────────────────────────────────────────────

type CrossIntelligenceComponent = {
  title: string;
  headline: string;
  description: string;
  capabilities: string[];
  icon: SundaeIconName;
  color: string;
  tier: 'base' | 'pro';
};

const localizedCrossIntelligenceComponents: Record<'en' | 'ar' | 'fr' | 'es', CrossIntelligenceComponent[]> = {
  en: [
    {
      title: "Marketing Impact Timeline",
      headline: "See the Delayed Effects of Every Marketing Dollar",
      description: "Overlay marketing spend, campaigns, and promotions on your revenue timeline. Cross-Intelligence surfaces the 3-7 day lag between marketing actions and revenue impact that traditional dashboards miss entirely.",
      capabilities: [
        "Revenue + marketing spend overlay with adjustable lag windows",
        "Campaign ROI attribution with statistical confidence scores",
        "Promotion impact visualization across all locations",
        "Automated detection of delayed revenue responses",
      ],
      icon: "chart",
      color: "from-purple-500 to-purple-600",
      tier: 'base',
    },
    {
      title: "Cause & Effect Cards",
      headline: "Auto-Generated Explanations for Every Metric Change",
      description: "When revenue drops or labor costs spike, Cross-Intelligence automatically generates cards explaining why by connecting changes across modules to surface the real root cause.",
      capabilities: [
        "Automatic root cause identification across data sources",
        "Confidence scoring for each causal hypothesis",
        "Actionable recommendations with estimated impact",
        "Historical pattern matching for recurring causes",
      ],
      icon: "idea",
      color: "from-cyan-500 to-blue-600",
      tier: 'base',
    },
    {
      title: "Correlation Matrix",
      headline: "Full NxN View of How Everything Connects",
      description: "See the strength and direction of connections between revenue, labor, inventory, marketing, weather, and events to discover relationships you never knew existed.",
      capabilities: [
        "Interactive NxN correlation heatmap across all modules",
        "Real-time correlation strength with statistical significance",
        "Drill-down from any cell to underlying data",
        "Time-lagged correlation analysis",
        "Custom correlation rules and thresholds",
      ],
      icon: "data",
      color: "from-violet-500 to-purple-600",
      tier: 'pro',
    },
    {
      title: "Revenue Attribution Waterfall",
      headline: "Attribute Revenue Changes to Specific Actions",
      description: "Decompose revenue movement into specific operational and marketing actions so you can see exactly how much each factor contributed.",
      capabilities: [
        "Waterfall decomposition of revenue changes",
        "Attribution to campaigns, menu changes, and staffing shifts",
        "Location-by-location attribution comparison",
        "Period-over-period attribution trends",
      ],
      icon: "performance",
      color: "from-blue-500 to-indigo-600",
      tier: 'pro',
    },
    {
      title: "Spend Efficiency Radar",
      headline: "Compare ROI Across Every Spending Category",
      description: "Compare the return on every dollar across marketing, labor, inventory, and rent to see which cost centers are underperforming.",
      capabilities: [
        "Multi-axis ROI radar across core spend categories",
        "Benchmark efficiency against your own history",
        "Location-level spend efficiency comparison",
        "Optimization suggestions based on efficiency gaps",
      ],
      icon: "balance",
      color: "from-emerald-500 to-teal-600",
      tier: 'pro',
    },
    {
      title: "Campaign Pulse Monitor",
      headline: "Real-Time Campaign Performance with Operational Context",
      description: "Correlate campaign performance with revenue, labor utilization, inventory turnover, and guest satisfaction in one operating view.",
      capabilities: [
        "Real-time campaign performance dashboard",
        "Cross-module impact tracking",
        "A/B campaign comparison with statistical significance",
        "Automated pause recommendations when ROI drops",
      ],
      icon: "pulse",
      color: "from-rose-500 to-pink-600",
      tier: 'pro',
    },
    {
      title: "Cannibalization Detector",
      headline: "Detect When Promotions Steal From Your Own Sales",
      description: "Automatically detect when a new menu item, promotion, or campaign is cannibalizing existing products before it quietly erodes your margins.",
      capabilities: [
        "Automatic cannibalization detection",
        "Menu item substitution pattern analysis",
        "Revenue displacement quantification with margin impact",
        "Threshold-based cannibalization alerts",
        "Historical cannibalization patterns",
      ],
      icon: "warning",
      color: "from-amber-500 to-orange-600",
      tier: 'pro',
    },
    {
      title: "What Changed Engine",
      headline: "Automatic Root Cause Analysis for Every Metric Movement",
      description: "When a metric moves significantly, the engine identifies likely causes by analyzing changes across all connected data sources.",
      capabilities: [
        "Automated anomaly detection across metrics",
        "Multi-factor root cause analysis",
        "Weekly digest of major changes and drivers",
        "Custom alert rules for key movements",
      ],
      icon: "search",
      color: "from-slate-500 to-slate-700",
      tier: 'base',
    },
  ],
  ar: [
    {
      title: "الجدول الزمني لأثر التسويق",
      headline: "شاهد الأثر المتأخر لكل دولار تسويقي",
      description: "ضع الإنفاق التسويقي والحملات والعروض فوق خط الإيرادات الزمني لكشف فجوة 3 إلى 7 أيام بين النشاط والأثر.",
      capabilities: ["طبقة بين الإيرادات والإنفاق مع نوافذ تأخير قابلة للتعديل", "إسناد عائد الحملة مع درجات ثقة", "عرض أثر العروض عبر المواقع", "كشف الاستجابات المتأخرة تلقائياً"],
      icon: "chart",
      color: "from-purple-500 to-purple-600",
      tier: 'base',
    },
    {
      title: "بطاقات السبب والنتيجة",
      headline: "تفسيرات مولدة تلقائياً لكل تغير في المؤشرات",
      description: "عندما تنخفض الإيرادات أو ترتفع تكلفة العمالة، ينشئ النظام بطاقات تشرح السبب الحقيقي عبر ربط التغيرات بين الوحدات.",
      capabilities: ["تحديد تلقائي للأسباب الجذرية", "درجات ثقة لكل فرضية", "توصيات عملية مع أثر متوقع", "مطابقة الأنماط التاريخية"],
      icon: "idea",
      color: "from-cyan-500 to-blue-600",
      tier: 'base',
    },
    {
      title: "مصفوفة الارتباط",
      headline: "رؤية كاملة لكيفية اتصال كل شيء بكل شيء",
      description: "اعرف قوة واتجاه العلاقات بين الإيرادات والعمالة والمخزون والتسويق والطقس والفعاليات في عرض واحد.",
      capabilities: ["خريطة ارتباط تفاعلية بين كل الوحدات", "قوة ارتباط لحظية مع دلالة إحصائية", "التعمق من أي خلية إلى البيانات الأساسية", "تحليل الارتباطات المؤجلة زمنياً", "قواعد وحدود ارتباط مخصصة"],
      icon: "data",
      color: "from-violet-500 to-purple-600",
      tier: 'pro',
    },
    {
      title: "شلال إسناد الإيرادات",
      headline: "انسب تغيرات الإيرادات إلى إجراءات محددة",
      description: "قسّم تغيّر الإيرادات إلى إجراءات تشغيلية وتسويقية واضحة لتعرف مقدار مساهمة كل عامل.",
      capabilities: ["تفكيك شلالي لتغيرات الإيرادات", "إسناد للحملات وتغييرات القائمة والعمالة", "مقارنة الإسناد بين المواقع", "اتجاهات الإسناد بين الفترات"],
      icon: "performance",
      color: "from-blue-500 to-indigo-600",
      tier: 'pro',
    },
    {
      title: "رادار كفاءة الإنفاق",
      headline: "قارن العائد عبر كل فئة إنفاق",
      description: "قارن العائد على كل دولار في التسويق والعمالة والمخزون والإيجار لمعرفة الفئات الأقل كفاءة.",
      capabilities: ["رادار ROI متعدد المحاور", "مقارنة الكفاءة مع أدائك التاريخي", "مقارنة الكفاءة حسب الموقع", "اقتراحات تحسين حسب فجوات الكفاءة"],
      icon: "balance",
      color: "from-emerald-500 to-teal-600",
      tier: 'pro',
    },
    {
      title: "مراقب نبض الحملة",
      headline: "أداء الحملات لحظياً مع السياق التشغيلي",
      description: "اربط أداء الحملات بالإيرادات واستخدام العمالة ودوران المخزون ورضا الضيوف في لوحة واحدة.",
      capabilities: ["لوحة أداء حملات لحظية", "تتبع الأثر عبر الوحدات", "مقارنة A/B مع دلالة إحصائية", "توصيات إيقاف تلقائي عند هبوط ROI"],
      icon: "pulse",
      color: "from-rose-500 to-pink-600",
      tier: 'pro',
    },
    {
      title: "كاشف الاستهلاك المتبادل",
      headline: "اكشف متى تسرق العروض من مبيعاتك الحالية",
      description: "اكتشف تلقائياً متى يقوم عنصر أو عرض جديد بسحب الطلب من منتجاتك الحالية قبل أن يضر الهوامش.",
      capabilities: ["كشف تلقائي للاستهلاك المتبادل", "تحليل أنماط الاستبدال بين العناصر", "قياس إزاحة الإيرادات وأثرها على الهامش", "تنبيهات حسب حدود قابلة للضبط", "أنماط تاريخية للاستـهلاك"],
      icon: "warning",
      color: "from-amber-500 to-orange-600",
      tier: 'pro',
    },
    {
      title: "محرك ماذا تغيّر",
      headline: "تحليل سببي تلقائي لكل حركة في المؤشرات",
      description: "عندما يتحرك أي مؤشر بشكل ملحوظ، يحدد المحرك الأسباب الأرجح عبر تحليل كل مصادر البيانات المرتبطة.",
      capabilities: ["كشف الشذوذات تلقائياً", "تحليل سببي متعدد العوامل", "ملخص أسبوعي لأهم التغيرات", "قواعد تنبيه مخصصة"],
      icon: "search",
      color: "from-slate-500 to-slate-700",
      tier: 'base',
    },
  ],
  fr: [
    {
      title: "Chronologie d'impact marketing",
      headline: "Voyez les effets retardes de chaque euro marketing",
      description: "Superposez depenses marketing, campagnes et promotions sur votre chronologie de revenu pour reveler le delai entre action et impact.",
      capabilities: ["Overlay revenu + depense marketing", "Attribution du ROI des campagnes avec score de confiance", "Visualisation de l'impact promo multi-sites", "Detection automatique des effets retardes"],
      icon: "chart",
      color: "from-purple-500 to-purple-600",
      tier: 'base',
    },
    {
      title: "Cartes cause-effet",
      headline: "Explications generees automatiquement pour chaque variation",
      description: "Quand le revenu baisse ou que le cout main-d'oeuvre grimpe, le moteur explique pourquoi en reliant les changements entre modules.",
      capabilities: ["Identification automatique des causes racines", "Score de confiance par hypothese", "Recommandations actionnables avec impact estime", "Rapprochement avec les patterns historiques"],
      icon: "idea",
      color: "from-cyan-500 to-blue-600",
      tier: 'base',
    },
    {
      title: "Matrice de correlation",
      headline: "Vue complete de toutes les connexions",
      description: "Visualisez la force et le sens des relations entre revenu, main-d'oeuvre, stock, marketing, meteo et evenements.",
      capabilities: ["Heatmap NxN interactive", "Force de correlation temps reel", "Drill-down vers les donnees sous-jacentes", "Analyse des correlations decalees", "Regles et seuils de correlation personalises"],
      icon: "data",
      color: "from-violet-500 to-purple-600",
      tier: 'pro',
    },
    {
      title: "Waterfall d'attribution revenu",
      headline: "Attribuez les variations de revenu a des actions precises",
      description: "Decomposez les mouvements de revenu en actions marketing et operationnelles pour comprendre la contribution de chaque facteur.",
      capabilities: ["Decomposition waterfall des variations de revenu", "Attribution aux campagnes, menus et changements de staffing", "Comparaison site par site", "Tendances d'attribution par periode"],
      icon: "performance",
      color: "from-blue-500 to-indigo-600",
      tier: 'pro',
    },
    {
      title: "Radar d'efficacite des depenses",
      headline: "Comparez le ROI de chaque categorie de depense",
      description: "Comparez le rendement de chaque euro sur le marketing, la main-d'oeuvre, le stock et le loyer pour voir les zones sous-performantes.",
      capabilities: ["Radar ROI multi-axes", "Benchmark face a votre historique", "Comparaison d'efficacite par site", "Suggestions d'optimisation selon les ecarts"],
      icon: "balance",
      color: "from-emerald-500 to-teal-600",
      tier: 'pro',
    },
    {
      title: "Moniteur de campagne",
      headline: "Performance campagne en temps reel avec contexte operationnel",
      description: "Reliez la performance des campagnes au revenu, a l'utilisation de la main-d'oeuvre, a la rotation du stock et a la satisfaction client.",
      capabilities: ["Dashboard temps reel de campagne", "Suivi d'impact inter-modules", "Comparaison A/B avec significativite statistique", "Recommandations automatiques de pause si le ROI chute"],
      icon: "pulse",
      color: "from-rose-500 to-pink-600",
      tier: 'pro',
    },
    {
      title: "Detecteur de cannibalisation",
      headline: "Detectez quand vos promos mangent vos propres ventes",
      description: "Detectez automatiquement lorsqu'un nouvel article ou une promotion cannibalise vos produits existants avant d'eroser vos marges.",
      capabilities: ["Detection automatique de cannibalisation", "Analyse des substitutions de produits", "Quantification du deplacement de revenu", "Alertes selon seuil configurable", "Patterns historiques de cannibalisation"],
      icon: "warning",
      color: "from-amber-500 to-orange-600",
      tier: 'pro',
    },
    {
      title: "Moteur des changements",
      headline: "Analyse causale automatique pour chaque mouvement de KPI",
      description: "Quand un indicateur bouge fortement, le moteur identifie les causes probables en analysant toutes les sources reliees.",
      capabilities: ["Detection automatique d'anomalies", "Analyse causale multifactorielle", "Digest hebdomadaire des changements majeurs", "Regles d'alerte personnalisees"],
      icon: "search",
      color: "from-slate-500 to-slate-700",
      tier: 'base',
    },
  ],
  es: [
    {
      title: "Linea de impacto de marketing",
      headline: "Ve los efectos retrasados de cada dolar de marketing",
      description: "Superpone gasto, campañas y promociones sobre tu linea de ingresos para descubrir el retraso entre accion e impacto.",
      capabilities: ["Overlay de ingresos y gasto", "Atribucion ROI de campañas con confianza estadistica", "Visualizacion del impacto promocional multi-sede", "Deteccion automatica de respuestas retrasadas"],
      icon: "chart",
      color: "from-purple-500 to-purple-600",
      tier: 'base',
    },
    {
      title: "Tarjetas causa-efecto",
      headline: "Explicaciones automaticas para cada cambio de metrica",
      description: "Cuando bajan los ingresos o suben los costes laborales, el motor explica por que conectando cambios entre modulos.",
      capabilities: ["Identificacion automatica de causa raiz", "Puntuacion de confianza por hipotesis", "Recomendaciones accionables con impacto estimado", "Comparacion con patrones historicos"],
      icon: "idea",
      color: "from-cyan-500 to-blue-600",
      tier: 'base',
    },
    {
      title: "Matriz de correlacion",
      headline: "Vista completa de como todo se conecta",
      description: "Observa la fuerza y direccion de las relaciones entre ingresos, mano de obra, inventario, marketing, clima y eventos.",
      capabilities: ["Heatmap NxN interactivo", "Fuerza de correlacion en tiempo real", "Drill-down a datos subyacentes", "Analisis de correlaciones con desfase", "Reglas y umbrales personalizados"],
      icon: "data",
      color: "from-violet-500 to-purple-600",
      tier: 'pro',
    },
    {
      title: "Cascada de atribucion de ingresos",
      headline: "Atribuye cambios de ingresos a acciones concretas",
      description: "Descompone el movimiento de ingresos en acciones operativas y de marketing para ver cuanto aporto cada factor.",
      capabilities: ["Descomposicion en cascada", "Atribucion a campañas, cambios de menu y staffing", "Comparacion entre locales", "Tendencias de atribucion entre periodos"],
      icon: "performance",
      color: "from-blue-500 to-indigo-600",
      tier: 'pro',
    },
    {
      title: "Radar de eficiencia del gasto",
      headline: "Compara el ROI de cada categoria de gasto",
      description: "Compara el retorno de cada dolar en marketing, mano de obra, inventario y renta para detectar categorias menos eficientes.",
      capabilities: ["Radar ROI multi-eje", "Benchmark contra tu historico", "Comparacion de eficiencia por local", "Sugerencias de optimizacion por brechas"],
      icon: "balance",
      color: "from-emerald-500 to-teal-600",
      tier: 'pro',
    },
    {
      title: "Monitor de pulso de campañas",
      headline: "Rendimiento de campañas en tiempo real con contexto operativo",
      description: "Relaciona el rendimiento de campañas con ingresos, uso de mano de obra, rotacion de inventario y satisfaccion de clientes.",
      capabilities: ["Dashboard de campañas en tiempo real", "Seguimiento de impacto entre modulos", "Comparacion A/B con significacion estadistica", "Recomendaciones automaticas de pausa si cae el ROI"],
      icon: "pulse",
      color: "from-rose-500 to-pink-600",
      tier: 'pro',
    },
    {
      title: "Detector de canibalizacion",
      headline: "Detecta cuando tus promociones roban tus propias ventas",
      description: "Detecta automaticamente cuando un producto o campaña nueva canibaliza ventas existentes antes de erosionar tus margenes.",
      capabilities: ["Deteccion automatica de canibalizacion", "Analisis de sustitucion de productos", "Cuantificacion del desplazamiento de ingresos", "Alertas por umbral configurable", "Patrones historicos de canibalizacion"],
      icon: "warning",
      color: "from-amber-500 to-orange-600",
      tier: 'pro',
    },
    {
      title: "Motor de cambios",
      headline: "Analisis causal automatico para cada movimiento de metricas",
      description: "Cuando una metrica se mueve de forma relevante, el motor identifica las causas mas probables analizando todas las fuentes conectadas.",
      capabilities: ["Deteccion automatica de anomalias", "Analisis causal multifactor", "Resumen semanal de cambios importantes", "Reglas de alerta personalizadas"],
      icon: "search",
      color: "from-slate-500 to-slate-700",
      tier: 'base',
    },
  ],
};

const localizedTierComparison: Record<'en' | 'ar' | 'fr' | 'es', { feature: string; base: boolean; pro: boolean }[]> = {
  en: [
    { feature: "Marketing Impact Timeline (30-day)", base: true, pro: true },
    { feature: "Cause & Effect Cards", base: true, pro: true },
    { feature: "What Changed weekly digest", base: true, pro: true },
    { feature: "Basic correlation alerts", base: true, pro: true },
    { feature: "Full Correlation Matrix", base: false, pro: true },
    { feature: "Revenue Attribution Waterfall", base: false, pro: true },
    { feature: "Spend Efficiency Radar", base: false, pro: true },
    { feature: "Campaign Pulse Monitor", base: false, pro: true },
    { feature: "Cannibalization Detector", base: false, pro: true },
    { feature: "Unlimited timeline lookback", base: false, pro: true },
    { feature: "Custom alert rules & thresholds", base: false, pro: true },
    { feature: "API access for correlation data", base: false, pro: true },
    { feature: "Priority processing", base: false, pro: true },
  ],
  ar: [
    { feature: "الجدول الزمني لأثر التسويق (30 يوماً)", base: true, pro: true },
    { feature: "بطاقات السبب والنتيجة", base: true, pro: true },
    { feature: "ملخص أسبوعي لما تغيّر", base: true, pro: true },
    { feature: "تنبيهات ارتباط أساسية", base: true, pro: true },
    { feature: "مصفوفة ارتباط كاملة", base: false, pro: true },
    { feature: "شلال إسناد الإيرادات", base: false, pro: true },
    { feature: "رادار كفاءة الإنفاق", base: false, pro: true },
    { feature: "مراقب نبض الحملة", base: false, pro: true },
    { feature: "كاشف الاستهلاك المتبادل", base: false, pro: true },
    { feature: "عودة غير محدودة للخلف زمنياً", base: false, pro: true },
    { feature: "قواعد وحدود تنبيه مخصصة", base: false, pro: true },
    { feature: "وصول API لبيانات الارتباط", base: false, pro: true },
    { feature: "معالجة ذات أولوية", base: false, pro: true },
  ],
  fr: [
    { feature: "Chronologie d'impact marketing (30 jours)", base: true, pro: true },
    { feature: "Cartes cause-effet", base: true, pro: true },
    { feature: "Digest hebdomadaire What Changed", base: true, pro: true },
    { feature: "Alertes de correlation basiques", base: true, pro: true },
    { feature: "Matrice de correlation complete", base: false, pro: true },
    { feature: "Waterfall d'attribution revenu", base: false, pro: true },
    { feature: "Radar d'efficacite des depenses", base: false, pro: true },
    { feature: "Campaign Pulse Monitor", base: false, pro: true },
    { feature: "Detecteur de cannibalisation", base: false, pro: true },
    { feature: "Historique illimite", base: false, pro: true },
    { feature: "Regles et seuils d'alerte personnalises", base: false, pro: true },
    { feature: "Acces API aux donnees de correlation", base: false, pro: true },
    { feature: "Traitement prioritaire", base: false, pro: true },
  ],
  es: [
    { feature: "Linea de impacto de marketing (30 dias)", base: true, pro: true },
    { feature: "Tarjetas causa-efecto", base: true, pro: true },
    { feature: "Resumen semanal What Changed", base: true, pro: true },
    { feature: "Alertas basicas de correlacion", base: true, pro: true },
    { feature: "Matriz de correlacion completa", base: false, pro: true },
    { feature: "Cascada de atribucion de ingresos", base: false, pro: true },
    { feature: "Radar de eficiencia del gasto", base: false, pro: true },
    { feature: "Campaign Pulse Monitor", base: false, pro: true },
    { feature: "Detector de canibalizacion", base: false, pro: true },
    { feature: "Historial ilimitado", base: false, pro: true },
    { feature: "Reglas y umbrales de alerta personalizados", base: false, pro: true },
    { feature: "Acceso API a datos de correlacion", base: false, pro: true },
    { feature: "Procesamiento prioritario", base: false, pro: true },
  ],
};

const crossIntelligenceCopy = {
  en: {
    heroBadge: 'Auto-enabled with 3+ modules',
    heroTitle: <>Cross-Intelligence<br />Correlation Engine</>,
    heroDescription:
      'Cross-Intelligence shows where your operating signals move together, from marketing to revenue, labor to sales, and inventory to waste.',
    heroSupport:
      'Base features turn on automatically when you activate three or more intelligence modules. Pro adds deeper attribution, cannibalization detection, and API access.',
    heroPrimary: 'Book a Demo',
    heroSecondary: 'See Pricing Calculator',
    problemTitle: 'Your Modules Get Stronger Together',
    problemDescription:
      'Each intelligence module explains one part of the business. Cross-Intelligence helps teams see how those parts affect each other.',
    problemStats: [
      { stat: "3–7 days", label: "Average delay between marketing spend and revenue impact", icon: "time" as SundaeIconName },
      { stat: "23%", label: "Of promotions show measurable cannibalization of existing items", icon: "warning" as SundaeIconName },
      { stat: "5x", label: "More causal factors identified vs single-module analysis", icon: "increase" as SundaeIconName },
    ],
    componentsEyebrow: '8 COMPONENTS',
    componentsTitle: 'Every Connection, Surfaced',
    componentsDescription:
      'From simple correlation alerts to revenue attribution and cannibalization detection.',
    baseVsProTitle: 'Base vs Pro',
    baseVsProDescription: 'Base turns on automatically. Pro adds the full analysis set.',
    baseCardTitle: 'Cross-Intelligence',
    proCardTitle: 'Cross-Intelligence Pro',
    baseTierLabel: 'Base',
    proTierLabel: 'Pro',
    baseLabel: 'Free with 3+ modules',
    proLabel: '$199/mo + $19/location',
    ctaTitle: 'See Cross-Intelligence in Action',
    ctaDescription:
      'Walk through the Correlation Matrix, Cannibalization Detector, and Revenue Attribution Waterfall with your team.',
    ctaPrimary: 'Book a Demo',
    ctaSecondary: 'See Pricing Calculator',
  },
  ar: {
    heroBadge: 'يتفعل تلقائياً مع 3+ وحدات',
    heroTitle: <>محرك الترابط<br />بين الوحدات</>,
    heroDescription:
      'عندما تعمل وحداتك معًا، تبدأ العلاقات الخفية بالظهور. يربط Cross-Intelligence بيانات التسويق والإيرادات والعمالة والمخزون والهدر حتى ترى التأثير المتبادل بوضوح.',
    heroSupport:
      'تُفتح ميزات Base مجاناً عند تفعيل 3 وحدات ذكاء أو أكثر. وارتقِ إلى Pro للحصول على المحرك الكامل مع الإسناد، وكشف الاستهلاك المتبادل، والوصول إلى API.',
    heroPrimary: 'احجز عرضاً',
    heroSecondary: 'عرض حاسبة الأسعار',
    problemTitle: 'القيمة تظهر عندما تعمل الوحدات معاً.',
    problemDescription:
      'كل وحدة تمنحك قراءة قوية داخل مجال واحد مثل العمالة أو المخزون أو التسويق أو الإيرادات. لكن الصورة الأوضح تظهر عندما ترى كيف يؤثر كل مجال في الآخر.',
    problemStats: [
      { stat: "3–7 أيام", label: "متوسط التأخير بين الإنفاق التسويقي وأثره على الإيرادات", icon: "time" as SundaeIconName },
      { stat: "23%", label: "من العروض تُظهر استهلاكاً متبادلاً قابلاً للقياس", icon: "warning" as SundaeIconName },
      { stat: "5x", label: "عوامل سببية أكثر من التحليل أحادي الوحدة", icon: "increase" as SundaeIconName },
    ],
    componentsEyebrow: '8 مكونات',
    componentsTitle: 'كل اتصال يظهر بوضوح',
    componentsDescription:
      'من تنبيهات الارتباط الأساسية إلى إسناد الإيرادات الكامل وكشف الاستهلاك المتبادل.',
    baseVsProTitle: 'Base مقابل Pro',
    baseVsProDescription: 'تُفتح Base تلقائياً. بينما يفتح Pro المحرك الكامل.',
    baseCardTitle: 'Cross-Intelligence',
    proCardTitle: 'Cross-Intelligence Pro',
    baseTierLabel: 'Base',
    proTierLabel: 'Pro',
    baseLabel: 'مجاني مع 3+ وحدات',
    proLabel: '$199/شهرياً + $19/موقع',
    ctaTitle: 'شاهد Cross-Intelligence أثناء العمل',
    ctaDescription:
      'جولة قصيرة مع فريقك في مصفوفة الارتباط وكاشف الاستهلاك المتبادل وشلال إسناد الإيرادات.',
    ctaPrimary: 'احجز عرضاً',
    ctaSecondary: 'عرض حاسبة الأسعار',
  },
  fr: {
    heroBadge: 'Active automatiquement avec 3+ modules',
    heroTitle: <>Moteur de<br />correlation cross-intelligence</>,
    heroDescription:
      'Quand vos modules travaillent ensemble, les liens utiles remontent plus vite. Cross-Intelligence relie marketing, revenu, main-d oeuvre, stock et pertes pour montrer ce qui influence vraiment la performance.',
    heroSupport:
      'Les fonctions de Base se debloquent gratuitement lorsque vous activez 3 modules dintelligence ou plus. Passez a Pro pour le moteur complet avec attribution, detection de cannibalisation et acces API.',
    heroPrimary: 'Reserver une demo',
    heroSecondary: 'Voir le calculateur de prix',
    problemTitle: 'La vraie valeur apparait quand les modules travaillent ensemble.',
    problemDescription:
      'Chaque module apporte une lecture utile sur un domaine, qu il s agisse de la main-d oeuvre, du stock, du marketing ou du revenu. Mais les decisions les plus solides viennent des liens entre ces domaines.',
    problemStats: [
      { stat: "3–7 jours", label: "Delai moyen entre les depenses marketing et leur impact sur le revenu", icon: "time" as SundaeIconName },
      { stat: "23%", label: "Des promotions montrent une cannibalisation mesurable des articles existants", icon: "warning" as SundaeIconName },
      { stat: "5x", label: "De facteurs causaux identifies vs analyse mono-module", icon: "increase" as SundaeIconName },
    ],
    componentsEyebrow: '8 COMPOSANTS',
    componentsTitle: 'Chaque connexion mise en lumiere',
    componentsDescription:
      'Des alertes de correlation basiques a lattribution complete du revenu et a la detection de cannibalisation.',
    baseVsProTitle: 'Base vs Pro',
    baseVsProDescription: 'Base se debloque automatiquement. Pro debloque le moteur complet.',
    baseCardTitle: 'Intelligence croisee',
    proCardTitle: 'Intelligence croisee Pro',
    baseTierLabel: 'Base',
    proTierLabel: 'Pro',
    baseLabel: 'Gratuit avec 3+ modules',
    proLabel: '199 $/mois + 19 $/site',
    ctaTitle: 'Voir Cross-Intelligence en action',
    ctaDescription:
      'Une courte visite avec votre equipe de la matrice de correlation, du detecteur de cannibalisation et du waterfall d attribution du revenu.',
    ctaPrimary: 'Reserver une demo',
    ctaSecondary: 'Voir le calculateur de prix',
  },
  es: {
    heroBadge: 'Se activa automaticamente con 3+ modulos',
    heroTitle: <>Motor de correlacion<br />Cross-Intelligence</>,
    heroDescription:
      'Cuando tus modulos trabajan juntos, las relaciones utiles aparecen antes. Cross-Intelligence conecta marketing, ingresos, mano de obra, inventario y desperdicio para mostrar que esta moviendo realmente el rendimiento.',
    heroSupport:
      'Las funciones Base se desbloquean gratis cuando activas 3 o mas modulos de inteligencia. Sube a Pro para obtener el motor completo con atribucion, deteccion de canibalizacion y acceso a API.',
    heroPrimary: 'Reservar una demo',
    heroSecondary: 'Ver calculadora de precios',
    problemTitle: 'El valor real aparece cuando los modulos trabajan juntos.',
    problemDescription:
      'Cada modulo te da una lectura fuerte de un dominio, ya sea mano de obra, inventario, marketing o ingresos. Pero las decisiones mas solidas salen de ver como se afectan entre si.',
    problemStats: [
      { stat: "3–7 dias", label: "Retraso promedio entre el gasto de marketing y su impacto en ingresos", icon: "time" as SundaeIconName },
      { stat: "23%", label: "De las promociones muestran canibalizacion medible de articulos existentes", icon: "warning" as SundaeIconName },
      { stat: "5x", label: "Mas factores causales identificados frente al analisis de un solo modulo", icon: "increase" as SundaeIconName },
    ],
    componentsEyebrow: '8 COMPONENTES',
    componentsTitle: 'Cada conexion, visible',
    componentsDescription:
      'Desde alertas basicas de correlacion hasta atribucion completa de ingresos y deteccion de canibalizacion.',
    baseVsProTitle: 'Base vs Pro',
    baseVsProDescription: 'Base se desbloquea automaticamente. Pro desbloquea el motor completo.',
    baseCardTitle: 'Inteligencia cruzada',
    proCardTitle: 'Inteligencia cruzada Pro',
    baseTierLabel: 'Base',
    proTierLabel: 'Pro',
    baseLabel: 'Gratis con 3+ modulos',
    proLabel: '$199/mes + $19/ubicacion',
    ctaTitle: 'Ve Cross-Intelligence en accion',
    ctaDescription:
      'Un recorrido breve con tu equipo por la matriz de correlacion, el detector de canibalizacion y la cascada de atribucion de ingresos.',
    ctaPrimary: 'Reservar una demo',
    ctaSecondary: 'Ver calculadora de precios',
  },
} as const;

export default function CrossIntelligencePage() {
  const cta = useCta();
  const { locale } = useWebsiteI18n();
  const ui = crossIntelligenceCopy[locale] ?? crossIntelligenceCopy.en;
  const components = localizedCrossIntelligenceComponents[locale] ?? localizedCrossIntelligenceComponents.en;
  const tierComparison = localizedTierComparison[locale] ?? localizedTierComparison.en;
  const mockupCopy = localizedCrossIntelligenceMockups[locale] ?? localizedCrossIntelligenceMockups.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)]">
      {/* Hero */}
      <PageHero
        badge={ui.heroBadge}
        title={ui.heroTitle}
        description={ui.heroDescription}
      >
        <p className="text-sm text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
          {ui.heroSupport}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="cta"
            size="lg"
            onClick={() => cta("/demo", "book_demo_cross_intel_hero", { page: "/product/cross-intelligence" })}
          >
            {ui.heroPrimary}
          </Button>
          <Button variant="outline-light" size="lg" href={PRICING_URL}>
            {ui.heroSecondary}
          </Button>
        </div>
      </PageHero>

      {/* The Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <h2 className="section-h2 text-[var(--text-primary)] mb-6">{ui.problemTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] mb-8">
              {ui.problemDescription}
            </p>
          </FadeUp>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ui.problemStats.map((item) => (
              <StaggerItem key={item.label}>
                <Card variant="elevated" className="text-center p-6">
                  <CardContent>
                    <SundaeIcon name={item.icon} size="lg" className="text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-[var(--text-primary)] mb-2">{item.stat}</div>
                    <p className="text-sm text-[var(--text-supporting)]">{item.label}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Components */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-faint)]">
        <div className="max-w-7xl mx-auto">
          <FadeUp className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[var(--text-muted)] mb-4">{ui.componentsEyebrow}</p>
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.componentsTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)] max-w-3xl mx-auto">{ui.componentsDescription}</p>
          </FadeUp>

          <div className="space-y-16">
            {components.map((component, index) => {
              const MockupComponent = mockupRenderers[index];
              return (
                <FadeUp key={component.title} delay={index * 0.05}>
                  <div className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>
                    {/* Mockup */}
                    <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                      {MockupComponent && <MockupComponent copy={mockupCopy} />}
                    </div>

                    {/* Content */}
                    <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${component.color} rounded-xl flex items-center justify-center`}>
                          <SundaeIcon name={component.icon} size="lg" className="text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-2xl font-bold text-[var(--text-primary)]">{component.title}</h3>
                            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${component.tier === 'pro' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-purple-500/20 text-purple-400'}`}>
                              {component.tier === 'pro' ? ui.proTierLabel : ui.baseTierLabel}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--text-muted)] font-medium">{component.headline}</p>
                        </div>
                      </div>
                      <p className="text-[var(--text-supporting)] leading-relaxed mb-6">
                        {component.description}
                      </p>
                      <div className="space-y-2 mb-4">
                        {component.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                            <span className="text-purple-400 flex-shrink-0 mt-0.5">✓</span>
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* Base vs Pro */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--navy-deep)]">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-12">
            <h2 className="section-h2 text-[var(--text-primary)] mb-4">{ui.baseVsProTitle}</h2>
            <p className="body-lg text-[var(--text-supporting)]">{ui.baseVsProDescription}</p>
          </FadeUp>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Base */}
            <StaggerItem>
              <Card variant="elevated" className="border border-purple-500/30">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <SundaeIcon name="insights" size="lg" className="text-purple-400" />
                    <div>
                      <CardTitle className="text-xl text-[var(--text-primary)]">{ui.baseCardTitle}</CardTitle>
                      <p className="text-sm text-green-400 font-semibold">{ui.baseLabel}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tierComparison.filter(f => f.base).map(f => (
                      <li key={f.feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <span className="text-purple-400">✓</span> {f.feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>

            {/* Pro */}
            <StaggerItem>
              <Card variant="elevated" className="border border-cyan-500/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500" />
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <SundaeIcon name="core" size="lg" className="text-cyan-400" />
                    <div>
                      <CardTitle className="text-xl text-[var(--text-primary)]">{ui.proCardTitle}</CardTitle>
                      <p className="text-sm text-cyan-400 font-semibold">{ui.proLabel}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {tierComparison.map(f => (
                      <li key={f.feature} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                        <span className={f.pro ? "text-cyan-400" : "text-[var(--text-muted)]"}>
                          {f.pro ? "✓" : "—"}
                        </span>
                        {f.feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* CTA */}
      <PageCTA
        title={ui.ctaTitle}
        description={ui.ctaDescription}
      >
        <Button
          variant="cta"
          size="lg"
          onClick={() => cta("/demo", "book_demo_cross_intel_cta", { page: "/product/cross-intelligence" })}
        >
          {ui.ctaPrimary}
        </Button>
        <Button variant="outline-light" size="lg" href={PRICING_URL}>
          {ui.ctaSecondary}
        </Button>
      </PageCTA>
    </div>
  );
}
