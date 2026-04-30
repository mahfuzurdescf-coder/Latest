import { defineField, defineType } from 'sanity'

const WILDLIFE_GROUP_STATUSES = [
  { title: 'Active', value: 'active' },
  { title: 'Planned', value: 'planned' },
  { title: 'Archived', value: 'archived' },
]

export const wildlifeGroup = defineType({
  name: 'wildlifeGroup',
  title: 'Wildlife Group',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'status', title: 'Status' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      description: 'Example: বাংলাদেশের সাপ, বাংলাদেশের ব্যাঙ, বাংলাদেশের পাখি.',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description: 'Use stable English slugs such as snakes, frogs, birds.',
      options: {
        source: 'title',
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      group: 'content',
      description: 'Short introduction for this wildlife group landing page.',
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'imageWithAltCredit',
      group: 'content',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'status',
      initialValue: 'active',
      options: {
        layout: 'dropdown',
        list: WILDLIFE_GROUP_STATUSES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'status',
      initialValue: 100,
      validation: (Rule) => Rule.required().min(0),
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'heroImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? 'Status: ' + subtitle : 'No status set',
        media,
      }
    },
  },
})
