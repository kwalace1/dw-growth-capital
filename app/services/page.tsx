import Link from "next/link"
import { SERVICE_OFFERINGS, WEB_DEVELOPMENT_ID } from "@/data/services"

export default function ServicesIndexPage() {
  const webDev = SERVICE_OFFERINGS.find((s) => s.id === WEB_DEVELOPMENT_ID)
  const otherServices = SERVICE_OFFERINGS.filter((s) => s.id !== WEB_DEVELOPMENT_ID)

  return (
    <div className="page-gutter-x pb-24 pt-8 md:pt-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 md:mb-6 tracking-tight text-center">
          Our Services
        </h1>
        <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto text-center mb-10 md:mb-12">
          Comprehensive solutions to accelerate your growth — explore each service in depth.
        </p>

        {webDev && (
          <div className="mb-10 md:mb-14">
            <p className="text-[10px] md:text-xs font-light uppercase tracking-[0.25em] text-[#C4A574]/90 text-center mb-3">
              Featured
            </p>
            <Link
              href={`/services/${webDev.id}`}
              className="group relative block overflow-hidden rounded-sm border border-[#C4A574]/40 bg-gradient-to-br from-[#C4A574]/[0.16] via-white/[0.06] to-transparent p-6 md:p-10 transition-all duration-300 animate-gold-spotlight hover:border-[#C4A574]/60 md:flex md:gap-10 md:items-center"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#C4A574]/25 blur-3xl"
                aria-hidden
              />
              <div className="relative flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-3xl md:text-4xl text-[#C4A574] font-light drop-shadow-[0_0_12px_rgba(196,165,116,0.45)]">
                      {webDev.icon}
                    </span>
                    <span className="rounded border border-[#C4A574]/50 bg-[#C4A574]/15 px-2.5 py-0.5 text-[10px] font-light uppercase tracking-[0.2em] text-[#E8D4B0]">
                      Spotlight
                    </span>
                  </div>
                  <span className="text-[#C4A574] text-lg transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2">{webDev.title}</h2>
                <p className="text-white/65 font-light text-sm md:text-base leading-relaxed max-w-3xl">
                  {webDev.shortDescription}
                </p>
                <p className="mt-4 text-xs font-light uppercase tracking-[0.2em] text-[#C4A574]">
                  Open full playbook →
                </p>
              </div>
            </Link>
          </div>
        )}

        <p className="text-xs font-light uppercase tracking-[0.2em] text-white/40 text-center mb-4 md:mb-5">
          More capabilities
        </p>
        <ul className="grid gap-4 md:gap-6 md:grid-cols-3">
          {otherServices.map((service) => (
            <li key={service.id}>
              <Link
                href={`/services/${service.id}`}
                className="group block h-full overflow-hidden p-6 md:p-8 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="text-2xl text-[#C4A574] font-light">{service.icon}</span>
                  <span
                    className="text-[#C4A574] text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-light text-white tracking-tight mb-2">{service.title}</h2>
                <p className="text-white/60 font-light text-sm leading-relaxed">{service.shortDescription}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 md:mt-20 pt-10 md:pt-12 border-t border-white/10 text-center">
          <p className="text-sm md:text-base text-white/55 font-light max-w-xl mx-auto leading-relaxed mb-6">
            Want a custom deal or a partnership structure built around your goals? Tell us what you&apos;re solving—we
            respond directly.
          </p>
          <Link
            href="/get-in-touch"
            className="inline-block px-10 py-4 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-sm uppercase tracking-[0.2em] transition-all duration-300"
          >
            Get in touch with us
          </Link>
        </div>
      </div>
    </div>
  )
}
