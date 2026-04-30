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
      { label: 'Prokriti Kotha', href: '/prokriti-kotha' },
      { label: 'Bangladesh Wildlife', href: '/bangladesh-wildlife' },
      { label: 'Snake Field Guide', href: '/bangladesh-wildlife/snakes' },
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
      className="rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-earth-200 transition-colors hover:border-forest-300 hover:text-white"
    >
      {label}
    </a>
  )
}

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-[#1f1712] text-earth-300">
      <div className="container-site py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_2fr]">
          <div>
            <LogoMark showText className="text-white" />

            <p className="mt-5 max-w-sm text-sm leading-7 text-earth-300/85">
              Deep Ecology and Snake Conservation Foundation works at the intersection of biodiversity conservation, snake conservation, public awareness, research, and coexistence in Bangladesh.
            </p>

            {(settings.contactEmail || settings.contactPhone || settings.address) && (
              <div className="mt-6 space-y-2 text-sm text-earth-300/85">
                {settings.contactEmail && (
                  <p>
                    <span className="text-earth-400">Email: </span>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-forest-200 hover:text-white"
                    >
                      {settings.contactEmail}
                    </a>
                  </p>
                )}

                {settings.contactPhone && (
                  <p>
                    <span className="text-earth-400">Phone: </span>
                    <a
                      href={`tel:${settings.contactPhone}`}
                      className="text-forest-200 hover:text-white"
                    >
                      {settings.contactPhone}
                    </a>
                  </p>
                )}

                {settings.address && (
                  <p>
                    <span className="text-earth-400">Address: </span>
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
                <h3 className="mb-4 text-label uppercase tracking-widest text-bark-300">
                  {section.title}
                </h3>

                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-earth-300/85 transition-colors hover:text-white"
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

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-3 py-5 text-xs text-earth-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Deep Ecology and Snake Conservation Foundation. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/governance" className="hover:text-white">
              Governance
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

