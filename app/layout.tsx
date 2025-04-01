import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display } from "next/font/google"
import "./globals.css"
import DynamicIsland from "@/components/DynamicIsland"
import DesktopHeader from "@/components/DesktopHeader"
import Footer from "@/components/Footer"
import { CartProvider } from "@/contexts/CartContext"
import { UserProvider } from "@/contexts/UserContext"
import { Toaster } from "@/components/ui/toaster"
import MobileLogo from "@/components/MobileLogo"
import ScrollToTop from "@/components/ScrollToTop"
import { SearchParamsProvider } from "@/components/SearchParamsProvider"

const playfair = Playfair_Display({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Silver Street Jewelry",
  description: "Modern and unique jewelry designs",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={playfair.className}>
        <SearchParamsProvider>
          <UserProvider>
            <CartProvider>
              <ScrollToTop />
              <DesktopHeader />
              <div className="md:hidden">
                <DynamicIsland />
                <MobileLogo />
              </div>
              <main className="pt-24">{children}</main>
              <Footer />
              <Toaster />
            </CartProvider>
          </UserProvider>
        </SearchParamsProvider>
      </body>
    </html>
  )
}



import './globals.css'