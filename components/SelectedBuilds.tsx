import { SELECTED_BUILDS } from "@/data/builds"

type SelectedBuildsProps = {
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
      <ul className="grid gap-5 md:grid-cols-3">
        {SELECTED_BUILDS.map((build) => (
          <li key={build.id}>
            <a
              href={build.website}
              target="_blank"
              rel="noopener noreferrer"
              className="surface group flex h-full flex-col overflow-hidden hover:border-gold/35 transition-colors duration-300"
            >
              <div className="relative aspect-[16/10] bg-ink overflow-hidden border-b border-white/[0.06]">
                <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-1.5 px-3 py-2 bg-forest/90 border-b border-white/[0.06]">
                  <span className="h-1.5 w-1.5 rounded-full bg-cream/25" aria-hidden />
                  <span className="h-1.5 w-1.5 rounded-full bg-cream/25" aria-hidden />
                  <span className="h-1.5 w-1.5 rounded-full bg-cream/25" aria-hidden />
                  <span className="ml-2 truncate text-[9px] uppercase tracking-[0.14em] text-cream/35 font-light">
                    {build.websiteLabel}
                  </span>
                </div>
                <video
                  className="h-full w-full object-cover object-top"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={build.preview}
                  aria-label={`${build.name} landing page recording`}
                >
                  <source src={build.video} type="video/webm" />
                </video>
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold mb-2 font-light">{build.context}</p>
                <h4 className="font-serif text-xl text-cream mb-2">{build.name}</h4>
                <p className="text-sm text-cream/60 font-light leading-relaxed flex-1">{build.summary}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.16em] text-gold font-light group-hover:text-gold-light">
                  View live site →
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
