import { useState } from 'react'
import { useClient } from 'sanity'

type ExportStatus = 'idle' | 'loading' | 'success' | 'error'

type ContactSubmission = {
  submittedAt?: string
  status?: string
  name?: string
  email?: string
  phone?: string
  purpose?: string
  subject?: string
  message?: string
  consent?: boolean
  sourceUrl?: string
  internalNotes?: string
}

type EventRegistration = {
  submittedAt?: string
  status?: string
  registrantName?: string
  registrantEmail?: string
  registrantPhone?: string
  eventTitleSnapshot?: string
  eventTitle?: string
  sourceUrl?: string
  internalNotes?: string
  answers?: Array<{
    fieldKey?: string
    label?: string
    value?: string
  }>
}

const CONTACT_EXPORT_QUERY = /* groq */ `
  *[_type == "contactSubmission"] | order(submittedAt desc) {
    submittedAt,
    status,
    name,
    email,
    phone,
    purpose,
    subject,
    message,
    consent,
    sourceUrl,
    internalNotes
  }
`

const EVENT_REGISTRATION_EXPORT_QUERY = /* groq */ `
  *[_type == "eventRegistration"] | order(submittedAt desc) {
    submittedAt,
    status,
    registrantName,
    registrantEmail,
    registrantPhone,
    eventTitleSnapshot,
    "eventTitle": event->title,
    answers[]{
      fieldKey,
      label,
      value
    },
    sourceUrl,
    internalNotes
  }
`

function csvEscape(value: unknown) {
  if (value === null || value === undefined) return ''

  const stringValue =
    typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)

  return `"${stringValue.replace(/"/g, '""')}"`
}

function downloadCsv(filename: string, rows: Array<Record<string, unknown>>) {
  if (rows.length === 0) {
    throw new Error('No records found to export.')
  }

  const headers = Array.from(
    rows.reduce((set, row) => {
      Object.keys(row).forEach((key) => set.add(key))
      return set
    }, new Set<string>()),
  )

  const csv = [
    headers.map(csvEscape).join(','),
    ...rows.map((row) => headers.map((header) => csvEscape(row[header])).join(',')),
  ].join('\n')

  const blob = new Blob([`\uFEFF${csv}`], {
    type: 'text/csv;charset=utf-8;',
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

function todayStamp() {
  return new Date().toISOString().slice(0, 10)
}

function normaliseAnswerHeader(answer: {
  fieldKey?: string
  label?: string
}) {
  const base = answer.label || answer.fieldKey || 'Answer'

  return `Answer - ${base}`
}

export function ExportSubmissionsTool() {
  const client = useClient({ apiVersion: '2025-01-01' })
  const [status, setStatus] = useState<ExportStatus>('idle')
  const [message, setMessage] = useState('')

  async function exportContacts() {
    setStatus('loading')
    setMessage('Preparing contact submissions export...')

    try {
      const submissions = await client.fetch<ContactSubmission[]>(
        CONTACT_EXPORT_QUERY,
      )

      const rows = submissions.map((item) => ({
        'Submitted At': item.submittedAt || '',
        Status: item.status || '',
        Name: item.name || '',
        Email: item.email || '',
        Phone: item.phone || '',
        Purpose: item.purpose || '',
        Subject: item.subject || '',
        Message: item.message || '',
        Consent: item.consent ? 'Yes' : 'No',
        'Source URL': item.sourceUrl || '',
        'Internal Notes': item.internalNotes || '',
      }))

      downloadCsv(`descf-contact-submissions-${todayStamp()}.csv`, rows)

      setStatus('success')
      setMessage(`Exported ${rows.length} contact submissions.`)
    } catch (error) {
      console.error(error)
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Contact submissions export failed.',
      )
    }
  }

  async function exportEventRegistrations() {
    setStatus('loading')
    setMessage('Preparing event registrations export...')

    try {
      const registrations = await client.fetch<EventRegistration[]>(
        EVENT_REGISTRATION_EXPORT_QUERY,
      )

      const rows = registrations.map((item) => {
        const row: Record<string, unknown> = {
          'Submitted At': item.submittedAt || '',
          Status: item.status || '',
          Event: item.eventTitle || item.eventTitleSnapshot || '',
          Name: item.registrantName || '',
          Email: item.registrantEmail || '',
          Phone: item.registrantPhone || '',
          'Source URL': item.sourceUrl || '',
          'Internal Notes': item.internalNotes || '',
        }

        item.answers?.forEach((answer) => {
          row[normaliseAnswerHeader(answer)] = answer.value || ''
        })

        return row
      })

      downloadCsv(`descf-event-registrations-${todayStamp()}.csv`, rows)

      setStatus('success')
      setMessage(`Exported ${rows.length} event registrations.`)
    } catch (error) {
      console.error(error)
      setStatus('error')
      setMessage(
        error instanceof Error
          ? error.message
          : 'Event registrations export failed.',
      )
    }
  }

  return (
    <main style={{ padding: '2rem', maxWidth: 900 }}>
      <p
        style={{
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontSize: 12,
          fontWeight: 700,
          color: '#3f6b3f',
          marginBottom: 8,
        }}
      >
        DESCF Submissions
      </p>

      <h1 style={{ fontSize: 34, lineHeight: 1.15, marginBottom: 12 }}>
        Export CSV
      </h1>

      <p style={{ fontSize: 16, lineHeight: 1.6, color: '#4b5563' }}>
        Download contact submissions and event registrations as CSV files. These
        files can be opened directly in Microsoft Excel or Google Sheets.
      </p>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
          marginTop: 28,
        }}
      >
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 18,
            padding: 20,
            background: '#fff',
          }}
        >
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>
            Contact submissions
          </h2>
          <p style={{ color: '#6b7280', lineHeight: 1.5 }}>
            Export messages submitted through the public contact form.
          </p>
          <button
            type="button"
            onClick={exportContacts}
            disabled={status === 'loading'}
            style={{
              marginTop: 18,
              border: 0,
              borderRadius: 999,
              padding: '12px 18px',
              background: '#2f5d31',
              color: '#fff',
              fontWeight: 700,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.65 : 1,
            }}
          >
            Export contact CSV
          </button>
        </div>

        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: 18,
            padding: 20,
            background: '#fff',
          }}
        >
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>
            Event registrations
          </h2>
          <p style={{ color: '#6b7280', lineHeight: 1.5 }}>
            Export registration responses submitted through event pages.
          </p>
          <button
            type="button"
            onClick={exportEventRegistrations}
            disabled={status === 'loading'}
            style={{
              marginTop: 18,
              border: 0,
              borderRadius: 999,
              padding: '12px 18px',
              background: '#a77916',
              color: '#fff',
              fontWeight: 700,
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
              opacity: status === 'loading' ? 0.65 : 1,
            }}
          >
            Export registration CSV
          </button>
        </div>
      </section>

      {message && (
        <div
          style={{
            marginTop: 24,
            borderRadius: 16,
            padding: 16,
            border:
              status === 'error' ? '1px solid #fecaca' : '1px solid #bbf7d0',
            background: status === 'error' ? '#fef2f2' : '#f0fdf4',
            color: status === 'error' ? '#991b1b' : '#166534',
            fontWeight: 600,
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{
          marginTop: 32,
          borderTop: '1px solid #e5e7eb',
          paddingTop: 20,
          color: '#6b7280',
          lineHeight: 1.6,
          fontSize: 14,
        }}
      >
        <strong>Data handling note:</strong> export files may contain personal
        contact information. Share them only with authorised DESCF team members
        and delete temporary copies when they are no longer needed.
      </div>
    </main>
  )
}
