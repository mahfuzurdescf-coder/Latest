import Link from 'next/link'

import { LogoMark } from '@/components/brand/LogoMark'
import type { SiteSettings } from '@/types/sanity'

interface FooterProps {
  settings: SiteSettings
}

const FOOTER_SECTIONS = [
  {
    title: 'Organisation',
    links: [
      { label: 'About DESCF', href: '/about' },
      { label: 'Mission & Vision', href: '/mission' },
      { label: 'Leadership', href: '/leadership' },
      { label: 'Governance', href: '/governance' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Current Work', href: '/current-work' },
      { label: 'Programmes', href: '/programmes' },
      { label: 'Strategic Priorities', href: '/strategic-priorities' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Newsroom', href: '/newsroom' },
      { label: 'Reports & Publications', href: '/reports' },
      { label: 'Evidence & Resources', href: '/evidence-resources' },
      { label: 'Media', href: '/media' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Partner With Us', href: '/partner' },
      { label: 'Support DESCF', href: '/donate' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

function SocialLink({
  href,
  label,
}: {
  href?: string
  label: string
}) {
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-lg border border-earth-700 px-3 py-2 text-xs font-semibold text-earth-300 transition-colors hover:border-forest-400 hover:text-forest-300"
    >
      {label}
    </a>
  )
}

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear()
  const donationLink = settings.donationLink ?? '/donate'

  return (
    <footer className="mt-auto bg-earth-950 text-earth-300">
      <div className="border-b border-earth-800 bg-forest-900">
        <div className="container-site py-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="section-label mb-3 text-forest-300">
                Support conservation in Bangladesh
              </p>
              <h2 className="font-serif text-h3 text-white">
                Help DESCF strengthen wildlife protection, public awareness, and human-wildlife coexistence.
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href={donationLink} className="btn-cta">
                Support DESCF
              </Link>
              <Link
                href="/partner"
                className="inline-flex items-center justify-center rounded-lg border border-forest-400 px-5 py-2.5 text-sm font-semibold text-forest-100 transition-colors hover:bg-forest-800"
              >
                Partner with us
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <LogoMark showText className="text-white" />

            <p className="mt-5 max-w-sm text-sm leading-7 text-earth-400">
              Deep Ecology and Snake Conservation Foundation works at the intersection of biodiversity conservation, snake conservation, public awareness, research, and coexistence in Bangladesh.
            </p>

            {(settings.contactEmail || settings.contactPhone || settings.address) && (
              <div className="mt-6 space-y-2 text-sm text-earth-400">
                {settings.contactEmail && (
                  <p>
                    <span className="text-earth-500">Email: </span>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-forest-300 hover:text-forest-200"
                    >
                      {settings.contactEmail}
                    </a>
                  </p>
                )}

                {settings.contactPhone && (
                  <p>
                    <span className="text-earth-500">Phone: </span>
                    <a
                      href={`tel:${settings.contactPhone}`}
                      className="text-forest-300 hover:text-forest-200"
                    >
                      {settings.contactPhone}
                    </a>
                  </p>
                )}

                {settings.address && (
                  <p>
                    <span className="text-earth-500">Address: </span>
                    {settings.address}
                  </p>
                )}
              </div>
            )}

            {settings.social && (
              <div className="mt-6 flex flex-wrap gap-2">
                <SocialLink href={settings.social.facebook} label="Facebook" />
                <SocialLink href={settings.social.instagram} label="Instagram" />
                <SocialLink href={settings.social.linkedin} label="LinkedIn" />
                <SocialLink href={settings.social.youtube} label="YouTube" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title}>
                <h3 className="mb-4 text-label uppercase tracking-widest text-earth-500">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-earth-400 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-earth-800">
        <div className="container-site flex flex-col gap-3 py-5 text-xs text-earth-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Deep Ecology and Snake Conservation Foundation. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/governance" className="hover:text-earth-300">
              Governance
            </Link>
            <Link href="/contact" className="hover:text-earth-300">
              Contact
            </Link>
            <Link href="/sitemap.xml" className="hover:text-earth-300">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}