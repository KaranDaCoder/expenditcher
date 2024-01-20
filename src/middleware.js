import { NextResponse , NextRequest } from 'next/server';

export { default } from 'next-auth/middleware';
export const config = {
  matcher: ['/dashboard/:path*', '/manage'],
};

export function middleware(request) {

  let value = request.cookies.get('next-auth.session-token').value;
    const response = NextResponse.next();
    response.cookies.set({
      name: '__Secure-next-auth.session-token',
      value,
      path: '/',
    });
    // console.log(response.cookies.get('__Secure-next-auth.session-token'));
    return response;
}
