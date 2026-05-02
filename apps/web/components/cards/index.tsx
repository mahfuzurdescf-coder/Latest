import Image from 'next/image'
import Link from 'next/link'

import { StatusBadge, CategoryBadge } from '@/components/ui'
import { urlForImage } from '@/lib/sanity/image'
import { cn, formatDateShort, getResourceTypeLabel } from '@/lib/utils'
import type {
  Author,
  EventCard as EventCardType,
  PostCard,
  ProgrammeCard as ProgrammeCardType,
  ResourceCard as ResourceCardType,
} from '@/types/sanity'

// Helpers

function getContentTypeLabel(contentType?: string): string {
  if (!contentType) return 'Article'

  return contentType
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// ArticleCard

interface ArticleCardProps {
  post: PostCard
  featured?: boolean
  className?: string
}

export function ArticleCard({ post, featured = false, className }: ArticleCardProps) {
  const imageUrl = post.coverImage
    ? urlForImage(post.coverImage)?.width(featured ? 1200 : 800).height(featured ? 630 : 420).url()
    : null

  const contentTypeLabel = getContentTypeLabel(post.contentType)
  const hasAuthor = Boolean(post.author?.name)
  const hasDate = Boolean(post.publishedAt)
  const hasReadingTime = typeof post.readingTime === 'number' && post.readingTime > 0

  return (
    <article
      className={cn(
        'card-base group flex flex-col overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:border-forest-300 hover:shadow-card',
        className,
      )}
    >
      <Link href={`/newsroom/${post.slug.current}`} className="block overflow-hidden" tabIndex={-1}>
        <div className={cn('relative overflow-hidden bg-earth-200', featured ? 'aspect-[16/9]' : 'aspect-[3/2]')}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.coverImage?.alt ?? post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
            />
          ) : (
            <div className="absolute inset-0 flex items-end bg-gradient-to-br from-forest-950 via-forest-900 to-forest-700 p-5">
              <span className="text-label uppercase tracking-widest text-forest-200">
                {contentTypeLabel}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {post.category && (
            <CategoryBadge
              title={post.category.title}
              slug={post.category.slug.current}
              colorLabel={post.category.colorLabel}
            />
          )}

          {post.editorPick && (
            <span className="rounded-md border border-bark-200 bg-bark-50 px-2 py-0.5 text-label text-bark-700">
              Editor&apos;s pick
            </span>
          )}
        </div>

        <Link href={`/newsroom/${post.slug.current}`}>
          <h3
            className={cn(
              'mb-2 font-medium leading-snug text-earth-950 transition-colors group-hover:text-forest-800',
              featured ? 'text-h4' : 'text-body-lg',
            )}
          >
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="mb-4 line-clamp-2 flex-1 text-body-sm leading-6 text-earth-600">
            {post.excerpt}
          </p>
        )}

        {(hasAuthor || hasDate || hasReadingTime) && (
          <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-earth-100 pt-3 text-caption text-earth-500">
            {hasAuthor && (
              <span className="font-medium text-earth-700">{post.author?.name}</span>
            )}

            {hasAuthor && hasDate && <span aria-hidden="true" className="text-earth-300">/</span>}

            {hasDate && post.publishedAt && (
              <time dateTime={post.publishedAt}>{formatDateShort(post.publishedAt)}</time>
            )}

            {(hasAuthor || hasDate) && hasReadingTime && (
              <span aria-hidden="true" className="text-earth-300">/</span>
            )}

            {hasReadingTime && <span>{post.readingTime} min read</span>}
          </div>
        )}
      </div>
    </article>
  )
}

// ProgrammeCard

interface ProgrammeCardProps {
  programme: ProgrammeCardType
  className?: string
}

export function ProgrammeCard({ programme, className }: ProgrammeCardProps) {
  const programmeSlug = programme.slug?.current

  if (!programmeSlug) {
    return null
  }

  const imageUrl = programme.heroImage
    ? urlForImage(programme.heroImage)?.width(700).height(420).url()
    : null

  return (
    <article
      className={cn(
        'card-base group flex flex-col overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:border-forest-300 hover:shadow-card',
        className,
      )}
    >
      <Link href={`/programmes/${programme.slug.current}`} tabIndex={-1}>
        <div className="relative aspect-[16/10] overflow-hidden bg-forest-950">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={programme.heroImage?.alt ?? programme.title}
              fill
              className="object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-forest-950 via-forest-900 to-forest-700" />
          )}

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-forest-950/70 to-transparent" />

          <div className="absolute bottom-3 left-3">
            <StatusBadge status={programme.status} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/programmes/${programme.slug.current}`}>
          <h3 className="mb-2 text-h5 font-medium leading-tight text-earth-950 transition-colors group-hover:text-forest-800">
            {programme.title}
          </h3>
        </Link>

        {programme.shortDescription && (
          <p className="line-clamp-3 flex-1 text-body-sm leading-6 text-earth-600">
            {programme.shortDescription}
          </p>
        )}

        <Link
          href={`/programmes/${programme.slug.current}`}
          className="mt-5 inline-flex items-center text-sm font-semibold text-forest-700 transition-colors hover:text-forest-950"
        >
          Learn more <span aria-hidden="true" className="ml-1">-&gt;</span>
        </Link>
      </div>
    </article>
  )
}

// ResourceCard

interface ResourceCardProps {
  resource: ResourceCardType
  className?: string
}

const RESOURCE_ICON: Record<string, string> = {
  report: 'RP',
  'concept-note': 'CN',
  brief: 'BR',
  presentation: 'PR',
  governance: 'GV',
  'field-note': 'FN',
  'media-reference': 'MR',
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  const href = resource.fileUrl ?? '/evidence-resources'
  const iconLabel = RESOURCE_ICON[resource.type] ?? 'RS'

  return (
    <a
      href={href}
      target={resource.fileUrl ? '_blank' : undefined}
      rel={resource.fileUrl ? 'noopener noreferrer' : undefined}
      className={cn(
        'card-base group flex gap-4 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-forest-300 hover:shadow-card',
        className,
      )}
    >
      <div className="mt-0.5 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-forest-100 bg-forest-50 text-xs font-bold tracking-wide text-forest-800">
        {iconLabel}
      </div>

      <div className="min-w-0 flex-1">
        <p className="mb-1 text-label uppercase tracking-widest text-forest-700">
          {getResourceTypeLabel(resource.type)}
        </p>

        <h3 className="mb-1 text-body font-medium leading-snug text-earth-950 transition-colors group-hover:text-forest-800">
          {resource.title}
        </h3>

        {resource.summary && (
          <p className="mb-2 line-clamp-2 text-body-sm leading-6 text-earth-600">{resource.summary}</p>
        )}

        {resource.pubDate && (
          <p className="text-caption text-earth-400">{formatDateShort(resource.pubDate)}</p>
        )}
      </div>

      {resource.fileUrl && (
        <svg
          className="mt-1 h-4 w-4 flex-shrink-0 text-earth-400 transition-colors group-hover:text-forest-600"
          fill="none"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path
            d="M4 12L12 4M12 4H7M12 4v5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </a>
  )
}

// EventCard

interface EventCardProps {
  event: EventCardType
  className?: string
}

export function EventCard({ event, className }: EventCardProps) {
  const date = new Date(event.date)
  const day = date.toLocaleDateString('en-GB', { day: '2-digit' })
  const month = date.toLocaleDateString('en-GB', { month: 'short' })
  const year = date.toLocaleDateString('en-GB', { year: 'numeric' })
  const isUpcoming = event.status === 'upcoming'
  const detailHref = `/events/${event.slug.current}`
  const registerHref = `${detailHref}#registration`

  return (
    <article
      className={cn(
        'card-base group flex flex-col gap-5 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-forest-300 hover:shadow-card sm:flex-row sm:items-center',
        className,
      )}
    >
      <div className="flex h-16 w-16 flex-shrink-0 flex-col items-center justify-center rounded-xl border border-forest-200 bg-forest-50">
        <span className="text-2xl font-medium leading-none text-forest-900">{day}</span>
        <span className="mt-0.5 text-caption uppercase tracking-wider text-forest-600">{month}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              'rounded-md px-2 py-0.5 text-label',
              isUpcoming
                ? 'border border-forest-200 bg-forest-50 text-forest-700'
                : 'bg-earth-100 text-earth-500',
            )}
          >
            {isUpcoming ? 'Upcoming' : 'Completed'}
          </span>

          <span className="rounded-md border border-earth-200 bg-earth-50 px-2 py-0.5 text-label text-earth-600">
            {year}
          </span>

          {event.time ? (
            <span className="rounded-md border border-earth-200 bg-earth-50 px-2 py-0.5 text-label text-earth-600">
              {event.time}
            </span>
          ) : null}

          {isUpcoming ? (
            <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-label text-amber-800">
              Registration open
            </span>
          ) : null}
        </div>

        <h3 className="font-serif text-2xl leading-tight text-earth-950">
          <Link href={detailHref} className="transition hover:text-forest-700">
            {event.title}
          </Link>
        </h3>

        {event.location ? (
          <p className="mt-2 text-body-sm text-earth-600">{event.location}</p>
        ) : null}
      </div>

      <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
        <Link href={detailHref} className="btn-secondary px-4 py-2 text-xs">
          View event
        </Link>

        {isUpcoming ? (
          <Link href={registerHref} className="btn-primary px-4 py-2 text-xs">
            Register
          </Link>
        ) : null}
      </div>
    </article>
  )
}

// AuthorCard

interface AuthorCardProps {
  author: Pick<Author, '_id' | 'name' | 'slug' | 'photo' | 'role' | 'orgRole'>
  showLink?: boolean
  className?: string
}

export function AuthorCard({ author, showLink = true, className }: AuthorCardProps) {
  const imageUrl = author.photo
    ? urlForImage(author.photo)?.width(80).height(80).url()
    : null

  const inner = (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-forest-800">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={author.name}
            width={40}
            height={40}
            className="object-cover"
          />
        ) : (
          <span className="text-sm font-medium text-forest-200">
            {author.name
              .split(' ')
              .map((namePart) => namePart[0])
              .join('')
              .slice(0, 2)}
          </span>
        )}
      </div>

      <div>
        <p className="text-sm font-medium text-earth-900">{author.name}</p>
        <p className="text-caption text-earth-500">{author.orgRole ?? author.role}</p>
      </div>
    </div>
  )

  if (showLink) {
    return (
      <Link
        href={`/newsroom/author/${author.slug.current}`}
        className="transition-opacity hover:opacity-80"
      >
        {inner}
      </Link>
    )
  }

  return inner
}

