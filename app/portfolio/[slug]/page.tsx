import Link from "next/link"
import { notFound } from "next/navigation"
import { PORTFOLIO_COMPANIES, getPortfolioCompany } from "@/data/portfolio"
import type { Metadata } from "next"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return PORTFOLIO_COMPANIES.map((c) => ({ slug: c.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const company = getPortfolioCompany(slug)
  if (!company) return { title: "Portfolio" }
  return {
    title: company.name,
    description: company.shortDescription,
  }
}

export default async function PortfolioCompanyPage({ params }: Props) {
  const { slug } = await params
  const company = getPortfolioCompany(slug)
  if (!company) notFound()

  return (
    <div className="pb-24">
      <div className="border-b border-white/[0.06] bg-forest">
        <div className="page-gutter-x pt-12 md:pt-16 pb-12 md:pb-16">
          <div className="max-w-5xl mx-auto">
            <nav className="text-[11px] font-light tracking-[0.14em] uppercase text-cream/40 mb-10">
              <Link href="/#section-3" className="hover:text-gold transition-colors">
                Portfolio
              </Link>
              <span className="mx-2 text-cream/20">/</span>
              <span className="text-cream/60">{company.name}</span>
            </nav>

            <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-10 lg:gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <p className="kicker">{company.industry}</p>
                  {company.status ? (
                    <p className="text-[11px] uppercase tracking-[0.2em] text-cream/40 font-light">
                      {company.status}
                    </p>
                  ) : null}
                </div>
                <h1 className="display text-4xl md:text-5xl lg:text-6xl mb-5">{company.name}</h1>
                <div className="h-px w-16 bg-gold mb-6" />
                {company.location ? (
                  <p className="text-sm text-gold/90 font-light mb-5">{company.location}</p>
                ) : null}
                <p className="text-lg text-cream/70 font-light leading-relaxed max-w-xl">
                  {company.shortDescription}
                </p>
              </div>
              <div className="surface flex items-center justify-center min-h-[14rem] md:min-h-[18rem] px-6 py-8 bg-ink">
                <img
                  src={company.logo}
                  alt={`${company.name} logo`}
                  className="w-full max-w-lg max-h-48 md:max-h-56 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="page-gutter-x pt-12 md:pt-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] gap-10 md:gap-16 mb-14">
            <div className="space-y-5">
              <h2 className="font-serif text-2xl text-cream">Overview</h2>
              {company.overview.map((p) => (
                <p key={p.slice(0, 24)} className="text-cream/65 font-light leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <aside className="surface p-6 md:p-8 h-fit">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Our role</p>
              <p className="text-cream/70 font-light text-sm leading-relaxed">{company.role}</p>
              {company.website ? (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 text-[11px] uppercase tracking-[0.16em] text-gold hover:text-gold-light"
                >
                  {company.websiteLabel ?? "Visit site"} →
                </a>
              ) : null}
            </aside>
          </div>

          <h2 className="font-serif text-2xl text-cream mb-6">More detail</h2>
          <div className="grid md:grid-cols-3 gap-4 md:gap-5">
            {company.highlights.map((item, idx) => (
              <article key={item.title} className="surface p-6 md:p-7">
                <p className="font-serif text-gold/80 text-sm mb-3">0{idx + 1}</p>
                <h3 className="font-serif text-xl text-cream mb-3">{item.title}</h3>
                <p className="text-cream/60 font-light text-sm leading-relaxed">{item.body}</p>
              </article>
            ))}
          </div>

          {company.digitalNote ? (
            <div className="mt-10 surface border-gold/20 p-6 md:p-8">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold mb-3">Digital layer</p>
              <p className="text-cream/70 font-light text-sm md:text-base leading-relaxed">{company.digitalNote}</p>
            </div>
          ) : null}

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link
              href="/#section-3"
              className="text-gold hover:text-gold-light text-[11px] uppercase tracking-[0.16em] font-light transition-colors"
            >
              ← All portfolio companies
            </Link>
            <Link href="/get-in-touch" className="btn-gold">
              Work with us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
