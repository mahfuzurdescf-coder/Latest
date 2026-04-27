import Link from 'next/link'
import { cn, getProgrammeStatusMeta } from '@/lib/utils'
import type { ProgrammeStatus } from '@/types/sanity'

// ─── StatusBadge ──────────────────────────────────────────────────────────────

interface StatusBadgeProps {
  status: ProgrammeStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, className: statusClass } = getProgrammeStatusMeta(status)
  return (
    <span className={cn(statusClass, className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60 inline-block" />
      {label}
    </span>
  )
}

// ─── CategoryBadge ────────────────────────────────────────────────────────────

interface CategoryBadgeProps {
  title: string
  slug?: string
  colorLabel?: string
  className?: string
}

export function CategoryBadge({ title, slug, colorLabel, className }: CategoryBadgeProps) {
  const style = colorLabel ? { backgroundColor: `${colorLabel}18`, color: colorLabel, borderColor: `${colorLabel}40` } : undefined
  const classes = cn(
    'inline-flex items-center text-label px-2.5 py-1 rounded-md border',
    !colorLabel && 'bg-forest-50 text-forest-800 border-forest-200',
    className
  )
  if (slug) {
    return <Link href={`/newsroom/category/${slug}`} className={cn(classes, 'hover:opacity-80 transition-opacity')} style={style}>{title}</Link>
  }
  return <span className={classes} style={style}>{title}</span>
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  action?: { label: string; href: string }
  className?: string
}

export function SectionHeader({ label, title, subtitle, align = 'left', action, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-10', align === 'center' && 'text-center', className)}>
      {label && (
        <p className="section-label mb-3">{label}</p>
      )}
      <div className={cn('flex items-end gap-6', align === 'center' && 'justify-center flex-col')}>
        <h2 className="text-h2 font-serif text-earth-900">{title}</h2>
        {action && align !== 'center' && (
          <Link href={action.href} className="btn-ghost text-sm mb-1 flex-shrink-0">
            {action.label} →
          </Link>
        )}
      </div>
      {subtitle && (
        <p className="mt-3 text-body text-earth-600 max-w-prose-sm">{subtitle}</p>
      )}
      {action && align === 'center' && (
        <Link href={action.href} className="btn-ghost text-sm mt-4 inline-flex">
          {action.label} →
        </Link>
      )}
    </div>
  )
}

// ─── Breadcrumbs ──────────────────────────────────────────────────────────────

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1.5 text-xs text-earth-500', className)}>
      <Link href="/" className="hover:text-earth-700 transition-colors">Home</Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="text-earth-300">/</span>
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="hover:text-earth-700 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-earth-700 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

// ─── Pagination ───────────────────────────────────────────────────────────────

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  className?: string
}

export function Pagination({ currentPage, totalPages, basePath, className }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className={cn('flex items-center justify-center gap-2 mt-12', className)}>
      {currentPage > 1 && (
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className="px-4 py-2 text-sm rounded-lg border border-earth-200 text-earth-600 hover:bg-earth-100 transition-colors"
        >
          ← Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`${basePath}?page=${page}`}
          className={cn(
            'w-9 h-9 flex items-center justify-center text-sm rounded-lg transition-colors',
            page === currentPage
              ? 'bg-forest-800 text-forest-50'
              : 'border border-earth-200 text-earth-600 hover:bg-earth-100'
          )}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className="px-4 py-2 text-sm rounded-lg border border-earth-200 text-earth-600 hover:bg-earth-100 transition-colors"
        >
          Next →
        </Link>
      )}
    </nav>
  )
}

// ─── DonationCTA ──────────────────────────────────────────────────────────────

interface DonationCTAProps {
  donationLink?: string
  className?: string
}

export function DonationCTA({ donationLink = '/donate', className }: DonationCTAProps) {
  return (
    <section className={cn('bg-bark-700 text-bark-50 rounded-2xl p-8 md:p-10', className)}>
      <p className="section-label text-bark-300 mb-3">Support conservation</p>
      <h2 className="text-h3 font-serif text-bark-50 mb-3">
        Help DESCF protect wildlife in Bangladesh
      </h2>
      <p className="text-body-sm text-bark-200 mb-6 max-w-prose-sm">
        DESCF is a field-based, mission-driven conservation organisation. Your support helps
        us sustain rescue response, awareness outreach, and conservation documentation.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href={donationLink} className="btn-cta bg-bark-400 hover:bg-bark-300">
          Support DESCF
        </Link>
        <Link href="/partner" className="btn-ghost text-bark-200 hover:text-bark-50 hover:bg-bark-600">
          Partner with us →
        </Link>
      </div>
    </section>
  )
}

// ─── PartnerCTA ───────────────────────────────────────────────────────────────

export function PartnerCTA({ className }: { className?: string }) {
  return (
    <section className={cn('bg-forest-900 text-forest-50 rounded-2xl p-8 md:p-10', className)}>
      <p className="section-label text-forest-500 mb-3">Collaboration</p>
      <h2 className="text-h3 font-serif text-forest-50 mb-3">Partner with DESCF</h2>
      <p className="text-body-sm text-forest-300 mb-6 max-w-prose-sm">
        We welcome mission-aligned funders, research institutions, and conservation professionals
        who want to strengthen wildlife protection in Bangladesh.
      </p>
      <div className="flex flex-wrap gap-3">
        <Link href="/partner"  className="btn-primary bg-forest-700 hover:bg-forest-600">Partner with us</Link>
        <Link href="/contact"  className="btn-secondary border-forest-700 text-forest-300 hover:bg-forest-800 hover:text-forest-50">Contact DESCF</Link>
      </div>
    </section>
  )
}
