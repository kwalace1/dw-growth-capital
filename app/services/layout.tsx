import type { Metadata } from "next"
import { SiteHeader } from "@/components/SiteHeader"

export const metadata: Metadata = {
  title: "Capabilities",
  description:
    "How DW Growth & Capital executes inside partnerships: strategy and operations, brand, demand generation, and digital infrastructure.",
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ink text-cream">
      <SiteHeader />
      <main>{children}</main>
    </div>
  )
}
