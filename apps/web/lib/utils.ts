import { format, parseISO } from 'date-fns'
import { clsx, type ClassValue } from 'clsx'
import type { ProgrammeStatus, ResourceType } from '@/types/sanity'

/** Merge Tailwind class names safely */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/** Format ISO date string to readable format */
export function formatDate(dateString: string, pattern = 'd MMMM yyyy'): string {
  try {
    return format(parseISO(dateString), pattern)
  } catch {
    return dateString
  }
}

/** Short date for card metadata */
export function formatDateShort(dateString: string): string {
  return formatDate(dateString, 'MMM d, yyyy')
}

/** Programme status → label + CSS class */
export function getProgrammeStatusMeta(status: ProgrammeStatus): {
  label: string
  className: string
} {
  const map: Record<ProgrammeStatus, { label: string; className: string }> = {
    'current':        { label: 'Current',        className: 'badge-current' },
    'in-preparation': { label: 'In Preparation',  className: 'badge-preparation' },
    'in-development': { label: 'In Development',  className: 'badge-development' },
    'exploratory':    { label: 'Exploratory',     className: 'badge-exploratory' },
  }
  return map[status] ?? { label: status, className: 'badge-exploratory' }
}

/** Resource type → readable label */
export function getResourceTypeLabel(type: ResourceType): string {
  const map: Record<ResourceType, string> = {
    'report':           'Report',
    'concept-note':     'Concept Note',
    'brief':            'Policy Brief',
    'presentation':     'Presentation',
    'media-reference':  'Media Reference',
    'field-note':       'Field Note',
    'governance':       'Governance Document',
  }
  return map[type] ?? type
}

/** Truncate text to n words */
export function truncateWords(text: string, wordCount = 30): string {
  const words = text.trim().split(/\s+/)
  if (words.length <= wordCount) return text
  return words.slice(0, wordCount).join(' ') + '…'
}

/** Absolute URL for OG/SEO */
export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://descf.org'
  return `${base}${path}`
}
