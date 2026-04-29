import { defineField, defineType } from 'sanity'

export const homepageCuration = defineType({
  name: 'homepageCuration',
  title: 'Homepage Curation',
  type: 'document',
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
      initialValue: 'Homepage Curation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'text',
      rows: 2,
      group: 'hero',
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 4,
      group: 'hero',
      validation: (Rule) => Rule.max(360),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'imageWithAltCredit',
      group: 'hero',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'link',
      group: 'cta',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'link',
      group: 'cta',
    }),
    defineField({
      name: 'featuredProgrammes',
      title: 'Featured programmes',
      type: 'array',
      group: 'featured',
      of: [{ type: 'reference', to: [{ type: 'programme' }] }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'featuredPosts',
      title: 'Featured posts',
      type: 'array',
      group: 'featured',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'featuredResources',
      title: 'Featured resources',
      type: 'array',
      group: 'featured',
      of: [{ type: 'reference', to: [{ type: 'resource' }] }],
      validation: (Rule) => Rule.max(6),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
