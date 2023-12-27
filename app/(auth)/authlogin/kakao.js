'use client'

import Image from "next/image"
import { signIn, useSession, signOut } from "next-auth/react"

import style from '../../../style/login.module.css'
import btn_kakao from '../../../public/login/btn_kakao.png'


export default function KakaoLogin() {

    const {data: session, status} = useSession()
    if (status === 'authenticated' && session.provider == 'kakao') {
        console.log(session)
        return (
            <div>
                <p>email:{session.profile.email}</p>
            <div onClick={() => signOut()}>로그아웃</div>
            </div>
        )
    }
    
    return (
        <div>
            <Image onClick={() => signIn("kakao")} src={btn_kakao} alt="카카오로그인" className={style.social_login} />
            <div onClick={() => signOut()}>로그아웃</div>
        </div>
        
    )
}