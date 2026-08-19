export type ServiceOfferingItem = {
  name: string
  description: string
  includes: string[]
  bestFor: string
}

export type ServiceOfferingDetails = {
  mainTitle: string
  subtitle: string
  services: ServiceOfferingItem[]
  addOns?: string[]
}

export type ServiceOffering = {
  id: string
  title: string
  shortDescription: string
  icon: string
  details: ServiceOfferingDetails
}

/** Featured service — used for spotlight styling across the site */
export const WEB_DEVELOPMENT_ID = "web-development" as const

export const SERVICE_OFFERINGS: ServiceOffering[] = [
                  {
                    id: "consulting",
                    title: "Consulting",
                    shortDescription: "Expert business consulting to optimize operations, improve processes, and accelerate growth.",
                    icon: "\u2192",
                    details: {
                      mainTitle: "Business Strategy & Operations Consulting",
                      subtitle: "High-impact advisory designed to help small and mid-sized businesses make smarter decisions, operate more efficiently, and scale without chaos.",
                      services: [
                        {
                          name: "90-Day Growth Blueprint",
                          description: "A focused diagnostic and planning engagement that identifies what's holding the business back and lays out a clear, actionable roadmap for the next 90 days.",
                          includes: [
                            "Business model audit",
                            "Pricing and margin analysis",
                            "KPI framework",
                            "90-day strategic roadmap",
                            "Clear next-step recommendations"
                          ],
                          bestFor: "Owners who need direction, clarity, and quick wins without a long-term consulting commitment."
                        },
                        {
                          name: "Full Operations Optimization",
                          description: "A hands-on consulting engagement designed to improve internal efficiency, reduce waste, and align people, processes, and capacity with business goals.",
                          includes: [
                            "Workflow mapping and bottleneck identification",
                            "Team structure and role optimization",
                            "Capacity planning and role alignment",
                            "KPI implementation and tracking"
                          ],
                          bestFor: "Growing SMBs experiencing operational strain, inefficiencies, or leadership overload."
                        },
                        {
                          name: "AI & Automations Consulting",
                          description: "Implementation-focused consulting to eliminate manual work, reduce errors, and improve visibility through smart automation.",
                          includes: [
                            "Intake and lead routing automations",
                            "Internal dashboards and reporting systems",
                            "Automation documentation and handoff"
                          ],
                          bestFor: "Businesses ready to save time, improve follow-up, and modernize internal systems."
                        },
                        {
                          name: "Monthly Strategy Retainer",
                          description: "Ongoing strategic support for leadership teams that want consistent guidance, accountability, and performance monitoring.",
                          includes: [
                            "Two strategy calls per month",
                            "KPI review and performance analysis",
                            "Monthly strategic reporting"
                          ],
                          bestFor: "Owners who want a strategic partner without hiring a full-time executive."
                        }
                      ],
                      addOns: [
                        "Field Tech Efficiency Review: Analyze technician workflows, scheduling, and productivity",
                        "Local Competitor Benchmarking: Market positioning and competitor performance analysis",
                        "Customer Journey Mapping: Identify friction points from first touch to repeat business",
                        "Workforce Optimization: Staffing, utilization, and role efficiency analysis"
                      ]
                    }
                  },
                  {
                    id: "branding",
                    title: "Branding",
                    shortDescription: "Build a compelling brand identity that resonates. From visual design to brand strategy.",
                    icon: "\u2192",
                    details: {
                      mainTitle: "Branding & Identity",
                      subtitle: "Branding services focused on building credibility, consistency, and differentiation—whether launching a new business or refining an existing one.",
                      services: [
                        {
                          name: "Brand Identity Package",
                          description: "A clean, professional brand foundation designed for newer or smaller businesses.",
                          includes: [
                            "Brand discovery questionnaire",
                            "Primary logo",
                            "Color palette",
                            "Font selection",
                            "Basic brand usage guidelines"
                          ],
                          bestFor: "Startups and small businesses that need a professional look without overinvestment."
                        },
                        {
                          name: "Full Brand Suite",
                          description: "A more robust visual identity for growing businesses that need a cohesive and polished presence across platforms.",
                          includes: [
                            "Brand discovery interview",
                            "Primary and secondary logo options",
                            "Expanded visual identity (colors, fonts, icons)",
                            "Business card designs",
                            "Social media templates"
                          ],
                          bestFor: "SMBs preparing to scale marketing, hiring, or sales efforts."
                        },
                        {
                          name: "Premium Strategic Branding Package",
                          description: "A strategy-first branding engagement that aligns positioning, messaging, and visual identity with long-term business goals.",
                          includes: [
                            "In-depth brand strategy workshop",
                            "Expanded and detailed brand guidelines"
                          ],
                          bestFor: "Established businesses or companies entering new markets that need strategic clarity and brand authority."
                        }
                      ]
                    }
                  },
                  {
                    id: "marketing",
                    title: "Marketing",
                    shortDescription: "Strategic marketing campaigns that drive growth. We help you reach the right audience and optimize conversions.",
                    icon: "\u2192",
                    details: {
                      mainTitle: "Digital Marketing Retainers",
                      subtitle: "Ongoing marketing partnerships designed to drive consistent growth, lead generation, and brand visibility.",
                      services: [
                        {
                          name: "Starter (Tier 1)",
                          description: "Entry-level digital marketing support for local and smaller businesses.",
                          includes: [
                            "Monthly strategy and reporting",
                            "Basic SEO",
                            "Weekly social media posting",
                            "Basic email marketing"
                          ],
                          bestFor: "Local businesses establishing an online presence and steady lead flow."
                        },
                        {
                          name: "Growth (Tier 2)",
                          description: "A performance-focused marketing retainer designed to scale traffic and conversions.",
                          includes: [
                            "Advanced SEO strategy",
                            "Landing page optimization",
                            "PPC ad management (Google, Meta, etc.)",
                            "Email automations and funnels"
                          ],
                          bestFor: "SMBs actively investing in growth and demand generation."
                        },
                        {
                          name: "Acceleration (Tier 3)",
                          description: "Higher-intensity marketing execution with added strategy and competitive insight.",
                          includes: [
                            "Expanded ad management",
                            "Quarterly growth planning meetings",
                            "Basic competitor analysis"
                          ],
                          bestFor: "Businesses seeking faster growth without jumping to enterprise-level spend."
                        },
                        {
                          name: "Market Dominance (Tier 4)",
                          description: "A comprehensive digital marketing and growth partnership.",
                          includes: [
                            "Weekly reporting",
                            "Full digital marketing team",
                            "Monthly consulting, strategy, and growth meetings",
                            "Multiple simultaneous campaigns"
                          ],
                          bestFor: "Larger or aggressive-growth companies looking to dominate their market."
                        }
                      ]
                    }
                  },
                  {
                    id: "web-development",
                    title: "Web Development & Digital Buildout",
                    shortDescription:
                      "High-conversion websites and digital buildouts designed to generate leads, support operations, and scale with the business.",
                    icon: "\u2192",
                    details: {
                      mainTitle: "Web Development & Digital Buildout",
                      subtitle:
                        "Professional builds across Basic, Standard, and Premium tiers — engineered for performance, lead capture, clarity, and ROI, not vanity design.",
                      services: [
                        {
                          name: "Basic Business Site",
                          description: "A professional, conversion-ready website designed to establish credibility and a clean online presence.",
                          includes: [
                            "4–6 core pages",
                            "Mobile-optimized design",
                            "SEO fundamentals",
                            "Brand-aligned styling"
                          ],
                          bestFor: "Small businesses or startups that need a strong digital foundation without complexity."
                        },
                        {
                          name: "Standard Website",
                          description: "A more robust website built to support lead generation, customer interaction, and operational workflows.",
                          includes: [
                            "7–12 pages",
                            "Booking forms or lead capture flows",
                            "Enhanced brand integration",
                            "Conversion-focused layouts"
                          ],
                          bestFor: "Teams actively generating leads and bookings online."
                        },
                        {
                          name: "Premium Website",
                          description: "A custom, high-performance website designed for scale, differentiation, and advanced functionality.",
                          includes: [
                            "12+ pages",
                            "Custom animations and interactions",
                            "Advanced components and integrations",
                            "Fully bespoke layout and structure"
                          ],
                          bestFor: "Established or growth-focused companies that view their website as a core revenue asset."
                        }
                      ]
                    }
                  }
];

export function getServicesNavLinks(): { href: string; label: string }[] {
  return [
    { href: "/services", label: "All services" },
    ...SERVICE_OFFERINGS.map((s) => ({
      href: `/services/${s.id}`,
      label: s.title,
    })),
  ];
}

