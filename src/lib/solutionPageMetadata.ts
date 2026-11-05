import type { Metadata } from "next";
import {
  getLocalizedPathname,
  type WebsiteLocale,
} from "@/lib/i18n";

type LocalizedSolutionMetadataCopy = {
  badge?: unknown;
  titleLine1?: unknown;
  titleLine2?: unknown;
  description?: unknown;
};

type BuildSolutionPageMetadataOptions = {
  locale: WebsiteLocale;
  pathname: string;
  englishTitle: string;
  englishDescription: string;
  generatedLocalCopy: unknown;
};

type BuildResolvedSolutionPageMetadataOptions = {
  locale: WebsiteLocale;
  pathname: string;
  title: string;
  description: string;
};

function readLocalizedString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function resolveLocalizedTitle(copy: LocalizedSolutionMetadataCopy): string | undefined {
  const badge = readLocalizedString(copy.badge);
  if (badge) return badge;

  const title = [
    readLocalizedString(copy.titleLine1),
    readLocalizedString(copy.titleLine2),
  ]
    .filter(Boolean)
    .join(" ");

  return title || undefined;
}

/**
 * Builds locale-consistent metadata for a solution page from the same generated
 * translation pack used by its visible hero copy. English keeps its hand-tuned
 * search title and description; translated routes use their translated audience
 * label and description instead of presenting English metadata over local copy.
 */
export function buildSolutionPageMetadata({
  locale,
  pathname,
  englishTitle,
  englishDescription,
  generatedLocalCopy,
}: BuildSolutionPageMetadataOptions): Metadata {
  const localizedByLocale =
    generatedLocalCopy && typeof generatedLocalCopy === "object"
      ? (generatedLocalCopy as Record<string, LocalizedSolutionMetadataCopy>)[locale]
      : undefined;

  const title =
    locale === "en" || !localizedByLocale
      ? englishTitle
      : resolveLocalizedTitle(localizedByLocale) ?? englishTitle;
  const description =
    locale === "en" || !localizedByLocale
      ? englishDescription
      : readLocalizedString(localizedByLocale.description) ?? englishDescription;

  return buildResolvedPageMetadata({
    locale,
    pathname,
    title,
    description,
  });
}

/** Adds consistent, page-specific social metadata to already-resolved copy. */
export function buildResolvedPageMetadata({
  locale,
  pathname,
  title,
  description,
}: BuildResolvedSolutionPageMetadataOptions): Metadata {
  const localizedPathname = getLocalizedPathname(pathname, locale);

  return {
    title,
    description,
    openGraph: {
      type: "website",
      siteName: "Sundae",
      title,
      description,
      url: localizedPathname,
      images: [
        {
          url: "/logos/og-card.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/logos/og-card.png"],
    },
  };
}
