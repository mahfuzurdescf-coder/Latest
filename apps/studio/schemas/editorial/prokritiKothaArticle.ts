import { defineField, defineType } from 'sanity'

const PROKRITI_KOTHA_CATEGORIES = [
  { title: 'Nature Essay', value: 'nature-essay' },
  { title: 'Field Note', value: 'field-note' },
  { title: 'Conservation Story', value: 'conservation-story' },
  { title: 'Rescue Experience', value: 'rescue-experience' },
  { title: 'Myth Busting', value: 'myth-busting' },
  { title: 'Community Writing', value: 'community-writing' },
  { title: 'Opinion / Feature', value: 'opinion-feature' },
]

const ARTICLE_STATUSES = [
  { title: 'Draft', value: 'draft' },
  { title: 'In review', value: 'review' },
  { title: 'Published', value: 'published' },
  { title: 'Archived', value: 'archived' },
]

const ARTICLE_LANGUAGES = [
  { title: 'Bangla', value: 'bn' },
  { title: 'English', value: 'en' },
]

export const prokritiKothaArticle = defineType({
  name: 'prokritiKothaArticle',
  title: 'Prokriti Kotha Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'editorial', title: 'Editorial' },
    { name: 'relations', title: 'Relations' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(4).max(160),
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
      description: 'Short summary for listing cards and social previews.',
      validation: (Rule) => Rule.max(280),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'imageWithAltCredit',
      group: 'content',
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
      type: 'string',
      group: 'editorial',
      options: {
        layout: 'dropdown',
        list: PROKRITI_KOTHA_CATEGORIES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      group: 'editorial',
      initialValue: 'bn',
      options: {
        layout: 'radio',
        list: ARTICLE_LANGUAGES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      group: 'editorial',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'datetime',
      group: 'editorial',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading time in minutes',
      type: 'number',
      group: 'editorial',
      validation: (Rule) => Rule.min(1).max(60),
    }),
    defineField({
      name: 'status',
      title: 'Publication status',
      type: 'string',
      group: 'editorial',
      initialValue: 'draft',
      options: {
        layout: 'dropdown',
        list: ARTICLE_STATUSES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured article',
      type: 'boolean',
      group: 'editorial',
      initialValue: false,
    }),

    defineField({
      name: 'relatedSpecies',
      title: 'Related species',
      type: 'array',
      group: 'relations',
      description: 'Link this article to snake/frog/bird species profiles when relevant.',
      of: [{ type: 'reference', to: [{ type: 'speciesProfile' }] }],
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Prokriti Kotha articles',
      type: 'array',
      group: 'relations',
      of: [{ type: 'reference', to: [{ type: 'prokritiKothaArticle' }] }],
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(170),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'imageWithAltCredit',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? 'Category: ' + subtitle : 'No category set',
        media,
      }
    },
  },
})
