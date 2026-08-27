import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import HomeContent from "@/components/home/HomeContent";
import { SectionCinematicIntro } from "@/components/home/SectionCinematicIntro";
import { getWebsiteMessages, resolveWebsiteLocale } from "@/lib/i18n";
import { resolveRecoveryFigure } from "@/lib/recovery-figure";

export async function generateMetadata(): Promise<Metadata> {
 const locale = resolveWebsiteLocale(await cookies());
 const messages = getWebsiteMessages(locale);

 return {
 title: messages.metadata.title,
 description: messages.metadata.description,
 openGraph: {
 title: messages.metadata.title,
 description: messages.metadata.description,
 },
 };
}

export default async function Home() {
 // Geo-aware recovered figure: currency follows the visitor's country (Vercel
 // geo header), falling back to their language's currency. Resolved on the
 // server so SSR and client agree (no hydration flash).
 const locale = resolveWebsiteLocale(await cookies());
 const country = (await headers()).get("x-vercel-ip-country");
 const recoveryFigure = resolveRecoveryFigure(locale, country);

 return (
 <div className="relative min-h-screen overflow-x-hidden">
 <SectionCinematicIntro recoveryFigure={recoveryFigure} />
 <div id="home-main" className="scroll-mt-24">
 <HomeContent />
 </div>
 </div>
 );
}
