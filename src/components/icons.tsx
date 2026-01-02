"use client";

import {
  Brain,
  LineChart,
  Radar,
  Target,
  Sparkles,
  Activity,
  Cpu,
  Layers,
  BarChart3,
  Globe2,
  Users,
  Building2,
  MapPinned,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Clock3,
  Bell,
  Settings2,
  Workflow,
  GitBranch,
  MonitorSmartphone,
  Database,
  Gauge,
  DollarSign,
  ChefHat,
  Store,
  Hotel,
  Utensils,
  Calculator,
  FileText,
  MessageSquare,
  Eye,
  Zap,
  Link2,
  PieChart,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Lightbulb,
  Rocket,
  Calendar,
  Briefcase,
  HeartHandshake,
  Scale,
  Search,
  RefreshCw,
  Truck,
  LayoutDashboard,
  Network,
  Castle,
  Boxes,
  type LucideIcon,
} from "lucide-react";

export type SundaeIconName =
  // Core product icons
  | "intelligence"
  | "benchmarking"
  | "forecasting"
  | "alerts"
  | "labor"
  | "menu"
  | "multiLocation"
  | "watchtower"
  | "canvas"
  | "nexus"
  | "insights"
  | "report"
  | "core"
  | "modules"
  | "architecture"
  | "scout"
  | "pulse"
  | "forge"
  | "reservations"
  | "inventory"
  | "purchasing"
  // Personas / roles
  | "operators"
  | "finance"
  | "technology"
  | "owners"
  | "marketing"
  | "hr"
  | "regional"
  // Concepts
  | "aiOs"
  | "performance"
  | "risk"
  | "time"
  | "workflow"
  | "device"
  | "data"
  | "speed"
  | "cost"
  | "revenue"
  | "quality"
  // Actions / outcomes
  | "integration"
  | "dashboard"
  | "chart"
  | "warning"
  | "success"
  | "increase"
  | "decrease"
  | "idea"
  | "growth"
  | "schedule"
  | "business"
  | "support"
  | "balance"
  | "search"
  | "sync"
  | "delivery"
  // Industry
  | "restaurant"
  | "hotel"
  | "kitchen"
  | "franchise"
  | "calculator"
  | "document"
  | "conversation"
  | "visibility"
  | "network";

interface SundaeIconProps {
  name: SundaeIconName;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-8 h-8",
};

const iconMap: Record<SundaeIconName, LucideIcon> = {
  // Core product icons
  intelligence: Brain,
  benchmarking: LineChart,
  forecasting: Gauge,
  alerts: Bell,
  labor: Users,
  menu: Utensils,
  multiLocation: Globe2,
  watchtower: Castle,
  canvas: MonitorSmartphone,
  nexus: MessageSquare,
  insights: BarChart3,
  report: FileText,
  core: Zap,
  modules: Boxes,
  architecture: GitBranch,
  scout: Link2,
  pulse: Activity,
  forge: Settings2,
  reservations: Calendar,
  inventory: Layers,
  purchasing: Truck,
  // Personas / roles
  operators: Users,
  finance: DollarSign,
  technology: Cpu,
  owners: ShieldCheck,
  marketing: Target,
  hr: HeartHandshake,
  regional: MapPinned,
  // Concepts
  aiOs: Sparkles,
  performance: TrendingUp,
  risk: AlertTriangle,
  time: Clock3,
  workflow: Workflow,
  device: MonitorSmartphone,
  data: Database,
  speed: Gauge,
  cost: DollarSign,
  revenue: TrendingUp,
  quality: CheckCircle,
  // Actions / outcomes
  integration: Link2,
  dashboard: LayoutDashboard,
  chart: PieChart,
  warning: AlertTriangle,
  success: CheckCircle,
  increase: ArrowUp,
  decrease: ArrowDown,
  idea: Lightbulb,
  growth: Rocket,
  schedule: Calendar,
  business: Briefcase,
  support: HeartHandshake,
  balance: Scale,
  search: Search,
  sync: RefreshCw,
  delivery: Truck,
  // Industry
  restaurant: Store,
  hotel: Hotel,
  kitchen: ChefHat,
  franchise: Building2,
  calculator: Calculator,
  document: FileText,
  conversation: MessageSquare,
  visibility: Eye,
  network: Network,
};

export function SundaeIcon({ name, className, size = "md" }: SundaeIconProps) {
  const Icon = iconMap[name] || Sparkles;
  const sizeClass = sizeClasses[size];
  const combinedClassName = `${sizeClass} ${className || ""}`.trim();
  
  return <Icon className={combinedClassName} />;
}

// Export individual icons for direct use if needed
export { iconMap };
