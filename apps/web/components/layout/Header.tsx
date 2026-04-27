'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { SiteSettings } from '@/types/sanity'

interface HeaderProps {
  settings: SiteSettings
}

const DEFAULT_NAV = [
  { label: 'About',       href: '/about' },
  { label: 'Current Work',href: '/current-work' },
  { label: 'Programmes',  href: '/programmes' },
  { label: 'Newsroom',    href: '/newsroom' },
  { label: 'Partner',     href: '/partner' },
  { label: 'Contact',     href: '/contact' },
]

export function Header({ settings }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const navLinks = settings.navLinks?.length ? settings.navLinks : DEFAULT_NAV
  const donationLink = settings.donationLink ?? '/donate'

  return (
    <header className="sticky top-0 z-50 bg-forest-900 border-b border-forest-800">
      <div className="container-site">
        <div className="flex items-center h-16 gap-8">
          {/* Logo / wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0"
          >
            <span className="sr-only">{settings.siteTitle}</span>
            <span className="font-serif text-xl font-medium text-forest-50 tracking-tight">
              DESCF
            </span>
            <span className="hidden sm:block text-forest-400 text-xs font-medium mt-0.5 leading-tight max-w-[160px]">
              Deep Ecology & Snake Conservation Foundation
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 ml-4" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-forest-300 hover:text-forest-50 hover:bg-forest-800 rounded-md transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Donate CTA */}
          <div className="ml-auto flex items-center gap-3">
            <Link
              href={donationLink}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-bark-500 text-bark-50 hover:bg-bark-600 transition-colors duration-150"
            >
              Support DESCF
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-forest-800 transition-colors"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span className={`block w-5 h-0.5 bg-forest-300 transition-transform duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-forest-300 transition-opacity duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-forest-300 transition-transform duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-forest-900 border-t border-forest-800 animate-slide-down">
          <div className="container-site py-3">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="px-3 py-2.5 text-sm text-forest-300 hover:text-forest-50 hover:bg-forest-800 rounded-md transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={donationLink}
                onClick={() => setMenuOpen(false)}
                className="mt-2 btn-cta justify-center"
              >
                Support DESCF
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
