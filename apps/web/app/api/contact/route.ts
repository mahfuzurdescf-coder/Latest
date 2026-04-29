import { NextResponse } from 'next/server'

import {
  isPlainObject,
  isValidEmail,
  sanitizeLongText,
  sanitizeText,
} from '@/lib/forms/validation'
import { getSanityWriteClient } from '@/lib/sanity/write-client'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!isPlainObject(body)) {
      return NextResponse.json(
        { ok: false, message: 'Invalid submission.' },
        { status: 400 },
      )
    }

    const honeypot = sanitizeText(body.website, 200)

    if (honeypot) {
      return NextResponse.json({ ok: true })
    }

    const name = sanitizeText(body.name, 120)
    const email = sanitizeText(body.email, 160).toLowerCase()
    const phone = sanitizeText(body.phone, 60)
    const purpose = sanitizeText(body.purpose, 120)
    const subject = sanitizeText(body.subject, 160)
    const message = sanitizeLongText(body.message, 3000)
    const consent = body.consent === true

    const errors: string[] = []

    if (!name) errors.push('Name is required.')
    if (!email) errors.push('Email is required.')
    if (email && !isValidEmail(email)) errors.push('A valid email is required.')
    if (!subject) errors.push('Subject is required.')
    if (!message) errors.push('Message is required.')
    if (!consent) errors.push('Consent is required.')

    if (errors.length > 0) {
      return NextResponse.json(
        {
          ok: false,
          message: 'Please correct the highlighted fields.',
          errors,
        },
        { status: 400 },
      )
    }

    const client = getSanityWriteClient()
    const submittedAt = new Date().toISOString()

    await client.create({
      _type: 'contactSubmission',
      name,
      email,
      phone,
      purpose,
      subject,
      message,
      consent,
      status: 'new',
      submittedAt,
      sourceUrl: request.headers.get('referer') || '',
      userAgent: request.headers.get('user-agent') || '',
    })

    return NextResponse.json({
      ok: true,
      message: 'Thank you. Your message has been received.',
    })
  } catch (error) {
    console.error('Contact submission failed:', error)

    return NextResponse.json(
      {
        ok: false,
        message: 'Submission failed. Please try again later.',
      },
      { status: 500 },
    )
  }
}
