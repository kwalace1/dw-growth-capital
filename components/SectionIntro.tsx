type SectionIntroProps = {
  kicker?: string
  title: string
  subtitle?: string
  align?: "center" | "left"
}

export function SectionIntro({ kicker, title, subtitle, align = "left" }: SectionIntroProps) {
  const aligned = align === "center" ? "text-center mx-auto" : "text-left"
  return (
    <div className={`mb-12 md:mb-16 ${aligned}`}>
      {kicker && <p className="kicker mb-4">{kicker}</p>}
      <h2 className={`display text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] ${align === "center" ? "" : "max-w-3xl"}`}>
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-base md:text-lg text-cream/55 font-light leading-relaxed ${
            align === "center" ? "max-w-2xl mx-auto" : "max-w-xl"
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className={`mt-8 h-px w-16 bg-gold/70 ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  )
}
