import { cookies } from "next/headers";
import { resolveWebsiteLocale, type RequiredEnglishLocalizedRecord } from '@/lib/i18n';
import { getGeneratedLocalCopy } from '@/lib/generatedLocalCopy'
import { generatedLocalCopy } from '@/generated-locales/app_loading'

const loadingMessages: RequiredEnglishLocalizedRecord<string> = {
  en: "Loading...",
  ar: "جارٍ التحميل...",
  fr: "Chargement...",
  es: "Cargando...",
};

export default async function Loading() {
  const locale = resolveWebsiteLocale(await cookies());
  const message = loadingMessages[locale as keyof typeof loadingMessages] ?? getGeneratedLocalCopy(loadingMessages, generatedLocalCopy.loadingMessages, locale) ?? loadingMessages.en;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-[#FFD3C8] border-t-blue-600 rounded-full animate-spin" />
        <p className="text-sm text-stone-500">{message}</p>
      </div>
    </div>
  );
}
