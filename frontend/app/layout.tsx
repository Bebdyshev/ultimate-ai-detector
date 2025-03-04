import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  metadataBase: process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined,
  title: {
    default: 'Crypto Service Screener',
    template: ``
  },
  description: 'Crypto Service Screener',
  icons: {
    icon: '/favicon.ico',
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'font-sans antialiased',
            GeistSans.variable,
            GeistMono.variable,
            'relative' // Add relative positioning to maintain stacking context
          )}
        >
          <Toaster position="top-center" />
          <Providers
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col w-full h-screen">
              <Header />
              <main className="flex flex-col flex-1 bg-muted/50 w-full">{children}</main>
            </div>
          </Providers>
        </body>
      </html>
  )
}
