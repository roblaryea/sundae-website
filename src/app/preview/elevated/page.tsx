import type { Metadata } from "next";
import { ElevatedHome } from "./ElevatedHome";

/**
 * Isolated, NON-shipping preview of the "current brand, elevated" direction as a
 * real, animated full page. Reuses the live cinematic hero unchanged and wraps
 * it in the guest-check / receipt motif extended into a system. `noindex`.
 *
 * The static three-way deck comparison still lives at /preview/redesign.
 * Nothing here touches global styles or the live homepage.
 */
export const metadata: Metadata = {
  title: "Current brand, elevated - full page (internal preview)",
  robots: { index: false, follow: false },
};

export default function ElevatedPreviewPage() {
  return <ElevatedHome />;
}
