import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae for Operations Leaders — Live Shift Visibility Across Every Location",
  description:
    "Pulse and Watchtower give operations leaders live shift visibility across every restaurant, with the market context teams need to act before the shift is over.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
