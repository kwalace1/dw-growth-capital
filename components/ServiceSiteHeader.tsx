"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { WEB_DEVELOPMENT_ID, getServicesNavLinks } from "@/data/services"

const slideLinks = [
  { label: "Home", slide: 0 },
  { label: "Our Firm", slide: 2 },
  { label: "Approach", slide: 3 },
  { label: "Our Partners", slide: 4 },
  { label: "How We Help", slide: 5 },
  { label: "Contact", slide: 6 },
] as const

export function ServiceSiteHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const servicesRef = useRef<HTMLDivElement>(null)
  const serviceLinks = getServicesNavLinks()

  const servicesActive = pathname === "/services" || pathname.startsWith("/services/")

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

  const navButtonClass = (active: boolean) =>
    `text-xs font-light tracking-[0.15em] uppercase transition-all duration-300 relative group ${
      active ? "text-[#C4A574]" : "text-white/60 hover:text-white"
    }`

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between page-gutter-x py-6 bg-[#0a0a0a]/95 backdrop-blur-2xl border-b border-white/5">
      <Link
        href="/"
        className="flex items-center gap-2 group transition-opacity duration-300"
        onClick={closeAll}
      >
        <span className="text-2xl md:text-3xl font-serif text-[#C4A574] font-normal leading-none">DW</span>
        <span className="text-xs md:text-sm font-sans text-white/90 font-light tracking-[0.1em] uppercase hidden sm:block">
          GROWTH & CAPITAL
        </span>
      </Link>

      <nav className="hidden lg:flex items-center gap-8">
        <Link href="/" className={navButtonClass(pathname === "/")}>
          Home
          <span
            className={`absolute -bottom-1 left-0 h-px bg-[#C4A574] transition-all duration-300 ${
              pathname === "/" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>

        <div className="relative" ref={servicesRef}>
          <button
            type="button"
            onClick={() => setServicesMenuOpen((o) => !o)}
            className={navButtonClass(servicesActive)}
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
                servicesActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </button>
          {servicesMenuOpen && (
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[60]"
              role="menu"
            >
              <div className="min-w-[18rem] py-2 bg-[#121212] border border-white/10 shadow-2xl rounded-sm">
                {serviceLinks.map((link) => (
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

        <Link href="/get-in-touch" className={navButtonClass(pathname === "/get-in-touch")} onClick={closeAll}>
          Get in touch
          <span
            className={`absolute -bottom-1 left-0 h-px bg-[#C4A574] transition-all duration-300 ${
              pathname === "/get-in-touch" ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>

        {slideLinks.slice(1).map((item) => (
          <Link
            key={item.slide}
            href={`/?slide=${item.slide}`}
            className={navButtonClass(false)}
            onClick={closeAll}
          >
            {item.label}
            <span className="absolute -bottom-1 left-0 h-px bg-[#C4A574] transition-all duration-300 w-0 group-hover:w-full" />
          </Link>
        ))}
      </nav>

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

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#0a0a0a]/98 backdrop-blur-2xl pt-24">
          <nav className="flex flex-col gap-1 page-gutter-x overflow-y-auto max-h-[calc(100vh-6rem)] pb-12">
            <Link
              href="/"
              className="text-left py-4 px-0 text-lg font-light tracking-wide text-white/60 hover:text-white border-b border-white/5"
              onClick={closeAll}
            >
              Home
            </Link>

            <div className="border-b border-white/5">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((o) => !o)}
                className={`flex items-center justify-between w-full text-left py-4 px-0 text-lg font-light tracking-wide transition-all ${
                  mobileServicesOpen || servicesActive ? "text-[#C4A574]" : "text-white/60"
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
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block py-2 text-sm font-light rounded-sm pl-2 -ml-2 ${
                        link.href.endsWith(WEB_DEVELOPMENT_ID)
                          ? "text-[#E8D4B0] bg-[#C4A574]/10 border-l-2 border-[#C4A574]"
                          : "text-white/70 hover:text-[#C4A574]"
                      }`}
                      onClick={closeAll}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/get-in-touch"
              className={`text-left py-4 px-0 text-lg font-light tracking-wide border-b border-white/5 ${
                pathname === "/get-in-touch" ? "text-[#C4A574]" : "text-white/60 hover:text-white"
              }`}
              onClick={closeAll}
            >
              Get in touch
            </Link>

            {slideLinks.slice(1).map((item) => (
              <Link
                key={item.slide}
                href={`/?slide=${item.slide}`}
                className="text-left py-4 px-0 text-lg font-light tracking-wide text-white/60 hover:text-white border-b border-white/5"
                onClick={closeAll}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
