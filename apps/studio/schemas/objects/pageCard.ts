import { defineField, defineType } from 'sanity'

export const pageCard = defineType({
  name: 'pageCard',
  title: 'Page Card',
  type: 'object',
  description:
    'Reusable card for page sections. Keep claims factual and avoid unsupported impact language.',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Small label',
      type: 'string',
      description: 'Optional short label above the card title. Example: Awareness, Governance, Resources.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'title',
      title: 'Card title',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'text',
      title: 'Card text',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.max(360).warning('Keep card text short and factual.'),
    }),
    defineField({
      name: 'link',
      title: 'Optional link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'eyebrow',
    },
  },
})
