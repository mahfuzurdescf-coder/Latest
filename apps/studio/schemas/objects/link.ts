import { defineField, defineType } from 'sanity'

type LinkParent = {
  isExternal?: boolean
}

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
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
        'Use internal paths like /about, /programmes, /prokriti-kotha, /bangladesh-wildlife or full external URLs like https://example.org.',
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          const parent = context.parent as LinkParent | undefined
          const isExternal = Boolean(parent?.isExternal)

          if (!value) return 'URL / path is required.'

          if (isExternal) {
            return /^https?:\/\//.test(value)
              ? true
              : 'External links must start with http:// or https://.'
          }

          return value.startsWith('/')
            ? true
            : 'Internal links must start with /. Example: /prokriti-kotha'
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
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled link',
        subtitle,
      }
    },
  },
})
