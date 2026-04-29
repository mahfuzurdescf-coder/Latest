import { defineField, defineType } from 'sanity'

export const contactSubmission = defineType({
  name: 'contactSubmission',
  title: 'Contact Submission',
  type: 'document',
  groups: [
    { name: 'submission', title: 'Submission', default: true },
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
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'purpose',
      title: 'Purpose',
      type: 'string',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 6,
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'consent',
      title: 'Consent given?',
      type: 'boolean',
      group: 'submission',
      readOnly: true,
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
          { title: 'In review', value: 'in-review' },
          { title: 'Responded', value: 'responded' },
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
      title: 'name',
      subtitle: 'email',
      status: 'status',
    },
    prepare({ title, subtitle, status }) {
      return {
        title: title || 'Unnamed contact submission',
        subtitle: `${subtitle || 'No email'} · ${status || 'new'}`,
      }
    },
  },
})
