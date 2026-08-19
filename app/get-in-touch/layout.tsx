import type { Metadata } from "next"
import { GetInTouchClientLayout } from "./GetInTouchClientLayout"

export const metadata: Metadata = {
  title: "Get in touch | DW Growth & Capital",
  description:
    "Reach out to discuss a custom partnership or tailored sweat-equity arrangement for your business.",
}

export default function GetInTouchLayout({ children }: { children: React.ReactNode }) {
  return <GetInTouchClientLayout>{children}</GetInTouchClientLayout>
}
