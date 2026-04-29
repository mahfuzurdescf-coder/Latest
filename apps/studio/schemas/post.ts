import { defineField, defineType } from 'sanity'

const POST_CONTENT_TYPES = [
  { title: 'Article', value: 'article' },
  { title: 'Field note', value: 'field-note' },
  { title: 'News', value: 'news' },
  { title: 'Report', value: 'report' },
  { title: 'Briefing', value: 'briefing' },
  { title: 'Interview', value: 'interview' },
  { title: 'Event update', value: 'event-update' },
]

const POST_STATUSES = [
  { title: 'Draft', value: 'draft' },
  { title: 'Assigned', value: 'assigned' },
  { title: 'In review', value: 'inReview' },
  { title: 'Fact check', value: 'factCheck' },
  { title: 'Ready to publish', value: 'ready' },
  { title: 'Published', value: 'published' },
  { title: 'Archived', value: 'archived' },
]

export const post = defineType({
  name: 'post',
  title: 'Newsroom Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'taxonomy', title: 'Taxonomy' },
    { name: 'editorial', title: 'Editorial workflow' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(8).max(120),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) =>
        Rule.max(220).warning('Keep excerpts concise. Aim under 220 characters.'),
    }),

    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group: 'content',
      initialValue: 'en',
      options: {
        layout: 'radio',
        list: [
          { title: 'English', value: 'en' },
          { title: 'Bangla', value: 'bn' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'contentType',
      title: 'Content type',
      type: 'string',
      group: 'content',
      initialValue: 'article',
      options: {
        layout: 'dropdown',
        list: POST_CONTENT_TYPES,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'imageWithAltCredit',
      group: 'content',
      description:
        'Use a strong, relevant image. Alt text is required for accessibility.',
    }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        { type: 'imageWithAltCredit' },
      ],
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      group: 'taxonomy',
      to: [{ type: 'category' }],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'taxonomy',
      of: [{ type: 'reference', to: [{ type: 'tag' }] }],
    }),

    defineField({
      name: 'author',
      title: 'Primary author',
      type: 'reference',
      group: 'taxonomy',
      to: [{ type: 'author' }],
    }),

    defineField({
      name: 'coAuthors',
      title: 'Co-authors',
      type: 'array',
      group: 'taxonomy',
      of: [{ type: 'reference', to: [{ type: 'author' }] }],
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      group: 'editorial',
      description:
        'Set this when the post is ready to appear publicly. Frontend sorting uses this field.',
    }),

    defineField({
      name: 'updatedAt',
      title: 'Updated date',
      type: 'datetime',
      group: 'editorial',
      description:
        'Optional. Use this if the article has been meaningfully revised after publication.',
    }),

    defineField({
      name: 'status',
      title: 'Publication status',
      type: 'string',
      group: 'editorial',
      initialValue: 'draft',
      options: {
        layout: 'dropdown',
        list: POST_STATUSES,
      },
      validation: (Rule) => Rule.required(),
      description:
        'Important: frontend only shows posts where status is Published.',
    }),

    defineField({
      name: 'workflow',
      title: 'Editorial workflow details',
      type: 'editorialWorkflow',
      group: 'editorial',
      description:
        'Use this for internal editorial tracking, review notes, and fact-check notes.',
    }),

    defineField({
      name: 'featured',
      title: 'Featured post',
      type: 'boolean',
      group: 'editorial',
      initialValue: false,
    }),

    defineField({
      name: 'editorPick',
      title: "Editor's pick",
      type: 'boolean',
      group: 'editorial',
      initialValue: false,
    }),

    defineField({
      name: 'readingTime',
      title: 'Reading time',
      type: 'number',
      group: 'editorial',
      description: 'Estimated reading time in minutes.',
      validation: (Rule) => Rule.min(1).max(60),
    }),

    defineField({
      name: 'sensitiveWildlifeLocation',
      title: 'Sensitive wildlife location?',
      type: 'boolean',
      group: 'editorial',
      initialValue: false,
      description:
        'Enable this if the post includes location details that could put wildlife, habitat, or field sites at risk.',
    }),

    defineField({
      name: 'reviewNotes',
      title: 'Review notes',
      type: 'text',
      rows: 4,
      group: 'editorial',
    }),

    defineField({
      name: 'factCheckNotes',
      title: 'Fact-check notes',
      type: 'text',
      rows: 4,
      group: 'editorial',
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      validation: (Rule) =>
        Rule.max(70).warning('SEO titles usually perform best under 70 characters.'),
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) =>
        Rule.max(170).warning('SEO descriptions are usually best under 170 characters.'),
    }),

    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'imageWithAltCredit',
      group: 'seo',
      description:
        'Recommended size: 1200 × 630 px. Used for social sharing if provided.',
    }),

    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL override',
      type: 'url',
      group: 'seo',
      description:
        'Only use this if the canonical URL should be different from the generated article URL.',
    }),

    defineField({
      name: 'noIndex',
      title: 'No index',
      type: 'boolean',
      group: 'seo',
      initialValue: false,
      description: 'Prevent search engines from indexing this post.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Status: ${subtitle}` : 'No status set',
        media,
      }
    },
  },
})