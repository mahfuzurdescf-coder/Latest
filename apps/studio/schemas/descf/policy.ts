import { defineField, defineType } from 'sanity'

export const policy = defineType({
  name: 'policy',
  title: 'Policy',
  type: 'document',
  description:
    'Use this only for real organisational policies. Do not publish placeholder or unsupported governance claims.',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'status', title: 'Status' },
  ],
  validation: (Rule) =>
    Rule.custom((document) => {
      const doc = document as {
        status?: string
        effectiveDate?: string
        body?: unknown[]
        fileUrl?: string
      }

      if (doc.status === 'active') {
        if (!doc.effectiveDate) {
          return 'Active policies must have an effective date.'
        }

        const hasBody = Array.isArray(doc.body) && doc.body.length > 0
        const hasFile = Boolean(doc.fileUrl)

        if (!hasBody && !hasFile) {
          return 'Active policies must include either policy body text or a file URL.'
        }
      }

      return true
    }),
  fields: [
    defineField({
      name: 'title',
      title: 'Policy title',
      type: 'string',
      group: 'content',
      description:
        'Use the official policy title. Example: Safeguarding Policy, Wildlife Ethics Policy, Data and Privacy Policy.',
      validation: (Rule) => Rule.required().min(4).max(160),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      description:
        'URL-friendly identifier. Generate from title. Do not use spaces, @ symbols, or special characters.',
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
      description:
        'Short public summary shown on the website. Keep it factual and avoid claiming approval unless the policy is actually approved.',
      validation: (Rule) =>
        Rule.max(260).warning('Keep summaries short. Recommended: under 260 characters.'),
    }),

    defineField({
      name: 'body',
      title: 'Policy body',
      type: 'array',
      group: 'content',
      description:
        'Paste the policy text here if it should be readable on the website. For long formal documents, use File URL as well.',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'fileUrl',
      title: 'File URL',
      type: 'url',
      group: 'content',
      description:
        'Optional link to the official policy PDF or document. Use only stable public URLs.',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
          allowRelative: false,
        }),
    }),

    defineField({
      name: 'policyArea',
      title: 'Policy area',
      type: 'string',
      group: 'status',
      description:
        'Choose the closest policy category. This helps visitors and admins organise policy documents.',
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'effectiveDate',
      title: 'Effective date',
      type: 'date',
      group: 'status',
      description:
        'Date from which this policy is active. Required when status is Active.',
    }),

    defineField({
      name: 'reviewDate',
      title: 'Review date',
      type: 'date',
      group: 'status',
      description:
        'Optional future review date. Use this if the policy should be reviewed periodically.',
    }),

    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'status',
      description:
        'Keep as Draft until the policy is final and approved. Only set Active for real approved policies.',
      options: {
        layout: 'radio',
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Active', value: 'active' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'draft',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      policyArea: 'policyArea',
      status: 'status',
    },
    prepare(selection) {
      const { title, policyArea, status } = selection

      return {
        title: title || 'Untitled policy',
        subtitle: `${status || 'draft'} - ${policyArea || 'uncategorised'}`,
      }
    },
  },
})
