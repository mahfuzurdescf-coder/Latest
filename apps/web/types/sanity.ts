import type { PortableTextBlock } from '@portabletext/react'

// ─── Shared primitives ────────────────────────────────────────────────────────

export interface SanitySlug {
  current: string
}

export interface SanityImageAsset {
  _id: string
  url: string
  metadata?: {
    dimensions?: {
      width: number
      height: number
      aspectRatio: number
    }
    lqip?: string
  }
}

export interface SanityImage {
  _type?: 'image'
  asset?: SanityImageAsset
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface SocialLinks {
  twitter?: string
  linkedin?: string
  facebook?: string
  instagram?: string
  youtube?: string
  website?: string
}

// ─── Programme status & content types ─────────────────────────────────────────

export type ProgrammeStatus =
  | 'current'
  | 'in-preparation'
  | 'in-development'
  | 'exploratory'

export type PostContentType =
  | 'article'
  | 'field-note'
  | 'news'
  | 'report'
  | 'briefing'
  | 'interview'
  | 'event-update'

export type PostStatus =
  | 'draft'
  | 'review'
  | 'assigned'
  | 'inReview'
  | 'factCheck'
  | 'ready'
  | 'published'
  | 'archived'

export type PostLanguage = 'en' | 'bn'

export type ResourceType =
  | 'report'
  | 'concept-note'
  | 'brief'
  | 'presentation'
  | 'media-reference'
  | 'field-note'
  | 'governance'

export type EventStatus = 'upcoming' | 'completed'

// ─── Category ─────────────────────────────────────────────────────────────────

export interface Category {
  _id: string
  _type?: 'category'
  title: string
  slug: SanitySlug
  description?: string
  colorLabel?: string
}

// ─── Tag ──────────────────────────────────────────────────────────────────────

export interface Tag {
  _id: string
  _type?: 'tag'
  title: string
  slug: SanitySlug
}

// ─── Author ───────────────────────────────────────────────────────────────────

export interface Author {
  _id: string
  _type?: 'author'
  name: string
  slug: SanitySlug
  role?: string
  bio?: PortableTextBlock[]
  photo?: SanityImage
  email?: string
  social?: SocialLinks
  orgRole?: string
  expertise?: string[]
}

// ─── Post ─────────────────────────────────────────────────────────────────────

export interface Post {
  _id: string
  _type: 'post'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: SanitySlug
  excerpt?: string
  language: PostLanguage
  coverImage?: SanityImage
  category?: Category
  tags?: Tag[]
  author?: Author
  coAuthors?: Author[]
  publishedAt?: string
  updatedAt?: string
  readingTime?: number
  body?: PortableTextBlock[]
  seoTitle?: string
  seoDescription?: string
  ogImage?: SanityImage
  featured?: boolean
  editorPick?: boolean
  status?: PostStatus
  contentType?: PostContentType
  relatedPosts?: PostCard[]
}

// Lightweight card version — used in lists, grids
export interface PostCard
  extends Pick<
    Post,
    | '_id'
    | '_type'
    | '_createdAt'
    | '_updatedAt'
    | 'title'
    | 'slug'
    | 'excerpt'
    | 'coverImage'
    | 'publishedAt'
    | 'updatedAt'
    | 'readingTime'
    | 'featured'
    | 'editorPick'
    | 'contentType'
    | 'language'
    | 'status'
  > {
  category?: Pick<Category, '_id' | 'title' | 'slug' | 'colorLabel'>
  author?: Pick<Author, '_id' | 'name' | 'slug' | 'photo' | 'role' | 'orgRole'>
  tags?: Pick<Tag, '_id' | 'title' | 'slug'>[]
}

// ─── Impact metric ────────────────────────────────────────────────────────────

export interface ImpactMetric {
  _key: string
  label: string
  value: string
  description?: string
}

// ─── Programme ────────────────────────────────────────────────────────────────

export interface Programme {
  _id: string
  _type: 'programme'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: SanitySlug
  shortDescription?: string
  status: ProgrammeStatus
  heroImage?: SanityImage
  body?: PortableTextBlock[]
  keyActivities?: string[]
  impactMetrics?: ImpactMetric[]
  relatedPosts?: PostCard[]
  relatedResources?: ResourceCard[]
  seoTitle?: string
  seoDescription?: string
}

export interface ProgrammeCard
  extends Pick<
    Programme,
    | '_id'
    | '_type'
    | 'title'
    | 'slug'
    | 'shortDescription'
    | 'status'
    | 'heroImage'
  > {}

// ─── Resource ─────────────────────────────────────────────────────────────────

export interface Resource {
  _id: string
  _type: 'resource'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: SanitySlug
  type: ResourceType
  fileUrl?: string
  pubDate?: string
  summary?: string
  relatedProgramme?: ProgrammeCard
  seoTitle?: string
  seoDescription?: string
}

export interface ResourceCard
  extends Pick<
    Resource,
    | '_id'
    | '_type'
    | 'title'
    | 'slug'
    | 'type'
    | 'fileUrl'
    | 'pubDate'
    | 'summary'
  > {}

// ─── Event ────────────────────────────────────────────────────────────────────

export interface Event {
  _id: string
  _type: 'event'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: SanitySlug
  date: string
  time?: string
  location?: string
  description?: PortableTextBlock[]
  speakers?: string[]
  registrationLink?: string
  status: EventStatus
}

export interface EventCard
  extends Pick<
    Event,
    | '_id'
    | '_type'
    | 'title'
    | 'slug'
    | 'date'
    | 'time'
    | 'location'
    | 'status'
  > {}

// ─── TeamMember ───────────────────────────────────────────────────────────────

export interface TeamMember {
  _id: string
  _type: 'teamMember'
  _createdAt?: string
  _updatedAt?: string
  name: string
  slug: SanitySlug
  role: string
  photo?: SanityImage
  bio?: PortableTextBlock[]
  order: number
  social?: SocialLinks
}

// ─── NavLink ──────────────────────────────────────────────────────────────────

export interface NavLink {
  _key: string
  label: string
  href: string
}

// ─── SiteSettings ─────────────────────────────────────────────────────────────

export interface SiteSettings {
  _id?: string
  _type?: 'siteSettings'
  siteTitle?: string
  tagline?: string
  tagline_bn?: string
  logo?: SanityImage
  navLinks?: NavLink[]
  footerLinks?: NavLink[]
  social?: SocialLinks
  contactEmail?: string
  contactPhone?: string
  address?: string
  donationLink?: string
  defaultOgImage?: SanityImage
}

// ─── Page metadata ────────────────────────────────────────────────────────────

export interface PageSEO {
  title: string
  description?: string
  ogImage?: SanityImage
  canonicalUrl?: string
}