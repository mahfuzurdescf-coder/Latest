import { defineField, defineType } from 'sanity'

// ─── Author ───────────────────────────────────────────────────────────────────

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({ name: 'name',    title: 'Full name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug',    title: 'Slug',      type: 'slug', options: { source: 'name' }, validation: (R) => R.required() }),
    defineField({ name: 'role',    title: 'Public role / title', type: 'string' }),
    defineField({ name: 'orgRole', title: 'Role within DESCF', type: 'string' }),
    defineField({ name: 'photo',   title: 'Photo', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })] }),
    defineField({ name: 'bio',     title: 'Biography', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'email',   title: 'Email (optional — not shown publicly)', type: 'string' }),
    defineField({ name: 'expertise', title: 'Areas of expertise', type: 'array', of: [{ type: 'string' }],
      options: { layout: 'tags' } }),
    defineField({
      name: 'social', title: 'Social links', type: 'object',
      fields: [
        defineField({ name: 'twitter',  title: 'Twitter / X URL',  type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn URL',      type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook URL',      type: 'url' }),
        defineField({ name: 'website',  title: 'Personal website',  type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})

// ─── Category ─────────────────────────────────────────────────────────────────

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({ name: 'title',       title: 'Category name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug',        title: 'Slug',          type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'description', title: 'Description',   type: 'text', rows: 2 }),
    defineField({ name: 'colorLabel',  title: 'Color (hex)',   type: 'string',
      description: 'Used for category badges. E.g. #3B6D11' }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
})

// ─── Tag ──────────────────────────────────────────────────────────────────────

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Tag name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug',  title: 'Slug',     type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
  ],
  preview: { select: { title: 'title' } },
})

// ─── Programme ────────────────────────────────────────────────────────────────

export const programme = defineType({
  name: 'programme',
  title: 'Programme',
  type: 'document',
  groups: [
    { name: 'overview', title: 'Overview', default: true },
    { name: 'detail',   title: 'Detail' },
    { name: 'related',  title: 'Related content' },
    { name: 'seo',      title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Programme title', type: 'string', group: 'overview', validation: (R) => R.required() }),
    defineField({ name: 'slug',  title: 'Slug', type: 'slug', group: 'overview', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({
      name: 'status', title: 'Status', type: 'string', group: 'overview',
      options: {
        list: [
          { value: 'current',        title: '🟢 Current' },
          { value: 'in-preparation', title: '🟡 In Preparation' },
          { value: 'in-development', title: '🔵 In Development' },
          { value: 'exploratory',    title: '⚪ Exploratory' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'shortDescription', title: 'Short description (for cards)', type: 'text', group: 'overview', rows: 2, validation: (R) => R.max(200) }),
    defineField({
      name: 'heroImage', title: 'Hero image', type: 'image', group: 'overview',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text', validation: (R) => R.required() })],
    }),
    defineField({ name: 'body', title: 'Full programme description', type: 'array', group: 'detail', of: [{ type: 'block' }] }),
    defineField({
      name: 'keyActivities', title: 'Key activities', type: 'array', group: 'detail',
      of: [{ type: 'string' }],
      description: 'List the main activities under this programme.',
    }),
    defineField({
      name: 'impactMetrics', title: 'Impact metrics', type: 'array', group: 'detail',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label',       type: 'string', title: 'Label', validation: (R) => R.required() }),
          defineField({ name: 'value',       type: 'string', title: 'Value (e.g. "1,000+" or "In progress")', validation: (R) => R.required() }),
          defineField({ name: 'description', type: 'string', title: 'Description (optional)' }),
        ],
        preview: { select: { title: 'label', subtitle: 'value' } },
      }],
    }),
    defineField({
      name: 'relatedPosts', title: 'Related posts', type: 'array', group: 'related',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),
    defineField({
      name: 'relatedResources', title: 'Related resources', type: 'array', group: 'related',
      of: [{ type: 'reference', to: [{ type: 'resource' }] }],
    }),
    defineField({ name: 'seoTitle',       title: 'SEO title',       type: 'string', group: 'seo', validation: (R) => R.max(60) }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text',   group: 'seo', rows: 2, validation: (R) => R.max(160) }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status', media: 'heroImage' },
    prepare({ title, subtitle, media }) {
      const icon = subtitle === 'current' ? '🟢' : subtitle === 'in-preparation' ? '🟡' : subtitle === 'in-development' ? '🔵' : '⚪'
      return { title, subtitle: `${icon} ${subtitle}`, media }
    },
  },
})

// ─── Resource ─────────────────────────────────────────────────────────────────

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug',  title: 'Slug',  type: 'slug', options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({
      name: 'type', title: 'Resource type', type: 'string',
      options: {
        list: [
          { value: 'report',          title: 'Report' },
          { value: 'concept-note',    title: 'Concept Note' },
          { value: 'brief',           title: 'Policy Brief' },
          { value: 'presentation',    title: 'Presentation' },
          { value: 'media-reference', title: 'Media Reference' },
          { value: 'field-note',      title: 'Field Note' },
          { value: 'governance',      title: 'Governance Document' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'fileUrl',  title: 'File URL or external link', type: 'url' }),
    defineField({ name: 'pubDate',  title: 'Publication date', type: 'date' }),
    defineField({ name: 'summary',  title: 'Summary', type: 'text', rows: 3 }),
    defineField({
      name: 'relatedProgramme', title: 'Related programme', type: 'reference',
      to: [{ type: 'programme' }],
    }),
    defineField({ name: 'seoTitle',       title: 'SEO title',       type: 'string', validation: (R) => R.max(60) }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2, validation: (R) => R.max(160) }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'type' },
    prepare({ title, subtitle }) {
      const icons: Record<string, string> = { report: '📄', 'concept-note': '📋', brief: '📑', presentation: '📊', governance: '⚖️', 'field-note': '🌿', 'media-reference': '📰' }
      return { title, subtitle: `${icons[subtitle] ?? '📁'} ${subtitle}` }
    },
  },
})

// ─── Event ────────────────────────────────────────────────────────────────────

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title',            title: 'Event title',       type: 'string',  validation: (R) => R.required() }),
    defineField({ name: 'slug',             title: 'Slug',              type: 'slug',    options: { source: 'title' }, validation: (R) => R.required() }),
    defineField({ name: 'date',             title: 'Date & time',       type: 'datetime', validation: (R) => R.required() }),
    defineField({ name: 'location',         title: 'Location',          type: 'string' }),
    defineField({ name: 'description',      title: 'Description',       type: 'array',   of: [{ type: 'block' }] }),
    defineField({ name: 'speakers',         title: 'Speakers',          type: 'array',   of: [{ type: 'string' }] }),
    defineField({ name: 'registrationLink', title: 'Registration link', type: 'url' }),
    defineField({
      name: 'status', title: 'Status', type: 'string',
      options: { list: [{ value: 'upcoming', title: '🔜 Upcoming' }, { value: 'completed', title: '✅ Completed' }], layout: 'radio' },
      initialValue: 'upcoming',
    }),
  ],
  preview: {
    select: { title: 'title', date: 'date', status: 'status' },
    prepare({ title, date, status }) {
      const icon = status === 'upcoming' ? '🔜' : '✅'
      const d = date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No date'
      return { title: `${icon} ${title}`, subtitle: d }
    },
  },
})

// ─── TeamMember ───────────────────────────────────────────────────────────────

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name',  title: 'Full name', type: 'string',  validation: (R) => R.required() }),
    defineField({ name: 'slug',  title: 'Slug',      type: 'slug',    options: { source: 'name' }, validation: (R) => R.required() }),
    defineField({ name: 'role',  title: 'Role / Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'order', title: 'Display order (lower = first)', type: 'number', validation: (R) => R.required().min(0) }),
    defineField({
      name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true },
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({ name: 'bio',  title: 'Biography', type: 'array', of: [{ type: 'block' }] }),
    defineField({
      name: 'social', title: 'Social links', type: 'object',
      fields: [
        defineField({ name: 'twitter',  title: 'Twitter / X', type: 'url' }),
        defineField({ name: 'linkedin', title: 'LinkedIn',    type: 'url' }),
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo', order: 'order' },
    prepare({ title, subtitle, media, order }) {
      return { title: `${order}. ${title}`, subtitle, media }
    },
  },
  orderings: [{ title: 'Display order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})

// ─── SiteSettings ─────────────────────────────────────────────────────────────

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteTitle', title: 'Site title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'tagline',   title: 'Tagline (English)', type: 'string' }),
    defineField({ name: 'tagline_bn',title: 'Tagline (Bengali — future use)', type: 'string' }),
    defineField({
      name: 'logo', title: 'Logo', type: 'image',
      fields: [defineField({ name: 'alt', type: 'string', title: 'Alt text' })],
    }),
    defineField({
      name: 'navLinks', title: 'Navigation links', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label', validation: (R) => R.required() }),
          defineField({ name: 'href',  type: 'string', title: 'URL path (e.g. /about)', validation: (R) => R.required() }),
        ],
        preview: { select: { title: 'label', subtitle: 'href' } },
      }],
    }),
    defineField({
      name: 'footerLinks', title: 'Footer links', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', type: 'string', title: 'Label' }),
          defineField({ name: 'href',  type: 'string', title: 'URL path' }),
        ],
        preview: { select: { title: 'label', subtitle: 'href' } },
      }],
    }),
    defineField({
      name: 'social', title: 'Social media links', type: 'object',
      fields: [
        defineField({ name: 'twitter',   title: 'Twitter / X', type: 'url' }),
        defineField({ name: 'facebook',  title: 'Facebook',    type: 'url' }),
        defineField({ name: 'instagram', title: 'Instagram',   type: 'url' }),
        defineField({ name: 'linkedin',  title: 'LinkedIn',    type: 'url' }),
        defineField({ name: 'youtube',   title: 'YouTube',     type: 'url' }),
      ],
    }),
    defineField({ name: 'contactEmail', title: 'Contact email', type: 'string' }),
    defineField({ name: 'contactPhone', title: 'Contact phone', type: 'string' }),
    defineField({ name: 'address',      title: 'Address',       type: 'text', rows: 2 }),
    defineField({ name: 'donationLink', title: 'Donation link', type: 'url' }),
    defineField({
      name: 'defaultOgImage', title: 'Default Open Graph image',
      type: 'image', options: { hotspot: true },
      description: 'Used when a page has no specific OG image. 1200×630px recommended.',
    }),
  ],
  preview: { select: { title: 'siteTitle' } },
})
