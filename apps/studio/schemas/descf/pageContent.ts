import { defineField, defineType } from 'sanity'

const PAGE_KEYS = [
  { title: 'About', value: 'about' },
  { title: 'Mission', value: 'mission' },
  { title: 'Current Work', value: 'current-work' },
  { title: 'Governance', value: 'governance' },
  { title: 'Team', value: 'team' },
  { title: 'Contact', value: 'contact' },
  { title: 'Resources', value: 'resources' },
  { title: 'Reports & Publications', value: 'reports-publications' },
  { title: 'Reports', value: 'reports' },
  { title: 'Evidence & Resources', value: 'evidence-resources' },
  { title: 'Media', value: 'media' },
  { title: 'Partner With Us', value: 'partner-with-us' },
]

const HERO_THEMES = [
  { title: 'Cream / Earth', value: 'earth' },
  { title: 'Forest dark', value: 'forest' },
]

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  description:
    'Controls editable text, buttons, SEO and structured sections for important website pages. Brand colours and typography are controlled by code, not editors.',
  groups: [
    { name: 'identity', title: 'Page identity', default: true },
    { name: 'hero', title: 'Hero' },
    { name: 'sections', title: 'Sections' },
    { name: 'seo', title: 'SEO' },
    { name: 'publishing', title: 'Publishing' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      group: 'identity',
      description: 'Internal Studio title. Example: About Page.',
      validation: (Rule) => Rule.required().min(3).max(120),
    }),
    defineField({
      name: 'pageKey',
      title: 'Page key',
      type: 'string',
      group: 'identity',
      description:
        'Connects this Studio document to a website route. Do not change after setup.',
      options: {
        layout: 'dropdown',
        list: PAGE_KEYS,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Content status',
      type: 'string',
      group: 'publishing',
      initialValue: 'draft',
      options: {
        layout: 'radio',
        list: [
          { title: 'Draft', value: 'draft' },
          { title: 'Published', value: 'published' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroTheme',
      title: 'Hero theme',
      type: 'string',
      group: 'hero',
      initialValue: 'earth',
      options: {
        layout: 'radio',
        list: HERO_THEMES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Hero small label',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'text',
      rows: 2,
      group: 'hero',
      validation: (Rule) =>
        Rule.max(160).warning('Keep hero titles short and strong.'),
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 4,
      group: 'hero',
      validation: (Rule) =>
        Rule.max(420).warning('Recommended: 1-2 concise sentences.'),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary hero button',
      type: 'link',
      group: 'hero',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary hero button',
      type: 'link',
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Optional hero image',
      type: 'imageWithAltCredit',
      group: 'hero',
      description:
        'Optional. Use only when the page design supports an image. Always add alt text.',
    }),
    defineField({
      name: 'sections',
      title: 'Page sections',
      type: 'array',
      group: 'sections',
      of: [{ type: 'pageSection' }],
      validation: (Rule) =>
        Rule.max(16).warning('Avoid making pages too long. Keep sections purposeful.'),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seoFields',
      group: 'seo',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal notes',
      type: 'text',
      rows: 4,
      group: 'publishing',
      description:
        'Private notes for editors. These notes do not appear on the public website.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageKey: 'pageKey',
      status: 'status',
    },
    prepare({ title, pageKey, status }) {
      return {
        title: title || 'Untitled page content',
        subtitle: `${pageKey || 'no page key'} - ${status || 'draft'}`,
      }
    },
  },
})
