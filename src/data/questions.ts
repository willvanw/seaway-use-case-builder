export interface QuestionOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  tags: string[];
  weights: {
    valuePreference?: number;
    riskTolerance?: number;
    complexityTolerance?: number;
  };
}

export interface Question {
  id: number;
  question: string;
  subtitle: string;
  options: QuestionOption[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "Which THE·TEAM business line are you exploring AI opportunities for?",
    subtitle: "Select the team closest to where you see the biggest opportunity",
    options: [
      {
        id: "creators-inf",
        label: "Creators & Influencers",
        description: "Creator campaigns, influencer partnerships, social-first talent management",
        icon: "🎬",
        tags: ["creators-influencers", "talent-sourcing", "content-production"],
        weights: { valuePreference: 1, riskTolerance: 1, complexityTolerance: 0 }
      },
      {
        id: "biz-dev",
        label: "Business Development",
        description: "New business pitches, client acquisition, partnership growth",
        icon: "🤝",
        tags: ["business-development", "win-pitches", "brand-partnerships"],
        weights: { valuePreference: 2, riskTolerance: 1, complexityTolerance: 0 }
      },
      {
        id: "fin-ops",
        label: "Finance & Operations",
        description: "Agency P&L, project costing, resource allocation, procurement",
        icon: "📊",
        tags: ["finance-operations", "reduce-costs", "internal-ops"],
        weights: { valuePreference: 2, riskTolerance: -1, complexityTolerance: 0 }
      },
      {
        id: "perf-marketing",
        label: "Performance Marketing",
        description: "Paid media, programmatic, social ads, conversion optimization",
        icon: "📈",
        tags: ["performance-marketing", "media-buying", "campaign-optimization"],
        weights: { valuePreference: 1, riskTolerance: 1, complexityTolerance: 1 }
      },
      {
        id: "experiential",
        label: "Experiential Marketing",
        description: "Brand activations, pop-ups, immersive experiences, fan engagement",
        icon: "🎪",
        tags: ["experiential-marketing", "event-logistics", "brand-partnerships"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "creative-team",
        label: "Creative",
        description: "Campaign creative, brand strategy, design, video production",
        icon: "🎨",
        tags: ["creative", "content-production", "creative-volume"],
        weights: { valuePreference: 1, riskTolerance: 1, complexityTolerance: 1 }
      },
      {
        id: "measurement",
        label: "Measurement & Insights",
        description: "Campaign analytics, audience research, brand tracking, attribution",
        icon: "🔬",
        tags: ["measurement-insights", "client-reporting", "cross-platform-measurement"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 1 }
      },
      {
        id: "live-events",
        label: "Live Event Production",
        description: "Concert tours, sports events, festival production, broadcast",
        icon: "🎤",
        tags: ["live-event-production", "event-logistics", "vendor-coordination"],
        weights: { valuePreference: 1, riskTolerance: -1, complexityTolerance: 0 }
      },
      {
        id: "people-talent-hr",
        label: "People & Talent",
        description: "Agency recruiting, culture, learning & development, retention",
        icon: "👥",
        tags: ["people-talent", "internal-ops", "reduce-costs"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: -1 }
      },
      {
        id: "music-rep",
        label: "Music & Talent Representation",
        description: "Artist management, booking, licensing, rights management",
        icon: "🎵",
        tags: ["music-talent-rep", "deal-management", "talent-sourcing"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      }
    ]
  },
  {
    id: 2,
    question: "What type of work does this team deliver most?",
    subtitle: "This helps us match AI solutions to your actual workflow",
    options: [
      {
        id: "del-campaign",
        label: "Campaign strategy & execution",
        description: "End-to-end campaign planning, brief-to-launch delivery",
        icon: "🎯",
        tags: ["campaign-strategy", "client-delivery", "faster-delivery"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "del-talent",
        label: "Talent sourcing & relationship management",
        description: "Finding, vetting, and managing creator/athlete/artist relationships",
        icon: "⭐",
        tags: ["talent-sourcing", "talent-intelligence", "creators-influencers"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "del-reporting",
        label: "Client reporting & analytics",
        description: "Performance dashboards, post-campaign analysis, audience insights",
        icon: "📊",
        tags: ["client-reporting", "measurement-insights", "speed-insights"],
        weights: { valuePreference: 1, riskTolerance: -1, complexityTolerance: 1 }
      },
      {
        id: "del-content",
        label: "Content creation & production",
        description: "Video, social, design, copywriting at scale",
        icon: "🎬",
        tags: ["content-production", "creative", "creative-scale"],
        weights: { valuePreference: 1, riskTolerance: 1, complexityTolerance: 1 }
      },
      {
        id: "del-events",
        label: "Event planning & logistics",
        description: "Venue sourcing, vendor management, run-of-show, production timelines",
        icon: "📋",
        tags: ["event-logistics", "live-event-production", "vendor-coordination"],
        weights: { valuePreference: 1, riskTolerance: -1, complexityTolerance: 0 }
      },
      {
        id: "del-deals",
        label: "Contract negotiation & deal management",
        description: "Talent contracts, sponsorship agreements, rights and licensing",
        icon: "📝",
        tags: ["deal-management", "contract-workflow", "music-talent-rep"],
        weights: { valuePreference: 2, riskTolerance: -1, complexityTolerance: 1 }
      },
      {
        id: "del-media",
        label: "Media buying & optimization",
        description: "Programmatic, social, search, connected TV buying and optimization",
        icon: "💰",
        tags: ["media-buying", "performance-marketing", "campaign-optimization"],
        weights: { valuePreference: 2, riskTolerance: 0, complexityTolerance: 1 }
      },
      {
        id: "del-partnerships",
        label: "Brand partnerships & sponsorship activation",
        description: "Connecting brands with sports, music, and entertainment properties",
        icon: "🏟️",
        tags: ["brand-partnerships", "business-development", "experiential-marketing"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      }
    ]
  },
  {
    id: 3,
    question: "What's the single biggest bottleneck slowing your team down?",
    subtitle: "Be honest — this is where AI can make the fastest difference",
    options: [
      {
        id: "bot-reporting",
        label: "Manual reporting and data pulls eating billable hours",
        description: "Hours spent pulling data from platforms, formatting decks, updating dashboards",
        icon: "⏰",
        tags: ["manual-reporting", "client-reporting", "speed-insights"],
        weights: { valuePreference: 2, riskTolerance: 0, complexityTolerance: -1 }
      },
      {
        id: "bot-talent",
        label: "Talent/influencer discovery and vetting taking too long",
        description: "Searching across platforms, checking brand safety, validating audience data",
        icon: "🔍",
        tags: ["talent-discovery", "talent-sourcing", "creators-influencers"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "bot-creative",
        label: "Creative asset production can't keep pace with demand",
        description: "More formats, more platforms, more variants — same team size",
        icon: "🎨",
        tags: ["creative-volume", "content-production", "creative-scale"],
        weights: { valuePreference: 1, riskTolerance: 1, complexityTolerance: 1 }
      },
      {
        id: "bot-campaign",
        label: "Campaign performance optimization is too reactive",
        description: "Only seeing results after the fact, not adjusting in real time",
        icon: "📉",
        tags: ["campaign-optimization", "performance-marketing", "roi-attribution"],
        weights: { valuePreference: 1, riskTolerance: 1, complexityTolerance: 1 }
      },
      {
        id: "bot-vendor",
        label: "Event logistics coordination across vendors is chaotic",
        description: "Multiple vendors, shifting timelines, no single source of truth",
        icon: "🌀",
        tags: ["vendor-coordination", "event-logistics", "live-event-production"],
        weights: { valuePreference: 1, riskTolerance: -1, complexityTolerance: 0 }
      },
      {
        id: "bot-contracts",
        label: "Contract and deal workflow is slow and error-prone",
        description: "Drafting, redlining, approvals dragging across weeks",
        icon: "📑",
        tags: ["contract-workflow", "deal-management", "music-talent-rep"],
        weights: { valuePreference: 2, riskTolerance: -1, complexityTolerance: 0 }
      },
      {
        id: "bot-approvals",
        label: "Client communication and approvals create delays",
        description: "Waiting on feedback, version confusion, misaligned expectations",
        icon: "💬",
        tags: ["client-approvals", "faster-delivery", "client-delivery"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: -1 }
      },
      {
        id: "bot-knowledge",
        label: "Knowledge trapped in individual people not systems",
        description: "Key insights, relationships, and processes live in people's heads",
        icon: "🧠",
        tags: ["knowledge-silos", "internal-ops", "agency-wide"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      }
    ]
  },
  {
    id: 4,
    question: "How would you describe the data your team works with today?",
    subtitle: "AI is only as good as the data it can access",
    options: [
      {
        id: "data-scattered",
        label: "Scattered across platforms with no single source of truth",
        description: "Performance data in Meta, Google, TikTok — audience data somewhere else entirely",
        icon: "🔀",
        tags: ["data-scattered", "manual-reporting"],
        weights: { valuePreference: 0, riskTolerance: 0, complexityTolerance: -1 }
      },
      {
        id: "data-central",
        label: "Centralized in a few tools but underutilized",
        description: "We have dashboards but rarely go deeper than surface-level reporting",
        icon: "📦",
        tags: ["data-centralized", "speed-insights"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "data-structured",
        label: "Well-structured with dashboards and regular reporting",
        description: "Clean data pipelines, regular cadence of insights, team uses data daily",
        icon: "✅",
        tags: ["data-structured", "measurement-insights", "client-reporting"],
        weights: { valuePreference: 1, riskTolerance: 1, complexityTolerance: 1 }
      },
      {
        id: "data-proprietary",
        label: "Rich proprietary datasets (audience data, performance history, talent databases)",
        description: "Years of campaign data, proprietary talent/audience graphs, benchmarks",
        icon: "💎",
        tags: ["data-proprietary", "talent-intelligence", "measurement-edge"],
        weights: { valuePreference: 2, riskTolerance: 1, complexityTolerance: 2 }
      }
    ]
  },
  {
    id: 5,
    question: "Where are client expectations outpacing your team's current capabilities?",
    subtitle: "Identifying the gap helps us find solutions that win and retain clients",
    options: [
      {
        id: "exp-speed",
        label: "Speed of insight delivery and real-time reporting",
        description: "Clients want live dashboards and same-day analysis, not week-old decks",
        icon: "⚡",
        tags: ["speed-insights", "client-reporting", "faster-delivery"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "exp-personalization",
        label: "Personalization and audience targeting precision",
        description: "One-size campaigns don't cut it anymore — need micro-segmentation",
        icon: "🎯",
        tags: ["personalization", "performance-marketing", "campaign-strategy"],
        weights: { valuePreference: 1, riskTolerance: 1, complexityTolerance: 1 }
      },
      {
        id: "exp-creative",
        label: "Creative volume and variation at scale",
        description: "Clients need 50 ad variants not 5, across every platform and format",
        icon: "🎨",
        tags: ["creative-scale", "content-production", "creative"],
        weights: { valuePreference: 1, riskTolerance: 1, complexityTolerance: 1 }
      },
      {
        id: "exp-roi",
        label: "Proving ROI and attribution across channels",
        description: "CFOs want proof, and last-click attribution doesn't satisfy anyone",
        icon: "📈",
        tags: ["roi-attribution", "measurement-insights", "cross-platform-measurement"],
        weights: { valuePreference: 2, riskTolerance: 0, complexityTolerance: 1 }
      },
      {
        id: "exp-trends",
        label: "Predicting trends and cultural moments before they peak",
        description: "Clients want to be first, not fast followers — need cultural radar",
        icon: "🔮",
        tags: ["trend-prediction", "creators-influencers", "creative"],
        weights: { valuePreference: 0, riskTolerance: 2, complexityTolerance: 1 }
      },
      {
        id: "exp-measurement",
        label: "Cross-platform measurement and unified analytics",
        description: "Data from 12 platforms needs to tell one coherent story",
        icon: "🔗",
        tags: ["cross-platform-measurement", "measurement-insights", "client-reporting"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 1 }
      }
    ]
  },
  {
    id: 6,
    question: "How does your team feel about introducing AI into their workflows?",
    subtitle: "Adoption is as much about people as technology",
    options: [
      {
        id: "ai-cautious",
        label: "Cautious — need proven use cases with minimal disruption",
        description: "Show me it works somewhere else first before we change how we work",
        icon: "🛡️",
        tags: ["ai-cautious", "buy-saas", "timeline-rapid"],
        weights: { valuePreference: 1, riskTolerance: -2, complexityTolerance: -1 }
      },
      {
        id: "ai-open",
        label: "Open — willing to pilot if there's a clear business case",
        description: "We'll try it if the ROI story is credible and the team is supported",
        icon: "👐",
        tags: ["ai-open", "timeline-pilot"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "ai-eager",
        label: "Eager — already experimenting and want to scale",
        description: "Some of our people are already using AI tools — we need to formalize this",
        icon: "🚀",
        tags: ["ai-eager", "build-opensource", "timeline-strategic"],
        weights: { valuePreference: 0, riskTolerance: 1, complexityTolerance: 1 }
      },
      {
        id: "ai-aggressive",
        label: "Aggressive — want to lead the industry in AI-powered delivery",
        description: "We want AI to be THE reason clients choose THE·TEAM",
        icon: "🔥",
        tags: ["ai-aggressive", "build-proprietary", "productized-service"],
        weights: { valuePreference: 0, riskTolerance: 2, complexityTolerance: 2 }
      }
    ]
  },
  {
    id: 7,
    question: "What's a realistic timeline for delivering impact from an AI initiative?",
    subtitle: "Speed vs. depth — both are valid, but they shape the solution",
    options: [
      {
        id: "time-rapid",
        label: "Under 4 weeks — quick win to prove the concept",
        description: "Need to show value fast to build internal buy-in and momentum",
        icon: "⚡",
        tags: ["timeline-rapid", "buy-saas", "internal-ops"],
        weights: { valuePreference: 1, riskTolerance: -1, complexityTolerance: -2 }
      },
      {
        id: "time-pilot",
        label: "1–3 months — focused pilot with a specific team",
        description: "Enough time to integrate into a real workflow and measure results",
        icon: "🎯",
        tags: ["timeline-pilot", "customize-platform"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "time-strategic",
        label: "3–6 months — strategic build integrated into live workflows",
        description: "Proper build with training, integration, and change management",
        icon: "🏗️",
        tags: ["timeline-strategic", "build-opensource", "client-delivery"],
        weights: { valuePreference: 1, riskTolerance: 1, complexityTolerance: 1 }
      },
      {
        id: "time-transform",
        label: "6–12 months — transformational capability that changes how we operate",
        description: "Building a genuine competitive advantage that reshapes the business line",
        icon: "🌟",
        tags: ["timeline-transformational", "build-proprietary", "agency-wide"],
        weights: { valuePreference: 0, riskTolerance: 2, complexityTolerance: 2 }
      }
    ]
  },
  {
    id: 8,
    question: "What's your preferred approach to technology?",
    subtitle: "There's no wrong answer — each has tradeoffs in speed, cost, and control",
    options: [
      {
        id: "tech-saas",
        label: "Off-the-shelf SaaS tools configured for our needs",
        description: "Fast to deploy, vendor-supported, limited customization",
        icon: "📦",
        tags: ["buy-saas", "timeline-rapid", "ai-cautious"],
        weights: { valuePreference: 1, riskTolerance: -1, complexityTolerance: -1 }
      },
      {
        id: "tech-customize",
        label: "Customize existing platforms with agency-specific workflows",
        description: "Take a proven tool and make it work the way we work",
        icon: "🔧",
        tags: ["customize-platform", "timeline-pilot"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "tech-opensource",
        label: "Build proprietary tools on open-source foundations",
        description: "Maximum flexibility, own the roadmap, invest in engineering",
        icon: "🌳",
        tags: ["build-opensource", "timeline-strategic"],
        weights: { valuePreference: 1, riskTolerance: 1, complexityTolerance: 1 }
      },
      {
        id: "tech-custom",
        label: "Full custom development — own the IP entirely",
        description: "Build something nobody else has, potential to productize",
        icon: "🏭",
        tags: ["build-proprietary", "productized-service", "timeline-transformational"],
        weights: { valuePreference: 1, riskTolerance: 2, complexityTolerance: 2 }
      }
    ]
  },
  {
    id: 9,
    question: "What would create the most value for your business line in the next 12 months?",
    subtitle: "Pick the one that would change the game most",
    options: [
      {
        id: "pri-costs",
        label: "Reduce operational costs and free up margin",
        description: "Do more with less — automate the grind so people focus on high-value work",
        icon: "✂️",
        tags: ["reduce-costs", "internal-ops", "manual-reporting"],
        weights: { valuePreference: 2, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "pri-pitches",
        label: "Win more pitches and grow revenue",
        description: "Show up with sharper strategy, better data, and more compelling creative",
        icon: "🏆",
        tags: ["win-pitches", "business-development", "client-delivery"],
        weights: { valuePreference: 2, riskTolerance: 1, complexityTolerance: 0 }
      },
      {
        id: "pri-speed",
        label: "Deliver faster and more personalized client work",
        description: "Compress timelines without compromising quality",
        icon: "🚀",
        tags: ["faster-delivery", "client-delivery", "personalization"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "pri-product",
        label: "Create a productized service we can sell at scale",
        description: "Turn an internal capability into a revenue-generating product",
        icon: "💎",
        tags: ["productized-service", "new-service", "build-proprietary"],
        weights: { valuePreference: 1, riskTolerance: 2, complexityTolerance: 2 }
      },
      {
        id: "pri-talent",
        label: "Improve talent/creator discovery and relationship intelligence",
        description: "Know who to work with, why, and when — before our competitors do",
        icon: "⭐",
        tags: ["talent-intelligence", "talent-sourcing", "creators-influencers"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 1 }
      },
      {
        id: "pri-measurement",
        label: "Unlock measurement capabilities competitors can't match",
        description: "Proprietary attribution, predictive analytics, always-on insights",
        icon: "🔬",
        tags: ["measurement-edge", "measurement-insights", "cross-platform-measurement"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 1 }
      }
    ]
  },
  {
    id: 10,
    question: "Where should AI make its biggest impact first?",
    subtitle: "Starting in the right place builds momentum for everything that follows",
    options: [
      {
        id: "scope-internal",
        label: "Internal operations — make the back office faster",
        description: "Timesheets, resourcing, reporting, contracts — the invisible tax on every team",
        icon: "⚙️",
        tags: ["internal-ops", "reduce-costs", "finance-operations"],
        weights: { valuePreference: 2, riskTolerance: -1, complexityTolerance: 0 }
      },
      {
        id: "scope-client",
        label: "Client delivery — improve what we ship to clients",
        description: "Better creative, sharper insights, faster turnaround on everything",
        icon: "🎯",
        tags: ["client-delivery", "faster-delivery", "creative-scale"],
        weights: { valuePreference: 1, riskTolerance: 0, complexityTolerance: 0 }
      },
      {
        id: "scope-service",
        label: "New service offering — build something we can sell",
        description: "AI-powered products that generate revenue beyond traditional retainers",
        icon: "💰",
        tags: ["new-service", "productized-service", "win-pitches"],
        weights: { valuePreference: 1, riskTolerance: 2, complexityTolerance: 1 }
      },
      {
        id: "scope-agency",
        label: "Agency-wide transformation — change how THE·TEAM operates",
        description: "AI embedded in every workflow, every team, every client engagement",
        icon: "🌍",
        tags: ["agency-wide", "timeline-transformational", "build-proprietary"],
        weights: { valuePreference: 0, riskTolerance: 1, complexityTolerance: 2 }
      }
    ]
  }
];
