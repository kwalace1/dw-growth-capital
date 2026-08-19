import type { ServiceOffering } from "@/data/services"

export function ServiceDetailsPanel({ service }: { service: ServiceOffering }) {
  if (!service.details) return null

  return (
    <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-white/10 pt-4 md:pt-6 space-y-6">
      <div>
        <h4 className="text-lg md:text-xl font-light text-white mb-2 tracking-tight">{service.details.mainTitle}</h4>
        <p className="text-white/70 font-light text-sm leading-relaxed">{service.details.subtitle}</p>
      </div>

      <div className="space-y-5">
        {service.details.services.map((item, itemIdx) => (
          <div key={itemIdx} className="border-l-2 border-[#C4A574]/30 pl-4 md:pl-5">
            <h5 className="text-base md:text-lg font-light text-[#C4A574] mb-2">{item.name}</h5>
            <p className="text-white/70 font-light text-xs md:text-sm mb-3 leading-relaxed">{item.description}</p>
            <div className="mb-2">
              <p className="text-white/60 text-xs uppercase tracking-wide mb-1.5">Includes:</p>
              <ul className="space-y-1">
                {item.includes.map((include, includeIdx) => (
                  <li key={includeIdx} className="text-white/70 text-xs md:text-sm font-light flex items-start">
                    <span className="text-[#C4A574] mr-2 flex-shrink-0">•</span>
                    <span>{include}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-white/50 text-xs italic mt-2">
              <span className="font-medium">Best for:</span> {item.bestFor}
            </p>
          </div>
        ))}
      </div>

      {service.details.addOns && (
        <div className="pt-4 border-t border-white/10">
          <h5 className="text-base md:text-lg font-light text-[#C4A574] mb-3">Industry-Specific Add-Ons</h5>
          <ul className="space-y-1.5">
            {service.details.addOns.map((addOn, addOnIdx) => (
              <li key={addOnIdx} className="text-white/70 text-xs md:text-sm font-light flex items-start">
                <span className="text-[#C4A574] mr-2 flex-shrink-0">•</span>
                <span>{addOn}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
