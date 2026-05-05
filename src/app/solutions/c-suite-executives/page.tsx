"use client";

import { SolutionPageTemplate } from "@/components/redesign/solutions/SolutionPageTemplate";
import { solutionsContent } from "@/components/redesign/solutions/content";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";

export default function Page() {
  const { locale } = useWebsiteI18n();
  return <SolutionPageTemplate data={solutionsContent[locale].cSuite} />;
}
