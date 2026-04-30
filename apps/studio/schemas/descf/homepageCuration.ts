import { defineField, defineType } from 'sanity'

export const homepageCuration = defineType({
  name: 'homepageCuration',
  title: 'Homepage Curation',
  type: 'document',
  description:
    'Controls the public homepage hero, call-to-action buttons, and featured homepage content. Edit carefully because changes appear on the live homepage.',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'featured', title: 'Featured content' },
    { name: 'cta', title: 'CTA' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      group: 'hero',
      description:
        'Internal label only. Visitors will not see this. Keep as “Homepage Curation” unless you have a specific reason to change it.',
      initialValue: 'Homepage Curation',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      group: 'hero',
      description:
        'Small label above the main headline. Keep it short. Example: Bangladesh-based conservation organisation.',
      validation: (Rule) =>
        Rule.max(80).warning('Recommended length: under 80 characters.'),
    }),

    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'text',
      rows: 2,
      group: 'hero',
      description:
        'Main homepage headline. Keep it strong, short, and readable. Recommended: 8–13 words, not a paragraph.',
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(140)
          .warning('Recommended: 8–13 words. Avoid long paragraph-like titles.'),
    }),

    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 4,
      group: 'hero',
      description:
        'Short homepage introduction under the hero title. Recommended: 1–2 sentences.',
      validation: (Rule) =>
        Rule.required()
          .min(40)
          .max(280)
          .warning('Recommended: 1–2 concise sentences.'),
    }),

    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'imageWithAltCredit',
      group: 'hero',
      description:
        'Main homepage image. Use a high-quality landscape or 4:3 image. Recommended size: around 1600×1200 px. Always add meaningful alt text.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'link',
      group: 'cta',
      description:
        'Main homepage action button. Recommended examples: Explore our work, See programmes, Support DESCF.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'link',
      group: 'cta',
      description:
        'Secondary homepage action button. Recommended examples: Partner with DESCF, Contact us.',
    }),

    defineField({
      name: 'featuredProgrammes',
      title: 'Featured programmes',
      type: 'array',
      group: 'featured',
      description:
        'Choose up to 3 strongest programmes for the homepage. The full list belongs on the Programmes page.',
      of: [{ type: 'reference', to: [{ type: 'programme' }] }],
      validation: (Rule) =>
        Rule.max(3).warning('Homepage should show no more than 3 featured programmes.'),
    }),

    defineField({
      name: 'featuredPosts',
      title: 'Featured posts',
      type: 'array',
      group: 'featured',
      description:
        'Choose up to 3 featured newsroom posts. If empty, the website may use latest/editor-pick posts as fallback.',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (Rule) =>
        Rule.max(3).warning('Homepage should show no more than 3 featured posts.'),
    }),

    defineField({
      name: 'featuredResources',
      title: 'Featured resources',
      type: 'array',
      group: 'featured',
      description:
        'Choose up to 4 useful resources for the homepage. Keep this section selective, not a full archive.',
      of: [{ type: 'reference', to: [{ type: 'resource' }] }],
      validation: (Rule) =>
        Rule.max(4).warning('Homepage should show no more than 4 featured resources.'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      heroTitle: 'heroTitle',
    },
    prepare(selection) {
      const { title, heroTitle } = selection

      return {
        title: title || 'Homepage Curation',
        subtitle: heroTitle || 'Homepage hero and featured content',
      }
    },
  },
})
