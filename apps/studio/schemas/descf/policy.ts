import { defineField, defineType } from 'sanity'

export const policy = defineType({
  name: 'policy',
  title: 'Policy',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'status', title: 'Status' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Policy title',
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
      name: 'body',
      title: 'Policy body',
      type: 'array',
      group: 'content',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'fileUrl',
      title: 'File URL',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'policyArea',
      title: 'Policy area',
      type: 'string',
      group: 'status',
      options: {
        layout: 'dropdown',
        list: [
          { title: 'Safeguarding', value: 'safeguarding' },
          { title: 'Child protection', value: 'child-protection' },
          { title: 'Wildlife ethics', value: 'wildlife-ethics' },
          { title: 'Media and communication', value: 'media-communication' },
          { title: 'Data and privacy', value: 'data-privacy' },
          { title: 'Governance', value: 'governance' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'governance',
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective date',
      type: 'date',
      group: 'status',
    }),
    defineField({
      name: 'reviewDate',
      title: 'Review date',
      type: 'date',
      group: 'status',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'status',
      options: {
        layout: 'radio',
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Active', value: 'active' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'policyArea',
    },
  },
})
