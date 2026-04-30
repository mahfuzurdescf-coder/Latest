import { defineField, defineType } from 'sanity'

export const imageWithAltCredit = defineType({
  name: 'imageWithAltCredit',
  title: 'Image with Alt Text and Credit',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description:
        'Required for accessibility and SEO. Describe what is visible in the image. Avoid vague text like photo, image, or DESCF logo only.',
      validation: (Rule) =>
        Rule.required()
          .min(8)
          .max(180)
          .warning('Write useful alt text. Example: DESCF volunteers facilitating a snake awareness session with community participants.'),
    }),

    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description:
        'Optional public caption. Use only when the caption adds useful context. Keep it short and factual.',
      validation: (Rule) => Rule.max(180),
    }),

    defineField({
      name: 'credit',
      title: 'Credit',
      type: 'string',
      description:
        'Optional image credit. Add photographer, organisation, or source name when needed.',
      validation: (Rule) => Rule.max(120),
    }),
  ],
})
