import { defineField, defineType } from 'sanity'

const BANGLADESH_DIVISIONS = [
  { title: 'Barishal', value: 'barishal' },
  { title: 'Chattogram', value: 'chattogram' },
  { title: 'Dhaka', value: 'dhaka' },
  { title: 'Khulna', value: 'khulna' },
  { title: 'Mymensingh', value: 'mymensingh' },
  { title: 'Rajshahi', value: 'rajshahi' },
  { title: 'Rangpur', value: 'rangpur' },
  { title: 'Sylhet', value: 'sylhet' },
]

export const speciesDistrict = defineType({
  name: 'speciesDistrict',
  title: 'Species District',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'map', title: 'Map data' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'District name',
      type: 'string',
      group: 'content',
      description: 'Example: Dhaka, Satkhira, Sylhet, Chattogram.',
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'title',
        maxLength: 80,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'division',
      title: 'Division',
      type: 'string',
      group: 'content',
      options: {
        layout: 'dropdown',
        list: BANGLADESH_DIVISIONS,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'zone',
      title: 'Wildlife zone',
      type: 'reference',
      group: 'content',
      to: [{ type: 'speciesZone' }],
      description: 'Optional broader wildlife/ecological zone used for filtering and maps.',
    }),
    defineField({
      name: 'lat',
      title: 'Latitude',
      type: 'number',
      group: 'map',
      description: 'Approximate district centre latitude for future map display.',
      validation: (Rule) => Rule.min(20).max(27),
    }),
    defineField({
      name: 'lng',
      title: 'Longitude',
      type: 'number',
      group: 'map',
      description: 'Approximate district centre longitude for future map display.',
      validation: (Rule) => Rule.min(88).max(93),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      group: 'content',
      initialValue: 100,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      division: 'division',
      zone: 'zone.title',
    },
    prepare({ title, division, zone }) {
      return {
        title,
        subtitle: [division, zone].filter(Boolean).join(' - '),
      }
    },
  },
})
