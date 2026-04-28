import Link from 'next/link'
import Image from 'next/image'
import { formatDateShort, getResourceTypeLabel, cn } from '@/lib/utils'
import { StatusBadge, CategoryBadge } from '@/components/ui'
import { urlForImage } from '@/lib/sanity/image'
import type {
  PostCard,
  ProgrammeCard as ProgrammeCardType,
  ResourceCard as ResourceCardType,
  EventCard as EventCardType,
  Author,
} from '@/types/sanity'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getContentTypeLabel(contentType?: string): string {
  if (!contentType) return 'Article'

  return contentType
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// ─── ArticleCard ──────────────────────────────────────────────────────────────

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
    <article className={cn('card-base group flex flex-col', className)}>
      {/* Cover image */}
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
            <div className="absolute inset-0 flex items-end bg-gradient-to-br from-forest-900 to-forest-700 p-4">
              <span className="text-label uppercase tracking-widest text-forest-400">
                {contentTypeLabel}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        {/* Category + type */}
        <div className="mb-3 flex items-center gap-2">
          {post.category && (
            <CategoryBadge
              title={post.category.title}
              slug={post.category.slug.current}
              colorLabel={post.category.colorLabel}
            />
          )}
          {post.editorPick && (
            <span className="rounded-md border border-bark-200 bg-bark-50 px-2 py-0.5 text-label text-bark-600">
              Editor&apos;s pick
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/newsroom/${post.slug.current}`}>
          <h3
            className={cn(
              'mb-2 font-medium leading-snug text-earth-900 transition-colors group-hover:text-forest-800',
              featured ? 'text-h4' : 'text-body-lg',
            )}
          >
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="mb-4 line-clamp-2 flex-1 text-body-sm text-earth-600">
            {post.excerpt}
          </p>
        )}

        {/* Meta: author + date + read time */}
        {(hasAuthor || hasDate || hasReadingTime) && (
          <div className="mt-auto flex items-center gap-2 border-t border-earth-100 pt-3 text-caption text-earth-500">
            {hasAuthor && (
              <span className="font-medium text-earth-700">{post.author?.name}</span>
            )}

            {hasAuthor && hasDate && <span className="text-earth-300">·</span>}

            {hasDate && post.publishedAt && (
              <time dateTime={post.publishedAt}>{formatDateShort(post.publishedAt)}</time>
            )}

            {(hasAuthor || hasDate) && hasReadingTime && (
              <span className="text-earth-300">·</span>
            )}

            {hasReadingTime && <span>{post.readingTime} min read</span>}
          </div>
        )}
      </div>
    </article>
  )
}

// ─── ProgrammeCard ────────────────────────────────────────────────────────────

interface ProgrammeCardProps {
  programme: ProgrammeCardType
  className?: string
}

export function ProgrammeCard({ programme, className }: ProgrammeCardProps) {
  const imageUrl = programme.heroImage
    ? urlForImage(programme.heroImage)?.width(600).height(320).url()
    : null

  return (
    <article className={cn('card-base group flex flex-col', className)}>
      <Link href={`/programmes/${programme.slug.current}`} tabIndex={-1}>
        <div className="relative aspect-[16/9] overflow-hidden bg-forest-900">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={programme.heroImage?.alt ?? programme.title}
              fill
              className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-forest-950 to-forest-800" />
          )}
          <div className="absolute bottom-3 left-3">
            <StatusBadge status={programme.status} />
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={`/programmes/${programme.slug.current}`}>
          <h3 className="mb-2 text-h5 font-medium text-earth-900 transition-colors group-hover:text-forest-800">
            {programme.title}
          </h3>
        </Link>
        {programme.shortDescription && (
          <p className="line-clamp-3 flex-1 text-body-sm text-earth-600">
            {programme.shortDescription}
          </p>
        )}
        <Link
          href={`/programmes/${programme.slug.current}`}
          className="mt-4 text-sm font-medium text-forest-700 transition-colors hover:text-forest-900"
        >
          Learn more →
        </Link>
      </div>
    </article>
  )
}

// ─── ResourceCard ─────────────────────────────────────────────────────────────

interface ResourceCardProps {
  resource: ResourceCardType
  className?: string
}

const RESOURCE_ICON: Record<string, string> = {
  report: '📄',
  'concept-note': '📋',
  brief: '📑',
  presentation: '📊',
  governance: '⚖️',
  'field-note': '🌿',
  'media-reference': '📰',
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  const href = resource.fileUrl ?? '/evidence-resources'

  return (
    <a
      href={href}
      target={resource.fileUrl ? '_blank' : undefined}
      rel={resource.fileUrl ? 'noopener noreferrer' : undefined}
      className={cn(
        'card-base group flex gap-4 p-5 transition-colors hover:border-forest-300',
        className,
      )}
    >
      <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-forest-100 bg-forest-50 text-lg">
        {RESOURCE_ICON[resource.type] ?? '📁'}
      </div>
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-label uppercase tracking-widest text-forest-700">
          {getResourceTypeLabel(resource.type)}
        </p>
        <h3 className="mb-1 text-body font-medium leading-snug text-earth-900 transition-colors group-hover:text-forest-800">
          {resource.title}
        </h3>
        {resource.summary && (
          <p className="mb-2 line-clamp-2 text-body-sm text-earth-500">{resource.summary}</p>
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

// ─── EventCard ────────────────────────────────────────────────────────────────

interface EventCardProps {
  event: EventCardType
  className?: string
}

export function EventCard({ event, className }: EventCardProps) {
  const date = new Date(event.date)
  const day = date.toLocaleDateString('en-GB', { day: '2-digit' })
  const month = date.toLocaleDateString('en-GB', { month: 'short' })
  const year = date.toLocaleDateString('en-GB', { year: 'numeric' })

  return (
    <Link
      href={`/events/${event.slug.current}`}
      className={cn('card-base group flex gap-4 p-5 transition-colors hover:border-forest-300', className)}
    >
      {/* Date block */}
      <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-lg border border-forest-200 bg-forest-50">
        <span className="text-xl font-medium leading-none text-forest-900">{day}</span>
        <span className="mt-0.5 text-caption uppercase tracking-wider text-forest-600">{month}</span>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center gap-2">
          <span
            className={cn(
              'rounded-md px-2 py-0.5 text-label',
              event.status === 'upcoming'
                ? 'border border-forest-200 bg-forest-50 text-forest-700'
                : 'bg-earth-100 text-earth-500',
            )}
          >
            {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
          </span>
          <span className="text-caption text-earth-400">{year}</span>
        </div>
        <h3 className="text-body font-medium leading-snug text-earth-900 transition-colors group-hover:text-forest-800">
          {event.title}
        </h3>
        {event.location && (
          <p className="mt-1 text-caption text-earth-500">{event.location}</p>
        )}
      </div>
    </Link>
  )
}

// ─── AuthorCard ───────────────────────────────────────────────────────────────

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
      {/* Avatar */}
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