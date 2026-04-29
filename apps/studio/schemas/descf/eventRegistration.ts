import { defineField, defineType } from 'sanity'

export const eventRegistration = defineType({
  name: 'eventRegistration',
  title: 'Event Registration',
  type: 'document',
  groups: [
    { name: 'registrant', title: 'Registrant', default: true },
    { name: 'event', title: 'Event' },
    { name: 'answers', title: 'Answers' },
    { name: 'management', title: 'Management' },
    { name: 'system', title: 'System' },
  ],
  fields: [
    {
      name: "workflowStatus",
      title: "Workflow Status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "In Review", value: "inReview" },
          { title: "Contacted", value: "contacted" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Rejected / Not Eligible", value: "rejected" },
          { title: "Needs Follow-up", value: "needsFollowUp" },
          { title: "Archived", value: "archived" },
        ],
        layout: "dropdown",
      },
    },
    {
      name: "assignedTo",
      title: "Assigned To",
      type: "string",
      description: "Name of the person responsible for reviewing this submission.",
    },
    {
      name: "internalNotes",
      title: "Internal Notes",
      type: "text",
      rows: 4,
      description: "Private notes for admin or submission reviewers. Do not publish publicly.",
    },
    {
      name: "lastReviewedAt",
      title: "Last Reviewed At",
      type: "datetime",
      description: "Update this when the submission is reviewed or followed up.",
    },

    defineField({
      name: 'registrantName',
      title: 'Registrant name',
      type: 'string',
      group: 'registrant',
      readOnly: true,
    }),
    defineField({
      name: 'registrantEmail',
      title: 'Registrant email',
      type: 'email',
      group: 'registrant',
      readOnly: true,
    }),
    defineField({
      name: 'registrantPhone',
      title: 'Registrant phone',
      type: 'string',
      group: 'registrant',
      readOnly: true,
    }),
    defineField({
      name: 'event',
      title: 'Event',
      type: 'reference',
      group: 'event',
      to: [{ type: 'event' }],
      readOnly: true,
    }),
    defineField({
      name: 'registrationForm',
      title: 'Registration form',
      type: 'reference',
      group: 'event',
      to: [{ type: 'registrationForm' }],
      readOnly: true,
    }),
    defineField({
      name: 'eventTitleSnapshot',
      title: 'Event title snapshot',
      type: 'string',
      group: 'event',
      readOnly: true,
      description:
        'Stored at submission time so records remain readable even if the event title changes later.',
    }),
    defineField({
      name: 'answers',
      title: 'Submitted answers',
      type: 'array',
      group: 'answers',
      readOnly: true,
      of: [
        {
          type: 'object',
          name: 'registrationAnswer',
          title: 'Registration answer',
          fields: [
            defineField({
              name: 'fieldKey',
              title: 'Field key',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Question label',
              type: 'string',
            }),
            defineField({
              name: 'value',
              title: 'Answer',
              type: 'text',
              rows: 3,
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
      name: 'status',
      title: 'Status',
      type: 'string',
      group: 'management',
      initialValue: 'new',
      options: {
        layout: 'radio',
        list: [
          { title: 'New', value: 'new' },
          { title: 'Confirmed', value: 'confirmed' },
          { title: 'Waitlisted', value: 'waitlisted' },
          { title: 'Cancelled', value: 'cancelled' },
          { title: 'Archived', value: 'archived' },
        ],
      },
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted at',
      type: 'datetime',
      group: 'system',
      readOnly: true,
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      group: 'system',
      readOnly: true,
    }),
    defineField({
      name: 'userAgent',
      title: 'User agent',
      type: 'text',
      rows: 3,
      group: 'system',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'registrantName',
      subtitle: 'eventTitleSnapshot',
      email: 'registrantEmail',
    },
    prepare({ title, subtitle, email }) {
      return {
        title: title || 'Unnamed registration',
        subtitle: `${subtitle || 'No event'} · ${email || 'No email'}`,
      }
    },
  },
})
