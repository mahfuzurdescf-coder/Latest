import { NextRequest, NextResponse } from 'next/server'

const CANONICAL_HOST = 'www.descf.org'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  const isVercelDeploymentHost = host.endsWith('.vercel.app')
  const isApexDomain = host === 'descf.org'

  if (isVercelDeploymentHost || isApexDomain) {
    url.protocol = 'https:'
    url.hostname = CANONICAL_HOST
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
