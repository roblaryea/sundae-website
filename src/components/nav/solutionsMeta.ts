/**
 * Solutions navigation metadata — icons + value-prop descriptions per
 * role/segment, keyed by href so it composes with the existing i18n names
 * (`nav.solutionsRoles` / `nav.solutionsSegments`) without forcing translation
 * parity for the descriptions.
 *
 * Descriptions match the persona-switcher framing on the homepage so the
 * messaging stays consistent across surfaces.
 */
import {
  Activity,
  Building2,
  Cable,
  Compass,
  GitBranch,
  Hotel,
  LineChart,
  Megaphone,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface SolutionMeta {
  description: string;
  Icon: LucideIcon;
}

export const ROLE_META: Record<string, SolutionMeta> = {
  "/solutions/regional-managers": {
    description: "Live shift visibility across every location.",
    Icon: Activity,
  },
  "/solutions/finance-teams": {
    description: "Margin variance, the day it happens.",
    Icon: LineChart,
  },
  "/solutions/marketing-teams": {
    description: "Campaign ROI, day-by-day.",
    Icon: Megaphone,
  },
  "/solutions/c-suite-executives": {
    description: "Portfolio truth, every morning.",
    Icon: Compass,
  },
  "/solutions/technology-teams": {
    description: "12 domains, 179 models, zero plumbing.",
    Icon: Cable,
  },
  "/solutions/hr-teams": {
    description: "Labor variance, in the moment.",
    Icon: Users,
  },
};

export const SEGMENT_META: Record<string, SolutionMeta> = {
  "/solutions/multi-location-groups": {
    description: "Unified intelligence across every site, brand, concept.",
    Icon: Building2,
  },
  "/solutions/franchises": {
    description: "Brand consistency. Franchisee performance. One view.",
    Icon: GitBranch,
  },
  "/solutions/cloud-kitchens": {
    description: "Delivery margin, platform health, virtual brand attribution.",
    Icon: Truck,
  },
  "/solutions/hospitality-operators": {
    description: "F&B, rooms, events, and catering in one decision view.",
    Icon: Hotel,
  },
};
