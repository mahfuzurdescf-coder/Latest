import { NextResponse } from 'next/server'

import {
  isPlainObject,
  normalizeAnswers,
  sanitizeText,
} from '@/lib/forms/validation'
import { getSanityWriteClient } from '@/lib/sanity/write-client'

export const runtime = 'nodejs'

type RegistrationFormFromSanity = {
  _id: string
  title?: string
  status?: string
  isActive?: boolean
  deadline?: string
  capacity?: number
  successMessage?: string
  event?: {
    _id: string
    title?: string
    slug?: {
      current?: string
    }
  }
  fields?: Array<{
    label: string
    fieldKey: string
    fieldType:
      | 'text'
      | 'email'
      | 'phone'
      | 'textarea'
      | 'select'
      | 'radio'
      | 'checkbox'
    required?: boolean
    options?: string[]
  }>
}

const REGISTRATION_FORM_QUERY = /* groq */ `
  *[
    _type == "registrationForm" &&
    _id == $registrationFormId &&
    status == "published" &&
    isActive == true
  ][0] {
    _id,
    title,
    status,
    isActive,
    deadline,
    capacity,
    successMessage,
    event->{
      _id,
      title,
      slug
    },
    fields[]{
      label,
      fieldKey,
      fieldType,
      required,
      options
    }
  }
`

const REGISTRATION_COUNT_QUERY = /* groq */ `
  count(*[
    _type == "eventRegistration" &&
    registrationForm._ref == $registrationFormId &&
    status != "cancelled"
  ])
`

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!isPlainObject(body)) {
      return NextResponse.json(
        { ok: false, message: 'Invalid registration.' },
        { status: 400 },
      )
    }

    const honeypot = sanitizeText(body.website, 200)

    if (honeypot) {
      return NextResponse.json({ ok: true })
    }

    const registrationFormId = sanitizeText(body.registrationFormId, 120)

    if (!registrationFormId) {
      return NextResponse.json(
        { ok: false, message: 'Registration form ID is required.' },
        { status: 400 },
      )
    }

    const client = getSanityWriteClient()

    const form = await client.fetch<RegistrationFormFromSanity | null>(
      REGISTRATION_FORM_QUERY,
      { registrationFormId },
    )

    if (!form || !form.fields || form.fields.length === 0) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Registration is not available for this event.',
        },
        { status: 404 },
      )
    }

    if (form.deadline) {
      const deadlineTime = new Date(form.deadline).getTime()

      if (!Number.isNaN(deadlineTime) && Date.now() > deadlineTime) {
        return NextResponse.json(
          {
            ok: false,
            message: 'Registration deadline has passed.',
          },
          { status: 400 },
        )
      }
    }

    if (form.capacity && form.capacity > 0) {
      const registrationCount = await client.fetch<number>(
        REGISTRATION_COUNT_QUERY,
        { registrationFormId },
      )

      if (registrationCount >= form.capacity) {
        return NextResponse.json(
          {
            ok: false,
            message: 'Registration capacity has been reached.',
          },
          { status: 400 },
        )
      }
    }

    const normalized = normalizeAnswers(form.fields, body.answers)

    if (normalized.errors.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Please correct the highlighted fields.',
          errors: normalized.errors,
        },
        { status: 400 },
      )
    }

    const submittedAt = new Date().toISOString()

    await client.create({
      _type: 'eventRegistration',
      registrantName: normalized.registrantName || 'Unnamed registrant',
      registrantEmail: normalized.registrantEmail || '',
      registrantPhone: normalized.registrantPhone || '',
      event: form.event?._id
        ? {
            _type: 'reference',
            _ref: form.event._id,
          }
        : undefined,
      registrationForm: {
        _type: 'reference',
        _ref: form._id,
      },
      eventTitleSnapshot: form.event?.title || form.title || 'Untitled event',
      answers: normalized.answers,
      status: 'new',
      submittedAt,
      sourceUrl: request.headers.get('referer') || '',
      userAgent: request.headers.get('user-agent') || '',
    })

    return NextResponse.json({
      ok: true,
      message:
        form.successMessage ||
        'Thank you. Your registration has been received.',
    })
  } catch (error) {
    console.error('Event registration failed:', error)

    return NextResponse.json(
      {
        ok: false,
        message: 'Registration failed. Please try again later.',
      },
      { status: 500 },
    )
  }
}
