import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://dwgrowthcapital.com"),
  title: {
    default: "DW Growth & Capital | Operator-First Sweat Equity",
    template: "%s | DW Growth & Capital",
  },
  description:
    "DW Growth & Capital is an operator-first sweat equity firm. We partner with founders in the lower middle market to professionalize operations, unlock cash flow, and scale enduring companies.",
  openGraph: {
    title: "DW Growth & Capital | Operator-First Sweat Equity",
    description:
      "We partner with founders as operators—embedding to professionalize operations, unlock cash flow, and build companies that last.",
    type: "website",
    locale: "en_US",
    siteName: "DW Growth & Capital",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-ink text-cream`}>
        {children}
      </body>
    </html>
  )
}
