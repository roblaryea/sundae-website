import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae for Marketing Leads — Campaign Performance Signals in 24 Hours",
  description:
    "Campaign performance signals — covers, average check, channel mix, attribution — within 24 hours of activation. Re-allocate spend while the campaign is still running.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
