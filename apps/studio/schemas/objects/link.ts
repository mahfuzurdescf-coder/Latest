import { defineField, defineType } from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'href',
      title: 'URL / path',
      type: 'string',
      description:
        'Use internal paths like /about or full URLs like https://example.org.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isExternal',
      title: 'External link?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
    },
  },
})