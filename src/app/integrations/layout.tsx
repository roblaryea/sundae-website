import type { Metadata } from "next";

export const metadata: Metadata = {
 title: "Integrations",
 description:
 "Connect Sundae to your POS, payroll, inventory, delivery, and reservation systems. 12-domain integration engine with 30+ vendor connections.",
};

export default function IntegrationsLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return children;
}
