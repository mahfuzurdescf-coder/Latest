const IMAGE_FRAGMENT = `
  asset->{_id, url, metadata{dimensions, lqip}},
  alt, caption, credit, hotspot, crop
`

const AUTHOR_CARD_FRAGMENT = `
  _id, name, slug, role, orgRole,
  photo{${IMAGE_FRAGMENT}}
`

const CATEGORY_FRAGMENT = `_id, title, slug, colorLabel`

const TAG_FRAGMENT = `_id, title, slug`

const POST_CARD_FRAGMENT = `
  _id, _type, title, slug, excerpt, publishedAt, updatedAt,
  readingTime, featured, editorPick, contentType, language, status,
  coverImage{${IMAGE_FRAGMENT}},
  category->{${CATEGORY_FRAGMENT}},
  tags[]->{${TAG_FRAGMENT}},
  author->{${AUTHOR_CARD_FRAGMENT}}
`

const PROGRAMME_CARD_FRAGMENT = `
  _id, _type, title, slug, shortDescription, status,
  heroImage{${IMAGE_FRAGMENT}}
`

const RESOURCE_CARD_FRAGMENT = `
  _id, _type, title, slug, type, fileUrl, pubDate, summary
`

// ─── Site Settings ────────────────────────────────────────────────────────────

export const SITE_SETTINGS_QUERY = `
  *[_type == "siteSettings"][0]{
    siteTitle, tagline, tagline_bn,
    logo{${IMAGE_FRAGMENT}},
    navLinks[]{_key, label, href, isExternal},
    footerSections[]{_key, title, links[]{_key, label, href, isExternal}},
    footerLinks[]{_key, label, href, isExternal},
    social,
    contactEmail, contactPhone, address,
    donationLink,
    defaultOgImage{${IMAGE_FRAGMENT}}
  }
`

// ─── Homepage ─────────────────────────────────────────────────────────────────

export const HOME_PAGE_QUERY = `{
  "settings": ${SITE_SETTINGS_QUERY},
  "featuredPosts": *[
    _type == "post" && status == "published" && featured == true && coalesce(language, "bn") == "bn"
  ] | order(publishedAt desc)[0..2]{${POST_CARD_FRAGMENT}},
  "latestPosts": *[
    _type == "post" && status == "published" && coalesce(language, "bn") == "bn"
  ] | order(publishedAt desc)[0..5]{${POST_CARD_FRAGMENT}},
  "currentProgrammes": *[
    _type == "programme" && status == "current"
  ] | order(_createdAt asc)[0..5]{${PROGRAMME_CARD_FRAGMENT}},
  "allProgrammes": *[_type == "programme"] | order(_createdAt asc){${PROGRAMME_CARD_FRAGMENT}},
  "editorPicks": *[
    _type == "post" && status == "published" && editorPick == true && coalesce(language, "bn") == "bn"
  ] | order(publishedAt desc)[0..2]{${POST_CARD_FRAGMENT}},
  "latestResources": *[_type == "resource" && coalesce(language, "bn") == "bn"] | order(pubDate desc)[0..3]{${RESOURCE_CARD_FRAGMENT}}
}`

// ─── Newsroom ─────────────────────────────────────────────────────────────────

export const NEWSROOM_PAGE_QUERY = `{
  "featuredPosts": *[
    _type == "post" && status == "published" && featured == true && coalesce(language, "bn") == "bn"
  ] | order(publishedAt desc)[0..1]{${POST_CARD_FRAGMENT}},
  "editorPicks": *[
    _type == "post" && status == "published" && editorPick == true && coalesce(language, "bn") == "bn"
  ] | order(publishedAt desc)[0..2]{${POST_CARD_FRAGMENT}},
  "latestPosts": *[
    _type == "post" && status == "published" && coalesce(language, "bn") == "bn"
  ] | order(publishedAt desc)[0..9]{${POST_CARD_FRAGMENT}},
  "categories": *[_type == "category"] | order(title asc){${CATEGORY_FRAGMENT}}
}`

// ─── Post detail ──────────────────────────────────────────────────────────────

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && coalesce(language, "bn") == "bn" && slug.current == $slug && status == "published"][0]{
    ${POST_CARD_FRAGMENT},
    body[],
    coAuthors[]->{${AUTHOR_CARD_FRAGMENT}},
    seoTitle, seoDescription,
    ogImage{${IMAGE_FRAGMENT}},
    "relatedPosts": *[
      _type == "post" && status == "published"
      && references(^.category._ref)
      && _id != ^._id
    ] | order(publishedAt desc)[0..2]{${POST_CARD_FRAGMENT}}
  }
`

export const POST_SLUGS_QUERY = `
  *[_type == "post" && coalesce(language, "bn") == "bn" && status == "published"].slug.current
`

// ─── Category archive ─────────────────────────────────────────────────────────

export const CATEGORY_BY_SLUG_QUERY = `{
  "category": *[_type == "category" && slug.current == $slug][0]{
    ${CATEGORY_FRAGMENT}, description
  },
  "posts": *[
    _type == "post" && status == "published"
    && category->slug.current == $slug
    && coalesce(language, "bn") == "bn"
  ] | order(publishedAt desc){${POST_CARD_FRAGMENT}}
}`

export const CATEGORY_SLUGS_QUERY = `*[_type == "category"].slug.current`

// ─── Tag archive ──────────────────────────────────────────────────────────────

export const TAG_BY_SLUG_QUERY = `{
  "tag": *[_type == "tag" && slug.current == $slug][0]{${TAG_FRAGMENT}},
  "posts": *[
    _type == "post" && status == "published"
    && $slug in tags[]->slug.current
    && coalesce(language, "bn") == "bn"
  ] | order(publishedAt desc){${POST_CARD_FRAGMENT}}
}`

export const TAG_SLUGS_QUERY = `*[_type == "tag"].slug.current`

// ─── Author profile ───────────────────────────────────────────────────────────

export const AUTHOR_BY_SLUG_QUERY = `{
  "author": *[_type == "author" && slug.current == $slug][0]{
    _id, name, slug, role, orgRole, email, social, expertise,
    bio[],
    photo{${IMAGE_FRAGMENT}}
  },
  "posts": *[
    _type == "post" && status == "published"
    && author->slug.current == $slug
    && coalesce(language, "bn") == "bn"
  ] | order(publishedAt desc){${POST_CARD_FRAGMENT}}
}`

export const AUTHOR_SLUGS_QUERY = `*[_type == "author"].slug.current`

// ─── Programmes ───────────────────────────────────────────────────────────────

export const PROGRAMMES_PAGE_QUERY = `
  *[_type == "programme"] | order(status asc, _createdAt asc){
    ${PROGRAMME_CARD_FRAGMENT},
    keyActivities
  }
`

export const PROGRAMME_BY_SLUG_QUERY = `
  *[_type == "programme" && slug.current == $slug][0]{
    _id, _type, title, slug, shortDescription, status,
    heroImage{${IMAGE_FRAGMENT}},
    body[],
    keyActivities,
    impactMetrics[]{_key, label, value, description},
    seoTitle, seoDescription,
    relatedPosts[]->{${POST_CARD_FRAGMENT}},
    relatedResources[]->{${RESOURCE_CARD_FRAGMENT}}
  }
`

export const PROGRAMME_SLUGS_QUERY = `*[_type == "programme"].slug.current`

// ─── Resources ────────────────────────────────────────────────────────────────

export const RESOURCES_PAGE_QUERY = `
  *[_type == "resource" && coalesce(language, "bn") == "bn"] | order(pubDate desc){
    ${RESOURCE_CARD_FRAGMENT},
    relatedProgramme->{${PROGRAMME_CARD_FRAGMENT}}
  }
`

// ─── Events ───────────────────────────────────────────────────────────────────

export const EVENTS_PAGE_QUERY = `{
  "upcoming": *[_type == "event" && coalesce(language, "bn") == "bn" && status == "upcoming"] | order(date asc){
    _id, _type, title, slug, date, time, location, status, speakers
  },
  "past": *[_type == "event" && coalesce(language, "bn") == "bn" && status == "completed"] | order(date desc)[0..5]{
    _id, _type, title, slug, date, location, status
  }
}`

export const EVENT_BY_SLUG_QUERY = `
  *[_type == "event" && coalesce(language, "bn") == "bn" && slug.current == $slug][0]{
    _id, title, slug, date, time, location, status,
    description[],
    speakers,
    registrationLink
  }
`

export const EVENT_SLUGS_QUERY = /* groq */ `
  *[_type == "event" && coalesce(language, "bn") == "bn" && defined(slug.current)] {
    "slug": slug.current
  }
`

// ─── Team / Team ────────────────────────────────────────────────────────

export const TEAM_MEMBERS_QUERY = `
  *[_type == "teamMember"] | order(order asc){
    _id, name, slug, role, order, social,
    photo{${IMAGE_FRAGMENT}},
    bio[]
  }
`

// ─── Sitemap ──────────────────────────────────────────────────────────────────

export const SITEMAP_QUERY = `{
  "posts": *[_type == "post" && coalesce(language, "bn") == "bn" && status == "published"]{
    "slug": slug.current, _updatedAt
  },
  "programmes": *[_type == "programme"]{
    "slug": slug.current, _updatedAt
  },
  "categories": *[_type == "category"]{
    "slug": slug.current
  },
  "tags": *[_type == "tag"]{
    "slug": slug.current
  },
  "authors": *[_type == "author"]{
    "slug": slug.current
  },
  "events": *[_type == "event" && coalesce(language, "bn") == "bn"]{
    "slug": slug.current, _updatedAt
  }
}`

// ─── DESCF institutional CMS queries ──────────────────────────────────────────

export const PARTNERS_QUERY = /* groq */ `
  *[_type == "partner" && relationshipStatus in ["current", "past"]] | order(featured desc, order asc, name asc) {
    _id,
    _type,
    name,
    slug,
    logo{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    website,
    summary,
    partnerType,
    relationshipStatus,
    featured,
    order
  }
`

export const GOVERNANCE_DOCUMENTS_QUERY = /* groq */ `
  *[_type == "governanceDocument" && status == "published"] | order(order asc, publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    summary,
    documentType,
    fileUrl,
    publishedAt,
    status,
    order
  }
`

export const POLICIES_QUERY = /* groq */ `
  *[_type == "policy" && status == "active"] | order(effectiveDate desc, title asc) {
    _id,
    _type,
    title,
    slug,
    summary,
    fileUrl,
    policyArea,
    effectiveDate,
    reviewDate,
    status
  }
`

// ─── Homepage curation query ──────────────────────────────────────────────────

export const HOMEPAGE_CURATION_QUERY = /* groq */ `
  *[_type == "homepageCuration"][0] {
    _id,
    _type,
    title,
    heroEyebrow,
    heroTitle,
    heroDescription,
    heroImage{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    primaryCta,
    secondaryCta,
    sections[]{
      _key,
      sectionId,
      theme,
      layout,
      eyebrow,
      title,
      description,
      cards[]{
        _key,
        eyebrow,
        title,
        text,
        link
      },
      primaryCta,
      secondaryCta
    },
    featuredProgrammes[]->{
      ${PROGRAMME_CARD_FRAGMENT}
    },
    featuredPosts[]->{
      ${POST_CARD_FRAGMENT}
    },
    featuredResources[]->{
      ${RESOURCE_CARD_FRAGMENT}
    }
  }
`

// ─── Event detail with registration form ──────────────────────────────────────

export const EVENT_DETAIL_WITH_REGISTRATION_QUERY = /* groq */ `
  *[_type == "event" && coalesce(language, "bn") == "bn" && slug.current == $slug][0] {
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    date,
    time,
    location,
    registrationLink,
    status,
    description,
    speakers,
    registrationLink,
    "registrationForm": *[
      _type == "registrationForm" &&
      event._ref == ^._id &&
      status == "published"
    ] | order(_updatedAt desc)[0] {
      _id,
      _type,
      title,
      status,
      isActive,
      registrationTitle,
      registrationIntro,
      deadline,
      capacity,
      successMessage,
      closedMessage,
      fields[]{
        _key,
        label,
        fieldKey,
        fieldType,
        required,
        placeholder,
        helpText,
        options
      }
    }
  }
`

// --- Bangladesh Wildlife / Species Database queries --------------------------

export const wildlifeGroupsQuery = `*[
  _type == "wildlifeGroup" &&
  status == "active"
] | order(order asc, title asc) {
  _id,
  _type,
  title,
  slug,
  description,
  heroImage{
    ...,
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  status,
  order,
  seoTitle,
  seoDescription
}`

export const speciesZonesQuery = `*[
  _type == "speciesZone"
] | order(order asc, title asc) {
  _id,
  _type,
  title,
  slug,
  description,
  mapColor,
  order
}`

export const speciesDistrictsQuery = `*[
  _type == "speciesDistrict"
] | order(division asc, title asc) {
  _id,
  _type,
  title,
  slug,
  division,
  zone->{
    _id,
    _type,
    title,
    slug,
    description,
    mapColor,
    order
  },
  lat,
  lng,
  order
}`

export const snakeSpeciesQuery = `*[
  _type == "speciesProfile" &&
  coalesce(language, "bn") == "bn" &&
  publishedStatus == "published" &&
  group->slug.current == "snakes"
] | order(englishName asc) {
  _id,
  _type,
  banglaName,
  englishName,
  scientificName,
  slug,
  localNames,
  slugAliases,
  searchKeywords,
  shortDescription,
  family,
  venomStatus,
  medicalImportance,
  iucnGlobalStatus,
  bangladeshStatus,
  primaryImage{
    ...,
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  publishedStatus,
  group->{
    _id,
    title,
    slug
  }
}`

export const speciesProfileBySlugQuery = `*[
  _type == "speciesProfile" &&
  coalesce(language, "bn") == "bn" &&
  (slug.current == $slug || $slug in slugAliases[]) &&
  publishedStatus == "published"
][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  group->{
    _id,
    _type,
    title,
    slug,
    description,
    heroImage{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    status,
    order
  },
  banglaName,
  englishName,
  scientificName,
  slug,
  localNames,
  slugAliases,
  searchKeywords,
  shortDescription,
  family,
  order,
  venomStatus,
  medicalImportance,
  iucnGlobalStatus,
  bangladeshStatus,
  statusSource,
  identification,
  scaleDescription,
  behaviour,
  habitat,
  diet,
  distributionText,
  ecologicalRole,
  mythsAndFacts,
  safetyNote,
  similarSpecies[]->{
    _id,
    _type,
    banglaName,
    englishName,
    scientificName,
    slug,
    shortDescription,
    family,
    venomStatus,
    medicalImportance,
    iucnGlobalStatus,
    bangladeshStatus,
    primaryImage{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    publishedStatus
  },
  relatedProkritiKothaArticles[]->{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    coverImage{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    category,
    language,
    publishedAt,
    readingTime,
    status,
    featured,
    author->{
      _id,
      name,
      slug,
      role,
      orgRole,
      photo{
        ...,
        asset->{
          _id,
          url,
          metadata {
            dimensions,
            lqip
          }
        }
      }
    }
  },
  primaryImage{
    ...,
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  images[]{
    ...,
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  zones[]->{
    _id,
    _type,
    title,
    slug,
    description,
    mapColor,
    order
  },
  districts[]->{
    _id,
    _type,
    title,
    slug,
    division,
    lat,
    lng,
    order,
    zone->{
      _id,
      _type,
      title,
      slug,
      description,
      mapColor,
      order
    }
  },
  occurrencePoints[]{
    _key,
    lat,
    lng,
    accuracy,
    date,
    source,
    verified,
    publicPrecision
  },
  sourceReferences[]{
    _key,
    title,
    url,
    note
  },
  reviewedBy,
  publishedStatus,
  seoTitle,
  seoDescription
}`

// --- Prokriti Kotha editorial queries ---------------------------------------

export const prokritiKothaArticlesQuery = `*[
  _type == "prokritiKothaArticle" &&
  coalesce(language, "bn") == "bn" &&
  status == "published"
] | order(publishedAt desc) {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  coverImage{
    ...,
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  category,
  language,
  publishedAt,
  readingTime,
  status,
  featured,
  author->{
    _id,
    name,
    slug,
    role,
    orgRole,
    photo{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    }
  }
}`

export const featuredProkritiKothaArticlesQuery = `*[
  _type == "prokritiKothaArticle" &&
  coalesce(language, "bn") == "bn" &&
  status == "published" &&
  featured == true
] | order(publishedAt desc)[0...3] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  coverImage{
    ...,
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  category,
  language,
  publishedAt,
  readingTime,
  status,
  featured,
  author->{
    _id,
    name,
    slug,
    role,
    orgRole,
    photo{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    }
  }
}`

export const prokritiKothaArticleBySlugQuery = `*[
  _type == "prokritiKothaArticle" &&
  coalesce(language, "bn") == "bn" &&
  slug.current == $slug &&
  status == "published"
][0] {
  _id,
  _type,
  _createdAt,
  _updatedAt,
  title,
  slug,
  excerpt,
  coverImage{
    ...,
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  body,
  category,
  language,
  publishedAt,
  readingTime,
  status,
  featured,
  author->{
    _id,
    _type,
    name,
    slug,
    role,
    orgRole,
    expertise,
    photo{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    bio
  },
  relatedSpecies[]->{
    _id,
    _type,
    banglaName,
    englishName,
    scientificName,
    slug,
    shortDescription,
    family,
    venomStatus,
    medicalImportance,
    iucnGlobalStatus,
    bangladeshStatus,
    primaryImage{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    publishedStatus,
    group->{
      _id,
      title,
      slug
    }
  },
  relatedArticles[]->{
    _id,
    _type,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    coverImage{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    category,
    language,
    publishedAt,
    readingTime,
    status,
    featured
  },
  seoTitle,
  seoDescription,
  ogImage{
    ...,
    asset->{
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  }
}`

export const prokritiKothaArticleSlugsQuery = `*[
  _type == "prokritiKothaArticle" &&
  coalesce(language, "bn") == "bn" &&
  status == "published" &&
  defined(slug.current)
].slug.current`

export const PROKRITI_KOTHA_SITEMAP_QUERY = `*[
  _type == "prokritiKothaArticle" &&
  coalesce(language, "bn") == "bn" &&
  status == "published" &&
  defined(slug.current)
] {
  "slug": slug.current,
  _updatedAt
}`

export const SNAKE_SPECIES_SITEMAP_QUERY = `*[
  _type == "speciesProfile" &&
  coalesce(language, "bn") == "bn" &&
  publishedStatus == "published" &&
  group->slug.current == "snakes" &&
  defined(slug.current)
] {
  "slug": slug.current,
  _updatedAt
}`




// --- Editable page content ----------------------------------------------------

export const PAGE_CONTENT_BY_KEY_QUERY = /* groq */ `
  *[_type == "pageContent" && coalesce(language, "bn") == "bn" && pageKey == $pageKey && status == "published"][0] {
    _id,
    _type,
    title,
    pageKey,
    status,
    heroTheme,
    heroEyebrow,
    heroTitle,
    heroDescription,
    primaryCta,
    secondaryCta,
    heroImage{
      ...,
      asset->{
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    sections[]{
      _key,
      sectionId,
      theme,
      layout,
      eyebrow,
      title,
      description,
      cards[]{
        _key,
        eyebrow,
        title,
        text,
        link
      },
      primaryCta,
      secondaryCta
    },
    seo
  }
`



export const UI_LABELS_QUERY = `*[_type == "uiLabels"][0]{
  _id,
  _type,
  readMore,
  learnMore,
  viewDetails,
  register,
  submit,
  download,
  search,
  filter,
  clearFilters,
  backToHome,
  backToEvents,
  backToResources,
  contactUs,
  partnerWithUs,
  noResults,
  translationUnavailable,
  viewBanglaVersion,
  sending,
  submitting,
  submissionFailed,
  registrationFailed
}`
