export const HOME_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "firm", label: "The Firm" },
  { id: "approach", label: "Approach" },
  { id: "portfolio", label: "Portfolio" },
  { id: "services", label: "Capabilities" },
  { id: "close", label: "Next step" },
] as const

export const totalSlides = HOME_SECTIONS.length

export const HOME_SLIDE_LINKS = [
  { label: "The Firm", slide: 1 },
  { label: "Approach", slide: 2 },
  { label: "Portfolio", slide: 3 },
] as const
