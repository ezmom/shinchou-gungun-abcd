import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization')
  const user = process.env.BASIC_AUTH_USER || 'aipark'
  const pass = process.env.BASIC_AUTH_PASSWORD || 'shinchou5gatsu'

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1]
    const [u, p] = Buffer.from(authValue, 'base64').toString().split(':')
    if (u === user && p === pass) {
      return NextResponse.next()
    }
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Zver ABCD Compare"',
    },
  })
}
