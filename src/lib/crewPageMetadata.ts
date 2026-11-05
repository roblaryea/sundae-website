import type { Metadata } from "next";
import type { WebsiteLocale } from "@/lib/i18n";
import { buildResolvedPageMetadata } from "@/lib/solutionPageMetadata";

type LocalizedCrewMetadataCopy = {
  badge?: unknown;
  heroLine1?: unknown;
  heroLine2?: unknown;
  description?: unknown;
};

type BuildCrewPageMetadataOptions = {
  locale: WebsiteLocale;
  pathname: string;
  englishTitle: string;
  englishDescription: string;
  generatedLocalCopy: unknown;
};

function readLocalizedString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function resolveLocalizedTitle(copy: LocalizedCrewMetadataCopy): string | undefined {
  const badge = readLocalizedString(copy.badge);
  const hero = [
    readLocalizedString(copy.heroLine1),
    readLocalizedString(copy.heroLine2),
  ]
    .filter(Boolean)
    .join(" ");

  return badge && hero ? `${badge}: ${hero}` : badge || hero || undefined;
}

/** Keeps Crew search and social metadata aligned with the visible localized hero. */
export function buildCrewPageMetadata({
  locale,
  pathname,
  englishTitle,
  englishDescription,
  generatedLocalCopy,
}: BuildCrewPageMetadataOptions): Metadata {
  const localizedByLocale =
    generatedLocalCopy && typeof generatedLocalCopy === "object"
      ? (generatedLocalCopy as Record<string, LocalizedCrewMetadataCopy>)[locale]
      : undefined;
  const title =
    locale === "en" || !localizedByLocale
      ? englishTitle
      : resolveLocalizedTitle(localizedByLocale) ?? englishTitle;
  const description =
    locale === "en" || !localizedByLocale
      ? englishDescription
      : readLocalizedString(localizedByLocale.description) ?? englishDescription;

  return buildResolvedPageMetadata({ locale, pathname, title, description });
}
