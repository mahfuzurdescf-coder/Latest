import Link from 'next/link'
import type { SiteSettings } from '@/types/sanity'

interface FooterProps {
  settings: SiteSettings
}

const FOOTER_SECTIONS = [
  {
    title: 'Organisation',
    links: [
      { label: 'About DESCF',          href: '/about' },
      { label: 'Mission & Vision',     href: '/mission' },
      { label: 'Leadership',           href: '/leadership' },
      { label: 'Governance',           href: '/governance' },
    ],
  },
  {
    title: 'Work',
    links: [
      { label: 'Current Work',         href: '/current-work' },
      { label: 'Programmes',           href: '/programmes' },
      { label: 'Strategic Priorities', href: '/strategic-priorities' },
      { label: 'Events',               href: '/events' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Newsroom',             href: '/newsroom' },
      { label: 'Reports & Publications',href: '/reports' },
      { label: 'Evidence & Resources', href: '/evidence-resources' },
      { label: 'Media',                href: '/media' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'Partner With Us',      href: '/partner' },
      { label: 'Support DESCF',        href: '/donate' },
      { label: 'Contact',              href: '/contact' },
    ],
  },
]

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-earth-900 text-earth-300 mt-auto">
      {/* Top CTA band */}
      <div className="bg-forest-900 border-b border-forest-800">
        <div className="container-site py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-label text-forest-500 uppercase tracking-widest mb-2">
                Support conservation in Bangladesh
              </p>
              <h2 className="text-xl font-medium text-forest-50">
                Help DESCF protect wildlife and build coexistence.
              </h2>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/donate"  className="btn-cta">Support DESCF</Link>
              <Link href="/partner" className="btn-secondary border-forest-700 text-forest-300 hover:bg-forest-800 hover:text-forest-50">Partner with us</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-site py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="block mb-4">
              <span className="font-serif text-lg font-medium text-earth-100">DESCF</span>
            </Link>
            <p className="text-sm text-earth-400 leading-relaxed mb-4">
              Deep Ecology and Snake Conservation Foundation — working at the intersection of
              herpetofauna conservation, public awareness, and human-wildlife coexistence in Bangladesh.
            </p>
            {settings.contactEmail && (
              <a
                href={`mailto:${settings.contactEmail}`}
                className="text-sm text-forest-400 hover:text-forest-300 transition-colors"
              >
                {settings.contactEmail}
              </a>
            )}
          </div>

          {/* Link sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-label text-earth-500 uppercase tracking-widest mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-earth-400 hover:text-earth-200 transition-colors"
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

      {/* Bottom bar */}
      <div className="border-t border-earth-800">
        <div className="container-site py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-xs text-earth-600">
            © {year} Deep Ecology and Snake Conservation Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/governance" className="text-xs text-earth-600 hover:text-earth-400 transition-colors">
              Governance
            </Link>
            <Link href="/contact" className="text-xs text-earth-600 hover:text-earth-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
