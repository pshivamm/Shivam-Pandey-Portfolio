import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'
import { Arimo, Roboto, Caveat } from 'next/font/google'
import { LoadingScreen } from '@/components/LoadingScreen'
import { SmoothScroll } from '@/components/SmoothScroll'

const arimo = Arimo({
  variable: '--font-arimo',
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['600'],
  style: ['normal'],
  display: 'swap',
})

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Shivam Pandey - UI/UX Designer',
  description: 'Professional portfolio of Shivam Pandey, a UI/UX Designer specializing in minimalistic and animated designs.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${arimo.variable} ${roboto.variable} ${caveat.variable}`} suppressHydrationWarning>
      <Script id="theme-init" strategy="beforeInteractive">
        {`
          (function() {
            var theme = localStorage.getItem('theme');
            if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.add('light');
            }
          })();
        `}
      </Script>
      <body className="bg-background text-foreground antialiased">
        <SmoothScroll>
          <LoadingScreen />
          {children}
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
