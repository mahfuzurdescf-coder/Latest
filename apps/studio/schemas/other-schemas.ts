import { defineField, defineType } from 'sanity'

const PROGRAMME_STATUSES = [
  { title: 'Current', value: 'current' },
  { title: 'In preparation', value: 'in-preparation' },
  { title: 'In development', value: 'in-development' },
  { title: 'Exploratory', value: 'exploratory' },
]

const RESOURCE_TYPES = [
  { title: 'Report', value: 'report' },
  { title: 'Concept note', value: 'concept-note' },
  { title: 'Brief', value: 'brief' },
  { title: 'Presentation', value: 'presentation' },
  { title: 'Media reference', value: 'media-reference' },
  { title: 'Field note', value: 'field-note' },
  { title: 'Governance', value: 'governance' },
]

const EVENT_STATUSES = [
  { title: 'Upcoming', value: 'upcoming' },
  { title: 'Completed', value: 'completed' },
]

const SOCIAL_FIELDS = [
  defineField({
    name: 'facebook',
    title: 'Facebook',
    type: 'url',
  }),
  defineField({
    name: 'instagram',
    title: 'Instagram',
    type: 'url',
  }),
  defineField({
    name: 'linkedin',
    title: 'LinkedIn',
    type: 'url',
  }),
  defineField({
    name: 'twitter',
    title: 'Twitter / X',
    type: 'url',
  }),
  defineField({
    name: 'youtube',
    title: 'YouTube',
    type: 'url',
  }),
  defineField({
    name: 'website',
    title: 'Website',
    type: 'url',
  }),
]

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
      name: 'colorLabel',
      title: 'Colour label',
      type: 'string',
      description:
        'Optional visual label for category badges, such as forest, bark, earth, blue.',
      validation: (Rule) => Rule.max(40),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
})

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile', default: true },
    { name: 'contact', title: 'Contact and social' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'profile',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'profile',
      options: {
        source: 'name',
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'profile',
      description: 'Public-facing role, for example Writer, Researcher, Editor.',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'orgRole',
      title: 'Organisation role',
      type: 'string',
      group: 'profile',
      description: 'DESCF role, if different from public author role.',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'expertise',
      title: 'Expertise',
      type: 'array',
      group: 'profile',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'imageWithAltCredit',
      group: 'profile',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      group: 'profile',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      group: 'contact',
    }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'object',
      group: 'contact',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: SOCIAL_FIELDS,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'orgRole',
      media: 'photo',
    },
  },
})

export const programme = defineType({
  name: 'programme',
  title: 'Programme',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'status', title: 'Status and indicators' },
    { name: 'relations', title: 'Relations' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(6).max(120),
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
      name: 'shortDescription',
      title: 'Short description',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) => Rule.max(260),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'imageWithAltCredit',
      group: 'content',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        { type: 'imageWithAltCredit' },
      ],
    }),
    defineField({
      name: 'status',
      title: 'Programme status',
      type: 'string',
      group: 'status',
      initialValue: 'current',
      options: {
        layout: 'dropdown',
        list: PROGRAMME_STATUSES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'keyActivities',
      title: 'Key activities',
      type: 'array',
      group: 'status',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'impactMetrics',
      title: 'Impact metrics',
      type: 'array',
      group: 'status',
      of: [
        {
          type: 'object',
          name: 'impactMetric',
          title: 'Impact metric',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'Use text so values like â€œ1,000+â€ or â€œIn progressâ€ are possible.',
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.max(180),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related posts',
      type: 'array',
      group: 'relations',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
    }),
    defineField({
      name: 'relatedResources',
      title: 'Related resources',
      type: 'array',
      group: 'relations',
      of: [{ type: 'reference', to: [{ type: 'resource' }] }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(170),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
      media: 'heroImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? `Status: ${subtitle}` : 'No status set',
        media,
      }
    },
  },
})

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'relations', title: 'Relations' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(4).max(140),
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
      name: 'type',
      title: 'Resource type',
      type: 'string',
      group: 'content',
      initialValue: 'report',
      options: {
        layout: 'dropdown',
        list: RESOURCE_TYPES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileUrl',
      title: 'File URL',
      type: 'url',
      group: 'content',
      description:
        'External file link or published document URL. Use this until Sanity file assets are configured.',
    }),
    defineField({
      name: 'pubDate',
      title: 'Publication date',
      type: 'date',
      group: 'content',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'content',
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: 'relatedProgramme',
      title: 'Related programme',
      type: 'reference',
      group: 'relations',
      to: [{ type: 'programme' }],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(170),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Type: ${subtitle}` : 'No resource type',
      }
    },
  },
})

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'details', title: 'Details' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule) => Rule.required().min(4).max(140),
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
      name: 'description',
      title: 'Description',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        { type: 'imageWithAltCredit' },
      ],
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      group: 'details',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'string',
      group: 'details',
      description: 'Example: 10:00 AM â€“ 1:00 PM',
      validation: (Rule) => Rule.max(80),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'details',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'status',
      title: 'Event status',
      type: 'string',
      group: 'details',
      initialValue: 'upcoming',
      options: {
        layout: 'radio',
        list: EVENT_STATUSES,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      group: 'details',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration link',
      type: 'url',
      group: 'details',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
    },
  },
})

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  groups: [
    { name: 'profile', title: 'Profile', default: true },
    { name: 'social', title: 'Social' },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'profile',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'profile',
      options: {
        source: 'name',
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      group: 'profile',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'profile',
      initialValue: 100,
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'imageWithAltCredit',
      group: 'profile',
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      group: 'profile',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'object',
      group: 'social',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: SOCIAL_FIELDS,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'identity', title: 'Identity', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'contact', title: 'Contact' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site title',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'tagline_bn',
      title: 'Bangla tagline',
      type: 'string',
      group: 'identity',
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'imageWithAltCredit',
      group: 'identity',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navigation links',
      type: 'array',
      group: 'navigation',
      of: [{ type: 'link' }],
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer links',
      type: 'array',
      group: 'navigation',
      of: [{ type: 'link' }],
    }),
    defineField({
      name: 'donationLink',
      title: 'Donation link',
      type: 'string',
      group: 'navigation',
      description: 'Use an internal path like /donate or an external URL.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'email',
      group: 'contact',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact phone',
      type: 'string',
      group: 'contact',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
      group: 'contact',
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: 'social',
      title: 'Social links',
      type: 'object',
      group: 'contact',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: SOCIAL_FIELDS,
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Open Graph image',
      type: 'imageWithAltCredit',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'siteTitle',
      subtitle: 'tagline',
      media: 'logo',
    },
  },
})




