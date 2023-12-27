'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import style from '../../style/login.module.css'

import NaverLogin from '../authlogin/naver'
import bg_login from '../../public/login/bg-login.png'



export default function Login(){

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const router = useRouter();

  const emailHandler = (event) => {
    const {currentTarget : {value}} = event;
    setEmail(value);
  }

  const passwordHandler = (event) => {
    const {currentTarget : {value}} = event;
    setPassword(value);
  }

  const onLogin = async (emailValue, passwordValue) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: emailValue,
        password: passwordValue
      })

      if (result?.error) console.log("Error :" + result.error);

      //로그인 성공
      router.push('/');
    } catch (error) {
      console.log("Error :" + error);
    }
  }

  return (
  <div className={style.login_container}>
      <div
        style={{
          backgroundImage: `url(${bg_login.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "1280px",
          height: "720px",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <div className={style.input_container}>
          <input onChange={(e) => emailHandler(e)} type="text" name="email" placeholder="이메일을 입력해 주세요" className={style.input_box}/>
          <input onChange={(e => passwordHandler(e))} type="password" name="password" placeholder="비밀번호를 입력해 주세요" className={style.input_box}/>
          <button onClick={() => onLogin(email, password)}  className={style.submit_box}>로그인</button>
        </div>
        <div className={style.option_container}>
          <Link href="/signup" className={style.sign_up}>새로 오셨나요?</Link>
        </div>
        <div className={style.social_container}>
          <NaverLogin />
        </div>
      </div>
    </div>
    )
  }