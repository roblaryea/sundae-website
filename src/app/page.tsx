import type { Metadata } from "next";
import { cookies } from "next/headers";
import HomeContent from "@/components/home/HomeContent";
import { SectionCinematicIntro } from "@/components/home/SectionCinematicIntro";
import { getWebsiteMessages, resolveWebsiteLocale } from "@/lib/i18n";

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

export default function Home() {
 return (
 <div className="relative min-h-screen overflow-x-hidden">
 <SectionCinematicIntro />
 <div id="home-main" className="scroll-mt-24">
 <HomeContent />
 </div>
 </div>
 );
}
