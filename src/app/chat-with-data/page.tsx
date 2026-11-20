import { permanentRedirect } from "next/navigation";
import { cookies } from "next/headers";
import { getLocalizedPathname, resolveWebsiteLocale } from "@/lib/i18n";

export default async function ChatWithDataRedirect() {
  permanentRedirect(getLocalizedPathname('/product/intelligence', resolveWebsiteLocale(await cookies())));
}
