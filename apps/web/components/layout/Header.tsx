'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { LogoMark } from '@/components/brand/LogoMark'
import { cn } from '@/lib/utils'
import type { NavLink, SiteSettings } from '@/types/sanity'

interface HeaderProps {
  settings: SiteSettings
}

const DEFAULT_NAV: NavLink[] = [
  { label: 'সংগঠন', href: '/about' },
  { label: 'চলমান কাজ', href: '/current-work' },
  { label: 'প্রকৃতি কথা', href: '/prokriti-kotha' },
  { label: 'বাংলাদেশের সাপ', href: '/bangladesh-wildlife/snakes' },
  { label: 'রিসোর্স', href: '/evidence-resources' },
  { label: 'যোগাযোগ', href: '/contact' },
]

const FIXED_LABELS_BY_HREF: Record<string, string> = {
  '/prakriti-kotha': 'প্রকৃতি কথা',
  '/prokriti-kotha': 'প্রকৃতি কথা',
  '/bangladesher-sap': 'বাংলাদেশের সাপ',
  '/bangladesh-wildlife/snakes': 'বাংলাদেশের সাপ',
}

function hasMojibake(value?: string) {
  if (!value) return false

  return Array.from(value).some((character) => {
    const code = character.charCodeAt(0)

    return (
      code === 0x00c3 ||
      code === 0x00c2 ||
      code === 0x00e2 ||
      code === 0xfffd
    )
  })
}

function getDisplayLabel(link: NavLink) {
  const fixedLabel = link.href ? FIXED_LABELS_BY_HREF[link.href] : undefined
  const label = link.label?.trim()

  if (fixedLabel && (!label || hasMojibake(label))) return fixedLabel
  return label || fixedLabel || ''
}

function getNavigationLinks(settings: SiteSettings) {
  const studioLinks =
    settings.navLinks?.filter((link) => link?.href && getDisplayLabel(link)) ?? []

  return studioLinks.length > 0 ? studioLinks : DEFAULT_NAV
}

function isExternalLink(link: NavLink) {
  if (!link.href) return false
  return link.isExternal || /^https?:\/\//.test(link.href) || link.href.startsWith('mailto:')
}

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

function HeaderNavItem({
  link,
  pathname,
  className,
}: {
  link: NavLink
  pathname: string
  className: string
}) {
  const href = link.href
  const label = getDisplayLabel(link)

  if (!href || !label) return null

  const active = !isExternalLink(link) && isActivePath(pathname, href)

  const itemClassName = cn(
    className,
    active
      ? 'bg-forest-50 text-forest-800'
      : 'text-earth-600 hover:bg-earth-100 hover:text-earth-950',
  )

  if (isExternalLink(link)) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={itemClassName}
      >
        {label}
      </a>
    )
  }

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={itemClassName}
    >
      {label}
    </Link>
  )
}

export function Header({ settings }: HeaderProps) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = getNavigationLinks(settings)
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
            {navLinks.map((link) => (
              <HeaderNavItem
                key={`${link.href}-${getDisplayLabel(link)}`}
                link={link}
                pathname={pathname}
                className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors"
              />
            ))}
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
              {navLinks.map((link) => (
                <HeaderNavItem
                  key={`${link.href}-${getDisplayLabel(link)}-mobile`}
                  link={link}
                  pathname={pathname}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                />
              ))}

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


