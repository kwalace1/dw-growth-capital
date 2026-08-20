export type PortfolioHighlight = {
  title: string
  body: string
}

export type PortfolioCompany = {
  id: string
  name: string
  logo: string
  shortDescription: string
  industry: string
  status?: string
  website?: string
  websiteLabel?: string
  location?: string
  overview: string[]
  role: string
  highlights: PortfolioHighlight[]
}

export const PORTFOLIO_COMPANIES: PortfolioCompany[] = [
  {
    id: "katana",
    name: "Katana",
    logo: "/katana-logo.png",
    shortDescription:
      "An AI technology and data company building operating systems for how companies run, how data moves, and how people get through the day—Katana Business, Katana Switch, and Katana Personal.",
    industry: "AI · Data · Operations",
    website: "https://www.katanats.com/",
    websiteLabel: "katanats.com",
    location: "A DW Growth & Capital company",
    overview: [
      "Katana builds sharper systems for companies, data, and people. It is an AI technology and data company: one operating idea, pointed at three problems.",
      "Intelligence sits inside the work—not as a chatbot bolted onto a dashboard. When data moves, it should arrive ready to use. Companies, data, and people should not live in twelve disconnected tools.",
    ],
    role: "Current partnership. Katana is a DW Growth & Capital company—operator capital and embedded execution behind the platform.",
    highlights: [
      {
        title: "Katana Business",
        body: "A connected operations OS: HR, projects, customers, inventory, workforce, and investors in one system—instead of eight tools that do not talk.",
      },
      {
        title: "Katana Switch",
        body: "AI data translation. Bring a spreadsheet or a connected system, say where it should go, and send only after the result is certified.",
      },
      {
        title: "Katana Personal",
        body: "A calm daily OS: one next step, a guide that can act, and optional accountability. Private first. Currently in early access.",
      },
    ],
  },
  {
    id: "pristine-worx",
    name: "Pristine Worx",
    logo: "/pristine-worx-logo.png",
    shortDescription:
      "Professional auto detailing in Broomall, Pennsylvania—ceramic coatings, valet, and restoration. We partnered as operators and handled the sale of the book of business at exit.",
    industry: "Automotive services",
    status: "Exited",
    website: "https://pristineworxautodetailing.com/",
    websiteLabel: "pristineworxautodetailing.com",
    location: "Broomall, Pennsylvania",
    overview: [
      "Pristine Worx Auto Detailing is a professional car-care business built around ceramic coatings, valet service, and restoration—positioned as “where perfection meets passion.”",
      "DW Growth & Capital partnered as operators: professionalizing how the shop ran, how work was sold, and how the book of business was packaged. The engagement concluded with a sale of the book of business.",
    ],
    role: "Realized outcome. We exited after operating in the business and handling the sale of the book of business.",
    highlights: [
      {
        title: "The business",
        body: "Local auto detailing in Broomall, PA—ceramic coatings, valet, and restoration for customers who wanted the vehicle brought back to a higher standard than a typical wash.",
      },
      {
        title: "How we showed up",
        body: "Operator work inside the shop: systems, offer, and customer experience so the company could run with less founder gravity and a cleaner story to a buyer.",
      },
      {
        title: "The exit",
        body: "We structured and handled the sale of the book of business—converting operating work into a realized transaction rather than an open-ended retainer.",
      },
    ],
  },
]

export function getPortfolioCompany(id: string) {
  return PORTFOLIO_COMPANIES.find((c) => c.id === id)
}
