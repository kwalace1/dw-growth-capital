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
      <div className="page-gutter-x pt-12 md:pt-16">
        <div className="max-w-4xl mx-auto">
          <nav className="text-[11px] font-light tracking-[0.14em] uppercase text-cream/40 mb-10">
            <Link href="/services" className="hover:text-gold transition-colors">
              All capabilities
            </Link>
            <span className="mx-2 text-cream/20">/</span>
            <span className="text-cream/60">{service.title}</span>
          </nav>

          <header className="mb-10 pb-8 border-b border-white/[0.08]">
            <h1 className="display text-4xl md:text-5xl mb-4">{service.title}</h1>
            <p className="text-lg md:text-xl text-cream/65 font-light leading-relaxed max-w-2xl">
              {service.shortDescription}
            </p>
          </header>

          <ServiceDetailsPanel service={service} />

          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link
              href="/services"
              className="text-gold hover:text-gold-light text-[11px] uppercase tracking-[0.16em] font-light transition-colors"
            >
              ← All capabilities
            </Link>
            <Link href="/get-in-touch" className="btn-gold">
              Discuss a partnership
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
