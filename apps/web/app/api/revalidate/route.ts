import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

type SanityWebhookPayload = {
  _type?: string
  slug?: string
  eventSlug?: string
}

function normaliseSlug(slug?: string) {
  if (!slug) return ''
  return slug.startsWith('/') ? slug.slice(1) : slug
}

function revalidateCommonPaths() {
  revalidatePath('/')
  revalidatePath('/about')
  revalidatePath('/current-work')
  revalidatePath('/programmes')
  revalidatePath('/newsroom')
  revalidatePath('/resources')
  revalidatePath('/evidence-resources')
  revalidatePath('/reports')
  revalidatePath('/events')
  revalidatePath('/partner')
  revalidatePath('/governance')
  revalidatePath('/contact')
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET

  if (!secret) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Missing SANITY_WEBHOOK_SECRET.',
      },
      { status: 500 },
    )
  }

  let body: SanityWebhookPayload | null = null
  let isValidSignature = false

  try {
    const parsed = await parseBody<SanityWebhookPayload>(request, secret)
    body = parsed.body
    isValidSignature = parsed.isValidSignature === true === true
  } catch (error) {
    console.error('Failed to parse Sanity webhook:', error)

    return NextResponse.json(
      {
        ok: false,
        message: 'Invalid webhook payload.',
      },
      { status: 400 },
    )
  }

  if (!isValidSignature) {
    return NextResponse.json(
      {
        ok: false,
        message: 'Invalid webhook signature.',
      },
      { status: 401 },
    )
  }

  const documentType = body?._type
  const slug = normaliseSlug(body?.slug)
  const eventSlug = normaliseSlug(body?.eventSlug)

  try {
    if (!documentType) {
      revalidateCommonPaths()

      return NextResponse.json({
        ok: true,
        revalidated: true,
        reason: 'No document type provided. Common paths revalidated.',
      })
    }

    revalidateTag(documentType)

    switch (documentType) {
      case 'siteSettings':
      case 'homepageCuration': {
        revalidateTag('siteSettings')
        revalidateTag('homepageCuration')
        revalidatePath('/')
        revalidatePath('/contact')
        revalidatePath('/partner')
        revalidatePath('/governance')
        break
      }

      case 'post': {
        revalidateTag('post')
        revalidatePath('/')
        revalidatePath('/newsroom')

        if (slug) {
          revalidatePath(`/newsroom/${slug}`)
        }

        break
      }

      case 'category':
      case 'tag':
      case 'author': {
        revalidateTag(documentType)
        revalidatePath('/newsroom')
        break
      }

      case 'programme': {
        revalidateTag('programme')
        revalidatePath('/')
        revalidatePath('/programmes')
        revalidatePath('/current-work')

        if (slug) {
          revalidatePath(`/programmes/${slug}`)
        }

        break
      }

      case 'resource': {
        revalidateTag('resource')
        revalidatePath('/')
        revalidatePath('/resources')
        revalidatePath('/evidence-resources')
        revalidatePath('/reports')
        break
      }

      case 'event': {
        revalidateTag('event')
        revalidatePath('/events')
        revalidatePath('/')

        if (slug) {
          revalidatePath(`/events/${slug}`)
        }

        break
      }

      case 'registrationForm': {
        revalidateTag('registrationForm')
        revalidateTag('event')
        revalidatePath('/events')

        if (eventSlug) {
          revalidatePath(`/events/${eventSlug}`)
        }

        break
      }

      case 'teamMember': {
        revalidateTag('teamMember')
        revalidatePath('/team')
        revalidatePath('/about')
        break
      }

      case 'partner': {
        revalidateTag('partner')
        revalidatePath('/partner')
        revalidatePath('/')
        break
      }

      case 'governanceDocument':
      case 'policy': {
        revalidateTag(documentType)
        revalidatePath('/governance')
        break
      }

      case 'redirect': {
        return NextResponse.json({
          ok: true,
          revalidated: false,
          message:
            'Redirects are build-time configuration. Redeploy the website project for redirect changes.',
        })
      }

      default: {
        revalidateCommonPaths()
        break
      }
    }

    return NextResponse.json({
      ok: true,
      revalidated: true,
      type: documentType,
      slug,
      eventSlug,
    })
  } catch (error) {
    console.error('Revalidation failed:', error)

    return NextResponse.json(
      {
        ok: false,
        message: 'Revalidation failed.',
      },
      { status: 500 },
    )
  }
}



