'use client'

import { ReactNode, useEffect } from 'react'
import croct from '@croct/plug'

import { CartProvider } from '@/contexts/CartContext'
import { UserProvider } from '@/contexts/UserContext'
import { SearchParamsProvider } from '@/components/SearchParamsProvider'
import DesktopHeader from '@/components/DesktopHeader'
import MobileLogo from '@/components/MobileLogo'
import DynamicIsland from '@/components/DynamicIsland'
import ScrollToTop from '@/components/ScrollToTop'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/toaster'

export default function ClientWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    croct.plug({ appId: '08eacd9f-43d7-4890-86b4-fd4d2a65cf7c' })
  }, [])

  return (
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
  )
}
