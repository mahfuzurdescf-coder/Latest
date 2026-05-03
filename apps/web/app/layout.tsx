import type { Metadata } from 'next'
import Script from 'next/script'

import './globals.css'

import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { SkipLink } from '@/components/ui/SkipLink'
import { SITE } from '@/lib/site'
import { sanityFetch } from '@/lib/sanity/client'
import { SITE_SETTINGS_QUERY } from '@/lib/sanity/queries'
import type { SiteSettings } from '@/types/sanity'

const GA_MEASUREMENT_ID = 'G-QB65DP9R63'

export const metadata: Metadata = {
  icons: {
    icon: "/brand/descf-logo.png",
    shortcut: "/brand/descf-logo.png",
    apple: "/brand/descf-logo.png",
  },

  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.shortName} â€” ${SITE.name}`,
    template: `%s | ${SITE.shortName}`,
  },
  description: SITE.description,
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: SITE.url,
    siteName: SITE.shortName,
    title: `${SITE.shortName} â€” ${SITE.name}`,
    description: SITE.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.shortName} â€” ${SITE.name}`,
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
    <html lang="bn" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
{/* Google Analytics */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-QB65DP9R63"></script>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QB65DP9R63');
    `,
  }}
/>

</head>
      <body className="flex min-h-screen flex-col bg-earth-50 text-earth-800">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag("js", new Date());
              gtag("config", "${GA_MEASUREMENT_ID}");
            `,
          }}
        />
        <SkipLink />
        <Header settings={safeSettings} />
        <div className="flex-1">{children}</div>
        <Footer settings={safeSettings} />
      </body>
    </html>
  )
}



