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
    const subject = encodeURIComponent("Partnership inquiry — DW Growth & Capital")
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company || "(not provided)"}\n\nContext:\n${message}\n`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  const labelClass = "block text-[11px] font-light uppercase tracking-[0.2em] text-cream/45 mb-2"
  const fieldClass =
    "w-full border border-white/10 bg-ink px-4 py-3.5 text-sm font-light text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none transition-colors"

  return (
    <div className="page-gutter-x pb-24 pt-12 md:pt-16">
      <div className="max-w-3xl mx-auto">
        <p className="kicker text-center mb-4">Partnerships</p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl mb-5 text-center">Work with us</h1>
        <div className="h-px w-16 bg-gold mx-auto mb-6" />
        <p className="text-base md:text-lg text-cream/55 font-light max-w-2xl mx-auto text-center mb-12 leading-relaxed">
          Tell us about the company, the stage, and what you need an operator for. If there is a fit, we will follow up
          directly.
        </p>

        <div className="surface p-6 md:p-10">
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
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
            </div>
            <div>
              <label htmlFor="git-company" className={labelClass}>
                Company <span className="text-cream/30 normal-case tracking-normal">(optional)</span>
              </label>
              <input
                id="git-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={fieldClass}
                placeholder="Company name"
              />
            </div>
            <div>
              <label htmlFor="git-message" className={labelClass}>
                What should we know
              </label>
              <textarea
                id="git-message"
                name="message"
                required
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${fieldClass} resize-y min-h-[140px]`}
                placeholder="Stage, revenue range, what is stuck, and what a win looks like in 12 months."
              />
            </div>
            <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
              <button type="submit" className="btn-gold w-full sm:w-auto">
                Send inquiry
              </button>
              <p className="text-xs text-cream/40 font-light text-center sm:text-right max-w-xs sm:max-w-none">
                Opens your email app addressed to{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold hover:text-gold-light transition-colors">
                  {CONTACT_EMAIL}
                </a>
                .
              </p>
            </div>
          </form>
        </div>

        <p className="mt-10 text-center text-sm text-cream/45 font-light">
          Prefer the full story first?{" "}
          <Link href="/services" className="text-gold hover:text-gold-light transition-colors">
            How we execute
          </Link>{" "}
          or{" "}
          <Link href="/" className="text-gold hover:text-gold-light transition-colors">
            return home
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
