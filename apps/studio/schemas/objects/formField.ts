import { defineField, defineType } from 'sanity'

export const formField = defineType({
  name: 'formField',
  title: 'Form Field',
  type: 'object',
  description:
    'Reusable field configuration for event registration and other public forms. Edit carefully because field keys affect submitted data.',
  fields: [
    defineField({
      name: 'label',
      title: 'Field label',
      type: 'string',
      description:
        'Visible field label shown to users. Example: Full name, Email address, Phone number, Organisation.',
      validation: (Rule) => Rule.required().min(2).max(100),
    }),

    defineField({
      name: 'fieldKey',
      title: 'Field key',
      type: 'string',
      description:
        'Internal key used in submitted data. Use simple camelCase English like fullName, phone, profession, interestReason. Do not change after publishing if submissions already exist.',
      validation: (Rule) =>
        Rule.required()
          .min(2)
          .max(60)
          .regex(/^[a-z][a-zA-Z0-9]*$/, {
            name: 'camelCase key',
            invert: false,
          })
          .error('Use camelCase only: start with a lowercase letter and use no spaces or symbols.'),
    }),

    defineField({
      name: 'fieldType',
      title: 'Field type',
      type: 'string',
      description:
        'Choose the input style. Use textarea for long answers, select/radio for fixed choices, and checkbox for yes/no or consent-style fields.',
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
      description:
        'Turn on only for fields users must complete. Avoid making too many fields required; long forms reduce completion rates.',
      initialValue: false,
    }),

    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      description:
        'Optional example text inside the field. Do not use placeholder as a replacement for a clear label.',
      validation: (Rule) => Rule.max(120),
    }),

    defineField({
      name: 'helpText',
      title: 'Help text',
      type: 'text',
      rows: 2,
      description:
        'Optional short instruction shown near the field. Use this to clarify what users should enter.',
      validation: (Rule) => Rule.max(180),
    }),

    defineField({
      name: 'options',
      title: 'Options',
      type: 'array',
      description:
        'Only needed for select, radio, or checkbox fields. Example: Student, Teacher, Researcher. Keep options short and mutually clear.',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(12).warning('Keep choice lists short. Recommended: 3-8 options.'),
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'fieldType',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled field',
        subtitle: subtitle ? 'Type: ' + subtitle : 'Form field',
      }
    },
  },
})
