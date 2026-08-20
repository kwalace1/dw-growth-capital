"use client"

import { useState, useEffect, useCallback, useRef, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SERVICE_OFFERINGS } from "@/data/services"
import { HOME_SECTIONS, totalSlides } from "@/data/nav"
import { SiteHeader } from "@/components/SiteHeader"
import { SectionIntro } from "@/components/SectionIntro"

const portfolioCompanies = [
  {
    name: "Katana",
    logo: "/katana-logo.png",
    description:
      "An AI technology and data company building operating systems for how companies run, how data moves, and how people get through the day—Katana Business, Katana Switch, and Katana Personal.",
    industry: "AI · Data · Operations",
    website: "https://www.katanats.com/",
  },
  {
    name: "Pristine Worx",
    logo: "/pristine-worx-logo.png",
    description:
      "Professional auto detailing in Broomall, Pennsylvania—ceramic coatings, valet, and restoration built around a premium customer experience.",
    industry: "Automotive services",
    website: "https://pristineworxautodetailing.com/",
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

  const setSectionRef = (index: number) => (el: HTMLElement | null) => {
    sectionRefs.current[index] = el
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-cream">
      <SiteHeader currentSlide={currentSlide} onNavigateSlide={scrollToSection} />

      <nav
        className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden xl:block"
        aria-label="Page sections"
      >
        <div className="space-y-3">
          {HOME_SECTIONS.map((section, index) => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(index)}
              className={`block rounded-full transition-all duration-500 ${
                currentSlide === index ? "w-1.5 h-7 bg-gold" : "w-1.5 h-1.5 bg-cream/25 hover:bg-cream/50"
              }`}
              aria-label={section.label}
              aria-current={currentSlide === index ? "true" : undefined}
            />
          ))}
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 right-0 h-px bg-white/5 z-50">
        <div
          className="h-full bg-gold transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <main className="relative w-full">
        <section
          ref={setSectionRef(0)}
          id="section-0"
          className="relative min-h-[100dvh] scroll-mt-[5.5rem] flex flex-col lg:flex-row"
        >
          <div
            className="absolute inset-0 lg:hidden bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')`,
            }}
          >
            <div className="absolute inset-0 bg-ink/75" />
          </div>

          <div className="relative z-10 flex flex-1 flex-col justify-center w-full lg:w-[56%] page-gutter-x pt-28 pb-16 lg:py-0 lg:bg-ink">
            <p className="kicker mb-6">Operator-first sweat equity</p>
            <h1 className="display text-[2.15rem] sm:text-5xl lg:text-6xl xl:text-[4.15rem] leading-[1.08] mb-8 max-w-xl">
              Backing Builders.
              <br />
              <span className="text-gold">Creating Operators.</span>
              <br />
              Scaling Companies.
            </h1>
            <div className="h-px w-16 bg-gold mb-8" />
            <p className="text-base sm:text-lg text-cream/70 mb-10 max-w-lg leading-relaxed font-light">
              DW Growth & Capital partners with founders in the lower middle market. We put in work alongside capital:
              embedding to professionalize operations, unlock cash flow, and build companies that endure.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <button type="button" onClick={() => scrollToSection(1)} className="btn-gold">
                The Firm
              </button>
              <Link href="/get-in-touch" className="btn-ghost">
                Work With Us
              </Link>
            </div>
          </div>

          <div
            className="hidden lg:block lg:w-[44%] relative min-h-[100dvh] bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=88')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-ink/20 to-ink" />
            <div className="absolute inset-0 bg-[#071412]/25" />
          </div>
        </section>

        <section ref={setSectionRef(1)} id="section-1" className="relative scroll-mt-[5.5rem] bg-forest">
          <div className="page-gutter-x py-24 md:py-32">
            <div className="max-w-6xl mx-auto">
              <SectionIntro
                kicker="01 — The Firm"
                title="The Firm"
                subtitle="New York-based. Partnering with operators nationwide, typically at $1M–$10M in annual revenue."
              />
              <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                <div className="border-l border-gold/40 pl-6 md:pl-8">
                  <h3 className="font-serif text-2xl md:text-[1.75rem] mb-5 text-gold leading-snug">
                    Sweat equity, not sideline capital
                  </h3>
                  <div className="space-y-5 text-base md:text-[1.05rem] text-cream/70 leading-relaxed font-light">
                    <p>
                      We take a real seat next to leadership. Operating systems, pricing guardrails, SOPs, and growth
                      infrastructure get installed in the business—not presented in a deck.
                    </p>
                    <p className="text-cream/50">
                      The goal is durable cash flow and a company that can run without heroics from the founder.
                    </p>
                  </div>
                </div>
                <div className="border-l border-gold/40 pl-6 md:pl-8">
                  <h3 className="font-serif text-2xl md:text-[1.75rem] mb-5 text-gold leading-snug">
                    Execution is the investment
                  </h3>
                  <div className="space-y-5 text-base md:text-[1.05rem] text-cream/70 leading-relaxed font-light">
                    <p>
                      Strategy, brand, demand, and digital buildout are how we show up inside a partnership—not a
                      separate agency menu. We use them to move the P&amp;L.
                    </p>
                    <p className="text-cream/50">
                      If a company only needs a vendor, we are the wrong call. If it needs an operator in the arena, that
                      is the work.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={setSectionRef(2)} id="section-2" className="relative scroll-mt-[5.5rem] bg-ink">
          <div className="page-gutter-x py-24 md:py-32">
            <div className="max-w-6xl mx-auto">
              <SectionIntro
                kicker="02 — Approach"
                title="How We Partner"
                subtitle="A repeatable operating sequence: underwrite, install, run, compound."
              />
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-px bg-white/10 border border-white/10">
                {approachSteps.map((step) => (
                  <div key={step.number} className="bg-ink p-6 md:p-8">
                    <p className="font-serif text-gold text-lg mb-4">{step.number}</p>
                    <h3 className="font-serif text-xl text-cream mb-3 leading-snug">{step.title}</h3>
                    <p className="text-cream/65 font-light text-sm leading-relaxed mb-5">{step.subtext}</p>
                    <ul className="space-y-2">
                      {step.bullets.map((bullet) => (
                        <li key={bullet} className="text-cream/50 text-xs font-light leading-relaxed pl-3 border-l border-gold/30">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={setSectionRef(3)} id="section-3" className="relative scroll-mt-[5.5rem] bg-forest">
          <div className="page-gutter-x py-24 md:py-32">
            <div className="max-w-6xl mx-auto">
              <SectionIntro
                kicker="03 — Portfolio"
                title="Portfolio"
                subtitle="Early-stage and lower-middle-market companies we back as operators."
              />
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {portfolioCompanies.map((company) => (
                  <article key={company.name} className="surface flex flex-col overflow-hidden group">
                    <div className="h-40 md:h-52 bg-ink flex items-center justify-center px-6 md:px-8">
                      <img
                        src={company.logo}
                        alt={`${company.name} logo`}
                        className="max-h-32 md:max-h-40 w-auto max-w-full object-contain"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-1 border-t border-white/[0.06]">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-gold mb-2 font-light">
                        {company.industry}
                      </p>
                      <h3 className="font-serif text-2xl text-cream mb-3">{company.name}</h3>
                      <p className="text-sm text-cream/60 font-light leading-relaxed flex-1">{company.description}</p>
                      {company.website ? (
                        <a
                          href={company.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 text-[11px] uppercase tracking-[0.16em] text-gold hover:text-gold-light font-light"
                        >
                          Visit site →
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={setSectionRef(4)} id="section-4" className="relative scroll-mt-[5.5rem] bg-ink">
          <div className="page-gutter-x py-24 md:py-32">
            <div className="max-w-6xl mx-auto">
              <SectionIntro
                kicker="04 — Capabilities"
                title="How We Execute"
                subtitle="Capabilities we bring inside a partnership—not a menu of standalone retainers."
              />
              <div className="grid md:grid-cols-2 gap-4 md:gap-5">
                {SERVICE_OFFERINGS.map((service, idx) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="group surface p-6 md:p-8 hover:border-gold/35 transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <span className="font-serif text-gold/80 text-sm">0{idx + 1}</span>
                      <span className="text-gold text-sm opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden>
                        →
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl text-cream mb-3 tracking-tight">{service.title}</h3>
                    <p className="text-cream/60 font-light text-sm leading-relaxed">{service.shortDescription}</p>
                  </Link>
                ))}
              </div>

              <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-gold/25 bg-gold/[0.06] px-6 py-8 md:px-10 md:py-10">
                <p className="text-sm md:text-base text-cream/70 font-light max-w-xl leading-relaxed">
                  Packages exist for founders who want a defined engagement. Most of our work is structured as a
                  partnership. If the fit is right, we design the deal around the company.
                </p>
                <Link href="/get-in-touch" className="btn-gold shrink-0">
                  Start a conversation
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section ref={setSectionRef(5)} id="section-5" className="relative scroll-mt-[5.5rem] bg-forest">
          <div className="page-gutter-x py-28 md:py-36">
            <div className="max-w-3xl mx-auto text-center">
              <p className="kicker mb-5">Next step</p>
              <h2 className="display text-4xl sm:text-5xl md:text-6xl leading-[1.12] mb-6">
                Let&apos;s Build Something That Lasts.
              </h2>
              <div className="h-px w-16 bg-gold mx-auto mb-8" />
              <p className="text-lg md:text-xl text-cream/65 mb-10 leading-relaxed font-light">
                If you are a founder or operator ready for a partner in the business—not a vendor on the outside—tell us
                what you are building.
              </p>
              <Link href="/get-in-touch" className="btn-gold">
                Work With Us
              </Link>
              <div className="pt-10">
                <button
                  type="button"
                  onClick={() => scrollToSection(0)}
                  className="text-cream/35 hover:text-cream/60 transition-colors text-xs uppercase tracking-[0.18em] font-light"
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
        <div className="h-screen bg-ink text-cream flex items-center justify-center font-light tracking-wide">
          Loading…
        </div>
      }
    >
      <HomePageContent />
    </Suspense>
  )
}
