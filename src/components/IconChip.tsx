"use client";

import { SundaeIcon, SundaeIconName } from "./icons";

interface IconChipProps {
 icon: SundaeIconName;
 size?: "sm" | "md" | "lg";
 variant?: "default" | "primary" | "success" | "warning" | "danger";
}

const sizeMap: Record<NonNullable<IconChipProps["size"]>, { container: string; icon: "sm" | "md" | "lg" | "xl" }> = {
 sm: { container: "p-1.5 rounded-lg", icon: "sm" },
 md: { container: "p-2 rounded-xl", icon: "md" },
 lg: { container: "p-3 rounded-2xl", icon: "lg" },
};

const variantMap: Record<NonNullable<IconChipProps["variant"]>, string> = {
 default: "bg-slate-100 text-slate-700",
 primary: "bg-[#FFEAE4] text-[#C2410C]",
 success: "bg-green-100 text-green-700",
 warning: "bg-amber-100 text-amber-700",
 danger: "bg-red-100 text-red-700",
};

export function IconChip({ icon, size = "md", variant = "default" }: IconChipProps) {
 const { container, icon: iconSize } = sizeMap[size];
 const variantClasses = variantMap[variant];
 
 return (
 <div
 className={`inline-flex items-center justify-center shadow-sm flex-shrink-0 ${container} ${variantClasses}`}
 >
 <SundaeIcon name={icon} size={iconSize} />
 </div>
 );
}

// Gradient variant for hero sections
interface GradientIconChipProps {
 icon: SundaeIconName;
 gradient?: "blue" | "green" | "orange" | "purple";
 size?: "sm" | "md" | "lg";
}

const gradientMap: Record<NonNullable<GradientIconChipProps["gradient"]>, string> = {
 blue: "bg-gradient-to-br from-[#FF5C4D] to-[#E03E48]",
 green: "bg-gradient-to-br from-green-500 to-green-600",
 orange: "bg-gradient-to-br from-orange-500 to-red-500",
 purple: "bg-gradient-to-br from-[#F2B45C] to-[#C2410C]",
};

export function GradientIconChip({ icon, gradient = "blue", size = "md" }: GradientIconChipProps) {
 const { container, icon: iconSize } = sizeMap[size];
 const gradientClasses = gradientMap[gradient];
 
 return (
 <div
 className={`inline-flex items-center justify-center shadow-md flex-shrink-0 text-[var(--text-primary)] ${container} ${gradientClasses}`}
 >
 <SundaeIcon name={icon} size={iconSize} />
 </div>
 );
}
