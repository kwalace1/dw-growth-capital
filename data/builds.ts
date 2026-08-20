export type DigitalBuild = {
  id: string
  name: string
  summary: string
  context: string
  website: string
  websiteLabel: string
}

/** Proof of digital execution — not portfolio companies. */
export const SELECTED_BUILDS: DigitalBuild[] = [
  {
    id: "katana",
    name: "Katana",
    summary: "Company site and product presence for our AI operations platform.",
    context: "DW-owned company",
    website: "https://www.katanats.com/",
    websiteLabel: "katanats.com",
  },
  {
    id: "pristine-worx",
    name: "Pristine Worx",
    summary: "Customer-facing site built inside the operating engagement—booking, services, and brand.",
    context: "Built with the partnership",
    website: "https://pristineworxautodetailing.com/",
    websiteLabel: "pristineworxautodetailing.com",
  },
  {
    id: "jewels-landing",
    name: "Jewel's Landing Farm",
    summary: "Farm and rescue website for boarding, lessons, training, and Enchanted Haven Horse Rescue.",
    context: "Client build",
    website: "https://jewelslanding.vercel.app/",
    websiteLabel: "jewelslanding.vercel.app",
  },
]
