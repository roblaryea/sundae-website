'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useWebsiteI18n } from "@/components/i18n/LocaleProvider";
import type { WebsiteLocale } from "@/lib/i18n";

const notFoundCopy: Record<
  WebsiteLocale,
  {
    orbAlt: string;
    title: string;
    body: string;
    detail: string;
    cta: string;
  }
> = {
  en: {
    orbAlt: "Sundae orb",
    title: "Looks like this scoop melted",
    body: "Let's get you back to Sundae.",
    detail: "The page you're looking for might have been moved, deleted, or never existed.",
    cta: "Return to Homepage",
  },
  ar: {
    orbAlt: "شعار Sundae",
    title: "يبدو أن هذه الصفحة ذابت",
    body: "دعنا نعيدك إلى Sundae.",
    detail: "قد تكون الصفحة قد نُقلت أو حُذفت أو ربما لم تكن موجودة من الأصل.",
    cta: "العودة إلى الصفحة الرئيسية",
  },
  fr: {
    orbAlt: "Orbe Sundae",
    title: "On dirait que cette page a fondu",
    body: "Revenons à Sundae.",
    detail: "La page que vous cherchez a peut-être été déplacée, supprimée ou n’a jamais existé.",
    cta: "Retour à l’accueil",
  },
  es: {
    orbAlt: "Orb de Sundae",
    title: "Parece que esta página se derritió",
    body: "Volvamos a Sundae.",
    detail: "La página que buscas puede haber sido movida, eliminada o puede que nunca haya existido.",
    cta: "Volver al inicio",
  },
};

export default function NotFound() {
  const { locale } = useWebsiteI18n();
  const copy = notFoundCopy[locale] ?? notFoundCopy.en;

  return (
    <div className="min-h-screen bg-[var(--navy-deep)] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.8 },
            scale: { duration: 0.6 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src="/logos/sundae-orb.png"
              alt={copy.orbAlt}
              width={120}
              height={120}
              className="drop-shadow-lg rounded-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-xl"></div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="hero-h1 text-[var(--text-primary)] mb-4" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)' }}>
            404
          </h1>
          <h2 className="section-h3 text-[var(--text-primary)] mb-4">
            {copy.title}
          </h2>
          <p className="body-xl text-[var(--text-secondary)] mb-8">
            {copy.body}
          </p>
          <p className="text-[var(--text-muted)] mb-8">
            {copy.detail}
          </p>

          <Link href="/">
            <Button variant="primary" size="lg">
              {copy.cta}
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl"
          animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
