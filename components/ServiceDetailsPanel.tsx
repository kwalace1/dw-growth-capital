import type { ServiceOffering } from "@/data/services"

export function ServiceDetailsPanel({ service }: { service: ServiceOffering }) {
  if (!service.details) return null

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-2xl md:text-3xl text-cream mb-3">{service.details.mainTitle}</h2>
        <p className="text-cream/65 font-light text-sm md:text-base leading-relaxed max-w-2xl">
          {service.details.subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {service.details.services.map((item) => (
          <article key={item.name} className="surface p-6 md:p-8">
            <h3 className="font-serif text-xl text-gold mb-2">{item.name}</h3>
            <p className="text-cream/70 font-light text-sm mb-5 leading-relaxed">{item.description}</p>
            <p className="text-[10px] uppercase tracking-[0.18em] text-cream/40 mb-2">Includes</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 mb-5">
              {item.includes.map((include) => (
                <li key={include} className="text-cream/65 text-sm font-light pl-3 border-l border-gold/30">
                  {include}
                </li>
              ))}
            </ul>
            <p className="text-cream/45 text-sm font-light leading-relaxed">
              <span className="text-gold/80">Best for.</span> {item.bestFor}
            </p>
          </article>
        ))}
      </div>

      {service.details.addOns && (
        <div className="surface p-6 md:p-8">
          <h3 className="font-serif text-xl text-gold mb-4">Industry-specific add-ons</h3>
          <ul className="space-y-2">
            {service.details.addOns.map((addOn) => (
              <li key={addOn} className="text-cream/65 text-sm font-light pl-3 border-l border-gold/30">
                {addOn}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
