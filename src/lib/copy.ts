/**
 * Centralized copy and messaging for the Sundae marketing site
 * 
 * Purpose: Single source of truth for:
 * - Value propositions and headlines
 * - CTA labels and microcopy
 * - Product descriptions
 * - Proof points and social proof
 * 
 * Benefits:
 * - Prevents copy drift across pages
 * - Easy to A/B test messaging
 * - Maintains brand voice consistency
 * - Reduces "intelligence" overuse
 */

// ============================================================================
// CORE VALUE PROPOSITIONS
// ============================================================================

export const VALUE_PROPS = {
  // Main taglines
  primary: "Decision Intelligence for Restaurants",
  secondary: "The AI-powered platform unifying every operational, workforce, and market data source into a single operating layer",
  
  // Specific benefits (alternatives to "intelligence")
  benefits: {
    speed: "Make faster decisions with real-time insights",
    accuracy: "Reduce variance and spot anomalies early",
    labor: "Improve labor productivity by 15-20%",
    costs: "Cut food waste and optimize inventory",
    visibility: "See every location, every metric, one dashboard"
  }
} as const;

// ============================================================================
// CTA LABELS & MICROCOPY
// ============================================================================

export const CTA_LABELS = {
  // Primary CTAs
  bookDemo: "Book a Demo",
  bookDemoNow: "Book Demo Now",
  scheduleDem: "Schedule Demo",
  getStarted: "Get Started",
  
  // Secondary CTAs
  viewPricing: "View Pricing",
  viewFullPricing: "View Full Pricing",
  learnMore: "Learn More",
  contactUs: "Contact Us",
  
  // Product-specific
  generateReport: "Generate Free Report",
  getFreeReport: "Get Free Report",
  tryForFree: "Try For Free",
  
  // Auth
  signIn: "Sign In",
  signUp: "Sign Up",
  
  // Supporting microcopy
  supporting: {
    noCredit: "No credit card required",
    freeTrial: "14-day free trial",
    demoTime: "30-minute demo",
    quickSetup: "Set up in minutes",
    noPressure: "No sales pressure"
  }
} as const;

// ============================================================================
// PRODUCT ONE-LINERS
// ============================================================================

export const PRODUCTS = {
  report: {
    name: "Sundae Report",
    tagline: "Benchmarking Engine",
    oneLiner: "Compare your restaurant's performance against industry standards",
    description: "Free benchmarking reports that show exactly where you stand and what to improve"
  },
  
  nexus: {
    name: "Sundae Nexus",
    tagline: "Decision Intelligence Platform",
    oneLiner: "Unified analytics across every location, system, and data source",
    description: "The command center for multi-unit restaurant operations"
  },
  
  insights: {
    name: "Sundae Insights",
    tagline: "AI Insights & Recommendations",
    oneLiner: "Actionable recommendations powered by AI that learns your business",
    description: "Know what changed, why it matters, and what to do about it"
  },
  
  canvas: {
    name: "Sundae Canvas",
    tagline: "Visualization Intelligence",
    oneLiner: "Turn complex data into clear, actionable visuals",
    description: "See your business in 4D: location, time, category, and performance"
  },
  
  intelligence: {
    name: "4D Intelligence",
    tagline: "See Your Business in 4D",
    oneLiner: "Location × Time × Category × Performance",
    description: "The only platform that shows you exactly what's happening, where, when, and why"
  }
} as const;

// ============================================================================
// ARCHITECTURE MODULES
// ============================================================================

export const ARCHITECTURE = {
  scout: {
    name: "Scout",
    layer: "Data Layer",
    tagline: "Data Integration",
    oneLiner: "Connect every POS, payroll, inventory, and delivery platform"
  },
  
  pulse: {
    name: "Pulse",
    layer: "AI Layer",
    tagline: "Anomaly Detection",
    oneLiner: "Detect issues before they become problems"
  },
  
  forge: {
    name: "Forge",
    layer: "AI Layer",
    tagline: "Conversational AI",
    oneLiner: "Ask questions in plain English, get instant answers"
  },
  
  canvasEngine: {
    name: "Canvas Engine",
    layer: "Intelligence Layer",
    tagline: "Visualization Engine",
    oneLiner: "Transform data into actionable visual insights"
  },
  
  watchtower: {
    name: "Watchtower",
    layer: "Intelligence Layer",
    tagline: "Market Intelligence",
    oneLiner: "Monitor competitors, trends, and market dynamics"
  }
} as const;

// ============================================================================
// PROOF POINTS & SOCIAL PROOF
// ============================================================================

export const PROOF_POINTS = {
  // Quantifiable outcomes
  outcomes: {
    laborSavings: "15-20% improvement in labor productivity",
    foodWasteReduction: "12-18% reduction in food waste",
    timeToInsights: "From hours to seconds for key insights",
    dataAccuracy: "99.9% data accuracy across integrations",
    customerSatisfaction: "4.8/5 average customer rating"
  },
  
  // Usage stats
  usage: {
    customers: "Used by 500+ restaurant brands",
    locations: "Powering 10,000+ locations globally",
    dataPoints: "Processing 50M+ data points daily",
    integrations: "50+ platform integrations"
  },
  
  // Customer quotes (anonymized templates)
  testimonials: {
    laborReduction: "We reduced labor costs by 18% in the first month",
    visibilityGain: "Finally have visibility into what's really happening across all locations",
    speedToAction: "Went from weekly reports to real-time decisions",
    roiRealized: "ROI realized within 60 days"
  }
} as const;

// ============================================================================
// PAGE-SPECIFIC HEADLINES (Concrete, not vague)
// ============================================================================

export const HEADLINES = {
  // Home page
  home: {
    hero: "Know What Changed Today",
    subhero: "Sales, labor, menu, and demand—all in one dashboard",
    problem: "Stop guessing. Start knowing.",
    solution: "Every data source. Every location. One operating layer."
  },
  
  // Product pages
  product: {
    hero: "Run Your Restaurants Like a Tech Company",
    subhero: "Real-time insights. Automated alerts. AI-powered recommendations.",
  },
  
  // Solutions pages
  solutions: {
    multiLocation: "Manage 50 Locations as Easily as 5",
    franchise: "Give Franchisees the Tools Corporate Has",
    cloudKitchen: "Multi-Brand Intelligence, One Kitchen"
  },
  
  // Demo page
  demo: {
    hero: "See Your Data Come Alive",
    subhero: "30-minute personalized demo tailored to your restaurant group"
  }
} as const;

// ============================================================================
// APPROVED SYNONYM SET (Alternatives to "Intelligence")
// ============================================================================

export const SYNONYMS = {
  // Instead of "decision intelligence" use:
  intelligence_alternatives: [
    "real-time insights",
    "actionable analytics",
    "operational clarity",
    "performance visibility",
    "data-driven decisions"
  ],
  
  // Instead of "intelligence layer" use:
  layer_alternatives: [
    "operating layer",
    "unified platform",
    "command center",
    "analytics hub",
    "decision engine"
  ],
  
  // Instead of "intelligent" use:
  intelligent_alternatives: [
    "smart",
    "automated",
    "AI-powered",
    "adaptive",
    "predictive"
  ]
} as const;

// ============================================================================
// CALL-TO-ACTION COPY BLOCKS
// ============================================================================

export const CTA_BLOCKS = {
  demo: {
    headline: "Ready to See Sundae in Action?",
    subheadline: "Get a personalized demo and see how we can transform your operations",
    cta: CTA_LABELS.bookDemo,
    secondaryCta: CTA_LABELS.viewPricing,
    footnote: "30-45 min demo • No credit card • Available within 24 hours"
  },
  
  pricing: {
    headline: "Transparent Pricing for Every Size",
    subheadline: "From single locations to enterprise groups—plans that scale with you",
    cta: CTA_LABELS.viewPricing,
    secondaryCta: CTA_LABELS.bookDemo
  },
  
  freeReport: {
    headline: "Get Your Free Benchmarking Report",
    subheadline: "See how your restaurant compares to similar businesses in minutes",
    cta: CTA_LABELS.generateReport,
    footnote: "Takes 5 minutes • No credit card • Results in your inbox"
  }
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a random alternative to "intelligence" to prevent overuse
 */
export function getIntelligenceAlternative(): string {
  const alternatives = SYNONYMS.intelligence_alternatives;
  return alternatives[Math.floor(Math.random() * alternatives.length)];
}

/**
 * Get a random alternative to "intelligence layer"
 */
export function getLayerAlternative(): string {
  const alternatives = SYNONYMS.layer_alternatives;
  return alternatives[Math.floor(Math.random() * alternatives.length)];
}
