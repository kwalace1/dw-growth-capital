"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getServicesNavLinks } from "@/data/services"
import { HOME_SLIDE_LINKS } from "@/data/nav"

const navClass = (active: boolean) =>
  `text-[11px] font-light tracking-[0.16em] uppercase transition-colors duration-300 relative group ${
    active ? "text-gold" : "text-cream/55 hover:text-cream"
  }`

type SiteHeaderProps = {
  currentSlide?: number
  onNavigateSlide?: (index: number) => void
}

export function SiteHeader({ currentSlide = -1, onNavigateSlide }: SiteHeaderProps) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const serviceLinks = getServicesNavLinks()
  const servicesActive = pathname === "/services" || pathname.startsWith("/services/") || currentSlide === 4

  useEffect(() => {
    if (!servicesMenuOpen) return
    const onDown = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [servicesMenuOpen])

  useEffect(() => {
    if (!servicesMenuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setServicesMenuOpen(false)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [servicesMenuOpen])

  const closeAll = () => {
    setServicesMenuOpen(false)
    setMobileMenuOpen(false)
    setMobileServicesOpen(false)
  }

  const goHome = () => {
    closeAll()
    if (isHome && onNavigateSlide) onNavigateSlide(0)
  }

  const goSlide = (slide: number) => {
    closeAll()
    if (isHome && onNavigateSlide) onNavigateSlide(slide)
  }

  return (
    <header
      className={`${
        isHome ? "fixed top-0 left-0 right-0" : "sticky top-0"
      } z-50 flex items-center justify-between page-gutter-x py-5 bg-ink/90 backdrop-blur-xl border-b border-white/[0.06]`}
    >
      {isHome && onNavigateSlide ? (
        <button type="button" onClick={goHome} className="flex items-center gap-2 text-left">
          <span className="text-2xl md:text-[1.75rem] font-serif text-gold font-normal leading-none">DW</span>
          <span className="text-[11px] md:text-xs font-sans text-cream/85 font-light tracking-[0.14em] uppercase hidden sm:block">
            GROWTH & CAPITAL
          </span>
        </button>
      ) : (
        <Link href="/" className="flex items-center gap-2" onClick={closeAll}>
          <span className="text-2xl md:text-[1.75rem] font-serif text-gold font-normal leading-none">DW</span>
          <span className="text-[11px] md:text-xs font-sans text-cream/85 font-light tracking-[0.14em] uppercase hidden sm:block">
            GROWTH & CAPITAL
          </span>
        </Link>
      )}

      <nav className="hidden lg:flex items-center gap-7">
        {isHome && onNavigateSlide ? (
          <button type="button" onClick={() => goSlide(0)} className={navClass(currentSlide === 0)}>
            Home
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  currentSlide === 0 ? "w-full" : "w-0 group-hover:w-full"
                }`}
            />
          </button>
        ) : (
          <Link href="/" className={navClass(pathname === "/")} onClick={closeAll}>
            Home
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
                }`}
            />
          </Link>
        )}

        {HOME_SLIDE_LINKS.map((item) =>
          isHome && onNavigateSlide ? (
            <button
              key={item.label}
              type="button"
              onClick={() => goSlide(item.slide)}
              className={navClass(currentSlide === item.slide)}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  currentSlide === item.slide ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ) : (
            <Link
              key={item.label}
              href={`/?slide=${item.slide}`}
              className={navClass(false)}
              onClick={closeAll}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 w-0 group-hover:w-full" />
            </Link>
          )
        )}

        <div className="relative" ref={servicesRef}>
          <button
            type="button"
            onClick={() => setServicesMenuOpen((o) => !o)}
            className={navClass(servicesActive)}
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
              className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                servicesActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </button>
          {servicesMenuOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[60]" role="menu">
              <div className="min-w-[18rem] py-2 bg-forest border border-white/10">
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    role="menuitem"
                    className="block px-4 py-2.5 text-left text-xs font-light tracking-wide text-cream/80 hover:text-gold hover:bg-white/5 transition-colors"
                    onClick={() => setServicesMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link href="/get-in-touch" className="btn-gold !px-5 !py-2.5 !text-[10px]" onClick={closeAll}>
          Contact
        </Link>
      </nav>

      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="lg:hidden text-cream/55 hover:text-cream transition-colors"
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileMenuOpen}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-ink/98 backdrop-blur-2xl pt-24">
          <nav className="flex flex-col gap-1 page-gutter-x overflow-y-auto max-h-[calc(100vh-6rem)] pb-12">
            {isHome && onNavigateSlide ? (
              <button
                type="button"
                onClick={() => goSlide(0)}
                className={`text-left py-4 px-0 text-lg font-light tracking-wide border-b border-white/5 ${
                  currentSlide === 0 ? "text-gold" : "text-cream/55"
                }`}
              >
                Home
              </button>
            ) : (
              <Link
                href="/"
                className="text-left py-4 px-0 text-lg font-light tracking-wide text-cream/55 hover:text-cream border-b border-white/5"
                onClick={closeAll}
              >
                Home
              </Link>
            )}

            {HOME_SLIDE_LINKS.map((item) =>
              isHome && onNavigateSlide ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => goSlide(item.slide)}
                  className={`text-left py-4 px-0 text-lg font-light tracking-wide border-b border-white/5 ${
                    currentSlide === item.slide ? "text-gold" : "text-cream/55"
                  }`}
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={`/?slide=${item.slide}`}
                  className="text-left py-4 px-0 text-lg font-light tracking-wide text-cream/55 hover:text-cream border-b border-white/5"
                  onClick={closeAll}
                >
                  {item.label}
                </Link>
              )
            )}

            <div className="border-b border-white/5">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((o) => !o)}
                className={`flex items-center justify-between w-full text-left py-4 px-0 text-lg font-light tracking-wide ${
                  mobileServicesOpen || servicesActive ? "text-gold" : "text-cream/55"
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
                <div className="pl-3 pb-4 space-y-2 border-l border-gold/20 ml-1">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-2 text-sm font-light text-cream/70 hover:text-gold pl-2 -ml-2"
                      onClick={closeAll}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/get-in-touch" className="btn-gold mt-6 w-full" onClick={closeAll}>
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
