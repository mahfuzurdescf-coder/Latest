import { defineField, defineType } from 'sanity'

export const governanceDocument = defineType({
  name: 'governanceDocument',
  title: 'Governance Document',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'metadata', title: 'Metadata' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Document title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(4).max(160),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) => Rule.max(260),
    }),
    defineField({
      name: 'documentType',
      title: 'Document type',
      type: 'string',
      group: 'metadata',
      options: {
        layout: 'dropdown',
        list: [
          { title: 'Policy', value: 'policy' },
          { title: 'Guideline', value: 'guideline' },
          { title: 'Governance note', value: 'governance-note' },
          { title: 'Annual report', value: 'annual-report' },
          { title: 'Audit / compliance', value: 'audit-compliance' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'governance-note',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileUrl',
      title: 'File URL',
      type: 'url',
      group: 'content',
      description: 'Use a published file URL or external document link.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published date',
      type: 'date',
      group: 'metadata',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'metadata',
      options: {
        layout: 'radio',
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'metadata',
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'documentType',
    },
  },
})
