import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Why Sundae",
 description:
 "See why leading restaurant groups choose Sundae for Decision Intelligence — unified data, 4D insights, and real-time operational visibility.",
};

export default function WhySundaeLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
