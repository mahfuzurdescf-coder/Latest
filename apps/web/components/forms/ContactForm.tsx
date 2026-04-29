'use client'

import { FormEvent, useState } from 'react'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const PURPOSE_OPTIONS = [
  'General enquiry',
  'Partnership',
  'Volunteer interest',
  'Media enquiry',
  'Programme enquiry',
  'Donation/support',
  'Other',
]

type ContactFormState = {
  name: string
  email: string
  phone: string
  purpose: string
  subject: string
  message: string
  consent: boolean
  website: string
}

const initialFormState: ContactFormState = {
  name: '',
  email: '',
  phone: '',
  purpose: 'General enquiry',
  subject: '',
  message: '',
  consent: false,
  website: '',
}

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialFormState)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [feedback, setFeedback] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  function updateField<K extends keyof ContactFormState>(
    key: K,
    value: ContactFormState[K],
  ) {
    setForm((current) => ({
      ...current,
      [key]: value,
    }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (status === 'submitting') return

    setStatus('submitting')
    setFeedback('')
    setErrors([])

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.ok) {
        setStatus('error')
        setFeedback(
          result?.message ||
            'Submission failed. Please check the form and try again.',
        )
        setErrors(Array.isArray(result?.errors) ? result.errors : [])
        return
      }

      setStatus('success')
      setFeedback(
        result.message ||
          'Thank you. Your message has been received.',
      )
      setForm(initialFormState)
    } catch {
      setStatus('error')
      setFeedback('Submission failed. Please try again later.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => updateField('website', event.target.value)}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-earth-950">
            Name <span className="text-red-700">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-earth-200 bg-white px-4 py-3 text-earth-950 outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-100"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-earth-950">
            Email <span className="text-red-700">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateField('email', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-earth-200 bg-white px-4 py-3 text-earth-950 outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-100"
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-semibold text-earth-950">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) => updateField('phone', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-earth-200 bg-white px-4 py-3 text-earth-950 outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-100"
            placeholder="Optional"
          />
        </div>

        <div>
          <label htmlFor="purpose" className="text-sm font-semibold text-earth-950">
            Purpose
          </label>
          <select
            id="purpose"
            name="purpose"
            value={form.purpose}
            onChange={(event) => updateField('purpose', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-earth-200 bg-white px-4 py-3 text-earth-950 outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-100"
          >
            {PURPOSE_OPTIONS.map((purpose) => (
              <option key={purpose} value={purpose}>
                {purpose}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-semibold text-earth-950">
          Subject <span className="text-red-700">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          value={form.subject}
          onChange={(event) => updateField('subject', event.target.value)}
          className="mt-2 w-full rounded-2xl border border-earth-200 bg-white px-4 py-3 text-earth-950 outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-100"
          placeholder="What is your message about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-semibold text-earth-950">
          Message <span className="text-red-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={(event) => updateField('message', event.target.value)}
          className="mt-2 w-full rounded-2xl border border-earth-200 bg-white px-4 py-3 text-earth-950 outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-100"
          placeholder="Write your message clearly. Include relevant date, organisation, or programme details if needed."
        />
      </div>

      <label className="flex gap-3 rounded-2xl border border-earth-200 bg-earth-50 p-4 text-sm text-earth-700">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(event) => updateField('consent', event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-earth-300"
          required
        />
        <span>
          I consent to DESCF storing and using this information to respond to my enquiry.
          <span className="text-red-700"> *</span>
        </span>
      </label>

      {feedback && (
        <div
          className={`rounded-2xl border p-4 text-sm ${
            status === 'success'
              ? 'border-forest-200 bg-forest-50 text-forest-900'
              : 'border-red-200 bg-red-50 text-red-900'
          }`}
          role="status"
          aria-live="polite"
        >
          <p className="font-semibold">{feedback}</p>

          {errors.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending...' : 'Send message'}
        </button>

        <p className="text-sm text-earth-500">
          Required fields are marked with an asterisk.
        </p>
      </div>
    </form>
  )
}
