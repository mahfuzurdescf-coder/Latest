// ─── Shared fragments ─────────────────────────────────────────────────────────

const IMAGE_FRAGMENT = `
  asset->{_id, url, metadata{dimensions, lqip}},
  alt, caption, hotspot, crop
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
  category{${CATEGORY_FRAGMENT}},
  tags[]{${TAG_FRAGMENT}},
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
    navLinks[]{_key, label, href},
    footerLinks[]{_key, label, href},
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
    _type == "post" && status == "published" && featured == true && language == "en"
  ] | order(publishedAt desc)[0..2]{${POST_CARD_FRAGMENT}},
  "latestPosts": *[
    _type == "post" && status == "published" && language == "en"
  ] | order(publishedAt desc)[0..5]{${POST_CARD_FRAGMENT}},
  "currentProgrammes": *[
    _type == "programme" && status == "current"
  ] | order(_createdAt asc)[0..5]{${PROGRAMME_CARD_FRAGMENT}},
  "allProgrammes": *[_type == "programme"] | order(_createdAt asc){${PROGRAMME_CARD_FRAGMENT}},
  "editorPicks": *[
    _type == "post" && status == "published" && editorPick == true && language == "en"
  ] | order(publishedAt desc)[0..2]{${POST_CARD_FRAGMENT}},
  "latestResources": *[_type == "resource"] | order(pubDate desc)[0..3]{${RESOURCE_CARD_FRAGMENT}}
}`

// ─── Newsroom ─────────────────────────────────────────────────────────────────

export const NEWSROOM_PAGE_QUERY = `{
  "featuredPosts": *[
    _type == "post" && status == "published" && featured == true && language == "en"
  ] | order(publishedAt desc)[0..1]{${POST_CARD_FRAGMENT}},
  "editorPicks": *[
    _type == "post" && status == "published" && editorPick == true && language == "en"
  ] | order(publishedAt desc)[0..2]{${POST_CARD_FRAGMENT}},
  "latestPosts": *[
    _type == "post" && status == "published" && language == "en"
  ] | order(publishedAt desc)[0..9]{${POST_CARD_FRAGMENT}},
  "categories": *[_type == "category"] | order(title asc){${CATEGORY_FRAGMENT}}
}`

// ─── Post detail ──────────────────────────────────────────────────────────────

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug && status == "published"][0]{
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
  *[_type == "post" && status == "published"].slug.current
`

// ─── Category archive ─────────────────────────────────────────────────────────

export const CATEGORY_BY_SLUG_QUERY = `{
  "category": *[_type == "category" && slug.current == $slug][0]{
    ${CATEGORY_FRAGMENT}, description
  },
  "posts": *[
    _type == "post" && status == "published"
    && category->slug.current == $slug
    && language == "en"
  ] | order(publishedAt desc){${POST_CARD_FRAGMENT}}
}`

export const CATEGORY_SLUGS_QUERY = `*[_type == "category"].slug.current`

// ─── Tag archive ──────────────────────────────────────────────────────────────

export const TAG_BY_SLUG_QUERY = `{
  "tag": *[_type == "tag" && slug.current == $slug][0]{${TAG_FRAGMENT}},
  "posts": *[
    _type == "post" && status == "published"
    && $slug in tags[].slug.current
    && language == "en"
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
    && language == "en"
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
  *[_type == "resource"] | order(pubDate desc){
    ${RESOURCE_CARD_FRAGMENT},
    relatedProgramme->{${PROGRAMME_CARD_FRAGMENT}}
  }
`

// ─── Events ───────────────────────────────────────────────────────────────────

export const EVENTS_PAGE_QUERY = `{
  "upcoming": *[_type == "event" && status == "upcoming"] | order(date asc){
    _id, _type, title, slug, date, time, location, status, speakers
  },
  "past": *[_type == "event" && status == "completed"] | order(date desc)[0..5]{
    _id, _type, title, slug, date, location, status
  }
}`

export const EVENT_BY_SLUG_QUERY = `
  *[_type == "event" && slug.current == $slug][0]{
    _id, title, slug, date, time, location, status,
    description[],
    speakers,
    registrationLink
  }
`

export const EVENT_SLUGS_QUERY = `*[_type == "event"].slug.current`

// ─── Team / Leadership ────────────────────────────────────────────────────────

export const TEAM_MEMBERS_QUERY = `
  *[_type == "teamMember"] | order(order asc){
    _id, name, slug, role, order, social,
    photo{${IMAGE_FRAGMENT}},
    bio[]
  }
`

// ─── Sitemap ──────────────────────────────────────────────────────────────────

export const SITEMAP_QUERY = `{
  "posts": *[_type == "post" && status == "published"]{
    "slug": slug.current, _updatedAt
  },
  "programmes": *[_type == "programme"]{
    "slug": slug.current, _updatedAt
  },
  "categories": *[_type == "category"]{"slug": slug.current},
  "events": *[_type == "event"]{"slug": slug.current, _updatedAt}
}`
