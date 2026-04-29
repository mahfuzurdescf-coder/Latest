import type { Metadata } from 'next'

import './globals.css'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SkipLink } from '@/components/ui/SkipLink'
import { SITE } from '@/lib/site'
import { sanityFetch } from '@/lib/sanity/client'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SiteSettings } from '@/types/sanity'

export const metadata: Metadata = {
  icons: {
    icon: "/brand/descf-logo.png",
    shortcut: "/brand/descf-logo.png",
    apple: "/brand/descf-logo.png",
  },

  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.shortName} — ${SITE.name}`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.shortName,
    title: `${SITE.shortName} — ${SITE.name}`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.shortName} — ${SITE.name}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await sanityFetch<SiteSettings | null>({
    query: SITE_SETTINGS_QUERY,
    tags: ['siteSettings'],
  })

  const safeSettings: SiteSettings = settings ?? {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: SITE.shortName,
    tagline: SITE.name,
    contactEmail: SITE.contactEmail,
  }

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-screen flex-col bg-earth-50 text-earth-800">
        <SkipLink />
        <Header settings={safeSettings} />
        <div className="flex-1">{children}</div>
        <Footer settings={safeSettings} />
      </body>
    </html>
  )
}