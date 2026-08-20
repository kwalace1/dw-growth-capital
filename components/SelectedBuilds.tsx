import { SELECTED_BUILDS } from "@/data/builds"

type SelectedBuildsProps = {
  /** Extra top margin / section framing when used mid-page */
  className?: string
  title?: string
  subtitle?: string
}

export function SelectedBuilds({
  className = "",
  title = "Selected digital builds",
  subtitle = "Websites and digital infrastructure we ship as part of how we execute—proof of craft, not a separate agency menu.",
}: SelectedBuildsProps) {
  return (
    <div className={className}>
      <div className="mb-8 md:mb-10">
        <p className="kicker mb-3">Execution proof</p>
        <h3 className="font-serif text-2xl md:text-3xl text-cream mb-3">{title}</h3>
        <p className="text-sm md:text-base text-cream/55 font-light leading-relaxed max-w-2xl">{subtitle}</p>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {SELECTED_BUILDS.map((build) => (
          <li key={build.id}>
            <a
              href={build.website}
              target="_blank"
              rel="noopener noreferrer"
              className="surface group block h-full p-6 hover:border-gold/35 transition-colors duration-300"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold mb-3 font-light">{build.context}</p>
              <h4 className="font-serif text-xl text-cream mb-2">{build.name}</h4>
              <p className="text-sm text-cream/60 font-light leading-relaxed mb-5">{build.summary}</p>
              <p className="text-[11px] uppercase tracking-[0.16em] text-gold font-light group-hover:text-gold-light">
                {build.websiteLabel} →
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
