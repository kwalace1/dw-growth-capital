import type { Metadata } from "next"
import { SiteHeader } from "@/components/SiteHeader"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Companies DW Growth & Capital backs as operators—and realized outcomes when the work is done.",
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-cream">
      <SiteHeader />
      <main>{children}</main>
    </div>
  )
}
