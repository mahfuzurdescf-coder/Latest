import { NextRequest, NextResponse } from 'next/server'

const CANONICAL_HOST = 'www.descf.org'

const legacyRedirects: Record<string, string> = {
  '/seminars-and-workshops': '/programmes',
  '/seminars': '/programmes',
  '/workshops': '/programmes',
  '/training': '/programmes',
  '/awareness': '/programmes',
  '/awareness-programmes': '/programmes',
  '/mission-vision': '/mission',
  '/partner-with-us': '/partner',
}

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  const normalizedPath =
    url.pathname.length > 1 && url.pathname.endsWith('/')
      ? url.pathname.slice(0, -1)
      : url.pathname

  const destination = legacyRedirects[normalizedPath]
  const isVercelDeploymentHost = host.endsWith('.vercel.app')
  const isApexDomain = host === 'descf.org'

  if (destination) {
    url.pathname = destination
  }

  if (isVercelDeploymentHost || isApexDomain) {
    url.protocol = 'https:'
    url.hostname = CANONICAL_HOST
  }

  if (destination || isVercelDeploymentHost || isApexDomain) {
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
