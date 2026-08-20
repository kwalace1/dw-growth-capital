import type { Metadata } from "next"
import { SiteHeader } from "@/components/SiteHeader"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk with DW Growth & Capital about a sweat-equity partnership. Tell us about the company, the stage, and what you need an operator for.",
}

export default function GetInTouchLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <SiteHeader />
      <main>{children}</main>
    </div>
  )
}
