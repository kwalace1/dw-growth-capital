import Link from "next/link"
import { notFound } from "next/navigation"
import { SERVICE_OFFERINGS } from "@/data/services"
import { ServiceDetailsPanel } from "@/components/ServiceDetailsPanel"
import type { Metadata } from "next"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return SERVICE_OFFERINGS.map((s) => ({ slug: s.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICE_OFFERINGS.find((s) => s.id === slug)
  if (!service) return { title: "Capability" }
  return {
    title: service.title,
    description: service.shortDescription,
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params
  const service = SERVICE_OFFERINGS.find((s) => s.id === slug)
  if (!service) notFound()

  return (
    <div className="pb-24">
      <div className="page-gutter-x pt-8 md:pt-12">
        <div className="max-w-4xl mx-auto">
          <nav className="text-xs font-light tracking-wide text-white/40 mb-8 md:mb-10">
            <Link href="/services" className="hover:text-[#C4A574] transition-colors">
              All capabilities
            </Link>
            <span className="mx-2 text-white/20">/</span>
            <span className="text-white/60">{service.title}</span>
          </nav>

          <header className="mb-8 md:mb-10 pb-8 border-b border-white/10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-tight mb-4">{service.title}</h1>
            <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">{service.shortDescription}</p>
          </header>

          <div className="rounded-sm bg-white/5 border border-white/10">
            <ServiceDetailsPanel service={service} />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[#C4A574] hover:text-[#D4B584] text-sm uppercase tracking-[0.15em] font-light transition-colors"
            >
              ← All capabilities
            </Link>
            <Link
              href="/get-in-touch"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] text-xs font-light uppercase tracking-[0.15em] transition-colors"
            >
              Discuss a partnership
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
