import { defineField, defineType } from 'sanity'

type LinkParent = {
  isExternal?: boolean
}

function isExternalUrl(value: string) {
  return /^https?:\/\//.test(value)
}

function isInternalOrUtilityLink(value: string) {
  return (
    value.startsWith('/') ||
    value.startsWith('mailto:') ||
    value.startsWith('tel:')
  )
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
        'Visible link/button text. Examples: About DESCF, Contact DESCF, প্রকৃতি কথা, বাংলাদেশের সাপ.',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'href',
      title: 'URL / path',
      type: 'string',
      description:
        'Use /about for internal pages, https://example.org for external links, mailto:info@descf.org for email, or tel:+880... for phone.',
      validation: (Rule) =>
        Rule.required().custom((value, context) => {
          const parent = context.parent as LinkParent | undefined
          const isExternal = Boolean(parent?.isExternal)

          if (!value) return 'URL / path is required.'

          if (isExternal) {
            return isExternalUrl(value)
              ? true
              : 'External links must start with http:// or https://.'
          }

          return isInternalOrUtilityLink(value)
            ? true
            : 'Use /path, mailto:email@example.org, or tel:+880... for non-external links.'
        }),
    }),
    defineField({
      name: 'isExternal',
      title: 'External website?',
      type: 'boolean',
      initialValue: false,
      description:
        'Turn this on only for links outside descf.org. Keep it off for internal pages, email, and phone links.',
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
