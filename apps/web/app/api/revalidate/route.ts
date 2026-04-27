import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

// Maps Sanity document types → Next.js cache tags
const TYPE_TO_TAGS: Record<string, string[]> = {
  post:         ['post'],
  author:       ['author', 'post'],
  category:     ['category', 'post'],
  tag:          ['post'],
  programme:    ['programme'],
  resource:     ['resource'],
  event:        ['event'],
  teamMember:   ['teamMember'],
  siteSettings: ['siteSettings'],
}

export async function POST(req: NextRequest) {
  // Verify webhook secret
  const secret = req.headers.get('x-webhook-secret')
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const documentType: string = body?._type ?? ''

    const tagsToRevalidate = TYPE_TO_TAGS[documentType] ?? ['sanity']

    for (const tag of tagsToRevalidate) {
      revalidateTag(tag)
    }

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      documentType,
      timestamp: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Revalidation error:', err)
    return NextResponse.json({ message: 'Revalidation failed', error: String(err) }, { status: 500 })
  }
}
