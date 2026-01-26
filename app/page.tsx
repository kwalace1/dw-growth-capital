"use client"

import { useState, useEffect, useCallback } from "react"

const navItems = [
  { label: "Home", slide: 0 },
  { label: "Services", slide: 1 },
  { label: "Our Firm", slide: 2 },
  { label: "Approach", slide: 3 },
  { label: "Our Partners", slide: 4 },
  { label: "How We Help", slide: 5 },
  { label: "Contact", slide: 6 },
]

const totalSlides = 7

const portfolioCompanies = [
  { 
    name: "Katana Tech", 
    logo: "/katana-logo-transparent.png", 
    hasLogo: true,
    description: "One intelligent hub for your whole business. Katana is a modern SaaS solution that connects projects, tasks, customers, inventory, HR, and analytics in a single platform. Automate handoffs and remove busywork so teams stay focused. SOC2-ready with 99.9% uptime, Katana offers modular pricing that scales with your business—from Starter plans for small teams to Enterprise solutions for large organizations.",
    industry: "Business Operations Technology",
    website: "https://zenith-iota.vercel.app/"
  },
  { 
    name: "Pristine Worx", 
    logo: "/pristine-worx-logo.png", 
    hasLogo: true,
    description: "Where perfection meets passion. Pristine Worx Auto Detailing is a professional car detailing service located in Broomall, Pennsylvania. They specialize in ceramic coatings, valet services, and comprehensive vehicle restoration. With a focus on revitalizing your ride, Pristine Worx brings vehicles back to pristine condition through meticulous attention to detail and premium service offerings.",
    industry: "Automotive Services",
    website: "https://pristineworxautodetailing.com/"
  },
  { 
    name: "Restorative Acres", 
    logo: "/restorative-acres-logo.png", 
    hasLogo: true,
    description: "A trusted regional retreat providing nature-based and animal-assisted mental health and wellness services. Restorative Acres combines trauma-informed counseling with connection to nature and ethical animal-assisted experiences, creating a unique healing environment that also helps vulnerable animals find homes. Through licensed clinical services, group wellness programming, yoga, gardening, and animal interaction, they offer a holistic approach to mental health that reduces stigma while building skills, social connection, and self-efficacy. Located in Maryland, Restorative Acres bridges the gap in mental health services for rural communities through cost-effective, clinically-grounded holistic wellness.",
    industry: "Mental Health & Wellness Services",
    website: ""
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0)
  const [isPortfolioPaused, setIsPortfolioPaused] = useState(false)
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null)
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const goToSlide = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides || index === currentSlide || isTransitioning) return

    setIsTransitioning(true)
    setCurrentSlide(index)
    setMobileMenuOpen(false)
    setTimeout(() => setIsTransitioning(false), 1000)
  }, [currentSlide, isTransitioning])

  // Mouse tracking for subtle parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth || 1
      const height = window.innerHeight || 1
      setMousePosition({
        x: (e.clientX / width - 0.5) * 20,
        y: (e.clientY / height - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return
      if (e.key === "ArrowDown" || e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault()
        goToSlide(currentSlide + 1)
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault()
        goToSlide(currentSlide - 1)
      } else if (e.key === "Home") {
        e.preventDefault()
        goToSlide(0)
      } else if (e.key === "End") {
        e.preventDefault()
        goToSlide(totalSlides - 1)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, isTransitioning, goToSlide])

  // Wheel navigation with improved debouncing
  useEffect(() => {
    let timeout: NodeJS.Timeout
    let lastWheelTime = 0
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return
      
      // Disable wheel navigation on scrollable slides (services slide 1, approach slide 3) to allow normal scrolling
      if (currentSlide === 1 || currentSlide === 3) {
        // Check if we're at the top or bottom of the scrollable area
        const target = e.target as HTMLElement
        const scrollableContainer = target.closest('.overflow-y-auto')
        if (scrollableContainer) {
          const container = scrollableContainer as HTMLElement
          const isAtTop = container.scrollTop === 0
          const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 10
          
          // Only allow slide navigation if at the very top scrolling up, or at the very bottom scrolling down
          if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
            // Allow slide navigation
          } else {
            // Prevent slide navigation, allow normal scrolling
            return
          }
        } else {
          // If not in a scrollable container, allow normal scrolling
          return
        }
      }
      
      const now = Date.now()
      if (now - lastWheelTime < 1000) return
      
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        if (Math.abs(e.deltaY) > 30) {
          lastWheelTime = Date.now()
          if (e.deltaY > 0) goToSlide(currentSlide + 1)
          else goToSlide(currentSlide - 1)
        }
      }, 150)
    }
    window.addEventListener("wheel", handleWheel, { passive: true })
    return () => {
      window.removeEventListener("wheel", handleWheel)
      clearTimeout(timeout)
    }
  }, [currentSlide, isTransitioning, goToSlide])

  const getSlideClass = (index: number) => {
    if (index === currentSlide) return "translate-x-0 opacity-100"
    if (index < currentSlide) return "-translate-x-full opacity-0"
    return "translate-x-full opacity-0"
  }

  return (
    <div className="relative h-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* Sophisticated Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-6 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/5">
        <div 
          className="flex items-center gap-2 cursor-pointer group transition-opacity duration-300"
          onClick={() => goToSlide(0)}
        >
          {/* Logo: DW in gold, GROWTH & CAPITAL in white (matching brand kit horizontal logo style, adapted for dark background) */}
          <span className="text-2xl md:text-3xl font-serif text-[#C4A574] font-normal leading-none">DW</span>
          <span className="text-xs md:text-sm font-sans text-white/90 font-light tracking-[0.1em] uppercase hidden sm:block">
            GROWTH & CAPITAL
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => goToSlide(item.slide)}
              className={`text-xs font-light tracking-[0.15em] uppercase transition-all duration-300 relative group ${
                currentSlide === item.slide 
                  ? "text-[#C4A574]" 
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-[#C4A574] transition-all duration-300 ${
                currentSlide === item.slide ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-white/60 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#0a0a0a]/98 backdrop-blur-2xl pt-24">
          <nav className="flex flex-col gap-2 px-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => goToSlide(item.slide)}
                className={`text-left py-4 px-0 text-lg font-light tracking-wide transition-all border-b border-white/5 ${
                  currentSlide === item.slide
                    ? "text-[#C4A574] border-[#C4A574]/30"
                    : "text-white/60 hover:text-white hover:border-white/10"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}

      {/* Slide Navigation Dots - More Refined */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="space-y-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`block transition-all duration-500 ${
                currentSlide === index
                  ? "w-2 h-8 bg-[#C4A574]"
                  : "w-1 h-1 bg-white/20 hover:bg-white/40"
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </nav>

      {/* Progress Indicator - Subtle */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-white/5 z-50">
        <div 
          className="h-full bg-[#C4A574] transition-all duration-1000 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>

      {/* Slides Container */}
      <div className="relative h-screen w-screen overflow-hidden">
        {/* Slide 0: Home - Hero */}
        <section
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getSlideClass(0)}`}
          style={{ zIndex: currentSlide === 0 ? 10 : 1 }}
        >
          {/* Background Image - NYC Skyline */}
          {/* To use your own image, place it in the public folder and change the URL to: url('/your-image-name.jpg') */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            }}
          >
            {/* Dark Overlay for Text Readability - More transparent to show skyline */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 via-[#0a0a0a]/40 to-[#0a0a0a]/55" />
            {/* Additional subtle overlay for better contrast */}
            <div className="absolute inset-0 bg-[#0a0a0a]/20" />
          </div>
          
          <div className="relative h-screen flex items-center justify-center pt-24 px-8 md:px-16 z-10">
            <div className="text-center max-w-6xl mx-auto">
              <div className="mb-12 space-y-6">
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-extralight mb-8 leading-[0.95] tracking-tight">
                  Backing Builders.
                  <br />
                  <span className="text-[#C4A574] font-light">Scaling Operators.</span>
                </h1>
              </div>
              <p className="text-lg md:text-xl text-white/70 mb-4 max-w-2xl mx-auto leading-relaxed font-light">
                DW Growth & Capital is a sweat equity firm that partners with founders and operators
                to compound cash flow, professionalize operations, and scale companies sustainably.
              </p>
              <p className="text-base md:text-lg text-white/50 mb-12 max-w-xl mx-auto font-light">
                We provide marketing, branding, and consulting services to help businesses grow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => goToSlide(1)}
                  className="group relative px-10 py-4 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-sm uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Our Services</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => goToSlide(6)}
                  className="px-10 py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 font-light text-sm uppercase tracking-[0.2em] transition-all duration-300"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 1: Services */}
        <section
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getSlideClass(1)}`}
          style={{ zIndex: currentSlide === 1 ? 10 : 1 }}
        >
          <div className="h-screen flex flex-col bg-[#0a0a0a] pt-24 px-6 md:px-12 overflow-y-auto">
            <div className="max-w-7xl w-full mx-auto py-8 md:py-12">
              <div className="mb-8 md:mb-12 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 tracking-tight">Our Services</h2>
                <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto">
                  Comprehensive solutions to accelerate your growth
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                {[
                  {
                    id: "consulting",
                    title: "Consulting",
                    shortDescription: "Expert business consulting to optimize operations, improve processes, and accelerate growth.",
                    icon: "→",
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
                    icon: "→",
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
                    icon: "→",
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
                    shortDescription: "High-conversion, industry-aware websites designed to generate leads, support operations, and scale with the business.",
                    icon: "→",
                    details: {
                      mainTitle: "Web Development & Digital Buildout",
                      subtitle: "High-conversion, industry-aware websites designed to generate leads, support operations, and scale with the business. These builds prioritize performance, clarity, and ROI—not vanity design.",
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
                          description: "A more robust website built to support lead generation, customer interaction, and service workflows.",
                          includes: [
                            "7–12 pages",
                            "Booking forms or lead capture flows",
                            "Enhanced brand integration",
                            "Conversion-focused layouts"
                          ],
                          bestFor: "Service businesses actively generating leads and bookings online."
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
                        },
                        {
                          name: "HVAC / Plumbing / Electrical",
                          description: "Websites designed to drive urgent calls, booked jobs, and financing conversions.",
                          includes: [
                            "Clear service menus",
                            "Financing and promotions pages",
                            "Emergency call-to-action buttons"
                          ],
                          bestFor: "Trade businesses competing in high-intent, local markets."
                        },
                        {
                          name: "Junk Removal",
                          description: "Conversion-focused websites built around speed, clarity, and dispatch efficiency.",
                          includes: [
                            "Instant quote or estimator tools",
                            "Job request and dispatch workflows",
                            "Simple, mobile-first UX"
                          ],
                          bestFor: "Junk removal companies prioritizing rapid lead capture and operational efficiency."
                        },
                        {
                          name: "Pet Care",
                          description: "Customer-friendly websites designed to streamline bookings and recurring services.",
                          includes: [
                            "Online booking portals",
                            "Client memberships or subscription setups",
                            "Service scheduling integrations"
                          ],
                          bestFor: "Pet care businesses offering repeat services or membership-based models."
                        },
                        {
                          name: "Real Estate Teams",
                          description: "High-end websites built to support listings, agents, and CRM-driven sales pipelines.",
                          includes: [
                            "IDX integration",
                            "Agent profile pages",
                            "CRM and lead routing workflows"
                          ],
                          bestFor: "Real estate teams and brokerages scaling lead flow and agent productivity."
                        }
                      ],
                      addOns: [
                        "Website Packages (East Coast Pricing)",
                        "Industry-Focused Websites"
                      ]
                    }
                  }
                ].map((service, idx) => (
                  <div
                    key={service.id}
                    className={`relative bg-white/5 border border-white/10 transition-all duration-500 cursor-pointer ${
                      expandedService === service.id 
                        ? 'md:col-span-3 bg-white/10 border-white/20' 
                        : 'hover:bg-white/10 hover:border-white/20'
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    <button
                      onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                      className="w-full text-left p-6 md:p-8"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl md:text-3xl text-[#C4A574] font-light">{service.icon}</div>
                          <h3 className="text-xl md:text-2xl font-light text-white tracking-tight">{service.title}</h3>
                        </div>
                        <div className="text-[#C4A574] text-lg md:text-xl flex-shrink-0 ml-4">
                          {expandedService === service.id ? '−' : '+'}
                        </div>
                      </div>
                      <p className="text-white/60 leading-relaxed font-light text-sm">
                        {service.shortDescription}
                      </p>
                    </button>

                    {/* Expanded Content */}
                    {expandedService === service.id && service.details && (
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/10 pt-4 md:pt-6 space-y-6">
                        <div>
                          <h4 className="text-lg md:text-xl font-light text-white mb-2 tracking-tight">{service.details.mainTitle}</h4>
                          <p className="text-white/70 font-light text-sm leading-relaxed">{service.details.subtitle}</p>
                        </div>

                        <div className="space-y-5">
                          {service.details.services.map((item, itemIdx) => (
                            <div key={itemIdx} className="border-l-2 border-[#C4A574]/30 pl-4 md:pl-5">
                              <h5 className="text-base md:text-lg font-light text-[#C4A574] mb-2">{item.name}</h5>
                              <p className="text-white/70 font-light text-xs md:text-sm mb-3 leading-relaxed">{item.description}</p>
                              <div className="mb-2">
                                <p className="text-white/60 text-xs uppercase tracking-wide mb-1.5">Includes:</p>
                                <ul className="space-y-1">
                                  {item.includes.map((include, includeIdx) => (
                                    <li key={includeIdx} className="text-white/70 text-xs md:text-sm font-light flex items-start">
                                      <span className="text-[#C4A574] mr-2 flex-shrink-0">•</span>
                                      <span>{include}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <p className="text-white/50 text-xs italic mt-2">
                                <span className="font-medium">Best for:</span> {item.bestFor}
                              </p>
                            </div>
                          ))}
                        </div>

                        {service.details.addOns && (
                          <div className="pt-4 border-t border-white/10">
                            <h5 className="text-base md:text-lg font-light text-[#C4A574] mb-3">Industry-Specific Add-Ons</h5>
                            <ul className="space-y-1.5">
                              {service.details.addOns.map((addOn, addOnIdx) => (
                                <li key={addOnIdx} className="text-white/70 text-xs md:text-sm font-light flex items-start">
                                  <span className="text-[#C4A574] mr-2 flex-shrink-0">•</span>
                                  <span>{addOn}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Slide 2: Our Firm */}
        <section
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getSlideClass(2)}`}
          style={{ zIndex: currentSlide === 2 ? 10 : 1 }}
        >
          <div className="h-screen flex flex-col bg-[#0f0f0f] pt-24 px-6 md:px-12 overflow-y-auto">
            <div className="max-w-6xl w-full mx-auto py-12 md:py-16">
              <h2 className="text-5xl md:text-6xl font-extralight mb-12 md:mb-16 tracking-tight text-center">Our Firm</h2>
              
              <div className="space-y-12 md:space-y-16">
                {/* Section 1: Sweat Equity Model */}
                <div className="border-b border-white/10 pb-12 md:pb-16">
                  <h3 className="text-3xl md:text-4xl font-extralight mb-6 md:mb-8 text-[#C4A574] tracking-tight">
                    The Sweat Equity Model
                  </h3>
                  <div className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed font-light">
                    <p className="text-xl md:text-2xl text-white/90">
                      <span className="text-[#C4A574] font-normal">Operator-First Sweat Equity.</span> We bring more than capital:
                      our team embeds alongside leadership, implementing operating systems, pricing guardrails, SOPs, and growth infrastructure.
                    </p>
                    <p>
                      We're not just investors—we're operators who roll up our sleeves. We partner with founders and management teams
                      to compound cash flow, professionalize operations, and scale companies sustainably.
                    </p>
                    <p className="text-white/60">
                      Our approach combines strategic investment with operational expertise, helping companies scale sustainably
                      while building strong, professional foundations.
                    </p>
                  </div>
                </div>

                {/* Section 2: Marketing & Consulting Services */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-extralight mb-6 md:mb-8 text-[#C4A574] tracking-tight">
                    Marketing & Consulting Services
                  </h3>
                  <div className="space-y-6 text-base md:text-lg text-white/70 leading-relaxed font-light">
                    <p className="text-xl md:text-2xl text-white/90">
                      Beyond investment, we provide hands-on <span className="text-[#C4A574] font-normal">marketing, branding, and consulting services</span> that directly impact your bottom line.
                    </p>
                    <p>
                      Our team brings real-world operational experience to every partnership. We understand the challenges of growth
                      because we've lived them—from marketing campaigns to brand strategy, from operational consulting to financial optimization.
                    </p>
                    <p className="text-white/60">
                      Whether you need strategic marketing campaigns, a complete brand identity, or operational consulting to optimize
                      your business, we provide the hands-on expertise that drives results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3: Approach */}
        <section
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getSlideClass(3)}`}
          style={{ zIndex: currentSlide === 3 ? 10 : 1 }}
        >
          <div className="h-screen flex flex-col bg-[#0a0a0a] pt-24 px-6 md:px-12 overflow-y-auto">
            <div className="max-w-6xl w-full mx-auto py-12 md:py-16">
              <div className="mb-12 md:mb-16 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 md:mb-6 tracking-tight">How We Drive Growth</h2>
                <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto">
                  A clear, execution-driven system that turns attention into customers and customers into cash.
                </p>
              </div>
              
              {/* Numbered Flow: 1 → 2 → 3 → 4 */}
              <div className="space-y-6 md:space-y-8">
                {[
                  {
                    number: "01",
                    title: "Market & Revenue Strategy",
                    subtext: "We define who you're targeting, how you win, and what success actually looks like before anything gets built.",
                    bullets: [
                      "Ideal customer & offer clarity",
                      "Competitive positioning",
                      "Pricing & growth levers"
                    ],
                    tagline: "Consulting-first, not design-first"
                  },
                  {
                    number: "02",
                    title: "Brand & Conversion Messaging",
                    subtext: "Your brand isn't just how it looks — it's who you are as a company and what you stand for.",
                    bullets: [
                      "Brand identity & tone",
                      "Website messaging hierarchy",
                      "Conversion-focused copy"
                    ],
                    tagline: "Built to convert, not just impress"
                  },
                  {
                    number: "03",
                    title: "Web & Growth Infrastructure",
                    subtext: "We build fast, scalable websites and systems that support marketing, sales, and operations — not bottlenecks.",
                    bullets: [
                      "Conversion-optimized websites",
                      "CRM, forms, automations",
                      "Analytics & tracking"
                    ],
                    tagline: "Your site as a growth engine"
                  },
                  {
                    number: "04",
                    title: "Execution, Reporting & Optimization",
                    subtext: "We don't disappear after launch. We measure what matters, iterate fast, and keep growth moving.",
                    bullets: [
                      "Ongoing optimization",
                      "Performance reporting",
                      "Strategic check-ins"
                    ],
                    tagline: "Sustained growth, not one-off projects"
                  }
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-6 md:p-8 transition-all duration-500"
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      {/* Number Badge */}
                      <div className="flex-shrink-0">
                        <div className="text-2xl md:text-3xl font-light text-[#C4A574] mb-1">
                          {step.number}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-light mb-2 md:mb-3 text-white tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-white/70 font-light text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                          {step.subtext}
                        </p>
                        <ul className="space-y-1.5 mb-3">
                          {step.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx} className="text-white/60 text-xs md:text-sm font-light flex items-start">
                              <span className="text-[#C4A574] mr-2 flex-shrink-0">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-[#C4A574]/80 text-xs md:text-sm font-light italic">
                          {step.tagline}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-12 md:mt-16 text-center">
                <button
                  onClick={() => goToSlide(1)}
                  className="inline-flex items-center gap-2 text-[#C4A574] hover:text-[#D4B584] text-sm md:text-base uppercase tracking-[0.15em] font-light transition-colors"
                >
                  See how this works for your business
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4: Our Partners */}
        <section
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getSlideClass(4)}`}
          style={{ zIndex: currentSlide === 4 ? 10 : 1 }}
        >
          <div className="h-screen flex flex-col bg-[#0f0f0f] pt-24 px-6 md:px-12 overflow-y-auto">
            <div className="max-w-6xl w-full mx-auto flex flex-col flex-1">
              {/* Header Section */}
              <div className="mb-8 md:mb-12 text-center flex-shrink-0">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 md:mb-6 tracking-tight">Portfolio</h2>
                <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto mb-2 md:mb-4">
                  We partner with companies at the early-stage and lower middle-market growth stage
                </p>
                <p className="text-xs md:text-sm text-white/40 font-light">
                  Typically with $1M–$10M in annual revenue
                </p>
              </div>
              
              {/* Partners Carousel Container */}
              <div className="flex-1 flex flex-col items-center justify-center min-h-0 relative">
                <div 
                  className="relative w-full max-w-5xl mx-auto"
                  onMouseEnter={() => setIsPortfolioPaused(true)}
                  onMouseLeave={() => setIsPortfolioPaused(false)}
                >
                  {/* Navigation Arrows */}
                  <button
                    onClick={() => setCurrentPortfolioIndex((prev) => (prev - 1 + portfolioCompanies.length) % portfolioCompanies.length)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-10 lg:-translate-x-12 text-white/40 hover:text-white/80 transition-colors z-30 bg-[#0f0f0f]/50 backdrop-blur-sm p-2 rounded-full"
                    aria-label="Previous company"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setCurrentPortfolioIndex((prev) => (prev + 1) % portfolioCompanies.length)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-10 lg:translate-x-12 text-white/40 hover:text-white/80 transition-colors z-30 bg-[#0f0f0f]/50 backdrop-blur-sm p-2 rounded-full"
                    aria-label="Next company"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  {/* Company Cards */}
                  <div className="relative w-full min-h-[500px] md:min-h-[600px]">
                    {portfolioCompanies.map((company, idx) => {
                      const isActive = idx === currentPortfolioIndex
                      const offset = idx - currentPortfolioIndex
                      
                      return (
                        <div
                          key={company.name}
                          className={`transition-all duration-700 ease-in-out ${
                            isActive 
                              ? 'opacity-100 translate-x-0 scale-100 z-10 relative' 
                              : 'absolute inset-0 opacity-0 translate-x-full scale-95 z-0 pointer-events-none'
                          } ${offset < 0 ? '-translate-x-full' : ''}`}
                        >
                          <div className="flex flex-col items-center justify-center w-full h-full py-8">
                            {/* Logo */}
                            {company.hasLogo ? (
                              <button
                                onClick={() => setExpandedCompany(expandedCompany === idx ? null : idx)}
                                className="mb-6 md:mb-8 w-full flex items-center justify-center cursor-pointer group transition-transform duration-300 hover:scale-105"
                              >
                                <div className={`w-full max-w-[900px] md:max-w-[1200px] lg:max-w-[1400px] aspect-[3/1] flex items-center justify-center ${
                                  company.name === "Restorative Acres" ? "relative" : ""
                                }`}>
                                  {company.name === "Restorative Acres" ? (
                                    <div 
                                      className="w-full h-full"
                                      style={{
                                        backgroundImage: `url(${company.logo})`,
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        mixBlendMode: 'lighten',
                                        filter: 'brightness(1.3) contrast(1.1)'
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={company.logo!}
                                      alt={`${company.name} logo`}
                                      className="w-full h-full object-contain opacity-100 transition-all"
                                    />
                                  )}
                                </div>
                              </button>
                            ) : (
                              <div className="mb-6 md:mb-8 text-5xl md:text-6xl text-[#C4A574] font-light">—</div>
                            )}
                            
                            {/* Company Name */}
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-light mb-4 md:mb-6 text-white tracking-tight">
                              {company.name}
                            </h3>
                            
                            {/* Expanded Company Info */}
                            <div className={`w-full max-w-3xl mx-auto overflow-hidden transition-all duration-500 ease-in-out ${
                              expandedCompany === idx ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                            }`}>
                              <div className="text-left space-y-4 pt-6 border-t border-white/10">
                                <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
                                  {company.description}
                                </p>
                                <p className="text-white/50 text-xs md:text-sm uppercase tracking-[0.1em] font-light">
                                  {company.industry}
                                </p>
                                {company.website && (
                                  <a
                                    href={company.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block text-[#C4A574] hover:text-[#D4B584] text-xs md:text-sm uppercase tracking-[0.1em] font-light transition-colors mt-2 underline"
                                  >
                                    Visit Website →
                                  </a>
                                )}
                                <button
                                  onClick={() => setExpandedCompany(null)}
                                  className="block text-[#C4A574] hover:text-[#D4B584] text-xs md:text-sm uppercase tracking-[0.1em] font-light transition-colors mt-4"
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                            
                            {/* Click to Learn More Hint */}
                            {expandedCompany !== idx && (
                              <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-light mt-4">
                                Click logo to learn more
                              </p>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8 md:mt-12 flex-shrink-0">
                  {portfolioCompanies.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPortfolioIndex(idx)}
                      className={`transition-all duration-300 ${
                        idx === currentPortfolioIndex
                          ? 'w-8 h-1 bg-[#C4A574]'
                          : 'w-1 h-1 bg-white/30 hover:bg-white/50'
                      } rounded-full`}
                      aria-label={`Go to ${portfolioCompanies[idx].name}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 5: How We Help */}
        <section
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getSlideClass(5)}`}
          style={{ zIndex: currentSlide === 5 ? 10 : 1 }}
        >
          <div className="h-screen flex items-center justify-center bg-[#0a0a0a] pt-24 px-6 md:px-12">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-8 md:mb-12 tracking-tight text-center">
                How We Help You Grow
              </h2>
              <div className="space-y-6 md:space-y-8 text-base md:text-lg text-white/70 leading-relaxed font-light">
                <p className="text-center text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                  We help small businesses grow faster and smarter through clear strategy, strong branding, and execution that actually gets done.
                </p>
                <p className="text-center max-w-3xl mx-auto">
                  From marketing and brand positioning to operational consulting and custom web development, we partner closely with business owners to solve real problems—more leads, clearer messaging, better systems, and sustainable growth.
                </p>
                <p className="text-center text-white/60 max-w-2xl mx-auto italic">
                  No fluff. No theory decks. Just practical expertise and hands-on support designed to move your business forward.
                </p>
                <div className="mt-10 md:mt-12 text-center space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => goToSlide(6)}
                      className="px-8 md:px-10 py-3 md:py-4 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-sm uppercase tracking-[0.2em] transition-all duration-300"
                    >
                      Work With Us
                    </button>
                    <button
                      onClick={() => goToSlide(1)}
                      className="px-8 md:px-10 py-3 md:py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 font-light text-sm uppercase tracking-[0.2em] transition-all duration-300"
                    >
                      See Our Services
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 6: Contact */}
        <section
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${getSlideClass(6)}`}
          style={{ zIndex: currentSlide === 6 ? 10 : 1 }}
        >
          {/* Background Image */}
          {/* To use your own image, place it in the public folder and change the URL to: url('/your-image-name.jpg') */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            }}
          >
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/80 via-[#0a0a0a]/70 to-[#0a0a0a]/85" />
            {/* Additional subtle overlay for better contrast */}
            <div className="absolute inset-0 bg-[#0a0a0a]/40" />
          </div>
          <div className="h-screen flex items-center justify-center relative pt-24 px-8 md:px-16">
            <div className="max-w-4xl text-center relative z-10">
              <h2 className="text-5xl md:text-6xl font-extralight mb-8 tracking-tight">Let's Build Something Enduring</h2>
              <p className="text-xl md:text-2xl text-white/70 mb-6 leading-relaxed font-light max-w-2xl mx-auto">
                Ready to scale your business? Whether you need investment, marketing, branding, or consulting services,
                we're here to help.
              </p>
              <p className="text-base text-white/40 mb-12 font-light tracking-wide">
                New York-based. Partnering with operators across the U.S.
              </p>
              <div className="space-y-6">
                <a
                  href="mailto:contact@dwgrowthcapital.com"
                  className="inline-block group relative px-10 py-4 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-sm uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Get In Touch</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </a>
                <div className="pt-4">
                  <button
                    onClick={() => goToSlide(0)}
                    className="text-white/40 hover:text-white/60 transition-colors text-sm font-light tracking-wide"
                  >
                    Back to top
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
