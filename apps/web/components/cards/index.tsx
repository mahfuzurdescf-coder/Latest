import Link from 'next/link'
import Image from 'next/image'
import { formatDateShort, getResourceTypeLabel, cn } from '@/lib/utils'
import { StatusBadge, CategoryBadge } from '@/components/ui'
import { urlForImage } from '@/lib/sanity/image'
import type { PostCard, ProgrammeCard as ProgrammeCardType, ResourceCard as ResourceCardType, EventCard as EventCardType, Author } from '@/types/sanity'

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
            <div className="absolute inset-0 bg-gradient-to-br from-forest-900 to-forest-700 flex items-end p-4">
              <span className="text-label text-forest-400 uppercase tracking-widest">
                {post.contentType}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category + type */}
        <div className="flex items-center gap-2 mb-3">
          {post.category && (
            <CategoryBadge
              title={post.category.title}
              slug={post.category.slug.current}
              colorLabel={post.category.colorLabel}
            />
          )}
          {post.editorPick && (
            <span className="text-label text-bark-600 bg-bark-50 border border-bark-200 px-2 py-0.5 rounded-md">
              Editor's pick
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/newsroom/${post.slug.current}`}>
          <h3 className={cn(
            'font-medium text-earth-900 leading-snug group-hover:text-forest-800 transition-colors mb-2',
            featured ? 'text-h4' : 'text-body-lg'
          )}>
            {post.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-body-sm text-earth-600 line-clamp-2 mb-4 flex-1">{post.excerpt}</p>
        )}

        {/* Meta: author + date + read time */}
        <div className="flex items-center gap-2 text-caption text-earth-500 mt-auto pt-3 border-t border-earth-100">
          {post.author && (
            <span className="font-medium text-earth-700">{post.author.name}</span>
          )}
          <span className="text-earth-300">·</span>
          <time dateTime={post.publishedAt}>{formatDateShort(post.publishedAt)}</time>
          {post.readingTime && (
            <>
              <span className="text-earth-300">·</span>
              <span>{post.readingTime} min read</span>
            </>
          )}
        </div>
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
        <div className="relative aspect-[16/9] bg-forest-900 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={programme.heroImage?.alt ?? programme.title}
              fill
              className="object-cover opacity-80 transition-all duration-500 group-hover:opacity-90 group-hover:scale-105"
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

      <div className="flex flex-col flex-1 p-5">
        <Link href={`/programmes/${programme.slug.current}`}>
          <h3 className="text-h5 font-medium text-earth-900 group-hover:text-forest-800 transition-colors mb-2">
            {programme.title}
          </h3>
        </Link>
        {programme.shortDescription && (
          <p className="text-body-sm text-earth-600 line-clamp-3 flex-1">
            {programme.shortDescription}
          </p>
        )}
        <Link
          href={`/programmes/${programme.slug.current}`}
          className="mt-4 text-sm text-forest-700 font-medium hover:text-forest-900 transition-colors"
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
  'report': '📄', 'concept-note': '📋', 'brief': '📑',
  'presentation': '📊', 'governance': '⚖️', 'field-note': '🌿', 'media-reference': '📰',
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  const href = resource.fileUrl ?? `/evidence-resources`

  return (
    <a
      href={href}
      target={resource.fileUrl ? '_blank' : undefined}
      rel={resource.fileUrl ? 'noopener noreferrer' : undefined}
      className={cn(
        'card-base flex gap-4 p-5 group hover:border-forest-300 transition-colors',
        className
      )}
    >
      <div className="w-10 h-10 rounded-lg bg-forest-50 border border-forest-100 flex items-center justify-center text-lg flex-shrink-0 mt-0.5">
        {RESOURCE_ICON[resource.type] ?? '📁'}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-label text-forest-700 uppercase tracking-widest mb-1">
          {getResourceTypeLabel(resource.type)}
        </p>
        <h3 className="text-body font-medium text-earth-900 group-hover:text-forest-800 transition-colors leading-snug mb-1">
          {resource.title}
        </h3>
        {resource.summary && (
          <p className="text-body-sm text-earth-500 line-clamp-2 mb-2">{resource.summary}</p>
        )}
        {resource.pubDate && (
          <p className="text-caption text-earth-400">{formatDateShort(resource.pubDate)}</p>
        )}
      </div>
      {resource.fileUrl && (
        <svg className="w-4 h-4 text-earth-400 flex-shrink-0 mt-1 group-hover:text-forest-600 transition-colors" fill="none" viewBox="0 0 16 16">
          <path d="M4 12L12 4M12 4H7M12 4v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
  const day   = date.toLocaleDateString('en-GB', { day: '2-digit' })
  const month = date.toLocaleDateString('en-GB', { month: 'short' })
  const year  = date.toLocaleDateString('en-GB', { year: 'numeric' })

  return (
    <Link
      href={`/events/${event.slug.current}`}
      className={cn('card-base flex gap-4 p-5 group hover:border-forest-300 transition-colors', className)}
    >
      {/* Date block */}
      <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-forest-50 border border-forest-200 flex-shrink-0">
        <span className="text-xl font-medium text-forest-900 leading-none">{day}</span>
        <span className="text-caption text-forest-600 uppercase tracking-wider mt-0.5">{month}</span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn(
            'text-label px-2 py-0.5 rounded-md',
            event.status === 'upcoming'
              ? 'bg-forest-50 text-forest-700 border border-forest-200'
              : 'bg-earth-100 text-earth-500'
          )}>
            {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
          </span>
          <span className="text-caption text-earth-400">{year}</span>
        </div>
        <h3 className="text-body font-medium text-earth-900 group-hover:text-forest-800 transition-colors leading-snug">
          {event.title}
        </h3>
        {event.location && (
          <p className="text-caption text-earth-500 mt-1">{event.location}</p>
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
      <div className="w-10 h-10 rounded-full bg-forest-800 flex items-center justify-center overflow-hidden flex-shrink-0">
        {imageUrl ? (
          <Image src={imageUrl} alt={author.name} width={40} height={40} className="object-cover" />
        ) : (
          <span className="text-sm font-medium text-forest-200">
            {author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
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
      <Link href={`/newsroom/author/${author.slug.current}`} className="hover:opacity-80 transition-opacity">
        {inner}
      </Link>
    )
  }
  return inner
}
