"use client"

import { useState, FormEvent } from "react"
import Link from "next/link"

const CONTACT_EMAIL = "dwgrowthequity@gmail.com"
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`

type Status = "idle" | "sending" | "sent" | "error"

export default function GetInTouchPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<Status>("idle")

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          company: company || "(not provided)",
          message,
          _subject: "Partnership inquiry — DW Growth & Capital",
          _replyto: email,
          _template: "table",
        }),
      })

      if (!res.ok) throw new Error("submit failed")
      setStatus("sent")
      setName("")
      setEmail("")
      setCompany("")
      setMessage("")
    } catch {
      setStatus("error")
    }
  }

  const labelClass = "block text-[11px] font-light uppercase tracking-[0.2em] text-cream/45 mb-2"
  const fieldClass =
    "w-full border border-white/10 bg-ink px-4 py-3.5 text-sm font-light text-cream placeholder:text-cream/30 focus:border-gold/50 focus:outline-none transition-colors disabled:opacity-50"

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
          {status === "sent" ? (
            <div className="py-8 text-center">
              <p className="font-serif text-2xl text-cream mb-3">Inquiry sent</p>
              <p className="text-sm text-cream/55 font-light leading-relaxed max-w-md mx-auto mb-8">
                We received your note and will follow up at the email you provided if there is a fit.
              </p>
              <button type="button" className="btn-gold" onClick={() => setStatus("idle")}>
                Send another
              </button>
            </div>
          ) : (
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
                    disabled={status === "sending"}
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
                    disabled={status === "sending"}
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
                  disabled={status === "sending"}
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
                  disabled={status === "sending"}
                />
              </div>
              <div className="pt-2 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <button type="submit" className="btn-gold w-full sm:w-auto" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send inquiry"}
                </button>
                <p className="text-xs text-cream/40 font-light text-center sm:text-right max-w-xs sm:max-w-none">
                  Sent directly to {CONTACT_EMAIL}.
                </p>
              </div>
              {status === "error" ? (
                <p className="text-sm text-red-300/90 font-light">
                  Something went wrong. Try again, or email {CONTACT_EMAIL} directly.
                </p>
              ) : null}
            </form>
          )}
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
