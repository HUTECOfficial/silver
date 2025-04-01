import './globals.css'
import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import ClientWrapper from './client-wrapper'

const playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Silver Street Jewelry',
  description: 'Modern and unique jewelry designs',
  generator: 'v0.dev',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={playfair.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  )
}
