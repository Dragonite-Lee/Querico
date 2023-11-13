'use client'

import { signOut } from 'next-auth/react'

export default function InLogin({name, email}) {
    return (
        <div>
            <div>{name}</div>
            <div>{email}</div>
            <button onClick={() => {signOut()}}>로그아웃</button>  
        </div>
    )
}