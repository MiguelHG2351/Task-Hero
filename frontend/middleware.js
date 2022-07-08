import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    const session = await getToken({ req:request, secret: process.env.SECRET })
    if(!session) {
        return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
    console.log('middlware sub', session?.sub)
    console.log('middlware data', session)
  return NextResponse.next()
}

export const config = {
    matcher: ['/u/:path*'],
  }