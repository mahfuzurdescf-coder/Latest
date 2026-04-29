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
      validation: (Rule) =>
        Rule.required()
          .min(8)
          .max(180)
          .warning('Write useful alt text for accessibility. Avoid “image of...” unless needed.'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'credit',
      title: 'Photo / media credit',
      type: 'string',
      validation: (Rule) =>
        Rule.max(120).warning('Keep image credit short and clear.'),
    }),
    defineField({
      name: 'sensitiveLocation',
      title: 'Sensitive wildlife location?',
      type: 'boolean',
      initialValue: false,
      description:
        'Enable this if the image may reveal a sensitive wildlife location or habitat.',
    }),
  ],
})