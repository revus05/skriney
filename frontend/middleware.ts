import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { paths, publicPaths } from 'shared/navigation'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  const jwt = request.cookies.get('jwt')?.value

  if (!jwt) {
    return NextResponse.next()
  }

  const meRes = await fetch(
    `${process.env.NEXT_PUBLIC_ITERNAL_API_URL}/users/me`,
    {
      cache: 'no-store',
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    },
  )

  if (meRes.ok) {
    return NextResponse.next()
  }

  const logoutRes = await fetch(
    `${process.env.NEXT_PUBLIC_ITERNAL_API_URL}/users/sign-out`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `jwt=${jwt}`,
      },
    },
  )

  const response = createResponseWithRedirect(request)

  const setCookieHeaders = logoutRes.headers.getSetCookie()
  setCookieHeaders.forEach((cookie) => {
    response.headers.append('Set-Cookie', cookie)
  })

  return response
}

function createResponseWithRedirect(request: NextRequest) {
  const loginUrl = new URL(paths.signIn, request.url)

  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
