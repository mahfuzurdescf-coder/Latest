'use client'

import { FormEvent, useMemo, useState } from 'react'

import type { RegistrationFormPublic } from '@/types/sanity'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

interface EventRegistrationFormProps {
  form: RegistrationFormPublic
  eventTitle: string
}

const fallbackLabels = {
  eyebrow: 'Registration',
  closedTitle: 'Registration is closed',
  closedMessage: 'Registration for this event is currently closed.',
  titlePrefix: 'Register for',
  deadline: 'Deadline',
  selectPlaceholder: 'Select an option',
  checkboxFallbackOption: 'Yes',
  submitting: 'Submitting...',
  submit: 'Submit registration',
  requiredNote: 'Required fields are marked with an asterisk.',
  error: 'Registration failed. Please check the form and try again.',
  retryError: 'Registration failed. Please try again later.',
  success: 'Thank you. Your registration has been received.',
}

function isDeadlinePassed(deadline?: string): boolean {
  if (!deadline) return false

  const deadlineTime = new Date(deadline).getTime()

  if (Number.isNaN(deadlineTime)) return false

  return Date.now() > deadlineTime
}

function formatDeadline(deadline?: string): string {
  if (!deadline) return ''

  const date = new Date(deadline)

  if (Number.isNaN(date.getTime())) return ''

  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export function EventRegistrationForm({
  form,
  eventTitle,
}: EventRegistrationFormProps) {
  const fields = useMemo(() => form.fields ?? [], [form.fields])
  const isClosed = !form.isActive || isDeadlinePassed(form.deadline)

  const eyebrowLabel = form.eyebrowLabel || fallbackLabels.eyebrow
  const closedTitle = form.closedTitle || fallbackLabels.closedTitle
  const deadlineLabel = form.deadlineLabel || fallbackLabels.deadline
  const selectPlaceholder = form.selectPlaceholder || fallbackLabels.selectPlaceholder
  const checkboxFallbackOption =
    form.checkboxFallbackOption || fallbackLabels.checkboxFallbackOption
  const submittingLabel = form.submittingLabel || fallbackLabels.submitting
  const submitButtonLabel = form.submitButtonLabel || fallbackLabels.submit
  const requiredNote = form.requiredNote || fallbackLabels.requiredNote
  const errorMessage = form.errorMessage || fallbackLabels.error
  const retryErrorMessage = form.retryErrorMessage || fallbackLabels.retryError

  const initialAnswers = useMemo(() => {
    return fields.reduce<Record<string, string>>((accumulator, field) => {
      accumulator[field.fieldKey] = ''
      return accumulator
    }, {})
  }, [fields])

  const [answers, setAnswers] = useState<Record<string, string>>(initialAnswers)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [feedback, setFeedback] = useState('')
  const [errors, setErrors] = useState<string[]>([])
  const [website, setWebsite] = useState('')

  function updateAnswer(fieldKey: string, value: string) {
    setAnswers((current) => ({
      ...current,
      [fieldKey]: value,
    }))
  }

  function updateCheckboxAnswer(fieldKey: string, option: string, checked: boolean) {
    const currentValue = answers[fieldKey] || ''
    const currentOptions = currentValue
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean)

    const nextOptions = checked
      ? Array.from(new Set([...currentOptions, option]))
      : currentOptions.filter((value) => value !== option)

    updateAnswer(fieldKey, nextOptions.join(', '))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (status === 'submitting' || isClosed) return

    setStatus('submitting')
    setFeedback('')
    setErrors([])

    try {
      const response = await fetch('/api/event-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registrationFormId: form._id,
          answers,
          website,
        }),
      })

      const result = await response.json().catch(() => null)

      if (!response.ok || !result?.ok) {
        setStatus('error')
        setFeedback(result?.message || errorMessage)
        setErrors(Array.isArray(result?.errors) ? result.errors : [])
        return
      }

      setStatus('success')
      setFeedback(result.message || form.successMessage || fallbackLabels.success)
      setAnswers(initialAnswers)
    } catch {
      setStatus('error')
      setFeedback(retryErrorMessage)
    }
  }

  if (fields.length === 0) {
    return null
  }

  if (isClosed) {
    return (
      <div className="rounded-3xl border border-earth-200 bg-earth-50 p-6">
        <p className="section-label mb-3">{eyebrowLabel}</p>
        <h2 className="font-serif text-2xl text-earth-950">{closedTitle}</h2>
        <p className="mt-3 text-body-sm text-earth-700">
          {form.closedMessage || fallbackLabels.closedMessage}
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-earth-200 bg-white p-6 shadow-card">
      <div className="mb-6">
        <p className="section-label mb-3">{eyebrowLabel}</p>
        <h2 className="font-serif text-2xl text-earth-950">
          {form.registrationTitle || `${fallbackLabels.titlePrefix} ${eventTitle}`}
        </h2>

        {form.registrationIntro && (
          <p className="mt-3 text-body-sm text-earth-700">
            {form.registrationIntro}
          </p>
        )}

        {form.deadline && (
          <p className="mt-3 text-caption text-earth-500">
            {deadlineLabel}: {formatDeadline(form.deadline)}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="registration-website">Website</label>
          <input
            id="registration-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        {fields.map((field) => {
          const fieldId = `registration-${field.fieldKey}`
          const value = answers[field.fieldKey] || ''
          const requiredMark = field.required ? (
            <span className="text-red-700"> *</span>
          ) : null

          if (field.fieldType === 'textarea') {
            return (
              <div key={field._key || field.fieldKey}>
                <label
                  htmlFor={fieldId}
                  className="text-sm font-semibold text-earth-950"
                >
                  {field.label}
                  {requiredMark}
                </label>
                <textarea
                  id={fieldId}
                  required={field.required}
                  rows={5}
                  value={value}
                  placeholder={field.placeholder}
                  onChange={(event) => updateAnswer(field.fieldKey, event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-earth-200 bg-white px-4 py-3 text-earth-950 outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-100"
                />
                {field.helpText && (
                  <p className="mt-2 text-caption text-earth-500">{field.helpText}</p>
                )}
              </div>
            )
          }

          if (field.fieldType === 'select') {
            return (
              <div key={field._key || field.fieldKey}>
                <label
                  htmlFor={fieldId}
                  className="text-sm font-semibold text-earth-950"
                >
                  {field.label}
                  {requiredMark}
                </label>
                <select
                  id={fieldId}
                  required={field.required}
                  value={value}
                  onChange={(event) => updateAnswer(field.fieldKey, event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-earth-200 bg-white px-4 py-3 text-earth-950 outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-100"
                >
                  <option value="">{selectPlaceholder}</option>
                  {(field.options ?? []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {field.helpText && (
                  <p className="mt-2 text-caption text-earth-500">{field.helpText}</p>
                )}
              </div>
            )
          }

          if (field.fieldType === 'radio') {
            return (
              <fieldset key={field._key || field.fieldKey}>
                <legend className="text-sm font-semibold text-earth-950">
                  {field.label}
                  {requiredMark}
                </legend>
                <div className="mt-3 space-y-2">
                  {(field.options ?? []).map((option) => (
                    <label
                      key={option}
                      className="flex gap-3 rounded-2xl border border-earth-200 bg-earth-50 p-3 text-sm text-earth-700"
                    >
                      <input
                        type="radio"
                        name={field.fieldKey}
                        value={option}
                        required={field.required}
                        checked={value === option}
                        onChange={(event) =>
                          updateAnswer(field.fieldKey, event.target.value)
                        }
                        className="mt-1 h-4 w-4"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {field.helpText && (
                  <p className="mt-2 text-caption text-earth-500">{field.helpText}</p>
                )}
              </fieldset>
            )
          }

          if (field.fieldType === 'checkbox') {
            return (
              <fieldset key={field._key || field.fieldKey}>
                <legend className="text-sm font-semibold text-earth-950">
                  {field.label}
                  {requiredMark}
                </legend>
                <div className="mt-3 space-y-2">
                  {(field.options && field.options.length > 0
                    ? field.options
                    : [checkboxFallbackOption]
                  ).map((option) => (
                    <label
                      key={option}
                      className="flex gap-3 rounded-2xl border border-earth-200 bg-earth-50 p-3 text-sm text-earth-700"
                    >
                      <input
                        type="checkbox"
                        value={option}
                        checked={value.split(',').map((item) => item.trim()).includes(option)}
                        onChange={(event) =>
                          updateCheckboxAnswer(
                            field.fieldKey,
                            option,
                            event.target.checked,
                          )
                        }
                        className="mt-1 h-4 w-4 rounded border-earth-300"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
                {field.helpText && (
                  <p className="mt-2 text-caption text-earth-500">{field.helpText}</p>
                )}
              </fieldset>
            )
          }

          return (
            <div key={field._key || field.fieldKey}>
              <label
                htmlFor={fieldId}
                className="text-sm font-semibold text-earth-950"
              >
                {field.label}
                {requiredMark}
              </label>
              <input
                id={fieldId}
                type={
                  field.fieldType === 'email'
                    ? 'email'
                    : field.fieldType === 'phone'
                      ? 'tel'
                      : 'text'
                }
                required={field.required}
                value={value}
                placeholder={field.placeholder}
                onChange={(event) => updateAnswer(field.fieldKey, event.target.value)}
                className="mt-2 w-full rounded-2xl border border-earth-200 bg-white px-4 py-3 text-earth-950 outline-none transition focus:border-forest-700 focus:ring-4 focus:ring-forest-100"
              />
              {field.helpText && (
                <p className="mt-2 text-caption text-earth-500">{field.helpText}</p>
              )}
            </div>
          )
        })}

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
            {status === 'submitting' ? submittingLabel : submitButtonLabel}
          </button>

          <p className="text-sm text-earth-500">{requiredNote}</p>
        </div>
      </form>
    </div>
  )
}
