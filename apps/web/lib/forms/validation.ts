export type PublicFormFieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'

export interface PublicFormField {
  label: string
  fieldKey: string
  fieldType: PublicFormFieldType
  required?: boolean
  options?: string[]
}

export interface NormalizedAnswer {
  _key: string
  fieldKey: string
  label: string
  value: string
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function sanitizeText(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return ''

  return value
    .replace(/\u0000/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

export function sanitizeLongText(value: unknown, maxLength = 3000): string {
  if (typeof value !== 'string') return ''

  return value
    .replace(/\u0000/g, '')
    .trim()
    .slice(0, maxLength)
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isValidPathOrUrl(value: string): boolean {
  if (!value) return false
  if (value.startsWith('/')) return true

  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

export function makeArrayKey(value: string, index: number): string {
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40)

  return `${cleaned || 'field'}-${index}`
}

export function normalizeAnswers(
  fields: PublicFormField[],
  rawAnswers: unknown,
): {
  answers: NormalizedAnswer[]
  errors: string[]
  registrantName?: string
  registrantEmail?: string
  registrantPhone?: string
} {
  const errors: string[] = []

  if (!isPlainObject(rawAnswers)) {
    return {
      answers: [],
      errors: ['Submitted answers must be an object.'],
    }
  }

  const answers: NormalizedAnswer[] = []
  let registrantName = ''
  let registrantEmail = ''
  let registrantPhone = ''

  fields.forEach((field, index) => {
    const rawValue = rawAnswers[field.fieldKey]
    const value =
      field.fieldType === 'textarea'
        ? sanitizeLongText(rawValue, 2000)
        : sanitizeText(rawValue, 500)

    if (field.required && !value) {
      errors.push(`${field.label} is required.`)
    }

    if (value && field.fieldType === 'email' && !isValidEmail(value)) {
      errors.push(`${field.label} must be a valid email address.`)
    }

    if (
      value &&
      ['select', 'radio'].includes(field.fieldType) &&
      field.options &&
      field.options.length > 0 &&
      !field.options.includes(value)
    ) {
      errors.push(`${field.label} has an invalid option.`)
    }

    if (value) {
      answers.push({
        _key: makeArrayKey(field.fieldKey, index),
        fieldKey: field.fieldKey,
        label: field.label,
        value,
      })
    }

    const key = field.fieldKey.toLowerCase()
    const label = field.label.toLowerCase()

    if (!registrantName && (key.includes('name') || label.includes('name'))) {
      registrantName = value
    }

    if (!registrantEmail && field.fieldType === 'email') {
      registrantEmail = value
    }

    if (!registrantPhone && field.fieldType === 'phone') {
      registrantPhone = value
    }
  })

  return {
    answers,
    errors,
    registrantName: registrantName || undefined,
    registrantEmail: registrantEmail || undefined,
    registrantPhone: registrantPhone || undefined,
  }
}
