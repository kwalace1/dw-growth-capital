"use client"

import { useState, useEffect, useCallback, useRef, Suspense } from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { SERVICE_OFFERINGS, WEB_DEVELOPMENT_ID, getServicesNavLinks } from "@/data/services"
import { ServiceDetailsPanel } from "@/components/ServiceDetailsPanel"

type HomeNavItem =
  | { label: string; slide: number }
  | { label: string; href: string }

const navItems: HomeNavItem[] = [
  { label: "Home", slide: 0 },
  { label: "Services", slide: 1 },
  { label: "Get in touch", href: "/get-in-touch" },
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

function HomePageContent() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentPortfolioIndex, setCurrentPortfolioIndex] = useState(0)
  const [isPortfolioPaused, setIsPortfolioPaused] = useState(false)
  const [expandedCompany, setExpandedCompany] = useState<number | null>(null)
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const servicesDropdownRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const serviceNavLinks = getServicesNavLinks()

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides) return
    setMobileMenuOpen(false)
    setServicesMenuOpen(false)
    setMobileServicesOpen(false)
    const el = sectionRefs.current[index]
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }, [])

  useEffect(() => {
    const slide = searchParams.get("slide")
    if (slide === null) return
    const n = parseInt(slide, 10)
    if (Number.isNaN(n) || n < 0 || n >= totalSlides) return
    const id = requestAnimationFrame(() => {
      sectionRefs.current[n]?.scrollIntoView({ behavior: "auto", block: "start" })
      setCurrentSlide(n)
    })
    return () => cancelAnimationFrame(id)
  }, [searchParams])

  useEffect(() => {
    const HEADER_OFFSET = 96

    const updateFromScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)

      const y = window.scrollY + HEADER_OFFSET
      let active = 0
      for (let i = 0; i < totalSlides; i++) {
        const el = sectionRefs.current[i]
        if (!el) continue
        const top = el.offsetTop
        if (top <= y + 1) active = i
      }
      setCurrentSlide(active)
    }

    updateFromScroll()
    window.addEventListener("scroll", updateFromScroll, { passive: true })
    window.addEventListener("resize", updateFromScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", updateFromScroll)
      window.removeEventListener("resize", updateFromScroll)
    }
  }, [])

  useEffect(() => {
    if (!servicesMenuOpen) return
    const onPointerDown = (e: MouseEvent) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(e.target as Node)) {
        setServicesMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [servicesMenuOpen])

  useEffect(() => {
    if (!servicesMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesMenuOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [servicesMenuOpen])

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

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white">
      {/* Sophisticated Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between page-gutter-x py-6 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/5">
        <div 
          className="flex items-center gap-2 cursor-pointer group transition-opacity duration-300"
          onClick={() => scrollToSection(0)}
        >
          {/* Logo: DW in gold, GROWTH & CAPITAL in white (matching brand kit horizontal logo style, adapted for dark background) */}
          <span className="text-2xl md:text-3xl font-serif text-[#C4A574] font-normal leading-none">DW</span>
          <span className="text-xs md:text-sm font-sans text-white/90 font-light tracking-[0.1em] uppercase hidden sm:block">
            GROWTH & CAPITAL
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => {
            if (item.label === "Services") {
              return (
                <div key="Services" className="relative" ref={servicesDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setServicesMenuOpen((o) => !o)}
                    className={`text-xs font-light tracking-[0.15em] uppercase transition-all duration-300 relative group ${
                      currentSlide === 1 ? "text-[#C4A574]" : "text-white/60 hover:text-white"
                    }`}
                    aria-expanded={servicesMenuOpen}
                    aria-haspopup="menu"
                  >
                    Services
                    <svg
                      className={`inline-block ml-1 w-3 h-3 transition-transform ${servicesMenuOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-[#C4A574] transition-all duration-300 ${
                        currentSlide === 1 ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </button>
                  {servicesMenuOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[60]" role="menu">
                      <div className="min-w-[18rem] py-2 bg-[#121212] border border-white/10 shadow-2xl rounded-sm">
                        {serviceNavLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            role="menuitem"
                            className={`block px-4 py-2.5 text-left text-xs font-light tracking-wide transition-colors ${
                              link.href.endsWith(WEB_DEVELOPMENT_ID)
                                ? "bg-[#C4A574]/10 text-[#E8D4B0] border-l-2 border-[#C4A574] hover:bg-[#C4A574]/20"
                                : "text-white/80 hover:text-[#C4A574] hover:bg-white/5"
                            }`}
                            onClick={() => setServicesMenuOpen(false)}
                          >
                            {link.href.endsWith(WEB_DEVELOPMENT_ID) && (
                              <span className="mr-2 inline-block h-1 w-1 rounded-full bg-[#C4A574] align-middle shadow-[0_0_8px_#C4A574]" />
                            )}
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            }
            if ("href" in item) {
              const active = pathname === item.href
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-light tracking-[0.15em] uppercase transition-all duration-300 relative group ${
                    active ? "text-[#C4A574]" : "text-white/60 hover:text-white"
                  }`}
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setServicesMenuOpen(false)
                    setMobileServicesOpen(false)
                  }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#C4A574] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )
            }
            return (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.slide)}
                className={`text-xs font-light tracking-[0.15em] uppercase transition-all duration-300 relative group ${
                  currentSlide === item.slide ? "text-[#C4A574]" : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#C4A574] transition-all duration-300 ${
                    currentSlide === item.slide ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            )
          })}
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
          <nav className="flex flex-col gap-1 page-gutter-x overflow-y-auto max-h-[calc(100vh-6rem)] pb-12">
            {navItems.map((item) => {
              if (item.label === "Services") {
                return (
                  <div key="Services" className="border-b border-white/5">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((o) => !o)}
                      className={`flex items-center justify-between w-full text-left py-4 px-0 text-lg font-light tracking-wide transition-all ${
                        mobileServicesOpen || currentSlide === 1 ? "text-[#C4A574]" : "text-white/60"
                      }`}
                      aria-expanded={mobileServicesOpen}
                    >
                      Services
                      <svg
                        className={`w-5 h-5 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-3 pb-4 space-y-2 border-l border-[#C4A574]/20 ml-1">
                        {serviceNavLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={`block py-2 text-sm font-light rounded-sm pl-2 -ml-2 ${
                              link.href.endsWith(WEB_DEVELOPMENT_ID)
                                ? "text-[#E8D4B0] bg-[#C4A574]/10 border-l-2 border-[#C4A574]"
                                : "text-white/70 hover:text-[#C4A574]"
                            }`}
                            onClick={() => {
                              setMobileMenuOpen(false)
                              setMobileServicesOpen(false)
                            }}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              if ("href" in item) {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-left py-4 px-0 text-lg font-light tracking-wide transition-all border-b border-white/5 block ${
                      active
                        ? "text-[#C4A574] border-[#C4A574]/30"
                        : "text-white/60 hover:text-white hover:border-white/10"
                    }`}
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setMobileServicesOpen(false)
                    }}
                  >
                    {item.label}
                  </Link>
                )
              }
              return (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.slide)}
                  className={`text-left py-4 px-0 text-lg font-light tracking-wide transition-all border-b border-white/5 ${
                    currentSlide === item.slide
                      ? "text-[#C4A574] border-[#C4A574]/30"
                      : "text-white/60 hover:text-white hover:border-white/10"
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>
      )}

      {/* Slide Navigation Dots - More Refined */}
      <nav className="fixed right-5 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <div className="space-y-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              className={`block transition-all duration-500 ${
                currentSlide === index
                  ? "w-2 h-8 bg-[#C4A574]"
                  : "w-1 h-1 bg-white/20 hover:bg-white/40"
              } rounded-full`}
              aria-label={`Go to section ${index + 1}`}
            />
          ))}
        </div>
      </nav>

      {/* Progress Indicator - Subtle */}
      <div className="fixed bottom-0 left-0 right-0 h-px bg-white/5 z-50">
        <div 
          className="h-full bg-[#C4A574] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="relative w-full">
        {/* Section 0: Home - Hero */}
        <section
          ref={(el) => { sectionRefs.current[0] = el }}
          id="section-0"
          className="relative min-h-[100dvh] min-h-screen scroll-mt-[5.5rem] flex flex-col"
        >
          {/* Background — swap URL for a file in /public if you prefer */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2400&q=88')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/55 via-[#0a0a0a]/45 to-[#0a0a0a]/75" />
            <div className="absolute inset-0 bg-[#0a0a0a]/25" />
          </div>
          
          <div className="relative z-10 flex flex-1 flex-col justify-center w-full max-w-4xl mx-auto page-gutter-x py-24 sm:py-28 md:py-32 text-center">
            <h1 className="text-[1.65rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight mb-6 sm:mb-8 md:mb-10 leading-[1.12] sm:leading-[1.1] tracking-tight">
              Backing Builders.
              <br />
              <span className="text-[#C4A574] font-light">Creating Operators.</span>
              <br />
              Scaling Companies.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/72 mb-4 sm:mb-5 max-w-2xl mx-auto leading-relaxed font-light">
              DW Growth & Capital is a sweat equity firm that partners with founders and operators to build
              enduring, cash-flowing businesses. We professionalize operations, unlock growth, and scale companies with
              discipline and precision.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-white/58 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Through embedded execution across marketing, branding, and strategy, we act as true operators—not
              outside consultants—focused on one thing: creating lasting enterprise value.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto mx-auto">
                <button
                  onClick={() => scrollToSection(1)}
                  className="group relative px-10 py-4 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-sm uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Our Services</span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
                <button
                  onClick={() => scrollToSection(6)}
                  className="px-10 py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 font-light text-sm uppercase tracking-[0.2em] transition-all duration-300"
                >
                  Get In Touch
                </button>
              </div>
          </div>
        </section>

        {/* Section 1: Services */}
        <section
          ref={(el) => { sectionRefs.current[1] = el }}
          id="section-1"
          className="relative min-h-screen scroll-mt-[5.5rem] bg-[#0a0a0a]"
        >
          <div className="flex flex-col pt-24 page-gutter-x pb-24 md:pb-28">
            <div className="max-w-7xl w-full mx-auto py-8 md:py-12">
              <div className="mb-8 md:mb-12 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 tracking-tight">Our Services</h2>
                <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto">
                  Comprehensive solutions to accelerate your growth
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                {SERVICE_OFFERINGS.map((service, idx) => {
                  const isWebDev = service.id === WEB_DEVELOPMENT_ID
                  return (
                  <div
                    key={service.id}
                    className={`relative transition-all duration-500 cursor-pointer ${
                      isWebDev
                        ? expandedService === service.id
                          ? "md:col-span-3 bg-gradient-to-br from-[#C4A574]/15 via-white/[0.07] to-transparent border border-[#C4A574]/40 shadow-[0_0_40px_rgba(196,165,116,0.12)] animate-gold-spotlight"
                          : "md:col-span-3 border border-[#C4A574]/30 bg-gradient-to-br from-[#C4A574]/[0.08] to-transparent hover:border-[#C4A574]/45 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] animate-gold-spotlight"
                        : expandedService === service.id
                          ? "bg-white/10 border-white/20 md:col-span-3 border"
                          : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20"
                    }`}
                    style={{ transitionDelay: `${idx * 100}ms` }}
                  >
                    {isWebDev && (
                      <div
                        className="pointer-events-none absolute right-0 top-0 px-3 py-1 text-[9px] font-light uppercase tracking-[0.2em] text-[#0a0a0a] bg-[#C4A574]"
                        aria-hidden
                      >
                        Featured build
                      </div>
                    )}
                    <button
                      onClick={() => setExpandedService(expandedService === service.id ? null : service.id)}
                      className="w-full text-left p-6 md:p-8"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-wrap">
                          <div className={`text-[#C4A574] font-light ${isWebDev ? "text-3xl md:text-4xl drop-shadow-[0_0_10px_rgba(196,165,116,0.45)]" : "text-2xl md:text-3xl"}`}>{service.icon}</div>
                          <h3 className={`font-light text-white tracking-tight ${isWebDev ? "text-xl md:text-2xl" : "text-xl md:text-2xl"}`}>{service.title}</h3>
                        </div>
                        <div className="text-[#C4A574] text-lg md:text-xl flex-shrink-0 ml-4">
                          {expandedService === service.id ? '−' : '+'}
                        </div>
                      </div>
                      <p className={`leading-relaxed font-light text-sm ${isWebDev ? "text-white/75" : "text-white/60"}`}>
                        {service.shortDescription}
                      </p>
                    </button>

                    {/* Expanded Content */}
                    {expandedService === service.id && service.details && <ServiceDetailsPanel service={service} />}
                  </div>
                  )
                })}
              </div>

              <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 rounded-sm border border-white/10 bg-white/[0.03] px-6 py-8 md:px-10 md:py-10 text-center sm:text-left">
                <p className="text-sm md:text-base text-white/60 font-light max-w-xl leading-relaxed">
                  Need something tailored to your stage, industry, or capital structure? We design custom partnerships
                  when standard packages are not the right fit.
                </p>
                <Link
                  href="/get-in-touch"
                  className="shrink-0 px-8 py-3.5 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-xs uppercase tracking-[0.2em] transition-all duration-300"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Our Firm */}
        <section
          ref={(el) => { sectionRefs.current[2] = el }}
          id="section-2"
          className="relative min-h-screen scroll-mt-[5.5rem] bg-[#0f0f0f]"
        >
          <div className="flex flex-col pt-24 page-gutter-x pb-24 md:pb-28">
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

        {/* Section 3: Approach */}
        <section
          ref={(el) => { sectionRefs.current[3] = el }}
          id="section-3"
          className="relative min-h-screen scroll-mt-[5.5rem] bg-[#0a0a0a]"
        >
          <div className="flex flex-col pt-24 page-gutter-x pb-24 md:pb-28">
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
                  onClick={() => scrollToSection(1)}
                  className="inline-flex items-center gap-2 text-[#C4A574] hover:text-[#D4B584] text-sm md:text-base uppercase tracking-[0.15em] font-light transition-colors"
                >
                  See how this works for your business
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Our Partners */}
        <section
          ref={(el) => { sectionRefs.current[4] = el }}
          id="section-4"
          className="relative min-h-screen scroll-mt-[5.5rem] bg-[#0f0f0f]"
        >
          <div className="flex flex-col pt-24 page-gutter-x pb-24 md:pb-28 min-h-[80vh]">
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

        {/* Section 5: How We Help */}
        <section
          ref={(el) => { sectionRefs.current[5] = el }}
          id="section-5"
          className="relative min-h-screen scroll-mt-[5.5rem] bg-[#0a0a0a] flex items-center"
        >
          <div className="w-full flex items-center justify-center py-20 md:py-24 page-gutter-x">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-8 md:mb-10 tracking-tight text-center leading-[1.1]">
                Built to Scale.
                <br />
                <span className="text-[#C4A574] font-light">Designed to Endure.</span>
              </h2>
              <div className="space-y-6 md:space-y-8 text-base md:text-lg text-white/70 leading-relaxed font-light">
                <p className="text-center text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                  We partner with founders and operators to drive real growth—strengthening operations, accelerating
                  revenue, and building systems that last.
                </p>
                <p className="text-center max-w-3xl mx-auto text-white/75">
                  From marketing and branding to hands-on strategic execution, we embed ourselves in your business to
                  create measurable, long-term value.
                </p>
                <p className="text-center text-sm md:text-base text-white/45 max-w-2xl mx-auto tracking-wide">
                  New York-based. Partnering with operators nationwide.
                </p>
                <div className="mt-10 md:mt-12 text-center space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                      onClick={() => scrollToSection(6)}
                      className="px-8 md:px-10 py-3 md:py-4 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-sm uppercase tracking-[0.2em] transition-all duration-300"
                    >
                      Work With Us
                    </button>
                    <button
                      onClick={() => scrollToSection(1)}
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

        {/* Section 6: Contact */}
        <section
          ref={(el) => { sectionRefs.current[6] = el }}
          id="section-6"
          className="relative min-h-screen scroll-mt-[5.5rem]"
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
          <div className="min-h-screen flex items-center justify-center relative pt-24 page-gutter-x pb-24 md:pb-28">
            <div className="max-w-3xl text-center relative z-10">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight mb-6 md:mb-8 tracking-tight">
                Let&apos;s Build Something That Lasts.
              </h2>
              <p className="text-lg md:text-xl text-white/75 mb-5 md:mb-6 leading-relaxed font-light mx-auto">
                We partner with founders and operators to scale revenue, strengthen operations, and build businesses
                designed to endure.
              </p>
              <p className="text-base md:text-lg text-white/60 mb-10 md:mb-12 leading-relaxed font-light mx-auto">
                From capital to execution across marketing, branding, and strategy—we don&apos;t sit on the sidelines.
                We build with you.
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
                    onClick={() => scrollToSection(0)}
                    className="text-white/40 hover:text-white/60 transition-colors text-sm font-light tracking-wide"
                  >
                    Back to top
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="h-screen bg-[#0a0a0a] text-white flex items-center justify-center font-light tracking-wide">
          Loading…
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  )
}
