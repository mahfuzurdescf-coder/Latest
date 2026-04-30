import { defineField, defineType } from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  description:
    'Reusable link field for navigation menus, buttons, CTAs, and footer links.',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description:
        'Visible link/button text. Keep it short and action-oriented. Example: Explore our work, Contact DESCF, Partner with us.',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),

    defineField({
      name: 'href',
      title: 'URL / path',
      type: 'string',
      description:
        'Use internal paths like /about, /programmes, /contact or full external URLs like https://example.org.',
      validation: (Rule) =>
        Rule.required().custom((value) => {
          if (!value) return true

          const isInternal = value.startsWith('/')
          const isExternal = value.startsWith('https://') || value.startsWith('http://')

          if (isInternal || isExternal) return true

          return 'Use an internal path starting with / or a full URL starting with https://'
        }),
    }),

    defineField({
      name: 'isExternal',
      title: 'External link?',
      type: 'boolean',
      initialValue: false,
      description:
        'Turn this on only for links that go outside descf.org. Keep it off for internal website pages.',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'href',
    },
    prepare(selection) {
      const { title, subtitle } = selection

      return {
        title: title || 'Untitled link',
        subtitle: subtitle || 'No URL/path set',
      }
    },
  },
})
