'use client'

import Image from "next/image"
import { signIn, useSession, signOut } from "next-auth/react"

import style from '../../style/login.module.css'
import btn_naver from '../../public/login/btn_naver.png'


export default function NaverLogin() {

    return (
        <div>
            <Image onClick={() => signIn("naver", { redirect: false, callbackUrl: "/" })} src={btn_naver} alt="네이버로그인" className={style.social_login} />
        </div>
    )
}