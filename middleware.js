import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request, event) {

    // const session = await getToken()

    // if (request.nextUrl.pathname.startsWith('/register')) {
    //     if (request.cookies.has('visited') == false) {
    //         const response = NextResponse.next()
    //         response.cookies.set({
    //             name: 'visited',
    //             value: 'true',
    //             maxAge: 3600,
    //             httpOnly : true
    //         })  
    //         return response  //쿠키생성
    //     }  //존재확인
    //     return NextResponse.next()
    // }
} 