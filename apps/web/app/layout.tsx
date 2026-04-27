import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { sanityFetch } from '@/lib/sanity/client'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SiteSettings } from '@/types/sanity'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://descf.org'),
  title: {
    default: 'DESCF — Deep Ecology and Snake Conservation Foundation',
    template: '%s | DESCF',
  },
  description:
    'Deep Ecology and Snake Conservation Foundation — working at the intersection of herpetofauna conservation, public awareness, and human-wildlife coexistence in Bangladesh.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://descf.org',
    siteName: 'DESCF',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<SiteSettings>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  })

  // Fallback settings if Sanity is not yet configured
  const safeSettings: SiteSettings = settings ?? {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'DESCF',
    tagline: 'Deep Ecology and Snake Conservation Foundation',
    contactEmail: 'info@descf.org',
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Header settings={safeSettings} />
        <main className="flex-1">{children}</main>
        <Footer settings={safeSettings} />
      </body>
    </html>
  )
}
