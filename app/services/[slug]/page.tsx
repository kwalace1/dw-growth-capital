import Link from "next/link"
import { notFound } from "next/navigation"
import { SERVICE_OFFERINGS, WEB_DEVELOPMENT_ID } from "@/data/services"
import { ServiceDetailsPanel } from "@/components/ServiceDetailsPanel"
import type { Metadata } from "next"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SERVICE_OFFERINGS.map((s) => ({ slug: s.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICE_OFFERINGS.find((s) => s.id === slug)
  if (!service) return { title: "Service" }
  const isWebDev = slug === WEB_DEVELOPMENT_ID
  return {
    title: `${service.title} | DW Growth & Capital`,
    description: service.shortDescription,
    ...(isWebDev && {
      keywords: ["web development", "business websites", "digital buildout", "DW Growth & Capital"],
    }),
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = SERVICE_OFFERINGS.find((s) => s.id === slug)
  if (!service) notFound()

  const isWebDev = slug === WEB_DEVELOPMENT_ID

  return (
    <div className="pb-24">
      {isWebDev && (
        <div className="relative page-gutter-x pt-8 md:pt-10 pb-10 md:pb-14 overflow-hidden border-b border-[#C4A574]/25 bg-gradient-to-b from-[#C4A574]/[0.12] via-[#0a0a0a] to-[#0a0a0a]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(196, 165, 116, 0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(196, 165, 116, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 40%, transparent 75%)",
            }}
            aria-hidden
          />
          <div className="relative max-w-4xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-[#C4A574]/40 bg-[#C4A574]/10 px-4 py-1.5 text-[10px] md:text-xs font-light tracking-[0.2em] uppercase text-[#E8D4B0] mb-6 shadow-[0_0_24px_rgba(196,165,116,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C4A574] opacity-40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C4A574]" />
              </span>
              Featured offering — digital buildout
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-white mb-4">
              Websites & systems built to{" "}
              <span className="text-[#C4A574] font-light">convert & scale</span>
            </h2>
            <p className="text-base md:text-lg text-white/65 font-light max-w-2xl mx-auto leading-relaxed">
              Custom-built around your tier and goals — performance, lead capture, and integrations
              aligned with how you operate.
            </p>
          </div>
        </div>
      )}

      <div className={`page-gutter-x ${isWebDev ? "pt-10 md:pt-12" : "pt-8 md:pt-12"}`}>
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs font-light tracking-wide text-white/40 mb-8 md:mb-10">
            <Link href="/services" className="hover:text-[#C4A574] transition-colors">
              All services
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span className={isWebDev ? "text-[#C4A574]/90" : "text-white/60"}>{service.title}</span>
          </nav>

          <header
            className={`mb-8 md:mb-10 pb-8 ${
              isWebDev
                ? "border-b border-transparent"
                : "border-b border-white/10"
            }`}
          >
            {!isWebDev && (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl md:text-4xl text-[#C4A574] font-light" aria-hidden>
                    {service.icon}
                  </span>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight">{service.title}</h1>
                </div>
                <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">{service.shortDescription}</p>
              </>
            )}
            {isWebDev && (
              <>
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl md:text-5xl text-[#C4A574] font-light drop-shadow-[0_0_18px_rgba(196,165,116,0.45)]">
                      {service.icon}
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight text-white">
                      {service.title}
                    </h1>
                  </div>
                  <Link
                    href="/?slide=6"
                    className="inline-flex shrink-0 justify-center items-center gap-2 px-5 py-3 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] text-xs font-light uppercase tracking-[0.15em] transition-colors shadow-[0_0_24px_rgba(196,165,116,0.35)]"
                  >
                    Discuss your build
                  </Link>
                </div>
                <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed border-l-2 border-[#C4A574]/50 pl-4 md:pl-5">
                  {service.shortDescription}
                </p>
              </>
            )}
          </header>

          <div
            className={`rounded-sm ${
              isWebDev
                ? "animate-gold-spotlight bg-gradient-to-b from-white/[0.08] to-white/[0.03]"
                : "bg-white/5 border border-white/10"
            }`}
          >
            <ServiceDetailsPanel service={service} />
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#C4A574] hover:text-[#D4B584] text-sm uppercase tracking-[0.15em] font-light transition-colors"
            >
              ← Back to all services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
