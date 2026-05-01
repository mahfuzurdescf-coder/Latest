import type { PortableTextBlock } from '@portabletext/react'

// â”€â”€â”€ Shared primitives â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
  credit?: string
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

// â”€â”€â”€ Programme status & content types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Category â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface Category {
  _id: string
  _type?: 'category'
  title: string
  slug: SanitySlug
  description?: string
  colorLabel?: string
}

// â”€â”€â”€ Tag â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface Tag {
  _id: string
  _type?: 'tag'
  title: string
  slug: SanitySlug
}

// â”€â”€â”€ Author â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Post â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// Lightweight card version â€” used in lists, grids
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

// â”€â”€â”€ Impact metric â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface ImpactMetric {
  _key: string
  label: string
  value: string
  description?: string
}

// â”€â”€â”€ Programme â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Resource â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Event â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ TeamMember â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ NavLink â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface NavLink {
  _key?: string
  label: string
  href: string
  isExternal?: boolean
}

// â”€â”€â”€ SiteSettings â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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

// â”€â”€â”€ Page metadata â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export interface PageSEO {
  title: string
  description?: string
  ogImage?: SanityImage
  canonicalUrl?: string
}

// â”€â”€â”€ DESCF institutional CMS types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export type PartnerType =
  | 'research'
  | 'education'
  | 'conservation'
  | 'media'
  | 'donor'
  | 'community'
  | 'other'

export type PartnerRelationshipStatus =
  | 'current'
  | 'past'
  | 'prospective'

export interface Partner {
  _id: string
  _type: 'partner'
  name: string
  slug: SanitySlug
  logo?: SanityImage
  website?: string
  summary?: string
  partnerType?: PartnerType
  relationshipStatus?: PartnerRelationshipStatus
  featured?: boolean
  order?: number
  seoTitle?: string
  seoDescription?: string
}

export interface PartnerCard
  extends Pick<
    Partner,
    | '_id'
    | '_type'
    | 'name'
    | 'slug'
    | 'logo'
    | 'website'
    | 'summary'
    | 'partnerType'
    | 'relationshipStatus'
    | 'featured'
    | 'order'
  > {}

export type GovernanceDocumentType =
  | 'policy'
  | 'guideline'
  | 'governance-note'
  | 'annual-report'
  | 'audit-compliance'
  | 'other'

export type GovernanceDocumentStatus =
  | 'draft'
  | 'published'
  | 'archived'

export interface GovernanceDocument {
  _id: string
  _type: 'governanceDocument'
  title: string
  slug: SanitySlug
  summary?: string
  documentType?: GovernanceDocumentType
  fileUrl?: string
  publishedAt?: string
  status?: GovernanceDocumentStatus
  order?: number
}

export interface GovernanceDocumentCard
  extends Pick<
    GovernanceDocument,
    | '_id'
    | '_type'
    | 'title'
    | 'slug'
    | 'summary'
    | 'documentType'
    | 'fileUrl'
    | 'publishedAt'
    | 'status'
    | 'order'
  > {}

export type PolicyArea =
  | 'safeguarding'
  | 'child-protection'
  | 'wildlife-ethics'
  | 'media-communication'
  | 'data-privacy'
  | 'governance'
  | 'other'

export type PolicyStatus =
  | 'draft'
  | 'active'
  | 'archived'

export interface Policy {
  _id: string
  _type: 'policy'
  title: string
  slug: SanitySlug
  summary?: string
  body?: PortableTextBlock[]
  fileUrl?: string
  policyArea?: PolicyArea
  effectiveDate?: string
  reviewDate?: string
  status?: PolicyStatus
}

export interface PolicyCard
  extends Pick<
    Policy,
    | '_id'
    | '_type'
    | 'title'
    | 'slug'
    | 'summary'
    | 'fileUrl'
    | 'policyArea'
    | 'effectiveDate'
    | 'reviewDate'
    | 'status'
  > {}

export interface HomepageCuration {
  _id: string
  _type: 'homepageCuration'
  title: string
  heroEyebrow?: string
  heroTitle?: string
  heroDescription?: string
  heroImage?: SanityImage
  primaryCta?: NavLink
  secondaryCta?: NavLink
  featuredProgrammes?: ProgrammeCard[]
  featuredPosts?: PostCard[]
  featuredResources?: ResourceCard[]
}
// --- Public form types --------------------------------------------------------

export type PublicFormFieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'

export interface PublicFormField {
  _key?: string
  label: string
  fieldKey: string
  fieldType: PublicFormFieldType
  required?: boolean
  placeholder?: string
  helpText?: string
  options?: string[]
}

export interface RegistrationFormPublic {
  _id: string
  _type: 'registrationForm'
  title?: string
  status?: 'draft' | 'published' | 'archived'
  isActive?: boolean
  registrationTitle?: string
  registrationIntro?: string
  deadline?: string
  capacity?: number
  successMessage?: string
  closedMessage?: string
  fields?: PublicFormField[]
}

export interface EventDetail extends Event {
  registrationForm?: RegistrationFormPublic | null
}

// --- Bangladesh Wildlife / Species Database types ----------------------------

export type WildlifeGroupStatus =
  | 'active'
  | 'planned'
  | 'archived'

export interface WildlifeGroup {
  _id: string
  _type: 'wildlifeGroup'
  title: string
  slug: SanitySlug
  description?: string
  heroImage?: SanityImage
  status?: WildlifeGroupStatus
  order?: number
  seoTitle?: string
  seoDescription?: string
}

export interface WildlifeGroupCard
  extends Pick<
    WildlifeGroup,
    | '_id'
    | '_type'
    | 'title'
    | 'slug'
    | 'description'
    | 'heroImage'
    | 'status'
    | 'order'
  > {}

export interface SpeciesZone {
  _id: string
  _type: 'speciesZone'
  title: string
  slug: SanitySlug
  description?: string
  mapColor?: string
  order?: number
}

export interface SpeciesDistrict {
  _id: string
  _type: 'speciesDistrict'
  title: string
  slug: SanitySlug
  division: string
  zone?: SpeciesZone
  lat?: number
  lng?: number
  order?: number
}

export type VenomStatus =
  | 'non-venomous'
  | 'mildly-venomous'
  | 'venomous'
  | 'highly-venomous'
  | 'unknown'

export type MedicalImportance =
  | 'medically-important'
  | 'not-medically-important'
  | 'uncertain'

export type ConservationStatus =
  | 'NE'
  | 'DD'
  | 'LC'
  | 'NT'
  | 'VU'
  | 'EN'
  | 'CR'
  | 'EW'
  | 'EX'

export type SpeciesPublishedStatus =
  | 'draft'
  | 'review'
  | 'published'
  | 'archived'

export type OccurrencePublicPrecision =
  | 'hidden'
  | 'district-only'
  | 'approximate'
  | 'exact'

export interface SpeciesOccurrencePoint {
  _key?: string
  lat?: number
  lng?: number
  accuracy?: string
  date?: string
  source?: string
  verified?: boolean
  publicPrecision?: OccurrencePublicPrecision
}

export interface SpeciesSourceReference {
  _key?: string
  title: string
  url?: string
  note?: string
}

export interface SpeciesProfile {
  _id: string
  _type: 'speciesProfile'
  _createdAt?: string
  _updatedAt?: string
  group?: WildlifeGroupCard
  banglaName: string
  englishName: string
  scientificName: string
  slug: SanitySlug
  localNames?: string[]
  slugAliases?: string[]
  searchKeywords?: string[]
  shortDescription?: string
  family?: string
  order?: string
  venomStatus: VenomStatus
  medicalImportance?: MedicalImportance
  iucnGlobalStatus?: ConservationStatus
  bangladeshStatus?: ConservationStatus
  statusSource?: string
  identification?: string
  scaleDescription?: string
  behaviour?: string
  habitat?: string
  diet?: string
  distributionText?: string
  ecologicalRole?: string
  mythsAndFacts?: string
  safetyNote?: string
  similarSpecies?: SpeciesProfileCard[]
  relatedProkritiKothaArticles?: ProkritiKothaArticleCard[]
  primaryImage?: SanityImage
  images?: SanityImage[]
  zones?: SpeciesZone[]
  districts?: SpeciesDistrict[]
  occurrencePoints?: SpeciesOccurrencePoint[]
  sourceReferences?: SpeciesSourceReference[]
  reviewedBy?: string
  publishedStatus?: SpeciesPublishedStatus
  seoTitle?: string
  seoDescription?: string
}

export interface SpeciesProfileCard
  extends Pick<
    SpeciesProfile,
    | '_id'
    | '_type'
    | 'banglaName'
    | 'englishName'
    | 'scientificName'
    | 'slug'
    | 'shortDescription'
    | 'localNames'
    | 'slugAliases'
    | 'searchKeywords'
    | 'family'
    | 'venomStatus'
    | 'medicalImportance'
    | 'iucnGlobalStatus'
    | 'bangladeshStatus'
    | 'primaryImage'
    | 'publishedStatus'
  > {
  group?: Pick<WildlifeGroup, '_id' | 'title' | 'slug'>
}

// --- Prokriti Kotha editorial types -----------------------------------------

export type ProkritiKothaCategory =
  | 'nature-essay'
  | 'field-note'
  | 'conservation-story'
  | 'rescue-experience'
  | 'myth-busting'
  | 'community-writing'
  | 'opinion-feature'

export type ProkritiKothaStatus =
  | 'draft'
  | 'review'
  | 'published'
  | 'archived'

export type ProkritiKothaLanguage = 'bn' | 'en'

export interface ProkritiKothaArticle {
  _id: string
  _type: 'prokritiKothaArticle'
  _createdAt?: string
  _updatedAt?: string
  title: string
  slug: SanitySlug
  excerpt?: string
  coverImage?: SanityImage
  body?: PortableTextBlock[]
  category: ProkritiKothaCategory
  language: ProkritiKothaLanguage
  author?: Author
  publishedAt?: string
  readingTime?: number
  status?: ProkritiKothaStatus
  featured?: boolean
  relatedSpecies?: SpeciesProfileCard[]
  relatedArticles?: ProkritiKothaArticleCard[]
  seoTitle?: string
  seoDescription?: string
  ogImage?: SanityImage
}

export interface ProkritiKothaArticleCard
  extends Pick<
    ProkritiKothaArticle,
    | '_id'
    | '_type'
    | '_createdAt'
    | '_updatedAt'
    | 'title'
    | 'slug'
    | 'excerpt'
    | 'coverImage'
    | 'category'
    | 'language'
    | 'publishedAt'
    | 'readingTime'
    | 'status'
    | 'featured'
  > {
  author?: Pick<Author, '_id' | 'name' | 'slug' | 'photo' | 'role' | 'orgRole'>
}


