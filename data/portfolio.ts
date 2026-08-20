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
  /** Optional note when digital work was part of the engagement */
  digitalNote?: string
}

export const PORTFOLIO_COMPANIES: PortfolioCompany[] = [
  {
    id: "katana",
    name: "Katana",
    logo: "/katana-logo.png",
    shortDescription:
      "A DW Growth & Capital company. We are building an AI technology and data platform so operators can run the company, move data with meaning intact, and get through the day with clarity.",
    industry: "AI · Data · Operations",
    website: "https://www.katanats.com/",
    websiteLabel: "katanats.com",
    location: "Owned and operated by DW Growth & Capital",
    overview: [
      "Katana is not a client engagement—it is a company we own and operate. DW built the platform to put the same operator discipline we bring to partnerships into software: one operating idea for how companies run, how data moves, and how people get work done.",
      "The product line—Katana Business, Katana Switch, and Katana Personal—exists so founders and teams stop living across disconnected tools. Intelligence sits inside the work; data arrives ready to use.",
    ],
    role: "DW-owned. Founder operators build and ship the platform; the firm stands behind it as operator capital in product form.",
    highlights: [
      {
        title: "Why we built it",
        body: "The same problem we see in lower-middle-market companies: too many systems, weak handoffs, and no single place to run the business. Katana is our answer in software.",
      },
      {
        title: "Katana Business",
        body: "Connected operations OS—HR, projects, customers, inventory, workforce, and investors in one workspace.",
      },
      {
        title: "Switch & Personal",
        body: "Katana Switch moves and translates data with certification before send. Katana Personal is a calm daily OS—one next step, private first—in early access.",
      },
    ],
    digitalNote:
      "The public site at katanats.com is part of how we present the company—built and maintained by the same team that ships the product.",
  },
  {
    id: "pristine-worx",
    name: "Pristine Worx",
    logo: "/pristine-worx-logo.png",
    shortDescription:
      "Auto detailing in Broomall, PA. We embedded as operators, professionalized how the shop ran and sold, built the customer-facing site, and handled the sale of the book of business at exit.",
    industry: "Automotive services",
    status: "Exited",
    website: "https://pristineworxautodetailing.com/",
    websiteLabel: "pristineworxautodetailing.com",
    location: "Broomall, Pennsylvania",
    overview: [
      "Pristine Worx Auto Detailing served customers seeking ceramic coatings, valet, and restoration—positioned around craft and care, not a quick wash.",
      "DW Growth & Capital partnered as operators: offer clarity, shop systems, customer experience, and a digital front door. The engagement closed with a structured sale of the book of business—a realized outcome, not an open-ended retainer.",
    ],
    role: "Realized exit. Operated inside the business, shipped the website as part of that work, and handled the sale of the book of business.",
    highlights: [
      {
        title: "Operate",
        body: "Hands-on work in the shop: how work was sold, how capacity was used, and how the customer experience held up under growth.",
      },
      {
        title: "Build",
        body: "Customer-facing website designed and built by DW—booking, services, and brand—so the company had a conversion-ready digital layer, not a placeholder.",
      },
      {
        title: "Exit",
        body: "We packaged and handled the sale of the book of business, converting operating work into a closed transaction.",
      },
    ],
    digitalNote:
      "The live site was designed and built by DW Growth & Capital as part of the operating engagement—not a separate web-agency project.",
  },
]

export function getPortfolioCompany(id: string) {
  return PORTFOLIO_COMPANIES.find((c) => c.id === id)
}
