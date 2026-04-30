import { defineField, defineType } from 'sanity'

export const speciesZone = defineType({
  name: 'speciesZone',
  title: 'Species Zone',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Zone title',
      type: 'string',
      description: 'Example: Sundarbans, Chattogram Hill Tracts, Central Bangladesh, Coastal Belt.',
      validation: (Rule) => Rule.required().min(2).max(100),
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
      description: 'Short ecological or geographic explanation of this zone.',
      validation: (Rule) => Rule.max(400),
    }),
    defineField({
      name: 'mapColor',
      title: 'Map colour label',
      type: 'string',
      description: 'Simple colour label for future maps, such as forest, coastal, hill, wetland, riverine.',
      validation: (Rule) => Rule.max(40),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 100,
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'mapColor',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? 'Map label: ' + subtitle : 'No map colour label',
      }
    },
  },
})
