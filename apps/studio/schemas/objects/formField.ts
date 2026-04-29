import { defineField, defineType } from 'sanity'

export const formField = defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Field label',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'fieldKey',
      title: 'Field key',
      type: 'string',
      description:
        'Use simple English key like fullName, phone, profession, interestReason. Do not change after publishing if submissions already exist.',
      validation: (Rule) => Rule.required().min(2).max(60),
    }),
    defineField({
      name: 'fieldType',
      title: 'Field type',
      type: 'string',
      initialValue: 'text',
      options: {
        layout: 'dropdown',
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Email', value: 'email' },
          { title: 'Phone', value: 'phone' },
          { title: 'Textarea', value: 'textarea' },
          { title: 'Select dropdown', value: 'select' },
          { title: 'Radio choice', value: 'radio' },
          { title: 'Checkbox', value: 'checkbox' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'required',
      title: 'Required?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'helpText',
      title: 'Help text',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(180),
    }),
    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      description:
        'Only needed for select, radio, or checkbox fields. Example: Student, Teacher, Researcher.',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'fieldType',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Type: ${subtitle}` : 'Form field',
      }
    },
  },
})
