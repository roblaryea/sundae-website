import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae for HR and People Leads — Live Labor Variance, by Shift",
  description:
    "Live labor% by location, server productivity, and overtime risk — by shift, not by month. Schedule decisions stop happening on instinct.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
