import Link from "next/link"
import { SERVICE_OFFERINGS } from "@/data/services"

export default function ServicesIndexPage() {
  return (
    <div className="page-gutter-x pb-24 pt-8 md:pt-12">
      <div className="max-w-5xl mx-auto">
        <p className="text-center text-[10px] md:text-xs font-light uppercase tracking-[0.25em] text-[#C4A574]/90 mb-4">
          Inside the partnership
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 md:mb-6 tracking-tight text-center">
          How We Execute
        </h1>
        <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto text-center mb-10 md:mb-12 leading-relaxed">
          These are the capabilities we bring when we embed—not a catalog of add-on retainers. Explore a workstream if
          you want the detail; most engagements are structured as a partnership.
        </p>

        <ul className="grid gap-4 md:gap-6 md:grid-cols-2">
          {SERVICE_OFFERINGS.map((service) => (
            <li key={service.id}>
              <Link
                href={`/services/${service.id}`}
                className="group block h-full overflow-hidden p-6 md:p-8 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h2 className="text-xl md:text-2xl font-light text-white tracking-tight">{service.title}</h2>
                  <span
                    className="text-[#C4A574] text-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-hidden
                  >
                    →
                  </span>
                </div>
                <p className="text-white/60 font-light text-sm leading-relaxed">{service.shortDescription}</p>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-14 md:mt-20 pt-10 md:pt-12 border-t border-white/10 text-center">
          <p className="text-sm md:text-base text-white/55 font-light max-w-xl mx-auto leading-relaxed mb-6">
            Ready to talk about a partnership—not a project? Tell us about the company. We respond directly.
          </p>
          <Link
            href="/get-in-touch"
            className="inline-block px-10 py-4 bg-[#C4A574] hover:bg-[#B39564] text-[#0a0a0a] font-light text-sm uppercase tracking-[0.2em] transition-all duration-300"
          >
            Work with us
          </Link>
        </div>
      </div>
    </div>
  )
}
