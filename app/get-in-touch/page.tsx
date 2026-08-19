"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"

const CONTACT_EMAIL = "contact@dwgrowthcapital.com"

export default function GetInTouchPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent("Custom deal inquiry — DW Growth & Capital")
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany / project: ${company || "(not provided)"}\n\nWhat we're looking for:\n${message}\n`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  const labelClass = "block text-[10px] font-light uppercase tracking-[0.2em] text-white/50 mb-2"
  const fieldClass =
    "w-full rounded-sm border border-white/10 bg-[#121212] px-4 py-3 text-sm font-light text-white placeholder:text-white/30 focus:border-[#C4A574]/50 focus:outline-none focus:ring-1 focus:ring-[#C4A574]/30 transition-colors"

  return (
    <div className="page-gutter-x pb-24 pt-8 md:pt-12">
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-[10px] md:text-xs font-light uppercase tracking-[0.25em] text-[#C4A574]/90 mb-4">
          Custom partnerships
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 md:mb-6 tracking-tight text-center">
          Get in touch with us
        </h1>
        <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto text-center mb-10 md:mb-12 leading-relaxed">
          Interested in a tailored arrangement or custom deal? Tell us about your business, goals, and how you&apos;d
          like to work together. We&apos;ll follow up directly.
        </p>

        <div className="border border-white/10 bg-white/[0.03] p-6 md:p-10 rounded-sm">
          <form onSubmit={onSubmit} className="space-y-6 md:space-y-8">
            <div>
              <label htmlFor="git-name" className={labelClass}>
                Name
              </label>
              <input
                id="git-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="git-email" className={labelClass}>
                Email
              </label>
              <input
                id="git-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={fieldClass}
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="git-company" className={labelClass}>
                Company or project <span className="text-white/35 normal-case tracking-normal">(optional)</span>
              </label>
              <input
                id="git-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={fieldClass}
                placeholder="Where you're building"
              />
            </div>
            <div>
              <label htmlFor="git-message" className={labelClass}>
                Custom deal or partnership details
              </label>
              <textarea
                id="git-message"
                name="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${fieldClass} resize-y min-h-[140px]`}
                placeholder="Share context on stage, revenue, what you need from us, and what a win looks like for you."
              />
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <button
                type="submit"
                className="group relative px-10 py-4 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-sm uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden w-full sm:w-auto"
              >
                <span className="relative z-10">Send inquiry</span>
                <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
              </button>
              <p className="text-xs text-white/40 font-light text-center sm:text-right max-w-xs sm:max-w-none">
                Opens your email app with this message addressed to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#C4A574] hover:text-[#D4B584] transition-colors">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-sm text-white/45 font-light">
          Prefer the full story first?{" "}
          <Link href="/services" className="text-[#C4A574] hover:text-[#D4B584] transition-colors">
            Explore our services
          </Link>{" "}
          or{" "}
          <Link href="/" className="text-[#C4A574] hover:text-[#D4B584] transition-colors">
            return home
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
