import { defineField, defineType } from 'sanity'

export const redirect = defineType({
  name: 'redirect',
  title: 'Redirect',
  type: 'document',
  fields: [
    defineField({
      name: 'source',
      title: 'Source path',
      type: 'string',
      description: 'Example: /old-page',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true
          return value.startsWith('/') ? true : 'Source path must start with /.'
        }),
    }),
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'string',
      description: 'Example: /new-page or https://example.org',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'permanent',
      title: 'Permanent redirect?',
      type: 'boolean',
      initialValue: true,
      description: 'Permanent = 308. Temporary = 307.',
    }),
    defineField({
      name: 'notes',
      title: 'Internal notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'source',
      subtitle: 'destination',
    },
  },
})
