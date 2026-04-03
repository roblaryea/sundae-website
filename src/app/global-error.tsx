"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import {
  WEBSITE_LOCALE_COOKIE,
  normalizeWebsiteLocale,
  parseWebsiteLocaleFromPathname,
  websiteLocaleDirection,
  type WebsiteLocale,
} from "@/lib/i18n";

const globalErrorCopy: Record<
  WebsiteLocale,
  {
    title: string;
    description: string;
    retry: string;
  }
> = {
  en: {
    title: "Something went wrong",
    description: "Our team has been notified.",
    retry: "Try again",
  },
  ar: {
    title: "حدث خطأ ما",
    description: "تم إخطار فريقنا.",
    retry: "حاول مرة أخرى",
  },
  fr: {
    title: "Une erreur s'est produite",
    description: "Notre équipe a été informée.",
    retry: "Réessayer",
  },
  es: {
    title: "Algo salió mal",
    description: "Nuestro equipo ha sido avisado.",
    retry: "Volver a intentarlo",
  },
};

function resolveClientLocale(): WebsiteLocale {
  if (typeof window !== "undefined") {
    const { locale } = parseWebsiteLocaleFromPathname(window.location.pathname);
    if (locale) {
      return locale;
    }
  }

  if (typeof document !== "undefined" && document.documentElement.lang) {
    return normalizeWebsiteLocale(document.documentElement.lang);
  }

  if (typeof window !== "undefined") {
    return normalizeWebsiteLocale(window.localStorage.getItem(WEBSITE_LOCALE_COOKIE));
  }

  return "en";
}

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const locale = resolveClientLocale();
  const copy = globalErrorCopy[locale] ?? globalErrorCopy.en;

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang={locale} dir={websiteLocaleDirection[locale]}>
      <body>
        <div style={{ padding: "40px", textAlign: "center", fontFamily: "system-ui" }}>
          <h2>{copy.title}</h2>
          <p style={{ color: "#666" }}>{copy.description}</p>
          <button onClick={reset} style={{ padding: "8px 16px", marginTop: "16px", cursor: "pointer" }}>
            {copy.retry}
          </button>
        </div>
      </body>
    </html>
  );
}
