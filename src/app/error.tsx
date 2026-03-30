'use client';

import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import type { WebsiteLocale } from "@/lib/i18n";

const errorCopy: Record<
  WebsiteLocale,
  {
    title: string;
    description: string;
    retry: string;
  }
> = {
  en: {
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try again.",
    retry: "Try again",
  },
  ar: {
    title: "حدث خطأ ما",
    description: "وقع خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
    retry: "حاول مرة أخرى",
  },
  fr: {
    title: "Une erreur s'est produite",
    description: "Une erreur inattendue est survenue. Veuillez réessayer.",
    retry: "Réessayer",
  },
  es: {
    title: "Algo salió mal",
    description: "Se produjo un error inesperado. Inténtalo de nuevo.",
    retry: "Volver a intentarlo",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useWebsiteI18n();
  const copy = errorCopy[locale] ?? errorCopy.en;

  console.error("Application error:", error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          {copy.title}
        </h2>
        <p className="text-slate-600 mb-6">
          {copy.description}
        </p>
        <button onClick={reset} className="btn-primary">
          {copy.retry}
        </button>
      </div>
    </div>
  );
}
