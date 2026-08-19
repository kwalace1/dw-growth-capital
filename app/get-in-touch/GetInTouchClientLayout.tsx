"use client"

import { useEffect } from "react"
import { ServiceSiteHeader } from "@/components/ServiceSiteHeader"

export function GetInTouchClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.documentElement.style.overflowY = "auto"
    document.body.style.overflowY = "auto"
    return () => {
      document.documentElement.style.overflowY = ""
      document.body.style.overflowY = ""
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <ServiceSiteHeader />
      <main>{children}</main>
    </div>
  )
}
