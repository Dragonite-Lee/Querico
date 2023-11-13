'use client'

import { signIn } from 'next-auth/react'
import { useSession } from 'next-auth/react';

export default function LoginBtn() {
    // const {data:session} = useSession();
//   console.log(session.accessToken)
    return (
        <button onClick={() => {signIn()}}>로그인</button>  
    )
}