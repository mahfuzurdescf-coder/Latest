import { defineField, defineType } from 'sanity'

export const seoFields = defineType({
  name: 'seoFields',
  title: 'SEO Fields',
  type: 'object',
  description:
    'Optional search and social sharing settings. Keep these concise and factual. Do not stuff keywords.',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      description:
        'Optional custom search title. Recommended: under 60-70 characters. Keep it readable, not keyword-stuffed.',
      validation: (Rule) =>
        Rule.max(70).warning('SEO titles usually perform best under 70 characters.'),
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      description:
        'Optional search description. Write one clear sentence explaining the page content. Avoid exaggerated claims.',
      validation: (Rule) =>
        Rule.max(170).warning('SEO descriptions are usually best under 170 characters.'),
    }),

    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'imageWithAltCredit',
      description:
        'Social sharing image for Facebook, LinkedIn, and messaging previews. Recommended size: 1200 x 630 px. Use clear DESCF-branded imagery.',
    }),

    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description:
        'Advanced field. Use only if this page should point search engines to a different canonical URL.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    }),

    defineField({
      name: 'noIndex',
      title: 'No index',
      type: 'boolean',
      initialValue: false,
      description:
        'Advanced field. Turn on only when this item should not appear in search engines.',
    }),
  ],
})
