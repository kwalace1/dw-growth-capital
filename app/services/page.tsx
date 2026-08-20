import Link from "next/link"
import { SERVICE_OFFERINGS } from "@/data/services"
import { SectionIntro } from "@/components/SectionIntro"

export default function ServicesIndexPage() {
  return (
    <div className="page-gutter-x pb-24 pt-12 md:pt-16">
      <div className="max-w-6xl mx-auto">
        <SectionIntro
          kicker="Inside the partnership"
          title="How We Execute"
          subtitle="These are the capabilities we bring when we embed—not a catalog of add-on retainers. Explore a workstream if you want the detail; most engagements are structured as a partnership."
          align="center"
        />

        <ul className="grid gap-4 md:gap-5 md:grid-cols-2">
          {SERVICE_OFFERINGS.map((service, idx) => (
            <li key={service.id}>
              <Link
                href={`/services/${service.id}`}
                className="group surface block h-full p-6 md:p-8 hover:border-gold/35 transition-colors duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="font-serif text-gold/80 text-sm">0{idx + 1}</span>
                  <span
                    className="text-gold text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
                <h2 className="font-serif text-2xl text-cream tracking-tight mb-3">{service.title}</h2>
                <p className="text-cream/60 font-light text-sm leading-relaxed">{service.shortDescription}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 md:mt-20 border border-gold/25 bg-gold/[0.06] px-6 py-10 md:px-10 text-center">
          <p className="text-sm md:text-base text-cream/65 font-light max-w-xl mx-auto leading-relaxed mb-6">
            Ready to talk about a partnership—not a project? Tell us about the company. We respond directly.
          </p>
          <Link href="/get-in-touch" className="btn-gold">
            Work with us
          </Link>
        </div>
      </div>
    </div>
  )
}
