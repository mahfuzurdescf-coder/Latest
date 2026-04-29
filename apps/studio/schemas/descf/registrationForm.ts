import { defineField, defineType } from 'sanity'

export const registrationForm = defineType({
  name: 'registrationForm',
  title: 'Registration Form',
  type: 'document',
  groups: [
    { name: 'setup', title: 'Setup', default: true },
    { name: 'form', title: 'Form fields' },
    { name: 'limits', title: 'Deadline and capacity' },
    { name: 'messages', title: 'Messages' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Internal form title',
      type: 'string',
      group: 'setup',
      description: 'Example: Snake Awareness Seminar Registration Form',
      validation: (Rule) => Rule.required().min(4).max(160),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'setup',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'event',
      title: 'Related event',
      type: 'reference',
      group: 'setup',
      to: [{ type: 'event' }],
      description:
        'Connect this form to a published event. The event page will use this registration form.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Form status',
      type: 'string',
      group: 'setup',
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
      name: 'isActive',
      title: 'Accepting responses?',
      type: 'boolean',
      group: 'setup',
      initialValue: false,
      description:
        'Turn this on only when the form is ready to accept public registrations.',
    }),
    defineField({
      name: 'registrationTitle',
      title: 'Public registration title',
      type: 'string',
      group: 'form',
      initialValue: 'Register for this event',
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'registrationIntro',
      title: 'Public intro text',
      type: 'text',
      rows: 3,
      group: 'form',
      validation: (Rule) => Rule.max(360),
    }),
    defineField({
      name: 'fields',
      title: 'Form fields',
      type: 'array',
      group: 'form',
      of: [{ type: 'formField' }],
      validation: (Rule) => Rule.required().min(1).max(20),
    }),
    defineField({
      name: 'deadline',
      title: 'Registration deadline',
      type: 'datetime',
      group: 'limits',
      description: 'Optional. If set, the frontend can close the form after this time.',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
      group: 'limits',
      description:
        'Optional. Use only if you want to limit registration count. Enforcement will be added in frontend API phase.',
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'successMessage',
      title: 'Success message',
      type: 'text',
      rows: 3,
      group: 'messages',
      initialValue:
        'Thank you. Your registration has been received. DESCF will contact you if further information is required.',
      validation: (Rule) => Rule.required().max(360),
    }),
    defineField({
      name: 'closedMessage',
      title: 'Closed message',
      type: 'text',
      rows: 3,
      group: 'messages',
      initialValue: 'Registration for this event is currently closed.',
      validation: (Rule) => Rule.max(260),
    }),
    defineField({
      name: 'notificationEmail',
      title: 'Notification email',
      type: 'email',
      group: 'messages',
      description:
        'Optional. Later this can be used for email notifications. Submissions will still be stored in Studio.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'status',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `Status: ${subtitle}` : 'Registration form',
      }
    },
  },
})
