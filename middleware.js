import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {

//     const session = await getToken({req : request})
//     if ( request.nextUrl.pathname.startsWith('/write') ) {
//         if (session == null) {
//             return NextResponse.redirect(new URL('/api/auth/signin', request.url))
//         }
//     }


//   if ( request.nextUrl.pathname === '/list' ) {
//     console.log(request.headers.get('sec-ch-ua-platform'))
//     console.log(new Date())
//     return NextResponse.next()
//   } 

    if (request.nextUrl.pathname.startsWith('/register')) {
        if (request.cookies.has('visited') == false) {
            const response = NextResponse.next()
            response.cookies.set({
                name: 'visited',
                value: 'true',
                maxAge: 3600,
                httpOnly : true
            })  
            return response  //쿠키생성
        }  //존재확인
        return NextResponse.next()
    }
} 