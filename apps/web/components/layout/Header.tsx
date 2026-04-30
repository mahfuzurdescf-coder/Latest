'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { LogoMark } from '@/components/brand/LogoMark'
import { cn } from '@/lib/utils'
import type { SiteSettings } from '@/types/sanity'

interface HeaderProps {
  settings: SiteSettings
}

const DEFAULT_NAV = [
  { label: 'About', href: '/about' },
  { label: 'Current Work', href: '/current-work' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Newsroom', href: '/newsroom' },
  { label: 'Partner', href: '/partner' },
  { label: 'Contact', href: '/contact' },
]

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function Header({ settings }: HeaderProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = settings.navLinks?.length ? settings.navLinks : DEFAULT_NAV
  const donationLink = settings.donationLink ?? '/donate'

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <header className="sticky top-0 z-50 border-b border-earth-200 bg-white/95 backdrop-blur">
      <div className="container-site">
        <div className="flex h-18 min-h-16 items-center gap-6 py-3">
          <Link
              href="/"
              aria-label="Go to DESCF homepage"
              className="inline-flex items-center rounded-xl transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
            >
              <LogoMark showText />
            </Link>

          <nav
            className="ml-3 hidden items-center gap-1 lg:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    active
                      ? 'bg-forest-50 text-forest-800'
                      : 'text-earth-600 hover:bg-earth-100 hover:text-earth-950',
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <Link
              href={donationLink}
              className="hidden rounded-lg bg-bark-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-bark-600 sm:inline-flex"
            >
              Support DESCF
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-earth-200 bg-white text-earth-800 transition-colors hover:bg-earth-100 lg:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="sr-only">
                {menuOpen ? 'Close menu' : 'Open menu'}
              </span>
              <span aria-hidden="true" className="flex flex-col gap-1.5">
                <span
                  className={cn(
                    'block h-0.5 w-5 bg-current transition-transform',
                    menuOpen && 'translate-y-2 rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-5 bg-current transition-opacity',
                    menuOpen && 'opacity-0',
                  )}
                />
                <span
                  className={cn(
                    'block h-0.5 w-5 bg-current transition-transform',
                    menuOpen && '-translate-y-2 -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-earth-200 bg-white lg:hidden"
        >
          <div className="container-site py-4">
            <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href)

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      active
                        ? 'bg-forest-50 text-forest-800'
                        : 'text-earth-700 hover:bg-earth-100 hover:text-earth-950',
                    )}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <Link
                href={donationLink}
                className="mt-3 inline-flex justify-center rounded-lg bg-bark-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-bark-600"
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
