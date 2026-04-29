import { defineField, defineType } from 'sanity'

export const editorialWorkflow = defineType({
  name: 'editorialWorkflow',
  title: 'Editorial Workflow',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: false,
  },
  fields: [
    defineField({
      name: 'status',
      title: 'Workflow status',
      type: 'string',
      initialValue: 'draft',
      options: {
        layout: 'dropdown',
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Assigned', value: 'assigned' },
          { title: 'In review', value: 'inReview' },
          { title: 'Fact check', value: 'factCheck' },
          { title: 'Ready to publish', value: 'ready' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'editor',
      title: 'Editor',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'reviewer',
      title: 'Reviewer',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'reviewNotes',
      title: 'Review notes',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'factCheckNotes',
      title: 'Fact-check notes',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'sensitiveWildlifeLocation',
      title: 'Sensitive wildlife location?',
      type: 'boolean',
      initialValue: false,
      description:
        'Enable this if the content includes exact locations or details that could put wildlife or habitat at risk.',
    }),
  ],
})