import { defineField, defineType } from 'sanity'

const SECTION_THEMES = [
  { title: 'White', value: 'white' },
  { title: 'Cream / Earth', value: 'earth' },
  { title: 'Forest dark', value: 'forest' },
]

const SECTION_LAYOUTS = [
  { title: 'Intro text', value: 'intro' },
  { title: 'Card grid', value: 'cards' },
  { title: 'Split content', value: 'split' },
  { title: 'Call to action', value: 'cta' },
]

export const pageSection = defineType({
  name: 'pageSection',
  title: 'Page Section',
  type: 'object',
  description:
    'Brand-safe website section. Editors can change text and links, but not arbitrary colours or typography.',
  fields: [
    defineField({
      name: 'sectionId',
      title: 'Section ID',
      type: 'string',
      description:
        'Internal anchor/identifier. Use lowercase English letters and hyphens only. Example: governance-framework.',
      validation: (Rule) =>
        Rule.regex(/^[a-z0-9-]+$/, {
          name: 'lowercase letters, numbers, and hyphens',
          invert: false,
        }).warning('Use lowercase letters, numbers, and hyphens only.'),
    }),
    defineField({
      name: 'theme',
      title: 'Section theme',
      type: 'string',
      initialValue: 'white',
      options: {
        layout: 'radio',
        list: SECTION_THEMES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layout',
      title: 'Section layout',
      type: 'string',
      initialValue: 'intro',
      options: {
        layout: 'dropdown',
        list: SECTION_LAYOUTS,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Small label',
      type: 'string',
      description: 'Short label above the section title. Keep under 60 characters.',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'title',
      title: 'Section title',
      type: 'text',
      rows: 2,
      validation: (Rule) =>
        Rule.max(160).warning('Keep section titles short and readable.'),
    }),
    defineField({
      name: 'description',
      title: 'Section description',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.max(520).warning('Use one short paragraph. Avoid inflated claims.'),
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'pageCard' }],
      validation: (Rule) =>
        Rule.max(12).warning('Too many cards make pages hard to scan.'),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary button',
      type: 'link',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary button',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'layout',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled section',
        subtitle: subtitle ? `Layout: ${subtitle}` : 'Page section',
      }
    },
  },
})
