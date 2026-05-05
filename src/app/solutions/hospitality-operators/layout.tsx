import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sundae for Hospitality Operators — F&B, Rooms, Events, and Catering in One View",
  description:
    "One decision view across every revenue stream — F&B, rooms, events, banquet, catering — with adaptive targets per service type and stream-specific forecasting.",
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
