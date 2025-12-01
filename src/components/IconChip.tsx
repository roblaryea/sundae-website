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
  default: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200",
  primary: "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300",
  success: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300",
  warning: "bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300",
  danger: "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300",
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
  blue: "bg-gradient-to-br from-blue-600 to-blue-700",
  green: "bg-gradient-to-br from-green-500 to-green-600",
  orange: "bg-gradient-to-br from-orange-500 to-red-500",
  purple: "bg-gradient-to-br from-purple-500 to-purple-600",
};

export function GradientIconChip({ icon, gradient = "blue", size = "md" }: GradientIconChipProps) {
  const { container, icon: iconSize } = sizeMap[size];
  const gradientClasses = gradientMap[gradient];
  
  return (
    <div
      className={`inline-flex items-center justify-center shadow-md flex-shrink-0 text-white ${container} ${gradientClasses}`}
    >
      <SundaeIcon name={icon} size={iconSize} />
    </div>
  );
}
