import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import toast from 'react-hot-toast';

export async function middleware(req) {

  // const token = await getToken({ req });
    
  // if (req.nextUrl.pathname.startsWith("/recipe")) {
  //   if (!token) {
  //     console.log(token)
  //     toast.error("로그인 후 이용 가능합니다.")
  //     return NextResponse.redirect(new URL('/', req.url));
  //   }
  // }

  
  // return NextResponse.next()
} 

