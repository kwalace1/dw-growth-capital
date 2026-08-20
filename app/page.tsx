"use client"

import { useState, useEffect, useCallback, useRef, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SERVICE_OFFERINGS } from "@/data/services"
import { HOME_SECTIONS, totalSlides } from "@/data/nav"
import { SiteHeader } from "@/components/SiteHeader"

const portfolioCompanies = [
  {
    name: "Katana Tech",
    logo: "/katana-logo-transparent.png",
    description:
      "A modern operations platform connecting projects, customers, inventory, and reporting so teams can run the business from one place.",
    industry: "Business operations software",
    website: "https://zenith-iota.vercel.app/",
  },
  {
    name: "Pristine Worx",
    logo: "/pristine-worx-logo.png",
    description:
      "Professional auto detailing in Broomall, Pennsylvania—ceramic coatings, valet, and restoration built around a premium customer experience.",
    industry: "Automotive services",
    website: "https://pristineworxautodetailing.com/",
  },
  {
    name: "Restorative Acres",
    logo: "/restorative-acres-logo.png",
    blend: true,
    description:
      "A Maryland retreat offering nature-based and animal-assisted mental health care for rural communities that traditional clinics underserve.",
    industry: "Mental health & wellness",
    website: "",
  },
]

const approachSteps = [
  {
    number: "01",
    title: "Underwrite the business",
    subtext: "We define who you serve, how you win, and which levers actually move cash flow—before anything gets built.",
    bullets: ["Offer and customer clarity", "Pricing and margin", "Where we embed"],
  },
  {
    number: "02",
    title: "Install the operating system",
    subtext: "Brand, messaging, and the site become tools for conversion and hiring—not decoration.",
    bullets: ["Positioning and identity", "Conversion-focused site", "CRM, tracking, handoffs"],
  },
  {
    number: "03",
    title: "Run growth with discipline",
    subtext: "Demand generation, process, and reporting sit with operators who stay after launch.",
    bullets: ["Campaigns that feed the funnel", "SOPs and capacity", "KPIs leadership actually uses"],
  },
  {
    number: "04",
    title: "Compound and professionalize",
    subtext: "We keep iterating until the company runs with less founder gravity and more enterprise value.",
    bullets: ["Monthly operating cadence", "Hire and role design", "Ready for the next stage of capital"],
  },
]

function HomePageContent() {
  const searchParams = useSearchParams()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSlides) return
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" })
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
        if (el.offsetTop <= y + 1) active = i
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

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white">
      <SiteHeader currentSlide={currentSlide} onNavigateSlide={scrollToSection} />

      <nav className="fixed right-5 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 z-40 hidden lg:block" aria-label="Page sections">
        <div className="space-y-4">
          {HOME_SECTIONS.map((section, index) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(index)}
              className={`block transition-all duration-500 ${
                currentSlide === index ? "w-2 h-8 bg-[#C4A574]" : "w-1 h-1 bg-white/20 hover:bg-white/40"
              } rounded-full`}
              aria-label={section.label}
              aria-current={currentSlide === index ? "true" : undefined}
            />
          ))}
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-white/5 z-50">
        <div
          className="h-full bg-[#C4A574] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="relative w-full">
        <section
          ref={(el) => {
            sectionRefs.current[0] = el
          }}
          id="section-0"
          className="relative min-h-[100dvh] min-h-screen scroll-mt-[5.5rem] flex flex-col"
        >
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
            <p className="text-[10px] md:text-xs font-light uppercase tracking-[0.28em] text-[#C4A574] mb-6">
              Operator-first sweat equity
            </p>
            <h1 className="text-[1.65rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight mb-6 sm:mb-8 md:mb-10 leading-[1.12] sm:leading-[1.1] tracking-tight">
              Backing Builders.
              <br />
              <span className="text-[#C4A574] font-light">Creating Operators.</span>
              <br />
              Scaling Companies.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/72 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              DW Growth & Capital partners with founders in the lower middle market. We put in work alongside capital:
              embedding to professionalize operations, unlock cash flow, and build companies that endure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center w-full sm:w-auto mx-auto">
              <button
                type="button"
                onClick={() => scrollToSection(1)}
                className="group relative px-10 py-4 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-sm uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">The Firm</span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <Link
                href="/get-in-touch"
                className="px-10 py-4 bg-transparent hover:bg-white/5 text-white border border-white/20 hover:border-white/40 font-light text-sm uppercase tracking-[0.2em] transition-all duration-300 text-center"
              >
                Work With Us
              </Link>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            sectionRefs.current[1] = el
          }}
          id="section-1"
          className="relative min-h-screen scroll-mt-[5.5rem] bg-[#0f0f0f]"
        >
          <div className="flex flex-col pt-24 page-gutter-x pb-24 md:pb-28">
            <div className="max-w-6xl w-full mx-auto py-12 md:py-16">
              <h2 className="text-5xl md:text-6xl font-extralight mb-6 md:mb-8 tracking-tight text-center">The Firm</h2>
              <p className="text-center text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto mb-12 md:mb-16">
                New York-based. Partnering with operators nationwide, typically at $1M–$10M in annual revenue.
              </p>

              <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extralight mb-5 text-[#C4A574] tracking-tight">
                    Sweat equity, not sideline capital
                  </h3>
                  <div className="space-y-5 text-base md:text-lg text-white/70 leading-relaxed font-light">
                    <p>
                      We take a real seat next to leadership. Operating systems, pricing guardrails, SOPs, and growth
                      infrastructure get installed in the business—not presented in a deck.
                    </p>
                    <p className="text-white/55">
                      The goal is durable cash flow and a company that can run without heroics from the founder.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-extralight mb-5 text-[#C4A574] tracking-tight">
                    Execution is the investment
                  </h3>
                  <div className="space-y-5 text-base md:text-lg text-white/70 leading-relaxed font-light">
                    <p>
                      Strategy, brand, demand, and digital buildout are how we show up inside a partnership—not a
                      separate agency menu. We use them to move the P&amp;L.
                    </p>
                    <p className="text-white/55">
                      If a company only needs a vendor, we are the wrong call. If it needs an operator in the arena, that
                      is the work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            sectionRefs.current[2] = el
          }}
          id="section-2"
          className="relative min-h-screen scroll-mt-[5.5rem] bg-[#0a0a0a]"
        >
          <div className="flex flex-col pt-24 page-gutter-x pb-24 md:pb-28">
            <div className="max-w-6xl w-full mx-auto py-12 md:py-16">
              <div className="mb-12 md:mb-16 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 md:mb-6 tracking-tight">
                  How We Partner
                </h2>
                <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto">
                  A repeatable operating sequence: underwrite, install, run, compound.
                </p>
              </div>

              <div className="space-y-6 md:space-y-8">
                {approachSteps.map((step) => (
                  <div
                    key={step.number}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 p-6 md:p-8 transition-all duration-500"
                  >
                    <div className="flex items-start gap-4 md:gap-6">
                      <div className="text-2xl md:text-3xl font-light text-[#C4A574] flex-shrink-0">{step.number}</div>
                      <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-light mb-2 md:mb-3 text-white tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-white/70 font-light text-sm md:text-base leading-relaxed mb-3 md:mb-4">
                          {step.subtext}
                        </p>
                        <ul className="space-y-1.5">
                          {step.bullets.map((bullet) => (
                            <li key={bullet} className="text-white/60 text-xs md:text-sm font-light flex items-start">
                              <span className="text-[#C4A574] mr-2 flex-shrink-0">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            sectionRefs.current[3] = el
          }}
          id="section-3"
          className="relative min-h-screen scroll-mt-[5.5rem] bg-[#0f0f0f]"
        >
          <div className="flex flex-col pt-24 page-gutter-x pb-24 md:pb-28">
            <div className="max-w-6xl w-full mx-auto py-12 md:py-16">
              <div className="mb-12 md:mb-16 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 md:mb-6 tracking-tight">
                  Portfolio
                </h2>
                <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto">
                  Early-stage and lower-middle-market companies we back as operators.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {portfolioCompanies.map((company) => (
                  <article
                    key={company.name}
                    className="flex flex-col border border-white/10 bg-white/[0.03] p-6 md:p-8"
                  >
                    <div className="h-24 md:h-28 mb-6 flex items-center justify-center">
                      {company.blend ? (
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `url(${company.logo})`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            mixBlendMode: "lighten",
                            filter: "brightness(1.3) contrast(1.1)",
                          }}
                          role="img"
                          aria-label={`${company.name} logo`}
                        />
                      ) : (
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="max-h-full w-auto max-w-full object-contain"
                        />
                      )}
                    </div>
                    <h3 className="text-xl md:text-2xl font-light text-white tracking-tight mb-2">{company.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#C4A574]/90 mb-4 font-light">
                      {company.industry}
                    </p>
                    <p className="text-sm text-white/60 font-light leading-relaxed flex-1">{company.description}</p>
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 text-xs uppercase tracking-[0.15em] text-[#C4A574] hover:text-[#D4B584] font-light"
                      >
                        Visit site →
                      </a>
                    ) : (
                      <p className="mt-6 text-xs uppercase tracking-[0.15em] text-white/30 font-light">Private</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            sectionRefs.current[4] = el
          }}
          id="section-4"
          className="relative min-h-screen scroll-mt-[5.5rem] bg-[#0a0a0a]"
        >
          <div className="flex flex-col pt-24 page-gutter-x pb-24 md:pb-28">
            <div className="max-w-7xl w-full mx-auto py-8 md:py-12">
              <div className="mb-8 md:mb-12 text-center">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 tracking-tight">How We Execute</h2>
                <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto">
                  Capabilities we bring inside a partnership—not a menu of standalone retainers.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                {SERVICE_OFFERINGS.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="group block bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 p-6 md:p-8 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl md:text-2xl font-light text-white tracking-tight">{service.title}</h3>
                      <span className="text-[#C4A574] text-lg opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
                        →
                      </span>
                    </div>
                    <p className="text-white/60 font-light text-sm leading-relaxed">{service.shortDescription}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 border border-white/10 bg-white/[0.03] px-6 py-8 md:px-10 md:py-10 text-center sm:text-left">
                <p className="text-sm md:text-base text-white/60 font-light max-w-xl leading-relaxed">
                  Packages exist for founders who want a defined engagement. Most of our work is structured as a
                  partnership. If the fit is right, we design the deal around the company.
                </p>
                <Link
                  href="/get-in-touch"
                  className="shrink-0 px-8 py-3.5 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-xs uppercase tracking-[0.2em] transition-all duration-300"
                >
                  Start a conversation
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => {
            sectionRefs.current[5] = el
          }}
          id="section-5"
          className="relative min-h-[70vh] scroll-mt-[5.5rem] bg-[#0f0f0f] flex items-center"
        >
          <div className="w-full flex items-center justify-center py-24 md:py-32 page-gutter-x">
            <div className="max-w-3xl text-center">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight mb-6 md:mb-8 tracking-tight">
                Let&apos;s Build Something That Lasts.
              </h2>
              <p className="text-lg md:text-xl text-white/70 mb-10 md:mb-12 leading-relaxed font-light">
                If you are a founder or operator ready for a partner in the business—not a vendor on the outside—tell us
                what you are building.
              </p>
              <Link
                href="/get-in-touch"
                className="inline-block px-10 py-4 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-sm uppercase tracking-[0.2em] transition-all duration-300"
              >
                Work With Us
              </Link>
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => scrollToSection(0)}
                  className="text-white/40 hover:text-white/60 transition-colors text-sm font-light tracking-wide"
                >
                  Back to top
                </button>
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
