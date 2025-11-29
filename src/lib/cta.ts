/**
 * Centralized CTA Tracking & UTM Management System
 * 
 * This module provides utilities for:
 * - Tracking CTA clicks via Google Analytics
 * - Preserving and propagating UTM parameters
 * - Managing navigation with tracking
 */

/**
 * Track a CTA click event in Google Analytics
 * 
 * @param label - Descriptive label for the CTA (e.g., "book_demo_hero")
 * @param metadata - Additional data to attach to the event
 */
export const trackCta = (label: string, metadata: Record<string, any> = {}) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "cta_click", {
      event_category: "CTA",
      event_label: label,
      ...metadata,
    });
  }
  
  // Also log to console in development for debugging
  if (process.env.NODE_ENV === "development") {
    console.log("CTA Tracked:", { label, metadata });
  }
};

/**
 * Append existing UTM parameters from current URL to a target URL
 * 
 * @param url - The target URL to append UTMs to
 * @returns The URL with UTM parameters appended
 */
export const appendUtm = (url: string): string => {
  if (typeof window === "undefined") return url;

  const params = new URLSearchParams(window.location.search);
  
  // If no UTM parameters exist, return original URL
  if ([...params].length === 0) return url;

  try {
    // Handle both absolute and relative URLs
    const baseUrl = url.startsWith("http") ? url : `${window.location.origin}${url}`;
    const u = new URL(baseUrl);
    
    // Append all UTM parameters
    params.forEach((val, key) => {
      if (key.startsWith("utm_")) {
        u.searchParams.set(key, val);
      }
    });
    
    // Return relative URL if input was relative
    if (!url.startsWith("http")) {
      return u.pathname + u.search + u.hash;
    }
    
    return u.toString();
  } catch (error) {
    console.error("Error appending UTM parameters:", error);
    return url;
  }
};

/**
 * Get all current UTM parameters as an object
 * 
 * @returns Object containing all UTM parameters
 */
export const getUtmParams = (): Record<string, string> => {
  if (typeof window === "undefined") return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  params.forEach((val, key) => {
    if (key.startsWith("utm_")) {
      utmParams[key] = val;
    }
  });
  
  return utmParams;
};

/**
 * Custom hook for CTA navigation with tracking
 * Use this in React components for CTA clicks
 */
import { useRouter } from "next/navigation";

export const useCta = () => {
  const router = useRouter();
  
  return (url: string, label: string, metadata: Record<string, any> = {}) => {
    // Track the CTA click
    trackCta(label, {
      destination: url,
      ...metadata,
    });
    
    // Append UTM parameters
    const finalUrl = appendUtm(url);
    
    // Navigate based on URL type
    if (finalUrl.startsWith("http")) {
      // External link - use window.location
      window.location.href = finalUrl;
    } else {
      // Internal link - use Next.js router
      router.push(finalUrl);
    }
  };
};

/**
 * Create a tracked link handler for onClick events
 * 
 * @param url - Destination URL
 * @param label - CTA tracking label
 * @param metadata - Additional tracking metadata
 * @returns Click handler function
 */
export const createCtaHandler = (
  url: string,
  label: string,
  metadata: Record<string, any> = {}
) => {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    
    trackCta(label, {
      destination: url,
      ...metadata,
    });
    
    const finalUrl = appendUtm(url);
    
    if (finalUrl.startsWith("http")) {
      window.location.href = finalUrl;
    } else {
      window.location.href = finalUrl;
    }
  };
};
