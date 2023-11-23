'use client'

import Image from "next/image"
import { signIn, useSession, signOut } from "next-auth/react"

import style from '../../style/login.module.css'
import btn_naver from '../../public/login/btn_naver.png'


export default function NaverLogin() {

    const {data: session, status} = useSession()
    if (status === 'authenticated') {
        console.log(session)
        return (
            <div>
                <p>email:{session.user.email}</p>
            <div onClick={() => signOut()}>로그아웃</div>
            </div>
        )
    }
    // , { redirect: false, callbackUrl: "/" }
    return (
        <div>
            <Image onClick={() => signIn("naver")} src={btn_naver} alt="네이버로그인" className={style.social_login} />
            <div onClick={() => signOut({
                redirect: true,
                callbackUrl: `http://localhost:3000/api/auth/serverlogout?userId=${session.user.id}`,
              })}>로그아웃</div>
        </div>
        
    )
}